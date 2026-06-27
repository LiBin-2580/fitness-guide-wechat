// 身体数据相关接口
const { request } = require('../utils/request');

module.exports = {
  // 获取历史数据
  getMetrics(params) {
    return request({ url: '/metrics', data: params });
  },

  // 录入身体数据
  createMetric(data) {
    return request({ url: '/metrics', method: 'POST', data });
  },

  // 获取趋势数据
  getMetricTrend(type, days = 30) {
    return request({ url: '/metrics/trend', data: { type, days } });
  },
};
