+++
title = "Infomaniak kDrive : hébergement de mes photos"
+++

J'avais besoin d'un espace de stockage sur un serveur pour stocker des
documents, notamment des photos (plus de 75 Go).

Voici les contraintes que j'avais :

- Pouvoir stocker des centaines de Go. Dans l'idéal au moins 1 To, pour être
  large sur mes besoins à venir.
- Les données doivent être présentes sur mon ordinateur *et* un serveur
  distant.
- Pouvoir accéder aux données en ligne (notamment sur mon téléphone via une
  application).
- Ne pas héberger le service moi-même, car je n'ai pas l'ambition de maintenir
  un service en ligne fonctionnel, à jour et sauvegardé.
- Être hébergé chez un prestataire de confiance (c'est relatif) en France ou en
  Europe (Allemagne ou Suisse par exemple).
- Ne pas être trop coûteux.
- *Si possible*, chiffré de bout-en-bout.

Ainsi, j'ai trouvé la solution
[Infomaniak kDrive](https://www.infomaniak.com/fr/kdrive) (j'évite Google Drive
et consors).

Cette solution couvre tous mes besoins : pour 7,90 € par mois, je dispose de
2 To de stockage et un client de synchronisation de mes données entre mon
ordinateur et leur serveur. Le tout hébergé en Suisse. Ainsi, j'ai toutes mes
photos sur mon ordinateur, et je peux y accéder simplement depuis mon
téléphone.

Le seul défaut de l'application est que j'avais aussi besoin de synchroniser
certains documents entre mon ordinateur et mon téléphone (les dossiers et
fichiers doivent exister sur les deux appareils), ce que ne permet pas
entièrement kDrive (on peut synchroniser où on veut un fichier mais pas un
dossier entier).

Pour cela, j'ai mis en place [Syncthing](https://syncthing.net/) en plus de
kDrive. J'ai fait en sorte de connecter un dossier kDrive via Syncthing entre
mon ordinateur et mon téléphone. Ça me permet d'avoir le dossier présent sur
mes différents appareils mais aussi en ligne.

Syncthing m'a donc permis, en plus d'autres documents, de pouvoir partager mon
fichier de mots de passe (format KeePass) entre mes différents appareils, me
garantissant de ne pas pouvoir perdre ce fichier important (et en plus de cela,
il est versionné sur une instance de GitLab, ce qui le fait exister à au moins
4 endroits différents).

Ainsi, mes données sont à la fois sur un support physique qui bouge peu (mon
ordinateur) et sur un serveur distant (celui d'Infomaniak dans mon cas). Et
pour certaines d'entre elles, notamment les plus sensibles ou celles que je
veux sur plusieurs supports, Syncthing vient en renfort.

À l'avenir il faudrait que j'étudie une solution comme [Hetzner Storage
Share](https://www.hetzner.com/storage/storage-share) qui utilise Nextcloud et
est donc plus standard.
