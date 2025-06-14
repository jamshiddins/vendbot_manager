import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const HardwareConfigTab = ({ machine, onChange }) => {
  const [config, setConfig] = useState({
    temperature: {
      current: 4.2,
      target: 4.0,
      min: 2.0,
      max: 8.0,
      tolerance: 0.5,
      alertThreshold: 1.0
    },
    dispensing: {
      motorSpeed: 75,
      dispensingDelay: 2.5,
      retryAttempts: 3,
      jamDetection: true,
      forceThreshold: 85
    },
    sensors: {
      temperatureSensor: { status: 'active', lastCalibration: new Date('2024-01-15') },
      stockSensor: { status: 'active', lastCalibration: new Date('2024-01-20') },
      coinSensor: { status: 'active', lastCalibration: new Date('2024-01-18') },
      billSensor: { status: 'warning', lastCalibration: new Date('2024-01-10') },
      doorSensor: { status: 'active', lastCalibration: new Date('2024-01-22') }
    },
    lighting: {
      brightness: 80,
      schedule: {
        enabled: true,
        dayBrightness: 100,
        nightBrightness: 50,
        dayStart: '08:00',
        nightStart: '22:00'
      },
      motionActivated: true
    },
    power: {
      mode: 'normal', // normal, eco, performance
      sleepMode: {
        enabled: true,
        delay: 30, // minutes
        wakeOnMotion: true
      },
      voltageMonitoring: true,
      batteryBackup: {
        enabled: true,
        level: 85,
        lastTest: new Date('2024-01-20')
      }
    },
    maintenance: {
      cleaningCycle: {
        enabled: true,
        interval: 7, // days
        lastCleaning: new Date('2024-01-18'),
        nextCleaning: new Date('2024-01-25')
      },
      diagnostics: {
        autoRun: true,
        interval: 24, // hours
        lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000)
      }
    }
  });

  const [activeSection, setActiveSection] = useState('temperature');

  const handleConfigUpdate = (section, field, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    onChange();
  };

  const handleNestedConfigUpdate = (section, subsection, field, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
      }
    }));
    onChange();
  };

  const getSensorStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getSensorStatusBg = (status) => {
    switch (status) {
      case 'active': return 'bg-success-100';
      case 'warning': return 'bg-warning-100';
      case 'error': return 'bg-error-100';
      default: return 'bg-secondary-100';
    }
  };

  const sections = [
    { id: 'temperature', label: 'Температура', icon: 'Thermometer' },
    { id: 'dispensing', label: 'Выдача товаров', icon: 'Package' },
    { id: 'sensors', label: 'Датчики', icon: 'Radar' },
    { id: 'lighting', label: 'Освещение', icon: 'Lightbulb' },
    { id: 'power', label: 'Питание', icon: 'Battery' },
    { id: 'maintenance', label: 'Обслуживание', icon: 'Wrench' }
  ];

  const runDiagnostics = () => {
    // Simulate diagnostics run
    console.log('Running diagnostics...');
    setConfig(prev => ({
      ...prev,
      maintenance: {
        ...prev.maintenance,
        diagnostics: {
          ...prev.maintenance.diagnostics,
          lastRun: new Date()
        }
      }
    }));
  };

  const calibrateSensor = (sensorType) => {
    // Simulate sensor calibration
    console.log(`Calibrating ${sensorType} sensor...`);
    setConfig(prev => ({
      ...prev,
      sensors: {
        ...prev.sensors,
        [sensorType]: {
          ...prev.sensors[sensorType],
          lastCalibration: new Date(),
          status: 'active'
        }
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              activeSection === section.id
                ? 'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
            }`}
          >
            <Icon name={section.icon} size={16} />
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      {/* Temperature Section */}
      {activeSection === 'temperature' && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Управление температурой
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Текущая температура
                </label>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold text-primary">
                    {config.temperature.current}°C
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    Math.abs(config.temperature.current - config.temperature.target) <= config.temperature.tolerance
                      ? 'bg-success-100 text-success' :'bg-warning-100 text-warning'
                  }`}>
                    {Math.abs(config.temperature.current - config.temperature.target) <= config.temperature.tolerance
                      ? 'Норма' :'Отклонение'
                    }
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Целевая температура: {config.temperature.target}°C
                </label>
                <input
                  type="range"
                  min={config.temperature.min}
                  max={config.temperature.max}
                  step="0.1"
                  value={config.temperature.target}
                  onChange={(e) => handleConfigUpdate('temperature', 'target', parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>{config.temperature.min}°C</span>
                  <span>{config.temperature.max}°C</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Допуск (±°C)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={config.temperature.tolerance}
                    onChange={(e) => handleConfigUpdate('temperature', 'tolerance', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Порог тревоги (±°C)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={config.temperature.alertThreshold}
                    onChange={(e) => handleConfigUpdate('temperature', 'alertThreshold', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-secondary-50 p-4 rounded-lg">
              <h4 className="font-medium text-text-primary mb-3">График температуры (24ч)</h4>
              <div className="h-32 bg-white rounded border flex items-center justify-center">
                <Icon name="TrendingUp" size={24} className="text-text-muted" />
                <span className="ml-2 text-text-muted">График температуры</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dispensing Section */}
      {activeSection === 'dispensing' && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Настройки выдачи товаров
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Скорость мотора: {config.dispensing.motorSpeed}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={config.dispensing.motorSpeed}
                  onChange={(e) => handleConfigUpdate('dispensing', 'motorSpeed', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Задержка выдачи (сек)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={config.dispensing.dispensingDelay}
                  onChange={(e) => handleConfigUpdate('dispensing', 'dispensingDelay', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Попытки повтора
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={config.dispensing.retryAttempts}
                  onChange={(e) => handleConfigUpdate('dispensing', 'retryAttempts', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-text-primary">
                  Обнаружение заторов
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.dispensing.jamDetection}
                    onChange={(e) => handleConfigUpdate('dispensing', 'jamDetection', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.dispensing.jamDetection ? 'bg-success' : 'bg-secondary-300'
                  }`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.dispensing.jamDetection ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Порог усилия: {config.dispensing.forceThreshold}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={config.dispensing.forceThreshold}
                  onChange={(e) => handleConfigUpdate('dispensing', 'forceThreshold', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="bg-warning-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-warning">Внимание</span>
                </div>
                <p className="text-sm text-text-secondary mt-1">
                  Изменение настроек может повлиять на надежность выдачи товаров
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sensors Section */}
      {activeSection === 'sensors' && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Состояние датчиков
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(config.sensors).map(([sensorType, sensor]) => (
              <div key={sensorType} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-text-primary capitalize">
                    {sensorType.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <div className={`px-2 py-1 rounded-full text-xs ${getSensorStatusBg(sensor.status)} ${getSensorStatusColor(sensor.status)}`}>
                    {sensor.status === 'active' ? 'Активен' : 
                     sensor.status === 'warning' ? 'Предупреждение' : 'Ошибка'}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-text-secondary">
                    Последняя калибровка: {sensor.lastCalibration.toLocaleDateString('ru-RU')}
                  </p>
                  
                  <button
                    onClick={() => calibrateSensor(sensorType)}
                    className="w-full px-3 py-2 text-sm bg-secondary-100 text-text-primary rounded hover:bg-secondary-200 transition-colors duration-200"
                  >
                    Калибровать
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lighting Section */}
      {activeSection === 'lighting' && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Управление освещением
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Яркость: {config.lighting.brightness}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={config.lighting.brightness}
                  onChange={(e) => handleConfigUpdate('lighting', 'brightness', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-text-primary">
                  Активация движением
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.lighting.motionActivated}
                    onChange={(e) => handleConfigUpdate('lighting', 'motionActivated', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.lighting.motionActivated ? 'bg-success' : 'bg-secondary-300'
                  }`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.lighting.motionActivated ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-text-primary">
                  Расписание освещения
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.lighting.schedule.enabled}
                    onChange={(e) => handleNestedConfigUpdate('lighting', 'schedule', 'enabled', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.lighting.schedule.enabled ? 'bg-success' : 'bg-secondary-300'
                  }`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.lighting.schedule.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </div>
                </label>
              </div>

              {config.lighting.schedule.enabled && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Начало дня
                    </label>
                    <input
                      type="time"
                      value={config.lighting.schedule.dayStart}
                      onChange={(e) => handleNestedConfigUpdate('lighting', 'schedule', 'dayStart', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Начало ночи
                    </label>
                    <input
                      type="time"
                      value={config.lighting.schedule.nightStart}
                      onChange={(e) => handleNestedConfigUpdate('lighting', 'schedule', 'nightStart', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Power Section */}
      {activeSection === 'power' && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Управление питанием
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Режим питания
                </label>
                <select
                  value={config.power.mode}
                  onChange={(e) => handleConfigUpdate('power', 'mode', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="normal">Обычный</option>
                  <option value="eco">Экономичный</option>
                  <option value="performance">Производительный</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-text-primary">
                  Спящий режим
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.power.sleepMode.enabled}
                    onChange={(e) => handleNestedConfigUpdate('power', 'sleepMode', 'enabled', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.power.sleepMode.enabled ? 'bg-success' : 'bg-secondary-300'
                  }`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.power.sleepMode.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </div>
                </label>
              </div>

              {config.power.sleepMode.enabled && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Задержка (минут)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="120"
                    value={config.power.sleepMode.delay}
                    onChange={(e) => handleNestedConfigUpdate('power', 'sleepMode', 'delay', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-success-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text-primary">Резервная батарея</span>
                  <span className="text-sm font-bold text-success">{config.power.batteryBackup.level}%</span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full transition-all duration-300"
                    style={{ width: `${config.power.batteryBackup.level}%` }}
                  ></div>
                </div>
                <p className="text-xs text-text-secondary mt-2">
                  Последний тест: {config.power.batteryBackup.lastTest.toLocaleDateString('ru-RU')}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-text-primary">
                  Мониторинг напряжения
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.power.voltageMonitoring}
                    onChange={(e) => handleConfigUpdate('power', 'voltageMonitoring', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.power.voltageMonitoring ? 'bg-success' : 'bg-secondary-300'
                  }`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.power.voltageMonitoring ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Maintenance Section */}
      {activeSection === 'maintenance' && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Настройки обслуживания
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-text-primary">
                  Автоматическая очистка
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.maintenance.cleaningCycle.enabled}
                    onChange={(e) => handleNestedConfigUpdate('maintenance', 'cleaningCycle', 'enabled', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.maintenance.cleaningCycle.enabled ? 'bg-success' : 'bg-secondary-300'
                  }`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.maintenance.cleaningCycle.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </div>
                </label>
              </div>

              {config.maintenance.cleaningCycle.enabled && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Интервал очистки (дни)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={config.maintenance.cleaningCycle.interval}
                    onChange={(e) => handleNestedConfigUpdate('maintenance', 'cleaningCycle', 'interval', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              )}

              <div className="bg-primary-50 p-4 rounded-lg">
                <h4 className="font-medium text-text-primary mb-2">Расписание очистки</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Последняя очистка:</span>
                    <span className="text-text-primary">
                      {config.maintenance.cleaningCycle.lastCleaning.toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Следующая очистка:</span>
                    <span className="text-text-primary">
                      {config.maintenance.cleaningCycle.nextCleaning.toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-text-primary">
                  Автодиагностика
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.maintenance.diagnostics.autoRun}
                    onChange={(e) => handleNestedConfigUpdate('maintenance', 'diagnostics', 'autoRun', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.maintenance.diagnostics.autoRun ? 'bg-success' : 'bg-secondary-300'
                  }`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.maintenance.diagnostics.autoRun ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </div>
                </label>
              </div>

              {config.maintenance.diagnostics.autoRun && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Интервал диагностики (часы)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="168"
                    value={config.maintenance.diagnostics.interval}
                    onChange={(e) => handleNestedConfigUpdate('maintenance', 'diagnostics', 'interval', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={runDiagnostics}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  <Icon name="Play" size={16} />
                  <span>Запустить диагностику</span>
                </button>

                <p className="text-sm text-text-secondary text-center">
                  Последний запуск: {config.maintenance.diagnostics.lastRun.toLocaleString('ru-RU')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HardwareConfigTab;