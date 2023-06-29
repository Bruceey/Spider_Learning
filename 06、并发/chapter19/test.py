import math
from timethis import timethis


def is_prime(n: int) -> bool:
    if n <= 2:
        return False
    if n % 2 == 0:
        return False
    root = math.isqrt(n)
    for i in range(3, root + 1, 2):
        if n % i == 0:
            return False
    return True


@timethis
def main():
    r = is_prime(5_000_111_000_222_021)
    print(r)


if __name__ == '__main__':
    main()