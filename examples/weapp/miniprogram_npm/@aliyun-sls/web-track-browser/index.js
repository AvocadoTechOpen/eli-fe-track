module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1659346355484, function(require, module, exports) {


Object.defineProperty(exports, '__esModule', { value: true });

class WebTracker {
    constructor(opt) {
        var _a, _b;
        this.timer = null;
        this.time = 10;
        this.count = 10;
        this.arr = [];
        this.time = (_a = opt.time) !== null && _a !== void 0 ? _a : 10; //定义时间，number类型
        this.count = (_b = opt.count) !== null && _b !== void 0 ? _b : 10; //定义数据条数，number类型
        this.url = 'https://' + opt.project + '.' + opt.host + '/logstores/' + opt.logstore + '/track';
        this.opt = opt;
        if (opt.installUnloadHook && typeof opt.installUnloadHook === 'function') {
            opt.installUnloadHook(() => {
                this.platformSend(this.assemblePayload());
            });
        }
    }
    assemblePayload(arr = this.arr) {
        const payload = {
            __logs__: arr,
        };
        if (this.opt.tags) {
            payload.__tags__ = this.opt.tags;
        }
        if (this.opt.topic) {
            payload.__topic__ = this.opt.topic;
        }
        if (this.opt.source) {
            payload.__source__ = this.opt.source;
        }
        return JSON.stringify(payload);
    }
    platformSend(payloadStr) {
        if (this.opt.sendPayload && typeof this.opt.sendPayload === 'function') {
            this.opt.sendPayload(this.url, payloadStr);
        }
    }
    transString(obj) {
        let newObj = {};
        for (let i in obj) {
            if (typeof obj[i] == 'object') {
                newObj[i] = JSON.stringify(obj[i]);
            }
            else {
                newObj[i] = String(obj[i]);
            }
        }
        return newObj;
    }
    sendImmediateInner() {
        if (this.arr && this.arr.length > 0) {
            this.platformSend(this.assemblePayload());
            if (this.timer != null) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.arr = [];
        }
    }
    sendInner() {
        if (this.timer) {
            if (this.arr.length >= this.count) {
                clearTimeout(this.timer);
                this.timer = null;
                this.sendImmediateInner();
            }
        }
        else {
            const that = this;
            if (this.arr.length >= this.count || this.time <= 0) {
                this.sendImmediateInner();
            }
            else {
                this.timer = setTimeout(function () {
                    that.sendImmediateInner();
                }, this.time * 1000);
            }
        }
    }
    send(originLog) {
        const obj = this.transString(originLog);
        this.arr.push(obj);
        this.sendInner();
    }
    sendImmediate(originLog) {
        const obj = this.transString(originLog);
        this.arr.push(obj);
        this.sendImmediateInner();
    }
    sendBatchLogs(originLogs) {
        const logs = originLogs.map((originLog) => this.transString(originLog));
        this.arr.push(...logs);
        this.sendInner();
    }
    sendBatchLogsImmediate(originLogs) {
        const logs = originLogs.map((originLog) => this.transString(originLog));
        this.arr.push(...logs);
        this.sendImmediateInner();
    }
}

function sendBeacon(url, payload) {
    if (navigator && navigator.sendBeacon) {
        return navigator.sendBeacon(`${url}?APIVersion=0.6.0`, payload);
    }
    return false;
}
function sendUseXhr(url, reqPayload) {
    const httpRequest_ = new window.XMLHttpRequest();
    httpRequest_.open('POST', url, true);
    httpRequest_.setRequestHeader('x-log-apiversion', '0.6.0');
    httpRequest_.setRequestHeader('x-log-bodyrawsize', reqPayload.length.toString());
    const blob = new Blob([reqPayload], {
        type: 'application/x-protobuf',
    });
    httpRequest_.send(blob);
}
function send(url, payload) {
    try {
        if (!sendBeacon(url, payload)) {
            sendUseXhr(url, payload);
        }
    }
    catch (ex) {
        if (window && window.console && typeof window.console.error === 'function') {
            console.error('Failed to log to ali log service because of this exception:\n' + ex);
            console.error('Failed log data:', url);
        }
    }
}
class WebTrackerBrowser extends WebTracker {
    constructor(opt) {
        const superOpt = Object.assign({}, opt, {
            installUnloadHook: (hook) => {
                window.addEventListener('beforeunload', () => {
                    hook();
                });
            },
            sendPayload: (url, payload) => {
                send(url, payload);
            },
        });
        super(superOpt);
    }
}

function defineGlobal(global, name, api) {
    global[name] = api;
}
defineGlobal(window, 'SLS_Tracker', WebTrackerBrowser);

exports["default"] = WebTrackerBrowser;
exports.defineGlobal = defineGlobal;
//# sourceMappingURL=web-track-browser.cjs.js.map

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1659346355484);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map