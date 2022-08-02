import React from 'react';
import ReactDOM from 'react-dom/client';
import Logger from 'eli-fe-track'
import { defaultConfig } from './config/config'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

Logger.config(defaultConfig).then(() => {
  Logger.sendSysInfo()
    Logger.log('INTERVIEW_START', {
    type: 'xxx', // 优先级高于默认方法
    level: 'error', // 优先级高于默认方法
    Immediate: 'true', // 优先级高于Base中的配置
    count: 1,
    obj: { a: 1, b: 2 }
  })
})
// setTimeout(() => {
//   Logger.sendSysInfo()
//   Logger.log('INTERVIEW_START', {
//     type: 'xxx', // 优先级高于默认方法
//     level: 'error', // 优先级高于默认方法
//     Immediate: 'true', // 优先级高于Base中的配置
//     count: 1,
//     obj: { a: 1, b: 2 }
//   })
//   // 上报生命周期日志 lifeCycle
//   Logger.logLifeCycle('INTERVIEW_PHOTO_TAKE', {
//     costTime: 120,
//     clickTimes: 3
//   })
// });

