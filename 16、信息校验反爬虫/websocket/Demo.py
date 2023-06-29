import asyncio
import logging
from datetime import datetime
from aiowebsocket.converses import AioWebSocket

async def startup(uri):
    async with AioWebSocket(uri) as aws:
        # 初始化 aiowebsocket 库的连接类
        converse = aws.manipulator
        # 设定需要向服务器发送的信息
        message = b'AioWebsocket - Async WebSocket Client'
        while True:
            await converse.send(message)
            print('{time}-Client send: {message}'.format(time=datetime.now().strftime('%Y-%m-%d %H:%M:%S'), message=message))
            mes = await converse.receive()
            print('{time}-Client receive: {rec}'.format(time=datetime.now().strftime('%Y-%m-%d %H:%M:%S'), rec=mes))


if __name__ == '__main__':
    # 设定远程服务器地址
    remote = 'wss://echo.websocket.org'
    try:
        asyncio.run(startup(remote))
    except KeyboardInterrupt:
        logging.info("Quit.")

