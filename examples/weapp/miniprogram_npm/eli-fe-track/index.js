module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1659407685618, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("./logService/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _index["default"];
exports["default"] = _default;
}, function(modId) {var map = {"./logService/index":1659407685619}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1659407685619, function(require, module, exports) {


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _wxUtil = require("../utils/wxUtil");

var _util = require("../utils/util");

var _types = require("../types");

var _config = require("../config");

function _regeneratorRuntime() {  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// import { createRealtimeLogManager } from './WxRealtimeLogManager'
// import SlsTrackerMini from '@aliyun-sls/web-track-mini'
// import SlsTrackerBrowser from '@aliyun-sls/web-track-browser'
var Logger = /*#__PURE__*/function () {
  function Logger() {
    _classCallCheck(this, Logger);

    if (!Logger.instance) {
      this.initState = false;
      this.options = _config.defaultConfig;
      this.envData = {};
      this.tracker = null;
      this.WxRealtimeLogManager = null;
      Logger.instance = this;
    }

    return Logger.instance;
  }
  /**
   * @description: ??????
   * @param {*} opts
   */


  _createClass(Logger, [{
    key: "config",
    value: function config() {
      var _this = this;

      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _config.defaultConfig;
      return new Promise( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
          var _this$options$Base, platform, appId, SlsTracker, WxRealTimeLog, showConfigInfo, version, _yield$import, SlsTrackerBrowser, _yield$import2, SlsTrackerMini, _yield$import3, createRealtimeLogManager;

          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _this.options.Base = _objectSpread(_objectSpread({}, _this.options.Base), opts.Base);
                  _this$options$Base = _this.options.Base, platform = _this$options$Base.platform, appId = _this$options$Base.appId, SlsTracker = _this$options$Base.SlsTracker, WxRealTimeLog = _this$options$Base.WxRealTimeLog, showConfigInfo = _this$options$Base.showConfigInfo, version = _this$options$Base.version; // TODO ???????????????web????????????????????????????????????
                  // web??????????????? appId

                  if (!(platform === 'web' && !appId)) {
                    _context.next = 6;
                    break;
                  }

                  console.log('?????????appId, ?????????????????? !!!');
                  return _context.abrupt("return");

                case 6:
                  if (!(SlsTracker && _this._verifySlsConfig(opts.SlsTracker))) {
                    _context.next = 21;
                    break;
                  }

                  _this.options.SlsTracker = _objectSpread(_objectSpread({}, _config.defaultConfig.SlsTracker), opts.SlsTracker);

                  if (!(platform === 'web')) {
                    _context.next = 16;
                    break;
                  }

                  _context.next = 11;
                  return Promise.resolve().then(function () {
                    return _interopRequireWildcard(require('@aliyun-sls/web-track-browser'));
                  });

                case 11:
                  _yield$import = _context.sent;
                  SlsTrackerBrowser = _yield$import["default"];
                  _this.tracker = new SlsTrackerBrowser(_this.options.SlsTracker);
                  _context.next = 21;
                  break;

                case 16:
                  _context.next = 18;
                  return Promise.resolve().then(function () {
                    return _interopRequireWildcard(require('@aliyun-sls/web-track-mini'));
                  });

                case 18:
                  _yield$import2 = _context.sent;
                  SlsTrackerMini = _yield$import2["default"];
                  _this.tracker = new SlsTrackerMini(_this.options.SlsTracker);

                case 21:
                  if (!WxRealTimeLog) {
                    _context.next = 27;
                    break;
                  }

                  _context.next = 24;
                  return Promise.resolve().then(function () {
                    return _interopRequireWildcard(require('./WxRealtimeLogManager.js'));
                  });

                case 24:
                  _yield$import3 = _context.sent;
                  createRealtimeLogManager = _yield$import3["default"].createRealtimeLogManager;
                  _this.WxRealtimeLogManager = createRealtimeLogManager(version);

                case 27:
                  // ????????????????????????????????????
                  if (platform === 'mini') {
                    _this.sendSysInfo();
                  } // config ????????????


                  _this.initState = true;
                  showConfigInfo && console.log('Logger config:', _this.options);
                  resolve(_this.initState);
                  _context.next = 37;
                  break;

                case 33:
                  _context.prev = 33;
                  _context.t0 = _context["catch"](0);
                  console.error('config error:', _context.t0);
                  reject(_context.t0);

                case 37:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 33]]);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    } // ??????sls?????????

  }, {
    key: "_verifySlsConfig",
    value: function _verifySlsConfig(opts) {
      var flag = opts && opts.host && opts.project && opts.logstore;
      !flag && console.error('????????? showConfigInfo, ??????SlsTracker ?????? !!!');
      return flag;
    } // ???????????????????????????

  }, {
    key: "sendSysInfo",
    value: function sendSysInfo() {
      var _this2 = this;

      if (this.options.Base.platform === 'mini') {
        var _wx$getAccountInfoSyn = wx.getAccountInfoSync(),
            miniProgram = _wx$getAccountInfoSyn.miniProgram;

        var sysInfo = wx.getSystemInfoSync();

        var envData = _objectSpread(_objectSpread({
          APPVersion: this.options.Base.version
        }, miniProgram), sysInfo);

        wx.getNetworkType({
          complete: function complete(res) {
            envData.networkType = res.networkType;
            _this2.envData = envData;

            _this2.send({
              type: _types.LogType.SysInfo,
              level: _types.LogLevel.Info,
              event: _types.LogType.SysInfo,
              envData: JSON.stringify(envData)
            });
          }
        });
      } else {
        var BrowserInfo = (0, _util.getBrowserInfo)();
        var _this$options$Base2 = this.options.Base,
            version = _this$options$Base2.version,
            appId = _this$options$Base2.appId,
            traceId = _this$options$Base2.traceId;
        this.envData = _objectSpread(_objectSpread({}, BrowserInfo), {}, {
          appId: appId,
          traceId: traceId,
          APPVersion: version // ????????????

        });
        this.send({
          type: _types.LogType.SysInfo,
          level: _types.LogLevel.Info,
          event: _types.LogType.SysInfo,
          envData: JSON.stringify(this.envData)
        });
      }
    } // ?????????????????????

  }, {
    key: "log",
    value: function log() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      params = _objectSpread({
        event: event,
        type: _types.LogType.Custom,
        level: _types.LogLevel.Log
      }, params);
      this.send(params);
    } // ????????????

  }, {
    key: "logApiRequest",
    value: function logApiRequest() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      params = _objectSpread({
        type: _types.LogType.ApiRequest,
        level: _types.LogLevel.Info,
        event: event
      }, params); // arms ??????

      if (this.options.Base.ArmsMonitor) {
        this.ArmsMonitor.api({
          api: params.api,
          success: params.success,
          time: params.time,
          code: params.code,
          msg: params.msg,
          begin: params.begin,
          requestId: params.requestId
        });
      }

      if (params.level === _types.LogLevel.Error) {
        params.type = _types.LogType.FailRequest;
      }

      this.send(params);
    }
  }, {
    key: "logLifeCycle",
    value: function logLifeCycle() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      params = _objectSpread({
        type: _types.LogType.LifeCycle,
        level: _types.LogLevel.Info,
        event: event
      }, params);
      this.send(params);
    }
  }, {
    key: "logAction",
    value: function logAction() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      params = _objectSpread({
        type: _types.LogType.Action,
        level: _types.LogLevel.Log,
        event: event
      }, params);
      this.send(params);
    }
  }, {
    key: "logSocketEvent",
    value: function logSocketEvent() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      params = _objectSpread({
        type: _types.LogType.SocketEvent,
        level: _types.LogLevel.Info,
        event: event
      }, params);
      this.send(params);
    }
  }, {
    key: "logNetEvent",
    value: function logNetEvent() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      params = _objectSpread({
        type: _types.LogType.NetEvent,
        level: _types.LogLevel.Info,
        event: event
      }, params);
      this.send(params);
    }
  }, {
    key: "logRenderError",
    value: function logRenderError() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      params = _objectSpread({
        type: _types.LogType.RenderError,
        level: _types.LogLevel.Warn,
        event: event
      }, params);
      this.send(params);
    } // ???????????????

  }, {
    key: "_formatData",
    value: function _formatData(data) {
      // TraceId: appId_uuid
      var appId = this.envData.appId;
      var uuid = (0, _wxUtil.getUuid)(true, this.options.Base.platform); // ??????????????????

      var curPage = (0, _wxUtil.getCurrentPage)();
      var TraceId = this.options.Base.traceId || "".concat(appId, "_").concat(uuid);
      var timestamp = new Date().getTime();
      var logId = (0, _wxUtil.getUuid)(false);
      data = _objectSpread({
        TraceId: TraceId,
        timestamp: timestamp,
        logId: logId,
        page: curPage
      }, data); // ???????????? LogLevel??????????????????

      if (this.options.Base.platform === 'mini' && [_types.LogLevel.Error, _types.LogLevel.Warn, _types.LogLevel.Debug].includes(data.level)) {
        var _this$envData = this.envData,
            APPVersion = _this$envData.APPVersion,
            networkType = _this$envData.networkType,
            _appId = _this$envData.appId,
            system = _this$envData.system,
            version = _this$envData.version,
            SDKVersion = _this$envData.SDKVersion,
            brand = _this$envData.brand,
            model = _this$envData.model,
            platform = _this$envData.platform,
            batteryLevel = _this$envData.batteryLevel,
            benchmarkLevel = _this$envData.benchmarkLevel,
            cameraAuthorized = _this$envData.cameraAuthorized,
            microphoneAuthorized = _this$envData.microphoneAuthorized,
            deviceOrientation = _this$envData.deviceOrientation;
        data = _objectSpread(_objectSpread({}, data), {}, {
          APPVersion: APPVersion,
          networkType: networkType,
          appId: _appId,
          system: system,
          version: version,
          SDKVersion: SDKVersion,
          brand: brand,
          model: model,
          platform: platform,
          batteryLevel: batteryLevel,
          benchmarkLevel: benchmarkLevel,
          cameraAuthorized: cameraAuthorized,
          microphoneAuthorized: microphoneAuthorized,
          deviceOrientation: deviceOrientation
        });
      }

      return {
        Event: data.event || data.type,
        TraceId: data.TraceId,
        LogLevel: data.level,
        LogType: data.type,
        Immediate: data.Immediate || this.options.Base.SlsImmediate,
        message: JSON.stringify(data)
      };
    } // ????????????/??????

  }, {
    key: "send",
    value: function send() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!this.initState) {
        console.error('????????????config?????? !!!');
        return;
      }

      if (!data.event) {
        console.warn('????????????????????????????????????event?????????');
        return;
      } // ???????????????


      data = this._formatData(data); // ?????????????????????

      if (this.options.Base.Console) {
        // ???????????????????????????????????????
        if (data.LogLevel === _types.LogLevel.Debug) {
          data.LogLevel = _types.LogLevel.Warn;
        }

        console[data.LogLevel](data);
      } // ??????sls??????


      if (this.tracker) {
        data.Immediate === 'true' ? this.tracker.sendImmediate(data) : this.tracker.send(data);
      } else {
        if (this.options.Base.SlsTracker) {
          console.error('????????? showConfigInfo,??????SlsTracker ?????? !!!');
        }
      } // ArmsMonitor ??????


      if (this.options.Base.ArmsMonitor) {
        // level ??? Error, ???????????? ARMSMonitor.error()??????
        if (data.LogLevel === _types.LogLevel.Error) {
          this.ArmsMonitor.error({
            name: data.event,
            message: JSON.stringify(data)
          }, {
            filename: curPage
          });
        }
      } else {
        if (this.options.Base.ArmsMonitor) {
          console.error('???????????? showConfigInfo, ??????ArmsMonitor ?????? !!!');
        }
      } // ??????????????????????????????


      if (this.options.Base.WxRealTimeLog) {
        this.WxRealtimeLogManager && this.WxRealtimeLogManager[data.LogLevel](data.event, data);
      }
    }
  }]);

  return Logger;
}();

