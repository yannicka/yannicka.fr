// Pour smartphones ?
document.addEventListener('touchmove', function(event) {
    event.preventDefault();
    var touch = event.touches[0];
    console.log("Touch x:" + touch.pageX + ", y:" + touch.pageY);
}, false);

var ontouchstart = function() {
	alert('ok');
};

var touchend = function() {

};

var touchleave = function() {

};

var touchmove = function() {

};

window.touchstart = ontouchstart;
window.touchend = touchend;
window.touchleave = touchleave;
window.touchmove = touchmove;
