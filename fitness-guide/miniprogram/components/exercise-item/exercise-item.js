// 训练动作项组件
Component({
  properties: {
    exercise: { type: Object, value: {} },
    done: { type: Boolean, value: false },
  },

  methods: {
    handleTap() {
      this.triggerEvent('tap', { exercise: this.data.exercise });
    },

    handleCheck() {
      this.triggerEvent('check', {
        exercise: this.data.exercise,
        done: !this.data.done,
      });
    },
  },
});
