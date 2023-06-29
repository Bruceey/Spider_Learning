from apscheduler.schedulers.blocking import BlockingScheduler
from datetime import datetime


def my_clock():
    print("Hello! The time is: %s" % datetime.now())


if __name__ == '__main__':
    scheduler = BlockingScheduler()
    scheduler.add_job(my_clock, "interval", seconds=3)
    scheduler.start()