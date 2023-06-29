import requests

# 模拟浏览器发送get请求
response = requests.get("https://www.baidu.com")
# 打印response对象类型
print(type(response))

# 打印响应题状态码
print(response.status_code)

# 打印url
print(response.url)

# 打印cookie的内容
print(response.cookies)

# 响应体的文本内容
print(response.text)
print(response.content.decode("utf-8"))
print(response.content.decode("gbk"))



# 如果返回的是json格式，将会把json转为字典
# print(response.json())

headers = {
    "user-agent": "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36"
}

response = requests.get("https://www.baidu.com", headers=headers)


data ={'name':'germey', 'age': 22 }

response = requests.post("http://httpbin.org/post", data=data)
print(response.text)
