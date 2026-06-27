// 数字步进器组件
Component({
  properties: {
    value: { type: Number, value: 0 },
    min: { type: Number, value: 0 },
    max: { type: Number, value: 999 },
    step: { type: Number, value: 1 },
    unit: { type: String, value: '' },
  },

  methods: {
    handleMinus() {
      const newVal = Math.max(this.data.min, this.data.value - this.data.step);
      this.triggerEvent('change', { value: newVal });
    },

    handlePlus() {
      const newVal = Math.min(this.data.max, this.data.value + this.data.step);
      this.triggerEvent('change', { value: newVal });
    },
  },
});
