#rem
	vm.monkey
		MiniC Runtime
		
	Copyright (C) 2012-2014, E.Sandberg
	Released under the GNU Lesser General Public License (LGPL)
	See license.txt for more information
	
	Contributing Author(s): E.Sandberg, Anders Sahlin, Nicholas Grant
#end

Private
Import interfaces
Import parser
Public

Class VMValueStack Extends Stack<VMValue> Implements IVMObjectInterface
	Method New( data:VMValue[] )
		Super.New(data)
	End
	
	Method Equals:Bool( lhs:VMValue, rhs:VMValue )
		
	End
	
	Method VMSet:VMValue( scope:VMScope, varName:String, data:VMValue )
		Select varName
			Case "length"	Length = Int(data.dataFloat)
		End
		
		Return Null
	End
	
	Method VMGet:VMValue( scope:VMScope, varName:String )
		Select varName
			Case "length"	Return VMValue.CreateFloat(Length)
			Case "top"	Return Top()
		End
		
		Return Null
	End
	
	Method VMCall:VMValue( scope:VMScope, varName:String, params:VMValue[] )
		Select varName
			Case "clear"	Clear()
			Case "isEmpty"	Return VMValue.CreateFloat(IsEmpty())
			Case "contains"	Return VMValue.CreateFloat(Contains(params[0]))
			Case "push"		Push(params[0])
			Case "pop"		Return Pop()
			Case "insert"	Insert(params[0].dataFloat, params[1])
			Case "remove"	Remove(params[0].dataFloat)
		End
		
		Return Null
	End
End

Class VMValue
	Const TYPE_FLOAT:Int = 0, TYPE_STRING:Int = 1, TYPE_FUNC:Int = 2
	Const TYPE_DELEGATE:Int = 3, TYPE_OBJECT:Int = 4, TYPE_SCOPE:Int = 5
	Const TYPE_SPECIAL:Int = 6 ' I'm special
	Const TYPE_NULL:Int = 7, TYPE_ARRAY:Int = 8
	Field type:Int
	Field dataStr:String
	Field dataFloat:Float
	Field dataObject:Object
	Field dataScope:VMScope
	
	Field dataMonkeyObject:IVMObjectInterface
	Field dataMonkeyName:String
	
	'For functions
	Field dataParams:List<String>
	Field dataBody:ParserNode
	
	Field dataDelegate:IVMDelegate
	Field isReference:Bool
	
	Method Clone:VMValue()
		Local val := New VMValue()
		val.type = type
		val.dataStr = dataStr
		val.dataFloat = dataFloat
		val.dataObject = dataObject
		val.dataScope = dataScope
		val.dataMonkeyObject = dataMonkeyObject
		val.dataMonkeyName = dataMonkeyName
		val.dataParams = dataParams
		val.dataBody = dataBody
		val.dataDelegate = dataDelegate
		Return val
	End
	
	Method Nullify:Void()
		dataBody = Null
		dataDelegate = Null
		dataMonkeyName = ""
		dataMonkeyObject = Null
		dataObject = Null
		dataParams = Null
		dataStr = ""
		type = -1
	End
	
	Function CreateFloat:VMValue(data:Float)
		Local vmValue:VMValue = new VMValue()
		vmValue.type = TYPE_FLOAT
		vmValue.dataFloat = data
		Return vmValue
	End
	
	Function CreateFloat:VMValue(data:Bool) ' overload!
		Local vmValue:VMValue = new VMValue()
		vmValue.type = TYPE_FLOAT
		vmValue.dataFloat = Float(Int(data))
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
	
	Function CreateSpecial:VMValue( data:Int )
		Local vmValue:VMValue = New VMValue()
		vmValue.type = TYPE_SPECIAL
		vmValue.dataFloat = data
		Return vmValue
	End
	
	Function CreateSpecial:VMValue( dataFloat:Float, dataStr:String, dataScope:VMScope )
		Local vmValue:VMValue = New VMValue()
		vmValue.type = TYPE_SPECIAL
		vmValue.dataFloat = dataFloat
		vmValue.dataStr = dataStr
		vmValue.dataScope = dataScope
		Return vmValue
	End
	
	Function CreateNull:VMValue()
		Local vmValue := New VMValue()
		vmValue.type = TYPE_NULL
		Return vmValue
	End
	
	Function CreateArray:VMValue( data:VMValue[] )
		Local vmValue:VMValue = New VMValue()
		Local arr := New VMValueStack(data)
		vmValue.type = TYPE_ARRAY
		vmValue.dataObject = arr
		Return vmValue
	End
	
	#If CONFIG = "debug"
	Method GetDebug:String()
		Select type
			Case TYPE_FLOAT		Return "(float) => " + dataFloat
			Case TYPE_STRING	Return "(string) => '" + dataStr + "'"
			Case TYPE_FUNC		Return "(func) => func"
			Case TYPE_DELEGATE	Return "(delegate) => interface"
			Case TYPE_OBJECT	Return "(internal object) => object"
			Case TYPE_SCOPE		Return "(scope) => scope"
			Case TYPE_SPECIAL	Return "(special) => " + dataFloat + ", '" + dataStr + "'"
			Case TYPE_NULL		Return "(null) => {null}"
			Case TYPE_ARRAY		Return "(array) => " 'Note: TODO: Add array contents display
		End
		Return ""
	End
	
	Method PrintDebug()
		Print GetDebug()
	End
	#EndIf
	
	Function Valid:Bool( value:VMValue )
		If value
			Select value.type
				Case TYPE_FLOAT		Return True
				Case TYPE_STRING	Return True
				Case TYPE_FUNC		Return value.dataBody <> Null And value.dataParams <> Null
				Case TYPE_DELEGATE	Return value.dataDelegate <> Null
				Case TYPE_OBJECT, TYPE_ARRAY
					Return value.dataObject <> Null
				Case TYPE_SCOPE		Return value.dataScope <> Null
				Case TYPE_SPECIAL, TYPE_NULL
					Return True
			End
		End
		Return False
	End
	
	Function NotValid:Bool( value:VMValue )
		Return Not Valid(value)
	End
End

