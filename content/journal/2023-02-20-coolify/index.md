+++
title = "Test rapide de Coolify"
+++

# Test rapide de Coolify

*Publié le 20 février 2023.*

Le déploiement d'un site internet ça n'a jamais été mon truc. J'ai toujours trouvé ça trop complexe. Alors je fais au plus simple, sans pour autant respecter toutes les bonnes pratiques.

J'ai essayé quelques outils, par exemple [Dokku](https://dokku.com/), mais ça ne m'a pas paru beaucoup plus simple...

Il y a quelque temps, j'ai découvert [Coolify](https://coolify.io/) qui se présentait comme une alternative auto-hébergée à Heroku et Netlify. Cependant, puisque l'outil ne fonctionnait que pour Ubuntu et que mon serveur tournait sous Debian, je n'avais pas pu l'essayer.

Depuis quelque temps, l'outil semble fonctionner sous Debian, je l'ai alors installer pour tester ça.

## Première étape : installer Coolify

Pour commencer, rien de plus simple :

```bash
wget -q https://get.coollabs.io/coolify/install.sh -O install.sh; sudo bash ./install.sh
```

Ensuite, il faut se rendre sur l'IP de son site internet, avec le port 3000, et se créer un compte administrateur sur l'interface web.

## Deuxième étape : créer l'application

Via l'interface, il faut créer une application. Pour cela, il faut fournir le dépôt git où se trouve l'application. Ensuite, il faut configurer la façon dont doit tourner le site. Pour ma part, ce sont des sites statiques, donc j'ai pu de choses à me préoccuper, pas même de base de données.

J'ai alors créé l'application pour mon site principal yannicka.fr.

## Troisième étape : configurer le reverse proxy

Avant ça, je faisais déjà tourner mon site dans un conteneur Docker. J'avais déjà ma configuration toute prête. J'ai juste eu à changer le port.

J'utilise [Caddy](https://caddyserver.com/) comme serveur web et voici ma configuration actuelle :

```nginx
yannicka.fr {
    tls {
        protocols tls1.3
    }

    encode gzip

    header /assets/* Cache-Control max-age=5184000
    header Content-Security-Policy "script-src 'self'"
    header Strict-Transport-Security "max-age=31536000; includeSubDomains"
    header X-Frame-Options "SAMEORIGIN"
    header X-Content-Type-Options "nosniff"
    header Referrer-Policy "no-referrer"
    header -Server

    reverse_proxy 127.0.0.1:9050
}

www.yannicka.fr {
    redir https://yannicka.fr{uri} 301
}
```

## Conclusion

J'ai fait quelques tests supplémentaires rapides, et je suis très satisfait du résultat. Par exemple, en quelques minutes, j'ai pu avoir ma propre instance d'[Uptime Kuma](https://uptime.kuma.pet/).

À voir désormais comment ça se comporte avec les mises à jour ainsi qu'avec les bases de données.

Aussi, il faudra que je vois comment se comporte ce genre d'outils en cas d'erreurs, savoir si elles sont bien gérées et bien remontés.
