// app.js

import Logger from 'eli-fe-track'
import { defaultConfig } from './config/config'
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    Logger.config(defaultConfig)
  },
  globalData: {
    userInfo: null,
    Logger: Logger
  }
})
