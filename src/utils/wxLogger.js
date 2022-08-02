'use strict'
Date.now =
  Date.now ||
  function () {
    return new Date().getTime()
  }
var SEQUENCE = Date.now(),
  noop = function () {},
  $a1 = function () {
    var t = 'object' == typeof console ? console.warn : noop
    try {
      var e = { warn: t }
      e.warn.call(e)
    } catch (r) {
      return noop
    }
    return t
  },
  util = {
    noop: noop,
    warn: $a1(),
    key: '__bl',
    selfErrKey: 'ARMS_SDK_ERROR',
    selfErrPage: 'ARMSSDK',
    win: 'object' == typeof window && window.document ? window : undefined,
    regionMap: {
      cn: 'https://arms-retcode.aliyuncs.com/r.png?',
      sg: 'https://arms-retcode-sg.aliyuncs.com/r.png?',
      sg_2: 'https://retcode-sg-lazada.arms.aliyuncs.com/r.png?',
      daily: 'http://arms-retcode-daily.alibaba.net/r.png?',
      daily_2: 'https://arms-retcode-daily.alibaba.net/r.png?',
      us: 'https://retcode-us-west-1.arms.aliyuncs.com/r.png?'
    },
    defaultImgUrl: 'https://arms-retcode.aliyuncs.com/r.png?',
    $a2: function (t) {
      if (Object.create) return Object.create(t)
      var e = function () {}
      return (e.prototype = t), new e()
    },
    each: function (t, e) {
      var r = 0,
        n = t.length
      if (this.T(t, 'Array')) for (; r < n && !1 !== e.call(t[r], t[r], r); r++);
      else for (r in t) if (!1 === e.call(t[r], t[r], r)) break
      return t
    },
    $a3: function (t, e, r) {
      if ('function' != typeof t) return r
      try {
        return t.apply(this, e)
      } catch (n) {
        return r
      }
    },
    T: function (t, e) {
      var r = Object.prototype.toString.call(t).substring(8).replace(']', '')
      return e ? r === e : r
    },
    $a4: function (t, e) {
      if (!t) return ''
      if (!e) return t
      var r = this,
        n = r.T(e)
      return 'Function' === n
        ? r.$a3(e, [t], t)
        : 'Array' === n
        ? (this.each(e, function (e) {
            t = r.$a4(t, e)
          }),
          t)
        : 'Object' === n
        ? t.replace(e.rule, e.target || '')
        : t.replace(e, '')
    },
    $a5: function (t, e) {
      if (!t || !e) return !1
      if (((this.isString(e) || e.source || 'Function' === this.T(e)) && (e = [e]), !this.isArray(e)))
        return this.warn('[arms] invalid rules of ignore config, (list of) String/RegExp/Funcitons are available'), !1
      for (var r, n = [], i = 0, o = e.length; i < o; i++)
        if (((r = e[i]), this.isString(r))) n.push(r.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1'))
        else if (r && r.source) n.push(r.source)
        else if (r && 'Function' === this.T(r) && !0 === this.$a3(r, [t], !1)) return !0
      var a = new RegExp(n.join('|'), 'i')
      return !!(n.length && a.test && a.test(t))
    },
    J: function (t) {
      if (!t || 'string' != typeof t) return t
      var e = null
      try {
        e = JSON.parse(t)
      } catch (r) {}
      return e
    },
    pick: function (t) {
      return 1 === t || 1 === Math.ceil(Math.random() * t)
    },
    $a6: function (t) {
      if ('sample' in t) {
        var e = t.sample,
          r = e
        e && /^\d+(\.\d+)?%$/.test(e) && (r = parseInt(100 / parseFloat(e))),
          0 < r && 1 > r && (r = parseInt(1 / r)),
          r >= 1 && r <= 100 ? (t.sample = r) : delete t.sample
      }
      return t
    },
    on: function (t, e, r, n, i) {
      return (
        t.addEventListener
          ? ((i = i || !1),
            t.addEventListener(
              e,
              function o(a) {
                n && t.removeEventListener(e, o, i), r.call(this, a)
              },
              i
            ))
          : t.attachEvent &&
            t.attachEvent('on' + e, function a(i) {
              n && t.detachEvent('on' + e, a), r.call(this, i)
            }),
        this
      )
    },
    off: function (t, e, r) {
      return r ? (t.removeEventListener ? t.removeEventListener(e, r) : t.detachEvent && t.detachEvent(e, r), this) : this
    },
    delay: function (t, e) {
      return -1 === e ? (t(), null) : setTimeout(t, e || 0)
    },
    ext: function (t) {
      for (var e = 1, r = arguments.length; e < r; e++) {
        var n = arguments[e]
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
      }
      return t
    },
    sub: function (t, e) {
      var r = {}
      return (
        this.each(t, function (t, n) {
          ;-1 !== e.indexOf(n) && (r[n] = t)
        }),
        r
      )
    },
    uu: function () {
      for (var t, e, r = 20, n = new Array(r), i = Date.now().toString(36).split(''); r-- > 0; )
        (e = (t = (36 * Math.random()) | 0).toString(36)), (n[r] = t % 3 ? e : e.toUpperCase())
      for (var o = 0; o < 8; o++) n.splice(3 * o + 2, 0, i[o])
      return n.join('')
    },
    seq: function () {
      return (SEQUENCE++).toString(36)
    },
    decode: function (t) {
      try {
        t = decodeURIComponent(t)
      } catch (e) {}
      return t
    },
    encode: function (t, e) {
      try {
        t = e ? encodeURIComponent(t).replace(/\(/g, '%28').replace(/\)/g, '%29') : encodeURIComponent(t)
      } catch (r) {}
      return t
    },
    serialize: function (t) {
      t = t || {}
      var e = []
      for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && t[r] !== undefined && e.push(r + '=' + this.encode(t[r], 'msg' === r))
      return e.join('&')
    },
    $a7: function (t, e) {
      if (!t || 'string' != typeof t) return !1
      var r = /arms-retcode[\w-]*\.aliyuncs/.test(t)
      return !r && e && (r = /(\.png)|(\.gif)|(alicdn\.com)/.test(t)), !r
    },
    $a8: function (t) {
      return !(!t || !t.message) && !/failed[\w\s]+fetch/i.test(t.message)
    },
    $a9: function (t) {
      return t && 'string' == typeof t ? t.replace(/^(https?:)?\/\//, '').replace(/\?.*$/, '') : ''
    },
    $aa: function (t) {
      return t && 'string' == typeof t ? t.replace(/\?.*$/, '') : ''
    },
    $ab: function (t) {
      return function () {
        return t + '() { [native code] }'
      }
    },
    checkSameOrigin: function (t, e) {
      if (!e || !t) return !1
      var r = '//' + e.split('/')[2]
      return (
        t === e ||
        t.slice(0, e.length + 1) === e + '/' ||
        t === r ||
        t.slice(0, r.length + 1) === r + '/' ||
        !/^(\/\/|http:|https:).*/.test(t)
      )
    },
    getRandIP: function () {
      for (var t = [], e = 0; e < 4; e++) {
        var r = Math.floor(256 * Math.random())
        t[e] = (r > 15 ? '' : '0') + r.toString(16)
      }
      return t.join('').replace(/^0/, '1')
    },
    getSortNum: function (t) {
      return t ? ((t += 1) >= 1e3 && t <= 9999 ? t : t < 1e3 ? t + 1e3 : (t % 1e4) + 1e3) : 1e3
    },
    getRandNum: function (t) {
      return t && 'string' == typeof t ? (t.length < 5 ? this.getNum(5) : t.substring(t.length - 5)) : this.getNum(5)
    },
    getNum: function (t) {
      for (var e = [], r = 0; r < t; r++) {
        var n = Math.floor(16 * Math.random())
        e[r] = n.toString(16)
      }
      return e.join('')
    },
    getCurDomain: function () {
      return (location && location.hostname) || ''
    },
    parseFetchHeaders: function (t) {
      if (!t) return {}
      var e = {}
      try {
        if ('function' == typeof t.keys)
          for (var r = t.keys(), n = r.next(); !n.done; ) {
            var i = n.value
            ;(e[i] = t.get(i)), (n = r.next())
          }
        else e = t
      } catch (o) {
        e = {}
      }
      return e
    },
    parseXhrHeaders: function (t) {
      if (!t && 'string' != typeof t) return {}
      var e = {}
      try {
        var r = t.split('\r\n')
        e = r.reduce(function (t, e) {
          var r = e.split(': ')
          return (t[r[0]] = r[1]), t
        }, {})
      } catch (n) {
        e = {}
      }
      return e
    },
    getQuerys: function (t) {
      if (!t) return ''
      var e = {},
        r = [],
        n = '',
        i = ''
      try {
        var o = []
        if ((t.indexOf('?') >= 0 && (o = t.substring(t.indexOf('?') + 1, t.length).split('&')), o.length > 0))
          for (var a in o) (n = (r = o[a].split('='))[0]), (i = r[1]), (e[n] = i)
      } catch (s) {
        e = {}
      }
      return e
    },
    getFetchSnapshot: function (t, e, r) {
      var n, i
      try {
        var o = (t && 'string' != typeof t[0] ? t[0].url : t[0]) || '',
          a = (t && 'string' != typeof t[0] ? t[0] : t[1]) || {},
          s = 'POST' === a.method.toUpperCase() ? a.body : this.getQuerys(o)
        ;(n = {
          originApi: o,
          method: a.method || 'unknown',
          params: s,
          response: e || '',
          reqHeaders: this.parseFetchHeaders(a.headers || null),
          resHeaders: this.parseFetchHeaders(r)
        }),
          (i = ('function' == typeof encodeURIComponent && JSON && encodeURIComponent(JSON.stringify(n))) || '{}')
      } catch (u) {
        i = '{}'
      }
      return i
    },
    getXhrSnapshot: function (t, e, r) {
      if (!t || !e || !r) return {}
      var n, i
      try {
        var o = ''
        '' === r.responseType || 'text' === r.responseType ? (o = r.responseText) : 'document' === r.responseType && (o = r.responseXML),
          (n = {
            originApi: t,
            method: e,
            params: this.getQuerys(t),
            response: o,
            reqHeaders: {},
            resHeaders: this.parseXhrHeaders(('function' == typeof r.getAllResponseHeaders && r.getAllResponseHeaders()) || '')
          }),
          (i = ('function' == typeof encodeURIComponent && JSON && encodeURIComponent(JSON.stringify(n))) || '{}')
      } catch (a) {
        i = '{}'
      }
      return i
    },
    isRobot: function () {
      var t = [
        'nuhk',
        'googlebot/',
        'googlebot-image',
        'yammybot',
        'openbot',
        'slurp',
        'msnbot',
        'ask jeeves/teoma',
        'ia_archiver',
        'baiduspider',
        'bingbot/',
        'adsbot'
      ]
      if (!navigator || 'string' != typeof navigator.userAgent) return !1
      try {
        for (var e = navigator.userAgent.toLowerCase(), r = 0; r < t.length; r++) {
          var n = t[r]
          if (e.lastIndexOf(n) >= 0) return !0
        }
      } catch (i) {
        this.warn('[arms] useragent parse error')
      }
      return !1
    },
    isFunction: function (t) {
      return 'function' == typeof t
    },
    isPlainObject: function (t) {
      return '[object Object]' === Object.prototype.toString.call(t)
    },
    isString: function (t) {
      return '[object String]' === Object.prototype.toString.call(t)
    },
    isArray: function (t) {
      return '[object Array]' === Object.prototype.toString.call(t)
    },
    joinRegExp: function (t) {
      for (var e, r = [], n = 0, i = t.length; n < i; n++)
        (e = t[n]), this.isString(e) ? r.push(e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1')) : e && e.source && r.push(e.source)
      return new RegExp(r.join('|'), 'i')
    },
    reWriteMethod: function (t, e, r) {
      if (null !== t) {
        var n = t[e]
        t[e] = r(n)
      }
    },
    $ac: function (t, e) {
      if (!t && !e) return !1
      if (new RegExp(this.selfErrKey, 'i').test(t)) return !0
      return !!this.$a5(e, [
        /retcode.alicdn.com\/retcode\/bl.js/,
        /g.alicdn.com\/retcode\/cloud-sdk\/bl.js/,
        /laz-g-cdn.alicdn.com\/retcode\/cloud-sdk\/bl.js/,
        /local.taobao.com:8880\/build\/bl/
      ])
    },
    $ad: function (t) {
      return { msg: t, message: this.selfErrKey }
    },
    $ae: function (t, e, r) {
      var n = {}
      try {
        n = this.isPlainObject(t)
          ? this.ext({ key: t.key || 'default', val: t.val || t.value || r }, t, { begin: Date.now() })
          : { key: t || 'default', val: e || r, begin: Date.now() }
      } catch (i) {
        this.warn('[retcode] baseLog error: ' + i)
      }
      return n
    }
  },
  util_1 = util,
  sendBeacon = function (t, e) {
    'object' == typeof t && (t = util_1.serialize(t))
    var r = e + t
    window && window.navigator && 'function' == typeof window.navigator.sendBeacon
      ? window.navigator.sendBeacon(r, '&post_res=')
      : util_1.warn('[arms] navigator.sendBeacon not surported')
  },
  selfId = 'aokcdqn3ly@e629dabd48a9933',
  pushToQueue = function (t, e) {
    var r
    {
      if ('error' !== e.t || !(r = t.$af[0]) || 'error' !== r.t || e.msg !== r.msg) {
        if ('behavior' === e.t) {
          var n = t.$af && t.$af.length
          if (n > 0 && 'behavior' === t.$af[n - 1].t) {
            var i = e.behavior || []
            t.$af[n - 1].behavior.concat(i)
          } else t.$af.push(e)
        } else t.$af.unshift(e)
        return (
          t.$ag(function () {
            t.$ah = util_1.delay(
              function () {
                t.$ai()
              },
              t.$af[0] && 'error' === t.$af[0].t ? 3e3 : -1
            )
          }),
          !0
        )
      }
      r.times++
    }
  },
  Base = function (t) {
    return (
      (this.ver = '1.8.24'),
      (this._conf = util_1.ext({}, Base.dftCon)),
      (this.$aj = {}),
      (this.$af = []),
      (this.$ak = []),
      (this.sdkFlag = !0),
      (this.hash = util_1.seq()),
      this.$al(),
      this.setConfig(t),
      (this.rip = util_1.getRandIP()),
      (this.record = 999),
      (this['EagleEye-TraceID'] = this.getTraceId()['EagleEye-TraceID']),
      (this._common = {}),
      this
    )
  }
;(Base.dftCon = {
  sample: 1,
  pvSample: 1,
  tag: '',
  imgUrl: 'https://arms-retcode.aliyuncs.com/r.png?',
  region: null,
  ignore: { ignoreUrls: [], ignoreApis: [], ignoreErrors: [/^Script error\.?$/], ignoreResErrors: [] },
  release: undefined,
  environment: 'prod'
}),
  (Base.prototype = {
    constructor: Base,
    $ag: function (t) {
      return t()
    },
    $am: function () {
      var t = this._conf.page
      return util_1.$a3(t, [], t + '')
    },
    setPage: function () {},
    setConfig: function (t) {
      t && 'object' == typeof t && (util_1.$a6(t), (t = this.$an(t)), (this._conf = util_1.ext({}, this._conf, t)))
    },
    $an: function (t) {
      var e = t.region,
        r = t.imgUrl
      if (e) {
        var n = util_1.regionMap[e]
        return (t.imgUrl = n || util_1.defaultImgUrl), t
      }
      return r && (t.imgUrl = r), t
    },
    $ao: function (t) {
      if (this.getConfig('debug')) return !0
      var e = util_1.regionMap,
        r = !1
      for (var n in e)
        if (e[n] === t) {
          r = !0
          break
        }
      return !r && util_1.warn('[retcode] invalid url: ' + t), r
    },
    $ap: function () {},
    $aq: function (t) {
      sendBeacon(t, this.getConfig('imgUrl'))
    },
    $ar: function () {},
    $as: function () {
      return {}
    },
    setCommonInfo: function (t) {
      t && 'object' == typeof t && (this._common = util_1.ext({}, this._common, t))
    },
    $al: function () {
      ;(this.pageview = util_1.uu()), (this.sBegin = Date.now())
    },
    $at: function () {
      if (this.username) return this.username
      var t = this._conf,
        e = t && t.setUsername
      if ('function' == typeof e)
        try {
          var r = e()
          'string' == typeof r && ((r = r.substr(0, 20)), (this.username = r))
        } catch (n) {
          util_1.warn('[arms] setUsername fail', n)
        }
      return this.username
    },
    getTraceId: function () {
      var t = this.rip,
        e = Date.now(),
        r = util_1.getSortNum(this.record),
        n = t + e + r + util_1.getRandNum(this._conf.pid)
      return (this['EagleEye-TraceID'] = n), (this.record = r), { 'EagleEye-TraceID': n }
    },
    getUberTraceId: function (t) {
      var e = this.rip,
        r = Date.now(),
        n = util_1.getSortNum(this.record),
        i = util_1.getRandNum(this._conf.pid),
        o = e + r + n + util_1.getNum(2) + i,
        a = o.substring(0, 16)
      return (t = t ? '1' : '0'), { 'uber-trace-id': o + ':' + a + ':0:' + t, traceId: o }
    },
    getPageviewId: function () {
      return { 'EagleEye-SessionID': this.pageview }
    },
    getConfig: function (t) {
      return t ? this._conf[t] : util_1.ext({}, this._conf)
    },
    $au: function (t) {
      return 1 === t || ('boolean' == typeof this.$aj[t] ? this.$aj[t] : ((this.$aj[t] = util_1.pick(t)), this.$aj[t]))
    },
    $ai: function (t) {
      var e
      clearTimeout(this.$ah), (this.$ah = null)
      for (var r = this._conf && 'function' == typeof this._conf.sendRequest; (e = this.$af.pop()); )
        'res' === e.t
          ? this.$ar(e, 'res')
          : 'error' === e.t
          ? this.$ar(e, 'err')
          : 'api' === e.t
          ? this.$ar(e, 'apiSnapshot')
          : 'behavior' === e.t
          ? this.$ar(e, 'behavior')
          : 'health' === e.t && !r && window && window.navigator && 'function' == typeof window.navigator.sendBeacon
          ? this.$aq(e)
          : this.$ap(e)
      return t && this.$av(), this
    },
    $av: function () {
      var t
      for (clearTimeout(this.$aw), this.$aw = null; (t = this.$ak.pop()); ) this.$ar(t, 'err')
      return this
    },
    _lg: function (t, e, r, n) {
      var i = this._conf,
        o = this.$am(),
        a = i.ignore || {},
        s = a.ignoreErrors,
        u = a.ignoreResErrors,
        c = a.ignoreUrls,
        f = a.ignoreApis
      return this._isRobot
        ? this
        : util_1.$a5(o, c) || util_1.$a5(util_1.decode(o), c)
        ? this
        : 'error' === t && (util_1.$a5(e.msg, s) || util_1.$a5(util_1.decode(e.msg), s))
        ? this
        : 'resourceError' === t && (util_1.$a5(e.src, u) || util_1.$a5(util_1.decode(e.src), u))
        ? this
        : 'api' === t && (util_1.$a5(e.api, f) || util_1.$a5(util_1.decode(e.api), f))
        ? this
        : this.$ao(i.imgUrl) && e && !i.disabled && i.pid
        ? 0 === n
          ? this
          : ((e = util_1.ext(
              {
                t: t,
                times: 1,
                page: o,
                tag: i.tag || '',
                release: i.release || '',
                environment: i.environment,
                begin: Date.now(),
                c1: i.c1,
                c2: i.c2,
                c3: i.c3
              },
              e,
              this.$as(),
              this._common,
              {
                pid: i.pid,
                _v: this.ver,
                pv_id: this.pageview,
                username: this.$at(),
                sampling: r || 1,
                z: util_1.seq()
              }
            )),
            1 === n ? pushToQueue(this, e) : r && !this.$au(r) ? this : pushToQueue(this, e))
        : this
    },
    _self: function (t, e, r) {
      var n = this,
        i = n._conf
      if ('error' !== t) return n
      if (!n.$ao(i.imgUrl)) return n
      if (!e || i.disabled || !i.pid || !selfId) return n
      if (r && !n.$au(r)) return n
      e = util_1.ext({ t: t, times: 1, page: util_1.selfErrPage, tag: i.pid, begin: Date.now() }, e, {
        pid: selfId,
        _v: n.ver,
        sampling: r || 1,
        z: util_1.seq()
      })
      var o = n.$ak[0]
      if (o) {
        o.times++
        try {
          if (o.err && e.err && o.err.msg_raw && e.err.msg_raw) {
            o.err.msg_raw.split('&').indexOf(e.err.msg_raw) < 0 && o.err.msg_raw.length < 1e3 && (o.err.msg_raw += '&' + e.err.msg_raw)
          }
        } catch (a) {}
      } else
        n.$ak.unshift(e),
          n.$ag(function () {
            n.sdkFlag &&
              ((n.sdkFlag = !1),
              (n.$aw = util_1.delay(function () {
                n.$av()
              }, 1e4)))
          })
    },
    custom: function (t, e) {
      if (!t || 'object' != typeof t) return this
      var r = !1,
        n = { begin: Date.now() }
      return (
        util_1.each(t, function (t, e) {
          return !(r = e && e.length <= 20) && util_1.warn('[retcode] invalid key: ' + e), (n['x-' + e] = t), r
        }),
        r ? this._lg('custom', n, e || 1) : this
      )
    }
  })
var base = Base,
  validApiKeys = ['api', 'success', 'time', 'code', 'msg', 'trace', 'traceId', 'begin', 'pv_id', 'sid', 'seq', 'domain', 'flag'],
  parseStatData = function (t) {
    var e = (t.key || 'default').split('::')
    return e.length > 1 ? util_1.ext(t, { group: e[0], key: e[1] }) : util_1.ext(t, { group: 'default_group', key: e[0] })
  },
  Reporter = function (t) {
    base.call(this, t)
    var e
    try {
      e = 'object' == typeof performance ? performance.timing.fetchStart : Date.now()
    } catch (r) {
      e = Date.now()
    }
    return (this._startTime = e), this
  }
;(Reporter.prototype = util_1.$a2(base.prototype)),
  util_1.ext(base.dftCon, { startTime: null }),
  util_1.ext(Reporter.prototype, {
    constructor: Reporter,
    _super: base,
    sum: function (t, e, r) {
      try {
        var n = util_1.$ae(t, e, 1)
        return this._lg('sum', parseStatData(n), r)
      } catch (i) {
        util_1.warn('[retcode] can not get parseStatData: ' + i)
      }
    },
    avg: function (t, e, r) {
      try {
        var n = util_1.$ae(t, e, 0)
        return this._lg('avg', parseStatData(n), r)
      } catch (i) {
        util_1.warn('[retcode] can not get parseStatData: ' + i)
      }
    },
    percent: function (t, e, r, n) {
      try {
        return this._lg('percent', parseStatData({ key: t, subkey: e, val: r || 0, begin: Date.now() }), n)
      } catch (i) {
        util_1.warn('[retcode] can not get parseStatData: ' + i)
      }
    },
    msg: function (t, e) {
      if (t && !(t.length > 180)) return this.custom({ msg: t }, e)
    },
    error: function (t, e) {
      if (!t) return util_1.warn('[retcode] invalid param e: ' + t), this
      1 === arguments.length
        ? ('string' == typeof t && ((t = { message: t }), (e = {})), 'object' == typeof t && (e = t = t.error || t))
        : ('string' == typeof t && (t = { message: t }), 'object' != typeof e && (e = {}))
      var r = t.name || 'CustomError',
        n = t.message || '',
        i = t.stack || ''
      e = e || {}
      if (util_1.$ac(n, e.filename)) {
        var o = /^Script error\.?$/,
          a = t.msg || t.message
        if (util_1.$a5(a, o) || util_1.$a5(util_1.decode(a), o)) return this
        var s = { msg: util_1.selfErrKey, err: { msg_raw: util_1.encode(t.msg || t.message) } }
        return this._self('error', s, 1)
      }
      for (
        var u = {
            begin: Date.now(),
            cate: r,
            msg: n && n.substring(0, 1e3),
            stack: i && i.substring(0, 1e3),
            file: util_1.$aa(e.filename || ''),
            line: e.lineno || '',
            col: e.colno || '',
            err: { msg_raw: util_1.encode(n), stack_raw: util_1.encode(i) }
          },
          c = ['tag', 'c1', 'c2', 'c3'],
          f = 0;
        f < c.length;
        f++
      ) {
        var l = c[f]
        e[l] && (u[l] = e[l])
      }
      var g = (this.getConfig('ignore') || {}).ignoreErrors
      return util_1.$a5(u.msg, g) || util_1.$a5(util_1.decode(u.msg), g)
        ? this
        : (this.$az && this.$az('error', u), this._lg('error', u, 1))
    },
    behavior: function (t) {
      if (t) {
        var e = 'object' == typeof t && t.behavior ? t : { behavior: t }
        return this.$az && this.$az('behavior', e), this._lg('behavior', e, 1)
      }
    },
    api: function (t, e, r, n, i, o, a, s, u, c, f, l) {
      if (!t) return util_1.warn('[retcode] api is null'), this
      if (
        ((t =
          'string' == typeof t
            ? {
                api: t,
                success: e,
                time: r,
                code: n,
                msg: i,
                begin: o,
                traceId: a,
                pv_id: s,
                apiSnapshot: u,
                domain: c,
                flag: l
              }
            : util_1.sub(t, validApiKeys)),
        !util_1.$a7(t.api, !0))
      )
        return this
      t.code = t.code || ''
      var g = t.msg || ''
      if (
        ((g = 'string' == typeof g ? g.substring(0, 1e3) : g),
        (t.msg = g),
        (t.success = t.success ? 1 : 0),
        (t.time = +t.time),
        (t.begin = t.begin),
        (t.traceId = t.traceId || ''),
        (t.pv_id = t.pv_id || ''),
        (t.domain = t.domain || ''),
        (t.flag = t.flag),
        t.success ? t.apiSnapshot && delete t.apiSnapshot : (t.apiSnapshot = u),
        f && (t.traceOrigin = f),
        !t.api || isNaN(t.time))
      )
        return util_1.warn('[retcode] invalid time or api'), this
      var p = (this.getConfig('ignore') || {}).ignoreApis
      return util_1.$a5(t.api, p) || util_1.$a5(util_1.decode(t.api), p)
        ? this
        : (this.$az && this.$az('api', t), this._lg('api', t, t.success && this.getConfig('sample'), t.flag))
    },
    speed: function (t, e, r) {
      var n = this,
        i = this.getConfig('startTime') || this._startTime
      return /^s(\d|1[0])$/.test(t)
        ? ((e = 'number' != typeof e ? Date.now() - i : e >= i ? e - i : e),
          (n.$ax = n.$ax || {}),
          (n.$ax[t] = e),
          (n.$ax.begin = i),
          clearTimeout(n.$ay),
          (n.$ay = setTimeout(function () {
            r || (n.$ax.page = n.$am(!0)), n._lg('speed', n.$ax), (n.$ax = null)
          }, 5e3)),
          n)
        : (util_1.warn('[retcode] invalid point: ' + t), n)
    },
    performance: function (t) {
      if (t && 'object' == typeof t && !this.$b0) {
        var e = {},
          r = {},
          n = this.getConfig('autoSendPerf')
        if (t.autoSend && n) return (r = util_1.ext(this.$b1 || {}, t)), (this.$b0 = !0), this._lg('perf', r, this.getConfig('sample'))
        if (t.autoSend && !n)
          return (
            delete t.autoSend,
            this.$b1
              ? ((r = util_1.ext(this.$b1 || {}, t)), (this.$b0 = !0), this._lg('perf', r, this.getConfig('sample')))
              : void (this.$b1 = t)
          )
        for (var i in t) (/^t([1-9]|1[0])$/.test(i) || 'ctti' === i || 'cfpt' === i) && (e[i] = t[i])
        if (!0 === t.autoSend || (!n && (n || this.$b1)))
          return !0 !== t.autoSend && !1 === n && this.$b1
            ? ((e = util_1.ext(this.$b1 || {}, e)), (this.$b0 = !0), this._lg('perf', e, this.getConfig('sample')))
            : void 0
        this.$b1 = util_1.ext(this.$b1 || {}, e)
      }
    },
    resource: function (t, e) {
      if (!t || !util_1.isPlainObject(t)) return util_1.warn('[arms] invalid param data: ' + t), this
      var r = Object.keys(t),
        n = ['begin', 'dom', 'load', 'res', 'dl'],
        i = !1
      for (var o in n) {
        if (r.indexOf(n[o]) < 0) {
          i = !0
          break
        }
      }
      if (i) return util_1.warn('[arms] lack param data: ' + t), this
      var a = {
        begin: t.begin || Date.now(),
        dom: t.dom || '',
        load: t.load || '',
        res: util_1.isArray(t.res) ? JSON.stringify(t.res) : JSON.stringify([]),
        dl: t.dl || ''
      }
      return this._lg('res', a, e)
    }
  }),
  (Reporter._super = base),
  (Reporter._root = base),
  (base.Reporter = Reporter)
var reporter = Reporter,
  MiniProgramLogger = function (t) {
    ;(t && t.pid) || util_1.warn('[arms] pid is a required prop to instatiate MiniProgramLogger')
    var e = this
    return (
      reporter.call(e, t),
      (e.appBegin = Date.now()),
      (e._health = { errcount: 0, apisucc: 0, apifail: 0 }),
      (e.DEFAUT_PAGE_PATH = '[app]'),
      (e.isSendPerf = !1),
      (e.$az = function (t, r) {
        'error' === t ? e._health.errcount++ : 'api' === t && e._health[r.success ? 'apisucc' : 'apifail']++
      }),
      'function' == typeof e.$b2 && e.$b2(),
      e._conf && e._conf.behavior && 'function' == typeof e.$b3 && e.$b3(),
      'function' == typeof e.$b4 && e.$b4(),
      this
    )
  }
;(MiniProgramLogger.prototype = util_1.$a2(reporter.prototype)),
  util_1.ext(reporter._root.dftCon, {
    uid: null,
    setUsername: null,
    disableHook: !1,
    enableLinkTrace: !1,
    behavior: !1,
    enableConsole: !1,
    sendRequest: function () {},
    getCurrentPage: function () {}
  }),
  util_1.ext(MiniProgramLogger.prototype, {
    constructor: MiniProgramLogger,
    _super: reporter,
    $ag: function (t) {
      t()
    },
    $ap: function (t, e) {
      if (this.getConfig('debug'))
        'undefined' != typeof console && console && 'function' == typeof console.log && console.log('[arms] [DEBUG MODE] log data', t)
      else {
        var r = this.getConfig('imgUrl')
        'object' == typeof t && (t = util_1.serialize(t))
        var n = r + t
        e && (n += '&post_res=')
        var i = this._conf.sendRequest
        if ('function' == typeof i)
          try {
            i(n, e)
          } catch (o) {
            util_1.warn('[arms] error in $ap', o)
          }
      }
    },
    $ar: function (t, e) {
      var r = {}
      ;(r[e] = t[e]), delete t[e], this.$ap(t, r)
    },
    $am: function () {
      var t = this._conf.getCurrentPage
      if ('function' == typeof t)
        try {
          var e = t()
          if (e && 'string' == typeof e) return e
        } catch (r) {
          util_1.warn('[arms] error in $am', r)
        }
      return 'string' == typeof t && t ? t : this.DEFAUT_PAGE_PATH
    },
    $b5: function () {
      this.setCommonInfo({ sid: util_1.uu() })
    },
    setConfig: function (t) {
      if (t && 'object' == typeof t) {
        util_1.$a6(t), (t = this.$an(t))
        var e = this._conf
        this._conf = util_1.ext({}, this._conf, t)
        var r = 'disableHook'
        r in t &&
          e[r] !== t[r] &&
          (t[r] ? 'function' == typeof this.removeHook && this.removeHook() : 'function' == typeof this.addHook && this.addHook())
      }
    },
    appLaunch: function () {
      this.appBegin = Date.now()
    },
    pageShow: function () {
      var t = this
      t.$al(),
        t.$b6(),
        clearTimeout(t.$b7),
        t.$b8(),
        (t.$b7 = setTimeout(function () {
          t.$b9()
        }, 50)),
        (t.pvPage = t.$am())
    },
    pageHide: function () {
      this.$b8()
    },
    addHook: function () {
      return this
    },
    removeHook: function () {
      return this
    },
    hookApp: function (t) {
      var e = this,
        r = {
          onLaunch: function () {
            var r = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments),
              n = t.onLaunch
            try {
              e.appLaunch()
            } catch (i) {
              util_1.warn('[arms] error in hookApp:onLaunch', i)
            }
            if ('function' == typeof n) return n.apply(this, r)
          },
          onError: function (r) {
            var n = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments),
              i = t.onError
            try {
              e.error(r), e.getConfig('behavior') && 'function' == typeof e.reportBehavior && e.reportBehavior()
            } catch (r) {
              util_1.warn('[arms] error in hookApp:onError', r)
            }
            if ('function' == typeof i) return i.apply(this, n)
          }
        }
      return util_1.ext({}, t, r)
    },
    hookPage: function (t) {
      var e = this,
        r = {
          onShow: function () {
            var r = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments),
              n = t.onShow
            try {
              e.pageShow()
            } catch (i) {
              util_1.warn('[arms] error in hookPage:pageShow', i)
            }
            if ('function' == typeof n) return n.apply(this, r)
          },
          onHide: function () {
            var r = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments),
              n = t.onHide
            try {
              e.pageHide()
            } catch (i) {
              util_1.warn('[arms] error in hookPage:onHide', i)
            }
            if ('function' == typeof n) return n.apply(this, r)
          },
          onUnload: function () {
            var r = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments),
              n = t.onUnload
            try {
              e.pageHide()
            } catch (i) {
              util_1.warn('[arms] error in hookPage:onUnload', i)
            }
            if ('function' == typeof n) return n.apply(this, r)
          }
        }
      return util_1.ext({}, t, r)
    },
    $b2: function () {},
    $b4: function () {
      this.setCommonInfo({ app: 'mini_common', uid: this._conf.uid })
    },
    $b9: function () {
      var t = this
      t.$ag(function () {
        t._lg('pv', {}, t.getConfig('pvSample'))
      })
    },
    $b6: function () {
      var t = this
      t.isSendPerf ||
        (t.$ag(function () {
          var e = { fpt: Date.now() - t.appBegin }
          t._lg('perf', e, t.getConfig('sample'))
        }),
        (t.isSendPerf = !0))
    },
    $b8: function () {
      this.$ba(), this.$ax && (this._lg('speed', this.$ax), (this.$ax = null), clearTimeout(this.$ay)), this.$ai(!0)
    },
    $ba: function () {
      if (this.pvPage) {
        var t = util_1.ext({}, this._health)
        ;(t.healthy = t.errcount > 0 ? 0 : 1), (t.begin = Date.now())
        var e = t.begin - this.sBegin
        ;(t.page = this.pvPage),
          (t.stay = e),
          this._lg('health', t, 1),
          (this._health = { errcount: 0, apisucc: 0, apifail: 0 }),
          (this.pvPage = null)
      }
    }
  })
