// src/pages/notifications-alerts/components/StatisticsPanel.jsx
import React from 'react';
import Icon from 'components/AppIcon';

const StatisticsPanel = ({ stats }) => {
  const statisticsData = [
    {
      id: 'total',
      title: 'Всего уведомлений',
      value: stats.total,
      icon: 'Bell',
      color: 'primary',
      description: 'За все время'
    },
    {
      id: 'critical',
      title: 'Критические',
      value: stats.critical,
      icon: 'AlertTriangle',
      color: 'error',
      description: 'Требуют внимания'
    },
    {
      id: 'unread',
      title: 'Непрочитанные',
      value: stats.unread,
      icon: 'Mail',
      color: 'warning',
      description: 'Новые уведомления'
    },
    {
      id: 'assigned',
      title: 'Назначенные',
      value: stats.assigned,
      icon: 'UserCheck',
      color: 'success',
      description: 'Есть ответственный'
    }
  ];

  const getIconBgColor = (color) => {
    switch (color) {
      case 'primary': return 'bg-primary-100 text-primary';
      case 'error': return 'bg-error-100 text-error';
      case 'warning': return 'bg-warning-100 text-warning';
      case 'success': return 'bg-success-100 text-success';
      default: return 'bg-secondary-100 text-secondary';
    }
  };

  const subscriptionSettings = [
    {
      id: 'email',
      title: 'Email уведомления',
      description: 'Получать на admin@vendbot.ru',
      enabled: true,
      icon: 'Mail'
    },
    {
      id: 'sms',
      title: 'SMS уведомления',
      description: 'Критические алерты',
      enabled: true,
      icon: 'MessageSquare'
    },
    {
      id: 'push',
      title: 'Push уведомления',
      description: 'В браузере',
      enabled: false,
      icon: 'Bell'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="BarChart3" size={20} className="text-text-primary" />
          <h2 className="text-lg font-semibold text-text-primary">Статистика</h2>
        </div>

        <div className="space-y-4">
          {statisticsData.map((stat) => (
            <div key={stat.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary-50 transition-colors duration-200">
              <div className={`w-10 h-10 rounded-lg ${getIconBgColor(stat.color)} flex items-center justify-center flex-shrink-0`}>
                <Icon name={stat.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-text-primary truncate">
                    {stat.title}
                  </h3>
                  <span className="text-lg font-bold text-text-primary">
                    {stat.value}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Settings */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="Settings" size={20} className="text-text-primary" />
          <h2 className="text-lg font-semibold text-text-primary">Подписки</h2>
        </div>

        <div className="space-y-4">
          {subscriptionSettings.map((setting) => (
            <div key={setting.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary-50 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <Icon name={setting.icon} size={18} className="text-text-secondary" />
                <div>
                  <h3 className="text-sm font-medium text-text-primary">
                    {setting.title}
                  </h3>
                  <p className="text-xs text-text-secondary">
                    {setting.description}
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={setting.enabled}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-2 text-sm text-primary hover:bg-primary-50 border border-primary rounded-lg transition-colors duration-200">
          <Icon name="Plus" size={16} />
          <span>Добавить подписку</span>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="Zap" size={20} className="text-text-primary" />
          <h2 className="text-lg font-semibold text-text-primary">Быстрые действия</h2>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-secondary-50 rounded-lg transition-colors duration-200">
            <Icon name="MailOpen" size={18} className="text-text-secondary" />
            <span className="text-sm text-text-primary">Отметить все как прочитанные</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-secondary-50 rounded-lg transition-colors duration-200">
            <Icon name="Archive" size={18} className="text-text-secondary" />
            <span className="text-sm text-text-primary">Архивировать старые</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-secondary-50 rounded-lg transition-colors duration-200">
            <Icon name="Download" size={18} className="text-text-secondary" />
            <span className="text-sm text-text-primary">Экспорт отчета</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;