class WinBase {
	public x:number;
	public y:number;
	public width:number;
	public height:number;
	public title:string;
	public id:string;
	public dom:any;
	public content:string;

	static id:number = 0;
	static zIndex:number = 0;

	constructor(x:number = 0, y:number = 0, width:number = 100, height:number = 100, title:string = 'Window title', content:string = '') {
		// Définition de l'identifiant (unique) de la fenêtre
		this.id = 'window' + WinBase.id++;

		this.x = x;
		this.y = y;

		this.width  = width;
		this.height = height;

		this.title   = title;
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
		this.dom.style.zIndex = WinBase.zIndex++;
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

	get_name() {
		return 'base';
	}
}

class WinNotepad extends WinBase {
	constructor(x:number = 0, y:number = 0, width:number = 100, height:number = 100, title:string = 'Window title') {
		super(x, y, width, height, title,
			'<textarea></textarea>'
		);
	}

	get_name() {
		return 'notepad';
	}
}

class WinTodolist extends WinBase {
	constructor(x:number = 0, y:number = 0, width:number = 100, height:number = 100, title:string = 'Window title') {
		super(x, y, width, height, title,
			'<ul>' +
				'<li><input type="checkbox" /> a</li>' +
				'<li><input type="checkbox" /> b</li> '+
				'<li><input type="checkbox" /> c</li>' +
				'<li><input type="checkbox" /> d</li>' +
				'<li><input type="checkbox" /> e</li>' +
				'<li><input type="checkbox" /> f</li>' +
			'</ul>'
		);
	}

	get_name() {
		return 'todolist';
	}
}

class WinCalendar extends WinBase {
	constructor(x:number = 0, y:number = 0, width:number = 100, height:number = 100, title:string = 'Window title') {
		super(x, y, width, height, title,
			'<ul class="calendar">' +
				'<li><span class="date">03/06/2014</span> <input type="text" /></li>' +
				'<li><span class="date">04/06/2014</span> <input type="text" /></li> '+
				'<li><span class="date">05/06/2014</span> <input type="text" /></li>' +
				'<li><span class="date">06/06/2014</span> <input type="text" /></li>' +
				'<li><span class="date">07/06/2014</span> <input type="text" /></li>' +
				'<li><span class="date">08/06/2014</span> <input type="text" /></li>' +
			'</ul>'
		);
	}

	get_name() {
		return 'calendar';
	}
}

class WinNotelist extends WinBase {
	constructor(x:number = 0, y:number = 0, width:number = 100, height:number = 100, title:string = 'Window title') {
		super(x, y, width, height, title,
			'<div class="notelist">' +
				'<ul>' +
					'<li data-tab="txt_a">Note num&eacute;ro 1</li>' +
					'<li data-tab="txt_b" class="active">Note num&eacute;ro 2</li> '+
					'<li data-tab="txt_c">Note num&eacute;ro 3</li>' +
					'<li data-tab="txt_d">Note num&eacute;ro 4</li>' +
					'<li data-tab="txt_e">Note num&eacute;ro 5</li>' +
					'<li data-tab="txt_f">Note num&eacute;ro 6</li>' +
					'<li data-tab="txt_g">Note num&eacute;ro 7</li>' +
					'<li data-tab="txt_h">Note num&eacute;ro 8</li>' +
					'<li data-tab="txt_i">Note num&eacute;ro 9</li>' +
					'<li data-tab="txt_j">Note num&eacute;ro 10</li>' +
				'</ul>' +
				'<textarea id="txt_a"></textarea>' +
				'<textarea id="txt_b"></textarea>' +
				'<textarea id="txt_c"></textarea>' +
				'<textarea id="txt_d"></textarea>' +
				'<textarea id="txt_e"></textarea>' +
				'<textarea id="txt_f"></textarea>' +
				'<textarea id="txt_g"></textarea>' +
				'<textarea id="txt_h"></textarea>' +
				'<textarea id="txt_i"></textarea>' +
				'<textarea id="txt_j"></textarea>' +
			'</div>'
		);

		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.innerHTML = 'tabtor(\'.notelist ul li\')';
		document.getElementsByTagName('head')[0].appendChild(script);
	}

	get_name() {
		return 'notelist';
	}
}

class WinCalculator extends WinBase {
	constructor(x:number = 0, y:number = 0, width:number = 100, height:number = 100, title:string = 'Window title') {
		var id = WinBase.id + 1;

		super(x, y, width, height, title,
			'<div class="calculator">' +
				'<input type="text" id="win-' + id + '-input" data-result="win-' + id + '-result" placeholder="Calcul" /><br />' +
				'<span id="win-' + id + '-result"></span>' +
			'</div>'
		);

		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.innerHTML = 'document.getElementById(\'win-' + id + '-input\').onkeyup = function() {' +
			//'alert(eval_ni(this.value));' +
			'try {' +
				'document.getElementById(this.getAttribute(\'data-result\')).innerHTML = eval_ni(this.value);' +
			'} catch(e) {' +
				'document.getElementById(this.getAttribute(\'data-result\')).innerHTML = \'\';' +
			'}' +
		'};';
		document.getElementsByTagName('head')[0].appendChild(script);
	}

	get_name() {
		return 'calculator';
	}
}

class WinGraphicFunction extends WinBase {
	constructor(x:number = 0, y:number = 0, width:number = 100, height:number = 100, title:string = 'Window title') {
		super(x, y, width, height, title,
			'<div>' +
				'<input type="text" /><br />' +
				'<span></span>' +
			'</div>'
		);
	}

	get_name() {
		return 'graphic';
	}
}

var app:any = {};

app.dom = document.getElementById('app');

app.windows = [
	new WinNotepad(5, 5, 150, 150, 'Bloc-notes'),
	new WinTodolist(160, 5, 150, 150, 'Todolist'),
	new WinCalendar(315, 5, 250, 150, 'Calendrier'),
	new WinNotelist(570, 5, 300, 150, 'Liste de notes'),
	new WinCalculator(875, 5, 150, 150, 'Calculatrice'),
	new WinGraphicFunction(1030, 5, 150, 150, 'Graphique')
];

app.drag = undefined;
app.resize = undefined;

app.init = function() {
	app.load_configs();
};

app.load_configs = function() {
	/*if (localStorage) {
		if (localStorage.getItem('windows')) {
			app.windows = [];

			JSON.parse(localStorage.getItem('windows')).forEach(function(win, index, windows) {
				switch (win.type) {
					case 'window':
						app.windows.push(new AWindow(win.x, win.y, win.width, win.height, win.title));
						break;

					case 'notepad':
						app.windows.push(new Notepad(win.x, win.y, win.width, win.height, win.title));
						break;

					case 'todolist':
						app.windows.push(new Todolist(win.x, win.y, win.width, win.height, win.title));
						break;

					case 'calendar':
						app.windows.push(new Calendar(win.x, win.y, win.width, win.height, win.title));
						break;

					case 'notelist':
						app.windows.push(new Notelist(win.x, win.y, win.width, win.height, win.title));
						break;
				}
			});
		}
	}*/
};

app.save_configs = function() {
	if (localStorage) {
		var wins = [];

		this.windows.forEach(function(win, index, windows) {
			wins.push({
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

		localStorage.setItem('windows', JSON.stringify(wins));
	}
};

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
			win.dom.style.zIndex = ++WinBase.zIndex;
			break;
		}
	}
};

document.onmouseup = function() {
	app.drag   = undefined;
	app.resize = undefined;

	app.save_configs();
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

app.init();
