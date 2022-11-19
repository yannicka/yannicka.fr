/* Fonctions */
	/* Annonce la fin du niveau */
		function victoire() {
			/* Si toutes les sols ont été recouvert, on lance la victoire */
				if (nbCasesVide == nbCaisses) {
					/* Stop la boucle de mise à jour du jeu */
						clearInterval(Update);

					/* Destruction du jeu après 0.5 secondes */
						setTimeout(function() { Destroy('rgba(255, 255, 255, .6)', 'rgba(140, 240, 140, .6)', 'rgb(50, 120, 50)', 'Victoire') }, 500);

					/* Redirection au prochain niveau */
						$.post('win.php', { 'OO': '00' }, function() {
							location.href = 'victoire';
						});
				}
		}

	/* */
		function defaite() {
			/* Stop la boucle de mise à jour du jeu */
				clearInterval(Update);

			/* Destruction du jeu après 0.2 secondes */
				setTimeout(function() { Destroy('rgba(240, 140, 140, .6)', 'rgba(0, 0, 0, .6)', 'rgb(120, 50, 50)', 'Défaite') }, 500);
		}

	/* Fonctions de déplacement du joueur */
		/* Fonction de déplacement du joueur lors de l'appuie d'une touche de clavier */
			document.onkeydown = function(e) {
				if (e.keyCode == '38' || e.keyCode == '90') { deplacement('haut'); }
				if (e.keyCode == '40' || e.keyCode == '83') { deplacement('bas'); }
				if (e.keyCode == '37' || e.keyCode == '81') { deplacement('gauche'); }
				if (e.keyCode == '39' || e.keyCode == '68') { deplacement('droite'); }
			}

		/* Déplace le joueur */
			function deplacement(ou) {
				/* Initialisation des variables interne à la fonction */
					var
						nvJoueur,
						nvCaisse,
						touche = false;

				/* Change la variable [nvJoueur] suivant la direction du joueur */
					if (ou == 'haut') { nvJoueur = {
						x: joueur.x,
						y: joueur.y - 1,
						sens: 1
					} } else if (ou == 'bas') { nvJoueur = {
						x: joueur.x,
						y: joueur.y + 1,
						sens: 2
					} } else if (ou == 'gauche') { nvJoueur = {
						x: joueur.x - 1,
						y: joueur.y,
						sens: 3
					} } else if (ou == 'droite') { nvJoueur = {
						x: joueur.x + 1,
						y: joueur.y,
						sens: 4
					} }

				var i = yAQuoiLa(nvJoueur.x, nvJoueur.y);
				//alert(i);

				if (i == 'interrupteur') {
					alert('BOOM');
				}

				joueur.x = nvJoueur.x;
				joueur.y = nvJoueur.y;

				if (niveau[nvJoueur.y][nvJoueur.x] == cases.sol && touche == false) {
					niveau[nvJoueur.y][nvJoueur.x] = cases.solTraverse;

					joueur.x = nvJoueur.x;
					joueur.y = nvJoueur.y;
					joueur.sens = nvJoueur.sens;

					nbDeplacementsJoueur++;

					if (yAQuoiLa(nvJoueur.x, nvJoueur.y, 'pique-boolean') == true) {
						dessineNiveau();
						dessinePiques();
						dessineTeleporteurs();
						dessinePortes();
						dessinePousseurs();
						dessineInterrupteurs();
						dessineInfinies();
						dessineCaisses();
						dessineJoueur();

						defaite();
					}
				}
			}

	/* Y a quoi là ? */
		function yAQuoiLa(x, y) {
			for (var i in interrupteurs) {
				if (x == interrupteurs[i].xInterrupteur && y == interrupteurs[i].yInterrupteur && interrupteurs[i].ouvert == true) {
					return 'interrupteur';
				}
			}
		}
