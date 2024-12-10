package;

class ParserNode {
	public var type:String;
	public var left:ParserNode;
	public var right:ParserNode;
	public var dataStr:String;
	public var dataFloat:Null<Float>;

	public function new(type:String) {
		this.type = type;
		this.left = null;
		this.right = null;
		this.dataStr = null;
		this.dataFloat = null;
	}
}
