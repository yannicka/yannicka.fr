#rem
	parser.monkey
		MiniC parser
		
	Copyright (C) 2012-2014, E.Sandberg
	Released under the GNU Lesser General Public License (LGPL)
	See license.txt for more information
	
	Contributing Author(s): E.Sandberg, Anders Sahlin, Nicholas Grant
#end

Import scanner

Class eNode Final
	Const TypeUndef:Int = 0
	Const TypeFloat:Int = 1
	Const TypeString:Int = 2
	Const TypeIdent:Int = 3
	Const TypeArray:Int = 4
	Const TypeTypeCast:Int = 5
	Const TypeScope:Int = 6
	Const TypeVar:Int = 7
	Const TypeArgumentList:Int = 8
	Const TypeParamList:Int = 9
	
	Const TypeNegate:Int = 10
	Const TypeAdd:Int = 11
	Const TypeSubtract:Int = 12
	Const TypeMultiply:Int = 13
	Const TypeDivide:Int = 14
	Const TypeModulo:Int = 15
	Const TypeIntDivide:Int = 16
	Const TypeIntModulo:Int = 17
	
	Const TypeStatement:Int = 20
	Const TypeAssignment:Int = 21
	Const TypeIfBlock:Int = 22
	Const TypeIf:Int = 23
	Const TypeElse:Int = 24
	Const TypeWhile:Int = 25
	Const TypeContinue:Int = 26
	Const TypeBreak:Int = 27
	Const TypeFor:Int = 28
	Const TypeForEach:Int = 29
	
	Const TypeBoolNot:Int = 30
	Const TypeBoolAnd:Int = 31
	Const TypeBoolOr:Int = 32
	Const TypeBitwiseNot:Int = 33
	Const TypeBitwiseAnd:Int = 34
	Const TypeBitwiseOr:Int = 35
	Const TypeBitwiseXor:Int = 36
	Const TypeArithmeticShiftLeft:Int = 37
	Const TypeArithmeticShiftRight:Int = 38
	Const TypeLogicalShiftRight:Int = 39
	
	Const TypeGreaterThan:Int = 40
	Const TypeGreaterThanEqual:Int = 41
	Const TypeLessThan:Int = 42
	Const TypeLessThanEqual:Int = 43
	Const TypeEqualTo:Int = 44
	Const TypeNotEqualTo:Int = 45
	Const TypeIdenticalTo:Int = 46
	Const TypeNotIdenticalTo:Int = 47
	
	Const TypeFunc:Int = 50
	Const TypeFuncCall:Int = 51
	Const TypeReturn:Int = 52
	Const TypeThis:Int = 53
	Const TypeDelete:Int = 53
	
	Const TypePreIncrement:Int = 60
	Const TypePreDecrement:Int = 61
	Const TypePostIncrement:Int = 62
	Const TypePostDecrement:Int = 63
	
	Const TypeObject:Int = 70
	Const TypeNull:Int = 71
	Const TypeArrayExprList:Int = 72
	Const TypeContains:Int = 73
	Const TypeForLoopList:Int = 74
	Const TypeForEachItem:Int = 75
	Const TypeReference:Int = 76
End

