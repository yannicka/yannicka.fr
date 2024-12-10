# ☮ Communication client ↔ serveur

## Communication serveur → client

Données du serveur qui sont transmises au client. Elle ne servent qu'à
l'affichage car c'est le serveur qui effectue tous les calculs.

```
Block {
	// à faire
}

Player {
	x double
	y double
	direction int
}

Bullet {
	x double
	y double
}

Explosion {
	x double
	y double
}

# Données envoyées au lancement du jeu
walls List<List<int>>

# Données envoyées fréquemment
players List<Player>
bullets List<Bullet>
blocks List<Block>

# À faire
// le joueur se fait toucher par une balle
// le déplacement est impossible
```

## Communication client → serveur

Données du client qui sont transmises au serveur. Il ne s'agit que de signaux.
Par exemple le déplacement du joueur est effectué en local en direct et le
serveur reçoit le signal pour valider le déplacement et signale aux joueurs
qu'un autre s'est déplacé.

```
# À faire
// déplacement du joueur
// tir
```