var _default = new Logger();

exports["default"] = _default;
}, function(modId) { var map = {"../utils/wxUtil":1659407685620,"../utils/util":1659407685621,"../types":1659407685622,"../config":1659407685623,"./WxRealtimeLogManager.js":1659407685624}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1659407685620, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUuid = exports.getCurrentPage = void 0;

var getCurrentPage = function getCurrentPage() {
  if ('function' == typeof getCurrentPages) try {
    var t = getCurrentPages() || [],
        e = t[t.length - 1];
    return e && e.route || null;
  } catch (r) {
    console.warn('error in getCurrentPage', r);
    return '';
  }
};
/**
 * @description: ?????????????????????
 * @param {Boolean} fromStorage
 * @param {string} platform web | mini
 * @return {String} uuid
 */


exports.getCurrentPage = getCurrentPage;

var getUuid = function getUuid() {
  var fromStorage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var platform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'mini';
  var uuid = '';

  if (fromStorage) {
    if (platform === 'web') {
      uuid = localStorage.getItem('uuid');
    } else {
      uuid = wx.getStorageSync('uuid');
    }

    if (uuid) return uuid;
  }

  var d = new Date().getTime();
  uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
  });

  if (fromStorage) {
    if (platform === 'web') {
      uuid = localStorage.setItem('uuid', uuid);
    } else {
      uuid = wx.setStorageSync('uuid', uuid);
    }
  }

  return uuid;
};

