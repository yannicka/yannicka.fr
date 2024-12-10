package;

import Ast;

class Parser {
	public var tokens:Array<Dynamic>;
	public var ast:Stmt;
	public var index:Int;

	public function new(tokens:Array<Dynamic>) {
		this.tokens = tokens;
		index = 0;

		ast = parseStmt();
	}

	public function parseStmt():Stmt {
		var result:Stmt;

		if (index >= tokens.length) {
			throw "expected statement, got EOF";
		}

		if (tokens[index] == "print") {
			index++;
			result = Print(parseExpr());
		} else if (tokens[index] == "def") {
			index++;

			var ident:String;

			if (index < tokens.length &&
				Std.is(tokens[index], String)) {
				ident = Std.string(tokens[index]);
			} else {
				throw "expected variable name after 'def'";
			}

			index++;

			if (index == tokens.length ||
				tokens[index] != "=") {
				throw "expected = after 'def ident'";
			}

			index++;

			result = DeclareVar(ident, parseExpr());
		} else if (tokens[index] == "for") {
			index++;

			var ident:String;

			if (index < tokens.length && Std.is(tokens[index], String)) {
				ident = Std.string(tokens[index]);
			} else {
				throw "expected identifier after 'for'";
			}

			index++;

			if (index == tokens.length || tokens[index] != "=") {
				throw "for missing '='";
			}

			index++;

			var from:Expr = parseExpr();

			if (index == tokens.length || !(tokens[index] == "to")) {
				throw "expected 'to' after for";
			}

			index++;

			var to:Expr = parseExpr();

			if (index == tokens.length || !(tokens[index] == "do")) {
				throw "expected 'do' after from expression in for loop";
			}

			index++;

			var body:Stmt = parseStmt();
			result = ForLoop(ident, from, to, body);

			if (index == tokens.length || !(tokens[index] == "end")) {
				throw "unterminated 'for' loop body";
			}

			index++;
		} else {
			throw "parse error at token " + index + ": " + tokens[index];
		}

		if (index < tokens.length && tokens[index] == ";") {
			index++;

			if (index < tokens.length &&
				!(tokens[index] == "end")) {
				result = Sequence(result, parseStmt());
			}
		}

		return result;
	}

	private function parseExpr():Expr {
		if (index == tokens.length) {
			throw "expected expression, got EOF";
		}

		if (Std.is(tokens[index], StringBuf)) {
			var value:String = tokens[index++].toString();
			return TStr(value);
		} else if (Std.is(tokens[index], Int)) {
			var intValue:Int = Std.int(tokens[index++]);
			return TNum(intValue);
		} else if (Std.is(tokens[index], String)) {
			var ident:String = Std.string(tokens[index++]);
			return TVar(ident);
		} else {
			throw "expected string literal, int literal, or variable";
		}
	}
}
