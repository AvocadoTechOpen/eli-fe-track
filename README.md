# 日志上报SDK

## 安装依赖包 install

```sh

  npm install --save eli-fe-track
```

## 引入

```javascript

  import Logger from 'eli-fe-track'
```

## 配置 config

```javascript
// 配置
const defaultConfig = {
  Base: {
    platform: 'mini',
    version: '1.0.0',
    appId: '', // 应用唯一标识
    traceId: '', // 用户唯一id，默认是自动生成，放置在缓存内
    showConfigInfo: false, // config 完成后打印配置信息
    SlsImmediate: 'true', // 字符串类型，立即上报Sls日志
    Console: true, // 开启控制台日志
    SlsTracker: false, // 开启Sls日志上报
    WxRealTimeLog: false // 开启微信后台实时日志上报
  },
  // SLS 配置信息：https://help.aliyun.com/document_detail/427749.html
  SlsTracker: {
    host: '', // 所在地域的服务入口。例如cn-hangzhou.log.aliyuncs.com
    project: '', // Project名称。
    logstore: '', // Logstore名称。
    time: 10, // 发送日志的时间间隔，默认是10秒。
    count: 10, // 发送日志的数量大小，默认是10条。
    topic: 'topic', // 自定义日志主题。
    source: 'source',
    tags: {
      tags: 'tags',
    },
  },
  WxRealTimeLog: {}
}

// 初始化配置
Logger.config(defaultConfig)

```

Base 目前支持以下配置项：

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|-|-|-|-|-|
| platform | string |  否  |  mini  | web 、mini |
| version | string |  是  |  1.0.0  | 应用版本 |
| appId | string |  是  |  ''  | 程序唯一标识 |
| traceId | string |  否  |  ''  | 用户唯一id，默认是自动生成，放置在缓存内 |
| showConfigInfo | boolean |  否  |  false  | config 完成后打印配置信息 |
| SlsImmediate | string |  否  |  'true'  | 立即上报Sls日志 |
| Console | boolean |  否  |  true  | 是否开启 console 日志 |
| SlsTracker | boolean |  否  |  false  | 是否开启 sls 上报 |
| ArmsMonitor | boolean |  否  |  false  | 是否开启 arms 上报 |
| WxRealTimeLog | boolean |  否  |  false  | 是否开启小程序实时日志|

## 日志上报

```javascript

// 日志等级
const LogLevel = {
  Error: 'error',
  Warn: 'warn',
  Info: 'info',
  Log: 'log',
  Debug: 'debug'
}
// 日志类型
const LogType = {
  SysInfo: 'sysInfo',
  LifeCycle: 'lifeCycle',
  FailRequest: 'failRequest',
  ApiRequest: 'apiRequest',
  RenderError: 'renderError',
  SocketEvent: 'socketEvent',
  NetEvent: 'netEvent',
  Action: 'action',
  Custom: 'custom'
}

// 内置方法
1. sendSysInfo // 上报系统日志
2. log
3. logApiRequest // 默认为 apiRequest， 失败的接口会自动转为 failRequest
4. logLifeCycle
5. logAction
6. logSocketEvent
7. logNetEvent
8. logRenderError

// 日志上报，自定义类型 
Logger.log('INTERVIEW_START', {
  type: 'xxx', // 优先级高于默认方法
  level: 'error', // 优先级高于默认方法
  Immediate: 'true', // 优先级高于Base中的配置
  count: 1,
  obj: { a: 1, b: 2 }
})

// 上报系统日志
Logger.sendSysInfo()

// 上报生命周期日志 lifeCycle
Logger.logLifeCycle('INTERVIEW_PHOTO_TAKE', {
  costTime: 120,
  clickTimes: 3
})

```
