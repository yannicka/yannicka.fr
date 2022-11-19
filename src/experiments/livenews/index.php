<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Live News</title>

		<link rel="stylesheet" href="design/design.css" />
	</head>

	<body>
		<div class="global">
			<form method="post" action="search.php">
				<div class="logo">Live News</div>

				<input type="search" name="content" placeholder="Recherche" id="txt_search" />

				<div id="lbl_result">
					<ul>
						<li>
							<p>
								Aucune recherche
							</p>
						</li>
   				</ul>
				</div>
			</form>
		</div>

		<script>
			var xhr = new XMLHttpRequest();

			var txt_search = document.getElementById('txt_search');
			var lbl_result = document.getElementById('lbl_result');

			txt_search.onkeyup = function() {
				if (this.value.length > 0) {
					xhr.open('POST', 'search.php', true);
					xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

					xhr.onload = function () {
						lbl_result.innerHTML = this.responseText;
						eval(document.getElementById('lol').innerHTML);
					};

					xhr.send('content=' + this.value);
				} else {
					lbl_result.innerHTML = '<ul><li><p>Aucune recherche</p></li></ul>';
				}
			};
		</script>
	</body>
</html>

<?php
	require 'config.php';

	if (false) {
		$messages = array(
			'#Vacances d\'hiver 2014 zone A #01/03/2014->17/03/2014 #zoneA',
			'#Vacances d\'hiver 2014 zone B #22/02/2014->10/03/2014 #zoneB',
			'#Vacances d\'hiver 2014 zone C #15/02/2014->03/03/2014 #zoneC',
			'#Vacances de printemps 2014 zone A #26/04/2014->12/05/2014 #zoneA',
			'#Vacances de printemps 2014 zone B #19/04/2014->05/05/2014 #zoneB',
			'#Vacances de printemps 2014 zone C #12/04/2014->28/04/2014 #zoneC'
		);

		// TODO : vérifier qu'un message n'est pas doublon (c'est-à-dire totalement identique à un autre)

		foreach ($messages as $message) {
			$tags = explode('#', $message); // on récupère chaque bout de message
			preg_match_all('/#[^\s]+/i', $message, $tags);
			$tags = $tags[0];

			foreach ($tags as &$tag)
				$tag = substr($tag, 1);

			$dates = array();
			$intervalles = array();
			$hashtags = array();

			$errors = array();

			// On définit le type de chaque tag
			foreach ($tags as $tag) {
				if (preg_match('/^.{1,2}\/.{1,2}\/.{4}$/', $tag)) {
					array_push($dates, $tag);
				} else if (preg_match('/^.{1,2}\/.{1,2}\/.{4}( +)?->( +)?.{1,2}\/.{1,2}\/.{4}$/', trim($tag))) {
					$dates_int = explode('->', $tag);
					$dates_int = array_map('trim', $dates_int);
					array_push($intervalles, array($dates_int[0], $dates_int[1]));
				} else {
					array_push($hashtags, $tag);
				}
			}

			$db->begin();

			$id_message = $db->insert('message', array(
				'date_message'  => time(),
				'content'       => $message,
				'content_clean' => preg_replace('/(#[^\s]+)/i', '', $message),
				'ip'            => $_SERVER['REMOTE_ADDR']
			));

			foreach ($dates as $date) {
				$date = date_to_timestamp($date);

				$test_date = $db->select('
					id
					from date_news
					where date_begin = :date_begin
					and date_end is null;
				', array(
					'date_begin' => $date
				))->one();

				if ($test_date) {
					$id_date = $test_date->id;
				} else {
					$id_date = $db->insert('date_news', array(
						'date_begin' => $date,
						'date_end'   => null
					));
				}

				$db->insert('message_date', array(
					'id_date'    => $id_date,
					'id_message' => $id_message
				));
			}

			foreach ($intervalles as $intervalle) {
				$date_begin = date_to_timestamp($intervalle[0]);
				$date_end   = date_to_timestamp($intervalle[1]);

				$test_intervalle = $db->select('
					id
					from date_news
					where date_begin = :date_begin
					and date_end = :date_end;
				', array(
					'date_begin' => $date_begin,
					'date_end'   => $date_end
				))->one();

				if ($test_intervalle) {
					$id_intervalle = $test_intervalle->id;
				} else {
					$id_intervalle = $db->insert('date_news', array(
						'date_begin' => $date_begin,
						'date_end'   => $date_end
					));
				}

				$db->insert('message_date', array(
					'id_date'    => $id_intervalle,
					'id_message' => $id_message
				));
			}

			foreach ($hashtags as $hashtag) {
				$test_hashtag = $db->select('
					id
					from hashtag
					where content = :content;
				', array(
					'content' => $hashtag
				))->one();

				if ($test_hashtag) {
					$id_hashtag = $test_hashtag->id;
				} else {
					$id_hashtag = $db->insert('hashtag', array(
						'content' => $hashtag
					));
				}

				$db->insert('message_hashtag', array(
					'id_hashtag' => $id_hashtag,
					'id_message' => $id_message
				));
			}

			$db->send();
		}
	}
?>
