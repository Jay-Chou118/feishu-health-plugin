class HealthDataService {
  constructor() {
    this.mockData = {
      steps: {
        today: 8542,
        weeklyAverage: 7200,
        monthlyAverage: 6800,
        goal: 10000
      },
      activeEnergy: {
        today: 420,
        weeklyAverage: 380,
        unit: 'kcal'
      },
      heartRate: {
        current: 72,
        resting: 58,
        average: 70,
        max: 156
      },
      sleep: {
        totalSleep: 7.5,
        deepSleep: 1.8,
        lightSleep: 4.2,
        remSleep: 1.5,
        bedtime: '22:30',
        wakeTime: '06:00',
        sleepScore: 82
      },
      exercise: {
        todayMinutes: 45,
        weeklyMinutes: 280,
        activities: [
          { type: '跑步', duration: 30, calories: 280, date: '2024-01-15' },
          { type: '游泳', duration: 45, calories: 420, date: '2024-01-14' },
          { type: '力量训练', duration: 35, calories: 220, date: '2024-01-13' }
        ]
      },
      standHours: {
        today: 8,
        goal: 12
      },
      walkingDistance: {
        today: 5.2,
        weeklyAverage: 4.8,
        unit: 'km'
      }
    };
  }

  getTodaySteps() {
    return this.mockData.steps;
  }

  getSleepData() {
    return this.mockData.sleep;
  }

  getExerciseData() {
    return this.mockData.exercise;
  }

  getHeartRateData() {
    return this.mockData.heartRate;
  }

  getActiveEnergy() {
    return this.mockData.activeEnergy;
  }

  getStandHours() {
    return this.mockData.standHours;
  }

  getWalkingDistance() {
    return this.mockData.walkingDistance;
  }

  generateHealthReport() {
    const data = this.mockData;
    
    return `
## 健康日报

### 📊 今日步数
- 步数：${data.steps.today} 步
- 目标完成率：${Math.round(data.steps.today / data.steps.goal * 100)}%
- 周平均：${data.steps.weeklyAverage} 步

### 💤 睡眠分析
- 总睡眠时长：${data.sleep.totalSleep} 小时
- 深度睡眠：${data.sleep.deepSleep} 小时 (${Math.round(data.sleep.deepSleep / data.sleep.totalSleep * 100)}%)
- 浅度睡眠：${data.sleep.lightSleep} 小时 (${Math.round(data.sleep.lightSleep / data.sleep.totalSleep * 100)}%)
- REM睡眠：${data.sleep.remSleep} 小时 (${Math.round(data.sleep.remSleep / data.sleep.totalSleep * 100)}%)
- 就寝时间：${data.sleep.bedtime}
- 起床时间：${data.sleep.wakeTime}
- 睡眠评分：${data.sleep.sleepScore} 分

### ❤️ 心率数据
- 当前心率：${data.heartRate.current} bpm
- 静息心率：${data.heartRate.resting} bpm
- 平均心率：${data.heartRate.average} bpm
- 最高心率：${data.heartRate.max} bpm

### 🔥 活动能量
- 今日消耗：${data.activeEnergy.today} ${data.activeEnergy.unit}
- 周平均：${data.activeEnergy.weeklyAverage} ${data.activeEnergy.unit}

### 🚶 行走距离
- 今日距离：${data.walkingDistance.today} ${data.walkingDistance.unit}
- 周平均：${data.walkingDistance.weeklyAverage} ${data.walkingDistance.unit}

### ⏳ 站立时长
- 今日站立：${data.standHours.today} 小时
- 目标：${data.standHours.goal} 小时

### 🏋️ 本周运动
- 总时长：${data.exercise.weeklyMinutes} 分钟
- 今日运动：${data.exercise.todayMinutes} 分钟

**运动详情：**
${data.exercise.activities.map(act => `- ${act.date} ${act.type}：${act.duration}分钟，消耗${act.calories}卡路里`).join('\n')}

---
*数据来源：Apple Watch*
    `.trim();
  }

  async fetchRealData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockData);
      }, 1000);
    });
  }
}

module.exports = HealthDataService;