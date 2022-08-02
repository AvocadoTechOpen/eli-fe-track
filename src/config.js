// 配置参数
export const defaultConfig = {
  Base: {
    platform: 'mini',
    version: '1.0.0',
    appId: '', // 应用唯一标识
    traceId: '', // 用户唯一id，默认是自动生成，放置在缓存内
    showConfigInfo: false, // config 完成后打印配置信息
    SlsImmediate: 'true', // 字符串类型，立即上报Sls日志
    Console: true, // 开启控制台日志
    SlsTracker: false, // 开启Sls日志上报
    ArmsMonitor: false, // 开启Arms 日志上报
    WxRealTimeLog: false // 开启微信后台实时日志上报
  },
  SlsTracker: {
    host: '', // 所在地域的服务入口。例如cn-hangzhou.log.aliyuncs.com
    project: '', // Project名称。
    logstore: '', // Logstore名称。
    time: 10, // 发送日志的时间间隔，默认是10秒。
    count: 10, // 发送日志的数量大小，默认是10条。
    topic: 'topic', // 自定义日志主题。
    source: 'source',
    tags: {
      tags: 'tags'
    }
  },
  ArmsMonitor: {},
  WxRealTimeLog: {}
}
