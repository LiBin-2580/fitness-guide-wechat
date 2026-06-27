// 身体数据页
const { showToast } = require('../../utils/util');

Page({
  data: {
    activeType: 'weight',
    types: [
      { key: 'weight', label: '体重' },
      { key: 'fat', label: '体脂率' },
      { key: 'bmi', label: 'BMI' },
    ],
    currentValue: 72.5,
    currentUnit: 'kg',
    trendData: [],
    historyList: [
      { id: 1, date: '2026-06-25', value: 72.5, unit: 'kg' },
      { id: 2, date: '2026-06-20', value: 73.0, unit: 'kg' },
      { id: 3, date: '2026-06-15', value: 73.2, unit: 'kg' },
      { id: 4, date: '2026-06-10', value: 73.5, unit: 'kg' },
    ],
    showAddModal: false,
    formData: {
      weight: '',
      fat: '',
      chest: '',
      waist: '',
      hip: '',
      arm: '',
    },
  },

  onLoad() {
    this.loadData();
  },

  // 加载数据
  async loadData() {
    try {
      // TODO: 调用接口获取趋势数据
      // const trend = await getMetricTrend(this.data.activeType, 30);
      // this.setData({ trendData: trend });
    } catch (err) {
      showToast(err.message || '加载失败');
    }
  },

  // 切换数据类型
  switchType(e) {
    const type = e.currentTarget.dataset.type;
    const units = { weight: 'kg', fat: '%', bmi: '' };
    this.setData({
      activeType: type,
      currentUnit: units[type],
    });
    this.loadData();
  },

  // 打开录入弹窗
  openAddModal() {
    this.setData({ showAddModal: true });
  },

  // 关闭录入弹窗
  closeAddModal() {
    this.setData({ showAddModal: false });
  },

  // 表单输入
  handleInput(e) {
    const { field } = e.currentTarget.dataset;
    const { value } = e.detail;
    this.setData({
      [`formData.${field}`]: value,
    });
  },

  // 保存数据
  async saveMetric() {
    const { formData } = this.data;
    if (!formData.weight) {
      showToast('请输入体重');
      return;
    }

    try {
      // TODO: 调用 createMetric 接口
      showToast('数据已保存');
      this.closeAddModal();
      this.loadData();
    } catch (err) {
      showToast(err.message || '保存失败');
    }
  },
});
