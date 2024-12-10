KEY_LEFT = 37;
KEY_UP = 38;
KEY_RIGHT = 39;
KEY_DOWN = 40;

KEY_ZERO = 48;
KEY_ONE = 49;
KEY_TWO = 50;
KEY_THREE = 51;
KEY_FOUR = 52;
KEY_FIVE = 53;
KEY_SIX = 54;
KEY_SEVEN = 55;
KEY_EIGHT = 56;
KEY_NINE = 57;

KEY_A = 65;
KEY_B = 66;
KEY_C = 67;
KEY_D = 68;
KEY_E = 69;
KEY_F = 70;
KEY_G = 71;
KEY_H = 72;
KEY_I = 73;
KEY_J = 74;
KEY_K = 75;
KEY_L = 76;
KEY_M = 77;
KEY_N = 78;
KEY_O = 79;
KEY_P = 80;
KEY_Q = 81;
KEY_R = 82;
KEY_S = 83;
KEY_T = 84;
KEY_U = 85;
KEY_V = 86;
KEY_W = 87;
KEY_X = 88;
KEY_Y = 89;
KEY_Z = 90;

speed = 2;
x = 50;
y = 50;

hello_circle = load_image('helloCircle.png');

on_create = func( script_app )
{
	// yay
};

on_update = func( script_app )
{
	if ( key_down(KEY_W) )
	{
		y = y - speed;
	}
	else
	{
		if ( key_down(KEY_S) )
		{
			y = y + speed;
		}
	}
	
	if ( key_down(KEY_A) )
	{
		x = x - speed;
	}
	else
	{
		if ( key_down(KEY_D) )
		{
			x = x + speed;
		}
	}
};

on_render = func( script_app )
{
	//draw_rect(x, y, 200, 200);
	
	draw_image(hello_circle, x, y);
};
