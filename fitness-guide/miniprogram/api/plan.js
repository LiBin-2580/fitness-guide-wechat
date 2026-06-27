// 计划相关接口
const { request } = require('../utils/request');

module.exports = {
  // 获取计划列表
  getPlans(params) {
    return request({ url: '/plans', data: params });
  },

  // 获取计划详情
  getPlanDetail(planId) {
    return request({ url: `/plans/${planId}` });
  },

  // 创建计划
  createPlan(data) {
    return request({ url: '/plans', method: 'POST', data });
  },

  // 更新计划
  updatePlan(planId, data) {
    return request({ url: `/plans/${planId}`, method: 'PUT', data });
  },

  // 删除计划
  deletePlan(planId) {
    return request({ url: `/plans/${planId}`, method: 'DELETE' });
  },

  // 获取动作列表
  getExercises() {
    return request({ url: '/exercises' });
  },
};
