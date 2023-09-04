# ☮ Bibliothèque standard

- Il n'y a pas de fonction `isEmpty` sur le type « string » ;
- Il n'y a pas de fonction `trim`, `rtrim` et `ltrim` sur le type string.

# ☮ HTML5

- Il manque `console`, `alert` et `navigator` dans la bibliothèque « html5 ».

# ☮ Langage

- Il est possible de faire une plage exlusive (`0..5` pour `[ 0, 1, 2, 3, 4 ]`)
  mais pas inclusive (par exemple `0...5` pour `[ 0, 1, 2, 3, 4, 5 ]`) ;
- Pas de support des fonctions variadiques ;
- Pas de commentaire multiligne (par exemple `### ... ###`) ;
- Il serait bien de pouvoir écrire des choses comme
  `def add(a, b int)` qui équivaudrait à `def add(a int, b int)` ;
- Il n'est pas possible d'utiliser `return self` dans une méthode qui est
  héritée sans qu'il ne soit demander de faire un « cast » ;
- Impossible de mettre une valeur une valeur par défaut dans une fonction ou une
  méthode (par exemple `def add(a int, b int = 5)`) ;
- Impossible d'itérer sur les classes `Map` avec une boucle `for` ;
- Impossible d'utiliser `self` dans un espace de noms pour le retourner ou
  l'utiliser sans répéter le nom ;
- Impossible de faire une boucle for dans le sens inverse : `for i in 50 .. 0` ;
- Impossible de spécifier un pas à la boucle for : `for i in 0 .. 40 by 2`.

# ☮ Pourquoi pas

- Améliorer le « pattern matching » pour tester des types, des valeurs,
  déréférencer des tableaux, etc. ;
- Avec un tel « pattern matching », rendre le « null » interdit et créer une
  énumération `enum Maybe<T> { Just(T), None }` pour remplacer le null. Ou alors
  utiliser la syntaxe `Type?` ;
- Compiler avec la syntaxe ES6 (`const`).
