# 飞书健康数据插件

[![Node.js](https://img.shields.io/badge/Node.js-v20+-green.svg)](https://nodejs.org/)
[![Feishu SDK](https://img.shields.io/badge/Feishu-SDK-blue.svg)](https://open.feishu.cn/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

从 Apple Watch 获取运动和睡眠数据，通过飞书消息发送健康报告通知。

## 📋 功能特性

- 📊 **健康数据采集**：模拟从 Apple Watch 获取健康数据（步数、睡眠、心率、运动等）
- 💬 **飞书消息通知**：通过飞书消息发送健康报告
- 🎨 **富文本消息**：支持彩色样式的健康报告卡片
- 👥 **群组消息**：支持发送到个人或群组

## 📁 项目结构

```
.
├── src/
│   ├── config/           # 配置管理
│   │   └── index.js
│   ├── services/         # 核心服务
│   │   ├── feishuClient.js    # 飞书 API 客户端
│   │   └── healthDataService.js # 健康数据服务
│   ├── utils/            # 工具函数
│   │   └── helpers.js
│   └── index.js          # 主入口
├── test/                 # 单元测试
│   └── healthDataService.test.js
├── .env.example          # 环境变量示例
├── .gitignore
├── package.json
└── README.md
```

## 🚀 快速开始

### 1. 环境要求

- Node.js >= 18.x
- npm >= 10.x

### 2. 安装依赖

```bash
git clone <repository-url>
cd ban_sit_toolong
npm install
```

### 3. 配置环境变量

复制 `.env.example` 为 `.env` 并填写飞书配置：

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

### 4. 获取飞书配置

#### 获取 App ID 和 App Secret

1. 登录 [飞书开放平台](https://open.feishu.cn/)
2. 进入「开发者后台」→「应用管理」
3. 创建或选择你的应用
4. 在「凭证与基础信息」中获取 `App ID` 和 `App Secret`

#### 获取 User Access Token

通过 OAuth 授权码获取（推荐）：

1. 配置「重定向 URL」（如 `http://localhost:3000/callback`）
2. 构造授权链接：
   ```
   https://open.feishu.cn/open-apis/authen/v1/index?app_id=YOUR_APP_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code
   ```
3. 用户授权后获取 `code`，然后换取 `user_access_token`：
   ```bash
   curl -X POST https://open.feishu.cn/open-apis/authen/v1/access_token \
     -H "Content-Type: application/json" \
     -d '{
       "app_id": "YOUR_APP_ID",
       "app_secret": "YOUR_APP_SECRET",
       "code": "AUTHORIZATION_CODE",
       "grant_type": "authorization_code"
     }'
   ```

#### 获取 Open ID

调用飞书 API 获取当前用户的 open_id：

```bash
curl -X GET https://open.feishu.cn/open-apis/contact/v3/users/me \
  -H "Authorization: Bearer YOUR_USER_ACCESS_TOKEN"
```

### 5. 运行项目

```bash
# 发送健康报告通知
npm start

# 开发模式（自动重启）
npm run dev

# 运行测试
npm test
```

## 📖 使用示例

### 发送健康报告

```bash
npm start
```

### 发送文本消息

```javascript
const { sendTextNotification } = require('./src');

sendTextNotification('Hello from Feishu Health Plugin!');
```

### 发送群消息

```javascript
const { sendGroupNotification } = require('./src');

sendGroupNotification('健康日报已更新！', 'oc_your_chat_id');
```

### 编程式调用

```javascript
const { FeishuClient, HealthDataService } = require('./src');

// 创建客户端
const feishuClient = new FeishuClient();
const healthService = new HealthDataService();

// 获取健康数据
const healthData = await healthService.fetchRealData();

// 发送健康通知
await feishuClient.sendHealthNotification(healthData, 'ou_your_open_id');
```

## 📊 消息预览

发送的健康报告包含以下信息：

| 指标 | 示例 |
|------|------|
| 🚶 步数 | 8542 步 (目标完成率: 85%) |
| 💤 睡眠 | 7.5 小时 (评分: 82分) |
| ❤️ 心率 | 72 bpm (静息: 58 bpm) |
| 🔥 消耗 | 420 kcal |
| 🚶 距离 | 5.2 km |

## 🔧 API 文档

### FeishuClient

#### `sendTextMessage(content, receiveId)`
发送纯文本消息

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| content | string | 是 | 消息内容 |
| receiveId | string | 否 | 接收者 open_id，默认使用配置 |

#### `sendRichMessage(title, content, receiveId)`
发送富文本消息

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 消息标题 |
| content | array | 是 | 富文本内容 |
| receiveId | string | 否 | 接收者 open_id |

#### `sendGroupMessage(content, chatId)`
发送群组消息

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| content | string | 是 | 消息内容 |
| chatId | string | 否 | 群组 chat_id |

#### `sendHealthNotification(healthData, receiveId)`
发送健康数据通知

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| healthData | object | 是 | 健康数据对象 |
| receiveId | string | 否 | 接收者 open_id |

### HealthDataService

#### `fetchRealData()`
异步获取健康数据

#### `generateHealthReport()`
生成健康报告文本

#### `getTodaySteps()`
获取今日步数数据

#### `getSleepData()`
获取睡眠数据

#### `getHeartRateData()`
获取心率数据

## ⚙️ 配置说明

| 环境变量 | 说明 | 默认值 |
|----------|------|--------|
| FEISHU_APP_ID | 飞书应用 ID | - |
| FEISHU_APP_SECRET | 飞书应用密钥 | - |
| FEISHU_USER_ACCESS_TOKEN | 用户访问令牌 | - |
| FEISHU_DEFAULT_RECEIVE_ID | 默认接收者 open_id | ou_xxxx |
| FEISHU_DEFAULT_CHAT_ID | 默认群组 chat_id | oc_xxxx |
| NOTIFICATION_ENABLED | 是否启用通知 | true |
| NOTIFICATION_SEND_TIME | 定时发送时间 | 08:00 |
| NOTIFICATION_SEND_DAILY | 是否每日发送 | true |

## 🛠️ 开发

```bash
# 安装开发依赖
npm install

# 运行测试
npm test

# 开发模式
npm run dev
```

## 📝 测试

项目使用 Jest 进行单元测试：

```bash
npm test
```

测试覆盖：
- 健康数据服务
- 数据获取方法
- 报告生成功能

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

如有问题，请提交 Issue 或联系开发者。

---

**注意**：本项目使用模拟数据进行开发测试。如需接入真实的 Apple Watch 健康数据，需要集成 HealthKit 或相关健康数据 API。