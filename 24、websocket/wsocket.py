import aiowebsocket
import asyncio
import logging
from datetime import datetime
from aiowebsocket.converses import AioWebSocket


async def startup(uri):
    async with AioWebSocket(uri) as aws:
        converse = aws.manipulator
        message = '落红不是无情物，化作春泥更护花！'
        while True:
            # 发送信息
            await converse.send(message.encode('utf8'))
            print(f"{datetime.now().strftime('%Y-%m-%d %H:%M:%S')} -Client send: {message}")
            # 接收信息
            reply = await converse.receive()
            print(f"{datetime.now().strftime('%Y-%m-%d %H:%M:%S')} -Server receive: {reply.decode('utf8')}")

            await asyncio.sleep(1)


if __name__ == '__main__':
    remote = 'ws://echo.websocket.org/?encoding=text'
    try:
        asyncio.run(startup(remote))
    except KeyboardInterrupt:
        logging.info('Quit.')
