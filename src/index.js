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
    
    console.log('📝 正在生成健康报告...');
    const report = healthService.generateHealthReport();
    console.log('✅ 健康报告生成成功');
    
    console.log('📤 正在上传到飞书...');
    const today = new Date();
    const docTitle = `${formatDate(today)} ${getDayOfWeek(today)} 健康报告`;
    
    const docId = await feishuClient.createDoc(docTitle, report);
    console.log('✅ 飞书文档创建成功');
    console.log(`📄 文档ID: ${docId}`);
    
    console.log('\n🎉 健康数据已成功上传到飞书！');
    console.log('📋 今日健康摘要：');
    console.log(`  - 步数：${healthData.steps.today} 步`);
    console.log(`  - 睡眠：${healthData.sleep.totalSleep} 小时`);
    console.log(`  - 心率：${healthData.heartRate.average} bpm`);
    
  } catch (error) {
    console.error('❌ 发生错误:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  main,
  FeishuClient,
  HealthDataService
};