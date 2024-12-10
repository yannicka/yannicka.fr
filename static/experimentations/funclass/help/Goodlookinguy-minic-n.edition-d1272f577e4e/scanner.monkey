#rem
	scanner.monkey
		Token scanner for MiniC
		
	Copyright (C) 2012-2014, E.Sandberg
	Released under the GNU Lesser General Public License (LGPL)
	See license.txt for more information
	
	Contributing Author(s): E.Sandberg, Anders Sahlin, Nicholas Grant
#end

Class Token
	Field data:String
	Field type:String
	Field line:Int
	Field char:Int
	
	Method New(type:Int, data:String, line:Int, char:Int)
		Self.type = type
		Self.data = data
		Self.line = line
		Self.char = char
	End
End

Class eToken Final
	Const TypeString:Int = 1
	Const TypeFloat:Int = 2
	Const TypeIdent:Int = 3
	Const TypeKeyword:Int = 4
	Const TypeSymbol:Int = 5
	Const TypeEOF:Int = 6
End

Class Scanner
	' a quick note: "x"[0] will automatically convert the char to it's ASCII character code before compilation
	
	Method Scan:List<Token>( input:String )
		data = input
		tokens = New List<Token>()
		
		' I figured out quite an interesting way to decouple the code
		While data_i < data.Length
			char = GetNext()
			token = Null
			
			If char = -1
				Exit
			ElseIf ScanForWhitespace() Or ScanForSingleLineComment()
				Continue
			ElseIf ScanForNewlines()
				line += 1
				lastNewLine = data_i
				Continue
			ElseIf ScanForString() Or ScanForNumberAndDot()
			ElseIf ScanForSymbol() Or ScanForIdentOrKeyword()
			Else
				Error("Unrecognized token at line " + line + ": " + String.FromChar(char))
			End
			
			tokens.AddLast(token)
		Wend
		
		Return tokens
	End
	
	Method ScanForSymbol:Bool()
		Return ScanForBrackets() Or ScanForMathSymbols() Or ScanForBoolAndBitSymbols() Or
			ScanForComparisonSymbols() Or ScanForOtherSymbols()
	End
	
	Method ScanForWhitespace:Bool()
		Return char = 32 Or char = "~t"[0]
	End
	
	Method ScanForSingleLineComment:Bool()
		If char = "/"[0] And Peek() = "/"[0]
			GetNext() '/
			
			Local nextChar:Int = Peek()
			While (nextChar <> "~r" And Peek(1) <> "~n") And nextChar <> "~n"[0] And nextChar <> -1
				GetNext()
				nextChar = Peek()
			Wend
			
			Return True
		End
		
		Return False
	End
	
	Method ScanForNewlines:Bool()
		If char = "~r"[0]
			If Peek() = "~n"[0]
				GetNext()
			End
		ElseIf char = "~n"[0]
			' ignore
		Else
			Return False
		End
		
		Return True
	End
	
	Method ScanForString:Bool()
		If char = "~q"[0]	' double quotes is slower at scanning, but has added benefits
			Local pieces:IntStack = New IntStack()
			Local schar:Int, nextChar:Int
			
			While Peek() <> "~q"[0]
				schar = GetNext()
				
				If schar = -1
					Error("Scanner error: String ended unexpectedly on line " + line)
				End
				
				' for escaped characters
				If schar = "\"[0]
					nextChar = GetNext()
					
					Select nextChar
						Case "b"[0] schar = 8
						Case "t"[0] schar = "~t"[0]
						Case "n"[0] schar = "~n"[0]
						Case "v"[0] schar = 11
						Case "f"[0] schar = 12
						Case "r"[0] schar = "~r"[0]
						Case "e"[0] schar = 27
						Case "s"[0] schar = 32
						Case "d"[0] schar = 127
						Default schar = nextChar
					End
				End
				
				pieces.Push(schar)
			Wend
			
			GetNext()
			token = CreateToken(eToken.TypeString, String.FromChars(pieces.ToArray()))
		ElseIf char = "'"[0]	' single quotes is quicker at scanning, at the cost of losing some benefits
			Local str := ""
			Local strStart:Int = data_i
			Local strEnd:Int = data_i
			
			While Peek() <> "'"[0]
				If Peek() = -1
					Error("Scanner error: String ended unexpectedly on line " + line)
				End
				
				strEnd += 1
				GetNext()
			End
			
			GetNext()
			token = CreateToken(eToken.TypeString, data[strStart .. strEnd])
		Else
			Return False
		End
		
		Return True
	End
	
	Method ScanForNumberAndDot:Bool()
		Local nextChar:Int = Peek()
		
		If NumericChar(char) Or (char = "."[0] And NumericChar(nextChar))
			'Note: TODO: Add in scientific notation support
			'Read all digits
			Local numStart:Int = data_i - 1
			Local numEnd:Int = data_i
			Local foundDot:Bool, foundExp:Bool, foundSign:Bool
			
			While nextChar <> -1
				If foundExp And Not foundSign
					If nextChar = "+"[0] or nextChar = "-"[0]
						numEnd += 1
						foundSign = True
					Else
						Print("MiniC Scanning Error: Malformed float was input @ line " + line + ", char " + LineChar())
					End
				ElseIf NumericChar(nextChar)
					numEnd += 1
				ElseIf nextChar = "."[0]
					If foundDot Or foundExp Or foundSign
						Print("MiniC Scanning Error: Malformed float was input @ line " + line + ", char " + LineChar())
					Else
						numEnd += 1
						foundDot = True
					End
				ElseIf nextChar = "E"[0] Or nextChar = "e"[0]
					If foundExp Or foundSign
						Print("MiniC Scanning Error: Malformed float was input @ line " + line + ", char " + LineChar())
					Else
						numEnd += 1
						foundExp = True
					End
				Else
					Exit
				End
				
				GetNext()
				nextChar = Peek()
			End
			
			token = CreateToken(eToken.TypeFloat, data[numStart .. numEnd].ToLower())
		ElseIf char = "."[0]
			' scope accessor
			token = CreateToken(eToken.TypeSymbol, ".")
		Else
			Return False
		End
		
		Return True
	End
	
	Method ScanForMathSymbols:Bool()
		If char = "+"[0] And Peek() <> "+"[0]
			token = CreateToken(eToken.TypeSymbol, "+")
		ElseIf char = "-"[0] And Peek() <> "-"[0]
			token = CreateToken(eToken.TypeSymbol, "-")
		ElseIf char = "*"[0]
			token = CreateToken(eToken.TypeSymbol, "*")
		ElseIf char = "/"[0]
			token = CreateToken(eToken.TypeSymbol, "/")
		ElseIf char = "%"[0]
			token = CreateToken(eToken.TypeSymbol, "%")
		ElseIf char = "~~"[0] And (Peek() = "/"[0] Or Peek() = "%"[0])
			token = CreateToken(eToken.TypeSymbol, "~~" + String.FromChar(Peek()))
			GetNext()
		Else
			Return False
		End
		
		If Peek() = "="[0] Then token.data += "="; GetNext()
		Return True
	End
	
	Method ScanForBoolAndBitSymbols:Bool()
		If char = "&"[0]
			token = CreateToken(eToken.TypeSymbol, "&")
			If Peek() = "="[0]
				token.data += "="
				GetNext()
			ElseIf Peek() = "&"[0]
				token.data += "&"
				GetNext()
			End
		ElseIf char = "|"[0]
			token = CreateToken(eToken.TypeSymbol, "|")
			If Peek() = "="[0]
				token.data += "="
				GetNext()
			ElseIf Peek() = "|"[0]
				token.data += "|"
				GetNext()
			End
		ElseIf char = "^"[0]
			token = CreateToken(eToken.TypeSymbol, "^")
			If Peek() = "="[0]
				token.data += "="
				GetNext()
			ElseIf Peek() = "^"[0]
				token.data += "^"
				GetNext()
			End
		ElseIf char = "~~"[0]
			token = CreateToken(eToken.TypeSymbol, "~~")
		ElseIf char = ">"[0] And Peek() = ">"[0]
			GetNext()
			token = CreateToken(eToken.TypeSymbol, ">>")
			If Peek() = ">"[0]
				GetNext()
				token.data += ">"
			End
			If Peek() = "="[0]
				GetNext()
				token.data += "="
			End
		ElseIf char = "<"[0] And Peek() = "<"[0]
			GetNext()
			token = CreateToken(eToken.TypeSymbol, "<<")
			If Peek() = "="[0]
				GetNext()
				token.data += "="
			End
		Else
			Return False
		End
		
		Return True
	End
	
	Method ScanForComparisonSymbols:Bool()
		If char = "="[0]
			token = CreateToken(eToken.TypeSymbol, "=")
			If Peek() = "="[0] ' this allows for the === operator
				token.data += "="
				GetNext()
			End
		ElseIf char = "!"[0] ' ! and !=
			token = CreateToken(eToken.TypeSymbol, "!")
			If Peek() = "="[0] ' this allows for the !== operator
				token.data += "="
				GetNext()
			End
		ElseIf char = ">"[0]
			token = CreateToken(eToken.TypeSymbol, ">")
		ElseIf char = "<"[0]
			token = CreateToken(eToken.TypeSymbol, "<")
		Else
			Return False
		End
		
		' turn to augmented assignment token
		If Peek() = "="[0] Then token.data += "="; GetNext()
		Return True
	End
	
	Method ScanForBrackets:Bool()
		' searches for non-comparison brackets
		If char = "("[0]
			token = CreateToken(eToken.TypeSymbol, "(")
		ElseIf char = ")"[0]
			token = CreateToken(eToken.TypeSymbol, ")")
		ElseIf char = "["[0]
			token = CreateToken(eToken.TypeSymbol, "[")
		ElseIf char = "]"[0]
			token = CreateToken(eToken.TypeSymbol, "]")
		ElseIf char = "{"[0]
			token = CreateToken(eToken.TypeSymbol, "{")
		ElseIf char = "}"[0]
			token = CreateToken(eToken.TypeSymbol, "}")
		Else
			Return False
		End
		
		Return True
	End
	
	Method ScanForOtherSymbols:Bool()
		If char = ";"[0]
			token = CreateToken(eToken.TypeSymbol, ";")
		ElseIf char = ","[0]
			token = CreateToken(eToken.TypeSymbol, ",")
		ElseIf char = ":"[0]
			token = CreateToken(eToken.TypeSymbol, ":")
		ElseIf char = "?"[0]
			token = CreateToken(eToken.TypeSymbol, "?")
		ElseIf char = "+"[0] And Peek() = "+"[0]
			token = CreateToken(eToken.TypeSymbol, "++")
			GetNext()
		ElseIf char = "-"[0] And Peek() = "-"[0]
			token = CreateToken(eToken.TypeSymbol, "--")
			GetNext()
		Else
			Return False
		End
		
		Return True
	End
	
	Method ScanForIdentOrKeyword:Bool()
		If ValidIdentifiers.Contains(String.FromChar(char)) Or char > 128
			Local identStart:Int = data_i - 1
			Local identEnd:Int = data_i
			
			char = GetNext()
			While AllValidIdentifiers.Contains(String.FromChar(char)) Or char > 128
				If char = -1
					' if the script doesn't have any syntax errors, this will never pop up
					Error("Scanner error: Identifer ended unexpectedly on line " + line)
				End
				
				identEnd += 1
				char = GetNext()
			End
			
			Local ident := data[identStart .. identEnd]
			
			If Keywords.Contains(";" + ident + ";")
				token = CreateToken(eToken.TypeKeyword, ident)
			Else
				token = CreateToken(eToken.TypeIdent, ident)
			End
			
			data_i -= 1
		Else
			Return False
		End
		
		Return True
	End
	
	Method NumericChar:Bool( charCode:Int )
		Return charCode >= "0"[0] And charCode <= "9"[0]
	End
	
	Method GetNext:Int()
		If data_i >= data.Length
			Error "Error reading token - unexpected end of file"
		End
		
		data_i += 1
		Return data[data_i - 1]
	End
	
	Method Peek:Int( n:Int = 0 )
		Local index = Clamp(data_i + n, 0, data.Length)
		If index >= data.Length Then Return -1
		Return data[index]
	End
	
	Method CreateToken:Token( type:Int, data:String = "" )
		Return New Token(type, data, line, LineChar())
	End
	
	Method LineChar:Int()
		Return data_i - lastNewLine
	End
	
	Const Keywords:String = ";func;if;else;while;return;this;delete;continue;break;var;null;as;in;has;for;in;foreach;"
	Const ValidIdentifiers:String = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_$"
	Const AllValidIdentifiers:String = ValidIdentifiers + "0123456789"
	
	Field data:String
	Field data_i:Int
	Field tokens:List<Token>
	Field line:Int
	Field lastNewLine:Int
	Field token:Token
	Field char:Int
End
