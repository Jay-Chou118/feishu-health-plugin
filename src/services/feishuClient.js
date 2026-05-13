const lark = require('@larksuiteoapi/node-sdk');
const config = require('../config');

class FeishuClient {
  constructor() {
    this.client = new lark.Client({
      appId: config.feishu.appId,
      appSecret: config.feishu.appSecret
    });
  }

  async sendTextMessage(content, receiveId) {
    try {
      const response = await this.client.im.message.create({
        params: {
          receive_id_type: 'open_id',
          msg_type: 'text',
          content: JSON.stringify({ text: content })
        },
        data: {
          receive_id: receiveId || config.feishu.defaultReceiveId
        }
      });
      return response;
    } catch (error) {
      console.error('Failed to send text message:', error);
      throw error;
    }
  }

  async sendRichMessage(title, content, receiveId) {
    try {
      const response = await this.client.im.message.create({
        params: {
          receive_id_type: 'open_id',
          msg_type: 'post',
          content: JSON.stringify({
            post: {
              zh_cn: {
                title: title,
                content: content
              }
            }
          })
        },
        data: {
          receive_id: receiveId || config.feishu.defaultReceiveId
        }
      });
      return response;
    } catch (error) {
      console.error('Failed to send rich message:', error);
      throw error;
    }
  }

  async sendGroupMessage(content, chatId) {
    try {
      const response = await this.client.im.message.create({
        params: {
          receive_id_type: 'chat_id',
          msg_type: 'text',
          content: JSON.stringify({ text: content })
        },
        data: {
          receive_id: chatId || config.feishu.defaultChatId
        }
      });
      return response;
    } catch (error) {
      console.error('Failed to send group message:', error);
      throw error;
    }
  }

  async sendHealthNotification(healthData, receiveId) {
    const content = [
      [
        {
          tag: 'text',
          text: `📊 **今日健康报告**\n\n`
        }
      ],
      [
        {
          tag: 'text',
          text: '🚶 步数：'
        },
        {
          tag: 'text',
          text: `${healthData.steps.today} 步`,
          style: {
            bold: true,
            color: '#1377eb'
          }
        },
        {
          tag: 'text',
          text: ` (目标完成率: ${Math.round(healthData.steps.today / healthData.steps.goal * 100)}%)\n`
        }
      ],
      [
        {
          tag: 'text',
          text: '💤 睡眠：'
        },
        {
          tag: 'text',
          text: `${healthData.sleep.totalSleep} 小时`,
          style: {
            bold: true,
            color: '#722ed1'
          }
        },
        {
          tag: 'text',
          text: ` (评分: ${healthData.sleep.sleepScore}分)\n`
        }
      ],
      [
        {
          tag: 'text',
          text: '❤️ 心率：'
        },
        {
          tag: 'text',
          text: `${healthData.heartRate.average} bpm`,
          style: {
            bold: true,
            color: '#f5222d'
          }
        },
        {
          tag: 'text',
          text: ` (静息: ${healthData.heartRate.resting} bpm)\n`
        }
      ],
      [
        {
          tag: 'text',
          text: '🔥 消耗：'
        },
        {
          tag: 'text',
          text: `${healthData.activeEnergy.today} kcal`,
          style: {
            bold: true,
            color: '#fa8c16'
          }
        },
        {
          tag: 'text',
          text: `\n`
        }
      ],
      [
        {
          tag: 'text',
          text: '🚶 距离：'
        },
        {
          tag: 'text',
          text: `${healthData.walkingDistance.today} km`,
          style: {
            bold: true,
            color: '#52c41a'
          }
        }
      ]
    ];

    return await this.sendRichMessage('📱 健康数据通知', content, receiveId);
  }
}

module.exports = FeishuClient;