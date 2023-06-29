from concurrent.futures import ThreadPoolExecutor
from flags import save_flag, get_flag, main
from typing import List


def download_one(cc: str):
    image = get_flag(cc)
    save_flag(image, f'{cc}.gif')
    print(cc, end=' ', flush=True)
    return cc


def download_many(cc_list: List[str]) -> int:
    with ThreadPoolExecutor() as executor:
        res = executor.map(download_one, sorted(cc_list))
    return len(list(res))


if __name__ == '__main__':
    main(download_many)