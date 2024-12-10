package {
	import org.flixel.*;

	public class Joueur extends FlxSprite {
		[Embed(source = "data/images/joueur.png")] private var ImgJoueur:Class;
		[Embed(source = "data/sons/saute.mp3")] protected var SonSaute:Class;

		public var videSaut:Boolean = true;
		public var simpleSaut:Boolean = true;
		public var doubleSaut:Boolean = false;

		public function Joueur():void {
			/* Création du perso */
				super(FlxG.width - 20, 0, ImgJoueur);
				loadGraphic(ImgJoueur, true, false, 22, 22, false);

			/* Animation du joueur */
				addAnimation("rien", [2], 0, false);
				addAnimation("marche", [2, 3, 4, 0, 1], 12, true);

			/* Collisions */
				width = 14;
				height = 22;
				offset.x = 4;

			/* Puissance des sauts + vitesse */
				maxVelocity.x = 150;
				maxVelocity.y = 380;
				acceleration.y =  500;
				drag.x = maxVelocity.x * 4;
		}

		override public function update():void {
			/* Déplacement du joueur */
				/* Marche */
					/* Gauche / Droite */
						if (FlxG.keys.LEFT && x >= 0) {
							acceleration.x = -maxVelocity.x * 4;
						}

						if (FlxG.keys.RIGHT) {
							acceleration.x = maxVelocity.x * 4;
						}

						if (FlxG.keys.LEFT || FlxG.keys.RIGHT) {
							play("marche");
						} else {
							play("rien");
						}

				/* Sauts */
					/* Saut basique */
						if (FlxG.keys.justPressed("UP") && simpleSaut == true && doubleSaut == false && (isTouching(FlxObject.FLOOR))) {
							velocity.y = -maxVelocity.y / 2;
							simpleSaut = false;
							doubleSaut = true;
							FlxG.play(SonSaute, 1.0, false, true);
							FlxG.log("Saut basique");
						}

					/* Double saut */
						if (FlxG.keys.justPressed("UP") && simpleSaut == false && doubleSaut == true && !isTouching(FlxObject.FLOOR)) {
							velocity.y = -maxVelocity.y / 2;
							videSaut = false;
							simpleSaut = true;
							doubleSaut = false;
							FlxG.log("Double saut");
						}

						if (velocity.y == 0 && simpleSaut == false && doubleSaut == true && isTouching(FlxObject.FLOOR)) {
							simpleSaut = true;
							doubleSaut = false;
							FlxG.log("N'a pas double sauté");
						}

					/* Saut dans le vide */
						if (isTouching(FlxObject.FLOOR)) {
							videSaut = true;
						}

						if (FlxG.keys.justPressed("UP") && simpleSaut == true && doubleSaut == false && videSaut == true && (!isTouching(FlxObject.FLOOR))) {
							velocity.y = -maxVelocity.y / 2;
							videSaut = false;
							simpleSaut = true;
							doubleSaut = false;
							FlxG.log("Saut dans le vide");
						}

					/* Saut contre le mur */
						if (FlxG.keys.justPressed("UP") && isTouching(FlxObject.WALL)) {
							velocity.y = -maxVelocity.y / 2.5;
							FlxG.log("Saut contre un mur");
						}

					/* Les mals */
						/* A gauche c'est le mal */
							if (x <= 0 && !isTouching(FlxObject.WALL)){
								x = 1;
							}

						/* A droite c'est le mal */
							if (x >= FlxG.width - width){
								x = FlxG.width - width - 1;
							}
		}
	}
}