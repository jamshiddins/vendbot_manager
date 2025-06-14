import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const SystemStatus = () => {
  const [systemMetrics, setSystemMetrics] = useState({
    uptime: '99.8%',
    responseTime: '145ms',
    activeConnections: 231,
    dataProcessed: '2.4TB',
    lastBackup: '2 часа назад',
    systemLoad: 67
  });

  const [services, setServices] = useState([
    {
      id: 'payment-gateway',
      name: 'Платежный шлюз',
      status: 'active',
      uptime: '99.9%',
      lastCheck: '30 сек назад',
      responseTime: '120ms'
    },
    {
      id: 'inventory-sync',
      name: 'Синхронизация запасов',
      status: 'active',
      uptime: '99.7%',
      lastCheck: '1 мин назад',
      responseTime: '89ms'
    },
    {
      id: 'notification-service',
      name: 'Служба уведомлений',
      status: 'warning',
      uptime: '98.2%',
      lastCheck: '2 мин назад',
      responseTime: '234ms'
    },
    {
      id: 'analytics-engine',
      name: 'Аналитический движок',
      status: 'active',
      uptime: '99.5%',
      lastCheck: '45 сек назад',
      responseTime: '156ms'
    },
    {
      id: 'backup-service',
      name: 'Служба резервного копирования',
      status: 'maintenance',
      uptime: '100%',
      lastCheck: '5 мин назад',
      responseTime: 'N/A'
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        activeConnections: prev.activeConnections + Math.floor(Math.random() * 10 - 5),
        systemLoad: Math.max(30, Math.min(90, prev.systemLoad + Math.floor(Math.random() * 10 - 5)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      case 'maintenance': return 'text-secondary';
      default: return 'text-text-secondary';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'error': return 'bg-error';
      case 'maintenance': return 'bg-secondary';
      default: return 'bg-text-secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Активна';
      case 'warning': return 'Предупреждение';
      case 'error': return 'Ошибка';
      case 'maintenance': return 'Обслуживание';
      default: return 'Неизвестно';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      case 'maintenance': return 'Wrench';
      default: return 'HelpCircle';
    }
  };

  const getLoadColor = (load) => {
    if (load < 50) return 'bg-success';
    if (load < 80) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Состояние системы
          </h2>
          <p className="text-sm text-text-secondary">
            Мониторинг сервисов и производительности
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-success font-medium">Система работает</span>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-primary-50 rounded-lg">
          <Icon name="Activity" size={20} className="text-primary mx-auto mb-2" />
          <p className="text-sm text-text-secondary mb-1">Время работы</p>
          <p className="text-lg font-semibold text-primary">{systemMetrics.uptime}</p>
        </div>
        <div className="text-center p-3 bg-success-50 rounded-lg">
          <Icon name="Zap" size={20} className="text-success mx-auto mb-2" />
          <p className="text-sm text-text-secondary mb-1">Отклик</p>
          <p className="text-lg font-semibold text-success">{systemMetrics.responseTime}</p>
        </div>
        <div className="text-center p-3 bg-accent-50 rounded-lg col-span-2 lg:col-span-1">
          <Icon name="Users" size={20} className="text-accent mx-auto mb-2" />
          <p className="text-sm text-text-secondary mb-1">Подключения</p>
          <p className="text-lg font-semibold text-accent">{systemMetrics.activeConnections}</p>
        </div>
      </div>

      {/* System Load */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Загрузка системы</span>
          <span className="text-sm text-text-secondary">{systemMetrics.systemLoad}%</span>
        </div>
        <div className="w-full bg-secondary-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${getLoadColor(systemMetrics.systemLoad)}`}
            style={{ width: `${systemMetrics.systemLoad}%` }}
          ></div>
        </div>
      </div>

      {/* Services Status */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-text-primary mb-3">Состояние сервисов</h3>
        {services.map((service) => (
          <div key={service.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 ${getStatusBg(service.status)} rounded-full`}></div>
              <div>
                <h4 className="text-sm font-medium text-text-primary">{service.name}</h4>
                <p className="text-xs text-text-secondary">
                  Проверено: {service.lastCheck}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-1">
                <Icon 
                  name={getStatusIcon(service.status)} 
                  size={14} 
                  className={getStatusColor(service.status)} 
                />
                <span className={`text-xs font-medium ${getStatusColor(service.status)}`}>
                  {getStatusText(service.status)}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-text-muted">
                <span>Время работы: {service.uptime}</span>
                {service.responseTime !== 'N/A' && (
                  <span>Отклик: {service.responseTime}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-text-secondary">Обработано данных</p>
            <p className="font-medium text-text-primary">{systemMetrics.dataProcessed}</p>
          </div>
          <div>
            <p className="text-text-secondary">Последний бэкап</p>
            <p className="font-medium text-text-primary">{systemMetrics.lastBackup}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex items-center justify-between">
        <button className="text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-200">
          Подробная диагностика
        </button>
        <button className="px-3 py-2 bg-secondary-100 text-text-secondary rounded-lg hover:bg-secondary-200 transition-colors duration-200 text-sm font-medium">
          Настройки мониторинга
        </button>
      </div>
    </div>
  );
};

export default SystemStatus;