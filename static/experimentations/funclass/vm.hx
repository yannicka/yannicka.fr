package;

class VM {
	public var globalScope:VMScope;
	
	// TODO: Allow override of global script
	public function new() {
		globalScope = loadScript("false=0; true=1;");
		globalScope.exec();
	}
	
	public function loadScript(input:String, parentScope:VMScope = null):VMScope {
		if (parentScope == null) {
			parentScope = globalScope;
		}
	  
		var parser:Parser = new Parser(input);
		return new VMScope(parentScope, parser.parse());
	}
}
