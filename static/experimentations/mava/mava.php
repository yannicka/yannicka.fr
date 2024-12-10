<?php
	/* On dit à PHP que le fichier sera une image
	--------------------------------------------- */
	header('Content-type: image/png');

	/* On définit le seed
	--------------------- */
	$username = false;

	if (isset($_GET['username'])) {
		srand(hexdec(substr(md5($_GET['username']), 0, 6)));
		$username = $_GET['username'];
	} else {
		srand();
	}

	/* On créer l'image
	------------------- */
	$mava = imagecreatetruecolor(75, 75) or die('Erreur lors de la generation de l\'image');

	/* On créer les couleurs
	------------------------ */
	$pink  = imagecolorallocate($mava, 255, 0, 255);
	$white = imagecolorallocate($mava, 255, 255, 255);

	/* On récupère l'image en cache si elle existe
	---------------------------------------------- */
	if ($username && file_exists('cache/' . $username . '.png')) {
		$file    = 'cache/' . $username . '.png';
		$tmp_img = imagecreatefrompng($file);

		imagefill($mava, 0, 0, $pink);
		imagecopy($mava, $tmp_img, 0, 0, 0, 0, 75, 75);
		imagedestroy($tmp_img);
		imagecolortransparent($mava, $pink);
		imagepng($mava);
		imagedestroy($mava);

		exit;
	}

	/* On place un fond rose
	------------------------ */
	imagefill($mava, 0, 0, $pink);

	/* On créer les parties du corps
	-------------------------------- */
	$what = rand(1, 3);

	switch ($what) {
	 	case 1: // morp
			$parts = [
				'bg'        => rand(1, 10),
				'body'      => rand(1, 1),
				'mouth'     => rand(1, 12),
				'arms'      => rand(1, 9),
				'eyes'      => rand(1, 15),
				'accessory' => rand(1, 9)
			];
			break;

	 	case 2: // smiley-survivor
			$parts = [
				'body'  => rand(1, 8),
				'mouth' => rand(1, 6),
				'eyes'  => rand(1, 4),
				'hat'   => rand(0, 1)
			];
	 		break;

	 	case 3: // pif
			$parts = [
				'bg'    => rand(1, 2),
				'body'  => rand(1, 14),
				'legs'  => rand(1, 9),
				'arm'   => rand(1, 7),
				'eyes'  => rand(1, 19),
				'mouth' => rand(1, 23),
				'hat'   => rand(1, 10)
			];
	 		break;
	}

	/* On ajoute toutes les parties du corps à l'image
	-------------------------------------------------- */
	foreach ($parts as $k => $v) {
		$file    = dirname(__FILE__) . '/parts/' . $what . '/' . $k . '/' . $v . '.png';
		$tmp_img = imagecreatefrompng($file);

		if (!$tmp_img)
			die('Erreur de chargement du fichier : ' . $file);

		$x = 0;

		if ($what == 2)
			$x = -2.5;

		imagecopy($mava, $tmp_img, $x, 0, 0, 0, 75, 75);
		imagedestroy($tmp_img);
	}

	/* On rend le fond rose transparent
	----------------------------------- */
	imagecolortransparent($mava, $pink);

	/* On affiche l'image
	--------------------- */
	if ($username)
		imagepng($mava, 'cache/' . $username . '.png');

	imagepng($mava);

	imagedestroy($mava);
