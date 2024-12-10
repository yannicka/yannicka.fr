Import minic
Import mcbindings	' you need this https://bitbucket.org/Goodlookinguy/minic-commonbindings
Import mojo

#TEXT_FILES+="*.mc"

Function Main()
	New Example()
End

Class Example Extends App
	Method OnCreate()
		SetUpdateRate(30)
		Local vm:VM = new VM()
		Local script:String = LoadString("test.mc")
		
		Local myScript:VMScope = vm.LoadScript(script)
		
		MCRegisterMonkey(myScript)
		myScript.Register("vec2d", New Vector2DDelegate())
		
		myScript.Exec()
	End
End

Class Vector2DDelegate Implements IVMDelegate
	Method Exec:VMValue(scope:VMScope, params:VMValue[])
		Return VMValue.CreateObject(New VMVector2D())
	End
End

Class VMVector2D Implements IVMOverloadPlus, IVMObjectInterface
	Field x:Float
	Field y:Float
	
	Method New()
		x = Rnd(3, 100)
		y = Rnd(3, 100)
	End
	
	Method VMPlus:VMValue( scope:VMScope, value:VMValue )
		Local vector1 := New VMVector2D()
		Local vector2 := VMVector2D(value.dataObject)
		
		If vector1 = Null
			scope.RuntimeErr("A Vector2D object can only be added to another Vector2D object")
		End
		
		vector1.x = x + vector2.x
		vector1.y = y + vector2.y
		
		Return VMValue.CreateObject(vector1)
	End
	
	Method VMSet:VMValue( scope:VMScope, varName:String, data:VMValue )
		Select varName
			Case "x" x = data.dataFloat
			Case "y" y = data.dataFloat
			Default scope.RuntimeErr("No context for '" + varName + "' found in internal object")
		End
		
		Return VMGet(scope, varName)
	End
	
	Method VMGet:VMValue( scope:VMScope, varName:String )
		Select varName
			Case "x" Return VMValue.CreateFloat(x)
			Case "y" Return VMValue.CreateFloat(y)
			Default scope.RuntimeErr("No context for '" + varName + "' found in internal object")
		End
		
		Return Null
	End
	
	Method VMCall:VMValue( scope:VMScope, varName:String, params:VMValue[] )
		Select varName
			Case "magnitude"	Return VMValue.CreateFloat( Sqrt(x * x + y * y) )
		End
		
		Return Null
	End
End
