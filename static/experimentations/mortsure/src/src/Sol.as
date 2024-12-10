package  {
	import org.flixel.*;

	public class Sol extends FlxSprite {
		public function Sol(x: Number, y: Number):void {
			super(x, y);

			new FlxSprite(x, y);
			makeGraphic(70 + (FlxG.random() * 70), 200, 0xFF222222);

			immovable = true;
			solid = true;

			velocity.x = -75 - (FlxG.random() * 70);
		}

		override public function update():void {
			if (x < 0 - width - 22) {
				kill();
			}

			super.update();
		}
	}
}