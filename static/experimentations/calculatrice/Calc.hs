module Main where

import Data.Char (isDigit)

data Associativity = Ltr | Rtl deriving (Eq)

data Expr = ConstInt Float
					| Add Expr Expr
					| Sub Expr Expr
					| Mul Expr Expr
					| Div Expr Expr
					| Pow Expr Expr deriving (Show)

eval tree =
	case tree of
		ConstInt a -> a
		Add a b    -> eval a + eval b
		Sub a b    -> eval a - eval b
		Mul a b    -> eval a * eval b
		Div a b    -> eval a / eval b
		Pow a b    -> eval a ** eval b

associativity op =
	case op of
		"+" -> Ltr
		"-" -> Ltr
		"*" -> Ltr
		"/" -> Ltr
		"^" -> Rtl

priority op =
	case op of
		"+" -> 0
		"-" -> 0
		"*" -> 1
		"/" -> 1
		"^" -> 2

operation op =
	case op of
		"+" -> Add
		"-" -> Sub
		"*" -> Mul
		"/" -> Div
		"^" -> Pow

ops = "+-*/^()"
isOp = (`elem` ops)

opsStack = ["+", "-", "*", "/", "^"]
isOpStack = (`elem` opsStack)

readInt = takeWhile isDigit

parse [] accum = accum
parse c@(x:xs) accum
	| isDigit x =
		let num = readInt c in
		parse (drop (length num) c) (accum ++ [num])
	| isOp x    = parse xs (accum ++ [[x]])
	| otherwise = parse xs accum

niToNpi [] out stack = out ++ reverse stack
niToNpi (x:xs) out stack
	| all isDigit x = niToNpi xs (out ++ [x]) stack
	| x == "(" = niToNpi xs out (stack ++ [x])
	| x == ")" =
		let p newout newstack =
			case last newstack of
				"(" -> (newout, init newstack)
				val -> p (newout ++ [val]) (init newstack)
		in let a = p out stack in
		niToNpi xs (fst a) (snd a)
	| isOpStack x =
		let p newout newstack
			| null newstack = (newout, newstack)
			| isOpStack $ last newstack =
				if (associativity x == Ltr && priority x <= priority (last newstack)) || (associativity x == Rtl && priority x < priority (last newstack)) then
						p (newout ++ [last newstack]) (init newstack)
				else
					(newout, newstack)
			| otherwise = (newout, newstack)
		in let a = p out stack in
		niToNpi xs (fst a) (snd a ++ [x])

genAst [] ast = ast
genAst (tok:xs) ast
	| all isDigit tok = genAst xs $ ast ++ [ConstInt (read tok :: Float)]
	| isOpStack tok =
		genAst xs $ (init $ init ast) ++ [(operation tok) (last $ init ast) (last ast)]

--calc = "55 * (6 + 2) * 5"
main = do
	putStrLn "> "
	calc <- getLine
	--putStrLn (show (parse calc []))
	--putStrLn (show (niToNpi (parse calc []) [] []))
	--putStrLn (show (genAst (niToNpi (parse calc []) [] []) []))
	if calc == "" then
		putStrLn "Au revoir"
	else do
		putStr "$ "
		putStrLn (show (eval (last (genAst (niToNpi (parse calc []) [] []) []))))
		main

{-
	NI :
	"(2 + 2) * 3"

	Ni parsé :
	[ (, 2, +, 2, ), *, 3 ]

	Npi parsé :
	[ 2, 2, +, 3, * ]

	Ast :
	Mult(Add(ConstInt 2, ConstInt 2), 3)

	Résultat :
	12
-}
