+++
title = "Nombre palindrome le plus grand"
date = 2021-07-12
author = "Aur36"
+++

## Énoncé

Un nombre palindrome est un nombre qui se lit de la même façon dans les deux
sens. Le plus grand nombre palindrome obtenu à partir du produit de deux nombres
à deux chiffres est 9009 = 91 × 99.

Trouvez le nombre palindrome le plus grand avec le produit de deux nombres à
trois chiffres.

## Travaux réalisés

### Mon code (Zig)

```zig
const std = @import("std");

const Palindrome = struct {
    i: usize = 0,
    j: usize = 0,
    result: usize = 0,

    pub fn init(i: usize, j: usize, result: usize) Palindrome {
        return Palindrome {
            .i = i,
            .j = j,
            .result = result,
        };
    }
};

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();

    var pal = Palindrome {};

    var i: usize = 100;

    while (i <= 999) {
        var j: usize = 100;

        while (j <= 999) {
            const result = i * j;
            const is_pal = is_palindrome(result);

            if (is_pal and result > pal.result) {
                pal = Palindrome.init(i, j, result);
            }

            j += 1;
        }

        i += 1;
    }

    try stdout.print("{d}\n", .{pal});
}

// @see https://www.educative.io/edpresso/how-to-check-if-a-number-is-palindrome
//
// @todo Traiter le cas de « 0 » correctement.
pub fn is_palindrome(givenNumber: usize) bool {
    var copyNumber: usize = givenNumber;
    var currentDigit: usize = 0;
    var reversedNumber: usize = 0;

    while (copyNumber != 0) {
        currentDigit = copyNumber % 10;
        reversedNumber = (reversedNumber * 10) + currentDigit;
        copyNumber = copyNumber / 10;
    }

    if (givenNumber == reversedNumber) {
        return true;
    } else {
        return false;
    }
}
```

### Mon code (Nim)

```nim
type
    Palindrome = tuple
        i: int
        j: int
        result: int

proc is_palindrome(given_number: int): bool =
    var copy_number = given_number
    var current_digit = 0
    var reversed_number = 0

    while copy_number != 0:
        current_digit = copy_number %% 10
        reversed_number = (reversed_number * 10) + current_digit;
        copy_number = int(copy_number / 10)

    return given_number == reversed_number

proc get_max_pal(): Palindrome =
    var pal: Palindrome = (i: 0, j: 0, result: 0)

    var i = 100

    while i <= 999:
        var j = 100

        while j <= 999:
            var result = i * j
            var is_pal = is_palindrome(result)

            if is_pal and result > pal.result:
                pal = (i: i, j: j, result: result)

            j += 1

        i += 1

    return pal

const
    max_pal = get_max_pal()

echo max_pal
```
