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
		Local script:String = LoadString("script.mc")
		
		Local myScript:VMScope = vm.LoadScript(script)
		myScript.body.PrintDebug()
		
		MCRegisterMonkey(myScript)
		
		myScript.Exec()
	End
End
