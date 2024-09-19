+++
title = "Dessiner en hexa"
date = 2014-07-14
+++

## Enoncé

Aujourd'hui nous allons faire un dessin en bitmap de taille 8x8.

Je vais vous donner 8 valeurs hexadécimales. Donc de 0 à 254 en décimal. Chaque
valeur représente une ligne, donc avec 8 valeurs : 8 lignes, donc une image en
8x8.

### Entrée

8 valeurs hexadécimales.

Exemple :

```text
18 3C 7E 7E 18 18 18 18
```

### Sortie

Une image de 8x8 qui représente les valeurs que vous lisez. Par exemple pour
`FF`, c'est `1111 1111`. `1` signifie qu'il faut dessiner sur cette case, `0`
que non.

`1111 1111` va donc afficher :

```text
xxxxxxxx
```

Si la valeur d'après est `81`, qui fait `1000 0001` en binaire, alors le dessin
sera :

```text
xxxxxxxx
x......x
```

Exemple de sortie sur 8 données :

```text
......xx
....xxxx
...xxxxx
...xxxxx
......xx
......xx
......xx
......xx
```

### Objectifs

Afficher les 4 images à partir des données ci-dessous :

```text
FF 81 BD A5 A5 BD 81 FF
AA 55 AA 55 AA 55 AA 55
3E 7F FC F8 F8 FC 7F 3E
93 93 93 F3 F3 93 93 93
```

## Travaux réalisés

- Aur36 : [pastebin](https://pastebin.com/zHAL9HLn) - Python
- Moi-même : [pastebin](https://pastebin.com/4SsqmS9V) - Microsoft SmallBASIC

### Mon code

```text
SIZE = 20

TextWindow.Write("Saisie (ex : 3E 7F FC F8 F8 FC 7F 3E) : ")

drawing = Text.ConvertToUpperCase(TextWindow.Read())

If Text.GetLength(drawing) <> 23 Then
  drawing = "3E 7F FC F8 F8 FC 7F 3E"
EndIf

For i = 1 To 8
  new_drawing[i] = ""
EndFor

y = 0

For i = 1 To Text.GetLength(drawing) Step 1
  chr = Text.GetSubText(drawing, i, 1)

  If chr = " " Then
    y = y + 1
  ElseIf chr = "0" Then
    new_drawing[y] = Text.Append(new_drawing[y], "0000")
  ElseIf chr = "1" Then
    new_drawing[y] = Text.Append(new_drawing[y], "0001")
  ElseIf chr = "2" Then
    new_drawing[y] = Text.Append(new_drawing[y], "0010")
  ElseIf chr = "3" Then
    new_drawing[y] = Text.Append(new_drawing[y], "0011")
  ElseIf chr = "4" Then
    new_drawing[y] = Text.Append(new_drawing[y], "0100")
  ElseIf chr = "5" Then
    new_drawing[y] = Text.Append(new_drawing[y], "0101")
  ElseIf chr = "6" Then
    new_drawing[y] = Text.Append(new_drawing[y], "0110")
  ElseIf chr = "7" Then
    new_drawing[y] = Text.Append(new_drawing[y], "0111")
  ElseIf chr = "8" Then
    new_drawing[y] = Text.Append(new_drawing[y], "1000")
  ElseIf chr = "9" Then
    new_drawing[y] = Text.Append(new_drawing[y], "1001")
  ElseIf chr = "A" Then
    new_drawing[y] = Text.Append(new_drawing[y], "1010")
  ElseIf chr = "B" Then
    new_drawing[y] = Text.Append(new_drawing[y], "1011")
  ElseIf chr = "C" Then
    new_drawing[y] = Text.Append(new_drawing[y], "1100")
  ElseIf chr = "D" Then
    new_drawing[y] = Text.Append(new_drawing[y], "1101")
  ElseIf chr = "E" Then
    new_drawing[y] = Text.Append(new_drawing[y], "1110")
  ElseIf chr = "F" Then
    new_drawing[y] = Text.Append(new_drawing[y], "1111")
  EndIf
EndFor

GraphicsWindow.Title  = "Rendu graphique"
GraphicsWindow.Width  = SIZE * 8
GraphicsWindow.Height = SIZE * 8
GraphicsWindow.Show()

For y = 0 To 7
  For x = 1 To 8
    If Text.GetSubText(new_drawing[y], x, 1) = "1" Then
      GraphicsWindow.BrushColor = "black"
      GraphicsWindow.FillRectangle(x * SIZE - SIZE, y * SIZE, SIZE, SIZE)
    EndIf
  EndFor
EndFor
```