exports.getUuid = getUuid;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1659407685621, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBrowserInfo = void 0;

var getBrowserInfo = function getBrowserInfo() {
  // ??????????????? + ???????????? > ?????? > ?????? + ?????? + ???????????? + ???????????? > ?????? + ????????????
  var ua = navigator.userAgent.toLowerCase();

  var testUa = function testUa(regexp) {
    return regexp.test(ua);
  };

  var testVs = function testVs(regexp) {
    return ua.match(regexp).toString().replace(/[^0-9|_.]/g, "").replace(/_/g, ".");
  }; // ??????


  var system = "unknow";

  if (testUa(/windows|win32|win64|wow32|wow64/g)) {
    system = "windows"; // windows??????
  } else if (testUa(/macintosh|macintel/g)) {
    system = "macos"; // macos??????
  } else if (testUa(/x11/g)) {
    system = "linux"; // linux??????
  } else if (testUa(/android|adr/g)) {
    system = "android"; // android??????
  } else if (testUa(/ios|iphone|ipad|ipod|iwatch/g)) {
    system = "ios"; // ios??????
  } // ????????????


  var systemVs = "unknow";

  if (system === "windows") {
    if (testUa(/windows nt 5.0|windows 2000/g)) {
      systemVs = "2000";
    } else if (testUa(/windows nt 5.1|windows xp/g)) {
      systemVs = "xp";
    } else if (testUa(/windows nt 5.2|windows 2003/g)) {
      systemVs = "2003";
    } else if (testUa(/windows nt 6.0|windows vista/g)) {
      systemVs = "vista";
    } else if (testUa(/windows nt 6.1|windows 7/g)) {
      systemVs = "7";
    } else if (testUa(/windows nt 6.2|windows 8/g)) {
      systemVs = "8";
    } else if (testUa(/windows nt 6.3|windows 8.1/g)) {
      systemVs = "8.1";
    } else if (testUa(/windows nt 10.0|windows 10/g)) {
      systemVs = "10";
    }
  } else if (system === "macos") {
    systemVs = testVs(/os x [\d._]+/g);
  } else if (system === "android") {
    systemVs = testVs(/android [\d._]+/g);
  } else if (system === "ios") {
    systemVs = testVs(/os [\d._]+/g);
  } // ??????


  var platform = "unknow";

  if (system === "windows" || system === "macos" || system === "linux") {
    platform = "desktop"; // ?????????
  } else if (system === "android" || system === "ios" || testUa(/mobile/g)) {
    platform = "mobile"; // ?????????
  } // ???????????????


  var engine = "unknow";
  var supporter = "unknow";

  if (testUa(/applewebkit/g)) {
    engine = "webkit"; // webkit??????

    if (testUa(/edge/g)) {
      supporter = "edge"; // edge?????????
    } else if (testUa(/opr/g)) {
      supporter = "opera"; // opera?????????
    } else if (testUa(/chrome/g)) {
      supporter = "chrome"; // chrome?????????
    } else if (testUa(/safari/g)) {
      supporter = "safari"; // safari?????????
    }
  } else if (testUa(/gecko/g) && testUa(/firefox/g)) {
    engine = "gecko"; // gecko??????

    supporter = "firefox"; // firefox?????????
  } else if (testUa(/presto/g)) {
    engine = "presto"; // presto??????

    supporter = "opera"; // opera?????????
  } else if (testUa(/trident|compatible|msie/g)) {
    engine = "trident"; // trident??????

    supporter = "iexplore"; // iexplore?????????
  } // ????????????


  var engineVs = "unknow";

  if (engine === "webkit") {
    engineVs = testVs(/applewebkit\/[\d._]+/g);
  } else if (engine === "gecko") {
    engineVs = testVs(/gecko\/[\d._]+/g);
  } else if (engine === "presto") {
    engineVs = testVs(/presto\/[\d._]+/g);
  } else if (engine === "trident") {
    engineVs = testVs(/trident\/[\d._]+/g);
  } // ????????????


  var supporterVs = "unknow";

  if (supporter === "chrome") {
    supporterVs = testVs(/chrome\/[\d._]+/g);
  } else if (supporter === "safari") {
    supporterVs = testVs(/version\/[\d._]+/g);
  } else if (supporter === "firefox") {
    supporterVs = testVs(/firefox\/[\d._]+/g);
  } else if (supporter === "opera") {
    supporterVs = testVs(/opr\/[\d._]+/g);
  } else if (supporter === "iexplore") {
    supporterVs = testVs(/(msie [\d._]+)|(rv:[\d._]+)/g);
  } else if (supporter === "edge") {
    supporterVs = testVs(/edge\/[\d._]+/g);
  } // ?????????????????????


  var shell = "none";
  var shellVs = "unknow";

  if (testUa(/micromessenger/g)) {
    shell = "wechat"; // ???????????????

    shellVs = testVs(/micromessenger\/[\d._]+/g);
  } else if (testUa(/qqbrowser/g)) {
    shell = "qq"; // QQ?????????

    shellVs = testVs(/qqbrowser\/[\d._]+/g);
  } else if (testUa(/ucbrowser/g)) {
    shell = "uc"; // UC?????????

    shellVs = testVs(/ucbrowser\/[\d._]+/g);
  } else if (testUa(/qihu 360se/g)) {
    shell = "360"; // 360?????????(?????????)
  } else if (testUa(/2345explorer/g)) {
    shell = "2345"; // 2345?????????

    shellVs = testVs(/2345explorer\/[\d._]+/g);
  } else if (testUa(/metasr/g)) {
    shell = "sougou"; // ???????????????(?????????)
  } else if (testUa(/lbbrowser/g)) {
    shell = "liebao"; // ???????????????(?????????)
  } else if (testUa(/maxthon/g)) {
    shell = "maxthon"; // ???????????????

    shellVs = testVs(/maxthon\/[\d._]+/g);
  }

  return Object.assign({
    engine: engine,
    // webkit gecko presto trident
    engineVs: engineVs,
    platform: platform,
    // desktop mobile
    supporter: supporter,
    // chrome safari firefox opera iexplore edge
    supporterVs: supporterVs,
    system: system,
    // windows macos linux android ios
    systemVs: systemVs
  }, shell === "none" ? {} : {
    shell: shell,
    // wechat qq uc 360 2345 sougou liebao maxthon
    shellVs: shellVs
  });
};

