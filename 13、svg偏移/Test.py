import bisect

a = [1, 2, 3, 4, 5, 6]
print(a)
print(repr(a))
print(bisect.bisect(a, 4))

s1 = 'deewdAAD孩子啊'
print(s1, len(s1))
s2 = 'deewdAAD孩子\u554a'
print(s2, len(s2))
print(s2 == s1)
