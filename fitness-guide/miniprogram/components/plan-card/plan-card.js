// 训练计划卡片组件
Component({
  properties: {
    plan: {
      type: Object,
      value: {},
    },
  },

  methods: {
    handleTap() {
      this.triggerEvent('tap', { id: this.data.plan.id });
    },
  },
});
