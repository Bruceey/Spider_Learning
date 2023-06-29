import requests
from urllib.parse import quote
from pprint import pprint

lua = """
function main(splash, args)
    local treat = require("treat")
    local response = splash:http_get("http://httpbin.org/get")
    return {
        html=treat.as_string(response.body),
        url=response.url,
        status=response.status
    }
end
"""

url = "http://localhost:8050/execute?lua_source=" + quote(lua)
r = requests.get(url)
pprint(r.text)