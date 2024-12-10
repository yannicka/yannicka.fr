* Définition
https://fr.wikipedia.org/wiki/Befunge

* Spécifications
http://quadium.net/funge/spec98.html

* Codes exemples :
http://esolangs.org/wiki/Befunge
http://quadium.net/funge/downloads/bef93src/

* Tests
http://www.bedroomlan.org/tools/befunge-93-playground

0-9 	Empile ce nombre sur la pile
+ 	Addition: dépile a et b, puis empile a+b
- 	Soustraction: dépile a et b, puis empile b-a
* 	Multiplication: dépile a et b, puis empile a*b
/ 	Division entière: dépile a et b, puis empile la partie entière de b/a. Si a est nul, demande à l'utilisateur le résultat voulu.
% 	Modulo: dépile a et b, puis empile le reste de la division entière de b/a. Si a est nul, demande à l'utilisateur le résultat voulu.
! 	NON logique: dépile une valeur. Si elle est nulle, empile 1; sinon, empile 0.
` 	Plus grand que: Dépile a et b, puis empile 1 si b>a, sinon 0.
> 	Déplace vers la droite
< 	Déplace vers la gauche
^ 	Déplace vers le haut
v 	Déplace vers le bas
? 	Déplace vers une direction aléatoire
_ 	Dépile une valeur; déplace à droite si valeur=0, à gauche sinon
| 	Dépile une valeur; déplace en bas si valeur=0, en haut sinon
" 	Démarre le mode chaine de caractères : empile chaque valeur ASCII jusqu'au prochain "
: 	Duplique la valeur en sommet de pile
\ 	Permute les deux valeurs en sommet de pile
$ 	Dépile une valeur
. 	Dépile une valeur et l'affiche en tant qu'entier
, 	Dépile une valeur et l'affiche en tant que caractère ASCII
# 	Trampoline: saute la cellule suivante
p 	Dépile y, x et v, puis change les caractères à la position (x,y) dans le programme en le caractère dont le code ASCII est v
g 	Dépile y et x, puis empile la valeur ASCII du caractère situé à cette position dans le programme
& 	Demande un nombre à l'utilisateur et l'empile
~ 	Demande un caractère à l'utilisateur et empile son code ASCII
@ 	Termine le programme