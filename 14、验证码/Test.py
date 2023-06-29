# import torch
# x = torch.rand()

# dir = '/Users/wangrui/Downloads/pytorch_tutorial/视频'
# import os
# os.chdir(dir)
#
# files = os.listdir(dir)
# for file in files:
#
#     os.renames(file, file[file.rfind('-')+2:])

for i in range(5):
    print(f'before {i}')
    i += 1
    print(f'after {i}')