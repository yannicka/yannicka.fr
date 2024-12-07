+++
title = "Rövarspråket"
+++

# Rövarspråket

Publié le 30 août 2015 par Benoît sous licence CC BY-SA 4.0.

## Énoncé

Bonjour à tous,

Les jeunes enfants suédois apprennent un langage SUPER SECRET, le
Rövarspråket !

Le Rövarspråket n'est pas très compliqué, vous prenez un mot et vous remplacez
les consonnes par la consonne doublé avec un o au milieu. Le `b` devient `bob`,
le `r` devient `ror`, etc. Les voyelles ne sont pas modifiées, c'est fait pour
le suédois mais cela fonctionne pour le français.

ATTENTION, c'est un code secret Suèdois, si vous le partagez vous serez obligé
de manger du Surströmming.

### Entrée

```text
Bonjour ca va
```

### Sortie

```text
boboujojouror coca vova
```

### Bonus

Faire le décodage aussi !

## Travaux réalisés

- booti386 : [pastebin](https://pastebin.com/FhPehyC7) - C
- SuperMonkey : [pastebin](https://pastebin.com/CGda4MmV) - OCaml
- Moi-même : [pastebin ](https://pastebin.com/xDqhtHtC) - Haskell,
  [pastebin](https://pastebin.com/6pU2Hczc) - io

### Mon code

#### Haskell

```haskell
import System.IO

isConsonant :: Char -> Bool
isConsonant = (`elem` "bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ")

rovarspraket :: String -> String -> String
rovarspraket [] out = out
rovarspraket (x:xs) out =
  rovarspraket xs $ out ++ if isConsonant x then [ x, 'o', x ] else [ x ]

main :: IO ()
main = do
  putStr "Saisissez une chaine : "
  hFlush stdout
  input <- getLine
  let a = rovarspraket input ""
  putStr a
  putStr "\n"
```

#### Io

```io
isConsonant := method(chr,
        "bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ" findSeq(chr) isNil not)

standardIO := File standardInput()

rovarspraket := method(string, output,
        if(string isEmpty,
                output,

                firstChar := string at(0) asCharacter
                tailString := string exSlice(1)

                rovarspraket(tailString, output ..
                        if(isConsonant(firstChar),
                                firstChar .. "o" .. firstChar,
                                firstChar))))

main := method(
        "Saisissez une chaine : " println
        input := standardIO readLine
        a := rovarspraket(input, "")
        a println)

main
```
