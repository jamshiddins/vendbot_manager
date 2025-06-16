// src/pages/performance-monitoring-optimization/components/SystemHealthIndicators.jsx
import React from 'react';
import Icon from 'components/AppIcon';

const SystemHealthIndicators = ({ data }) => {
  const healthMetrics = [
    {
      name: 'Общее состояние',
      value: data?.overallScore || 87,
      icon: 'Activity',
      description: 'Общая оценка работоспособности системы',
      thresholds: { good: 80, warning: 60 }
    },
    {
      name: 'Производительность',
      value: Math.min(100, 100 - (data?.responseTime || 0) / 3),
      icon: 'Zap',
      description: 'Скорость обработки запросов',
      thresholds: { good: 75, warning: 50 }
    },
    {
      name: 'Стабильность',
      value: 92,
      icon: 'ShieldCheck',
      description: 'Отсутствие сбоев и ошибок',
      thresholds: { good: 90, warning: 70 }
    },
    {
      name: 'Использование ресурсов',
      value: 100 - ((data?.memoryUsage || 0) * 0.6 + (data?.cpuUtilization || 0) * 0.4),
      icon: 'BarChart',
      description: 'Эффективность использования CPU и памяти',
      thresholds: { good: 70, warning: 40 }
    }
  ];

  const getStatusColor = (value, thresholds) => {
    if (value >= thresholds.good) return 'text-success';
    if (value >= thresholds.warning) return 'text-warning';
    return 'text-error';
  };

  const getStatusIcon = (value, thresholds) => {
    if (value >= thresholds.good) return 'CheckCircle';
    if (value >= thresholds.warning) return 'AlertTriangle';
    return 'AlertCircle';
  };

  const getStatusText = (value, thresholds) => {
    if (value >= thresholds.good) return 'Отлично';
    if (value >= thresholds.warning) return 'Внимание';
    return 'Критично';
  };

  const recentEvents = [
    {
      id: 1,
      type: 'warning',
      message: 'Повышенное время отклика API',
      time: '12 мин назад',
      icon: 'Clock'
    },
    {
      id: 2,
      type: 'success',
      message: 'Кэш успешно оптимизирован',
      time: '45 мин назад',
      icon: 'Zap'
    },
    {
      id: 3,
      type: 'info',
      message: 'Регулярная проверка состояния',
      time: '2 часа назад',
      icon: 'RefreshCw'
    }
  ];

  const getEventTypeStyle = (type) => {
    switch (type) {
      case 'success': return 'bg-success-50 text-success border-success-200';
      case 'warning': return 'bg-warning-50 text-warning border-warning-200';
      case 'error': return 'bg-error-50 text-error border-error-200';
      case 'info': return 'bg-primary-50 text-primary border-primary-200';
      default: return 'bg-secondary-50 text-text-secondary border-secondary-200';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <h3 className="font-medium text-text-primary mb-4 flex items-center">
        <Icon name="Activity" size={16} className="mr-2" />
        Индикаторы состояния системы
      </h3>
      
      <div className="space-y-4">
        {/* Health metrics */}
        {healthMetrics.map((metric, index) => {
          const statusColor = getStatusColor(metric.value, metric.thresholds);
          const statusIcon = getStatusIcon(metric.value, metric.thresholds);
          const statusText = getStatusText(metric.value, metric.thresholds);
          
          return (
            <div key={index} className="group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <Icon name={metric.icon} size={14} className="text-text-secondary" />
                  <span className="text-sm text-text-primary">{metric.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${statusColor}`}>
                    {Math.round(metric.value)}%
                  </span>
                  <Icon name={statusIcon} size={14} className={statusColor} />
                </div>
              </div>
              
              <div className="w-full bg-secondary-200 rounded-full h-2 mb-1 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${statusColor === 'text-success' ? 'bg-success' : statusColor === 'text-warning' ? 'bg-warning' : 'bg-error'}`}
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted group-hover:text-text-secondary transition-colors duration-200">
                  {metric.description}
                </span>
                <span className={`text-xs ${statusColor}`}>
                  {statusText}
                </span>
              </div>
            </div>
          );
        })}
        
        {/* Recent events */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
            <Icon name="Bell" size={14} className="mr-1.5" />
            Недавние события
          </h4>
          
          <div className="space-y-2">
            {recentEvents.map(event => (
              <div
                key={event.id}
                className={`px-3 py-2 rounded-lg border flex items-center space-x-3 ${getEventTypeStyle(event.type)}`}
              >
                <Icon name={event.icon} size={14} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{event.message}</p>
                  <p className="text-xs opacity-70">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Diagnostic button */}
        <button className="w-full flex items-center justify-center space-x-2 bg-secondary-100 hover:bg-secondary-200 text-text-primary py-2 rounded-lg transition-colors duration-200 text-sm">
          <Icon name="Stethoscope" size={14} />
          <span>Запустить полную диагностику</span>
        </button>
      </div>
    </div>
  );
};

export default SystemHealthIndicators;