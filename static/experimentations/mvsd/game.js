var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Entity = (function () {
    function Entity(x, y, options) {
        if (typeof options === "undefined") { options = {}; }
        this.x = x;
        this.y = y;

        this.animations = {};
        this.cur_animation = null;
        this.cur_index = 0;
        this.ac_delta = 0;

        this.solid = false;
        this.ladder = false;

        if (typeof options.solid !== 'undefined')
            this.solid = options.solid;

        if (typeof options.ladder !== 'undefined')
            this.ladder = options.ladder;
    }
    Entity.prototype.update = function (dt) {
        if (typeof dt === "undefined") { dt = 16.5; }
        this.cur_frame = this.cur_animation.frames[this.cur_index];

        if (this.cur_animation.speed != 0) {
            if (this.ac_delta < this.cur_animation.speed) {
                this.ac_delta += dt;
            } else {
                if (this.cur_animation.loop || this.cur_index < this.cur_animation.frames.length - 1) {
                    this.ac_delta = 0;

                    this.cur_index++;

                    if (this.cur_index > this.cur_animation.frames.length - 1) {
                        this.cur_index = 0;
                    }
                }
            }
        }
    };

    Entity.prototype.draw = function (ctx) {
        ctx.drawImage(image.tileset, this.cur_frame.x, this.cur_frame.y, this.cur_frame.width, this.cur_frame.height, this.x + this.cur_frame.offset_x, this.y + this.cur_frame.offset_y, this.cur_frame.width, this.cur_frame.height);
    };

    Entity.prototype.add_animation = function (name, frames, speed, loop) {
        if (typeof loop === "undefined") { loop = true; }
        for (var i = 0, len = frames.length; i < len; i++) {
            if (typeof frames[i].offset_x === 'undefined')
                frames[i].offset_x = 0;

            if (typeof frames[i].offset_y === 'undefined')
                frames[i].offset_y = 0;
        }

        this.animations[name] = {
            frames: frames,
            speed: speed,
            loop: loop
        };
    };

    Entity.prototype.play = function (name, force) {
        if (typeof force === "undefined") { force = true; }
        if (this.cur_animation != this.animations[name] || force) {
            this.cur_index = 0;
            this.cur_animation = this.animations[name];

            var the_frame = this.cur_animation.frames;
            this.cur_frame = the_frame[this.cur_index];
        }
    };

    Entity.prototype.collide = function (blocks) {
        for (var i = 0, len = blocks.length; i < len; i++) {
            var block = blocks[i];

            if (this == block)
                return;

            if (!block.solid)
                return;

            if (block.x >= this.x + this.cur_frame.width + this.cur_frame.offset_x || block.x + block.cur_frame.width + block.cur_frame.offset_x <= this.x || block.y >= this.y + this.cur_frame.height + this.cur_frame.offset_y || block.y + block.cur_frame.height + block.cur_frame.offset_y <= this.y) {
                //return false;
            } else {
                if (this.dirx == 'right') {
                    this.x = block.x - this.cur_frame.width;
                } else if (this.dirx == 'left') {
                    this.x = block.x + block.cur_frame.width;
                }

                if (this.diry == 'up') {
                    this.y = block.y + block.cur_frame.height;
                } else if (this.diry == 'down') {
                    this.y = block.y - this.cur_frame.height;
                }
                //return true;
            }
        }
    };

    Entity.prototype.move = function (x, y, blocks) {
        this.dirx = x == 0 ? 'no' : (x > 0 ? 'right' : 'left');
        this.diry = y == 0 ? 'no' : (y > 0 ? 'down' : 'up');

        this.x += x;
        this.y += y;

        this.collide(blocks);
    };

    Entity.prototype.tp = function (x, y) {
        this.x = x;
        this.y = y;
    };

    Entity.prototype.tp_to = function (entity) {
        this.x = entity.x;
        this.y = entity.y;
    };
    return Entity;
})();

var Ground = (function (_super) {
    __extends(Ground, _super);
    function Ground(x, y) {
        _super.call(this, x, y, {
            solid: true
        });

        this.add_animation('base', [
            { x: 0, y: 0, width: 16, height: 16 }
        ], 0, false);

        this.play('base');
    }
    return Ground;
})(Entity);

var Weak = (function (_super) {
    __extends(Weak, _super);
    function Weak(x, y) {
        _super.call(this, x, y, {
            solid: true
        });

        this.add_animation('base', [
            { x: 0, y: 34, width: 16, height: 16 }
        ], 0, false);

        this.play('base');
    }
    return Weak;
})(Entity);

