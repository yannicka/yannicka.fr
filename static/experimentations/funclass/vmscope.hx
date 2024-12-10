package;

class VMScope {
	public var variables:Map<String, VMValue>;
	public var parent:VMScope;
	public var body:ParserNode;
	
	public function new(parent:VMScope, body:ParserNode) {
		this.parent = parent;
		this.body = body;
		variables = new Map<String, VMValue>();
	}
	
	public function register(name:String, delegate:IVMDelegate):Void {
		setVariable(name, VMValue.createDelegate(delegate));
	}
	
	public function isDeclared(name:String):Bool {
		return getVariable(name) != null;
	}
	
	public function call(name:String, params:Array<VMValue>):VMValue {
		var func:VMValue = getVariable(name);
		if (func == null) {
			trace("Call Error: Function " + name + " not declared");
		}
		var scope:VMScope = new VMScope(this, func.dataBody);
		var varCount:Int = 0;
		if (func.dataParams != null) {
			for (param in func.dataParams) {
				if (varCount <= params.length - 1) {
					scope.setVariable(param, params[varCount]);
				} else {
					scope.setVariable(param, VMValue.createFloat(0));
				}
				varCount += 1;
			}
		}
		var returnValue:VMValue = scope.exec();
		scope = null;
		return returnValue;
	}
	
	public function exec():VMValue {
		// TODO: Execute body
		var node:ParserNode = body;
		do {
			if (node.left.type == "ASSIGN") {
				assignment(node.left);
			} else if (node.left.type == "WHILE") {
				whileStmt(node.left);
			} else if (node.left.type == "IF") {
				ifStmt(node.left);
			} else if (node.left.type == "INVOKE") {
				invoke(node.left);
			} else if (node.left.type == "RETURN") {
				return returnStmt(node.left);
			} else {
				trace("Statement not implemented: " + node.left.type);
			}
			node = node.right;
		} while (node != null);
		return null;
	}
	
	public function returnStmt(node:ParserNode):VMValue {
		if (node.left.type == "DECLARE") {
			return declare(node.left);
		} else if (node.left.type == "THIS") {
			 return thisReturn(node.left);
		} else {
			return eval(node.left);
		}
	}
	
	public function invoke(node:ParserNode):VMValue {
		var varName:String = ident(node.left);
		var func:VMValue = getVariable(varName);
		if (func == null) {
			trace("Function not declared: " + varName);
		}
		var exprArray = new Array<VMValue>();
		if (node.right != null && node.right.type == "EXPRLIST") {
			for (e in exprList(node.right).iterator()) {
				exprArray.push(e);
			}
		}
		var scope:VMScope;
		var returnValue:VMValue = new VMValue();
		if (func.type == VMValue.TYPE_FUNC) {
			returnValue = call(varName, exprArray);
		} else if (func.type == VMValue.TYPE_DELEGATE) {
			scope = new VMScope(this, null);
			returnValue = func.dataDelegate.exec(scope, exprArray);
		} else {
			trace("Variable is not a function: " + varName);
		}
		scope = null;
		return returnValue;
	}
	
	public function exprList(node:ParserNode):List<VMValue> {
		var params:List<VMValue> = new List<VMValue>();

		do {
			if (node.left.type == "DECLARE") {
				params.add(declare(node.left));
			} else {
				params.add(eval(node.left));
			}
			node = node.right;
		} while (node != null);
		return params;
	}
	
	public function ifStmt(node:ParserNode):Void {
		var ifNode:ParserNode = node.right.left;
		var elseNode:ParserNode = node.right.right;
		var scope:VMScope;
		if (eval(node.left).dataFloat != 0) {
			scope = new VMScope(this, ifNode);
			scope.exec();
		} else {
			if (elseNode != null) {
				scope = new VMScope(this, elseNode);
				scope.exec();
			}
		}
		scope = null;
	}
	
	public function whileStmt(node:ParserNode):Void {
		var scope:VMScope = new VMScope(this, node.right);
		while (scope.eval(node.left).dataFloat != 0) {
			scope.exec();
		}
		scope = null;
	}
	
	public function assignment(node:ParserNode):Void {
		var varName:String = ident(node.left);
		if (node.right.type == "DECLARE") {
			setVariable(varName, declare(node.right));
		} else {
			var value:VMValue = eval(node.right);
			setVariable(varName, value);
		}
	}
	
	public function thisReturn(node:ParserNode):VMValue {
		  return VMValue.createScope(this);
	}   
	
