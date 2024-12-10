#rem
	scanner.monkey
		Token scanner for MiniC
		
	Copyright (C) 2012, E.Sandberg
	Released under the GNU Lesser General Public License (LGPL)
	See license.txt for more information
#end

Class Token
	Field data:String
	Field type:String
	Field line:Int
	
	Method New(type:String)
		Self.type = type
	End
End

Class Scanner	
    Const NUMBER_CHARS:String = "0123456789"
    Const IDENT_CHARS:String = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_"

	Field data:String
	Field data_i:Int
	Method Scan:List<Token>(input:String)
		data = input
		data_i = 0
		Local tokens:List<Token> = New List<Token>()
		Local identifier:String = ""
		Local curLine:Int = 0
		
		While data_i < data.Length
			Local curToken:Token = Null
			Local curChar:String = GetNext()
			Local foundIdent:Bool = False
			
			If curChar = " " Or curChar = "~t" Or curChar = "~r"
				'Ignore
			ElseIf curChar = "~n"
				'Ignore
				curLine += 1
			ElseIf curChar = "'"
				'String
				Local str:String = ""
				While Peek() <> "'"
					str += GetNext()
				Wend
				GetNext() ''
				curToken = New Token("STRING")
				curToken.data = str
			ElseIf curChar = "~q"
				'String
				Local str:String = ""
				Local char:String, nextChar:String
				
				While Peek() <> "~q"
					char = GetNext()
					
					If char = "\"
						nextChar = GetNext()
						
						Select nextChar
							Case "b"
								char = String.FromChar(8)
							Case "t"
								char = "~t"
							Case "n"
								char = "~n"
							Case "v"
								char = String.FromChar(11)
							Case "f"
								char = String.FromChar(12)
							Case "r"
								char = "~r"
							Case "e"
								char = String.FromChar(27)
							Case "s"
								char = " "
							Case "d"
								char = String.FromChar(127)
							Default
								char = nextChar
						End
					End
					
					str += char
				Wend
				GetNext() ''
				curToken = New Token("STRING")
				curToken.data = str
			ElseIf curChar = "/" And Peek() = "/"
				'Comment - read until new line
				GetNext() '/
				While Peek() <> "~n" And Peek() <> ""
					GetNext()
				Wend
				If Peek() = "" Then Exit
			ElseIf curChar = ";"
				curToken = New Token("SEMI")
			ElseIf curChar = ","
				curToken = New Token("COMMA")
			ElseIf curChar = "{"
				curToken = New Token("LBRACE")
			ElseIf curChar = "}"
				curToken = New Token("RBRACE")
			ElseIf curChar = "("
				curToken = New Token("LPAREN")
			ElseIf curChar = ")"
				curToken = New Token("RPAREN")
			ElseIf curChar = "+"
				curToken = New Token("PLUS")
			ElseIf curChar = "-"
				curToken = New Token("MINUS")
			ElseIf curChar = "/"
				curToken = New Token("DIV")
			ElseIf curChar = "*"
				curToken = New Token("MULT")
			ElseIf curChar = "="
				curToken = New Token("EQ")
			ElseIf curChar = "!"
				curToken = New Token("NOT")
				If Peek() = "="
					curToken.type = "NEQ"
					GetNext()
				End
			ElseIf curChar = "&"
				curToken = New Token("AND")
			ElseIf curChar = "|"
				curToken = New Token("OR")
			ElseIf curChar = ">"
				curToken = New Token("GT")
				If Peek() = "=" 
                    curToken.type = "GTEQ"
                    GetNext()
                EndIf
			ElseIf curChar = "<"
				curToken = New Token("LT")
				If Peek() = "=" 
                    curToken.type = "LTEQ"
                    GetNext()
                EndIf
			ElseIf IDENT_CHARS.Contains(curChar) 'Identifier must start with A-Z, a-z, or _
				'Identifier
				Local identifiers:String = IDENT_CHARS
				Local identStart:Int = data_i - 1
				Local identLength:Int = 0
				
				identifiers += NUMBER_CHARS
				
				While data_i < data.Length And identifiers.Contains(String.FromChar(data[identStart + identLength]))
					identLength += 1
				End
				
				identifier = data[identStart..identStart + identLength]
				data_i += identLength - 1
			ElseIf NUMBER_CHARS.Contains(curChar)
				'Read all digits
				Local numberStr:String = curChar
				While NUMBER_CHARS.Contains(Peek()) Or Peek() = "."
					numberStr += GetNext()
				Wend
				curToken = New Token("NUMBER")
				curToken.data = numberStr
			Else
				'Identifier
				'  This way prevents variables like test0 and test1
				'foundIdent = True
				'identifier += curChar
			EndIf
			If identifier <> ""
				Local tempToken:Token
				Local lowerIdent:String = identifier.ToLower()
				If lowerIdent = "func"
					tempToken = New Token("FUNC")			
				ElseIf lowerIdent = "if"
					tempToken = New Token("IF")
				ElseIf lowerIdent = "else"
					tempToken = New Token("ELSE")
				ElseIf lowerIdent = "while"
					tempToken = New Token("WHILE")
                ElseIf lowerIdent = "return"
                    tempToken = New Token("RETURN")
                ElseIf lowerIdent = "this";
                	tempToken = New Token("THIS")
				Else
					'Store identifier
					tempToken = New Token("IDENT")
					tempToken.data = identifier
				EndIf
				identifier = ""
				tempToken.line = curLine
				tokens.AddLast(tempToken)
			EndIf
			If curToken <> Null
				curToken.line = curLine
				tokens.AddLast(curToken)
			EndIf
		Wend
		Return tokens
	End
	Method GetNext:String()
		If data_i >= data.Length
			Error "Error reading token - unexpected end of file"
		EndIf
		data_i += 1
		Return String.FromChar(data[data_i-1])
	End
	
	Method Peek:String()
		If data_i >= data.Length Then Return ""
		Return String.FromChar(data[data_i])
	End
End