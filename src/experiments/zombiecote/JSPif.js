var JSPif = {
	/* Globals variables */
		_canvas: null,
		_context: null,

	/* Canvas element */
		Canvas: function(id, width, height) {
			this.resize = function(width, height) {
				this.width = width;
				this.height = height;

				this.canvas.width = this.width;
				this.canvas.height = this.height;
			}

			this.add = function(whos) {
				for (var i in whos) {
					this.members.push(whos[i]);
				}
			}

			this.draw = function() {
				for (var i in this.members) {
					this.members[i].draw();
				}
			}

			this.clear = function() {
				this.canvas.width = this.canvas.width;
			}

			this.mouse = function(e) {
				var r = {
					x: e.clientX - canvas.offsetLeft,
					y: e.clientY - canvas.offsetTop,
				}

				return r;
			}

			this.scale = function(x, y) {
				this.canvas.scale(x, y);
			}

			this.id     = id;
			this.width  = width;
			this.height = height;

			this.members = [];

			this.canvas  = document.getElementById(id),
			this.context = this.canvas.getContext('2d'),
			this.div     = '#' + id;

			JSPif._canvas  = this.canvas;
			JSPif._context = this.context;

			this.offsetLeft = this.canvas.offsetLeft;
			this.offsetTop  = this.canvas.offsetTop;

			this.resize(this.width, this.height);
		},

		Clear: function() {
			JSPif._canvas.height = JSPif._canvas.height;
		},

	/* Object's mom */
		Granny: function() {
		},

	/* Object's mom */
		Mom: function(x, y) {
			JSPif.Granny.call(this);

			this.x = x;
			this.y = y;
		},

	/* Group objects */
		Group: function() {
			this.add = function(what) {
				this.members.push(what);
			}

			this.draw = function() {
				for (var i in this.members) {
					this.members[i].draw();
				}
			}

			this.kill = function (member) {
				member.solid = false;

				member.alpha = 0;

				member.speed.x = 0;
				member.speed.y = 0;

				member.maxspeed.x = 0;
				member.maxspeed.y = 0;

				member.alive = false;
			}

			/*this.overlap = function (whats) {
				for (var i in this.members) {
					var member = this.members[i];

					if (whats.members.length > 0) {
						for (var j in whats.members) {
							var what = whats.members[j];

							if (
								(member.x > 0) &&
								(member.x + member.width > what.x) &&
								(member.x < what.x + what.width) &&
								(member.y > 0) &&
								(member.y + member.height > what.y) &&
								(member.y < what.y + what.height) &&
								(member.solid == true)
							) {
								alert('COLISION');
								return true;
							}
						}
					}
				}

				return false;
			}*/

			this.clear = function() {
				for (var i in this.members) {
					this.members[i].solid = false;
					this.members[i].alpha = 0;
				}
			}

			this.members = [];
		},

	/* Rectangle */
		Rect: function(x, y, width, height) {
			JSPif.Mom.call(this, x, y);

			this.width = width;
			this.height = height;

			this.draw = function() {
				JSPif._context.beginPath();
				JSPif._context.rect(this.x, this.y, this.width, this.height);
				JSPif._context.fillStyle = this.color;
				JSPif._context.globalAlpha = this.alpha;
				//JSPif._context.rotate(this.rotate * Math.PI / 180);
				JSPif._context.fill();
				//JSPif._context.restore();
				//JSPif._context.rotate(-this.rotate * Math.PI / 180);
				//JSPif._context.save();
			}

			this.overlap = function (what) {
				if (
					(this.x > 0) &&
					(this.x + this.width > what.x) &&
					(this.x < what.x + what.width) &&
					(this.y > 0) &&
					(this.y + this.height > what.y) &&
					(this.y < what.y + what.height) &&
					(this.alive == true) &&
					(what.alive == true)
				) {
					return true;
				}

				return false;
			}

			/* this.overlapscreen = function() {
				if (
					this.x <= 0 ||
					this.x + this.width >= canvas.width ||
					this.y <= 0 ||
					this.y + this.height >= canvas.height
				) {
					return true;
				}

				return false;
			} */

			this.kill = function() {
				this.solid = false;

				this.alpha = 0;

				this.speed.x = 0;
				this.speed.y = 0;

				this.maxspeed.x = 0;
				this.maxspeed.y = 0;

				this.alive = false;
			}

			this.color = '#000000';
			this.alpha = 1;

			this.rotate = 0;

			this.speed = {
				x: 0,
				y: 0
			};

			this.maxspeed = {
				x: 4,
				y: 4
			};

			this.alive = true;
		},

	/* Sprite */
		Sprite: function(x, y, image, tileHeight, tileWidth) {
			JSPif.Mom.call(this, x, y);

			this.image = new Image();
			this.image.src = image;
			this.tileHeight = tileHeight;
			this.tileWidth = tileWidth;

			this.draw = function() {
				this.nextStep++;

				if (this.nextStep == this.endStep) {
					this.nextStep = 0;

					var anim = this.animations[this.run.animation];

					this.run.frame++;

					if (!anim.inArray(this.run.frame)) {
						this.run.frame = anim[0];
					}
				}

				if (this.visible) {
					JSPif._context.drawImage(
						this.image,                                       // image
						this.run.frame * this.tileWidth + this.run.frame, // sx
						0,                                                // sy
						this.tileWidth,                                   // sw
						this.tileHeight,                                  // sh
						this.x,                                           // dx
						this.y,                                           // dy
						this.tileWidth,                                   // dw
						this.tileHeight                                   // dh
					);
				}
			}

			this.play = function(name, loop) {
				if (this.run.animation != name) {
					this.run.animation = name;
					this.run.frame     = this.animations[name][0];
					this.run.loop      = loop;
				}
			}

			this.addAnimation = function(name, sprite) {
				this.animations[name] = sprite;
			}

			this.animations = [];
			this.animations['base'] = [0];

			this.run = {
				animation: 'base',
				frame    : 0,
				loop     : true
			};

			this.nextStep = 0;
			this.endStep  = 10;

			this.nbTiles = this.image.width / 16;

			this.visible = true;
		},

	/* Pattern */
		Pattern: function(x, y, image, width, height) {
			JSPif.Mom.call(this, x, y);

			this.image = new Image();
			this.image.src = image;
			this.width = width;
			this.height = height;

			this.draw = function() {
				var pattern = JSPif._context.createPattern(this.image, 'repeat');
				JSPif._context.rect(this.x, this.y, this.height, this.width);
				JSPif._context.fillStyle = pattern;
				JSPif._context.fill();
			}
		},

	/* Text */
		Text: function(x, y, text) {
			JSPif.Mom.call(this, x, y);

			this.text = text;

			this.draw = function() {
				JSPif._context.font = this.font;
				JSPif._context.fillStyle = this.color;
				JSPif._context.textAlign = this.align;
				JSPif._context.fillText(this.text, this.x, this.y);
			}

			this.font = '12px Arial';
			text.align = 'left';

			this.color = '#000000';
		},

	/* Keyboard keys */
		keys: {
			BACKSPACE: 8,
			TAB:       9,
			ENTER:     13,
			SHIFT:     16,
			CTRL:      17,
			ALT:       18,
			//pause/break: 19,
			CAPS_LOCK: 20,
			ESCAPE:    27,
			//page up: 33,
			SPACE:     32,
			//page down: 34,
			END:       35,
			HOME:      36,
			LEFT:      37,
			UP:        38,
			RIGHT:     39,
			DOWN:      40,
			//print screen: 44,
			INSERT:    45,
			DELETE:    46,
			NUMBER0:   48,
			NUMBER1:   49,
			NUMBER2:   50,
			NUMBER3:   51,
			NUMBER4:   52,
			NUMBER5:   53,
			NUMBER6:   54,
			NUMBER7:   55,
			NUMBER8:   56,
			NUMBER9:   57,
			A:         65,
			B:         66,
			C:         67,
			D:         68,
			E:         69,
			F:         70,
			G:         71,
			H:         72,
			I:         73,
			J:         74,
			K:         75,
			L:         76,
			M:         77,
			N:         78,
			O:         79,
			P:         80,
			Q:         81,
			R:         82,
			S:         83,
			T:         84,
			U:         85,
			V:         86,
			W:         87,
			X:         88,
			Y:         89,
			Z:         90,
			//left window key: 91,
			//right window key: 92,
			//select key: 93,
			NUMPAD0:   96,
			NUMPAD1:   97,
			NUMPAD2:   98,
			NUMPAD3:   99,
			NUMPAD4:   100,
			NUMPAD5:   101,
			NUMPAD6:   102,
			NUMPAD7:   103,
			NUMPAD8:   104,
			NUMPAD9:   105,
			MULTIPLY:  106,
			ADD:       107,
			SUBSTRACT: 109,
			//decimal point: 110,
			DIVIDE:    111,
			F1:        112,
			F2:        113,
			F3:        114,
			F4:        115,
			F5:        116,
			F6:        117,
			F7:        118,
			F8:        119,
			F9:        120,
			F10:       121,
			F11:       122,
			F12:       123,
			//num lock: 144,
			//scroll lock: 145,
			//semi-colon: 186,
			//equal sign: 107,
			//comma: 188,
			//dash: 189,
			//period: 190,
			//forward slash: 191,
			//open bracket: 219,
			//back slash: 220,
			//close bracket: 221,
			//single quote: 222
		}
}

Array.prototype.inArray = function(element) {
	for (var i = 0 ; i < this.length ; i++) {
		if (this[i] == element) {
			return true;
		}
	}

	return false;
}

window.requestAnimFrame = (function(){
	return window.requestAnimationFrame || 
	window.webkitRequestAnimationFrame  || 
	window.mozRequestAnimationFrame     || 
	window.oRequestAnimationFrame       || 
	window.msRequestAnimationFrame      || 
	function(callback){
		window.setTimeout(callback, 1000 / 60);
	};
})();