	// left: PARAMLIST -> right: STMT_LIST
	public function declare(node:ParserNode):VMValue {
		var params:List<String> = new List<String>();
		var body:ParserNode = node.right;
		if (node.left != null) {
			params = paramList(node.left);
		}
		return VMValue.createFunc(params, body);
	}
	
	public function paramList(node:ParserNode):List<String> {
		var params:List<String> = new List<String>();
		do {
			params.add(ident(node.left));
			node = node.right;
		} while (node != null);
		return params;
	}
	
	public function eval(node:ParserNode):VMValue {
		if (node.type == "ADD") {
			return add(node);
		} else if (node.type == "SUBTRACT") {
			return subtract(node);
		} else if (node.type == "DIV") {
			return div(node);
		} else if (node.type == "MULT") {
			return mult(node);
		} else if (node.type ==  "LT") {
			return lessThan(node);
		} else if (node.type ==  "GT") {
			return greaterThan(node);
		} else if (node.type ==  "LTEQ") {
			return lessThanEq(node);
		} else if (node.type ==  "GTEQ") {
			return greaterThanEq(node);
	  } else if (node.type ==  "EQ") {
			return eq(node);
	  } else if (node.type ==  "NEQ") {
			return notEq(node);
		} else if (node.type == "STRING") {
			return VMValue.createString(node.dataStr);
		} else if (node.type == "NUMBER") {
			return VMValue.createFloat(node.dataFloat);
		} else if (node.type == "INVOKE") {
			return invoke(node);
		} else if (node.type == "IDENT") {
			var variable:VMValue = getVariable(node.dataStr);
			if (variable == null) {
				trace("Variable '" + node.dataStr + "' not assigned");
			}
			return variable;
		} else {
			trace("Missing Eval-rule for " + node.type);
			return null;
		}
	}
	
	public function add(node:ParserNode):VMValue {
		var left:VMValue = eval(node.left);
		var right:VMValue = eval(node.right);
		if (left.type == VMValue.TYPE_STRING || right.type == VMValue.TYPE_STRING) {
			// One is string
			var result:String;
			if (left.type == VMValue.TYPE_STRING) {
				result = left.dataStr;
			} else {
				result = Std.string(left.dataFloat);
			}
			if (right.type == VMValue.TYPE_STRING) {
				result += right.dataStr;
			} else {
				result += Std.string(right.dataFloat);
			}
			return VMValue.createString(result);
		} else {
			// Both float
			return VMValue.createFloat(left.dataFloat + right.dataFloat);
		}
	}
	
	public function subtract(node:ParserNode):VMValue {
		var left:VMValue = eval(node.left);
		var right:VMValue = eval(node.right);
		if (left.type == VMValue.TYPE_STRING || right.type == VMValue.TYPE_STRING) {
			// One is string
			trace("- operator is not valid for strings");
			return null;
		} else {
			// Both float
			return VMValue.createFloat(left.dataFloat - right.dataFloat);
		}
	}
	
	public function div(node:ParserNode):VMValue {
		var left:VMValue = eval(node.left);
		var right:VMValue = eval(node.right);
		if (left.type == VMValue.TYPE_STRING || right.type == VMValue.TYPE_STRING) {
			// One is string
			trace("/ operator is not valid for strings");
			return null;
		} else {
			// Both float
			return VMValue.createFloat(left.dataFloat / right.dataFloat);
		}
	}
	
	public function mult(node:ParserNode):VMValue {
		var left:VMValue = eval(node.left);
		var right:VMValue = eval(node.right);
		if (left.type == VMValue.TYPE_STRING || right.type == VMValue.TYPE_STRING) {
			// One is string
			if (left.type == VMValue.TYPE_STRING && right.type == VMValue.TYPE_FLOAT) {
				var result:String = "";
				for (i in 0 ... Std.int(right.dataFloat)) {
					result += left.dataStr;
				}
				return VMValue.createString(result);
			}
			trace("* operator is not valid for strings");
			return null;
		} else {
			// Both float
			return VMValue.createFloat(left.dataFloat * right.dataFloat);
		}
	}
	
	public function lessThan(node:ParserNode):VMValue {
		var left:VMValue = eval(node.left);
		var right:VMValue = eval(node.right);
		if (left.type == VMValue.TYPE_STRING || right.type == VMValue.TYPE_STRING) {
			// One is string
			trace("< operator is not valid for strings");
			return null;
		} else {
			// Both float
			if (left.dataFloat < right.dataFloat) {
				return VMValue.createFloat(1);
			} else {
				return VMValue.createFloat(0);
			}
		}
	}
	
