# 健身指南微信小程序 - API设计文档

> **文档版本**：v1.0  
> **编写日期**：2026-06-26  
> **文档类型**：系统设计 - API设计  
> **基础路径**：`/api/v1`  
> **认证方式**：JWT Bearer Token

---

## 一、设计原则

- 遵循RESTful规范
- 统一响应格式
- JWT认证机制
- 版本化路径（/api/v1）

---

## 二、统一响应格式

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

**错误码定义**

| 错误码 | 说明 |
|--------|------|
| 0 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权/Token过期 |
| 403 | 无权限访问 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

---

## 三、认证模块

### 3.1 微信登录

**POST** `/api/v1/auth/login`

**请求参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| code | string | 是 | 微信登录code |

**响应示例**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": 1,
    "nickname": "健身小白",
    "avatar": "https://example.com/avatar.png"
  }
}
```

---

## 四、训练计划模块

### 4.1 获取计划列表

**GET** `/api/v1/plans`

**响应示例**

```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "planId": 1,
      "name": "新手增肌计划",
      "description": "适合健身新手的增肌训练",
      "difficulty": "easy",
      "durationWeeks": 8,
      "exerciseCount": 12,
      "createdAt": "2026-06-20T10:00:00Z"
    }
  ]
}
```

### 4.2 获取计划详情

**GET** `/api/v1/plans/{planId}`

**响应示例**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "planId": 1,
    "name": "新手增肌计划",
    "description": "适合健身新手的增肌训练",
    "difficulty": "easy",
    "durationWeeks": 8,
    "exercises": {
      "1": [
        { "exerciseId": 1, "name": "平板卧推", "sets": 4, "reps": "10-12", "restSeconds": 90 },
        { "exerciseId": 2, "name": "上斜哑铃卧推", "sets": 4, "reps": "10-12", "restSeconds": 90 }
      ],
      "2": [
        { "exerciseId": 3, "name": "引体向上", "sets": 4, "reps": "8-10", "restSeconds": 120 }
      ]
    }
  }
}
```

### 4.3 创建计划

**POST** `/api/v1/plans`

**请求参数**

```json
{
  "name": "新手增肌计划",
  "description": "适合健身新手的增肌训练",
  "difficulty": "easy",
  "durationWeeks": 8,
  "exercises": [
    {
      "dayOfWeek": 1,
      "name": "平板卧推",
      "sets": 4,
      "reps": "10-12",
      "restSeconds": 90
    }
  ]
}
```

### 4.4 更新计划

**PUT** `/api/v1/plans/{planId}`

请求参数同创建计划。

### 4.5 删除计划

**DELETE** `/api/v1/plans/{planId}`

---

## 五、训练记录模块

### 5.1 新增训练打卡

**POST** `/api/v1/records`

**请求参数**

```json
{
  "planId": 1,
  "exerciseId": 1,
  "setsCompleted": 4,
  "repsCompleted": "12",
  "weightUsed": 45.5,
  "durationSeconds": 300
}
```

### 5.2 获取训练记录

**GET** `/api/v1/records`

**查询参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| startDate | string | 否 | 起始日期 YYYY-MM-DD |
| endDate | string | 否 | 结束日期 YYYY-MM-DD |
| pageNum | number | 否 | 页码，默认1 |
| pageSize | number | 否 | 每页条数，默认10 |

### 5.3 获取今日训练概览

**GET** `/api/v1/records/today`

**响应示例**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "date": "2026-06-26",
    "totalRecords": 3,
    "totalDuration": 45,
    "exercises": [
      {
        "exerciseId": 3,
        "exerciseName": "平板卧推",
        "setsCompleted": 5,
        "repsCompleted": 10,
        "weightUsed": 45
      }
    ]
  }
}
```

### 5.4 删除训练记录

**DELETE** `/api/v1/records/{recordId}`

---

## 六、身体数据模块

### 6.1 录入身体数据

**POST** `/api/v1/body-metrics`

**请求参数**

```json
{
  "weight": 75.5,
  "bodyFatRate": 18.2,
  "muscleMass": 35.2,
  "bmi": 23.1,
  "notes": "本周训练效果不错"
}
```

### 6.2 获取身体数据列表

**GET** `/api/v1/body-metrics`

**查询参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| pageNum | number | 否 | 页码，默认1 |
| pageSize | number | 否 | 每页条数，默认10 |
| startDate | string | 否 | 起始日期 |
| endDate | string | 否 | 结束日期 |

### 6.3 获取最新身体数据

**GET** `/api/v1/body-metrics/latest`

### 6.4 获取身体数据趋势

**GET** `/api/v1/body-metrics/trend`

**查询参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | string | 是 | 数据类型：weight/bodyFatRate/bmi |
| days | number | 否 | 查询天数，默认30 |

**响应示例**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "type": "weight",
    "list": [
      { "date": "2026-06-01", "value": 77.2 },
      { "date": "2026-06-08", "value": 76.5 },
      { "date": "2026-06-15", "value": 76.0 },
      { "date": "2026-06-22", "value": 75.8 },
      { "date": "2026-06-26", "value": 75.5 }
    ],
    "summary": {
      "startValue": 77.2,
      "endValue": 75.5,
      "change": -1.7,
      "changeRate": -2.2
    }
  }
}
```

---

## 七、首页概览模块

### 7.1 获取首页数据

**GET** `/api/v1/home`

**响应示例**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "today": {
      "date": "2026-06-26",
      "recordCount": 3,
      "totalDuration": 45
    },
    "weekSummary": {
      "trainDays": 4,
      "totalDuration": 180
    },
    "latestMetrics": {
      "weight": 75.5,
      "bodyFatRate": 18.2
    },
    "recentRecords": [
      {
        "recordId": 1,
        "exerciseName": "平板卧推",
        "weightUsed": 45,
        "completedAt": "2026-06-26T17:30:00Z"
      }
    ]
  }
}
```

---

## 八、接口统计

| 模块 | 接口数量 |
|------|---------|
| 认证模块 | 2 |
| 训练计划 | 5 |
| 训练记录 | 4 |
| 身体数据 | 5 |
| 首页概览 | 1 |
| **合计** | **17** |
