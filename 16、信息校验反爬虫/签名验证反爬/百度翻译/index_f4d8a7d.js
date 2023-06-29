;define("translation:widget/translate/appGuide/appGuide", function(i, e, a) {
    "use strict";
    var n = i("translation:widget/common/cookie")
      , t = $(".app-guide")
      , p = window.appVersion
      , d = {
        curIdx: 0,
        swiperTimer: null,
        init: function() {
            if (!/baiduinput/gi.test(window.navigator.userAgent)) {
                var i = n.getCookie(p);
                if (i)
                    return void n.setCookie(p, "1", {
                        expires: 5184e6
                    });
                _hmt.push(["_trackEvent", "首页", "首页app导流浮层展现量"]),
                t.removeClass("app-guide-hide"),
                n.setCookie(p, "1", {
                    expires: 5184e6
                }),
                this.swipe(),
                this.bindEvent()
            }
        },
        swipe: function() {
            var i = this
              , e = $(".app-guide-main-left-img")
              , a = e.length;
            if (!(1 >= a)) {
                var n = $(".app-guide-main-left-pagination-index");
                this.swiperTimer = setInterval(function() {
                    i.curIdx = (i.curIdx + 1) % a,
                    e.removeClass("app-guide-main-left-img-active"),
                    $(e[i.curIdx]).addClass("app-guide-main-left-img-active"),
                    n.removeClass("app-guide-main-left-pagination-index-active"),
                    $(n[i.curIdx]).addClass("app-guide-main-left-pagination-index-active")
                }, 3e3)
            }
        },
        clearSwipeTimer: function() {
            this.swiperTimer && (clearInterval(this.swiperTimer),
            this.swiperTimer = null)
        },
        bindEvent: function() {
            var i = this;
            $(".app-guide-close").on("click", function() {
                i.clearSwipeTimer(),
                t.addClass("app-guide-hide")
            });
            var e = this;
            $(".app-guide-main-left-pagination-index").on("click", function() {
                e.clearSwipeTimer();
                var i = $(this).index();
                e.curIdx = i;
                var a = $(".app-guide-main-left-img");
                a.removeClass("app-guide-main-left-img-active"),
                $(a[e.curIdx]).addClass("app-guide-main-left-img-active"),
                $(".app-guide-main-left-pagination-index").removeClass("app-guide-main-left-pagination-index-active"),
                $(this).addClass("app-guide-main-left-pagination-index-active"),
                e.swipe()
            })
        }
    };
    $(function() {
        d.init()
    }),
    a.exports = d
});
;define("translation:widget/translate/common/Drag", function(t, s, o) {
    "use strict";
    var e = function(t, s) {
        this.isDrag = !1,
        this.dragId = t,
        this.startClientX = 0,
        this.startClientY = 0,
        this.moveId = s.moveId || t,
        this.init()
    };
    e.prototype.init = function() {
        $(this.moveId).css({
            cursor: "move"
        }),
        this.bindEvent()
    }
    ,
    e.prototype.bindEvent = function() {
        $(this.moveId).on("mousedown", $.proxy(this.moveIdIsMousedown, this)),
        $(document).on("mouseup", $.proxy(this.documentIsMouseup, this))
    }
    ,
    e.prototype.moveIdIsMousedown = function(t) {
        this.isDrag = !0,
        this.startClientX = t.pageX - $(this.dragId).offset().left,
        this.startClientY = t.pageY - $(this.dragId).offset().top,
        $(document).on("mousemove", $.proxy(this.documentIsMousemove, this))
    }
    ,
    e.prototype.documentIsMousemove = function(t) {
        if (this.isDrag) {
            {
                var s = t.pageX - this.startClientX
                  , o = t.pageY - this.startClientY
                  , e = $(window).width() - $(this.dragId).outerWidth();
                $(window).height() - $(this.dragId).outerHeight()
            }
            s = 0 > s ? 0 : s,
            s = s > e ? e : s,
            o = 0 > o ? 0 : o,
            $(this.dragId).css({
                left: s,
                top: o
            }),
            $("*").addClass("unselectable")
        }
    }
    ,
    e.prototype.documentIsMouseup = function() {
        this.isDrag = !1,
        $(document).off("mousemove"),
        $("*").removeClass("unselectable")
    }
    ,
    o.exports = e
});
;define("translation:widget/translate/common/hash", function(t, n, e) {
    "use strict";
    function o(t) {
        return void 0 !== s[t]
    }
    function i(t) {
        return "string" == typeof t && t.length > 0 && t.length <= l.MAX_URL_COUNT
    }
    function r(t) {
        t && t.length > l.MAX_URL_COUNT && a.set("isInRtTransState", !1)
    }
    var a = t("translation:widget/common/environment")
      , l = t("translation:widget/common/config/trans")
      , s = t("translation:widget/common/config/langMap")
      , c = {};
    c.set = function(t, n, e) {
        e = encodeURIComponent(e);
        var l, s = o(t), f = o(n), h = i(e);
        if (r(e),
        s && f && h)
            l = [t + "/", n + "/", e];
        else if (s && f)
            l = [t + "/", n + "/"];
        else {
            if (!s)
                return void c.empty();
            l = [t + "/"]
        }
        location.hash === "#" + l.join("") && a.set("isInRtTransState", !1),
        location.hash = l.join("")
    }
    ,
    c.get = function() {
        var t, n, e = location.hash;
        try {
            e = decodeURIComponent(e)
        } catch (o) {}
        if (e = e.replace(/^\#/, ""),
        e.indexOf("/") > 0)
            t = e.split("/"),
            n = t.length > 3 ? {
                from: t[0],
                to: t[1],
                query: t.splice(0, 2) && t.join("/")
            } : 3 === t.length ? {
                from: t[0],
                to: t[1],
                query: t[2]
            } : 2 === t.length ? {
                from: t[0],
                to: t[1],
                query: ""
            } : 1 === t.length ? {
                from: t[0],
                to: "",
                query: ""
            } : !1;
        else if (t = e.split("|"),
        2 === t.length) {
            var i = t[1];
            t = t[0].split("2"),
            n = 2 === t.length ? {
                from: t[0],
                to: t[1],
                query: i
            } : {
                from: t[0],
                to: "",
                query: i
            }
        } else
            1 === t.length ? (t = t[0].split("2"),
            n = 2 === t.length ? {
                from: t[0],
                to: t[1],
                query: ""
            } : {
                from: t[0],
                to: "",
                query: ""
            }) : n = !1;
        return n
    }
    ,
    c.empty = function() {
        history.replaceState ? history.replaceState("", document.title, location.pathname) : location.hash = ""
    }
    ,
    e.exports = c
});
;define("translation:widget/translate/common/sectrans", function() {
    "use strict";
    function n() {
        $(document).on("click", ".sec-trans", function() {
            var n = $(this).attr("href");
            n = "#" + n.split("#")[1];
            var t = window.location.hash;
            n === t && window.location.reload()
        })
    }
    $(function() {
        n()
    })
});
;define("translation:widget/translate/desktopGuide/desktopGuide", function(e, t, i) {
    "use strict";
    var o = $(".desktop-guide")
      , n = "DESKTOP_GUIDE_HAS_SEEN"
      , d = {
        init: function() {
            if (!/baiduinput/gi.test(window.navigator.userAgent) && null == window.appVersion) {
                var e = void 0;
                try {
                    e = "y" === localStorage.getItem(n)
                } catch (t) {
                    e = !1
                }
                if (!e) {
                    _hmt.push(["_trackEvent", "首页", "首页客户端导流浮层展现量"]),
                    o.removeClass("desktop-guide-hide");
                    try {
                        localStorage.setItem(n, "y")
                    } catch (t) {
                        console.warn(t)
                    }
                    this.initVideo(),
                    this.bindEvent()
                }
            }
        },
        initVideo: function() {
            var e = $(".desktop-guide-video-wrap")
              , t = 0 === navigator.platform.indexOf("Win") ? "https://fanyi-cdn.cdn.bcebos.com/video/5eeb2bf0-48f5-11eb-92cb-b395b4c0235d.mp4" : "https://fanyi-cdn.cdn.bcebos.com/video/0f071850-48f6-11eb-91ca-15239adb0387.mp4";
            e.append(["<video", 'class="desktop-guide-video"', "controls", "muted", 'controlslist="nodownload"', "preload", "autoplay", 'src="' + t + '"', "></video>"].join("\n"))
        },
        bindEvent: function() {
            $(".desktop-guide-close").on("click", function(e) {
                e.preventDefault(),
                _hmt.push(["_trackEvent", "首页", "首页客户端导流浮层关闭按钮点击"]);
                var t = $(".desktop-guide-video-wrap video");
                t.length > 0 && t[0].pause(),
                o.addClass("desktop-guide-hide")
            }),
            $(".desktop-guide-dl-btn").on("click", function(e) {
                e.preventDefault(),
                _hmt.push(["_trackEvent", "首页", "首页客户端导流浮层下载按钮点击"]),
                window.open(window.location.origin + "/client/download/redirect")
            })
        }
    };
    $(function() {
        d.init()
    }),
    i.exports = d
});
;define("translation:widget/translate/details/adLink/adLink", function(n, i, t) {
    "use strict";
    function a() {
        window.adLinkInfo.isShowAdLink && (_hmt.push(["_trackEvent", "首页", "web端中部文字链广告展现"]),
        o())
    }
    function o() {
        $(".trans-other-wrap").on("click", ".hot-link-middle a", function() {
            _hmt.push(["_trackEvent", "首页", "web端中部文字链广告点击"])
        })
    }
    function d(n) {
        var i = s("tplAdLink", Object.assign(window.adLinkInfo, {
            isPlaceAdLinkRight: n
        }));
        l.append(i)
    }
    function e() {
        if (u) {
            var n = $.trim($("#baidu_translate_input").val());
            n ? k.hide() : c()
        }
    }
    function c() {
        var n = s("tplAdLink", Object.assign(window.adLinkInfo, {
            isPlaceAdLinkRight: !1
        }));
        k.html(n),
        k.show()
    }
    function r() {
        k.hide()
    }
    var s = n("translation:widget/common/third_party/template")
      , l = $("#left-result-container")
      , k = $(".hot-link-out-container")
      , u = !1;
    $(function() {
        u = window.adLinkInfo.isShowAdLink
    }),
    t.exports = {
        init: a,
        build: d,
        onAdLinkInput: e,
        hide: r
    }
});
;define("translation:widget/translate/details/appRead/appRead", function(t, n, i) {
    "use strict";
    var a = t("translation:widget/common/third_party/template")
      , e = $("#left-result-container")
      , o = {
        init: function() {
            this.bindEvents()
        },
        bindEvents: function() {
            e.on("click", "#app-read", function() {
                _hmt.push(["_trackEvent", "首页", "98_首页页面_结果页导流条点击"]),
                window.open("https://fanyi.baidu.com/appdownload/download.html")
            })
        },
        build: function() {
            var t = a("tplAppRead", {});
            e.prepend(t),
            _hmt.push(["_trackEvent", "首页", "97_首页页面_结果页导流条展现"])
        }
    };
    $(function() {
        o.init()
    }),
    i.exports = o
});
;define("translation:widget/translate/sideNav/navSorter/listOperator", function(t, i, n) {
    "use strict";
    function r(t, i) {
        var n = {}
          , r = {};
        i.forEach(function(t) {
            n[t] = 1
        }),
        t.forEach(function(t) {
            r[t] = 1
        });
        var e = []
          , s = [];
        t.forEach(function(t) {
            n[t] && s.push(t)
        }),
        i.forEach(function(t) {
            r[t] || e.push(t)
        }),
        s.push.apply(s, e);
        var o = t.join(",") !== s.join(",");
        return t = s,
        {
            hasDiff: o,
            targetList: t
        }
    }
    var e = t("translation:widget/common/util")
      , s = t("translation:widget/common/environment")
      , o = {
        0: "翻译家推荐",
        1: "重点词汇",
        2: "简明释义",
        3: "牛津词典",
        4: "柯林斯词典",
        5: "英英释义",
        6: "汉英大词典",
        7: "中中释义",
        8: "双语例句",
        9: "单词集锦",
        10: "网络释义",
        11: "同义词辨析",
        12: "词根词缀",
        13: "词语用例",
        14: "同反义词",
        15: "词源"
    }
      , a = void 0
      , u = void 0
      , c = {
        init: function() {
            this.initNavList()
        },
        initNavList: function() {
            var t = this.getOwnerList()
              , i = this.getDefaultList()
              , n = s.get("account");
            if (t.length > 0 && n.is_login) {
                var e = r(t, i);
                return e.hasDiff && (t = e.targetList,
                this.setOwnerList(t)),
                this.setLocalList(t),
                a = t,
                t
            }
            var o = this.getLocalList();
            if (o.length > 0) {
                var u = r(o, i);
                u.hasDiff && (o = u.targetList,
                this.setLocalList(o))
            } else
                o = i,
                this.setLocalList(o);
            return n.is_login && this.setOwnerList(o),
            a = o,
            o
        },
        getNavListText: function() {
            var t = []
              , i = this.getNavList();
            return i.forEach(function(i) {
                t.push(o[i])
            }),
            t
        },
        getNavList: function() {
            return a
        },
        getNavListIdAndText: function(t) {
            var i = [];
            return t || (t = this.getNavList()),
            t.forEach(function(t) {
                i.push({
                    id: t,
                    text: o[t]
                })
            }),
            i
        },
        setNavList: function(t) {
            var i = this
              , n = s.get("account");
            return n.is_login ? this.setOwnerList(t).then(function() {
                return i.setLocalList(t)
            }) : this.setLocalList(t)
        },
        getDefaultList: function() {
            return u || (u = this.listStrToArr(window.common.defaultNavList).filter(function(t) {
                return null != o[t]
            })),
            u
        },
        getOwnerList: function() {
            return this.listStrToArr(window.common.ownerNavList)
        },
        setOwnerList: function(t) {
            var i = this;
            return new Promise(function(n, r) {
                var e = i.getDefaultList()
                  , s = {};
                e.forEach(function(t) {
                    s[t] = 1
                });
                var o = t.some(function(t) {
                    return 1 !== s[t]
                });
                if (o)
                    return void r();
                var a = {
                    req: "update",
                    catalog: JSON.stringify(t),
                    bdstoken: window.bdstoken
                };
                $.ajax({
                    url: "/catalog",
                    type: "POST",
                    data: a,
                    success: function(t) {
                        return t && 0 === parseInt(t.errno, 10) ? void n() : void r()
                    },
                    error: function() {
                        r()
                    }
                })
            }
            )
        },
        getLocalList: function() {
            return e.supportLocalStorage ? this.listStrToArr(localStorage.getItem("FY_NAV_LIST")) : []
        },
        setLocalList: function(t) {
            return new Promise(function(i) {
                if (a = t,
                !e.supportLocalStorage)
                    return void i();
                var n = JSON.stringify(t);
                localStorage.setItem("FY_NAV_LIST", n),
                i()
            }
            )
        },
        listStrToArr: function(t) {
            if (!t)
                return [];
            try {
                var i = JSON.parse(t);
                return Array.isArray(i) ? i : []
            } catch (n) {
                return []
            }
        }
    };
    c.init(),
    n.exports = c
});
;define("translation:widget/translate/sideNav/navSorter/ListDrag", function(t, e, r) {
    "use strict";
    function a(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    var n = function() {
        function t(t, e) {
            for (var r = 0; r < e.length; r++) {
                var a = e[r];
                a.enumerable = a.enumerable || !1,
                a.configurable = !0,
                "value"in a && (a.writable = !0),
                Object.defineProperty(t, a.key, a)
            }
        }
        return function(e, r, a) {
            return r && t(e.prototype, r),
            a && t(e, a),
            e
        }
    }()
      , o = ["dragStart", "dragMove", "dragEnd"]
      , i = function() {
        function t(e) {
            a(this, t),
            this.init(e)
        }
        return n(t, [{
            key: "init",
            value: function(t) {
                this.handlers = {
                    dragStart: [],
                    dragMove: [],
                    dragEnd: []
                },
                this.isDragging = !1,
                this.scrollTimer = null,
                this.$dragTarget = null,
                this.dragTargetW = null,
                this.dragTargetH = null,
                this.$container = $(t.$container),
                this.containerOffset = null,
                this.containerW = this.$container.outerWidth(),
                this.containerH = this.$container.outerHeight(),
                this.hasOutWrapper = !!t.$outWrapper,
                this.$outWrapper = this.hasOutWrapper ? $(t.$outWrapper) : this.$container,
                this.bound = {},
                this.$holdDom = $(t.holdHtml),
                this.startOffsetX = null,
                this.startOffsetY = null,
                this.itemClassName = t.itemClassName,
                this.$sortableItems = null,
                this.holdIdx = null,
                this.bindEvents()
            }
        }, {
            key: "bindEvents",
            value: function() {
                var t = this;
                this.$container.on("mousedown.listDrag", "." + this.itemClassName, function(e) {
                    if (0 === e.button) {
                        t.isDragging = !0,
                        t.$dragTarget = $(e.target),
                        t.dragTargetW = t.$dragTarget.outerWidth(),
                        t.dragTargetH = t.$dragTarget.outerHeight();
                        var r = t.$dragTarget.offset();
                        t.startOffsetX = e.pageX - r.left,
                        t.startOffsetY = e.pageY - r.top,
                        t.containerOffset = t.$container.offset();
                        var a = r.left - t.containerOffset.left
                          , n = r.top - t.containerOffset.top;
                        if (t.$dragTarget.addClass(t.itemClassName + "-dragging").css({
                            left: a,
                            top: n
                        }).before(t.$holdDom).attr("data-sortable", "n"),
                        t.$sortableItems = t.$container.find('[data-sortable="y"]'),
                        $.each(t.$sortableItems, function(e, r) {
                            return $(r).hasClass("nav-st-item-hold") ? (t.holdIdx = e,
                            !1) : void 0
                        }),
                        t.hasOutWrapper) {
                            var o = t.$outWrapper.offset();
                            t.bound.l = o.left,
                            t.bound.t = o.top,
                            t.bound.w = t.$outWrapper.outerWidth(),
                            t.bound.h = t.$outWrapper.outerHeight()
                        } else
                            t.bound.l = t.containerOffset.left,
                            t.bound.t = t.containerOffset.top,
                            t.bound.w = t.containerW,
                            t.bound.h = t.containerH;
                        t.trigger("dragStart"),
                        $(document).on("mousemove.listDrag", function(e) {
                            if (t.isDragging) {
                                var r = e.pageX - t.startOffsetX
                                  , a = e.pageY - t.startOffsetY;
                                r = Math.min(Math.max(t.bound.l, r), t.bound.l + t.bound.w - t.dragTargetW),
                                a = Math.min(Math.max(t.bound.t, a), t.bound.t + t.bound.h - t.dragTargetH);
                                var n = r - t.containerOffset.left
                                  , o = a - t.containerOffset.top;
                                t.$dragTarget.css({
                                    left: n,
                                    top: o
                                });
                                var i = Math.min(Math.max(o + t.dragTargetH / 2, 0), t.containerH)
                                  , s = Math.floor(i / (t.dragTargetH + 4));
                                t.holdIdx !== s && (t.holdIdx > s ? t.$sortableItems.eq(s).before(t.$holdDom) : t.$sortableItems.eq(s).after(t.$holdDom),
                                t.$sortableItems = t.$container.find('[data-sortable="y"]'),
                                t.holdIdx = s,
                                t.trigger("dragMove"))
                            }
                        })
                    }
                }),
                $(document).on("mouseup.listDrag", function(e) {
                    if (0 !== e.button)
                        return void e.preventDefault();
                    if (t.isDragging) {
                        t.isDragging = !1,
                        t.$holdDom.replaceWith(t.$dragTarget),
                        t.$dragTarget.removeAttr("style").removeClass(t.itemClassName + "-dragging").attr("data-sortable", "y"),
                        $(document).off("mousemove.listDrag");
                        var r = [];
                        t.$container.find("[data-sort-id]").each(function(t, e) {
                            var a = $(e).attr("data-sort-id");
                            a && r.push(parseInt(a, 10))
                        }),
                        t.trigger("dragEnd", r)
                    }
                }),
                $(window).on("scroll.listDrag", function() {
                    t.isDragging && (t.scrollTimer && clearTimeout(t.scrollTimer),
                    t.scrollTimer = setTimeout(function() {
                        if (t.containerOffset = t.$container.offset(),
                        t.hasOutWrapper) {
                            var e = t.$outWrapper.offset();
                            t.bound.l = e.left,
                            t.bound.t = e.top,
                            t.bound.w = t.$outWrapper.outerWidth(),
                            t.bound.h = t.$outWrapper.outerHeight()
                        } else
                            t.bound.l = t.containerOffset.left,
                            t.bound.t = t.containerOffset.top,
                            t.bound.w = t.containerW,
                            t.bound.h = t.containerH
                    }, 0))
                })
            }
        }, {
            key: "destory",
            value: function() {}
        }, {
            key: "on",
            value: function(t, e) {
                o.includes(t) && "[object Function]" !== !Object.prototype.toString(e) && this.handlers[t].push(e)
            }
        }, {
            key: "trigger",
            value: function(t, e) {
                var r = this;
                this.handlers[t] && 0 !== this.handlers[t].length && this.handlers[t].forEach(function(t) {
                    t.call(r, e)
                })
            }
        }]),
        t
    }();
    r.exports = i
});
;define("translation:widget/translate/toast/toast", function(t, a, s) {
    "use strict";
    var e = $("#overall-toast")
      , o = void 0
      , i = {
        show: function(t, a) {
            a = a || 1,
            e.find("span").text(t),
            e.hasClass("overall-toast-hide") && e.removeClass("overall-toast-hide");
            var s = -e.width() / 2;
            e.css("margin-left", s),
            o && clearTimeout(o),
            o = setTimeout(function() {
                e.addClass("overall-toast-hide")
            }, 1e3 * a)
        }
    };
    s.exports = i
});
;define("translation:widget/translate/sideNav/navSorter/navSorter", function(t, n, i) {
    "use strict";
    var a = t("translation:widget/common/third_party/template")
      , e = t("translation:widget/translate/sideNav/navSorter/listOperator")
      , s = t("translation:widget/translate/sideNav/navSorter/ListDrag")
      , o = t("translation:widget/translate/toast/toast")
      , r = $("#nav-st")
      , d = $("#nav-mask")
      , l = $(".nav-st-items")
      , h = ["sortChange"]
      , u = null
      , c = null
      , v = {
        init: function() {
            this.handlers = {
                sortChange: []
            };
            var t = e.getNavListIdAndText();
            this.build(t),
            this.bindEvents()
        },
        build: function(t) {
            var n = a("tplNavSTList", {
                navListIdAndText: t
            });
            l.html(n)
        },
        bindEvents: function() {
            var t = this;
            r.on("click", ".nav-st-default", function() {
                var n = e.getDefaultList();
                e.setNavList(n).then(function() {
                    t.hide(),
                    c = null,
                    o.show("目录排序已恢复默认设置"),
                    t.build(e.getNavListIdAndText(n)),
                    t.trigger("sortChange")
                }, function() {
                    o.show("网络问题，请稍后重试")
                })
            }),
            d.on("click", function() {
                c ? e.setNavList(c).then(function() {
                    t.hide(),
                    c = null,
                    t.build(e.getNavListIdAndText(c)),
                    t.trigger("sortChange")
                }, function() {
                    o.show("网络问题，请稍后重试")
                }) : t.hide()
            })
        },
        show: function() {
            d.show(),
            r.show(),
            this.initDrag()
        },
        initDrag: function() {
            u || (u = new s({
                holdHtml: '<div class="nav-st-item nav-st-item-hold" data-sortable="y"></div>',
                $outWrapper: r,
                $container: l,
                itemClassName: "nav-st-item"
            }),
            u.on("dragEnd", function(t) {
                c = t
            }))
        },
        hide: function() {
            d.hide(),
            r.hide()
        },
        on: function(t, n) {
            h.includes(t) && "[object Function]" !== !Object.prototype.toString(n) && this.handlers[t].push(n)
        },
        trigger: function(t, n) {
            var i = this;
            this.handlers[t] && 0 !== this.handlers[t].length && this.handlers[t].forEach(function(t) {
                t.call(i, n)
            })
        }
    };
    v.init(),
    i.exports = v
});
;define("translation:widget/translate/sideNav/sideNav", function(t, e, n) {
    "use strict";
    var a = t("translation:widget/common/third_party/template")
      , i = t("translation:widget/common/environment")
      , o = t("translation:widget/translate/sideNav/navSorter/navSorter")
      , s = ($(".footer"),
    $("#side-nav"))
      , r = s.find(".sidv-nav-position-layer .side-nav-wrapper")
      , c = 21
      , l = 12
      , d = $(".trans-other-wrap .trans-left")
      , f = 0
      , v = []
      , u = $(window).height()
      , m = 0
      , h = !1
      , p = !1
      , w = !1
      , g = !1
      , b = {
        oxford: "牛津词典",
        which_word: "词语辨析",
        vocab: "词汇扩充",
        british_american: "英美用法",
        grammar: "语法说明",
        more_about: "补充说明",
        synonyms: "同义词辨析",
        edict: "英英释义",
        sample: "双语例句",
        zdict: "中中释义",
        collins: "柯林斯词典",
        hanying: "汉英大词典",
        general: "单词集锦"
    }
      , _ = 0
      , k = {
        init: function() {
            k.bindScroll(),
            k.bindResize(),
            k.bindClick()
        },
        mockScrollingClickFlag: function(t) {
            w = t
        },
        scrollToSection: function(t) {
            var e = v[t].topOffset - l;
            w = !0,
            $("html:not(:animated), body:not(:animated)").animate({
                scrollTop: e
            }, 300, "swing", function() {
                var e = i.get("collapse");
                e.expandSection(v[t].ele),
                w = !1,
                k.checkPos()
            })
        },
        locateTab: function() {
            var t = b[k.getParamFromUrl("mod")];
            if (t) {
                var e = $(".nav-item, .nav-sub-item").filter("[data-stat-add='" + t + "']");
                e.length > 0 && (k.scrollToSection(parseInt(e.attr("data-section-idx"), 10)),
                window._hmt.push(["_trackEvent", "首页", "37_首页页面_点击目录项_" + t]))
            }
        },
        bindClick: function() {
            s.on("click.sideNav", ".nav-item, .nav-sub-item", function(t) {
                var e = $(t.currentTarget)
                  , n = parseInt(e.attr("data-section-idx"), 10);
                k.scrollToSection(n)
            }),
            s.on("click", ".nav-search-again", function() {
                var t = void 0
                  , e = void 0;
                $("html:not(:animated), body:not(:animated)").animate({
                    scrollTop: "0px"
                }, 100);
                var n = document.getElementById("baidu_translate_input");
                if ("undefined" != typeof n.createTextRange) {
                    var a = n.createTextRange();
                    t = 0,
                    e = n.value.length,
                    a.moveStart("character", 0),
                    a.moveEnd("character", 0),
                    a.collapse(!0),
                    a.moveEnd("character", e),
                    a.moveStart("character", t),
                    a.select()
                } else
                    "undefined" != typeof n.setSelectionRange && (t = 0,
                    e = n.value.length,
                    n.setSelectionRange(t, e));
                setTimeout(function() {
                    n.focus()
                }, 500),
                window._hmt.push(["_trackEvent", "首页", "web端点击继续查词"])
            }),
            s.on("click", ".nav-sort-btn", function() {
                o.show()
            })
        },
        bindResize: function() {
            $(window).on("resize.sideNav", function() {
                u = $(window).height(),
                h && (k.setupPos(),
                k.checkPos())
            })
        },
        bindScroll: function() {
            $(window).on("scroll.sideNav", function() {
                if (h) {
                    k.setNavPos(),
                    k.checkPos(),
                    clearTimeout(_);
                    var t = s.find(".nav-item, .nav-sub-item");
                    _ = setTimeout(function() {
                        $(t).each(function(t, e) {
                            var n = $(e).attr("data-stat-add");
                            $(e).hasClass("in-view") && window._hmt.push(["_trackEvent", "首页", "48_首页页面_模块滑动停留次数_" + n])
                        })
                    }, 5e3)
                }
            })
        },
        genNav: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !0;
            if (k.destroyNav(),
            $(".result-section").each(function(t, e) {
                var n = $(e)
                  , a = n.attr("data-nav-text")
                  , i = n.hasClass("nav-sub-section")
                  , o = n.hasClass("prefix-new-tag");
                v.push({
                    ele: n,
                    title: a,
                    isSub: i,
                    isNew: o
                }),
                _hmt.push(["_trackEvent", "首页", "Web" + a + "Tab展现量"])
            }),
            v.length > 0) {
                var e = a("tplSideNav", {
                    sectionData: v,
                    withSortBtn: t
                });
                r.html(e),
                h = !0,
                1 === v.length && (p = !0),
                m = s.offset().top,
                k.setupPos(),
                k.checkPos(),
                g || (g = !0,
                k.locateTab()),
                window._hmt.push(["_trackEvent", "首页", "68_首页页面_目录导航展现量"])
            }
        },
        setNavPos: function() {
            var t = $(window).scrollTop()
              , e = d.offset().top;
            if (e > m - f && (m = e + f,
            this.setupPos()),
            t > m - c) {
                s.addClass("fixed");
                var n = window.pageXOffset || 0;
                s.css("left", -n)
            } else
                s.removeClass("fixed"),
                s.css("left", "")
        },
        setupPos: function() {
            p || v.forEach(function(t) {
                var e = t.ele
                  , n = e.height();
                t.topOffset = e.offset().top,
                t.bottomOffset = t.topOffset + n
            })
        },
        checkPos: function() {
            var t = $(window).scrollTop();
            if (!p && !w) {
                var e = t + l
                  , n = t + u
                  , a = null
                  , i = null
                  , o = s.find(".nav-item, .nav-sub-item");
                o.removeClass("active").removeClass("in-view"),
                v.forEach(function(t, s) {
                    var r = t.topOffset >= e && t.topOffset <= n || t.bottomOffset > e && t.bottomOffset <= n || t.topOffset < e && t.bottomOffset > n;
                    if (r) {
                        var c = o.filter("[data-section-idx=" + s + "]");
                        c.addClass("in-view");
                        var l = c.is(".nav-item") ? !1 : !0
                          , d = !1;
                        if (l) {
                            if (null === i) {
                                var f = c.prevUntil(".nav-item").addBack().prev();
                                f.hasClass("active") && (d = !0,
                                i = s)
                            }
                        } else
                            null === a && (d = !0,
                            a = s);
                        d && c.addClass("active")
                    }
                })
            }
        },
        destroyNav: function() {
            r.empty(),
            s.removeClass("fixed").css("left", ""),
            v = [],
            m = 0,
            h = !1,
            p = !1,
            w = !1,
            clearTimeout(_),
            _ = 0,
            d.css("padding-bottom", "")
        },
        getParamFromUrl: function(t) {
            var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)","i")
              , n = window.location.search.substring(1).match(e);
            return null !== n ? n[2] : null
        }
    };
    k.init(),
    n.exports = k
});
;define("translation:widget/translate/details/collapse/collapse", function(a, t, e) {
    "use strict";
    var s = a("translation:widget/translate/sideNav/sideNav")
      , l = a("translation:widget/common/environment")
      , o = $("#left-result-container")
      , n = {
        init: function() {
            n.bindEvent()
        },
        bindEvent: function() {
            o.on("click", ".section-collapse-expand-btn", function() {
                var a = $(this)
                  , t = a.parent(".need-collapse")
                  , e = t.attr("data-nav-text");
                if (t.hasClass("to-expand")) {
                    if (window._hmt.push(["_trackEvent", "首页", "47_首页页面_点击展开收起模块_" + e + "_展开"]),
                    n.expandSection(t, a),
                    t.hasClass("usecase-section")) {
                        var s = t.find(".cur")
                          , l = s.attr("data-tab-text");
                        window._hmt.push(["_trackEvent", "首页", "47_首页页面_点击展开收起模块_" + l + "_展开"])
                    }
                } else if (t.hasClass("to-collapse") && (window._hmt.push(["_trackEvent", "首页", "47_首页页面_点击展开收起模块_" + e + "_收起"]),
                n.collapseSection(t, a),
                t.hasClass("usecase-section"))) {
                    var o = t.find(".cur")
                      , i = o.attr("data-tab-text");
                    window._hmt.push(["_trackEvent", "首页", "78_首页页面_点击展开收起模块_" + i + "_收起"])
                }
            }),
            $(window).on("resize.reGenSampleCollapse", function() {
                $(".sample-section.need-collapse").length > 0 && n.setSampleCollapse(!0)
            })
        },
        expandSection: function(a, t) {
            if (a.hasClass("need-collapse")) {
                if (t) {
                    var e = t.offset().top - $(window).scrollTop();
                    t.attr("data-expand-top", e)
                } else
                    a.find(".section-collapse-expand-btn").attr("data-expand-top", "");
                if (a.hasClass("sample-section") && a.attr("data-last-collapse-status", "to-collapse"),
                !a.hasClass("to-expand"))
                    return;
                var l = a.find(".details-cont-item");
                a.removeClass("to-expand").addClass("to-collapse"),
                l.css("max-height", "none"),
                s.setupPos()
            }
        },
        collapseSection: function(a, t) {
            if (a.hasClass("need-collapse") && a.hasClass("to-collapse")) {
                var e = void 0
                  , l = void 0;
                t.attr("data-expand-top") ? (e = parseInt(t.attr("data-expand-top"), 10),
                l = !0) : (e = t.offset().top - $(window).scrollTop(),
                l = !1);
                var o = a.find(".details-cont-item")
                  , n = parseInt(a.attr("data-collapse-height"), 10);
                a.removeClass("to-collapse").addClass("to-expand"),
                o.css("max-height", n + "px"),
                a.hasClass("sample-section") && a.attr("data-last-collapse-status", "to-expand"),
                a.hasClass("usecase-section") && $(".oxford-items").length > 0 && ($(".oxford-items").addClass("hide"),
                $(".oxford-to-expand").removeClass("hide")),
                s.setupPos(),
                s.mockScrollingClickFlag(!0);
                var i = t.offset().top - e;
                if (!l)
                    return window.scrollTo(0, i),
                    s.mockScrollingClickFlag(!1),
                    void s.checkPos();
                $("html:not(:animated), body:not(:animated)").animate({
                    scrollTop: i
                }, 300, "swing", function() {
                    s.mockScrollingClickFlag(!1),
                    s.checkPos()
                })
            }
        },
        genCollapse: function() {
            var a = $("section.need-collapse");
            a.length > 0 && a.each(function() {
                var a = $(this);
                if ($('<a class="section-collapse-expand-btn" href="javascript:"></a>').appendTo(a),
                a[0].hasAttribute("data-collapse-height")) {
                    var t = parseInt(a.attr("data-collapse-height"), 10)
                      , e = a.find(".details-cont-item");
                    e.height() > t && (a.removeClass("to-collapse").addClass("to-expand"),
                    e.css("max-height", t + "px"))
                } else
                    a.hasClass("sample-section") && n.setSampleCollapse(!1)
            })
        },
        setSampleCollapse: function(a) {
            var t = $(".sample-section")
              , e = t.find(".details-cont-item");
            t.removeAttr("data-collapse-height");
            var l = !1
              , o = null;
            e.find(".double-sample").length > 0 ? o = e.find(".double-sample ol > li") : e.find(".single-sample") && (o = e.find(".single-sample ol > li"));
            var n = null;
            if (o.length > 5 && (l = !0,
            n = o.eq(5)),
            l) {
                var i = n.offset().top - e.offset().top;
                t.attr("data-collapse-height", i),
                "to-expand" === t.attr("data-last-collapse-status") ? (t.addClass("to-expand"),
                e.css("max-height", i + "px")) : "to-collapse" === t.attr("data-last-collapse-status") ? (t.addClass("to-collapse"),
                e.css("max-height", "none")) : (t.addClass("to-expand"),
                t.attr("data-last-collapse-status", "to-expand"),
                e.css("max-height", i + "px"))
            } else
                t.removeClass("to-collapse to-expand"),
                e.css("max-height", "none");
            a && s.setupPos()
        }
    };
    n.init(),
    l.set("collapse", n),
    e.exports = n
});
;define("translation:widget/translate/output/mouseover", function(t, e) {
    "use strict";
    var i = (t("translation:widget/common/environment"),
    {
        overTarget: null,
        isOverFlag: !1,
        isover: function(t) {
            var e, i = $(t.target), s = i.offset(), o = s.left, r = s.top, n = t.text || i.attr("data-hover-tip-text"), a = $("#hover-tips"), l = i.attr("data-hover-tip-offset"), v = 0, h = 14;
            i.parents(".sample-output").length > 0 || i.parents("#zonedword-wrap").length > 0 || (this.overTarget = t.target,
            this.isOverFlag = !0,
            l && (e = l.split("|"),
            2 === e.length ? (v = parseInt(e[0], 10),
            h = parseInt(e[1], 10)) : 1 === e.length && (v = parseInt(e[0], 10))),
            a.show().css({
                visibility: "hidden"
            }).find(".tips-content").text(n),
            o = o - a.outerWidth() / 2 + i.outerWidth() / 2 + v,
            r = r - a.outerHeight() / 2 - i.outerHeight() / 2 - h,
            a.offset({
                top: r,
                left: o
            }).css({
                visibility: "visible"
            }).show(),
            (i.hasClass("setting-btn") || i.hasClass("collection-btn")) && $("#hover-tips").css("top", -75))
        },
        isout: function() {
            $("#hover-tips").find(".tips-content").text(""),
            $("#hover-tips").offset({
                left: -9999,
                top: -9999
            }),
            this.isOverFlag = !1,
            this.overTarget = null
        }
    });
    e.isover = function(t) {
        i.isover(t)
    }
    ,
    e.isout = function() {
        i.isout()
    }
    ,
    e.getOverTarget = function() {
        return i.overTarget
    }
});
;define("translation:widget/translate/details/dictionary/simplemeans", function(t, e) {
    "use strict";
    function n(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    function a(t, e) {
        var n = "explain_video_play"
          , a = JSON.stringify({
            video_id: t,
            source: "pc",
            type: e
        });
        r.default.newFetch("/track", {
            key: n,
            params: a,
            sign: d.default("key" + n + "params" + a + n)
        }, "POST", void 0, !0).catch(function() {})
    }
    function i(t) {
        t = Number(t);
        var e = Math.floor(t / 60)
          , n = t % 60;
        return e + ":" + (10 > n ? "0" + n : n)
    }
    var o = t("translation:widget/common/fanyiUtil")
      , r = n(o)
      , s = t("translation:widget/common/third_party/md5")
      , d = n(s)
      , c = t("translation:widget/common/third_party/template")
      , u = t("translation:widget/common/soundURIGenerator")
      , p = t("translation:widget/translate/output/mouseover")
      , l = t("translation:widget/common/environment");
    c.helper("uriComponentTrimAndEncode", function(t) {
        return encodeURIComponent($.trim(t))
    });
    var h, g, v, m = !0, f = 8, _ = $("#left-result-container"), w = {
        START_PLAY: 1,
        EFFECTIVE_PLAY: 2,
        ALMOST_END: 3,
        END_PLAY: 4
    }, y = {
        buildSimpleMeans: function(t) {
            var e = t.data
              , n = (t.to,
            t.baikeImgUrl)
              , o = t.queryExplainVideo
              , r = 2 === parseInt(l.get("firstModuleId"), 10);
            _.append(c("tplDictionary", {
                isFirstCard: r
            }));
            var s, d = {};
            d.tplData = e;
            var u = $(".select-from-language .language-selected").attr("data-lang")
              , p = $(".select-to-language .language-selected").attr("data-lang")
              , h = !1;
            if (("en" === u && "th" === p || "th" === u && "en" === p) && (d.tplData.show_th_detail = !0),
            d.tplData.show_sound = !1,
            ("en" === u || "zh" === u) && (d.tplData.show_sound = !0),
            e.tags) {
                var g = [];
                e.tags.core && e.tags.core.length > 0 && "" !== e.tags.core[0] && (g = g.concat(e.tags.core)),
                e.tags.other && e.tags.other.length > 0 && "" !== e.tags.other[0] && (g = g.concat(e.tags.other)),
                g.length > 0 && (g = g.slice(0, 6),
                d.tplData.coreTags = g)
            }
            if (e.exchange)
                for (var v in e.exchange)
                    e.exchange[v] && (h = !0);
            if (d.tplData.showExchange = h,
            "zh" === u && "en" === p && (d.tplData.isZh2En = !0,
            _hmt.push(["_trackEvent", "首页", "Web中英词典释义卡片展现次数"])),
            d.tplData.symbols ? (o ? (o.formatDur = i(o.videoTime),
            d.tplData.queryExplainVideo = o,
            _hmt.push(["_trackEvent", "首页", "84_首页页面_Web词典释义卡片_讲解视频缩略图展现次数_" + o.videoType])) : n && (d.tplData.baikeImgUrl = n,
            _hmt.push(["_trackEvent", "首页", "64_首页页面_Web词典释义卡片_图片展现次数"])),
            d.tplData.isFirstCard = r,
            s = c("tplSimplemeans", d),
            e.memory_skill && _hmt.push(["_trackEvent", "首页", "73_首页页面_Web词典释义卡片_记忆技巧展现次数"]),
            e.derivative && _hmt.push(["_trackEvent", "首页", "80_首页页面_Web词典释义卡片_派生词展现次数"])) : d.tplData.content && (s = c("tplOtherSimplemeans", d)),
            _.find(".dictionary-wrap").html(s),
            o) {
                var m = $(".dictionary-wrap .query-video")
                  , f = m[0]
                  , y = o.id
                  , b = !0
                  , k = !1
                  , E = !1;
                m.on("play", function() {
                    b && (window._hmt.push(["_trackEvent", "首页", "86_首页页面_Web词典释义卡片_讲解视频首帧播放次数_" + o.videoType]),
                    a(y, w.START_PLAY)),
                    b = !1
                }),
                m.on("timeupdate", function() {
                    var t = f.duration
                      , e = f.currentTime;
                    !k && e > 10 && (a(y, w.EFFECTIVE_PLAY),
                    k = !0),
                    !E && e / t > .9 && (a(y, w.ALMOST_END),
                    E = !0)
                }),
                m.on("ended", function() {
                    window._hmt.push(["_trackEvent", "首页", "87_首页页面_Web词典释义卡片_讲解视频尾帧播放次数_" + o.videoType]),
                    a(y, w.END_PLAY),
                    b = !0
                })
            }
            "英" !== $(".phonetic-transcription span").eq(0).text() && $(".simple-dict").addClass("simple-dict-ztoe"),
            $(".simple-dict .op-repeat").length > 0 && (_hmt.push(["_trackEvent", "首页", "web端复读按钮出现次数"]),
            this.bindRepeatEvents())
        },
        bindEvents: function() {
            var t = this
              , e = !1
              , n = 0
              , a = 0
              , i = 0
              , o = 0
              , r = 0
              , s = 0
              , d = 30;
            $(".translate-wrap").on("click", ".dictionary-wrap .op-sound", function() {
                t.timer && clearTimeout(t.timer),
                t.clickSound({
                    target: this
                })
            }).on("mouseenter", ".dictionary-wrap .op-sound", function() {
                t.isoverSound({
                    target: this
                })
            }).on("mouseleave", ".dictionary-wrap .op-sound", function() {
                t.isoutSound()
            }).on("click", ".dictionary-wrap .op-repeat", function() {
                t.repeatSound({
                    target: this
                })
            }).on("click", ".dictionary-wrap .dict-second-trans", function() {
                _hmt.push(["_trackEvent", "首页", "Web中英词典卡片发起二次翻译次数"])
            }).off("click.sound").on("click.sound", "a", function() {
                var e = $(this)
                  , n = e.attr("href") || "";
                (n.match(/[\.\/]/g) || e.hasClass("collection-btn")) && t.shutdownAudio()
            }).on("click", ".dictionary-kingsoft-source-arrow,.dictionary-kingsoft-source-text,.dictionary-kingsoft-source-icon", function() {
                _hmt.push(["_trackEvent", "首页", "73_首页页面_点击金山词霸来源"]),
                window.open("http://www.iciba.com/", "_blank")
            }).on("click", ".dictionary-explain-video", function(t) {
                _hmt.push(["_trackEvent", "首页", "85_首页页面_Web词典释义卡片_讲解视频缩略图点击次数_" + $(t.currentTarget).attr("data-video-type")]);
                var e = $(".dictionary-wrap .video-container");
                e.css("visibility", "hidden"),
                e.show(),
                setTimeout(function() {
                    var t = e[0].getBoundingClientRect()
                      , n = t.left
                      , a = t.top;
                    e.css({
                        position: "fixed",
                        left: n,
                        top: Math.min(Math.max(d, a), $(window).height() - e.height())
                    }),
                    e.css("visibility", "visible"),
                    $(".dictionary-wrap .query-video")[0].play()
                }, 100)
            }).on("click", ".video-close", function() {
                $(".dictionary-wrap .query-video")[0].pause(),
                $(".dictionary-wrap .video-container").removeAttr("style")
            }),
            $(".translate-wrap").on("mousedown.dragVideo", ".video-top-bar", function(t) {
                if (0 === t.button) {
                    e = !0;
                    var c = $(".dictionary-wrap .video-container")
                      , u = c[0].getBoundingClientRect()
                      , p = u.left
                      , l = u.top;
                    n = t.clientX - p,
                    a = t.clientY - l,
                    c.addClass("dragging"),
                    i = $(window).width(),
                    o = $(window).height(),
                    r = c.width(),
                    s = c.height(),
                    $(document).on("mousemove.dragVideo", function(t) {
                        e && $(".dictionary-wrap .video-container").css({
                            left: Math.min(Math.max(0, t.clientX - n), i - r),
                            top: Math.min(Math.max(d, t.clientY - a), o - s)
                        })
                    })
                }
            }),
            $(document).on("mouseup.dragVideo", function(t) {
                return 0 !== t.button ? void t.preventDefault() : void (e && (e = !1,
                $(".dictionary-wrap .video-container").removeClass("dragging"),
                $("body").off("mousemove.dragVideo")))
            })
        },
        clickSound: function(t) {
            var e = $(t.target);
            this.judgeStopRepeat();
            var n = u.generateURI({
                lan: e.attr("data-sound-lan"),
                text: e.attr("data-sound-text")
            });
            BTPM.setUrl(n);
            var a;
            e.addClass("op-sound-active"),
            a && clearTimeout(a),
            a = setTimeout(function() {
                e.removeClass("op-sound-active")
            }, 2e3),
            _hmt.push(["_trackEvent", "首页", "web端简明释义TTS"])
        },
        repeatSound: function(t) {
            var e = this
              , n = $(t.target);
            if (n.hasClass("op-repeat-running"))
                p.isover({
                    target: t.target,
                    text: "复读"
                }),
                e.shutdownRepeat(),
                _hmt.push(["_trackEvent", "首页", "web端复读按钮停止点击"]);
            else {
                if (e.shutdownRepeat(),
                f = 8,
                n.addClass("op-repeat-running"),
                v = u.generateURI({
                    lan: n.attr("data-sound-lan"),
                    text: n.attr("data-sound-text")
                }),
                BTPM.setUrl(v),
                f--,
                p.isover({
                    target: t.target,
                    text: "停止复读"
                }),
                n.attr("data-hover-tip-text", "停止复读"),
                "IE" === BTPM.stage) {
                    var a = n.siblings("b").text();
                    if (a && a.length > 0) {
                        a = a.match(/\[(.*)\]/)[1];
                        var i = e.getRepeatDuration(a);
                        h = setInterval(function() {
                            return 1 > f ? void e.shutdownRepeat() : (BTPM.setUrl(v),
                            void f--)
                        }, i)
                    }
                } else
                    m = !0,
                    $(BTPM).off("ended.repeating").on("ended.repeating", function() {
                        return m ? 1 > f ? void e.shutdownRepeat() : void (g = setTimeout(function() {
                            BTPM.setUrl(v),
                            f--
                        }, 1200)) : void 0
                    });
                _hmt.push(["_trackEvent", "首页", "web端复读按钮播放点击"])
            }
        },
        shutdownRepeat: function(t) {
            $(".op-repeat").removeClass("op-repeat-running").attr("data-hover-tip-text", "复读"),
            t && t.nopause || BTPM.doPause(),
            "IE" === BTPM.stage ? clearInterval(h) : (clearTimeout(g),
            m = !1,
            $(BTPM).off("ended.repeating"))
        },
        getRepeatDuration: function(t) {
            t = t.replace(/[\s:ˌ']|(\(\w*\))/g, "");
            var e, n = t.length;
            return e = 4 >= n ? 2e3 : n > 5 && 10 >= n ? 3e3 : n > 10 && 18 >= n ? 4e3 : 5e3
        },
        bindRepeatEvents: function() {
            var t = this;
            $(".container").off("click.repeatthing").on("click.repeatthing", "a", function() {
                var e = $(this)
                  , n = e.attr("href") || "";
                $(".op-repeat").hasClass("op-repeat-running") && !e.hasClass("op-repeat") && ((n.match(/[\.\/]/g) || e.hasClass("collection-btn")) && t.shutdownRepeat(),
                _hmt.push(["_trackEvent", "首页", "web端其他方式停止复读"]))
            })
        },
        judgeStopRepeat: function() {
            this.isNotInRepeating() || (this.shutdownRepeat({
                nopause: !0
            }),
            _hmt.push(["_trackEvent", "首页", "web端发音按钮停止复读"]))
        },
        translateStopRepeat: function() {
            return this.isNotInRepeating() ? !1 : (this.shutdownRepeat(),
            _hmt.push(["_trackEvent", "首页", "web端重新翻译停止复读"]),
            !0)
        },
        isoverSound: function(t) {
            if ("hover" === l.get("soundTriggerMode")) {
                var e = this;
                this.timer = setTimeout(function() {
                    e.clickSound({
                        target: t.target
                    })
                }, 500)
            }
        },
        isoutSound: function() {
            clearTimeout(this.timer)
        },
        isNotInRepeating: function() {
            return !$(".op-repeat") || !$(".op-repeat").hasClass("op-repeat-running")
        },
        shutdownAudio: function() {
            BTPM.doPause()
        }
    };
    $(function() {
        y.bindEvents()
    }),
    e.buildSimpleMeans = function(t) {
        y.buildSimpleMeans(t)
    }
    ,
    e.judgeStopRepeat = function() {
        y.judgeStopRepeat()
    }
    ,
    e.translateStopRepeat = function() {
        y.translateStopRepeat()
    }
    ,
    e.shutdownAudio = function() {
        y.shutdownAudio()
    }
    ,
    e.shutdownRepeat = function() {
        y.shutdownRepeat()
    }
});
;define("translation:widget/translate/details/collins/collins", function(t, e) {
    "use strict";
    function n(t) {
        return "mean" === t.type && t.value && t.value.length > 0 && (t.value[0].mean_type.length > 0 || t.value[0].def) ? !0 : !1
    }
    var i = t("translation:widget/common/third_party/template")
      , o = t("translation:widget/translate/details/dictionary/simplemeans")
      , a = t("translation:widget/common/soundURIGenerator")
      , r = t("translation:widget/common/environment")
      , s = $("#left-result-container");
    i.helper("genCollinsTranAgain", function(t) {
        t = $.trim($("<div>").html(t).text());
        var e = t.split(";")
          , n = [];
        return $.each(e, function(t, e) {
            var i = void 0;
            if (e)
                if (i = e.match(/(\d+)$/)) {
                    var o = e.split(/\d+$/)[0];
                    n.push('<a href="/#en/zh/' + encodeURIComponent(o) + '" class="sec-trans">' + o + "</a>" + i[0])
                } else
                    n.push('<a href="/#en/zh/' + encodeURIComponent(e) + '" class="sec-trans">' + e + "</a>")
        }),
        n.join(";&nbsp; ")
    });
    var l = {
        buildCollins: function(t) {
            var e = t.data
              , o = {};
            if (e.menus)
                for (var a = e.menus.length, r = 0; a > r; r++) {
                    var l = e.menus[r];
                    if (l.entry)
                        for (var u = l.entry.length, c = 1, d = 0; u > d; d++) {
                            var m = l.entry[d];
                            n(m) && (m.isValid = !0,
                            m.idxid = c++)
                        }
                }
            else if (e.entry)
                for (var v = e.entry.length, c = 1, r = 0; v > r; r++) {
                    var l = e.entry[r];
                    n(l) && (l.isValid = !0,
                    l.idxid = c++)
                }
            o.tplData = e;
            var f = i("tplCollins", o);
            s.append(f)
        },
        bindEvents: function() {
            var t = this;
            $(".translate-wrap").on("click", ".collins-item .op-sound", function() {
                t.clickSound({
                    target: this
                })
            }).on("mouseenter", ".collins-item .op-sound", function() {
                t.mouseOverSound({
                    target: this
                })
            }).on("mouseleave", ".collins-item .op-sound", function() {
                t.mouseOutSound()
            })
        },
        clickSound: function(t) {
            o.judgeStopRepeat(),
            this.timer && clearTimeout(this.timer);
            var e = $(t.target)
              , n = "en"
              , i = e.parents("p").text()
              , r = a.generateURI({
                lan: n,
                text: encodeURIComponent($.trim(i))
            });
            BTPM.setUrl(r);
            var s;
            e.addClass("op-sound-active"),
            s && clearTimeout(s),
            s = setTimeout(function() {
                e.removeClass("op-sound-active")
            }, 2e3),
            _hmt.push(["_trackEvent", "首页", "Web柯林斯词典Tab下发音按钮的发音次数"])
        },
        mouseOverSound: function(t) {
            if ("hover" === r.get("soundTriggerMode")) {
                var e = this;
                this.timer = setTimeout(function() {
                    e.clickSound({
                        target: t.target
                    })
                }, 500)
            }
        },
        mouseOutSound: function() {
            clearTimeout(this.timer)
        }
    };
    $(function() {
        l.bindEvents()
    }),
    e.buildCollins = function(t) {
        l.buildCollins(t)
    }
});
;define("translation:widget/translate/output/adcards", function(t, n) {
    "use strict";
    var e = t("translation:widget/common/environment")
      , a = t("translation:widget/common/third_party/template")
      , i = t("translation:widget/common/cookie")
      , o = window.common.hasSideAd
      , d = window.common.hasBottomBannerAd
      , r = $("#sideAdContainer")
      , s = function() {
        if (!o)
            return {};
        var t = $("#sideAdData");
        return {
            path: t.attr("data-path"),
            url: t.attr("data-url"),
            title: t.attr("data-title"),
            showad: t.attr("data-showad") || 0
        }
    }()
      , p = void 0
      , c = void 0
      , h = {
        buildAd: function() {
            var t = "0" === i.getCookie("HISTORY_SWITCH")
              , n = a("tplSideAd", {
                hasSideAd: o,
                sideAdData: s,
                isLong: t && !d
            });
            r.html(n),
            p = r.find(".app-side-ad"),
            c = r.find(".trans-side-ad-wrap")
        },
        bindEvents: function() {
            $(".translate-wrap").on("click", ".app-side-ad.long", function() {
                _hmt.push(["_trackEvent", "首页", "首页页面_翻译桌面端长banner点击"]),
                window.open(window.location.origin + "/client/download/redirect")
            }).on("click", ".app-side-ad:not(.long)", function() {
                _hmt.push(["_trackEvent", "首页", "首页页面_翻译桌面端右侧banner点击"]),
                window.open(window.location.origin + "/client/download/redirect")
            }),
            $(".translate-wrap").on("click", ".showad-close-btn", function(t) {
                $(".trans-side-ad-wrap").hide();
                var n = (new Date).getTime()
                  , e = Math.floor(n / 864e5);
                i.setCookie("sideAdClose", e),
                _hmt.push(["_trackEvent", "首页", "web端侧边栏广告关闭点击"]),
                t.preventDefault(),
                t.stopPropagation()
            }).on("click", ".side-ad-link", function() {
                _hmt.push(["_trackEvent", "首页", "web端侧边栏图文广告链接点击"])
            })
        },
        updateAppSideAdLong: function() {
            var t = e.get("hasDetail")
              , n = e.get("isInHistoryMode")
              , a = !t && !n && !d;
            return p.toggleClass("long", a),
            a
        },
        hideAppQr: function() {
            window.common.hasSideAd && c.hide(),
            p.removeClass("detail-qr");
            var t = h.updateAppSideAdLong();
            p.show(),
            _hmt.push(t ? ["_trackEvent", "首页", "89_首页页面_初始状态长banner展现"] : ["_trackEvent", "首页", "91_首页页面_初始状态右侧banner展现"])
        },
        showAppQr: function() {
            o ? (c.show(),
            p.hide(),
            _hmt.push(["_trackEvent", "首页", "web端侧边栏广告生成"]),
            _hmt.push(["_trackEvent", "首页", "web端侧边栏广告总展现"])) : (p.addClass("detail-qr"),
            h.updateAppSideAdLong(),
            p.show(),
            _hmt.push(["_trackEvent", "首页", "93_首页页面_结果页右侧banner展现"]))
        }
    };
    $(function() {
        h.buildAd(),
        h.bindEvents()
    }),
    n.hideAppQr = function() {
        h.hideAppQr()
    }
    ,
    n.showAppQr = function(t) {
        h.showAppQr(t)
    }
    ,
    n.updateAppSideAdLong = function() {
        h.updateAppSideAdLong()
    }
});
;define("translation:widget/translate/details/translator/translator", function(t, n, e) {
    "use strict";
    var o = t("translation:widget/common/third_party/template")
      , a = t("translation:widget/common/soundURIGenerator")
      , r = t("translation:widget/translate/details/dictionary/simplemeans")
      , i = t("translation:widget/common/environment")
      , s = $("#left-result-container")
      , u = {
        init: function() {
            this.bindEvents()
        },
        bindEvents: function() {
            var t = this;
            s.on("click", "#transTranslator .op-sound", function(n) {
                t.clickSound({
                    target: n.currentTarget
                })
            }).on("mouseenter", "#transTranslator .op-sound", function(n) {
                t.mouseOverSound({
                    target: n.currentTarget
                })
            }).on("mouseleave", "#transTranslator .op-sound", function() {
                t.mouseOutSound()
            })
        },
        build: function(t) {
            var n = 0 === parseInt(i.get("firstModuleId"), 10)
              , e = ""
              , a = t || {};
            a.jd = a.jdweb ? a.jdweb : "",
            a.img = a.imgweb ? a.imgweb : "",
            a.isFirstCard = n,
            e = o("tplTranslator", {
                tplData: a
            }),
            s.append(e),
            window._hmt.push(["_trackEvent", "首页", "49_首页页面_翻译家推荐模块展现次数"])
        },
        clickSound: function(t) {
            r.judgeStopRepeat(),
            this.timer && clearTimeout(this.timer);
            var n = $(t.target)
              , e = a.generateURI({
                lan: n.attr("data-sound-lan"),
                text: n.attr("data-sound-text")
            });
            BTPM.setUrl(e);
            var o = void 0;
            n.addClass("op-sound-active"),
            o && clearTimeout(o),
            o = setTimeout(function() {
                n.removeClass("op-sound-active")
            }, 2e3),
            _hmt.push(["_trackEvent", "首页", "52_首页页面_翻译家原文发音按钮的点击量"])
        },
        mouseOverSound: function(t) {
            var n = this;
            "hover" === i.get("soundTriggerMode") && (this.timer = setTimeout(function() {
                n.clickSound({
                    target: t.target
                })
            }, 500))
        },
        mouseOutSound: function() {
            clearTimeout(this.timer)
        }
    };
    $(function() {
        u.init()
    }),
    e.exports = u
});
;define("translation:widget/translate/details/festivalLink/festivalLink", function(t, n, i) {
    "use strict";
    function e() {
        a()
    }
    function a() {
        _hmt.push(["_trackEvent", "首页", "web端时效文字链展示"]),
        o.on("click", "#festival-link", function() {
            _hmt.push(["_trackEvent", "首页", "web端时效文字链点击"])
        })
    }
    function l() {
        var t = s("tplFestivalLink", window.festivalLinkInfo);
        o.append(t)
    }
    var s = t("translation:widget/common/third_party/template")
      , o = $("#left-result-container");
    i.exports = {
        init: e,
        buildFestivalLink: l
    }
});
;define("translation:widget/translate/details/edict/edict", function(t, e, n) {
    "use strict";
    var i = t("translation:widget/common/third_party/template")
      , o = t("translation:widget/translate/details/dictionary/simplemeans")
      , a = t("translation:widget/common/soundURIGenerator")
      , r = t("translation:widget/common/environment")
      , u = $("#left-result-container")
      , d = {
        bindEvents: function() {
            $(".translate-wrap").on("click", ".item-edict .op-sound", function(t) {
                d.clickSound({
                    target: t.currentTarget
                })
            }).on("mouseenter", ".item-edict .op-sound", function(t) {
                d.mouseOverSound({
                    target: t.currentTarget
                })
            }).on("mouseleave", ".item-edict .op-sound", function() {
                d.mouseOutSound()
            })
        },
        clickSound: function(t) {
            o.judgeStopRepeat(),
            this.timer && clearTimeout(this.timer);
            var e = $(t.target)
              , n = a.generateURI({
                lan: e.attr("data-sound-lan"),
                text: e.attr("data-sound-text")
            });
            BTPM.setUrl(n);
            var i = void 0;
            e.addClass("op-sound-active"),
            i && clearTimeout(i),
            i = setTimeout(function() {
                e.removeClass("op-sound-active")
            }, 2e3),
            _hmt.push(["_trackEvent", "首页", "65_首页页面_Web英英释义Tab下发音按钮的发音次数"])
        },
        mouseOverSound: function(t) {
            var e = this;
            "hover" === r.get("soundTriggerMode") && (this.timer = setTimeout(function() {
                e.clickSound({
                    target: t.target
                })
            }, 500))
        },
        mouseOutSound: function() {
            clearTimeout(this.timer)
        },
        buildEdict: function(t) {
            var e = t.data
              , n = {};
            n.tplData = e.item;
            var o = i("tplEnglishmean", n);
            u.append(o)
        }
    };
    $(function() {
        d.bindEvents()
    }),
    n.exports = {
        buildEdict: d.buildEdict
    }
});
;define("translation:widget/translate/details/zdict/zdict", function(t, a, e) {
    "use strict";
    function i(t) {
        var a = t.data
          , e = {};
        e.tplData = {},
        e.tplData.word = a.word,
        a.simple ? e.tplData.simple = a.simple : a.detail && a.detail.chenyu ? e.tplData.chenyu = a.detail.chenyu : a.detail && a.detail.means && (e.tplData.simple = a.detail);
        var i = l("tplChinesemean", e);
        n.append(i)
    }
    var l = t("translation:widget/common/third_party/template")
      , n = $("#left-result-container");
    e.exports = {
        buildZdict: i
    }
});
;define("translation:widget/translate/favo/favoHelper", function(r, e) {
    "use strict";
    var t = {
        parseNormalResult: function() {
            var r = $(".output-wrap .output-bd").find(".target-output")
              , e = "";
            return 0 === r.length ? e : (r.each(function() {
                e += $(this).html().replace(/<br( \/)?>/gi, "&lt;br$1&gt;") + "<br />"
            }),
            e = e.replace(/<(?!br \/)[^<>]*>/gi, "").replace(/<br \/>/gi, "\r\n"),
            e = e.replace(/&nbsp;/gim, " "),
            $.trim(e))
        },
        parseDictResult: function() {
            var r = $(".dictionary-wrap .dictionary-output")
              , e = "";
            if (0 === r.length)
                return e;
            var e;
            return r.each(function() {
                e += $(this).find(".dictionary-title").html(),
                e += $(this).find(".dictionary-comment").html()
            }),
            e = e.replace(/<(?!\/(div|p))[^<>]*>/gi, "").replace(/<\/(div|p)>/gi, "\r\n"),
            e = e.replace(/&gt;/gim, ">"),
            e = e.replace(/&lt;/gim, "<"),
            e = e.replace("详细释义>>", ""),
            e = e.replace(/&nbsp;/gim, " "),
            $.trim(e)
        },
        parseZonedWordResult: function(r) {
            var e, t = "";
            return 1 === r ? (e = $(".zonedword-result .dictionary-output"),
            t += e.html(),
            t = t.replace(/<(?!\/(div|p))[^<>]*>/gi, "").replace(/<\/(div|p)>/gi, "\r\n"),
            t = t.replace(/&gt;/gim, ">"),
            t = t.replace(/&lt;/gim, "<"),
            t = t.replace("详细释义>>", "")) : (e = $(".zonedword-result .output-bd").find(".target-output"),
            e.each(function() {
                t += $(this).html().replace(/<br( \/)?>/gi, "&lt;br$1&gt;") + "<br />"
            }),
            t = t.replace(/<(?!br \/)[^<>]*>/gi, "").replace(/<br \/>/gi, "\r\n")),
            t = t.replace(/&nbsp;/gim, " "),
            $.trim(t)
        }
    };
    e.parseNormalResult = function() {
        return t.parseNormalResult()
    }
    ,
    e.parseDictResult = function() {
        return t.parseDictResult()
    }
    ,
    e.parseZonedWordResult = function(r) {
        return t.parseZonedWordResult(r)
    }
});
;define("translation:widget/translate/favo/collInfo", function(t, n, e) {
    "use strict";
    function r(t) {
        return function() {
            var n = t.apply(this, arguments);
            return new Promise(function(t, e) {
                function r(o, i) {
                    try {
                        var a = n[o](i)
                          , u = a.value
                    } catch (c) {
                        return void e(c)
                    }
                    return a.done ? void t(u) : Promise.resolve(u).then(function(t) {
                        r("next", t)
                    }, function(t) {
                        r("throw", t)
                    })
                }
                return r("next")
            }
            )
        }
    }
    var o = t("translation:widget/common/environment")
      , i = t("translation:widget/common/collGroupUtil")
      , a = t("translation:widget/common/util").getDisplayLength
      , u = {
        getDefaultGroupAsync: function() {
            var t = this;
            return r(regeneratorRuntime.mark(function n() {
                var e, r;
                return regeneratorRuntime.wrap(function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            if (e = o.get("collInfo"),
                            "number" == typeof e.defaultId) {
                                t.next = 6;
                                break
                            }
                            return t.next = 4,
                            i.getDefaultGroupAsync();
                        case 4:
                            r = t.sent,
                            e.defaultId = r;
                        case 6:
                        case "end":
                            return t.stop()
                        }
                }, n, t)
            }))()
        },
        getCollGroupListAsync: function() {
            var t = this;
            return r(regeneratorRuntime.mark(function n() {
                var e, r;
                return regeneratorRuntime.wrap(function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            if (e = o.get("collInfo"),
                            0 !== e.groupList.length) {
                                t.next = 7;
                                break
                            }
                            return t.next = 4,
                            i.getCollGroupListAsync();
                        case 4:
                            r = t.sent,
                            r.forEach(function(t) {
                                t.nameDisplayLength = a(t.name)
                            }),
                            e.groupList = r;
                        case 7:
                        case "end":
                            return t.stop()
                        }
                }, n, t)
            }))()
        },
        init: function() {
            var t = {};
            t.groupList = [],
            o.set("collInfo", t)
        }
    };
    e.exports = u
});

