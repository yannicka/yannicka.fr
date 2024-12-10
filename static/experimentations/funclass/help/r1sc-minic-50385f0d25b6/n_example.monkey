Import vm
Import os

Function FalseVMValue:VMValue()
	Return VMValue.CreateFloat(0.0)
End

Class PrintDelegate Implements IVMDelegate
	Method Exec:VMValue(scope:VMScope, params:VMValue[])
		If params[0].type = VMValue.TYPE_FLOAT Then params[0].dataStr = String(params[0].dataFloat)
		Print "Monkey Script: " + params[0].dataStr
		
		Return FalseVMValue()
	End
End

Class FileSizeDelegate Implements IVMDelegate
	Method Exec:VMValue(scope:VMScope, params:VMValue[])
		If params[0].type = VMValue.TYPE_STRING
			Return VMValue.CreateFloat(FileSize(params[0].dataStr))
		End
		
		Return FalseVMValue()
	End
End


Function Main()
	Local vm:VM = new VM()
	Local script:String = LoadString("n_test.mc")
	Local myScript:VMScope = vm.LoadScript(script)
	
	myScript.Register("print", New PrintDelegate)
	myScript.Register("file_size", New FileSizeDelegate)
	myScript.Exec()
	
End
