# -*- coding: utf-8 -*-
# @Author: gzxsp
# @Date:   2018-07-01 12:01:32
# @Last Modified by:   gzxsp
# @Last Modified time: 2018-07-01 12:05:40

import sys
import ssl
from urllib import request, parse


def get_token():
    client_id = "2eFPlSnLk9N1q64qYl0Y4cWk"
    client_secret = 'QGaMVMaIfIgC1fBO9lUdbCPDug27rUAo '
    host = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=%s&client_secret=%s' % (
        client_id, client_secret)
    req = request.Request(host)
    req.add_header('Content-Type', 'application/json; charset=UTF-8')
    response = request.urlopen(req)
    content = response.read()
    content = bytes.decode(content)
    content = eval(content[:-1])
    return content['access_token']


def imgdata(file1path, file2path):
    import base64
    f = open(r'%s' % file1path, 'rb')
    pic1 = base64.b64encode(f.read())
    f.close()
    f = open(r'%s' % file2path, 'rb')
    pic2 = base64.b64encode(f.read())
    f.close()
    params = {"images": str(pic1, 'utf-8') + ',' + str(pic2, 'utf-8')}
    return params


def img(file1path, file2path):
    token = get_token()
    url = 'https://aip.baidubce.com/rest/2.0/face/v2/match?access_token=' + token
    params = imgdata(file1path, file2path)
    data = parse.urlencode(params).encode('utf-8')
    req = request.Request(url, data=data)
    req.add_header('Content-Type', 'application/x-www-form-urlencoded')
    response = request.urlopen(req)
    content = response.read()
    content = bytes.decode(content)
    content = eval(content)
    score = content['result'][0]['score']
    if score > 80:
        return 'similarity:' + str(score) + ',same'
    else:
        return 'similarity:' + str(score) + ',different'


if __name__ == '__main__':
    file1path = 'trump1.jpg'
    file2path = 'trump3.jpg'
    res = img(file1path, file2path)
    print(res)
