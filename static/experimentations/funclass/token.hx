package;

class Token {
	public var data:String;
	public var type:String;
	public var line:Int;
	
	public function new(type:String) {
		this.type = type;
	}
}
