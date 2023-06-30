import docx
import os
from datetime import date
import re

# filename = os.path.dirname(__file__) + '/automate_online-materials/' + 'demo.docx'
# doc = docx.Document(filename)

# value = "3/1"
# now = date(2020, int(value[2]), int(value[0]))
# print(now)
# print(date.today())


dir = "/Users/wangrui/Desktop/爬虫/教程"
os.chdir(dir)
files = os.listdir()
for file in files:
    file_new = re.search(r"第\d{2}讲.+", file)
    if (file_new != None):
        os.rename(file, file_new.group())