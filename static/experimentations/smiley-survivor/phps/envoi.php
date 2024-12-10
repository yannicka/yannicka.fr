<?php
	if (!empty($_POST)) {
		include('bdd.php');

		$data = $_POST['data'];
		$clicLaisser = $_POST['clicLaisser'];
		$clicAnnuler = $_POST['clicAnnuler'];

		/*
			$lienSave = 'images/smileys/' . uniqid('smiley') . '.png';

			$lien = str_replace(' ', '+', $lien);
			$lien = substr($lien, strpos($lien, ','));

			$fichier = fopen('../' . $lienSave, 'wb');
			fwrite($fichier, base64_decode($lien));
			fclose($fichier);
		//*/

		$req = $bdd->prepare('INSERT INTO smiley(data, clicLaisser, clicAnnuler) VALUES(:data, :clicLaisser, :clicAnnuler)');
		$req->execute(array(
			'data' => $data,
			'clicLaisser' => $clicLaisser,
			'clicAnnuler' => $clicAnnuler
		));
	} else {
		echo 'REDIRIGE';
	}
?>