const RealtimeLogManager = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null
let VERSION = ''
function ERROR(event, data) {
  if (RealtimeLogManager) {
    const { TraceId, type } = data
    RealtimeLogManager.error(event, data)
    // 判断是否支持设置模糊搜索
    // 错误的信息可记录到 FilterMsg，方便搜索定位
    if (RealtimeLogManager.addFilterMsg) {
      try {
        RealtimeLogManager.addFilterMsg(`[${VERSION}] ${TraceId} ${event} ${type} `)
      } catch (e) {
        RealtimeLogManager.setFilterMsg(`[${VERSION}] ${event}`)
      }
    }
  }
}

export function WARN(event, data) {
  RealtimeLogManager && RealtimeLogManager.warn(event, data)
}

export function RUN(event, data) {
  data.level = 'info'
  RealtimeLogManager && RealtimeLogManager.info(event, data)
}

/**
 * @description: 根据标签创建实时日志管理器实例
 * @return {RealtimeLogManager} RealtimeLogManager
 */
export function createRealtimeLogManager(version) {
  VERSION = version
  if (!RealtimeLogManager) return

  return {
    error: function (...args) {
      ERROR(...args)
    },
    warn: function (...args) {
      WARN(...args)
    },
    debug: function (...args) {
      WARN(...args)
    },
    info: function (...args) {
      RUN(...args)
    },
    log: function (...args) {
      RUN(...args)
    }
  }
}
