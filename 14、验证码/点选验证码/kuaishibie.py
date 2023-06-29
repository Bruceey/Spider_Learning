import base64
import json
import requests

def base64_api(uname, pwd,  img, typeid="21"):
    with open(img, 'rb') as f:
        base64_data = base64.b64encode(f.read())
        b64 = base64_data.decode()
    data = {"username": uname, "password": pwd, "image": b64, "typeid": typeid}
    result = json.loads(requests.post("http://api.ttshitu.com/imageXYPlus", json=data).text)
    if result['success']:
        return result["data"]["result"]
    else:
        return result["message"]