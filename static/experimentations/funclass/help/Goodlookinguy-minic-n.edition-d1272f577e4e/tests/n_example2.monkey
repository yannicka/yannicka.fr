Import minic
Import mojo

#TEXT_FILES="*.txt|*.xml|*.json|*.mc"

Function FalseVMValue:VMValue()
	Return VMValue.CreateFloat(0.0)
End

Class PrintDelegate Implements IVMDelegate
	Method Exec:VMValue(scope:VMScope, params:VMValue[])
		If params[0].type = VMValue.TYPE_FLOAT Then params[0].dataStr = String(params[0].dataFloat)
		Return VMValue.CreateFloat(Print("Monkey Script: " + params[0].dataStr))
	End
End

Class LoadImageDelegate Implements IVMDelegate
	Method Exec:VMValue(scope:VMScope, params:VMValue[])
		If params.Length() = 1
			Return VMValue.CreateObject(LoadImage(params[0].dataStr))
		ElseIf params.Length() = 2
			Return VMValue.CreateObject(LoadImage(params[0].dataStr, Int(params[1].dataFloat)))
		End
		Return VMValue.CreateObject(LoadImage(params[0].dataStr, Int(params[1].dataFloat), 
			Int(params[2].dataFloat)))
	End
End

Class DrawImageDelegate Implements IVMDelegate
	Method Exec:VMValue(scope:VMScope, params:VMValue[])
		If params.Length() = 3
			Return VMValue.CreateFloat(DrawImage(Image(params[0].dataObject), params[1].dataFloat, 
				params[2].dataFloat))
		End
		Return VMValue.CreateFloat(DrawImage(Image(params[0].dataObject), params[1].dataFloat, 
				params[2].dataFloat, Int(params[3].dataFloat)))
	End
End

Class DrawRectDelegate Implements IVMDelegate
	Method Exec:VMValue(scope:VMScope, params:VMValue[])
		Return VMValue.CreateFloat(DrawRect(params[0].dataFloat, params[1].dataFloat,
			params[2].dataFloat, params[3].dataFloat))
	End
End

Class KeyDownDelegate Implements IVMDelegate
	Method Exec:VMValue(scope:VMScope, params:VMValue[])
		If params[0].type = VMValue.TYPE_FLOAT
			Return VMValue.CreateFloat(Float(KeyDown(Int(params[0].dataFloat))))
		End
		
		Return FalseVMValue()
	End
End

Function Main()
	New ScriptMojo
End


Class ScriptMojo Extends App
	Field vm:VM = New VM()
	Field script:VMScope
	Field vmSelfObj:VMValue
	Field mcMojoFile:String = "mojo.mc"
	
	Method RegisterExternals:Void()
		script.Register("print", New PrintDelegate)
		script.Register("draw_rect", New DrawRectDelegate)
		script.Register("key_down", New KeyDownDelegate)
		script.Register("load_image", New LoadImageDelegate)
		script.Register("draw_image", New DrawImageDelegate)
	End
	
	Method OnCreate()
		SetUpdateRate(30)
		script = vm.LoadScript(LoadString(mcMojoFile))
		vmSelfObj = VMValue.CreateObject(Self)
		
		RegisterExternals()
		script.Exec()
		
		script.Call("on_create", [vmSelfObj])
	End
	
	Method OnUpdate()
		If KeyDown(KEY_CONTROL) And KeyHit(KEY_R)
			script = vm.LoadScript(LoadString(mcMojoFile))
			RegisterExternals()
			script.Exec()
			Print("Script Reloaded")
		End
		
		script.Call("on_update", [vmSelfObj])
	End
	
	Method OnRender()
		Cls()
		script.Call("on_render", [vmSelfObj])
	End
End
