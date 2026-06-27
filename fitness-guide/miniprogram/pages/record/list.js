// 训练记录页
const { showToast } = require('../../utils/util');

Page({
  data: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    checkedDays: [1, 3, 5, 7, 9, 11, 13, 14, 16, 18, 20, 21, 23, 25],
    stats: {
      checkDays: 16,
      totalHours: 23.5,
      totalSets: 96,
    },
    records: [
      { id: 1, day: '25', month: 'JUN', title: '推力日 A · 胸/肩/三头', desc: '平板卧推 60kg × 4组 · 推举 30kg × 4组', duration: '52 min' },
      { id: 2, day: '23', month: 'JUN', title: '拉力日 · 背/二头', desc: '引体向上 8×4 · 杠铃划船 70kg × 4组', duration: '48 min' },
      { id: 3, day: '21', month: 'JUN', title: '腿部日 · 股四/股二/臀', desc: '深蹲 80kg × 5组 · 腿举 160kg × 4组', duration: '61 min' },
    ],
  },

  onLoad() {
    this.loadData();
  },

  // 加载数据
  async loadData() {
    try {
      // TODO: 调用接口获取日历数据和统计
      // const calendarData = await getCalendarData(this.data.year, this.data.month);
      // const stats = await getStats();
    } catch (err) {
      showToast(err.message || '加载失败');
    }
  },

  // 月份切换
  handleMonthChange(e) {
    const { year, month } = e.detail;
    this.setData({ year, month });
    this.loadData();
  },

  // 点击日期
  handleDayTap(e) {
    const { year, month, day } = e.detail;
    // TODO: 显示当日记录详情
    showToast(`${year}-${month}-${day}`);
  },

  // 点击记录
  handleRecordTap(e) {
    const { id } = e.detail;
    wx.navigateTo({ url: `/pages/plan/detail?id=${id}` });
  },
});
