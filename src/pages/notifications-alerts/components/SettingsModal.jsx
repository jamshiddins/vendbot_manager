// src/pages/notifications-alerts/components/SettingsModal.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SettingsModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    emailAddress: 'admin@vendbot.ru',
    phoneNumber: '+7 (999) 123-45-67',
    criticalThreshold: 30,
    warningThreshold: 60,
    schedule: 'always',
    quietHours: { start: '22:00', end: '08:00' },
    roles: {
      admin: { critical: true, warning: true, info: true },
      operator: { critical: true, warning: true, info: false },
      technician: { critical: true, warning: false, info: false }
    }
  });

  const tabs = [
    { id: 'notifications', label: 'Уведомления', icon: 'Bell' },
    { id: 'thresholds', label: 'Пороги', icon: 'Sliders' },
    { id: 'schedule', label: 'Расписание', icon: 'Clock' },
    { id: 'roles', label: 'Роли', icon: 'Users' }
  ];

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateNestedSetting = (parentKey, childKey, value) => {
    setSettings(prev => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: value
      }
    }));
  };

  const updateRoleSetting = (role, type, value) => {
    setSettings(prev => ({
      ...prev,
      roles: {
        ...prev.roles,
        [role]: {
          ...prev.roles[role],
          [type]: value
        }
      }
    }));
  };

  const handleSave = () => {
    console.log('Saving notification settings:', settings);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-300">
      <div className="bg-surface rounded-lg border border-border w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">
              Настройки уведомлений
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Конфигурация системы оповещений
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 text-sm font-medium transition-colors duration-200 relative ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              {/* Email Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-text-primary">Email уведомления</h3>
                    <p className="text-sm text-text-secondary">Настройка email оповещений</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                {settings.emailNotifications && (
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Email адрес
                    </label>
                    <input
                      type="email"
                      value={settings.emailAddress}
                      onChange={(e) => updateSetting('emailAddress', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                )}
              </div>

              {/* SMS Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-text-primary">SMS уведомления</h3>
                    <p className="text-sm text-text-secondary">Только критические уведомления</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.smsNotifications}
                      onChange={(e) => updateSetting('smsNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                {settings.smsNotifications && (
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Номер телефона
                    </label>
                    <input
                      type="tel"
                      value={settings.phoneNumber}
                      onChange={(e) => updateSetting('phoneNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                )}
              </div>

              {/* Push Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-text-primary">Push уведомления</h3>
                  <p className="text-sm text-text-secondary">Уведомления в браузере</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.pushNotifications}
                    onChange={(e) => updateSetting('pushNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'thresholds' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-4">Пороги срабатывания алертов</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Критический уровень (минуты без связи)
                    </label>
                    <input
                      type="number"
                      value={settings.criticalThreshold}
                      onChange={(e) => updateSetting('criticalThreshold', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      min="1"
                      max="120"
                    />
                    <p className="text-xs text-text-secondary mt-1">
                      Отправка критического уведомления при отсутствии связи более {settings.criticalThreshold} минут
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Предупреждение (минуты без связи)
                    </label>
                    <input
                      type="number"
                      value={settings.warningThreshold}
                      onChange={(e) => updateSetting('warningThreshold', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      min="1"
                      max="120"
                    />
                    <p className="text-xs text-text-secondary mt-1">
                      Отправка предупреждения при отсутствии связи более {settings.warningThreshold} минут
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-4">Расписание уведомлений</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Режим работы
                    </label>
                    <select
                      value={settings.schedule}
                      onChange={(e) => updateSetting('schedule', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="always">Круглосуточно</option>
                      <option value="business">Рабочие часы (9:00-18:00)</option>
                      <option value="custom">Настраиваемое</option>
                    </select>
                  </div>

                  {settings.schedule === 'custom' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Тихие часы - начало
                        </label>
                        <input
                          type="time"
                          value={settings.quietHours.start}
                          onChange={(e) => updateNestedSetting('quietHours', 'start', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Тихие часы - конец
                        </label>
                        <input
                          type="time"
                          value={settings.quietHours.end}
                          onChange={(e) => updateNestedSetting('quietHours', 'end', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'roles' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-4">Персонализированные подписки по ролям</h3>
                <div className="space-y-6">
                  {Object.entries(settings.roles).map(([role, permissions]) => (
                    <div key={role} className="border border-border rounded-lg p-4">
                      <h4 className="text-md font-medium text-text-primary mb-4 capitalize">
                        {role === 'admin' ? 'Администратор' : role === 'operator' ? 'Оператор' : 'Техник'}
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-text-secondary">Критические уведомления</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={permissions.critical}
                              onChange={(e) => updateRoleSetting(role, 'critical', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-text-secondary">Предупреждения</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={permissions.warning}
                              onChange={(e) => updateRoleSetting(role, 'warning', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-text-secondary">Информационные</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={permissions.info}
                              onChange={(e) => updateRoleSetting(role, 'info', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-4 p-6 border-t border-border bg-secondary-25">
          <button
            onClick={onClose}
            className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 border border-border rounded-lg transition-colors duration-200"
          >
            Отмена
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center space-x-2"
          >
            <Icon name="Save" size={16} />
            <span>Сохранить настройки</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;