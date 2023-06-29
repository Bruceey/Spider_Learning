g = xt("#showId").val();


xt = function (a, c) {
    return new xt.fn.init(a, c)
}


var Dt, jt = a.document, Lt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, Ht = xt.fn.init = function (a, c) {
    var h, g;
    if (!a)
        return this;
    if ("string" == typeof a) {
        if (h = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : Lt.exec(a),
        !h || !h[1] && c)
            return !c || c.jquery ? (c || Dt).find(a) : this.constructor(c).find(a);
        if (h[1]) {
            if (c = c instanceof xt ? c[0] : c,
                xt.merge(this, xt.parseHTML(h[1], c && c.nodeType ? c.ownerDocument || c : jt, !0)),
            St.test(h[1]) && xt.isPlainObject(c))
                for (h in c)
                    xt.isFunction(this[h]) ? this[h](c[h]) : this.attr(h, c[h]);
            return this
        }
        if (g = jt.getElementById(h[2]),
        g && g.parentNode) {
            if (g.id !== h[2])
                return Dt.find(a);
            this.length = 1,
                this[0] = g
        }
        return this.context = jt,
            this.selector = a,
            this
    }
}