package  {
	import org.flixel.*;

	public class Lave extends FlxSprite {
		[Embed(source = "data/images/lave.png")] private var ImgLave:Class;

		public function Lave():void {
			super(0, FlxG.height - 12);
			loadGraphic(ImgLave, true, false, 150, 30, false);

			height = 30;
			width = 150;
			offset.y = 8;

			addAnimation("bouge", [0, 1, 2], 6, true);
			play("bouge");
		}
	}
}