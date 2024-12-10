package;

enum Direction {
	LEFT;  // 0
	UP;    // 1
	RIGHT; // 2
	DOWN;  // 3
}

class Befunge {
	public static var values : Array<Int>;
	public static var pt     : Int;
	public static var dir    : Direction;
	public static var code   : String;

	public static function main() {
		var args = Sys.args();

		dir = RIGHT;

		values = new Array<Int>();
		pt     = 0;

		if (args.length != 1)
			Sys.exit(1);

		code = sys.io.File.getContent(Sys.args()[0]);


		/* DEBUT DU BORDEL */

		var lines = ~/\r\n|\n|\r/g.split(code);

		for (i in 0 ... lines.length) {
			for (j in lines[i].length ... 80)
				lines[i] += " ";
		}

		/* FIN DU BORDEL */


		while (true) {
			Sys.println(code.charAt(pt));

			switch (code.charAt(pt)) {
				case "+" : add();
				case "-" : sub();
				case "*" : mul();
				case "/" : div();
				case "%" : mod();
				case "!" : not();
				case "`" : greater();
				case ">" : move_right();
				case "<" : move_left();
				case "^" : move_up();
				case "v" : move_down();
				case "?" : move_random();
				case "_" : pop_horizontal();
				case "|" : pop_vertical();
				case "\"": string();
				case ":" : dup();
				case "\\": swap();
				case "$" : pop();
				case "." : display_int();
				case "," : display_char();
				case "#" : trampoline();
				case "p" : set_code();
				case "g" : get_code();
				case "&" : ask_int();
				case "~" : ask_char();
				case "@" : exit();
				case " " : null;
				case nb if (~/[0-9]/.match(nb)):
					push_number(Std.parseInt(nb));
				default:
					Sys.println('Erreur : opcode invalide \'${code.charAt(pt)}\' a la ligne ${pt % 80}, caractere ${Std.string(Std.int(pt / 80))}');
					Sys.exit(1);
			}

			move_pt();

			if (pt > code.length)
				break;
		}

		#if debug
			Sys.println("\n");

			Sys.print("Pile finale : ");
			Sys.println(values);

			Sys.print("Position du pointeur : ");
			Sys.println(pt);
		#end
	}

	public static function move_pt():Bool {
		switch (dir) {
			case RIGHT:
				if (pt % 80 == 79) pt -= 79;
				else               pt++;

			case LEFT:
				if (pt % 80 == 0) pt += 79;
				else              pt--;

			case UP:
				if (pt / 80 == 0) pt += 24 * 80;
				else              pt -= 80;

			case DOWN:
				if (pt / 80 == 24) pt -= 24 * 80;
				else               pt += 80;
		}

		return true;
	}

	public static function push_number(nb:Int) {
		values.push(nb);
	}

	public static function add() {
		var b = values.pop();
		var a = values.pop();
		values.push(a + b);
	}

	public static function sub() {
		var b = values.pop();
		var a = values.pop();
		values.push(a - b);
	}

	public static function mul() {
		var b = values.pop();
		var a = values.pop();
		values.push(a * b);
	}

	public static function div() {
		var b = values.pop();
		var a = values.pop();
		values.push(Math.floor(a / b));
	}

	public static function mod() {
		var b = values.pop();
		var a = values.pop();
		values.push(a % b);
	}

	public static function not() {
		var a = values.pop();
		values.push(a == 0 ? 1 : 0);
	}

	public static function greater() {
		var b = values.pop();
		var a = values.pop();
		values.push(b > a ? 1 : 0);
	}

	public static function move_right() {
		dir = RIGHT;
	}

	public static function move_left() {
		dir = LEFT;
	}

	public static function move_up() {
		dir = UP;
	}

	public static function move_down() {
		dir = DOWN;
	}

	public static function move_random() {
		pt = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
	}

	public static function pop_horizontal() {
		var a = values.pop();
		dir = a == 0 ? RIGHT : LEFT;
	}

	public static function pop_vertical() {
		var a = values.pop();
		dir = a == 0 ? DOWN : UP;
	}

	public static function string() {
		while (move_pt() && code.charAt(pt) != "\"")
			values.push(code.charCodeAt(pt));
	}

	public static function dup() {
		var a = values.pop();
		values.push(a);
		values.push(a);
	}

	public static function swap() {
		var b = values.pop();
		var a = values.pop();
		values.push(b);
		values.push(a);
	}

	public static function pop() {
		values.pop();
	}

	public static function display_int() {
		var a = values.pop();
		Sys.print(a);
	}

	public static function display_char() {
		var a = String.fromCharCode(values.pop());
		Sys.print(a);
	}

	public static function trampoline() {
		move_pt();
	}

	@:todo
	public static function set_code() {
		var y = values.pop();
		var x = values.pop();
		var v = values.pop();
		function substring(startIndex:Int, ?endIndex:Int):String
		code[code.length * x + y] = v.toString();
	}

	@:todo
	public static function get_code() {
		var x = values.pop();
		var y = values.pop();
		values.push(code[x * y]);
	}

	@:todo
	public static function ask_int() {
		var a = Sys.stdin().readInt32();
		values.push(a);
	}

	@:todo
	public static function ask_char() {
		var a = Sys.stdin().readString(1).charCodeAt(0);
		values.push(a);
	}

	public static function exit() {
		Sys.exit(0);
	}
}
