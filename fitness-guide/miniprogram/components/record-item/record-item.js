// 训练记录项组件
Component({
  properties: {
    record: { type: Object, value: {} },
  },

  methods: {
    handleTap() {
      this.triggerEvent('tap', { id: this.data.record.id });
    },
  },
});
