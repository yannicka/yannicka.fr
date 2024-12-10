(function() {
	var element = (function() {
		return function(el) {
			var is_uniq = !(el instanceof NodeList);
			var els = is_uniq ? [el] : el;

			// contient-il la classe ?
			var has_class = function(an_element, classname) {
				return an_element.className.match(new RegExp('(\\s|^)' + classname + '(\\s|$)')) ? true : false;
			};

			return {
				// récupérer un attribut
				get_attribute: function(attr) {
					return is_uniq ? (el.getAttribute(attr) || el[attr]) : undefined;
				},

				// modifie un attribut
				set_attribute: function(attr, value) {
					for (var i = 0, len = els.length ; i < len ; i++) {
						els[i][attr] = value;
					}

					return this;
				},

				// ajoute un évènement
				on: function(type, fn, capture) {
					for (var i = 0, len = els.length ; i < len ; i++) {
						els[i].addEventListener(type, fn, capture || false);
					}

					return this;
				},

				// supprime un évènement
				off: function(type, fn, capture) {
					for (var i = 0, len = els.length ; i < len ; i++) {
						els[i].removeEventListener(type, fn, capture || false);
					}

					return this;
				},

				// affiche les éléments
				show: function() {
					for (var i = 0, len = els.length ; i < len ; i++) {
						els[i].style.display = 'block';
					}

					return this;
				},

				// cache les éléments
				hide: function() {
					for (var i = 0, len = els.length ; i < len ; i++) {
						els[i].style.display = 'none';
					}

					return this;
				},

				// obtenir le texte de l'élément
				text: function(new_text) {
					if (!is_uniq)
						return undefined;

					if (new_text) {
						el.innerHTML = new_text;

						return this;
					} else {
						return el.innerHTML;
					}
				},

				// obtenir un élément data
				data: function(data) {
					return is_uniq ? el.getAttribute('data-' + data) : undefined;
				},

				// contient-il la classe ?
				has_class: function(classname) {
					return has_class(el, classname);
				},

				// ajouter une classe
				add_class: function(classname) {
					for (var i = 0, len = els.length ; i < len ; i++) {
						if (!has_class(els[i], classname))
							els[i].className += ' ' + classname;
					}

					return this;
				},

				// supprimer une classe
				remove_class: function(classname) {
					for (var i = 0, len = els.length ; i < len ; i++) {
						if (has_class(els[i], classname))
							els[i].className = els[i].className.replace(new RegExp('(\\s|^)' + classname + '(\\s|$)'),' ');
					}

					return this;
				},

				// supprimer les classes
				clear_class: function() {
					for (var i = 0, len = els.length ; i < len ; i++) {
						els[i].className = '';
					}

					return this;
				},

				// remplacer les classes
				replace_class: function(classname) {
					for (var i = 0, len = els.length ; i < len ; i++) {
						els[i].className = classname;
					}

					return this;
				},

				// retourne l'élément du DOM
				dom: function() {
					return el;
				}
			}
		}
	})();

	var $ = function(el) {
		// L'élément est-il déjà identifié ?
		if (el instanceof HTMLElement || el === document || el === window) {
			return element(el);
		} else {
			return element(document.querySelectorAll(el));
		}
	};

	$.fn = {}; // todo

	$.ajax = function() {
		return 'todo';
	};

	window.$ = $;
})();
