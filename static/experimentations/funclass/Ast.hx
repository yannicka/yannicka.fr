package;

enum Stmt {
	DeclareVar(ident:String, expr:Expr); // var <ident> = <expr>
	Print(expr:Expr); // print <expr>
	Assign(ident:String, expr:Expr); // <ident> = <expr>
	ForLoop(ident:String, from:Expr, to:Expr, body:Stmt); // // for <ident> = <expr> to <expr> do <stmt> end
	ReadInt(ident:String); // read_int <ident>
	Sequence(first:Stmt, second:Stmt); // <stmt> ; <stmt>
}

enum Expr {
	TStr(value:String);
	TNum(value:Float);
	TVar(indent:String);
	TBinop(left:Expr, right:Expr, op:BinOp);
}

enum BinOp {
	Add; // +
	Sub; // -
	Mul; // *
	Div; // /
}
