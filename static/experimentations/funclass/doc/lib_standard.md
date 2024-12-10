===============================================================================
08 juin 2014
[18:32:47] booti386 - Guillaume Charifi: Syntaxe et libraries standard. Le background, c'est moi qui gère.
===============================================================================

Bool
	.reverse()

Num
	.abs()
	.cos()
	.sin()
	.acos()
	.asin()

Str
	.replace(Str search, Str replace)
	.replace(Dict replacements)
	.replace(Ereg pattern, Str replacement)
	.remove(Str substr)
	.ltrim()
	.rtrim()
	.trim()
	.substr(Num start, Num length = 0)

List
	.get(Num index)
	.push(Var value)
	.push(List values)
	.pop()
	.unshift(Var value)
	.unshift(List values)
	.shift()

Dict
	.get(Str index)
	.set(Str index, Var value)
	.set(Dict values)

Var
	.to_bool()
	.to_num()
	.to_str()
