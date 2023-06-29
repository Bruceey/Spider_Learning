import asyncio

async def coroutine():
    print('in coroutine')
    return 'result'

event_loop = asyncio.get_event_loop()
try:
    print('start coroutine')
    coro = coroutine()
    print('entering event loop')
    return_value = event_loop.run_until_complete(coro)
    print('it returned: {!r}'.format(return_value))
finally:
    print('closing event loop')
    event_loop.close()