// src/pages/operator-mobile-dashboard/components/QuickActions.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const QuickActions = ({ onEmergencyCall, onSupervisorContact, currentAssignment }) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportType, setReportType] = useState('');
  const [reportDescription, setReportDescription] = useState('');

  const actionItems = [
    {
      id: 'emergency',
      title: 'Экстренный вызов',
      description: 'Связаться со службой экстренного реагирования',
      icon: 'Phone',
      color: 'error',
      onClick: onEmergencyCall
    },
    {
      id: 'supervisor',
      title: 'Связаться с супервизором',
      description: 'Получить помощь или консультацию',
      icon: 'Users',
      color: 'primary',
      onClick: onSupervisorContact
    },
    {
      id: 'report_issue',
      title: 'Сообщить о проблеме',
      description: 'Зафиксировать неисправность или замечание',
      icon: 'AlertTriangle',
      color: 'warning',
      onClick: () => setIsReportModalOpen(true)
    },
    {
      id: 'request_parts',
      title: 'Запросить запчасти',
      description: 'Заказать необходимые компоненты',
      icon: 'Package',
      color: 'accent',
      onClick: () => alert('Функция в разработке')
    },
    {
      id: 'update_status',
      title: 'Обновить статус',
      description: 'Изменить состояние задания',
      icon: 'RefreshCw',
      color: 'success',
      onClick: () => alert('Функция в разработке')
    },
    {
      id: 'take_break',
      title: 'Оформить перерыв',
      description: 'Зафиксировать время отдыха',
      icon: 'Coffee',
      color: 'secondary',
      onClick: () => alert('Перерыв оформлен')
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'error':
        return {
          bg: 'bg-error-100',
          text: 'text-error',
          button: 'bg-error hover:bg-error-600'
        };
      case 'primary':
        return {
          bg: 'bg-primary-100',
          text: 'text-primary',
          button: 'bg-primary hover:bg-primary-700'
        };
      case 'warning':
        return {
          bg: 'bg-warning-100',
          text: 'text-warning',
          button: 'bg-warning hover:bg-warning-600'
        };
      case 'accent':
        return {
          bg: 'bg-accent-100',
          text: 'text-accent',
          button: 'bg-accent hover:bg-accent-600'
        };
      case 'success':
        return {
          bg: 'bg-success-100',
          text: 'text-success',
          button: 'bg-success hover:bg-success-600'
        };
      default:
        return {
          bg: 'bg-secondary-100',
          text: 'text-secondary',
          button: 'bg-secondary hover:bg-secondary-600'
        };
    }
  };

  const handleReportSubmit = () => {
    if (!reportType || !reportDescription.trim()) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    
    // Simulate report submission
    alert(`Отчет отправлен:\nТип: ${reportType}\nОписание: ${reportDescription}`);
    setIsReportModalOpen(false);
    setReportType('');
    setReportDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Current Assignment Info */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">Текущее задание</span>
        </div>
        <p className="text-sm text-text-primary">
          <span className="font-medium">{currentAssignment?.machineId}</span> - {currentAssignment?.location}
        </p>
        <p className="text-xs text-text-secondary mt-1">
          {currentAssignment?.serviceType}
        </p>
      </div>
      
      {/* Quick Actions Grid */}
      <div className="space-y-3">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Быстрые действия
        </h3>
        
        <div className="grid grid-cols-1 gap-3">
          {actionItems.map((action) => {
            const colors = getColorClasses(action.color);
            
            return (
              <div
                key={action.id}
                className="bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                    <Icon name={action.icon} size={20} className={colors.text} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-text-primary mb-1">
                      {action.title}
                    </h4>
                    <p className="text-xs text-text-secondary line-clamp-2">
                      {action.description}
                    </p>
                  </div>
                  
                  <button
                    onClick={action.onClick}
                    className={`px-4 py-2 ${colors.button} text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap`}
                  >
                    Выполнить
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Emergency Contact Info */}
      <div className="bg-error-50 border border-error-200 rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-2">
          <Icon name="AlertCircle" size={16} className="text-error" />
          <span className="text-sm font-medium text-error">Экстренные контакты</span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Диспетчерская:</span>
            <a href="tel:+78001234567" className="text-error font-medium">8 (800) 123-45-67</a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Техподдержка:</span>
            <a href="tel:+78001234568" className="text-error font-medium">8 (800) 123-45-68</a>
          </div>
        </div>
      </div>
      
      {/* Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  Сообщить о проблеме
                </h3>
                <button
                  onClick={() => setIsReportModalOpen(false)}
                  className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
                >
                  <Icon name="X" size={20} className="text-text-secondary" />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Тип проблемы
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Выберите тип проблемы</option>
                  <option value="technical">Техническая неисправность</option>
                  <option value="supply">Проблема с запасами</option>
                  <option value="access">Проблема доступа</option>
                  <option value="safety">Вопрос безопасности</option>
                  <option value="other">Другое</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Описание проблемы
                </label>
                <textarea
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  rows={4}
                  placeholder="Опишите проблему подробно..."
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>
            </div>
            
            <div className="p-4 border-t border-border flex space-x-3">
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="flex-1 py-2 border border-border rounded-lg text-text-primary hover:bg-secondary-100 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleReportSubmit}
                className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Отправить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;