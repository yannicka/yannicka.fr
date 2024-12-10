/* Fonctions de dessins */
	/* Dessine le niveau */
		function dessineNiveau() {
			nbCasesVide = -nbInfinies;

			for (var y = 0 ; y < niveauHauteur ; y++) {
				for (var x = 0 ; x < niveauLargeur ; x++) {
					var contenu = niveau[y][x];

					if (contenu >= 0) {
						if (contenu == cases.sol) {
							context.drawImage(image.sol, x * niveauZoom, y * niveauZoom, niveauZoom, niveauZoom);
							nbCasesVide += 1;
						} else if (contenu == cases.mur) {
							context.drawImage(image.mur, x * niveauZoom, y * niveauZoom, niveauZoom, niveauZoom);
						} else if (contenu == cases.solTraverse) {
							context.drawImage(image.solTraverse, x * niveauZoom, y * niveauZoom, niveauZoom, niveauZoom);
						}
					}
				}
			}
		}

	/* Dessine le joueur */
		function dessineJoueur() {
			context.drawImage(image.joueur, joueur.sens * zoomBase - zoomBase, 0, zoomBase, zoomBase, joueur.x * niveauZoom, joueur.y * niveauZoom, niveauZoom, niveauZoom);
		}

	/* Dessine les piques */
		function dessinePiques() {
			for (var i in piques) {
				if (nbDeplacementsJoueur % (piques[i].o + piques[i].c) + 1 <= piques[i].o) {
					piques[i].ouvert = true;
				} else {
					piques[i].ouvert = false;
				}

				if (piques[i].ouvert == true) {
					context.drawImage(image.piques, 0, 0, zoomBase, zoomBase, piques[i].x * niveauZoom, piques[i].y * niveauZoom, niveauZoom, niveauZoom);
				}
			}
		}

	/* Dessine les pousseurs */
		function dessinePousseurs() {
			for (var i in pousseurs) {
				context.drawImage(image.pousseur, pousseurs[i].sens * zoomBase - zoomBase, 0, zoomBase, zoomBase, pousseurs[i].x * niveauZoom, pousseurs[i].y * niveauZoom, niveauZoom, niveauZoom);
			}
		}

	/* Dessine les téléporteurs */
		function dessineTeleporteurs() {
			for (var i in teleporteurs) {
				context.drawImage(image.teleporteurDepart, 0, 0, zoomBase, zoomBase, teleporteurs[i].xDepart * niveauZoom, teleporteurs[i].yDepart * niveauZoom, niveauZoom, niveauZoom);
				context.drawImage(image.teleporteurArrive, 0, 0, zoomBase, zoomBase, teleporteurs[i].xArrive * niveauZoom, teleporteurs[i].yArrive * niveauZoom, niveauZoom, niveauZoom);
			}
		}

	/* Dessine les portes (+ les clés) */
		function dessinePortes() {
			for (var i in portes) {
				if (portes[i].porteOuverte == false) {
					context.drawImage(image.porte, 0, 0, zoomBase, zoomBase, portes[i].xPorte * niveauZoom, portes[i].yPorte * niveauZoom, niveauZoom, niveauZoom);
				}

				if (portes[i].cleRamasse == false) {
					context.drawImage(image.cle, 0, 0, zoomBase, zoomBase, portes[i].xCle * niveauZoom, portes[i].yCle * niveauZoom, niveauZoom, niveauZoom);
				}
			}
		}

	/* Dessine les caisses */
		function dessineCaisses() {
			for (var i in caisses) {
				context.drawImage(image.caisse, caisses[i].x * niveauZoom, caisses[i].y * niveauZoom, niveauZoom, niveauZoom);
			}
		}

	/* Dessine les interrupteurs (+ les rochers avec des traits) */
		function dessineInterrupteurs() {
			for (var i in interrupteurs) {
				if (interrupteurs[i].ouvert == false) {
					/* Dessine l'interrupteur */
						context.drawImage(image.interrupteur, interrupteurs[i].xInterrupteur * niveauZoom, interrupteurs[i].yInterrupteur * niveauZoom, niveauZoom, niveauZoom);

					/* Dessine le rocher */
						context.drawImage(image.rocher, interrupteurs[i].xRocher * niveauZoom, interrupteurs[i].yRocher * niveauZoom, niveauZoom, niveauZoom);

					/* Dessine le trait qui relie le l'interrupteur et le rocher -> enlevé */
						/* context.beginPath();
						context.strokeStyle = 'rgba(25, 25, 255, .2)';
						context.lineWidth = 2;
						context.lineCap = 'round';
						context.moveTo(interrupteurs[i].xInterrupteur * niveauZoom + (niveauZoom / 2), interrupteurs[i].yInterrupteur * niveauZoom + (niveauZoom / 2));
						context.lineTo(interrupteurs[i].xRocher * niveauZoom + (niveauZoom / 2), interrupteurs[i].yRocher * niveauZoom + (niveauZoom / 2));
						context.stroke(); */

					/* Affiche le signe */
						context.font = '12px Arial';
						context.textAlign = 'center';
						context.fillStyle  = 'rgba(0, 0, 0, .4)';
						context.fillText(interrupteurs[i].signe, interrupteurs[i].xInterrupteur * niveauZoom + (zoomBase / 2), interrupteurs[i].yInterrupteur * niveauZoom + 4 + (zoomBase / 2));
						context.fillStyle  = 'rgba(255, 255, 255, .4)';
						context.fillText(interrupteurs[i].signe, interrupteurs[i].xRocher * niveauZoom + (zoomBase / 2), interrupteurs[i].yRocher * niveauZoom + 4 + (zoomBase / 2));
				}
			}
		}

	/* Dessine les infinies */
		function dessineInfinies() {
			for (var i in infinies) {
				context.drawImage(image.infinie, infinies[i].x * niveauZoom, infinies[i].y * niveauZoom, niveauZoom, niveauZoom);
			}
		}
