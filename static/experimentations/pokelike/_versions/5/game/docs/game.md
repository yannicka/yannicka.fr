tile-based game

*****************************************************************

|----------|
| POKELIKE |
|----------|------------------------------|
| Cr�ateur :                Aylab         |
| Date de d�but du projet : 25 avril 2013 |
| Drni�re mise � jour :     26 avril 2013 |
|-----------------------------------------|



DES "POKEMON"
mais au lieu qu'ils �voluent
=> ils mutent ensemble pour former des "POKEMON" uniques
=> => Avec une limite du nombre de mutations, sinon �a fait une infinit� => impossible � g�rer



Pour le sol, ne pas tout d�finir, chaque case du tiles grounds correspond � une couleur, exemple :
 0 : rgb(0, 0, 0)
 1 : rgb(0, 0, 1)

Une seconde image pour les cases solides

 * Sol
 * Objet
 * Solide ou non
 * Ev�nements
 * Ennemis/PNJs



Todo (dans l'ordre) : (optimiser apr�s chaque �tape)
 * Affichage de la carte
 * Optimisation
 * D�placement du joueur
 * Optimisation
 * Cam�ra qui suit le joueur
 * Optimisation
 * Ev�nements onenter et onaction
 * Optimisation
 * Panneau -Explication -Oui/Non -Autre?
 * Optimisation
 * PNJs -Explication -Oui/Non -Autre
 * Optimisation
 * Une id�e de jeu
 * Optimisation
 * R�fl�chir
 * Optimisation

Histoire :
  -

Graphismes
  -

Deux types de tiles :
  1. Les solides (collision) :
       * Murs
       * Meubles
       * Bat�ments
       * Barri�res
       * Arbres
       * Rochers

  2. Les non solides (pas de collision) :
       * Sols
       * NE PAS OUBLIER LES PAVES AU SOL ET SURTOUT LES "HAUTES HERBES"

2 couches d'affichage + 3 couches sp�ciales :
  * grounds   (sols)       (g)
  * items     (objets)     (i)
  * no solid  (pas solide) (n)
  * on enter  (� l'entr�e) (onenter)
  * on action (� l'action) (onaction)

Gameplay :
  Le joueur se trouve dans un univers 2D style Pok�mon. Il a la possibilit� de se d�placer vers la gauche, le haut, la droite et le bas.
  Cet univers est peupl� de PNJs qui, par difficult� croissante, propose de joueur � un jeu 2D de plateforme, comme Mario.

Nettoyage de map :
Supprimer tout les espaces et :
,i:-1
,s:0
