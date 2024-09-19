+++
title = "Divination"
date = 2015-04-27
+++

## Énoncé

Bonjour,

Vous connaissez peut-être [Akinator](https://fr.akinator.com/) ? Eh bien, c'est
ce que vous allez créer aujourd'hui !

Le principe est le suivant : l'ordinateur vous demande de penser à un animal,
il vous pose des question, vous répondez par oui ou non et à la fin il devine
l'animal. S'il devine l'animal, c'est bon, et il est trop fort, sinon le
programme vous demande de donner une question qui permet de spécifier l'animal.
Il ajoute alors l'animal dans sa mémoire ainsi que la question que la personne
ajoute.

Plus vous jouez, plus il apprend, plus il apprend, plus il devient efficace.

Donc aujourd'hui on crée un programme qui apprend tout seul !

### Entrée

Affiche un message de bienvenue puis ensuite les questions. Il faut pouvoir
répondre par oui ou non.

### Sortie

On affiche le texte qui demande de penser à un animal et de cliquer quand on
est prêt.

Si l'ordinateur trouve le bon animal alors il affiche un message de succès
sinon il demande d'entrer le nom de l'animal et d'ajouter une question pour
laquelle on pourra répondre « Oui ». L'ordinateur met à jour la base de
données. Vous apprenez à votre programme.

Pour le design vous faites ce que vous voulez et pour le stockage des données
aussi.

### Intelligence Artificielle

L'ordinateur **doit** apprendre, à chaque partie vous devez charger les
résultats de toutes les anciennes parties.

### Premier exemple

```text
$ Bienvenue, merci de penser à un animal.
$
$ L'animal est un mammifère ?
> oui
$ L'animal vit dans l'eau ?
> oui
$ L'animal est gris ?
> oui
$
$ Je pense que l'animal est une baleine grise, j'ai raison ?
> non
$
$ Oh mince. Aide-moi à apprendre.
$ Quel est le nom de l'animal ?
> dauphin
$ Quelle question unique me permet de répondre « oui » pour le dauphin ?
> Est-ce que l'animal est très intelligent
$
$ Merci de m'avoir éclairé de votre savoir, ô grand maître de la connaissance.
```

### Second exemple

```text
$ Bienvenue, merci de penser à un animal.
$
$ L'animal est un mamifere ?
> oui
$ L'animal vit dans l'eau ?
> non
$ L'animal est gris ?
> oui
$
$ L'animal est un éléphant ?
> oui
$
$ Je suis trop intelligent, tu peux pas test, noob !
```

Voilà !

## Travaux réalisés

- Moi-même : Haskell

### Mon code

*(non finalisé)*

```haskell
import Data.Char (toLower)
import Data.Binary
import System.Directory (doesFileExist)


data Tree a = Empty | Node a (Tree a) (Tree a)


instance (Binary a) => Binary (Tree a) where
	put x = case x of
		Empty -> put (0 :: Word8)
		Node x l r -> do
			put (1 :: Word8)
			put x
			put l
			put r

	get = do
		t <- get :: Get Word8
		case t of
			0 -> return Empty
			1 -> do
				x <- get
				l <- get
				r <- get
				return (Node x l r)


goLeft :: Tree a -> Tree a
goLeft (Node _ l _) = l


goRight :: Tree a -> Tree a
goRight (Node _ _ r) = r


fileSave = "save.dat"


initialQuestions :: Tree String
initialQuestions =
	Node "Animal gris ?"
		(Node "Nage ?"
			(Node "Baleine" Empty Empty)
			(Node "Rat" Empty Empty)
		)
		(Node "Vol ?"
			(Node "Colibri" Empty Empty)
			(Node "Cochon" Empty Empty)
		)


getAnimalName :: Tree String -> String
getAnimalName (Node name _ _) = name


askQuestions :: Tree String -> IO (Tree String)
askQuestions q@(Node name Empty Empty) = return q
askQuestions q@(Node name l r) = do
	putStrLn name
	input <- getLine
	case map toLower input of
		"oui" -> do askQuestions $ goLeft q
		"non" -> do askQuestions $ goRight q
		_     -> do
			putStrLn "Il faut répondre par oui ou par non."
			askQuestions q


correctAnimal :: IO Bool
correctAnimal = do
	input <- getLine
	case map toLower input of
		"oui" -> return True
		"non" -> return False
		_     -> do
			putStrLn "Il faut répondre par oui ou par non."
			correctAnimal


askAnimalName :: IO String
askAnimalName = do
	putStrLn "Oh mince. Aide-moi à apprendre."
	putStrLn "Quel est le nom de l'animal ?"
	getLine


askAnimalQuestion :: String -> IO String
askAnimalQuestion name = do
	putStr "Quelle question unique me permet de répondre oui pour \""
	putStr name
	putStrLn "\" ?"
	getLine


getQuestions :: IO (Tree String)
getQuestions = do
	fileSaveExists <- doesFileExist fileSave
	if fileSaveExists then do
		encodeFile fileSave initialQuestions
		return initialQuestions
	else
		decodeFile fileSave :: IO (Tree String)


main :: IO ()
main = do
	questions <- getQuestions
	animal <- askQuestions questions
	putStr "Je pense à \""
	putStr $ getAnimalName animal
	putStrLn "\", ai-je raison ?"
	correct <- correctAnimal
	if correct then do
		putStrLn "Je suis trop intelligent, tu peux pas test, noob !"
	else do
		animalName <- askAnimalName
		animalQuestion <- askAnimalQuestion animalName
		putStrLn "Merci de m'avoir éclairé de votre savoir, ô grand maître de la connaissance."
```
