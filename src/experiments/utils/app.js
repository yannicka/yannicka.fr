// Generated by CoffeeScript 1.7.1
var WinBase, WinCalendar, WinNotelist, WinNotepad, WinSuperCalendar, WinTodolist, app, cm, mouse,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

(function() {
  var tabtor;
  tabtor = function(where) {
    var hide_all, i, links, _i, _ref;
    links = document.querySelectorAll(where);
    for (i = _i = 0, _ref = links.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      links[i]['onclick'] = function() {
        hide_all();
        document.getElementById(this.getAttribute('data-tab')).style.display = 'block';
        return this.className = 'active';
      };
    }
    hide_all = function() {
      var _j, _ref1, _results;
      _results = [];
      for (i = _j = 0, _ref1 = links.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        document.getElementById(links[i].getAttribute('data-tab')).style.display = 'none';
        _results.push(links[i].className = '');
      }
      return _results;
    };
    return hide_all();
  };
  return window.tabtor = tabtor;
})();

(function() {
  var eval_ni, eval_npi, priority, tokenize_ni;
  priority = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '%': 2,
    '^': 3
  };
  tokenize_ni = function(str) {
    var i, nombre, tokens, _i, _ref;
    tokens = [];
    for (i = _i = 0, _ref = str.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (str[i].match(/[0-9]/)) {
        nombre = '';
        while (true) {
          nombre += str[i];
          if (typeof str[++i] !== 'undefined' && str[i].match(/[0-9.]/)) {
            break;
          }
        }
        nombre = parseFloat(nombre);
        tokens.push({
          type: 'number',
          value: nombre
        });
        i--;
      } else if (str[i].match(/\+|\-|\*|\/|\^|\%/)) {
        tokens.push({
          type: 'op',
          value: str[i].match(/\+|\-|\*|\/|\^|\%/).toString()
        });
      } else if (str[i] === '(') {
        tokens.push({
          type: 'lparen',
          value: '('
        });
      } else if (str[i] === ')') {
        tokens.push({
          type: 'rparen',
          value: ')'
        });
      }
    }
    return tokens;
  };
  eval_npi = function(tokens) {
    var nb1, nb2, result, token, _i, _len;
    result = [];
    for (_i = 0, _len = tokens.length; _i < _len; _i++) {
      token = tokens[_i];
      token = tokens[token];
      if (token.type === 'number') {
        result.push(token.value);
      } else if (token.type === 'op') {
        if (result.length < 2) {
          throw 'erreur #1';
        }
        nb2 = result.pop();
        nb1 = result.pop();
        switch (token.value) {
          case '+':
            result.push(nb1 + nb2);
            break;
          case '-':
            result.push(nb1 - nb2);
            break;
          case '*':
            result.push(nb1 * nb2);
            break;
          case '/':
            result.push(nb1 / nb2);
            break;
          case '%':
            result.push(nb1 % nb2);
            break;
          case '^':
            result.push(Math.pow(nb1 + nb2));
        }
      }
    }
    if (result.length === 1) {
      return result[0];
    } else if (result.length === 0) {
      throw 'erreur #2';
    } else {
      throw 'erreur #3';
    }
  };
  eval_ni = function(str) {
    var i, stack_ops, token, tokens_ni, tokens_npi, _i, _len;
    tokens_ni = tokenize_ni(str);
    tokens_npi = [];
    stack_ops = [];
    for (_i = 0, _len = tokens_ni.length; _i < _len; _i++) {
      token = tokens_ni[_i];
      token = tokens_ni[token];
      if (token.type === 'number') {
        tokens_npi.push(token);
      } else if (token.type === 'op') {
        while (stack_ops && typeof stack_ops[stack_ops.length - 1] !== 'undefined' && stack_ops[stack_ops.length - 1].type === 'op' && priority[stack_ops[stack_ops.length - 1].value] >= priority[token.value]) {
          tokens_npi.push(stack_ops.pop());
        }
        stack_ops.push(token);
      } else if (token.type === 'lparen') {
        stack_ops.push(token);
      } else if (token.type === 'rparen') {
        i = 0;
        while (typeof stack_ops[stack_ops.length - 1] !== 'undefined' && stack_ops[stack_ops.length - 1].type !== 'lparen') {
          tokens_npi.push(stack_ops.pop());
        }
        stack_ops.pop();
      }
    }
    while (stack_ops.length > 0) {
      if (stack_ops[stack_ops.length - 1].type === 'lparen') {
        throw 'erreur #4';
      }
      tokens_npi.push(stack_ops.pop());
    }
    return eval_npi(tokens_npi);
  };
  return window.eval_ni = eval_ni;
})();

Math.clamp = function(min, val, max) {
  return Math.max(min, Math.min(val, max));
};

