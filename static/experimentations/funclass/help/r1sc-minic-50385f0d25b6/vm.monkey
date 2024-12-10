#rem
	vm.monkey
		MiniC Runtime
		
	Copyright (C) 2012, E.Sandberg
	Released under the GNU Lesser General Public License (LGPL)
	See license.txt for more information
#end

Import parser

Class VMValue
   Const TYPE_FLOAT:Int = 0, TYPE_STRING:Int = 1, TYPE_FUNC:Int = 2, TYPE_DELEGATE:Int = 3, TYPE_OBJECT:Int = 4, TYPE_SCOPE:Int = 5
   Field type:Int
   Field dataStr:String
   Field dataFloat:Float
   Field dataObject:Object
   Field dataScope:VMScope
         
   'For functions
   Field dataParams:List<String>
   Field dataBody:ParserNode
   
   Field dataDelegate:IVMDelegate
   
   Function CreateFloat:VMValue(data:Float)
      Local vmValue:VMValue = new VMValue()
      vmValue.type = TYPE_FLOAT
      vmValue.dataFloat = data
      Return vmValue
   End
   
   Function CreateString:VMValue(data:String)
      Local vmValue:VMValue = new VMValue()
      vmValue.type = TYPE_STRING
      vmValue.dataStr = data
      Return vmValue
   End
   
   Function CreateObject:VMValue(data:Object)
      Local vmValue:VMValue = new VMValue()
      vmValue.type = TYPE_OBJECT
      vmValue.dataObject = data
      Return vmValue
   End
   
   Function CreateScope:VMValue(data:VMScope)
      Local vmValue:VMValue = new VMValue()
      vmValue.type = TYPE_SCOPE
      vmValue.dataScope = data
      Return vmValue
   End
   
   Function CreateFunc:VMValue(params:List<String>, body:ParserNode)
      Local vmValue:VMValue = New VMValue()
      vmValue.type = TYPE_FUNC
      vmValue.dataParams = params
      vmValue.dataBody = body
      Return vmValue
   End
   
   Function CreateDelegate:VMValue(delegate:IVMDelegate)
      Local vmValue:VMValue = New VMValue()
      vmValue.type = TYPE_DELEGATE
      vmValue.dataDelegate = delegate
      Return vmValue
   End
   
End

