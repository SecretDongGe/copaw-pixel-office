# CoPaw Pixel Office v3.0

AI Agent 状态可视化系统 - 让 Agent 的工作状态看得见！

##  特性

- **实时状态展示** - 6 种 Agent 状态可视化（待命/写作/调研/执行/同步/报错）
- **场景切换** - 3 个像素风场景（休息区/工作区/Bug 区）
- **多 Agent 支持** - 同时管理多个 Agent 状态
- **控制面板** - Web UI 手动控制状态
- **CLI 工具** - 命令行快速操作
- **REST API** - 集成到现有工作流
- **状态历史** - 时间线查看与统计

## 📦 技术栈

- **前端：** React 19 + Vite 8
- **样式：** CSS Modules + CSS Variables
- **动画：** CSS Keyframes
- **CLI：** Commander.js
- **API：** Express.js
- **部署：** Vercel (前端) + Railway (API)

##  快速开始

### 前端开发

```bash
cd copaw-pixel-office
npm install
npm run dev
```

### CLI 工具

```bash
npm install -g copaw-office
copaw office status
copaw office set --status writing --agent default
```

### API 服务

```bash
cd server
npm install
npm start
```

## 📚 文档

- [API 文档](./server/README.md)
- [CLI 使用指南](./cli/README.md)
- [组件文档](./src/components/README.md)

## 🎭 状态定义

| 状态 | 场景 | 说明 |
|------|------|------|
| idle | lounge | 待命中，猎豹在休息区 |
| writing | desk | 写作中，猎豹在工作区 |
| researching | desk | 调研中，猎豹在思考 |
| executing | desk | 执行中，猎豹在操作 |
| syncing | desk | 同步中，数据流转 |
| error | bug | 报错中，猎豹在修复 |

## 🤝 协作

- **设计：** Jack (像素艺术素材)
- **技术：** Yiming (CTO)
- **产品：** Secret

##  License

MIT
