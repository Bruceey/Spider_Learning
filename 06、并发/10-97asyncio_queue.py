import asyncio

async def consumer(n, q: asyncio.Queue):
    print('consumer {}: starting'.format(n))
    while True:
        print('consumer {}: starting'.format(n))
        item = await q.get()
        print('consumer {}: has item {}'.format(n, item))
        if item is None:
            q.task_done()
            break
        else:
            await asyncio.sleep(0.01 * item)
            q.task_done()


async def producer(q: asyncio.Queue, num_workers):
    print('producer: starting')
    for i in range(num_workers * 3):
        await q.put(i)
        print('producer: added task {} to the queue'.format(i))
    # add None entries in the queue to signal the consumers to exit
    print('producer: add stop signals to the queue')
    for i in range(num_workers):
        await q.put(None)
    print('producer: waiting for queue to empty')
    # await q.join()
    print('producer: ending')


async def main(loop, num_consumers):
    q = asyncio.Queue(num_consumers)
    consumers = [
        loop.create_task(consumer(i, q)) for i in range(num_consumers)
    ]
    prod = loop.create_task(producer(q, num_consumers))
    await asyncio.wait(consumers + [prod])


event_loop = asyncio.get_event_loop()
try:
    event_loop.run_until_complete(main(event_loop, 2))
finally:
    event_loop.close()