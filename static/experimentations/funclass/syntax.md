// Bordel personnel

def nom_fonction(p1, p2, p3) = {

  p1 + p2 + p3
}

let rec syracuse n =
	if (n = 0) or (n = 1) then 1
	else if (n mod 2 = 0) then syracuse(n/2)
	else syracuse(3*n + 1)
	;;

def syracuse = (n)
	return if n == 0 or n == 1 then
		1
	elif n mod 2 == 0 then
		syracuse(n / 2)
	else
		syracuse(3 * n + 1); 
end

// Obj : objet de base (tous en hérite (si aspect objet))
// Num : nombre (entier ou flottant)
// Chr : caractère
// Str : chaîne
// Dict : {k=v,k=v} (clé=valeur, dictionnaire, table de hachage)
// Lifo : {1,2,3,4,5=>}
// Fifo : {<=1,2,3,4,5}
// List : {1,2,3,4,5}
// Bool : yes et no
