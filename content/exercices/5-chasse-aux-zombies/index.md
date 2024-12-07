+++
title = "Chasse aux zombies"
+++

# Chasse aux zombies

Publié le 3 novembre 2014 par Benoît sous licence CC BY-SA 4.0.

## Enoncé

Nous allons simuler sur une carte la chasse aux zombies !

Pour cela nous avons besoin de 3 types de personnes :

- Les zombies : ils se baladent et cherchent à manger des gens ;
- Les victimes : des humains innocents, ils sont nuls et se font donc manger ;
- Les chasseurs : ils chassent et tuent les zombies.

En plus de tout ce beau monde il nous faut un terrain de jeu, ici ce sera une
carte de 20x20, donc de 400 cases, où chaque case pourra contenir un zombie,
une victime, un chasseur, ou rien. Lors de la création de cette carte, il
faudra placer aléatoirement tous les protagonistes.

### Entrée

Pour cette simulation, nous devons prendre 4 paramètres en entrée `x`, `y`, `z`
et `t` :

- `x` : le nombre de zombie ;
- `y` : le nombre de victime ;
- `z` : le nombre de chasseurs ;
- `t` : le nombre de tours de la simulation.

Si `x + y + z` est supérieur au nombre de personnes que peut contenir la carte,
une erreur est envoyée.

### Simulation

La partie se divise en 3 grandes parties le mouvement, les attaques des
chasseurs et les morsures des zombies.

#### Mouvement

Tout le monde doit se déplacer sur le terrain, s'ils peuvent se déplacer, mais
de manière différente :

- Le zombie : il essaye de se déplacer d'une case (haut, bas, gauche et
  droite), il n'est pas capable de se déplacer en diagonale, il est trop bête ;
- La victime : elle ne bouge pas sauf si elle est a coté d'un zombie (haut,
  bas, gauche, droite et diagonale), cette direction est aléatoire à cause de
  l'effet de panique ;
- Le chasseur : il se déplace d'une case (haut, bas, gauche, droite et
  diagonale) afin de chercher et tuer un zombie.

#### Attaques des chasseurs

Une fois que les déplacements sont tous effectués c'est aux chasseurs de passer
à l'action. Ils essayent de tuer des zombies à une case de lui (haut, bas,
gauche, droite et diagonale). S'il y a 1 zombie, il le tue, s'il y a 2 zombies
il tue les 2, mais s'il y en a plus il ne peut pas en tuer plus de 2.

Quand un zombie est mort il faut le retirer de la carte.

#### Morsure

Les zombies attaquent toutes les personnes à une case de distance (haut, bas,
gauche et droite) pour les transformer en zombie.

### Données

On veut avoir des informations pour préparer les prochaines invasions de
zombies :

- Le nombre de « single kill » par un chasseur ;
- Le nombre de « double kill » ;
- Le nombre totale de zombies tués ;
- Le nombre de victimes mordus ;
- Le nombre de chasseurs mordus.

## Travaux réalisés

