const FeishuClient = require('./services/feishuClient');
const HealthDataService = require('./services/healthDataService');
const { formatDate, getDayOfWeek } = require('./utils/helpers');

async function main() {
  console.log('🚀 飞书健康数据插件启动');
  
  const healthService = new HealthDataService();
  const feishuClient = new FeishuClient();
  
  try {
    console.log('📊 正在获取健康数据...');
    const healthData = await healthService.fetchRealData();
    console.log('✅ 健康数据获取成功');
    
    console.log('📝 正在发送健康通知...');
    const today = new Date();
    const dateStr = `${formatDate(today)} ${getDayOfWeek(today)}`;
    
    const response = await feishuClient.sendHealthNotification(healthData);
    
    console.log('✅ 健康通知发送成功！');
    console.log(`📬 消息ID: ${response.data.message.message_id}`);
    
    console.log('\n🎉 今日健康摘要：');
    console.log(`📅 ${dateStr}`);
    console.log(`🚶 步数：${healthData.steps.today} 步 (目标完成率: ${Math.round(healthData.steps.today / healthData.steps.goal * 100)}%)`);
    console.log(`💤 睡眠：${healthData.sleep.totalSleep} 小时 (评分: ${healthData.sleep.sleepScore}分)`);
    console.log(`❤️ 心率：${healthData.heartRate.average} bpm (静息: ${healthData.heartRate.resting} bpm)`);
    console.log(`🔥 消耗：${healthData.activeEnergy.today} kcal`);
    console.log(`🚶 距离：${healthData.walkingDistance.today} km`);
    
  } catch (error) {
    console.error('❌ 发生错误:', error.message);
    process.exit(1);
  }
}

async function sendTextNotification(message) {
  const feishuClient = new FeishuClient();
  try {
    await feishuClient.sendTextMessage(message);
    console.log('✅ 文本消息发送成功');
  } catch (error) {
    console.error('❌ 发送失败:', error.message);
  }
}

async function sendGroupNotification(message, chatId) {
  const feishuClient = new FeishuClient();
  try {
    await feishuClient.sendGroupMessage(message, chatId);
    console.log('✅ 群消息发送成功');
  } catch (error) {
    console.error('❌ 发送失败:', error.message);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  main,
  sendTextNotification,
  sendGroupNotification,
  FeishuClient,
  HealthDataService
};