function preload_images(a,g){var f=0,e=Object.keys(a).length,c=null;var d=function(){f++};for(c in a){d[c]=new Image();d[c].onload=d;d[c].src=a[c]};var b=function(){if(f==e){g()}else{setTimeout(b,100)}};b();return d};

var can = <HTMLCanvasElement> document.getElementById('game');
var ctx = can.getContext('2d');

can.width  = 640;
can.height = 480;

interface CanvasRenderingContext2D {
	mozImageSmoothingEnabled:boolean;
	webkitImageSmoothingEnabled:boolean;
	oImageSmoothingEnabled:boolean;
	imageSmoothingEnabled:boolean;
}

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
var player:Player = new Player(50, 10);
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

	//ctx.drawImage(image.bg, 0, 0);

	for (var i = 0, len = blocks.length ; i < len ; i++) {
		var block = blocks[i];

		block.update();
		block.draw(ctx);
	}

	requestAnimationFrame(update);
}

var Key={TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,NUM0:48,NUM1:49,NUM2:50,NUM3:51,NUM4:52,NUM5:53,NUM6:54,NUM7:55,NUM8:56,NUM9:57,NUMPAD0:96,NUMPAD1:97,NUMPAD2:98,NUMPAD3:99,NUMPAD4:100,NUMPAD5:101,NUMPAD6:102,NUMPAD7:103,NUMPAD8:104,NUMPAD9:105,ADD:107,SUB:109,MUL:106,DIV:111,CAPSLOCK:20,PAGEUP:33,PAGEDOWN:34,END:35,HOME:36,INSERT:45,DELETE:46,NUMLOCK:144};
function Keyboard(){this.keys=[];this.last=0;this.ktime=0;this.update=function(){this.ktime++;};this.onkeyup=function(self){return function(e){self.keys[e.keyCode]=null;};}(this);this.onkeydown=function(self){return function(e){self.keys[e.keyCode]=self.ktime;};}(this);this.up=function(){var ret=false;for(var i=0;i<arguments.length;i++){ret|=this.keys[arguments[i]]==null?1:0;}return ret;};this.down=function(){var ret=false;for(var i=0;i<arguments.length;i++){ret|=this.keys[arguments[i]]!=null?1:0;}return ret;};this.press=function(){var ret=false;for(var i=0;i<arguments.length;i++){ret|=this.keys[arguments[i]]==this.ktime?1:0;}return ret;};}

var key = new Keyboard();
document.onkeydown = key.onkeydown;
document.onkeyup = key.onkeyup;

var image:any = preload_images({
	'tiles':   'gfx/tiles.png',
	'tileset': 'gfx/tileset.png',
	'bg':      'gfx/bg.png'
}, go);
