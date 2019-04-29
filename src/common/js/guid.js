// 11/21/2018, 1:14:47 PM
(function (t, n) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : t._qblog = n()
})(this, function () {
  return function (t) {
    var n = {};

    function e(i) {
      if (n[i]) return n[i].exports;
      var o = n[i] = {"i": i, "l": !1, "exports": {}};
      return t[i].call(o.exports, o, o.exports, e), o.l = !0, o.exports
    }

    return e.m = t, e.c = n, e.d = function (t, n, i) {
      e.o(t, n) || Object.defineProperty(t, n, {"configurable": !1, "enumerable": !0, "get": i})
    }, e.n = function (t) {
      var n = t && t.__esModule ? function () {
        return t["default"]
      } : function () {
        return t
      };
      return e.d(n, "a", n), n
    }, e.o = function (t, n) {
      return Object.prototype.hasOwnProperty.call(t, n)
    }, e.p = "./", e(e.s = 4)
  }([function (t, n) {
    function e() {
    }

    t.exports = e;
    var i, o = Math.pow(2, 53) - 1, r = Object.prototype, a = (i = "length", function (t) {
      return null == t ? void 0 : t[i]
    }), s = function (t) {
      var n = a(t);
      return "number" == typeof n && n >= 0 && n <= o
    };
    e.isObject = function (t) {
      return null !== t && "object" === typeof t && !s(t)
    }, e.isJSON = function (t) {
      return null !== t && "object" == typeof t
    }, e.has = function (t, n) {
      return null != t && r.hasOwnProperty.call(t, n)
    }, e.extend = function (t) {
      var n, i, o, r = arguments.length;
      if (r < 2 || null == t) return t;
      for (i = 1; i < r; i++) for (o in n = arguments[i]) e.has(n, o) && (t[o] = n[o]);
      return t
    }, e.keys = function (t) {
      if (!e.isObject(t)) return [];
      if (Object.keys) return Object.keys(t);
      var n = [];
      for (var i in t) e.has(t, i) && n.push(i);
      return n
    }, e.each = function (t, n, i) {
      var o, r, a = function () {
        return n.apply(i, arguments)
      };
      if (s(t)) for (o = 0, r = t.length; o < r; o++) a(t[o], o, t); else {
        var c = e.keys(t);
        for (o = 0, r = c.length; o < r; o++) a(t[c[o]], c[o], t)
      }
      return t
    }, e.each(["Function", "String", "Number", "Date"], function (t) {
      e["is" + t] = function (n) {
        return r.toString.call(n) === "[object " + t + "]"
      }
    });
    var c = function (t) {
      return function () {
        var n, i = arguments.length;
        for (n = 0; n < i; n++) if (!e[t](arguments[n])) return !1;
        return !0
      }
    };
    e.inum = c("isNumber"), e.istr = c("isString"), e.stringify = function (t) {
      return JSON.stringify(t)
    }
  }, function (t, n, e) {
    var i = e(0), o = e(5);

    function r() {
    }

    t.exports = r;
    var a = r.parseUrlParams = function (t) {
      t || (t = "");
      for (var n, e = t.split("&"), i = {}, o = 0; o < e.length; o++) i[(n = e[o].split("="))[0]] = decodeURIComponent(n[1] || "");
      return i
    };
    r.getUrlParams = function (t) {
      var n = window.location.search.substring(1), e = a(n);
      return r.getUrlParams = function (t) {
        return t ? e[t] : e
      }, t ? e[t] : e
    };
    r.getUrlParam = function (t) {
      var n = 0, e = "";
      for (n = 0; n < t.length; n++) if (e = r.getUrlParams(t[n])) return e;
      return ""
    };
    var s = navigator.userAgent, c = /\bQQBrowser\b/i.test(s), u = window.external;
    r.isQB = c, r.isIE678 = document.all && !document.addEventListener, r.isIE6789 = document.all && !window.atob, r.isDebug = "1" === r.getUrlParams("debug"), r.isTest = "2" === r.getUrlParams("debug");
    var f, l, d, v, p = function (t, n) {
      var e = 1 === arguments.length, i = window.localStorage;
      return i ? e ? i.getItem(t) : i.setItem(t, n) : e ? o(t) : o(t, n, {"expires": 1095})
    }, m = r.createGuid = function () {
      return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (t) {
        var n = 16 * Math.random() | 0;
        return ("x" === t ? n : 3 & n | 8).toString(16)
      })
    };
    r.protocol = (f = location.protocol, r.isIE678 && /^https?:/.test(f) ? f : "https:"), r.getGuid = (l = "_noqb_guid", d = "", function () {
      return d || (c && u && u.getGuid && u.getGuid() ? d = u.getGuid().replace(/-/g, "") : (d = p(l)) || (d = m(), p(l, d)), d)
    }), r.imgsend = function (t, n, e) {
      var o = new Image;
      o.onload = function () {
        i.isFunction(n) && n()
      }, o.onerror = function () {
        i.isFunction(e) && e()
      }, o.src = t + "&r=" + Math.random(), o = null
    }, r.onLoadEventEnd = function () {
      var t, n = [];
      return function (e) {
        !r.isIE6789 && window.performance && performance.timing && (performance.timing.loadEventEnd ? e() : (n.push(e), function e() {
          if (clearTimeout(t), performance.timing.loadEventEnd) {
            for (var i = 0; i < n.length; i++) n[i]();
            n = null
          } else t = setTimeout(function () {
            e()
          }, 300)
        }()))
      }
    }(), r.isFormCtrl = (v = ["", "INPUT", "TEXTAREA", ""].join("@"), function (t) {
      return v.indexOf("@" + t.tagName.toUpperCase() + "@") > -1
    }), r.random = function (t, n) {
      return Math.random() * (n - t) + t | 0
    }
  }, function (t, n) {
    function e() {
      var t = performance.timing, n = {};
      return n.readystart = t.fetchStart - t.navigationStart, n.load = t.loadEventEnd - t.fetchStart, n.network = t.responseEnd - t.fetchStart, n.request = t.responseEnd - t.requestStart, n.initdomtree = t.domInteractive - t.responseEnd, n.domready = t.domComplete - t.domInteractive, n.loadevent = t.loadEventEnd - t.domComplete, n.ttfb = t.responseStart - t.navigationStart, n
    }

    t.exports = {
      "test": function () {
        for (var t = performance.timing, n = ["navigationStart", "fetchStart", "requestStart", "responseStart", "responseEnd", "domInteractive", "domComplete", "loadEventEnd"], i = 0; i < n.length; i++) if (!t[n[i]]) return !1;
        for (var o = e(), r = 0, a = ["readystart", "load", "network", "request", "initdomtree", "domready", "loadevent", "ttfb"], s = 0; s < a.length; s++) if ((r = o[a[s]]) < 0 || r >= 6e5) return !1;
        return !0
      }, "getTimes": e
    }
  }, function (t, n, e) {
    var i = e(0), o = e(7), r = "//pingjs.qq.com/tcss.ping.https.js", a = [], s = 0, c = !1, u = !1;

    function f(t) {
      if (2 === s) return t();
      a.push(t), 1 !== s && (s = 1, o([r], function () {
        window.__pgvmain = pgvMain;
        try {
          Object.defineProperty && Object.defineProperty(window, "pgvMain", {
            "configurable": !1,
            "writable": !1,
            "value": "[forbid tcss pv: ams, ...]"
          })
        } catch (t) {
        }
        s = 2, i.each(a, function (t) {
          t()
        }), a = null
      }, function () {
        s = 0
      }))
    }

    t.exports = {
      "pv": function () {
        !c && f(function () {
          window.__pgvmain && __pgvmain("pathtrace", {
            "pathStart": !0,
            "tagParamName": "ADTAG",
            "useRefUrl": !0,
            "override": !0,
            "careSameDomainRef": !1,
            "sessionSpan": 60
          })
        }), c = !0
      }, "click": function (t) {
        f(function () {
          window.pgvSendClick && pgvSendClick({"hottag": t})
        })
      }, "watch": function (t) {
        !u && f(function () {
          document.attachEvent ? document.attachEvent("onclick", function (t) {
            pgvWatchClick(t)
          }) : document.addEventListener("click", function (t) {
            pgvWatchClick(t)
          }, !1)
        }), u = !0
      }
    }
  }, function (t, n, e) {
    var i = e(1), o = e(0), r = e(6), a = e(3), s = e(9), c = r({"autopv": !1, "autoPerformance": !1, "isCustom": !1});
    s.init(c);
    var u = {
      "setting": function (t, n) {
        o.isObject(t) && (t = [t]), o.each(t, function (t, e) {
          var i = o.extend({}, r.default_conf, t, n || {}), a = "p" + i.protocol, s = "k" + i.key;
          if (!u[a] || !u[s]) {
            var c = r(i);
            0 === e && (u.wsd = c), u[a] || (u[a] = {}), u[a][s] = u[s] = c
          }
        }), u.wsd && u.wsd.conf.autoPerformance && u.wsd.performance()
      }, "tcss": a, "debug": function (t) {
        c.setting({"debug": !!t})
      }, "fs": function (t, n) {
        c.fs(t, n)
      }, "performance": function (t) {
        c.performance(t)
      }, "track": function (t, n, e) {
        t.isCustom = !0, c.track(t, n, e)
      }, "feedstime": function () {
        s.run()
      }, "cdnspeed": function () {
        if (6 === i.random(0, 1e3)) {
          var t = new Image, n = (new Date).getTime();
          t.onload = function () {
            _etime = (new Date).getTime(), c.track({
              "key": 1004,
              "v1": _etime - n,
              "v3": i.isQB ? 96 : 69,
              "isCustom": !0
            })
          }, t.src = i.protocol + "//stdl.qq.com/stdl/qb/imgs/100k.jpg", t = null
        }
      }
    };
    setTimeout(function () {
      u.cdnspeed()
    }, 500), t.exports = u
  }, function (t, n, e) {
    var i = e(0);
    t.exports = function (t, n, e) {
      var o, r, a, s, c = encodeURIComponent;
      return e || (e = {}), s = e.raw ? function (t) {
        return t
      } : decodeURIComponent, arguments.length > 1 && "[object Object]" !== String(n) ? (e = i.extend({}, e), null !== n && void 0 !== n || (e.expires = -1), "number" == typeof e.expires && (o = 24 * e.expires * 60 * 60 * 1e3, (r = e.expires = new Date).setTime(r.getTime() + o)), n = String(n), document.cookie = [c(t), "=", e.raw ? n : c(n), e.expires ? "; expires=" + e.expires.toUTCString() : "", e.path ? "; path=" + e.path : "", e.domain ? "; domain=" + e.domain : "", e.secure ? "; secure" : ""].join("")) : (e = n || {}, (a = new RegExp("(?:^|; )" + c(t) + "=([^;]*)").exec(document.cookie)) ? s(a[1]) : null)
    }
  }, function (t, n, e) {
    var i = e(1), o = e(0), r = e(3), a = e(2), s = e(8), c = i.protocol,
      u = c + "//baas.browser.qq.com/report/functions/report", f = window, l = document,
      d = (f.external, f.encodeURIComponent);
    i.isTest && (u = c + "//baas.sparta.html5.qq.com/report/functions/report");
    var v = {
      "protocol": 8888,
      "key": 0,
      "v1": 0,
      "v2": 0,
      "v3": 0,
      "s1": "",
      "s2": "",
      "s3": "",
      "pname": location.hostname,
      "isCustom": !1,
      "tcss": !1,
      "autopv": !0,
      "autoPerformance": !0,
      "autoClick": !1,
      "watchFTH2V": !1,
      "feedstime": !1,
      "debug": i.isDebug
    };

    function p(t) {
      var n = this;
      if (!(n instanceof p)) return new p(t);
      n.setting(t), n.conf.autopv && !n.conf.isCustom && n.pv(), n.conf.autoClick && setTimeout(function () {
        n.initAutoClick()
      }, 300), n.conf.watchFTH2V && n.initFTH2V(), n.conf.feedstime && f._qblog.feedstime()
    }

    function m(t) {
      return t.replace(/\"/g, '\\"')
    }

    p.default_conf = v, p.prototype = {
      "setting": function (t) {
        this.conf || (this.conf = v), this.conf = o.extend({}, this.conf, t)
      }, "pv": function (t) {
        if (!this._isPVed) {
          var n = "hidden" === l.visibilityState ? 1 : 0;
          this.track({
            "v1": n,
            "v2": 1,
            "s1": i.getGuid(),
            "s3": t || this.conf.pname
          }), this.conf.tcss && r.pv(), this._isPVed = !0
        }
      }, "click": function (t) {
        this.track({"v2": 2, "s1": i.getGuid(), "s3": t || ""}), this.conf.tcss && r.click(t)
      }, "initAutoClick": function () {
        var t = this, n = "data-log";
        s(l.body, "keydown", "[data-log]", function (e) {
          if (i.isFormCtrl(this) && 13 === e.keyCode) {
            var o = this.getAttribute(n), r = [this.getAttribute("data-xlog") || this.value || ""];
            t._autoClick(o, r.join(","))
          }
        }), s(l.body, "click", "[data-log]", function (e) {
          if (!i.isFormCtrl(this)) {
            var o = this.getAttribute(n), r = [this.getAttribute("data-xlog") || ""];
            if ("A" === this.tagName) {
              var a = this.getAttribute("href");
              /^javascript:/i.test(a) || r.push(a)
            }
            var s, c = this.getAttribute("data-rid");
            c && (s = document.getElementById(c)) && i.isFormCtrl(s) && (r = [s.value || ""]), t._autoClick(o, r.join(","))
          }
        })
      }, "initFTH2V": function () {
        var t = this;
        if (!i.isIE6789 && "hidden" === l.visibilityState) {
          var n = !1;
          l.addEventListener("visibilitychange", function () {
            n || "visible" != l.visibilityState || (n = !0, t.track({"v2": 6, "s1": i.getGuid(), "s3": t.conf.pname}))
          })
        }
      }, "_autoClick": function (t, n) {
        this.track({"v2": 5, "s1": n, "s3": t || ""}), this.conf.tcss && r.click(t)
      }, "performance": function (t) {
        if (!this._isPerformanced && f.performance && !i.isIE6789) {
          var n = this;
          i.onLoadEventEnd(function () {
            a.test() && n.track({"key": 1001, "v2": 3, "s1": o.stringify(a.getTimes()), "s3": t || n.conf.pname})
          }), this._isPerformanced = !0
        }
      }, "fs": function (t, n, e) {
        this._isFSed && !e || (this.track({
          "key": 1002,
          "v2": 4,
          "v1": t,
          "s3": n || this.conf.pname
        }), this._isFSed = !0)
      }, "track": function (t, n, e) {
        var r, a = this.conf, s = o.extend({}, a, t);
        if ((r = s).v1 = parseInt(r.v1), r.v2 = parseInt(r.v2), r.v3 = parseInt(r.v3), function (t) {
          o.isJSON(t.s1) && (t.s1 = o.stringify(t.s1)), o.isJSON(t.s2) && (t.s2 = o.stringify(t.s2)), o.isJSON(t.s3) && (t.s3 = o.stringify(t.s3))
        }(s), !o.inum(s.protocol, s.key, s.v1, s.v2, s.v3) || !o.istr(s.s1, s.s2, s.s3) || s.key <= 0) return o.isFunction(e) && e(s);
        s.isCustom || 8888 !== s.protocol || (s.v3 = i.isQB ? 96 : 69, s.s2 = o.stringify(this._initS2Obj())), s.debug && function (t) {
          var n = {
            "protocol": t.protocol,
            "key": t.key,
            "v1": t.v1,
            "v2": t.v2,
            "v3": t.v3,
            "s1": t.s1,
            "s2": t.s2,
            "s3": t.s3
          };
          f.console && console.info("> QBLOG:", n)
        }(s), function (t) {
          t.s1 = d(m(t.s1)), t.s2 = d(m(t.s2)), t.s3 = d(m(t.s3))
        }(s), this._notQBTrack(s, n, e)
      }, "_notQBTrack": function (t, n, e) {
        var r = ["_ApplicationId=qbweb", "stComm=" + o.stringify({"sGuid": i.getGuid()}), "vProtocols_Function=" + o.stringify([{
          "iProtocol": t.protocol,
          "iKey": t.key,
          "iValueI": t.v1,
          "iValueII": t.v2,
          "iValueIII": t.v3,
          "sValueI": t.s1,
          "sValueII": t.s2,
          "sValueIII": t.s3
        }])].join("&");
        i.imgsend(u + "?" + r, function () {
          o.isFunction(n) && n(t)
        }, function () {
          o.isFunction(e) && e(t)
        })
      }, "_initS2Obj": function () {
        return this.s2obj = {
          "v": "1.1.3",
          "name": this.conf.pname,
          "id": i.getGuid(),
          "dvs": Number("visible" === document.visibilityState),
          "ua": navigator.userAgent,
          "url": location.href,
          "hn": location.hostname,
          "ref": l.referrer,
          "t": (new Date).getTime(),
          "w": screen.width,
          "h": screen.height,
          "vw": f.innerWidth || l.documentElement.clientWidth || 0,
          "vh": f.innerHeight || l.documentElement.clientHeight || 0,
          "dpr": f.devicePixelRatio || 1,
          "tag": i.getUrlParam(["ADTAG", "adtag", "fr"])
        }, this.s2obj
      }
    }, t.exports = p
  }, function (t, n) {
    var e = function (t) {
        return "[object Function]" === Object.prototype.toString.call(t)
      }, i = document, o = window, r = i.head || i.getElementsByTagName("head")[0], a = r.getElementsByTagName("base")[0],
      s = function (t, n, c) {
        if (0 === t.length) return e(n) && n();
        var u = t.shift(), f = i.createElement("script");

        function l() {
          o.console && console.log("> script loaded: ", f.src), f.onload = f.onerror = f.onreadystatechange = null, f = null, t.length ? s(t, n) : e(n) && n()
        }

        f.charset = "utf-8", "onload" in f ? (f.onload = l, f.onerror = c) : f.onreadystatechange = function () {
          /loaded|complete/.test(f.readyState) && l()
        }, f.async = "async", f.src = u, a ? r.insertBefore(f, a) : r.appendChild(f)
      };
    t.exports = s
  }, function (t, n) {
    function e(t, n, e, i) {
      (function (t, n, e) {
        window.addEventListener ? t.addEventListener(n, e, !1) : window.attachEvent && t.attachEvent("on" + n, e)
      })(t, n, function (n) {
        for (var o, r = n.target, a = n.currentTarget, s = t.querySelectorAll(e); r != a;) {
          for (o = 0; o < s.length; o++) if (s[o] === r) return i.call(r, n);
          r = r.parentNode
        }
      })
    }

    t.exports = function (t, n, i, o) {
      window.jQuery || window.Zepto ? $(t).on(n, i, o) : e(t, n, i, o)
    }
  }, function (t, n, e) {
    var i = e(1), o = window.performance && performance.timing, r = !1, a = [], s = null, c = !1, u = !1;

    function f() {
      i.isIE6789 || "visible" == document.visibilityState ? l() : (!c && document.addEventListener("visibilitychange", function () {
        u || "visible" != document.visibilityState || (u = !0, l())
      }), c = !0)
    }

    function l() {
      (function t() {
        var n = a.shift();
        n && (n(), a.length && t())
      })()
    }

    var d = !1;
    window.__qblogfeedstime = function () {
      if (o && !d) {
        d = !0;
        var t = (new Date).getTime(), n = performance.timing, e = {};
        e.navigation = t - n.navigationStart, e.request = t - n.requestStart, e.response = t - (window.__t1 || n.responseStart), e.ttfb = n.responseStart - n.navigationStart, !n.navigationStart || !n.requestStart || !n.responseStart || e.navigation > 6e5 || e.request > 6e5 || e.response > 6e5 || e.ttfb > 6e5 || e.navigation < 0 || e.request < 0 || e.response < 0 || e.ttfb < 0 || (a.push(function () {
          s.track({"key": 1003, "v2": 3, "s1": e, "s3": location.hostname})
        }), r && f())
      }
    }, t.exports = {
      "init": function (t) {
        s = t
      }, "run": function () {
        !r && o && (r = !0, a.push(function () {
          s.track({"key": 1003, "v2": 1, "s3": location.hostname})
        }), f())
      }
    }
  }])
});
