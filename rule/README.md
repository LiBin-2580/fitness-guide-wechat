# 开发规范目录

本目录包含健身指南小程序项目的开发规范文档，请在开发前仔细阅读。

---

## 规范清单

| 文件 | 说明 | 适用范围 |
|------|------|----------|
| [代码规范.md](./代码规范.md) | 命名规范、代码风格、注释要求 | 前端 + 后端 |
| [Git规范.md](./Git规范.md) | 分支管理、提交信息格式、PR流程 | 全项目 |
| [前端规范.md](./前端规范.md) | 小程序页面、组件、样式、API调用规范 | 前端 |
| [后端规范.md](./后端规范.md) | Express路由、控制器、模型、中间件规范 | 后端 |
| [数据库规范.md](./数据库规范.md) | 表命名、字段命名、SQL编写规范 | 后端 |

---

## 快速参考

### 命名规范速查

| 类型 | 规范 | 示例 |
|------|------|------|
| 文件名 | kebab-case | `user-profile.js` |
| 变量名 | camelCase | `userName` |
| 常量名 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| 组件名 | PascalCase | `PlanCard` |
| CSS类名 | kebab-case | `.plan-card__title` |
| 数据库表名 | snake_case | `body_metrics` |
| API路径 | kebab-case | `/api/v1/body-metrics` |

### Git提交速查

```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
test: 测试相关
chore: 构建/工具变动
```

---

## 如何使用

1. **新成员入职**：按顺序阅读所有规范文档
2. **日常开发**：遇到不确定的写法，查阅对应规范
3. **代码审查**：以规范文档为标准进行Code Review
4. **规范更新**：发现不合理之处，提PR修改本文档
