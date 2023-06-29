import configparser

config = configparser.ConfigParser()  # 实例化对象
config.read('example.ini')  # 读取配置文件
print(config.sections())  # 观察含有哪些section
print(config.get('DEFAULT', 'ServerAliveInterval'))

config_raw = configparser.RawConfigParser()
config_raw.read('example.ini')
print(config_raw.get('DEFAULT', 'ServerAliveInterval'))