var CarpetRight = (function (_super) {
    __extends(CarpetRight, _super);
    function CarpetRight(x, y, anim) {
        if (typeof anim === "undefined") { anim = 'middle'; }
        _super.call(this, x, y, {
            solid: true
        });

        this.add_animation('begin', [
            { x: 17, y: 0, width: 16, height: 11 },
            { x: 17, y: 12, width: 16, height: 11 },
            { x: 17, y: 24, width: 16, height: 11 },
            { x: 17, y: 36, width: 16, height: 11 }
        ], 50, true);

        this.add_animation('middle', [
            { x: 34, y: 0, width: 16, height: 11 },
            { x: 34, y: 12, width: 16, height: 11 },
            { x: 34, y: 24, width: 16, height: 11 },
            { x: 34, y: 36, width: 16, height: 11 }
        ], 50, true);

        this.add_animation('end', [
            { x: 51, y: 0, width: 16, height: 11 },
            { x: 51, y: 12, width: 16, height: 11 },
            { x: 51, y: 24, width: 16, height: 11 },
            { x: 51, y: 36, width: 16, height: 11 }
        ], 50, true);

        this.play(anim);
    }
    return CarpetRight;
})(Entity);

var Jumper = (function (_super) {
    __extends(Jumper, _super);
    function Jumper(x, y) {
        _super.call(this, x, y, {
            solid: true
        });

        this.add_animation('base', [
            { x: 68, y: 0, width: 10, height: 14 },
            { x: 79, y: 2, width: 10, height: 12, offset_y: 2 },
            { x: 90, y: 4, width: 10, height: 10, offset_y: 4 }
        ], 140, true);

        this.play('base');
    }
    return Jumper;
})(Entity);

var Rope = (function (_super) {
    __extends(Rope, _super);
    function Rope(x, y, anim) {
        if (typeof anim === "undefined") { anim = 'middle'; }
        _super.call(this, x, y, {
            solid: true
        });

        this.add_animation('middle', [
            { x: 101, y: 0, width: 5, height: 16 }
        ], 0, false);

        this.add_animation('end', [
            { x: 101, y: 17, width: 5, height: 13 }
        ], 0, false);

        this.play(anim);
    }
    return Rope;
})(Entity);

var Cloud = (function (_super) {
    __extends(Cloud, _super);
    function Cloud(x, y, anim) {
        if (typeof anim === "undefined") { anim = 'middle'; }
        _super.call(this, x, y, {
            solid: true
        });

        this.add_animation('begin', [
            { x: 17, y: 64, width: 16, height: 5 }
        ], 0, false);

        this.add_animation('middle', [
            { x: 34, y: 64, width: 16, height: 5 }
        ], 0, false);

        this.add_animation('end', [
            { x: 51, y: 64, width: 16, height: 5 }
        ], 0, false);

        this.play(anim);
    }
    return Cloud;
})(Entity);

var Ladder = (function (_super) {
    __extends(Ladder, _super);
    function Ladder(x, y) {
        _super.call(this, x, y, {
            ladder: true
        });

        this.add_animation('base', [
            { x: 0, y: 17, width: 14, height: 16 }
        ], 220, true);

        this.play('base');
    }
    return Ladder;
})(Entity);

var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y) {
        _super.call(this, x, y);

        this.speedx = 0;
        this.speedy = 0;

        this.add_animation('wait', [
            { x: 68, y: 15, width: 8, height: 8 }
        ], 0, false);

        this.add_animation('move_left', [
            { x: 68, y: 15, width: 8, height: 8 },
            { x: 86, y: 15, width: 8, height: 8 }
        ], 100, true);

        this.add_animation('move_right', [
            { x: 68, y: 15, width: 8, height: 8 },
            { x: 77, y: 15, width: 8, height: 8 }
        ], 100, true);

        this.add_animation('move_up', [
            { x: 68, y: 15, width: 8, height: 8 }
        ], 100, true);

        this.add_animation('move_down', [
            { x: 68, y: 15, width: 8, height: 8 },
            { x: 68, y: 15, width: 8, height: 7, offset_y: 1 }
        ], 100, true);

        this.play('wait');
    }
    return Player;
})(Entity);
function preload_images(a, g) {
    var f = 0, e = Object.keys(a).length, c = null;
    var d = function () {
        f++;
    };
    for (c in a) {
        d[c] = new Image();
        d[c].onload = d;
        d[c].src = a[c];
    }
    ;
    var b = function () {
        if (f == e) {
            g();
        } else {
            setTimeout(b, 100);
        }
    };
    b();
    return d;
}
;

var can = document.getElementById('game');
var ctx = can.getContext('2d');

can.width = 640;
can.height = 480;

if (ctx.mozImageSmoothingEnabled) {
    ctx.mozImageSmoothingEnabled = false;
} else if (ctx.webkitImageSmoothingEnabled) {
    ctx.webkitImageSmoothingEnabled = false;
} else if (ctx.oImageSmoothingEnabled) {
    ctx.oImageSmoothingEnabled = false;
}

if (ctx.imageSmoothingEnabled) {
    ctx.imageSmoothingEnabled = false;
}

ctx.scale(2, 2);

