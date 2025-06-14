import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const RecentAlerts = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const alerts = [
    {
      id: 1,
      type: 'error',
      title: 'Машина VM-001 не отвечает',
      message: 'Потеря связи более 5 минут',
      location: 'ТЦ Мега Белая Дача',
      time: '2 мин назад',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      priority: 'high',
      unread: true
    },
    {
      id: 2,
      type: 'warning',
      title: 'Низкий уровень запасов',
      message: 'Кока-Кола заканчивается (осталось 3 шт.)',
      location: 'Офисный центр Сити',
      time: '15 мин назад',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      priority: 'medium',
      unread: true
    },
    {
      id: 3,
      type: 'success',
      title: 'Обслуживание завершено',
      message: 'Машина VM-008 готова к работе',
      location: 'Бизнес-центр Альфа',
      time: '1 час назад',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      priority: 'low',
      unread: false
    },
    {
      id: 4,
      type: 'warning',
      title: 'Превышение температуры',
      message: 'Температура +8°C в холодильной секции',
      location: 'ТЦ Европейский',
      time: '2 часа назад',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      priority: 'medium',
      unread: false
    },
    {
      id: 5,
      type: 'info',
      title: 'Плановое обновление',
      message: 'Обновление ПО запланировано на 02:00',
      location: 'Все машины',
      time: '3 часа назад',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      priority: 'low',
      unread: false
    },
    {
      id: 6,
      type: 'error',
      title: 'Ошибка купюроприемника',
      message: 'Купюроприемник не принимает банкноты',
      location: 'Аэропорт Домодедово',
      time: '4 часа назад',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      priority: 'high',
      unread: false
    }
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'success': return 'CheckCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'success': return 'text-success';
      case 'info': return 'text-primary';
      default: return 'text-text-secondary';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <span className="px-2 py-1 text-xs font-medium bg-error-100 text-error rounded-full">Высокий</span>;
      case 'medium':
        return <span className="px-2 py-1 text-xs font-medium bg-warning-100 text-warning rounded-full">Средний</span>;
      case 'low':
        return <span className="px-2 py-1 text-xs font-medium bg-secondary-100 text-text-secondary rounded-full">Низкий</span>;
      default:
        return null;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unread') return alert.unread;
    return alert.type === filter;
  });

  const unreadCount = alerts.filter(alert => alert.unread).length;

  const handleViewAll = () => {
    navigate('/maintenance-service-management');
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Последние уведомления
          </h2>
          {unreadCount > 0 && (
            <p className="text-sm text-text-secondary">
              {unreadCount} непрочитанных
            </p>
          )}
        </div>
        <button
          onClick={handleViewAll}
          className="text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-200"
        >
          Показать все
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 mb-4 bg-secondary-50 rounded-lg p-1">
        {[
          { key: 'all', label: 'Все' },
          { key: 'unread', label: 'Новые' },
          { key: 'error', label: 'Ошибки' },
          { key: 'warning', label: 'Предупреждения' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors duration-200 ${
              filter === tab.key
                ? 'bg-surface text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bell" size={32} className="text-text-muted mx-auto mb-2" />
            <p className="text-text-secondary">Нет уведомлений для отображения</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border transition-colors duration-200 hover:bg-secondary-50 cursor-pointer ${
                alert.unread
                  ? 'bg-primary-50 border-primary-200' :'bg-surface border-border'
              }`}
            >
              <div className="flex items-start space-x-3">
                <Icon
                  name={getAlertIcon(alert.type)}
                  size={18}
                  className={`mt-1 ${getAlertColor(alert.type)}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-text-primary mb-1">
                        {alert.title}
                      </h4>
                      <p className="text-sm text-text-secondary mb-2">
                        {alert.message}
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Icon name="MapPin" size={12} className="text-text-muted" />
                          <span className="text-xs text-text-muted">{alert.location}</span>
                        </div>
                        <span className="text-xs text-text-muted">{alert.time}</span>
                        {getPriorityBadge(alert.priority)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {alert.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                      <Icon name="ChevronRight" size={14} className="text-text-muted" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-error">{alerts.filter(a => a.type === 'error').length}</p>
            <p className="text-xs text-text-secondary">Ошибки</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-warning">{alerts.filter(a => a.type === 'warning').length}</p>
            <p className="text-xs text-text-secondary">Предупреждения</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-success">{alerts.filter(a => a.type === 'success').length}</p>
            <p className="text-xs text-text-secondary">Успешные</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentAlerts;