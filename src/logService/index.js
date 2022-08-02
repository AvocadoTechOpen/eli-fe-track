import { getCurrentPage, getUuid } from '../utils/wxUtil'
import { getBrowserInfo } from '../utils/util'
import { LogLevel, LogType } from '../types'
import { defaultConfig } from '../config'
// import { createRealtimeLogManager } from './WxRealtimeLogManager'
// import SlsTrackerMini from '@aliyun-sls/web-track-mini'
// import SlsTrackerBrowser from '@aliyun-sls/web-track-browser'

class Logger {
  constructor() {
    if (!Logger.instance) {
      this.initState = false
      this.options = defaultConfig
      this.envData = {}
      this.tracker = null
      this.WxRealtimeLogManager = null
      Logger.instance = this
    }
    return Logger.instance
  }

  /**
   * @description: 配置
   * @param {*} opts
   */
  config(opts = defaultConfig) {
    return new Promise(async (resolve, reject) => {
      try {
        this.options.Base = { ...this.options.Base, ...opts.Base }
        const { platform, appId, SlsTracker, WxRealTimeLog, showConfigInfo, version } = this.options.Base

        // TODO 小程序导入web端包，会报错，还需要验证
        // web端需要传入 appId
        if (platform === 'web' && !appId) {
          console.log('请传入appId, 作为程序标识 !!!')
          return
        }

        // sls 初始化
        if (SlsTracker && this._verifySlsConfig(opts.SlsTracker)) {
          this.options.SlsTracker = { ...defaultConfig.SlsTracker, ...opts.SlsTracker }
          if (platform === 'web') {
            const { default: SlsTrackerBrowser } = await import('@aliyun-sls/web-track-browser')
            this.tracker = new SlsTrackerBrowser(this.options.SlsTracker)
          } else {
            const { default: SlsTrackerMini } = await import('@aliyun-sls/web-track-mini')
            this.tracker = new SlsTrackerMini(this.options.SlsTracker)
          }
        }

        // 微信后台实时日志初始化
        if (WxRealTimeLog) {
          const {
            default: { createRealtimeLogManager }
          } = await import('./WxRealtimeLogManager.js')
          this.WxRealtimeLogManager = createRealtimeLogManager(version)
        }

        // 小程序端自动上报系统信息
        if (platform === 'mini') {
          this.sendSysInfo()
        }

        // config 调用完成
        this.initState = true
        showConfigInfo && console.log('Logger config:', this.options)
        resolve(this.initState)
      } catch (error) {
        console.error('config error:', error)
        reject(error)
      }
    })
  }

  // 校验sls必填项
  _verifySlsConfig(opts) {
    const flag = opts && opts.host && opts.project && opts.logstore
    !flag && console.error('请开启 showConfigInfo, 检查SlsTracker 配置 !!!')
    return flag
  }

  // 上报小程序系统信息
  sendSysInfo() {
    if (this.options.Base.platform === 'mini') {
      const { miniProgram } = wx.getAccountInfoSync()
      const sysInfo = wx.getSystemInfoSync()
      const envData = {
        APPVersion: this.options.Base.version, // 程序版本
        ...miniProgram,
        ...sysInfo
      }
      wx.getNetworkType({
        complete: (res) => {
          envData.networkType = res.networkType
          this.envData = envData
          this.send({
            type: LogType.SysInfo,
            level: LogLevel.Info,
            event: LogType.SysInfo,
            envData: JSON.stringify(envData)
          })
        }
      })
    } else {
      const BrowserInfo = getBrowserInfo()
      const { version, appId, traceId } = this.options.Base
      this.envData = {
        ...BrowserInfo,
        appId,
        traceId,
        APPVersion: version // 程序版本
      }
      this.send({
        type: LogType.SysInfo,
        level: LogLevel.Info,
        event: LogType.SysInfo,
        envData: JSON.stringify(this.envData)
      })
    }
  }

  // 自定义日志类型
  log(event = '', params = {}) {
    params = {
      event,
      type: LogType.Custom,
      level: LogLevel.Log,
      ...params
    }
    this.send(params)
  }

