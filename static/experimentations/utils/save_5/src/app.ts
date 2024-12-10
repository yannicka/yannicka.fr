class AWindow {
	public x:number;
	public y:number;
	public width:number;
	public height:number;
	public title:string;
	public id:string;
	public dom:any;

	static id:number = 0;
	static zIndex:number = 0;

	constructor(x:number = 0, y:number = 0, width:number = 100, height:number = 100, title:string = 'Window title', content:string = '') {
		// Définition de l'identifiant (unique) de la fenêtre
		this.id = 'window' + AWindow.id++;

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.title = title;
		this.content = content;

		// Création de la fenêtre et ajout au DOM
		this.dom = document.createElement('div');
		this.dom.className = 'window';
		this.dom.id = this.id;

		this.dom.innerHTML = '' +
			'<div class="title">' +
				this.title +
			'</div>' +

			'<div class="content">' +
				this.content +
			'</div>' +

			'<div class="infos">' +
				'<div class="resizer"></div>' +
				'<div class="configs"></div>' +
			'</div>';

		app.dom.appendChild(this.dom);

		// Définition de la position de la fenêtre dans le DOM (x ; y)
		this.set_position(this.x, this.y);

		// Définition de la taille de la fenêtre dans le DOM (hauteur ; largeur)
		this.set_size(this.width, this.height);

		// Définition de la profondeur de la fenêtre (au-dessus de toute les autres)
		this.dom.style.zIndex = AWindow.zIndex++;
	}

	set_position(x:number, y:number) {
		this.x = x;
		this.y = y;

		this.dom.style.left = this.x + 'px';
		this.dom.style.top  = this.y + 'px';
	}

	set_size(width:number, height:number) {
		this.width  = Math.max(150, width);
		this.height = Math.max(150, height);

		this.dom.style.width  = this.width + 'px';
		this.dom.style.height = this.height + 'px';
	}
}

class Notepad extends AWindow {
	constructor(x:number = 0, y:number = 0, width:number = 100, height:number = 100, title:string = 'Window title') {
		super(x, y, width, height, title,
			'<textarea></textarea>'
		);
	}
}

class Todolist extends AWindow {
	constructor(x:number = 0, y:number = 0, width:number = 100, height:number = 100, title:string = 'Window title') {
		super(x, y, width, height, title,
			'<ul><li>a</li><li>b</li><li>c</li></ul>'
		);
	}
}

class Calendar extends AWindow {
	constructor(x:number = 0, y:number = 0, width:number = 100, height:number = 100, title:string = 'Window title') {
		super(x, y, width, height, title,
			'<textarea></textarea>'
		);
	}
}

class Notelist extends AWindow {
	constructor(x:number = 0, y:number = 0, width:number = 100, height:number = 100, title:string = 'Window title') {
		super(x, y, width, height, title,
			'<textarea></textarea>'
		);
	}
}

var app:any = {};

app.dom = document.getElementById('app');

app.windows = [
	new Notepad(5, 5, 150, 150, 'B1'),
	new Todolist(160, 5, 150, 150, 'B2'),
	new Calendar(315, 5, 150, 150, 'B3'),
	new Notelist(470, 5, 150, 150, 'B4')
];

app.drag = undefined;
app.resize = undefined;

document.onmousedown = function(e) {
	var win;

	// On tri les fenêtres en plaçant la plus en avant au début de la file
	app.windows.sort(function(a, b) {
		return b.dom.style.zIndex - a.dom.style.zIndex;
	});

	for (var i = 0, len = app.windows.length ; i < len ; i++) {
		win = app.windows[i];

		// Glisser
		if (e.pageX > win.x &&
			e.pageY > win.y &&
			e.pageX < win.x + win.width &&
			e.pageY < win.y + 25
		) {
			app.drag = {
				win: win,
				dist_x: e.pageX - win.x,
				dist_y: e.pageY - win.y
			};
		}

		// Redimensionner
		if (e.pageX > win.x + win.width - 16 &&
			e.pageX < win.x + win.width &&
			e.pageY > win.y + win.height - 16 &&
			e.pageY < win.y + win.height
		) {
			// On garde en mémoire la position de la souris et la taille de la fenêtre
			app.resize = {
				win: win,
				dist_x: e.pageX,
				dist_y: e.pageY,
				init_w: win.width,
				init_h: win.height
			};
		}

		// On affiche la fenêtre voulue au premier plan
		if (e.pageX > win.x &&
			e.pageY > win.y &&
			e.pageX < win.x + win.width &&
			e.pageY < win.y + win.height
		) {
			win.dom.style.zIndex = ++AWindow.zIndex;
			break;
		}
	}
};

document.onmouseup = function() {
	app.drag   = undefined;
	app.resize = undefined;
};

document.onmousemove = function(e) {
	if (typeof app.drag != 'undefined') {
		app.drag.win.set_position(
			e.pageX - app.drag.dist_x,
			e.pageY - app.drag.dist_y
		);
	}

	if (typeof app.resize != 'undefined') {
		app.resize.win.set_size(
			e.pageX - app.resize.dist_x + app.resize.init_w,
			e.pageY - app.resize.dist_y + app.resize.init_h
		);
	}
};
