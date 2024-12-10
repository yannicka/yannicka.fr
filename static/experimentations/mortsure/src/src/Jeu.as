package {
	import org.flixel.*;
	import org.flixel.system.*
	import flash.net.*

	public class Jeu extends FlxState {
		public var curseurJoueur:FlxSprite;
		public var couche:FlxSprite;
		public var decor:FlxSprite;
		public var texte:FlxText;

		static public var score:Number = 0; /* "Static" permet de rendre la variable "global" */

		protected var _joueur:Joueur;
		protected var _fond:Fond;

		private var _timer:Number;
		private var _interval:Number = 2.0;
		private var _sol:FlxGroup;
		private var _lave:FlxGroup;

		/* Images */
			[Embed(source="data/images/fond.png")] private var ImgFond:Class;
			[Embed(source="data/images/contour.png")] private var ImgContour:Class;
			[Embed(source = "data/images/decor.png")] private var ImgDecor:Class;
			[Embed(source = "data/images/couche.png")] private var ImgCouche:Class;
			[Embed(source = "data/images/curseur_joueur.png")] private var ImgCurseurJoueur:Class;

		override public function create():void{
			/* Fond du jeu */
				FlxG.bgColor = 0xFF000000;
				_fond = new Fond;
				add(_fond);

			/* Décor du jeu */
				FlxG.bgColor = 0xFF68C0FF;
				decor = new FlxSprite(0, 0, ImgDecor);
				add(decor);

			/* Lave tueuse */
				_lave = new FlxGroup();
				add(_lave);
				_lave.add(new Lave());

			/* Création des sols de départs */
				_sol = new FlxGroup();
				add(_sol);
				_sol.add(new Sol(0, 85));
				_sol.add(new Sol(130, 57));
				_sol.add(new Sol(290, 75));
				resetTimer();

			/* Cusreur du perso */
				curseurJoueur = new FlxSprite(0, 0, ImgCurseurJoueur);
				add(curseurJoueur);

			/* Création du joueur */
				_joueur = new Joueur;
				add(_joueur);

			/* Création du score */
				texte = new FlxText(2, 2, FlxG.width - 4, "Score: " + score).setFormat(null, 8, 0xFFFFFFFF, "right");
				add(texte);

			/* Couche de sombre */
				couche = new FlxSprite(0, 0, ImgCouche);
				couche.alpha = 0.5;
				add(couche);

			/* Contour du jeu */
				var contour:FlxSprite = new FlxSprite(0, 0, ImgContour);
				add(contour);

			/* Remise à zéro du score */
				score = 0;

			/* Afficher la souris */
				FlxG.mouse.hide();
		}

		override public function update():void {
			/* Cacher / Afficher le curseur du joueur */
				if (_joueur.y > 0 - _joueur.height) {
					curseurJoueur.visible = false;
				} else {
					curseurJoueur.visible = true;
					curseurJoueur.x = _joueur.x - (_joueur.width / 2) + 2;
				}

			/* Accélération à 0 pour pas avancer sans appuyer */
				_joueur.acceleration.x = 0;

			/* Timer */
				_timer -= FlxG.elapsed;

			/* Score+1 + affichage du score */
				score += 1;
				texte.text = "Score: " + Math.round(score / 50);

			/* Morts */
				if (_joueur.x <= 0 - _joueur.width || _joueur.y >= FlxG.width - _joueur.height || _joueur.x >= FlxG.width + _joueur.width || _joueur.overlaps(_lave)) {
					if (MeilleurScore.meilleurScore < Math.round(score / 50)) {
						MeilleurScore.meilleurScore = Math.round(score / 50);
					}

					// var req:URLRequest = new URLRequest("http://mortsure.hostoi.com/index.php?mysuperscore=" + Math.round(score / 50));
					// navigateToURL(req, "_parent");

					mort();
					/*	FlxU.openURL("http://www.google.fr/");
						var url:String = "http://blog.la-recette.net/" ;
						var variables:URLVariables = new URLVariables( ) ;
						variables.maVar1 = "Ma valeur" ;
						var request:URLRequest = new URLRequest( url ) ;
						request.data = variables ;
						navigateToURL(request) ;
					*/
				}

			/* Update */
				super.update();

			/* Création du sol + reset du timer */
				if(_timer < 0) {
					creerSol();
					resetTimer();
				}

				var fondI = -_fond.y;
				if (fondI >= 120 && fondI < 180) {
					couche.alpha = 0.2;
				} else if (fondI >= 180 && fondI < 360) {
					couche.alpha = 0;
				} else if (fondI >= 360 && fondI < 420) {
					couche.alpha = 0.2;
				} else {
					couche.alpha = 0.5;
				}

			/* Défilé du décor */
				decor.velocity.x = -25;
				if (decor.x <= -150) {
					decor.x = 0;
				}

			/* Collisions du joueur */
				FlxG.collide(_sol, _joueur);
		}

		private function resetTimer():void /* Reset du timer pour création des sols */ {
			_timer = _interval;
			_interval = 1 + Math.round(FlxG.random() * 1);
		}

		private function creerSol():void /* Création du sol */ {
			var x:Number = FlxG.width;
			var rand = new Array();
			for (var i = 0 ; i <= 4 ; i++) {
				rand[i] = Math.round(FlxG.random());
			}
			var y:Number = 20 + ((rand[0] * 20) * (rand[1] + rand[2] + rand[3] + rand[4]));
			_sol.add(new Sol(x, y));
		}

		private function mort():void /* Mort */ {
			FlxG.log("Mort");

			if (MeilleurScore.meilleurScore < Math.round(score / 50)) {
				MeilleurScore.meilleurScore = Math.round(score / 50);
			}

			FlxG.switchState(new GameOver());
		}
	}
}