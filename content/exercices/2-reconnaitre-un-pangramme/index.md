+++
title = "Reconnaitre un pangramme"
date = 2014-06-30
+++

## Enoncé

Le principe est simple : savoir si une phrase est un pangramme ou non. Un
pangramme est une phrase contenant toutes les lettres de l'alphabet.

### Entrée

Une phrase, par exemple :

```text
Monsieur Jack, vous dactylographiez bien mieux que votre ami Wolf
```

### Sortie

Simplement `true` ou `false`.

### Bonus

On ne veut plus gérer seulement les lettres de l'alphabet mais aussi les
lettres accentuées et les ligatures (à, â, é, è, ê, ë, î, ï, ô, ù, û, ü, ÿ, ç,
æ et œ), par exemple :

```text
Dès Noël où un zéphyr haï me vêt de glaçons würmiens je dîne d'exquis rôtis de bœuf au kir à l'aÿ d'âge mûr & cætera
```

## Travaux réalisés

- SuperMonkey : [jsbin](http://jsbin.com/civegoqe/1/edit) - JavaScript
- Moi-même : [pastebin](https://pastebin.com/H8cHH6Ut),
  [try haxe](http://try.haxe.org/#F71d6) - Haxe

### Mon code

```haxe
class ExoLundi2 {
  static function main() {
    var root = flash.Lib.current.stage;

    var input    = new flash.text.TextField();
    input.type   = flash.text.TextFieldType.INPUT;
    input.x      = 0;
    input.y      = 0;
    input.width  = root.stageWidth;
    input.height = 20;
    input.border = true;
    input.text   = "Monsieur Jack, vous dactylographiez bien mieux que votre ami Wolf";

    var output    = new flash.text.TextField();
    output.x      = 0;
    output.y      = 22;
    output.width  = root.stageWidth;
    output.height = 20;
    output.text   = "Pangramme : oui";

    input.addEventListener("change", function(_) {
      var pan = new Map<Int, Bool>();
      for (i in 97 ... 123)
        pan[i] = false;

      for (i in 0 ... input.text.length) {
        var chr = input.text.charAt(i).toLowerCase().charCodeAt(0);

        if (chr >= 97 && chr <= 122)
        pan[chr] = true;
      }

      var test_pan = pan.toString().indexOf("false") == -1;
      output.text = "Pangramme : " + (test_pan ? "oui" : "non");
    });

    root.addChild(input);
    root.addChild(output);
  }
}
```
