<?php
	if (isset($_POST['content'])) {
		require 'config.php';

		$response = '<ul>';

		$results = $db->select('
			id, content, date_message, vote_up, vote_down
			from message
			where content like :content
			order by vote_up desc
			limit 0, 50;
		', array(
			'content' => '%' . $_POST['content'] . '%'
		))->all();

		foreach ($results as $r) {
			$response .= '
				<li>
					<p>
						' . preg_replace('/(#[^\s]+)/i', '<a href="#">$1</a>', $r->content) . '
					</p>

					<div class="infos">
						<a href="vote_up.php?id=' . $r->id . '" class="good vote">+' . $r->vote_up . '</a>
						<a href="vote_down.php?id=' . $r->id . '" class="bad vote">-' . $r->vote_down . '</a>
						<span class="date">' . date('d/m/Y', $r->date_message) . '</span>
					</div>
				</li>';
		}

		$response .= '</ul>
<script id="lol">
	var votes_links = document.querySelectorAll(\'.vote\');

	for (var i = 0, len = votes_links.length ; i < len ; i++) {
		votes_links[i].onclick = function(e) {
			var self = this;

			var xhr = new XMLHttpRequest();
			xhr.open(\'GET\', this.href, true);

			xhr.onload = function() {
				if (this.status >= 200 && this.status < 400){
					self.innerHTML = this.responseText;
				}
			};

			xhr.send();

			e.preventDefault();
			return false;
		};
	}
</script>
		';

		echo $response;
	} else {
		echo '';
	}
