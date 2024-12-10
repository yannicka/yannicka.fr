test = func( a )
{
	if ( a > 0 )
	{
		return 10;
	}
	return 15;
};

b = test(1);

print(b); // b = 10 would be correct

//////////////////////////////////

test = func( times )
{
	i = 0;
	while (true)
	{
		if ( i >= times )
		{
			return 10;
		}
		print(i);
		i = i + 1;
	}
	return 20; // should be unreachable
};

b = test(5);

print(b);
