<?php
	include('phps/bdd.php');

	$lien = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAABfCAYAAACOTBv1AAABXUlEQVR4nO3R0Q3DQAzD0Oy/dLuAAwRoKtEJH3D/ou84JEmSJEnS/T6BpxMev8jjF3n8Io//B6TDkLZEkIJJWyJIwaQtEaRg0pYIUjBpy+2eErKyY+XowcqOlaMHKztWjh6s7Fg5eoDvwA+8GaoXNSYA1YsaE4DqRY0JQPWixgSgelFjAlC9qDEBqF7UmABUL2pMAKoXNSag1vu2Q18VuYvHn3n8Io9f5PGLPH6Rxy/y+EUev8jjF3n8Io9f5PGLPH6Rxy/y+EUev8jjF3n8Io9f5PGLPH6Rxy/y+EUev6h2l7d9CKoXNSYA1YsaE4DqRY0JQPWixgSgelFjAlC9qDEBqF7UmABUL2pMAKoXNSYA34sfeNHKjpWjBys7Vo4erOxYOXqwsmPl6MFTOsaQVhxpSwQpmLQlghRM2hJBCiZtiSAFk7agXD3ML08nPH6Rxy/y+EUeX5IkSZKkdb4Mh+RGIbGxagAAAABJRU5ErkJggg==';
	$del = $bdd->prepare('DELETE FROM smiley WHERE lien = :lien');
	$del->execute(array(
		'lien' => $lien
	));
?>

<!DOCTYPE HTML>
<html>
    <head>
		<meta charset="utf-8">
		<link rel="stylesheet" href="csss/design.css">
		<link rel="stylesheet" href="csss/jquery.mycolorpicker.css">

		<script src="javascripts/jquery.js"></script>
		<script src="javascripts/jquery.mycolorpicker.js"></script>
		<script src="javascripts/jquery.timers.js"></script>
    </head>

    <body>
		<div id="divmodifsmiley">
			<div id="float">
				<div id="actions">
					<a href="#" id="cadrillageActiver"></a>
					<a href="#" id="cadrillagePosition"></a>
					<a href="#" id="outilChanger"></a>
					<a href="#" id="annuler"><img src="images/icones/annuler.png" alt="Annuler" title="Annuler" /></a>
					<a href="#" id="repeter"><img src="images/icones/repeter.png" alt="R&eacute;p&eacute;ter" title="R&eacute;p&eacute;ter" /></a>
					<a href="#" onclick="previsualiser();" id="previsualiser"><img src="images/icones/previsualiser.png" alt="Pr&eacute;visualiser" title="Pr&eacute;visualiser" /></a><br />
					<input value="#000000" type="text" id="choixCouleurDessin" style="background-color: #000000; border: 1px solid #000000; width: 65px;" />
				</div>

				<!--
					<textarea disabled="disabled" id="historique">
					</textarea>
				-->

				<div id="divsmiley">
					<canvas id="smiley" width="95" height="95">
						Vous n'avez pas un navigateur assez r&eacute;cent pour afficher ce contenu.
					</canvas>
				</div>
			</div>

			<div id="previsualisation" style="display: none;">
				<img id="imagePrevisualisation" /><br />
				<a href="#" id="sauvegarder"><img alt="Sauvegarder" title="Sauvegarder" /></a>
			</div>
		</div>

		<script src="javascripts/script.js"></script>

		<div id="creations">
			<p>
				Voici les cr&eacute;ations:
			</p>

			<?php
				$req = $bdd->prepare('SELECT * FROM smiley');
				$req->execute(array());
				while ($reqA = $req->fetch()) {
					echo '<img src="' . $reqA['lien'] . '" alt="" />';
				}
			?>
		</div>
		<a id="lol" data-lol="Salut" data-trans="all 1s ease-in-out"></a>
		<a id="lol" data-lol="sa va ?" data-trans="all 1s ease-in-out"></a>
		<p>
			<strong>&Agrave; faire:</strong><br />
			- Int&eacute;gration &agrave; Smiley Survivor.<br />
			- Am&eacute;liorer l'ergonomie.<br />
			- Pouvoir modifier son smiley.<br />
			- Emp&ecirc;cher les joueurs de faire des trucs HS.
		</p>
    </body>
</html>