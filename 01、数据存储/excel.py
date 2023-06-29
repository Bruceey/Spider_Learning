import xlwt
import xlrd

f = xlwt.Workbook()
sheet = f.add_sheet('Python职位信息')
sheet.write(0, 0, "你好")
f.save('职位信息.xls')


dict1 = {'a': 1, 'b':2}
for key, val in enumerate(dict1):
    print(key, val)