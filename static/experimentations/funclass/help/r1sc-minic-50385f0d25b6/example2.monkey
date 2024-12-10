Import vm
Import os

Class PrintDelegate Implements IVMDelegate
   Method Exec:VMValue(scope:VMScope, params:VMValue[])
      Return VMValue.CreateFloat(Print("Monkey print: " + params[0].dataStr))
   End
End


Function Main()
   Local vm:VM = new VM()
   Local script:String = LoadString("test2.mc")
   Local myScript:VMScope = vm.LoadScript(script)
   myScript.Register("print", New PrintDelegate)
   myScript.Exec()
   Local newScope:VMValue = myScript.Call("instance", [])
   newScope.dataScope.Call("onHit", [])
      'myScript.Call("item_name", [VMValue.CreateString("Star_Destroyer")]).dataStr
End