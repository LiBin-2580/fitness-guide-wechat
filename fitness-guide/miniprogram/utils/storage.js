// 本地存储封装
const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_INFO: 'userInfo',
};

module.exports = {
  // Token 管理
  setToken(token) {
    wx.setStorageSync(STORAGE_KEYS.TOKEN, token);
  },

  getToken() {
    return wx.getStorageSync(STORAGE_KEYS.TOKEN);
  },

  removeToken() {
    wx.removeStorageSync(STORAGE_KEYS.TOKEN);
  },

  // 用户信息
  setUserInfo(info) {
    wx.setStorageSync(STORAGE_KEYS.USER_INFO, info);
  },

  getUserInfo() {
    return wx.getStorageSync(STORAGE_KEYS.USER_INFO);
  },

  removeUserInfo() {
    wx.removeStorageSync(STORAGE_KEYS.USER_INFO);
  },

  // 清除所有
  clearAll() {
    wx.clearStorageSync();
  },
};
