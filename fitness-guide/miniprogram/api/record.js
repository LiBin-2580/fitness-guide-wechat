// 训练记录相关接口
const { request } = require('../utils/request');

module.exports = {
  // 获取记录列表
  getRecords(params) {
    return request({ url: '/records', data: params });
  },

  // 获取记录详情
  getRecordDetail(recordId) {
    return request({ url: `/records/${recordId}` });
  },

  // 创建训练记录
  createRecord(data) {
    return request({ url: '/records', method: 'POST', data });
  },

  // 获取日历打卡数据
  getCalendarData(year, month) {
    return request({ url: '/records/calendar', data: { year, month } });
  },

  // 获取统计数据
  getStats() {
    return request({ url: '/records/stats' });
  },
};
