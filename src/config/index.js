require('dotenv').config();

module.exports = {
  feishu: {
    appId: process.env.FEISHU_APP_ID,
    appSecret: process.env.FEISHU_APP_SECRET,
    userAccessToken: process.env.FEISHU_USER_ACCESS_TOKEN,
    defaultReceiveId: process.env.FEISHU_DEFAULT_RECEIVE_ID || 'ou_xxxx',
    defaultChatId: process.env.FEISHU_DEFAULT_CHAT_ID || 'oc_xxxx'
  },
  notification: {
    enabled: process.env.NOTIFICATION_ENABLED === 'false' ? false : true,
    sendTime: process.env.NOTIFICATION_SEND_TIME || '08:00',
    sendDaily: process.env.NOTIFICATION_SEND_DAILY === 'false' ? false : true
  }
};