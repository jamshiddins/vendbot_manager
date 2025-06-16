// src/pages/error-handling-system-recovery/components/RecoveryTools.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const RecoveryTools = ({ onRecoveryAction, selectedError }) => {
  const [isExecuting, setIsExecuting] = useState(null);
  const [lastAction, setLastAction] = useState(null);

  const quickActions = [
    {
      id: 'restart-services',
      label: 'Перезапустить сервисы',
      icon: 'RotateCcw',
      description: 'Перезапуск всех критических сервисов',
      severity: 'high',
      estimatedTime: '2-3 мин'
    },
    {
      id: 'clear-cache',
      label: 'Очистить кэш',
      icon: 'Trash2',
      description: 'Очистка кэша системы и базы данных',
      severity: 'medium',
      estimatedTime: '30 сек'
    },
    {
      id: 'reset-connections',
      label: 'Сбросить соединения',
      icon: 'Wifi',
      description: 'Переустановка сетевых соединений',
      severity: 'medium',
      estimatedTime: '1 мин'
    },
    {
      id: 'activate-failover',
      label: 'Активировать резерв',
      icon: 'Shield',
      description: 'Переключение на резервные системы',
      severity: 'critical',
      estimatedTime: '5-10 мин'
    }
  ];

  const emergencyActions = [
    {
      id: 'emergency-shutdown',
      label: 'Аварийное отключение',
      icon: 'Power',
      description: 'Безопасное отключение проблемных машин',
      severity: 'critical'
    },
    {
      id: 'rollback-deployment',
      label: 'Откат версии',
      icon: 'Undo',
      description: 'Откат к предыдущей стабильной версии',
      severity: 'critical'
    },
    {
      id: 'contact-support',
      label: 'Связаться с поддержкой',
      icon: 'Phone',
      description: 'Создать экстренную заявку в поддержку',
      severity: 'high'
    }
  ];

  const automatedProcedures = [
    {
      name: 'Диагностика сети',
      status: 'ready',
      lastRun: '10 мин назад',
      success: true
    },
    {
      name: 'Проверка целостности БД',
      status: 'running',
      lastRun: 'Выполняется...',
      success: null
    },
    {
      name: 'Мониторинг производительности',
      status: 'ready',
      lastRun: '5 мин назад',
      success: true
    },
    {
      name: 'Резервное копирование',
      status: 'scheduled',
      lastRun: 'Через 2 часа',
      success: null
    }
  ];

  const handleAction = async (actionId) => {
    setIsExecuting(actionId);
    setLastAction(null);
    
    // Simulate action execution
    setTimeout(() => {
      setIsExecuting(null);
      setLastAction({
        id: actionId,
        timestamp: new Date(),
        success: Math.random() > 0.2 // 80% success rate
      });
      
      onRecoveryAction(actionId, selectedError?.id);
    }, 2000 + Math.random() * 3000);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'border-error-300 hover:border-error-400 hover:bg-error-50';
      case 'high': return 'border-warning-300 hover:border-warning-400 hover:bg-warning-50';
      case 'medium': return 'border-primary-300 hover:border-primary-400 hover:bg-primary-50';
      default: return 'border-secondary-300 hover:border-secondary-400 hover:bg-secondary-50';
    }
  };

  const getSeverityTextColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-primary';
      default: return 'text-text-secondary';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'text-warning';
      case 'ready': return 'text-success';
      case 'scheduled': return 'text-primary';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running': return 'Clock';
      case 'ready': return 'CheckCircle';
      case 'scheduled': return 'Calendar';
      default: return 'Circle';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Recovery Actions */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="font-medium text-text-primary mb-4 flex items-center">
          <Icon name="Zap" size={16} className="mr-2" />
          Быстрое восстановление
        </h3>
        
        <div className="space-y-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleAction(action.id)}
              disabled={isExecuting === action.id}
              className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed ${
                getSeverityColor(action.severity)
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {isExecuting === action.id ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Icon name={action.icon} size={16} className={getSeverityTextColor(action.severity)} />
                  )}
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">{action.label}</h4>
                    <p className="text-xs text-text-secondary">{action.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-text-muted">{action.estimatedTime}</span>
                  {lastAction?.id === action.id && (
                    <div className={`text-xs mt-1 ${
                      lastAction.success ? 'text-success' : 'text-error'
                    }`}>
                      {lastAction.success ? 'Выполнено' : 'Ошибка'}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Actions */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="font-medium text-text-primary mb-4 flex items-center">
          <Icon name="AlertTriangle" size={16} className="mr-2 text-warning" />
          Экстренные действия
        </h3>
        
        <div className="space-y-3">
          {emergencyActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleAction(action.id)}
              disabled={isExecuting === action.id}
              className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed ${
                getSeverityColor(action.severity)
              }`}
            >
              <div className="flex items-center space-x-3">
                {isExecuting === action.id ? (
                  <div className="w-4 h-4 border-2 border-error border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Icon name={action.icon} size={16} className={getSeverityTextColor(action.severity)} />
                )}
                <div>
                  <h4 className="text-sm font-medium text-text-primary">{action.label}</h4>
                  <p className="text-xs text-text-secondary">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Automated Procedures */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="font-medium text-text-primary mb-4 flex items-center">
          <Icon name="Settings" size={16} className="mr-2" />
          Автоматические процедуры
        </h3>
        
        <div className="space-y-3">
          {automatedProcedures.map((procedure, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={getStatusIcon(procedure.status)} 
                  size={16} 
                  className={getStatusColor(procedure.status)}
                />
                <div>
                  <h4 className="text-sm font-medium text-text-primary">{procedure.name}</h4>
                  <p className="text-xs text-text-secondary">{procedure.lastRun}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {procedure.success === true && (
                  <Icon name="CheckCircle" size={14} className="text-success" />
                )}
                {procedure.success === false && (
                  <Icon name="XCircle" size={14} className="text-error" />
                )}
                {procedure.status === 'running' && (
                  <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm">
            <Icon name="Play" size={14} />
            <span>Запустить все процедуры</span>
          </button>
        </div>
      </div>

      {/* Recovery Progress */}
      {isExecuting && (
        <div className="bg-surface rounded-lg border border-border p-4">
          <h3 className="font-medium text-text-primary mb-4 flex items-center">
            <Icon name="Activity" size={16} className="mr-2" />
            Выполнение действия
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">
                  Выполняется восстановление...
                </p>
                <p className="text-xs text-text-secondary">
                  Пожалуйста, подождите
                </p>
              </div>
            </div>
            
            <div className="w-full bg-secondary-200 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecoveryTools;