// src/pages/error-handling-system-recovery/components/ErrorDashboard.jsx
import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const ErrorDashboard = ({ filters, onErrorSelect, selectedError }) => {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock error data
  const mockErrors = [
    {
      id: 'ERR-001',
      title: 'Потеря соединения с машиной VM-015',
      description: 'Машина не отвечает на запросы более 10 минут',
      severity: 'critical',
      module: 'network',
      status: 'active',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      affectedMachines: ['VM-015'],
      stackTrace: 'NetworkError: Connection timeout at 192.168.1.15:8080',
      autoRecovery: false,
      recoveryAttempts: 3
    },
    {
      id: 'ERR-002',
      title: 'Ошибка обработки платежа',
      description: 'Сбой в процессе обработки банковской карты',
      severity: 'warning',
      module: 'payment',
      status: 'active',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      affectedMachines: ['VM-008', 'VM-012'],
      stackTrace: 'PaymentError: Card validation failed',
      autoRecovery: true,
      recoveryAttempts: 1
    },
    {
      id: 'ERR-003',
      title: 'Низкий уровень запасов',
      description: 'Критически низкий уровень товаров в нескольких машинах',
      severity: 'info',
      module: 'inventory',
      status: 'resolved',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      affectedMachines: ['VM-003', 'VM-007', 'VM-011'],
      stackTrace: 'InventoryWarning: Stock level below threshold',
      autoRecovery: false,
      recoveryAttempts: 0
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors(mockErrors);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'info': return 'Info';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-error';
      case 'resolving': return 'text-warning';
      case 'resolved': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const filteredErrors = errors.filter(error => {
    if (filters.severity !== 'all' && error.severity !== filters.severity) return false;
    if (filters.module !== 'all' && error.module !== filters.module) return false;
    if (filters.status !== 'all' && error.status !== filters.status) return false;
    return true;
  });

  if (isLoading) {
    return (
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-secondary-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-secondary-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-heading font-semibold text-text-primary mb-2">
          Журнал ошибок
        </h2>
        <p className="text-sm text-text-secondary">
          Найдено {filteredErrors.length} ошибок
        </p>
      </div>

      <div className="p-6">
        {filteredErrors.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">
              Ошибки не найдены
            </h3>
            <p className="text-text-secondary">
              В системе нет ошибок, соответствующих выбранным фильтрам
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredErrors.map((error) => (
              <div
                key={error.id}
                onClick={() => onErrorSelect(error)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedError?.id === error.id 
                    ? 'border-primary bg-primary-50' 
                    : `border-border ${getSeverityBg(error.severity)} hover:border-primary`
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <Icon 
                      name={getSeverityIcon(error.severity)} 
                      size={20} 
                      className={getSeverityColor(error.severity)} 
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium text-text-muted bg-secondary-100 px-2 py-1 rounded">
                          {error.id}
                        </span>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                          error.severity === 'critical' ? 'bg-error text-white' :
                          error.severity === 'warning'? 'bg-warning text-white' : 'bg-primary text-white'
                        }`}>
                          {error.severity === 'critical' ? 'Критическая' :
                           error.severity === 'warning' ? 'Предупреждение' : 'Информация'}
                        </span>
                        <span className={`text-xs font-medium ${getStatusColor(error.status)}`}>
                          {error.status === 'active' ? 'Активна' :
                           error.status === 'resolving' ? 'Устраняется' : 'Решена'}
                        </span>
                      </div>
                      <h3 className="font-medium text-text-primary mb-1">
                        {error.title}
                      </h3>
                      <p className="text-sm text-text-secondary mb-2">
                        {error.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-text-muted">
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>{error.timestamp.toLocaleString('ru-RU')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Monitor" size={12} />
                          <span>{error.affectedMachines.join(', ')}</span>
                        </div>
                        {error.recoveryAttempts > 0 && (
                          <div className="flex items-center space-x-1">
                            <Icon name="RotateCcw" size={12} />
                            <span>Попыток: {error.recoveryAttempts}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {error.autoRecovery && (
                      <span className="text-xs bg-success-100 text-success px-2 py-1 rounded">
                        Авто-восстановление
                      </span>
                    )}
                    <Icon name="ChevronRight" size={16} className="text-text-muted" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorDashboard;