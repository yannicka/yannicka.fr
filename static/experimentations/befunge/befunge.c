#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <time.h>
 
#define INIT_STACK_LEN 512
 
#define DIR_RIGHT 0
#define DIR_LEFT  1
#define DIR_UP    2
#define DIR_DOWN  3
 
uint32_t ip = 0;
uint8_t cur_dir = DIR_RIGHT;
uint8_t code[25][80];
uint32_t stack_idx = 0;
uint32_t stack_curlen = 0;
int32_t *stack = NULL;
 
void (*opcode_funcs[256])(void);
 
static void push(int32_t n) {
	  if(stack_idx >= stack_curlen) {
			  uint32_t stack_newlen = stack_curlen << 1;
			  stack = realloc(stack, stack_newlen);
			  if(!stack) {
					  printf("FATAL: Stack allocation failed.\n");
					  exit(1);
			  }
			  memset(stack+stack_curlen, '\0', stack_curlen);
			  stack_curlen = stack_newlen;
	  }
 
	  stack[stack_idx++] = n;
}
 
static int32_t pop(void) {
	  int32_t n;
	  if(!stack_idx)
			  return 0;
	  n = stack[--stack_idx];
	  stack[stack_idx] = 0;
 
	  return n;
}
 
static void incr_ip(void) {
	  switch(cur_dir) {
			  case DIR_RIGHT:
					  if(ip % 80 == 79) ip -= 79;
					  else ip++;
					  break;
					 
			  case DIR_LEFT:
					  if(ip % 80 == 0) ip += 79;
					  else ip--;
					  break;
					 
			  case DIR_UP:
					  if(ip / 80 == 0) ip += 24 * 80;
					  else ip -= 80;
					  break;
					 
			  case DIR_DOWN:
					  if(ip / 80 == 24) ip -= 24 * 80;
					  else ip += 80;
					  break;
					 
			  default:
					  printf("FATAL: Invalid direction.\n");
					  exit(1);
	  }
}
 
static void inval_opcode(void) {
	  printf("FATAL: Invalid opcode \'%c\' at (%d,%d).\n", ((char *)code)[ip], ip % 80, ip / 80);
	  exit(1);
}
 
static void push_0(void) {
	  push(0);
}
static void push_1(void) {
	  push(1);
}
static void push_2(void) {
	  push(2);
}
static void push_3(void) {
	  push(3);
}
static void push_4(void) {
	  push(4);
}
static void push_5(void) {
	  push(5);
}
static void push_6(void) {
	  push(6);
}
static void push_7(void) {
	  push(7);
}
static void push_8(void) {
	  push(8);
}
static void push_9(void) {
	  push(9);
}
 
static void add(void) {
	  push(pop() + pop());
}
static void sub(void) {
	  int32_t a, b;
	  a = pop();
	  b = pop();
	  push(b-a);
}
static void mul(void) {
	   push(pop() * pop());
}
static void divide(void) {
	  int32_t a, b;
	  a = pop();
	  b = pop();
	  if(!a) {
			  printf("FATAL: Div by 0 at (%d,%d).\n", ip % 80, ip / 80);
			  exit(1);
	  }
	  push(b/a);
}
static void mod(void) {
	  int32_t a, b;
	  a = pop();
	  b = pop();
	  if(!a) {
			  printf("FATAL: Div by 0 at (%d,%d).\n", ip % 80, ip / 80);
			  exit(1);
	  }
	  push(b%a);
}
static void neg(void) {
	  push(pop() ? 0 : 1);
}
static void greater(void) {
	  int32_t a, b;
	  a = pop();
	  b = pop();
	  push((b>a) ? 1 : 0);
}
 
static void right(void) {
	  cur_dir = DIR_RIGHT;
}
static void left(void) {
	  cur_dir = DIR_LEFT;
}
static void up(void) {
	  cur_dir = DIR_UP;
}
static void down(void) {
	  cur_dir = DIR_DOWN;
}
static void random(void) {
	  cur_dir = (uint8_t)(((float)rand() / (float)RAND_MAX) * 4.);
	  if(cur_dir == 4) cur_dir = 3;
}
static void right_left(void) {
	  cur_dir = (pop() == 0) ? DIR_RIGHT : DIR_LEFT;
}
static void down_up(void) {
	  cur_dir = (pop() == 0) ? DIR_DOWN : DIR_UP;
}
 
