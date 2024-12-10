<?php
	if (isset($_GET['get_maps'])) {
		function get_recursive_files($folder_name) {
			$folder = opendir($folder_name) or die('Erreur : le dossier "' . $folder_name . '" existe pas');

			$arr = array();

			while($file = readdir($folder)) {
				if ($file == '.' || $file == '..')
					continue;

				if(is_dir($folder_name . '/' . $file)) {
					$arr[$file] = get_recursive_files($folder_name . '/' . $file);
				} else {
					array_push($arr, $file);
				}
			}

			closedir($folder);

			return $arr;
		}

		$folders = get_recursive_files('game/maps/');

		$maps = array();

		foreach ($folders as $foldername => $files) {
			foreach ($files as $i => $filename) {
				if ($filename == 'map.js') {
					array_push($maps, 'game/maps/ ' . $foldername . '/' . $filename);
				}
			}
		}

		echo json_encode(str_replace(' ', '', $maps));
		exit;
	}
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />

		<title>Pok&eacute;like</title>

		<style>
			@font-face {
				font-family: 'Polikefont';
				src: url('game/fonts/Pokelike.ttf');
			}

			html, body {
				margin: 0; padding: 0;
				width: 100%;
				height: 100%;
				background-color: rgb(0, 0, 0);
			}

			#game {

			}

			#pokelike {
				margin: 0 auto; padding: 0;
				display: block;
				box-shadow: 0 0 0 1px rgb(0, 0, 0), 0 0 0 2px rgb(255, 255, 255);
			}
		</style>
	</head>

	<body>
		<div id="game">
			<canvas id="pokelike">Change browser bro'</canvas>
		</div>

		<script src="game/lib/pxjs/px.js"></script>
		<script src="game/src/pokelike.js"></script>
		<script>G.init();</script>
	</body>
</html>