var singleton = null,
  generator = function (t) {
    return singleton || (singleton = new MiniProgramLogger(t || {})), singleton
  }
;(MiniProgramLogger.createExtraInstance = function (t) {
  t && 'object' == typeof t ? ((t.disableHook = !0), (t.behavior = !1)) : (t = { disableHook: !0, behavior: !1 })
  return new MiniProgramLogger(t)
}),
  (MiniProgramLogger.init = generator),
  (MiniProgramLogger.singleton = generator),
  (MiniProgramLogger._super = reporter),
  (MiniProgramLogger._root = reporter._root),
  (reporter.MiniProgramLogger = MiniProgramLogger)
var miniProgramLogger = MiniProgramLogger,
  hook = function (t) {
    var e = util_1,
      r = null,
      n = {}
    return (
      e.ext(t.prototype, {
        addHook: function () {
          return this.isHookInstantiated
            ? this
            : (function () {
                var t = this
                if ('undefined' != typeof wx && wx && 'function' == typeof wx.request) {
                  r = wx
                  var i = {
                    request: function (r) {
                      var n = new Date().getTime()
                      if (r && 'object' == typeof r && r[0]) {
                        var i,
                          o,
                          a = r[0],
                          s = e.$a9(a.url),
                          u = a.success,
                          c = a.fail,
                          f = a && a.header
                        ;(f && 'object' == typeof f) || (f = {})
                        var l = {}
                        if (t.getConfig('enableLinkTrace')) {
                          var g = f['EagleEye-pAppName']
                          if (
                            ((i = f['EagleEye-TraceID']),
                            (o = f['EagleEye-SessionID']),
                            i || ((i = t.getTraceId()['EagleEye-TraceID']), (l['EagleEye-TraceID'] = i)),
                            o || ((o = t.getPageviewId()['EagleEye-SessionID']), (l['EagleEye-SessionID'] = o)),
                            !g)
                          ) {
                            var p = t.getConfig('pid')
                            l['EagleEye-pAppName'] = p
                          }
                        }
                        ;(a.success = function () {
                          var a = new Date().getTime()
                          if (e.$a7(s, !0)) {
                            var c = (arguments && arguments[0] && arguments[0].statusCode) || 200
                            t.api({ api: r[0].url, success: !0, time: a - n, code: c, begin: n, traceId: i, pv_id: o })
                          }
                          u && u.apply(t, [].slice.call(arguments))
                        }),
                          (a.fail = function () {
                            var a = new Date().getTime()
                            if (e.$a7(s, !0)) {
                              var u = ''
                              arguments &&
                                arguments[0] &&
                                'object' == typeof arguments[0] &&
                                (u = (u = JSON.stringify(arguments[0])).substring(0, 1e3))
                              var f = (arguments && arguments[0] && arguments[0].statusCode) || 'FAILED'
                              t.api({
                                api: r[0].url,
                                success: !1,
                                time: a - n,
                                code: f,
                                msg: u,
                                begin: n,
                                traceId: i,
                                pv_id: o
                              })
                            }
                            c && c.apply(t, [].slice.call(arguments))
                          }),
                          (a.header = e.ext({}, f, l))
                      }
                    }
                  }
                  for (var o in wx)
                    if (i[o]) {
                      var a = o.toString()
                      n[a] = function () {
                        return i[a](arguments), r[a].apply(r, [].slice.call(arguments))
                      }
                    } else n[o] = r[o]
                  wx = n
                }
              }.call(this),
              (this.isHookInstantiated = !0),
              this)
        },
        removeHook: function () {
          return this.isHookInstantiated
            ? (function () {
                'undefined' != typeof wx && wx && r && ((wx = r), (r = null))
              }.call(this),
              (this.isHookInstantiated = !1),
              this)
            : this
        },
        $b2: function () {
          return this.$bb ? this : (this.getConfig('disableHook') || this.addHook(), (this.$bb = !0), this)
        }
      }),
      t
    )
  },
  miniBehavior = function (t) {
    var e = [],
      r = util_1.reWriteMethod,
      n = {
        consoleBehavior: function () {
          if (console) {
            var t = ['debug', 'info', 'warn', 'log', 'error'],
              e = null
            if ((Function && (e = Function.prototype.apply || Function.apply), 'function' == typeof e))
              for (var n = this, i = 0; i < t.length; i++) {
                var o = t[i]
                'function' == typeof console[o] &&
                  r(console, o, function (t) {
                    var r = o
                    return function () {
                      for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++) o[a] = arguments[a]
                      var s = { type: 'console', data: { level: r, message: o } }
                      n && 'function' == typeof n.addBehavior && n.addBehavior(s), 'function' == typeof t && e.call(t, console, o)
                    }
                  })
              }
          }
        }
      }
    return (
      util_1.ext(t.prototype, {
        addBehavior: function (t) {
          if (this.getConfig('behavior') && t && 'object' == typeof t) {
            var r = ''
            this._conf && 'function' == typeof this._conf.getCurrentPage && (r = this._conf.getCurrentPage())
            var n = null
            try {
              n = Date.now()
            } catch (s) {
              return void util_1.warn('[arms] error in Date.now', s)
            }
            var i = {},
              o = t.data || {}
            if (t.type) i = o
            else {
              if ('string' != typeof o.name || 'string' != typeof o.message) return
              ;(i.name = o.name.substr(0, 20)), (i.message = o.message.substr(0, 200))
            }
            i.message && (i.message = util_1.encode(i.message))
            var a = { type: t.type || 'custom', data: i || {}, timestamp: t.timestamp || n, page: t.page || r }
            return e.push(a), (e = e.slice(-100))
          }
        },
        getBehavior: function () {
          return e || []
        },
        setBehavior: function (t) {
          return t && (e = t), e
        },
        reportBehavior: function () {
          var t = this
          t.getConfig('behavior') &&
            (t.$bc && (clearTimeout(t.$bc), (t.$bc = undefined)),
            (t.$bc = setTimeout(function () {
              e && e.length > 0 && ('function' == typeof t.behavior && t.behavior(e), (e = []))
            }, 0)))
        },
        $b3: function () {}
      }),
      n
    )
  },
  behavior = function (t, e) {
    var r = null,
      n = '',
      i = function (t) {
        return function () {
          if (t && r) {
            var e = r,
              n = t + 'timmer'
            e[n] && (clearTimeout(e[n]), (e[n] = undefined)),
              (e[n] = setTimeout(function () {
                'function' == typeof e.addBehavior && e.addBehavior({ type: 'ui.default', data: { level: t } })
              }, 100))
          }
        }
      },
      o = miniBehavior(t) || {}
    util_1.ext(t.prototype, {
      $b3: function () {
        if (!this.hasInitBehavior && !r && void 0 !== e && e) {
          try {
            this.getConfig('enableConsole') && 'function' == typeof o.consoleBehavior && o.consoleBehavior.call(this),
              e &&
                ('function' == typeof e.onKeyboardHeightChange && e.onKeyboardHeightChange(i('KeyboardHeightChange')),
                'function' == typeof e.onPageNotFound && e.onPageNotFound(i('PageNotFound')),
                'function' == typeof e.onAppShow && e.onAppShow(i('AppShow')),
                'function' == typeof e.onAppHide && e.onAppHide(i('AppHide'))),
              e &&
                'function' == typeof e.onAppRoute &&
                e.onAppRoute(function (t) {
                  var e = {
                    type: 'navigation',
                    data: {
                      level: (t && t.openType) || 'unknown',
                      from: n || 'unknown',
                      to: (t && t.path) || 'unknown'
                    }
                  }
                  r && 'function' == typeof r.addBehavior && r.addBehavior(e), (n = (t && t.path) || '')
                }),
              e && 'function' == typeof e.onError && e.onError(this.reportBehavior.bind(this))
          } catch (t) {
            util_1.warn('[arms] error in initBehavior', t)
          }
          return (r = this), (this.hasInitBehavior = !0), this
        }
      }
    })
  },
  ARMS_STORAGE_MINIPROGRAM_WX_UID_KEY = 'ARMS_STORAGE_MINIPROGRAM_WX_UID_KEY',
  WXLogger = function (t) {
    return miniProgramLogger.call(this, t), this
  }
