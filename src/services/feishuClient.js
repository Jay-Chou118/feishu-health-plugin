const lark = require('@larksuiteoapi/node-sdk');
const config = require('../config');

class FeishuClient {
  constructor() {
    this.client = new lark.Client({
      appId: config.feishu.appId,
      appSecret: config.feishu.appSecret
    });
  }

  async sendMessage(content) {
    try {
      const response = await this.client.im.message.create({
        params: {
          receive_id: 'ou_xxxx',
          msg_type: 'text',
          content: JSON.stringify({ text: content })
        },
        data: {
          receive_id: 'ou_xxxx'
        }
      });
      return response;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  async createDoc(title, content) {
    try {
      const response = await this.client.docx.document.create({
        params: {
          title: title
        }
      });
      
      const docId = response.data.document.document_id;
      
      await this.client.docx.document.batchUpdate({
        params: {
          document_id: docId
        },
        data: {
          requests: [
            {
              insert_text: {
                location: {
                  segment_id: '',
                  index: 0
                },
                text: content
              }
            }
          ]
        }
      });
      
      return docId;
    } catch (error) {
      console.error('Failed to create doc:', error);
      throw error;
    }
  }

  async uploadFile(filePath) {
    try {
      const response = await this.client.drive.file.uploadAll({
        params: {
          folder_token: 'fld_xxxx',
          file_name: 'health_report.md'
        },
        data: {
          file: filePath
        }
      });
      return response;
    } catch (error) {
      console.error('Failed to upload file:', error);
      throw error;
    }
  }
}

module.exports = FeishuClient;