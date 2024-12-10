package;

// enum Direction {
// 	RIGHT; // 0
// 	LEFT;  // 1
// 	UP;    // 2
// 	DOWN;  // 3
// }

class Befunge {
	public var values : Array<Int>;
	public var x_cur  : Int;
	public var y_cur  : Int;
	//public var dir    : Direction;
	public var dir    : Int;
	public var code   : String;
	public var lines  : Array<String>;

	public static inline var RIGHT = 0;
	public static inline var LEFT  = 1;
	public static inline var UP    = 2;
	public static inline var DOWN  = 3;

	public function new() {
		dir = RIGHT;

		values = new Array<Int>();
		x_cur  = 0;
		y_cur  = 0;

		#if js
			code = "0\"!dlroW ,olleH\">:#,_@ ";
		#else
			var args = Sys.args();

			if (args.length != 1)
				Sys.exit(1);

			code = sys.io.File.getContent(Sys.args()[0]);
		#end

		lines = ~/\r\n|\n|\r/g.split(code);

		for (i in 0 ... lines.length) {
			for (j in lines[i].length ... 80)
				lines[i] += " ";
		}

		while (true) {
			// #if !js
			// 	Sys.println(lines[y_cur].charAt(x_cur));
			// #end

			switch (lines[y_cur].charAt(x_cur)) {
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
					#if js
						js.Browser.document.getElementById("content").innerHTML += 'Erreur : opcode invalide \'${lines[y_cur].charAt(x_cur)}\' a la ligne ${y_cur}, caractere ${x_cur}';
						return;
					#else
						Sys.println('Erreur : opcode invalide \'${lines[y_cur].charAt(x_cur)}\' a la ligne ${y_cur}, caractere ${x_cur}');
						Sys.exit(1);
					#end
			}

			move_pt();

			if ((x_cur + 1) * (y_cur + 1) > lines.length * 80)
			 	break;
		}

		#if debug
			Sys.println("\n");

			Sys.print("Pile finale : ");
			Sys.println(values);

			Sys.print("Position du pointeur : ");
			Sys.println('ligne $y_cur, caractere $x_cur');
		#end
	}

	public function move_pt():Bool {
		switch (dir) {
			case RIGHT: x_cur++;
			case LEFT : x_cur--;
			case UP   : y_cur--;
			case DOWN : y_cur++;
		}

		if (x_cur >= 80)
			x_cur = 0;

		if (y_cur >= 25)
			y_cur = 0;

		return true;
	}

	public function push_number(nb:Int) {
		values.push(nb);
	}

	// +
	public function add() {
		var b = values.pop();
		var a = values.pop();
		values.push(a + b);
	}

	// -
	public function sub() {
		var b = values.pop();
		var a = values.pop();
		values.push(a - b);
	}

	// *
	public function mul() {
		var b = values.pop();
		var a = values.pop();
		values.push(a * b);
	}

	// /
	public function div() {
		var b = values.pop();
		var a = values.pop();
		values.push(Math.floor(a / b));
	}

	// %
	public function mod() {
		var b = values.pop();
		var a = values.pop();
		values.push(a % b);
	}

	// !
	public function not() {
		var a = values.pop();
		values.push(a == 0 ? 1 : 0);
	}

	// `
	public function greater() {
		var b = values.pop();
		var a = values.pop();
		values.push(b > a ? 1 : 0);
	}

	// >
	public function move_right() {
		dir = RIGHT;
	}

	// <
	public function move_left() {
		dir = LEFT;
	}

	// ^
	public function move_up() {
		dir = UP;
	}

	// v
	public function move_down() {
		dir = DOWN;
	}

	// ?
	public function move_random() {
		//var names = Reflect.fields(Direction);
		//dir = Reflect.field(Direction, names[Std.random(names.length)]);
		dir = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
		// #if !js
		// 	Sys.println(dir);
		// #end
	}

	// _
	public function pop_horizontal() {
		var a = values.pop();
		dir = a == 0 ? RIGHT : LEFT;
	}

	// |
	public function pop_vertical() {
		var a = values.pop();
		dir = a == 0 ? DOWN : UP;
	}

	// "..."
	public function string() {
		while (move_pt() && lines[y_cur].charAt(x_cur) != "\"")
			values.push(lines[y_cur].charCodeAt(x_cur));
	}

	// :
	public function dup() {
		var a = values.pop();
		values.push(a);
		values.push(a);
	}

	// \
	public function swap() {
		var b = values.pop();
		var a = values.pop();
		values.push(b);
		values.push(a);
	}

	// $
	public function pop() {
		values.pop();
	}

	// .
	public function display_int() {
		var a = values.pop();

		#if js
			js.Browser.document.getElementById("content").innerHTML += Std.string(a);
		#else
			Sys.print(a);
		#end
	}

	// ,
	public function display_char() {
		// #if !js
		// 	Sys.println(values);
		// #end

		var a = String.fromCharCode(values.pop());

		#if js
			js.Browser.document.getElementById("content").innerHTML += Std.string(a);
		#else
			Sys.print(a);
		#end
	}

	// #
	public function trampoline() {
		move_pt();
	}

	// p
	public function set_code() {
		var y = values.pop();
		var x = values.pop();
		var v = values.pop();

		var before = lines[y_cur].substr(0, x_cur);
		var after  = lines[y_cur].substr(x_cur + 1);

		lines[y_cur] = before + lines[y].charAt(x) + after;
	}

	// g
	public function get_code() {
		var y = values.pop();
		var x = values.pop();
		values.push(lines[y].charCodeAt(x));
	}

	// &
	public function ask_int() {
		#if js
			var a = js.Lib.eval("prompt('?')");
		#else
			var a = Sys.stdin().readInt32();
		#end

		values.push(a);
	}

	// ~
	public function ask_char() {
		#if js
			var a = js.Lib.eval("prompt('?')");
		#else
			var a = Sys.stdin().readByte(); // 10 = \n
		#end

		values.push(a);
	}

	// @
	public function exit() {
		#if js
			return;
		#else
			Sys.exit(0);
		#end
	}

	public static function main() {
		new Befunge();
	}
}
