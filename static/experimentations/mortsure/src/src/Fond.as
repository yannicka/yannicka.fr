package  {
	import org.flixel.*;

	public class Fond extends FlxSprite {
		[Embed(source = "data/images/fond.png")] private var ImgFond:Class;

		public function Fond():void {
			super(0, 0);
			loadGraphic(ImgFond, true, false, FlxG.width, FlxG.height * 5, false);

			width = 150;
			height = FlxG.height * 5;
			offset.x = 0;
			offset.y = 0;

			velocity.y = -2;
		}

		override public function update():void {
			if (y <= -FlxG.height * 4) {
				y = 0;
			}

			super.update();
		}
	}
}