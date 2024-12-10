package {
	import org.flixel.*;
	import org.flixel.system.input.Input;
	import org.flixel.system.input.Keyboard;
	import flash.text.*

	public class Menu extends FlxState {
		public var texte:FlxText;
		public var logo:FlxSprite;

		/* Images */
			[Embed(source = "data/images/contour.png")] private var ImgContour:Class;
			[Embed(source = "data/images/curseur.png")] private var ImgCurseur:Class;
			[Embed(source = "data/images/logo.png")] private var ImgLogo:Class;

		override public function create():void {
			/* Fond du jeu */
				FlxG.bgColor = 0xFF444444;

			/* Création des textes */
				texte = new FlxText(2, 2, FlxG.width - 4, "Meilleur score local: " + MeilleurScore.meilleurScore + "").setFormat(null, 8, 0xFFFFFFFF, "right");
				add(texte);

				texte = new FlxText(2, FlxG.height - 14, FlxG.width - 4, "Version: 0.6.0").setFormat(null, 8, 0xFFFFFFFF, "left");
				add(texte);

				texte = new FlxText(2, FlxG.height - 35, FlxG.width - 4, "Cliquez pour jouer").setFormat(null, 8, 0xFFFFFFFF, "center");
				add(texte);

			/* Logo */
				logo = new FlxSprite(0, (FlxG.height / 2) - 25, ImgLogo);
				add(logo);

			/* Contour du jeu */
				var contour:FlxSprite = new FlxSprite(0, 0, ImgContour);
				add(contour);

			/* Afficher la souris */
				FlxG.mouse.show();
				FlxG.mouse.load(ImgCurseur, 1, 0, 0);
		}

		override public function update():void {
			if (FlxG.mouse.justPressed()) {
				lancerJeu();
			}

			super.update();
		}

		private function lancerJeu():void {
			FlxG.switchState(new Jeu());
		}
	}
}