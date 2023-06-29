import pymongo, pymysql
import os
from images360 import settings


def main():
    # 1、处理mongodb
    client = pymongo.MongoClient(settings.MONGO_URL)
    db = client[settings.MONGO_DB]
    db['images'].remove()
    client.close()

    # 2、处理mysql
    mysql_db = pymysql.connect(
        user=settings.MYSQL_USER,
        password=settings.MYSQL_PASSWORD,
        host=settings.MYSQL_HOST,
        port=settings.MYSQL_PORT,
        database=settings.MYSQL_DATABASE
    )
    cursor = mysql_db.cursor()
    sql = "delete from images"
    cursor.execute(sql)
    mysql_db.commit()
    cursor.close()
    mysql_db.close()

    # 3、删除照片
    target_dir = os.path.join(os.path.dirname(__file__), 'img')
    file_list = os.listdir(target_dir)
    os.chdir(target_dir)
    for file in file_list:
        os.remove(file)

if __name__ == '__main__':
    main()

