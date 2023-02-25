<?php

	require 'db.php';

	$local = false;

	if ($local) {
		$db = new DB('127.0.0.1', 'livenews', 'root', '', 'mysql');
	} else {
		$db = new DB('127.0.0.1', 'livenews', 'root', '', 'mysql');
	}

	function date_to_timestamp($date) {
		return strtotime(preg_replace('/(.{1,2})\/(.{1,2})\/(.{4})/', '$3-$2-$1', $date));
	}

	function format_date($date) {
		return date('d-m-Y', $date);
	}
