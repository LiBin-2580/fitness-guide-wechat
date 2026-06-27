// 训练计划列表页
const { showToast } = require('../../utils/util');

Page({
  data: {
    planList: [
      {
        id: 1,
        name: '推力拉腿 · 五分化',
        description: '经典五天分化训练，覆盖全身肌群',
        status: 'active',
        frequency: 5,
        exerciseCount: 24,
        progressWeeks: 3,
        totalWeeks: 8,
        currentWeek: 3,
        progress: 37,
      },
      {
        id: 2,
        name: '上肢力量突破',
        description: '专注卧推、推举、引体向上力量增长',
        status: 'completed',
        frequency: 4,
        exerciseCount: 16,
        totalWeeks: 6,
        currentWeek: 6,
        progress: 100,
      },
      {
        id: 3,
        name: '新手入门四周计划',
        description: '适合零基础，循序渐进建立训练习惯',
        status: 'draft',
        frequency: 3,
        exerciseCount: 12,
      },
    ],
    isLoading: false,
  },

  onLoad() {
    this.loadData();
  },

  onPullDownRefresh() {
    this.loadData(true);
  },

  // 加载数据
  async loadData(refresh = false) {
    this.setData({ isLoading: true });
    try {
      // TODO: 调用 getPlans 接口
      // const plans = await getPlans({ pageNum: 1, pageSize: 20 });
      // this.setData({ planList: plans });
    } catch (err) {
      showToast(err.message || '加载失败');
    } finally {
      this.setData({ isLoading: false });
      if (refresh) wx.stopPullDownRefresh();
    }
  },

  // 点击计划卡片
  handlePlanTap(e) {
    const { id } = e.detail;
    wx.navigateTo({ url: `/pages/plan/detail?id=${id}` });
  },

  // 新建计划
  handleCreate() {
    // TODO: 打开新建计划弹窗或页面
    showToast('新建计划');
  },
});
