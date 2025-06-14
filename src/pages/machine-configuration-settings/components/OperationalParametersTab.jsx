import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const OperationalParametersTab = ({ machine, onChange }) => {
  const [operationalConfig, setOperationalConfig] = useState({
    schedule: {
      enabled: true,
      timezone: 'Europe/Moscow',
      operatingHours: {
        monday: { enabled: true, start: '08:00', end: '22:00' },
        tuesday: { enabled: true, start: '08:00', end: '22:00' },
        wednesday: { enabled: true, start: '08:00', end: '22:00' },
        thursday: { enabled: true, start: '08:00', end: '22:00' },
        friday: { enabled: true, start: '08:00', end: '22:00' },
        saturday: { enabled: true, start: '10:00', end: '20:00' },
        sunday: { enabled: false, start: '10:00', end: '18:00' }
      },
      holidays: [
        { date: '2024-01-01', name: 'Новый год', enabled: false },
        { date: '2024-01-07', name: 'Рождество', enabled: false },
        { date: '2024-02-23', name: 'День защитника Отечества', enabled: true },
        { date: '2024-03-08', name: 'Международный женский день', enabled: true }
      ]
    },
    alerts: {
      lowStock: {
        enabled: true,
        threshold: 20, // percentage
        recipients: ['admin@vendingpro.ru', 'service@vendingpro.ru']
      },
      temperature: {
        enabled: true,
        minThreshold: 2,
        maxThreshold: 8,
        recipients: ['tech@vendingpro.ru']
      },
      maintenance: {
        enabled: true,
        daysBeforeService: 7,
        recipients: ['maintenance@vendingpro.ru']
      },
      revenue: {
        enabled: true,
        dailyTarget: 1000,
        weeklyTarget: 7000,
        recipients: ['manager@vendingpro.ru']
      }
    },
    payment: {
      methods: {
        cash: { enabled: true, minAmount: 1, maxAmount: 1000 },
        card: { enabled: true, minAmount: 10, maxAmount: 5000 },
        contactless: { enabled: true, minAmount: 1, maxAmount: 3000 },
        mobile: { enabled: true, minAmount: 1, maxAmount: 3000 }
      },
      currency: 'RUB',
      changeGiving: {
        enabled: true,
        maxChange: 500,
        coinTypes: [1, 2, 5, 10],
        billTypes: [50, 100, 200, 500]
      },
      receipts: {
        enabled: true,
        printByDefault: false,
        includeQR: true,
        companyInfo: {
          name: 'ООО "ВендингПро"',
          inn: '7701234567',
          address: 'г. Москва, ул. Тверская, д. 1'
        }
      }
    },
    security: {
      access: {
        serviceCode: '1234',
        adminCode: '9876',
        codeExpiry: 30, // days
        maxAttempts: 3
      },
      surveillance: {
        camera: {
          enabled: true,
          resolution: '1080p',
          nightVision: true,
          motionDetection: true
        },
        alarms: {
          doorOpen: true,
          vibration: true,
          tilt: true,
          powerLoss: true
        }
      },
      antiTheft: {
        enabled: true,
        sensitivity: 'medium',
        alertDelay: 30, // seconds
        autoLock: true
      }
    },
    reporting: {
      frequency: 'daily',
      time: '23:00',
      recipients: ['reports@vendingpro.ru'],
      includeMetrics: {
        sales: true,
        inventory: true,
        temperature: true,
        errors: true,
        maintenance: true
      },
      format: 'pdf'
    }
  });

  const [activeSection, setActiveSection] = useState('schedule');

  const handleConfigUpdate = (section, field, value) => {
    setOperationalConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    onChange();
  };

  const handleNestedConfigUpdate = (section, subsection, field, value) => {
    setOperationalConfig(prev => ({
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

  const handleDayScheduleUpdate = (day, field, value) => {
    setOperationalConfig(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        operatingHours: {
          ...prev.schedule.operatingHours,
          [day]: {
            ...prev.schedule.operatingHours[day],
            [field]: value
          }
        }
      }
    }));
    onChange();
  };

  const sections = [
    { id: 'schedule', label: 'Расписание работы', icon: 'Calendar' },
    { id: 'alerts', label: 'Уведомления', icon: 'Bell' },
    { id: 'payment', label: 'Платежи', icon: 'CreditCard' },
    { id: 'security', label: 'Безопасность', icon: 'Shield' },
    { id: 'reporting', label: 'Отчетность', icon: 'FileText' }
  ];

  const dayNames = {
    monday: 'Понедельник',
    tuesday: 'Вторник',
    wednesday: 'Среда',
    thursday: 'Четверг',
    friday: 'Пятница',
    saturday: 'Суббота',
    sunday: 'Воскресенье'
  };

  const paymentMethodNames = {
    cash: 'Наличные',
    card: 'Банковские карты',
    contactless: 'Бесконтактная оплата',
    mobile: 'Мобильные платежи'
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

      {/* Schedule Section */}
      {activeSection === 'schedule' && (
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
              Режим работы
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-text-primary">
                  Включить расписание
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={operationalConfig.schedule.enabled}
                    onChange={(e) => handleConfigUpdate('schedule', 'enabled', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    operationalConfig.schedule.enabled ? 'bg-success' : 'bg-secondary-300'
                  }`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      operationalConfig.schedule.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Часовой пояс
                </label>
                <select
                  value={operationalConfig.schedule.timezone}
                  onChange={(e) => handleConfigUpdate('schedule', 'timezone', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="Europe/Moscow">Москва (UTC+3)</option>
                  <option value="Europe/Samara">Самара (UTC+4)</option>
                  <option value="Asia/Yekaterinburg">Екатеринбург (UTC+5)</option>
                  <option value="Asia/Novosibirsk">Новосибирск (UTC+7)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
              Часы работы по дням недели
            </h3>
            
            <div className="space-y-4">
              {Object.entries(operationalConfig.schedule.operatingHours).map(([day, schedule]) => (
                <div key={day} className="flex items-center space-x-4 p-3 bg-secondary-50 rounded-lg">
                  <div className="w-24">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={schedule.enabled}
                        onChange={(e) => handleDayScheduleUpdate(day, 'enabled', e.target.checked)}
                        className="mr-2 rounded border-border focus:ring-primary"
                      />
                      <span className="text-sm font-medium text-text-primary">
                        {dayNames[day]}
                      </span>
                    </label>
                  </div>
                  
                  {schedule.enabled && (
                    <div className="flex items-center space-x-2">
                      <input
                        type="time"
                        value={schedule.start}
                        onChange={(e) => handleDayScheduleUpdate(day, 'start', e.target.value)}
                        className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <span className="text-text-secondary">—</span>
                      <input
                        type="time"
                        value={schedule.end}
                        onChange={(e) => handleDayScheduleUpdate(day, 'end', e.target.value)}
                        className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  )}
                  
                  {!schedule.enabled && (
                    <span className="text-sm text-text-muted">Выходной</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
              Праздничные дни
            </h3>
            
            <div className="space-y-3">
              {operationalConfig.schedule.holidays.map((holiday, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{holiday.name}</p>
                    <p className="text-xs text-text-secondary">
                      {new Date(holiday.date).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={holiday.enabled}
                      onChange={(e) => {
                        const updatedHolidays = [...operationalConfig.schedule.holidays];
                        updatedHolidays[index].enabled = e.target.checked;
                        handleConfigUpdate('schedule', 'holidays', updatedHolidays);
                      }}
                      className="sr-only"
                    />
                    <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      holiday.enabled ? 'bg-success' : 'bg-secondary-300'
                    }`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        holiday.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Alerts Section */}
      {activeSection === 'alerts' && (
        <div className="space-y-6">
          {Object.entries(operationalConfig.alerts).map(([alertType, alertConfig]) => (
            <div key={alertType} className="bg-surface border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-heading font-semibold text-text-primary capitalize">
                  {alertType === 'lowStock' ? 'Низкий остаток товаров' :
                   alertType === 'temperature' ? 'Температурные уведомления' :
                   alertType === 'maintenance' ? 'Уведомления о обслуживании' :
                   alertType === 'revenue' ? 'Уведомления о выручке' : alertType}
                </h3>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={alertConfig.enabled}
                    onChange={(e) => handleNestedConfigUpdate('alerts', alertType, 'enabled', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    alertConfig.enabled ? 'bg-success' : 'bg-secondary-300'
                  }`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      alertConfig.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </div>
                </label>
              </div>

              {alertConfig.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    {alertType === 'lowStock' && (
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Порог уведомления (%)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={alertConfig.threshold}
                          onChange={(e) => handleNestedConfigUpdate('alerts', alertType, 'threshold', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    )}

                    {alertType === 'temperature' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Минимальная температура (°C)
                          </label>
                          <input
                            type="number"
                            value={alertConfig.minThreshold}
                            onChange={(e) => handleNestedConfigUpdate('alerts', alertType, 'minThreshold', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Максимальная температура (°C)
                          </label>
                          <input
                            type="number"
                            value={alertConfig.maxThreshold}
                            onChange={(e) => handleNestedConfigUpdate('alerts', alertType, 'maxThreshold', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </>
                    )}

                    {alertType === 'maintenance' && (
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Дней до обслуживания
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="30"
                          value={alertConfig.daysBeforeService}
                          onChange={(e) => handleNestedConfigUpdate('alerts', alertType, 'daysBeforeService', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    )}

                    {alertType === 'revenue' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Дневная цель (₽)
                          </label>
                          <input
                            type="number"
                            value={alertConfig.dailyTarget}
                            onChange={(e) => handleNestedConfigUpdate('alerts', alertType, 'dailyTarget', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Недельная цель (₽)
                          </label>
                          <input
                            type="number"
                            value={alertConfig.weeklyTarget}
                            onChange={(e) => handleNestedConfigUpdate('alerts', alertType, 'weeklyTarget', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Получатели уведомлений
                    </label>
                    <textarea
                      value={alertConfig.recipients.join('\n')}
                      onChange={(e) => handleNestedConfigUpdate('alerts', alertType, 'recipients', 
                        e.target.value.split('\n').filter(email => email.trim())
                      )}
                      placeholder="email@example.com"
                      rows="4"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Payment Section */}
      {activeSection === 'payment' && (
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
              Способы оплаты
            </h3>
            
            <div className="space-y-4">
              {Object.entries(operationalConfig.payment.methods).map(([method, config]) => (
                <div key={method} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-text-primary">
                      {paymentMethodNames[method]}
                    </h4>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={config.enabled}
                        onChange={(e) => handleNestedConfigUpdate('payment', 'methods', method, {
                          ...config,
                          enabled: e.target.checked
                        })}
                        className="sr-only"
                      />
                      <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        config.enabled ? 'bg-success' : 'bg-secondary-300'
                      }`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          config.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </div>
                    </label>
                  </div>

                  {config.enabled && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Минимальная сумма (₽)
                        </label>
                        <input
                          type="number"
                          value={config.minAmount}
                          onChange={(e) => handleNestedConfigUpdate('payment', 'methods', method, {
                            ...config,
                            minAmount: parseInt(e.target.value)
                          })}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Максимальная сумма (₽)
                        </label>
                        <input
                          type="number"
                          value={config.maxAmount}
                          onChange={(e) => handleNestedConfigUpdate('payment', 'methods', method, {
                            ...config,
                            maxAmount: parseInt(e.target.value)
                          })}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
              Выдача сдачи
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-text-primary">
                  Включить выдачу сдачи
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={operationalConfig.payment.changeGiving.enabled}
                    onChange={(e) => handleNestedConfigUpdate('payment', 'changeGiving', 'enabled', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    operationalConfig.payment.changeGiving.enabled ? 'bg-success' : 'bg-secondary-300'
                  }`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      operationalConfig.payment.changeGiving.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </div>
                </label>
              </div>

              {operationalConfig.payment.changeGiving.enabled && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Максимальная сдача (₽)
                  </label>
                  <input
                    type="number"
                    value={operationalConfig.payment.changeGiving.maxChange}
                    onChange={(e) => handleNestedConfigUpdate('payment', 'changeGiving', 'maxChange', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Security Section */}
      {activeSection === 'security' && (
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
              Коды доступа
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Сервисный код
                  </label>
                  <input
                    type="password"
                    value={operationalConfig.security.access.serviceCode}
                    onChange={(e) => handleNestedConfigUpdate('security', 'access', 'serviceCode', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Административный код
                  </label>
                  <input
                    type="password"
                    value={operationalConfig.security.access.adminCode}
                    onChange={(e) => handleNestedConfigUpdate('security', 'access', 'adminCode', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Срок действия кода (дни)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={operationalConfig.security.access.codeExpiry}
                    onChange={(e) => handleNestedConfigUpdate('security', 'access', 'codeExpiry', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Максимум попыток ввода
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={operationalConfig.security.access.maxAttempts}
                    onChange={(e) => handleNestedConfigUpdate('security', 'access', 'maxAttempts', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
              Система видеонаблюдения
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-primary">
                    Включить камеру
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={operationalConfig.security.surveillance.camera.enabled}
                      onChange={(e) => handleNestedConfigUpdate('security', 'surveillance', 'camera', {
                        ...operationalConfig.security.surveillance.camera,
                        enabled: e.target.checked
                      })}
                      className="sr-only"
                    />
                    <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      operationalConfig.security.surveillance.camera.enabled ? 'bg-success' : 'bg-secondary-300'
                    }`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        operationalConfig.security.surveillance.camera.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-primary">
                    Ночное видение
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={operationalConfig.security.surveillance.camera.nightVision}
                      onChange={(e) => handleNestedConfigUpdate('security', 'surveillance', 'camera', {
                        ...operationalConfig.security.surveillance.camera,
                        nightVision: e.target.checked
                      })}
                      className="sr-only"
                    />
                    <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      operationalConfig.security.surveillance.camera.nightVision ? 'bg-success' : 'bg-secondary-300'
                    }`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        operationalConfig.security.surveillance.camera.nightVision ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-primary">
                    Детекция движения
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={operationalConfig.security.surveillance.camera.motionDetection}
                      onChange={(e) => handleNestedConfigUpdate('security', 'surveillance', 'camera', {
                        ...operationalConfig.security.surveillance.camera,
                        motionDetection: e.target.checked
                      })}
                      className="sr-only"
                    />
                    <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      operationalConfig.security.surveillance.camera.motionDetection ? 'bg-success' : 'bg-secondary-300'
                    }`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        operationalConfig.security.surveillance.camera.motionDetection ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Разрешение записи
                  </label>
                  <select
                    value={operationalConfig.security.surveillance.camera.resolution}
                    onChange={(e) => handleNestedConfigUpdate('security', 'surveillance', 'camera', {
                      ...operationalConfig.security.surveillance.camera,
                      resolution: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="720p">720p HD</option>
                    <option value="1080p">1080p Full HD</option>
                    <option value="4K">4K Ultra HD</option>
                  </select>
                </div>

                <div className="bg-warning-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertTriangle" size={16} className="text-warning" />
                    <span className="text-sm font-medium text-warning">Внимание</span>
                  </div>
                  <p className="text-sm text-text-secondary mt-1">
                    Высокое разрешение увеличивает объем данных
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reporting Section */}
      {activeSection === 'reporting' && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Автоматические отчеты
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Частота отправки
                </label>
                <select
                  value={operationalConfig.reporting.frequency}
                  onChange={(e) => handleConfigUpdate('reporting', 'frequency', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="daily">Ежедневно</option>
                  <option value="weekly">Еженедельно</option>
                  <option value="monthly">Ежемесячно</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Время отправки
                </label>
                <input
                  type="time"
                  value={operationalConfig.reporting.time}
                  onChange={(e) => handleConfigUpdate('reporting', 'time', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Формат отчета
                </label>
                <select
                  value={operationalConfig.reporting.format}
                  onChange={(e) => handleConfigUpdate('reporting', 'format', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Получатели отчетов
                </label>
                <textarea
                  value={operationalConfig.reporting.recipients.join('\n')}
                  onChange={(e) => handleConfigUpdate('reporting', 'recipients', 
                    e.target.value.split('\n').filter(email => email.trim())
                  )}
                  placeholder="email@example.com"
                  rows="4"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Включить в отчет
                </label>
                <div className="space-y-2">
                  {Object.entries(operationalConfig.reporting.includeMetrics).map(([metric, enabled]) => (
                    <label key={metric} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={(e) => handleNestedConfigUpdate('reporting', 'includeMetrics', metric, e.target.checked)}
                        className="mr-2 rounded border-border focus:ring-primary"
                      />
                      <span className="text-sm text-text-primary capitalize">
                        {metric === 'sales' ? 'Продажи' :
                         metric === 'inventory' ? 'Инвентарь' :
                         metric === 'temperature' ? 'Температура' :
                         metric === 'errors' ? 'Ошибки' :
                         metric === 'maintenance' ? 'Обслуживание' : metric}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperationalParametersTab;