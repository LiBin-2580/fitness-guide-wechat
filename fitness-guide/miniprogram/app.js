// 应用入口
const { getToken, getUserInfo } = require('./utils/storage');

App({
  globalData: {
    userInfo: null,
    token: '',
    isLogin: false,
  },

  onLaunch() {
    // 从本地存储恢复登录态
    const token = getToken();
    const userInfo = getUserInfo();

    if (token) {
      this.globalData.token = token;
      this.globalData.isLogin = true;
    }

    if (userInfo) {
      this.globalData.userInfo = userInfo;
    }
  },

  // 设置登录信息
  setLoginInfo(token, userInfo) {
    this.globalData.token = token;
    this.globalData.userInfo = userInfo;
    this.globalData.isLogin = true;
  },

  // 清除登录信息
  clearLoginInfo() {
    this.globalData.token = '';
    this.globalData.userInfo = null;
    this.globalData.isLogin = false;
  },
});
