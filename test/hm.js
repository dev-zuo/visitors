(function() {
    var h = {}
      , mt = {}
      , c = {
        id: "183281668cc3440449274d1f93c04de6",
        dm: ["zuo11.com"],
        js: "tongji.baidu.com/hm-web/js/",
        etrk: [],
        cetrk: [],
        cptrk: [],
        icon: '',
        ctrk: [],
        vdur: 1800000,
        age: 31536000000,
        qiao: 0,
        pt: 0,
        spa: 0,
        aet: '',
        hca: '62D91064B0709B79',
        ab: 0,
        apps: ''
    };
    var t = void 0
      , v = !0
      , w = null
      , x = !1;
    mt.cookie = {};
    mt.cookie.set = function(a, e, b) {
        var d;
        b.P && (d = new Date,
        d.setTime(d.getTime() + b.P));
        document.cookie = a + "=" + e + (b.domain ? "; domain=" + b.domain : "") + (b.path ? "; path=" + b.path : "") + (d ? "; expires=" + d.toGMTString() : "") + (b.zc ? "; secure" : "")
    }
    ;
    mt.cookie.get = function(a) {
        return (a = RegExp("(^| )" + a + "=([^;]*)(;|$)").exec(document.cookie)) ? a[2] : w
    }
    ;
    mt.cookie.Zb = function(a, e) {
        try {
            var b = "Hm_ck_" + +new Date;
            mt.cookie.set(b, "42", {
                domain: a,
                path: e,
                P: t
            });
            var d = "42" === mt.cookie.get(b) ? "1" : "0";
            mt.cookie.set(b, "", {
                domain: a,
                path: e,
                P: -1
            });
            return d
        } catch (g) {
            return "0"
        }
    }
    ;
    mt.lang = {};
    mt.lang.m = function(a, e) {
        return "[object " + e + "]" === {}.toString.call(a)
    }
    ;
    mt.lang.o = function(a) {
        return mt.lang.m(a, "Function")
    }
    ;
    mt.lang.g = function(a) {
        return mt.lang.m(a, "Object")
    }
    ;
    mt.lang.Qa = function(a) {
        return mt.lang.m(a, "Number") && isFinite(a)
    }
    ;
    mt.lang.I = function(a) {
        return mt.lang.m(a, "String")
    }
    ;
    mt.lang.isArray = function(a) {
        return mt.lang.m(a, "Array")
    }
    ;
    mt.lang.h = function(a) {
        return a.replace ? a.replace(/'/g, "'0").replace(/\*/g, "'1").replace(/!/g, "'2") : a
    }
    ;
    mt.lang.trim = function(a) {
        return a.replace(/^\s+|\s+$/g, "")
    }
    ;
    mt.lang.find = function(a, e, b) {
        if (mt.lang.isArray(a) && mt.lang.o(e))
            for (var d = a.length, g = 0; g < d; g++)
                if (g in a && e.call(b || a, a[g], g))
                    return a[g];
        return w
    }
    ;
    mt.lang.H = function(a, e) {
        return mt.lang.find(a, function(b) {
            return b === e
        }) != w
    }
    ;
    mt.lang.filter = function(a, e) {
        var b = -1
          , d = 0
          , g = a == w ? 0 : a.length
          , q = [];
        if (mt.lang.o(e))
            for (; ++b < g; ) {
                var f = a[b];
                e(f, b, a) && (q[d++] = f)
            }
        return q
    }
    ;
    mt.lang.unique = function(a, e) {
        var b = a.length, d = a.slice(0), g, q;
        for (mt.lang.o(e) || (e = function(d, b) {
            return d === b
        }
        ); 0 < --b; ) {
            q = d[b];
            for (g = b; g--; )
                if (e(q, d[g])) {
                    d.splice(b, 1);
                    break
                }
        }
        return d
    }
    ;
    mt.lang.yc = function(a, e) {
        function b(b) {
            b = (d + d + Number(b).toString(2)).slice(-64);
            return [parseInt(b.slice(0, 32), 2), parseInt(b.slice(-32), 2)]
        }
        var d = "00000000000000000000000000000000"
          , g = b(a)
          , q = b(e);
        return parseInt((d + ((g[0] | q[0]) >>> 0).toString(2)).slice(-32) + (d + ((g[1] | q[1]) >>> 0).toString(2)).slice(-32), 2)
    }
    ;
    mt.url = {};
    mt.url.i = function(a, e) {
        var b = a.match(RegExp("(^|&|\\?|#)(" + e + ")=([^&#]*)(&|$|#)", ""));
        return b ? b[3] : w
    }
    ;
    mt.url.Eb = function(a) {
        return (a = a.match(/^(https?:\/\/)?([^\/\?#]*)/)) ? a[2].replace(/.*@/, "") : w
    }
    ;
    mt.url.pa = function(a) {
        return (a = mt.url.Eb(a)) ? a.replace(/:\d+$/, "") : a
    }
    ;
    mt.url.Wb = function(a) {
        var e = document.location.href
          , e = e.replace(/^https?:\/\//, "");
        return 0 === e.indexOf(a)
    }
    ;
    mt.url.Xb = function(a, e) {
        a = "." + a.replace(/:\d+/, "");
        e = "." + e.replace(/:\d+/, "");
        var b = a.indexOf(e);
        return -1 < b && b + e.length === a.length
    }
    ;
    (function() {
        var a = mt.lang
          , e = mt.url;
        mt.e = {};
        mt.e.wb = function(b) {
            return document.getElementById(b)
        }
        ;
        mt.e.na = function(b) {
            if (!b)
                return w;
            try {
                b = String(b);
                if (0 === b.indexOf("!HMCQ!"))
                    return b;
                if (0 === b.indexOf("!HMCC!"))
                    return document.querySelector(b.substring(6, b.length));
                for (var d = b.split(">"), a = document.body, e = d.length - 1; 0 <= e; e--)
                    if (-1 < d[e].indexOf("#")) {
                        var f = d[e].split("#")[1];
                        (a = document.getElementById(f)) || (a = document.getElementById(decodeURIComponent(f)));
                        d = d.splice(e + 1, d.length - (e + 1));
                        break
                    }
                for (b = 0; a && b < d.length; ) {
                    var k = String(d[b]).toLowerCase();
                    if (!("html" === k || "body" === k)) {
                        var e = 0
                          , r = d[b].match(/\[(\d+)\]/i)
                          , f = [];
                        if (r)
                            e = r[1] - 1,
                            k = k.split("[")[0];
                        else if (1 !== a.childNodes.length) {
                            for (var n = 0, u = 0, p = a.childNodes.length; u < p; u++) {
                                var m = a.childNodes[u];
                                1 === m.nodeType && m.nodeName.toLowerCase() === k && n++;
                                if (1 < n)
                                    return w
                            }
                            if (1 !== n)
                                return w
                        }
                        for (n = 0; n < a.childNodes.length; n++)
                            1 === a.childNodes[n].nodeType && a.childNodes[n].nodeName.toLowerCase() === k && f.push(a.childNodes[n]);
                        if (!f[e])
                            return w;
                        a = f[e]
                    }
                    b++
                }
                return a
            } catch (s) {
                return w
            }
        }
        ;
        mt.e.Ka = function(b, d) {
            var a = []
              , e = [];
            if (!b)
                return e;
            for (; b.parentNode != w; ) {
                for (var f = 0, k = 0, r = b.parentNode.childNodes.length, n = 0; n < r; n++) {
                    var u = b.parentNode.childNodes[n];
                    if (u.nodeName === b.nodeName && (f++,
                    u === b && (k = f),
                    0 < k && 1 < f))
                        break
                }
                if ((r = "" !== b.id) && d) {
                    a.unshift("#" + encodeURIComponent(b.id));
                    break
                } else
                    r && (r = "#" + encodeURIComponent(b.id),
                    r = 0 < a.length ? r + ">" + a.join(">") : r,
                    e.push(r)),
                    a.unshift(encodeURIComponent(String(b.nodeName).toLowerCase()) + (1 < f ? "[" + k + "]" : ""));
                b = b.parentNode
            }
            e.push(a.join(">"));
            return e
        }
        ;
        mt.e.qa = function(b) {
            return (b = mt.e.Ka(b, v)) && b.length ? String(b[0]) : ""
        }
        ;
        mt.e.Hb = function(b) {
            return mt.e.Ka(b, x)
        }
        ;
        mt.e.xb = function(b) {
            var d;
            for (d = "A"; (b = b.parentNode) && 1 == b.nodeType; )
                if (b.tagName == d)
                    return b;
            return w
        }
        ;
        mt.e.Ab = function(b) {
            return 9 === b.nodeType ? b : b.ownerDocument || b.document
        }
        ;
        mt.e.Fb = function(b) {
            var d = {
                top: 0,
                left: 0
            };
            if (!b)
                return d;
            var a = mt.e.Ab(b).documentElement;
            "undefined" !== typeof b.getBoundingClientRect && (d = b.getBoundingClientRect());
            return {
                top: d.top + (window.pageYOffset || a.scrollTop) - (a.clientTop || 0),
                left: d.left + (window.pageXOffset || a.scrollLeft) - (a.clientLeft || 0)
            }
        }
        ;
        mt.e.getAttribute = function(b, d) {
            var a = b.getAttribute && b.getAttribute(d) || w;
            if (!a && b.attributes && b.attributes.length)
                for (var e = b.attributes, f = e.length, k = 0; k < f; k++)
                    e[k].nodeName === d && (a = e[k].nodeValue);
            return a
        }
        ;
        mt.e.R = function(a) {
            var d = "document";
            a.tagName !== t && (d = a.tagName);
            return d.toLowerCase()
        }
        ;
        mt.e.Kb = function(b) {
            var d = "";
            b.textContent ? d = a.trim(b.textContent) : b.innerText && (d = a.trim(b.innerText));
            d && (d = d.replace(/\s+/g, " ").substring(0, 255));
            return d
        }
        ;
        mt.e.Q = function(b, d) {
            var g;
            a.I(b) && 0 === String(b).indexOf("!HMCQ!") ? (g = String(b),
            g = e.i(document.location.href, g.substring(6, g.length))) : a.I(b) || (g = mt.e.R(b),
            "input" === g && d && ("button" === b.type || "submit" === b.type) ? g = a.trim(b.value) || "" : "input" === g && !d && "password" !== b.type ? g = a.trim(b.value) || "" : "img" === g ? (g = mt.e.getAttribute,
            g = g(b, "alt") || g(b, "title") || g(b, "src")) : g = "body" === g || "html" === g ? ["(hm-default-content-for-", g, ")"].join("") : mt.e.Kb(b));
            return String(g || "").substring(0, 255)
        }
        ;
        (function() {
            (mt.e.bc = function() {
                function a() {
                    if (!a.ba) {
                        a.ba = v;
                        for (var d = 0, e = q.length; d < e; d++)
                            q[d]()
                    }
                }
                function d() {
                    try {
                        document.documentElement.doScroll("left")
                    } catch (e) {
                        setTimeout(d, 1);
                        return
                    }
                    a()
                }
                var e = x, q = [], f;
                document.addEventListener ? f = function() {
                    document.removeEventListener("DOMContentLoaded", f, x);
                    a()
                }
                : document.attachEvent && (f = function() {
                    "complete" === document.readyState && (document.detachEvent("onreadystatechange", f),
                    a())
                }
                );
                (function() {
                    if (!e)
                        if (e = v,
                        "complete" === document.readyState)
                            a.ba = v;
                        else if (document.addEventListener)
                            document.addEventListener("DOMContentLoaded", f, x),
                            window.addEventListener("load", a, x);
                        else if (document.attachEvent) {
                            document.attachEvent("onreadystatechange", f);
                            window.attachEvent("onload", a);
                            var k = x;
                            try {
                                k = window.frameElement == w
                            } catch (r) {}
                            document.documentElement.doScroll && k && d()
                        }
                }
                )();
                return function(d) {
                    a.ba ? d() : q.push(d)
                }
            }()).ba = x
        }
        )();
        return mt.e
    }
    )();
    mt.event = {};
    mt.event.d = function(a, e, b) {
        a.attachEvent ? a.attachEvent("on" + e, function(d) {
            b.call(a, d)
        }) : a.addEventListener && a.addEventListener(e, b, x)
    }
    ;
    (function() {
        var a = mt.event;
        mt.f = {};
        mt.f.Pa = /msie (\d+\.\d+)/i.test(navigator.userAgent);
        mt.f.cookieEnabled = navigator.cookieEnabled;
        mt.f.javaEnabled = navigator.javaEnabled();
        mt.f.language = navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || "";
        mt.f.ec = (window.screen.width || 0) + "x" + (window.screen.height || 0);
        mt.f.colorDepth = window.screen.colorDepth || 0;
        mt.f.Jb = function() {
            var a;
            a = a || document;
            return parseInt(window.pageYOffset || a.documentElement.scrollTop || a.body && a.body.scrollTop || 0, 10)
        }
        ;
        mt.f.Ma = function() {
            var a = document;
            return parseInt(window.innerHeight || a.documentElement.clientHeight || a.body && a.body.clientHeight || 0, 10)
        }
        ;
        mt.f.G = function() {
            return mt.f.Jb() + mt.f.Ma()
        }
        ;
        mt.f.eb = 0;
        mt.f.Lb = function() {
            var a = document;
            return parseInt(window.innerWidth || a.documentElement.clientWidth || a.body.offsetWidth || 0, 10)
        }
        ;
        mt.f.orientation = 0;
        (function() {
            function e() {
                var a = 0;
                window.orientation !== t && (a = window.orientation);
                screen && (screen.orientation && screen.orientation.angle !== t) && (a = screen.orientation.angle);
                mt.f.orientation = a;
                mt.f.eb = mt.f.Lb()
            }
            e();
            a.d(window, "orientationchange", e)
        }
        )();
        return mt.f
    }
    )();
    mt.A = {};
    mt.A.parse = function(a) {
        return (new Function("return (" + a + ")"))()
    }
    ;
    mt.A.stringify = function() {
        function a(a) {
            /["\\\x00-\x1f]/.test(a) && (a = a.replace(/["\\\x00-\x1f]/g, function(a) {
                var d = b[a];
                if (d)
                    return d;
                d = a.charCodeAt();
                return "\\u00" + Math.floor(d / 16).toString(16) + (d % 16).toString(16)
            }));
            return '"' + a + '"'
        }
        function e(a) {
            return 10 > a ? "0" + a : a
        }
        var b = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
        return function(d) {
            switch (typeof d) {
            case "undefined":
                return "undefined";
            case "number":
                return isFinite(d) ? String(d) : "null";
            case "string":
                return a(d);
            case "boolean":
                return String(d);
            default:
                if (d === w)
                    return "null";
                if (d instanceof Array) {
                    var b = ["["], q = d.length, f, k, r;
                    for (k = 0; k < q; k++)
                        switch (r = d[k],
                        typeof r) {
                        case "undefined":
                        case "function":
                        case "unknown":
                            break;
                        default:
                            f && b.push(","),
                            b.push(mt.A.stringify(r)),
                            f = 1
                        }
                    b.push("]");
                    return b.join("")
                }
                if (d instanceof Date)
                    return '"' + d.getFullYear() + "-" + e(d.getMonth() + 1) + "-" + e(d.getDate()) + "T" + e(d.getHours()) + ":" + e(d.getMinutes()) + ":" + e(d.getSeconds()) + '"';
                f = ["{"];
                k = mt.A.stringify;
                for (q in d)
                    if (Object.prototype.hasOwnProperty.call(d, q))
                        switch (r = d[q],
                        typeof r) {
                        case "undefined":
                        case "unknown":
                        case "function":
                            break;
                        default:
                            b && f.push(","),
                            b = 1,
                            f.push(k(q) + ":" + k(r))
                        }
                f.push("}");
                return f.join("")
            }
        }
    }();
    mt.localStorage = {};
    mt.localStorage.ga = function() {
        if (!mt.localStorage.j)
            try {
                mt.localStorage.j = document.createElement("input"),
                mt.localStorage.j.type = "hidden",
                mt.localStorage.j.style.display = "none",
                mt.localStorage.j.addBehavior("#default#userData"),
                document.getElementsByTagName("head")[0].appendChild(mt.localStorage.j)
            } catch (a) {
                return x
            }
        return v
    }
    ;
    mt.localStorage.set = function(a, e, b) {
        var d = new Date;
        d.setTime(d.getTime() + (b || 31536E6));
        try {
            window.localStorage ? (e = d.getTime() + "|" + e,
            window.localStorage.setItem(a, e)) : mt.localStorage.ga() && (mt.localStorage.j.expires = d.toUTCString(),
            mt.localStorage.j.load(document.location.hostname),
            mt.localStorage.j.setAttribute(a, e),
            mt.localStorage.j.save(document.location.hostname))
        } catch (g) {}
    }
    ;
    mt.localStorage.get = function(a) {
        if (window.localStorage) {
            if (a = window.localStorage.getItem(a)) {
                var e = a.indexOf("|")
                  , b = a.substring(0, e) - 0;
                if (b && b > (new Date).getTime())
                    return a.substring(e + 1)
            }
        } else if (mt.localStorage.ga())
            try {
                return mt.localStorage.j.load(document.location.hostname),
                mt.localStorage.j.getAttribute(a)
            } catch (d) {}
        return w
    }
    ;
    mt.localStorage.remove = function(a) {
        if (window.localStorage)
            window.localStorage.removeItem(a);
        else if (mt.localStorage.ga())
            try {
                mt.localStorage.j.load(document.location.hostname),
                mt.localStorage.j.removeAttribute(a),
                mt.localStorage.j.save(document.location.hostname)
            } catch (e) {}
    }
    ;
    mt.sessionStorage = {};
    mt.sessionStorage.set = function(a, e) {
        try {
            window.sessionStorage && window.sessionStorage.setItem(a, e)
        } catch (b) {}
    }
    ;
    mt.sessionStorage.get = function(a) {
        try {
            return window.sessionStorage ? window.sessionStorage.getItem(a) : w
        } catch (e) {
            return w
        }
    }
    ;
    mt.sessionStorage.remove = function(a) {
        try {
            window.sessionStorage && window.sessionStorage.removeItem(a)
        } catch (e) {}
    }
    ;
    (function() {
        var a = mt.A;
        mt.N = {};
        mt.N.log = function(a, b) {
            var d = new Image
              , g = "mini_tangram_log_" + Math.floor(2147483648 * Math.random()).toString(36);
            window[g] = d;
            d.onload = function() {
                d.onload = w;
                d = window[g] = w;
                b && b(a)
            }
            ;
            d.src = a
        }
        ;
        mt.N.get = function(a, b) {
            return mt.N.jb({
                url: a,
                method: "GET",
                data: b.data,
                timeout: b.timeout,
                noCache: v,
                success: b.success,
                fail: b.fail
            })
        }
        ;
        mt.N.jb = function(e) {
            function b(l) {
                var d = e[l];
                if (d)
                    if (u && clearTimeout(u),
                    "success" !== l)
                        d && d(n);
                    else {
                        var b;
                        try {
                            b = a.parse(n.responseText)
                        } catch (p) {
                            d && d(n);
                            return
                        }
                        d && d(n, b)
                    }
            }
            e = e || {};
            var d = function(l) {
                var a = [], d;
                for (d in l)
                    l.hasOwnProperty(d) && a.push(encodeURIComponent(d) + "=" + encodeURIComponent(l[d]));
                return a.join("&")
            }(e.data || {}), g = e.url, q = (e.method || "GET").toUpperCase(), f = e.headers || {}, k = e.timeout || 0, r = e.noCache || x, n, u;
            try {
                a: if (window.XMLHttpRequest)
                    n = new XMLHttpRequest;
                else {
                    try {
                        n = new ActiveXObject("Microsoft.XMLHTTP");
                        break a
                    } catch (p) {}
                    n = t
                }
                "GET" === q && (d && (g += (0 <= g.indexOf("?") ? "&" : "?") + d,
                d = w),
                r && (g += (0 <= g.indexOf("?") ? "&" : "?") + "b" + +new Date + "=1"));
                n.open(q, g, v);
                n.onreadystatechange = function() {
                    if (4 === n.readyState) {
                        var l = 0;
                        try {
                            l = n.status
                        } catch (a) {
                            b("fail");
                            return
                        }
                        200 <= l && 300 > l || 304 === l || 1223 === l ? b("success") : b("fail")
                    }
                }
                ;
                for (var m in f)
                    f.hasOwnProperty(m) && n.setRequestHeader(m, f[m]);
                k && (u = setTimeout(function() {
                    n.onreadystatechange = function() {}
                    ;
                    n.abort();
                    b("fail")
                }, k));
                n.send(d)
            } catch (s) {
                b("fail")
            }
            return n
        }
        ;
        return mt.N
    }
    )();
    h.D = {
        xc: "http://tongji.baidu.com/hm-web/welcome/ico",
        Ya: "hm.baidu.com/hm.gif",
        kb: /^(tongji|hmcdn).baidu.com$/,
        oc: "tongji.baidu.com",
        Pb: "hmmd",
        Qb: "hmpl",
        rc: "utm_medium",
        Ob: "hmkw",
        tc: "utm_term",
        Mb: "hmci",
        qc: "utm_content",
        Rb: "hmsr",
        sc: "utm_source",
        Nb: "hmcu",
        pc: "utm_campaign",
        Ra: 0,
        O: Math.round(+new Date / 1E3),
        protocol: "https:" === document.location.protocol ? "https:" : "http:",
        va: "https:",
        uc: 6E5,
        fc: 5E3,
        vc: 5,
        Ia: 1024,
        xa: 2147483647,
        cb: "hca cc cf ci ck cl cm cp cu cw ds vl ep et ja ln lo lt rnd si su v cv lv api sn r ww p ct u tt".split(" "),
        S: v,
        Ea: {
            id: "data-hm-id",
            X: "data-hm-class",
            W: "data-hm-xpath",
            content: "data-hm-content",
            da: "data-hm-tag",
            link: "data-hm-link"
        },
        Ga: "data-hm-enabled",
        Fa: "data-hm-disabled",
        ac: "https://hmcdn.baidu.com/static/tongji/plugins/",
        Xa: ["UrlChangeTracker"]
    };
    (function() {
        var a = {
            F: {},
            d: function(a, b) {
                this.F[a] = this.F[a] || [];
                this.F[a].push(b)
            },
            L: function(a, b) {
                this.F[a] = this.F[a] || [];
                for (var d = this.F[a].length, g = 0; g < d; g++)
                    this.F[a][g](b)
            }
        };
        return h.z = a
    }
    )();
    (function() {
        var a = mt.lang
          , e = /^https?:\/\//
          , b = {
            zb: function(a) {
                var b;
                try {
                    b = JSON.parse(decodeURIComponent(a[0]))
                } catch (e) {}
                return b
            },
            Sa: function(a, e) {
                return b.Ta(h.c && h.c.b && h.c.b.u, a, e) || b.Ta(document.location.href, a, e)
            },
            Ta: function(a, b, q) {
                if (a === t)
                    return x;
                e.test(b) || (a = a.replace(e, ""));
                b = b.replace(/\/$/, "");
                a = a.replace(/\/$/, "");
                q && (a = a.replace(/^(https?:\/\/)?www\./, "$1"));
                return RegExp("^" + b.replace(/[?.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$").test(a)
            },
            $: function(d, e) {
                var q = b.zb(d);
                if (!a.m(q, "Undefined")) {
                    if (a.isArray(q)) {
                        for (var f = 0; f < q.length; f++)
                            if (b.Sa(q[f], e))
                                return v;
                        return x
                    }
                    if (a.g(q)) {
                        var f = [], k;
                        for (k in q)
                            q.hasOwnProperty(k) && b.Sa(k, e) && (f = f.concat(q[k]));
                        return f
                    }
                }
            }
        };
        return h.ka = b
    }
    )();
    (function() {
        function a(a, d) {
            var g = document.createElement("script");
            g.charset = "utf-8";
            e.o(d) && (g.readyState ? g.onreadystatechange = function() {
                if ("loaded" === g.readyState || "complete" === g.readyState)
                    g.onreadystatechange = w,
                    d()
            }
            : g.onload = function() {
                d()
            }
            );
            g.src = a;
            var q = document.getElementsByTagName("script")[0];
            q.parentNode.insertBefore(g, q)
        }
        var e = mt.lang;
        return h.load = a
    }
    )();
    (function() {
        var a = mt.url
          , e = mt.cookie
          , b = mt.localStorage
          , d = mt.sessionStorage
          , g = {
            getData: function(a) {
                try {
                    return e.get(a) || d.get(a) || b.get(a)
                } catch (f) {}
            },
            setData: function(a, f, k) {
                try {
                    e.set(a, f, {
                        domain: g.aa(),
                        path: g.ma(),
                        P: k
                    }),
                    k ? b.set(a, f, k) : d.set(a, f)
                } catch (r) {}
            },
            removeData: function(a) {
                try {
                    e.set(a, "", {
                        domain: g.aa(),
                        path: g.ma(),
                        P: -1
                    }),
                    d.remove(a),
                    b.remove(a)
                } catch (f) {}
            },
            aa: function() {
                for (var d = document.location.hostname, b = 0, e = c.dm.length; b < e; b++)
                    if (a.Xb(d, c.dm[b]))
                        return c.dm[b].replace(/(:\d+)?[/?#].*/, "");
                return d
            },
            ma: function() {
                for (var d = 0, b = c.dm.length; d < b; d++) {
                    var e = c.dm[d];
                    if (-1 < e.indexOf("/") && a.Wb(e))
                        return e.replace(/^[^/]+(\/.*)/, "$1") + "/"
                }
                return "/"
            }
        };
        return h.Y = g
    }
    )();
    (function() {
        var a = mt.lang
          , e = mt.A
          , b = h.Y
          , d = {
            pageview: {},
            session: {},
            autoEventTracking: {},
            customEvent: {},
            user: {}
        }
          , g = {
            user: 1,
            session: 2,
            pageview: 3,
            autoEventTracking: 3,
            customEvent: 3,
            others: 3
        }
          , q = ["session", "user"]
          , f = "Hm_up_" + c.id
          , k = {
            init: function() {
                k.Ub()
            },
            Ub: function() {
                try {
                    var g = e.parse(decodeURIComponent(b.getData(f)));
                    a.g(g) && (d.user = g)
                } catch (n) {}
            },
            w: function(a) {
                var b = {};
                d[a] !== t && (b = d[a]);
                a = this.ra();
                for (var e in b)
                    b.hasOwnProperty(e) && (a[e] = b[e]);
                return a
            },
            ra: function() {
                for (var a = {}, b, e = q.length - 1; 0 <= e; e--) {
                    b = d[q[e]];
                    for (var p in b)
                        b.hasOwnProperty(p) && (a[p] = b[p])
                }
                return a
            },
            setProperty: function(b, n, g) {
                var p = d[b];
                if (a.g(p) && a.g(n)) {
                    for (var m in n)
                        if (n.hasOwnProperty(m)) {
                            var f = a.h(String(m));
                            if (g || !/^_/.test(f) && !/_$/.test(f) || /^(_iden|ei_|ec_|ex_|en_|et_|el_)$/.test(f)) {
                                var l = n[m];
                                if (l == w)
                                    delete p[f];
                                else {
                                    if (a.g(l) || a.isArray(l))
                                        l = e.stringify(l);
                                    l = a.h(String(l));
                                    k.Yb(b, f, l) && (p[f] = {
                                        value: l,
                                        scope: k.La(b)
                                    })
                                }
                            }
                        }
                    "user" === b && k.za()
                }
            },
            s: function(b) {
                b !== t && ("userId" === b && a.g(d.user) ? (delete d.user.uid_,
                k.za()) : "user" === b && a.g(d.user) ? (b = d.user.uid_,
                d.user = b === t ? {} : {
                    uid_: b
                },
                k.za()) : d[b] !== t && (d[b] = {}))
            },
            za: function() {
                try {
                    b.setData(f, encodeURIComponent(e.stringify(d.user)), c.age)
                } catch (a) {}
            },
            Yb: function(a, b, e) {
                var p = v
                  , m = d[a];
                if (256 < encodeURIComponent(String(b)).length || 256 < encodeURIComponent(String(e)).length)
                    p = x;
                else {
                    var g = m[b];
                    m[b] = {
                        value: e,
                        scope: k.La(a)
                    };
                    a = k.K(k.w(a));
                    2048 < encodeURIComponent(a).length && (g !== t ? m[b] = g : delete m[b],
                    p = x)
                }
                return p
            },
            K: function(a) {
                var b = [], d, e;
                for (e in a)
                    a.hasOwnProperty(e) && (d = [e, a[e].value],
                    (1 === a[e].scope || 2 === a[e].scope) && d.push(a[e].scope),
                    b.push(d.join("*")));
                return b.join("!")
            },
            La: function(a) {
                a = g[a];
                return a !== t ? a : g.others
            }
        };
        return h.M = k
    }
    )();
    (function() {
        var a = mt.e
          , e = mt.lang
          , b = h.z
          , d = h.ka
          , g = h.M
          , q = g.K;
        if (e.isArray(c.cptrk) && 0 < c.cptrk.length) {
            var f = {
                Wa: {},
                ea: {},
                init: function() {
                    for (var a, b = d.$(c.cptrk) || [], g = 0; g < b.length; g++)
                        if (a = b[g],
                        a.a !== t && e.g(a.a)) {
                            a = a.a;
                            for (var q in a)
                                a.hasOwnProperty(q) && (f.ea[q] = String(a[q]))
                        }
                },
                Va: function() {
                    var b, d, e;
                    for (e in f.ea)
                        if (f.ea.hasOwnProperty(e) && f.Wa[e] === t && (b = f.ea[e],
                        b = a.na(b)))
                            d = d === t ? {} : d,
                            d[e] = a.Q(b, x),
                            f.Wa[e] = v;
                    return d
                },
                ta: function() {
                    var a = f.Va();
                    a && f.hc(a)
                },
                Tb: function() {
                    "MutationObserver"in window && document.body ? (new MutationObserver(f.ta)).observe(document.body, {
                        childList: v,
                        subtree: v
                    }) : window.setInterval(f.ta, 15E3)
                },
                hc: function(a) {
                    if (e.g(a)) {
                        g.setProperty("pageview", a);
                        a = h.c.b.p;
                        var b = h.c.b.ep;
                        h.c.b.et = 9;
                        h.c.b.ep = "";
                        h.c.b.p = q(g.w("pageview"));
                        h.c.n();
                        h.c.b.p = a;
                        h.c.b.ep = b;
                        g.s("pageview")
                    }
                }
            };
            f.init();
            b.d("pv-b", function() {
                var a = f.Va();
                a && g.setProperty("pageview", a)
            });
            f.Tb();
            a.bc(f.ta)
        }
    }
    )();
    (function() {
        var a = mt.lang
          , e = mt.e
          , b = h.ka
          , d = {
            Z: function(a, q) {
                return function(f) {
                    var k = f.target || f.srcElement;
                    if (k) {
                        var r = b.$(q) || []
                          , n = k.getAttribute(a.fa);
                        f = f.clientX + ":" + f.clientY;
                        if (n && n === f)
                            k.removeAttribute(a.fa);
                        else if (0 < r.length && (k = e.Hb(k)) && k.length)
                            if (r = k.length,
                            n = k[k.length - 1],
                            1E4 > r * n.split(">").length)
                                for (n = 0; n < r; n++)
                                    d.bb(a, k[n]);
                            else
                                d.bb(a, n)
                    }
                }
            },
            bb: function(b, d) {
                for (var e = {}, k = String(d).split(">").length, r = 0; r < k; r++)
                    e[d] = "",
                    d = d.substring(0, d.lastIndexOf(">"));
                b && (a.g(b) && b.Ha) && b.Ha(e)
            },
            dc: function(a, b) {
                return function(d) {
                    (d.target || d.srcElement).setAttribute(a.fa, d.clientX + ":" + d.clientY);
                    a && a.t && (b ? a.t(b) : a.t("#" + encodeURIComponent(this.id), d.type))
                }
            }
        };
        return h.sb = d
    }
    )();
    (function() {
        var a = mt.e
          , e = mt.event
          , b = mt.lang
          , d = h.D
          , g = h.ka
          , q = h.sb
          , f = h.M
          , k = f.K
          , r = {
            fa: "HM_ce",
            fb: function() {
                if (c.cetrk && 0 < c.cetrk.length) {
                    e.d(document, "click", q.Z(r, c.cetrk));
                    for (var b = g.$(c.cetrk) || [], d = 0, p = b.length; d < p; d++) {
                        var m = b[d]
                          , f = m.p || "";
                        -1 === f.indexOf(">") && (0 === f.indexOf("#") && (f = f.substring(1)),
                        (f = a.wb(f)) && e.d(f, "click", q.dc(r, m)))
                    }
                }
            },
            Ha: function(a) {
                for (var b = g.$(c.cetrk) || [], d = 0; d < b.length; d++) {
                    var e = b[d]
                      , f = r.Cb(e.p, a);
                    f && r.t(e, f)
                }
            },
            Cb: function(a, b) {
                a = String(a);
                if (0 < a.indexOf("*")) {
                    var d = RegExp("^" + a.replace(/\[/g, "\\[").replace(/\]/g, "\\]").replace(/\*/, "\\d+") + "$"), e;
                    for (e in b)
                        if (b.hasOwnProperty(e) && d.test(e))
                            return e;
                    return w
                }
                return b.hasOwnProperty(a) ? a : w
            },
            t: function(d, e) {
                h.c.b.et = 7;
                var p = d && d.k || ""
                  , p = b.h(p)
                  , m = {};
                if (d && d.a && b.g(d.a)) {
                    var g = d.a, l;
                    for (l in g)
                        if (g.hasOwnProperty(l)) {
                            var y = r.Ib(g[l] || "", e)
                              , y = y ? a.Q(y, x) : "";
                            m[l] = y
                        }
                }
                m = r.yb(m, e || d && d.p);
                m._iden = p;
                f.setProperty("customEvent", m);
                h.c.b.ep = "";
                h.c.b.p = k(f.w("customEvent"));
                h.c.n();
                h.c.b.p = "";
                f.s("customEvent")
            },
            yb: function(b, e) {
                var p = a.na(e)
                  , m = d.Ea;
                p && (c.aet && c.aet.length ? (b.ei_ = a.getAttribute(p, m.id) || a.getAttribute(p, "id") || "",
                b.ec_ = a.getAttribute(p, m.X) || a.getAttribute(p, "class") || "",
                b.ex_ = a.getAttribute(p, m.W) || a.qa(p),
                b.en_ = a.getAttribute(p, m.content) || a.Q(p, v),
                b.et_ = a.getAttribute(p, m.da) || a.R(p),
                b.el_ = a.getAttribute(p, m.link) || a.getAttribute(p, "href") || "") : (b.ex_ = a.getAttribute(p, m.W) || a.qa(p),
                b.en_ = a.getAttribute(p, m.content) || a.Q(p, v)));
                return b
            },
            Ib: function(b, d) {
                b = String(b);
                d = String(d);
                if (0 < b.indexOf("*")) {
                    var e = /.*\[(\d+)\]$/.exec(d);
                    b = b.replace("*", e ? e[1] : "1")
                }
                return a.na(b)
            }
        };
        h.z.d("pv-b", r.fb);
        return r
    }
    )();
    (function() {
        var a = mt.lang
          , e = mt.e
          , b = mt.event
          , d = mt.f
          , g = h.D
          , q = h.z
          , f = h.M
          , k = f.K
          , r = +new Date
          , n = []
          , u = {
            Z: function() {
                return function(b) {
                    if (h.c && h.c.S && c.aet && c.aet.length) {
                        var d = b.target || b.srcElement;
                        if (d) {
                            var f = h.c.mb
                              , l = e.getAttribute(d, g.Ga) != w ? v : x;
                            if (e.getAttribute(d, g.Fa) == w)
                                if (l)
                                    u.ha(u.oa(d, b));
                                else {
                                    var y = e.R(d);
                                    if (a.H(f, "*") || a.H(f, y))
                                        u.ha(u.oa(d, b));
                                    else
                                        for (; d.parentNode != w; ) {
                                            var l = d.parentNode
                                              , y = e.R(l)
                                              , z = "a" === y && a.H(f, "a") ? v : x
                                              , y = "button" === y && a.H(f, "button") ? v : x
                                              , A = e.getAttribute(l, g.Ga) != w ? v : x;
                                            if (e.getAttribute(l, g.Fa) == w && (z || y || A)) {
                                                u.ha(u.oa(l, b));
                                                break
                                            }
                                            d = d.parentNode
                                        }
                                }
                        }
                    }
                }
            },
            oa: function(b, f) {
                var k = {}
                  , l = g.Ea;
                k.id = e.getAttribute(b, l.id) || e.getAttribute(b, "id") || "";
                k.X = e.getAttribute(b, l.X) || e.getAttribute(b, "class") || "";
                k.W = e.getAttribute(b, l.W) || e.qa(b);
                k.content = e.getAttribute(b, l.content) || e.Q(b, v);
                k.da = e.getAttribute(b, l.da) || e.R(b);
                k.link = e.getAttribute(b, l.link) || e.getAttribute(b, "href") || "";
                k.type = f.type || "click";
                l = a.Qa(b.offsetTop) ? b.offsetTop : 0;
                "click" === f.type ? l = d.Pa ? f.clientY + Math.max(document.documentElement.scrollTop, document.body.scrollTop) : f.pageY : "touchend" === f.type && (f.Ua && f.Ua.changedTouches) && (l = f.Ua.changedTouches[0].pageY);
                k.nc = l;
                l = this.Bb(f);
                k.wa = l.wa || 0;
                k.ya = l.ya || 0;
                k.Da = l.Da || 0;
                k.sa = l.sa || 0;
                k.Ba = l.Ba || "b";
                return k
            },
            Bb: function(b) {
                var f = b.target || b.srcElement, g;
                if (d.Pa) {
                    var l = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
                    g = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
                    g = b.clientX + g;
                    b = b.clientY + l
                } else
                    g = b.pageX,
                    b = b.pageY;
                var y = l = 0
                  , z = 0
                  , k = 0;
                if (f && (l = f.offsetWidth || f.clientWidth,
                y = f.offsetHeight || f.clientHeight,
                k = e.Fb(f),
                z = k.left,
                k = k.top,
                a.o(f.getBBox) && (y = f.getBBox(),
                l = y.width,
                y = y.height),
                "html" === (f.tagName || "").toLowerCase()))
                    l = Math.max(l, f.clientWidth),
                    y = Math.max(y, f.clientHeight);
                return {
                    wa: Math.round(100 * ((g - z) / l)),
                    ya: Math.round(100 * ((b - k) / y)),
                    Da: l,
                    sa: y,
                    Ba: ("a" === (f.tagName || "").toLowerCase() ? f : e.xb(f)) ? "a" : "b"
                }
            },
            ha: function(b) {
                var d = a.h;
                b = [+new Date - (h.c.T !== t ? h.c.T : r), d(b.id), d(b.X), d(b.da), d(b.W), d(b.link), d(b.content), b.type, b.nc, b.wa, b.ya, b.Da, b.sa, b.Ba].join("*");
                u.ia(b);
                a.o(this.V()) && this.V()()
            },
            ia: function(a) {
                var b = g.Ia;
                a.length > b || (encodeURIComponent(n.join("!") + a).length > b && 0 < n.length && (u.t(n.join("!")),
                n = []),
                n.push(a))
            },
            t: function(a) {
                h.c.b.et = 5;
                h.c.b.ep = a;
                f.setProperty("autoEventTracking", {
                    view_h_: d.G()
                }, v);
                h.c.b.p = k(f.w("autoEventTracking"));
                h.c.n();
                h.c.b.p = "";
                f.setProperty("autoEventTracking", {
                    view_h_: w
                }, v)
            },
            V: function() {
                return function() {
                    n && n.length && (u.t(n.join("!")),
                    n = [])
                }
            }
        };
        a.I(c.aet) && "" !== c.aet && q.d("pv-b", function() {
            b.d(document, "click", u.Z());
            "ontouchend"in document && b.d(window, "touchend", u.Z());
            b.d(window, "unload", u.V())
        });
        return u
    }
    )();
    (function() {
        var a = mt.lang
          , e = mt.event
          , b = mt.f
          , d = h.D
          , g = h.z
          , q = h.M
          , f = q.K
          , k = +new Date
          , r = []
          , n = w
          , u = {
            hb: function() {
                a.I(c.aet) && "" !== c.aet && setInterval(u.$a, d.fc)
            },
            $a: function() {
                var a = b.G();
                0 < a - h.c.b.vl && (h.c.b.vl = a)
            }
        }
          , p = {
            rb: function() {
                return function() {
                    h.c && (h.c.S && c.aet && c.aet.length) && (window.clearTimeout(n),
                    n = window.setTimeout(function() {
                        p.gb(b.G())
                    }, 150))
                }
            },
            gb: function(a) {
                p.ia([+new Date - (h.c.T !== t ? h.c.T : k), a].join("*"))
            },
            ia: function(a) {
                if (encodeURIComponent(r.join("!") + a).length > d.Ia || 3 < r.length)
                    p.t(r.join("!")),
                    r = [];
                r.push(a)
            },
            t: function(a) {
                u.$a();
                h.c.b.et = 6;
                h.c.b.vh = b.Ma();
                h.c.b.ep = a;
                q.setProperty("autoEventTracking", {
                    view_h_: b.G()
                }, v);
                h.c.b.p = f(q.w("autoEventTracking"));
                h.c.n();
                h.c.b.p = "";
                q.setProperty("autoEventTracking", {
                    view_h_: w
                }, v)
            },
            V: function() {
                return function() {
                    r && r.length && (p.t(r.join("!")),
                    r = [])
                }
            }
        };
        a.I(c.aet) && "" !== c.aet && g.d("pv-b", function() {
            e.d(window, "scroll", p.rb());
            e.d(window, "unload", p.V());
            u.hb()
        });
        return p
    }
    )();
    (function() {
        function a() {
            return function() {
                h.c.b.et = 3;
                h.c.b.ep = h.la.Gb() + "," + h.la.Db();
                h.c.b.hca = c.hca;
                h.c.n()
            }
        }
        function e() {
            clearTimeout(z);
            var a;
            l && (a = "visible" == document[l]);
            y && (a = !document[y]);
            k = "undefined" == typeof a ? v : a;
            if ((!f || !r) && k && n)
                s = v,
                p = +new Date;
            else if (f && r && (!k || !n))
                s = x,
                m += +new Date - p;
            f = k;
            r = n;
            z = setTimeout(e, 100)
        }
        function b(a) {
            var b = document
              , d = "";
            if (a in b)
                d = a;
            else
                for (var l = ["webkit", "ms", "moz", "o"], e = 0; e < l.length; e++) {
                    var f = l[e] + a.charAt(0).toUpperCase() + a.slice(1);
                    if (f in b) {
                        d = f;
                        break
                    }
                }
            return d
        }
        function d(a) {
            if (!("focus" == a.type || "blur" == a.type) || !(a.target && a.target != window))
                n = "focus" == a.type || "focusin" == a.type ? v : x,
                e()
        }
        var g = mt.event, q = h.z, f = v, k = v, r = v, n = v, u = +new Date, p = u, m = 0, s = v, l = b("visibilityState"), y = b("hidden"), z;
        e();
        (function() {
            var a = l.replace(/[vV]isibilityState/, "visibilitychange");
            g.d(document, a, e);
            g.d(window, "pageshow", e);
            g.d(window, "pagehide", e);
            "object" == typeof document.onfocusin ? (g.d(document, "focusin", d),
            g.d(document, "focusout", d)) : (g.d(window, "focus", d),
            g.d(window, "blur", d))
        }
        )();
        h.la = {
            Gb: function() {
                return +new Date - u
            },
            Db: function() {
                return s ? +new Date - p + m : m
            }
        };
        q.d("pv-b", function() {
            g.d(window, "unload", a())
        });
        q.d("duration-send", a());
        q.d("duration-done", function() {
            p = u = +new Date;
            m = 0
        });
        return h.la
    }
    )();
    (function() {
        var a = mt.lang
          , e = h.D
          , b = h.load
          , d = h.Y
          , g = {
            Sb: function(g) {
                if ((window._dxt === t || a.m(window._dxt, "Array")) && "undefined" !== typeof h.c) {
                    var f = d.aa();
                    b([e.protocol, "//datax.baidu.com/x.js?si=", c.id, "&dm=", encodeURIComponent(f)].join(""), g)
                }
            },
            mc: function(b) {
                if (a.m(b, "String") || a.m(b, "Number"))
                    window._dxt = window._dxt || [],
                    window._dxt.push(["_setUserId", b])
            }
        };
        return h.pb = g
    }
    )();
    (function() {
        function a(a, b, d, e) {
            if (!(a === t || b === t || e === t)) {
                if ("" === a)
                    return [b, d, e].join("*");
                a = String(a).split("!");
                for (var f, g = x, k = 0; k < a.length; k++)
                    if (f = a[k].split("*"),
                    String(b) === f[0]) {
                        f[1] = d;
                        f[2] = e;
                        a[k] = f.join("*");
                        g = v;
                        break
                    }
                g || a.push([b, d, e].join("*"));
                return a.join("!")
            }
        }
        function e(a) {
            for (var b in a)
                if ({}.hasOwnProperty.call(a, b)) {
                    var f = a[b];
                    d.g(f) || d.isArray(f) ? e(f) : a[b] = String(f)
                }
        }
        var b = mt.url
          , d = mt.lang
          , g = mt.A
          , q = mt.f
          , f = h.D
          , k = h.z
          , r = h.pb
          , n = h.load
          , u = h.Y
          , p = h.M
          , m = p.K
          , s = {
            U: [],
            ca: 0,
            ua: x,
            C: {
                Ca: "",
                page: ""
            },
            init: function() {
                s.l = 0;
                p.init();
                k.d("pv-b", function() {
                    s.qb();
                    s.tb()
                });
                k.d("pv-d", function() {
                    s.ub();
                    s.C.page = ""
                });
                k.d("stag-b", function() {
                    h.c.b.api = s.l || s.ca ? s.l + "_" + s.ca : "";
                    h.c.b.ct = [decodeURIComponent(u.getData("Hm_ct_" + c.id) || ""), s.C.Ca, s.C.page].join("!")
                });
                k.d("stag-d", function() {
                    h.c.b.api = 0;
                    s.l = 0;
                    s.ca = 0
                })
            },
            qb: function() {
                var a = window._hmt || [];
                if (!a || d.m(a, "Array"))
                    window._hmt = {
                        id: c.id,
                        cmd: {},
                        push: function() {
                            for (var a = window._hmt, b = 0; b < arguments.length; b++) {
                                var l = arguments[b];
                                d.m(l, "Array") && (a.cmd[a.id].push(l),
                                "_setAccount" === l[0] && (1 < l.length && /^[0-9a-f]{31,32}$/.test(l[1])) && (l = l[1],
                                a.id = l,
                                a.cmd[l] = a.cmd[l] || []))
                            }
                        }
                    },
                    window._hmt.cmd[c.id] = [],
                    window._hmt.push.apply(window._hmt, a)
            },
            tb: function() {
                var a = window._hmt;
                if (a && a.cmd && a.cmd[c.id])
                    for (var b = a.cmd[c.id], d = /^_track(Event|MobConv|Order)$/, e = 0, f = b.length; e < f; e++) {
                        var g = b[e];
                        d.test(g[0]) ? s.U.push(g) : s.Aa(g)
                    }
                a.cmd[c.id] = {
                    push: s.Aa
                }
            },
            ub: function() {
                if (0 < s.U.length)
                    for (var a = 0, b = s.U.length; a < b; a++)
                        s.Aa(s.U[a]);
                s.U = w
            },
            Aa: function(a) {
                var b = a[0];
                if (s.hasOwnProperty(b) && d.o(s[b]))
                    s[b](a)
            },
            _setAccount: function(a) {
                1 < a.length && /^[0-9a-f]{31,32}$/.test(a[1]) && (s.l |= 1)
            },
            _setAutoPageview: function(a) {
                if (1 < a.length && (a = a[1],
                x === a || v === a))
                    s.l |= 2,
                    h.c.Na = a
            },
            _trackPageview: function(a) {
                1 < a.length && (a[1].charAt && "/" === a[1].charAt(0)) && (s.l |= 4,
                h.c.b.sn = h.c.Ja(),
                h.c.b.et = 0,
                h.c.b.ep = "",
                h.c.b.vl = q.G(),
                s.ua || (h.c.b.su = h.c.b.u || document.location.href),
                h.c.b.u = f.protocol + "//" + document.location.host + a[1],
                h.c.b.p = m(p.w("pageview")),
                h.c.n(),
                h.c.b.p = "",
                h.c.T = +new Date,
                p.s("pageview"))
            },
            _trackEvent: function(a) {
                2 < a.length && (s.l |= 8,
                h.c.b.et = 4,
                h.c.b.ep = d.h(a[1]) + "*" + d.h(a[2]) + (a[3] ? "*" + d.h(a[3]) : "") + (a[4] ? "*" + d.h(a[4]) : ""),
                h.c.b.p = m(p.ra()),
                h.c.n(),
                h.c.b.p = "")
            },
            _setCustomVar: function(a) {
                if (!(4 > a.length)) {
                    var b = a[1]
                      , e = a[4] || 3;
                    if (0 < b && 6 > b && 0 < e && 4 > e) {
                        s.ca++;
                        for (var f = (h.c.b.cv || "*").split("!"), g = f.length; g < b - 1; g++)
                            f.push("*");
                        f[b - 1] = e + "*" + d.h(a[2]) + "*" + d.h(a[3]);
                        h.c.b.cv = f.join("!");
                        a = h.c.b.cv.replace(/[^1](\*[^!]*){2}/g, "*").replace(/((^|!)\*)+$/g, "");
                        "" !== a ? u.setData("Hm_cv_" + c.id, encodeURIComponent(a), c.age) : u.removeData("Hm_cv_" + c.id)
                    }
                }
            },
            _setUserTag: function(b) {
                if (!(3 > b.length)) {
                    var e = d.h(b[1]);
                    b = d.h(b[2]);
                    if (e !== t && b !== t) {
                        var f = decodeURIComponent(u.getData("Hm_ct_" + c.id) || "")
                          , f = a(f, e, 1, b);
                        u.setData("Hm_ct_" + c.id, encodeURIComponent(f), c.age)
                    }
                }
            },
            _setVisitTag: function(b) {
                if (!(3 > b.length)) {
                    var e = d.h(b[1]);
                    b = d.h(b[2]);
                    if (e !== t && b !== t) {
                        var f = s.C.Ca
                          , f = a(f, e, 2, b);
                        s.C.Ca = f
                    }
                }
            },
            _setPageTag: function(b) {
                if (!(3 > b.length)) {
                    var e = d.h(b[1]);
                    b = d.h(b[2]);
                    if (e !== t && b !== t) {
                        var f = s.C.page
                          , f = a(f, e, 3, b);
                        s.C.page = f
                    }
                }
            },
            _setReferrerOverride: function(a) {
                1 < a.length && (a = a[1],
                d.m(a, "String") ? (h.c.b.su = "/" === a.charAt(0) ? f.protocol + "//" + window.location.host + a : a,
                s.ua = v) : s.ua = x)
            },
            _trackOrder: function(a) {
                a = a[1];
                d.g(a) && (e(a),
                s.l |= 16,
                h.c.b.et = 94,
                h.c.b.ep = g.stringify(a),
                h.c.b.p = m(p.ra()),
                h.c.n(),
                h.c.b.p = "")
            },
            _setDataxId: function(a) {
                a = a[1];
                r.Sb();
                r.mc(a)
            },
            _setUserId: function(a) {
                a = a[1];
                if (d.I(a) || d.Qa(a)) {
                    var b = p.w("user").uid_;
                    if (!(b && b.value === d.h(String(a)))) {
                        var b = h.c.b.p
                          , e = h.c.b.ep;
                        h.c.b.et = 8;
                        h.c.b.ep = "";
                        h.c.b.p = "uid_*" + d.h(String(a));
                        h.c.n();
                        var f = {};
                        f.uid_ = a;
                        p.setProperty("user", f, v);
                        h.c.b.p = b;
                        h.c.b.ep = e
                    }
                }
            },
            _clearUserId: function(a) {
                1 < a.length && v === a[1] && p.s("userId")
            },
            _getClientId: function(a) {
                a = a[1];
                d.o(a) && c.hca !== t && a(c.hca)
            },
            _setUserProperty: function(a) {
                a = a[1];
                d.g(a) && p.setProperty("user", a)
            },
            _clearUserProperty: function(a) {
                1 < a.length && v === a[1] && p.s("user")
            },
            _setSessionProperty: function(a) {
                a = a[1];
                d.g(a) && p.setProperty("session", a)
            },
            _clearSessionProperty: function(a) {
                1 < a.length && v === a[1] && p.s("session")
            },
            _setPageviewProperty: function(a) {
                a = a[1];
                d.g(a) && p.setProperty("pageview", a)
            },
            _clearPageviewProperty: function(a) {
                1 < a.length && v === a[1] && p.s("pageview")
            },
            _setAutoEventTrackingProperty: function(a) {
                a = a[1];
                d.g(a) && p.setProperty("autoEventTracking", a)
            },
            _clearAutoEventTrackingProperty: function(a) {
                1 < a.length && v === a[1] && p.s("autoEventTracking")
            },
            _setAutoTracking: function(a) {
                if (1 < a.length && (a = a[1],
                x === a || v === a))
                    h.c.Oa = a
            },
            _setAutoEventTracking: function(a) {
                if (1 < a.length && (a = a[1],
                x === a || v === a))
                    h.c.S = a
            },
            _trackPageDuration: function(a) {
                1 < a.length ? (a = a[1],
                2 === String(a).split(",").length && (h.c.b.et = 3,
                h.c.b.ep = a,
                h.c.n())) : k.L("duration-send");
                k.L("duration-done")
            },
            _require: function(a) {
                1 < a.length && (a = a[1],
                f.kb.test(b.pa(a)) && n(a))
            },
            _providePlugin: function(a) {
                if (1 < a.length) {
                    var b = window._hmt
                      , e = a[1];
                    a = a[2];
                    if (d.H(f.Xa, e) && d.o(a) && (b.plugins = b.plugins || {},
                    b.J = b.J || {},
                    b.plugins[e] = a,
                    b.B = b.B || [],
                    a = b.B.slice(),
                    e && a.length && a[0][1] === e))
                        for (var g = 0, k = a.length; g < k; g++) {
                            var m = a[g][2] || {};
                            if (b.plugins[e] && !b.J[e])
                                b.J[e] = new b.plugins[e](m),
                                b.B.shift();
                            else
                                break
                        }
                }
            },
            _requirePlugin: function(a) {
                if (1 < a.length) {
                    var b = window._hmt
                      , e = a[1]
                      , g = a[2] || {};
                    if (d.H(f.Xa, e))
                        if (b.plugins = b.plugins || {},
                        b.J = b.J || {},
                        b.plugins[e] && !b.J[e])
                            b.J[e] = new b.plugins[e](g);
                        else {
                            b.B = b.B || [];
                            for (var g = 0, k = b.B.length; g < k; g++)
                                if (b.B[g][1] === e)
                                    return;
                            b.B.push(a);
                            s._require([w, f.ac + e + ".js"])
                        }
                }
            },
            _fetchABTest: function(a) {
                if (1 < a.length && (a = a[1],
                d.g(a))) {
                    var b = a.paramName
                      , e = a.defaultValue
                      , f = a.callback;
                    h.ab && (b && e !== t && d.o(f)) && h.ab.wc(b, function(a) {
                        f(a === w ? e : a)
                    })
                }
            },
            _trackCustomEvent: function(a) {
                if (1 < a.length) {
                    var b = a[1];
                    a = a[2];
                    d.g(a) || (a = {});
                    a._iden = b;
                    p.setProperty("customEvent", a);
                    h.c.b.et = 7;
                    h.c.b.ep = "";
                    h.c.b.p = m(p.w("customEvent"));
                    h.c.n();
                    h.c.b.p = "";
                    p.s("customEvent")
                }
            }
        };
        s.init();
        h.lb = s;
        return h.lb
    }
    )();
    (function() {
        var a = h.z;
        c.spa !== t && "1" === String(c.spa) && (window._hmt = window._hmt || [],
        window._hmt.push(["_requirePlugin", "UrlChangeTracker"]),
        a.d("pv-b", function() {
            "" !== window.location.hash && (h.c.b.u = window.location.href)
        }))
    }
    )();
    (function() {
        function a() {
            "undefined" === typeof window["_bdhm_loaded_" + c.id] && (window["_bdhm_loaded_" + c.id] = v,
            this.b = {},
            this.Oa = this.Na = v,
            this.S = m.S,
            this.mb = d.I(c.aet) && 0 < c.aet.length ? c.aet.split(",") : "",
            this.init())
        }
        var e = mt.url
          , b = mt.N
          , d = mt.lang
          , g = mt.cookie
          , q = mt.f
          , f = mt.sessionStorage
          , k = mt.A
          , r = mt.event
          , n = h.Y
          , u = h.M
          , p = u.K
          , m = h.D
          , s = h.load
          , l = h.z;
        a.prototype = {
            kc: function() {
                var a, b, d, e;
                m.Ra = n.getData("Hm_lpvt_" + c.id) || 0;
                if (e = n.getData("Hm_lvt_" + c.id)) {
                    for (b = e.split(","); 2592E3 < m.O - b[0]; )
                        b.shift();
                    d = 4 > b.length ? 2 : 3;
                    for (m.O - m.Ra > c.vdur && b.push(m.O); 4 < b.length; )
                        b.shift();
                    e = b.join(",");
                    b = b[b.length - 1]
                } else
                    e = m.O,
                    b = "",
                    d = 1;
                this.Vb() ? (n.setData("Hm_lvt_" + c.id, e, c.age),
                n.setData("Hm_lpvt_" + c.id, m.O),
                a = g.Zb(n.aa(), n.ma())) : this.vb();
                this.b.cc = a;
                this.b.lt = b;
                this.b.lv = d
            },
            Vb: function() {
                var a = e.pa(document.location.href);
                return !d.H("sjh.baidu.com isite.baidu.com ls.wejianzhan.com bs.wejianzhan.com product.weijianzhan.com qianhu.weijianzhan.com aisite.wejianzhan.com".split(" "), a)
            },
            vb: function() {
                for (var a = document.cookie.split(";"), b = 0; b < a.length; b++) {
                    var d = a[b].split("=");
                    d.length && /Hm_(up|ct|cv|lp?vt)_[0-9a-f]{31}/.test(String(d[0])) && n.removeData(d[0]);
                    d.length && /Hm_ck_[0-9]{13}/.test(String(d[0])) && n.removeData(d[0])
                }
            },
            jc: function() {
                for (var a = [], b = this.b.et, d = 0, e = m.cb.length; d < e; d++) {
                    var f = m.cb[d]
                      , g = this.b[f];
                    "undefined" !== typeof g && "" !== g && ("tt" !== f || "tt" === f && 0 === b) && ("ct" !== f || "ct" === f && 0 === b) && a.push(f + "=" + encodeURIComponent(g))
                }
                return a.join("&")
            },
            lc: function() {
                this.kc();
                this.b.si = c.id;
                this.b.sn = this.Ja();
                this.b.su = document.referrer;
                this.b.ds = q.ec;
                this.b.cl = q.colorDepth + "-bit";
                this.b.ln = String(q.language).toLowerCase();
                this.b.ja = q.javaEnabled ? 1 : 0;
                this.b.ck = q.cookieEnabled ? 1 : 0;
                this.b.lo = "number" === typeof _bdhm_top ? 1 : 0;
                this.b.v = "1.2.91";
                this.b.cv = decodeURIComponent(n.getData("Hm_cv_" + c.id) || "");
                this.b.tt = document.title || "";
                this.b.vl = q.G();
                var a = document.location.href;
                this.b.cm = e.i(a, m.Pb) || "";
                this.b.cp = e.i(a, m.Qb) || e.i(a, m.rc) || "";
                this.b.cw = e.i(a, m.Ob) || e.i(a, m.tc) || "";
                this.b.ci = e.i(a, m.Mb) || e.i(a, m.qc) || "";
                this.b.cf = e.i(a, m.Rb) || e.i(a, m.sc) || "";
                this.b.cu = e.i(a, m.Nb) || e.i(a, m.pc) || "";
                /https?:/.test(document.location.protocol) && (this.b.u = a)
            },
            init: function() {
                try {
                    this.lc(),
                    this.ic(),
                    h.c = this,
                    this.nb(),
                    this.$b(),
                    l.L("pv-b"),
                    this.gc()
                } catch (a) {
                    var d = [];
                    d.push("si=" + c.id);
                    d.push("n=" + encodeURIComponent(a.name));
                    d.push("m=" + encodeURIComponent(a.message));
                    d.push("r=" + encodeURIComponent(document.referrer));
                    b.log(m.va + "//" + m.Ya + "?" + d.join("&"))
                }
            },
            gc: function() {
                function a() {
                    l.L("pv-d")
                }
                this.Na ? (this.b.et = 0,
                this.b.ep = "",
                this.b.p = p(u.w("pageview")),
                this.b.vl = q.G(),
                this.n(a),
                this.b.p = "") : a();
                this.T = +new Date;
                u.s("pageview")
            },
            n: function(a) {
                if (this.Oa) {
                    var e = this;
                    e.b.rnd = Math.round(Math.random() * m.xa);
                    e.b.r = q.orientation;
                    e.b.ww = q.eb;
                    l.L("stag-b");
                    var f = m.va + "//" + m.Ya + "?" + e.jc();
                    l.L("stag-d");
                    e.ib(f);
                    b.log(f, function(b) {
                        e.Za(b);
                        d.o(a) && a.call(e)
                    })
                }
            },
            nb: function() {
                try {
                    if (window.postMessage && window.self !== window.parent) {
                        var a = this;
                        r.d(window, "message", function(b) {
                            if (e.pa(b.origin) === m.oc) {
                                b = b.data || {};
                                var d = b.jn || ""
                                  , f = /^customevent$|^heatmap$|^pageclick$|^select$/.test(d);
                                if (RegExp(c.id).test(b.sd || "") && f)
                                    a.b.rnd = Math.round(Math.random() * m.xa),
                                    s(m.protocol + "//" + c.js + d + ".js?" + a.b.rnd)
                            }
                        });
                        window.parent.postMessage({
                            id: c.id,
                            url: document.location.href,
                            status: "__Messenger__hmLoaded"
                        }, "*")
                    }
                } catch (b) {}
            },
            $b: function() {
                try {
                    if (window.self === window.parent) {
                        var a = document.location.href
                          , b = e.i(a, "baidu-analytics-token")
                          , d = e.i(a, "baidu-analytics-jn");
                        /^[a-f0-9]{32}\/?$/.test(b) && /^overlay\/?$/.test(d) && s(m.protocol + "//" + c.js + d + ".js?" + Math.round(Math.random() * m.xa))
                    }
                } catch (f) {}
            },
            ib: function(a) {
                var b;
                try {
                    b = k.parse(f.get("Hm_unsent_" + c.id) || "[]")
                } catch (d) {
                    b = []
                }
                var e = this.b.u ? "" : "&u=" + encodeURIComponent(document.location.href);
                b.push(a.replace(/^https?:\/\//, "") + e);
                f.set("Hm_unsent_" + c.id, k.stringify(b))
            },
            Za: function(a) {
                var b;
                try {
                    b = k.parse(f.get("Hm_unsent_" + c.id) || "[]")
                } catch (d) {
                    b = []
                }
                if (b.length) {
                    a = a.replace(/^https?:\/\//, "");
                    for (var e = 0; e < b.length; e++)
                        if (a.replace(/&u=[^&]*/, "") === b[e].replace(/&u=[^&]*/, "")) {
                            b.splice(e, 1);
                            break
                        }
                    b.length ? f.set("Hm_unsent_" + c.id, k.stringify(b)) : this.ob()
                }
            },
            ob: function() {
                f.remove("Hm_unsent_" + c.id)
            },
            ic: function() {
                var a = this, d;
                try {
                    d = k.parse(f.get("Hm_unsent_" + c.id) || "[]")
                } catch (e) {
                    d = []
                }
                if (d.length)
                    for (var g = function(d) {
                        b.log(m.va + "//" + d, function(b) {
                            a.Za(b)
                        })
                    }, l = 0; l < d.length; l++)
                        g(d[l])
            },
            Ja: function() {
                return Math.round(+new Date / 1E3) % 65535
            }
        };
        return new a
    }
    )();
    var B = h.D
      , C = h.load;
    c.pt && C([B.protocol, "//ada.baidu.com/phone-tracker/insert_bdtj?sid=", c.pt].join(""));
}
)();
