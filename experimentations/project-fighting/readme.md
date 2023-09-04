# Project Fighting

## Présentation du jeu

Jeu multijoueur.

Les joueurs se combattent indéfiniment dans une arène.

Il s'agit d'un jeu qui se veut simple, sans fioritures. Il ne doit pas y avoir
trop d'armes, trop de personnages, trop de différentes interactions.

### Armes

- Pistolet
- Mitraillette ;
- Lance-roquettes ;
- Fusil à pompe ;
- Grenade ;
- Dynamite ;
- Mine ;
- Lance-flammes ;
- Fumigène ;
- Pistolet laser.

### Solides

- Standard ;
- Baril explosif ;
- Caisse déplaçable, si possible.

### Bonus

- Nouvelle arme ;
- Munitions ;
- Augmentation de la vitesse ;
- Augmentation de la cadence de tir ;
- Récupération de vie.

## Informations techniques

### Couches

- Sol ;
- Mur ;
- Objets solides ;
- Objets ramassables ;
- Joueurs.

### Collisions

- Joueurs ↔ Murs ;
- Joueurs ↔ Balles ;
- Joueurs ↔ Objets solides ;
- Joueurs ↔ Objets ramassables ;
- Balles ↔ Murs ;
- Balles ↔ Objets solides.

### Durées et vitesse

- Les durées sont exprimées en seconde. « 3 » représente trois secondes, « 2.5 »
représente deux secondes et demie ;
- La vitesse est exprimée en pixels par seconde. « 100 » représente 100 pixels
traversés en une seconde.

## Compilation

Les fichiers du projet se trouve dans le dossier `./web/app/`. Le projet est
compilé dans le fichier `./web/js/app.js`. Le langage utilisé est
[Skew](http://skew-lang.org/).

Les fichiers du style se trouve dans le dossier `./web/stylus/`. Le style est
compilé dans le fichier `./web/css/style.css`. Le langage utilisé est
[Stylus](https://learnboost.github.io/stylus/).

Pour compiler le projet, avec `npm` :

```
sudo npm install
./build.sh
gulp stylus
```

Vous pouvez aussi lancer un *watcher* pour compiler le code Stylus :

```
gulp watch
```

Ainsi, à chaque modification d'un fichier, le code CSS est regénéré.

## Documentation

- http://androidarts.com/pixtut/pixelart.htm ;
- http://www.lexaloffle.com/pico-8.php.
