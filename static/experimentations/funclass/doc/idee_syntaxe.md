# Types
Nil
Bool
Num
Str
List<T>
Dict<K, V>
Func<(T n)*>:T
Obj (Var ?)
Var

# Créer une fonction
add(Num a, Num b) { a + b }
add(Str a, Str b) { a + b }
sub(Num a, Num b) { a - b }
sub(Str a, Num b) { a - b }

# Surcharge des opérateurs
:+(Num a, Num b) { # native code }
:+(Str a, Str b) { # native code }
:-(Num a, Num b) { # native code }
:-(Str a, Num b) { # native code }

# Utiliser la fonction
mon_num = add(2, 5) # 7
mon_str = add("Hello", " World!") # "Hello World!"

# Fonction anonyme
ma_func = (Num a, Num b) { a + b }
appel_func((Num a, Num b) {

})

# Conditions
if ma_func(3, 2) == 5 {
    ma_func = (Num a, Num b) { a - b }
} else if ma_func(55, 100) == 100 {
    # ...
} else {
    # ...
}

<, <=, >, >=, ==, <>, and, or, not

# Switch
switch {
    when ma_var < 5 {
        # ...
    }

    when ma_var > 5 {
        # ...
    }

    else {
        # ...
    }
}

switch ma_var {
    when "a" {
        # ...
    }

    when "c", "d" {
        # ...
    }

    else {
        # ...
    }
}

# Boucle simple
loop {
    # ...
}

mon_num = 5
loop mon_num {
    # ...
}

# Boucle while
i = 5
while i-- {
    # i = 4
    # i = 3
    # ...
}

i = 5
do {
    # i = 5
    # i = 4
    # ...
} while i--

# Boucle itérative
for i from 0 to 5 by 1 {
    # i = 0
    # i = 1
    # ...
}

# Boucle sur une liste
ma_list = [ 2, 3, 5, 7, 11, 13 ]
for k, v in ma_list {
    # k = 0, v = 2
    # k = 1, v = 3
    # ...
}

# Boucle sur un dictionnaire
mon_dict = { "a" = "b", "b" = "c", "c" = "d" }
for k, v in mon_dict {
    # k = "a", v = "b"
    # k = "b", v = "c"
    # ...
}

# Boucle sur une chaîne ?
mon_str = "Hello"
for k, v in mon_str {
    # k = 0, v = "H"
    # k = 1, v = "e"
    # ...
}

# Evalutions booléennes
Evaluer à no  : no, 0, 0.0, "", "0", [],  {}, nil
Evaluer à yes : le reste

# Classes
class Point {
    new(Num x, Num y) {
        @x = x
        @y = y
    }

    add(Point2D p) {
        @x += p.x
        @y += p.y
    }

    add(Num x, Num y) {
        @x += x
        @y += y
    }
}

class Point3D {
    new(Num x, Num y, Num z) {
        super(x, y)
        @z = z
    }

    add(Point3D p) {
        @x += p.x
        @y += p.y
        @z += p.z
    }

    add(Num x, Num y, Num z) {
        @x += x
        @y += y
        @z += z
    }
}

load_file = (file, callback) ->
    xhr = new XMLHttpRequest()
    xhr.open('get', file, yes)
    xhr.overrideMimeType('text/csv')
    xhr.send(null)

    xhr.onreadystatechange = ->
        if xhr.readyState == 4 and (xhr.status == 200 or xhr.status == 0)
            callback(xhr.responseText)

        return

    return

load_file(Str filename, Func callback) {
    xhr = new XMLHttpRequest()
    xhr.open("get", filename, yes)
    xhr.overrideMimeType("text/cvs")
    xhr.send(nil)

    xhr.onreadystatechange = () {
        if xhr.readyState == 4 and (xhr.status == 200 or xhr.status == 0) {
            callback(xhr.responseText)
        }
    }
}

load_nb_grids(Func callback) {
    load_file("level.csv", (Obj response) {
        nb_grids = parse_csv(response).length

        callback(nb_grids)
    })
}




can = document.getElementById('can')
ctx = can.getContext('2d')

grid = [ 0, 1, 0, 1, 1, 1, 0, 1, 0 ]
zoom = 20

create() {
    update()
}

update() {
    draw()

    requestAnimationFrame(update)
}

draw() {
    draw_grid()
}

draw_grid() {
    for k, v in grid {
        if v == 1 {
            ctx.fillStyle = rgb(0, 255, 0)
        } else {
            ctx.fillStyle = rgb(200, 200, 200)
        }

        ctx.fillRect(
            k % 3 * zoom,
            k % 3 * zoom,
            zoom,
            zoom)
    }
}

create()
