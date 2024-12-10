package;

class Funclass {
	public function new() {
		try {
			var scanner:Scanner = new Scanner(sys.io.File.getContent("test.fc"));
			Console.print("\n");
			Console.print("Recuperation des tokens\n");
			Console.print("-----------------------\n");
			Console.print(scanner.tokens.toString());

			Console.print("\n\n\n");
			Console.print("Generation de l'AST\n");
			Console.print("-------------------\n");
			var parser:Parser = new Parser(scanner.tokens);
			Console.print(Std.string(parser.ast));

			Console.print("\n\n\n");
			Console.print("Generation du code\n");
			Console.print("------------------\n");
			var codegen:CodeGen = new CodeGen(parser.ast);
			Console.print(codegen.code.toString());

			sys.io.File.saveContent("test.js", Std.string(codegen.code.toString()));
		} catch (msg:String) {
			Console.print(msg);
		}

		Console.read();
	}

	public static function main() {
		new Funclass();
	}
}
