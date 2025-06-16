// src/pages/performance-monitoring-optimization/components/PerformanceDashboard.jsx
import React from 'react';
import Icon from 'components/AppIcon';

const PerformanceDashboard = ({ data, realTimeUpdates }) => {
  const metrics = [
    {
      key: 'responseTime',
      label: 'Время отклика',
      value: data.responseTime,
      unit: 'мс',
      icon: 'Clock',
      threshold: { good: 100, warning: 200 },
      trend: 'stable'
    },
    {
      key: 'memoryUsage',
      label: 'Использование памяти',
      value: data.memoryUsage,
      unit: '%',
      icon: 'MemoryStick',
      threshold: { good: 70, warning: 85 },
      trend: 'up'
    },
    {
      key: 'cpuUtilization',
      label: 'Загрузка CPU',
      value: data.cpuUtilization,
      unit: '%',
      icon: 'Cpu',
      threshold: { good: 60, warning: 80 },
      trend: 'down'
    },
    {
      key: 'databaseQueries',
      label: 'Запросы к БД',
      value: data.databaseQueries,
      unit: '/сек',
      icon: 'Database',
      threshold: { good: 100, warning: 150 },
      trend: 'stable'
    }
  ];

  const getMetricStatus = (value, threshold) => {
    if (value <= threshold.good) return 'good';
    if (value <= threshold.warning) return 'warning';
    return 'critical';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'good': return 'bg-success-50 border-success-200';
      case 'warning': return 'bg-warning-50 border-warning-200';
      case 'critical': return 'bg-error-50 border-error-200';
      default: return 'bg-secondary-50 border-secondary-200';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-warning';
      case 'down': return 'text-success';
      case 'stable': return 'text-text-muted';
      default: return 'text-text-muted';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const status = getMetricStatus(metric.value, metric.threshold);
        
        return (
          <div
            key={metric.key}
            className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
              getStatusBg(status)
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon name={metric.icon} size={20} className={getStatusColor(status)} />
                <h3 className="text-sm font-medium text-text-primary">
                  {metric.label}
                </h3>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon 
                  name={getTrendIcon(metric.trend)} 
                  size={14} 
                  className={getTrendColor(metric.trend)}
                />
                {realTimeUpdates && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
            
            <div className="flex items-baseline space-x-1 mb-2">
              <span className="text-2xl font-bold text-text-primary">
                {typeof metric.value === 'number' ? Math.round(metric.value) : metric.value}
              </span>
              <span className="text-sm text-text-secondary">
                {metric.unit}
              </span>
            </div>
            
            {/* Performance Bar */}
            <div className="w-full bg-secondary-200 rounded-full h-2 mb-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  status === 'good' ? 'bg-success' :
                  status === 'warning' ? 'bg-warning' : 'bg-error'
                }`}
                style={{ 
                  width: `${Math.min(100, (metric.value / (metric.threshold.warning * 1.2)) * 100)}%` 
                }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className={`font-medium ${
                status === 'good' ? 'text-success' :
                status === 'warning' ? 'text-warning' : 'text-error'
              }`}>
                {status === 'good' ? 'Отлично' :
                 status === 'warning' ? 'Внимание' : 'Критично'}
              </span>
              
              <div className="flex items-center space-x-2 text-text-muted">
                <span>Порог: {metric.threshold.warning}{metric.unit}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PerformanceDashboard;