	public function greaterThan(node:ParserNode):VMValue {
		var left:VMValue = eval(node.left);
		var right:VMValue = eval(node.right);
		if (left.type == VMValue.TYPE_STRING || right.type == VMValue.TYPE_STRING) {
			// One is string
			trace("> operator is not valid for strings");
			return null;
		} else {
			// Both float
			if (left.dataFloat > right.dataFloat) {
				return VMValue.createFloat(1);
			} else {
				return VMValue.createFloat(0);
			}
		}
	}
	
	public function greaterThanEq(node:ParserNode):VMValue {
		var left:VMValue = eval(node.left);
		var right:VMValue = eval(node.right);
		if (left.type == VMValue.TYPE_STRING || right.type == VMValue.TYPE_STRING) {
			// One is string
			trace(">= operator is not valid for strings");
			return null;
		} else {
			// Both float
			if (left.dataFloat >= right.dataFloat) {
				return VMValue.createFloat(1);
			} else {
				return VMValue.createFloat(0);
			}
		}
	}
	
	public function lessThanEq(node:ParserNode):VMValue {
		var left:VMValue = eval(node.left);
		var right:VMValue = eval(node.right);
		if (left.type == VMValue.TYPE_STRING || right.type == VMValue.TYPE_STRING) {
			// One is string
			trace("<= operator is not valid for strings");
			return null;
		} else {
			// Both float
			if (left.dataFloat <= right.dataFloat) {
				return VMValue.createFloat(1);
			} else {
				return VMValue.createFloat(0);
			}
		}
	}
	
	public function eq(node:ParserNode):VMValue {
		var left:VMValue = eval(node.left);
		var right:VMValue = eval(node.right);
		if (left.type == VMValue.TYPE_STRING || right.type == VMValue.TYPE_STRING) {
			// One is string
			// TODO: Implement string comparsion
			if (left.type <= VMValue.TYPE_STRING && right.type <= VMValue.TYPE_STRING) {
				 if (left.type == VMValue.TYPE_FLOAT) {
					left.dataStr = Std.string(left.dataFloat);
				 } else if (right.type == VMValue.TYPE_FLOAT) {
				 	right.dataStr = Std.string(right.dataFloat);
			 	}
				 
			var result:Float = switch(left.dataStr == right.dataStr) {
				case true:  0.0;
				case false: 0.0;
			}	 

			return VMValue.createFloat(result);
		 }
		 trace("== operator can only compare strings to strings and numbers");
		 return null;
		} else {
			// Both float
			if (left.dataFloat == right.dataFloat) {
				return VMValue.createFloat(1);
			} else {
				return VMValue.createFloat(0);
			}
		}
	}
	
	public function notEq(node:ParserNode):VMValue {
		var left:VMValue = eval(node.left);
		var right:VMValue = eval(node.right);
		if (left.type == VMValue.TYPE_STRING || right.type == VMValue.TYPE_STRING) {
			// One is string
			// TODO: Implement string comparsion
			if (left.type <= VMValue.TYPE_STRING && right.type <= VMValue.TYPE_STRING) {
				 if (left.type == VMValue.TYPE_FLOAT) {
					left.dataStr == Std.string(left.dataFloat);
				 } else if (right.type == VMValue.TYPE_FLOAT) {
				 	right.dataStr == Std.string(right.dataFloat);
			 	}
			
			var result:Float = switch(left.dataStr != right.dataStr) {
				case true:  0.0;
				case false: 0.0;
			}	 

			return VMValue.createFloat(result);
		 }
		 trace("!= operator can only compare strings to strings and numbers");
		 return null;
		} else {
			// Both float
			if (left.dataFloat != right.dataFloat) {
				return VMValue.createFloat(1);
			} else {
				return VMValue.createFloat(0);
			}
		}
	}
	
	public function ident(node:ParserNode):String {
		return node.dataStr;
	}
	
	public function setVariable(name:String, data:VMValue):Void {
		var variable:VMValue = getVariable(name);
		if (variable == null) {
			variables.set(name, data);
		} else {
			variable.type = data.type;
			variable.dataBody = data.dataBody;
			variable.dataFloat = data.dataFloat;
			variable.dataParams = data.dataParams;
			variable.dataStr = data.dataStr;
		}
	}
	
	public function getVariable(name:String):VMValue {
		if (variables.exists(name)) {
			return variables.get(name);
		}
		if (parent != null) {
			return parent.getVariable(name);
		}
		return null; // Variable not initialized yet
	}
}