;(WXLogger.prototype = util_1.$a2(miniProgramLogger.prototype)),
  util_1.ext(miniProgramLogger._root.dftCon, {
    sendRequest: function (t, e) {
      if ('undefined' != typeof wx && wx && 'function' == typeof wx.request)
        try {
          var r,
            n = 'GET'
          e && ((n = 'POST'), (r = JSON.stringify(e))),
            wx.request({
              url: t,
              method: n,
              data: r,
              fail: function (t) {
                util_1.warn('[arms] sendRequest fail', t)
              }
            })
        } catch (i) {
          util_1.warn('[arms] error in conf sendRequest', i)
        }
    },
    getCurrentPage: function () {
      if ('function' == typeof getCurrentPages)
        try {
          var t = getCurrentPages() || [],
            e = t[t.length - 1]
          return (e && e.route) || null
        } catch (r) {
          util_1.warn('[arms] error in conf getCurrentPage', r)
        }
    }
  }),
  util_1.ext(WXLogger.prototype, {
    constructor: WXLogger,
    _super: miniProgramLogger,
    $b4: function () {
      this.setCommonInfo({ app: 'mini_wx' }), this.$bd(), this.$be(), this.$bf(), this.$b5()
    },
    $bf: function () {
      if (this._conf && this._conf.uid) this.setCommonInfo({ uid: this._conf.uid })
      else if ('undefined' != typeof wx && wx && 'function' == typeof wx.getStorageSync)
        try {
          var t = wx.getStorageSync(ARMS_STORAGE_MINIPROGRAM_WX_UID_KEY)
          if (t && 'string' == typeof t) this.setCommonInfo({ uid: t })
          else if ('function' == typeof wx.setStorageSync) {
            var e = util_1.uu()
            wx.setStorageSync(ARMS_STORAGE_MINIPROGRAM_WX_UID_KEY, e), this.setCommonInfo({ uid: e })
          }
        } catch (r) {
          util_1.warn('[arms] error in $bf', r)
        }
    },
    $bd: function () {
      if ('undefined' != typeof wx && wx && 'function' == typeof wx.getSystemInfoSync)
        try {
          var t = wx.getSystemInfoSync()
          'object' == typeof t &&
            this.setCommonInfo({
              sr: (t.screenWidth || 0) + 'x' + (t.screenHeight || 0),
              vp: (t.windowWidth || 0) + 'x' + (t.windowHeight || 0),
              dpr: t.pixelRatio,
              ul: t.language
            })
        } catch (e) {
          util_1.warn('[arms] error in $bd', e)
        }
    },
    $be: function () {
      var t = this
      if ('undefined' != typeof wx && wx && 'function' == typeof wx.getNetworkType)
        try {
          wx.getNetworkType({
            success: function (e) {
              e && 'string' == typeof e.networkType && t.setCommonInfo({ ct: e.networkType })
            },
            fail: function (t) {
              util_1.warn('[arms] $be getNetworkType fail', t)
            }
          })
        } catch (e) {
          util_1.warn('[arms] error in $be', e)
        }
    },
    hookApp: function (t) {
      var e = this,
        r = {
          onError: function (r) {
            var n = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments),
              i = t.onError
            try {
              if ((r && 'object' == typeof r && e.error(r), r && 'string' == typeof r)) {
                var o = r.split('\n'),
                  a = '',
                  s = ''
                o.length > 1 && ((a = o[0] && o[0].length < 100 ? o[0] : o[0].substring(0, 100)), (s = o[1])),
                  e.error({ name: a, message: s || r, stack: r })
              }
            } catch (r) {
              util_1.warn('[arms] error in hookApp:onError', r)
            }
            if ('function' == typeof i) return i.apply(this, n)
          },
          onLaunch: function () {
            var r = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments),
              n = t.onLaunch
            try {
              e.appLaunch()
            } catch (i) {
              util_1.warn('[arms] error in hookApp:onLaunch', i)
            }
            if ('function' == typeof n) return n.apply(this, r)
          }
        }
      return util_1.ext({}, t, r)
    }
  }),
  hook(WXLogger),
  'undefined' != typeof wx && wx && behavior(WXLogger, wx)
var singleton$1 = null,
  generator$1 = function (t) {
    return singleton$1 || (singleton$1 = new WXLogger(t || {})), singleton$1
  }
;(WXLogger.createExtraInstance = function (t) {
  t && 'object' == typeof t ? ((t.disableHook = !0), (t.behavior = !1)) : (t = { disableHook: !0, behavior: !1 })
  return new WXLogger(t)
}),
  (WXLogger.init = generator$1),
  (WXLogger.singleton = generator$1),
  (WXLogger._super = miniProgramLogger),
  (WXLogger._root = miniProgramLogger._root),
  (miniProgramLogger.WXLogger = WXLogger)
var clazz = WXLogger
module.exports = clazz
