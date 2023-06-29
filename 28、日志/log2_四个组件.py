import logging

logger = logging.getLogger('applog')
logger.setLevel(logging.DEBUG)
# print(logger, type(logger), sep='\n')


# 处理器
consoleHandler = logging.StreamHandler()
consoleHandler.setLevel(logging.INFO)

fileHandler = logging.FileHandler(filename='addDemo.log')

# formatter格式
formatter = logging.Formatter("%(asctime)s|%(levelno)d|%(filename)s|%(lineno)d|%(message)s")

# 给处理器设置格式
consoleHandler.setFormatter(formatter)
fileHandler.setFormatter(formatter)

# 记录器设置处理器
logger.addHandler(consoleHandler)
logger.addHandler(fileHandler)

# 过滤器
flt = logging.Filter('cn.cccb')

logger.addFilter(flt )

# 日志打印
logger.debug("this is a debug log")
logger.info("this is a info log")
logger.warning("this is a warning log")
logger.error("this is a error log")
logger.critical("this is a critical log")