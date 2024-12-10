posA = vec2d();
posB = vec2d();

print(posA.x);
print(posA.y);
print('x: ' + (posA.x = 20));
print('y: ' + (posA.y = 30));
posB.x = 50;
posB.y = 30;

posC = posA + posB;
print('x: ' + posC.x);
print('y: ' + posC.y);
print('y: ' + (posC.y += 10));
print('y++: ' + posC.y++);
print('++y: ' + ++posC.y);
print('y--: ' + posC.y--);
print('--y: ' + --posC.y);
// example of calling
print('magnitude: ' + posC.magnitude());