;define("translation:widget/translate/input/inputCollGroup/inputCollGroup", function(n, o, t) {
    "use strict";
    n("translation:widget/common/third_party/jquery_scrollbar/jquery_scrollbar");
    var i = n("translation:widget/common/third_party/template")
      , e = n("translation:widget/translate/favo/collInfo")
      , l = n("translation:widget/common/environment")
      , a = n("translation:widget/common/collGroupUtil")
      , r = n("translation:widget/common/util").getDisplayLength
      , c = $(".input-coll-extra-container")
      , u = $(".input-coll-extra-container ol.input-coll-ol")
      , s = $(".input-coll-extra-container .new-group-name")
      , p = $(".input-coll-extra-container .new-group-confirm")
      , d = $(".input-coll-extra-container .new-coll-group-err-msg")
      , f = $(".input-coll-extra-container .close-input-coll-group")
      , g = $(".op-favor-container")
      , h = $(".op-favor-container .op-favo")
      , m = $(".input-coll-extra-container .add-new-group")
      , v = $(".input-coll-extra-container .new-coll-group-input-container")
      , w = null
      , C = {
        show: function() {
            _hmt.push(["_trackEvent", "首页", "17_首页页面_输入框收藏分组列表浮层展示"]),
            u.empty(),
            e.getCollGroupListAsync().then(function() {
                var n = i("tpl-input-ol", {
                    groupList: l.get("collInfo").groupList
                });
                u.html(n),
                m.show(),
                v.hide(),
                c.show(),
                h.addClass("op-favo-hover")
            })
        },
        hide: function() {
            c.hide(),
            s.val(""),
            p.addClass("disabled-new-group-confirm"),
            d.hide(),
            h.removeClass("op-favo-hover")
        },
        init: function() {
            $(".input-coll-ol.scrollbar-inner").scrollbar({
                disableBodyScroll: !0
            }),
            C.bindEvent()
        },
        bindEvent: function() {
            $(document).on("click", function(n) {
                var o = $(n.target);
                "none" === c.css("display") || o.is(g) || 0 !== g.has(o).length || C.hide()
            }),
            u.on("click", ".input-coll-li", function() {
                var n = l.get("inputFavo");
                n.add($(this).attr("data-group-id"))
            }),
            m.on("click", function() {
                m.hide(),
                v.show()
            }),
            s.on("input", function() {
                $(this).val() || $(this)[0].value ? p.removeClass("disabled-new-group-confirm") : p.addClass("disabled-new-group-confirm")
            }),
            p.on("click", C.newGroupAndAddColl),
            s.keydown(function(n) {
                return 13 === parseInt(n.keyCode, 10) ? (n.preventDefault(),
                C.newGroupAndAddColl(),
                !1) : void 0
            }),
            f.on("click", function() {
                C.hide()
            })
        },
        newGroupAndAddColl: function() {
            if (!p.hasClass("disabled-new-group-confirm")) {
                _hmt.push(["_trackEvent", "首页", "19_首页页面_输入框收藏分组创建并添加按钮点击"]);
                var n = s.val() || s[0].value;
                a.newCollGroupAsync(n, !1).then(function(o) {
                    l.get("collInfo").groupList.push({
                        name: n,
                        id: o,
                        nameDisplayLength: r(n)
                    }),
                    l.get("inputFavo").add(o)
                }, function(n) {
                    w && clearTimeout(w),
                    d.text("创建失败：" + n),
                    d.show(),
                    setTimeout(function() {
                        d.slideUp()
                    }, 2e3)
                })
            }
        }
    };
    t.exports = C
});
;define("translation:widget/translate/zonedword/zonedCollGroup/zonedCollGroup", function(o, n, t) {
    "use strict";
    o("translation:widget/common/third_party/jquery_scrollbar/jquery_scrollbar");
    var i = o("translation:widget/common/third_party/template")
      , e = o("translation:widget/translate/favo/collInfo")
      , l = o("translation:widget/common/environment")
      , d = $(".zoned-coll-extra-container")
      , r = $(".zoned-coll-extra-container ol.zoned-coll-ol")
      , a = $(".zonedword-download-tip .zonedword-close-coll-link")
      , c = $(".zonedword-download-tip .zonedword-detail-link")
      , s = $(".zoned-coll-group-container")
      , h = $("#zonedword-wrap .op-favo")
      , p = {
        show: function() {
            _hmt.push(["_trackEvent", "首页", "20_首页页面_划词翻译框收藏分组列表浮层展示"]),
            h.addClass("op-favo-hover"),
            d.css("visibility", "hidden"),
            s.css("max-height", "0"),
            r.empty(),
            e.getCollGroupListAsync().then(function() {
                var o = i("tpl-zoned-ol", {
                    groupList: l.get("collInfo").groupList
                });
                r.html(o),
                d.show(),
                c.hide(),
                a.show()
            })
        },
        hide: function() {
            h.removeClass("op-favo-hover"),
            d.hide(),
            a.hide(),
            c.show()
        },
        bindEvent: function() {
            r.on("click", ".zoned-coll-li", function() {
                var o = l.get("zonedFavo");
                o.add($(this).attr("data-group-id"))
            }),
            a.on("click", function() {
                p.hide()
            })
        },
        init: function() {
            s.scrollbar({
                onUpdate: function() {
                    d.css("visibility", "visible")
                },
                disableBodyScroll: !0
            }),
            p.bindEvent()
        }
    };
    t.exports = p
});
;define("translation:widget/translate/favo/favo", function(t, e, n) {
    "use strict";
    function o(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    function i(t) {
        return function() {
            var e = t.apply(this, arguments);
            return new Promise(function(t, n) {
                function o(i, r) {
                    try {
                        var s = e[i](r)
                          , a = s.value
                    } catch (d) {
                        return void n(d)
                    }
                    return s.done ? void t(a) : Promise.resolve(a).then(function(t) {
                        o("next", t)
                    }, function(t) {
                        o("throw", t)
                    })
                }
                return o("next")
            }
            )
        }
    }
    function r(t) {
        this.pos = t.pos || "input",
        this.$btn = $(t.target),
        this.ts = 0,
        this.handles = {
            change: []
        }
    }
    var s = t("translation:widget/redux/store")
      , a = o(s)
      , d = t("translation:widget/redux/indexInfo/noteInfo")
      , c = t("translation:widget/common/fanyiUtil")
      , u = o(c)
      , l = t("translation:widget/translate/favo/commonCollGroup/commonCollGroup.jsx")
      , h = t("translation:widget/login/login")
      , f = t("translation:widget/translate/output/mouseover")
      , p = t("translation:widget/common/environment")
      , v = t("translation:widget/translate/favo/favoHelper")
      , y = t("translation:widget/translate/favo/collInfo")
      , w = t("translation:widget/translate/input/inputCollGroup/inputCollGroup")
      , g = t("translation:widget/translate/zonedword/zonedCollGroup/zonedCollGroup");
    r.prototype = {
        constructor: r,
        init: function(t) {
            var e = t.query.replace(/<br( \/)?>/gi, "&lt;br$1&gt;")
              , n = t.from + "2" + t.to
              , o = +new Date;
            return "input" === this.pos && o - this.ts < 300 && e === this.query && n === this.direction ? void (this.ts = o) : (this.ts = o,
            this.resetBtn(),
            this.query = e,
            this.direction = n,
            this.dictJSON = t.dictJSON || "",
            this.type = t.type || "",
            this.fanyiDst = t.fanyiDst || "",
            this.$btn.show(),
            this.check(),
            this.bindEvent(),
            this)
        },
        resetBtn: function() {
            this.query = "",
            this.direction = "",
            this.saved = !1,
            this.id = null,
            this.dictJSON = "",
            this.$btn.off("click.favo").attr({
                "data-hover-tip-text": "添加到收藏夹",
                title: "添加到收藏夹"
            }).removeClass("op-favo-cur").hide()
        },
        bindEvent: function() {
            var t = this;
            this.$btn.on("click.favo", function() {
                var e = p.get("account");
                "" !== e.is_login ? (t.saved ? t.deleteItem() : y.getDefaultGroupAsync().then(function() {
                    var e = p.get("collInfo");
                    -1 !== e.defaultId ? t.add(e.defaultId) : "input" === t.pos ? w.show() : "zonedword" === t.pos && "none" === $(".zoned-coll-extra-container").css("display") ? g.show() : "keyword" === t.pos && l.createCommonCollGroup({
                        containerEle: t.$btn.siblings(".keyword-coll-group-container")[0],
                        favorInstance: t
                    })
                }),
                !e.add_name && window.confirm("嗨，你的账户需要先添加个名字喔!") && window.open("https://passport.baidu.com/v2/?ucenteradduname")) : h.newLoginInstanceAsync()
            })
        },
        check: function() {
            var t = p.get("account");
            if ("" !== t.is_login) {
                var e = this;
                !function(t, n) {
                    $.ajax({
                        url: "/pcnewcollection?req=check",
                        type: "GET",
                        data: {
                            fanyi_src: e.query,
                            direction: e.direction
                        },
                        datatype: "json",
                        cache: !1,
                        success: function(o) {
                            if (0 === o.errno ? e.favorIsSaved({
                                id: o.id,
                                firstScreen: !0,
                                reqQurey: t,
                                reqDirection: n
                            }) : e.favorIsNotSaved({
                                reqQurey: t,
                                reqDirection: n
                            }),
                            "input" === e.pos) {
                                var i = o.note
                                  , r = o.report;
                                i || (i = ""),
                                r || (r = ""),
                                a.default.dispatch(i || r ? d.updateNoteInfo({
                                    showNotePanel: !0,
                                    noteContent: i,
                                    reportContent: r,
                                    hasModified: !1
                                }) : d.clearNoteInfo())
                            }
                        },
                        error: function() {
                            e.favorIsNotSaved({
                                reqQurey: t,
                                reqDirection: n
                            })
                        }
                    })
                }(this.query, this.direction)
            }
        },
        favorIsSaved: function(t) {
            if (this.query === t.reqQurey && this.direction === t.reqDirection) {
                var e = this.$btn;
                this.saved = !0,
                this.id = t.id;
                var n = t.firstScreen || !1;
                n || (e.attr("data-hover-tip-text", "已收藏"),
                f.isover({
                    target: e[0]
                }),
                setTimeout(function() {
                    f.isout()
                }, 2e3)),
                e.attr({
                    "data-hover-tip-text": "取消收藏",
                    title: "取消收藏"
                }).addClass("op-favo-cur")
            }
        },
        favorIsNotSaved: function(t) {
            if (this.query === t.reqQurey && this.direction === t.reqDirection) {
                this.saved = !1,
                this.id = null;
                var e = this.$btn;
                e.attr({
                    "data-hover-tip-text": "添加到收藏夹",
                    title: "添加到收藏夹"
                }).removeClass("op-favo-cur"),
                t.firstScreen && (e.attr("data-hover-tip-text", "已取消收藏"),
                f.isover({
                    target: e[0]
                }),
                setTimeout(function() {
                    f.isout(),
                    e.attr("data-hover-tip-text", "添加到收藏夹")
                }, 2e3))
            }
        },
        add: function(t) {
            var e = this;
            return new Promise(function(n, o) {
                var i = {
                    fanyi_src: e.query,
                    direction: e.direction,
                    gid: t,
                    bdstoken: window.bdstoken
                };
                "input" === e.pos ? (i.fanyi_dst = v.parseNormalResult(),
                i.dict = e.dictJSON ? v.parseDictResult() : "",
                i.dict_json = e.dictJSON) : "zonedword" === e.pos ? (i.type = e.type,
                i.fanyi_dst = v.parseZonedWordResult(e.type)) : "keyword" === e.pos && (i.type = 1,
                i.fanyi_dst = e.fanyiDst);
                var r = p.get("maxCollectionCount");
                if (e.query.length > r || i.fanyi_dst.length > r)
                    return alert("囧, 原文和译文要是在" + r + "字以下就好啦 ^_^"),
                    void o();
                "input" === e.pos ? _hmt.push(["_trackEvent", "首页", "web端输入框收藏结果点击次数"]) : "zonedword" === e.pos ? _hmt.push(["_trackEvent", "首页", "web端划词框收藏结果点击次数"]) : "keyword" === e.pos && _hmt.push(["_trackEvent", "首页", "web端重点词汇收藏结果点击次数"]);
                var s = e;
                !function(t, e) {
                    $.ajax({
                        url: "/pcnewcollection?req=add",
                        type: "POST",
                        data: i,
                        datatype: "json",
                        success: function(i) {
                            0 === i.errno ? (s.favorIsSaved({
                                id: i.id,
                                reqQurey: t,
                                reqDirection: e
                            }),
                            "input" === s.pos ? w.hide() : "zonedword" === s.pos ? g.hide() : "keyword" === s.pos && l.destroyCommonCollGroup({
                                containerEle: s.$btn.siblings(".keyword-coll-group-container")[0],
                                favorInstance: s
                            }),
                            s.trigger("change"),
                            n()) : (s.favorIsNotSaved({
                                reqQurey: t,
                                reqDirection: e
                            }),
                            o())
                        },
                        error: function() {
                            o()
                        }
                    })
                }(e.query, e.direction)
            }
            )
        },
        deleteItem: function() {
            if (void 0 !== this.id && null !== this.id) {
                "input" === this.pos ? _hmt.push(["_trackEvent", "首页", "web端输入框取消收藏点击次数"]) : "zonedword" === this.pos ? _hmt.push(["_trackEvent", "首页", "web端划词框取消收藏点击次数"]) : "keyword" === this.pos && _hmt.push(["_trackEvent", "首页", "web端重点词汇取消收藏点击次数"]);
                var t = this;
                !function(e, n) {
                    $.ajax({
                        url: "/pcnewcollection?req=del",
                        type: "POST",
                        data: {
                            id: t.id,
                            bdstoken: window.bdstoken
                        },
                        datatype: "json",
                        success: function(o) {
                            0 === o.errno && (t.favorIsNotSaved({
                                firstScreen: !0,
                                reqQurey: e,
                                reqDirection: n
                            }),
                            t.trigger("change"))
                        }
                    })
                }(this.query, this.direction)
            }
        },
        saveNote: function(t) {
            var e = this;
            return i(regeneratorRuntime.mark(function n() {
                var o;
                return regeneratorRuntime.wrap(function(n) {
                    for (; ; )
                        switch (n.prev = n.next) {
                        case 0:
                            if (o = e,
                            o.saved) {
                                n.next = 4;
                                break
                            }
                            return n.next = 4,
                            o.add(0);
                        case 4:
                            return n.next = 6,
                            u.default.newFetch("/pc/collection/modify", {
                                id: o.id,
                                bdstoken: window.bdstoken,
                                note: t
                            });
                        case 6:
                        case "end":
                            return n.stop()
                        }
                }, n, e)
            }))()
        },
        on: function(t, e) {
            return this.handles[t] && "[object Function]" === Object.prototype.toString.call(e) ? (this.handles[t].push(e),
            this) : void 0
        },
        off: function(t) {
            return this.handles[t] = [],
            this
        },
        trigger: function(t) {
            var e = this;
            $.each(this.handles[t], function(t, n) {
                n.call(e)
            })
        }
    },
    n.exports = r
});
;define("translation:widget/translate/input/pGrab", function(r, o, t) {
    "use strict";
    function a(r) {
        if (Array.isArray(r)) {
            for (var o = 0, t = Array(r.length); o < r.length; o++)
                t[o] = r[o];
            return t
        }
        return Array.from(r)
    }
    function n(r, o) {
        for (var t = 0; t < o.length - 2; t += 3) {
            var a = o.charAt(t + 2);
            a = a >= "a" ? a.charCodeAt(0) - 87 : Number(a),
            a = "+" === o.charAt(t + 1) ? r >>> a : r << a,
            r = "+" === o.charAt(t) ? r + a & 4294967295 : r ^ a
        }
        return r
    }
    function e(r) {
        var o = r.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g);
        if (null === o) {
            var t = r.length;
            t > 30 && (r = "" + r.substr(0, 10) + r.substr(Math.floor(t / 2) - 5, 10) + r.substr(-10, 10))
        } else {
            for (var e = r.split(/[\uD800-\uDBFF][\uDC00-\uDFFF]/), C = 0, h = e.length, f = []; h > C; C++)
                "" !== e[C] && f.push.apply(f, a(e[C].split(""))),
                C !== h - 1 && f.push(o[C]);
            var g = f.length;
            g > 30 && (r = f.slice(0, 10).join("") + f.slice(Math.floor(g / 2) - 5, Math.floor(g / 2) + 5).join("") + f.slice(-10).join(""))
        }
        var u = void 0
          , l = "" + String.fromCharCode(103) + String.fromCharCode(116) + String.fromCharCode(107);
        u = null !== i ? i : (i = window[l] || "") || "";
        for (var d = u.split("."), m = Number(d[0]) || 0, s = Number(d[1]) || 0, S = [], c = 0, v = 0; v < r.length; v++) {
            var A = r.charCodeAt(v);
            128 > A ? S[c++] = A : (2048 > A ? S[c++] = A >> 6 | 192 : (55296 === (64512 & A) && v + 1 < r.length && 56320 === (64512 & r.charCodeAt(v + 1)) ? (A = 65536 + ((1023 & A) << 10) + (1023 & r.charCodeAt(++v)),
            S[c++] = A >> 18 | 240,
            S[c++] = A >> 12 & 63 | 128) : S[c++] = A >> 12 | 224,
            S[c++] = A >> 6 & 63 | 128),
            S[c++] = 63 & A | 128)
        }
        for (var p = m, F = "" + String.fromCharCode(43) + String.fromCharCode(45) + String.fromCharCode(97) + ("" + String.fromCharCode(94) + String.fromCharCode(43) + String.fromCharCode(54)), D = "" + String.fromCharCode(43) + String.fromCharCode(45) + String.fromCharCode(51) + ("" + String.fromCharCode(94) + String.fromCharCode(43) + String.fromCharCode(98)) + ("" + String.fromCharCode(43) + String.fromCharCode(45) + String.fromCharCode(102)), b = 0; b < S.length; b++)
            p += S[b],
            p = n(p, F);
        return p = n(p, D),
        p ^= s,
        0 > p && (p = (2147483647 & p) + 2147483648),
        p %= 1e6,
        p.toString() + "." + (p ^ m)
    }
    var i = null;
    t.exports = e
});
;define("translation:widget/translate/input/sameHeightHandler", function(t, e) {
    "use strict";
    var n = {};
    n.dom = {
        $inputWrap: $(".input-wrap"),
        $outputWrap: $(".output-wrap"),
        $intputContent: $(".textarea-wrap")
    },
    n.sameHeight = function() {
        var t = this.dom;
        t.$outputContent = t.$outputWrap.find(".ordinary-wrap .output-bd");
        var e = "padding-bottom";
        if (t.$intputContent.css(e, 0),
        t.$outputContent.css(e, 0),
        t.$outputWrap.removeAttr("style"),
        $(".output-blank").get(0) && !$(".dictionary-wrap").get(0))
            return void t.$outputWrap.outerHeight(t.$inputWrap.outerHeight() + 2);
        var n = 55
          , u = 61
          , a = t.$intputContent.outerHeight() + n
          , i = t.$outputContent.outerHeight() + u;
        if (!(139 > a && 139 > i)) {
            var r = a - i;
            switch (!0) {
            case r > 0:
                t.$outputContent.css(e, r + "px");
                break;
            case 0 > r:
                t.$intputContent.css(e, -r + "px")
            }
        }
    }
    ,
    e.sameHeight = function() {
        var t = $(".output-wrap .textarea-wrap").length > 0;
        return t ? void n.sameHeightWhileEditingResult() : void n.sameHeight()
    }
});
;define("translation:widget/translate/input/correct", function(t, r) {
    "use strict";
    var e, n = t("translation:widget/common/environment"), c = t("translation:widget/common/util"), o = (t("translation:widget/translate/input/prompt"),
    t("translation:widget/translate/input/translate")), i = "http://correctxt.baidu.com/correctxt?callback=?";
    "https:" === location.protocol && (i = "https://correctxt.baidu.com/correctxt?callback=?");
    var s = {
        tpl: ['<span class="correct-text">您是不是要找:</span>', '<a href="###" class="correct-link correct-query">$${correctxt}</a>'].join(""),
        showCorrect: function() {
            $(".trans-correct").show()
        },
        hideCorrect: function() {
            $(".trans-correct").hide()
        },
        isQueryInCheck: function() {
            return n.get("queryInCheck")
        },
        isEnglishQuery: function(t) {
            return /^[a-z ]+$/gim.test(t)
        },
        setQueryIsInCheck: function() {
            n.set("queryInCheck", !0),
            setTimeout(function() {
                n.set("queryInCheck", !1)
            }, 200)
        },
        setLastInput: function(t) {
            var r = this;
            return !this.isEnglishQuery(t) || t.length > 20 || t.length < 3 ? void $(".trans-correct").hide() : (clearTimeout(e),
            void (e = setTimeout(function() {
                var e = n.get("lastquery");
                t !== e && (n.set("lastquery", t),
                r.ajaxCorrect(t))
            }, 300)))
        },
        getCorrect: function(t) {
            if (this.setLastInput(t),
            !this.isQueryInCheck()) {
                if (!this.isEnglishQuery(t) || t.length > 20 || t.length < 3)
                    return void $(".trans-correct").hide();
                var r = n.get("lastquery");
                t !== r && (this.setQueryIsInCheck(t),
                n.set("lastquery", t),
                this.ajaxCorrect(t))
            }
        },
        ajaxCorrect: function(t) {
            var r = {
                text: decodeURIComponent(t),
                ie: "utf-8",
                version: "0",
                from: "FanyiWeb"
            };
            $.getJSON(i, r, $.proxy(this.renderCorrect, this))
        },
        renderCorrect: function(t) {
            if (t.success && t.origtxt !== t.correctxt) {
                var r = c.formatString(this.tpl, {
                    correctxt: t.correctxt
                });
                $(".trans-prompt").hide(),
                $(".trans-correct").html(r),
                this.showCorrect(),
                _hmt.push(["_trackEvent", "首页", "web端query纠错出现次数"])
            } else
                this.hideCorrect()
        },
        onCorrect: function(t) {
            $("#baidu_translate_input").val(t),
            o.onTranslate(),
            this.hideCorrect()
        }
    };
    r.hide = function() {
        s.hideCorrect()
    }
    ,
    r.show = function(t) {
        s.getCorrect(t)
    }
    ,
    r.onCorrect = function(t) {
        s.onCorrect(t)
    }
});
;define("translation:widget/translate/input/urlQueryHandler", function(t, r) {
    "use strict";
    var l = {};
    l.tpl = ['<div class="url-tip">', "点击翻译按钮，可以对您输入的网站进行全文翻译。", "</div>"].join(""),
    l.dealUrlQuery = function() {
        $(".operate-btn").css("display", "none"),
        $(".ordinary-wrap").length > 0 ? $(".ordinary-wrap").html(this.tpl) : ($(".output-wrap").html(this.tpl),
        $(".url-tip").css({
            margin: "10px"
        }))
    }
    ,
    r.dealUrlQuery = function() {
        l.dealUrlQuery()
    }
});
;define("translation:widget/translate/input/soundicon", function(n, t) {
    "use strict";
    var o = n("translation:widget/common/config/sound")
      , e = n("translation:widget/common/string")
      , i = n("translation:widget/translate/input/textarea")
      , s = {
        soundBtn: $(".input-wrap .op-sound"),
        fromSelect: $(".select-from-language .language-selected"),
        show: function() {
            var n = this.fromSelect.attr("data-lang");
            this.removeDisableSoundBtn();
            var t = o.getMaxSoundLength(n)
              , s = e.getByte(i.getVal());
            return !o.isLangSound(n) || s > t ? (this.showDisableSoundIcon(),
            void this.hideSoundBtn()) : void this.showSoundBtn()
        },
        removeDisableSoundBtn: function() {
            $(".op-sound-disable").remove()
        },
        showDisableSoundIcon: function() {
            this.soundBtn.after('<div class="op-sound-disable"><div>')
        },
        showSoundBtn: function() {
            this.soundBtn.css("display", "block")
        },
        hideSoundBtn: function() {
            this.soundBtn.css("display", "none")
        },
        getElem: function() {
            return $(".input-wrap .op-sound")
        }
    };
    t.show = function() {
        s.show()
    }
    ,
    t.hide = function() {
        s.hideSoundBtn(),
        s.removeDisableSoundBtn()
    }
    ,
    t.getElem = function() {
        return s.getElem()
    }
});
;define("translation:widget/translate/output/transCB", function(t, n) {
    "use strict";
    var e = t("translation:widget/translate/output/mouseover")
      , r = t("translation:widget/common/third_party/clipboard")
      , a = void 0
      , o = {
        init: function() {
            var t = this
              , n = $(".ordinary-wrap .op-copy")[0];
            a = new r(n,{
                target: function() {
                    return $(".output-wrap .output-bd")[0]
                },
                text: function() {
                    return t.getCopyedText()
                }
            }),
            this.zclipTran = a,
            this.bindEvent()
        },
        bindEvent: function() {
            var t = this;
            a.on("success", function() {
                t.aftercopy()
            }).on("error", function(t) {
                t.clearSelection(),
                t.select($(".output-wrap .output-bd")[0]),
                window._hmt.push(["_trackEvent", "首页", "61_首页页面_点击复制后【无法复制】次数"])
            })
        },
        aftercopy: function() {
            var t = $(".ordinary-wrap .op-copy")
              , n = t[0];
            t.addClass("op-copy-hover"),
            setTimeout(function() {
                t.removeClass("op-copy-hover")
            }, 2e3);
            var r = $(".op-double-lang span")
              , a = r.hasClass("op-checked") ? "已复制双语结果" : "已复制";
            e.isover({
                target: n,
                text: a
            })
        },
        getCopyedText: function() {
            var t = !!$(".op-double-lang span").hasClass("op-checked")
              , n = void 0;
            n = $(".output-wrap .output-bd").find(t ? ".ordinary-output" : ".target-output");
            var e = "";
            return n.each(function() {
                e += $.trim($(this).html()) + "<br />"
            }),
            "ara" === $(".select-to-language .language-selected").attr("data-lang") && (e = e.replace(/(<\/span>)/gi, "&nbsp;$1")),
            e = e.replace(/<(?!br \/)[^<>]*>/gi, "").replace(/<br \/>/gi, "\r\n"),
            e = e.replace(/&nbsp;/gim, " "),
            e = e.replace(/&gt;/gim, ">"),
            e = e.replace(/&lt;/gim, "<"),
            e = e.replace(/\r\n$/gim, ""),
            e = $.trim(e)
        },
        destroy: function() {
            this.zclipTran && this.zclipTran.destroy()
        }
    };
    n.init = function() {
        o.init()
    }
    ,
    n.zclipTran = function() {
        return o.zclipTran
    }
});
;define("translation:widget/translate/output/jpHandler", function(t, e) {
    "use strict";
    var n = (t("translation:widget/common/environment"),
    t("translation:widget/common/string"))
      , r = {
        execData: function(t) {
            this.hasJpPinyin = !1;
            for (var e = t.length, n = 0; e > n; ++n)
                if (t[n].result && t[n].result.length > 0) {
                    this.hasJpPinyin = !0;
                    break
                }
        },
        getNewJpData: function(t) {
            for (var e = [], r = t.length, a = 0; r > a; ++a) {
                var s, i = 0, u = t[a].src, l = n.getByte(u);
                e[a] = [];
                for (var c = 0, o = t[a].result.length; o >= c; c++) {
                    var p, f;
                    if (c === o) {
                        if (p = l,
                        p !== i) {
                            var h = n.cutByByte(u, i, p)
                              , g = {
                                src: h,
                                dst: ""
                            };
                            e[a].push(g)
                        }
                    } else {
                        if (s = 0 === a ? t[a].result[c][2][0] : t[a].result[c][4][0],
                        p = parseInt(s.split("|")[0], 10),
                        f = parseInt(s.split("|")[1], 10) + p,
                        p !== i) {
                            var h = n.cutByByte(u, i, p)
                              , g = {
                                src: h,
                                dst: ""
                            };
                            e[a].push(g)
                        }
                        var v = {
                            src: t[a].result[c][6],
                            dst: t[a].result[c][1]
                        };
                        e[a].push(v),
                        i = f
                    }
                }
            }
            return e
        }
    };
    e.execData = function(t) {
        r.execData(t)
    }
    ,
    e.getNewJpData = r.getNewJpData,
    e.hasJpPinyin = function() {
        return r.hasJpPinyin
    }
});
;define("translation:widget/translate/output/lmHandler", function(t, a) {
    "use strict";
    var r = (t("translation:widget/common/environment"),
    {
        execData: function(t) {
            this.hasLmData = !1,
            this.lmDataNew = [];
            var a = []
              , r = 0
              , n = t.length;
            a[r] = [];
            for (var e = 0; n > e; e++)
                " " !== t[e].src_str && (" " !== t[e].trg_str && (this.hasLmData = !0),
                "\n" === t[e].src_str ? a[++r] = [] : a[r].push({
                    src: t[e].src_str,
                    trg: t[e].trg_str
                }));
            this.lmDataNew = a
        }
    });
    a.execData = function(t) {
        r.execData(t)
    }
    ,
    a.getNewLmData = function() {
        return r.lmDataNew
    }
    ,
    a.hasLmData = function() {
        return r.hasLmData
    }
});
;define("translation:widget/translate/output/correctResult/correctResult", function(t, e, o) {
    "use strict";
    var r = t("translation:widget/common/third_party/template")
      , n = t("translation:widget/translate/toast/toast")
      , u = void 0
      , c = void 0
      , i = void 0
      , a = void 0
      , s = ""
      , l = !0
      , d = {
        init: function() {
            this.buildCorrectModel(),
            this.bindEvents()
        },
        bindEvents: function() {
            var t = this;
            $(".output-wrap").on("click", ".op-correct", function() {
                t.showCorrectModel()
            }),
            u.on("click", ".output-correct-btn-close", function(e) {
                e.preventDefault(),
                t.hideCorrectModel()
            }).on("change", ".output-correct-type-box input", function() {
                t.verifyInput()
            }).on("click", ".output-correct-btn-submit", function(e) {
                e.preventDefault(),
                t.verifyInput() && t.sendCorrectResult()
            }),
            c.on("click", function() {
                i.focus()
            }),
            i.on("focus", function(t) {
                var e = $(t.target);
                e.addClass("output-correct-text-area-focus"),
                c.hide()
            }).on("blur", function(t) {
                var e = $(t.target)
                  , o = e.val();
                e.removeClass("output-correct-text-area-focus"),
                !o && c.show()
            }).on("input keyup paste", function(e) {
                var o = $(e.target)
                  , r = o[0]
                  , n = "oninput"in r && "documentMode"in document && 9 === document.documentMode;
                "input" !== e.type && "paste" !== e.type && "oninput"in r && (!n || "keyup" !== e.type || 8 !== e.which && 46 !== e.which) || (t.verifyInput(),
                $.trim(o.val()) && c.hide())
            })
        },
        buildCorrectModel: function() {
            var t = r("tplCorrectResultModel")
              , e = $("body");
            u = e.append(t).find(".output-correct"),
            c = u.find(".output-correct-text-placeholder"),
            a = u.find(".output-correct-btn-submit"),
            i = u.find(".output-correct-text-area")
        },
        showCorrectModel: function() {
            u && u.removeClass("output-correct-hide"),
            s = this.getOriResult(),
            i.focus().val(s),
            "ara" === $(".select-to-language .language-selected").attr("data-lang") ? i.prop("dir", "rtl") : i.prop("dir", ""),
            $("html").css("overflow", "hidden"),
            $("body").css("overflow", "hidden")
        },
        hideCorrectModel: function() {
            u && u.addClass("output-correct-hide"),
            this.resetModel(),
            $("html").css("overflow", ""),
            $("body").css("overflow", "")
        },
        verifyInput: function() {
            var t = !1
              , e = $(".output-correct-type-box input");
            return e.length > 0 && $.each(e, function(e, o) {
                var r = $(o);
                return r.prop("checked") ? (t = !0,
                !1) : void 0
            }),
            t = t || $.trim(i.val()).length > 0,
            t ? a.removeClass("output-correct-btn-submit-disable") : a.addClass("output-correct-btn-submit-disable"),
            t
        },
        sendCorrectResult: function() {
            var t = this
              , e = this.getSendData();
            return l ? void $.ajax({
                url: "countactivity",
                type: "POST",
                dataType: "json",
                data: e,
                success: function(e) {
                    return e ? e && 0 === e.errno ? (n.show("感谢反馈，您的反馈将用于提高翻译质量。"),
                    void t.hideCorrectModel()) : e && 0 !== e.errno ? void n.show(e.errmsg) : void n.show("网络不可用，提交失败。") : void n.show("网络不可用，提交失败。")
                },
                error: function() {
                    n.show("网络不可用，提交失败。")
                }
            }) : (n.show("感谢反馈，您的反馈将用于提高翻译质量。"),
            void this.hideCorrectModel())
        },
        getSendData: function() {
            var t = this.getOriResult()
              , e = void 0
              , o = {
                from: $(".select-from-language .language-selected").attr("data-lang"),
                to: $(".select-to-language .language-selected").attr("data-lang"),
                query: $("#baidu_translate_input").val(),
                oldresult: t,
                type: []
            };
            return $(".output-correct-type-box input").each(function(t, e) {
                var r = $(e);
                r.prop("checked") && o.type.push(r.val())
            }),
            e = $.trim(i.val()),
            e && (o.result = e),
            0 !== o.type.length || e && $.trim(e) !== $.trim(s) || (l = !1),
            o
        },
        getOriResult: function() {
            for (var t = "", e = $("#original-output").find("p"), o = 0, r = $(e).length; r > o; o++)
                t += $(e).eq(o).text() + (o === r - 1 ? "" : "\r\n");
            return t
        },
        resetModel: function() {
            var t = $(".output-correct-type-box input");
            t.length > 0 && $.each(t, function(t, e) {
                var o = $(e);
                0 === t ? o.prop("checked", !0) : o.prop("checked", !1)
            }),
            a.hasClass("output-correct-btn-submit-disable") && a.removeClass("output-correct-btn-submit-disable"),
            i.val("").blur(),
            s = "",
            l = !0
        }
    };
    o.exports = d
});
;define("translation:widget/translate/output/editTips", function(t, a) {
    "use strict";
    var e = (t("translation:widget/common/environment"),
    t("translation:widget/common/string"))
      , i = []
      , n = {
        bindEvents: function() {
            $(document).on("click", $.proxy(this.clickDocument, this)),
            $(".output-wrap").on("click", ".edit-tip a", $.proxy(this.listItemClicked, this)).on("click", ".target-output > span[space]", $.proxy(this.editSpanClicked, this))
        },
        clickDocument: function(t) {
            var a = t.target;
            $(a).hasClass("ordinary-span-edit") || "block" === $(a).parents(".edit-tip").css("display") || ($(".output-wrap .target-output span").removeClass("ordinary-span-edit"),
            "block" === $(".edit-tip").css("display") && $(".edit-tip").hide())
        },
        listItemClicked: function(t) {
            this.listItemSelected({
                target: t.target
            }),
            _hmt.push(["_trackEvent", "首页", "web端点击某条多候选翻译结果"])
        },
        listItemSelected: function(t) {
            var a, e = t.target, i = $(".target-output .ordinary-span-edit");
            return $(e).hasClass("edit-input") ? void $(".edit-input").focus() : (a = $.trim($(e).hasClass("edit-submit") ? $(".edit-input").val() : $(e).text()),
            this.checkSpanChange({
                target: $(i),
                newText: a
            }),
            void $(i).attr("tabcount", -1))
        },
        checkSpanChange: function(t) {
            var a = t.target
              , e = t.newText
              , n = $(a).attr("right-pos")
              , r = i[n].oritext;
            $.trim(e) !== $.trim(r) ? $(a).addClass("edited") : $(a).removeClass("edited"),
            $(a).text(/^\s+/g.test(r) && !/^\s+/g.test(e) ? " " + e : e),
            $(".target-output span").removeClass("ordinary-span-edit"),
            $(".edit-tip").hide();
            var s = $(".output-wrap .output-bd").find(".target-output")
              , o = "";
            0 !== s.length && (s.each(function() {
                o += $(this).text() + "\r\n"
            }),
            o = $.trim(o),
            $(".ordinary-wrap .op-sound").length > 0 && o && $(".ordinary-wrap .op-sound").attr("data-sound-text", encodeURIComponent(o)))
        },
        editSpanClicked: function(t) {
            this.execSpanClicked({
                target: t.target
            })
        },
        execSpanClicked: function(t) {
            var a = t.target
              , e = $(a)
              , n = e.attr("right-pos")
              , r = e.text()
              , s = e.attr("tabcount")
              , o = $(".select-from-language .language-selected").attr("data-lang")
              , d = $(".select-to-language .language-selected").attr("data-lang");
            e.hasClass("ordinary-span-edit") || ("-1" !== s && (i[n] = {
                oritext: r
            }),
            $(a).attr("tabcount", -1).addClass("ordinary-span-edit").focus().siblings("span").removeClass("ordinary-span-edit"),
            $(a).parents("p").siblings().find("span").removeClass("ordinary-span-edit"),
            i[n] && i[n].data ? this.showEditTipBox({
                target: a,
                data: i[n].data
            }) : "zh" == o && "yue" == d || "en" == o && "ara" == d || "yue" == o && "zh" == d || "ara" == o && "en" == d || "zh" == o && "wyw" == d || "wyx" == o && "zh" == d ? this.showEditTipBox({
                target: a,
                data: []
            }) : this.getMultiTransResult({
                target: a,
                text: r
            }))
        },
        showEditTipBox: function(t) {
            {
                var a = $(t.target)
                  , e = a.attr("right-pos")
                  , n = t.data
                  , r = a.position()
                  , s = a.outerHeight()
                  , o = "";
                i[e].oritext ? i[e].oritext : a.text()
            }
            if (0 !== n.length) {
                for (var d = 0, p = n.length; p > d; ++d)
                    o += '<a href="javascript:void(0);" title="' + n[d] + '">' + n[d] + "</a>";
                $(".edit-tip").html(o).show().css({
                    left: r.left,
                    top: r.top + s - 1
                })
            }
        },
        getMultiTransResult: function(t) {
            var a = this
              , e = t.target
              , n = t.text
              , r = this.getOriginText(e)
              , s = {
                from: $(".select-from-language .language-selected").attr("data-lang"),
                to: $(".select-to-language .language-selected").attr("data-lang"),
                query: r,
                raw_trans: n,
                count: 5
            };
            $.ajax({
                url: "/multitransapi",
                type: "POST",
                dataType: "json",
                data: s,
                success: function(t) {
                    if (0 === t.err_no) {
                        a.showEditTipBox({
                            target: e,
                            data: t.data.cands
                        });
                        var r = $(e).attr("right-pos");
                        i[r] = {
                            oritext: n,
                            data: t.data.cands
                        }
                    } else
                        a.showEditTipBox({
                            target: e,
                            data: []
                        })
                }
            })
        },
        getOriginText: function(t) {
            for (var a = $(t).parent(), i = a.prev(), n = i.text(), r = $(t).attr("right-pos").split(","), s = "", o = 0, d = r.length; d > o; o++) {
                var p = r[o].split("|")
                  , l = parseInt(p[0], 10)
                  , u = parseInt(p[1], 10)
                  , c = e.cutByByte(n, l, l + u);
                s += c
            }
            return s
        }
    };
    a.bindEvents = function() {
        n.bindEvents()
    }
});
;define("translation:widget/translate/output/fanyiModSwitch", function(e, t) {
    "use strict";
    var o = e("translation:widget/common/environment")
      , s = e("translation:widget/translate/input/sameHeightHandler")
      , a = e("translation:widget/common/cookie")
      , n = {
        init: function() {
            var e = a.getCookie("DOUBLE_LANG_SWITCH");
            "1" === e && o.set("doubleLangChecked", !0),
            this.bindEvents()
        },
        bindEvents: function() {
            var e = this;
            $(".output-wrap").on("click", ".op-double-lang", function() {
                e.doubleLangClicked({
                    target: this
                })
            }).on("click", ".op-jp-pingyin-btn", function() {
                e.switchJapan({
                    target: this
                })
            }).on("click", ".op-lm-pingyin-btn", function() {
                e.switchLuoma({
                    target: this
                })
            }).on("click", ".op-zh-pingyin-btn", function() {
                e.switchZhong({
                    target: this
                })
            })
        },
        doubleLangClicked: function(e) {
            var t = e.target
              , a = $(t).find("span")
              , n = !1;
            a.hasClass("op-check") ? (this.doubleLangNeedChecked(),
            a.removeClass("op-check").addClass("op-checked"),
            n = !0,
            o.set("doubleLangChecked", !0)) : a.hasClass("op-checked") && (this.doubleLangNeedShutdown(),
            a.removeClass("op-checked").addClass("op-check"),
            o.set("doubleLangChecked", !1)),
            s.sameHeight()
        },
        doubleLangNeedChecked: function() {
            a.setCookie("DOUBLE_LANG_SWITCH", 1, {
                expires: 2592e6
            }),
            $(".source-output").show(),
            $(".output-wrap .op-copy").attr("data-hover-tip-text", "复制双语结果"),
            _hmt.push(["_trackEvent", "首页", "web端打开双语对照"])
        },
        doubleLangNeedShutdown: function() {
            a.setCookie("DOUBLE_LANG_SWITCH", 0, {
                expires: 2592e6
            }),
            $(".source-output").hide(),
            $(".output-wrap .op-copy").attr("data-hover-tip-text", "复制"),
            _hmt.push(["_trackEvent", "首页", "web端关闭双语对照"])
        },
        switchJapan: function(e) {
            var t = $(".japan-output")
              , o = $(".target-output")
              , n = $(e.target).find("span");
            n.hasClass("op-checked") ? (t.hide(),
            o.show(),
            a.setCookie("JAPAN_PINYIN_SWITCH", 0, {
                expires: 2592e6
            }),
            n.removeClass("op-checked").addClass("op-check"),
            _hmt.push(["_trackEvent", "首页", "web端关闭日语假名对照"])) : (t.show(),
            o.hide(),
            a.setCookie("JAPAN_PINYIN_SWITCH", 1, {
                expires: 2592e6
            }),
            n.removeClass("op-check").addClass("op-checked"),
            _hmt.push(["_trackEvent", "首页", "web端开启日语假名对照"])),
            s.sameHeight()
        },
        switchLuoma: function(e) {
            var t = $(".luoma-output")
              , o = $(".target-output")
              , n = $(e.target).find("span");
            n.hasClass("op-checked") ? (t.hide(),
            o.show(),
            a.setCookie("LUOMA_PINYIN_SWITCH", 0, {
                expires: 2592e6
            }),
            n.removeClass("op-checked").addClass("op-check"),
            _hmt.push(["_trackEvent", "首页", "web端关闭韩语罗马音对照"])) : (t.show(),
            o.hide(),
            a.setCookie("LUOMA_PINYIN_SWITCH", 1, {
                expires: 2592e6
            }),
            n.removeClass("op-check").addClass("op-checked"),
            _hmt.push(["_trackEvent", "首页", "web端开启韩语罗马音对照"])),
            s.sameHeight()
        },
        switchZhong: function(e) {
            var t = $(".luoma-output")
              , o = $(".target-output")
              , n = $(e.target).find("span");
            n.hasClass("op-checked") ? (t.hide(),
            o.show(),
            a.setCookie("CHINA_PINYIN_SWITCH", 0, {
                expires: 2592e6
            }),
            n.removeClass("op-checked").addClass("op-check"),
            _hmt.push(["_trackEvent", "首页", "web端关闭中文拼音对照"])) : (t.show(),
            o.hide(),
            a.setCookie("CHINA_PINYIN_SWITCH", 1, {
                expires: 2592e6
            }),
            n.removeClass("op-check").addClass("op-checked"),
            _hmt.push(["_trackEvent", "首页", "web端开启中文拼音对照"])),
            s.sameHeight()
        }
    };
    t.bindEvents = function() {
        n.bindEvents()
    }
    ,
    t.init = function() {
        n.init()
    }
});
;define("translation:widget/translate/output/yellow", function(t, a) {
    "use strict";
    var e = t("translation:widget/common/environment")
      , n = t("translation:widget/common/string")
      , i = {
        bindEvents: function() {
            var t = this;
            $(".output-wrap").on("mouseover", ".target-output > span[space]", function() {
                t.onFloatingYellow({
                    target: this
                })
            }).on("mouseout", ".target-output > span[space]", function() {
                t.offFloatingYellow({
                    target: this
                })
            }).on("mouseover", ".japan-output-item", function() {
                t.onJpItemFloating({
                    target: this
                })
            }).on("mouseout", ".japan-output-item", function() {
                t.offJpItemFloating({
                    target: this
                })
            }).on("mouseover", ".luoma-output-item", function() {
                t.onLuomaItemFloating({
                    target: this
                })
            }).on("mouseout", ".luoma-output-item", function() {
                t.offLuomaItemFloating({
                    target: this
                })
            })
        },
        textEscape: function(t) {
            return t = t.replace(/&/g, "&amp;"),
            t = t.replace(/</g, "&lt;"),
            t = t.replace(/>/g, "&gt;"),
            t = t.replace(/\n|\r/g, "<br>"),
            t = t.replace(/<([ ]+)[^<>]*>/gi, "#"),
            t = t.replace(/\\#/gi, " ")
        },
        onFloatingYellow: function(t) {
            var a = t.target
              , i = $(a);
            i.addClass("high-light-bg");
            var o, s, g, l, u = [];
            if (e.get("doubleLangChecked")) {
                var r = i.parent();
                o = r.prev(),
                s = o.text(),
                l = i.attr("right-pos").split(",")
            } else
                o = $(".textarea-bg-text"),
                s = $("#baidu_translate_input").val(),
                l = i.attr("left-pos").split(",");
            var p = ($(".select-from-language .language-selected").attr("data-lang"),
            $(".select-to-language .language-selected").attr("data-lang"),
            l.length);
            if (1 === p) {
                var h = l[0].split("|")
                  , c = parseInt(h[0], 10)
                  , f = parseInt(h[1], 10)
                  , m = n.cutByByte(s, 0, c)
                  , v = n.cutByByte(s, c, c + f)
                  , d = s.substr(m.length + v.length);
                m = this.textEscape(m),
                v = this.textEscape(v),
                d = this.textEscape(d),
                g = m + '<span class="high-light-bg">' + v + "</span>" + d
            } else if (p > 1) {
                for (var b = 0, x = [], y = 0; p > y; y++)
                    x.push(parseInt(l[y].split("|")[0]));
                for (var I = 0; p > I; I++)
                    for (var C = 0; p - I > C; C++)
                        if (x[C] > x[C + 1]) {
                            var F = x[C];
                            x[C] = x[C + 1],
                            x[C + 1] = F;
                            var E = l[C];
                            l[C] = l[C + 1],
                            l[C + 1] = E
                        }
                for (var y = 0, B = l.length; B > y; y++) {
                    var h = l[y].split("|")
                      , c = parseInt(h[0], 10)
                      , f = parseInt(h[1], 10)
                      , v = n.cutByByte(s, c, c + f)
                      , m = n.cutByByte(s, 0, c)
                      , d = s.substr(m.length + v.length);
                    if (m = this.textEscape(m),
                    v = this.textEscape(v),
                    d = this.textEscape(d),
                    0 !== y) {
                        var j = u.pop()
                          , w = n.cutByByte(j, 0, c - b);
                        w = this.textEscape(w),
                        u.push(w),
                        u.push('<span class="high-light-bg">' + v + "</span>"),
                        u.push(d),
                        b = c + f
                    } else
                        u = [m, '<span class="high-light-bg">' + v + "</span>", d],
                        b = c + f
                }
                g = u.join("")
            }
            o.html(g)
        },
        offFloatingYellow: function(t) {
            var a = t.target
              , n = $(a);
            if (n.removeClass("high-light-bg"),
            e.get("doubleLangChecked")) {
                var i = n.parent()
                  , o = i.prev()
                  , s = o.text();
                o.text(s)
            } else
                $(".textarea-bg-text").html("")
        },
        onJpItemFloating: function(t) {
            var a = $(t.target);
            a.find(".japan-output-japan").addClass("high-light-bg"),
            a.find(".japan-ouput-pinyin").addClass("high-light-bg")
        },
        offJpItemFloating: function(t) {
            var a = $(t.target);
            a.find(".japan-output-japan").removeClass("high-light-bg"),
            a.find(".japan-ouput-pinyin").removeClass("high-light-bg")
        },
        onLuomaItemFloating: function(t) {
            var a = $(t.target);
            a.find(".luoma-output-kor").addClass("high-light-bg"),
            a.find(".luoma-ouput-pinyin").addClass("high-light-bg")
        },
        offLuomaItemFloating: function(t) {
            var a = $(t.target);
            a.find(".luoma-output-kor").removeClass("high-light-bg"),
            a.find(".luoma-ouput-pinyin").removeClass("high-light-bg")
        }
    };
    a.bindEvents = function() {
        i.bindEvents()
    }
});
;define("translation:widget/translate/output/fanyiClickBtn", function(t, n) {
    "use strict";
    var e = t("translation:widget/common/environment")
      , o = t("translation:widget/common/soundURIGenerator")
      , i = t("translation:widget/translate/details/dictionary/simplemeans")
      , a = {
        bindEvents: function() {
            var t = this;
            $(".output-wrap").on("click", ".op-sound", function() {
                t.soundClicked({
                    target: this
                })
            }).on("mouseenter", ".op-sound", function() {
                t.soundOver({
                    target: this
                })
            }).on("mouseleave", ".op-sound", $.proxy(this.soundOut, this))
        },
        soundClicked: function(t) {
            i.judgeStopRepeat(),
            this.timer && clearTimeout(this.timer);
            var n = o.generateURI({
                lan: $(t.target).attr("data-sound-lan"),
                text: $(t.target).attr("data-sound-text")
            });
            BTPM.setUrl(n);
            var e;
            $(".ordinary-wrap .op-sound").addClass("op-sound-active"),
            e && clearTimeout(e),
            e = setTimeout(function() {
                $(".ordinary-wrap .op-sound").removeClass("op-sound-active")
            }, 2e3),
            _hmt.push(["_trackEvent", "首页", "web端译文TTS点击"])
        },
        soundOver: function(t) {
            if ("hover" === e.get("soundTriggerMode")) {
                var n = this;
                this.timer = setTimeout(function() {
                    n.soundClicked({
                        target: t.target
                    })
                }, 500)
            }
        },
        soundOut: function() {
            this.timer && clearTimeout(this.timer)
        }
    };
    n.bindEvents = function() {
        a.bindEvents()
    }
});
;define("translation:widget/translate/output/fanyi", function(t, a) {
    "use strict";
    var n = t("translation:widget/common/third_party/template")
      , e = t("translation:widget/common/environment")
      , r = t("translation:widget/common/string")
      , i = t("translation:widget/common/config/sound")
      , l = t("translation:widget/translate/output/transCB")
      , o = t("translation:widget/translate/output/jpHandler")
      , s = t("translation:widget/translate/output/lmHandler")
      , p = t("translation:widget/translate/output/correctResult/correctResult")
      , u = t("translation:widget/translate/output/editTips")
      , d = t("translation:widget/translate/output/fanyiModSwitch")
      , g = t("translation:widget/translate/output/yellow")
      , c = t("translation:widget/translate/output/fanyiClickBtn")
      , m = t("translation:widget/translate/input/sameHeightHandler")
      , v = t("translation:widget/common/cookie")
      , f = t("translation:widget/common/util");
    n.helper("fanyiGenBr", function(t) {
        for (var a = []; t--; )
            a.push("<br />");
        return a.join("")
    });
    var D = {
        init: function() {
            this.bindEvents()
        },
        bindEvents: function() {
            p.init(),
            u.bindEvents(),
            d.init(),
            g.bindEvents(),
            c.bindEvents()
        },
        normaltrans: function(t) {
            for (var a = t.data.data, p = t.data.jp_pinyin, u = t.data.phonetic, d = {}, g = $(".select-to-language .language-selected").attr("data-lang"), c = $(".select-from-language .language-selected").attr("data-lang"), D = e.get("rtl"), y = $.inArray(g, D) >= 0, h = $.inArray(c, D) >= 0, w = $.inArray(g, ["ara", "ru", "el"]) >= 0, C = "", I = a.length, k = [], L = [], H = 0; I > H; H++) {
                var N = a[H].dst;
                L.push(N);
                {
                    a[H].src
                }
                k.push(parseInt(a[H] || 0)),
                Array.isArray(a[H].result) || (a[H].result = []);
                for (var A = 0, _ = a[H].result.length; _ > A; A++) {
                    var b = a[H].result[A][5].toString().split("|")
                      , S = parseInt(b[0], 10)
                      , B = parseInt(b[1], 10);
                    a[H].result[A][6] = w ? a[H].result[A][1] : r.cutByByte(N, S, S + B)
                }
            }
            C += L.join("\r\n");
            for (var T = "", j = L.length, A = 0; j > A; A++) {
                var E = f.encodeHTML(L[A]);
                T += "<p>" + E + "</p>"
            }
            if ($("#original-output").length <= 0) {
                var P = '<div style="display:none;" id="original-output">' + T + "</div>";
                $("body").append(P)
            } else
                $("#original-output").empty(),
                $("#original-output").append(T),
                $("#original-output").removeClass("has-edited");
            if (d.tplData = {},
            d.tplData.data = a,
            d.tplData.prefixWrap = k,
            d.tplData.targetLang = g,
            p) {
                o.execData(p);
                var W = o.hasJpPinyin();
                if (W) {
                    var x = o.getNewJpData(p);
                    d.tplData.jpData = x;
                    var M = v.getCookie("JAPAN_PINYIN_SWITCH")
                      , R = !1;
                    "1" === M && (R = !0),
                    d.tplData.japanChecked = R
                }
            }
            if (u) {
                s.execData(u);
                var J = s.hasLmData();
                if (J && !p) {
                    var O = s.getNewLmData();
                    if (d.tplData.lmData = O,
                    "kor" === g) {
                        var U = v.getCookie("LUOMA_PINYIN_SWITCH")
                          , Y = !1;
                        "1" === U && (Y = !0),
                        d.tplData.luomaChecked = Y
                    } else if ("zh" === g) {
                        var z = v.getCookie("CHINA_PINYIN_SWITCH")
                          , G = !1;
                        "1" === z && (G = !0),
                        d.tplData.chinaChecked = G
                    }
                }
            }
            var q = v.getCookie("DOUBLE_LANG_SWITCH")
              , F = !1;
            "1" === q && (F = !0),
            d.tplData.doubleLangChecked = F,
            d.tplData.dir = y ? "rtl" : "ltr",
            d.tplData.srcDir = h ? "rtl" : "ltr",
            d.tplData.spell = "",
            r.getByte(C) <= i.getMaxSoundLength(g) && (d.tplData.spell = encodeURIComponent(C)),
            d.tplData.spellLang = "",
            i.isLangSound(g) && (d.tplData.spellLang = "yue" == g ? "cte" : g),
            w && (d.tplData.needSpace = "yes"),
            n.config("compress", !0);
            var K = n("tplOrdinaryResult", d);
            $(".output-wrap .ordinary-wrap").remove(),
            $(".output-wrap").removeClass("output-blank"),
            $(".output-wrap").append(K);
            var Q = l.zclipTran();
            Q && Q.destroy(),
            l.init(),
            m.sameHeight()
        }
    };
    $(function() {
        D.init()
    }),
    a.normaltrans = function(t) {
        D.normaltrans(t)
    }
});
;define("translation:widget/translate/output/bottomBanner", function(n, e) {
    "use strict";
    var t = n("translation:widget/common/environment")
      , a = {
        bindEvents: function() {
            $(window).on("scroll", function() {
                var n = location.hash;
                if (!($(".spread-slide a").length <= 0 || n === t.get("preHash"))) {
                    var e = $(window).height()
                      , a = $(".spread-slide").offset().top
                      , r = $(window).scrollTop();
                    e + r > a && ($(".dictionary-wrap").length > 0 || $(".output-detaildict-tab").children().length > 1) && (_hmt.push(["_trackEvent", "web端翻译—banner总展现", "web端翻译—非首屏banner展现"]),
                    t.set("preHash", n))
                }
            })
        },
        sendIndexBannerLog: function(n) {
            var e = n && n.source
              , a = location.hash;
            $(".spread-slide a").length <= 0 || ("clear" === e ? _hmt.push(["_trackEvent", "web端翻译—banner总展现", "web端翻译—首屏banner展现"]) : a !== t.get("preHash") && (_hmt.push(["_trackEvent", "web端翻译—banner总展现", "web端翻译—首屏banner展现"]),
            t.set("preHash", a)))
        }
    };
    e.bindEvents = function() {
        a.bindEvents()
    }
    ,
    e.sendIndexBannerLog = function(n) {
        a.sendIndexBannerLog(n)
    }
});
;define("translation:widget/translate/output/output", function(t, e) {
    "use strict";
    function a(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    var n = t("translation:widget/redux/store")
      , o = a(n)
      , r = t("translation:widget/translate/details/details")
      , i = a(r)
      , s = t("translation:widget/redux/indexInfo/noteInfo")
      , u = t("translation:widget/common/environment")
      , l = t("translation:widget/common/third_party/template")
      , p = t("translation:widget/translate/output/fanyi")
      , d = t("translation:widget/translate/output/adcards")
      , c = t("translation:widget/translate/output/mouseover")
      , g = t("translation:widget/translate/output/bottomBanner");
    t("translation:widget/translate/output/NotePanel/NotePanel.jsx");
    var v = t("translation:widget/translate/sideNav/navSorter/navSorter")
      , f = $("#left-result-container")
      , h = {
        result: null,
        init: function() {
            this.bindEvents()
        },
        bindEvents: function() {
            var t = this;
            $(".translate-wrap").on("mouseover", ".data-hover-tip", function() {
                c.isover({
                    target: this
                })
            }).on("mouseout", ".data-hover-tip", function() {
                c.isout()
            }).on("copy", ".output-bd", $.proxy(this.outputTextIsCopy, this)),
            g.bindEvents(),
            v.on("sortChange", function() {
                t.result && t.checkResponse(t.result, !0)
            })
        },
        clickDocument: function(t) {
            var e = t.target;
            $(e).hasClass("ordinary-span-edit") || "block" === $(e).parents(".edit-tip").css("display") || ($(".output-wrap .target-output span").removeClass("ordinary-span-edit"),
            "block" === $(".edit-tip").css("display") && $(".edit-tip").hide())
        },
        outputTextIsCopy: function(t) {
            var e = "";
            if (document.getSelection) {
                var a = document.getSelection();
                e = "string" == typeof a ? a : a.toString()
            } else
                document.selection && (e = document.selection.createRange().text);
            e && (window.clipboardData ? window.clipboardData.setData("Text", e) : t.originalEvent && t.originalEvent.clipboardData ? (t.originalEvent.clipboardData.setData("text/plain", e),
            t.preventDefault()) : t.clipboardData && (t.clipboardData.setData("text/plain", e),
            t.preventDefault()))
        },
        checkResponse: function(t, e) {
            this.result = $.extend(!0, {}, t || {});
            var a = t.res;
            return a.error ? void (999 === parseInt(a.error, 10) ? (this.clearOutputWrap(),
            p.normaltrans({
                data: {
                    data: [{
                        dst: a.query,
                        src: a.query,
                        result: []
                    }]
                }
            }, t.query)) : 998 === parseInt(a.error, 10) ? window.location.reload() : 997 === parseInt(a.error, 10) ? alert("浏览器cookie功能被禁，请开启此功能") : this.showTimeout(a.errShowMsg)) : void this.execResponse(t, e)
        },
        showTimeout: function(t) {
            t = t || "非常抱歉，翻译结果响应超时，请稍后再试!";
            var e = {
                message: t
            }
              , a = l("tplLongTextPrompt", e);
            $(".output-wrap").html(a)
        },
        execResponse: function(t, e) {
            var a = t.res
              , n = t.from
              , o = t.to
              , r = t.query
              , s = t.badCaseByForce;
            !e && _hmt.push(["_trackEvent", "首页", "web端总共query数"]),
            a && (this.clearOutputWrap(),
            a.trans_result && p.normaltrans({
                data: a.trans_result
            }),
            i.default.init(a, n, o, r, s))
        },
        clearOutputWrap: function() {
            u.set("hasDetail", !1),
            d.hideAppQr(),
            $(".textarea-bg-text").html(""),
            c.isout(),
            u.get("needLongtextTip") === !0 ? ($(".output-wrap .output-mod").remove(),
            u.set("needLongtextTip", !1)) : $(".output-wrap").empty().addClass("output-blank"),
            o.default.dispatch(s.clearNoteInfo()),
            f.empty()
        }
    };
    $(function() {
        h.init()
    }),
    e.checkResponse = function(t) {
        h.checkResponse(t)
    }
    ,
    e.clearOutputWrap = function(t) {
        h.clearOutputWrap(t)
    }
});
;define("translation:widget/translate/input/hash", function(a, t) {
    "use strict";
    var e = a("translation:widget/translate/common/hash");
    t.setHash = function(a) {
        var t = a.query
          , n = a.from || $(".select-from-language .language-selected").attr("data-lang")
          , s = a.to || $(".select-to-language .language-selected").attr("data-lang");
        e.set(n, s, t)
    }
});
;define("translation:widget/translate/input/inputSug", function(t, e) {
    "use strict";
    function n() {
        d = !1,
        m.empty().hide()
    }
    function a(t, e) {
        if (d) {
            m.empty().show(),
            t.length > 4 && (t = t.slice(0, 4)),
            $.each(t, function(t, n) {
                n.kRest = n.k.substr(e.length),
                n.queryInK = n.k.substr(0, e.length)
            });
            var n = f("tplSugItem", {
                data: t,
                query: e
            });
            m.html(n)
        }
    }
    function s() {
        return "none" !== m.css("display") ? m.find(".sug-item").length : 0
    }
    function i() {
        var t = m.find(".sug-item-selected");
        return t.index(".sug-item")
    }
    function u(t) {
        if (38 === t.which || 40 === t.which) {
            var e = s();
            if (e > 0) {
                var a = i()
                  , u = 0
                  , r = $(".sug-item");
                t.preventDefault(),
                t.stopPropagation(),
                38 === t.which ? u = -1 === a ? e - 1 : (a + e - 1) % e : 40 === t.which && (u = (a + e + 1) % e),
                r.removeClass("sug-item-selected");
                var l = r.eq(u);
                l.addClass("sug-item-selected");
                var o = l.attr("data-sug-title");
                p.val(o),
                h.onTranslate()
            }
        }
        if (13 === t.which) {
            d = !1;
            var l = $(".sug-item-selected");
            if (l.length > 0)
                return t.preventDefault(),
                t.stopPropagation(),
                l.trigger("click"),
                void (v = !0);
            if ("none" !== m.css("display"))
                return y = !0,
                t.preventDefault(),
                t.stopPropagation(),
                void n()
        }
    }
    function r() {
        return v
    }
    function l(t) {
        v = t
    }
    function o() {
        return y
    }
    function g(t) {
        y = t
    }
    function c(t) {
        t = t.replace(/(^\s*)|(\s*$)/g, "");
        for (var e = /^[a-zA-Z]+([\-'][a-zA-Z]+)*$/, n = t.split(/\s+/), a = 0, s = n.length; s > a; a++)
            if (!e.test(n[a]))
                return !1;
        return !0
    }
    var d, f = t("translation:widget/common/third_party/template"), h = t("translation:widget/translate/input/translate"), p = $("#baidu_translate_input"), m = $("#sug-wrap"), v = !1, y = !1, w = {
        init: function() {
            this.sugIdx = 0,
            m.on("click", ".sug-item", function() {
                var t = $(this).attr("data-sug-title")
                  , e = $(this).index() + 1;
                p.val(t),
                h.onTranslate(),
                n(),
                _hmt.push(["_trackEvent", "首页", "Web Sug点击"]),
                _hmt.push(["_trackEvent", "首页", "Web Sug 第" + e + "条点击"])
            }),
            m.on("mouseenter", ".sug-item", function() {
                var t = $(".sug-item");
                t.removeClass("sug-item-selected"),
                $(this).addClass("sug-item-selected")
            }).on("mouseleave", ".sug-item", function() {
                var t = $(".sug-item");
                t.removeClass("sug-item-selected")
            }),
            $(document).on("click", function(t) {
                var e = $(t.target);
                "none" === m.css("display") || e.hasClass("trans-input-wrap") || e.parents(".trans-input-wrap").length > 0 || n()
            })
        },
        loadSug: function() {
            var t = this
              , e = $(".select-from-language .language-selected").attr("data-lang")
              , s = $(".select-to-language .language-selected").attr("data-lang");
            if (("en" === e || "auto" === e) && "zh" === s || ("zh" === e || "auto" === e) && "en" === s) {
                var i = p.val();
                i = c(i) ? i.replace(/^\s*/, "").replace(/\s+/g, " ") : $.trim(i),
                i ? (t.sugIdx++,
                d = !0,
                function(e) {
                    $.ajax({
                        url: "/sug",
                        type: "POST",
                        dataType: "json",
                        data: {
                            kw: i
                        },
                        success: function(n) {
                            if (!n.errno && n.data.length > 0) {
                                if (e !== t.sugIdx)
                                    return;
                                a(n.data, i)
                            } else
                                m.empty().hide()
                        },
                        error: function() {
                            m.empty().hide()
                        }
                    })
                }(t.sugIdx)) : n()
            }
        }
    };
    $(function() {
        w.init()
    }),
    e.loadSug = function() {
        w.loadSug()
    }
    ,
    e.clearAndHideSug = n,
    e.onTextAreaKeyDown = u,
    e.getTranslatedByKeyDown = r,
    e.setTranslatedByKeyDown = l,
    e.getCloseSugByEnter = o,
    e.setCloseSugByEnter = g
});
;define("translation:widget/translate/input/inputFavo", function(t, n, a) {
    "use strict";
    var e = t("translation:widget/common/environment")
      , o = t("translation:widget/translate/favo/favo")
      , i = new o({
        pos: "input",
        target: $(".input-operate .op-favo")[0]
    });
    e.set("inputFavo", i),
    a.exports = i
});
;define("translation:widget/translate/input/uploader", function(e, t, o) {
    "use strict";
    var i = e("translation:widget/common/third_party/webuploader/webuploader.fis")
      , n = (e("translation:widget/common/environment"),
    i.create({
        swf: "https://fanyi-cdn.cdn.bcebos.com/static/translation/widget/common/third_party/webuploader/Uploader_10d5704.swf",
        server: "https://fanyi-doc.baidu.com/doctrans/api/docupload",
        pick: {
            id: "#upload-btn-hidden",
            multiple: !1
        },
        resize: !1,
        fileVal: "uploadFile",
        auto: !1,
        withCredentials: !0,
        accept: [{
            title: "Images",
            extensions: "png,jpg,bmp,jpeg",
            mimeTypes: "image/*"
        }, {
            title: "Documents",
            extensions: "doc,docx,ppt,pptx,xls,xlsx" + (window.common.pdfHit ? ",pdf" : ""),
            mimeTypes: "application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" + (window.common.pdfHit ? ",application/pdf" : "") + ",application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
        }]
    }));
    o.exports = n
});
;define("translation:widget/translate/docTranslate/docTransUtil", function(e, t) {
    "use strict";
    var n = e("translation:widget/translate/input/uploader")
      , a = e("translation:widget/common/environment")
      , r = e("translation:widget/translate/domain/domain")
      , o = $(".doc-trans-view-wrap .progress-bar")
      , i = $(".doc-trans-view-wrap")
      , s = i.find(".src-doc-padding-wrapper, .dst-doc-padding-wrapper")
      , d = i.find(".export-tip")
      , l = i.find(".doc-async-translating-tip")
      , c = $("#doc-view-iframe")
      , p = /^\/docViewMode\?name=(.+)&from=(\w+)&to=(\w+)&token=(\w+)$/
      , f = {
        file: null,
        fileName: "",
        from: "",
        to: "",
        token: "",
        translatingParaIdxSet: new Set
    };
    t.isSupportByDocTrans = function(e) {
        var t = e.name;
        if ("string" != typeof t)
            return !1;
        var n = t.split(".");
        if (1 === n.length)
            return !1;
        var a = n[n.length - 1].toLowerCase()
          , r = ["doc", "docx", "xls", "xlsx", "ppt", "pptx"];
        return window.common.pdfHit && r.push("pdf"),
        -1 !== r.indexOf(a)
    }
    ,
    t.currTask = f;
    var g = {
        percentage: 0,
        uploadSuccess: function() {
            this.percentage = 30,
            o.css("transform", "scaleX(" + this.percentage / 100 + ")")
        },
        reset: function() {
            this.percentage = 0,
            o.removeAttr("style")
        },
        add: function() {
            this.percentage + 30 < 95 && (this.percentage = this.percentage + 30,
            o.css("transform", "scaleX(" + this.percentage / 100 + ")"))
        },
        complete: function() {
            this.percentage = 100,
            o.css("transform", "scaleX(" + this.percentage / 100 + ")")
        }
    };
    t.progress = g,
    t.clearDocTrans = function(e) {
        r.show(),
        $("#main-outer").removeClass("doc-trans-mode").removeClass("doc-trans-view-mode"),
        $(".doc-trans-file").text(""),
        window.common.docHit && !a.get("isInRtTransState") && 0 === $("#baidu_translate_input").val().length && ($("#upload-btn").show(),
        window.hasStatUploadBtnShow || (_hmt.push(["_trackEvent", "首页", "74_首页页面_上传文档按钮展示"]),
        window.hasStatUploadBtnShow = !0)),
        f.file && n.cancelFile(f.file),
        f.fileName = "",
        f.from = "",
        f.to = "",
        f.token = "",
        f.translatingParaIdxSet.clear(),
        delete f.translatedSpanCounter,
        delete f.detectedFrom,
        delete f.detectedTo,
        delete f.isOverflow,
        delete f.isOriginalOverflow,
        delete f.url,
        delete f.isHtml;
        var t = $(".doc-trans-view-wrap");
        t.find(".loading-container, .loading-err-container, .loading-exit-btn").removeAttr("style"),
        t.find(".export-doc-btn").removeClass("generating").prop("data-has-gen-link", !1),
        t.removeClass("loading viewing-html viewing-file"),
        d.hide(),
        l.hide(),
        $("#doc-specified-style").remove(),
        s.empty(),
        c.attr("src", ""),
        g.reset(),
        e && $("#upload-btn-hidden").find('input[type="file"]').click(),
        $(".footer").show()
    }
    ,
    t.clearDocTransMode = function() {
        $(".doc-trans-file").text(""),
        $("#main-outer").removeClass("doc-trans-mode"),
        $(".doc-trans-operation").removeClass("guiding"),
        $(".doc-trans-operation .doc-trans-dir").removeClass("open")
    }
    ,
    t.clearDocTransViewMode = function() {
        i.find(".file-name").text(""),
        i.find(".doc-view-from-lang").text(""),
        i.find(".doc-view-to-lang").text(""),
        i.find(".loading-container").removeAttr("style"),
        i.find(".loading-err-container").removeAttr("style"),
        i.removeClass("loading viewing-html viewing-file"),
        c.attr("src", ""),
        g.reset(),
        $("#main-outer").removeClass("doc-trans-view-mode"),
        d.hide(),
        l.hide(),
        $(".footer").show()
    }
    ,
    t.viewModeRegExp = p,
    t.logWrongFileFormat = function(e) {
        var t = "未知格式";
        if (e && e.name) {
            var n = e.name.split(".");
            n.length > 1 && (t = n[n.length - 1])
        }
        window._hmt.push(["_trackEvent", "首页", "文档翻译_提示上传格式错误_" + t])
    }
    ,
    t.isUrlFileInEdge = function(e) {
        var t = "未知格式";
        if (e && e.name) {
            var n = e.name.split(".");
            n.length > 1 && (t = n[n.length - 1])
        }
        return "url" === t && window.navigator.userAgent.indexOf("Edge") > -1
    }
});
;define("translation:widget/translate/input/clear", function(t, n) {
    "use strict";
    var a = t("translation:widget/translate/input/textarea")
      , e = t("translation:widget/translate/input/soundicon")
      , r = t("translation:widget/translate/input/correct")
      , i = t("translation:widget/translate/input/prompt")
      , s = t("translation:widget/translate/output/output")
      , l = t("translation:widget/translate/output/bottomBanner")
      , o = t("translation:widget/translate/input/hash")
      , u = t("translation:widget/translate/input/inputSug")
      , c = t("translation:widget/translate/input/inputFavo")
      , d = t("translation:widget/translate/sideNav/sideNav")
      , p = t("translation:widget/translate/docTranslate/docTransUtil")
      , h = {
        clearBtn: $(".textarea-clear-btn"),
        clearInput: function(n) {
            i.hide(),
            e.hide(),
            c.resetBtn(),
            this.hideIcon(),
            r.hide(),
            a.empty(n),
            u.clearAndHideSug(),
            p.clearDocTrans(),
            t("translation:widget/translate/input/dataTransfer").clearInputImage();
            var s = $(".translateio");
            if (s.hasClass("is-zoom-in")) {
                $(".translateio").removeClass("is-zoom-in");
                try {
                    $(window).trigger("resize")
                } catch (l) {}
            }
            $(".textarea-bg-text").html("")
        },
        clearOutput: function() {
            s.clearOutputWrap(),
            d.destroyNav(),
            this.setEmptyHash()
        },
        clearAll: function(t) {
            s.clearOutputWrap(),
            this.clearInput(t),
            d.destroyNav(),
            this.setEmptyHash(),
            l.sendIndexBannerLog({
                source: "clear"
            })
        },
        showIcon: function() {
            this.clearBtn.show()
        },
        hideIcon: function() {
            this.clearBtn.hide()
        },
        getElem: function() {
            return this.clearBtn
        },
        setEmptyHash: function() {
            o.setHash({
                query: ""
            })
        }
    };
    n.clearOutput = function() {
        h.clearOutput()
    }
    ,
    n.clearAll = function(t) {
        h.clearAll(t)
    }
    ,
    n.clearInputAndOutput = function() {
        h.clearInput(),
        s.clearOutputWrap()
    }
    ,
    n.show = function() {
        h.showIcon()
    }
    ,
    n.hide = function() {
        h.hideIcon()
    }
    ,
    n.getElem = function() {
        return h.getElem()
    }
});
;define("translation:widget/translate/history/storage", function(r, t) {
    "use strict";
    function n() {
        var r = localStorage.pcTransHistory;
        return r && (r = JSON.parse(r)),
        r
    }
    function e(r) {
        r = JSON.stringify(r),
        localStorage.pcTransHistory = r
    }
    function o(r) {
        return r.length < a ? r.length : a
    }
    var a = 10;
    t.isSupport = function() {
        try {
            return window.localStorage ? (window.localStorage.isSupport = "true",
            !0) : !1
        } catch (r) {
            return !1
        }
    }(),
    t.setHistory = function(r, t, o, i) {
        for (var l = n() || [], u = l.length, s = 0; u > s; s++)
            r === l[s][0] && (l.splice(s, 1),
            u--);
        var c = [r, t, o, i];
        l.push(c),
        u >= a && l.shift(0),
        e(l)
    }
    ,
    t.getHistory = function() {
        var r = n();
        if (r) {
            var t = o(r);
            return {
                data: r,
                len: t
            }
        }
        return null
    }
    ,
    t.deleteFromStorge = function(r) {
        var t = n();
        if (t) {
            var a, i;
            for (a = 0,
            i = t.length; i > a; a++)
                if (r === t[a][0]) {
                    t.splice(a, 1);
                    break
                }
            e(t);
            var l = o(t);
            return l ? {
                data: t,
                len: l
            } : null
        }
        return null
    }
    ,
    t.deleteAllStorge = function() {
        localStorage.removeItem("pcTransHistory")
    }
});
;define("translation:widget/translate/translang/manualTrans", function(a, t, e) {
    "use strict";
    function n() {
        if (0 === r.getVal().length)
            return void s.removeClass("manual-trans-btn-disable");
        var a = $(".select-from-language .language-selected").attr("data-lang")
          , t = $(".select-to-language .language-selected").attr("data-lang");
        s.toggleClass("manual-trans-btn-disable", !o[a] || !o[t])
    }
    function l(a) {
        var t = $('<form style="display: none" method="post" target="_blank" action="' + a.middlePageUrl + '">')
          , e = $('<input type="text" name="from">').appendTo(t)
          , n = $('<input type="text" name="to">').appendTo(t)
          , l = $('<textarea name="query"></textarea>').appendTo(t);
        e.val(a.from),
        n.val(a.to),
        l.val(a.query),
        t.appendTo(a.$appendToEle),
        t.submit()
    }
    var r = a("translation:widget/translate/input/textarea")
      , s = $(".manual-trans-btn")
      , o = {
        auto: !0,
        zh: !0,
        en: !0,
        jp: !0,
        kor: !0,
        pt: !0,
        fra: !0,
        spa: !0,
        de: !0,
        ru: !0,
        ara: !0
    };
    s.on("click", function() {
        $(this).hasClass("manual-trans-btn-disable") || (_hmt.push(["_trackEvent", "首页", "16_首页页面_点击人工翻译按钮"]),
        l({
            from: $(".select-from-language .language-selected").attr("data-lang"),
            to: $(".select-to-language .language-selected").attr("data-lang"),
            query: r.getVal(),
            middlePageUrl: "https://fanyi-pro.baidu.com/middlepage?hmsr=%E7%99%BE%E5%BA%A6%E7%BF%BB%E8%AF%91&hmpl=%E5%9B%BA%E5%AE%9A%E5%85%A5%E5%8F%A3&hmcu=%E9%A6%96%E9%A1%B5%E6%8C%89%E9%92%AE&hmkw=&hmci=",
            $appendToEle: s
        }))
    }),
    e.exports = {
        updateManualTransBtn: n
    }
});
;define("translation:widget/translate/translang/tolang", function(t, n) {
    "use strict";
    var a = (t("translation:widget/common/third_party/template"),
    t("translation:widget/common/environment"),
    t("translation:widget/translate/translang/transbtn"))
      , e = t("translation:widget/translate/translang/manualTrans")
      , o = t("translation:widget/common/config/langMap")
      , l = t("translation:widget/translate/translang/langPanelContainer.jsx")
      , r = {
        hideToWrap: function() {
            l.hideToWrap()
        },
        tolangChange: function(t) {
            var n = t.lang
              , a = this;
            a.tolangItemSelect({
                value: n,
                trans: t.trans
            })
        },
        tolangItemSelect: function(t) {
            var n = t.value
              , r = o[n].zhName;
            $(".select-to-language .language-selected").attr("data-lang", n).text(r),
            l.changeTo(n),
            this.hideToWrap(),
            t.trans && a.doTrans(),
            e.updateManualTransBtn(),
            $("body").trigger("updateFromTo.domainTrans")
        }
    };
    n.toBtnClicked = function() {
        r.toBtnClicked()
    }
    ,
    n.tolangChange = function(t) {
        r.tolangChange(t)
    }
    ,
    n.tolangItemSelect = function(t) {
        r.tolangItemSelect(t)
    }
    ,
    n.hideToWrap = function(t) {
        r.hideToWrap(t)
    }
});
;define("translation:widget/translate/input/fontSize", function(t, e) {
    "use strict";
    function s(t, e) {
        var s = t[0]
          , a = t.height()
          , n = s.scrollHeight
          , l = t.css("overflow");
        if (a >= n) {
            t.height(e),
            t.css("overflow", "hidden");
            var i = s.scrollHeight;
            return t.height(a),
            t.css("overflow", l),
            i
        }
        return n
    }
    function a() {
        var t = parseInt(i.css("line-height"), 10)
          , e = s(i, t);
        return e -= 2,
        h = Math.ceil(e / t),
        h > 1
    }
    function n() {
        i[0].offsetHeight;
        var t = i.val();
        c && "10.0" === c[1] ? i.removeClass("small-font").val(t) : i.removeClass("small-font"),
        o.removeClass("small-font"),
        r.removeClass("small-font"),
        i[0].offsetHeight,
        f = !0
    }
    function l() {
        i[0].offsetHeight;
        var t = i.val();
        c && "10.0" === c[1] ? i.addClass("small-font").val(t) : i.addClass("small-font"),
        o.addClass("small-font"),
        r.addClass("small-font"),
        i[0].offsetHeight,
        f = !1
    }
    var i = $("#baidu_translate_input")
      , o = $(".output-wrap")
      , r = $("#textarea-bg-text")
      , f = !0
      , h = 0
      , v = /MSIE\s([\d.]+)/
      , c = window.navigator.userAgent.match(v)
      , u = {
        switchFontSize: function() {
            var t = a();
            if (t) {
                if (f) {
                    var e = i.val()
                      , s = e.length;
                    2 === h && e.indexOf("\n") === s - 1 && s > 1 || l()
                }
            } else
                n(),
                t = a(),
                t && l();
            return t
        }
    };
    e.switchFontSize = u.switchFontSize
});
;define("translation:widget/translate/input/autoRequest", function(t, a, n) {
    "use strict";
    function e() {
        if (h.get("isInRtTransState") === !0)
            return void h.set("isInRtTransState", !1);
        var t = s.get()
          , a = $(".select-from-language .language-selected").attr("data-lang")
          , n = $(".select-to-language .language-selected").attr("data-lang")
          , e = $.trim($("#baidu_translate_input").val())
          , o = t.query;
        o && (t.from !== a || t.to !== n || t.query !== e) && r(!1, e)
    }
    function r(a) {
        var n = s.get()
          , e = n.from
          , r = n.to
          , o = u.getElem()
          , l = void 0;
        l = a ? o.val() : n.query,
        l.length > 0 ? (l = l.replace(/\\r\\n/gi, "\n"),
        l = g.decodeHTML(l),
        /firefox/i.test(navigator.userAgent) === !0 && (l = l.replace(/%0A/gi, "\r\n"),
        l = unescape(l)),
        a || o.val(l),
        v.switchFontSize(),
        u.hasQuery(l),
        t("translation:widget/translate/input/dataTransfer").clearInputImage()) : (y && (i(),
        y = !1),
        p.clearInputAndOutput()),
        u.focus();
        var h = !1;
        e && c.fromlangChange({
            lang: e,
            trans: h
        }),
        r && d.tolangChange({
            lang: r,
            trans: h
        }),
        m.onTranslate()
    }
    function o() {
        var t = h.get("remote")
          , a = $.trim(t.query)
          , n = $.trim(t.lang)
          , e = /(.+)2(.+)/i
          , o = e.test(n) === !0
          , s = o ? n.match(e)[1] : !1
          , g = o ? "auto" !== n.match(e)[2] ? n.match(e)[2] : window.common.locale : !1;
        s && g ? (a.hasOwnProperty("length") && 0 === a.length && i(),
        l({
            from: s,
            to: g,
            query: a
        })) : (y = !0,
        r())
    }
    function l(t) {
        var a = t.from
          , n = t.to
          , e = t.query;
        d.tolangChange({
            lang: n,
            trans: !1
        }),
        c.fromlangChange({
            lang: a,
            trans: !1
        }),
        e = g.decodeHTML(e),
        f.setHash({
            from: a,
            to: n,
            query: e
        }),
        encodeURIComponent(e).length > w.MAX_URL_COUNT && (e = e.replace(/\\r\\n/gi, "\r\n"),
        u.getElem().val(e),
        r(!0))
    }
    function i() {
        window.hasStatUploadBtnShow || (_hmt.push(["_trackEvent", "首页", "74_首页页面_上传文档按钮展示"]),
        window.hasStatUploadBtnShow = !0)
    }
    var s = t("translation:widget/translate/common/hash")
      , g = t("translation:widget/common/util")
      , u = t("translation:widget/translate/input/textarea")
      , c = t("translation:widget/translate/translang/fromlang")
      , d = t("translation:widget/translate/translang/tolang")
      , m = t("translation:widget/translate/input/translate")
      , h = t("translation:widget/common/environment")
      , f = t("translation:widget/translate/input/hash")
      , w = t("translation:widget/common/config/trans")
      , p = t("translation:widget/translate/input/clear")
      , v = t("translation:widget/translate/input/fontSize")
      , y = !1;
    n.exports = {
        onHashChange: e,
        setEveryThingOkAndTrans: l,
        compatibleTrans: o
    }
});
;define("translation:widget/translate/history/history", function(t, i) {
    "use strict";
    var e = t("translation:widget/common/third_party/template")
      , n = t("translation:widget/common/environment")
      , o = t("translation:widget/translate/input/textarea")
      , r = t("translation:widget/translate/history/storage")
      , a = t("translation:widget/translate/input/autoRequest")
      , s = $(".history-wrap")
      , h = $(".history-wrap .history-items")
      , d = null
      , l = {
        init: function() {
            r.isSupport && this.bindEvent()
        },
        bindEvent: function() {
            var t = this;
            s.on("click", ".history-remove-all", function(i) {
                i.preventDefault(),
                i.stopPropagation(),
                r.deleteAllStorge(),
                t.renderHistory({
                    data: null
                }),
                _hmt.push(["_trackEvent", "首页", "Web点击历史记录清空按钮"])
            }).on("click", ".history-edit-btn", function(t) {
                t.preventDefault(),
                t.stopPropagation(),
                s.addClass("history-editing")
            }).on("click", ".history-complete", function(t) {
                t.preventDefault(),
                t.stopPropagation(),
                s.removeClass("history-editing")
            }).on("click", ".history-item", function(i) {
                i.preventDefault(),
                i.stopPropagation();
                var e = $(this);
                if (s.hasClass("history-editing")) {
                    var n = e.text()
                      , o = r.deleteFromStorge(n);
                    return t.renderHistory({
                        data: o
                    }),
                    void _hmt.push(["_trackEvent", "首页", "Web点击历史记录删除按钮"])
                }
                var h = e.attr("data-from")
                  , d = e.attr("data-to")
                  , l = e.text();
                a.setEveryThingOkAndTrans({
                    from: h,
                    to: d,
                    query: l
                }),
                _hmt.push(["_trackEvent", "首页", "Web点击历史记录条"]),
                window.location.href = e.attr("href")
            }).on("click", ".history-item-remove", function(i) {
                i.preventDefault(),
                i.stopPropagation();
                var e = $(this).parent()
                  , n = e.text()
                  , o = r.deleteFromStorge(n);
                t.renderHistory({
                    data: o
                }),
                _hmt.push(["_trackEvent", "首页", "Web点击历史记录删除按钮"])
            }).on("click", ".history-tip-setting", function(t) {
                t.preventDefault(),
                t.stopPropagation(),
                $(".translate-setting .setting-options").show(),
                _hmt.push(["_trackEvent", "首页", "历史记录框-点此设置"])
            }),
            $(document).on("click.history", function(t) {
                var i = $(t.target);
                i.hasClass("history-wrap") || i.parents(".history-wrap").length > 0 || s.removeClass("history-editing")
            })
        },
        onInput: function() {
            if (r.isSupport) {
                var t = $.trim(o.getVal());
                try {
                    t ? s.hide() : this.showHistory()
                } catch (i) {
                    s.hide()
                }
            }
        },
        showHistory: function() {
            if (!n.get("isInHistoryMode"))
                return void s.hide();
            var t = r.getHistory();
            this.renderHistory({
                data: t,
                forceQuitEditingPattern: !0
            })
        },
        renderHistory: function(t) {
            var i = t.data;
            if (t.forceQuitEditingPattern && s.removeClass("history-editing"),
            i && i.data.length) {
                for (var n = i.data, o = i.len, r = [], a = o - 1; a >= 0; a--) {
                    var d = n[a];
                    if (d instanceof Array) {
                        var l = {
                            query: d[0],
                            from: d[2],
                            to: d[3]
                        };
                        r.push(l)
                    }
                }
                var u = e("tplHistoryItem", {
                    list: r
                });
                return h.html(u),
                void s.removeClass("history-none").show()
            }
            h.html(""),
            s.addClass("history-none").removeClass("history-editing").show()
        },
        addNewItemToHistory: function(t, i, e) {
            r.isSupport && r.setHistory(e, "", t, i)
        },
        hide: function() {
            s.hide()
        }
    };
    i.init = function() {
        l.init()
    }
    ,
    i.add = function(t, i, e) {
        d && (clearTimeout(d),
        d = null),
        d = setTimeout(function() {
            l.addNewItemToHistory(t, i, e)
        }, 3e3)
    }
    ,
    i.onHistoryInput = function() {
        l.onInput()
    }
    ,
    i.hideHistory = function() {
        l.hide()
    }
});
;define("translation:widget/translate/input/textarea", function(t, e) {
    "use strict";
    var n = $("#baidu_translate_input")
      , a = t("translation:widget/translate/input/sameHeightHandler")
      , i = t("translation:widget/translate/input/correct")
      , r = t("translation:widget/translate/input/urlQueryHandler")
      , s = t("translation:widget/common/util")
      , o = t("translation:widget/translate/input/clear")
      , u = t("translation:widget/translate/history/history")
      , l = t("translation:widget/translate/details/adLink/adLink");
    $.fn.selectRange = function(t, e) {
        return void 0 === e && (e = t),
        this.each(function() {
            if ("selectionStart"in this)
                this.selectionStart = t,
                this.selectionEnd = e;
            else if (this.setSelectionRange)
                this.setSelectionRange(t, e);
            else if (this.createTextRange) {
                var n = this.createTextRange();
                n.collapse(!0),
                n.moveEnd("character", e),
                n.moveStart("character", t),
                n.select()
            }
        })
    }
    ;
    var h = {
        dom: {
            inputWrap: $(".input-wrap"),
            textareaBg: $(".textarea-bg"),
            textareaWrap: $(".textarea-wrap")
        },
        init: function() {
            this.initHeight(),
            this.bindEvent()
        },
        initHeight: function() {
            n.attr({
                "data-height": n.height()
            })
        },
        bindEvent: function() {
            n.on("focus", $.proxy(this.onFocus, this)).on("blur", $.proxy(this.onBlur, this)),
            $(".textarea-wrap .textarea-bg .prompt-text").on("click", function() {
                n.focus()
            }),
            $(window).on("resize.textarea", function() {
                a.sameHeight()
            })
        },
        onFocus: function() {
            $(".trans-input-wrap").addClass("trans-input-wrap-focus"),
            u.onHistoryInput(),
            l.onAdLinkInput()
        },
        onBlur: function() {
            $(".trans-input-wrap").removeClass("trans-input-wrap-focus")
        },
        empty: function() {
            n.val("")
        },
        resize: function() {
            var t = n.attr("data-height")
              , e = n
              , i = e.parents(".textarea-wrap")
              , r = e.parents(".input-wrap");
            i.height(t),
            e.height(t),
            r.outerHeight("auto");
            var s;
            s = $("#baidu_translate_input")[0].scrollHeight,
            $("#baidu_translate_input")[0].scrollHeight && parseInt($("#baidu_translate_input")[0].scrollHeight, 10) >= t && (i.height($("#baidu_translate_input")[0].scrollHeight),
            e.height(i.height())),
            a.sameHeight()
        },
        showPlaceholder: function() {
            this.dom.textareaWrap.removeClass("without-textarea-bg")
        },
        hidePlaceholder: function() {
            this.dom.textareaWrap.addClass("without-textarea-bg")
        },
        hasQuery: function(t) {
            o.show(),
            $("#upload-btn").hide(),
            this.hidePlaceholder(),
            this.resize(),
            i.show(t),
            s.isUrl(t) && r.dealUrlQuery()
        },
        noQuery: function() {
            o.clearAll()
        }
    };
    e.init = function() {
        h.init()
    }
    ,
    e.resize = function() {
        h.resize()
    }
    ,
    e.empty = function(t) {
        h.empty(),
        h.resize(),
        h.showPlaceholder(),
        t !== !1 && n.focus()
    }
    ,
    e.getVal = function() {
        return $.trim(n.val())
    }
    ,
    e.getElem = function() {
        return n
    }
    ,
    e.focus = function() {
        n.focus(),
        n.selectRange(n.val().length)
    }
    ,
    e.hasQuery = function(t) {
        h.hasQuery(t)
    }
    ,
    e.noQuery = function() {
        h.noQuery()
    }
});
;define("translation:widget/translate/input/sound", function(t, e) {
    "use strict";
    var i = {
        timer: null,
        makeSound: function(t, e) {
            var i = $(t);
            i.addClass("op-sound-active"),
            this.timer && clearTimeout(this.timer),
            this.timer = setTimeout(function() {
                i.removeClass("op-sound-active")
            }, 2e3),
            BTPM.setUrl(e)
        }
    };
    e.makeSound = function(t, e) {
        i.makeSound(t, e)
    }
});
;define("translation:widget/translate/input/rttrans", function(t, e) {
    "use strict";
    var n = t("translation:widget/common/environment")
      , i = t("translation:widget/common/util")
      , r = t("translation:widget/translate/input/textarea")
      , a = t("translation:widget/common/string")
      , s = (t("translation:widget/common/cookie"),
    t("translation:widget/translate/input/translate"))
      , o = (t("translation:widget/translate/input/urlQueryHandler"),
    {
        timer: null,
        prevQuery: "",
        onRtTrans: function(t, e) {
            var i = r.getVal()
              , a = n.get("isInRealtimeMode")
              , s = this;
            if (!i || !a)
                return void (this.timer && clearTimeout(this.timer));
            var o = 8 === t.which ? 500 : 200;
            this.timer && clearTimeout(this.timer),
            this.timer = setTimeout(function() {
                s.doTrans(e)
            }, o)
        },
        doTrans: function(t) {
            var e = r.getVal();
            if (e && !i.isUrl(e)) {
                if ($(".output-wrap").children().length <= 0 || "paste" === t)
                    s.onTranslate({
                        transtype: "realtime"
                    });
                else if (e !== this.prevQuery) {
                    if (a.getByte(e) > 500 && a.getByte(this.prevQuery) > 500)
                        return;
                    s.onTranslate({
                        transtype: "realtime"
                    })
                }
                this.prevQuery = e
            }
        }
    });
    e.onRtTrans = function(t, e) {
        o.onRtTrans(t, e)
    }
});
;define("translation:widget/translate/input/inputSoungUrlHandler", function(t, n) {
    "use strict";
    var e = t("translation:widget/translate/input/textarea")
      , a = t("translation:widget/common/soundURIGenerator")
      , r = {
        getInputSoundUrl: function() {
            var t = $(".select-from-language .language-selected").attr("data-lang")
              , n = e.getVal()
              , r = "";
            return "yue" === t && (t = "cte"),
            r = a.generateURI({
                lan: t,
                text: encodeURIComponent(n)
            })
        }
    };
    n.getInputSoundUrl = function() {
        return r.getInputSoundUrl()
    }
});
;define("translation:widget/translate/zonedword/selection", function(e, t) {
    "use strict";
    var n = (e("translation:widget/common/string"),
    {
        getSelectQuery: function(e) {
            var t = e.target
              , n = t.selectionStart
              , o = t.selectionEnd
              , c = "";
            return c = void 0 !== n && void 0 !== o ? $(t).val().substring(n, o) : this.getText()
        },
        getText: function() {
            var e = "";
            return document.getSelection ? e = document.getSelection() : document.selection && (e = document.selection.createRange().text),
            e = e.toString(),
            e = e.replace(/^\s+/g, "").replace(/\s+$/g, "")
        },
        clearSelectionZone: function(e) {
            if ("undefined" != typeof e.target.setSelectionRange)
                e.target.setSelectionRange(0, 0);
            else if ("undefined" != typeof window.getSelection && window.getSelection().rangeCount > 0)
                window.getSelection().collapseToStart();
            else if ("undefined" != typeof document.body.createTextRange) {
                var t = document.body.createTextRange();
                t.moveStart("character", 0),
                t.moveEnd("character", 0)
            }
        }
    });
    t.getText = function(e) {
        return n.getSelectQuery(e)
    }
    ,
    t.clearSelectionZone = function(e) {
        n.clearSelectionZone(e)
    }
});
;define("translation:widget/translate/zonedword/loading", function(n, o) {
    "use strict";
    var i = (n("translation:widget/common/string"),
    {
        show: function() {
            $(".zonedword-loading-tip").show()
        },
        hide: function() {
            $(".zonedword-loading-tip").hide(),
            $(".zonedword-error-tip").hide()
        }
    });
    o.show = function() {
        i.show()
    }
    ,
    o.hide = function() {
        i.hide()
    }
});
;define("translation:widget/translate/zonedword/dict", function(t, e) {
    "use strict";
    var o = t("translation:widget/common/third_party/template")
      , r = t("translation:widget/translate/zonedword/loading")
      , n = {
        render: function(t) {
            var e, n = t.data, d = t.top, a = t.left, i = {};
            r.hide(),
            i.tplData = $.parseJSON(n),
            e = o("tplDictZonedword", i),
            $(".zonedword-result").html(e);
            var w, l, s = $(window).scrollTop(), p = $(window).height(), c = $("#zonedword-wrap").outerHeight();
            d - 30 > p - c ? (l = d + s - 60 - c,
            w = l > 0 ? l : d + s) : w = d + s,
            $("#zonedword-wrap").css({
                top: w,
                left: a
            }).show()
        }
    };
    e.render = function(t) {
        n.render(t)
    }
});
;define("translation:widget/translate/zonedword/fanyi", function(t, r) {
    "use strict";
    var n = t("translation:widget/translate/zonedword/loading")
      , a = t("translation:widget/common/environment")
      , o = t("translation:widget/common/third_party/template")
      , e = {
        render: function(t) {
            var r = t.data
              , e = t.top
              , d = t.left
              , i = {}
              , l = a.get("rtl")
              , w = $.inArray(t.toLang, l) >= 0;
            i.tplData = {},
            i.tplData.data = r,
            i.tplData.dir = w ? "rtl" : "ltr",
            n.hide();
            var s = o("tplOrdinaryZonedword", i);
            $(".zonedword-result").html(s);
            var p, g, c = $(window).scrollTop(), f = $(window).height(), h = $("#zonedword-wrap").outerHeight();
            e - 30 > f - h ? (g = e + c - 60 - h,
            p = g > 0 ? g : e + c) : p = e + c,
            $("#zonedword-wrap").css({
                top: p,
                left: d
            }).show()
        }
    };
    r.render = function(t) {
        e.render(t)
    }
});
;define("translation:widget/translate/zonedword/zonedFavo", function(t, n, o) {
    "use strict";
    var e = t("translation:widget/common/environment")
      , a = t("translation:widget/translate/favo/favo")
      , i = t("translation:widget/translate/input/inputFavo")
      , r = new a({
        pos: "zonedword",
        target: $("#zonedword-wrap .op-favo")[0]
    });
    r.on("change", function() {
        i.query === this.query && i.direction === this.direction && i.check()
    }),
    e.set("zonedFavo", r),
    o.exports = r
});
;define("translation:widget/translate/zonedword/wordWrap", function(t, e) {
    "use strict";
    var o = t("translation:widget/common/string")
      , n = t("translation:widget/translate/zonedword/selection")
      , r = t("translation:widget/translate/zonedword/loading")
      , o = t("translation:widget/common/string")
      , a = t("translation:widget/translate/zonedword/dict")
      , i = t("translation:widget/translate/zonedword/fanyi")
      , d = t("translation:widget/common/environment")
      , s = t("translation:widget/translate/zonedword/zonedFavo")
      , l = null
      , u = t("translation:widget/translate/zonedword/zonedCollGroup/zonedCollGroup")
      , g = {
        dom: {
            from: $(".select-from-language .language-selected"),
            to: $(".select-to-language .language-selected")
        },
        showWrap: function(t) {
            var e = d.get("isInFanyiWordMode")
              , r = n.getText(t)
              , a = this;
            e && this.mouseClickFlag && (this.setMousePosition(t),
            l && clearTimeout(l),
            l = setTimeout(function() {
                var e = d.get("dbClickHighlightZone");
                if (void 0 !== e && "" !== e.query ? (r = e.query,
                d.set("zonewordQueryFrom", e.area),
                d.remove("dbClickHighlightZone"),
                n.clearSelectionZone(t)) : d.remove("zonewordQueryFrom"),
                !(r.length <= 0)) {
                    var i = {
                        query: o.cutByByte(r, 0, 50)
                    };
                    $.ajax({
                        url: "/langdetect",
                        type: "POST",
                        data: i,
                        success: function(t) {
                            a.renderWrap(t, r)
                        }
                    })
                }
            }, 10))
        },
        hideWrap: function() {
            u.hide(),
            $("#zonedword-wrap").hide()
        },
        renderWrap: function(t, e) {
            if (0 === t.error && t.lan) {
                var o = this.dom.from.attr("data-lang")
                  , n = this.dom.to.attr("data-lang")
                  , a = t.lan ? t.lan : o
                  , i = a === n ? o : n;
                $(".zonedword-search-input").val(e).attr("data-dir", a + "2" + i),
                this.setDetailLink(a, i, e),
                r.show(),
                $(".zonedword-result").empty(),
                this.ajaxGetTrans({
                    fromLang: a,
                    toLang: i,
                    query: e
                })
            }
        },
        ajaxGetTrans: function(t) {
            var e = this
              , o = {
                from: t.fromLang,
                to: t.toLang,
                query: t.query,
                source: "txt"
            };
            $.ajax("/transapi", {
                type: "POST",
                data: o,
                success: function(o) {
                    e.transResultIsReturn(o, t.fromLang, t.toLang, t.query)
                }
            })
        },
        transResultIsReturn: function(t, e, o, n) {
            if (!t || !t.error) {
                var r = this.getWrapPosition().top
                  , l = this.getWrapPosition().left;
                t && t.type && (1 === t.type ? (a.render({
                    data: t.result,
                    top: r,
                    left: l
                }),
                s.init({
                    query: n,
                    type: 1,
                    from: e,
                    to: o
                })) : 2 === t.type && (i.render({
                    data: t.data,
                    top: r,
                    left: l,
                    fromLang: e,
                    toLang: o
                }),
                s.init({
                    query: n,
                    type: 2,
                    from: e,
                    to: o
                })),
                _hmt.push(["_trackEvent", "首页", "划词翻译结果框出现次数"]),
                "keywords" === d.get("zonewordQueryFrom") && _hmt.push(["_trackEvent", "首页", "Web重点词汇卡片highlight出划词翻译框次数"]))
            }
        },
        rightClickHideWrap: function(t) {
            this.mouseClickFlag = !1;
            var e = 1 === $("#zonedword-wrap").attr("data-switch") ? !0 : !1;
            e || $("#zonedword-wrap").hide(),
            t && 2 !== t.button && 3 !== t.button && (this.mouseClickFlag = !0,
            n.clearSelectionZone(t))
        },
        setMousePosition: function(t) {
            this.top = t.clientY + 30,
            this.left = t.pageX
        },
        getWrapPosition: function() {
            {
                var t = 0
                  , e = 0
                  , o = $(window).width() - $("#zonedword-wrap").outerWidth();
                $(window).height() - $("#zonedword-wrap").outerHeight()
            }
            return t = this.left < 0 ? 0 : this.left,
            t = this.left > o ? o : this.left,
            e = this.top < 0 ? 0 : this.top,
            {
                top: e,
                left: t
            }
        },
        setDetailLink: function(t, e, o) {
            var n = "/#" + t + "/" + e + "/" + encodeURIComponent(o);
            $(".zonedword-detail-link").attr("href", n)
        }
    };
    e.showWrap = function(t) {
        g.showWrap(t)
    }
    ,
    e.rightClickHideWrap = function(t) {
        g.rightClickHideWrap(t)
    }
    ,
    e.hideWrap = function() {
        g.hideWrap()
    }
});
;define("translation:widget/translate/input/drag", function(t, n, o) {
    "use strict";
    function r() {
        d.dragCompatibility && ($("body").dndhover().on("dndHoverStart", function() {
            a("drag")
        }).on("dragover", function(t) {
            t.stopPropagation(),
            t.preventDefault()
        }).on("dndHoverEnd", function() {
            a()
        }).on("drop", function(t) {
            t.stopPropagation(),
            t.preventDefault(),
            a()
        }),
        e.dndhover().on("dndHoverStart", function(t) {
            a("drop"),
            t.stopPropagation()
        }).on("dndHoverEnd", function(t) {
            a("drag"),
            t.stopPropagation()
        }).on("drop", function(t) {
            a(),
            d.handle(t)
        }))
    }
    function a(t) {
        "drag" === t ? i.removeClass("with-drop-tip").addClass("with-drag-tip") : "drop" === t ? i.removeClass("with-drag-tip").addClass("with-drop-tip") : i.removeClass("with-drag-tip with-drop-tip")
    }
    var d = t("translation:widget/translate/input/dataTransfer")
      , i = $(".trans-input-wrap")
      , e = $(".translateio .trans-left");
    $.fn.dndhover = function() {
        return this.each(function() {
            var t = $(this)
              , n = $();
            t.on("dragenter", function(o) {
                0 === n.length && t.trigger("dndHoverStart"),
                n = n.add(o.target)
            }),
            t.on("dragleave", function(o) {
                setTimeout(function() {
                    n = n.not(o.target),
                    0 === n.length && t.trigger("dndHoverEnd")
                }, 1)
            }),
            t.on("drop", function(t) {
                n = n.not(t.target)
            })
        })
    }
    ,
    o.exports = {
        bindEvent: r
    }
});
;define("translation:widget/translate/docTranslate/docTranslate", function(t, n, e) {
    "use strict";
    function a(t) {
        return function() {
            var n = t.apply(this, arguments);
            return new Promise(function(t, e) {
                function a(r, o) {
                    try {
                        var i = n[r](o)
                          , s = i.value
                    } catch (c) {
                        return void e(c)
                    }
                    return i.done ? void t(s) : Promise.resolve(s).then(function(t) {
                        a("next", t)
                    }, function(t) {
                        a("throw", t)
                    })
                }
                return a("next")
            }
            )
        }
    }
    function r(t) {
        return 20 > Q - t ? 3e3 : 1e4
    }
    function o() {
        var t = T.currTask
          , n = t.from
          , e = t.to
          , a = t.fileName;
        b.find(".file-name").text(a);
        var r = "auto" === n && "auto" === e;
        b.find(".doc-view-from-lang").text(r ? "中英互译" : y[n].zhName),
        b.find(".doc-view-to-lang").text(r ? "" : y[e].zhName),
        b.find(".doc-view-lang-pair").toggleClass("auto", r),
        _.show(),
        C.hide(),
        b.addClass("loading"),
        j = null
    }
    function i(t) {
        return new Promise(function(n) {
            setTimeout(function() {
                n()
            }, t)
        }
        )
    }
    function s() {
        return new Promise(function(t, n) {
            $.ajax({
                url: "https://fanyi-doc.baidu.com/doctrans/api/querytransresult?fileToken=" + T.currTask.token,
                type: "GET",
                dataType: "json",
                cache: !1,
                xhrFields: {
                    withCredentials: !0
                },
                success: function(e) {
                    if (10010 === e.errno || 0 === e.errno)
                        t(e);
                    else
                        switch (e.errno) {
                        case 10020:
                            n({
                                content: "加密文档无法解析，请解除加密重试"
                            });
                            break;
                        case 10021:
                            n({
                                content: "文档字数超限，建议拆分文档翻译哦"
                            });
                            break;
                        case 10023:
                            n({
                                content: "文档有加密处理，小译无法解析哦"
                            });
                            break;
                        case 10024:
                            n({
                                content: "pdf文档页面过宽，小译打不开哦"
                            });
                            break;
                        case 10025:
                            n({
                                content: "非常抱歉，您的pdf文档打开失败\n建议转成word文档试试"
                            });
                            break;
                        default:
                            n({})
                        }
                },
                error: function() {
                    n({
                        content: "网络不给力，请稍后重试"
                    })
                }
            })
        }
        )
    }
    function c(t) {
        if ($("#main-outer").hasClass("doc-trans-view-mode")) {
            var n = {
                title: "文档解析失败",
                content: "小译翻译压力有点大，请稍后重试"
            }
              , e = Object.assign(n, t);
            E.text(e.title),
            O.text(e.content),
            _.hide(),
            C.show(),
            q.hide()
        }
    }
    function d(t) {
        var n = t.isHtml
          , e = t.data
          , a = t.isOriginalOverflow;
        if (n) {
            G.text(T.currTask.fileName);
            var r = e.style
              , o = e.html
              , i = document.createElement("style");
            i.type = "text/css",
            i.innerHTML = r,
            i.id = "doc-specified-style",
            document.head.appendChild(i),
            I.html(o),
            R.html(o),
            I.find(".translated-span").each(function(t, n) {
                var e = $(n);
                e.text(e.attr("data-src-str"))
            }),
            j = $(".doc-whole-container .translated-span"),
            l(),
            a && m(),
            window._hmt.push(["_trackEvent", "首页", "文档翻译_结果页展现，成功展示原文译文对照"]),
            h()
        } else
            J.attr("src", "https://view.officeapps.live.com/op/embed.aspx?src=" + T.currTask.url)
    }
    function l() {
        $("#doc-fill-div").remove();
        var t = I.height()
          , n = R.height()
          , e = Math.abs(t - n)
          , a = n > t ? I : R
          , r = $('<div style="height: ' + e + 'px" id="doc-fill-div"></div>');
        a.append(r)
    }
    function u(t) {
        t.stopPropagation(),
        U.hasClass("generating") || k()
    }
    function f() {
        return new Promise(function(t, n) {
            $.ajax({
                url: "https://fanyi-doc.baidu.com/doctrans/api/querydownload?fileToken=" + T.currTask.token,
                type: "GET",
                dataType: "json",
                cache: !1,
                xhrFields: {
                    withCredentials: !0
                },
                success: function(n) {
                    t(n.errno)
                },
                error: function() {
                    n()
                }
            })
        }
        )
    }
    function p() {
        var t = "";
        try {
            t = decodeURIComponent(location.hash).replace(/^#/, "")
        } catch (n) {}
        var e = T.viewModeRegExp.exec(t);
        if (Array.isArray(e)) {
            var a = w(e, 5)
              , r = a[1]
              , i = a[2]
              , s = a[3]
              , l = a[4];
            Object.assign(T.currTask, {
                fileName: r,
                from: i,
                to: s,
                token: l
            }),
            o(),
            T.clearDocTransMode(),
            $("#main-outer").addClass("doc-trans-view-mode"),
            $(".footer").hide(),
            nn.uploadSuccess(),
            g().then(function(t) {
                var n = t.isHtml
                  , e = t.data;
                if ($("#main-outer").hasClass("doc-trans-view-mode")) {
                    var a = !1;
                    if (n) {
                        var r = e.translatedSpanCounter
                          , o = e.fromLang
                          , i = e.toLang
                          , s = e.isOverflow;
                        a = s,
                        Object.assign(T.currTask, {
                            translatedSpanCounter: r,
                            detectedFrom: o,
                            detectedTo: i,
                            isOverflow: s,
                            isOriginalOverflow: a
                        })
                    } else {
                        var c = e;
                        Object.assign(T.currTask, {
                            url: c
                        })
                    }
                    Object.assign(T.currTask, {
                        isHtml: n
                    }),
                    _.removeAttr("style"),
                    C.removeAttr("style"),
                    b.removeClass("loading").addClass("viewing-" + (n ? "html" : "file")),
                    d({
                        isHtml: n,
                        data: e,
                        isOriginalOverflow: a
                    }),
                    n && (tn = !0,
                    P.scrollTop(0))
                }
            }, c)
        }
    }
    function h() {
        setTimeout(function() {
            B = A.offset().top,
            K = A.height()
        }, 100)
    }
    function m() {
        [I, R].forEach(function(t) {
            var n = t.find(".last-translated-sen")
              , e = n.offset().left - t.offset().left;
            e > 456 && n.addClass("show-tip-left")
        })
    }
    function v(t) {
        return encodeURI(t).split(/%..|./).length - 1
    }
    var w = function() {
        function t(t, n) {
            var e = []
              , a = !0
              , r = !1
              , o = void 0;
            try {
                for (var i, s = t[Symbol.iterator](); !(a = (i = s.next()).done) && (e.push(i.value),
                !n || e.length !== n); a = !0)
                    ;
            } catch (c) {
                r = !0,
                o = c
            } finally {
                try {
                    !a && s["return"] && s["return"]()
                } finally {
                    if (r)
                        throw o
                }
            }
            return e
        }
        return function(n, e) {
            if (Array.isArray(n))
                return n;
            if (Symbol.iterator in Object(n))
                return t(n, e);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }()
      , g = function() {
        var t = a(regeneratorRuntime.mark(function n() {
            var t, e, a, o;
            return regeneratorRuntime.wrap(function(n) {
                for (; ; )
                    switch (n.prev = n.next) {
                    case 0:
                        t = Q;
                    case 1:
                        if (!(t > 0)) {
                            n.next = 23;
                            break
                        }
                        return e = r(t),
                        n.next = 5,
                        i(e);
                    case 5:
                        if ($("#main-outer").hasClass("doc-trans-view-mode")) {
                            n.next = 7;
                            break
                        }
                        return n.abrupt("break", 23);
                    case 7:
                        return n.next = 9,
                        s();
                    case 9:
                        if (a = n.sent,
                        0 !== a.errno) {
                            n.next = 19;
                            break
                        }
                        return nn.complete(),
                        n.next = 14,
                        i(600);
                    case 14:
                        return o = !0,
                        "string" != typeof a.data && (o = !1),
                        n.abrupt("return", {
                            isHtml: o,
                            data: o ? JSON.parse(a.data) : a.data.url
                        });
                    case 19:
                        t -= e / 1e3,
                        nn.add();
                    case 21:
                        n.next = 1;
                        break;
                    case 23:
                        throw {
                            content: "非常抱歉，文档解析超时"
                        };
                    case 24:
                    case "end":
                        return n.stop()
                    }
            }, n, this)
        }));
        return function() {
            return t.apply(this, arguments)
        }
    }()
      , k = function() {
        var t = a(regeneratorRuntime.mark(function n() {
            var t;
            return regeneratorRuntime.wrap(function(n) {
                for (; ; )
                    switch (n.prev = n.next) {
                    case 0:
                        if (window._hmt.push(["_trackEvent", "首页", "82_首页页面_开始导出"]),
                        !U.prop("data-has-gen-link")) {
                            n.next = 6;
                            break
                        }
                        window.location.href = "https://fanyi-doc.baidu.com/doctrans/download?fileToken=" + T.currTask.token,
                        window._hmt.push(["_trackEvent", "首页", "83_首页页面_成功导出"]),
                        n.next = 22;
                        break;
                    case 6:
                        U.addClass("generating");
                    case 7:
                        if (!$("#main-outer").hasClass("doc-trans-view-mode")) {
                            n.next = 22;
                            break
                        }
                        return n.next = 10,
                        f();
                    case 10:
                        if (t = n.sent,
                        0 !== t) {
                            n.next = 18;
                            break
                        }
                        return U.removeClass("generating").prop("data-has-gen-link", !0),
                        window.location.href = "https://fanyi-doc.baidu.com/doctrans/download?fileToken=" + T.currTask.token,
                        window._hmt.push(["_trackEvent", "首页", "83_首页页面_成功导出"]),
                        n.abrupt("return");
                    case 18:
                        return n.next = 20,
                        i(X);
                    case 20:
                        n.next = 7;
                        break;
                    case 22:
                    case "end":
                        return n.stop()
                    }
            }, n, this)
        }));
        return function() {
            return t.apply(this, arguments)
        }
    }();
    t("translation:widget/common/third_party/jquery_scrollbar/jquery_scrollbar");
    var T = t("translation:widget/translate/docTranslate/docTransUtil")
      , x = t("translation:widget/translate/input/uploader")
      , y = t("translation:widget/common/config/langMap")
      , b = $(".doc-trans-view-wrap")
      , _ = b.find(".loading-container")
      , C = b.find(".loading-err-container")
      , E = b.find(".err-title")
      , O = b.find(".err-content")
      , j = null
      , S = b.find(".doc-whole-container")
      , P = b.find(".src-doc-scroll-wrapper,.dst-doc-scroll-wrapper")
      , A = b.find(".src-doc-scroll-wrapper")
      , H = b.find(".dst-doc-scroll-wrapper")
      , I = b.find(".src-doc-padding-wrapper")
      , R = b.find(".dst-doc-padding-wrapper")
      , q = b.find(".loading-exit-btn")
      , M = b.find(".err-exit-btn")
      , N = b.find(".err-re-upload-btn")
      , D = b.find(".view-re-upload-btn")
      , U = b.find(".export-doc-btn")
      , F = b.find(".export-tip")
      , L = b.find(".no-tip-check")
      , z = b.find(".confirm-export-btn")
      , G = b.find(".view-file-name")
      , J = $("#doc-view-iframe")
      , V = b.find(".doc-async-translating-tip")
      , W = b.find(".go-back")
      , B = 0
      , K = 0
      , Q = window.common.domainHit || window.common.docLangHit ? 600 : 180
      , X = 5e3
      , Y = 2
      , Z = 4
      , tn = !1;
    $.fn.scrollEnd = function(t) {
        var n = 500;
        $(this).scroll(function(e) {
            var a = $(this);
            return a.is(A) && tn ? void (tn = !1) : (a.data("scrollTimeout") && clearTimeout(a.data("scrollTimeout")),
            void a.data("scrollTimeout", setTimeout(function() {
                t(e),
                a.data("scrollTimeout", 0)
            }, n)))
        })
    }
    ;
    var nn = T.progress;
    !function() {
        x.on("uploadSuccess", function(t, n) {
            if (0 === n.errno) {
                var e = n.fileToken
                  , a = T.currTask.file.name
                  , r = T.currTask
                  , o = r.from
                  , i = r.to;
                location.hash = "/docViewMode?name=" + encodeURIComponent(a) + "&from=" + o + "&to=" + i + "&token=" + encodeURIComponent(e)
            } else
                c(10009 === n.errno ? {} : {
                    content: "网络不给力，请稍后重试"
                })
        }),
        x.on("uploadError", function() {
            c({
                content: "网络不给力，请稍后重试"
            })
        }),
        q.add(M).on("click", function(t) {
            $(t.currentTarget).is(q) ? window._hmt.push(["_trackEvent", "首页", "文档翻译_loading点击退出按钮"]) : $(t.currentTarget).is(M) && window._hmt.push(["_trackEvent", "首页", "文档翻译_文档解析失败点击退出按钮"]),
            location.hash = "",
            T.clearDocTrans(!1)
        }),
        N.add(D).on("click", function(t) {
            $(t.currentTarget).is(D) ? window._hmt.push(["_trackEvent", "首页", "76_首页页面_点击上传新文档按钮"]) : $(t.currentTarget).is(N) && window._hmt.push(["_trackEvent", "首页", "文档翻译_文档解析失败点击重新上传"]),
            location.hash = "",
            T.clearDocTrans(!0)
        }),
        U.on("click", u),
        F.on("click", function(t) {
            return t.stopPropagation()
        }),
        L.on("click", function() {
            L.hasClass("checked") || window._hmt.push(["_trackEvent", "首页", "78_首页页面_选中导出提示中不再提示复选框"]),
            L.toggleClass("checked")
        }),
        z.on("click", function() {
            window._hmt.push(["_trackEvent", "首页", "79_首页页面_点击导出提示中确认导出"]),
            L.hasClass("checked") && localStorage.setItem("doNotTipExportOverflow", "true"),
            F.hide(),
            k()
        }),
        $(window).on("click", function() {
            "none" !== F.css("display") && F.hide()
        }),
        W.on("click", function() {
            location.href = T.currTask.file ? "/#/docTransMode" : "/"
        }),
        S.on("mouseenter", "span.translated-span", function(t) {
            var n = $(t.currentTarget)
              , e = n.attr("data-span-idx")
              , a = null
              , r = null
              , o = null;
            A.find(n).length > 0 ? (a = A,
            r = H) : (a = H,
            r = A),
            o = r.find(".translated-span[data-span-idx='" + e + "']"),
            n.add(o).addClass("hover");
            var i = B
              , s = i + r.height()
              , c = o.offset().top
              , d = c + o.height()
              , l = d - s;
            if (l > 0)
                r.is(A) && (tn = !0),
                r.scrollTop(r.scrollTop() + l);
            else {
                var u = i - c;
                u > 0 && (r.is(A) && (tn = !0),
                r.scrollTop(r.scrollTop() - u))
            }
        }),
        S.on("mouseleave", "span.translated-span", function() {
            j.removeClass("hover")
        }),
        A.scrollbar(),
        H.scrollbar(),
        P.on("scroll", function(t) {
            if (0 !== j.length) {
                var n = $(t.currentTarget);
                if (n.is(":hover")) {
                    var e = n.hasClass("src-doc-scroll-wrapper") ? H : A
                      , a = 0
                      , r = -1
                      , o = n.find(".translated-span, .not-translated-para")
                      , i = B
                      , s = null
                      , c = !0
                      , d = 0;
                    do {
                        var l = o.eq(d++)
                          , u = l.offset().top - i;
                        u > 0 && (s = l,
                        s.is(".not-translated-para") && (c = !1),
                        a = u,
                        r = l.attr(c ? "data-span-idx" : "data-para-idx"))
                    } while (null === s && d < o.length);if (-1 !== r) {
                        var f = e.find("[" + (c ? "data-span-idx" : "data-para-idx") + "='" + r + "']")
                          , p = B + a - f.offset().top;
                        e.scrollTop(e.scrollTop() - p)
                    }
                }
            }
        });
        A.height();
        A.scrollEnd(function() {
            function t(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1
                  , e = t.text()
                  , s = t.attr("data-para-idx");
                a.push(t),
                r.push(e),
                n && T.currTask.translatingParaIdxSet.add(s),
                o.push(s),
                i += v(e) + 1
            }
            if ($("#main-outer").hasClass("doc-trans-view-mode") && T.currTask.isOverflow) {
                var n = A.find(".not-translated-para")
                  , e = null
                  , a = []
                  , r = []
                  , o = []
                  , i = 0
                  , s = 0
                  , c = null
                  , d = !1
                  , u = 0;
                do {
                    c = n.eq(s++);
                    var f = c.offset().top
                      , p = f + c.height()
                      , h = p - B;
                    u = f - B,
                    d = u >= K * Z,
                    T.currTask.translatingParaIdxSet.has(c.attr("data-para-idx")) || d || (h > 0 ? e = c : u > -(K * Y) && t(c, !1))
                } while (null === e && s < n.length && !d);if (null !== e) {
                    var m = function() {
                        o.forEach(function(t) {
                            T.currTask.translatingParaIdxSet.delete(t)
                        })
                    };
                    for (K > u && V.show(),
                    o.forEach(function(t) {
                        return T.currTask.translatingParaIdxSet.add(t)
                    }),
                    s -= 1; s < n.length; s++) {
                        var w = n.eq(s);
                        if (t(w, !0),
                        i > 3e4)
                            break
                    }
                    var g = r.join("\n")
                      , k = Date.now().toString()
                      , x = T.currTask
                      , y = x.detectedFrom
                      , b = x.detectedTo;
                    $.ajax({
                        url: "https://fanyi-doc.baidu.com/doctrans/api/multitrans",
                        type: "POST",
                        dataType: "json",
                        data: {
                            from: y,
                            to: b,
                            query: g,
                            timeStamp: k
                        },
                        success: function(t) {
                            if ($("#main-outer").hasClass("doc-trans-view-mode")) {
                                if (m(),
                                0 !== t.errno)
                                    return void V.hide();
                                var n = [];
                                t.trans.forEach(function(t) {
                                    for (var e = 0; e < t.prefixWrap; e++)
                                        n.push(null);
                                    n.push({
                                        srcArray: t.src_array,
                                        dstArray: t.dst_array
                                    })
                                });
                                for (var e = r.length - n.length, i = 0; e > i; i++)
                                    n.push(null);
                                a.forEach(function(t, e) {
                                    var a = H.find("[data-para-idx='" + o[e] + "']")
                                      , r = n[e]
                                      , i = t.add(a);
                                    if (i.removeClass("not-translated-para"),
                                    i.removeAttr("data-para-idx"),
                                    null === r)
                                        i.text("");
                                    else {
                                        var s = r.srcArray
                                          , c = r.dstArray
                                          , d = t
                                          , l = a;
                                        s.forEach(function(t, n) {
                                            var e = c[n]
                                              , a = d.add(l);
                                            d.text(t),
                                            l.text(e),
                                            a.addClass("translated-span");
                                            var r = T.currTask.translatedSpanCounter++;
                                            if (a.attr("data-span-idx", r),
                                            n < s.length - 1) {
                                                var o = d.clone()
                                                  , i = l.clone();
                                                d.after(o),
                                                l.after(i),
                                                d = o,
                                                l = i
                                            }
                                        })
                                    }
                                }),
                                l(),
                                0 === A.find(".not-translated-para").length && (T.currTask.isOverflow = !1),
                                j = S.find(".translated-span"),
                                V.hide()
                            }
                        },
                        error: function() {
                            m(),
                            V.hide()
                        }
                    })
                }
            }
        }),
        $(window).on("resize.adjustDocHeight", function() {
            $("#main-outer").hasClass("doc-trans-view-mode") && b.hasClass("viewing-html") && (l(),
            h())
        }),
        $(p)
    }(),
    e.exports = {
        loading: o,
        onHashChange: p
    }
});
;define("translation:widget/translate/input/events", function(t, n) {
    "use strict";
    function e(t) {
        return function() {
            var n = t.apply(this, arguments);
            return new Promise(function(t, e) {
                function a(o, i) {
                    try {
                        var r = n[o](i)
                          , s = r.value
                    } catch (l) {
                        return void e(l)
                    }
                    return r.done ? void t(s) : Promise.resolve(s).then(function(t) {
                        a("next", t)
                    }, function(t) {
                        a("throw", t)
                    })
                }
                return a("next")
            }
            )
        }
    }
    function a() {
        A = !0
    }
    function o(t) {
        A = !1,
        i(t)
    }
    function i(t) {
        l(t),
        A || g.onRtTrans(t),
        D.updateManualTransBtn()
    }
    function r(t) {
        t.stopPropagation(),
        (!E.pasteCompatibility || E.handle(t)) && (g.onRtTrans(t, "paste"),
        T.switchFontSize())
    }
    function s(t) {
        C.onTextAreaKeyDown(t)
    }
    function l(t) {
        var n = $("#baidu_translate_input").val()
          , e = y[0];
        if (!("input" !== t.type && ("oninput"in e && (!P || "keyup" !== t.type || 8 !== t.which && 46 !== t.which) || "keyup" !== t.type || 38 === t.which || 40 === t.which || C.getCloseSugByEnter() || 13 === t.which && C.getTranslatedByKeyDown()))) {
            var a = T.switchFontSize();
            a || t.triggerByOcr || A ? C.clearAndHideSug() : _.getByte(n) <= 24 && C.loadSug()
        }
        if (S.hideWrap(),
        v.onHistoryInput(),
        b.onAdLinkInput(),
        n) {
            if (13 === t.which)
                return C.getCloseSugByEnter() && C.setCloseSugByEnter(!1),
                void (C.getTranslatedByKeyDown() ? C.setTranslatedByKeyDown(!1) : m.onTranslate({
                    transtype: "enter"
                }));
            c.hasQuery(n),
            B.get("shouldClearPromptOnInput") && (h.hide(),
            B.set("shouldClearPromptOnInput", !1))
        } else
            k.translateStopRepeat() || k.shutdownAudio(),
            f.clearAll(!1)
    }
    var c = t("translation:widget/translate/input/textarea")
      , u = t("translation:widget/translate/input/soundicon")
      , d = t("translation:widget/translate/input/sound")
      , p = t("translation:widget/translate/input/correct")
      , g = t("translation:widget/translate/input/rttrans")
      , h = t("translation:widget/translate/input/prompt")
      , m = t("translation:widget/translate/input/translate")
      , w = t("translation:widget/translate/input/inputSoungUrlHandler")
      , f = t("translation:widget/translate/input/clear")
      , v = t("translation:widget/translate/history/history")
      , y = c.getElem()
      , k = t("translation:widget/translate/details/dictionary/simplemeans")
      , T = t("translation:widget/translate/input/fontSize")
      , C = t("translation:widget/translate/input/inputSug")
      , _ = t("translation:widget/common/string")
      , S = t("translation:widget/translate/zonedword/wordWrap")
      , b = t("translation:widget/translate/details/adLink/adLink")
      , E = t("translation:widget/translate/input/dataTransfer")
      , x = t("translation:widget/translate/input/drag")
      , D = t("translation:widget/translate/translang/manualTrans")
      , B = t("translation:widget/common/environment")
      , R = t("translation:widget/translate/input/uploader")
      , I = t("translation:widget/translate/docTranslate/docTransUtil")
      , L = t("translation:widget/login/login")
      , z = t("translation:widget/translate/domain/domain")
      , P = "oninput"in y[0] && "documentMode"in document && 9 === document.documentMode
      , A = !1;
    n.onClearBtnClick = function() {
        return $("#main-outer").hasClass("doc-trans-mode") ? (window._hmt.push(["_trackEvent", "首页", "文档翻译_上传后点x删除文档"]),
        void (location.href = "/")) : (k.translateStopRepeat() || k.shutdownAudio(),
        f.clearAll(),
        T.switchFontSize(),
        C.clearAndHideSug(),
        void D.updateManualTransBtn())
    }
    ,
    n.init = function() {
        function n(t) {
            var n = E.pasteCompatibility || E.dragCompatibility;
            I.logWrongFileFormat(t),
            alert("目前仅支持 " + (window.common.pdfHit ? "pdf、" : "") + "docx、doc、ppt、pptx、xls、xlsx" + (n ? "、jpg、png、bmp、jpeg " : " ") + "格式哦")
        }
        var l = this
          , g = this;
        y.on("compositionstart", a).on("compositionend", o).on("input", i).on("keyup", i).on("paste", r).on("keydown", s),
        $(document).on("paste", function(t) {
            E.pasteCompatibility && E.handle(t)
        }),
        f.getElem().on("click", function(t) {
            t.preventDefault(),
            g.onClearBtnClick(),
            _hmt.push(["_trackEvent", "首页", "web端点击清空输入框"])
        }),
        u.getElem().on("click", function(t) {
            t.preventDefault(),
            k.judgeStopRepeat(),
            g.timer && clearTimeout(g.timer);
            var n = w.getInputSoundUrl();
            d.makeSound(this, n),
            _hmt.push(["_trackEvent", "首页", "web端原文发音TTS"]),
            _hmt.push(["_trackEvent", "首页", "web端点击发音按钮"])
        }),
        u.getElem().on("mouseover", function() {
            if ("hover" === B.get("soundTriggerMode")) {
                var t = $(this);
                g.timer = setTimeout(function() {
                    k.judgeStopRepeat();
                    var n = w.getInputSoundUrl();
                    d.makeSound(t, n),
                    _hmt.push(["_trackEvent", "首页", "web端原文发音TTS"]),
                    _hmt.push(["_trackEvent", "首页", "web端点击发音按钮"])
                }, 500)
            }
        }),
        u.getElem().on("mouseout", function() {
            g.timer && clearTimeout(g.timer)
        }),
        $(".trans-correct").on("click", ".correct-query", function(t) {
            t.preventDefault();
            var n = $(this).text();
            p.onCorrect(n),
            _hmt.push(["_trackEvent", "首页", "web端query纠错点击次数"])
        }),
        $(".trans-prompt").on("click", ".source-lang", function(t) {
            t.preventDefault();
            var n = $(this).attr("data-lang");
            h.onPrompt(n),
            _hmt.push(["_trackEvent", "首页", "web端点击语种检测提示"])
        }).on("click", ".open-from-lang", function(n) {
            n.stopPropagation();
            var e = t("translation:widget/translate/translang/langPanelContainer.jsx");
            e.fromBtnClicked()
        }),
        $(".trans-input-wrap").on("click", ".input-wrap", function(t) {
            var n = $(t.target);
            (n.hasClass("input-wrap") || n.hasClass("textarea-wrap")) && (t.preventDefault(),
            c.focus())
        }),
        x.bindEvent();
        var m = $("#image-holder")
          , v = $("#preview-img")
          , T = $(".translateio");
        m.on("click", function() {
            if (v.is(":hidden")) {
                var t = v.get(0)
                  , n = window.URL || window.webkitURL;
                t.onload = function() {
                    var t = this.src;
                    setTimeout(function() {
                        n.revokeObjectURL(t)
                    }, 1e3),
                    T.addClass("is-zoom-in");
                    try {
                        $(window).trigger("resize")
                    } catch (e) {}
                }
                ,
                t.src = n.createObjectURL(m.data("file")),
                _hmt.push(["_trackEvent", "首页", "56_首页页面_点击放大缩略图的次数"])
            } else {
                T.removeClass("is-zoom-in");
                try {
                    $(window).trigger("resize")
                } catch (e) {}
            }
        }),
        v.on("click", function() {
            T.removeClass("is-zoom-in");
            try {
                $(window).trigger("resize")
            } catch (t) {}
        }),
        $(window).on("hashchange", function(n) {
            n.preventDefault();
            var e = "";
            try {
                e = decodeURIComponent(location.hash).replace(/^#/, "")
            } catch (n) {}
            if ("/docTransMode" === e)
                I.currTask.file ? ($(".doc-trans-file").text(I.currTask.file.name),
                I.clearDocTransViewMode(),
                $("#main-outer").addClass("doc-trans-mode"),
                z.hide(),
                localStorage.getItem("docTransLangGuideFlag") || ($(".doc-trans-operation").addClass("guiding"),
                $(".doc-trans-operation .doc-trans-dir").addClass("open"))) : I.clearDocTrans();
            else if (I.viewModeRegExp.test(e)) {
                var a = t("translation:widget/translate/docTranslate/docTranslate");
                a.onHashChange()
            } else
                I.clearDocTrans(),
                t("translation:widget/translate/input/autoRequest").onHashChange()
        }),
        R.on("fileQueued", function() {
            var t = e(regeneratorRuntime.mark(function a(t) {
                var e;
                return regeneratorRuntime.wrap(function(a) {
                    for (; ; )
                        switch (a.prev = a.next) {
                        case 0:
                            if (!I.isSupportByDocTrans(t)) {
                                a.next = 16;
                                break
                            }
                            if (window.common.docTransWithoutLogin) {
                                a.next = 4;
                                break
                            }
                            return a.next = 4,
                            L.ensureUserLoginAsync();
                        case 4:
                            if (e = window.common.docLangHit ? 30 : 10,
                            !(t.size > 1024 * e * 1024)) {
                                a.next = 10;
                                break
                            }
                            return R.removeFile(t, !0),
                            window._hmt.push(["_trackEvent", "首页", "文档翻译_提示大小超限"]),
                            alert("文档大小目前仅支持 " + e + "M 以内，建议拆分文档重试哦"),
                            a.abrupt("return");
                        case 10:
                            f.clearAll(),
                            I.currTask.file = t,
                            I.currTask.fileName = t.name,
                            location.hash = "/docTransMode",
                            a.next = 18;
                            break;
                        case 16:
                            t.type.startsWith("image/") && (E.pasteCompatibility || E.dragCompatibility) ? E.processImgFile(t.getSource().source) : n(t),
                            R.removeFile(t, !0);
                        case 18:
                        case "end":
                            return a.stop()
                        }
                }, a, l)
            }));
            return function() {
                return t.apply(this, arguments)
            }
        }()),
        R.on("error", function(t, e) {
            "Q_TYPE_DENIED" === t && n(e)
        }),
        $("#upload-btn").on("click", function() {
            Boolean(B.get("account").is_login) || window.common.docTransWithoutLogin ? $("#upload-btn-hidden").find('input[type="file"]').click() : L.newLoginInstanceAsync(),
            _hmt.push(["_trackEvent", "首页", "75_首页页面_点击上传文档按钮"])
        });
        var C = localStorage.getItem("hasShowDocTipV2");
        C || ($("#upload-btn").addClass("with-first-tip"),
        $(window).on("click.hideDocTip", function() {
            $("#upload-btn").removeClass("with-first-tip"),
            $(window).off("click.hideDocTip"),
            localStorage.setItem("hasShowDocTipV2", "true")
        })),
        $(window).on("click.stopSound", function(t) {
            var n = $(t.target);
            n.hasClass("icon-sound") || n.hasClass("op-sound") || n.hasClass("sound-btn") || n.hasClass("icon-repeat") || n.hasClass("op-repeat") || n.hasClass("usecase-sound") || (BTPM.doPause(),
            k.shutdownRepeat(),
            $(".op-sound").removeClass("op-sound-active"))
        });
        var _ = [32, 13];
        $(document).on("keypress", function(n) {
            if (!y.is(":focus") && !(y.val().trim().length > 0 || _.includes(n.which) || n.altKey || n.ctrlKey || n.metaKey)) {
                var e = $("#main-outer");
                if (!e.hasClass("doc-trans-mode") && !e.hasClass("doc-trans-view-mode")) {
                    var a = document.getElementById("passport-login-pop");
                    if (!a || "none" === a.style.display) {
                        var o = t("translation:widget/translate/translang/langPanelContainer.jsx");
                        0 === o.getCurrLangType() && y.focus()
                    }
                }
            }
        })
    }
    ;
    n.textareaInput = l
});
;define("translation:widget/translate/input/dataTransfer", function(t, e, n) {
    "use strict";
    function r(t) {
        return function() {
            var e = t.apply(this, arguments);
            return new Promise(function(t, n) {
                function r(a, i) {
                    try {
                        var o = e[a](i)
                          , s = o.value
                    } catch (u) {
                        return void n(u)
                    }
                    return o.done ? void t(s) : Promise.resolve(s).then(function(t) {
                        r("next", t)
                    }, function(t) {
                        r("throw", t)
                    })
                }
                return r("next")
            }
            )
        }
    }
    function a(t) {
        var e = t.type
          , n = null;
        if ("paste" === e)
            n = t.originalEvent.clipboardData;
        else {
            if ("drop" !== e)
                return !0;
            n = t.originalEvent.dataTransfer
        }
        var r = n.items
          , a = n.files
          , i = !1
          , o = null
          , s = !1
          , u = null;
        if (r) {
            if (_(r))
                return !0;
            for (var l = r.length - 1; l >= 0; l--) {
                var d = r[l]
                  , p = d.kind
                  , m = d.type;
                if ("file" === p) {
                    var f = d.getAsFile();
                    if (m.startsWith("image/")) {
                        if (f) {
                            i = !0,
                            o = f;
                            break
                        }
                    } else if (E.isSupportByDocTrans(f) && window.common.docHit) {
                        if (f) {
                            s = !0,
                            u = f;
                            break
                        }
                    } else if ("drop" === e && window.common.docHit && !E.isUrlFileInEdge(f)) {
                        E.logWrongFileFormat(f),
                        alert("目前仅支持 " + (window.common.pdfHit ? "pdf、" : "") + "docx、doc、ppt、pptx、xls、xlsx、jpg、png、bmp、jpeg 格式哦");
                        break
                    }
                }
            }
        } else
            for (var g = a.length - 1; g >= 0; g--) {
                var v = a.item(g);
                if (v.type.startsWith("image/")) {
                    i = !0,
                    o = v;
                    break
                }
                if (E.isSupportByDocTrans(v) && window.common.docHit) {
                    s = !0,
                    u = v;
                    break
                }
                if ("drop" === e && window.common.docHit && !E.isUrlFileInEdge(v)) {
                    E.logWrongFileFormat(v),
                    alert("目前仅支持 " + (window.common.pdfHit ? "pdf、" : "") + "docx、doc、ppt、pptx、xls、xlsx、jpg、png、bmp、jpeg 格式哦");
                    break
                }
            }
        if (i) {
            if (t.preventDefault(),
            _hmt.push("drop" === e ? ["_trackEvent", "首页", "53_首页页面_上传图片方式_拖拽"] : ["_trackEvent", "首页", "53_首页页面_上传图片方式_复制"]),
            !c())
                return h(o, !1),
                !1
        } else if (s)
            return t.preventDefault(),
            "drop" === e && window._hmt.push(["_trackEvent", "首页", "文档翻译_拖入上传"]),
            b.addFiles(u),
            !1;
        return !0
    }
    function i(t) {
        var e = window.URL || window.webkitURL
          , n = e.createObjectURL(t);
        C.css("background-image", "url('" + n + "')"),
        C.data("file", t);
        var r = new Image;
        r.onload = function() {
            var t = this.src;
            setTimeout(function() {
                e.revokeObjectURL(t)
            }, 1e3)
        }
        ,
        r.src = n
    }
    function o(t) {
        return L.compress(t, {
            maxWidth: 1280,
            maxHeight: 1280,
            convertSize: 3e6
        }).catch(function() {
            return g(!1),
            Promise.reject()
        })
    }
    function s(t, e, n) {
        return new Promise(function(r, a) {
            var i = new FormData;
            i.append("image", t),
            i.append("from", e),
            i.append("to", n);
            var o = new XMLHttpRequest;
            o.addEventListener("load", function(t) {
                if (200 !== t.target.status)
                    _hmt.push(["_trackEvent", "首页", "57_首页页面_浏览器弹窗提示_网络问题 请稍候重试"]),
                    a("网络问题，请稍后重试");
                else {
                    var e = JSON.parse(t.target.responseText);
                    r(e)
                }
            }, !1),
            o.addEventListener("error", function() {
                _hmt.push(["_trackEvent", "首页", "57_首页页面_浏览器弹窗提示_网络问题 请稍候重试"]),
                a("网络问题，请稍后重试")
            }, !1),
            o.open("POST", "/getocr"),
            o.send(i)
        }
        ).catch(function(t) {
            return alert(t),
            g(!1),
            Promise.reject()
        })
    }
    function u(t) {
        return new Promise(function(e, n) {
            if (t.size > O)
                return _hmt.push(["_trackEvent", "首页", "57_首页页面_浏览器弹窗提示_图片大小超过10M"]),
                void n("您上传的图片已超过" + F + "M，请重新上传");
            var r = !1;
            if (null == t.name) {
                var a = t.type.split("/")[1];
                B.includes(a) && (r = !0)
            } else {
                var i = t.name.lastIndexOf(".");
                if (-1 !== i) {
                    var o = t.name.substring(i + 1).toLowerCase();
                    B.includes(o) && (r = !0)
                }
            }
            if (!r)
                return _hmt.push(["_trackEvent", "首页", "57_首页页面_浏览器弹窗提示_上传文件暂不支持图片翻译"]),
                void n("上传文件暂不支持图片翻译，请上传bmp、jpg、jpeg或png格式的图片");
            var s = new Image
              , u = window.URL || window.webkitURL;
            s.onload = function() {
                var r = this.src;
                setTimeout(function() {
                    u.revokeObjectURL(r)
                }, 1e3);
                var a = this.width
                  , i = this.height;
                return t.width = a,
                t.height = i,
                l(a) && l(i) ? void e(!0) : (_hmt.push(["_trackEvent", "首页", "57_首页页面_浏览器弹窗提示_上传的图片不符合要求"]),
                void n("您上传的图片不符合要求，短边至少15px，长边最长4096px"))
            }
            ,
            s.onerror = function() {
                n("图片文件损坏，无法解析")
            }
            ,
            s.src = u.createObjectURL(t)
        }
        ).catch(function(t) {
            return alert(t),
            g(!1),
            !1
        })
    }
    function c() {
        var t = !1;
        return U ? t = !0 : Date.now() - T < H ? t = !0 : T = Date.now(),
        t && (_hmt.push(["_trackEvent", "首页", "57_首页页面_浏览器弹窗提示_您的操作过于频繁 请稍候再试"]),
        alert("上传图片过于频繁，请稍后再试")),
        t
    }
    function l(t) {
        return t >= 15 && 4096 >= t
    }
    function d(t) {
        return D.includes(t) || "auto" === t ? !0 : (alert("当前语言不支持图片识别，请选择语言"),
        y.fromBtnClicked(),
        !1)
    }
    function p(e, n) {
        if (j.removeClass("with-loading-ocr-tip"),
        0 !== e.errno || 0 === e.errno && 0 === e.data.src.length) {
            t("translation:widget/translate/input/clear").show(),
            w.set("shouldClearPromptOnInput", !0);
            var r = t("translation:widget/translate/input/prompt");
            "auto" === n ? (r.showCustomPrompt("未识别出图片文字，请  ", "选择语言重试", "open-from-lang"),
            _hmt.push(["_trackEvent", "首页", "55_首页页面_输入框内提示_图片识别失败，请选择语言"])) : (r.showCustomPrompt("图片识别失败，请重试"),
            _hmt.push(["_trackEvent", "首页", "55_首页页面_输入框内提示_图片识别失败，请重试"]))
        } else {
            var a = e.data.src.join("")
              , i = e.data.from
              , o = v.getElem();
            o.val(a),
            w.set("isProcessOcrResult", !0);
            var s = t("translation:widget/translate/input/events");
            s.textareaInput({
                type: "input",
                triggerByOcr: !0
            });
            var u = t("translation:widget/translate/translang/manualTrans");
            u.updateManualTransBtn();
            var c = t("translation:widget/translate/input/translate");
            _hmt.push(["_trackEvent", "首页", "58_首页页面_对应语言上传图片的次数_" + i]),
            c.translateAfterOcr(i, a)
        }
    }
    function m() {
        C.css("background-image", "none"),
        j.removeClass("with-image"),
        C.data("file", null)
    }
    function f() {
        return $(".trans-input-wrap").hasClass("with-image") && $("#image-holder").data("file") && !$("#baidu_translate_input").val() ? (h($("#image-holder").data("file"), !0),
        !1) : !0
    }
    function g(t) {
        j.toggleClass("with-loading-ocr-tip", t),
        $("body").toggleClass("no-interaction", t),
        U = t
    }
    function _(t) {
        for (var e = [], n = 0; n < t.length; n++)
            e.push({
                kind: t[n].kind,
                type: t[n].type
            });
        return 4 === e.length && -1 !== e.findIndex(function(t) {
            var e = t.kind
              , n = t.type;
            return "string" === e && "text/plain" === n
        }) && -1 !== e.findIndex(function(t) {
            var e = t.kind
              , n = t.type;
            return "string" === e && "text/html" === n
        }) && -1 !== e.findIndex(function(t) {
            var e = t.kind
              , n = t.type;
            return "string" === e && "text/rtf" === n
        }) && -1 !== e.findIndex(function(t) {
            var e = t.kind
              , n = t.type;
            return "file" === e && "image/png" === n
        })
    }
    var h = function() {
        var e = r(regeneratorRuntime.mark(function n(e, r) {
            var a, c, l, m, f;
            return regeneratorRuntime.wrap(function(n) {
                for (; ; )
                    switch (n.prev = n.next) {
                    case 0:
                        if (g(!0),
                        "" === $("#baidu_translate_input").val() && r || (a = t("translation:widget/translate/input/events"),
                        a.onClearBtnClick()),
                        c = $(".select-from-language .language-selected").attr("data-lang"),
                        l = $(".select-to-language .language-selected").attr("data-lang"),
                        d(c)) {
                            n.next = 7;
                            break
                        }
                        return g(!1),
                        n.abrupt("return");
                    case 7:
                        if (r) {
                            n.next = 16;
                            break
                        }
                        return n.next = 10,
                        u(e);
                    case 10:
                        if (m = n.sent) {
                            n.next = 13;
                            break
                        }
                        return n.abrupt("return");
                    case 13:
                        return n.next = 15,
                        o(e);
                    case 15:
                        e = n.sent;
                    case 16:
                        return n.next = 18,
                        s(e, c, l);
                    case 18:
                        f = n.sent,
                        r || (i(e),
                        j.addClass("with-image")),
                        p(f, c),
                        g(!1);
                    case 22:
                    case "end":
                        return n.stop()
                    }
            }, n, this)
        }));
        return function() {
            return e.apply(this, arguments)
        }
    }()
      , v = t("translation:widget/translate/input/textarea")
      , w = t("translation:widget/common/environment")
      , k = t("translation:widget/common/third_party/image-compressor")
      , x = t("translation:widget/common/third_party/bowser")
      , b = t("translation:widget/translate/input/uploader")
      , E = t("translation:widget/translate/docTranslate/docTransUtil")
      , y = t("translation:widget/translate/translang/langPanelContainer.jsx")
      , L = new k
      , j = $(".trans-input-wrap")
      , C = $("#image-holder")
      , R = !1
      , I = !1
      , T = 0
      , U = !1
      , F = window.common.docLangHit ? 30 : 10
      , O = 1048576 * F
      , P = 3
      , H = 1e3 * P
      , D = w.get("ocrLangList")
      , B = ["png", "jpg", "bmp", "jpeg"];
    !function() {
        if ("1" === window.common.ocrHit) {
            var t = window.URL || window.webkitURL;
            t && "function" == typeof t.createObjectURL && !x.msie && !x.ucbrowser && window.FormData && "undefined" != typeof window.FileReader && ("draggable"in document.createElement("span") && (I = !0),
            x.check({
                firefox: "41",
                chrome: "13",
                opera: "12.1"
            }, !0) && (R = !0))
        }
    }();
    var S = j.find(".textarea-bg .prompt-text");
    window.common.docHit ? R ? (S.text("输入文字、网址 / 粘贴图片 / 拖入文档"),
    _hmt.push(["_trackEvent", "首页", "54_首页页面_输入框默认文案_输入文字、网址 / 粘贴图片 / 拖入文档"])) : I ? (S.text("输入文字、网址 / 拖入图片、文档"),
    _hmt.push(["_trackEvent", "首页", "54_首页页面_输入框默认文案_输入文字、网址 / 拖入图片、文档"])) : (S.text("输入文字、网址"),
    _hmt.push(["_trackEvent", "首页", "54_首页页面_输入框默认文案_输入文字、网址"])) : R ? (S.text("输入文字、网址或粘贴图片 即可翻译"),
    _hmt.push(["_trackEvent", "首页", "54_首页页面_输入框默认文案_输入文字、网址或粘贴图片 即可翻译"])) : I ? (S.text("输入文字、网址或拖拽图片 即可翻译"),
    _hmt.push(["_trackEvent", "首页", "54_首页页面_输入框默认文案_输入文字、网址或拖拽图片 即可翻译"])) : (S.text("输入文字或网址 即可翻译"),
    _hmt.push(["_trackEvent", "首页", "54_首页页面_输入框默认文案_输入文字、网址 即可翻译"])),
    n.exports = {
        handle: a,
        pasteCompatibility: R,
        dragCompatibility: I,
        clearInputImage: m,
        checkAndTranslateThumbnail: f,
        processImgFile: h
    }
});
;define("translation:widget/translate/translang/transbtn", function(n, t) {
    "use strict";
    var a = n("translation:widget/translate/input/translate")
      , r = {
        transBtnClicked: function() {
            var t = n("translation:widget/translate/input/dataTransfer");
            t.checkAndTranslateThumbnail() && this.doTrans()
        },
        doTrans: function() {
            a.onTranslate({
                transtype: "translang"
            })
        }
    };
    t.transBtnClicked = function() {
        r.transBtnClicked()
    }
    ,
    t.doTrans = function() {
        r.doTrans()
    }
});
;define("translation:widget/translate/input/dir", function(t, r) {
    "use strict";
    var a = t("translation:widget/common/environment");
    r.changeDir = function(t) {
        t && ($.inArray(t, a.get("rtl")) >= 0 ? ($(".input-wrap").attr("dir", "rtl"),
        $(".textarea-clear-btn").css({
            "float": "left",
            margin: "0 10px 0 0"
        })) : ($(".input-wrap").attr("dir", "ltr"),
        $(".textarea-clear-btn").css({
            "float": "right",
            margin: "0 0 0 10px"
        })))
    }
});
;define("translation:widget/translate/translang/fromlang", function(a, t) {
    "use strict";
    var e = a("translation:widget/common/environment")
      , n = a("translation:widget/translate/translang/transbtn")
      , r = a("translation:widget/translate/input/dir")
      , l = a("translation:widget/translate/translang/tolang")
      , s = a("translation:widget/translate/translang/manualTrans")
      , o = a("translation:widget/common/config/langMap")
      , g = a("translation:widget/translate/translang/langPanelContainer.jsx")
      , i = {
        hideFromWrap: function() {
            g.hideFromWrap()
        },
        fromlangChange: function(a) {
            var t = a.lang
              , e = this;
            e.fromlangItemSelect({
                value: t,
                trans: a.trans,
                isDetected: a.isDetected
            })
        },
        fromlangItemSelect: function(t) {
            var e = t.value
              , i = o[e].zhName;
            t.isDetected && (i = "检测到<span>" + i + "</span>"),
            $(".select-from-language .language-selected").attr({
                "data-lang": e,
                "data-detected": t.isDetected ? "1" : "0"
            }).attr("data-lang", e).html(i),
            "auto" === e ? this.autoItemSelected({
                isDetected: t.isDetected
            }) : this.normalItemSelected({
                isDetected: t.isDetected
            }),
            r.changeDir(e),
            g.changeFrom(e),
            this.hideFromWrap();
            var d = $(".select-to-language .language-selected").attr("data-lang");
            if (e === d) {
                var c = "en" === e ? "zh" : "en";
                l.tolangChange({
                    lang: c
                })
            }
            if (t.trans) {
                var m = a("translation:widget/translate/input/dataTransfer");
                m.checkAndTranslateThumbnail() && n.doTrans()
            }
            s.updateManualTransBtn(),
            $("body").trigger("updateFromTo.domainTrans")
        },
        autoItemSelected: function(a) {
            a.isDetected || e.set("fromLangIsAuto", !0),
            $(".from-to-exchange .exchange-mask").css({
                "background-position": "-2px 50%"
            });
            var t = $(".from-to-exchange");
            t.hasClass("language-btn") && t.removeClass("language-btn").addClass("language-btn-disable"),
            t.attr("aflag", 0)
        },
        normalItemSelected: function(a) {
            a.isDetected || e.set("fromLangIsAuto", !1);
            var t = $(".from-to-exchange");
            t.hasClass("language-btn-disable") && t.removeClass("language-btn-disable").addClass("language-btn")
        }
    };
    t.fromBtnClicked = function() {
        i.fromBtnClicked()
    }
    ,
    t.hideFromWrap = function() {
        i.hideFromWrap()
    }
    ,
    t.fromlangChange = function(a) {
        i.fromlangChange(a)
    }
    ,
    t.fromlangItemSelect = function(a) {
        i.fromlangItemSelect(a)
    }
});
;define("translation:widget/translate/input/prompt", function(t, n) {
    "use strict";
    var r = t("translation:widget/common/environment")
      , o = t("translation:widget/translate/translang/fromlang")
      , a = t("translation:widget/common/third_party/template")
      , e = t("translation:widget/translate/history/history")
      , p = t("translation:widget/translate/details/adLink/adLink")
      , s = t("translation:widget/common/config/langMap")
      , i = {
        hidePrompt: function() {
            $(".trans-prompt").hide()
        },
        showPrompt: function(t, n) {
            var a = s.hasOwnProperty(t)
              , e = "1" === $(".select-from-language .language-selected").attr("data-detected");
            return r.get("fromLangIsAuto") && a ? (o.fromlangChange({
                lang: t,
                isDetected: !0
            }),
            void this.hidePrompt()) : void ($(".trans-correct").is(":hidden") && ("LAN-UNKNOWN" !== t || "auto" !== n && !e ? n === t || !a || "wyw" === n && "zh" === t ? this.hidePrompt() : this.renderPrompt(t, !1) : this.renderUndetectedPrompt()))
        },
        renderUndetectedPrompt: function() {
            $(".trans-prompt .prompt-wrap").html('<span class="prompt-text prompt-text-left-align">检测失败，请手动选择语言</span>').parent().show(),
            $(".operate-btn.op-sound").hide(),
            $(".operate-btn.op-favo").hide()
        },
        renderPrompt: function(t, n) {
            var r = s[t].zhName
              , o = a("tplLangPrompt", {
                lang: t,
                langText: r,
                isOcr: n
            });
            $(".trans-prompt .prompt-wrap").html(o).parent().show(),
            this.sendShowPromptLog()
        },
        onPrompt: function(t) {
            o.fromlangChange({
                lang: t,
                trans: !0
            }),
            this.hidePrompt()
        },
        sendShowPromptLog: function() {
            _hmt.push(["_trackEvent", "首页", "web端语种检测提示出现次数"])
        },
        showCustomPrompt: function(t, n, r) {
            var o = '<span dir="ltr">';
            o += '<span class="prompt-text" style="margin-left: -42px;">' + t + "</span>",
            n && (o += '<a href="javascript:" class="prompt-link' + (r ? " " + r : "") + '">' + n + "</a>"),
            o += "</span>",
            $(".trans-prompt .prompt-wrap").html(o).parent().show(),
            e.onHistoryInput(),
            p.onAdLinkInput()
        }
    };
    n.hide = function() {
        i.hidePrompt()
    }
    ,
    n.show = function() {
        i.showPrompt.apply(i, arguments)
    }
    ,
    n.onPrompt = function(t) {
        i.onPrompt(t)
    }
    ,
    n.renderPrompt = function() {
        i.renderPrompt.apply(i, arguments)
    }
    ,
    n.showCustomPrompt = function() {
        i.showCustomPrompt.apply(i, arguments)
    }
});
;define("translation:widget/translate/translang/exchange", function(a, n) {
    "use strict";
    var t, e = a("translation:widget/common/environment"), g = a("translation:widget/translate/translang/fromlang"), l = a("translation:widget/translate/translang/tolang"), s = {
        clickExchangeBtn: function() {
            var a = $(".from-to-exchange");
            if (!a.hasClass("language-btn-disable")) {
                var n = $.trim($("#baidu_translate_input").val()).replace(/<br( \/)?>/gi, "&lt;br$1&gt;");
                n && e.set("langChangedByUser", !0),
                this.animateExchange(),
                this.animateFromToBtn()
            }
        },
        animateExchange: function() {
            function a(a, e, l, s) {
                t && (clearTimeout(t),
                t = null);
                var c = Math.abs(a - e) / l
                  , i = s / l
                  , o = function(n) {
                    g.css(a > e ? {
                        "background-position": a - c * (n - 1) + "px"
                    } : {
                        "background-position": a + c * (n - 1) + "px"
                    })
                };
                n(l, i, o)
            }
            function n(a, e, g) {
                a > 0 && (t = setTimeout(function() {
                    g(a),
                    n(a - 1, e, g)
                }, e))
            }
            var e = $(".from-to-exchange")
              , g = e.find(".exchange-mask");
            1 === parseInt(e.attr("aflag"), 10) ? (a(-2, -202, 8, 200),
            e.attr("aflag", 0)) : (a(-202, -2, 8, 200),
            e.attr("aflag", 1))
        },
        animateFromToBtn: function() {
            var a = this;
            $(".select-from-language .select-inner").animate({
                left: "241px"
            }, 400),
            $(".select-to-language .select-inner").animate({
                left: "-241px"
            }, 400, function() {
                a.execExchange()
            })
        },
        execExchange: function(a) {
            var n = $(".select-from-language .language-selected")
              , t = $.trim(n.text())
              , e = n.attr("data-lang")
              , s = $(".select-to-language .language-selected")
              , c = $.trim(s.text())
              , i = s.attr("data-lang");
            $(".select-inner").stop(!0, !0),
            n.has("span").length > 0 && (t = n.find("span").text()),
            n.text(c).attr({
                "data-lang": i,
                "data-detected": "0"
            }),
            s.text(t).attr("data-lang", e),
            $(".select-inner").css({
                left: 0
            }),
            g.fromlangChange({
                lang: i
            }),
            l.tolangChange({
                lang: e,
                trans: !a
            })
        },
        judgeExchangeShow: function() {
            "auto" === $(".select-from-language .language-selected").attr("data-lang") ? this.disableExchangeBtn() : this.enableExchangeBtn()
        },
        enableExchangeBtn: function() {
            var a = $(".from-to-exchange");
            a.hasClass("language-btn-disable") && a.removeClass("language-btn-disable").addClass("language-btn")
        },
        disableExchangeBtn: function() {
            var a = $(".from-to-exchange");
            a.hasClass("language-btn") && a.removeClass("language-btn").addClass("language-btn-disable")
        }
    };
    n.clickExchangeBtn = function() {
        s.clickExchangeBtn()
    }
    ,
    n.execExchange = function(a) {
        s.execExchange(a)
    }
    ,
    n.judgeExchangeShow = function() {
        s.judgeExchangeShow()
    }
});
;define("translation:widget/translate/input/processlang", function(n, t, e) {
    "use strict";
    function a(n, t, e) {
        return g.set("detectLang", n),
        g.get("fromLangIsAuto") ? (t = n,
        e = $(".select-to-language .language-selected").attr("data-lang")) : n !== e || g.get("langChangedByUser") || ("zh" === e && $.inArray(t, c) >= 0 ? (o.execExchange(!0),
        e = t,
        t = n,
        $(".trans-prompt").hide()) : "zh" === t && $.inArray(e, c) >= 0 && (o.execExchange(!0),
        e = t,
        t = n,
        $(".trans-prompt").hide())),
        g.set("langChangedByUser", !1),
        {
            fromLang: t,
            toLang: e
        }
    }
    function r(n, t, e) {
        return l.includes(t) && l.includes(e) && n === e ? (o.execExchange(!0),
        e = t,
        t = n,
        $(".trans-prompt").hide()) : p.includes(t) && "en" === e || !i.hasOwnProperty(n) || s.renderPrompt(n, !0),
        {
            fromLang: t,
            toLang: e
        }
    }
    var g = n("translation:widget/common/environment")
      , o = n("translation:widget/translate/translang/exchange")
      , s = n("translation:widget/translate/input/prompt")
      , i = n("translation:widget/common/config/langMap")
      , c = ["ara", "de", "en", "spa", "it", "fra", "pt", "ru", "th", "kor"]
      , l = ["zh", "en", "jp", "kor"]
      , p = ["de", "spa", "it", "fra", "pt"];
    e.exports = {
        getLang: a,
        processOcrLang: r
    }
});
;define("translation:widget/translate/input/longtext", function(t, n) {
    "use strict";
    var i = t("translation:widget/common/config/trans")
      , p = {
        showTip: function(t) {
            var n, p = t.query, o = "百度翻译字数限制为" + i.MAX_QUERY_COUNT + '字, "', e = '"及其后面没有被翻译!';
            p.length > 3 && (p = p.substr(0, 3)),
            n = o + p + e;
            var r = '<div class="long-text-prompt-wrap"><p>' + n + "</p></div>";
            $(".long-text-prompt-wrap").length <= 0 && $(".output-wrap").prepend($(r))
        },
        hideTip: function() {
            $(".output-wrap > .long-text-prompt-wrap").remove()
        }
    };
    n.showTip = function(t) {
        p.showTip(t)
    }
    ,
    n.hideTip = function() {
        p.hideTip()
    }
});
;define("translation:widget/translate/input/translate", function(t, a) {
    "use strict";
    var e = t("translation:widget/translate/input/prompt")
      , n = t("translation:widget/translate/input/textarea")
      , r = t("translation:widget/common/util")
      , s = t("translation:widget/translate/output/output")
      , o = t("translation:widget/common/config/trans")
      , i = t("translation:widget/translate/input/processlang")
      , l = t("translation:widget/common/string")
      , u = t("translation:widget/translate/input/soundicon")
      , g = t("translation:widget/translate/input/hash")
      , d = t("translation:widget/common/environment")
      , c = t("translation:widget/translate/input/longtext")
      , p = t("translation:widget/translate/details/dictionary/simplemeans")
      , m = t("translation:widget/translate/history/history")
      , f = t("translation:widget/translate/input/pGrab")
      , h = t("translation:widget/translate/details/adLink/adLink")
      , y = t("translation:widget/translate/domain/domain")
      , w = {
        onTrans: function(t) {
            p.translateStopRepeat() || p.shutdownAudio();
            var a = (n.getElem(),
            n.getVal())
              , e = this
              , s = t && t.transtype;
            if (r.isUrl(a))
                return void this.translateWebPage(a);
            if (this.isQueryValid(a)) {
                var o = a;
                o.length > 50 && (o = l.cutByByte(o, 0, 150).replace(/[\uD800-\uDBFF]$/, ""));
                var i = {
                    query: o
                };
                $.ajax({
                    url: "/langdetect",
                    type: "POST",
                    data: i,
                    success: function(t) {
                        0 === t.error && t.lan ? e.langIsDeteced(t.lan, a, s) : e.reponseQuery(a)
                    }
                })
            }
        },
        isQueryValid: function(t) {
            return t ? !0 : !1
        },
        processQuery: function(t) {
            var a = t;
            if (t.length > o.MAX_QUERY_COUNT) {
                d.set("needLongtextTip", !0);
                var e = t;
                a = t.substr(0, 5e3),
                e = t.substr(0, 3),
                c.showTip({
                    query: e
                })
            }
            return a
        },
        langIsDeteced: function(a, n, r, s) {
            if (null !== a) {
                var o = $(".select-from-language .language-selected").attr("data-lang")
                  , l = $(".select-to-language .language-selected").attr("data-lang")
                  , g = "1" === $(".select-from-language .language-selected").attr("data-detected")
                  , c = !1;
                d.get("langChangedByUser") && a === l && (c = !0);
                var p = null;
                if (s && !d.get("fromLangIsAuto") && o !== a ? p = i.processOcrLang(a, o, l) : (e.show(a, o),
                p = i.getLang(a, o, l)),
                "LAN-UNKNOWN" === a && ("auto" === o || g)) {
                    var m = t("translation:widget/translate/input/clear");
                    return void m.clearOutput()
                }
                u.show(),
                $("body").trigger("updateFromTo.domainTrans", p);
                var h = this
                  , n = this.processQuery(n)
                  , w = {
                    from: p.fromLang,
                    to: p.toLang,
                    query: n,
                    transtype: r,
                    simple_means_flag: 3,
                    sign: f(n),
                    token: window.common.token,
                    domain: y.getCurDomain()
                };
                y.log(),
                this.translateXHR && 4 !== this.translateXHR.readyState && this.translateXHR.abort(),
                this.translateXHR = $.ajax({
                    type: "POST",
                    url: "/v2transapi?from=" + encodeURIComponent(p.fromLang) + "&to=" + encodeURIComponent(p.toLang),
                    cache: !1,
                    data: w
                }).done(function(t) {
                    d.set("isInRtTransState", !0),
                    h.translateSuccess(t, p.fromLang, p.toLang, n, c)
                })
            }
        },
        translateWebPage: function(t) {
            var a = "/";
            "https:" === location.protocol && (a = "http://fanyi.baidu.com/"),
            document.location.href = [a + "transpage?", "query=" + encodeURIComponent(t), "&source=url", "&ie=utf8", "&from=" + $(".select-from-language .language-selected").attr("data-lang"), "&to=" + $(".select-to-language .language-selected").attr("data-lang"), "&render=1"].join("")
        },
        textareaFocus: function() {
            n.focus()
        },
        translateSuccess: function(t, a, e, r, o) {
            return n.getVal() ? (r && m.add(a, e, $.trim(r)),
            m.hideHistory(),
            h.hide(),
            s.checkResponse({
                res: t,
                from: a,
                to: e,
                query: r,
                badCaseByForce: o
            }),
            void g.setHash({
                query: r
            })) : void d.set("isInRtTransState", !1)
        },
        reponseQuery: function() {}
    };
    a.onTranslate = function(t) {
        w.onTrans(t)
    }
    ,
    a.translateAfterOcr = function(t, a) {
        _hmt.push(["_trackEvent", "首页", "59_首页页面_翻译query量_图片"]),
        w.langIsDeteced(t, a, void 0, !0)
    }
});
;define("translation:widget/translate/domain/domain", function(a, n, t) {
    "use strict";
    function o(a, n, t) {
        return n in a ? Object.defineProperty(a, n, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : a[n] = t,
        a
    }
    function e() {
        N.find(".domain-trans-toast-text").text("已切换到" + L[M] + (M === h.COMMON ? "" : "领域")),
        $("body").append(N),
        null != O && clearTimeout(O),
        O = setTimeout(function() {
            return i()
        }, 2e3)
    }
    function i() {
        N.remove().find(".domain-trans-toast-text").text(""),
        null != O && (clearTimeout(O),
        O = null)
    }
    function r() {
        window._hmt.push(["_trackEvent", "首页", "99_首页页面_" + L[M] + "领域发起翻译次数"])
    }
    function d() {
        return M
    }
    function s(a) {
        var n = a.domain
          , t = a.fromLang
          , o = a.toLang;
        switch (n) {
        case h.COMMON:
            return !1;
        case h.FINANCE:
        case h.BM:
            var e = "auto" !== t && "zh" !== t && "en" !== t
              , i = "zh" !== o && "en" !== o;
            return e || i;
        case h.NOVEL:
        case h.ET:
        case h.WCM:
            var r = void 0
              , d = void 0;
            return "auto" === t ? (r = !1,
            d = "en" !== o && "zh" !== o) : "zh" === t ? (r = !1,
            d = "en" !== o) : (r = !0,
            d = !0),
            r || d;
        case h.MILITARY:
            return ["en", "ru", "jp", "kor", "hi", "fra", "de", "spa", "vie"].includes(t) && "zh" === o ? !1 : !0
        }
    }
    function m() {
        C.find("[data-domain-value]").removeClass("active").end().find('[data-domain-value="' + M + '"]').addClass("active"),
        T.find(".domain-trans-bottom .active").length > 0 && T.find(".domain-trans-bottom").append(T.find(".domain-trans-top .domain-trans-item-wrapper").eq(1)).end().find(".domain-trans-top").append(T.find(".domain-trans-bottom .active").parent()),
        w.find(".domain-trans-bottom .active").length > 0 && w.find(".domain-trans-bottom").append(w.find(".domain-trans-top .domain-trans-item-wrapper").eq(0)).end().find(".domain-trans-top").append(w.find(".domain-trans-bottom .active").parent()),
        T.toggleClass("domain-trans-hot", T.find(".domain-trans-top .domain-trans-bm").length > 0),
        w.toggleClass("domain-trans-hot", w.find(".domain-trans-top .domain-trans-bm").length > 0),
        $(".output-wrap").attr("data-domain-value", M),
        e()
    }
    function l(a) {
        var n = a.fromLang
          , t = a.toLang;
        Object.values(h).forEach(function(a) {
            var o = s({
                domain: a,
                fromLang: n,
                toLang: t
            });
            C.find('[data-domain-value="' + a + '"]').toggleClass("disable", o)
        })
    }
    function c() {
        $("body").on("updateFromTo.domainTrans", function(a, n) {
            var t = void 0
              , o = void 0;
            if (null == n ? (t = $(".select-from-language .language-selected").attr("data-lang"),
            o = $(".select-to-language .language-selected").attr("data-lang")) : (t = n.fromLang,
            o = n.toLang),
            s({
                domain: M,
                fromLang: t,
                toLang: o
            })) {
                M = h.COMMON;
                var e = C.find(".domain-trans-common")
                  , i = C.find(".domain-trans-common .domain-trans-item-tip span");
                e.addClass("reset"),
                i.text(s({
                    domain: h.BM,
                    fromLang: t,
                    toLang: o
                }) ? "当前语种仅支持通用领域" : "当前语种仅支持通用领域、生物医药领域、金融领域"),
                setTimeout(function() {
                    e.removeClass("reset")
                }, 3e3),
                m()
            }
            l({
                fromLang: t,
                toLang: o
            })
        }).on("click", ".domain-trans-item", function() {
            var a = $(this)
              , n = String(a.data("domainValue"));
            M === n || a.hasClass("disable") || (M = n,
            m(),
            v.onTranslate({
                transtype: "translang"
            }))
        }).on("click", ".domain-trans-tip-close", function() {
            C.find(".domain-trans-tip").hide()
        }).on("click", ".domain-trans-toast-close", function() {
            return i()
        })
    }
    function u() {
        "16122020" !== window.common.sid && $(".domain-trans-military").parent(".domain-trans-item-wrapper").remove(),
        c();
        var a = $(".select-from-language .language-selected").attr("data-lang")
          , n = $(".select-to-language .language-selected").attr("data-lang");
        l({
            fromLang: a,
            toLang: n
        }),
        setTimeout(function() {
            try {
                var a = localStorage.getItem("DOMAIN_TRANS_TIP_FLAG");
                if ("yes" === a)
                    return;
                localStorage.setItem("DOMAIN_TRANS_TIP_FLAG", "yes"),
                C.find(".domain-trans-tip").show(),
                setTimeout(function() {
                    C.find(".domain-trans-tip").hide()
                }, 5e3)
            } catch (n) {
                C.find(".domain-trans-tip").show(),
                setTimeout(function() {
                    C.find(".domain-trans-tip").hide()
                }, 5e3)
            }
        }, 16)
    }
    function f() {
        C.show(),
        $(".output-wrap").attr("data-domain-value", M)
    }
    function g() {
        C.hide(),
        $(".output-wrap").attr("data-domain-value", "")
    }
    var p, v = a("translation:widget/translate/input/translate"), h = {
        COMMON: "common",
        BM: "medicine",
        ET: "electronics",
        WCM: "mechanics",
        NOVEL: "novel",
        FINANCE: "finance",
        MILITARY: "military"
    }, L = (p = {},
    o(p, h.COMMON, "通用领域"),
    o(p, h.BM, "生物医药"),
    o(p, h.ET, "电子科技"),
    o(p, h.WCM, "水利机械"),
    o(p, h.NOVEL, "网络文学"),
    o(p, h.FINANCE, "金融"),
    o(p, h.MILITARY, "军事"),
    p), M = h.COMMON, C = $(".domain-trans-wrapper"), T = $(".domain-trans-large"), w = $(".domain-trans-small"), N = $(['<div class="domain-trans-toast">', '<div class="domain-trans-toast-text"></div>', '<div class="domain-trans-toast-close"></div>', "</div>"].join("")), O = null;
    t.exports = {
        getCurDomain: d,
        log: r,
        show: f,
        hide: g
    },
    $(function() {
        u()
    })
});
;define("translation:widget/translate/details/keywords/keywords", function(t, e) {
    "use strict";
    function n(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    var i = t("translation:widget/translate/favo/favo")
      , o = n(i)
      , a = t("translation:widget/translate/input/pGrab")
      , r = n(a)
      , d = t("translation:widget/translate/domain/domain")
      , s = n(d)
      , l = t("translation:widget/translate/details/details")
      , c = n(l)
      , u = t("translation:widget/common/third_party/template")
      , h = t("translation:widget/common/environment")
      , f = $("#left-result-container")
      , m = {
        build: function(t) {
            var e = 1 === parseInt(h.get("firstModuleId"), 10)
              , n = t.data.splice(0, 10)
              , i = t.from
              , a = t.to
              , r = !1
              , d = {};
            "zh" === i && "en" === a ? (r = !0,
            _hmt.push(["_trackEvent", "首页", "Web中英方向重点词汇卡片展现次数"]),
            d.direction = "zh2en") : (_hmt.push(["_trackEvent", "首页", "Web英中方向重点词汇卡片展现次数"]),
            d.direction = "en2zh"),
            $.each(n, function(t, e) {
                e.href = "/#" + i + "/" + a + "/" + encodeURIComponent(e.word)
            }),
            d.dataArray = n,
            d.meanNeedHighlight = r,
            d.isFirstCard = e;
            var s = u("tpl-keywords", d);
            f.append(s),
            n.forEach(function(t, e) {
                var n = t.word
                  , r = t.means
                  , d = new o.default({
                    pos: "keyword",
                    target: $(".keywords-container .keywords-content[data-key-word-idx='" + e + "'] .op-favo")[0]
                });
                d.init({
                    query: n,
                    from: i,
                    to: a,
                    fanyiDst: r.join("; ")
                })
            })
        },
        init: function() {
            this.bindEvent()
        },
        bindEvent: function() {
            var t = this;
            $(".translate-wrap").on("click", ".keywords-word", function() {
                var t = $(this)
                  , e = t.attr("data-direction")
                  , n = t.text();
                _hmt.push("zh2en" === e ? ["_trackEvent", "首页", "Web中英方向重点词汇二次翻译次数"] : ["_trackEvent", "首页", "Web英中方向重点词汇二次翻译次数"]);
                var i = e.split("2")[0]
                  , o = e.split("2")[1]
                  , a = {
                    from: i,
                    to: o,
                    query: n,
                    transtype: "enter",
                    simple_means_flag: 3,
                    sign: r.default(n),
                    token: window.common.token,
                    domain: s.default.getCurDomain()
                };
                $.ajax({
                    type: "POST",
                    url: "/v2transapi?from=" + encodeURIComponent(i) + "&to=" + encodeURIComponent(o),
                    cache: !1,
                    data: a
                }).done(function(e) {
                    $(".keywords-word").removeClass("selected"),
                    t.addClass("selected"),
                    f.children(":not(.keywords-outter, .keywords-outter-notfirst)").remove(),
                    c.default.init(e, i, o, n, !1, !0)
                })
            }).on("dblclick.keywords", ".keywords-inner .highlight", function() {
                t.getHighlightQueryAndSave($(this))
            }).on("mouseover.keywords", ".keywords-inner .highlight", function() {
                _hmt.push(["_trackEvent", "首页", "Web重点词汇卡片highlight次数"])
            })
        },
        getHighlightQueryAndSave: function(t) {
            var e = t.text()
              , n = "keywords";
            h.set("dbClickHighlightZone", {
                query: $.trim(e),
                area: n
            })
        }
    };
    $(function() {
        m.init()
    }),
    e.build = function(t) {
        m.build(t)
    }
});
;define("translation:widget/translate/details/sample/sample", function(e, t) {
    "use strict";
    var a, n, l, i, s = e("translation:widget/common/third_party/template"), o = e("translation:widget/translate/details/dictionary/simplemeans"), r = e("translation:widget/common/soundURIGenerator"), u = e("translation:widget/common/environment"), g = $("#left-result-container"), d = ["《柯林斯高阶英汉双解学习词典》", "《汉英大词典》", "百度翻译例句库", "《牛津高阶英汉双解词典》", "《外研社英语同义词辨析词典》", "中考真题", "高考真题", "四级真题", "六级真题"], p = new RegExp(d.join("|")), c = void 0, m = {
        buildSample: function(e) {
            var t = e.data;
            a = e.from,
            n = e.to,
            i = e.query,
            c = e.badCaseByForce;
            var o = {};
            if (o.tplData = {},
            o.tplData.to_lang = n,
            t["double"] = t["double"].replace(/\\'/g, "'"),
            t.single = t.single.replace(/\\'/g, "'"),
            t["double"] = t["double"].replace(/[‘|’]/g, "'"),
            t.single = t.single.replace(/[‘|’]/g, "'"),
            t["double"]) {
                var r = this.getDoubleSample(t["double"], c);
                o.tplData["double"] = r["double"],
                o.tplData.badCaseByForce = c,
                o.tplData.senData = r.senData,
                l = o
            }
            if (t.single) {
                t.single = $.parseJSON(t.single),
                t.senData2 = [];
                for (var u = 0, d = t.single.length; d > u; u++) {
                    var p, m = "";
                    "zh" === n ? p = t.single[u][0] : "en" === n && (p = t.single[u][1]);
                    for (var h = 0, v = p.length; v > h; h++)
                        m += p[h][0],
                        p[h][3] && (m += p[h][3]);
                    m = encodeURIComponent(m),
                    t.senData2[u] = m;
                    var f = t.single[u][1];
                    if (/^http\:\/\//.test(f)) {
                        f = f.replace(/^http\:\/\//, "");
                        var b = f.indexOf("/");
                        t.single[u][2] = b > 0 ? f.substr(0, b) : f
                    } else
                        t.single[u][2] = t.single[u][1],
                        t.single[u][1] = "#"
                }
                o.tplData.single = t.single,
                o.tplData.senData2 = t.senData2
            }
            if (t.tag && t.tag instanceof Array) {
                var S = t.tag.length;
                S && S > 1 && (o.tplData.tag = t.tag,
                _hmt.push(["_trackEvent", "首页", "web端双语例句子TAB出现"]))
            }
            var D = s("tplSample", o);
            g.append(D)
        },
        getDoubleSample: function(e, t) {
            var a = {};
            a["double"] = $.parseJSON(e),
            a.senData = [];
            for (var l = !0, i = 0, s = a["double"].length; s > i; i++) {
                var o, r = "";
                !t && "zh" === n || t && "en" === n ? o = a["double"][i][0] : (!t && "en" === n || t && "zh" === n) && (o = a["double"][i][1]);
                for (var u = 0, g = o.length; g > u; u++)
                    r += o[u][0],
                    o[u][4] && (r += o[u][4]);
                r = encodeURIComponent(r),
                a.senData[i] = r,
                l && !p.test(a["double"][i][2]) && (a["double"][i].isFirstNetSt = !0,
                l = !1);
                var d = a["double"][i][2];
                if (/^https?\:\/\//.test(d)) {
                    d = d.replace(/^https?\:\/\//, "");
                    var c = d.indexOf("/");
                    a["double"][i][3] = c > 0 ? d.substr(0, c) : d
                } else
                    a["double"][i][3] = a["double"][i][2],
                    a["double"][i][2] = "#"
            }
            return a
        },
        bindEvents: function() {
            var e = this;
            $(".translate-wrap").on("click", ".item-sample .op-sound", function() {
                e.clickSound({
                    target: this
                })
            }).on("mouseenter", ".item-sample .op-sound", function() {
                e.mouseOverSound({
                    target: this
                })
            }).on("mouseleave", ".item-sample .op-sound", function() {
                e.mouseOutSound()
            }).on("mouseover", ".sample-wrap span[high-light-id]", function() {
                e.mouseOverHighlight({
                    target: this
                })
            }).on("mouseout", ".sample-wrap span[high-light-id]", function() {
                e.mouseOutHighlight({
                    target: this
                })
            }).on("click", ".sample-tagitem", function() {
                e.clickTagItem({
                    target: this
                })
            }).on("dblclick.sample", ".sample-wrap .sample-source, .sample-wrap .sample-target", function() {
                e.getHighlightQueryAndSave($(this))
            })
        },
        clickSound: function(e) {
            o.judgeStopRepeat(),
            this.timer && clearTimeout(this.timer);
            var t = $(e.target)
              , a = r.generateURI({
                lan: t.attr("data-sound-lan"),
                text: t.attr("data-sound-text")
            });
            BTPM.setUrl(a);
            var n;
            t.addClass("op-sound-active"),
            n && clearTimeout(n),
            n = setTimeout(function() {
                t.removeClass("op-sound-active")
            }, 2e3),
            _hmt.push(["_trackEvent", "首页", "web端点击双语例句TTS"])
        },
        mouseOverSound: function(e) {
            if ("hover" === u.get("soundTriggerMode")) {
                var t = this;
                this.timer = setTimeout(function() {
                    t.clickSound({
                        target: e.target
                    })
                }, 500)
            }
        },
        mouseOutSound: function() {
            clearTimeout(this.timer)
        },
        mouseOverHighlight: function(e) {
            var t = $(e.target)
              , a = t.attr("high-light-id");
            if ("" !== a) {
                var n = t.parent().parent();
                n.find("span").each(function() {
                    $(this).attr("high-light-id") === a && $(this).addClass("high-light-bg")
                })
            }
        },
        mouseOutHighlight: function(e) {
            var t = $(e.target)
              , a = t.parent().parent();
            a.find("span").removeClass("high-light-bg")
        },
        clickTagItem: function(e) {
            var t = $(e.target);
            if (!t.hasClass("sample-current")) {
                t.addClass("sample-current").siblings().removeClass("sample-current");
                var a = $(window).scrollTop();
                if (t.hasClass("sample-all")) {
                    var n = s("tplSampleTagcont", l);
                    g.find(".double-sample").html(n);
                    var i = u.get("collapse");
                    i.setSampleCollapse(!0),
                    window.scrollTo(0, a)
                } else {
                    var o = t.text();
                    this.getTagSampleDataAndRender({
                        tag: o
                    }, a)
                }
                _hmt.push(["_trackEvent", "首页", "web端点击双语例句子TAB"])
            }
        },
        getTagSampleDataAndRender: function(e, t) {
            var l = this
              , o = {
                from: a,
                to: n,
                query: i,
                stTag: e.tag
            };
            $.ajax({
                url: "/transextra",
                data: o,
                type: "POST",
                dataType: "JSON",
                success: function(e) {
                    if (0 === e.errno && e.data && e.data.st) {
                        var a = e.data.st
                          , i = {};
                        i.tplData = l.getDoubleSample(a),
                        i.tplData.to_lang = n;
                        var o = s("tplSampleTagcont", i);
                        g.find(".double-sample").html(o);
                        var r = u.get("collapse");
                        r.setSampleCollapse(!0),
                        window.scrollTo(0, t)
                    }
                }
            })
        },
        getHighlightQueryAndSave: function(e) {
            var t = "";
            $.each(e.find(".high-light-bg"), function(e, a) {
                t += $(a).text()
            });
            var a = "sample";
            u.set("dbClickHighlightZone", {
                query: $.trim(t),
                area: a
            })
        }
    };
    $(function() {
        m.bindEvents()
    }),
    t.buildSample = function(e) {
        m.buildSample(e)
    }
});
;define("translation:widget/translate/details/zhenDict/zhenDict", function(t, a, e) {
    "use strict";
    function n(t) {
        var a = t.data
          , e = {};
        e.tplData = a;
        var n = i("tplZhenDict", e);
        r.append(n)
    }
    var i = t("translation:widget/common/third_party/template")
      , r = $("#left-result-container");
    e.exports = {
        buildDict: n
    }
});
;define("translation:widget/translate/details/general/general", function(a, t, e) {
    "use strict";
    function n(a) {
        var t = a.data
          , e = r("tplGeneralmean", {
            tplData: t
        });
        l.append(e),
        i(t)
    }
    function i(a) {
        var t = $("#cont-general");
        if (t) {
            t.show();
            var e = []
              , n = []
              , i = a.word_name
              , r = t.find("li");
            r.each(function() {
                var a = $(this);
                e.push(a.width());
                var t = a.find("a");
                n.push(t.width()),
                t.text().toLowerCase() === i.toLowerCase() && t.addClass("item-current")
            });
            var l = Math.max.apply(Math, e);
            l = Math.min(l, 242),
            r.width(l);
            var s = Math.max.apply(Math, n)
              , o = s + 45;
            t.find(".general-box").removeClass("test-position"),
            r.find(".item-mean").css({
                left: o
            })
        }
    }
    var r = a("translation:widget/common/third_party/template")
      , l = $("#left-result-container");
    e.exports = {
        buildGeneral: n
    }
});
;define("translation:widget/translate/details/webMeans/webMeans", function(t, e) {
    "use strict";
    var n = t("translation:widget/common/third_party/template")
      , a = t("translation:widget/common/util").getDisplayLength
      , i = $("#left-result-container")
      , r = {
        buildWebMeans: function(t) {
            var e = this
              , r = t.data;
            if (r.netdata) {
                var s = JSON.stringify(r)
                  , o = {};
                o.tplData = JSON.parse(s);
                var l = o.tplData.netdata.types;
                l = this.quickSort(l),
                l = l.length > 5 ? l.splice(0, 5) : l,
                l.forEach(function(t) {
                    t.type = t.type + "：",
                    a(t.define) > 100 && (t.define = t.define.slice(0, 99) + "..."),
                    t.host = e.getDomainHost(t.url)
                }),
                o.tplData.netdata.types = l;
                var u = n("tplWebMeans", o);
                i.append(u)
            }
        },
        quickSort: function(t) {
            if (0 === t.length)
                return [];
            for (var e = [], n = [], a = t[0], i = 1; i < t.length; i++)
                t[i].pv < a.pv ? n.push(t[i]) : e.push(t[i]);
            return this.quickSort(n).concat(a, this.quickSort(e))
        },
        getDomainHost: function(t) {
            var e = document.createElement("a");
            return e.href = t,
            e.hostname
        }
    };
    e.buildWebMeans = function(t) {
        r.buildWebMeans(t)
    }
});
;define("translation:widget/translate/details/oxford/oxfordEntryAdapter", function(t, n, a) {
    "use strict";
    var e = {
        init: function(t) {
            if (t.entry && 0 !== t.entry.length) {
                var n = t.entry;
                $.each(n, function(t, n) {
                    n.hasPG = "n",
                    $.each(n.data, function(t, a) {
                        return "p-g" === a.tag ? (n.hasPG = "y",
                        !1) : void 0
                    })
                })
            }
        }
    };
    a.exports = e
});
;define("translation:widget/translate/details/oxford/oxfordUnboxAdapter", function(a, t, o) {
    "use strict";
    var n = {
        init: function(a, t) {
            if (!a.unbox || 0 === a.unbox.length)
                return void (a.unbox = "");
            var o = {
                synonyms: 0,
                synald7: 0,
                which_word: 0,
                vocab: 1,
                british_american: 2,
                grammar: 3,
                more_about: 4
            }
              , n = [{
                type: "which_word",
                data: []
            }, {
                type: "vocab",
                data: []
            }, {
                type: "british_american",
                data: []
            }, {
                type: "grammar",
                data: []
            }, {
                type: "more_about",
                data: []
            }];
            $.each(a.unbox, function(a, r) {
                var e = r.type;
                n[o[e]].data.push(r),
                n[o[e]].onlyUnbox = t
            }),
            a.unbox = n
        }
    };
    o.exports = n
});
;define("translation:widget/translate/details/oxford/oxfordTemplateHelper", function(t) {
    "use strict";
    var e = t("translation:widget/common/third_party/template")
      , a = t("translation:widget/common/util");
    e.helper("toNavChn", function(t) {
        switch (t) {
        case "vocab":
            return "词汇扩充";
        case "british_american":
            return "英美用法";
        case "grammar":
            return "语法说明";
        case "more_about":
            return "补充说明";
        case "which_word":
        case "synonyms":
        case "synald7":
        default:
            return "词语辨析"
        }
    }),
    e.helper("encodeURIComponent", function(t) {
        return encodeURIComponent(t)
    }),
    e.helper("addSpaceAroundMark", function(t, e) {
        var a = new RegExp("(" + e + ")","g");
        return t.replace(a, " $1 ")
    }),
    e.helper("setParaOudent", function(t, e) {
        if ("synald7" === e || "n" === t.outdent)
            return "";
        if ("para" !== t.tag)
            return "";
        if (!t.data)
            return "";
        var a = !1;
        return $.each(t.data, function(t, e) {
            return "und" === e.tag ? (a = !0,
            !1) : void 0
        }),
        a ? "unbox-outdent-und" : "unbox-outdent-unx"
    }),
    e.helper("setNoteOudent", function(t) {
        if ("unnote" !== !t.tag)
            return "";
        if (!t.data)
            return "";
        var e = 0;
        return $.each(t.data, function(t, a) {
            "und" === a.tag && e++
        }),
        e > 1 ? "para-unnote-outdent" : ""
    }),
    e.helper("splitTextByMark", function(t, e) {
        if (t = $.trim(t),
        !t)
            return "";
        t = a.encodeHTML(t);
        var n = t.split(e)
          , r = n.length
          , u = [];
        return $.each(n, function(t, e) {
            e && u.push(r === t + 1 ? "<p>" + e + "</p>" : "<p>" + e + "。</p>")
        }),
        u.join("")
    }),
    e.helper("genXRPrefix", function(t) {
        var e = void 0;
        switch (t) {
        case "syn":
            e = "同义词：";
            break;
        case "opp":
            e = "反义词：";
            break;
        case "see":
        case "see.c":
            e = "see also ";
            break;
        case "cp":
            e = "compare";
            break;
        case "rn":
            e = "related noun ";
            break;
        case "useat":
            e = "note at ";
            break;
        default:
            e = ""
        }
        return e
    }),
    e.helper("getIdsgHtml", function(t) {
        var a = {
            tag: "ids-g",
            data: []
        };
        if ("xrs" === t.tag ? $.each(t.data, function(t, e) {
            e.data && a.data.push(e)
        }) : $.each(t.data, function(t, e) {
            "id-g" === e.tag ? a.data.push(e) : $.each(e.data, function(t, e) {
                e.data && a.data.push(e)
            })
        }),
        0 === a.data.length)
            return "";
        var n = e("tplOxfordEntryXrIdsg", a);
        return n
    }),
    e.helper("joinByMark", function(t, e) {
        return "**" === e && (e = "|"),
        t.join(" " + e + " ")
    }),
    e.helper("judgeIfG", function(t) {
        if ("alone" !== t.tag || !t.data || 0 === t.data.length)
            return "";
        var e = t.data[0];
        if ("info" !== e.tag || !e.data || 0 === e.data.length)
            return "";
        var a = e.data[0];
        return "g" === a.tag ? "entry-vsg-label-hide" : ""
    }),
    e.helper("judgeIfCo", function(t) {
        if ("if-g" !== t.tag || !t.data || 0 === t.data.length)
            return "";
        var e = t.data[0];
        if ("alone" !== e.tag || !e.data || 0 === e.data.length)
            return "";
        var a = e.data[0];
        if ("info" !== a.tag || !a.data || 0 === a.data.length)
            return "";
        var n = a.data[0];
        return "co" === n.tag ? "entry-ifsg-label-hide" : ""
    }),
    e.helper("judgeIfId", function(t) {
        if ("[object Array]" !== Object.prototype.toString.call(t))
            return "";
        var e = !1;
        return $.each(t, function(t, a) {
            return "id" === a.tag && (e = !0),
            !1
        }),
        e ? "" : "entry-idg-no-id"
    })
});
;define("translation:widget/translate/details/oxford/oxford", function(t, e, n) {
    "use strict";
    var o = t("translation:widget/common/third_party/template")
      , r = t("translation:widget/common/soundURIGenerator")
      , a = t("translation:widget/translate/details/dictionary/simplemeans")
      , i = t("translation:widget/translate/details/oxford/oxfordEntryAdapter")
      , d = t("translation:widget/translate/details/oxford/oxfordUnboxAdapter")
      , s = t("translation:widget/common/environment");
    t("translation:widget/translate/details/oxford/oxfordTemplateHelper");
    var u = $("#left-result-container")
      , l = {
        init: function(t) {
            var e = !(t.unbox && t.unbox.length > 0)
              , n = !(t.entry && t.entry.length > 0);
            i.init(t),
            d.init(t, n),
            t.onlyEntry = e,
            t.onlyUnbox = n;
            var r = o("tplOxford", {
                tplData: t
            });
            u.append(r)
        },
        bindEvents: function() {
            var t = this;
            $(".translate-wrap").on("click", ".item-oxford .op-sound", function(e) {
                t.clickSound({
                    target: e.currentTarget
                })
            }).on("mouseenter", ".item-oxford .op-sound", function(e) {
                t.mouseOverSound({
                    target: e.currentTarget
                })
            }).on("mouseleave", ".item-oxford .op-sound", function() {
                t.mouseOutSound()
            })
        },
        clickSound: function(t) {
            a.judgeStopRepeat(),
            this.timer && clearTimeout(this.timer);
            var e = $(t.target)
              , n = r.generateURI({
                lan: e.attr("data-sound-lan"),
                text: e.attr("data-sound-text")
            });
            BTPM.setUrl(n);
            var o = void 0;
            e.addClass("op-sound-active"),
            o && clearTimeout(o),
            o = setTimeout(function() {
                e.removeClass("op-sound-active")
            }, 2e3),
            _hmt.push(["_trackEvent", "首页", "46_首页页面_牛津发音按钮的点击量"])
        },
        mouseOverSound: function(t) {
            var e = this;
            "hover" === s.get("soundTriggerMode") && (this.timer = setTimeout(function() {
                e.clickSound({
                    target: t.target
                })
            }, 500))
        },
        mouseOutSound: function() {
            clearTimeout(this.timer)
        }
    };
    $(function() {
        l.bindEvents()
    }),
    n.exports = l
});
;define("translation:widget/translate/details/synonym/synonym", function(t, n, e) {
    "use strict";
    var o = t("translation:widget/common/third_party/template")
      , i = t("translation:widget/translate/details/dictionary/simplemeans")
      , a = t("translation:widget/common/soundURIGenerator")
      , r = t("translation:widget/common/environment")
      , s = $("#left-result-container");
    o.helper("synonymOffBrackets", function(t) {
        return t.replace(/\〈([^\〉]+)\〉/, "$1")
    }),
    o.helper("synonymFrontQuery", function(t) {
        return $.trim(t.split("(")[0])
    });
    var u = {
        buildSynonym: function(t) {
            var n = {};
            n.tplData = t.data;
            var e = o("tplSynonym", n);
            s.append(e)
        },
        bindEvents: function() {
            var t = this;
            $(".translate-wrap").on("click", ".synonym-item .op-sound", function() {
                t.clickSound({
                    target: this
                })
            }).on("mouseenter", ".synonym-item .op-sound", function() {
                t.mouseOverSound({
                    target: this
                })
            }).on("mouseleave", ".synonym-item .op-sound", function() {
                t.mouseOutSound()
            })
        },
        clickSound: function(t) {
            i.judgeStopRepeat(),
            this.timer && clearTimeout(this.timer);
            var n = $(t.target)
              , e = a.generateURI({
                lan: n.attr("data-sound-lan"),
                text: n.attr("data-sound-text")
            });
            BTPM.setUrl(e);
            var o = void 0;
            n.addClass("op-sound-active"),
            o && clearTimeout(o),
            o = setTimeout(function() {
                n.removeClass("op-sound-active")
            }, 2e3),
            _hmt.push(["_trackEvent", "首页", "67_首页页面_Web同义词辨析Tab下发音按钮的发音次数"])
        },
        mouseOverSound: function(t) {
            var n = this;
            "hover" === r.get("soundTriggerMode") && (this.timer = setTimeout(function() {
                n.clickSound({
                    target: t.target
                })
            }, 500))
        },
        mouseOutSound: function() {
            clearTimeout(this.timer)
        }
    };
    $(function() {
        u.bindEvents()
    }),
    e.exports = {
        buildSynonym: u.buildSynonym
    }
});
;define("translation:widget/translate/details/rootsaffixes/rootsaffixes", function(t, a, s) {
    "use strict";
    var e = t("translation:widget/common/third_party/template")
      , o = t("translation:widget/translate/sideNav/sideNav")
      , n = $("#left-result-container")
      , i = {
        buildRootsaffixes: function(t) {
            var a = {};
            a.tplData = t.data;
            var s = e("tplRootsaffixes", a);
            n.append(s)
        },
        bindEvents: function() {
            n.on("click", ".ras-collapse-expand-btn", function() {
                var t = $(this).parent().find(".ras-mean");
                t.hasClass("to-expand") ? (t.removeClass("to-expand").addClass("to-collapse"),
                o.setupPos(),
                _hmt.push(["_trackEvent", "首页", "74_首页页面_词根词缀小模块_展开"])) : (t.removeClass("to-collapse").addClass("to-expand"),
                o.setupPos(),
                o.mockScrollingClickFlag(!1),
                o.checkPos(),
                _hmt.push(["_trackEvent", "首页", "74_首页页面_词根词缀小模块_收起"]))
            })
        }
    };
    $(function() {
        i.bindEvents()
    }),
    s.exports = {
        buildRootsaffixes: i.buildRootsaffixes
    }
});
;define("translation:widget/translate/details/usecase/usecaseTemplateHelper", function(e) {
    "use strict";
    var t = e("translation:widget/common/third_party/template")
      , a = e("translation:widget/common/util");
    t.helper("toNavChn", function(e) {
        switch (e) {
        case "vocab":
            return "词汇扩充";
        case "british_american":
            return "英美用法";
        case "grammar":
            return "语法说明";
        case "more_about":
            return "补充说明";
        case "which_word":
        case "synonyms":
        case "synald7":
        default:
            return "词语辨析"
        }
    }),
    t.helper("encodeURIComponent", function(e) {
        return encodeURIComponent(e)
    }),
    t.helper("addSpaceAroundMark", function(e, t) {
        var a = new RegExp("(" + t + ")","g");
        return e.replace(a, " $1 ")
    }),
    t.helper("setParaOudent", function(e, t) {
        if ("synald7" === t || "n" === e.outdent)
            return "";
        if ("para" !== e.tag)
            return "";
        if (!e.data)
            return "";
        var a = !1;
        return $.each(e.data, function(e, t) {
            return "und" === t.tag ? (a = !0,
            !1) : void 0
        }),
        a ? "unbox-outdent-und" : "unbox-outdent-unx"
    }),
    t.helper("setNoteOudent", function(e) {
        if ("unnote" !== !e.tag)
            return "";
        if (!e.data)
            return "";
        var t = 0;
        return $.each(e.data, function(e, a) {
            "und" === a.tag && t++
        }),
        t > 1 ? "para-unnote-outdent" : ""
    }),
    t.helper("splitTextByMark", function(e, t) {
        if (e = $.trim(e),
        !e)
            return "";
        e = a.encodeHTML(e);
        var n = e.split(t)
          , r = n.length
          , u = [];
        return $.each(n, function(e, t) {
            t && u.push(r === e + 1 ? "<p>" + t + "</p>" : "<p>" + t + "。</p>")
        }),
        u.join("")
    }),
    t.helper("genXRPrefix", function(e) {
        var t = void 0;
        switch (e) {
        case "syn":
            t = "同义词：";
            break;
        case "opp":
            t = "反义词：";
            break;
        case "see":
        case "see.c":
            t = "see also ";
            break;
        case "cp":
            t = "compare";
            break;
        case "rn":
            t = "related noun ";
            break;
        case "useat":
            t = "note at ";
            break;
        default:
            t = ""
        }
        return t
    }),
    t.helper("joinByMark", function(e, t) {
        return "**" === t && (t = "|"),
        e.join(" " + t + " ")
    }),
    t.helper("judgeIfG", function(e) {
        if ("alone" !== e.tag || !e.data || 0 === e.data.length)
            return "";
        var t = e.data[0];
        if ("info" !== t.tag || !t.data || 0 === t.data.length)
            return "";
        var a = t.data[0];
        return "g" === a.tag ? "entry-vsg-label-hide" : ""
    }),
    t.helper("judgeIfCo", function(e) {
        if ("if-g" !== e.tag || !e.data || 0 === e.data.length)
            return "";
        var t = e.data[0];
        if ("alone" !== t.tag || !t.data || 0 === t.data.length)
            return "";
        var a = t.data[0];
        if ("info" !== a.tag || !a.data || 0 === a.data.length)
            return "";
        var n = a.data[0];
        return "co" === n.tag ? "entry-ifsg-label-hide" : ""
    }),
    t.helper("judgeIfId", function(e) {
        if ("[object Array]" !== Object.prototype.toString.call(e))
            return "";
        var t = !1;
        return $.each(e, function(e, a) {
            return "id" === a.tag && (t = !0),
            !1
        }),
        t ? "" : "entry-idg-no-id"
    }),
    t.helper("getUsecaseIdsgHtml", function(e) {
        var a = {
            tag: "ids-g",
            p: e.p,
            data: []
        };
        if ($.each(e.data, function(e, t) {
            "id-g" === t.tag ? ($.each(t.data, function(e, n) {
                "xrs" === n.tag && "id" === n.xt && ($.each(n.data, function(e, t) {
                    t.data && a.data.push(t)
                }),
                t.data.splice(e, 1))
            }),
            a.data.push(t)) : $.each(t.data, function(e, t) {
                t.data && a.data.push(t)
            })
        }),
        0 === a.data.length)
            return "";
        var n = t("tplUsecaseEntryXrIdsg", a);
        return n
    })
});
;define("translation:widget/translate/details/usecase/usecase", function(e, t, a) {
    "use strict";
    {
        var s = e("translation:widget/common/third_party/template")
          , o = e("translation:widget/common/soundURIGenerator")
          , n = e("translation:widget/translate/details/dictionary/simplemeans")
          , i = e("translation:widget/translate/sideNav/sideNav")
          , r = e("translation:widget/common/environment");
        e("translation:widget/translate/details/collapse/collapse")
    }
    e("translation:widget/translate/details/usecase/usecaseTemplateHelper");
    var d = $("#left-result-container")
      , l = navigator.userAgent
      , c = {
        init: function() {
            this.bindEvents()
        },
        buildUsecase: function(e) {
            var t = {};
            t.tplData = e.data;
            var a = s("tplUsecase", t);
            d.append(a),
            $(".usecase-nav").find("li").eq(0).addClass("cur"),
            $(".usecase-cont").find(".usecase-item").eq(0).removeClass("hide"),
            l.indexOf("Firefox") < 0 && $(".ex-zh").addClass("ex-zh-clamp")
        },
        bindEvents: function() {
            var e = this;
            d.on("click", ".usecase-section .op-sound", function(t) {
                e.clickSound({
                    target: t.currentTarget
                })
            }).on("mouseenter", ".usecase-section .op-sound", function(t) {
                e.mouseOverSound({
                    target: t.currentTarget
                })
            }).on("mouseleave", ".usecase-section .op-sound", function() {
                e.mouseOutSound()
            }).on("click", ".usecase-nav li", function(t) {
                e.changeTab({
                    target: t.currentTarget
                })
            }).on("click", ".item-usecase .oxford-to-expand", function(t) {
                e.showOxford({
                    target: t.currentTarget
                })
            }).on("click", ".item-usecase .oxford-to-collapse", function() {
                e.collapseOxford()
            })
        },
        clickSound: function(e) {
            n.judgeStopRepeat(),
            this.timer && clearTimeout(this.timer);
            var t = $(e.target)
              , a = o.generateURI({
                lan: t.attr("data-sound-lan"),
                text: t.attr("data-sound-text")
            });
            BTPM.setUrl(a);
            var s = void 0;
            t.find(".usecase-sound").addClass("usecase-sound-active"),
            s && clearTimeout(s),
            s = setTimeout(function() {
                t.find(".usecase-sound").removeClass("usecase-sound-active")
            }, 2e3),
            "phrase" === t.data("type") ? _hmt.push(["_trackEvent", "首页", "首页页面_词语用例_词组发音按钮的点击量"]) : "sentence" === t.data("type") && _hmt.push(["_trackEvent", "首页", "首页页面_词语用例_例句发音按钮的点击量"])
        },
        mouseOverSound: function(e) {
            var t = this;
            "hover" === r.get("soundTriggerMode") && (this.timer = setTimeout(function() {
                t.clickSound({
                    target: e.target
                })
            }, 500))
        },
        mouseOutSound: function() {
            clearTimeout(this.timer)
        },
        changeTab: function(e) {
            var t = $(e.target)
              , a = $(window).scrollTop();
            if (!t.hasClass("cur")) {
                var s = t.parents("section")
                  , o = t.index()
                  , n = $(".usecase-cont")
                  , r = s.find(".cont-phrasalverb");
                t.addClass("cur").siblings().removeClass("cur"),
                n.find(".usecase-item").eq(o).removeClass("hide").siblings().addClass("hide"),
                this.genCollapse({
                    target: s
                }),
                i.setupPos(),
                r && (r.hasClass("oxford-phrasalverb-only") ? this.hideOxford(!1) : (this.hideOxford(!0),
                $(".oxford-to-collapse").addClass("hide"))),
                window.scrollTo(0, a)
            }
        },
        genCollapse: function(e) {
            var t = $(e.target);
            if (t[0].hasAttribute("data-collapse-height")) {
                var a = parseInt(t.attr("data-collapse-height"), 10)
                  , s = t.find(".details-cont-item");
                s.css("max-height", "none"),
                s.height() > a ? (t.removeClass("to-collapse").addClass("to-expand"),
                s.css("max-height", a + "px")) : t.removeClass("to-expand").removeClass("to-collapse")
            }
        },
        showOxford: function(e) {
            var t = $(e.target)
              , a = t.parents("section")
              , s = t.offset().top - $(window).scrollTop();
            t.attr("data-expand-top", s).addClass("hide"),
            $(".oxford-items").removeClass("hide"),
            a.hasClass("to-expand") || a.hasClass("to-collapse") || $(".oxford-to-collapse").removeClass("hide"),
            i.setupPos(),
            _hmt.push(["_trackEvent", "首页", "首页页面_词语用例_短语动词牛津查看更多的点击量"])
        },
        hideOxford: function(e) {
            e && ($(".oxford-items").addClass("hide"),
            $(".oxford-to-expand").removeClass("hide"))
        },
        collapseOxford: function() {
            this.hideOxford(!0);
            var e = parseInt($(".oxford-to-expand").attr("data-expand-top"), 10)
              , t = ($(".oxford-to-collapse").offset().top,
            $(".oxford-to-collapse").offset().top - e);
            $(".oxford-to-collapse").addClass("hide"),
            $("html:not(:animated), body:not(:animated)").animate({
                scrollTop: t
            }, 300, "swing", function() {
                i.setupPos(),
                i.mockScrollingClickFlag(!1),
                i.checkPos()
            })
        }
    };
    $(function() {
        c.init()
    }),
    a.exports = {
        buildUsecase: c.buildUsecase
    }
});
;define("translation:widget/translate/details/sanyms/sanyms", function(n, t, a) {
    "use strict";
    var e = n("translation:widget/common/third_party/template")
      , r = $("#left-result-container");
    e.helper("uriComponentTrimAndEncode", function(n) {
        return encodeURIComponent($.trim(n))
    });
    var i = {
        buildSanyms: function(n) {
            var t = {};
            t.tplData = n.data;
            var a = e("tplSanyms", t);
            r.append(a)
        }
    };
    a.exports = {
        buildSanyms: i.buildSanyms
    }
});
;define("translation:widget/translate/details/etym/etym", function(t, a, e) {
    "use strict";
    var n = t("translation:widget/common/third_party/template")
      , i = $("#left-result-container")
      , r = {
        buildEtym: function(t) {
            var a = {};
            a.tplData = t.data;
            var e = n("tplEtym", a);
            i.append(e),
            _hmt.push(["_trackEvent", "首页", "Web词源Tab展现量"])
        }
    };
    e.exports = {
        buildEtym: r.buildEtym
    }
});
;define("translation:widget/translate/details/details", function(e, a) {
    "use strict";
    function t(a, t, j, O, N) {
        var C = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : !1
          , E = null
          , I = null
          , W = null
          , q = ""
          , B = {
            0: "translator",
            1: "keyWord",
            2: "simpleMeaning",
            3: "oxford",
            4: "collins",
            5: "en2en",
            6: "zh2en",
            7: "zh2zh",
            8: "illSen",
            9: "wordColl",
            10: "webMeaning",
            11: "synonym",
            12: "rootsaffixes",
            13: "usecase",
            14: "sanyms",
            15: "etym"
        }
          , D = {
            translator: !1,
            keyWord: !1,
            simpleMeaning: !1,
            festivalLink: window.festivalLinkInfo.isShowFestivalLink,
            adLink: window.adLinkInfo.isShowAdLink,
            oxford: !1,
            collins: !1,
            en2en: !1,
            zh2en: !1,
            zh2zh: !1,
            illSen: !1,
            wordColl: !1,
            webMeaning: !1,
            synonym: !1,
            rootsaffixes: !1,
            usecase: !1,
            sanyms: !1,
            etym: !1
        };
        !function() {
            if (!a.dict_result || "en" !== j && "zh" !== j && "jp" !== j && "th" !== j)
                E = !1,
                b.sendIndexBannerLog();
            else if (a.dict_result.content)
                N || (E = a.dict_result,
                q = JSON.stringify(a.dict_result));
            else if (a.dict_result.simple_means && !N && (E = a.dict_result.simple_means,
            I = a.dict_result.baike_img_url,
            W = a.dict_result.queryExplainVideo,
            a.dict_result.simple_means.symbols && a.dict_result.simple_means.symbols.length > 0 && (q = JSON.stringify({
                simple_means: {
                    symbols: a.dict_result.simple_means.symbols
                }
            })),
            a.dict_result.sim_words && (E.sim_words = a.dict_result.sim_words),
            a.dict_result.net_means && (E.net_means = a.dict_result.net_means)),
            "zh" === t && "en" === j || "en" === t && "zh" === j)
                for (var e in a.dict_result)
                    if (a.dict_result[e]instanceof Object && !$.isEmptyObject(a.dict_result[e]) && 0 !== a.dict_result[e].length)
                        switch (e) {
                        case "collins":
                            D.collins = !0;
                            break;
                        case "synthesize_means":
                            D.zh2en = !0;
                            break;
                        case "zdict":
                            D.zh2zh = !0;
                            break;
                        case "edict":
                            D.en2en = !0;
                            break;
                        case "oxford":
                            D.oxford = !0;
                            break;
                        case "general_knowledge":
                            a.dict_result.general_knowledge.similar_words && (D.wordColl = !0);
                            break;
                        case "netdata":
                            D.webMeaning = !0;
                            break;
                        case "synonym":
                            D.synonym = !0;
                            break;
                        case "rootsaffixes":
                            D.rootsaffixes = !0;
                            break;
                        case "usecase":
                            D.usecase = !0;
                            break;
                        case "sanyms":
                            D.sanyms = !0;
                            break;
                        case "etym":
                            D.etym = !0
                        }
            D.simpleMeaning = Boolean(E),
            !a.liju_result || "en" !== j && "zh" !== j || !a.liju_result["double"] && !a.liju_result.single || (D.illSen = !0),
            a.trans_result && a.trans_result.keywords && a.trans_result.keywords.length > 0 && ("zh" === t && "en" === j || "en" === t && "zh" === j) && !D.simpleMeaning && (D.keyWord = !0),
            a.simworks && "[object Object]" === Object.prototype.toString.call(a.simworks) && (D.translator = !0)
        }();
        var F = []
          , A = !1;
        !function() {
            if (e("translation:widget/translate/sideNav/navSorter/listOperator").getNavList().forEach(function(e) {
                var a = B[e];
                D[a] && F.push(a)
            }),
            D.festivalLink || D.adLink) {
                var a = [];
                D.festivalLink && a.push("festivalLink"),
                D.adLink && a.push("adLink"),
                "simpleMeaning" !== F[0] ? (F.unshift.apply(F, a),
                D.adLink && D.festivalLink && (A = !0)) : F.splice.apply(F, [1, 0].concat(a))
            }
            var t = F.find(function(e) {
                return "festivalLink" !== e && "adLink" !== e
            });
            s.set("firstModuleId", parseInt(Object.keys(B).find(function(e) {
                return B[e] === t
            }), 10))
        }();
        var J = a.dict_result;
        F.forEach(function(e) {
            switch (e) {
            case "translator":
                i.build(a.simworks);
                break;
            case "keyWord":
                m.build({
                    data: a.trans_result.keywords,
                    from: t,
                    to: j
                });
                break;
            case "simpleMeaning":
                o.buildSimpleMeans({
                    data: E,
                    to: j,
                    baikeImgUrl: I,
                    queryExplainVideo: W
                });
                break;
            case "festivalLink":
                r.buildFestivalLink();
                break;
            case "adLink":
                d.build(A);
                break;
            case "oxford":
                v.init(J.oxford);
                break;
            case "collins":
                w.buildCollins({
                    data: J.collins
                });
                break;
            case "en2en":
                c.buildEdict({
                    data: J.edict
                });
                break;
            case "zh2en":
                _.buildDict({
                    data: J.synthesize_means
                });
                break;
            case "zh2zh":
                u.buildZdict({
                    data: J.zdict
                });
                break;
            case "illSen":
                g.buildSample({
                    data: a.liju_result,
                    from: t,
                    to: j,
                    query: O,
                    badCaseByForce: N
                });
                break;
            case "wordColl":
                p.buildGeneral({
                    data: J.general_knowledge
                });
                break;
            case "webMeaning":
                h.buildWebMeans({
                    data: J
                });
                break;
            case "synonym":
                z.buildSynonym({
                    data: J.synonym
                });
                break;
            case "rootsaffixes":
                L.buildRootsaffixes({
                    data: J.rootsaffixes
                });
                break;
            case "usecase":
                x.buildUsecase({
                    data: J.usecase
                });
                break;
            case "sanyms":
                M.buildSanyms({
                    data: J.sanyms
                });
                break;
            case "etym":
                S.buildEtym({
                    data: J.etym
                })
            }
        });
        var R = !1;
        for (var U in D)
            R = R || D[U];
        C || (R && ("en" === t && "zh" === j && O.length < 417 && window.common.hasSideAd && l.build(),
        s.set("hasDetail", !0),
        n.showAppQr(A)),
        f.init({
            from: t,
            to: j,
            query: O,
            dictJSON: q
        })),
        "en" === t && "zh" === j || "zh" === t && "en" === j ? (y.genCollapse(),
        k.genNav(C ? !1 : !0)) : k.destroyNav()
    }
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    {
        var s = e("translation:widget/common/environment")
          , n = e("translation:widget/translate/output/adcards")
          , i = e("translation:widget/translate/details/translator/translator")
          , l = e("translation:widget/translate/details/appRead/appRead")
          , r = e("translation:widget/translate/details/festivalLink/festivalLink")
          , d = e("translation:widget/translate/details/adLink/adLink")
          , o = e("translation:widget/translate/details/dictionary/simplemeans")
          , c = e("translation:widget/translate/details/edict/edict")
          , u = e("translation:widget/translate/details/zdict/zdict")
          , m = e("translation:widget/translate/details/keywords/keywords")
          , b = e("translation:widget/translate/output/bottomBanner")
          , f = e("translation:widget/translate/input/inputFavo")
          , k = e("translation:widget/translate/sideNav/sideNav")
          , y = e("translation:widget/translate/details/collapse/collapse")
          , g = e("translation:widget/translate/details/sample/sample")
          , w = e("translation:widget/translate/details/collins/collins")
          , _ = e("translation:widget/translate/details/zhenDict/zhenDict")
          , p = e("translation:widget/translate/details/general/general")
          , h = e("translation:widget/translate/details/webMeans/webMeans")
          , v = e("translation:widget/translate/details/oxford/oxford")
          , z = e("translation:widget/translate/details/synonym/synonym")
          , L = e("translation:widget/translate/details/rootsaffixes/rootsaffixes")
          , x = e("translation:widget/translate/details/usecase/usecase")
          , M = e("translation:widget/translate/details/sanyms/sanyms")
          , S = e("translation:widget/translate/details/etym/etym");
        $("#left-result-container")
    }
    a.default = {
        init: t
    }
});
;define("translation:widget/translate/docTransLang/docTransLang", function(t) {
    "use strict";
    function o(t) {
        var o = a(t)
          , n = o.from
          , r = o.to;
        f.removeClass("selected"),
        f.filter('[data-dir="' + t + '"]').addClass("selected");
        var e = "auto2auto" === t;
        l.toggleClass("auto", e),
        e ? l.find(".from-doc-lang").text("中英互译") : (l.find(".from-doc-lang").text(s[n].zhName),
        l.find(".to-doc-lang").text(s[r].zhName)),
        d.removeClass("open"),
        m.from = n,
        m.to = r
    }
    function a(t) {
        return {
            from: t.split("2")[0],
            to: t.split("2")[1]
        }
    }
    function n() {
        c.removeClass("guiding"),
        localStorage.setItem("docTransLangGuideFlag", "true")
    }
    var r = Object.assign || function(t) {
        for (var o = 1; o < arguments.length; o++) {
            var a = arguments[o];
            for (var n in a)
                Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n])
        }
        return t
    }
      , e = t("translation:widget/translate/input/uploader")
      , i = t("translation:widget/translate/docTranslate/docTransUtil")
      , s = t("translation:widget/common/config/langMap")
      , c = $(".doc-trans-operation")
      , d = $(".doc-trans-dir")
      , l = d.find(".curr-doc-dir")
      , u = d.find(".doc-lang-select")
      , f = u.find(".doc-lang-pair")
      , g = u.find(".know-btn")
      , m = {
        from: "auto",
        to: "auto"
    };
    !function() {
        var a = localStorage.getItem("docTransDir");
        a && o(a),
        $(".doc-trans-btn").on("click", function() {
            window.common.docSid ? e.option("formData", r({}, m, {
                sid: window.common.docSid
            })) : e.option("formData", m),
            e.upload(i.currTask.file),
            Object.assign(i.currTask, m);
            var o = t("translation:widget/translate/docTranslate/docTranslate");
            o.loading(),
            $("#main-outer").removeClass("doc-trans-mode").addClass("doc-trans-view-mode"),
            $(".footer").hide(),
            window._hmt.push(["_trackEvent", "首页", "80_首页页面_点击文档翻译的翻译按钮"]),
            "auto" === m.from && "auto" === m.to && window._hmt.push(["_trackEvent", "首页", "81_首页页面_点击文档翻译的翻译按钮时语言方向为中英互译"])
        }),
        l.on("click", function() {
            d.toggleClass("open"),
            n()
        }),
        f.on("click", function(t) {
            var a = $(t.currentTarget).attr("data-dir");
            localStorage.setItem("docTransDir", a),
            o(a),
            n()
        }),
        g.on("click", function() {
            n(),
            d.removeClass("open")
        }),
        $("body").on("click", function(t) {
            var o = $(t.target);
            0 !== d.find(o).length || o.is(d) ? window._hmt.push(["_trackEvent", "首页", "文档翻译_点击语言设置框"]) : d.removeClass("open")
        })
    }()
});
;define("translation:widget/translate/input/indexlog", function(n) {
    "use strict";
    var t = n("translation:widget/translate/common/hash")
      , e = (n("translation:widget/common/util"),
    {
        init: function() {
            this.sendIndexLog(),
            this.bannerIndexDisplayLog()
        },
        sendIndexLog: function() {
            var n = this.getQueryString("aldtype");
            _hmt.push(["_trackEvent", "首页", "web端PV"]);
            var t = parseInt(n, 10);
            16047 === t ? _hmt.push(["_trackEvent", "首页", "web端泛需求阿拉丁导入PV"]) : 85 === t ? _hmt.push(["_trackEvent", "首页", "web端词典阿拉丁导入PV"]) : 23 === t && _hmt.push(["_trackEvent", "首页", "web端翻译阿拉丁导入PV"])
        },
        bannerIndexDisplayLog: function() {
            var n = t.get();
            if (!n || n && !n.query) {
                if ($(".spread-slide a").length <= 0)
                    return;
                _hmt.push(["_trackEvent", "web端翻译—banner总展现", "web端翻译—首屏banner展现"])
            }
        },
        getQueryString: function(n) {
            var t = new RegExp("(^|&)" + n + "=([^&]*)(&|$)","i")
              , e = window.location.search.substring(1).match(t);
            return null != e ? e[2] : null
        }
    });
    $(function() {
        e.init()
    })
});
;define("translation:widget/translate/input/input", function(t) {
    "use strict";
    var n = t("translation:widget/translate/input/events")
      , a = t("translation:widget/translate/input/textarea");
    t("translation:widget/common/flash"),
    $(function() {
        n.init(),
        a.init(),
        t("translation:widget/translate/input/autoRequest").compatibleTrans()
    }),
    t("translation:widget/translate/input/autoRequest"),
    t("translation:widget/translate/input/indexlog")
});
;define("translation:widget/translate/setting/setting", function(e) {
    "use strict";
    var t = e("translation:widget/common/environment")
      , s = e("translation:widget/common/cookie")
      , o = e("translation:widget/login/login")
      , i = e("translation:widget/translate/history/history")
      , n = e("translation:widget/common/util")
      , r = e("translation:widget/translate/output/adcards")
      , d = {
        init: function() {
            this.initSetting(),
            this.bindEvents()
        },
        initSetting: function() {
            try {
                "true" !== localStorage.getItem("PC2.10CollBtnTagClicked") && $(".collection-btn").addClass("new-edition-tip"),
                "true" !== localStorage.getItem("PC3.5SettingBtnTagClicked") && $(".setting-btn").addClass("new-edition-tip")
            } catch (e) {}
            var o = s.getCookie("REALTIME_TRANS_SWITCH");
            o ? "0" === o ? ($(".realtrans-switch").removeClass("setting-checked"),
            t.set("isInRealtimeMode", !1)) : t.set("isInRealtimeMode", !0) : o || (s.setCookie("REALTIME_TRANS_SWITCH", 1, {
                expires: 864e8
            }),
            t.set("isInRealtimeMode", !0));
            var i = s.getCookie("FANYI_WORD_SWITCH");
            i ? "0" === i ? ($(".zonedword-switch").removeClass("setting-checked"),
            t.set("isInFanyiWordMode", !1)) : t.set("isInFanyiWordMode", !0) : i || (s.setCookie("FANYI_WORD_SWITCH", 1, {
                expires: 864e8
            }),
            t.set("isInFanyiWordMode", !0));
            var d = s.getCookie("HISTORY_SWITCH");
            d ? "0" === d ? ($(".history-switch").removeClass("setting-checked"),
            t.set("isInHistoryMode", !1),
            r.updateAppSideAdLong()) : "1" === d && (t.set("isInHistoryMode", !0),
            r.updateAppSideAdLong()) : (s.setCookie("HISTORY_SWITCH", 1, {
                expires: 864e8
            }),
            t.set("isInHistoryMode", !0),
            r.updateAppSideAdLong());
            var a = s.getCookie("SOUND_SPD_SWITCH");
            a ? "0" === a ? ($("#spd-slow").addClass("sound-spd-radio-checked"),
            t.set("soundSpdMode", "slow")) : "2" === a ? ($("#spd-fast").addClass("sound-spd-radio-checked"),
            t.set("soundSpdMode", "fast")) : ($("#spd-normal").addClass("sound-spd-radio-checked"),
            t.set("soundSpdMode", "normal")) : (s.setCookie("SOUND_SPD_SWITCH", 1, {
                expires: 864e8
            }),
            $("#spd-normal").addClass("sound-spd-radio-checked"),
            t.set("soundSpdMode", "normal"));
            var c = s.getCookie("SOUND_PREFER_SWITCH");
            c ? "0" === c ? ($("#prefer-uk").addClass("sound-prefer-radio-checked"),
            t.set("soundPreferMode", "uk")) : ($("#prefer-en").addClass("sound-prefer-radio-checked"),
            t.set("soundPreferMode", "en")) : (s.setCookie("SOUND_PREFER_SWITCH", 1, {
                expires: 864e8
            }),
            $("#prefer-en").addClass("sound-prefer-radio-checked"),
            t.set("soundPreferMode", "en"));
            var l = n.supportLocalStorage ? localStorage.getItem("soundTrigger") : "";
            l || (l = "hover",
            n.supportLocalStorage && localStorage.setItem("soundTrigger", l)),
            $("#" + l + "-trigger").addClass("sound-trigger-radio-checked"),
            t.set("soundTriggerMode", l)
        },
        bindEvents: function() {
            $(".setting-btn").on("click", $.proxy(this.settingBtnClick, this)),
            $(document).on("click", $.proxy(this.documentClick, this)),
            $(".collection-btn").on("click", $.proxy(this.collectionClick, this)),
            $(".realtrans-switch").on("click", $.proxy(this.setRealtransSwitch, this)),
            $(".translate-setting .zonedword-switch").on("click", $.proxy(this.setZonedwordSwitch, this)),
            $(".history-switch").on("click", $.proxy(this.setHistorySwitch, this)),
            $(".sound-spd-switch").on("click", ".sound-spd-radio", $.proxy(this.soundSpdSwitch, this)),
            $(".sound-prefer-switch").on("click", ".sound-prefer-radio", $.proxy(this.soundPreferSwitch, this)),
            $(".sound-trigger-switch").on("click", ".sound-trigger-radio", $.proxy(this.soundTriggerSwitch, this))
        },
        settingBtnClick: function() {
            n.supportLocalStorage && "true" !== localStorage.getItem("PC3.5SettingBtnTagClicked") && (localStorage.setItem("PC3.5SettingBtnTagClicked", "true"),
            $(".setting-btn").removeClass("new-edition-tip")),
            $(".translate-setting .setting-options").toggle(),
            $(".setting-btn").toggleClass("setting-btn-focus"),
            _hmt.push(["_trackEvent", "首页", "web端点击设置"])
        },
        hideSettingTips: function() {
            $(".setting-btn").removeClass("setting-btn-focus"),
            $(".setting-options").hide()
        },
        documentClick: function(e) {
            var t = $(e.target);
            "block" === $(".setting-options").css("display") && (t.hasClass("icon-setting") || t.hasClass("setting-options") || t.parents(".setting-options").length > 0 || this.hideSettingTips())
        },
        collectionClick: function() {
            var e = t.get("account");
            if (_hmt.push(["_trackEvent", "首页", "web端点击收藏夹"]),
            "" === e.is_login)
                o.newLoginInstanceAsync();
            else {
                var s = $(".collection-btn").data("href");
                window.open(s)
            }
        },
        setRealtransSwitch: function() {
            var e = $(".realtrans-switch");
            e.toggleClass("setting-checked");
            var o;
            e.hasClass("setting-checked") ? (t.set("isInRealtimeMode", !0),
            o = 1,
            _hmt.push(["_trackEvent", "首页", "web端实时翻译打开"])) : (t.set("isInRealtimeMode", !1),
            o = 0,
            _hmt.push(["_trackEvent", "首页", "web端实时翻译关闭"])),
            s.setCookie("REALTIME_TRANS_SWITCH", o, {
                expires: 864e8
            })
        },
        setZonedwordSwitch: function() {
            var e = $(".zonedword-switch");
            e.toggleClass("setting-checked");
            var o;
            e.hasClass("setting-checked") ? (o = 1,
            t.set("isInFanyiWordMode", !0),
            _hmt.push(["_trackEvent", "首页", "web端划词翻译打开"])) : (o = 0,
            t.set("isInFanyiWordMode", !1),
            _hmt.push(["_trackEvent", "首页", "web端划词翻译关闭"])),
            s.setCookie("FANYI_WORD_SWITCH", o, {
                expires: 864e8
            })
        },
        setHistorySwitch: function() {
            var e = $(".history-switch");
            e.toggleClass("setting-checked");
            var o;
            e.hasClass("setting-checked") ? (o = 1,
            t.set("isInHistoryMode", !0),
            r.updateAppSideAdLong(),
            _hmt.push(["_trackEvent", "首页", "设置-历史记录-开启"])) : (o = 0,
            t.set("isInHistoryMode", !1),
            r.updateAppSideAdLong(),
            _hmt.push(["_trackEvent", "首页", "设置-历史记录-关闭"])),
            i.onHistoryInput(),
            s.setCookie("HISTORY_SWITCH", o, {
                expires: 864e8
            })
        },
        soundSpdSwitch: function(e) {
            var o = $(e.currentTarget);
            if (!o.hasClass("sound-spd-radio-checked")) {
                $(".sound-spd-switch .sound-spd-radio-checked").removeClass("sound-spd-radio-checked"),
                o.addClass("sound-spd-radio-checked");
                var i = o.attr("data-value");
                "slow" === i ? (s.setCookie("SOUND_SPD_SWITCH", 0, {
                    expires: 864e8
                }),
                _hmt.push(["_trackEvent", "首页", "设置-发音语速-较慢"])) : "normal" === i ? (s.setCookie("SOUND_SPD_SWITCH", 1, {
                    expires: 864e8
                }),
                _hmt.push(["_trackEvent", "首页", "设置-发音语速-中速"])) : (s.setCookie("SOUND_SPD_SWITCH", 2, {
                    expires: 864e8
                }),
                _hmt.push(["_trackEvent", "首页", "设置-发音语速-较快"])),
                t.set("soundSpdMode", i)
            }
        },
        soundPreferSwitch: function(e) {
            var o = $(e.currentTarget);
            if (!o.hasClass("sound-prefer-radio-checked")) {
                $(".sound-prefer-switch .sound-prefer-radio-checked").removeClass("sound-prefer-radio-checked"),
                o.addClass("sound-prefer-radio-checked");
                var i = o.attr("data-value");
                "en" === i ? (s.setCookie("SOUND_PREFER_SWITCH", 1, {
                    expires: 864e8
                }),
                _hmt.push(["_trackEvent", "首页", "设置-英语发音偏好-美式"])) : (s.setCookie("SOUND_PREFER_SWITCH", 0, {
                    expires: 864e8
                }),
                _hmt.push(["_trackEvent", "首页", "设置-英语发音偏好-英式"])),
                t.set("soundPreferMode", i)
            }
        },
        soundTriggerSwitch: function(e) {
            var s = $(e.currentTarget);
            if (!s.hasClass("sound-trigger-radio-checked")) {
                $(".sound-trigger-switch .sound-trigger-radio-checked").removeClass("sound-trigger-radio-checked"),
                s.addClass("sound-trigger-radio-checked");
                var o = s.attr("data-value");
                n.supportLocalStorage && localStorage.setItem("soundTrigger", o),
                _hmt.push(["_trackEvent", "首页", "设置-发音模式-" + o]),
                t.set("soundTriggerMode", o)
            }
        }
    };
    $(function() {
        d.init()
    })
});
;define("translation:widget/translate/translang/translang", function(t) {
    "use strict";
    t("translation:node_modules/react-app-polyfill/ie11"),
    t("translation:node_modules/react-app-polyfill/stable");
    var n = (t("translation:widget/common/environment"),
    t("translation:widget/translate/translang/fromlang"))
      , a = t("translation:widget/translate/translang/tolang")
      , e = t("translation:widget/translate/translang/exchange")
      , l = t("translation:widget/translate/translang/transbtn")
      , s = t("translation:widget/translate/translang/langPanelContainer.jsx")
      , i = {
        init: function() {
            this.bindEvents()
        },
        bindEvents: function() {
            $(".trans-operation-wrapper").on("click", ".select-from-language", $.proxy(this.clickFromBtn, this)).on("click", ".select-to-language", $.proxy(this.clickToBtn, this)).on("click", ".from-to-exchange", $.proxy(this.clickExchangeBtn, this)),
            $("#translate-button").on("click", $.proxy(this.clickTranslate, this)),
            $(".manual-trans-btn").on("click", function() {
                _hmt.push(["_trackEvent", "首页", "web端点击人工翻译按钮"])
            }),
            $(".manual-trans-btn .expert-logo").on("click", function() {
                _hmt.push(["_trackEvent", "首页", "web端点击人工翻译文字链左侧小人头像进入首页的次数"])
            }),
            $(document).on("click", $.proxy(this.clickBody, this))
        },
        clickFromBtn: function() {
            s.fromBtnClicked(),
            _hmt.push(["_trackEvent", "首页", "web端点击源语言button"])
        },
        clickToBtn: function() {
            s.toBtnClicked(),
            _hmt.push(["_trackEvent", "首页", "web端点击目标语言button"])
        },
        clickExchangeBtn: function() {
            e.clickExchangeBtn(),
            _hmt.push(["_trackEvent", "首页", "点击翻译方向切换箭头"])
        },
        clickTranslate: function() {
            l.transBtnClicked(),
            _hmt.push(["_trackEvent", "首页", "web端翻译button点击次数"])
        },
        clickBody: function(t) {
            var e = $(t.target);
            1 === s.getCurrLangType() && (e.hasClass("select-from-language") || e.parents(".select-from-language").length > 0 || e.hasClass("lang-panel-from") || e.parents(".lang-panel-from").length > 0) || n.hideFromWrap(),
            2 === s.getCurrLangType() && (e.hasClass("select-to-language") || e.parents(".select-to-language").length > 0 || e.hasClass("lang-panel-to") || e.parents(".lang-panel-to").length > 0) || a.hideToWrap()
        }
    };
    $(function() {
        i.init()
    })
});
;define("translation:widget/translate/zonedword/zonedword", function(o) {
    "use strict";
    var t = o("translation:widget/translate/zonedword/wordWrap")
      , n = (o("translation:widget/translate/input/sound"),
    o("translation:widget/common/soundURIGenerator"))
      , e = o("translation:widget/translate/details/dictionary/simplemeans")
      , i = o("translation:widget/translate/common/Drag")
      , s = o("translation:widget/common/cookie")
      , r = o("translation:widget/common/environment")
      , d = {
        init: function() {
            this.bindEvents(),
            window.windowW = $(window).outerWidth()
        },
        bindEvents: function() {
            var o = this;
            $(document).on("mouseup", ".trans-input-wrap", this.zonedwordIsMouseUp).on("mouseup", ".output-wrap", this.zonedwordIsMouseUp).on("mouseup", "#left-result-container", this.zonedwordIsMouseUp).on("mousedown", ".trans-input-wrap", $.proxy(this.zonedwordIsMouseDown, this)).on("mousedown", ".output-wrap", $.proxy(this.zonedwordIsMouseDown, this)).on("mousedown", "#left-result-container", $.proxy(this.zonedwordIsMouseDown, this)).on("click", $.proxy(this.documentIsClick, this)),
            $(window).on("resize", this.zonedwordIsHide),
            $("#zonedword-wrap").on("click", ".zonedword-close", this.onCloseZonedword).on("click", ".zonedword-setting-icon", this.toggleZoneWordOption).on("click", ".zonedword-switch", this.switchZoneword).on("click", ".zonedword-detail-link", this.onClickMore).on("click", ".op-sound", function() {
                o.onClickSound({
                    target: this
                })
            }).on("mouseenter", ".op-sound", function() {
                o.onSoundMouseOver({
                    target: this
                })
            }).on("mouseleave", ".op-sound", $.proxy(this.onSoundMouseOut, this)).on("click", function(o) {
                var t = $(o.target);
                t.hasClass("setting-options") || t.parents(".setting-options").length > 0 || $("#zonedword-wrap .setting-options").hide()
            }),
            this.bindDrag()
        },
        zonedwordIsMouseUp: function(o) {
            var n = r.get("isInFanyiWordMode")
              , e = $(this)
              , i = e.width()
              , s = e.height()
              , d = e.offset();
            n && o.pageX >= d.left && o.pageY >= d.top && o.pageX <= d.left + i && o.pageY <= d.top + s && t.showWrap(o)
        },
        zonedwordIsMouseDown: function(o) {
            t.rightClickHideWrap(o)
        },
        documentIsClick: function(o) {
            var n = $(o.target);
            n.parents("#zonedword-wrap").length > 0 || ($("#zonedword-wrap .setting-options").hide(),
            t.hideWrap())
        },
        onCloseZonedword: function() {
            t.hideWrap()
        },
        toggleZoneWordOption: function(o) {
            o.preventDefault(),
            o.stopPropagation(),
            $("#zonedword-wrap .setting-options").toggle()
        },
        switchZoneword: function(o) {
            o.preventDefault(),
            o.stopPropagation();
            var t = $(".zonedword-switch");
            t.toggleClass("setting-checked");
            var n;
            t.hasClass("setting-checked") ? (n = 1,
            r.set("isInFanyiWordMode", !0)) : (n = 0,
            r.set("isInFanyiWordMode", !1),
            _hmt.push(["_trackEvent", "首页", "Web点击划词翻译框关闭划词翻译功能"])),
            s.setCookie("FANYI_WORD_SWITCH", n, {
                expires: 864e8
            })
        },
        onClickSound: function(o) {
            e.judgeStopRepeat(),
            this.timer && clearTimeout(this.timer);
            var t = $(o.target)
              , i = n.generateURI({
                lan: t.attr("data-sound-lan"),
                text: t.attr("data-sound-text")
            });
            BTPM.setUrl(i);
            var s;
            t.addClass("op-sound-active"),
            s = setTimeout(function() {
                t.removeClass("op-sound-active"),
                clearTimeout(s)
            }, 2e3),
            "keywords" === r.get("zonewordQueryFrom") && _hmt.push(["_trackEvent", "首页", "Web重点词汇卡片highlight出划词翻译框发音按钮的发音次数"])
        },
        onSoundMouseOver: function(o) {
            if ("hover" === r.get("soundTriggerMode")) {
                var t = this;
                t.timer = setTimeout(function() {
                    t.onClickSound.call(t, o),
                    clearTimeout(t.timer)
                }, 500)
            }
        },
        onSoundMouseOut: function() {
            this.timer && clearTimeout(this.timer)
        },
        onClickMore: function() {
            t.hideWrap(),
            _hmt.push(["_trackEvent", "首页", "划词翻译框结果框“查看更多”"])
        },
        bindDrag: function() {
            new i(".zonedword-wrap",{
                moveId: ".zonedword-title"
            })
        },
        zonedwordIsHide: function() {
            var o = $(window).outerWidth();
            o < window.windowW && t.hideWrap(),
            window.windowW = o
        }
    };
    $(function() {
        d.init()
    })
});
;define("translation:widget/footer/banner/banner", function(n, t) {
    "use strict";
    function i() {
        var n = d.length;
        n > 0 && (e(),
        a(),
        c(n))
    }
    function e() {
        var n = o.find("a > img");
        n.each(function() {
            $(this).attr({
                src: $(this).attr("data-src")
            })
        })
    }
    function a() {
        d.eq(0).show()
    }
    function c(n) {
        var t = 0;
        if (n > 1) {
            var i = function() {
                var i = d.eq(t);
                t >= n - 1 ? t = 0 : t++;
                for (var e = d.eq(t), a = 0; n > a; a++)
                    d[a].style.visibility = a === t ? "visible" : "hidden";
                i.css("opacity", 0),
                e.css("opacity", 1)
            }
              , e = null;
            e = setInterval(i, 15e3)
        }
    }
    function r() {
        $(document).delegate(".spread-slide", "click", function(n) {
            var t = $(n.target).closest("a")
              , i = t.attr("data-index");
            s(i)
        }).on("click", ".spread-slide-close", function() {
            $(".spread-slide").hide()
        })
    }
    function s() {
        _hmt.push(["_trackEvent", "首页", "web端底部banner点击次数"])
    }
    t.init = function() {
        i(),
        r()
    }
    ;
    var o = $(".spread-wrap")
      , d = o.find("a")
});
;define("translation:widget/footer/copyright/copyright", function(t, n) {
    "use strict";
    function i() {
        $(".foot-manual-link").on("click", function() {
            _hmt.push(["_trackEvent", "首页", "web端底部人工翻译点击"])
        })
    }
    t("translation:widget/common/third_party/template");
    n.init = function() {
        i()
    }
});
;define("translation:widget/footer/extra/extra", function(n, t) {
    "use strict";
    function o() {
        var n = $(".manual-spread");
        return n.length > 0 && !n.hasClass("manual-spread-none") ? void e.css("top", .7 * $(window).height()) : void e.css("top", .5 * $(window).height()).show()
    }
    function i() {
        $(window).on("resize", o),
        s.on("click", a),
        c.on("click", function() {
            _hmt.push(["_trackEvent", "首页", "96_首页页面_右侧悬浮按钮点击"]),
            window.open("https://fanyi.baidu.com/appdownload/download.html")
        })
    }
    function a(n) {
        n.preventDefault(),
        $("html, body").animate({
            scrollTop: 0
        }, 250),
        _hmt.push(["_trackEvent", "index", "web端回到顶部按钮点击"])
    }
    n("translation:widget/common/util");
    t.init = function() {
        o(),
        i()
    }
    ;
    var e = $(".extra-wrap")
      , s = e.find(".backtotop-btn")
      , c = e.find(".sideQrContainer");
    $(window).on("scroll", function() {
        var n = $(document).scrollTop();
        n > 0 ? (s.css("display", "block"),
        c.css("display", "block"),
        _hmt.push(["_trackEvent", "首页", "95_首页页面_右侧悬浮按钮展现"])) : (s.hide(),
        c.hide())
    })
});
;define("translation:widget/footer/follow/follow", function(o, t) {
    "use strict";
    function i() {
        $("#follow-btns").on("click", a),
        $("#fdialog-wrap").on("click", l)
    }
    function a(o) {
        var t = $(o.target)
          , i = t.attr("data-pos");
        if ("0" !== i) {
            var a = t.attr("title");
            if ("undefined" != typeof i) {
                3 !== +i && n(+i);
                var l = "Web翻译" + a + "点击";
                _hmt.push(["_trackEvent", "follow icons", l])
            }
        }
    }
    function n(o) {
        $(".fdialog-cont").addClass("hide"),
        $(".cont-" + o).removeClass("hide"),
        $("#follow-dialog").removeClass("hide")
    }
    function l(o) {
        var t = o.target;
        return t === this || t === $("#fdialog-close").get(0) ? ($("#follow-dialog").addClass("hide"),
        o.stopPropagation(),
        !1) : void 0
    }
    t.init = function() {
        i()
    }
});
;define("translation:widget/footer/footer", function(n) {
    "use strict";
    var t = (n("translation:widget/translate/input/dataTransfer"),
    $("#main-outer"),
    $("#preview-img"),
    $(".footer"))
      , e = (1 + $(".header").innerHeight() + t.innerHeight(),
    {
        init: function() {
            this.bindEvent(),
            this.documentIsChange()
        },
        bindEvent: function() {
            $(window).on("resize", this.documentIsChange).on("hashchange", this.documentIsChange)
        },
        documentIsChange: function() {}
    });
    $(function() {
        e.init()
    })
});