exports.getBrowserInfo = getBrowserInfo;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1659407685622, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogType = exports.LogLevel = void 0;
// ????????????
var LogLevel = {
  Error: 'error',
  Warn: 'warn',
  Info: 'info',
  Log: 'log',
  Debug: 'debug'
}; // ????????????

exports.LogLevel = LogLevel;
var LogType = {
  LifeCycle: 'lifeCycle',
  SysInfo: 'sysInfo',
  FailRequest: 'failRequest',
  ApiRequest: 'apiRequest',
  RenderError: 'renderError',
  SocketEvent: 'socketEvent',
  NetEvent: 'netEvent',
  Action: 'action',
  Custom: 'custom'
};
exports.LogType = LogType;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1659407685623, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultConfig = void 0;
// ????????????
var defaultConfig = {
  Base: {
    platform: 'mini',
    version: '1.0.0',
    appId: '',
    // ??????????????????
    traceId: '',
    // ????????????id?????????????????????????????????????????????
    showConfigInfo: false,
    // config ???????????????????????????
    SlsImmediate: 'true',
    // ??????????????????????????????Sls??????
    Console: true,
    // ?????????????????????
    SlsTracker: false,
    // ??????Sls????????????
    ArmsMonitor: false,
    // ??????Arms ????????????
    WxRealTimeLog: false // ????????????????????????????????????

  },
  SlsTracker: {
    host: '',
    // ????????????????????????????????????cn-hangzhou.log.aliyuncs.com
    project: '',
    // Project?????????
    logstore: '',
    // Logstore?????????
    time: 10,
    // ???????????????????????????????????????10??????
    count: 10,
    // ???????????????????????????????????????10??????
    topic: 'topic',
    // ????????????????????????
    source: 'source',
    tags: {
      tags: 'tags'
    }
  },
  ArmsMonitor: {},
  WxRealTimeLog: {}
};
exports.defaultConfig = defaultConfig;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1659407685624, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RUN = RUN;
exports.WARN = WARN;
exports.createRealtimeLogManager = createRealtimeLogManager;
var RealtimeLogManager = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;
var VERSION = '';