Class ParserNode
	Field type:Int
	Field left:ParserNode
	Field right:ParserNode
	Field dataStr:String
	Field dataFloat:Float
	#If CONFIG = "debug"
	Field line:Int
	Field char:Int
	#EndIf
	
	Method New( type:Int, token:Token )
		Self.type = type
		#If CONFIG = "debug"
		line = token.line + 1
		char = token.char
		#EndIf
	End
	
	'#Region Debugging and Development Code
	Method PrintDebug( spaces:Int = 0, side:Int = 0 )
		Print NodeBranchToText(side) + GetSpaces(spaces) + NodeTypeToText(type) +
			"(" + StrData(dataStr) + ", " + String(dataFloat) + ")"
		If left <> Null Then left.PrintDebug(spaces + 2, 1)
		If right <> Null Then right.PrintDebug(spaces + 2, 2)
	End
	
	Method GetSpaces:String( spaces:Int )
		Local output:String
		Local tab:String = "    "
		
		While output.Length() < spaces
			output += tab
		End
		
		Return output[0..spaces]
	End
	
	Function NodeBranchToText:String( side:Int )
		Select side
			Case 0 Return "C:"
			Case 1 Return "L:"
			Case 2 Return "R:"
		End
		Return "U:"
	End
	
	Function StrData:String( data:String )
		If data Return data
		Return "~q~q"
	End
	
	Function NodeTypeToText:String( type:Int )
		Select type
			Case eNode.TypeUndef		Return "Undef"
			Case eNode.TypeFloat		Return "Float"
			Case eNode.TypeString		Return "String"
			Case eNode.TypeIdent		Return "Ident"
			Case eNode.TypeArray		Return "Array Accessor"
			Case eNode.TypeTypeCast		Return "Type Cast"
			Case eNode.TypeScope		Return "Scope Accessor"
			Case eNode.TypeVar			Return "Scope Variable"
			Case eNode.TypeArgumentList	Return "Argument List"
			Case eNode.TypeParamList	Return "Parameter List"
			
			Case eNode.TypeNegate		Return "Negate"
			Case eNode.TypeAdd		Return "Add"
			Case eNode.TypeSubtract	Return "Subtract"
			Case eNode.TypeMultiply	Return "Multiply"
			Case eNode.TypeDivide		Return "Divide"
			Case eNode.TypeModulo		Return "Modulo"
			Case eNode.TypeIntDivide	Return "Int Divide"
			Case eNode.TypeIntModulo	Return "Int Modulo"
			
			Case eNode.TypeStatement	Return "Statement"
			Case eNode.TypeAssignment	Return "Assignment"
			Case eNode.TypeIfBlock	Return "If Block"
			Case eNode.TypeIf			Return "If"
			Case eNode.TypeElse		Return "Else"
			Case eNode.TypeWhile		Return "While"
			Case eNode.TypeContinue	Return "Continue"
			Case eNode.TypeBreak	Return "Break"
			Case eNode.TypeFor		Return "For"
			Case eNode.TypeForEach	Return "ForEach"
			
			Case eNode.TypeBoolNot	Return "Bool Not"
			Case eNode.TypeBoolAnd	Return "Bool And"
			Case eNode.TypeBoolOr		Return "Bool Or"
			Case eNode.TypeBitwiseNot	Return "Bitwise Not"
			Case eNode.TypeBitwiseAnd	Return "Bitwise And"
			Case eNode.TypeBitwiseOr	Return "Bitwise Or"
			Case eNode.TypeBitwiseXor	Return "Bitwise Exclusive Or"
			Case eNode.TypeArithmeticShiftLeft	Return "Arithmetic Shift Left"
			Case eNode.TypeArithmeticShiftRight	Return "Arithmetic Shift Right"
			Case eNode.TypeLogicalShiftRight		Return "Logical Shift Right"
			
			Case eNode.TypeGreaterThan Return "Greater Than"
			Case eNode.TypeGreaterThanEqual Return "Greater Than Equal To"
			Case eNode.TypeLessThan	Return "Less Than"
			Case eNode.TypeLessThanEqual Return "Less Than Equal To"
			Case eNode.TypeEqualTo	Return "Equal To"
			Case eNode.TypeNotEqualTo	Return "Not Equal To"
			
			Case eNode.TypeFunc		Return "Func"
			Case eNode.TypeFuncCall	Return "Func Call"
			Case eNode.TypeReturn		Return "Return"
			Case eNode.TypeThis		Return "This"
			Case eNode.TypeDelete	Return "Delete"
			
			Case eNode.TypePreIncrement		Return "Pre-Increment"
			Case eNode.TypePreDecrement		Return "Pre-Decrement"
			Case eNode.TypePostIncrement	Return "Post-Increment"
			Case eNode.TypePostDecrement	Return "Post-Increment"
			
			Case eNode.TypeObject	Return "Scope Object"
			Case eNode.TypeNull		Return "Null"
			Case eNode.TypeArrayExprList	Return "Array of Expressions"
			Case eNode.TypeContains	Return "Contains"
			Case eNode.TypeForLoopList	Return "For Loop Expression List"
			Case eNode.TypeForEachItem	Return "For Each Item"
			Case eNode.TypeReference	Return "Reference"
		End
		Return "Unknown"
	End
	'#End Region
End

