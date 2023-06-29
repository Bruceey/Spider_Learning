# -*- coding: utf-8 -*-
"""
-------------------------------------------------
   File Name：     six
   Description :
   Author :        JHao
   date：          2020/6/22
-------------------------------------------------
   Change Activity:
                   2020/6/22:
-------------------------------------------------
"""
__author__ = 'JHao'

import sys

PY2 = sys.version_info[0] == 2
PY3 = sys.version_info[0] == 3

if PY3:
    def iteritems(d, **kw):
        return iter(d.items(**kw))
else:
    def iteritems(d, **kw):
        return d.iteritems(**kw)

if PY3:
    from urllib.parse import urlparse
else:
    from urlparse import urlparse

if PY3:
    from imp import reload as reload_six
else:
    reload_six = reload

if PY3:
    from queue import Empty, Queue
else:
    from Queue import Empty, Queue


def withMetaclass(meta, *bases):
    """Create a base class with a metaclass."""

    # This requires a bit of explanation: the basic idea is to make a dummy
    # metaclass for one level of class instantiation that replaces itself with
    # the actual metaclass.
    # class MetaClass(meta):
    #
    #     def __new__(cls, classname, supers, attrdict):
    #         return meta(classname, bases, attrdict)

    # return type.__new__(MetaClass, 'temporary_class', (), {})
    return meta('temporary_class', bases, {})


if __name__ == '__main__':
    from util.singleton import Singleton
    clazz = withMetaclass(Singleton)
    clazz2 = withMetaclass(Singleton)
    instance1 = clazz()
    instance2 = clazz2()
    print(instance1 is instance2)
    # print(id(clazz))
    # print(id(clazz2))
    # print(clazz is clazz2)

    # a = type('A', (), {})
    # b = type('A', (), {})
    # print(a is b)