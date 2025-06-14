import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const NotificationCenter = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'error',
      title: 'Критическая ошибка машины VM-001',
      message: 'Потеря связи более 5 минут. Требуется немедленная проверка.',
      time: '2 мин назад',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      unread: true,
      priority: 'high',
      location: 'ТЦ Мега, 1 этаж'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Низкий уровень запасов',
      message: 'Кока-Кола в машине VM-015 заканчивается (осталось 3 единицы).',
      time: '15 мин назад',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      unread: true,
      priority: 'medium',
      location: 'Офисный центр Сити'
    },
    {
      id: 3,
      type: 'success',
      title: 'Обслуживание завершено',
      message: 'Машина VM-008 успешно пополнена и готова к работе.',
      time: '1 час назад',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      unread: false,
      priority: 'low',
      location: 'Бизнес-центр Альфа'
    },
    {
      id: 4,
      type: 'info',
      title: 'Плановое обновление ПО',
      message: 'Обновление системы запланировано на 02:00. Ожидаемое время: 30 минут.',
      time: '2 часа назад',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unread: false,
      priority: 'low',
      location: 'Все машины'
    },
    {
      id: 5,
      type: 'warning',
      title: 'Превышение температуры',
      message: 'Температура в машине VM-022 превышает норму (+8°C).',
      time: '3 часа назад',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      unread: false,
      priority: 'medium',
      location: 'Торговый центр Европа'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('time');

  const unreadCount = notifications.filter(n => n.unread).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'error': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'success': return 'CheckCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
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

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return notification.unread;
    return notification.type === filter;
  });

  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    if (sortBy === 'time') {
      return b.timestamp - a.timestamp;
    }
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, unread: false }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  const handleNotificationClick = (notification) => {
    if (notification.unread) {
      markAsRead(notification.id);
    }
    // Navigate to relevant page based on notification type
    // This would typically use React Router
    console.log('Navigate to:', notification);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-300 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Bell" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-heading font-semibold text-text-primary">
                Центр уведомлений
              </h2>
              {unreadCount > 0 && (
                <p className="text-sm text-text-secondary">
                  {unreadCount} непрочитанных уведомлений
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
            aria-label="Close notifications"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Filters and Actions */}
        <div className="p-4 border-b border-border bg-secondary-50">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">Все уведомления</option>
                <option value="unread">Непрочитанные</option>
                <option value="error">Ошибки</option>
                <option value="warning">Предупреждения</option>
                <option value="success">Успешные</option>
                <option value="info">Информационные</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="time">По времени</option>
                <option value="priority">По приоритету</option>
              </select>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-3 py-2 text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-200"
              >
                Отметить все как прочитанные
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {sortedNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Icon name="Bell" size={48} className="text-text-muted mb-4" />
              <p className="text-text-secondary text-center">
                {filter === 'all' ? 'Нет уведомлений' : 'Нет уведомлений для выбранного фильтра'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {sortedNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-secondary-50 cursor-pointer transition-colors duration-200 ${
                    notification.unread ? 'bg-primary-50 border-l-4 border-l-primary' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start space-x-3">
                    <Icon
                      name={getNotificationIcon(notification.type)}
                      size={20}
                      className={`mt-1 ${getNotificationColor(notification.type)}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-text-primary">
                            {notification.title}
                          </p>
                          <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <p className="text-xs text-text-muted">
                              {notification.time}
                            </p>
                            <p className="text-xs text-text-muted">
                              📍 {notification.location}
                            </p>
                            {getPriorityBadge(notification.priority)}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {notification.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="p-1 rounded hover:bg-secondary-200 transition-colors duration-200"
                            aria-label="Delete notification"
                          >
                            <Icon name="Trash2" size={14} className="text-text-muted" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-secondary-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-secondary">
              Показано {sortedNotifications.length} из {notifications.length} уведомлений
            </p>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm font-medium">
              Настройки уведомлений
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;