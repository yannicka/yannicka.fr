/* Déclaration du canvas */
	var canvas = document.getElementById('smiley');
	var context = canvas.getContext('2d');

/* Définition des variables */
	/* Tailles */
		var tailleNormale = 19;
		var pixelTaille = 5;
		var tailleGrande = tailleNormale * pixelTaille;

	/* Redessinage */
		var clic = [];
		var clicAnnuler = [];

	/* Actuel */
		var actCouleur = '#000000';
		var actCadrillage = false;
		var actCadrillagePosition = true;
		var actOutil = false;
		var actDessine = false;

/* Fonctions */
	function dessinePixel(x, y) {
		var color = '#000000';
		context.fillStyle = color;
		context.fillRect(x * 5, y * 5, pixelTaille, pixelTaille);
	}

	function addClic(x, y, dragging) {
		clicAnnuler = [];
		if(!in_array(x + '.' + y + '.' + actCouleur, clic)) {
			clic.push(x + '.' + y + '.' + actCouleur);
		}
	}

	function rgb2hex(rgb) {
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		return "#" +
		("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
		("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
		("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
	}

	function annuler() {
		clicAnnuler.push(clic.pop());

		dessin();
	}

	function repeter() {
		clic.push(clicAnnuler.pop());

		dessin();
	}

	function outilChanger() {
		if (actOutil == true) {
			$('#outilChanger').html('<img src="images/icones/pipette.png" alt="Activer le crayon" title="Activer le crayon" />');
			actOutil = false;
		} else {
			$('#outilChanger').html('<img src="images/icones/crayon.png" alt="Activer la pipette" title="Activer la pipette" />');
			actOutil = true;
		}

		dessin();
	}

	function previsualiser() {
		var ancCadrillage = actCadrillage;
		actCadrillage = false;
		dessin();
		var lien = canvas.toDataURL('image/png');
		$('#previsualisation').css('display', 'block');
		$('#imagePrevisualisation').attr('src', lien);
		actCadrillage = ancCadrillage;

		dessin();
	}

	function sauvegarder() {
		var lien = $('#imagePrevisualisation').attr('src');

		$.post('phps/envoi.php', { 'lien': lien }, function() {
			location.reload();
		});
	}

	function cadrillageActiver() {
		if (actCadrillage == true) {
			$('#cadrillageActiver').html('<img src="images/icones/cadrillageOff.png" alt="Cadrillage [OFF]" title="Activer le cadrillage" />');
			$('#cadrillagePosition').css('visibility', 'hidden');
			actCadrillage = false;
		} else {
			$('#cadrillageActiver').html('<img src="images/icones/cadrillageOn.png" alt="Cadrillage [ON]" title="D&eacute;sactiver le cadrillage" />');
			$('#cadrillagePosition').css('visibility', 'visible');
			actCadrillage = true;
		}

		dessin();
	}

	function cadrillagePosition() {
		if (actCadrillagePosition == true) {
			$('#cadrillagePosition').html('<img src="images/icones/cadrillageDerriere.png" alt="Mettre le cadrillage devant" title="Mettre le cadrillage devant" />');
			actCadrillagePosition = false;
		} else {
			$('#cadrillagePosition').html('<img src="images/icones/cadrillageDevant.png" alt="Mettre le cadrillage derri&egrave;re" title="Mettre le cadrillage derri&egrave;re" />');
			actCadrillagePosition = true;
		}

		dessin();
	}

	function cadrillage() {
		if (actCadrillage == true) {
			var color = '#CCCCCC';
			for (var x = 0 ; x <= tailleGrande ; x++) {
				for (var y = 0 ; y <= tailleGrande ; y++) {
					if (x == Math.floor(x / pixelTaille) * pixelTaille && y == Math.floor(y / pixelTaille) * pixelTaille) {
						context.strokeStyle = color;
						context.strokeRect(x, y, pixelTaille, pixelTaille);
					}
				}
			}

			context.strokeStyle = color;
			context.strokeRect(0, 0, tailleGrande, tailleGrande);
		}
	}

	function smileyContour() {
		/* Taille Normale : 15 */
		/*
			dessinePixel(5, 0);
			dessinePixel(6, 0);
			dessinePixel(7, 0);
			dessinePixel(8, 0);
			dessinePixel(9, 0);
			dessinePixel(3, 1);
			dessinePixel(4, 1);
			dessinePixel(10, 1);
			dessinePixel(11, 1);
			dessinePixel(2, 2);
			dessinePixel(12, 2);
			dessinePixel(1, 3);
			dessinePixel(1, 4);
			dessinePixel(13, 3);
			dessinePixel(13, 4);
			dessinePixel(0, 5);
			dessinePixel(0, 6);
			dessinePixel(0, 7);
			dessinePixel(0, 8);
			dessinePixel(0, 9);
			dessinePixel(14, 5);
			dessinePixel(14, 6);
			dessinePixel(14, 7);
			dessinePixel(14, 8);
			dessinePixel(14, 9);
			dessinePixel(1, 10);
			dessinePixel(1, 11);
			dessinePixel(13, 10);
			dessinePixel(13, 11);
			dessinePixel(2, 12);
			dessinePixel(12, 12);
			dessinePixel(3, 13);
			dessinePixel(4, 13);
			dessinePixel(10, 13);
			dessinePixel(11, 13);
			dessinePixel(5, 14);
			dessinePixel(6, 14);
			dessinePixel(7, 14);
			dessinePixel(8, 14);
			dessinePixel(9, 14);
		//*/

		/* Taille Normale : 19 */
		//*
			dessinePixel(7, 2);
			dessinePixel(8, 2);
			dessinePixel(9, 2);
			dessinePixel(10, 2);
			dessinePixel(11, 2);
			dessinePixel(5, 3);
			dessinePixel(6, 3);
			dessinePixel(12, 3);
			dessinePixel(13, 3);
			dessinePixel(4, 4);
			dessinePixel(14, 4);
			dessinePixel(3, 5);
			dessinePixel(3, 6);
			dessinePixel(15, 5);
			dessinePixel(15, 6);
			dessinePixel(2, 7);
			dessinePixel(2, 8);
			dessinePixel(2, 9);
			dessinePixel(2, 10);
			dessinePixel(2, 11);
			dessinePixel(16, 7);
			dessinePixel(16, 8);
			dessinePixel(16, 9);
			dessinePixel(16, 10);
			dessinePixel(16, 11);
			dessinePixel(3, 12);
			dessinePixel(3, 13);
			dessinePixel(15, 12);
			dessinePixel(15, 13);
			dessinePixel(4, 14);
			dessinePixel(14, 14);
			dessinePixel(5, 15);
			dessinePixel(6, 15);
			dessinePixel(12, 15);
			dessinePixel(13, 15);
			dessinePixel(7, 16);
			dessinePixel(8, 16);
			dessinePixel(9, 16);
			dessinePixel(10, 16);
			dessinePixel(11, 16);
		//*/
	}

	function cache() {
		dessinePixel(0, 0);
		dessinePixel(1, 0);
		dessinePixel(2, 0);
		dessinePixel(3, 0);
		dessinePixel(4, 0);
		dessinePixel(10, 0);
		dessinePixel(11, 0);
		dessinePixel(12, 0);
		dessinePixel(13, 0);
		dessinePixel(14, 0);
		dessinePixel(0, 1);
		dessinePixel(1, 1);
		dessinePixel(2, 1);
		dessinePixel(12, 1);
		dessinePixel(13, 1);
		dessinePixel(14, 1);
		dessinePixel(0, 2);
		dessinePixel(1, 2);
		dessinePixel(13, 2);
		dessinePixel(14, 2);
		dessinePixel(0, 3);
		dessinePixel(14, 3);
		dessinePixel(0, 4);
		dessinePixel(14, 4);
		dessinePixel(0, 10);
		dessinePixel(14, 10);
		dessinePixel(0, 11);
		dessinePixel(14, 11);
		dessinePixel(0, 12);
		dessinePixel(1, 12);
		dessinePixel(13, 12);
		dessinePixel(14, 12);
		dessinePixel(0, 13);
		dessinePixel(1, 13);
		dessinePixel(2, 13);
		dessinePixel(12, 13);
		dessinePixel(13, 13);
		dessinePixel(14, 13);
		dessinePixel(0, 14);
		dessinePixel(1, 14);
		dessinePixel(2, 14);
		dessinePixel(3, 14);
		dessinePixel(4, 14);
		dessinePixel(10, 14);
		dessinePixel(11, 14);
		dessinePixel(12, 14);
		dessinePixel(13, 14);
		dessinePixel(14, 14);
	}

	function in_array(string, arraya){
		for (i = 0; i < arraya.length; i++){
			if(arraya[i] == string){
				return true;
				alert('lol');
			}
		}
		return false;
	}

	function dessin() {
		canvas.width = canvas.width;

		var histo = clic;
		$('#historique').val(histo);

		if (actCadrillagePosition == false) {
			cadrillage();
		}

		for (i = 0 ; i <= clic.length - 1 ; i++) {
			/(.+)\.(.+)\.(.+)/i.exec(clic[i]);
			context.fillStyle = RegExp.$3;
			context.fillRect(RegExp.$1, RegExp.$2, pixelTaille, pixelTaille);
		}

		smileyContour();

		if (actCadrillagePosition == true) {
			cadrillage();
		}
	}

	function chargerImage() {
		var img = new Image();
		img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAABfCAYAAACOTBv1AAABSklEQVR4nO3XS47CMBBAwbn/pZkLOFISjF8+9aReAt3lFX9/D+mzs3rPRwY/DH4Y/DD4B9qLdfVqx1PVaLOqHU9Vo82qdjxVjTar2vFUNdqsasdTbRyyYgQ/DH4Y/DD469oF8/n8fvbustjnp8EPgx8GPwz+ohLURY90+eCHwQ+DHwZ/UaehR5/95vtW/MbG57Pgh8EPgx8GPwx+GPww+GHww+AvairMU2bVg8CHf62BD/+dAx/+Owc+/HcOfPjHFqzRZu0HHz58+PDhw4cPHz58+PDfhH+lB1lxB3z48OHDh3+7B5k9d4UeBT8Mfhj8MPhhU4+7+ozuzeRHy9RA8B86o3sz+dEyNRD8h87o3kx+o0c8yOiOTPRA8MPgh8EPg3+xfv7X/0vUx0CPgh8GPwx+GPwbdATn7Ggj+GHww+CHwZckSZIk6Xb9A+UBPjsavcIeAAAAAElFTkSuQmCC';
		img.onload = function() {
			context.drawImage(img,0,0);
		};
	}

/* Actions souris et actions clavier */
	/* Actions souris */
		$('#previsualiser').click(function() {
			previsualiser();
		});

		$('#cadrillagePosition').click(function() {
			cadrillagePosition();
		});

		$('#annuler').click(function() {
			annuler();
		});

		$('#repeter').click(function() {
			repeter();
		});

		$('#sauvegarder').click(function() {
			sauvegarder();
		});

		$('#cadrillageActiver').click(function() {
			cadrillageActiver();
		});

		$('#outilChanger').click(function() {
			outilChanger();
		});

		$('#smiley').mousemove(function() {
			actCouleur = $('#choixCouleurDessin').val();

			dessin();
		});

		$(document).everyTime(300, function() {
			var couleur = $('#choixCouleurDessin').val();
			$('#choixCouleurDessin').css('background-color', couleur);
			if (clicAnnuler.length == 0) {
				$('#repeter').css('visibility', 'hidden');
			} else {
				$('#repeter').css('visibility', 'visible');
			}
		});

		$('#sauvegarder').mouseover(function() {
			$(this).attr('src', 'images/icones/sauvegarderSurvol.png');
		}).mouseout(function() {
			$(this).attr('src', 'images/icones/sauvegarder.png');
		});

		/* Dessiner et ColorPicker */
			$('#smiley').mouseup(function(e) {
				actDessine = false;
			});

			$('#smiley').mousedown(function(e) {
				actDessine = true;
				var mouse = { x: (Math.floor((e.pageX - this.offsetLeft + 1) / pixelTaille) * pixelTaille), y: (Math.floor((e.pageY - this.offsetTop + 1) / pixelTaille) * pixelTaille) };
				if (actOutil == true) {
					addClic(mouse.x, mouse.y);
				} else {
					var imageData = context.getImageData(mouse.x, mouse.y, 1, 1);
					var pixel = imageData.data;
					var couleur = rgb2hex('rgb(' + pixel[0] + ', ' + pixel[1] + ', ' + pixel[2] + ')');
					$('#choixCouleurDessin').val(couleur);
				}

				dessin();
			});

			$('#smiley').mousemove(function(e) {
				if (actDessine == true && actOutil == true) {
					var mouse = { x: (Math.floor((e.pageX - this.offsetLeft + 1) / pixelTaille) * pixelTaille), y: (Math.floor((e.pageY - this.offsetTop + 1) / pixelTaille) * pixelTaille) };
					addClic(mouse.x, mouse.y);
				}

				dessin();
			});

	/* Action clavier */
		/* Aucune */

/* Au chargement */
	window.onload = function(){
		dessin();
		$('#choixCouleurDessin').myColorPicker();
		cadrillageActiver();
		cadrillagePosition();
		outilChanger();
	};