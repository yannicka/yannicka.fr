+++
title = "Stéganographie"
date = 2021-08-23
author = "Aur36"
+++

## Énoncé

La stéganographie est l'art de dissimuler des messages dans un format à
l'apparence anodine. Par exemple ici, une image.

Chaque pixel est représenté par 3 octets : un pour le rouge, le vert et le bleu.
La technique LSB *(Least Significant Bit)* consiste à cacher un bit
d'information dans chaque octet de l'image, dans le bit de poids faible.

En effet, la différence entre `(255, 0, 0)` et `(254, 0, 0)` est quasiment nulle
à l'oeil nu.

Comment cacher un message ? Facile : du texte n'est rien de plus qu'une série de
bit. On prendra l'ASCII ici pour des raisons de simplicité.

Il suffit alors de prendre chaque bit de poids faible de l'image, de le comparer
avec un ET binaire au bit correspondant du message, et de le modifier selon. On
prendra soin de s'assurer que les pixels modifiés n'avaient que des bits de
poids faible à 1 (un fond blanc par exemple)

Implémentez une écriture de message caché sur le générateur d'images PPM
précédemment fait.

Bonus : implémentez un lecteur de messages cachés par technique LSB.
