# 🚀 飞书健康数据插件

一个基于 Node.js 的飞书提示插件，用于从 Apple Watch 获取运动和睡眠数据，并通过飞书消息发送健康报告通知。

---

## ✨ 功能特性

- 📊 **健康数据采集** - 模拟从 Apple Watch 获取健康数据（步数、睡眠、心率、运动等）
- 💬 **飞书消息通知** - 通过飞书消息发送格式化的健康报告
- 🎨 **富文本消息** - 支持带样式的富文本消息展示
- ⚙️ **灵活配置** - 支持配置默认接收人、通知时间等

---

## 📁 项目结构

```
feishu-health-plugin/
├── src/
│   ├── config/
│   │   └── index.js          # 配置管理
│   ├── services/
│   │   ├── feishuClient.js   # 飞书API客户端
│   │   └── healthDataService.js  # 健康数据服务
│   ├── utils/
│   │   └── helpers.js        # 工具函数
│   └── index.js              # 主入口
├── test/
│   └── healthDataService.test.js  # 单元测试
├── .env.example              # 环境变量示例
├── .gitignore
├── package.json
└── README.md
```

---

## 📋 安装要求

- Node.js >= 18.x
- npm >= 10.x
- 飞书开发者账号

---

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并填写配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
# 飞书应用配置
FEISHU_APP_ID=your_app_id_here
FEISHU_APP_SECRET=your_app_secret_here
FEISHU_USER_ACCESS_TOKEN=your_user_access_token_here
FEISHU_DEFAULT_RECEIVE_ID=your_open_id_here
FEISHU_DEFAULT_CHAT_ID=your_chat_id_here

# 通知配置
NOTIFICATION_ENABLED=true
NOTIFICATION_SEND_TIME=08:00
NOTIFICATION_SEND_DAILY=true
```

### 3. 获取飞书配置信息

#### 如何获取 APP_ID 和 APP_SECRET
1. 登录 [飞书开放平台](https://open.feishu.cn/)
2. 进入「开发者后台」→「应用管理」
3. 创建或选择你的企业自建应用
4. 在「凭证与基础信息」中获取 `App ID` 和 `App Secret`

#### 如何获取 USER_ACCESS_TOKEN
1. 在应用中配置「重定向 URL」
2. 使用 OAuth 授权码流程获取用户访问令牌
3. 或在「调试工具」中获取临时令牌（测试用）

#### 如何获取 OPEN_ID
- 通过飞书 API `user/v2/me` 获取当前用户的 open_id

### 4. 运行项目

```bash
# 发送健康数据通知
npm start

# 开发模式（自动重启）
npm run dev

# 运行测试
npm test
```

---

## 📖 使用说明

### 发送健康通知

```bash
npm start
```

这将获取模拟的健康数据并发送到飞书。

### 发送自定义文本消息

```javascript
const { sendTextNotification } = require('./src');

await sendTextNotification('你好，这是一条测试消息！');
```

### 发送群消息

```javascript
const { sendGroupNotification } = require('./src');

await sendGroupNotification('这是一条群消息', 'oc_your_chat_id');
```

---

## 📱 消息预览

发送的健康通知包含以下信息：

| 指标 | 说明 |
|------|------|
| 🚶 步数 | 今日步数及目标完成率 |
| 💤 睡眠 | 睡眠时长及评分 |
| ❤️ 心率 | 平均心率及静息心率 |
| 🔥 消耗 | 今日消耗卡路里 |
| 🚶 距离 | 行走距离 |

---

## 🔧 API 说明

### FeishuClient 类

| 方法 | 功能 | 参数 |
|------|------|------|
| `sendTextMessage(content, receiveId)` | 发送文本消息 | content: 消息内容, receiveId: 接收者ID |
| `sendRichMessage(title, content, receiveId)` | 发送富文本消息 | title: 标题, content: 内容, receiveId: 接收者ID |
| `sendGroupMessage(content, chatId)` | 发送群消息 | content: 消息内容, chatId: 群组ID |
| `sendHealthNotification(healthData, receiveId)` | 发送健康通知 | healthData: 健康数据对象, receiveId: 接收者ID |

---

## 🧪 测试

运行单元测试：

```bash
npm test
```

测试覆盖：
- 健康数据服务
- 步数数据获取
- 睡眠数据获取
- 心率数据获取
- 健康报告生成
- 异步数据获取

---

## 📄 许可证

MIT License

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📮 联系方式

如有问题，请通过 Issue 联系。