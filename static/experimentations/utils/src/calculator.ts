// todo : amélioration des flottants (e, E, etc. ?)
//      + gestion des fonctions de base (sin, cos, round, rand, etc.)
(function() {
	var priority = {
		'+': 1, '-': 1,
		'*': 2, '/': 2, '%': 2,
		'^': 3
	};

	function tokenize_ni(str) {
		var tokens = [];

		for (var i = 0 ; i < str.length ; i++) {
			if (str[i].match(/[0-9]/)) {
				var nombre:any = '';

				do {
					nombre += str[i];
				} while (typeof str[++i] != 'undefined' && str[i].match(/[0-9.]/));

				nombre = parseFloat(nombre);
				tokens.push({ type: 'number', value: nombre });

				i--;
			} else if (str[i].match(/\+|\-|\*|\/|\^|\%/)) {
				tokens.push({ type: 'op', value: str[i].match(/\+|\-|\*|\/|\^|\%/).toString() });
			} else if (str[i] == '(') {
				tokens.push({ type: 'lparen', value: '(' });
			} else if (str[i] == ')') {
				tokens.push({ type: 'rparen', value: ')' });
			}
		}

		return tokens;
	}

	function eval_npi(tokens) {
		var result = [];

		for (var token in tokens) {
			token = tokens[token];

			if (token.type == 'number') {
				result.push(token.value);
			} else if (token.type == 'op') {
				if (result.length < 2) {
					throw 'erreur #1'; // il faut au moins deux nombres pour faire un calcul
				}

				var nb2 = result.pop();
				var nb1 = result.pop();

				switch (token.value) {
					case '+': result.push(nb1 + nb2); break;
					case '-': result.push(nb1 - nb2); break;
					case '*': result.push(nb1 * nb2); break;
					case '/': result.push(nb1 / nb2); break;
					case '%': result.push(nb1 % nb2); break;
					case '^': result.push(Math.pow(nb1, nb2)); break;
				}
			}
		}

		if (result.length == 1) {
			return result[0];
		} else if (result.length == 0) {
			throw 'erreur #2'; // aucun calcul
		} else {
			throw 'erreur #3'; // operateur(s) manquant(s)
		}
	}

	function eval_ni(str) {
		var tokens_ni  = tokenize_ni(str);
		var tokens_npi = [];
		var stack_ops  = [];

		for (var token in tokens_ni) {
			token = tokens_ni[token];

			if (token.type == 'number') {
				tokens_npi.push(token);
			} else if (token.type == 'op') {
				while (stack_ops && typeof stack_ops[stack_ops.length - 1] != 'undefined' && stack_ops[stack_ops.length - 1].type == 'op'
					&& priority[stack_ops[stack_ops.length - 1].value] >= priority[token.value]
				) {
					tokens_npi.push(stack_ops.pop());
				}

				stack_ops.push(token);
			} else if (token.type == 'lparen') {
				stack_ops.push(token);
			} else if (token.type == 'rparen') {
				var i = 0;

				while (typeof stack_ops[stack_ops.length - 1] != 'undefined' && stack_ops[stack_ops.length - 1].type != 'lparen') {
					tokens_npi.push(stack_ops.pop());
				}

				stack_ops.pop();
			}
		}

		while (stack_ops.length > 0) {
			if (stack_ops[stack_ops.length - 1].type == 'lparen') {
				throw 'erreur #4'; // probleme de parenthese
			}

			tokens_npi.push(stack_ops.pop());
		}

		return eval_npi(tokens_npi);
	}

	window['eval_ni'] = eval_ni;
})();