Class VMScope
	Field Variables:StringMap<VMValue>
	Field parent:VMScope
	Field body:ParserNode
	Field bailRequested:Bool
	Field fileName:String
	
	Method BailRequested:Bool()
		If parent Then Return parent.BailRequested()
		Return bailRequested
	End
	
	Method RequestBail:Bool()
		If parent Then Return parent.RequestBail()
		bailRequested = True
		Return True
	End
	
	Method ClearBailRequest:Void()
		If parent
			parent.ClearBailRequest()
		Else
			bailRequested = False
		End
	End
	
	Method GetFileName:String()
		If fileName <> ""
			Return fileName
		End
		If parent <> Null
			Return parent.GetFileName()
		End
		Return ""
	End
	
	Method New(parent:VMScope, body:ParserNode)
		Self.parent = parent
		Self.body = body
		Variables = New StringMap<VMValue>
	End
	
	Function TypeToText:String( type:Int )
		Select type
			Case 0 Return "Float"
			Case 1 Return "String"
			Case 2 Return "Func"
			Case 3 Return "Delegate"
			Case 4 Return "Object"
			Case 5 Return "Scope"
			Case 6 Return "Special"
			Case 7 Return "Null"
			Case 8 Return "Array"
		End
		Return "Undefined"
	End
	
	Method Register:Void(name:String, delegate:IVMDelegate)
		Variables.Set(name, VMValue.CreateDelegate(delegate))
	End
	
	Method Register:Void(name:String, value:VMValue)
		Variables.Set(name, value)
	End
	
	Method RegisterGlobal:Void( name:String, delegate:IVMDelegate )
		RegisterGlobal(name, VMValue.CreateDelegate(delegate))
	End
	
	Method RegisterGlobal:Void( name:String, value:VMValue )
		Local globScope:VMScope = Self
		
		While globScope.parent <> Null
			globScope = globScope.parent
		End
		
		If Not globScope.Variables.Contains(name)
			globScope.Variables.Set(name, value)
		End
	End
	
	Method IsDeclared:Bool(name:String)
		Return GetVariable(name) <> Null
	End
	
	Method Call:VMValue(name:String, params:VMValue[])
		Local func:VMValue = GetVariable(name)
		
		If func = Null
			Return RuntimeErr("Call Error: Function " + name + " not declared")
		End
		
		Return Call(func, params)
	End
	
	Method Call:VMValue( func:VMValue, params:VMValue[] )
		Local scope:VMScope = New VMScope(Self, func.dataBody)
		Local varCount:Int = 0
		
		Local args:VMValue[]
		
		If func.dataParams <> Null
			args = New VMValue[Max(func.dataParams.Count(), params.Length)]
			For Local param:String = EachIn func.dataParams
				If varCount <= params.Length - 1
					' argument variables need to be set directly into
					' this scope otherwise problems can arise
					Local var:VMValue = params[varCount]
					If var.isReference
						var.isReference = False
					Else
						var = var.Clone()
					End
					
					args[varCount] = var
					scope.Variables.Set(param, var)
				Else
					args[varCount] = VMValue.CreateNull()
					scope.Variables.Set(param, args[varCount])
				End
				
				varCount += 1
			Next
		Else
			args = New VMValue[params.Length]
		End
		
		While varCount < params.Length
			Local var:VMValue = params[varCount]
			If var.isReference
				var.isReference = False
			Else
				var = var.Clone()
			End
			
			args[varCount] = var
			varCount += 1
		Wend
		
		scope.Variables.Set("arguments", VMValue.CreateArray(args))
		
		Local returnValue:VMValue = scope.Exec()
		scope = Null
		Return returnValue
	End
	
	Function ValueNull:Bool( value:VMValue )
		Return value = Null Or value.type = VMValue.TYPE_NULL
	End
	
	Function ValueNotNull:Bool( value:VMValue )
		Return value And value.type <> VMValue.TYPE_NULL
	End
	
	Method Exec:VMValue()
		'TODO: Execute body
		#If CONFIG = "debug"
		If BailRequested() Then body = Null; Return VMValue.CreateNull()
		#End
		Local node:ParserNode = body
		If node <> Null And node.left <> Null
			Repeat
				#If CONFIG = "debug"
				If BailRequested() Then body = Null; Return VMValue.CreateNull()
				#End
				If node.left.type = eNode.TypeAssignment
					Assignment(node.left)
				ElseIf node.left.type = eNode.TypeVar
					LocalAssignment(node.left)
				ElseIf node.left.type = eNode.TypeWhile
					Local ret := WhileStmt(node.left)
					If ValueNotNull(ret) Then Return ret
				ElseIf node.left.type = eNode.TypeFor
					Local ret := ForStmt(node.left)
					If ValueNotNull(ret) Then Return ret
				ElseIf node.left.type = eNode.TypeForEach
					Local ret := ForEachStmt(node.left)
					If ValueNotNull(ret) Then Return ret
				ElseIf node.left.type = eNode.TypeIf
					Local ret := IfStmt(node.left)
					If ValueNotNull(ret) Then Return ret
				ElseIf node.left.type = eNode.TypeFuncCall
					Local ret := Invoke(node.left)
					WriteToConsole(ret)
					'If ret Then Return ret
				ElseIf node.left.type = eNode.TypeDelete
					DeleteStmt(node.left)
				ElseIf node.left.type = eNode.TypeScope
					If node.type = eNode.TypeReturn
						Local ret := ScopeAccessor(node.left)
						Return ret
					Else
						ScopeAccessor(node.left)
					End
					'Print ParserNode.NodeTypeToText(ret.type)
					'If ret Then Return ret
				ElseIf node.left.type = eNode.TypeObject
					ObjectStmt(node.left)
				ElseIf node.left.type = eNode.TypeReturn
					Return ReturnStmt(node.left)
				ElseIf node.left.type = eNode.TypeContinue
					Return VMValue.CreateSpecial(-1.0)
				ElseIf node.left.type = eNode.TypeBreak
					Return VMValue.CreateSpecial(0.0)
				Else
					Local value := Eval(node.left)
					If node.type = eNode.TypeReturn
						If node.dataFloat <> 1.0
							WriteToConsole(value)
						End
						Return value
					Else
						' when not from a return
						WriteToConsole(value)
					End
				EndIf
				#If CONFIG = "debug"
				If BailRequested() Then body = Null; Return VMValue.CreateNull()
				#End
				node = node.right
			Until node = Null
		End
		Return Null
	End
	
	Method WriteToConsole:Void( value:VMValue )
		If value = Null Then Return
		
		If value.type = VMValue.TYPE_STRING
			VM.Console.Write(value.dataStr)
		ElseIf value.type = VMValue.TYPE_FLOAT
			VM.Console.Write(value.dataFloat)
		ElseIf value.type = VMValue.TYPE_OBJECT
			VM.Console.Write("{object}")
		ElseIf value.type = VMValue.TYPE_OBJECT
			VM.Console.Write("{func}")
		End
	End
	
	Method NewArray:VMValue( node:ParserNode )
		#If CONFIG = "debug"
		PushToCallStack(node)
		#EndIf
		
		Local data := ExprList(node.left).ToArray()
		Local returnValue := VMValue.CreateArray(data)
		#If CONFIG = "debug"
		If Not BailRequested() Then PopCallStack()
		#EndIf
		Return returnValue
	End
	
	Method ObjectStmt:VMValue( node:ParserNode )
		Local scope:VMScope = New VMScope(Self, node)
		
		#If CONFIG = "debug"
		PushToCallStack(node)
		#EndIf
		
		node = node.left
		
		While node <> Null
			scope.Eval(node.left)
			node = node.right
		End
		
		Local returnValue := VMValue.CreateScope(scope)
		#If CONFIG = "debug"
		If Not BailRequested() Then PopCallStack()
		#EndIf
		Return returnValue
	End
	
	Method ReturnStmt:VMValue(node:ParserNode)
		#If CONFIG = "debug"
		PushToCallStack(node)
		#EndIf
		Local returnValue := Eval(node.left)
		#If CONFIG = "debug"
		If Not BailRequested() Then PopCallStack()
		#EndIf
		Return returnValue
	End
	
	Method Invoke:VMValue( node:ParserNode, exprScope:VMScope = Null )
		#If CONFIG = "debug"
		PushToCallStack(node)
		#EndIf
		
		Local func:VMValue = Eval(node.left)
		
		If func = Null Then Return RuntimeErr("Function not declared")
		
		Local exprList:VMValue[]
		
		If node.right <> Null And node.right.type = eNode.TypeArgumentList
			If exprScope = Null Then exprScope = Self
			exprList = exprScope.ExprList(node.right).ToArray()
		End
		
		Local scope:VMScope
		Local returnValue:VMValue
		
		If func.type = VMValue.TYPE_FUNC
			returnValue = Call(func, exprList)
		ElseIf func.type = VMValue.TYPE_DELEGATE
			scope = New VMScope(Self, Null)
			If func.dataDelegate = Null
				Return RuntimeErr("Internal delegate does not exist in context")
			End
			returnValue = func.dataDelegate.Exec(scope, exprList)
		Else
			Return RuntimeErr("Variable is not a function. Type given was " + TypeOfDelegate.TypeToText(func.type))
		End
		
		scope = Null
		#If CONFIG = "debug"
		If Not BailRequested() Then PopCallStack()
		#EndIf
		Return returnValue
	End
	
	Method InvokeObject:VMValue( node:ParserNode, vmObject:IVMObjectInterface )
		Local varName:String, func:VMValue
		
		#If CONFIG = "debug"
		PushToCallStack(node)
		#EndIf
		
		varName = Ident(node.left)
		
		Local exprList:VMValue[]
		
		If node.right <> Null And node.right.type = eNode.TypeArgumentList
			exprList = ExprList(node.right).ToArray()
		End
		
		Local returnValue := vmObject.VMCall(Self, varName, exprList)
		#If CONFIG = "debug"
		If Not BailRequested() Then PopCallStack()
		#EndIf
		Return returnValue
	End
	
	Method ExprList:List<VMValue>(node:ParserNode)
		Local params:List<VMValue> = New List<VMValue>()
		
		Repeat
			params.AddLast(Eval(node.left))
			node = node.right
		Until node = Null
		
		Return params
	End
	
	Method ArrayAccessor:VMValue( node:ParserNode )
		Local left:VMValue, right:VMValue
		Local returnValue:VMValue
		
		left = Eval(node.left)
		
		If ValueNull(left)
			Return RuntimeErr("Can't access array with null object")
		End
		
		If left.type = VMValue.TYPE_SCOPE
			right = Eval(node.right)
			Local key:String
			Local scope:VMScope = left.dataScope
			
			If right.type = VMValue.TYPE_STRING
				key = right.dataStr
			ElseIf right.type = VMValue.TYPE_FLOAT
				key = String(Int(right.dataFloat))
			Else
				Return RuntimeErr("Array keys can only be strings. Type '" + TypeToText(right.type) + "' is invalid.")
			End
			
			If scope.Variables.Contains(key)
				returnValue = scope.Variables.Get(key)
			Else
				returnValue = VMValue.CreateNull()
				scope.Variables.Set(key, returnValue)
			End
		ElseIf left.type = VMValue.TYPE_ARRAY
			right = Eval(node.right)
			Local index:Int
			Local arr:VMValueStack = VMValueStack(left.dataObject)
			
			If right.type <> VMValue.TYPE_FLOAT
				Return RuntimeErr("Array cannot be accessed with strings")
			Else
				index = Int(right.dataFloat)
			End
			
			returnValue = arr.Get(index)
		Else
			Return RuntimeErr("Array accessors currently do not support any type except scopes")
		End
		
		Return returnValue
	End
	
	Method ScopeAccessor:VMValue( node:ParserNode, fromAssignment:Bool = False )
		Local left:VMValue, right:VMValue
		Local returnValue:VMValue
		
		#If CONFIG = "debug"
		PushToCallStack(node)
		#EndIf
		
		If node.left.type = eNode.TypeThis
			' very special case
			If parent Then Return parent.Eval(node.right)
			Return VMValue.CreateNull()
		End
		
		left = Eval(node.left)
		
		If ValueNull(left)
			Return RuntimeErr("Can't access scope with null object")
		End
		
		If left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Scope found does not exist, this is likely due to a non-existant variable")
			End
			
			If node.right.type = eNode.TypeIdent
				Local scope:VMScope, varName:String
				scope = left.dataScope
				varName = Ident(node.right)
				
				If scope.Variables.Contains(varName)
					returnValue = scope.Variables.Get(varName)
				ElseIf fromAssignment
					returnValue = VMValue.CreateNull()
					scope.Variables.Set(varName, returnValue)
				Else
					Return RuntimeErr("Variable '" + varName + "' does not exist in scope")
				End
			ElseIf node.right.type = eNode.TypeFuncCall
				Local scope:VMScope = Self
				If ValueNotNull(left) Then scope = left.dataScope
				returnValue = scope.Invoke(node.right, Self)
			Else
				Return RuntimeErr("Can't access scope without identifier")
			End
		ElseIf left.type = VMValue.TYPE_OBJECT Or left.type = VMValue.TYPE_ARRAY
			Local interfacer := IVMObjectInterface(left.dataObject)
			Local varName:String
			
			If interfacer
				If node.right.type = eNode.TypeIdent
					varName = Ident(node.right)
					
					Local var := interfacer.VMGet(Self, varName)
					If var <> Null
						var.dataMonkeyObject = interfacer
						var.dataMonkeyName = varName
					End
					returnValue = var
				ElseIf node.right.type = eNode.TypeFuncCall
					returnValue = InvokeObject(node.right, interfacer)
				Else
					Return RuntimeErr("Internal object does not know how to interface with MiniC this way")
				End
			Else
				Return RuntimeErr("Internal object does not know how to interface with MiniC")
			End
		ElseIf left.type = VMValue.TYPE_STRING
			Local str := left.dataStr
			If node.right.type = eNode.TypeIdent
				Local propName:String = Ident(node.right)
				
				If propName = "length"
					returnValue = VMValue.CreateFloat(str.Length)
				Else
					returnValue = VMValue.CreateNull()
				End
			ElseIf node.right.type = eNode.TypeFuncCall
				returnValue = StrMethod(str, node.right)
			End
		Else
			Return RuntimeErr("Scope access can only happen in scopes, given type was " + TypeToText(node.type))
		End
		
		#If CONFIG = "debug"
		If Not BailRequested() Then PopCallStack()
		#EndIf
		Return returnValue
	End
	
	Private
	Method StrMethod:VMValue( str:String, node:ParserNode )
		Local methodName:String, func:VMValue
		
		methodName = Ident(node.left)
		
		Local exprList:VMValue[]
		
		If node.right <> Null And node.right.type = eNode.TypeArgumentList
			exprList = ExprList(node.right).ToArray()
		End
		