var blocks = [];

// Sols
blocks.push(new Ground(10, 120));
blocks.push(new Ground(26, 120));
blocks.push(new Ground(42, 120));
blocks.push(new Ground(58, 120));
blocks.push(new Ground(74, 120));
blocks.push(new Ground(90, 120));
blocks.push(new Ground(200, 120));

// Sols léger
blocks.push(new Weak(160, 60));
blocks.push(new Weak(176, 60));
blocks.push(new Weak(192, 60));

// Echelle
blocks.push(new Ladder(39, 56));
blocks.push(new Ladder(39, 72));
blocks.push(new Ladder(39, 88));
blocks.push(new Ladder(39, 104));

// Tapis roulant vers la droite
blocks.push(new CarpetRight(106, 120, 'begin'));
blocks.push(new CarpetRight(122, 120, 'middle'));
blocks.push(new CarpetRight(138, 120, 'middle'));
blocks.push(new CarpetRight(154, 120, 'middle'));
blocks.push(new CarpetRight(170, 120, 'end'));

// Ressort
blocks.push(new Jumper(80, 106));

// Corde
blocks.push(new Ground(131, 10));
blocks.push(new Rope(137, 26, 'middle'));
blocks.push(new Rope(137, 42, 'middle'));
blocks.push(new Rope(137, 58, 'middle'));
blocks.push(new Rope(137, 74, 'middle'));
blocks.push(new Rope(137, 90, 'end'));

// Nuage
blocks.push(new Cloud(70, 80, 'begin'));
blocks.push(new Cloud(86, 80, 'middle'));
blocks.push(new Cloud(102, 80, 'end'));

// Joueur
var player = new Player(50, 10);
blocks.push(player);

function go() {
    update();
}

function update() {
    key.update();

    // player.play('wait', false);
    player.speedx = 0;
    player.speedy = 0;

    if (key.down(Key.RIGHT) || key.down(Key.LEFT) || key.down(Key.UP) || key.down(Key.DOWN)) {
        if (key.down(Key.RIGHT)) {
            player.move(2, 0, blocks);
            player.play('move_right', false);
        } else if (key.down(Key.LEFT)) {
            player.move(-2, 0, blocks);
            player.play('move_left', false);
        }

        if (key.down(Key.UP)) {
            player.move(0, -2, blocks);
            player.play('move_up', false);
        } else if (key.down(Key.DOWN)) {
            player.move(0, 2, blocks);
            player.play('move_down', false);
        }
    } else {
        player.play('wait');
    }

    ctx.clearRect(0, 0, can.width, can.height);

    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillRect(0, 0, can.width, can.height);

    for (var i = 0, len = blocks.length; i < len; i++) {
        var block = blocks[i];

        block.update();
        block.draw(ctx);
    }

    requestAnimationFrame(update);
}

var Key = { TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90, NUM0: 48, NUM1: 49, NUM2: 50, NUM3: 51, NUM4: 52, NUM5: 53, NUM6: 54, NUM7: 55, NUM8: 56, NUM9: 57, NUMPAD0: 96, NUMPAD1: 97, NUMPAD2: 98, NUMPAD3: 99, NUMPAD4: 100, NUMPAD5: 101, NUMPAD6: 102, NUMPAD7: 103, NUMPAD8: 104, NUMPAD9: 105, ADD: 107, SUB: 109, MUL: 106, DIV: 111, CAPSLOCK: 20, PAGEUP: 33, PAGEDOWN: 34, END: 35, HOME: 36, INSERT: 45, DELETE: 46, NUMLOCK: 144 };
function Keyboard() {
    this.keys = [];
    this.last = 0;
    this.ktime = 0;
    this.update = function () {
        this.ktime++;
    };
    this.onkeyup = (function (self) {
        return function (e) {
            self.keys[e.keyCode] = null;
        };
    })(this);
    this.onkeydown = (function (self) {
        return function (e) {
            self.keys[e.keyCode] = self.ktime;
        };
    })(this);
    this.up = function () {
        var ret = false;
        for (var i = 0; i < arguments.length; i++) {
            ret |= this.keys[arguments[i]] == null ? 1 : 0;
        }
        return ret;
    };
    this.down = function () {
        var ret = false;
        for (var i = 0; i < arguments.length; i++) {
            ret |= this.keys[arguments[i]] != null ? 1 : 0;
        }
        return ret;
    };
    this.press = function () {
        var ret = false;
        for (var i = 0; i < arguments.length; i++) {
            ret |= this.keys[arguments[i]] == this.ktime ? 1 : 0;
        }
        return ret;
    };
}

var key = new Keyboard();
document.onkeydown = key.onkeydown;
document.onkeyup = key.onkeyup;

var image = preload_images({
    'tiles': 'gfx/tiles.png',
    'tileset': 'gfx/tileset.png',
    'bg': 'gfx/bg.png'
}, go);
