class Particle
	constructor: (x = 0, y = 0, vx = 0, vy = 0) ->
		@x = x
		@y = y
		@vx = vx
		@vy = vy

		@update = (vx = 0, vy = 0) ->
			@x += @vx + vx
			@y += @vy + vy

class ParticleSystem
	constructor: (container, center = { x: 0, y: 0 }, count = 0) ->
		i = 0
		c = container
		 
		@particles = []
		 
		@center =
			x: center.x
			y: center.y
		 
		for i in [ 0 .. count ]
			x = @center.x,
			y = @center.y,
			vx = Math.random() * 3 - 1.5,
			vy = Math.random() * 3 - 1.5;
			 
			@particles.push(new Particle(x, y, vx, vy));
	}
	 
	@update = function() {
	for ( i = 0 ; i < count ; ++i ) {
	 
	// We don't want to process particles that
	// we can't see anymore
	if (@particles[i].x > 0 &&
	@particles[i].x < container.width &&
	@particles[i].y > 0 &&
	@particles[i].y < container.height) {
	 
	@particles[i].update();
	 
	c.fillRect(@particles[i].x, @particles[i].y, 5, 5);
	} else {
	@particles[i].x = @center.x;
	@particles[i].y = @center.y;
	}
	}
	};
	};
	 
	 
	// shim layer with setTimeout fallback by Paul Irish
	// Used as an efficient and browser-friendly
	// replacement for setTimeout or setInterval
	window.requestAnimFrame = (function(){
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function (callback) {
	window.setTimeout(callback, 1000 / 60);
	};
	})();
	 
	// Call the init() function on load
	document.addEventListener('DOMContentLoaded', init);
	 
	function init() {
	// Get a reference to the canvas object in the HTML
	var cobj = document.getElementsByTagName('canvas')[0],
	c = cobj.getContext('2d'),
	p = null;
	 
	// Make the canvas have the same size as
	// the browser window
	cobj.width = document.body.clientWidth;
	cobj.height = document.body.clientHeight;
	 
	// Set the colour to white
	c.fillStyle = '#FFFFFF';
	 
	p = new ParticleSystem(cobj, { x: cobj.width/2, y: cobj.height/2 }, 1000);
	 
	// Call the paint method
	paint();
	 
	function paint() {
	c.clearRect(0, 0, cobj.width, cobj.height);
	 
	p.update();
	 
	// Call paint() again, recursively
	requestAnimFrame(paint);
	}
}
})();