mouse = {
  x: 0,
  y: 0
};

WinBase = (function() {
  WinBase.id = 0;

  WinBase.zIndex = 0;

  function WinBase(x, y, width, height, title, content) {
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    if (width == null) {
      width = 100;
    }
    if (height == null) {
      height = 100;
    }
    if (title == null) {
      title = 'Window title';
    }
    if (content == null) {
      content = '';
    }
    this.id = "window" + (WinBase.id++);
    this.x = x;
    this.y = y;
    this.rx = x;
    this.ry = y;
    this.width = width;
    this.height = height;
    this.rwidth = width;
    this.rheight = height;
    this.title = title;
    this.content = content;
    this.fullscreen = false;
    this.dom = document.createElement('div');
    this.dom.className = 'window';
    this.dom.id = this.id;
    this.dom.innerHTML = "<div class=\"title\">\n	" + this.title + "\n</div>\n\n<div class=\"content\">\n	" + this.content + "\n</div>\n\n<div class=\"infos\">\n	<div class=\"resizer\"></div>\n	<div class=\"configs\"></div>\n</div>";
    app.dom.appendChild(this.dom);
    this.set_position(this.x, this.y);
    this.set_size(this.width, this.height);
    this.dom.style.zIndex = WinBase.zIndex++;
  }

  WinBase.prototype.set_position = function(x, y) {
    this.x = x;
    this.y = y;
    this.dom.style.left = this.x + 'px';
    return this.dom.style.top = this.y + 'px';
  };

  WinBase.prototype.set_size = function(width, height) {
    this.width = Math.max(150, width);
    this.height = Math.max(150, height);
    this.dom.style.width = this.width + 'px';
    return this.dom.style.height = this.height + 'px';
  };

  WinBase.prototype.set_fullscreen = function(fullscreen) {
    this.fullscreen = fullscreen;
    if (this.fullscreen) {
      this.rx = this.x;
      this.ry = this.y;
      this.rwidth = this.width;
      this.rheight = this.height;
      this.set_position(0, 0);
      return this.set_size(window.innerWidth, window.innerHeight);
    } else {
      this.set_position(this.rx, this.ry);
      return this.set_size(this.rwidth, this.rheight);
    }
  };

  WinBase.prototype.get_name = function() {
    return 'base';
  };

  return WinBase;

})();

WinNotepad = (function(_super) {
  __extends(WinNotepad, _super);

  function WinNotepad(x, y, width, height, title) {
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    if (width == null) {
      width = 100;
    }
    if (height == null) {
      height = 100;
    }
    if (title == null) {
      title = 'Window title';
    }
    WinNotepad.__super__.constructor.call(this, x, y, width, height, title, "<textarea></textarea>");
  }

  WinNotepad.prototype.get_name = function() {
    return 'notepad';
  };

  return WinNotepad;

})(WinBase);

WinTodolist = (function(_super) {
  __extends(WinTodolist, _super);

  function WinTodolist(x, y, width, height, title) {
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    if (width == null) {
      width = 100;
    }
    if (height == null) {
      height = 100;
    }
    if (title == null) {
      title = 'Window title';
    }
    WinTodolist.__super__.constructor.call(this, x, y, width, height, title, "<div class=\"todolist\">\n	<ul>\n		<li><input type=\"checkbox\" /> a</li>\n		<li><input type=\"checkbox\" /> b</li>\n		<li><input type=\"checkbox\" /> c</li>\n		<li><input type=\"checkbox\" /> d</li>\n		<li><input type=\"checkbox\" /> e</li>\n		<li><input type=\"checkbox\" /> f</li>\n	</ul>\n</div>");
  }

  WinTodolist.prototype.get_name = function() {
    return 'todolist';
  };

  return WinTodolist;

})(WinBase);

WinCalendar = (function(_super) {
  __extends(WinCalendar, _super);

  function WinCalendar(x, y, width, height, title) {
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    if (width == null) {
      width = 100;
    }
    if (height == null) {
      height = 100;
    }
    if (title == null) {
      title = 'Window title';
    }
    WinCalendar.__super__.constructor.call(this, x, y, width, height, title, "<ul class=\"super-calendar\">\n	<li><span class=\"date\">03/06/2014</span> <input type=\"text\" /></li>\n	<li><span class=\"date\">04/06/2014</span> <input type=\"text\" /></li>\n	<li><span class=\"date\">05/06/2014</span> <input type=\"text\" /></li>\n	<li><span class=\"date\">06/06/2014</span> <input type=\"text\" /></li>\n	<li><span class=\"date\">07/06/2014</span> <input type=\"text\" /></li>\n	<li><span class=\"date\">08/06/2014</span> <input type=\"text\" /></li>\n</ul>");
  }

  WinCalendar.prototype.get_name = function() {
    return 'calendar';
  };

  return WinCalendar;

})(WinBase);

