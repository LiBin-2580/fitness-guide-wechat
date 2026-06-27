# Git规范

> 版本控制和协作开发规范

---

## 一、分支管理

### 1.1 分支类型

| 分支 | 用途 | 命名规则 | 示例 |
|------|------|----------|------|
| main | 生产环境代码 | 固定 | main |
| develop | 开发主分支 | 固定 | develop |
| feature/* | 新功能开发 | feature/功能名 | feature/user-login |
| fix/* | Bug修复 | fix/问题描述 | fix/login-error |
| hotfix/* | 紧急修复 | hotfix/问题描述 | hotfix/security-fix |

### 1.2 分支流程

```
main (生产)
  ↑
  └── develop (开发)
        ↑
        ├── feature/user-login
        ├── feature/training-plan
        └── fix/login-error
```

### 1.3 分支操作

```bash
# 创建功能分支
git checkout develop
git checkout -b feature/training-plan

# 完成后合并到develop
git checkout develop
git merge --no-ff feature/training-plan
git branch -d feature/training-plan

# 发布版本后合并到main
git checkout main
git merge --no-ff develop
git tag -a v1.0.0 -m "发布v1.0.0版本"
```

---

## 二、提交规范

### 2.1 Commit Message 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 2.2 Type 类型

| Type | 说明 | 示例 |
|------|------|------|
| feat | 新功能 | feat(user): 添加微信登录功能 |
| fix | 修复bug | fix(auth): 修复token过期未刷新问题 |
| docs | 文档更新 | docs: 更新API文档 |
| style | 代码格式（不影响功能） | style: 统一代码缩进 |
| refactor | 重构（非新功能、非修复） | refactor(plan): 优化计划查询逻辑 |
| test | 测试相关 | test: 添加用户模块单元测试 |
| chore | 构建/工具变动 | chore: 更新webpack配置 |
| perf | 性能优化 | perf: 优化列表查询性能 |
| revert | 回滚 | revert: 回滚feat(user)提交 |

### 2.3 Scope 范围

可选，表示影响范围：

| Scope | 说明 |
|-------|------|
| user | 用户模块 |
| plan | 训练计划模块 |
| record | 训练记录模块 |
| metric | 身体数据模块 |
| auth | 认证模块 |
| api | API相关 |
| db | 数据库相关 |
| config | 配置相关 |

### 2.4 示例

```bash
# 简单提交
git commit -m "feat(plan): 添加创建训练计划接口"

# 带详细描述
git commit -m "feat(plan): 添加创建训练计划接口

- 实现POST /api/v1/plans接口
- 支持批量添加训练动作
- 添加参数验证

Closes #123"

# 修复bug
git commit -m "fix(auth): 修复JWT过期时间计算错误

将exp从秒误用为毫秒的问题

Fixes #456"

# 破坏性变更
git commit -m "feat(api): 重构用户接口

BREAKING CHANGE: 用户接口路径从 /api/user 改为 /api/v1/users"
```

---

## 三、代码审查

### 3.1 Pull Request 规范

**标题**：与commit message格式一致

```
feat(plan): 添加训练计划CRUD功能
```

**描述模板**：

```markdown
## 变更内容
- 新增训练计划列表接口
- 新增训练计划详情接口
- 新增创建训练计划接口

## 变更原因
用户需要管理自己的训练计划

## 测试情况
- [x] 单元测试通过
- [x] 接口测试通过
- [ ] 集成测试待完成

## 截图（如适用）
无

## 关联Issue
Closes #123
```

### 3.2 审查要点

- [ ] 代码是否符合项目规范
- [ ] 是否有安全隐患
- [ ] 是否有性能问题
- [ ] 错误处理是否完善
- [ ] 是否需要更新文档
- [ ] 是否需要添加测试

---

## 四、版本管理

### 4.1 语义化版本

格式：`主版本号.次版本号.修订号`（如 `1.2.3`）

| 变动 | 说明 | 示例 |
|------|------|------|
| 主版本号 | 不兼容的API变更 | 1.0.0 → 2.0.0 |
| 次版本号 | 向后兼容的功能新增 | 1.0.0 → 1.1.0 |
| 修订号 | 向后兼容的问题修复 | 1.0.0 → 1.0.1 |

### 4.2 Tag 规范

```bash
# 正式版本
git tag -a v1.0.0 -m "Release v1.0.0: 首次发布"

# 预发布版本
git tag -a v1.1.0-beta.1 -m "Beta v1.1.0-beta.1: 测试新功能"
```

---

## 五、.gitignore

```gitignore
# 依赖
node_modules/
miniprogram/miniprogram_npm/

# 环境配置
.env
.env.local
.env.production

# 编辑器
.vscode/
.idea/
*.swp
*.swo

# 系统文件
.DS_Store
Thumbs.db

# 日志
logs/
*.log

# 编译产物
dist/
build/

# 上传文件
uploads/

# 测试覆盖率
coverage/
```

---

## 六、常用命令

```bash
# 查看状态
git status

# 查看提交历史
git log --oneline --graph

# 暂存当前修改
git stash
git stash pop

# 撤销工作区修改
git checkout -- <file>

# 撤销暂存
git reset HEAD <file>

# 修改最后一次提交
git commit --amend

# 查看某文件的修改历史
git log -p <file>

# 比较分支差异
git diff develop..feature/xxx
```
