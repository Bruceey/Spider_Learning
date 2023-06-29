from pprint import pprint
import requests

cookies = """QN42=tfin3591; Domain=.qunar.com; Expires=Wed, 26-May-2021 03:39:08 GMT; Path=/; _q=U.wanvnns8846; Domain=.qunar.com; Expires=Wed, 26-May-2021 03:39:08 GMT; Path=/; _t=27013179; Domain=.qunar.com; Expires=Wed, 26-May-2021 03:39:08 GMT; Path=/; csrfToken=wBYsadZdAtbOblZaOBXbwqsmZ8zgwHoY; Domain=.qunar.com; Expires=Wed, 26-May-2021 03:39:08 GMT; Path=/; _s=s_5WO2AVAFIYYGNL4IWCZYJYQRUE; Domain=.qunar.com; Expires=Wed, 26-May-2021 03:39:08 GMT; Path=/; _v=0YoSnLXTU0XuFn8isRjF-Xv17muGUQl_flt9BuOuCdNAm3YO2CilBO8hm0EntTvJLHL7QuIcXh0WKYh6L9TtcjyGMD8wfF2txGvku0LHgIoDohi4wmqMbbBhyWLRd8JGLF_pfuW5zDsHR492lUuHPmfC7vKdYgyP70H5Z-PxWqke;Path=/;Domain=.qunar.com;Expires=Wed, 26 May 2021 03:39:08 GMT;HTTPOnly; _vi=5gD4UpBiit0D1zTzUwjGTnfZYCYLGhIlaypk6Jv-pbPiXvW7YWfx-z_xLDRIN-4_UXAZehsxx82AUQtvbkvQ9yek1K9b6dod89Azd32wYVygNzBjCnTQtnWk2TG1_bOvbdMmF71jss8ZxLhlTts-e-YOvbt26sCBBod98A5h3GTx;Path=/;Domain=.qunar.com;Expires=Wed, 26 May 2021 03:39:08 GMT;HTTPOnly"""
cookies = {i.split('=')[0]: i.split('=')[1] for i in cookies.split("; ") if len(i.split('=')) > 1}
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.75 Safari/537.36",
}

url = 'https://flight.qunar.com/site/oneway_list.htm?searchDepartureAirport=%E5%8C%97%E4%BA%AC&searchArrivalAirport=%E6%AD%A6%E6%B1%89&searchDepartureTime=2021-02-26'
r = requests.get(url, headers=headers)
print(r.text)