Class Parser
	Field scanner:Scanner
	Field tokens:List<Token>
	Field token:Token
	Field stopConsole:Bool
	Field errorCount:Int
	
	Method New( input:String )
		scanner = New Scanner()
		tokens = scanner.Scan(input)
	End
	
	Method GetToken()
		If tokens.IsEmpty()
			token = New Token(eToken.TypeEOF, "", -1, -1)
		Else
			token = tokens.First()
			tokens.RemoveFirst()
		End
	End
	
	Method PeekToken:Token()
		If tokens.IsEmpty()
			Return New Token(eToken.TypeEOF, "", -1, -1)
		End
		
		Return tokens.First()
	End
	
	Method Parse:ParserNode()
		GetToken()
		If token.type <> eToken.TypeEOF
			Return StatementList()
		End
		Return CreateParserNode(eNode.TypeNull)
	End
	
	'assignment = ident "=" (declaration | expression)
	Method Assignment:ParserNode()
		Local node:ParserNode = CreateParserNode(eNode.TypeAssignment)
		
		Ensure(eToken.TypeSymbol, "=", "Expected =")
		GetToken()
		
		stopConsole = True
		node.right = Expression()
		stopConsole = False
		
		Return node
	End
	
	Method AugmentedAssignment:ParserNode()
		Local node:ParserNode = CreateParserNode(eNode.TypeAssignment)
		
		' augmented assignments just expand the statements
		' x += 1 would become x = x + 1
		
		Select token.data
			Case "+="	node.right = CreateParserNode(eNode.TypeAdd)
			Case "-="	node.right = CreateParserNode(eNode.TypeSubtract)
			Case "*="	node.right = CreateParserNode(eNode.TypeMultiply)
			Case "/="	node.right = CreateParserNode(eNode.TypeDivide)
			Case "%="	node.right = CreateParserNode(eNode.TypeModulo)
			Case "~~/="	node.right = CreateParserNode(eNode.TypeIntDivide)
			Case "~~%="	node.right = CreateParserNode(eNode.TypeIntModulo)
			Case "&="	node.right = CreateParserNode(eNode.TypeBitwiseAnd)
			Case "|="	node.right = CreateParserNode(eNode.TypeBitwiseOr)
			Case "^="	node.right = CreateParserNode(eNode.TypeBitwiseXor)
			Case ">>="	node.right = CreateParserNode(eNode.TypeArithmeticShiftRight)
			Case "<<="	node.right = CreateParserNode(eNode.TypeArithmeticShiftLeft)
			Case ">>>="	node.right = CreateParserNode(eNode.TypeLogicalShiftRight)
		End
		
		GetToken()
		
		node.right.right = Expression()
		
		Return node
	End
	
	'while = "while" "(" expression ")" block
	Method WhileProd:ParserNode()
		Local node:ParserNode = CreateParserNode(eNode.TypeWhile)
		GetToken() '-WHILE
		
		Ensure(eToken.TypeSymbol, "(", "Expected (")
		GetToken() '-(
		
		stopConsole = True
		node.left = Expression()
		stopConsole = False
		
		Ensure(eToken.TypeSymbol, ")", "Expected )")
		GetToken() '-)
		
		If token.type = eToken.TypeSymbol And token.data = "{"
			node.right = Block()
		Else
			node.right = Statement()
		End
		
		Return node
	End
	
	'ForEachProd = "foreach" "(" expression ")" ( statement | block )
	Method ForEachProd:ParserNode()
		Local node:ParserNode = CreateParserNode(eNode.TypeForEach)
		GetToken() '- foreach
		
		Ensure(eToken.TypeSymbol, "(", "Expected (")
		GetToken() '-(
		
		stopConsole = True
		node.left = Expression()
		stopConsole = False
		
		Ensure(eToken.TypeSymbol, ")", "Expected )")
		GetToken() '-)
		
		If token.type = eToken.TypeSymbol And token.data = "{"
			node.right = Block()
		Else
			node.right = Statement()
		End
		
		Return node
	End
	
	'ForProd = "for" "(" [ expression ] ; [ expression ] ; [ expression ] ")" ( statement | block )
	Method ForProd:ParserNode()
		Local node:ParserNode = CreateParserNode(eNode.TypeFor)
		GetToken() '- for
		
		Ensure(eToken.TypeSymbol, "(", "Expected (")
		GetToken() '-(
		
		stopConsole = True
		node.left = ForExpressionList()
		stopConsole = False
		
		Ensure(eToken.TypeSymbol, ")", "Expected )")
		GetToken() '-)
		
		If token.type = eToken.TypeSymbol And token.data = "{"
			node.right = Block()
		Else
			node.right = Statement()
		End
		
		Return node
	End
	
	Method ForExpressionList:ParserNode()
		Local node:ParserNode = CreateParserNode(eNode.TypeForLoopList)
		
		If Not (token.type = eToken.TypeSymbol And (token.data = ";" Or token.data = ")"))
			stopConsole = True
			node.left = ExprList()
			stopConsole = False
		Else
			node.left = CreateParserNode(eNode.TypeArgumentList)
			node.left.left = CreateParserNode(eNode.TypeNull)
		End
		
		If token.type = eToken.TypeSymbol And token.data = ";"
			GetToken() '-,
			node.right = ForExpressionList()
		End
		
		Return node
	End
	
	'block = "{" statement_list "}"
	Method Block:ParserNode()
		Local node:ParserNode
		
		Ensure(eToken.TypeSymbol, "{", "Expected {")
		GetToken() '-{
		
		If Not (token.type = eToken.TypeSymbol And token.data = "}")
			node = StatementList()
		End
		
		Ensure(eToken.TypeSymbol, "}", "Expected }")
		GetToken '-}
		
		Return node
	End
	
	Method StatementList:ParserNode()
		Local node:ParserNode = Statement()
		
		If token.type <> eToken.TypeEOF And (token.type <> eToken.TypeSymbol And token.data <> "}")
			node.right = StatementList()
		End
		
		Return node
	End
	
	'statement_list = (assignment | while | Invocation | declaration | if | return) ";" {statement_list}
	Method Statement:ParserNode()
		Local node:ParserNode = CreateParserNode(eNode.TypeStatement)
		Local nextToken:Token = PeekToken()
		
		If token.type = eToken.TypeKeyword And token.data = "while"
			node.left = WhileProd()
		ElseIf token.type = eToken.TypeKeyword And token.data = "if"
			node.left = IfProd()
		ElseIf token.type = eToken.TypeKeyword And token.data = "return"
			node.left = ReturnStmt()
			Semi()
		ElseIf token.type = eToken.TypeKeyword And token.data = "for"
			node.left = ForProd()
		ElseIf token.type = eToken.TypeKeyword And token.data = "foreach"
			node.left = ForEachProd()
		Else
			' this makes more sense
			node.left = Expression()
			Semi()
		End
		
		Return node
	End
	
	
	
	'return = "return" (expression | declaration)
	Method ReturnStmt:ParserNode()
		Local node:ParserNode = CreateParserNode(eNode.TypeReturn)
		GetToken() '-RETURN
		
		node.left = Expression()
		
		Return node
	End
	
	Method Semi()
		If token.type <> eToken.TypeSymbol Or token.data <> ";"
			'Error "Expected ;"
			PrintError(token.line, "Expected ';' got '" + token.data + "'")
		End
		
		GetToken() '-;
	End
	
	'Invocation = ident "(" expr_list ")"
	Method Invocation:ParserNode()
		Local node:ParserNode = CreateParserNode(eNode.TypeFuncCall)
		node.left = Expression()
		
		Ensure(eToken.TypeSymbol, "(", "Expected (")
		GetToken() '-(
		
		node.right = ExprList()
		
		Ensure(eToken.TypeSymbol, ")", "Expected )")
		GetToken() '-)
		
		Return node
	End
	
	'expr_list = [(expression | declaration) {"," expr_list}]
	Method ExprList:ParserNode()
		Local node:ParserNode = CreateParserNode(eNode.TypeArgumentList)
		
		If token.type = eToken.TypeSymbol And token.data = ")"
			'No parameters
			Return Null
		End
		
		If Not (token.type = eToken.TypeSymbol And token.data = ",")
			stopConsole = True
			node.left = Expression()
			stopConsole = False
		Else
			node.left = CreateParserNode(eNode.TypeNull)
		End
		
		If token.type = eToken.TypeSymbol And token.data = ","
			GetToken() '-,
			node.right = ExprList()
		End
		
		Return node
	End
	
	'declaration = "func" "(" param_list ")" block
	Method Declaration:ParserNode()
		Local node:ParserNode = CreateParserNode(eNode.TypeFunc)
		GetToken() '-func
		
		Ensure(eToken.TypeSymbol, "(", "Expected (")
		GetToken() '-(
		
		node.left = ParamList()
		
		Ensure(eToken.TypeSymbol, ")", "Expected )")
		GetToken() '-)
		
		node.right = Block()
		
		Return node
	End
	
	'param_list = [ident {"," param_list}]
	Method ParamList:ParserNode()
		Local node:ParserNode = CreateParserNode(eNode.TypeParamList)
		
		If token.type = eToken.TypeSymbol And token.data = ")"
			'No parameters
			Return Null
		End
		
		node.left = Ident()
		
		If token.type = eToken.TypeSymbol And token.data = ","
			GetToken() '-,
			node.right = ParamList()
		End
		
		Return node
	End
	
	'VarList = [ Ident { "," VarList } ]
	Method VarList:ParserNode()
		Local node:ParserNode = CreateParserNode(eNode.TypeParamList)
		
		node.left = Ident()
		
		If token.type = eToken.TypeSymbol And token.data = ","
			GetToken() '-,
			node.right = VarList()
		End
		
		Return node
	End
	
	'ObjectBlock = "{" { [ ident = expression_list ","] } "}"
	Method ObjectBlock:ParserNode()
		Local node:ParserNode = CreateParserNode(eNode.TypeObject)
		
		Ensure(eToken.TypeSymbol, "{", "Expected {")
		GetToken() '-{
		
		If Not (token.type = eToken.TypeSymbol And token.data = "}")
			node.left = ExpressionList()
		End
		
		Ensure(eToken.TypeSymbol, "}", "Expected }")
		GetToken '-}
		
		Return node
	End
	
	Method ExpressionList:ParserNode()
		Local node:ParserNode = CreateParserNode(eNode.TypeArgumentList)
		
		If token.type = eToken.TypeKeyword And token.data = "func"
			'Declaration
			node.left = Declaration()
		Else
			stopConsole = True
			node.left = Expression()
			stopConsole = False
		End
		
		If token.type = eToken.TypeSymbol And token.data = ","
			GetToken() '-,
			node.right = ExpressionList()
		End
		
		Return node
	End
	
	'if = "if" "(" expression ")" block ["else" block]
	Method IfProd:ParserNode()
		Local node:ParserNode = CreateParserNode(eNode.TypeIf)
		GetToken() '-if
		
		Ensure(eToken.TypeSymbol, "(", "Expected (")
		GetToken() '-(
		
		stopConsole = True
		node.left = Expression()
		stopConsole = False
		
		Ensure(eToken.TypeSymbol, ")", "Expected )")
		GetToken() '-)
		
		node.right = CreateParserNode(eNode.TypeIfBlock)
		If token.type = eToken.TypeSymbol And token.data = "{"
			node.right.left = Block()
		Else
			stopConsole = True
			node.right.left = Statement()
			stopConsole = False
		End
		
		If token.type = eToken.TypeKeyword And token.data = "else"
			GetToken() '-else
			If token.type = eToken.TypeSymbol And token.data = "{"
				node.right.right = Block()
			Else
				stopConsole = True
				node.right.right = Statement()
				stopConsole = False
			End  
		End
		
		Return node
	End
	
	'Expression = ExprBoolOr [ '?' Expression ':' Expression ]
	Method Expression:ParserNode()
		Local node:ParserNode, leftNode:ParserNode
		
		leftNode = ExprBoolOr()
		
		If token.type = eToken.TypeSymbol And token.data = "?"
			GetToken()
			node = CreateParserNode(eNode.TypeIf)
			node.left = leftNode
			node.right = CreateParserNode(eNode.TypeIfBlock)
			node.right.left = CreateParserNode(eNode.TypeReturn)
			If stopConsole
				node.right.left.dataFloat = 1.0
			End
			node.right.left.left = Expression()
			If token.type = eToken.TypeSymbol And token.data = ":"
				GetToken()
				node.right.right = CreateParserNode(eNode.TypeReturn)
				If stopConsole ' what a friggen' hack job this is
					node.right.right.dataFloat = 1.0
				End
				node.right.right.left = Expression()
			Else
				PrintError(token.line, "Expected ':', got '" + token.data + "'")
			End
		ElseIf token.type = eToken.TypeSymbol And token.data[token.data.Length - 1] = "="[0]
			If token.data = "="
				node = Assignment()
				node.left = leftNode
			Else
				node = AugmentedAssignment()
				node.left = leftNode
				node.right.left = leftNode
			End
		End
		
		If node = Null Then node = leftNode
		Return node
	End
	
	'ExprBoolOr = ExprBoolAnd { '||' ExprBoolAnd }
	Method ExprBoolOr:ParserNode()
		Local node:ParserNode, leftNode:ParserNode
		
		leftNode = ExprBoolAnd()
		
		While token <> Null
			If node <> Null Then leftNode = node
			
			If token.type = eToken.TypeSymbol And token.data = "||"
				node = CreateParserNode(eNode.TypeBoolOr)
				GetToken()
			Else
				Exit
			End
			
			node.left = leftNode
			node.right = ExprBoolAnd()
		Wend
		
		If node = Null Then node = leftNode
		Return node
	End
	
	'ExprBoolAnd = ExprBitwiseOr { '&&' ExprBitwiseOr }
	Method ExprBoolAnd:ParserNode()
		Local node:ParserNode, leftNode:ParserNode
		
		leftNode = ExprBitwiseOr()
		
		While token <> Null
			If node <> Null Then leftNode = node
			
			If token.type = eToken.TypeSymbol And token.data = "&&"
				node = CreateParserNode(eNode.TypeBoolAnd)
				GetToken()
			Else
				Exit
			End
			
			node.left = leftNode
			node.right = ExprBitwiseOr()
		Wend
		
		If node = Null Then node = leftNode
		Return node
	End
	
	'ExprBitwiseOr = ExprBitwiseXor { '|' ExprBitwiseXor }
	Method ExprBitwiseOr:ParserNode()
		Local node:ParserNode, leftNode:ParserNode
		
		leftNode = ExprBitwiseXor()
		
		While token <> Null
			If node <> Null Then leftNode = node
			
			If token.type = eToken.TypeSymbol And token.data = "|"
				node = CreateParserNode(eNode.TypeBitwiseOr)
				GetToken()
			Else
				Exit
			End
			
			node.left = leftNode
			node.right = ExprBitwiseXor()
		Wend
		
		If node = Null Then node = leftNode
		Return node
	End
	
	'ExprBitwiseXor = ExprBitwiseAnd { '^' ExprBitwiseAnd }
	Method ExprBitwiseXor:ParserNode()
		Local node:ParserNode, leftNode:ParserNode
		
		leftNode = ExprBitwiseAnd()
		
		While token <> Null
			If node <> Null Then leftNode = node
			
			If token.type = eToken.TypeSymbol And token.data = "^"
				node = CreateParserNode(eNode.TypeBitwiseXor)
				GetToken()
			Else
				Exit
			End
			
			node.left = leftNode
			node.right = ExprBitwiseAnd()
		Wend
		
		If node = Null Then node = leftNode
		Return node
	End
	
	'ExprBitwiseAnd = ExprEquality { '&' ExprEquality }
	Method ExprBitwiseAnd:ParserNode()
		Local node:ParserNode, leftNode:ParserNode
		
		leftNode = ExprEquality()
		
		While token <> Null
			If node <> Null Then leftNode = node
			
			If token.type = eToken.TypeSymbol And token.data = "&"
				node = CreateParserNode(eNode.TypeBitwiseAnd)
				GetToken()
			Else
				Exit
			End
			
			node.left = leftNode
			node.right = ExprEquality()
		Wend
		
		If node = Null Then node = leftNode
		Return node
	End
	
	'ExprEquality = ExprRelational { ( '==' | '!=' ) ExprRelational }
	Method ExprEquality:ParserNode()
		Local node:ParserNode, leftNode:ParserNode
		
		leftNode = ExprRelational()
		
		While token <> Null
			If node <> Null Then leftNode = node
			
			If token.type <> eToken.TypeSymbol Then Exit
			
			If token.data = "=="
				node = CreateParserNode(eNode.TypeEqualTo)
				GetToken()
			ElseIf token.data = "!="
				node = CreateParserNode(eNode.TypeNotEqualTo)
				GetToken()
			ElseIf token.data = "==="
				node = CreateParserNode(eNode.TypeIdenticalTo)
				GetToken()
			ElseIf token.data = "!=="
				node = CreateParserNode(eNode.TypeNotIdenticalTo)
				GetToken()
			Else
				Exit
			End
			
			node.left = leftNode
			node.right = ExprRelational()
		Wend
		
		If node = Null Then node = leftNode
		Return node
	End
	
	'ExprRelational = ExprBitShift { ( '>' | '<' | '>=' | '<=' ) ExprBitShift }
	Method ExprRelational:ParserNode()
		Local node:ParserNode, leftNode:ParserNode
		
		leftNode = ExprBitShift()
		
		While token <> Null
			If node <> Null Then leftNode = node
			
			If token.type <> eToken.TypeSymbol Then Exit
			
			If token.data = ">"
				node = CreateParserNode(eNode.TypeGreaterThan)
				GetToken()
			ElseIf token.data = "<"
				node = CreateParserNode(eNode.TypeLessThan)
				GetToken()
			ElseIf token.data = ">="
				node = CreateParserNode(eNode.TypeGreaterThanEqual)
				GetToken()
			ElseIf token.data = "<="
				node = CreateParserNode(eNode.TypeLessThanEqual)
				GetToken()
			Else
				Exit
			End
			
			node.left = leftNode
			node.right = ExprBitShift()
		Wend
		
		If node = Null Then node = leftNode
		Return node
	End
	
	'ExprBitShift = ExprMathAddSub { ( '>>' | '<<' | '>>>' ) ExprMathAddSub }
	Method ExprBitShift:ParserNode()
		Local node:ParserNode, leftNode:ParserNode
		
		leftNode = ExprMathAddSub()
		
		While token <> Null
			If node <> Null Then leftNode = node
			
			If token.type <> eToken.TypeSymbol Then Exit
			
			If token.data = ">>"
				node = CreateParserNode(eNode.TypeArithmeticShiftRight)
				GetToken()
			ElseIf token.data = "<<"
				node = CreateParserNode(eNode.TypeArithmeticShiftLeft)
				GetToken()
			ElseIf token.data = ">>>"
				node = CreateParserNode(eNode.TypeLogicalShiftRight)
				GetToken()
			Else
				Exit
			End
			
			node.left = leftNode
			node.right = ExprMathAddSub()
		Wend
		
		If node = Null Then node = leftNode
		Return node
	End
	
	'ExprMathAddSub = Term { ("+" | "-") Term }
	Method ExprMathAddSub:ParserNode()
		Local node:ParserNode, leftNode:ParserNode
		
		leftNode = Term()
		
		While token <> Null
			If node <> Null Then leftNode = node
			
			If token.type <> eToken.TypeSymbol Then Exit
			
			If token.data = "+"
				node = CreateParserNode(eNode.TypeAdd)
				GetToken()
			ElseIf token.data = "-"
				node = CreateParserNode(eNode.TypeSubtract)
				GetToken()
			Else
				Exit
			End
			
			node.left = leftNode
			node.right = Term()
		End
		
		If node = Null Then Return leftNode
		Return node
	End
	
	'Term = ExprUnary { ( "*" | "/" | "%" | "~/" | "~%" ) ExprUnary }
	Method Term:ParserNode()
		Local node:ParserNode
		Local leftNode:ParserNode = ExprUnary()
		
		While token <> Null
			If node <> Null Then leftNode = node
			
			If token.type <> eToken.TypeSymbol Then Exit
			
			If token.data = "*"
				node = CreateParserNode(eNode.TypeMultiply)
				GetToken()
			ElseIf token.data = "/" Or token.data = "~~/"
				If token.data = "/"
					node = CreateParserNode(eNode.TypeDivide)
				Else
					node = CreateParserNode(eNode.TypeIntDivide)
				End
				GetToken()
			ElseIf token.data = "%" Or token.data = "~~%"
				If token.data = "%"
					node = CreateParserNode(eNode.TypeModulo)
				Else
					node = CreateParserNode(eNode.TypeIntModulo)
				End
				GetToken()
			Else
				Exit
			End
			
			node.left = leftNode
			node.right = ExprUnary()
		Wend
		
		If node = Null Then Return leftNode
		Return node
	End
	
	'ExprUnary = ExprScope { ( '+' | '-' | '~' | '!' ) ExprScope | delete VarList }
	Method ExprUnary:ParserNode()
		Local node:ParserNode
		
		If token <> Null And (token.type = eToken.TypeSymbol Or token.type = eToken.TypeKeyword)
			If token.data = "-"
				node = CreateParserNode(eNode.TypeNegate)
				GetToken()
				node.left = ExprUnary2()
			ElseIf token.data = "!"
				node = CreateParserNode(eNode.TypeBoolNot)
				GetToken()
				node.left = ExprUnary2()
			ElseIf token.data = "~~"
				node = CreateParserNode(eNode.TypeBitwiseNot)
				GetToken()
				node.left = ExprUnary2()
			ElseIf token.data = "+"
				GetToken()
				node = ExprUnary2()
			ElseIf token.data = "&"
				GetToken()
				node = CreateParserNode(eNode.TypeReference)
				node.left = ExprUnary2()
			ElseIf token.data = "++" ' prefix increment
				node = CreateParserNode(eNode.TypePreIncrement)
				GetToken()
				node.left = ExprUnary2()
			ElseIf token.data = "--" ' prefix decrement
				node = CreateParserNode(eNode.TypePreDecrement)
				GetToken()
				node.left = ExprUnary2()
			ElseIf token.data = "delete"
				node = CreateParserNode(eNode.TypeDelete)
				GetToken()
				node.left = VarList()
			ElseIf token.data = "continue"
				node = CreateParserNode(eNode.TypeContinue)
				GetToken()
			ElseIf token.data = "break"
				node = CreateParserNode(eNode.TypeBreak)
				GetToken()
			Else
				node = ExprUnary2()
			End
		Else
			node = ExprUnary2()
		End
		
		Return node
	End
	
	Method ExprUnary2:ParserNode()
		Local node:ParserNode, leftNode:ParserNode
		
		leftNode = ExprInHAs()
		
		While token <> Null
			If node <> Null Then leftNode = node
			
			If token.type <> eToken.TypeSymbol Then Exit
			
			If token.data = "++"
				node = CreateParserNode(eNode.TypePostIncrement)
				GetToken()
			ElseIf token.data = "--"
				node = CreateParserNode(eNode.TypePostDecrement)
				GetToken()
			Else
				Exit
			End
			
			node.left = leftNode
		Wend
		
		If node = Null Then node = leftNode
		Return node
	End
	
	'ExprInAs = ExprArrayAccessor { ( 'as' | 'has' | 'in' ) ExprArrayAccessor }
	Method ExprInHAs:ParserNode()
		Local node:ParserNode, leftNode:ParserNode
		
		leftNode = ExprScope()
		
		While token <> Null
			If node <> Null Then leftNode = node
			
			If token.type = eToken.TypeKeyword And token.data = "has"
				node = CreateParserNode(eNode.TypeContains)
				GetToken()
			ElseIf token.type = eToken.TypeKeyword And token.data = "as"
				node = CreateParserNode(eNode.TypeTypeCast)
				GetToken()
			ElseIf token.type = eToken.TypeKeyword And token.data = "in"
				node = CreateParserNode(eNode.TypeForEachItem)
				GetToken()
			Else
				Exit
			End
			
			node.left = leftNode
			node.right = ExprScope()
		Wend
		
		If node = Null Then node = leftNode
		Return node
	End
	
	Method ExprScope:ParserNode()
		Local node:ParserNode, leftNode:ParserNode
		
		leftNode = ExprBracketAccessor()
		
		While token <> Null
			If node <> Null Then leftNode = node
			
			If token.type = eToken.TypeSymbol And token.data = "."
				GetToken() ' .
				node = CreateParserNode(eNode.TypeScope)
				node.right = ExprBracketAccessor()
			Else
				Exit
			End
			
			node.left = leftNode
		End
		
		If node = Null Then node = leftNode
		Return node
	End
	
	Method ExprBracketAccessor:ParserNode()
		Local node:ParserNode, leftNode:ParserNode
		
		leftNode = Factor()
		
		While token <> Null
			If node <> Null Then leftNode = node
			
			If token.type = eToken.TypeSymbol And token.data = "["
				GetToken() ' [
				
				node = CreateParserNode(eNode.TypeArray)
				node.right = Expression()
				
				Ensure(eToken.TypeSymbol, "]", "Expected ], got '" + token.data + "'")
				GetToken() ' ]
			ElseIf token.type = eToken.TypeSymbol And token.data = "("
				GetToken() ' (
				
				node = CreateParserNode(eNode.TypeFuncCall)
				node.right = ExprList()
				
				Ensure(eToken.TypeSymbol, ")", "Expected ), got '" + token.data + "'")
				GetToken() ' )
			Else
				Exit
			End
			
			node.left = leftNode
		End
		
		If node = Null Then node = leftNode
		Return node
	End
	
	
	
	'Factor = int | ident | string | Invocation | "(" expression ")"
	Method Factor:ParserNode()
		Local node:ParserNode
		
		If token.type = eToken.TypeFloat
			node = Number()
		ElseIf token.type = eToken.TypeIdent
			node = Ident()
		ElseIf token.type = eToken.TypeString
			node = StringFactor()
		ElseIf token.data = "{"
			node = ObjectBlock()
		ElseIf token.type = eToken.TypeKeyword And token.data = "var"
			node = LocalVar()
		ElseIf token.type = eToken.TypeKeyword And token.data = "null"
			node = CreateParserNode(eNode.TypeNull)
			GetToken()
		ElseIf token.type = eToken.TypeKeyword And token.data = "this"
			node = ThisNode()
		ElseIf token.type = eToken.TypeKeyword And token.data = "func"
			node = Declaration()
		ElseIf token.type = eToken.TypeSymbol And token.data = "("
			GetToken() '-(
			node = Expression()
			
			Ensure(eToken.TypeSymbol, ")", "Expected ), got '" + token.data + "'")
			GetToken() '-)
		ElseIf token.type = eToken.TypeSymbol And token.data = "["
			GetToken() ' [
			
			node = CreateParserNode(eNode.TypeArrayExprList)
			
			If Not (token.type = eToken.TypeSymbol And token.data = "]")
				node.left = ExprList()
			End
			
			Ensure(eToken.TypeSymbol, "]", "Expected ], got '" + token.data + "'")
			GetToken() ' ]
		Else
			PrintError(token.line, "Expected integer, identifier, invocation or '(', got '" + token.data + "'")
		End
		
		Return node
	End
	
	Method ThisNode:ParserNode()
		Local node := CreateParserNode(eNode.TypeThis)
		GetToken()
		Return node
	End
	
	Method Number:ParserNode()
		Local node:ParserNode = CreateParserNode(eNode.TypeFloat)
		node.dataFloat = Float(token.data)
		GetToken()
		Return node
	End
	
	Method Ident:ParserNode()
		Local node:ParserNode = CreateParserNode(eNode.TypeIdent)
		node.dataStr = token.data
		GetToken()
		Return node
	End
	
	Method StringFactor:ParserNode()
		Local node:ParserNode = CreateParserNode(eNode.TypeString)
		node.dataStr = token.data
		GetToken()
		Return node
	End
	
	Method LocalVar:ParserNode()
		Local node := CreateParserNode(eNode.TypeVar)
		GetToken() ' var
		Ensure(eToken.TypeIdent, "Expected identifier, got '" + token.data + "'")
		node.left = Ident()
		Ensure(eToken.TypeSymbol, "=", "Expected assignment operator, got '" + token.data + "'")
		GetToken() ' =
		node.right = Expression()
		Return node
	End
	
	Method Ensure(type:Int, msg:String)
		If type <> token.type
			PrintError(token.line, msg)
		End
	End
	
	Method Ensure(type:Int, data:String, msg:String)
		If type <> token.type Or data <> token.data
			PrintError(token.line, msg)
		End
	End
	
	Method PrintError( line:Int, msg:String )
		errorCount += 1
		Print "MiniC N.Edition Syntax Error @ line " + (line + 1) + ": " + msg
	End
	
	Method CreateParserNode:ParserNode( type:Int )
		Return New ParserNode(type, token)
	End
	
End