  // 接口日志
  logApiRequest(event = '', params = {}) {
    params = {
      type: LogType.ApiRequest,
      level: LogLevel.Info,
      event,
      ...params
    }
    // arms 上报
    if (this.options.Base.ArmsMonitor) {
      this.ArmsMonitor.api({
        api: params.api,
        success: params.success,
        time: params.time,
        code: params.code,
        msg: params.msg,
        begin: params.begin,
        requestId: params.requestId
      })
    }
    if (params.level === LogLevel.Error) {
      params.type = LogType.FailRequest
    }
    this.send(params)
  }

  logLifeCycle(event = '', params = {}) {
    params = {
      type: LogType.LifeCycle,
      level: LogLevel.Info,
      event,
      ...params
    }
    this.send(params)
  }

  logAction(event = '', params = {}) {
    params = {
      type: LogType.Action,
      level: LogLevel.Log,
      event,
      ...params
    }
    this.send(params)
  }

  logSocketEvent(event = '', params = {}) {
    params = {
      type: LogType.SocketEvent,
      level: LogLevel.Info,
      event,
      ...params
    }
    this.send(params)
  }

  logNetEvent(event = '', params = {}) {
    params = {
      type: LogType.NetEvent,
      level: LogLevel.Info,
      event,
      ...params
    }
    this.send(params)
  }

  logRenderError(event = '', params = {}) {
    params = {
      type: LogType.RenderError,
      level: LogLevel.Warn,
      event,
      ...params
    }
    this.send(params)
  }

  // 格式化数据
  _formatData(data) {
    // TraceId: appId_uuid
    const { appId } = this.envData
    const uuid = getUuid(true, this.options.Base.platform)
    // 获取当前页面
    const curPage = getCurrentPage()
    const TraceId = this.options.Base.traceId || `${appId}_${uuid}`
    const timestamp = new Date().getTime()
    const logId = getUuid(false)
    data = {
      TraceId,
      timestamp,
      logId,
      page: curPage,
      ...data
    }

    // 处理特定 LogLevel时的环境信息
    if (this.options.Base.platform === 'mini' && [LogLevel.Error, LogLevel.Warn, LogLevel.Debug].includes(data.level)) {
      const {
        APPVersion,
        networkType,
        appId,
        system,
        version,
        SDKVersion,
        brand,
        model,
        platform,
        batteryLevel,
        benchmarkLevel,
        cameraAuthorized,
        microphoneAuthorized,
        deviceOrientation
      } = this.envData
      data = {
        ...data,
        APPVersion,
        networkType,
        appId,
        system,
        version,
        SDKVersion,
        brand,
        model,
        platform,
        batteryLevel,
        benchmarkLevel,
        cameraAuthorized,
        microphoneAuthorized,
        deviceOrientation
      }
    }
    return {
      Event: data.event || data.type,
      TraceId: data.TraceId,
      LogLevel: data.level,
      LogType: data.type,
      Immediate: data.Immediate || this.options.Base.SlsImmediate,
      message: JSON.stringify(data)
    }
  }

  // 数据打印/上报
  send(data = {}) {
    if (!this.initState) {
      console.error('尚未调用config方法 !!!')
      return
    }

    if (!data.event) {
      console.warn('事件名称不能为空，请传入event参数！')
      return
    }

    // 格式化数据
    data = this._formatData(data)

    // 打印控制台日志
    if (this.options.Base.Console) {
      // 切换日志等级，用于日志打印
      if (data.LogLevel === LogLevel.Debug) {
        data.LogLevel = LogLevel.Warn
      }
      console[data.LogLevel](data)
    }

    // 上传sls日志
    if (this.tracker) {
      data.Immediate === 'true' ? this.tracker.sendImmediate(data) : this.tracker.send(data)
    } else {
      if (this.options.Base.SlsTracker) {
        console.error('请开启 showConfigInfo,检查SlsTracker 配置 !!!')
      }
    }

    // ArmsMonitor 上报
    if (this.options.Base.ArmsMonitor) {
      // level 为 Error, 自动使用 ARMSMonitor.error()上报
      if (data.LogLevel === LogLevel.Error) {
        this.ArmsMonitor.error({ name: data.event, message: JSON.stringify(data) }, { filename: curPage })
      }
    } else {
      if (this.options.Base.ArmsMonitor) {
        console.error('请请开启 showConfigInfo, 检查ArmsMonitor 配置 !!!')
      }
    }

    // 上报微信后台实时日志
    if (this.options.Base.WxRealTimeLog) {
      this.WxRealtimeLogManager && this.WxRealtimeLogManager[data.LogLevel](data.event, data)
    }
  }
}

export default new Logger()
