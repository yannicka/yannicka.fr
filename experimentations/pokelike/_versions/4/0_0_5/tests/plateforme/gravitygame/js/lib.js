/* Boucle de jeu */
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame    || window.webkitRequestAnimationFrame ||
		   window.mozRequestAnimationFrame || window.oRequestAnimationFrame      ||
		   window.msRequestAnimationFrame  || function(callback) { window.setTimeout(callback, 1000 / 60); };
})();

/* Contrôle du clavier */
var Key = {
	keys: [], lasts: [], Q: 81, LEFT: 37, UP: 38, Z: 90, SPACE: 32, D: 68, RIGHT: 39, S: 83, DOWN: 40, ENTER: 13, ESC: 27, P: 80,
	up: function(k)      { return !Key.keys[k]; }, down: function(k) { return Key.keys[k]; },
	press: function(k)   { var v = Key.keys[k]; Key.keys[k] = false; return v; },
	release: function(k) { var lasts = Key.lasts, last = lasts[lasts.indexOf(k)];
		if (typeof last != 'undefined') { lasts.splice(lasts.indexOf(k), 1); } return last == k; }
};

document.onkeyup   = function(e) { Key.lasts.push(e.keyCode); Key.keys[e.keyCode] = false; };
document.onkeydown = function(e) { Key.keys[e.keyCode] = true; };

/* Contrôle de la souris */
var Mouse = {
	x: -1, y: -1, click: false, onclick: false,
	up: function()    { return !Mouse.click; }, down: function() { return Mouse.click; },
	press: function() { /* todo */ }, release: function() { var onclick = Mouse.onclick; Mouse.onclick = false; return onclick; }
};

document.onmousedown = function(e) { Mouse.click = true; };
document.onmouseup   = function(e) { Mouse.onclick = true; Mouse.click = false; };
document.onmousemove = function(e) { Mouse.x = e.pageX - can.offsetLeft; Mouse.y = e.pageY - can.offsetTop; };

/* Fonctions mathématiques utiles */
Math.clamp = function(val, min, max) { return Math.max(min, Math.min(max, val)); };
Math.rand  = function(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; };

/* Permet de remplacer un caractère dans une chaîne */
function remplace(str, pos, char) { return str.substring(0, pos - 1) + char + str.substring(pos); }
