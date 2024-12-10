(function() {
	function tabtor(where) {
		var links = document.querySelectorAll(where);

		for (var i = 0, len = links.length ; i < len ; i++) {
			links[i]['onclick'] = function() {
				hide_all();

				document.getElementById(this.getAttribute('data-tab')).style.display = 'block';

				this.className = 'active';
			}
		}

		var hide_all = function() {
			for (var i = 0, len = links.length ; i < len ; i++) {
				document.getElementById(links[i].getAttribute('data-tab')).style.display = 'none';

				links[i].className = '';
			}
		}

		hide_all();
	}

	window['tabtor'] = tabtor;
})();
