import re


s = "ff我发来发链\n接啊ffdddd1234ddd"

result = re.match(r"(ff).+\1", s, re.S)
print(type(result))
print(result.group())


# s2 = "aaa111bbbccc111"
# r = re.match(".+?\d+", s2)
# print(r.group())

# s3 = "aAa111bbbccc111"
# r = re.match("[a-z]+?\d+", s3, re.I)
# print(r.group())

# s='Python:Java:C'
# print(re.sub(r'\w+', 'php', s) )