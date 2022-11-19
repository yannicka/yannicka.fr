<?php
	header ('Content-type: image/png');

	$lien = $_GET['lien'];

	$image = imagecreatefrompng(base64_decode($lien));

	$rand1 = rand(0, 1000);
	$rand2 = rand(0, 1000);
	$rand3 = rand(0, 1000);
	$rand4 = rand(0, 1000);
	$rand = $rand1 . '-' . $rand2 . '-' . $rand3 . '-' . $rand4;

	$path = $rand . '.png';

	imagepng($image, $path);
	imagedestroy($image);
?>