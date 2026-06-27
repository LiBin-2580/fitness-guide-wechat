// 日历组件
Component({
  properties: {
    year: { type: Number, value: new Date().getFullYear() },
    month: { type: Number, value: new Date().getMonth() + 1 },
    checkedDays: { type: Array, value: [] },
  },

  data: {
    days: [],
    weekHeaders: ['日', '一', '二', '三', '四', '五', '六'],
    today: 0,
  },

  observers: {
    'year, month'() {
      this.calcDays();
    },
  },

  lifetimes: {
    attached() {
      this.setData({ today: new Date().getDate() });
      this.calcDays();
    },
  },

  methods: {
    // 计算日历数据
    calcDays() {
      const { year, month, checkedDays } = this.data;
      const firstDay = new Date(year, month - 1, 1).getDay();
      const daysInMonth = new Date(year, month, 0).getDate();
      const days = [];

      // 前面的空白
      for (let i = 0; i < firstDay; i++) {
        days.push({ day: 0, checked: false, isToday: false });
      }

      // 实际日期
      for (let i = 1; i <= daysInMonth; i++) {
        days.push({
          day: i,
          checked: checkedDays.includes(i),
          isToday: i === this.data.today &&
                   year === new Date().getFullYear() &&
                   month === new Date().getMonth() + 1,
        });
      }

      this.setData({ days });
    },

    // 上个月
    handlePrev() {
      let { year, month } = this.data;
      month--;
      if (month < 1) { month = 12; year--; }
      this.triggerEvent('monthChange', { year, month });
    },

    // 下个月
    handleNext() {
      let { year, month } = this.data;
      month++;
      if (month > 12) { month = 1; year++; }
      this.triggerEvent('monthChange', { year, month });
    },

    // 点击日期
    handleDayTap(e) {
      const day = e.currentTarget.dataset.day;
      if (day > 0) {
        this.triggerEvent('dayTap', {
          year: this.data.year,
          month: this.data.month,
          day,
        });
      }
    },
  },
});
