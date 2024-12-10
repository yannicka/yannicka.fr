variable = "valeur"

if variable == "valeur"
end

i = 50
while i--
end

for i from 0 to 50 step 2
end

ma_list = [ 0, 2, 8, 9, 10 ]
for k, v in ma_list
end
ma_list[0]
ma_list.get(0)
ma_list[0] = "valeur"
ma_list.set(0, "valeur")

mon_dict = { "a" = "b", "b" = "c", "c" = "d" }
for k, v in mon_dict
end
ma_list["a"]
ma_list.a
ma_list.get("a")
ma_list["a"] = "valeur"
ma_list.a = "valeur"
ma_list.set("a", "valeur")

ma_fonction = (a, b, c) ->
end

switch variable
    when 0
        # code
    when 2
        # code
    default
        # code
end

class Point2D
	new(x, y)
		@x = x
		@y = y
	end

    add(Num x, Num y)
        @x += x
        @y += y
    end

    add(Point2D p)
        @add(p.x, p.y)
    end
end

class Point3D extends Point2D
	new(x, y, z)
		parent(x, y)
		@d = d
	end

    add(Num x, Num y, Num z)
        super.add(x, y)
        @z += z
    end

    add(Point3D p)
        @add(p.x, p.y, p.z)
    end
end

++, --, +=, -=, *=, /=
and, or
<, >, <=, >=, <>

class Cell
    new = (x, y, active) ->
        @x      = x
        @y      = y
        @active = active
    end

    draw = (ctx) ->
        if @active
            ctx.drawImage(Assets.get('inactive_cell'), @x, @y)
        else
            ctx.drawImage(Assets.get('active_cell'), @x, @y)
        end
    end
end

class Particle
    new = (x, y, dx, dy, color) ->
        @x     = x
        @y     = y
        @dx    = dx
        @dy    = dy
        @color = color

        @life     = 0
        @max_life = Math.rand(10, 20)
        @size     = @max_life
    end

    update = (dt) ->
        @x += @dx
        @y += @dy

        @life++
        @size--
    end

    draw = (ctx) ->
        ctx.fillStyle = @color
        ctx.beginPath()
        ctx.arc(@x, @y, @size / 2, 0, 2 * Math.PI, false)
        ctx.fill()
    end
end

width
height

mouse_x
mouse_y
pmouse_x
pmouse_y

key_down(key)
key_presse(key)
key_release(key)
key_up(key)

mouse_down()
mouse_press()
mouse_release()
mouse_up()

font = "normal 50px Arial"
font_size = "50px"
font_family = "Arial"
font_style = "bold"

fill_color = rgb(255, 255, 0)

stroke_color = rgb(0, 0, 0)
stroke_width = 2

rect(x, y, width, height)
line(x1, y1, x2, y2)

save()
restore()
translate(x, y)
rotate(angle)
matrix(x1, x2, x3, x4, x5, x6)
fill()
stroke()
text(text, x, y)