'		str.Contains
'		str.EndsWith
'		str.Find
'		str.FindLast
'		str.Join
'		str.Replace
'		str.Split
'		str.StartsWith
'		str.ToChars
'		str.ToLower
'		str.ToUpper
'		str.Trim
		
		Select methodName
			Case "compare"
				If exprList.Length = 1 And exprList[0].type = VMValue.TYPE_STRING
					Return VMValue.CreateFloat(str.Compare(exprList[0].dataStr))
				Else
					Return RuntimeErr("Cannot compare non-string value")
				End
			Case "contains"
				If exprList.Length = 1 And exprList[0].type = VMValue.TYPE_STRING
					Return VMValue.CreateFloat(str.Contains(exprList[0].dataStr))
				Else
					Return RuntimeErr("Cannot check if non-string value is in string")
				End
			Case "endsWith"
				If exprList.Length = 1 And exprList[0].type = VMValue.TYPE_STRING
					Return VMValue.CreateFloat(str.EndsWith(exprList[0].dataStr))
				Else
					Return RuntimeErr("Cannot check if string ends with non-string value")
				End
			Case "find"
				If exprList.Length = 1 And exprList[0].type = VMValue.TYPE_STRING
					Return VMValue.CreateFloat(str.Find(exprList[0].dataStr))
				ElseIf exprList.Length = 2 And exprList[0].type = VMValue.TYPE_STRING And exprList[1].type = VMValue.TYPE_FLOAT
					Return VMValue.CreateFloat(str.Find(exprList[0].dataStr, Int(exprList[1].dataFloat)))
				Else
					Return RuntimeErr("String method find cannot except values other than a string and integer")
				End
			Case "findLast"
				If exprList.Length = 1 And exprList[0].type = VMValue.TYPE_STRING
					Return VMValue.CreateFloat(str.FindLast(exprList[0].dataStr))
				ElseIf exprList.Length = 2 And exprList[0].type = VMValue.TYPE_STRING And exprList[1].type = VMValue.TYPE_FLOAT
					Return VMValue.CreateFloat(str.FindLast(exprList[0].dataStr, Int(exprList[1].dataFloat)))
				Else
					Return RuntimeErr("String method findLast cannot except values other than a string and integer")
				End
			Case "join"
				
			Case "replace"
				
			Case "split"
				
			Case "startsWith"
				If exprList.Length = 1 And exprList[0].type = VMValue.TYPE_STRING
					Return VMValue.CreateFloat(str.StartsWith(exprList[0].dataStr))
				Else
					Return RuntimeErr("Cannot check if string starts with non-string value")
				End
		End
	End
	Public
	
	Method IfStmt:VMValue(node:ParserNode)
		#If CONFIG = "debug"
		PushToCallStack(node)
		#EndIf
		Local ifNode:ParserNode = node.right.left
		Local elseNode:ParserNode = node.right.right
		Local scope:VMScope, returnValue:VMValue
		
		Local ifeval := Eval(node.left)
		Local evalTrue:Bool
		
		If ValueNotNull(ifeval)
			If ifeval.type = VMValue.TYPE_OBJECT
				evalTrue = True
			ElseIf ifeval.type = VMValue.TYPE_FLOAT
				evalTrue = Bool(Int(ifeval.dataFloat))
			End
		End
		
		If evalTrue
			scope = new VMScope(Self, ifNode)
			returnValue = scope.Exec()
		ElseIf elseNode <> Null
			scope = new VMScope(Self, elseNode)
			returnValue = scope.Exec()
		End
		
		scope = Null
		#If CONFIG = "debug"
		If Not BailRequested() Then PopCallStack()
		#EndIf
		Return returnValue
	End
	
	Method WhileStmt:VMValue(node:ParserNode)
		Local scope:VMScope = New VMScope(Self, node.right)
		Local returnValue:VMValue
		
		While True
			Local eval := scope.Eval(node.left)
			If ValueNull(eval) Or (eval.type = VMValue.TYPE_FLOAT And eval.dataFloat = 0.0)
				Exit
			End
			
			returnValue = scope.Exec()
			
			If ValueNotNull(returnValue)
				If returnValue.type <> VMValue.TYPE_SPECIAL
					Exit
				Else
					If returnValue.dataFloat = -1.0
						Continue
					Else
						Exit
					End
				End
			End
			scope.Variables.Clear()
		Wend
		
		scope = Null
		Return returnValue
	End
	
	Method ForEachStmt:VMValue(node:ParserNode)
		Local scope:VMScope = New VMScope(Self, node.right)
		Local returnValue:VMValue
		
		Local left:VMValue
		Local varName:String
		Local items:ValueEnumerator<String,VMValue>
		
		If node.left.type = eNode.TypeForEachItem
			varName = Ident(node.left.left)
			left = Eval(node.left.right)
			If left.type <> VMValue.TYPE_SCOPE And left.type <> VMValue.TYPE_FLOAT
				Return RuntimeErr("Type given in foreach statement was not scope or array")
			End
			items = left.dataScope.Variables.Values().ObjectEnumerator()
		End
		
		While True
			If items.HasNext()
				scope.Variables.Set(varName, items.NextObject())
			Else
				Exit
			End
			
			returnValue = scope.Exec()
			
			If ValueNotNull(returnValue)
				If returnValue.type <> VMValue.TYPE_SPECIAL
					Exit
				Else
					If returnValue.dataFloat = -1.0
						Continue
					Else
						Exit
					End
				End
			End
			
			scope.Variables.Clear()
		Wend
		
		scope = Null
		Return returnValue
	End
	
	Method ForStmt:VMValue(node:ParserNode)
		Local scope:VMScope = New VMScope(Self, Null)
		Local subScope:VMScope = New VMScope(scope, node.right)
		Local returnValue:VMValue
		
		Local exprNodes:ParserNode[] = ForExprListNodes(node.left).ToArray()
		If exprNodes.Length <> 3
			Return RuntimeErr("For loops require 3 expression lists separated by semi-colons")
		End
		
		' initial
		scope.ExprList(exprNodes[0])
		
		While True
			Local eval := scope.Eval(exprNodes[1].left) ' middle should not be expr list
			If ValueNull(eval) Or (eval.type = VMValue.TYPE_FLOAT And eval.dataFloat = 0.0)
				Exit
			End
			
			returnValue = subScope.Exec()
			
			If ValueNotNull(returnValue)
				If returnValue.type <> VMValue.TYPE_SPECIAL
					Exit
				Else
					If returnValue.dataFloat = -1.0
						Continue
					Else
						Exit
					End
				End
			End
			subScope.Variables.Clear()
			scope.ExprList(exprNodes[2])
		Wend
		
		scope = Null
		subScope = Null
		Return returnValue
	End
	
	Method ForExprListNodes:List<ParserNode>(node:ParserNode)
		Local params:List<ParserNode> = New List<ParserNode>()
		
		Repeat
			params.AddLast(node.left)
			node = node.right
		Until node = Null
		
		Return params
	End
	
	Method Assignment:VMValue(node:ParserNode)
		Local returnValue:VMValue
		
		#If CONFIG = "debug"
		PushToCallStack(node)
		#EndIf
		
		If node.left = Null
			Return RuntimeErr("Error in assignment, no variable to assign")
		End
		
		If node.left.type = eNode.TypeIdent
			Local varName:String = Ident(node.left)
			
			returnValue = Eval(node.right)
			SetVariable(varName, returnValue)
		ElseIf node.left.type = eNode.TypeScope
			Local var:VMValue
			
			var = ScopeAccessor(node.left, True)
			
			If var = Null
				Return RuntimeErr("Error in assignment, variable returned does not exist")
			End
			returnValue = Eval(node.right)
			
			If var.dataMonkeyObject
				var.dataMonkeyObject.VMSet(Self, var.dataMonkeyName, returnValue)
			Else
				SetVariable(var, returnValue)
			End
		ElseIf node.left.type = eNode.TypeArray
			Local var:VMValue = ArrayAccessor(node.left)
			
			If var = Null
				Return RuntimeErr("Error in assignment, variable returned does not exist")
			End
			
			returnValue = Eval(node.right)
			
			SetVariable(var, returnValue)
		End
		
		#If CONFIG = "debug"
		PopCallStack()
		#EndIf
		Return returnValue
	End
	
	Method LocalAssignment:VMValue(node:ParserNode)
		Local ret:VMValue
		
		#If CONFIG = "debug"
		PushToCallStack(node)
		#EndIf
		
		If node.left = Null
			Return RuntimeErr("Error in assignment, no variable to assign")
		End
		
		If node.left.type = eNode.TypeIdent
			Local varName:String = Ident(node.left)
			
			ret = Eval(node.right)
			Variables.Set(varName, ret)
		End
		
		#If CONFIG = "debug"
		PopCallStack()
		#EndIf
		Return ret
	End
	
	Method DeleteStmt( node:ParserNode )
		Local params:List<String> = ParamList(node.left)
		
		For Local param:String = EachIn params
			Local var:VMValue = Variables.Get(param)
			var.Nullify()
			Variables.Remove(param)
		Next
	End
	
	Method ThisReturn:VMValue(node:ParserNode)
		Return VMValue.CreateScope(Self)
	End
	
	'left: PARAMLIST -> right: STMT_LIST
	Method Declare:VMValue(node:ParserNode)
		Local params:List<String>
		Local body:ParserNode = node.right
		
		If node.left <> Null Then params = ParamList(node.left)
		
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
		If node.type = eNode.TypeAdd
			Return Add(node)
		ElseIf node.type = eNode.TypeSubtract
			Return Subtract(node)
		ElseIf node.type = eNode.TypeDivide
			Return Div(node)
		ElseIf node.type = eNode.TypeIntDivide
			Return IntDiv(node)
		ElseIf node.type = eNode.TypeMultiply
			Return Mult(node)
		ElseIf node.type = eNode.TypeModulo
			Return Modulo(node)
		ElseIf node.type = eNode.TypeIntModulo
			Return IntModulo(node)
		ElseIf node.type = eNode.TypeLessThan
			Return LessThan(node)
		ElseIf node.type = eNode.TypeGreaterThan
			Return GreaterThan(node)
		ElseIf node.type = eNode.TypeLessThanEqual
			Return LessThanEq(node)
		ElseIf node.type = eNode.TypeGreaterThanEqual
			Return GreaterThanEq(node)
		ElseIf node.type = eNode.TypeEqualTo
			Return Eq(node)
		ElseIf node.type = eNode.TypeNotEqualTo
			Return NotEq(node)
		ElseIf node.type = eNode.TypeIdenticalTo
			Return Identical(node)
		ElseIf node.type = eNode.TypeNotIdenticalTo
			Return NotIdentical(node)
		ElseIf node.type = eNode.TypeNegate
			Return Negate(node)
		ElseIf node.type = eNode.TypeBoolNot
			Return BoolNot(node)
		ElseIf node.type = eNode.TypeBoolOr
			Return BoolOr(node)
		ElseIf node.type = eNode.TypeBoolAnd
			Return BoolAnd(node)
		ElseIf node.type = eNode.TypeBitwiseAnd
			Return BitwiseAnd(node)
		ElseIf node.type = eNode.TypeBitwiseOr
			Return BitwiseOr(node)
		ElseIf node.type = eNode.TypeBitwiseXor
			Return BitwiseXor(node)
		ElseIf node.type = eNode.TypeBitwiseNot
			Return BitwiseNot(node)
		ElseIf node.type = eNode.TypeArithmeticShiftRight
			Return ArithmeticShiftRight(node)
		ElseIf node.type = eNode.TypeArithmeticShiftLeft
			Return ArithmeticShiftLeft(node)
		ElseIf node.type = eNode.TypeLogicalShiftRight
			Return LogicalShiftRight(node)
		ElseIf node.type = eNode.TypeScope
			Return ScopeAccessor(node)
		ElseIf node.type = eNode.TypePreIncrement
			Return PreIncrement(node)
		ElseIf node.type = eNode.TypePreDecrement
			Return PreDecrement(node)
		ElseIf node.type = eNode.TypePostIncrement
			Return PostIncrement(node)
		ElseIf node.type = eNode.TypePostDecrement
			Return PostDecrement(node)
		ElseIf node.type = eNode.TypeFunc
			Return Declare(node)
		ElseIf node.type = eNode.TypeFuncCall
			Return Invoke(node)
		ElseIf node.type = eNode.TypeIf ' ternary if block only
			Return IfStmt(node)
		ElseIf node.type = eNode.TypeObject
			Return ObjectStmt(node)
		ElseIf node.type = eNode.TypeAssignment
			Return Assignment(node)
		ElseIf node.type = eNode.TypeReference
			Return Reference(node)
		ElseIf node.type = eNode.TypeArrayExprList
			Return NewArray(node)
		ElseIf node.type = eNode.TypeThis
			Return ThisReturn(node)
		ElseIf node.type = eNode.TypeArray
			Return ArrayAccessor(node)
		ElseIf node.type = eNode.TypeNull
			Return VMValue.CreateNull()
		ElseIf node.type = eNode.TypeVar
			Return LocalAssignment(node)
		ElseIf node.type = eNode.TypeTypeCast
			Return TypeCast(node)
		ElseIf node.type = eNode.TypeContains
			Return Contains(node)
		ElseIf node.type = eNode.TypeString
			Return VMValue.CreateString(node.dataStr)
		ElseIf node.type = eNode.TypeFloat
			Return VMValue.CreateFloat(node.dataFloat)
		ElseIf node.type = eNode.TypeIdent
			Local var:VMValue = GetVariable(node.dataStr)
			If var = Null
				var = VMValue.CreateNull()
				Variables.Set(node.dataStr, var)
			End
			Return var
		Else
			Return RuntimeErr("Missing Eval-rule for " + ParserNode.NodeTypeToText(node.type))
		EndIf
	End
	
	Method Contains:VMValue( node:ParserNode )
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		
		If left.type <> VMValue.TYPE_SCOPE
			Return RuntimeErr("Cannot check non-scope values if they have a property")
		ElseIf left.dataScope = Null
			Return RuntimeErr("Given scope is null")
		End
		
		If right.type > VMValue.TYPE_STRING
			Return RuntimeErr("Cannot check a non-float or non-string value if they are in a scope")
		End
		
		Local key:String
		If right.type = VMValue.TYPE_STRING
			key = right.dataStr
		Else
			key = String(right.dataFloat)
		End
		
		Return VMValue.CreateFloat(left.dataScope.Variables.Contains(key))
	End
	
	Method TypeCast:VMValue( node:ParserNode )
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		Local returnValue:VMValue
		
		If right.type <> VMValue.TYPE_STRING
			Return RuntimeErr("Type to cast to must be in string form")
		End
		
		If left.type = VMValue.TYPE_STRING
			Select right.dataStr
				Case "string","str"
					returnValue = VMValue.CreateString(left.dataStr)
				Case "int", "integer", "number"
					returnValue = VMValue.CreateFloat(Int(left.dataStr))
				Case "float"
					returnValue = VMValue.CreateFloat(Float(left.dataStr))
				Case "bool", "boolean"
					returnValue = VMValue.CreateFloat(Clamp(Int(Float(left.dataStr) + 0.5), 0, 1))
				Case "null", "nil"
					returnValue = VMValue.CreateNull()
				Default
					Return RuntimeErr("Cannot cast to type '" + right.dataStr + "', type is unknown")
			End
		ElseIf left.type = VMValue.TYPE_FLOAT
			Select right.dataStr
				Case "string","str"
					returnValue = VMValue.CreateString(String(left.dataFloat))
				Case "int", "integer", "number"
					returnValue = VMValue.CreateFloat(Int(left.dataFloat))
				Case "float"
					returnValue = VMValue.CreateFloat(left.dataFloat)
				Case "bool", "boolean"
					returnValue = VMValue.CreateFloat(Clamp(Int(left.dataFloat + 0.5), 0, 1))
				Case "null", "nil"
					returnValue = VMValue.CreateNull()
				Default
					Return RuntimeErr("Cannot cast to type '" + right.dataStr + "', type is unknown")
			End
		ElseIf left.type = VMValue.TYPE_NULL
			Select right.dataStr
				Case "string","str"
					returnValue = VMValue.CreateString("")
				Case "int", "integer", "float", "bool", "boolean", "number"
					returnValue = VMValue.CreateFloat(0.0)
				Case "null", "nil"
					returnValue = VMValue.CreateNull()
				Default
					Return RuntimeErr("Cannot cast to type '" + right.dataStr + "', type is unknown")
			End
		End
		
		Return returnValue
	End
	
	Method Reference:VMValue( node:ParserNode )
		Local left:VMValue = Eval(node.left)
		
		If ValueNull(left)
			Return RuntimeErr("& (reference) operator cannot be used on null objects")
		End
		
		left.isReference = True
		Return left
	End
	
	Method PreIncrement:VMValue( node:ParserNode )
		Local left:VMValue = Eval(node.left)
		
		If ValueNull(left)
			Return RuntimeErr("++ operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadPreIncrement(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMPreIncrement(Self)
			Else
				Return RuntimeErr("No ++ (pre-increment) operator overload found for input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("preinc$")
				Local func:VMValue = left.dataScope.Variables.Get("preinc$")
				Return left.dataScope.Call(func, [left])
			End
			
			Return RuntimeErr("Scope does not contain overload for ++ (pre-increment) operator")
		ElseIf left.type = VMValue.TYPE_STRING
			Return RuntimeErr("++ (pre-increment) operator is not valid for strings")
		Else
			left.dataFloat += 1.0
		End
		
		If left.dataMonkeyObject
			left.dataMonkeyObject.VMSet(Self, left.dataMonkeyName, left)
		End
		
		Return VMValue.CreateFloat(left.dataFloat)
	End
	
	Method PreDecrement:VMValue( node:ParserNode )
		Local left:VMValue = Eval(node.left)
		
		If ValueNull(left)
			Return RuntimeErr("-- operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadPreDecrement(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMPreDecrement(Self)
			Else
				Return RuntimeErr("No -- (pre-decrement) operator overload found for input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("predec$")
				Local func:VMValue = left.dataScope.Variables.Get("predec$")
				Return left.dataScope.Call(func, [left])
			End
			
			Return RuntimeErr("Scope does not contain overload for -- (pre-decrement) operator")
		ElseIf left.type = VMValue.TYPE_STRING
			Return RuntimeErr("-- (pre-decrement) operator is not valid for strings")
		Else
			left.dataFloat -= 1.0
		End
		
		If left.dataMonkeyObject
			left.dataMonkeyObject.VMSet(Self, left.dataMonkeyName, left)
		End
		
		Return VMValue.CreateFloat(left.dataFloat)
	End
	
	Method PostIncrement:VMValue( node:ParserNode )
		Local left:VMValue = Eval(node.left)
		
		If ValueNull(left)
			Return RuntimeErr("++ operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadPostIncrement(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMPostIncrement(Self)
			Else
				Return RuntimeErr("No ++ (post-increment) operator overload found for input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("postinc$")
				Local func:VMValue = left.dataScope.Variables.Get("postinc$")
				Return left.dataScope.Call(func, [left])
			End
			
			Return RuntimeErr("Scope does not contain overload for ++ (post-increment) operator")
		ElseIf left.type = VMValue.TYPE_STRING
			Return RuntimeErr("++ (post-increment) operator is not valid for strings")
		Else
			left.dataFloat += 1.0
		End
		
		If left.dataMonkeyObject
			left.dataMonkeyObject.VMSet(Self, left.dataMonkeyName, left)
		End
		
		Return VMValue.CreateFloat(left.dataFloat - 1.0)
	End
	
	Method PostDecrement:VMValue( node:ParserNode )
		Local left:VMValue = Eval(node.left)
		
		If ValueNull(left)
			Return RuntimeErr("-- operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadPostDecrement(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMPostDecrement(Self)
			Else
				Return RuntimeErr("No -- (post-decrement) operator overload found for input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("postdec$")
				Local func:VMValue = left.dataScope.Variables.Get("postdec$")
				Return left.dataScope.Call(func, [left])
			End
			
			Return RuntimeErr("Scope does not contain overload for -- (post-decrement) operator")
		ElseIf left.type = VMValue.TYPE_STRING
			Return RuntimeErr("-- (post-decrement) operator is not valid for strings")
		Else
			left.dataFloat -= 1.0
		End
		
		If left.dataMonkeyObject
			left.dataMonkeyObject.VMSet(Self, left.dataMonkeyName, left)
		End
		
		Return VMValue.CreateFloat(left.dataFloat + 1.0)
	End
	
	Method BoolAnd:VMValue( node:ParserNode )
		Local left:VMValue, right:VMValue
		
		left = Eval(node.left)
		
		If ValueNull(left) Then Return VMValue.CreateFloat(0.0)
		
		If left.type = VMValue.TYPE_FLOAT
			Local lhs:Int
			
			lhs = Clamp(Int(left.dataFloat), 0, 1)
			
			If lhs
				right = Eval(node.right)
				
				If right <> Null
					If right.type = VMValue.TYPE_FLOAT
						Return VMValue.CreateFloat(lhs & Clamp(Int(right.dataFloat), 0, 1))
					Else
						Return RuntimeErr("&& operator cannot be used on righthand input of type " + TypeToText(right.type))
					End
				End
			End
		ElseIf left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadBitwiseAnd(left)
			right = Eval(node.right)
			
			If lhsOverload
				Return lhsOverload.VMBitwiseAnd(Self, right)
			ElseIf right <> Null
				Return VMValue.CreateFloat(1.0) 'both not null, makes sense to me
			End
		End
		
		Return VMValue.CreateFloat(0.0)
	End
	
	Method BoolOr:VMValue( node:ParserNode )
		Local left:VMValue, right:VMValue
		
		left = Eval(node.left)
		
		If left <> Null
			If left.type = VMValue.TYPE_FLOAT
				Local lhs:Int
				
				lhs = Clamp(Int(left.dataFloat), 0, 1)
				
				If lhs
					Return VMValue.CreateFloat(1.0)
				Else
					right = Eval(node.right)
					
					If right <> Null
						If right.type = VMValue.TYPE_FLOAT
							Return VMValue.CreateFloat(Clamp(Int(right.dataFloat), 0, 1))
						Else
							Return RuntimeErr("|| operator cannot be used on righthand input of type " + TypeToText(right.type))
						End
					End
				End
			ElseIf left.type = VMValue.TYPE_OBJECT
				Local lhsOverload := IVMOverloadBitwiseOr(left)
				
				If left
					Return lhsOverload.VMBitwiseOr(Self, right)
				Else
					Return VMValue.CreateFloat(1.0) ' this one's not null, so that's a winner in my book
				End
			End
		Else
			right = Eval(node.right)
			
			If right <> Null
				If right.type = VMValue.TYPE_FLOAT
					Return VMValue.CreateFloat(Clamp(Int(right.dataFloat), 0, 1))
				ElseIf right.type = VMValue.TYPE_OBJECT
					Return VMValue.CreateFloat(1.0) ' this one's not null, so that's a good thing
				End
			End
		End
		
		Return VMValue.CreateFloat(0.0)
	End
	
	Method BoolNot:VMValue( node:ParserNode )
		Local left:VMValue = Eval(node.left)
		
		If ValueNull(left)
			Return VMValue.CreateFloat(1.0) ' !null = true  
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadBoolNot(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMBoolNot(Self)
			Else
				Return RuntimeErr("No ! operator overload found for input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("not$")
				Local func:VMValue = left.dataScope.Variables.Get("not$")
				Return left.dataScope.Call(func, [left])
			End
			
			Return RuntimeErr("Scope does not contain overload for ! operator")
		ElseIf left.type = VMValue.TYPE_STRING
			'One is string
			Return RuntimeErr("! operator is not valid for strings")
		Else
			'Both float
			Return VMValue.CreateFloat((Int(left.dataFloat) + 1) & 1) ' should be clamped
		End
	End
	
	Method BitwiseNot:VMValue( node:ParserNode )
		Local left:VMValue = Eval(node.left)
		
		If ValueNull(left)
			Return RuntimeErr("~~ operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadBitwiseNot(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMBitwiseNot(Self)
			Else
				Return RuntimeErr("No ~~ (bitwise not) operator overload found for input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("bnot$")
				Local func:VMValue = left.dataScope.Variables.Get("bnot$")
				Return left.dataScope.Call(func, [left])
			End
			
			Return RuntimeErr("Scope does not contain overload for ~~ (bitwise not) operator")
		ElseIf left.type = VMValue.TYPE_STRING
			'One is string
			Return RuntimeErr("~~ operator is not valid for strings")
		Else
			'Both float
			Return VMValue.CreateFloat(~Int(left.dataFloat))
		EndIf
	End
	
	Method Negate:VMValue( node:ParserNode )
		Local left:VMValue = Eval(node.left)
		
		If ValueNull(left)
			Return RuntimeErr("- (negate) operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadNegate(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMNegate(Self)
			Else
				Return RuntimeErr("No - (negate) operator overload found for input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("neg$")
				Local func:VMValue = left.dataScope.Variables.Get("neg$")
				Return left.dataScope.Call(func, [left])
			End
			
			Return RuntimeErr("Scope does not contain overload for - (negate) operator")
		ElseIf left.type = VMValue.TYPE_STRING
			'One is string
			Return RuntimeErr("- operator is not valid for strings")
		Else
			'Both float
			Return VMValue.CreateFloat(-left.dataFloat)
		EndIf
	End
	
	Method ArithmeticShiftRight:VMValue(node:ParserNode)
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		
		If ValueNull(left) Or ValueNull(right)
			Return RuntimeErr(">> operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadShr(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMShr(Self, right)
			Else
				Return RuntimeErr("No >> operator overload found for lefthand input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("shr$")
				Local func:VMValue = left.dataScope.Variables.Get("shr$")
				Return left.dataScope.Call(func, [left, right])
			End
			
			Return RuntimeErr("Scope does not contain overload for >> operator")
		ElseIf left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
			Return RuntimeErr(">> operator is invalid for strings")
		Else
			Return VMValue.CreateFloat(Int(left.dataFloat) Shr Int(right.dataFloat))
		End
	End
	
	Method ArithmeticShiftLeft:VMValue(node:ParserNode)
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		
		If ValueNull(left) Or ValueNull(right)
			Return RuntimeErr("<< operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadShr(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMShr(Self, right)
			Else
				Return RuntimeErr("No << operator overload found for lefthand input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("shl$")
				Local func:VMValue = left.dataScope.Variables.Get("shl$")
				Return left.dataScope.Call(func, [left, right])
			End
			
			Return RuntimeErr("Scope does not contain overload for << operator")
		ElseIf left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
			Return RuntimeErr("<< operator is invalid for strings")
		Else
			Return VMValue.CreateFloat(Int(left.dataFloat) Shl Int(right.dataFloat))
		End
	End
	
	Method LogicalShiftRight:VMValue(node:ParserNode)
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		
		If ValueNull(left) Or ValueNull(right)
			Return RuntimeErr(">>> operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadShr(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMShr(Self, right)
			Else
				Return RuntimeErr("No >>> operator overload found for lefthand input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("lsr$")
				Local func:VMValue = left.dataScope.Variables.Get("lsr$")
				Return left.dataScope.Call(func, [left, right])
			End
			
			Return RuntimeErr("Scope does not contain overload for >>> operator")
		ElseIf left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
			Return RuntimeErr(">>> operator is invalid for strings")
		Else
			Return VMValue.CreateFloat(Lsr(left.dataFloat, right.dataFloat))
		End
	End
	
	Private
	'Cross-platform solution for Lsr provided by Ferdi (fix by Goodlookinguy)
	'http://www.monkey-x.com/Community/posts.php?topic=4711&post=51347
	Function Lsr:Int( number:Int, shiftBy:Int )
		If shiftBy Return (number Shr shiftBy) & ((1 Shl (32 - shiftBy)) - 1)
		Return number
	End
	Public
	
	Method Add:VMValue(node:ParserNode)
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		
		If ValueNull(left) Or ValueNull(right)
			Return RuntimeErr("+ operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadPlus(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMPlus(Self, right)
			Else
				Return RuntimeErr("No + operator overload found for lefthand input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("add$")
				Local func:VMValue = left.dataScope.Variables.Get("add$")
				Return left.dataScope.Call(func, [left, right])
			End
			
			Return RuntimeErr("Scope does not contain overload for + operator")
		ElseIf left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
			Local result:String
			
			If left.type = VMValue.TYPE_STRING
				result = left.dataStr
			ElseIf left.type = VMValue.TYPE_FLOAT
				result = String(left.dataFloat)
			End
			
			If right.type = VMValue.TYPE_STRING
				result += right.dataStr
			ElseIf right.type = VMValue.TYPE_FLOAT
				result += String(right.dataFloat)
			End
			
			Return VMValue.CreateString(result)
		Else
			Return VMValue.CreateFloat(left.dataFloat + right.dataFloat)
		End
	End
	
	Method Subtract:VMValue(node:ParserNode)
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		
		If ValueNull(left) Or ValueNull(right)
			Return RuntimeErr("- (minus) operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadMinus(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMMinus(Self, right)
			Else
				Return RuntimeErr("No - (minus) operator overload found for lefthand input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("sub$")
				Local func:VMValue = left.dataScope.Variables.Get("sub$")
				Return left.dataScope.Call(func, [left, right])
			End
			
			Return RuntimeErr("Scope does not contain overload for - operator")
		ElseIf left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
			'One is string
			Return RuntimeErr("- operator is not valid for strings")
		Else
			'Both float
			Return VMValue.CreateFloat(left.dataFloat - right.dataFloat)
		EndIf
	End
	
	Method Div:VMValue(node:ParserNode)
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		
		If ValueNull(left) Or ValueNull(right)
			Return RuntimeErr("/ operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadDivBy(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMDivBy(Self, right)
			Else
				Return RuntimeErr("No / operator overload found for lefthand input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("div$")
				Local func:VMValue = left.dataScope.Variables.Get("div$")
				Return left.dataScope.Call(func, [left, right])
			End
			
			Return RuntimeErr("Scope does not contain overload for / operator")
		ElseIf left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
			'One is string
			Return RuntimeErr("/ operator is not valid for strings")
		Else
			'Both float
			If right.dataFloat = 0 Then Return RuntimeErr("Division by 0 error")
			Return VMValue.CreateFloat(left.dataFloat / right.dataFloat)
		End
	End
	
	Method IntDiv:VMValue(node:ParserNode)
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		
		If ValueNull(left) Or ValueNull(right)
			Return RuntimeErr("~~/ operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadIntDivBy(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMIntDivBy(Self, right)
			Else
				Return RuntimeErr("No ~~/ operator overload found for lefthand input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("idiv$")
				Local func:VMValue = left.dataScope.Variables.Get("idiv$")
				Return left.dataScope.Call(func, [left, right])
			End
			
			Return RuntimeErr("Scope does not contain overload for ~~/ operator")
		ElseIf left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
			'One is string
			Return RuntimeErr("~~/ operator is not valid for strings")
		Else
			'Both float
			If right.dataFloat = 0 Then Return RuntimeErr("Division by 0 error")
			Return VMValue.CreateFloat(Int(left.dataFloat) / Int(right.dataFloat))
		End
	End
	
	Method Modulo:VMValue(node:ParserNode)
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		
		If ValueNull(left) Or ValueNull(right)
			Return RuntimeErr("% operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadModulo(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMModulo(Self, right)
			Else
				Return RuntimeErr("No % operator overload found for lefthand input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("mod$")
				Local func:VMValue = left.dataScope.Variables.Get("mod$")
				Return left.dataScope.Call(func, [left, right])
			End
			
			Return RuntimeErr("Scope does not contain overload for % operator")
		ElseIf left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
			'One is string
			Return RuntimeErr("% operator is not valid for strings")
		Else
			'Both float
			If right.dataFloat = 0.0 Then Return RuntimeErr("Division by 0 error")
			Return VMValue.CreateFloat(left.dataFloat Mod right.dataFloat)
		EndIf
	End
	
	Method IntModulo:VMValue(node:ParserNode)
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		
		If ValueNull(left) Or ValueNull(right)
			Return RuntimeErr("~~% operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadIntModulo(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMIntModulo(Self, right)
			Else
				Return RuntimeErr("No ~~% operator overload found for lefthand input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("imod$")
				Local func:VMValue = left.dataScope.Variables.Get("imod$")
				Return left.dataScope.Call(func, [left, right])
			End
			
			Return RuntimeErr("Scope does not contain overload for ~~% operator")
		ElseIf left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
			'One is string
			Return RuntimeErr("~~% operator is not valid for strings")
		Else
			'Both float
			If Int(right.dataFloat) = 0 Then Return RuntimeErr("Division by 0 error")
			Return VMValue.CreateFloat(Int(left.dataFloat) Mod Int(right.dataFloat))
		EndIf
	End
	
	Method Mult:VMValue(node:ParserNode)
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		
		If ValueNull(left) Or ValueNull(right)
			Return RuntimeErr("* operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadTimes(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMTimes(Self, right)
			Else
				Return RuntimeErr("No * operator overload found for lefthand input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("mul$")
				Local func:VMValue = left.dataScope.Variables.Get("mul$")
				Return left.dataScope.Call(func, [left, right])
			End
			
			Return RuntimeErr("Scope does not contain overload for * operator")
		ElseIf left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
			If Not (left.type & right.type)
				Local repeatTimes:Int, str:String
				
				If left.type = VMValue.TYPE_FLOAT
					repeatTimes = Int(left.dataFloat)
					str = right.dataStr
				Else
					repeatTimes = Int(right.dataFloat)
					str = left.dataStr
				End
				
				Local sb:StringStack = New StringStack()
				For Local i:Int = 0 Until repeatTimes
					sb.Push(str)
				Next
				
				Return VMValue.CreateString(sb.Join())
			End
			
			Return RuntimeErr("* operator is not valid for strings")
		Else
			Return VMValue.CreateFloat(left.dataFloat * right.dataFloat)
		End
	End
	
	Method BitwiseAnd:VMValue(node:ParserNode)
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		
		If ValueNull(left) Or ValueNull(right)
			Return RuntimeErr("& operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadBitwiseAnd(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMBitwiseAnd(Self, right)
			Else
				Return RuntimeErr("No & operator overload found for lefthand input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("band$")
				Local func:VMValue = left.dataScope.Variables.Get("band$")
				Return left.dataScope.Call(func, [left, right])
			End
			
			Return RuntimeErr("Scope does not contain overload for & operator")
		ElseIf left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
			'One is string
			Return RuntimeErr("& operator is not valid for strings")
		Else
			Return VMValue.CreateFloat(Int(left.dataFloat) & Int(right.dataFloat))
		End
	End
	
	Method BitwiseOr:VMValue(node:ParserNode)
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		
		If ValueNull(left) Or ValueNull(right)
			Return RuntimeErr("| operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadBitwiseOr(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMBitwiseOr(Self, right)
			Else
				Return RuntimeErr("No | operator overload found for lefthand input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("bor$")
				Local func:VMValue = left.dataScope.Variables.Get("bor$")
				Return left.dataScope.Call(func, [left, right])
			End
			
			Return RuntimeErr("Scope does not contain overload for | operator")
		ElseIf left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
			'One is string
			Return RuntimeErr("| operator is not valid for strings")
		Else
			Return VMValue.CreateFloat(Int(left.dataFloat) | Int(right.dataFloat))
		End
	End
	
	Method BitwiseXor:VMValue(node:ParserNode)
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		
		If ValueNull(left) Or ValueNull(right)
			Return RuntimeErr("^ operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadBitwiseXor(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMBitwiseXor(Self, right)
			Else
				Return RuntimeErr("No ^ operator overload found for lefthand input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("xor$")
				Local func:VMValue = left.dataScope.Variables.Get("xor$")
				Return left.dataScope.Call(func, [left, right])
			End
			
			Return RuntimeErr("Scope does not contain overload for ^ operator")
		ElseIf left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
			'One is string
			Return RuntimeErr("^ operator is not valid for strings")
		Else
			Return VMValue.CreateFloat(Int(left.dataFloat) ~ Int(right.dataFloat))
		End
	End
	
	Method LessThan:VMValue(node:ParserNode)
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		
		If ValueNull(left) Or ValueNull(right)
			Return RuntimeErr("< operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadLessThan(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMLessThan(Self, right)
			Else
				Return RuntimeErr("No < operator overload found for lefthand input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("lt$")
				Local func:VMValue = left.dataScope.Variables.Get("lt$")
				Return left.dataScope.Call(func, [left, right])
			End
			
			Return RuntimeErr("Scope does not contain overload for < operator")
		ElseIf left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
			Return RuntimeErr("< operator is not valid for strings")
		Else
			Return VMValue.CreateFloat(Int(left.dataFloat < right.dataFloat))
		End
	End
	
	Method GreaterThan:VMValue(node:ParserNode)
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		
		If ValueNull(left) Or ValueNull(right)
			Return RuntimeErr("> operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadGreaterThan(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMGreaterThan(Self, right)
			Else
				Return RuntimeErr("No > operator overload found for lefthand input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("gt$")
				Local func:VMValue = left.dataScope.Variables.Get("gt$")
				Return left.dataScope.Call(func, [left, right])
			End
			
			Return RuntimeErr("Scope does not contain overload for > operator")
		ElseIf left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
			Return RuntimeErr("> operator is not valid for strings")
		Else
			Return VMValue.CreateFloat(Int(left.dataFloat > right.dataFloat))
		End
	End
	
	Method GreaterThanEq:VMValue(node:ParserNode)
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		
		If ValueNull(left) Or ValueNull(right)
			Return RuntimeErr(">= operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadGreaterThanEqual(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMGreaterThanEqual(Self, right)
			Else
				Return RuntimeErr("No >= operator overload found for lefthand input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("gte$")
				Local func:VMValue = left.dataScope.Variables.Get("gte$")
				Return left.dataScope.Call(func, [left, right])
			End
			
			Return RuntimeErr("Scope does not contain overload for >= operator")
		ElseIf left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
			Return RuntimeErr(">= operator is not valid for strings")
		Else
			Return VMValue.CreateFloat(Int(left.dataFloat >= right.dataFloat))
		End
	End
	
	Method LessThanEq:VMValue(node:ParserNode)
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		
		If ValueNull(left) Or ValueNull(right)
			Return RuntimeErr("<= operator cannot be used on null objects")
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadLessThanEqual(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMLessThanEqual(Self, right)
			Else
				Return RuntimeErr("No <= operator overload found for lefthand input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("lte$")
				Local func:VMValue = left.dataScope.Variables.Get("lte$")
				Return left.dataScope.Call(func, [left, right])
			End
			
			Return RuntimeErr("Scope does not contain overload for <= operator")
		ElseIf left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
			Return RuntimeErr("<= operator is not valid for strings")
		Else
			Return VMValue.CreateFloat(Int(left.dataFloat <= right.dataFloat))
		End
	End
	
	Method Eq:VMValue(node:ParserNode)
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		
		If ValueNull(left)
			Return VMValue.CreateFloat(ValueNull(right))
		ElseIf ValueNull(right)
			Return VMValue.CreateFloat(0.0)
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadEqual(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMEqual(Self, right)
			Else
				Return RuntimeErr("No == operator overload found for lefthand input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("eq$")
				Local func:VMValue = left.dataScope.Variables.Get("eq$")
				Return left.dataScope.Call(func, [left, right])
			End
			
			Return RuntimeErr("Scope does not contain overload for == operator")
		ElseIf left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
			If left.type <= VMValue.TYPE_STRING And right.type <= VMValue.TYPE_STRING
				Local lhs:String, rhs:String
				
				If left.type = VMValue.TYPE_FLOAT
					lhs = String(left.dataFloat)
				ElseIf left.type = VMValue.TYPE_STRING
					lhs = left.dataStr
				End
				
				If right.type = VMValue.TYPE_FLOAT
					rhs = String(right.dataFloat)
				ElseIf right.type = VMValue.TYPE_STRING
					rhs = right.dataStr
				End
				
				Return VMValue.CreateFloat(Int(lhs = rhs))
			End
			
			Return RuntimeErr("== operator can only compare strings to strings and numbers")
		Else
			Return VMValue.CreateFloat(Int(left.dataFloat = right.dataFloat))
		End
	End
	
	Method NotEq:VMValue(node:ParserNode)
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		
		If ValueNull(left)
			Return VMValue.CreateFloat(ValueNotNull(right))
		ElseIf ValueNull(right)
			Return VMValue.CreateFloat(1.0)
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Local lhsOverload := IVMOverloadNotEqual(left.dataObject)
			
			If lhsOverload
				Return lhsOverload.VMNotEqual(Self, right)
			Else
				Return RuntimeErr("No != operator overload found for lefthand input object")
			End
		ElseIf left.type = VMValue.TYPE_SCOPE
			If left.dataScope = Null
				Return RuntimeErr("Left-hand scope is null")
			End
			
			If left.dataScope.Variables.Contains("noteq$")
				Local func:VMValue = left.dataScope.Variables.Get("noteq$")
				Return left.dataScope.Call(func, [left, right])
			End
			
			Return RuntimeErr("Scope does not contain overload for != operator")
		ElseIf left.type = VMValue.TYPE_STRING Or right.type = VMValue.TYPE_STRING
			'One is string
			If left.type <= VMValue.TYPE_STRING And right.type <= VMValue.TYPE_STRING
				Local lhs:String, rhs:String
				
				If left.type = VMValue.TYPE_FLOAT
					lhs = String(left.dataFloat)
				ElseIf left.type = VMValue.TYPE_STRING
					lhs = left.dataStr
				End
				
				If right.type = VMValue.TYPE_FLOAT
					rhs = String(right.dataFloat)
				ElseIf right.type = VMValue.TYPE_STRING
					rhs = right.dataStr
				End
				
				Return VMValue.CreateFloat(Int(lhs <> rhs))
			End
			
			Return RuntimeErr("!= operator can only compare strings to strings and numbers")
		Else
			Return VMValue.CreateFloat(Int(left.dataFloat <> right.dataFloat))
		End
	End
	
	Method Identical:VMValue(node:ParserNode)
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		
		If ValueNull(left)
			Return VMValue.CreateFloat(ValueNull(right))
		ElseIf ValueNull(right)
			Return VMValue.CreateFloat(0.0)
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Return RuntimeErr("=== operator overload not implemeted yet")
		ElseIf left.type <> right.type
			Return VMValue.CreateFloat(0.0)
		ElseIf left.type = VMValue.TYPE_STRING And right.type = VMValue.TYPE_STRING
			Return VMValue.CreateFloat(left.dataStr = right.dataStr)
		ElseIf left.type = VMValue.TYPE_FLOAT And right.type = VMValue.TYPE_FLOAT
			Return VMValue.CreateFloat(left.dataFloat = right.dataFloat)
		ElseIf left.type = VMValue.TYPE_SCOPE And right.type = VMValue.TYPE_SCOPE
			Return RuntimeErr("=== not implemented for scopes yet")
		End
	End
	
	Method NotIdentical:VMValue(node:ParserNode)
		Local left:VMValue = Eval(node.left)
		Local right:VMValue = Eval(node.right)
		
		If ValueNull(left)
			Return VMValue.CreateFloat(ValueNull(right))
		ElseIf ValueNull(right)
			Return VMValue.CreateFloat(0.0)
		End
		
		If left.type = VMValue.TYPE_OBJECT
			Return RuntimeErr("!== operator overload not implemeted yet")
		ElseIf left.type <> right.type
			Return VMValue.CreateFloat(1.0)
		ElseIf left.type = VMValue.TYPE_STRING And right.type = VMValue.TYPE_STRING
			Return VMValue.CreateFloat(left.dataStr <> right.dataStr)
		ElseIf left.type = VMValue.TYPE_FLOAT And right.type = VMValue.TYPE_FLOAT
			Return VMValue.CreateFloat(left.dataFloat <> right.dataFloat)
		ElseIf left.type = VMValue.TYPE_SCOPE And right.type = VMValue.TYPE_SCOPE
			Return RuntimeErr("!== not implemented for scopes yet")
		End
	End
	
	Method Ident:String(node:ParserNode)
		Return node.dataStr
	End
	
	Method SetVariable:VMValue( var:VMValue, data:VMValue )
		If data = Null
			Return RuntimeErr("Variable received non-existant data while trying to be set")
		End
		
		If data.isReference
			data.isReference = False
		Else
			data = data.Clone()
		End
		
		If var <> Null ' scope case
			var.type = data.type
			var.dataBody = data.dataBody
			var.dataFloat = data.dataFloat
			var.dataParams = data.dataParams
			var.dataStr = data.dataStr
			If var.type = VMValue.TYPE_SCOPE
				var.dataScope = data.dataScope
			End
		End
		
		Return var
	End
	
	Method SetVariable:VMValue(name:String, data:VMValue)
		Local var:VMValue = GetVariable(name)
		
		If data = Null
			data = VMValue.CreateNull()
		ElseIf data.isReference
			data.isReference = False
		Else
			data = data.Clone()
		End
		
		If var = Null
			Variables.Add(name, data)
		ElseIf data.type = VMValue.TYPE_FLOAT Or data.type = VMValue.TYPE_STRING
			GetVarContainer(name).Set(name, data)
		ElseIf var.type = VMValue.TYPE_DELEGATE
			Return RuntimeErr("Cannot override delegated functions")
		Else
			var.type = data.type
			var.dataBody = data.dataBody
			var.dataFloat = data.dataFloat
			var.dataParams = data.dataParams
			var.dataStr = data.dataStr
			If var.type = VMValue.TYPE_SCOPE
				var.dataScope = data.dataScope
			End
		End
		
		Return var
	End
	
	Method GetVariable:VMValue(name:String)
		If Variables.Contains(name) Then Return Variables.Get(name)
		If parent <> Null Then Return parent.GetVariable(name)
		Return Null 'Variable not initialized yet
	End
	
	Method GetVarContainer:StringMap<VMValue>( name:String )
		If Variables.Contains(name) Then Return Variables
		If parent <> Null Then Return parent.GetVarContainer(name)
		Return Null
	End
	
	Method RemoveVariable:VMValue( name:String )
		Local var:VMValue = GetVariable(name)
		Variables.Remove(name)
		Return var
	End
	
	Method RuntimeErr:VMValue( msg:String )
		#If CONFIG = "debug"
		If BailRequested() Then Return VMValue.CreateNull()
		Print "MiniC N.Edition Runtime Error: " + msg
		PrintCallStack()
		RequestBail()
		#Else
		Print "MiniC N.Edition Runtime Error: " + msg
		Error ""
		#EndIf
		Return VMValue.CreateNull()
	End
	
	'Summary: Nullifies values that are 'null'.
	Method GarbageCollect:Void()
		For Local node:map.Node<String,VMValue> = EachIn Variables
			Local var:VMValue = node.Value
			If var.type = VMValue.TYPE_SCOPE
				If var.dataScope = Null
					var.Nullify()
					Variables.Remove(node.Key)
				Else
					var.dataScope.GarbageCollect()
				End
			ElseIf var.type = VMValue.TYPE_NULL
				var.Nullify()
				Variables.Remove(node.Key)
			End
		Next
	End
	
	#If CONFIG = "debug"
	Field callStack:StringStack = New StringStack()
	
	Method PushToCallStack( node:ParserNode )
		If node = Null
			PrintCallStack()
		End
		callStack.Push("MiniC Stack Trace @ " + node.line + ":" + node.char + "~t<" + GetFileName() + ">")
	End
	
	Method PopCallStack:Void()
		If Not callStack.IsEmpty() Then callStack.Pop()
	End
	
	Method PrintCallStack:Void()
		While Not callStack.IsEmpty()
			Print callStack.Pop()
		End
		If parent <> Null
			parent.PrintCallStack()
		End
	End
	#EndIf
End

Class VM
	Field globalScope:VMScope
	
	'Note: TODO: Allow override of global script
	Method New()
		globalScope = LoadScript("false=0; true=1;")
		globalScope.Variables.Add("typeof", TypeOfDelegate.Instance())
		globalScope.Variables.Add("print", PrintDelegate.Instance())
		globalScope.Exec()
	End
	
	Method LoadScript:VMScope(input:String, parentScope:VMScope = Null, fileName:String = "")
		If parentScope = Null
			parentScope = globalScope
		End
		
		If parentScope And parentScope.BailRequested()
			parentScope.ClearBailRequest()
		End
		
		Local parser:Parser = new Parser(input)
		Local parserNodes := parser.Parse()
		Local scope := New VMScope(parentScope, parserNodes)
		scope.fileName = fileName
		If parser.errorCount > 0
			scope.RequestBail()
		End
		Return scope
	End
	
	' console is global!
	Function Console:VMConsole()
		Return g_Console
	End
	
	Global g_Console:VMConsole = New VMConsole()
End

Class VMConsole
	Method GetMessage:String()
		If BufferSize = 0 Then Return ""
		Local msg:String = out.Get(0)
		out.Remove(0)
		Return msg
	End
	
	Method Write:Void( str:String )
		If BufferSize = 0 Then Return
		While out.Length > BufferSize
			out.Remove(0)
		End
		out.Push(str)
	End
	
	Method IsEmpty:Bool()
		Return out.IsEmpty()
	End
	
	Method IsNotEmpty:Bool()
		Return Not out.IsEmpty()
	End
	
	Const BufferSize:Int = 16
	Field out:StringStack = New StringStack()
End

Class TypeOfDelegate Implements IVMDelegate
	Method Exec:VMValue(scope:VMScope, params:VMValue[])
		If params.Length = 1 And params[0] <> Null
			Return VMValue.CreateString(TypeToText(params[0].type))
		End
		Return VMValue.CreateString("undefined")
	End
	
	Function TypeToText:String( type:Int )
		Select type
			Case 0 Return "number"
			Case 1 Return "string"
			Case 2 Return "func"
			Case 3 Return "internal func"
			Case 4 Return "internal object"
			Case 5 Return "scope"
			Case 6 Return "special"
			Case 7 Return "null"
			Case 8 Return "array"
			Case 9 Return "object"
		End
		Return "undefined"
	End
	
	Function Instance:VMValue()
		If g_Instance = Null
			g_Instance = VMValue.CreateDelegate(New TypeOfDelegate())
		End
		Return g_Instance
	End
	
	Global g_Instance:VMValue
End

Class PrintDelegate Implements IVMDelegate
	Method Exec:VMValue(scope:VMScope, params:VMValue[])
		#If TARGET = "html5" Or TARGET = "flash"
		Local out:String
		For Local i:Int = 0 Until params.Length
			If params[i].type = VMValue.TYPE_FLOAT
				out += String(params[i].dataFloat) + " "
			ElseIf params[i].type = VMValue.TYPE_STRING
				out += params[i].dataStr + " "
				' my eyes
			ElseIf params[i].type = VMValue.TYPE_SCOPE And params[i].dataScope <> Null And
					VMScope.ValueNotNull(params[i].dataScope.GetVariable("toString")) And
					params[i].dataScope.GetVariable("toString").type = VMValue.TYPE_FUNC
				out += params[i].dataScope.Call("toString", []).dataStr + " "
			Else
				out += "(" + TypeOfDelegate.TypeToText(params[i].type) + ") "
			End
		Next
		If out.Length Then Print out[..-1] Else Print ""
		#Else
		Local sb:StringStack = New StringStack()
		For Local i:Int = 0 Until params.Length
			If params[i].type = VMValue.TYPE_FLOAT
				sb.Push String(params[i].dataFloat)
			ElseIf params[i].type = VMValue.TYPE_STRING
				sb.Push params[i].dataStr
				' my eyes again
			ElseIf params[i].type = VMValue.TYPE_SCOPE And params[i].dataScope <> Null And
					VMScope.ValueNotNull(params[i].dataScope.GetVariable("toString")) And
					params[i].dataScope.GetVariable("toString").type = VMValue.TYPE_FUNC
				sb.Push params[i].dataScope.Call("toString", []).dataStr
			Else
				sb.Push "(" + TypeOfDelegate.TypeToText(params[i].type) + ")"
			End
		Next
		Print sb.Join(" ")
		#End
		Return Null
	End
	
	Function Instance:VMValue()
		If g_Instance = Null
			g_Instance = VMValue.CreateDelegate(New PrintDelegate())
		End
		Return g_Instance
	End
	
	Global g_Instance:VMValue
End
