import pymysql
from pprint import pprint

client = pymysql.connect(user='root', password='mysql', host='localhost', port=3306, database='leyou', charset='utf8', cursorclass=pymysql.cursors.DictCursor)
cursor = client.cursor()
sql = 'select * from tb_brand'
cursor.execute(sql)
result = cursor.fetchmany(2)
pprint(result)
cursor.close()
client.close()