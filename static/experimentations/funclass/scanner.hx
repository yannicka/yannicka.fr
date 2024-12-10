package;

class Scanner {
	public var text:String;
	public var pt:Int;
	public var tokens:Array<Dynamic>;

	public function new(text:String) {
		this.text   = text;
		this.pt     = -1;
		this.tokens = new Array<Dynamic>();

		lex();
	}

	public function next_char():String {
		return this.text.charAt(++pt);
	}

	public function lex() {
		var ch:String;

		while (pt < text.length) {
			ch = next_char();

			if (is_whitespace(ch)) {
			// mot-clé ou identificateurs
			} else if (is_alpha(ch) || ch == "_") {
				var accum:StringBuf = new StringBuf();

				while (is_alphanum(ch) || ch == "_") {
					accum.add(ch);
					ch = next_char();

					if (pt > text.length) {
						break;
					}
				}

				pt--;

				tokens.push(accum.toString());
			// chaînes
			} else if (ch == "\"") {
				var accum:StringBuf = new StringBuf();

				ch = next_char();

                if (pt > text.length) {
					throw "unterminated string literal";
				}

				while (ch != "\"") {
					accum.add(ch);
					ch = next_char();

					if (pt > text.length) {
						throw "unterminated string literal";
					}
				}

			 	tokens.push(accum);
			 // nombres
			} else if (is_digit(ch)) {
				var accum:StringBuf = new StringBuf();

				while (is_digit(ch)) {
					accum.add(ch);
					ch = next_char();

					if (pt > text.length) {
						break;
					}
				}

				pt--;

				tokens.push(Std.parseInt(accum.toString()));
			// autres
			} else switch (ch) {
				case "+":
					tokens.push("+");

				case "-":
					tokens.push("-");

				case "*":
					tokens.push("*");

				case "/":
					tokens.push("/");

				case "=":
					tokens.push("=");

				case ";":
					tokens.push(";");
			}
        }
	}

	public function is_alpha(c:String):Bool {
		return ~/[a-zA-Z]/.match(c);
	}

	public function is_digit(c:String):Bool {
		return ~/[0-9]/.match(c);
	}

	public function is_whitespace(c:String):Bool {
		return ~/[\r\n\t ]/.match(c);
	}

	public function is_alphanum(c:String):Bool {
		return is_alpha(c) || is_digit(c);
	}
}
