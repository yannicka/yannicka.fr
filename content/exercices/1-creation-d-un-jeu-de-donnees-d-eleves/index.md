+++
title = "Création d'un jeu de données d'élèves"
+++

# Création d'un jeu de données d'élèves

Publié le 23 juin 2014 par Benoît sous licence CC BY-SA 4.0.

## Enoncé

Pour cet exercice le principe est de créer un jeu de données d'étudiants avec
pour chacun un nom, un prénom et des notes.

### Entrée

`N`, qui représente le nombre d'élèves à générer. Il est conseillé de tester
avec 10, 100, 1 000 voire 10 000 élèves.

### Sortie

La sortie doit être de la forme :

```text
(prénom), (nom) (score 1) (score 2) (score 3) (score 4) (score 5)
```

Sans les parenthèses, évidemment.

Bien sûr le nom, le prénom ainsi que les notes doivent être aléatoires (pas
forcément des vrais noms).

### Bonus

Aucun doublon dans les noms et prénoms.

## Travaux réalisés

- SuperMonkey : [pastebin](https://pastebin.com/ypqeD2Pf),
  [swfcabin](http://swfcabin.com/swf-files/1404076973.swf) - Haxe
- Blazed : [textup](http://textup.fr/96438rv) - Java
- Naemy : [JSFiddle](http://jsfiddle.net/gs5yP/) - JavaScript
- Moi-même : [pastebin 1](https://pastebin.com/k0HYTNRi),
  [pastebin 2](https://pastebin.com/VRXTwEtQ) - Haxe

### Mon code

```haxe
package;

// Un élève = un nom, un prénom et une liste de notes (ils n'ont pas de vies !)
typedef Student = { name:String, firstname:String, notes:Array<Int> };

class ExoLundi1 {
  public static function main() {
    // Nombre d'élèves voulus
    var n = Std.parseInt(Sys.stdin().readLine());

    // La liste des élèves
    var students = new Array<Student>();

    // Les noms possibles
    var names = [
      "Martin", "Bernard", "Thomas", "Petit", "Robert",
      "Richard", "Durand", "Dubois", "Moreau", "Laurent",
      "Simon", "Michel", "Lefebvre", "Leroy", "Roux",
      "David", "Bertrand", "Morel", "Fournier", "Girard",
      "Bonnet", "Dupont", "Lambert", "Fontaine", "Rousseau",
      "Vincent", "Muller", "Lefevre", "Faure", "Andre"
    ];

    // Les prénoms qui seront générés
    var firstname_part1 = [
      "Ni", "Ya", "Seba", "Si", "Mae", "Ro", "Isa", "Ce", "Ju",
      "Vic", "Be", "Chri", "Bea", "Elo", "A", "Hu"
    ];

    var firstname_part2 = [
      "colas", "nnick", "stien", "mon", "va", "main", "belle", "dric", "lia",
      "tor", "noit", "stophe", "trice", "die", "nais", "go",
      "ger", "lie", "ole"
    ];

    // Génération de 1000 élèves extraordinaires
    var exists:Bool;
    var name:String;
    var firstname:String;

    for (i in 0 ... n) {
      do {
        exists    = false;
        name      = rand_array(names).toUpperCase();
        firstname = rand_array(firstname_part1) + rand_array(firstname_part2);

        for (student in students) {
          if (name == student.name && firstname == student.firstname) {
            exists = true;
            break;
          }
        }
      } while (exists);

      students.push({
        name:      name,
        firstname: firstname,
        notes:     [ for (j in 0 ... 5) rand(0, 20) ]
      });
    }

    // Affichage des élèves
    for (student in students) {
      Sys.println('${student.name}, ${student.firstname} ${student.notes.join(" ")}');
    }

    // Petite pause
    Sys.stdin().readLine();
  }

  // Génération d'un nombre [ min ; max ]
  public static inline function rand(min:Int, max:Int) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Récupération d'une valeur aléatoire dans une liste
  public static inline function rand_array(array:Array<String>) {
    return array[rand(0, array.length - 1)];
  }
}
```
