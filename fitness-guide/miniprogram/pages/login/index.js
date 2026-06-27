// 登录页
const { login, wxLogin } = require('../../api/user');
const { setToken, setUserInfo } = require('../../utils/storage');
const { showToast } = require('../../utils/util');

Page({
  data: {
    phone: '',
    code: '',
    countdown: 0,
  },

  // 输入处理
  handlePhoneInput(e) {
    this.setData({ phone: e.detail.value });
  },

  handleCodeInput(e) {
    this.setData({ code: e.detail.value });
  },

  // 获取验证码
  getCode() {
    const { phone, countdown } = this.data;
    if (!phone || phone.length !== 11) {
      showToast('请输入正确的手机号');
      return;
    }
    if (countdown > 0) return;

    // TODO: 调用发送验证码接口
    showToast('验证码已发送');
    this.setData({ countdown: 60 });
    this.startCountdown();
  },

  // 倒计时
  startCountdown() {
    const timer = setInterval(() => {
      const countdown = this.data.countdown - 1;
      this.setData({ countdown });
      if (countdown <= 0) clearInterval(timer);
    }, 1000);
  },

  // 登录/注册
  async doLogin() {
    const { phone, code } = this.data;
    if (!phone || phone.length !== 11) {
      showToast('请输入正确的手机号');
      return;
    }
    if (!code) {
      showToast('请输入验证码');
      return;
    }

    try {
      wx.showLoading({ title: '登录中...' });
      const res = await login({ phone, code });
      this.handleLoginSuccess(res);
    } catch (err) {
      showToast(err.message || '登录失败');
    } finally {
      wx.hideLoading();
    }
  },

  // 微信登录
  async doWxLogin() {
    try {
      wx.showLoading({ title: '登录中...' });
      const { code } = await wx.login();
      const res = await wxLogin(code);
      this.handleLoginSuccess(res);
    } catch (err) {
      showToast(err.message || '登录失败');
    } finally {
      wx.hideLoading();
    }
  },

  // 登录成功处理
  handleLoginSuccess(res) {
    const app = getApp();
    setToken(res.token);
    setUserInfo(res.userInfo);
    app.setLoginInfo(res.token, res.userInfo);
    wx.switchTab({ url: '/pages/index/index' });
  },
});
