import execjs

with open('func_e.js') as f:
    js_code = f.read()

ctx = execjs.compile(js_code)
result = ctx.call("e", '美', '320305.131321201')
print(result)