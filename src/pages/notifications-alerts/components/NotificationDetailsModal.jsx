// src/pages/notifications-alerts/components/NotificationDetailsModal.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const NotificationDetailsModal = ({ notification, onClose }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [assignee, setAssignee] = useState(notification.assignee || '');
  const [status, setStatus] = useState(notification.status);
  const [comment, setComment] = useState('');

  const tabs = [
    { id: 'details', label: 'Детали', icon: 'FileText' },
    { id: 'actions', label: 'Действия', icon: 'Zap' },
    { id: 'history', label: 'История', icon: 'Clock' }
  ];

  const teamMembers = [
    { id: 'petrov', name: 'Петров И.В.', role: 'Техник' },
    { id: 'sidorov', name: 'Сидоров А.П.', role: 'Инженер' },
    { id: 'ivanov', name: 'Иванов С.М.', role: 'Руководитель' }
  ];

  const statusOptions = [
    { value: 'new', label: 'Новое', color: 'primary' },
    { value: 'read', label: 'Прочитано', color: 'secondary' },
    { value: 'in-progress', label: 'В работе', color: 'warning' },
    { value: 'resolved', label: 'Решено', color: 'success' },
    { value: 'archived', label: 'Архив', color: 'muted' }
  ];

  const historyEvents = [
    {
      id: 1,
      type: 'created',
      description: 'Уведомление создано',
      user: 'Система',
      timestamp: new Date(notification.timestamp),
      icon: 'Plus'
    },
    {
      id: 2,
      type: 'assigned',
      description: 'Назначен ответственный: Петров И.В.',
      user: 'Иванов С.М.',
      timestamp: new Date(notification.timestamp.getTime() + 1000 * 60 * 15),
      icon: 'UserPlus'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-error bg-error-50 border-error-200';
      case 'medium': return 'text-warning bg-warning-50 border-warning-200';
      case 'low': return 'text-success bg-success-50 border-success-200';
      default: return 'text-text-secondary bg-secondary-50 border-border';
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

  const handleSave = () => {
    console.log('Saving notification updates:', {
      id: notification.id,
      assignee,
      status,
      comment
    });
    onClose();
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-300">
      <div className="bg-surface rounded-lg border border-border w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-lg ${getPriorityColor(notification.priority)}`}>
              <Icon name={getTypeIcon(notification.type)} size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">
                {notification.title}
              </h2>
              <p className="text-sm text-text-secondary">
                {notification.machine} • {formatTimestamp(notification.timestamp)}
              </p>
            </div>
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
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">Описание</h3>
                <p className="text-text-secondary leading-relaxed">
                  {notification.description}
                </p>
              </div>

              {/* Machine Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-secondary-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center space-x-2">
                    <Icon name="Zap" size={16} />
                    <span>Информация об автомате</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">ID автомата:</span>
                      <span className="text-text-primary font-medium">{notification.machine}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Расположение:</span>
                      <span className="text-text-primary font-medium">{notification.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Статус:</span>
                      <span className="text-error font-medium">Не отвечает</span>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center space-x-2">
                    <Icon name="Activity" size={16} />
                    <span>Техническая информация</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Последняя связь:</span>
                      <span className="text-text-primary font-medium">45 мин назад</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">IP адрес:</span>
                      <span className="text-text-primary font-medium">192.168.1.15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Версия ПО:</span>
                      <span className="text-text-primary font-medium">v2.1.2</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assignment and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Ответственный
                  </label>
                  <select
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Не назначен</option>
                    {teamMembers.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name} ({member.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Статус
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Комментарий
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Добавьте комментарий или заметки..."
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'actions' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary mb-4">Доступные действия</h3>
              {notification.actions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => console.log('Action:', action)}
                  className="w-full flex items-center justify-between p-4 bg-secondary-50 hover:bg-secondary-100 border border-border rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Play" size={18} className="text-primary" />
                    <span className="text-text-primary font-medium">{action}</span>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-text-secondary" />
                </button>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary mb-4">История изменений</h3>
              <div className="space-y-4">
                {historyEvents.map((event) => (
                  <div key={event.id} className="flex items-start space-x-4 p-4 bg-secondary-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <Icon name={event.icon} size={16} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-text-primary font-medium">{event.description}</p>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-text-secondary">
                        <span>{event.user}</span>
                        <span>•</span>
                        <span>{formatTimestamp(event.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                ))}
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
            <span>Сохранить</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetailsModal;