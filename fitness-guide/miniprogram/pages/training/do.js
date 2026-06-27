// 训练打卡页
const { formatTime, showToast } = require('../../utils/util');

Page({
  data: {
    planName: '推力日 A',
    timerSeconds: 0,
    timerDisplay: '00:00',
    currentAction: {
      name: '平板杠铃卧推',
      sets: 4,
      reps: 8,
      weight: 60,
      unit: 'kg',
      rest: 90,
    },
    currentSet: 0,
    weight: 60,
    reps: 8,
    groupDots: [
      { done: false, current: true },
      { done: false, current: false },
      { done: false, current: false },
      { done: false, current: false },
    ],
    nextAction: {
      name: '上斜哑铃飞鸟',
      sets: 3,
      reps: 12,
      rest: 60,
    },
    showExitModal: false,
    isTraining: false,
  },

  _timerInterval: null,
  _currentActionIndex: 0,
  _actions: [
    { name: '平板杠铃卧推', sets: 4, reps: 8, weight: 60, unit: 'kg', rest: 90 },
    { name: '上斜哑铃飞鸟', sets: 3, reps: 12, weight: 14, unit: 'kg', rest: 60 },
    { name: '坐姿哑铃推举', sets: 4, reps: 10, weight: 22, unit: 'kg', rest: 90 },
    { name: '绳索下压', sets: 3, reps: 15, weight: 20, unit: 'kg', rest: 45 },
  ],

  onLoad() {
    this.startTraining();
  },

  onUnload() {
    this.stopTimer();
  },

  // 开始训练
  startTraining() {
    this._currentActionIndex = 0;
    this.updateTrainingUI();
    this.startTimer();
    this.setData({ isTraining: true });
  },

  // 开始计时
  startTimer() {
    this.stopTimer();
    this._timerInterval = setInterval(() => {
      const seconds = this.data.timerSeconds + 1;
      this.setData({
        timerSeconds: seconds,
        timerDisplay: formatTime(seconds),
      });
    }, 1000);
  },

  // 停止计时
  stopTimer() {
    if (this._timerInterval) {
      clearInterval(this._timerInterval);
      this._timerInterval = null;
    }
  },

  // 更新训练 UI
  updateTrainingUI() {
    const action = this._actions[this._currentActionIndex];
    const nextIndex = this._currentActionIndex + 1;
    const nextAction = nextIndex < this._actions.length ? this._actions[nextIndex] : null;

    const groupDots = Array.from({ length: action.sets }, (_, i) => ({
      done: i < this.data.currentSet,
      current: i === this.data.currentSet,
    }));

    this.setData({
      currentAction: action,
      weight: action.weight,
      reps: action.reps,
      groupDots,
      nextAction: nextAction ? {
        name: nextAction.name,
        sets: nextAction.sets,
        reps: nextAction.reps,
        rest: nextAction.rest,
      } : { name: '训练结束', sets: 0, reps: 0, rest: 0 },
    });
  },

  // 调整重量
  handleWeightChange(e) {
    this.setData({ weight: e.detail.value });
  },

  // 调整次数
  handleRepsChange(e) {
    this.setData({ reps: e.detail.value });
  },

  // 完成本组
  completeSet() {
    const { currentAction, currentSet } = this.data;
    let newSet = currentSet + 1;

    if (newSet >= currentAction.sets) {
      // 当前动作完成，切换到下一个
      newSet = 0;
      this._currentActionIndex++;

      if (this._currentActionIndex >= this._actions.length) {
        // 所有动作完成
        this.finishTraining();
        return;
      }
    }

    this.setData({ currentSet: newSet });
    this.updateTrainingUI();
    showToast(`第 ${newSet + 1}/${this._actions[this._currentActionIndex].sets} 组完成`);
  },

  // 退出训练
  exitTraining() {
    this.setData({ showExitModal: true });
  },

  // 确认退出
  confirmExit() {
    this.setData({ showExitModal: false });
    this.stopTimer();
    wx.navigateBack();
  },

  // 关闭退出弹窗
  closeExitModal() {
    this.setData({ showExitModal: false });
  },

  // 完成训练
  finishTraining() {
    this.stopTimer();
    this.setData({ isTraining: false });
    showToast(`训练完成！耗时 ${formatTime(this.data.timerSeconds)}`);

    // TODO: 保存训练记录

    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  },
});
