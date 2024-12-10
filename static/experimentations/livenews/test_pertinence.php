<?php
	$message = '#Vacances d\'hiver 2014 zone A #01/03/2014->17/03/2014 #zoneA';
	$message_clean = preg_replace('/(#[^\s]+)/i', '', $message);

	$tags = explode('#', $message); // on récupère chaque bout de message
	preg_match_all('/#[^\s]+/i', $message, $tags);
	$tags = $tags[0];

	// SOIT
	foreach ($tags as $k => $v)
		$tags[$k] = substr($v, 1);

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

	var_dump($message, $message_clean, $dates, $intervalles, $hashtags);
