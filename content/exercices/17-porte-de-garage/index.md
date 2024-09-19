+++
title = "Porte de garage"
date = 2016-12-05
+++

## Description

Aujourd'hui, on automatise la porte du garage de votre Ferrari !

Pour cela, on va gérer notre portail avec une télécommande sur laquelle il n'y
a qu'un bouton.

La télécommande fonctionne de la façon suivante :

Si la porte est OUVERTE ou FERMÉE, cliquer sur le bouton va faire que la porte
va s'ouvrir (ou se fermer) jusqu'à la fin du cycle ou le reclique sur un
bouton. Pour schématiser : `Porte : Fermé -> Bouton appuyé -> Porte : En cours
d'ouverture -> Cycle complet -> Porte : Ouverte`.

Si la porte est en cours de fermeture ou d'ouverture, appuyer sur le bouton va
stopper la porte. Ensuite réappuyer sur le bouton va faire repartir la porte
dans l'autre sens. Pour schématiser : `Porte : Fermé -> Bouton appuyé -> Porte
: En cours d'ouverture -> Bouton appuyé -> Porte : Stop en ouverture -> Bouton
appuyé -> Porte : En cours de fermeture`.

Dans notre exercice, on commencera toujours avec une porte fermée.

## Entrées et sorties

Les entrées sont une série de commande :

```text
Clique_bouton
Cycle_complet
Clique_bouton
Clique_bouton
Clique_bouton
Clique_bouton
Clique_bouton
Cycle_complet
```

Les sorties doivent être l'état de la porte après chaque entrée.

Par exemple :

```text
Porte : Fermé
> Clique_bouton
Porte : En cours d'ouverture
> Cycle_complet
Porte : Ouverte
>Clique_bouton
Porte : En cours de fermeture
>Clique_bouton
Porte : Stop en fermeture
>Clique_bouton
Porte : En cours d'ouverture
>Clique_bouton
Porte : Stop en ouverture
>Clique_bouton
Porte : En cours de fermeture
> Cycle_complet
Porte : Fermé
```

## Conseil

Pour cet exercice, il est conseillé d'utiliser une machine à état, pour
comprendre le principe je vous dirige vers Wikipédia :
[Automate fini](https://fr.wikipedia.org/wiki/Automate_fini).

## Bonus

En bonus, pour éviter de rayer la Ferrari ou d'écraser le chat, on va ajouter
un rayon infrarouge sur la porte. Si quelque chose passe devant la porte alors
elle sera bloquée.

Pour cela, on ajoute les règles suivantes sur notre système :

1. Si la porte est en cours de fermeture et qu'un objet coupe le rayon alors la
   porte va s'ouvrir complétement. Elle restera ensuite bloqué tant que
   l'entrée INFRAROUGE_OK ne sera pas appelée.

2. Pour tous les autres cas, la porte se bloquera dans sa position tant que
   INFRAROUGE_OK ne sera pas reçu. Ensuite la porte repartira à son état
   d'avant le blocage.

### Entrée bonus

```text
Clique_bouton
Cycle_complet
Clique_bouton
Infrarouge_rompu
Clique_bouton
Cycle_complet
Clique_bouton
Infrarouge_ok
Clique_bouton
Cycle_complet
```

### Sortie bonus

```text
Porte : Fermé
>Clique_bouton
Porte : En cours d'ouverture
>Cycle_complet
Porte : Ouverte
>Clique_bouton
Porte : En cours de fermeture
>Infrarouge_rompu
Porte : Ouverture d'urgence
>Clique_bouton
Porte : Ouverture d'urgence
>Cycle_complet
Porte : Ouverte et bloqué
>Clique_bouton
Porte : Ouverte et bloqué
>Infrarouge_ok
Porte : Ouverte
>Clique_bouton
Porte : Fermeture
>Cycle_complet
Porte : Fermé
```

Bonne chance à tous !

## Travaux réalisés

- Moi-même : [pastebin](https://pastebin.com/GfKPaa7q) - Go

### Mon code

*(non finalisé)*

```go
package main

// Importations
import (
  "fmt"
  "time"
)

// Constantes
var DOpened = 0
var DClosed = 1
var DOpening = 2
var DClosing = 3
var DOpeningStopped = 4
var DClosingStopped = 5

// Variable d'état
var state = DClosed

// État au format chaine
func stateToString(state int) string {
  switch state {
    case DOpened:
      return "Ouvert"

    case DClosed:
      return "Fermé"

    case DOpening:
      return "En cours d'ouverture"

    case DClosing:
      return "En cours de fermeture"

    case DOpeningStopped:
      return "Ouverture arrêtée"

    case DClosingStopped:
      return "Fermeture arrêtée"

    default:
      return "État inconnu"
  }
}

// Afficher l'état au format chaine
func displayState(state int) {
  fmt.Printf("État : %s\n", stateToString(state))
}

// Appuyer sur le bouton
func pushButton(state *int) {
  fmt.Printf("Appui sur le bouton\n")

  switch *state {
    case DOpened, DOpeningStopped:
      *state = DClosing

      displayState(*state)

      for i := 0 ; i < 5000 ; i++ {
        if *state == DClosing {
          time.Sleep(1 * time.Millisecond)
        } else {
          return
        }
      }

      *state = DClosed
      displayState(*state)

    case DClosed, DClosingStopped:
      *state = DOpening

      displayState(*state)

      for i := 0 ; i < 5000 ; i++ {
        if *state == DOpening {
          time.Sleep(1 * time.Millisecond)
        } else {
          return
        }
      }

      *state = DOpened
      displayState(*state)

    case DOpening:
      *state = DOpeningStopped

      displayState(*state)

    case DClosing:
      *state = DClosingStopped

      displayState(*state)
  }
}

func main() {
  var input string

  for {
    fmt.Scanln(&input)

    go pushButton(&state)
  }
}
```
