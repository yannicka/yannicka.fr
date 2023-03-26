<?php
	require 'config.php';

	$db->begin();

	$votes = 0;

	$message = $db->select('
		id
		from message
		where id = :id;
	', array(
		'id' => isset($_GET['id']) ? $_GET['id'] : 0
	))->one();

	if ($message) {
		$is_vote = $db->select('
			value
			from vote
			where ip = :ip
			and id_message = :id_message;
		', array(
			'ip'         => $_SERVER['REMOTE_ADDR'],
			'id_message' => $message->id
		))->one();

		if (!$is_vote) {
			$db->insert('vote', array(
				'ip'         => $_SERVER['REMOTE_ADDR'],
				'id_message' => $message->id,
				'value'      => -1
			));

			$db->update('
				message
				set vote_down = vote_down + 1
				where id = :id;
			', array(
				'id' => $message->id
			));
		}

		$votes = $db->select('
			vote_down
			from message
			where id = :id;
		', array(
			'id' => $message->id
		))->one()->vote_down;
	}

	$db->send();

	echo '-' . $votes;
