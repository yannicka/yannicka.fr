#rem
	parser.monkey
		MiniC parser
		
	Copyright (C) 2012, E.Sandberg
	Released under the GNU Lesser General Public License (LGPL)
	See license.txt for more information
#end

Import scanner

Class ParserNode
   Field type:String
   Field left:ParserNode
   Field right:ParserNode
   Field dataStr:String
   Field dataFloat:Float
   
   Method New(type:String)
      Self.type = type
   End
End

Class Parser
   Field scanner:Scanner
   Field tokens:List<Token>
   Field currentToken:Token
   
   Method New(input:String)
      scanner = New Scanner()
      tokens = scanner.Scan(input)
   End
   
   Method GetToken()
      If tokens.IsEmpty()
         currentToken = New Token("EOF")
      Else
         currentToken = tokens.First()
         tokens.RemoveFirst()
      EndIf
   End
   
   Method PeekToken:Token()
      If tokens.IsEmpty()
         Return New Token("EOF")
      EndIf
      Return tokens.First()
   End
   
   Method Parse:ParserNode()
      GetToken()
      Return StatementList()
      If currentToken.type = "EOF"
         Print "Done parsing"
      EndIf
   End
   
   'assignment = ident "=" (declaration | expression)
   Method Assignment:ParserNode()
      Local node:ParserNode = new ParserNode("ASSIGN")
      node.left = Ident()
      Ensure("EQ", "Expected =")
      GetToken() '-EQ
      If currentToken.type = "FUNC"
         node.right = Declaration()
      Else
         node.right = Expression()
      EndIf
      Return node
   End
   
   'while = "while" "(" expression ")" block
   Method WhileProd:ParserNode()
      Local node:ParserNode = New ParserNode("WHILE")
      GetToken() '-WHILE
      Ensure("LPAREN", "Expected (")
      GetToken() '-(
      node.left = Expression()
      Ensure("RPAREN", "Expected )")
      GetToken() '-)
      node.right = Block()
      Return node
   End
   
   'block = "{" statement_list "}"
   Method Block:ParserNode()
      Local node:ParserNode
      If currentToken.type <> "LBRACE"
         Error "Expected {"
      EndIf
      Ensure("LBRACE", "Expected {")
      GetToken() '-{
      node = StatementList()
      Ensure("RBRACE", "Expected }")
      GetToken '-}
      Return node
   End
   
   'statement_list = (assignment | while | invokation | declaration | if | return) ";" {statement_list}
   Method StatementList:ParserNode()
      Local node:ParserNode = New ParserNode("STMT_LIST")
      If currentToken.type = "IDENT" And PeekToken().type = "EQ"
         node.left = Assignment()
         Semi()
      ElseIf currentToken.type = "WHILE"
         node.left = WhileProd()
      ElseIf currentToken.type = "IDENT" And PeekToken().type = "LPAREN"
         node.left = Invokation()
         Semi()
      ElseIf currentToken.type = "IF"
         node.left = IfProd()
      ElseIf currentToken.type = "RETURN"
         node.left = ReturnStmt()
         Semi();
      EndIf
      
      If currentToken.type = "EOF" Or currentToken.type = "RBRACE" 'We are done, don't parse anything more
         Return node
      EndIf
      node.right = StatementList()
      Return node
   End
   
   'return = "return" (expression | declaration)
   Method ReturnStmt:ParserNode()
      Local node:ParserNode = new ParserNode("RETURN")
      GetToken() '-RETURN
      If currentToken.type = "FUNC"
         node.left = Declaration()
      ElseIf currentToken.type = "THIS"
      	 node.left = New ParserNode("THIS")
      	 GetToken() '-this
      Else
         node.left = Expression()
      EndIf
      Return node
   End
   
   Method Semi()
      If currentToken.type <> "SEMI"
         Error "Expected ;"
      EndIf
      GetToken() '-;
   End
   
   'invokation = ident "(" expr_list ")"
   Method Invokation:ParserNode()
      Local node:ParserNode = new ParserNode("INVOKE")
      node.left = Ident()
      Ensure("LPAREN", "Expected (")
      GetToken() '-(
      node.right = ExprList()
      Ensure("RPAREN", "Expected )")
      GetToken() '-)
      Return node
   End
   
   'expr_list = [(expression | declaration) {"," expr_list}]
   Method ExprList:ParserNode()
      Local node:ParserNode = new ParserNode("EXPRLIST")
      If currentToken.type = "RPAREN"
         'No parameters
         Return Null
      EndIf
      If currentToken.type = "FUNC"
         'Declaration
         node.left = Declaration()
      Else
         node.left = Expression()
      EndIf
      If currentToken.type = "COMMA"
         GetToken() '-,
         node.right = ExprList()
      EndIf
      Return node
   End
   
   'declaration = "func" "(" param_list ")" block
   Method Declaration:ParserNode()
      Local node:ParserNode = new ParserNode("DECLARE")
      GetToken() '-func
      Ensure("LPAREN", "Expected (")
      GetToken() '-(
      node.left = ParamList()
      Ensure("RPAREN", "Expected )")
      GetToken() '-)
      node.right = Block()
      Return node
   End
   
   'param_list = [ident {"," param_list}]
   Method ParamList:ParserNode()
      Local node:ParserNode = new ParserNode("PARAMLIST")
      If currentToken.type = "RPAREN"
         'No parameters
         Return Null
      EndIf
      node.left = Ident()
      If currentToken.type = "COMMA"
         GetToken() '-,
         node.right = ParamList()
      EndIf
      Return node
   End
   
   'if = "if" "(" expression ")" block ["else" block]
   Method IfProd:ParserNode()
      Local node:ParserNode = new ParserNode("IF")
      GetToken() '-if
      Ensure("LPAREN", "Expected (")
      GetToken() '-(
      node.left = Expression()
      Ensure("RPAREN", "Expected )")
      GetToken() '-)
      node.right = New ParserNode("IFBLOCK")
      node.right.left = Block()
      If currentToken.type = "ELSE"
         GetToken() '-else
         node.right.right = Block()      
      EndIf
      Return node
   End
      
   'expression = ["-"] term { ("+" | "-") term }
   Method Expression:ParserNode()
      Local node:ParserNode
	  Local leftNode:ParserNode
	  
      If currentToken.type = "MINUS"
         GetToken() '- MINUS
		 Local multNode:ParserNode = New ParserNode("MULT")
		 multNode.left = New ParserNode("NUMBER")
		 multNode.left.dataFloat = -1
		 multNode.right = Term()
		 leftNode = multNode
      Else
	  	 leftNode = Term() 'Multiply to take care of -1 and 1
	  EndIf
	  
      While currentToken.type = "PLUS" Or currentToken.type = "MINUS"
         If node <> Null Then leftNode = node
         If currentToken.type = "PLUS"
            node = New ParserNode("ADD")
            GetToken()
         Else
            node = New ParserNode("SUBTRACT")
            GetToken()
         EndIf
         node.left = leftNode
         node.right = Term()
      Wend
      If node = Null Then Return leftNode
      Return node
   End
   
   'term = prod { ("*" | "/") prod }
   Method Term:ParserNode()
      Local node:ParserNode
      Local leftNode:ParserNode = Prod()
      While currentToken.type = "MULT" Or currentToken.type = "DIV"
         If node <> Null Then leftNode = node
         If currentToken.type = "MULT"
            node = New ParserNode("MULT")
            GetToken()
         Else
            node = New ParserNode("DIV")
            GetToken()
         EndIf
         node.left = leftNode
         node.right = Prod()
      Wend
      If node = Null Then Return leftNode
      Return node
   End
   
   'prod = factor { (">" | "<" | "=") factor }
   Method Prod:ParserNode()
      Local node:ParserNode
      Local leftNode:ParserNode = Factor()
      
      While currentToken.type = "GT" Or currentToken.type = "LT" Or currentToken.type = "EQ" Or
            currentToken.type = "NEQ" Or currentToken.type = "GTEQ" Or currentToken.type = "LTEQ"
         If node <> Null Then leftNode = node
      	 node = New ParserNode(currentToken.type)
      	 If currentToken.type = "EQ"
			GetToken() '- EQ
			Ensure("EQ", "Expected =")
			GetToken() '- EQ         
         Else
         	GetToken()
         EndIf
         node.left = leftNode
         node.right = Factor()
      Wend
      If node = Null Then Return leftNode
      Return node
   End
   
   'factor = int | ident | string | invokation | "(" expression ")"
   Method Factor:ParserNode()
      Local node:ParserNode
      If currentToken.type = "NUMBER"
         node = Number()
      ElseIf currentToken.type = "IDENT" And PeekToken().type = "LPAREN"
         node = Invokation()
      ElseIf currentToken.type = "IDENT"
         node = Ident()
      ElseIf currentToken.type = "STRING"
         node = StringFactor()
      ElseIf currentToken.type = "LPAREN"
         GetToken() '-(
         node = Expression()
         Ensure("RPAREN", "Expected )")
         GetToken() '-)
      Else
         Error "Expected integer, identifier, invocation or ("
      EndIf
      Return node
   End
   
   Method Number:ParserNode()
      Local node:ParserNode = New ParserNode("NUMBER")
      node.dataFloat = Float(currentToken.data)
      GetToken()
      Return node
   End
   
   Method Ident:ParserNode()
      Local node:ParserNode = New ParserNode("IDENT")
      node.dataStr = currentToken.data
      GetToken()
      Return node
   End
   
   Method StringFactor:ParserNode()
      Local node:ParserNode = New ParserNode("STRING")
      node.dataStr = currentToken.data
      GetToken()
      Return node
   End
   
   Method Ensure(type:String, msg:String)
      If type <> currentToken.type
         Error "MiniC Syntax Error @" + currentToken.line + ": " + msg
      EndIf
   End
End