# lines=[]
# while True:
#     try:
#         lines.append(input())
#         if (input().strip() == 'q'):
#             break
#     except:
#         break
# print(lines)

import os

dir = os.path.join(os.path.dirname(__file__), "王小语")

print(dir)