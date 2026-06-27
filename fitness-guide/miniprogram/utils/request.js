// 网络请求封装
const { getToken, removeToken } = require('./storage');

const BASE_URL = 'http://localhost:3000/api/v1';

function request(options) {
  return new Promise((resolve, reject) => {
    const token = getToken();

    wx.request({
      url: `${BASE_URL}${options.url}`,
      method: options.method || 'GET',
      data: options.data,
      header: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...options.header,
      },
      success(res) {
        if (res.statusCode === 200 && res.data.code === 0) {
          resolve(res.data.data);
        } else if (res.statusCode === 401) {
          // token 过期，清除登录态并跳转登录页
          removeToken();
          const app = getApp();
          app.clearLoginInfo();
          wx.redirectTo({ url: '/pages/login/index' });
          reject(new Error('未授权，请重新登录'));
        } else {
          reject(new Error(res.data.message || '请求失败'));
        }
      },
      fail(err) {
        reject(new Error('网络异常，请检查网络连接'));
      },
    });
  });
}

module.exports = { request };
