const HealthDataService = require('../src/services/healthDataService');

describe('HealthDataService', () => {
  let service;

  beforeEach(() => {
    service = new HealthDataService();
  });

  test('should get steps data', () => {
    const steps = service.getTodaySteps();
    expect(steps).toHaveProperty('today');
    expect(steps).toHaveProperty('weeklyAverage');
    expect(steps).toHaveProperty('goal');
    expect(typeof steps.today).toBe('number');
  });

  test('should get sleep data', () => {
    const sleep = service.getSleepData();
    expect(sleep).toHaveProperty('totalSleep');
    expect(sleep).toHaveProperty('deepSleep');
    expect(sleep).toHaveProperty('lightSleep');
    expect(sleep).toHaveProperty('remSleep');
    expect(sleep).toHaveProperty('sleepScore');
  });

  test('should get heart rate data', () => {
    const heartRate = service.getHeartRateData();
    expect(heartRate).toHaveProperty('current');
    expect(heartRate).toHaveProperty('resting');
    expect(heartRate).toHaveProperty('average');
    expect(heartRate).toHaveProperty('max');
  });

  test('should generate health report', () => {
    const report = service.generateHealthReport();
    expect(typeof report).toBe('string');
    expect(report).toContain('健康日报');
    expect(report).toContain('步数');
    expect(report).toContain('睡眠');
    expect(report).toContain('心率');
  });

  test('should fetch data asynchronously', async () => {
    const data = await service.fetchRealData();
    expect(data).toHaveProperty('steps');
    expect(data).toHaveProperty('sleep');
    expect(data).toHaveProperty('exercise');
  });
});