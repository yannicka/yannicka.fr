
G.game.rgb_to_index = function(r, g, b) {
	return rgb_to_number(r, g, b);
};

function rgb_to_number(r, g, b) {
	var val = '', hexChars = '0123456789ABCDEF';

	val  = hexChars.charAt(r / 16) + hexChars.charAt(r % 16);
	val += hexChars.charAt(g / 16) + hexChars.charAt(g % 16);
	val += hexChars.charAt(b / 16) + hexChars.charAt(b % 16);

	val = parseInt(val, 16);

	return val;
}

function number_to_rgb(number) {
	return {
		r: number << 16,
		g: number << 8,
		b: number
	}
}

//alert(number_to_rgb('10').g);


// convert 0..255 R,G,B values to binary string
RGBToBin = function(r,g,b){
var bin = r << 16 | g << 8 | b;
return (function(h){
return new Array(25-h.length).join("0")+h
})(bin.toString(2))
}

// convert 0..255 R,G,B values to a hexidecimal color string
RGBToHex = function(r,g,b){
var bin = r << 16 | g << 8 | b;
return (function(h){
return new Array(7-h.length).join("0")+h
})(bin.toString(16).toUpperCase())
}

// convert a 24 bit binary color to 0..255 R,G,B
binToRGB = function(bin){
var pbin = parseInt(bin,2);
var r = pbin >> 16;
var g = pbin >> 8 & 0xFF;
var b = pbin & 0xFF;
return [r,g,b];
}

// convert a hexidecimal color string to 0..255 R,G,B
hexToRGB = function(hex){
var r = hex >> 16;
var g = hex >> 8 & 0xFF;
var b = hex & 0xFF;
return [r,g,b];
}

//alert(parseInt(RGBToHex(0, 1, 0), 16)); //--> 256
//alert(hexToRGB(256)); //--> 0,1,0

document.addEventListener('touchmove', function(event) {
    event.preventDefault();
    var touch = event.touches[0];
    console.log("Touch x:" + touch.pageX + ", y:" + touch.pageY);
}, false);
