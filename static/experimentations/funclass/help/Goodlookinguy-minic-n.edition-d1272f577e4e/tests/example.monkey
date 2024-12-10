Import vm

Class PrintDelegate Implements IVMDelegate
   Method Exec:VMValue(scope:VMScope, params:VMValue[])
      Return VMValue.CreateFloat(Print("Monkey print: " + params[0].dataStr))
   End
End

Function Main()
   Local vm:VM = new VM()
   Local myScript:VMScope = vm.LoadScript("a = 1; if(a == 2){ print('Its 1'); }else{ print('Its something else'); }")
   myScript.Register("print", New PrintDelegate)
   myScript.Exec()
End