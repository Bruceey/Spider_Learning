import logging

# 使用baseConfig()指定日志输出级别`level`
# `filename`指定输出文件，默认追加，可用`filemode=w`来改变，
# logging.basicConfig(filename='demo.log', filemode='w', level=logging.DEBUG)
# logging.debug("this is a debug log")
# logging.info("this is a info log")
# logging.warning("this is a warning log")
# logging.error("this is a error log")
# logging.critical("this is a critical log")

# `format`指定输出格式, asctime可以指定时间的输出格式，`datefmt`="%Y-%m-%d %H:%M:%S"
logging.basicConfig(format="%(asctime)s|%(levelno)d|%(filename)s|%(funcName)s|%(lineno)d|%(message)s", datefmt="%Y-%m-%d %H:%M:%S", level=logging.DEBUG)


def get_log():
    logging.debug("this is a debug log")
    logging.info("this is a info log")

if __name__ == '__main__':
    get_log()