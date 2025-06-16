// src/pages/error-handling-system-recovery/components/SystemHealth.jsx
import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const SystemHealth = ({ status }) => {
  const [metrics, setMetrics] = useState({
    cpu: 65,
    memory: 78,
    disk: 45,
    network: 92
  });

  const [services, setServices] = useState([
    { name: 'API Gateway', status: 'healthy', uptime: '99.9%', responseTime: '120ms' },
    { name: 'Payment Service', status: 'healthy', uptime: '99.8%', responseTime: '85ms' },
    { name: 'Inventory Service', status: 'warning', uptime: '98.5%', responseTime: '250ms' },
    { name: 'Notification Service', status: 'healthy', uptime: '99.7%', responseTime: '95ms' },
    { name: 'Database', status: 'healthy', uptime: '99.9%', responseTime: '15ms' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time metrics updates
      setMetrics(prev => ({
        cpu: Math.max(20, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(95, prev.memory + (Math.random() - 0.5) * 8)),
        disk: Math.max(20, Math.min(80, prev.disk + (Math.random() - 0.5) * 5)),
        network: Math.max(70, Math.min(100, prev.network + (Math.random() - 0.5) * 6))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getHealthColor = (value) => {
    if (value >= 90) return 'text-error';
    if (value >= 70) return 'text-warning';
    return 'text-success';
  };

  const getHealthBg = (value) => {
    if (value >= 90) return 'bg-error';
    if (value >= 70) return 'bg-warning';
    return 'bg-success';
  };

  const getServiceStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getServiceStatusBg = (status) => {
    switch (status) {
      case 'healthy': return 'bg-success-50 border-success-200';
      case 'warning': return 'bg-warning-50 border-warning-200';
      case 'error': return 'bg-error-50 border-error-200';
      default: return 'bg-secondary-50 border-secondary-200';
    }
  };

  const getServiceStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'AlertCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall System Health */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="font-medium text-text-primary mb-4 flex items-center">
          <Icon name="Activity" size={16} className="mr-2" />
          Состояние системы
        </h3>
        
        <div className={`p-4 rounded-lg border-2 mb-4 ${
          status.overallHealth === 'good' ? 'bg-success-50 border-success-200' :
          status.overallHealth === 'warning'? 'bg-warning-50 border-warning-200' : 'bg-error-50 border-error-200'
        }`}>
          <div className="flex items-center space-x-3">
            <Icon 
              name={status.overallHealth === 'good' ? 'CheckCircle' : 
                    status.overallHealth === 'warning' ? 'AlertTriangle' : 'AlertCircle'} 
              size={24} 
              className={status.overallHealth === 'good' ? 'text-success' :
                        status.overallHealth === 'warning' ? 'text-warning' : 'text-error'}
            />
            <div>
              <h4 className="font-medium text-text-primary">
                {status.overallHealth === 'good' ? 'Система работает стабильно' :
                 status.overallHealth === 'warning'? 'Требуется внимание' : 'Критические проблемы'}
              </h4>
              <p className="text-sm text-text-secondary">
                Активных ошибок: {status.activeErrors} | Критических: {status.criticalErrors}
              </p>
            </div>
          </div>
        </div>

        {/* System Metrics */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Cpu" size={14} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">CPU</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-secondary-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getHealthBg(metrics.cpu)}`}
                  style={{ width: `${metrics.cpu}%` }}
                ></div>
              </div>
              <span className={`text-sm font-medium ${getHealthColor(metrics.cpu)}`}>
                {Math.round(metrics.cpu)}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="MemoryStick" size={14} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">Память</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-secondary-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getHealthBg(metrics.memory)}`}
                  style={{ width: `${metrics.memory}%` }}
                ></div>
              </div>
              <span className={`text-sm font-medium ${getHealthColor(metrics.memory)}`}>
                {Math.round(metrics.memory)}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="HardDrive" size={14} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">Диск</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-secondary-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getHealthBg(metrics.disk)}`}
                  style={{ width: `${metrics.disk}%` }}
                ></div>
              </div>
              <span className={`text-sm font-medium ${getHealthColor(metrics.disk)}`}>
                {Math.round(metrics.disk)}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Wifi" size={14} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">Сеть</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-secondary-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getHealthBg(100 - metrics.network)}`}
                  style={{ width: `${metrics.network}%` }}
                ></div>
              </div>
              <span className={`text-sm font-medium ${getHealthColor(100 - metrics.network)}`}>
                {Math.round(metrics.network)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Services Status */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="font-medium text-text-primary mb-4 flex items-center">
          <Icon name="Server" size={16} className="mr-2" />
          Состояние сервисов
        </h3>
        
        <div className="space-y-3">
          {services.map((service, index) => (
            <div key={index} className={`p-3 rounded-lg border ${getServiceStatusBg(service.status)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={getServiceStatusIcon(service.status)} 
                    size={16} 
                    className={getServiceStatusColor(service.status)}
                  />
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">{service.name}</h4>
                    <div className="flex items-center space-x-4 text-xs text-text-secondary mt-1">
                      <span>Аптайм: {service.uptime}</span>
                      <span>Отклик: {service.responseTime}</span>
                    </div>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${service.status === 'healthy' ? 'bg-success animate-pulse' : 
                  service.status === 'warning' ? 'bg-warning' : 'bg-error'}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick System Info */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="font-medium text-text-primary mb-4 flex items-center">
          <Icon name="Info" size={16} className="mr-2" />
          Системная информация
        </h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary">Версия системы:</span>
            <span className="text-text-primary font-medium">v2.1.4</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Последнее обновление:</span>
            <span className="text-text-primary">15.12.2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Активных машин:</span>
            <span className="text-text-primary font-medium">47</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Время работы:</span>
            <span className="text-text-primary">15д 8ч 32м</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;