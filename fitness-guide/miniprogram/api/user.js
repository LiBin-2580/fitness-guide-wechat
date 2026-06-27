// 用户相关接口
const { request } = require('../utils/request');

module.exports = {
  // 手机号登录
  login(data) {
    return request({ url: '/user/login', method: 'POST', data });
  },

  // 微信登录
  wxLogin(code) {
    return request({ url: '/user/wx-login', method: 'POST', data: { code } });
  },

  // 获取用户信息
  getUserInfo() {
    return request({ url: '/user/info' });
  },

  // 更新用户信息
  updateUserInfo(data) {
    return request({ url: '/user/info', method: 'PUT', data });
  },
};
