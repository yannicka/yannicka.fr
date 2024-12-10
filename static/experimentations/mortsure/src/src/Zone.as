package {
	import org.flixel.*;

	[SWF(width="600", height="480", backgroundColor="#000000")]
	[Frame(factoryClass = "Preloader")]

	public class Zone extends FlxGame {
		public var score:Number = 0;

		public function Zone() {
			super(150, 120, Menu, 4);
			forceDebugger = true;
			MeilleurScore.load();
		}
	}
}