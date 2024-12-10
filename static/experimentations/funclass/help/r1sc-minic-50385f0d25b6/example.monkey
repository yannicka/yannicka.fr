Import vm

Class PrintDelegate Implements IVMDelegate
   Method Exec:VMValue(scope:VMScope, params:VMValue[])
      Return VMValue.CreateFloat(Print("Monkey print: " + params[0].dataFloat))
   End
End

Function Main()
   Local vm:VM = new VM()
   Local myScript:VMScope = vm.LoadScript("print(2);")
   myScript.Register("print", New PrintDelegate)
   myScript.Exec()
End