Class VMScope
   Field Variables:StringMap<VMValue>
   Field parent:VMScope
   Field body:ParserNode
   
   Method New(parent:VMScope, body:ParserNode)
      Self.parent = parent
      Self.body = body
      Variables = New StringMap<VMValue>
   End
   
   Method Register(name:String, delegate:IVMDelegate)
      SetVariable(name, VMValue.CreateDelegate(delegate))
   End
   
   Method IsDeclared:Bool(name:String)
   	  Return GetVariable(name) <> Null
   End
   
   Method Call:VMValue(name:String, params:VMValue[])
      Local func:VMValue = GetVariable(name)
      If func = Null
         RuntimeErr("Call Error: Function " + name + " not declared")
      EndIf
      Local scope:VMScope = new VMScope(Self, func.dataBody)
      Local varCount:Int = 0
      If func.dataParams <> Null
         For Local param:String = EachIn func.dataParams
            If varCount <= params.Length - 1
               scope.SetVariable(param, params[varCount])
            Else
               scope.SetVariable(param, VMValue.CreateFloat(0))
            EndIf
            varCount += 1
         Next
      EndIf
      Local returnValue:VMValue = scope.Exec()
      scope = Null
      Return returnValue
   End
   
   Method Exec:VMValue()
      'TODO: Execute body
      Local node:ParserNode = body
      Repeat
         If node.left.type = "ASSIGN"
            Assignment(node.left)
         ElseIf node.left.type = "WHILE"
            WhileStmt(node.left)
         ElseIf node.left.type = "IF"
            IfStmt(node.left)
         ElseIf node.left.type = "INVOKE"
            Invoke(node.left)
         ElseIf node.left.type = "RETURN"
            Return ReturnStmt(node.left)
         Else
            RuntimeErr("Statement not implemented: " + node.left.type)
         EndIf
         node = node.right
      Until node = Null
      Return Null
   End
   
   Method ReturnStmt:VMValue(node:ParserNode)
      If node.left.type = "DECLARE"
         Return Declare(node.left)
      ElseIf node.left.type = "THIS"
      	 Return ThisReturn(node.left)
      Else
         Return Eval(node.left)
      EndIf
   End
   
   Method Invoke:VMValue(node:ParserNode)
      Local varName:String = Ident(node.left)
      Local func:VMValue = GetVariable(varName)
      If func = Null
         RuntimeErr("Function not declared: " + varName)
      EndIf
      Local exprList:VMValue[]
      If node.right <> Null And node.right.type = "EXPRLIST"
         exprList = ExprList(node.right).ToArray()
      EndIf
      Local scope:VMScope
      Local returnValue:VMValue
      If func.type = VMValue.TYPE_FUNC      
         returnValue = Call(varName, exprList)
      ElseIf func.type = VMValue.TYPE_DELEGATE
         scope = new VMScope(Self, Null)
         returnValue = func.dataDelegate.Exec(scope, exprList)
      Else
         RuntimeErr("Variable is not a function: " + varName)
      EndIf
      scope = Null
      Return returnValue
   End
   
   Method ExprList:List<VMValue>(node:ParserNode)
      Local params:List<VMValue> = New List<VMValue>
      Repeat
         If node.left.type = "DECLARE"
            params.AddLast(Declare(node.left))
         Else
            params.AddLast(Eval(node.left))
         EndIf
         node = node.right
      Until node = Null
      Return params
   End
   
   Method IfStmt(node:ParserNode)
      Local ifNode:ParserNode = node.right.left
      Local elseNode:ParserNode = node.right.right
      Local scope:VMScope
      If Eval(node.left).dataFloat <> 0
         scope = new VMScope(Self, ifNode)
         scope.Exec()
      Else
         If elseNode <> Null
            scope = new VMScope(Self, elseNode)
            scope.Exec()
         EndIf
      EndIf
      scope = Null
   End
   
   Method WhileStmt(node:ParserNode)
      Local scope:VMScope = new VMScope(Self, node.right)
      While(scope.Eval(node.left).dataFloat <> 0)
         scope.Exec()
      Wend
      scope = Null
   End
   
   Method Assignment(node:ParserNode)
      Local varName:String = Ident(node.left)
      If node.right.type = "DECLARE"
         SetVariable(varName, Declare(node.right))
      Else
         Local value:VMValue = Eval(node.right)
         SetVariable(varName, value)
      EndIf
   End
   
   Method ThisReturn:VMValue(node:ParserNode)
   	  Return VMValue.CreateScope(Self)
   End   
   
   'left: PARAMLIST -> right: STMT_LIST
   Method Declare:VMValue(node:ParserNode)
      Local params:List<String>
      Local body:ParserNode = node.right
      If node.left <> Null
         params = ParamList(node.left)
      EndIf
      Return VMValue.CreateFunc(params, body)
   End
   
   Method ParamList:List<String>(node:ParserNode)
      Local params:List<String> = New List<String>
      Repeat
         params.AddLast(Ident(node.left))
         node = node.right
      Until node = Null
      Return params
   End
   
   Method Eval:VMValue(node:ParserNode)
      If node.type = "ADD"
         Return Add(node)
      ElseIf node.type = "SUBTRACT"
         Return Subtract(node)
      ElseIf node.type = "DIV"
         Return Div(node)
      ElseIf node.type = "MULT"
         Return Mult(node)
      ElseIf node.type =  "LT"
         Return LessThan(node)
      ElseIf node.type =  "GT"
         Return GreaterThan(node)
      ElseIf node.type =  "LTEQ"
         Return LessThanEq(node)
      ElseIf node.type =  "GTEQ"
         Return GreaterThanEq(node)
	  ElseIf node.type =  "EQ"
         Return Eq(node)
	  ElseIf node.type =  "NEQ"
         Return NotEq(node)
      ElseIf node.type = "STRING"
         Return VMValue.CreateString(node.dataStr)
      ElseIf node.type = "NUMBER"
         Return VMValue.CreateFloat(node.dataFloat)
      ElseIf node.type = "INVOKE"
         Return Invoke(node)
      ElseIf node.type = "IDENT"
         Local var:VMValue = GetVariable(node.dataStr)
         If var = Null
            RuntimeErr("Variable '" + node.dataStr + "' not assigned")
         EndIf
         Return var
      Else
         RuntimeErr("Missing Eval-rule for " + node.type)
      EndIf
   End
   
   Method Add:VMValue(node:ParserNode)
      Local left:VMValue = Eval(node.left)
      Local right:VMValue = Eval(node.right)
      If left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
         'One is string
         Local result:String
         If left.type = VMValue.TYPE_STRING
            result = left.dataStr
         Else
            result = String(left.dataFloat)
         EndIf
         If right.type = VMValue.TYPE_STRING
            result += right.dataStr
         Else
            result += String(right.dataFloat)
         EndIf
         Return VMValue.CreateString(result)
      Else
         'Both float
         Return VMValue.CreateFloat(left.dataFloat + right.dataFloat)
      EndIf
   End
   
   Method Subtract:VMValue(node:ParserNode)
      Local left:VMValue = Eval(node.left)
      Local right:VMValue = Eval(node.right)
      If left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
         'One is string
         RuntimeErr("- operator is not valid for strings")
      Else
         'Both float
         Return VMValue.CreateFloat(left.dataFloat - right.dataFloat)
      EndIf
   End
   
   Method Div:VMValue(node:ParserNode)
      Local left:VMValue = Eval(node.left)
      Local right:VMValue = Eval(node.right)
      If left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
         'One is string
         RuntimeErr("/ operator is not valid for strings")
      Else
         'Both float
         Return VMValue.CreateFloat(left.dataFloat / right.dataFloat)
      EndIf
   End
   
   Method Mult:VMValue(node:ParserNode)
      Local left:VMValue = Eval(node.left)
      Local right:VMValue = Eval(node.right)
      If left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
         'One is string
         RuntimeErr("* operator is not valid for strings")
      Else
         'Both float
         Return VMValue.CreateFloat(left.dataFloat * right.dataFloat)
      EndIf
   End
   
   Method LessThan:VMValue(node:ParserNode)
      Local left:VMValue = Eval(node.left)
      Local right:VMValue = Eval(node.right)
      If left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
         'One is string
         RuntimeErr("< operator is not valid for strings")
      Else
         'Both float
         If left.dataFloat < right.dataFloat
            Return VMValue.CreateFloat(1)
         Else
            Return VMValue.CreateFloat(0)
         EndIf
      EndIf
   End
   
   Method GreaterThan:VMValue(node:ParserNode)
      Local left:VMValue = Eval(node.left)
      Local right:VMValue = Eval(node.right)
      If left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
         'One is string
         RuntimeErr("> operator is not valid for strings")
      Else
         'Both float
         If left.dataFloat > right.dataFloat
            Return VMValue.CreateFloat(1)
         Else
            Return VMValue.CreateFloat(0)
         EndIf
      EndIf
   End
   
   Method GreaterThanEq:VMValue(node:ParserNode)
      Local left:VMValue = Eval(node.left)
      Local right:VMValue = Eval(node.right)
      If left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
         'One is string
         RuntimeErr(">= operator is not valid for strings")
      Else
         'Both float
         If left.dataFloat >= right.dataFloat
            Return VMValue.CreateFloat(1)
         Else
            Return VMValue.CreateFloat(0)
         EndIf
      EndIf
   End
   
   Method LessThanEq:VMValue(node:ParserNode)
      Local left:VMValue = Eval(node.left)
      Local right:VMValue = Eval(node.right)
      If left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
         'One is string
         RuntimeErr("<= operator is not valid for strings")
      Else
         'Both float
         If left.dataFloat <= right.dataFloat
            Return VMValue.CreateFloat(1)
         Else
            Return VMValue.CreateFloat(0)
         EndIf
      EndIf
   End
   
   Method Eq:VMValue(node:ParserNode)
      Local left:VMValue = Eval(node.left)
      Local right:VMValue = Eval(node.right)
      If left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
         'One is string
         'TODO: Implement string comparsion
         If left.type <= VMValue.TYPE_STRING And right.type <= VMValue.TYPE_STRING
             If left.type = VMValue.TYPE_FLOAT
			 	left.dataStr = String(left.dataFloat)
             ElseIf right.type = VMValue.TYPE_FLOAT
			    right.dataStr = String(right.dataFloat)
			 EndIf
             
             Return VMValue.CreateFloat(Int(left.dataStr = right.dataStr))
		 EndIf
		 RuntimeErr("== operator can only compare strings to strings and numbers")
      Else
         'Both float
         If left.dataFloat = right.dataFloat
            Return VMValue.CreateFloat(1)
         Else
            Return VMValue.CreateFloat(0)
         EndIf
      EndIf
   End
   
   Method NotEq:VMValue(node:ParserNode)
      Local left:VMValue = Eval(node.left)
      Local right:VMValue = Eval(node.right)
      If left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
         'One is string
         'TODO: Implement string comparsion
         If left.type <= VMValue.TYPE_STRING And right.type <= VMValue.TYPE_STRING
             If left.type = VMValue.TYPE_FLOAT
			 	left.dataStr = String(left.dataFloat)
             ElseIf right.type = VMValue.TYPE_FLOAT
			    right.dataStr = String(right.dataFloat)
			 EndIf
             
             Return VMValue.CreateFloat(Int(left.dataStr <> right.dataStr))
		 EndIf
		 RuntimeErr("!= operator can only compare strings to strings and numbers")
      Else
         'Both float
         If left.dataFloat <> right.dataFloat
            Return VMValue.CreateFloat(1)
         Else
            Return VMValue.CreateFloat(0)
         EndIf
      EndIf
   End
   
   Method Ident:String(node:ParserNode)
      Return node.dataStr
   End
   
   Method SetVariable(name:String, data:VMValue)
      Local var:VMValue = GetVariable(name)
      If var = Null
         Variables.Add(name, data)
      Else
         var.type = data.type
         var.dataBody = data.dataBody
         var.dataFloat = data.dataFloat
         var.dataParams = data.dataParams
         var.dataStr = data.dataStr
      EndIf
   End
   
   Method GetVariable:VMValue(name:String)
      If Variables.Contains(name)
         Return Variables.Get(name)
      EndIf
      If parent <> Null
         Return parent.GetVariable(name)
      EndIf
      Return Null 'Variable not initialized yet
   End
   
   Method RuntimeErr(msg:String)
      Error "MiniC Runtime Error: " + msg
   End
End

Class VM
   Field globalScope:VMScope
   
   'TODO: Allow override of global script
   Method New()
      globalScope = LoadScript("false=0; true=1;")
      globalScope.Exec()
   End
   
   Method LoadScript:VMScope(input:String, parentScope:VMScope = Null)
      If parentScope = Null
	  	parentScope = globalScope
	  EndIf
	  
      Local parser:Parser = new Parser(input)
      Return New VMScope(parentScope, parser.Parse())
   End
End

Interface IVMDelegate
   Method Exec:VMValue(scope:VMScope, params:VMValue[])
End
