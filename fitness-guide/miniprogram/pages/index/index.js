// 首页
const { getGreeting, getDayName, getMonthAbbr, formatDate } = require('../../utils/util');
const { showToast } = require('../../utils/util');

Page({
  data: {
    greeting: '',
    dateStr: '',
    userName: '用户',
    streakDays: 7,
    weekProgress: '4/5',
    todayExercises: [
      { id: 1, name: '平板杠铃卧推', sets: 4, reps: 8, rest: 90, done: false },
      { id: 2, name: '上斜哑铃飞鸟', sets: 3, reps: 12, rest: 60, done: false },
      { id: 3, name: '坐姿哑铃推举', sets: 4, reps: 10, rest: 90, done: false },
      { id: 4, name: '绳索下压', sets: 3, reps: 15, rest: 45, done: false },
    ],
    recentRecords: [
      { id: 1, day: '25', month: 'JUN', title: '推力日 A · 胸/肩/三头', desc: '平板卧推 60kg × 4组 · 推举 30kg × 4组', duration: '52 min' },
      { id: 2, day: '23', month: 'JUN', title: '拉力日 · 背/二头', desc: '引体向上 8×4 · 杠铃划船 70kg × 4组', duration: '48 min' },
    ],
    todayPlan: '推力日 A',
    doneCount: 0,
    totalCount: 4,
    progressPercent: 0,
  },

  onLoad() {
    this.initPageData();
  },

  onShow() {
    // 每次显示时刷新
  },

  // 初始化页面数据
  initPageData() {
    const now = new Date();
    const greeting = getGreeting();
    const dayName = getDayName(now);
    const monthAbbr = getMonthAbbr(now);
    const date = now.getDate();

    const userInfo = getApp().globalData.userInfo;
    const userName = userInfo ? userInfo.nickName : '用户';

    this.setData({
      greeting,
      dateStr: `${dayName} · ${monthAbbr} ${date}`,
      userName,
    });
  },

  // 切换动作完成状态
  handleExerciseCheck(e) {
    const { exercise, done } = e.detail;
    const exercises = this.data.todayExercises.map(item => {
      if (item.id === exercise.id) {
        return { ...item, done };
      }
      return item;
    });

    const doneCount = exercises.filter(e => e.done).length;
    const totalCount = exercises.length;
    const progressPercent = Math.round((doneCount / totalCount) * 100);

    this.setData({
      todayExercises: exercises,
      doneCount,
      progressPercent,
    });
  },

  // 开始训练
  openTraining() {
    wx.navigateTo({ url: '/pages/training/do' });
  },

  // 跳转计划页
  switchToPlan() {
    wx.switchTab({ url: '/pages/plan/list' });
  },

  // 跳转记录页
  switchToRecord() {
    wx.switchTab({ url: '/pages/record/list' });
  },

  // 记录体重
  openBodyData() {
    wx.navigateTo({ url: '/pages/body/index' });
  },

  // 查看记录详情
  handleRecordTap(e) {
    const { id } = e.detail;
    wx.navigateTo({ url: `/pages/plan/detail?id=${id}` });
  },
});
