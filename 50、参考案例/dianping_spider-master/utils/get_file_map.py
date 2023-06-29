import json


def get_map(filename='font_map.json'):
    with open(filename, 'r', encoding='utf-8') as f:
        key_map = json.load(f)
    return key_map


if __name__ == '__main__':
    get_map()
