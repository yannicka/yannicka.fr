// Generated by CoffeeScript 1.7.1
(function() {
  var Animation, Entity, Game, Keyboard, Mouse, Player, Sprite, Tile, TileAnimated, game,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

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

  window.rgb = function(r, g, b, a) {
    if (a == null) {
      a = 1;
    }
    if (a === 1) {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    } else {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
    }
  };

  window.preload_images = function(images, callback) {
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
      return this.keys[this.str_to_code(k.toUpperCase())] == null;
    };

    Keyboard.prototype.down = function(k) {
      return this.keys[this.str_to_code(k.toUpperCase())] != null;
    };

    Keyboard.prototype.press = function(k) {
      return this.keys[this.str_to_code(k.toUpperCase())] === this.ktime;
    };

    Keyboard.prototype.str_to_code = function(k) {
      if (Key[k]) {
        return Key[k];
      } else {
        return null;
      }
    };

    return Keyboard;

  })();

  Animation = (function() {
    function Animation(index, length, speed) {
      if (speed == null) {
        speed = 8;
      }
      this.start_index = index;
      this.length = length;
      this.speed = speed;
      this.index = index;
      this.time_anim = 0;
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
      return this.animations[name] = new Animation(index, length, speed);
    };

    Sprite.prototype.play = function(name) {
      if (this.animations[name] != null) {
        return this.cur_animation = this.animations[name];
      }
    };

    Sprite.prototype.update = function() {
      if (this.cur_animation.length > 1) {
        return this.cur_animation.update();
      }
    };

    return Sprite;

  })();

  Entity = (function() {
    function Entity() {
      this.sprite = new Sprite();
      this.x = 0;
      this.y = 0;
    }

    Entity.prototype.add_animation = function(name, index, length, speed) {
      if (speed == null) {
        speed = 4;
      }
      return this.sprite.add_animation(name, index, length, speed);
    };

    Entity.prototype.play = function(name) {
      return this.sprite.play(name);
    };

    Entity.prototype.update = function() {
      return this.sprite.update();
    };

    Entity.prototype.draw = function(ctx) {
      return ctx.draw_image_index(this.img_player, 14, 16, this.sprite.cur_animation.index, this.x, this.y);
    };

    return Entity;

  })();

  Tile = (function() {
    function Tile(x, y, id, high) {
      this.x = x;
      this.y = y;
      this.id = id;
      this.high = high;
    }

    Tile.prototype.draw = function(ctx, img_tileset) {
      return ctx.draw_image_index(img_tileset, 16, 16, this.id, this.x * 16, this.y * 16);
    };

    return Tile;

  })();

  TileAnimated = (function(_super) {
    __extends(TileAnimated, _super);

    function TileAnimated(x, y, id, high, length, speed) {
      if (speed == null) {
        speed = 12;
      }
      TileAnimated.__super__.constructor.call(this, x, y, id, high);
      this.animation = new Animation(this.id, length, speed);
    }

    TileAnimated.prototype.update = function() {
      this.animation.update();
      return this.id = this.animation.index;
    };

    return TileAnimated;

  })(Tile);

  Player = (function(_super) {
    __extends(Player, _super);

    function Player(img) {
      Player.__super__.constructor.call(this);
      this.img_player = img;
      this.add_animation('walk_left', 1, 2);
      this.add_animation('walk_up', 4, 2);
      this.add_animation('walk_right', 7, 2);
      this.add_animation('walk_down', 10, 2);
      this.add_animation('wait_left', 0, 1);
      this.add_animation('wait_up', 3, 1);
      this.add_animation('wait_right', 6, 1);
      this.add_animation('wait_down', 9, 1);
      this.play('walk_down');
      this.dir = 'down';
    }

    Player.prototype.draw = function(ctx) {
      return ctx.draw_image_index(this.img_player, 14, 18, this.sprite.cur_animation.index, this.x, this.y - 2);
    };

    return Player;

  })(Entity);

  Game = (function() {
    function Game() {
      this.draw = __bind(this.draw, this);
      this.update = __bind(this.update, this);
      this.create = __bind(this.create, this);
      var anims, high, layer, tile, x, y, _i, _j, _k, _len, _ref, _ref1, _ref2, _ref3, _ref4;
      this.can = document.getElementById('game');
      this.ctx = this.can.getContext('2d');
      this.can.width = 640;
      this.can.height = 480;
      this.map = [[[0, 1, 0, 4, 4, 4, 4, 4, 4], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]], [[-1, -1, 2, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, 3, -1], [-1, -1, -1, -1, -1, -1, -1, 7, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1]]];
      this.collisions = [[0, 0, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
      anims = {
        4: 3
      };
      high = [3];
      this.solid = [2, 4, 7];
      this.tiles = [];
      this.tiles_animated = [];
      _ref = this.map;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        layer = _ref[_i];
        for (y = _j = 0, _ref1 = layer.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; y = 0 <= _ref1 ? ++_j : --_j) {
          for (x = _k = 0, _ref2 = layer.length; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; x = 0 <= _ref2 ? ++_k : --_k) {
            if (layer[y][x] !== -1) {
              if (anims[layer[y][x]]) {
                this.tiles.push(new TileAnimated(x, y, layer[y][x], (_ref3 = layer[y][x], __indexOf.call(high, _ref3) >= 0), anims[layer[y][x]]));
              } else {
                this.tiles.push(new Tile(x, y, layer[y][x], (_ref4 = layer[y][x], __indexOf.call(high, _ref4) >= 0)));
              }
            }
          }
        }
      }
      this.tiles_animated = (function() {
        var _l, _len1, _ref5, _results;
        _ref5 = this.tiles;
        _results = [];
        for (_l = 0, _len1 = _ref5.length; _l < _len1; _l++) {
          tile = _ref5[_l];
          if (tile instanceof TileAnimated) {
            _results.push(tile);
          }
        }
        return _results;
      }).call(this);
      this.tiles_down = (function() {
        var _l, _len1, _ref5, _results;
        _ref5 = this.tiles;
        _results = [];
        for (_l = 0, _len1 = _ref5.length; _l < _len1; _l++) {
          tile = _ref5[_l];
          if (tile.high === false) {
            _results.push(tile);
          }
        }
        return _results;
      }).call(this);
      this.tiles_high = (function() {
        var _l, _len1, _ref5, _results;
        _ref5 = this.tiles;
        _results = [];
        for (_l = 0, _len1 = _ref5.length; _l < _len1; _l++) {
          tile = _ref5[_l];
          if (tile.high === true) {
            _results.push(tile);
          }
        }
        return _results;
      }).call(this);
      this.mouse = new Mouse(this.can);
      this.kb = new Keyboard();
      this.scale = 3;
      this.translate = {
        x: 0,
        y: 0
      };
      this.img = preload_images({
        'player': 'game/gfx/player.png',
        'tileset': 'game/gfx/tileset.png'
      }, this.create);
    }

    Game.prototype.create = function() {
      this.player = new Player(this.img.player);
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
      var dir, gamepads, i, new_pos, pad, the_x, the_y, tile, x, y, _i, _j, _k, _l, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      gamepads = null;
      this.translate.x *= -0.9;
      this.translate.y *= -0.9;
      if (navigator.webkitGetGamepads != null) {
        gamepads = navigator.webkitGetGamepads();
      }
      if (navigator.getGamepads != null) {
        gamepads = navigator.getGamepads();
      }
      if (gamepads != null) {
        for (i = _i = 0, _ref = gamepads.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          pad = gamepads[i];
          this.player.x += pad.axes[0];
          this.player.y += pad.axes[1];
        }
      }
      this.draw();
      _ref1 = this.tiles_animated;
      for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
        tile = _ref1[_j];
        tile.update();
      }
      this.player.update();
      this.player.play('wait_' + this.player.dir);
      if (this.kb.press('space')) {
        this.shake(8, 8);
      }
      dir = {
        x: 'right',
        y: 'down'
      };
      new_pos = {
        x: this.player.x,
        y: this.player.y
      };
      if (this.kb.down('up')) {
        new_pos.y -= 1;
        dir.x = 'up';
        this.player.play('walk_up');
        this.player.dir = 'up';
      }
      if (this.kb.down('down')) {
        new_pos.y += 1;
        dir.x = 'down';
        this.player.play('walk_down');
        this.player.dir = 'down';
      }
      if (this.kb.down('right')) {
        new_pos.x += 1;
        dir.x = 'right';
        this.player.play('walk_right');
        this.player.dir = 'right';
      }
      if (this.kb.down('left')) {
        new_pos.x -= 1;
        dir.x = 'left';
        this.player.play('walk_left');
        this.player.dir = 'left';
      }
      for (y = _k = _ref2 = Math.floor(this.player.y / 16), _ref3 = Math.ceil((this.player.y + 2) / 16); _ref2 <= _ref3 ? _k <= _ref3 : _k >= _ref3; y = _ref2 <= _ref3 ? ++_k : --_k) {
        the_x = dir.x === 'left' ? Math.floor(new_pos.x / 16) : Math.ceil(new_pos.x / 16);
        console.log(this.map[1][y]);
        if ((this.map[1][y] != null) && this.solid[this.map[1][y][the_x]]) {
          new_pos.x = Math.round(this.player.x / 16) * 16 - (dir.x === 'right' ? -2 : 0);
        }
      }
      for (x = _l = _ref4 = Math.floor(this.player.x / 16), _ref5 = Math.ceil((this.player.x - 2) / 16); _ref4 <= _ref5 ? _l <= _ref5 : _l >= _ref5; x = _ref4 <= _ref5 ? ++_l : --_l) {
        the_y = dir.y === 'up' ? Math.floor(new_pos.y / 16) : Math.ceil(new_pos.y / 16);
        if ((this.map[1][the_y] != null) && this.solid[this.map[1][the_y][x]]) {
          new_pos.y = Math.round(this.player.y / 16) * 16 - (dir.y === 'down' ? 2 : 0);
        }
      }
      this.player.x = new_pos.x;
      this.player.y = new_pos.y;
      this.mouse.update();
      this.kb.update();
      return requestAnimationFrame(this.update);
    };

    Game.prototype.draw = function() {
      var tile, _i, _j, _len, _len1, _ref, _ref1;
      this.ctx.clearRect(0, 0, this.can.width, this.can.height);
      _ref = this.tiles_down;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tile = _ref[_i];
        tile.draw(this.ctx, this.img.tileset);
      }
      this.player.draw(this.ctx);
      _ref1 = this.tiles_high;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        tile = _ref1[_j];
        tile.draw(this.ctx, this.img.tileset);
      }
    };

    Game.prototype.shake = function(x, y) {
      return this.translate = {
        x: x,
        y: y
      };
    };

    return Game;

  })();

  game = new Game();

}).call(this);