WinSuperCalendar = (function(_super) {
  __extends(WinSuperCalendar, _super);

  function WinSuperCalendar(x, y, width, height, title) {
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    if (width == null) {
      width = 100;
    }
    if (height == null) {
      height = 100;
    }
    if (title == null) {
      title = 'Window title';
    }
    WinSuperCalendar.__super__.constructor.call(this, x, y, width, height, title, "<ul class=\"calendar\">\n	<li><span class=\"date\">03/06/2014</span> <input type=\"text\" /></li>\n	<li><span class=\"date\">04/06/2014</span> <input type=\"text\" /></li>\n	<li><span class=\"date\">05/06/2014</span> <input type=\"text\" /></li>\n	<li><span class=\"date\">06/06/2014</span> <input type=\"text\" /></li>\n	<li><span class=\"date\">07/06/2014</span> <input type=\"text\" /></li>\n	<li><span class=\"date\">08/06/2014</span> <input type=\"text\" /></li>\n</ul>");
  }

  WinSuperCalendar.prototype.get_name = function() {
    return 'calendar';
  };

  return WinSuperCalendar;

})(WinBase);

WinNotelist = (function(_super) {
  __extends(WinNotelist, _super);

  function WinNotelist(x, y, width, height, title) {
    var script;
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    if (width == null) {
      width = 100;
    }
    if (height == null) {
      height = 100;
    }
    if (title == null) {
      title = 'Window title';
    }
    WinNotelist.__super__.constructor.call(this, x, y, width, height, title, "<div class=\"notelist\">\n	<ul>\n		<li data-tab=\"txt_a\">Note num&eacutero 1</li>\n		<li data-tab=\"txt_b\" class=\"active\">Note num&eacutero 2</li>\n		<li data-tab=\"txt_c\">Note num&eacutero 3</li>\n		<li data-tab=\"txt_d\">Note num&eacutero 4</li>\n		<li data-tab=\"txt_e\">Note num&eacutero 5</li>\n		<li data-tab=\"txt_f\">Note num&eacutero 6</li>\n		<li data-tab=\"txt_g\">Note num&eacutero 7</li>\n		<li data-tab=\"txt_h\">Note num&eacutero 8</li>\n		<li data-tab=\"txt_i\">Note num&eacutero 9</li>\n		<li data-tab=\"txt_j\">Note num&eacutero 10</li>\n	</ul>\n	<textarea id=\"txt_a\"></textarea>\n	<textarea id=\"txt_b\"></textarea>\n	<textarea id=\"txt_c\"></textarea>\n	<textarea id=\"txt_d\"></textarea>\n	<textarea id=\"txt_e\"></textarea>\n	<textarea id=\"txt_f\"></textarea>\n	<textarea id=\"txt_g\"></textarea>\n	<textarea id=\"txt_h\"></textarea>\n	<textarea id=\"txt_i\"></textarea>\n	<textarea id=\"txt_j\"></textarea>\n</div>");
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = 'tabtor(\'.notelist ul li\')';
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  WinNotelist.prototype.get_name = function() {
    return 'notelist';
  };

  return WinNotelist;

})(WinBase);

app = {};

app.dom = document.getElementById('app');

app.windows = [new WinNotepad(5, 5, 150, 150, 'Bloc-notes'), new WinTodolist(160, 5, 150, 150, 'Todolist'), new WinCalendar(315, 5, 250, 150, 'Calendrier'), new WinSuperCalendar(570, 5, 250, 150, 'Calendrier avanc&eacute;'), new WinNotelist(825, 5, 300, 150, 'Liste de notes')];

app.drag = void 0;

app.resize = void 0;

app.init = function() {
  return app.load_configs();
};

app.load_configs = function() {

  /*
  	if (localStorage) {
  		if (localStorage.getItem('windows')) {
  			app.windows = []
  
  			JSON.parse(localStorage.getItem('windows')).forEach(function(win, index, windows) {
  				switch (win.type) {
  					case 'window':
  						app.windows.push(new AWindow(win.x, win.y, win.width, win.height, win.title))
  						break
  
  					case 'notepad':
  						app.windows.push(new Notepad(win.x, win.y, win.width, win.height, win.title))
  						break
  
  					case 'todolist':
  						app.windows.push(new Todolist(win.x, win.y, win.width, win.height, win.title))
  						break
  
  					case 'calendar':
  						app.windows.push(new Calendar(win.x, win.y, win.width, win.height, win.title))
  						break
  
  					case 'notelist':
  						app.windows.push(new Notelist(win.x, win.y, win.width, win.height, win.title))
  						break
  				}
  			})
  		}
  	}
   */
};

app.save_configs = function() {
  var wins;
  if (localStorage) {
    wins = [];
    this.windows.forEach(function(win, index, windows) {
      return wins.push({
        type: win.get_name(),
        id: win.id,
        innerHTML: win.dom.innerHTML,
        x: win.x,
        y: win.y,
        width: win.width,
        height: win.height,
        title: win.title,
        zIndex: win.dom.style.zIndex
      });
    });
    return localStorage.setItem('windows', JSON.stringify(wins));
  }
};

document.onmousedown = function(e) {
  var i, parent_node, win, _i, _ref, _results;
  if (e.target !== cm) {
    parent_node = e.target.parentNode;
    while (parent_node !== cm) {
      parent_node = parent_node.parentNode;
      if (parent_node === null) {
        cm.style.display = 'none';
        break;
      }
    }
  }
  app.windows.sort(function(a, b) {
    return b.dom.style.zIndex - a.dom.style.zIndex;
  });
  _results = [];
  for (i = _i = 0, _ref = app.windows.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
    win = app.windows[i];
    if (e.pageX > win.x && e.pageY > win.y && e.pageX < win.x + win.width && e.pageY < win.y + 25) {
      app.drag = {
        win: win,
        dist_x: e.pageX - win.x,
        dist_y: e.pageY - win.y
      };
      if (win.fullscreen) {
        win.set_fullscreen(false);
      }
    }
    if (e.pageX > win.x + win.width - 16 && e.pageX < win.x + win.width && e.pageY > win.y + win.height - 16 && e.pageY < win.y + win.height) {
      app.resize = {
        win: win,
        dist_x: e.pageX,
        dist_y: e.pageY,
        init_w: win.width,
        init_h: win.height
      };
    }
    if (e.pageX > win.x && e.pageY > win.y && e.pageX < win.x + win.width && e.pageY < win.y + win.height) {
      win.dom.style.zIndex = ++WinBase.zIndex;
      break;
    } else {
      _results.push(void 0);
    }
  }
  return _results;
};

document.ondblclick = function(e) {
  var i, parent_node, win, _i, _ref, _results;
  if (e.target !== cm) {
    parent_node = e.target.parentNode;
    while (parent_node !== cm) {
      parent_node = parent_node.parentNode;
      if (parent_node === null) {
        cm.style.display = 'none';
        break;
      }
    }
  }
  app.windows.sort(function(a, b) {
    return b.dom.style.zIndex - a.dom.style.zIndex;
  });
  _results = [];
  for (i = _i = 0, _ref = app.windows.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
    win = app.windows[i];
    if (e.pageX > win.x && e.pageY > win.y && e.pageX < win.x + win.width && e.pageY < win.y + 25) {
      if (!win.fullscreen) {
        win.set_fullscreen(true);
      } else {
        win.set_fullscreen(false);
      }
      break;
    } else {
      _results.push(void 0);
    }
  }
  return _results;
};

document.onmouseup = function() {
  var i, win, x, y, _i, _ref;
  app.drag = void 0;
  app.resize = void 0;
  for (i = _i = 0, _ref = app.windows.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
    win = app.windows[i];
    x = Math.clamp(0, win.x, window.innerWidth - win.width);
    y = Math.clamp(0, win.y, window.innerHeight - 25);
    if (win.y < 0) {
      win.set_fullscreen(true);
    } else {
      win.set_position(x, y);
    }
  }
  return app.save_configs();
};

document.onmousemove = function(e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
  if (typeof app.drag !== 'undefined') {
    app.drag.win.set_position(e.pageX - app.drag.dist_x, e.pageY - app.drag.dist_y);
  }
  if (typeof app.resize !== 'undefined') {
    return app.resize.win.set_size(e.pageX - app.resize.dist_x + app.resize.init_w, e.pageY - app.resize.dist_y + app.resize.init_h);
  }
};

cm = document.getElementById('contextmenu');

document.oncontextmenu = function(e) {
  var parent_node;
  if (e.target !== cm && e.target !== document.body) {
    parent_node = e.target.parentNode;
    if (parent_node !== cm) {
      while (parent_node !== cm) {
        parent_node = parent_node.parentNode;
        if (parent_node === null) {
          cm.style.display = 'none';
          break;
        }
      }
    }
  } else {
    cm.style.display = 'block';
    cm.style.left = e.pageX + 'px';
    cm.style.top = e.pageY + 'px';
    return false;
  }
  return true;
};

document.getElementById('create-window').onclick = function() {
  cm.style.display = 'none';
  return app.windows.push(new WinNotelist(mouse.x, mouse.y, 300, 150, 'Liste de notes'));
};

app.init();
