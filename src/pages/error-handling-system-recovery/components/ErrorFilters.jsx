// src/pages/error-handling-system-recovery/components/ErrorFilters.jsx
import React from 'react';
import Icon from 'components/AppIcon';

const ErrorFilters = ({ filters, onFilterChange }) => {
  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const severityOptions = [
    { value: 'all', label: 'Все уровни', count: 45 },
    { value: 'critical', label: 'Критические', count: 5, color: 'text-error' },
    { value: 'warning', label: 'Предупреждения', count: 12, color: 'text-warning' },
    { value: 'info', label: 'Информационные', count: 28, color: 'text-primary' }
  ];

  const moduleOptions = [
    { value: 'all', label: 'Все модули', count: 45 },
    { value: 'network', label: 'Сеть', count: 8, icon: 'Wifi' },
    { value: 'payment', label: 'Платежи', count: 6, icon: 'CreditCard' },
    { value: 'inventory', label: 'Запасы', count: 12, icon: 'Package' },
    { value: 'hardware', label: 'Оборудование', count: 7, icon: 'Cpu' },
    { value: 'software', label: 'ПО', count: 9, icon: 'Code' },
    { value: 'database', label: 'БД', count: 3, icon: 'Database' }
  ];

  const timeRangeOptions = [
    { value: '1h', label: 'Последний час' },
    { value: '6h', label: 'Последние 6 часов' },
    { value: '24h', label: 'Последние 24 часа' },
    { value: '7d', label: 'Последние 7 дней' },
    { value: '30d', label: 'Последние 30 дней' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Все статусы', count: 45 },
    { value: 'active', label: 'Активные', count: 15, color: 'text-error' },
    { value: 'resolving', label: 'Устраняются', count: 8, color: 'text-warning' },
    { value: 'resolved', label: 'Решенные', count: 22, color: 'text-success' }
  ];

  const commonPatterns = [
    { 
      name: 'Проблемы сети', 
      description: 'Частые сбои подключения',
      count: 8,
      icon: 'Wifi',
      severity: 'critical'
    },
    { 
      name: 'Ошибки платежей', 
      description: 'Проблемы с обработкой карт',
      count: 5,
      icon: 'CreditCard',
      severity: 'warning'
    },
    { 
      name: 'Переполнение логов', 
      description: 'Избыточное логирование',
      count: 12,
      icon: 'FileText',
      severity: 'info'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Severity Filter */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="font-medium text-text-primary mb-3 flex items-center">
          <Icon name="AlertTriangle" size={16} className="mr-2" />
          Уровень важности
        </h3>
        <div className="space-y-2">
          {severityOptions.map((option) => (
            <label key={option.value} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="severity"
                  value={option.value}
                  checked={filters.severity === option.value}
                  onChange={(e) => handleFilterChange('severity', e.target.value)}
                  className="mr-3 text-primary focus:ring-primary"
                />
                <span className={`text-sm group-hover:text-text-primary ${
                  filters.severity === option.value ? 'text-text-primary font-medium' : 'text-text-secondary'
                } ${option.color || ''}`}>
                  {option.label}
                </span>
              </div>
              <span className="text-xs text-text-muted bg-secondary-100 px-2 py-1 rounded">
                {option.count}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Module Filter */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="font-medium text-text-primary mb-3 flex items-center">
          <Icon name="Layers" size={16} className="mr-2" />
          Модуль системы
        </h3>
        <div className="space-y-2">
          {moduleOptions.map((option) => (
            <label key={option.value} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="module"
                  value={option.value}
                  checked={filters.module === option.value}
                  onChange={(e) => handleFilterChange('module', e.target.value)}
                  className="mr-3 text-primary focus:ring-primary"
                />
                <div className="flex items-center">
                  {option.icon && (
                    <Icon name={option.icon} size={14} className="mr-2 text-text-muted" />
                  )}
                  <span className={`text-sm group-hover:text-text-primary ${
                    filters.module === option.value ? 'text-text-primary font-medium' : 'text-text-secondary'
                  }`}>
                    {option.label}
                  </span>
                </div>
              </div>
              <span className="text-xs text-text-muted bg-secondary-100 px-2 py-1 rounded">
                {option.count}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Time Range Filter */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="font-medium text-text-primary mb-3 flex items-center">
          <Icon name="Clock" size={16} className="mr-2" />
          Период времени
        </h3>
        <div className="space-y-2">
          {timeRangeOptions.map((option) => (
            <label key={option.value} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="timeRange"
                value={option.value}
                checked={filters.timeRange === option.value}
                onChange={(e) => handleFilterChange('timeRange', e.target.value)}
                className="mr-3 text-primary focus:ring-primary"
              />
              <span className={`text-sm group-hover:text-text-primary ${
                filters.timeRange === option.value ? 'text-text-primary font-medium' : 'text-text-secondary'
              }`}>
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="font-medium text-text-primary mb-3 flex items-center">
          <Icon name="Activity" size={16} className="mr-2" />
          Статус
        </h3>
        <div className="space-y-2">
          {statusOptions.map((option) => (
            <label key={option.value} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value={option.value}
                  checked={filters.status === option.value}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="mr-3 text-primary focus:ring-primary"
                />
                <span className={`text-sm group-hover:text-text-primary ${
                  filters.status === option.value ? 'text-text-primary font-medium' : 'text-text-secondary'
                } ${option.color || ''}`}>
                  {option.label}
                </span>
              </div>
              <span className="text-xs text-text-muted bg-secondary-100 px-2 py-1 rounded">
                {option.count}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Common Error Patterns */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="font-medium text-text-primary mb-3 flex items-center">
          <Icon name="TrendingUp" size={16} className="mr-2" />
          Частые проблемы
        </h3>
        <div className="space-y-3">
          {commonPatterns.map((pattern, index) => (
            <div key={index} className="p-3 bg-secondary-50 rounded-lg cursor-pointer hover:bg-secondary-100 transition-colors duration-200">
              <div className="flex items-start space-x-3">
                <Icon name={pattern.icon} size={16} className="text-text-secondary mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-text-primary">{pattern.name}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      pattern.severity === 'critical' ? 'bg-error text-white' :
                      pattern.severity === 'warning'? 'bg-warning text-white' : 'bg-primary text-white'
                    }`}>
                      {pattern.count}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">{pattern.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="font-medium text-text-primary mb-3 flex items-center">
          <Icon name="Zap" size={16} className="mr-2" />
          Быстрые действия
        </h3>
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-2 px-3 py-2 text-left bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            <Icon name="Play" size={14} />
            <span className="text-sm">Запустить диагностику</span>
          </button>
          <button className="w-full flex items-center space-x-2 px-3 py-2 text-left bg-secondary-100 text-text-primary rounded-lg hover:bg-secondary-200 transition-colors duration-200">
            <Icon name="RefreshCw" size={14} />
            <span className="text-sm">Обновить статус</span>
          </button>
          <button className="w-full flex items-center space-x-2 px-3 py-2 text-left bg-secondary-100 text-text-primary rounded-lg hover:bg-secondary-200 transition-colors duration-200">
            <Icon name="Download" size={14} />
            <span className="text-sm">Экспорт отчета</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFilters;