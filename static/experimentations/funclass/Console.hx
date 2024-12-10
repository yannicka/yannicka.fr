package;

class Console {
	public static function print(text:String):Void {
		Sys.print(text);
	}

	public static function read():String {
		return Sys.stdin().readLine();
	}
}
