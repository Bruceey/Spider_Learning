# import logging

# logger = logging.getLogger(__name__)
# print()

import os
print(os.path.realpath('.'))

for dirpath, subdirs, filenames in os.walk("."):
    for filename in filenames:
        filepath = os.path.join(dirpath, filename)
        if os.path.getsize(filepath) == 0:
            print(filepath)