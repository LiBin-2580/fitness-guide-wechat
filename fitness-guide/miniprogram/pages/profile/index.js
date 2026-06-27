// 个人中心页
const { showToast } = require('../../utils/util');
const { removeToken, removeUserInfo } = require('../../utils/storage');

Page({
  data: {
    userInfo: {
      nickName: '李彬',
      avatarUrl: '',
      desc: '健身爱好者 · 训练 86 天',
    },
    stats: {
      totalTraining: 23,
      streakDays: 7,
      completedPlans: 3,
    },
    badges: [
      { id: 1, name: '七日连击', icon: '/images/badge/streak.png', achieved: true },
      { id: 2, name: '力量突破', icon: '/images/badge/strength.png', achieved: true },
      { id: 3, name: '百日坚持', icon: '/images/badge/100days.png', achieved: false },
      { id: 4, name: '完美一周', icon: '/images/badge/perfect.png', achieved: false },
    ],
    settings: [
      { id: 'reminder', icon: '🔔', label: '训练提醒', value: '已开启', arrow: true },
      { id: 'profile', icon: '👤', label: '个人信息', arrow: true },
      { id: 'privacy', icon: '🛡️', label: '隐私设置', arrow: true },
      { id: 'about', icon: 'ℹ️', label: '关于健身指南', value: 'v1.0.0', arrow: true },
    ],
  },

  onLoad() {
    this.loadUserInfo();
  },

  // 加载用户信息
  loadUserInfo() {
    const app = getApp();
    if (app.globalData.userInfo) {
      this.setData({ userInfo: app.globalData.userInfo });
    }
  },

  // 设置项点击
  handleSettingTap(e) {
    const { id } = e.currentTarget.dataset;
    switch (id) {
      case 'reminder':
        showToast('训练提醒设置');
        break;
      case 'profile':
        showToast('个人信息');
        break;
      case 'privacy':
        showToast('隐私设置');
        break;
      case 'about':
        showToast('关于健身指南');
        break;
    }
  },

  // 退出登录
  doLogout() {
    wx.showModal({
      title: '确认退出',
      content: '退出后需要重新登录',
      success: (res) => {
        if (res.confirm) {
          removeToken();
          removeUserInfo();
          getApp().clearLoginInfo();
          wx.redirectTo({ url: '/pages/login/index' });
        }
      },
    });
  },
});
