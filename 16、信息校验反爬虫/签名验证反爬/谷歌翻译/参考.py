# https://blog.csdn.net/qq_36251201/article/details/100326067

import requests
import urllib.parse
import json
import sys
import execjs  # 可通过pip install PyExecJS安装，用来执行js脚本


class Py4Js():
    def __init__(self):
        self.ctx = execjs.compile(""" 
          xo=function(a,b){
      	  for(var c=0;c<b.length-2;c+=3)
      		{var d=b.charAt(c+2);d="a"<=d?d.charCodeAt(0)-87:Number(d);d="+"==b.charAt(c+1)?a>>>d:a<<d;a="+"==b.charAt(c)?a+d&4294967295:a^d}return a}

      	  function TL(a){
       		var wo=function(a){return function(){return a}}
      		b=wo(String.fromCharCode(84));
      		var c=wo(String.fromCharCode(75));
      		b=[b(),b()];b[1]=c();
      		b="750.0";
      		var d=wo(String.fromCharCode(116));
  			c=wo(String.fromCharCode(107));
  			d=[d(),d()];
  			c="&"+d.join("")+ "=";
    		d=b.split(".");
   			b=6;
    		for(var e=[],f=0,g=0;g<a.length;g++)
	   	 		{var k=a.charCodeAt(g);128>k?e[f++]=k:(2048>k?e[f++]=k>>6|192:(55296==(k&64512)&&g+1<a.length&&56320==(a.charCodeAt(g+1)&64512)?(k=65536+((k&1023)<<10)+(a.charCodeAt(++g)&1023),e[f++]=k>>18|240,e[f++]=k>>12&63|128):e[f++]=k>>12|224,e[f++]=k>>6&63|128),e[f++]=k&63|128)}a=b;for(f=0;f<e.length;f++)a+=e[f],a=xo(a,"+-a^+6");a=xo(a,"+-3^+b+-f");a^=Number(d[1])||0;0>a&&(a=(a&2147483647)+2147483648);a%=1E6;
      			return c+(a.toString()+"."+ (a^b))}
        """)

    def getTk(self, text):
        return self.ctx.call("TL", text)


def buildUrl(text, tk):
    baseUrl = "https://translate.google.cn/translate_a/single?client=webapp&sl=zh-CN&tl=en&hl=zh-CN&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&swap=1&otf=2&ssel=5&tsel=5&kc=1&"
    baseUrl += 'tk=' + str(tk) + '&'
    baseUrl += 'q=' + urllib.parse.quote(text)
    print(baseUrl)
    return baseUrl


def translate(js, text):
    header = {
        'cookie': 'NID=188=Nx_B7MPjOKKUBKu4LByiqdUEwcO4goXhVKB0vtqhvJycCD3TIPTgA7HU80AQ4LJXfrAjV8gvawvSDMKgS52MkV3JB44kgzNq9aHp41EuL8-2Cns1re4xCgQvPr1jMI9JPZxFU9fdHtymXto3qCv64HVBIkQ8vfBRMxKeZl0XS4g',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64)  AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36'
    }
    url = buildUrl(text, js.getTk(text))
    res = ''
    try:
        r = requests.get(url)
        result = json.loads(r.content.decode("utf-8"))
        res = result[0][0][0]
    except Exception as e:
        res = ''
        print(url)
        print("翻译失败:" + text)
        print(e)
    finally:
        return res


if __name__ == '__main__':
    text = "美女"
    js = Py4Js()
    res = translate(js, text)
    print(res)

