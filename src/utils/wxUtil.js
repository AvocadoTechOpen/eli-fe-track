export const getCurrentPage = () => {
  if ('function' == typeof getCurrentPages)
    try {
      const t = getCurrentPages() || [],
        e = t[t.length - 1]
      return (e && e.route) || null
    } catch (r) {
      console.warn('error in getCurrentPage', r)
      return ''
    }
}

/**
 * @description: 获取随机字符串
 * @param {Boolean} fromStorage
 * @param {string} platform web | mini
 * @return {String} uuid
 */
export const getUuid = (fromStorage = true, platform = 'mini') => {
  let uuid = ''
  if (fromStorage) {
    if (platform === 'web') {
      uuid = localStorage.getItem('uuid')
    } else {
      uuid = wx.getStorageSync('uuid')
    }
    if (uuid) return uuid
  }
  let d = new Date().getTime()
  uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  if (fromStorage) {
    if (platform === 'web') {
      uuid = localStorage.setItem('uuid', uuid)
    } else {
      uuid = wx.setStorageSync('uuid', uuid)
    }
  }
  return uuid
}