- Booti386 : [pastebin](https://pastebin.com/W4bdS5BQ) - C
- Moi-même : [pastebin](https://pastebin.com/e77i6iDT) - CoffeeScript

### Mon code

```coffeescript
SIZE = 20

class Person
    constructor: (x, y) ->
        @x = x
        @y = y

        @color = rgb(255, 255, 255)

    draw: (ctx) ->
        ctx.fillStyle = @color
        ctx.fillRect(@x * SIZE, @y * SIZE, SIZE, SIZE)

    move: ->

    move_cross: ->
        switch Math.rand(0, 3)
            when 0 then @go_right()
            when 1 then @go_left()
            when 2 then @go_down()
            when 3 then @go_up()

    move_diagonal: ->
        switch Math.rand(0, 7)
            when 0 then @go_right()
            when 1 then @go_left()
            when 2 then @go_down()
            when 3 then @go_up()
            when 4
                @go_right()
                @go_down()
            when 5
                @go_left()
                @go_up()
            when 6
                @go_right()
                @go_up()
            when 7
                @go_left()
                @go_down()

    go_up: ->
        if @y > 0
            new_y = @y - 1
        else
            new_y = @y + 1

        if is_free_cell(@x, new_y)
            @y = new_y

    go_down: ->
        if @y < SIZE - 1
            new_y = @y + 1
        else
            new_y = @y - 1

        if is_free_cell(@x, new_y)
            @y = new_y

    go_left: ->
        if @x > 0
            new_x = @x - 1
        else
            new_x = @x + 1

        if is_free_cell(new_x, @y)
            @x = new_x

    go_right: ->
        if @x < SIZE - 1
            new_x = @x + 1
        else
            new_x = @x - 1

        if is_free_cell(new_x, @y)
            @x = new_x

class Zombie extends Person
    constructor: (x, y) ->
        super(x, y)
        @color = rgb(200, 0, 0)

    draw: (ctx) ->
        super(ctx)

    move: ->
        @move_cross()

    bite: ->
        humans = []
        pos = [
            [ @x, @y - 1 ],
            [ @x + 1, @y ],
            [ @x, @y + 1 ],
            [ @x - 1, @y ]
        ]

        for human in persons when human instanceof Hunter or human instanceof Victim
            if pos.has([ human.x, human.y ])
                humans.push(human)

        for human in humans
            persons.push(new Zombie(human.x, human.y))
            persons.splice(persons.indexOf(human), 1)

class Victim extends Person
    constructor: (x, y) ->
        super(x, y)
        @color = rgb(0, 0, 200)

    draw: (ctx) ->
        super(ctx)

    move: ->
        zombies = []
        pos = [
            [ @x, @y - 1 ],
            [ @x + 1, @y ],
            [ @x, @y + 1 ],
            [ @x - 1, @y ]
        ]

        have_zombies = false

        for zombie in persons when zombie instanceof Zombie
            if pos.has([ zombie.x, zombie.y ])
                have_zombies = true
                break

        if have_zombies
            @move_cross()

class Hunter extends Person
    constructor: (x, y) ->
        super(x, y)
        @color = rgb(200, 200, 0)

    draw: (ctx) ->
        super(ctx)

    move: ->
        @move_diagonal()

    hunt: ->
        zombies = []
        pos = [
            [ @x, @y ],
            [ @x, @y - 1 ],
            [ @x + 1, @y ],
            [ @x, @y + 1 ],
            [ @x - 1, @y ]
        ]

        for zombie in persons when zombie instanceof Zombie
            if pos.has([ zombie.x, zombie.y ])
                zombies.push(zombie)

        i = 0
        for zombie in zombies when i++ < 2
            persons.splice(persons.indexOf(zombie), 1)

nbZombies = 0
nbVictims = 0
nbHunters = 0

can = document.getElementById('game')
ctx = can.getContext('2d')

can.width  = 400
can.height = 400

persons = mouse = sw = timer = null

if nbZombies + nbVictims + nbHunters > 20 * 20
    alert 'STOP!'

init = ->
    persons = []

    for i in [ 0 ... 160 ]
        loop
            x = Math.rand(0, 19)
            y = Math.rand(0, 19)

            break if is_free_cell(x, y)

        switch Math.rand(0, 4)
            when 0 then persons.push(new Zombie(x, y))
            when 1 then persons.push(new Victim(x, y))
            when 2,3,4 then persons.push(new Hunter(x, y))

    mouse = new Mouse(can)

    sw = new Stopwatch()

    timer = new Timer()

    img = preload_images({}, create)

create = ->
    setInterval(->
        for hunter in persons when hunter instanceof Hunter
            hunter.move()
            hunter.hunt()

        for victim in persons when victim instanceof Victim
            victim.move()

        for zombie in persons when zombie instanceof Zombie
            zombie.move()
            zombie.bite()

        nbHunters = (persons.filter (person) -> person instanceof Hunter).length
        nbVictims = (persons.filter (person) -> person instanceof Victim).length
        nbZombies = (persons.filter (person) -> person instanceof Zombie).length

        stats = document.getElementById('stats')
        stats.innerHTML = """
            Nb. chasseurs : #{nbHunters}<br />
            Nb. victimes : #{nbVictims}<br />
            Nb. zombies : #{nbZombies}
        """

    , 100)

    update()

update = ->
    draw()

    mouse.update()
    sw.update()
    timer.update()

    requestAnimationFrame(update)

draw = ->
    ctx.fillStyle = rgb(0, 0, 0)
    ctx.fillRect(0, 0, can.width, can.height)

    for person in persons
        person.draw(ctx)

    return

is_free_cell = (x, y) ->
    for person in persons
        if x == person.x and y == person.y
            return false

    return true

init()
```

```coffeescript
CanvasRenderingContext2D::draw_image_index = (img, width, height, index, x, y, draw = yes) ->
    nbtiles = Math.ceil(img.width / width)

    basex = index % nbtiles
    basex = basex * width

    basey = Math.floor(index / nbtiles)
    basey = basey * height

    if draw
        @drawImage(img, basex, basey, width, height, x, y, width, height)
    else
        nbtiles: nbtiles
        basex: basex
        basey: basey

CanvasRenderingContext2D::get2darray_image = (img) ->
    @save()

    @drawImage(img, 0, 0)

    list_pixels = @getImageData(0, 0, img.width, img.height).data

    map = []

    for i in [ 0...list_pixels.length ] by 4
        r = list_pixels[i + 0]
        g = list_pixels[i + 1]
        b = list_pixels[i + 2]
        a = list_pixels[i + 3]

        x = Math.floor((i / 4) % img.width)
        y = Math.floor(((i - x) / 4) / img.width)

        if map[x]
            map[x][y] = [ r, g, b, a]
        else
            map[x] = [[ r, g, b, a ]]

    @restore()

    map

Math.clamp = (min, val, max) ->
    Math.max(min, Math.min(max, val))

Math.rand = (min, max) ->
    Math.floor(Math.random() * (max - min + 1)) + min

window.rgb = (r, g, b, a = 1) ->
    if a == 1
        "rgb(#{r}, #{g}, #{b})"
    else
        "rgb(#{r}, #{g}, #{b}, #{a})"

Array::has = (val) ->
    for v in this
        if v.join(',') == val.join(',')
            return true

    return false

window.preload_images = (images, callback) ->
    nb_images_loaded = 0
    nb_images_to_load = Object.keys(images).length
    image_loaded = []

    new_image_loaded = ->
        nb_images_loaded++
        return

    for i of images
        image_loaded[i] = new Image()
        image_loaded[i].onload = new_image_loaded
        image_loaded[i].src = images[i]

    preload = ->
        if nb_images_loaded == nb_images_to_load
            callback()
            return
        else
            setTimeout(preload, 100)
            return

    preload()

    image_loaded

class Timer
    constructor: ->
        @timer = null

    setTimer: (timer) ->
        @timer = timer

    update = ->

class Stopwatch
    constructor: ->
        @dt   = 0
        @last = Date.now()
        @time = 0

    update = ->
        @dt    = Date.now() - @last
        @last  = Date.now()
        @time += @dt

class Mouse
    constructor: (el) ->
        @x     = 0
        @y     = 0
        @click = null
        @mtime = 0
        @el    = el
        @loose = null

        document.addEventListener('mousedown', @onmousedown, no)
        document.addEventListener('mousemove', @onmousemove, no)
        document.addEventListener('mouseup', @onmouseup, no)

    update = ->
        @mtime++

    onmouseup: (e) =>
        @loose = @mtime

        @click = null

    onmousedown: (e) =>
        @onmousemove(e)

        @click = @mtime

    onmousemove: (e) =>
        @x = e.pageX - (if @el? then @el.offsetLeft else 0)
        @y = e.pageY - (if @el? then @el.offsetTop else 0)

    up: () ->
        return @click == null

    down: ->
        return @click != null

    press: ->
        return @click == @mtime

    release: ->
        return @loose == @mtime

keycode =
    TAB: 9,  ENTER: 13, SHIFT: 16, CTRL: 17
    ALT: 18, ESC : 27,  SPACE: 32

    LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40

    A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77
    N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90

    NUM0: 48, NUM1: 49, NUM2: 50, NUM3: 51, NUM4: 52
    NUM5: 53, NUM6: 54, NUM7: 55, NUM8: 56, NUM9: 57

    NUMPAD0: 96,  NUMPAD1: 97,  NUMPAD2: 98,  NUMPAD3: 99,  NUMPAD4: 100
    NUMPAD5: 101, NUMPAD6: 102, NUMPAD7: 103, NUMPAD8: 104, NUMPAD9: 105

    ADD: 107, SUB: 109, MUL: 106, DIV: 111

    CAPSLOCK: 20, PAGEUP: 33, PAGEDOWN: 34, END    : 35
    HOME    : 36, ISERT : 45, DELETE  : 46, NUMLOCK: 144
```
