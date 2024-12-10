package {
	import org.flixel.*;

	public class GameOver extends FlxState {
		public var texte:FlxText;
		public var bouton:FlxButton;
		public var scoreGO:Number = Math.round(Jeu.score / 50);

		/* Images */
			[Embed(source = "data/images/contour.png")] private var ImgContour:Class;

		override public function create():void {
			/* Fond du jeu */
				FlxG.bgColor = 0xFF68C0FF;

			/* Création des textes */
				texte = new FlxText(0, (FlxG.height / 2) - 35, FlxG.width, "Game Over").setFormat(null, 8, 0xFF000000, "center");
				add(texte);

				texte = new FlxText(0, (FlxG.height / 2) - 10, FlxG.width, "" + scoreGO).setFormat(null, 16, 0xFF000000, "center");
				add(texte);

			/* Création des boutons */
				bouton = new FlxButton(FlxG.width / 2, FlxG.height / 2 + 15, "Rejouer", lancerJeu);
				bouton.x -= bouton.x / 2;
				add(bouton);

				bouton = new FlxButton(FlxG.width / 2, FlxG.height / 2 + 35, "Menu", lancerMenu);
				bouton.x -= bouton.x / 2;
				add(bouton);

			/* Contour du jeu */
				var contour:FlxSprite = new FlxSprite(0, 0, ImgContour);
				add(contour);

			/* Afficher la souris */
				FlxG.mouse.show();
		}

		override public function update():void {
			super.update();
		}

		private function lancerJeu():void {
			FlxG.switchState(new Jeu());
		}

		private function lancerMenu():void {
			FlxG.switchState(new Menu());
		}
	}
}