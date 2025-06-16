// src/pages/error-handling-system-recovery/components/ErrorDetails.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ErrorDetails = ({ error, onRecoveryAction }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [isExpanded, setIsExpanded] = useState(false);

  const tabs = [
    { id: 'details', label: 'Подробности', icon: 'Info' },
    { id: 'stacktrace', label: 'Стек ошибки', icon: 'Code' },
    { id: 'impact', label: 'Влияние', icon: 'Target' },
    { id: 'resolution', label: 'Решение', icon: 'CheckCircle' }
  ];

  const mockImpactData = {
    affectedUsers: 15,
    affectedMachines: error?.affectedMachines?.length || 0,
    estimatedRevenueLoss: 2500,
    averageResolutionTime: '15 мин',
    similarIssuesCount: 3
  };

  const mockResolutionSteps = [
    {
      step: 1,
      title: 'Проверка сетевого подключения',
      description: 'Убедиться в стабильности интернет-соединения',
      status: 'completed',
      automated: true
    },
    {
      step: 2,
      title: 'Перезапуск сетевого модуля',
      description: 'Принудительная перезагрузка сетевых компонентов',
      status: 'in-progress',
      automated: true
    },
    {
      step: 3,
      title: 'Проверка конфигурации',
      description: 'Валидация настроек сетевого подключения',
      status: 'pending',
      automated: false
    },
    {
      step: 4,
      title: 'Уведомление технической поддержки',
      description: 'Автоматическое создание заявки при неудаче',
      status: 'pending',
      automated: true
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error';
      case 'warning': return 'text-warning';
      case 'info': return 'text-primary';
      default: return 'text-text-secondary';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-error-50 border-error-200';
      case 'warning': return 'bg-warning-50 border-warning-200';
      case 'info': return 'bg-primary-50 border-primary-200';
      default: return 'bg-secondary-50 border-secondary-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return { icon: 'CheckCircle', color: 'text-success' };
      case 'in-progress': return { icon: 'Clock', color: 'text-warning' };
      case 'pending': return { icon: 'Circle', color: 'text-text-muted' };
      default: return { icon: 'Circle', color: 'text-text-muted' };
    }
  };

  const handleRecoveryAction = (action) => {
    onRecoveryAction(action, error?.id);
  };

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Icon 
              name={error?.severity === 'critical' ? 'AlertCircle' : 
                    error?.severity === 'warning' ? 'AlertTriangle' : 'Info'} 
              size={24} 
              className={getSeverityColor(error?.severity)} 
            />
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs font-medium text-text-muted bg-secondary-100 px-2 py-1 rounded">
                  {error?.id}
                </span>
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  error?.severity === 'critical' ? 'bg-error text-white' :
                  error?.severity === 'warning'? 'bg-warning text-white' : 'bg-primary text-white'
                }`}>
                  {error?.severity === 'critical' ? 'Критическая' :
                   error?.severity === 'warning' ? 'Предупреждение' : 'Информация'}
                </span>
              </div>
              <h2 className="text-lg font-heading font-semibold text-text-primary mb-1">
                {error?.title}
              </h2>
              <p className="text-text-secondary">
                {error?.description}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
          >
            <Icon 
              name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
              size={20} 
              className="text-text-secondary" 
            />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-6">
          {/* Tabs */}
          <div className="border-b border-border mb-6">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 pb-3 border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-64">
            {activeTab === 'details' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary-50 rounded-lg">
                    <h4 className="text-sm font-medium text-text-primary mb-2">Время возникновения</h4>
                    <p className="text-sm text-text-secondary">
                      {error?.timestamp?.toLocaleString('ru-RU')}
                    </p>
                  </div>
                  <div className="p-4 bg-secondary-50 rounded-lg">
                    <h4 className="text-sm font-medium text-text-primary mb-2">Затронутые машины</h4>
                    <p className="text-sm text-text-secondary">
                      {error?.affectedMachines?.join(', ')}
                    </p>
                  </div>
                  <div className="p-4 bg-secondary-50 rounded-lg">
                    <h4 className="text-sm font-medium text-text-primary mb-2">Попытки восстановления</h4>
                    <p className="text-sm text-text-secondary">
                      {error?.recoveryAttempts} попыток
                    </p>
                  </div>
                  <div className="p-4 bg-secondary-50 rounded-lg">
                    <h4 className="text-sm font-medium text-text-primary mb-2">Авто-восстановление</h4>
                    <p className="text-sm text-text-secondary">
                      {error?.autoRecovery ? 'Включено' : 'Отключено'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stacktrace' && (
              <div className="space-y-4">
                <div className="p-4 bg-secondary-900 rounded-lg">
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center">
                    <Icon name="Terminal" size={16} className="mr-2" />
                    Трассировка стека
                  </h4>
                  <pre className="text-xs text-green-400 font-mono overflow-x-auto">
                    {error?.stackTrace || 'Stack trace not available'}
                  </pre>
                </div>
                
                <div className="p-4 bg-secondary-50 rounded-lg">
                  <h4 className="text-sm font-medium text-text-primary mb-2">Дополнительная информация</h4>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p>• Модуль: {error?.module}</p>
                    <p>• Версия ПО: 2.1.4</p>
                    <p>• Окружение: Production</p>
                    <p>• Пользователь: System</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'impact' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-error-50 rounded-lg border border-error-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Users" size={16} className="text-error" />
                      <h4 className="text-sm font-medium text-text-primary">Затронуто пользователей</h4>
                    </div>
                    <p className="text-2xl font-bold text-error">{mockImpactData.affectedUsers}</p>
                  </div>
                  
                  <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Monitor" size={16} className="text-warning" />
                      <h4 className="text-sm font-medium text-text-primary">Затронуто машин</h4>
                    </div>
                    <p className="text-2xl font-bold text-warning">{mockImpactData.affectedMachines}</p>
                  </div>
                  
                  <div className="p-4 bg-accent-50 rounded-lg border border-accent-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="DollarSign" size={16} className="text-accent" />
                      <h4 className="text-sm font-medium text-text-primary">Потери (₽)</h4>
                    </div>
                    <p className="text-2xl font-bold text-accent">{mockImpactData.estimatedRevenueLoss}</p>
                  </div>
                </div>

                <div className="p-4 bg-secondary-50 rounded-lg">
                  <h4 className="text-sm font-medium text-text-primary mb-3">Статистика решения</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-text-secondary">Среднее время решения:</span>
                      <span className="ml-2 font-medium text-text-primary">{mockImpactData.averageResolutionTime}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary">Похожие проблемы:</span>
                      <span className="ml-2 font-medium text-text-primary">{mockImpactData.similarIssuesCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'resolution' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-text-primary">План восстановления</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleRecoveryAction('auto-recovery')}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm"
                    >
                      Автоматическое восстановление
                    </button>
                    <button
                      onClick={() => handleRecoveryAction('manual-intervention')}
                      className="px-4 py-2 bg-secondary-100 text-text-primary rounded-lg hover:bg-secondary-200 transition-colors duration-200 text-sm"
                    >
                      Ручное вмешательство
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {mockResolutionSteps.map((step) => {
                    const statusInfo = getStatusIcon(step.status);
                    return (
                      <div key={step.step} className="flex items-start space-x-4 p-4 bg-secondary-50 rounded-lg">
                        <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full border-2 border-secondary-200">
                          <span className="text-sm font-medium text-text-primary">{step.step}</span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h5 className="font-medium text-text-primary">{step.title}</h5>
                            <Icon name={statusInfo.icon} size={16} className={statusInfo.color} />
                            {step.automated && (
                              <span className="text-xs bg-primary-100 text-primary px-2 py-0.5 rounded">
                                Авто
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-text-secondary">{step.description}</p>
                        </div>
                        
                        {step.status === 'in-progress' && (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xs text-text-secondary">Выполняется...</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorDetails;