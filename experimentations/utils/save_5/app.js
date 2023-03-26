var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AWindow = (function () {
    function AWindow(x, y, width, height, title) {
        if (typeof x === "undefined") { x = 0; }
        if (typeof y === "undefined") { y = 0; }
        if (typeof width === "undefined") { width = 100; }
        if (typeof height === "undefined") { height = 100; }
        if (typeof title === "undefined") { title = 'Window title'; }
        // Définition de l'identifiant (unique) de la fenêtre
        this.id = 'window' + AWindow.id++;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.title = title;

        // Création de la fenêtre et ajout au DOM
        this.dom = document.createElement('div');
        this.dom.className = 'window';
        this.dom.id = this.id;

        this.dom.innerHTML = '' + '<div class="title">' + this.title + '</div>' + '<div class="content">' + '<textarea></textarea>' + '</div>' + '<div class="infos">' + '<div class="resizer"></div>' + '<div class="configs"></div>' + '</div>';

        app.dom.appendChild(this.dom);

        // Définition de la position de la fenêtre dans le DOM (x ; y)
        this.set_position(this.x, this.y);

        // Définition de la taille de la fenêtre dans le DOM (hauteur ; largeur)
        this.set_size(this.width, this.height);

        // Définition de la profondeur de la fenêtre (au-dessus de toute les autres)
        this.dom.style.zIndex = AWindow.zIndex++;
    }
    AWindow.prototype.set_position = function (x, y) {
        this.x = x;
        this.y = y;

        this.dom.style.left = this.x + 'px';
        this.dom.style.top = this.y + 'px';
    };

    AWindow.prototype.set_size = function (width, height) {
        this.width = Math.max(150, width);
        this.height = Math.max(150, height);

        this.dom.style.width = this.width + 'px';
        this.dom.style.height = this.height + 'px';
    };
    AWindow.id = 0;
    AWindow.zIndex = 0;
    return AWindow;
})();

var Notepad = (function (_super) {
    __extends(Notepad, _super);
    function Notepad(x, y, width, height, title) {
        if (typeof x === "undefined") { x = 0; }
        if (typeof y === "undefined") { y = 0; }
        if (typeof width === "undefined") { width = 100; }
        if (typeof height === "undefined") { height = 100; }
        if (typeof title === "undefined") { title = 'Window title'; }
        _super.call(this, x, y, width, height, title);
    }
    return Notepad;
})(AWindow);

var Todolist = (function (_super) {
    __extends(Todolist, _super);
    function Todolist(x, y, width, height, title) {
        if (typeof x === "undefined") { x = 0; }
        if (typeof y === "undefined") { y = 0; }
        if (typeof width === "undefined") { width = 100; }
        if (typeof height === "undefined") { height = 100; }
        if (typeof title === "undefined") { title = 'Window title'; }
        _super.call(this, x, y, width, height, title);
    }
    return Todolist;
})(AWindow);

var Calendar = (function (_super) {
    __extends(Calendar, _super);
    function Calendar(x, y, width, height, title) {
        if (typeof x === "undefined") { x = 0; }
        if (typeof y === "undefined") { y = 0; }
        if (typeof width === "undefined") { width = 100; }
        if (typeof height === "undefined") { height = 100; }
        if (typeof title === "undefined") { title = 'Window title'; }
        _super.call(this, x, y, width, height, title);
    }
    return Calendar;
})(AWindow);

var Notelist = (function (_super) {
    __extends(Notelist, _super);
    function Notelist(x, y, width, height, title) {
        if (typeof x === "undefined") { x = 0; }
        if (typeof y === "undefined") { y = 0; }
        if (typeof width === "undefined") { width = 100; }
        if (typeof height === "undefined") { height = 100; }
        if (typeof title === "undefined") { title = 'Window title'; }
        _super.call(this, x, y, width, height, title);
    }
    return Notelist;
})(AWindow);

var app = {};

app.dom = document.getElementById('app');

app.windows = [
    new Notepad(5, 5, 150, 150, 'B1'),
    new Todolist(160, 5, 150, 150, 'B2'),
    new Calendar(315, 5, 150, 150, 'B3'),
    new Notelist(470, 5, 150, 150, 'B4')
];

app.drag = undefined;
app.resize = undefined;

document.onmousedown = function (e) {
    var win;

    // On tri les fenêtres en plaçant la plus en avant au début de la file
    app.windows.sort(function (a, b) {
        return b.dom.style.zIndex - a.dom.style.zIndex;
    });

    for (var i = 0, len = app.windows.length; i < len; i++) {
        win = app.windows[i];

        if (e.pageX > win.x && e.pageY > win.y && e.pageX < win.x + win.width && e.pageY < win.y + 25) {
            app.drag = {
                win: win,
                dist_x: e.pageX - win.x,
                dist_y: e.pageY - win.y
            };
        }

        if (e.pageX > win.x + win.width - 16 && e.pageX < win.x + win.width && e.pageY > win.y + win.height - 16 && e.pageY < win.y + win.height) {
            // On garde en mémoire la position de la souris et la taille de la fenêtre
            app.resize = {
                win: win,
                dist_x: e.pageX,
                dist_y: e.pageY,
                init_w: win.width,
                init_h: win.height
            };
        }

        if (e.pageX > win.x && e.pageY > win.y && e.pageX < win.x + win.width && e.pageY < win.y + win.height) {
            win.dom.style.zIndex = ++AWindow.zIndex;
            break;
        }
    }
};

document.onmouseup = function () {
    app.drag = undefined;
    app.resize = undefined;
};

document.onmousemove = function (e) {
    if (typeof app.drag != 'undefined') {
        app.drag.win.set_position(e.pageX - app.drag.dist_x, e.pageY - app.drag.dist_y);
    }

    if (typeof app.resize != 'undefined') {
        app.resize.win.set_size(e.pageX - app.resize.dist_x + app.resize.init_w, e.pageY - app.resize.dist_y + app.resize.init_h);
    }
};
