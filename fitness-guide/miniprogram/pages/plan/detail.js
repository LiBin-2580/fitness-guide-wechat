// 训练计划详情页
const { showToast } = require('../../utils/util');

Page({
  data: {
    planId: '',
    plan: {
      name: '推力拉腿 · 五分化',
      description: '经典五天分化训练，覆盖全身肌群',
      status: 'active',
      frequency: 5,
      totalWeeks: 8,
      currentWeek: 3,
      progress: 37,
    },
    trainingDays: [
      {
        day: 1,
        name: '推力日 A',
        exercises: [
          { id: 1, name: '平板杠铃卧推', sets: 4, reps: 8, rest: 90 },
          { id: 2, name: '上斜哑铃飞鸟', sets: 3, reps: 12, rest: 60 },
          { id: 3, name: '坐姿哑铃推举', sets: 4, reps: 10, rest: 90 },
          { id: 4, name: '绳索下压', sets: 3, reps: 15, rest: 45 },
        ],
      },
      {
        day: 2,
        name: '拉力日',
        exercises: [
          { id: 5, name: '引体向上', sets: 4, reps: 8, rest: 90 },
          { id: 6, name: '杠铃划船', sets: 4, reps: 10, rest: 90 },
          { id: 7, name: '哑铃弯举', sets: 3, reps: 12, rest: 60 },
        ],
      },
      {
        day: 3,
        name: '腿部日',
        exercises: [
          { id: 8, name: '深蹲', sets: 5, reps: 5, rest: 120 },
          { id: 9, name: '腿举', sets: 4, reps: 12, rest: 90 },
          { id: 10, name: '腿弯举', sets: 3, reps: 15, rest: 60 },
        ],
      },
    ],
    activeDay: 0,
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ planId: options.id });
      this.loadPlanDetail(options.id);
    }
  },

  // 加载计划详情
  async loadPlanDetail(id) {
    try {
      // TODO: 调用 getPlanDetail 接口
    } catch (err) {
      showToast(err.message || '加载失败');
    }
  },

  // 切换训练日
  switchDay(e) {
    const day = e.currentTarget.dataset.day;
    this.setData({ activeDay: day });
  },

  // 开始训练
  startTraining() {
    wx.navigateTo({ url: '/pages/training/do' });
  },

  // 编辑计划
  editPlan() {
    showToast('编辑计划');
  },

  // 删除计划
  deletePlan() {
    wx.showModal({
      title: '确认删除',
      content: '删除后不可恢复',
      success: (res) => {
        if (res.confirm) {
          // TODO: 调用 deletePlan 接口
          showToast('已删除');
          wx.navigateBack();
        }
      },
    });
  },
});
