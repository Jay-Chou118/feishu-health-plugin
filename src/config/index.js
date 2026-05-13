require('dotenv').config();

module.exports = {
  feishu: {
    appId: process.env.FEISHU_APP_ID,
    appSecret: process.env.FEISHU_APP_SECRET,
    userAccessToken: process.env.FEISHU_USER_ACCESS_TOKEN
  }
};