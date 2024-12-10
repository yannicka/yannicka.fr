package;

class VMValue {
	public static inline var TYPE_FLOAT:Int = 0;
	public static inline var TYPE_STRING:Int = 1;
	public static inline var TYPE_FUNC:Int = 2;
	public static inline var TYPE_DELEGATE:Int = 3;
	public static inline var TYPE_OBJECT:Int = 4;
	public static inline var TYPE_SCOPE:Int = 5;

	public var type:Int;
	public var dataStr:String;
	public var dataFloat:Float;
	public var dataObject:Dynamic;
	public var dataScope:VMScope;

	// For functions
	public var dataParams:List<String>;
	public var dataBody:ParserNode;
	public var dataDelegate:IVMDelegate;

	public function new() {
	}

	public static function createFloat(data:Float):VMValue {
		var vmValue:VMValue = new VMValue();
		vmValue.type = TYPE_FLOAT;
		vmValue.dataFloat = data;
		return vmValue;
	}

	public static function createString(data:String):VMValue {
		var vmValue:VMValue = new VMValue();
		vmValue.type = TYPE_STRING;
		vmValue.dataStr = data;
		return vmValue;
	}

	public static function createObject(data:Dynamic):VMValue {
		var vmValue:VMValue = new VMValue();
		vmValue.type = TYPE_OBJECT;
		vmValue.dataObject = data;
		return vmValue;
	}

	public static function createScope(data:VMScope):VMValue {
		var vmValue:VMValue = new VMValue();
		vmValue.type = TYPE_SCOPE;
		vmValue.dataScope = data;
		return vmValue;
	}

	public static function createFunc(params:List<String>, body:ParserNode):VMValue {
		var vmValue:VMValue = new VMValue();
		vmValue.type = TYPE_FUNC;
		vmValue.dataParams = params;
		vmValue.dataBody = body;
		return vmValue;
	}

	public static function createDelegate(delegate:IVMDelegate):VMValue {
		var vmValue:VMValue = new VMValue();
		vmValue.type = TYPE_DELEGATE;
		vmValue.dataDelegate = delegate;
		return vmValue;
	}
}