function ERROR(event, data) {
  if (RealtimeLogManager) {
    var TraceId = data.TraceId,
        type = data.type;
    RealtimeLogManager.error(event, data); // ????????????????????????????????????
    // ??????????????????????????? FilterMsg?????????????????????

    if (RealtimeLogManager.addFilterMsg) {
      try {
        RealtimeLogManager.addFilterMsg("[".concat(VERSION, "] ").concat(TraceId, " ").concat(event, " ").concat(type, " "));
      } catch (e) {
        RealtimeLogManager.setFilterMsg("[".concat(VERSION, "] ").concat(event));
      }
    }
  }
}

function WARN(event, data) {
  RealtimeLogManager && RealtimeLogManager.warn(event, data);
}

function RUN(event, data) {
  data.level = 'info';
  RealtimeLogManager && RealtimeLogManager.info(event, data);
}
/**
 * @description: ?????????????????????????????????????????????
 * @return {RealtimeLogManager} RealtimeLogManager
 */


function createRealtimeLogManager(version) {
  VERSION = version;
  if (!RealtimeLogManager) return;
  return {
    error: function error() {
      ERROR.apply(void 0, arguments);
    },
    warn: function warn() {
      WARN.apply(void 0, arguments);
    },
    debug: function debug() {
      WARN.apply(void 0, arguments);
    },
    info: function info() {
      RUN.apply(void 0, arguments);
    },
    log: function log() {
      RUN.apply(void 0, arguments);
    }
  };
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1659407685618);
})()
//miniprogram-npm-outsideDeps=["@aliyun-sls/web-track-browser","@aliyun-sls/web-track-mini"]
//# sourceMappingURL=index.js.map