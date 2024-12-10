package;

import Ast;

class CodeGen {
	public var ast:Stmt;
	public var code:StringBuf;

	public function new(ast:Stmt) {
		this.ast = ast;
		code = new StringBuf();

		genStmt(this.ast);
	}

	public function genStmt(stmt:Stmt):Void {
		switch (stmt) {
			case DeclareVar(ident, expr):
				code.add("var " + ident + " = " + genExpr(expr) + ";\n");

			case Print(expr):
				code.add("console.log(" + genExpr(expr) + ");\n");

			case Assign(ident, expr):
				code.add("\n");

			case ForLoop(ident, from, to, body):
				code.add("for (var " + ident + " = " + genExpr(from) + " ; " + ident + " <= " + genExpr(to) + " ; " + ident + "++) {\n");
				genStmt(body);
				code.add("}\n");

			case ReadInt(ident):
				code.add("\n");

			case Sequence(first, second):
				genStmt(first);
				genStmt(second);
		}
	}

	public function genExpr(expr:Expr) {
		return switch (expr) {
			case TStr(value):
				Std.string(value);

			case TNum(value):
				Std.string(value);

			case TVar(indent):
				indent;

			case TBinop(left, right, op):
				"";
		}
	}
}
