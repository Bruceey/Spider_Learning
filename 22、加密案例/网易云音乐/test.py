import execjs
import json

def getData(data):
    with open('wangyi.js') as f:
        js_code = f.read()
    ctx = execjs.compile(js_code)
    return ctx.call('getData', data)


s = "rid=R_SO_4_190072&threadId=R_SO_4_190072&pageNo=1&pageSize=20&cursor=-1&offset=0&orderType=1&csrf_token="
s = s.split('&')
json_obj = json.dumps({item.split('=')[0]: item.split('=')[1] for item in s})
# print(json_obj)

result = getData(json_obj)
print(result)