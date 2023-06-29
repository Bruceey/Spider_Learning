from pymongo import MongoClient

client = MongoClient(host='localhost', port=27017)
db = client.Lianjia
collection = db.zufang7
result = collection.find_one({'resblock_name': '37度公寓'})
print(result)
client.close()

