// src/pages/notifications-alerts/components/NotificationsList.jsx
import React from 'react';
import Icon from 'components/AppIcon';

const NotificationsList = ({
  notifications,
  selectedNotifications,
  onNotificationSelect,
  onNotificationClick,
  onSelectAll,
  onDeselectAll
}) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'border-l-error bg-error-50';
      case 'medium': return 'border-l-warning bg-warning-50';
      case 'low': return 'border-l-success bg-success-50';
      default: return 'border-l-secondary bg-secondary-50';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'critical': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-primary text-white';
      case 'read': return 'bg-secondary-100 text-text-secondary';
      case 'archived': return 'bg-surface text-text-muted';
      default: return 'bg-secondary-100 text-text-secondary';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'new': return 'Новое';
      case 'read': return 'Прочитано';
      case 'archived': return 'Архив';
      default: return 'Неизвестно';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} мин назад`;
    } else if (hours < 24) {
      return `${hours} ч назад`;
    } else {
      return `${days} дн назад`;
    }
  };

  const allSelected = notifications.length > 0 && selectedNotifications.length === notifications.length;
  const someSelected = selectedNotifications.length > 0 && selectedNotifications.length < notifications.length;

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={allSelected}
              ref={input => {
                if (input) input.indeterminate = someSelected;
              }}
              onChange={allSelected ? onDeselectAll : onSelectAll}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
            />
            <h2 className="text-lg font-semibold text-text-primary">
              Уведомления ({notifications.length})
            </h2>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-colors duration-200">
            <Icon name="RefreshCw" size={16} />
          </button>
          <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-colors duration-200">
            <Icon name="SortDesc" size={16} />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Icon name="Bell" size={48} className="text-text-muted mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">Уведомления не найдены</h3>
            <p className="text-text-secondary text-center">
              Попробуйте изменить фильтры или проверьте позже
            </p>
          </div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 border-l-4 ${getPriorityColor(notification.priority)} hover:bg-secondary-25 transition-colors duration-200 cursor-pointer`}
              onClick={() => onNotificationClick(notification)}
            >
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={selectedNotifications.includes(notification.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    onNotificationSelect(notification.id);
                  }}
                  className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
                
                <div className="flex-shrink-0 mt-1">
                  <Icon name={getTypeIcon(notification.type)} size={20} className="text-text-secondary" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-text-primary truncate">
                      {notification.title}
                    </h3>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(notification.status)}`}>
                        {getStatusLabel(notification.status)}
                      </span>
                      <span className="text-xs text-text-muted">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                    {notification.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-text-muted">
                      <div className="flex items-center space-x-1">
                        <Icon name="Zap" size={14} />
                        <span>{notification.machine}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={14} />
                        <span className="truncate max-w-40">{notification.location}</span>
                      </div>
                      {notification.assignee && (
                        <div className="flex items-center space-x-1">
                          <Icon name="User" size={14} />
                          <span>{notification.assignee}</span>
                        </div>
                      )}
                    </div>
                    
                    {notification.actions.length > 0 && (
                      <div className="flex items-center space-x-2">
                        {notification.actions.slice(0, 2).map((action, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Quick action:', action);
                            }}
                            className="text-xs px-2 py-1 bg-primary text-white rounded hover:bg-primary-600 transition-colors duration-200"
                          >
                            {action}
                          </button>
                        ))}
                        {notification.actions.length > 2 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onNotificationClick(notification);
                            }}
                            className="text-xs px-2 py-1 bg-secondary-100 text-text-secondary rounded hover:bg-secondary-200 transition-colors duration-200"
                          >
                            +{notification.actions.length - 2}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsList;