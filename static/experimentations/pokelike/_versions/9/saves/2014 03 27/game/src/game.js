// Generated by CoffeeScript 1.7.1
(function() {
  var Animation, Entity, Game, Keyboard, Mouse, Sprite, Tile, TileAnimated, game, preload_images, rgb,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CanvasRenderingContext2D.prototype.draw_image_index = function(img, width, height, index, x, y, draw) {
    var basex, basey, nbtiles;
    if (draw == null) {
      draw = true;
    }
    nbtiles = Math.ceil(img.width / width);
    basex = index % nbtiles;
    basex = basex * width;
    basey = Math.floor(index / nbtiles);
    basey = basey * height;
    if (draw) {
      return this.drawImage(img, basex, basey, width, height, x, y, width, height);
    } else {
      return {
        nbtiles: nbtiles,
        basex: basex,
        basey: basey
      };
    }
  };

  CanvasRenderingContext2D.prototype.get2darray_image = function(img) {
    var a, b, g, i, list_pixels, map, r, x, y, _i, _ref;
    this.save();
    this.drawImage(img, 0, 0);
    list_pixels = this.getImageData(0, 0, img.width, img.height).data;
    map = [];
    for (i = _i = 0, _ref = list_pixels.length; _i < _ref; i = _i += 4) {
      r = list_pixels[i + 0];
      g = list_pixels[i + 1];
      b = list_pixels[i + 2];
      a = list_pixels[i + 3];
      x = Math.floor((i / 4) % img.width);
      y = Math.floor(((i - x) / 4) / img.width);
      if (map[x]) {
        map[x][y] = [r, g, b, a];
      } else {
        map[x] = [[r, g, b, a]];
      }
    }
    this.restore();
    return map;
  };

  CanvasRenderingContext2D.prototype.fill_wrap_text = function(text, x, y, maxWidth, lineHeight) {
    var line, metrics, n, testLine, testWidth, words, _i, _ref;
    words = text.split(' ');
    line = '';
    for (n = _i = 0, _ref = words.length; 0 <= _ref ? _i < _ref : _i > _ref; n = 0 <= _ref ? ++_i : --_i) {
      testLine = line + words[n] + ' ';
      metrics = this.measureText(testLine);
      testWidth = metrics.width;
      if (testWidth > maxWidth) {
        this.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    return this.fillText(line, x, y);
  };

  CanvasRenderingContext2D.prototype.tile_from_position = function(img, width, height, x, y) {
    var tile_by_line;
    tile_by_line = Math.ceil(img.width / (width + 1));
    x = Math.floor(x / (width + 1));
    y = Math.floor(y / (height + 1));
    return x + (y * tile_by_line);
  };

  Math.clamp = function(min, val, max) {
    return Math.max(min, Math.min(max, val));
  };

  Math.sign = function(x) {
    var _ref, _ref1;
    return (_ref = x === 0) != null ? _ref : {
      0: (_ref1 = x > 0) != null ? _ref1 : {
        1: -1
      }
    };
  };

  Math.between = function(min, val, max) {
    return val >= min && val <= max;
  };

  Math.rand = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  rgb = function(r, g, b, a) {
    if (a == null) {
      a = 1;
    }
    if (a === 1) {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    } else {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
    }
  };

  preload_images = function(images, callback) {
    var i, image_loaded, nb_images_loaded, nb_images_to_load, new_image_loaded, preload;
    nb_images_loaded = 0;
    nb_images_to_load = Object.keys(images).length;
    image_loaded = [];
    new_image_loaded = function() {
      nb_images_loaded++;
    };
    for (i in images) {
      image_loaded[i] = new Image();
      image_loaded[i].onload = new_image_loaded;
      image_loaded[i].src = images[i];
    }
    preload = function() {
      if (nb_images_loaded === nb_images_to_load) {
        callback();
      } else {
        setTimeout(preload, 100);
      }
    };
    preload();
    return image_loaded;
  };

  Mouse = (function() {
    function Mouse(el) {
      this.onmousemove = __bind(this.onmousemove, this);
      this.onmousedown = __bind(this.onmousedown, this);
      this.onmouseup = __bind(this.onmouseup, this);
      this.x = 0;
      this.y = 0;
      this.click = null;
      this.mtime = 0;
      this.el = el;
      this.loose = null;
      document.addEventListener('mousedown', this.onmousedown, false);
      document.addEventListener('mousemove', this.onmousemove, false);
      document.addEventListener('mouseup', this.onmouseup, false);
    }

    Mouse.prototype.update = function() {
      return this.mtime++;
    };

    Mouse.prototype.onmouseup = function(e) {
      this.loose = this.mtime;
      return this.click = null;
    };

    Mouse.prototype.onmousedown = function(e) {
      this.onmousemove(e);
      return this.click = this.mtime;
    };

    Mouse.prototype.onmousemove = function(e) {
      this.x = e.pageX - (this.el != null ? this.el.offsetLeft : 0);
      return this.y = e.pageY - (this.el != null ? this.el.offsetTop : 0);
    };

    Mouse.prototype.up = function() {
      return this.click === null;
    };

    Mouse.prototype.down = function() {
      return this.click !== null;
    };

    Mouse.prototype.press = function() {
      return this.click === this.mtime;
    };

    Mouse.prototype.release = function() {
      return this.loose === this.mtime;
    };

    return Mouse;

  })();

  window.rgb = rgb;

  window.preload_images = preload_images;

  window.Key = {
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    ESC: 27,
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    NUM0: 48,
    NUM1: 49,
    NUM2: 50,
    NUM3: 51,
    NUM4: 52,
    NUM5: 53,
    NUM6: 54,
    NUM7: 55,
    NUM8: 56,
    NUM9: 57,
    NUMPAD0: 96,
    NUMPAD1: 97,
    NUMPAD2: 98,
    NUMPAD3: 99,
    NUMPAD4: 100,
    NUMPAD5: 101,
    NUMPAD6: 102,
    NUMPAD7: 103,
    NUMPAD8: 104,
    NUMPAD9: 105,
    ADD: 107,
    SUB: 109,
    MUL: 106,
    DIV: 111,
    CAPSLOCK: 20,
    PAGEUP: 33,
    PAGEDOWN: 34,
    END: 35,
    HOME: 36,
    ISERT: 45,
    DELETE: 46,
    NUMLOCK: 144
  };

  Keyboard = (function() {
    function Keyboard() {
      this.onkeydown = __bind(this.onkeydown, this);
      this.onkeyup = __bind(this.onkeyup, this);
      this.keys = [];
      this.last = 0;
      this.ktime = 0;
      document.addEventListener('keydown', this.onkeydown, false);
      document.addEventListener('keyup', this.onkeyup, false);
    }

    Keyboard.prototype.update = function() {
      return this.ktime++;
    };

    Keyboard.prototype.onkeyup = function(e) {
      return this.keys[e.keyCode] = null;
    };

    Keyboard.prototype.onkeydown = function(e) {
      return this.keys[e.keyCode] = this.ktime;
    };

    Keyboard.prototype.up = function(k) {
      return this.keys[k] == null;
    };

    Keyboard.prototype.down = function(k) {
      return this.keys[k] != null;
    };

    Keyboard.prototype.press = function(k) {
      return this.keys[k] === this.ktime;
    };

    return Keyboard;

  })();

  Animation = (function() {
    function Animation(name, index, length, speed) {
      if (speed == null) {
        speed = 8;
      }
      this.start_index = index;
      this.length = length;
      this.speed = speed;
      this.time_anim = 0;
      this.index = index;
    }

    Animation.prototype.update = function() {
      this.time_anim++;
      if (this.time_anim > this.speed) {
        this.time_anim = 0;
        this.index++;
        if (this.index >= this.start_index + this.length) {
          return this.index = this.start_index;
        }
      }
    };

    return Animation;

  })();

  Sprite = (function() {
    function Sprite(name) {
      this.name = name;
      this.animations = {};
      this.cur_animation = null;
    }

    Sprite.prototype.add_animation = function(name, index, length, speed) {
      return this.animations[name] = new Animation(name, index, length, speed);
    };

    Sprite.prototype.play = function(name) {
      if (this.animations[name] != null) {
        return this.cur_animation = this.animations[name];
      }
    };

    Sprite.prototype.update = function() {
      return this.cur_animation.update();
    };

    return Sprite;

  })();

  Entity = (function() {
    function Entity(sprite) {
      this.sprite = new Sprite();
      this.x = 0;
      this.y = 0;
      this.img_player = new Image();
      this.img_player.src = 'game/gfx/play.png';
      this.add_animation('walk_left', 2, 2);
      this.add_animation('walk_up', 4, 2);
      this.add_animation('walk_right', 0, 2);
      this.add_animation('walk_down', 6, 2);
      this.add_animation('wait_left', 2, 1);
      this.add_animation('wait_up', 4, 1);
      this.add_animation('wait_right', 0, 1);
      this.add_animation('wait_down', 6, 1);
      this.play('walk_down');
      this.dir = 'down';
    }

    Entity.prototype.add_animation = function(name, index, length, speed) {
      return this.sprite.add_animation(name, index, length, speed);
    };

    Entity.prototype.play = function(name) {
      return this.sprite.play(name);
    };

    Entity.prototype.update = function() {
      return this.sprite.update();
    };

    Entity.prototype.draw = function(ctx) {
      return ctx.draw_image_index(this.img_player, 17, 17, this.sprite.cur_animation.index, this.x, this.y);
    };

    return Entity;

  })();

  Tile = (function() {
    function Tile(x, y, id) {
      this.x = x;
      this.y = y;
      this.id = id;
    }

    return Tile;

  })();

  TileAnimated = (function(_super) {
    __extends(TileAnimated, _super);

    function TileAnimated(x, y, id, length, speed) {
      if (speed == null) {
        speed = 12;
      }
      TileAnimated.__super__.constructor.call(this, x, y, id);
      this.start_id = this.id;
      this.length = length;
      this.time_anim = 0;
      this.speed = speed;
    }

    TileAnimated.prototype.update = function() {
      this.time_anim++;
      if (this.time_anim > this.speed) {
        this.time_anim = 0;
        this.id++;
        if (this.id >= this.start_id + this.length) {
          return this.id = this.start_id;
        }
      }
    };

    return TileAnimated;

  })(Tile);

  Game = (function() {
    function Game() {
      this.draw = __bind(this.draw, this);
      this.update = __bind(this.update, this);
      this.create = __bind(this.create, this);
      var anims, tile, x, y, _i, _j, _ref, _ref1;
      this.can = document.getElementById('game');
      this.ctx = this.can.getContext('2d');
      this.can.width = 640;
      this.can.height = 480;
      this.map = [[0, 1, 2, 4, 4, 4, 4, 4, 4], [0, 0, 0, 0, 0, 0, 0, 3, 0], [0, 0, 0, 0, 0, 0, 0, 7, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
      anims = {
        4: 3
      };
      this.solid = [2, 4, 7];
      this.tiles = [];
      this.tiled_animated = [];
      for (y = _i = 0, _ref = this.map.length; 0 <= _ref ? _i < _ref : _i > _ref; y = 0 <= _ref ? ++_i : --_i) {
        for (x = _j = 0, _ref1 = this.map[y].length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
          if (anims[this.map[y][x]]) {
            this.tiles.push(new TileAnimated(x, y, this.map[y][x], anims[this.map[y][x]]));
          } else {
            this.tiles.push(new Tile(x, y, this.map[y][x]));
          }
        }
      }
      this.tiled_animated = (function() {
        var _k, _len, _ref2, _results;
        _ref2 = this.tiles;
        _results = [];
        for (_k = 0, _len = _ref2.length; _k < _len; _k++) {
          tile = _ref2[_k];
          if (tile instanceof TileAnimated) {
            _results.push(tile);
          }
        }
        return _results;
      }).call(this);
      this.img = preload_images({
        'tileset': 'game/gfx/tileset.png'
      }, this.create);
      this.player = new Entity();
      this.mouse = new Mouse(this.can);
      this.kb = new Keyboard();
      this.scale = 3;
    }

    Game.prototype.create = function() {
      if (this.ctx.mozImageSmoothingEnabled) {
        this.ctx.mozImageSmoothingEnabled = false;
      } else if (this.ctx.webkitImageSmoothingEnabled) {
        this.ctx.webkitImageSmoothingEnabled = false;
      } else if (this.ctx.oImageSmoothingEnabled) {
        this.ctx.oImageSmoothingEnabled = false;
      }
      if (this.ctx.imageSmoothingEnabled) {
        this.ctx.imageSmoothingEnabled = false;
      }
      this.ctx.scale(this.scale, this.scale);
      return this.update();
    };

    Game.prototype.update = function() {
      var tile, _i, _len, _ref;
      this.draw();
      _ref = this.tiled_animated;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tile = _ref[_i];
        tile.update();
      }
      this.player.update();
      this.player.play('wait_' + this.player.dir);
      if (this.kb.down(Key.UP)) {
        this.player.y -= 2;
        this.player.play('walk_up');
        this.player.dir = 'up';
      }
      if (this.kb.down(Key.DOWN)) {
        this.player.y += 2;
        this.player.play('walk_down');
        this.player.dir = 'down';
      }
      if (this.kb.down(Key.RIGHT)) {
        this.player.x += 2;
        this.player.play('walk_right');
        this.player.dir = 'right';
      }
      if (this.kb.down(Key.LEFT)) {
        this.player.x -= 2;
        this.player.play('walk_left');
        this.player.dir = 'left';
      }
      this.mouse.update();
      this.kb.update();
      return requestAnimationFrame(this.update);
    };

    Game.prototype.draw = function() {
      var tile, _i, _len, _ref;
      this.ctx.clearRect(0, 0, this.can.width, this.can.height);
      _ref = this.tiles;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tile = _ref[_i];
        this.ctx.draw_image_index(this.img.tileset, 16, 16, tile.id, tile.x * 16, tile.y * 16);
      }
      this.player.draw(this.ctx);
    };

    return Game;

  })();

  game = new Game();

}).call(this);
