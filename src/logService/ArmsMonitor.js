import WxLogger from '../utils/wxLogger'
import CONFIG from '../../config'
let ArmsMonitor = ''

ArmsMonitor = WxLogger.init({
  pid: CONFIG.ARMS_MONITOR_PID,
  release: CONFIG.VERSION,
  environment: CONFIG.ENVIRONMENT,
  region: 'cn',
  behavior: true,
  disabled: true,
  disableHook: true,
  setUsername: function () {
    return null
  },
  ignore: {
    ignoreApis: [/log.aliyuncs.com/g]
  }
})

export default ArmsMonitor
