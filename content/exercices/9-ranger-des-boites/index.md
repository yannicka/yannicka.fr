+++
title = "Ranger des boites"
date = 2015-02-09
+++

Bonjour à toutes et à tous !

Aujourd'hui nous faisons du rangement, donc pour cela nous avons des cartons en
3D (hauteur, largeur, profondeur) et plein de petites boites à faire rentrer
dans la grande boite !

Le but est simple : mettre le plus de boites dans le grand carton, on veut
juste le plus de boites possible et non optimiser la place.

## Entrée

D'abord, on vous donne les dimensions d'une boite (x, y et z) et toutes les
dimensions de chaque petites boites qu'on possède.

Par exemple, on a une boite de 3x3x3 et plein de petites boites :

```text
3 3 3
2 2 2
2 2 2
4 4 4
1 1 1
1 1 1
1 1 1
1 1 1
1 1 1
1 1 1
1 1 1
```

Y a même une boite plus grande que le carton mais le marketing veut vraiment
qu'on essaye de la faire rentrer. '-'

## Sortie

On peut mettre 8 boites dans la boite de 3x3x3 :

```text
2 2 2
1 1 1
1 1 1
1 1 1
1 1 1
1 1 1
1 1 1
1 1 1
```

Voilà, le code a faire fonctionner :

```text
10 10 10
4 4 4
5 5 1
4 5 1
7 7 7
5 5 5
3 3 3
5 5 5
9 8 7
4 5 1
5 5 1
4 4 4
3 3 3
4 4 4
```

(pour Guillaume va falloir tout afficher avec des jolies animations, bien sûr !
:p)

Bonne chance !

## Travaux réalisés

- Moi-même : Haskell

### Mon code

*(non finalisé)*

```haskell
data Box = Box {
	x :: Int,
	y :: Int,
	z :: Int
} deriving (Show, Ord, Eq)

type ListBoxes = [Box]

-- inputBoxes :: ListBoxes
inputBoxes = [
	Box 3 3 3,
	Box 2 2 2,
	Box 2 2 2,
	Box 4 4 4,
	Box 1 1 1,
	Box 1 1 1,
	Box 1 1 1,
	Box 1 1 1,
	Box 1 1 1,
	Box 1 1 1,
	Box 1 1 1]

-- sizeBox :: Box -> Int
sizeBox b = x b * y b * z b

sizeBoxes [] = 1
sizeBoxes (box:xs) =
	x box * y box * z box + sizeBoxes xs

-- splitBoxes :: ListBoxes -> (Box, ListBoxes)
splitBoxes (bigBox:boxes) = (bigBox, boxes)

-- bigBox :: Box
-- boxes :: ListBoxes
(bigBox, boxes) = splitBoxes inputBoxes

combinations :: Int -> [a] -> [[a]]
combinations k xs = combinations' (length xs) k xs
	where combinations' n k' l@(y:ys)
		| k' == 0   = [[]]
		| k' >= n   = [l]
		| null l    = []
		| otherwise = map (y :) (combinations' (n - 1) (k' - 1) ys) ++ combinations' (n - 1) k' ys

combinationsRecursive' :: ListBoxes -> Int -> [ListBoxes]
combinationsRecursive' boxes 0 = []
combinationsRecursive' boxes len =
	combinations len boxes  ++ combinationsRecursive' boxes (len - 1)

combinationsRecursive :: ListBoxes -> [ListBoxes]
combinationsRecursive boxes =
	combinationsRecursive' boxes (length boxes)

a = combinationsRecursive boxes

-- sizes' [] accum = accum
-- sizes' (listBoxes:xs) accum = sizes' xs $ accum ++ [sizeBoxes listBoxes]

sizes boxes = sizes' boxes []

printSizes [] = do print "end"
printSizes (size:xs) = do
	print size
	printSizes xs

maxSizes' [] accum = accum
maxSizes' (size:xs) accum =
	if size <= sizeBox bigBox then
		maxSizes' xs (accum ++ [size])
	else
		maxSizes' xs accum

maxSizes sizes = maxSizes' sizes []

sizesa = sizes a

-- main :: IO ()
main = do
	-- print $ sizeBox bigBox
	-- print $ sizeBoxes boxes
	print $ maximum $ maxSizes sizesa
	-- getLine
```
