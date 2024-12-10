/* Déclaration du canvas */
	var canvas = document.getElementById('smiley');
	var context = canvas.getContext('2d');
	var canvasDiv = '#smiley';

/* Désactivation du clic droit */
	$(canvas).bind('contextmenu', function(e){
		return false;
	});

/* Définition des variables */
	/* Tailles */
		var pixelTaille = 5;
		var tailleNormale = 19;
		var tailleGrande = tailleNormale * pixelTaille;

	/* Redessinage */
		var clicLaisser = [];
		var clicAnnuler = [];

	/* Enregistrement */
		var clicLaisserE = [];
		var clicAnnulerE = [];

	/* Actuel */
		var actPixelCouleur = '#000000';
		var actPixelOutil = 'crayon';
		var actDessine = false;
		var actCadrillage = true;

/* Actions */
	/* Souris */
		$('#changerOutil').live('click', function() {
			changerOutil();

			actions();
		});

		$('#annuler').live('click', function() {
			annuler();

			actions();
			dessine();
		});

		$('#repeter').live('click', function() {
			repeter();

			actions();
			dessine();
		});

		$('#previsualiser').live('click', function() {
			previsualiser();

			actions();
			dessine();
		});

		$('#enregistrer').live('click', function() {
			enregistrer();
		});

		$('#enregistrerImage').mouseover(function() {
			$(this).attr('src', 'images/icones/enregistrerSurvol.png');
		}).mouseout(function() {
			$(this).attr('src', 'images/icones/enregistrer.png');
		});

		/* Dessine */
			$('#smiley').mouseup(function(e) {
				actDessine = false;

				actions();
			});

			$('#smiley').mousedown(function(e) {
				var mouse = { x: (Math.floor((e.pageX - this.offsetLeft + 1) / pixelTaille) * pixelTaille), y: (Math.floor((e.pageY - this.offsetTop + 1) / pixelTaille) * pixelTaille) };
				var imageData = context.getImageData(mouse.x, mouse.y, 1, 1);
				var pixel = imageData.data;
				var couleur = rgb2hex('rgb(' + pixel[0] + ', ' + pixel[1] + ', ' + pixel[2] + ')').toUpperCase();

				actDessine = true;

				if (actPixelOutil == 'crayon') {
					addClic(mouse.x, mouse.y);
				} else if (actPixelOutil == 'pipette') {
					actPixelCouleur = couleur;
					$('#choixCouleurDessin').val(couleur);
					$('#choixCouleurDessin').css('background-color', couleur);
				} else if (actPixelOutil = 'gomme') {
					var suppr = mouse.x + '.' + mouse.y + '.' + couleur;
					if(in_array(suppr, clicLaisser)) {
						clicLaisser.splice(clicLaisser.indexOf(suppr), 1);
						clicAnnuler.push(suppr);
					}
				}

				dessine();
			});

			$('#smiley').mousemove(function(e) {
				var mouse = { x: (Math.floor((e.pageX - this.offsetLeft + 1) / pixelTaille) * pixelTaille), y: (Math.floor((e.pageY - this.offsetTop + 1) / pixelTaille) * pixelTaille) };

				if (actDessine) {
					var imageData = context.getImageData(mouse.x, mouse.y, 1, 1);
					var pixel = imageData.data;
					var couleur = rgb2hex('rgb(' + pixel[0] + ', ' + pixel[1] + ', ' + pixel[2] + ')').toUpperCase();

					if (actPixelOutil == 'crayon') {
						addClic(mouse.x, mouse.y);
					} else if (actPixelOutil == 'pipette') {
						actPixelCouleur = couleur;
						$('#choixCouleurDessin').val(couleur);
						$('#choixCouleurDessin').css('background-color', couleur);
					} else if (actPixelOutil = 'gomme') {
						var suppr = mouse.x + '.' + mouse.y + '.' + couleur;
						if(in_array(suppr, clicLaisser)) {
							clicLaisser.splice(clicLaisser.indexOf(suppr), 1);
							clicAnnuler.push(suppr);
						}
					}
				}

				dessine();
			});