static void push_ascii(void) {
	  incr_ip();
	  while(((char *)code)[ip] != '"') {
			  push(((char *)code)[ip]);
			  incr_ip();
	  }
}
static void dup(void) {
	  int32_t a;
	  a = pop();
	  push(a);
	  push(a);
}
static void xchg(void) {
	  int32_t a, b;
	  a = pop();
	  b = pop();
	  push(a);
	  push(b);
}
static void pop_(void) {
	  pop();
}
 
static void disp_int(void) {
	  printf("%d", pop());
}
static void disp_ascii(void) {
	  printf("%c", pop());
}
 
static void trampoline(void) {
	  incr_ip();
}
 
static void set_code(void) {
	  int32_t x, y, c;
	  y = pop();
	  x = pop();
	  c = pop();
	  code[y][x] = c;
}
static void get_code(void) {
	  int32_t x, y;
	  y = pop();
	  x = pop();
	  push(code[y][x]);
}
 
static void ask_int(void) {
	  int32_t n;
	  scanf("%d\n", &n);
	  push(n);
}
static void ask_ascii(void) {
	  char c;
	  scanf("%c\n", &c);
	  push(c);
}
 
static void leave(void) {
	  exit(0);
}
 
static void ignore(void) {
}
 
void init_stack(void)
{
	  stack_curlen = INIT_STACK_LEN;
	  stack = malloc(stack_curlen);
	  if(!stack) {
			  printf("FATAL: Stack allocation failed.\n");
			  exit(1);
	  }
	  memset(stack, '\0', stack_curlen);
}
 
void init_func_pointers(void)
{
	  for(int i=0; i<255; i++)
			  opcode_funcs[i] = inval_opcode;
 
	  opcode_funcs['0'] = push_0;
	  opcode_funcs['1'] = push_1;
	  opcode_funcs['2'] = push_2;
	  opcode_funcs['3'] = push_3;
	  opcode_funcs['4'] = push_4;
	  opcode_funcs['5'] = push_5;
	  opcode_funcs['6'] = push_6;
	  opcode_funcs['7'] = push_7;
	  opcode_funcs['8'] = push_8;
	  opcode_funcs['9'] = push_9;
 
	  opcode_funcs['+'] = add;
	  opcode_funcs['-'] = sub;
	  opcode_funcs['*'] = mul;
	  opcode_funcs['/'] = divide;
	  opcode_funcs['%'] = mod;
	  opcode_funcs['!'] = neg;
	  opcode_funcs['`'] = greater;
 
	  opcode_funcs['>'] = right;
	  opcode_funcs['<'] = left;
	  opcode_funcs['^'] = up;
	  opcode_funcs['v'] = down;
	  opcode_funcs['?'] = random;
	  opcode_funcs['_'] = right_left;
	  opcode_funcs['|'] = down_up;
	 
	  opcode_funcs['"'] = push_ascii;
	  opcode_funcs[':'] = dup;
	  opcode_funcs['\\'] = xchg;
	  opcode_funcs['$'] = pop_;
	 
	  opcode_funcs['.'] = disp_int;
	  opcode_funcs[','] = disp_ascii;
	 
	  opcode_funcs['#'] = trampoline;
	 
	  opcode_funcs['p'] = set_code;
	  opcode_funcs['g'] = get_code;
	 
	  opcode_funcs['&'] = ask_int;
	  opcode_funcs['~'] = ask_ascii;
	 
	  opcode_funcs['@'] = leave;
	 
	  opcode_funcs[' '] = ignore;
}
 
int main(int argc, char **argv)
{
	  FILE *fp = NULL;
	  int result;
	  static uint8_t line[82];
 
	  if(argc != 2)
			  return 1;
 
	  fp = fopen(argv[1], "r");
	  if(!fp)
			  return 1;
	 
	  memset(code, ' ', sizeof(code));
	 
	  result = 1;
	  for(int i=0; i<25 && result; i++) {
			  result = fgets(line, sizeof(line), fp) ? 1 : 0;
			  if(result)
					  memcpy(code[i], line, strlen(line) - (feof(fp) ? 0 : 1));
	  }
 
	  srand(time(NULL));
	 
	  init_stack();
	  init_func_pointers();
 
	  while(1) {
			  opcode_funcs[((uint8_t *)code)[ip]]();
			  incr_ip();
	  }
}
