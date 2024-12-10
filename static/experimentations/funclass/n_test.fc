atest = func(a){
	print('A Test Passed');
};

btest = func(b){
	while(b < 5){
		b = 1 + b;
		print(b * 3 + 1);
	}
	if (b > 4)
	{
		print('B Test Passed');
	}
};

ctest = func(c)
{
	if(c != 0)
	{
		print('C Test Passed');
	}
};

dtest = func(str_a, str_b)
{
	if(str_a == str_b)
	{
		print('D Test Failed!');
	}
	else
	{
		if(str_a == "Hello")
		{
			print('D Test Passed');
		}
	}
};

get_file_name = func()
{
	return 'n_test.mc';
};

hello_str = 'Hello!';
fsize_str = 'n_test file size is "' + file_size('n_test.mc') + '"';
abc_str = 'a' + 'b' + 'c';
ott_str = 1 + 2 + 3 + 4;
ottm_str = 3 - 2 - 1 - 0;

atest('Hello');
btest(0);
ctest(1);
dtest('Hello', hello_str);
print("\"If in quotes, F Test Passed\"");
print('n_test file size is "' + file_size(get_file_name()) + '"');
print(fsize_str);
print(abc_str);
print(ott_str);
print(ottm_str);
