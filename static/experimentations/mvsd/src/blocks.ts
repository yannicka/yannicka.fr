interface Frame {
	x:number;
	y:number;
	width:number;
	height:number;
	offset_x?:number;
	offset_y?:number;
}

interface Animation {
	frames:Array<Frame>;
	speed:number;
	loop:boolean;
}

class Entity {
	public x:number;
	public y:number;
	public cur_animation:Animation;
	public cur_frame:Frame;
	public cur_index:number;
	public animations:{ [name:string]:Animation };

	public solid:boolean;
	public ladder:boolean;

	public dirx:string;
	public diry:string;

	//public cloud:boolean;
	//public jumper:boolean;
	//public carpet:boolean;
	//public object:boolean;
	//public slope:boolean;

	private ac_delta:number;

	constructor(x:number, y:number, options:any = {}) {
		this.x = x;
		this.y = y;

		this.animations = {};
		this.cur_animation = null;
		this.cur_index = 0;
		this.ac_delta = 0;

		this.solid  = false;
		this.ladder = false;
		//this.cloud  = false;
		//this.jumper = false;
		//this.carpet = false;
		//this.object = false;
		//this.slope  = false;

		if (typeof options.solid !== 'undefined')
			this.solid = options.solid;

		if (typeof options.ladder !== 'undefined')
			this.ladder = options.ladder;

	}

	public update(dt:number = 16.5) {
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
	}

	public draw(ctx:CanvasRenderingContext2D) {
		ctx.drawImage(
			image.tileset,
			this.cur_frame.x,
			this.cur_frame.y,
			this.cur_frame.width,
			this.cur_frame.height,
			this.x + this.cur_frame.offset_x,
			this.y + this.cur_frame.offset_y,
			this.cur_frame.width,
			this.cur_frame.height
		);
	}

	public add_animation(name:string, frames:Array<Frame>, speed:number, loop:boolean = true) {
		for (var i:number = 0, len = frames.length ; i < len ; i++) {
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
	}

	public play(name:string, force:boolean = true) {
		if (this.cur_animation != this.animations[name] || force) {
			this.cur_index = 0;
			this.cur_animation = this.animations[name];

			var the_frame:Array<Frame> = this.cur_animation.frames;
			this.cur_frame = the_frame[this.cur_index];
		}
	}

	public collide(blocks:any):void {
		for (var i:number = 0, len = blocks.length ; i < len ; i++) {
			var block = blocks[i];

			// Pas besoin de tester le bloc lui-même
			if (this == block)
				return;

			if (!block.solid)
				return;

			//alert((block.x) + ' >= ' + (this.x + this.cur_frame.width) + ' || ' + (block.x + block.cur_frame.width) + ' <= ' + (this.x) + ' || ' + (block.y) + ' >= ' + (this.y + this.cur_frame.height) + ' || ' + (block.y + block.cur_frame.height) + ' <= ' + (this.y) + ' DONNE ' + ((block.x >= this.x + this.cur_frame.width || block.x + block.cur_frame.width <= this.x || block.y >= this.y + this.cur_frame.height || block.y + block.cur_frame.height <= this.y)));

			if (block.x >= this.x + this.cur_frame.width + this.cur_frame.offset_x
				|| block.x + block.cur_frame.width + block.cur_frame.offset_x <= this.x
				|| block.y >= this.y + this.cur_frame.height + this.cur_frame.offset_y
				|| block.y + block.cur_frame.height + block.cur_frame.offset_y <= this.y
			) {
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
	}

	public move(x:number, y:number, blocks:any) {
		this.dirx = x == 0 ? 'no' : (x > 0 ? 'right' : 'left');
		this.diry = y == 0 ? 'no' : (y > 0 ? 'down' : 'up');

		this.x += x;
		this.y += y;

		this.collide(blocks);
	}

	public tp(x:number, y:number) {
		this.x = x;
		this.y = y;
	}

	public tp_to(entity:Entity) {
		this.x = entity.x;
		this.y = entity.y;
	}
}

class Ground extends Entity {
	constructor(x:number, y:number) {
		super(x, y, {
			solid: true
		});

		this.add_animation('base', [
			{ x: 0, y: 0, width: 16, height: 16 }
		], 0, false);

		this.play('base');
	}
}

class Weak extends Entity {
	constructor(x:number, y:number) {
		super(x, y, {
			solid: true
		});

		this.add_animation('base', [
			{ x: 0, y: 34, width: 16, height: 16 }
		], 0, false);

		this.play('base');
	}
}

class CarpetRight extends Entity {
	constructor(x:number, y:number, anim:string = 'middle') {
		super(x, y, {
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
}

class Jumper extends Entity {
	constructor(x:number, y:number) {
		super(x, y, {
			solid: true
		});

		this.add_animation('base', [
			{ x: 68, y: 0, width: 10, height: 14 },
			{ x: 79, y: 2, width: 10, height: 12, offset_y: 2 },
			{ x: 90, y: 4, width: 10, height: 10, offset_y: 4 }
		], 140, true);

		this.play('base');
	}
}

class Rope extends Entity {
	constructor(x:number, y:number, anim:string = 'middle') {
		super(x, y, {
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
}

class Cloud extends Entity {
	constructor(x:number, y:number, anim:string = 'middle') {
		super(x, y, {
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
}

class Ladder extends Entity {
	constructor(x:number, y:number) {
		super(x, y, {
			ladder: true
		});

		this.add_animation('base', [
			{ x: 0, y: 17, width: 14, height: 16 }
		], 220, true);

		this.play('base');
	}
}

class Player extends Entity {
	public speedx:number;
	public speedy:number;

	constructor(x:number, y:number) {
		super(x, y);

		this.speedx = 0;
		this.speedy = 0;

		this.add_animation('wait', [
			{ x: 68,  y: 15, width: 8, height: 8 }
		], 0, false);

		this.add_animation('move_left', [
			{ x: 68,  y: 15, width: 8, height: 8 },
			{ x: 86, y: 15, width: 8, height: 8 }
		], 100, true);

		this.add_animation('move_right', [
			{ x: 68,  y: 15, width: 8, height: 8 },
			{ x: 77,  y: 15, width: 8, height: 8 }
		], 100, true);

		this.add_animation('move_up', [
			{ x: 68,  y: 15, width: 8, height: 8 }
		], 100, true);

		this.add_animation('move_down', [
			{ x: 68,  y: 15, width: 8, height: 8 },
			{ x: 68,  y: 15, width: 8, height: 7, offset_y: 1 }
		], 100, true);

		this.play('wait');
	}
}
