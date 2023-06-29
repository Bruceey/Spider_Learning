function _0x2f72f9() {
    for (var curr_time = Math['round'](new Date()['getTime']() / 1000)['toString'](), length = arguments['length'], array = new Array(length), i = 0x0; i < length; i++)
        array[i] = arguments[i];
    array['push'](curr_time);
    var _0x32d914 = _0x377012['SHA1'](array['join'](','))['toString'](_0x377012['' +
    'enc']['Hex'])
        , _0x829249 = [_0x32d914, curr_time]['join'](',')
        , _0x3ea520 = _0x14e69e['encode'](_0x829249);
    return _0x3ea520;
}

_0x4a3758 = function (a, b) {
    return b ? _0x3a8a3e(String(a))['replace'](/[+\/]/g, function (c) {
        return '+' == c ? '-' : '_';
    })['replace'](/=/g, '') : _0x3a8a3e(String(a));
}