/* Fonctions */
	/* Utilitaires */
		function smileyContour() {
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
		}

		function rgb2hex(rgb) {
			rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

			function hex(x) {
				return ("0" + parseInt(x).toString(16)).slice(-2);
			}

			return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		}

		function dessinePixel(x, y) {
			var color = '#000000';
			context.fillStyle = color;
			context.fillRect(x * 5, y * 5, pixelTaille, pixelTaille);
		}

		function cadrillage() {
			if (actCadrillage) {
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

		function addClic(x, y, dragging) {
			clicAnnuler = [];
			if(!in_array(x + '.' + y + '.' + actPixelCouleur, clicLaisser)) {

							var imageData = context.getImageData(x, y, 1, 1);
							var pixel = imageData.data;
							var couleur = rgb2hex('rgb(' + pixel[0] + ', ' + pixel[1] + ', ' + pixel[2] + ')').toUpperCase();

							var suppr = x + '.' + y + '.' + couleur;
							if(in_array(suppr, clicLaisser)) {
								clicLaisser.splice(clicLaisser.indexOf(suppr), 1);
								clicAnnuler.push(suppr);
							}
	
				clicLaisser.push(x + '.' + y + '.' + actPixelCouleur);
			}
		}

		function in_array(string, arraya){
			for (i = 0 ; i < arraya.length ; i++){
				if(arraya[i] == string){
					return true;
					alert('lol');
				}
			}
			return false;
		}

	/* Actionnaires */
		function changerOutil() {
			if (actPixelOutil == 'crayon') {
				actPixelOutil = 'pipette';
			} else if (actPixelOutil == 'pipette') {
				actPixelOutil = 'gomme';
			} else if (actPixelOutil == 'gomme') {
				actPixelOutil = 'crayon';
			}

			dessine();
			actions();
		}

		function annuler() {
			clicAnnuler.push(clicLaisser.pop());

			dessine();
			actions();
		}

		function repeter() {
			clicLaisser.push(clicAnnuler.pop());

			dessine();
			actions();
		}

		function previsualiser() {
			actCadrillage = !actCadrillage;
			dessine();

			clicLaisserE = clicLaisser.join('\',\'');
			clicAnnulerE = clicAnnuler.join('\',\'');
			var lien = canvas.toDataURL('image/png');

			$('#previsualisation').css('display', 'block');
			$('#imagePrevisualisation').attr('src', lien);
			actCadrillage = !actCadrillage;

			dessine();
			actions();
		}

		function enregistrer() {
			var dataE = $('#imagePrevisualisation').attr('src');

			$.post('phps/envoi.php', { 'data': dataE, 'clicLaisser': clicLaisserE, 'clicAnnuler': clicAnnulerE }, function() {
				location.reload();
			});
		}

	/* Grandes fonctions */
		function actions() {
			var texte = '';

			$('#historique').val(clicLaisser);

			if (actPixelOutil == 'crayon') {
				texte += '<a href="#" id="changerOutil"><img src="images/icones/crayon.png" alt="Activer la pipette" title="Activer la pipette" /></a></a>';
			} else if (actPixelOutil == 'pipette') {
				texte += '<a href="#" id="changerOutil"><img src="images/icones/pipette.png" alt="Activer la gomme" title="Activer la gomme" /></a>';
			} else if (actPixelOutil == 'gomme') {
				texte += '<a href="#" id="changerOutil"><img src="images/icones/gomme.png" alt="Activer le crayon" title="Activer le crayon" /></a>';
			}

			if (clicLaisser.length > 0) {
				texte += '<a href="#" id="annuler"><img src="images/icones/annuler.png" alt="Annuler" title="Annuler" /></a>';
			} else {
				texte += '<img src="images/icones/annulerD.png" alt="Annuler" title="Annuler" />';
			}

			if (clicAnnuler.length > 0) {
				texte += '<a href="#" id="repeter"><img src="images/icones/repeter.png" alt="R&eacute;p&eacute;ter" title="R&eacute;p&eacute;ter" /></a>';
			} else {
				texte += '<img src="images/icones/repeterD.png" alt="R&eacute;p&eacute;ter" title="R&eacute;p&eacute;ter" />';
			}

			texte += '<a href="#" id="previsualiser"><img src="images/icones/previsualiser.png" alt="Pr&eacute;visualiser" title="Pr&eacute;visualiser" /></a>';
			texte += '<br /><input value="' + actPixelCouleur + '" type="text" id="choixCouleurDessin" style="background-color: ' + actPixelCouleur + '; border: 1px solid #000000; width: 65px;" />';

			$('#actions').html(texte);
			$('#choixCouleurDessin').myColorPicker();
		}

		function dessine() {
			canvas.width = canvas.width;

			cadrillage();

			for (var i = 0 ; i < clicLaisser.length ; i++) {
				/(.+)\.(.+)\.(.+)/i.exec(clicLaisser[i]);
				context.fillStyle = RegExp.$3;
				context.fillRect(RegExp.$1, RegExp.$2, pixelTaille, pixelTaille);
			}

			smileyContour();
		}

		window.onload = function() {
			actions();
			dessine();
		};