// src/pages/operator-mobile-dashboard/components/NotificationPanel.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const NotificationPanel = ({ notifications, onMarkAsRead }) => {
  const [filter, setFilter] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'priority': return 'AlertCircle';
      case 'update': return 'Info';
      case 'warning': return 'AlertTriangle';
      case 'success': return 'CheckCircle';
      case 'message': return 'MessageSquare';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'priority': return 'text-error';
      case 'update': return 'text-primary';
      case 'warning': return 'text-warning';
      case 'success': return 'text-success';
      case 'message': return 'text-accent';
      default: return 'text-text-secondary';
    }
  };

  const getNotificationBg = (type, unread) => {
    if (!unread) return 'bg-surface';
    
    switch (type) {
      case 'priority': return 'bg-error-50';
      case 'update': return 'bg-primary-50';
      case 'warning': return 'bg-warning-50';
      case 'success': return 'bg-success-50';
      case 'message': return 'bg-accent-50';
      default: return 'bg-secondary-50';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'priority': return 'Приоритет';
      case 'update': return 'Обновление';
      case 'warning': return 'Предупреждение';
      case 'success': return 'Успех';
      case 'message': return 'Сообщение';
      default: return 'Уведомление';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return notification.unread;
    if (filter === 'priority') return notification.type === 'priority';
    return true;
  });

  const unreadCount = notifications.filter(n => n.unread).length;
  const priorityCount = notifications.filter(n => n.type === 'priority').length;

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    if (notification.unread) {
      onMarkAsRead(notification.id);
    }
  };

  const markAllAsRead = () => {
    notifications.forEach(notification => {
      if (notification.unread) {
        onMarkAsRead(notification.id);
      }
    });
  };

  if (selectedNotification) {
    return (
      <div className="h-full flex flex-col">
        {/* Notification Detail Header */}
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setSelectedNotification(null)}
              className="p-2 hover:bg-secondary-100 rounded-lg transition-colors -ml-2"
            >
              <Icon name="ArrowLeft" size={20} className="text-text-primary" />
            </button>
            
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNotificationColor(selectedNotification.type)} bg-opacity-20`}>
                {getTypeLabel(selectedNotification.type)}
              </span>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon 
              name={getNotificationIcon(selectedNotification.type)} 
              size={20} 
              className={getNotificationColor(selectedNotification.type)}
            />
            <div className="flex-1">
              <h2 className="text-lg font-heading font-semibold text-text-primary">
                {selectedNotification.title}
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                {selectedNotification.time}
              </p>
            </div>
          </div>
        </div>
        
        {/* Notification Detail Content */}
        <div className="flex-1 p-4">
          <p className="text-text-primary leading-relaxed">
            {selectedNotification.message}
          </p>
          
          {/* Mock additional details */}
          <div className="mt-6 space-y-4">
            <div className="bg-secondary-50 rounded-lg p-3">
              <h4 className="text-sm font-medium text-text-primary mb-2">Детали</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Время получения:</span>
                  <span className="text-text-primary">{selectedNotification.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Тип:</span>
                  <span className="text-text-primary">{getTypeLabel(selectedNotification.type)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Статус:</span>
                  <span className={selectedNotification.unread ? 'text-warning' : 'text-success'}>
                    {selectedNotification.unread ? 'Непрочитано' : 'Прочитано'}
                  </span>
                </div>
              </div>
            </div>
            
            {selectedNotification.type === 'priority' && (
              <div className="bg-error-50 border border-error-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="AlertTriangle" size={16} className="text-error" />
                  <span className="text-sm font-medium text-error">Требуется действие</span>
                </div>
                <p className="text-sm text-text-secondary">
                  Это уведомление требует немедленного внимания. Свяжитесь с диспетчером для получения инструкций.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="border-t border-border p-4">
          <div className="grid grid-cols-2 gap-3">
            <button className="py-2 border border-border rounded-lg text-text-primary hover:bg-secondary-100 transition-colors">
              Архивировать
            </button>
            <button className="py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors">
              Ответить
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Уведомления
          </h2>
          
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-primary hover:text-primary-700 font-medium"
            >
              Отметить все как прочитанные
            </button>
          )}
        </div>
        
        {/* Filters */}
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'all' ?'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
            }`}
          >
            Все ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'unread' ?'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
            }`}
          >
            Непрочитанные ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('priority')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'priority' ?'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
            }`}
          >
            Приоритет ({priorityCount})
          </button>
        </div>
      </div>
      
      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <Icon name="BellOff" size={48} className="text-text-muted mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">
              Нет уведомлений
            </h3>
            <p className="text-text-secondary text-center">
              {filter === 'unread' ?'Все уведомления прочитаны'
                : filter === 'priority' ?'Нет приоритетных уведомлений' :'У вас пока нет уведомлений'
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`p-4 cursor-pointer hover:bg-secondary-50 transition-colors ${
                  getNotificationBg(notification.type, notification.unread)
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={getNotificationIcon(notification.type)} 
                    size={18} 
                    className={`mt-1 ${getNotificationColor(notification.type)}`}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`text-sm font-medium text-text-primary truncate ${
                        notification.unread ? 'font-semibold' : ''
                      }`}>
                        {notification.title}
                      </h4>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    
                    <p className="text-sm text-text-secondary line-clamp-2 mb-2">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-muted">
                        {notification.time}
                      </span>
                      
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        getNotificationColor(notification.type)
                      } bg-opacity-20`}>
                        {getTypeLabel(notification.type)}
                      </span>
                    </div>
                  </div>
                  
                  <Icon name="ChevronRight" size={16} className="text-text-muted flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;