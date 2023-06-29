from aiowebsocket.converses import AioWebSocket
import asyncio
import time
import requests
import json


def get_message():
    message1 = {
        "command": "RegisterInfo",
        "action": "Web",
        "ids": [],
        "UserInfo": {
            "Url": "live.611.com",
             "Version": "[%d]{\"chrome\":true,\"version\":\"86.0.4240.183\",\"webkit\":true}" % int(time.time() * 1000)
         }
    }
    message2 = {"command":"JoinGroup","action":"SoccerLiveOdd","ids":[]}
    message3 = {"command":"JoinGroup","action":"SoccerLive","ids":[]}
    return json.dumps(message1), json.dumps(message2), json.dumps(message3)

async def startup(url, token):
    # token = '82723c6ec8824e3c82f6ce7f9335d190'
    url += token
    async with AioWebSocket(url) as aws:
        converse = aws.manipulator
        message1, message2, message3 = get_message()
        await converse.send(message1)
        await converse.send(message2)
        await converse.send(message3)
        while True:
            result = await converse.receive()
            result = result.decode('utf8')
            print(result)

def getToken():
    """
    获取加密字符串，将其拼接到websocket协议的url上
    :return: token
    """
    url = "https://live.611.com/Live/GetToken"
    response = requests.get(url)
    if response.status_code == 200:
        data = json.loads(response.text)
        token = data["Data"]
        return token
    else:
        print("请求错误")


if __name__ == '__main__':
    url = 'wss://push.611.com:6119/'
    token = getToken()  # 获取token字符串
    asyncio.run(startup(url, token))
