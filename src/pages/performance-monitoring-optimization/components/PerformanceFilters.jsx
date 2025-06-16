// src/pages/performance-monitoring-optimization/components/PerformanceFilters.jsx
import React from 'react';
import Icon from 'components/AppIcon';

const PerformanceFilters = ({ filters, onFilterChange }) => {
  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const timeRangeOptions = [
    { value: '1h', label: 'Последний час' },
    { value: '6h', label: 'Последние 6 часов' },
    { value: '24h', label: 'Последние 24 часа' },
    { value: '7d', label: 'Последние 7 дней' },
    { value: '30d', label: 'Последние 30 дней' }
  ];

  const componentOptions = [
    { value: 'all', label: 'Все компоненты', count: 156 },
    { value: 'frontend', label: 'Frontend', count: 45, icon: 'Monitor' },
    { value: 'backend', label: 'Backend API', count: 78, icon: 'Server' },
    { value: 'database', label: 'База данных', count: 23, icon: 'Database' },
    { value: 'cache', label: 'Кэширование', count: 10, icon: 'Zap' }
  ];

  const metricOptions = [
    { value: 'all', label: 'Все метрики', count: 89 },
    { value: 'response-time', label: 'Время отклика', count: 25, icon: 'Clock' },
    { value: 'throughput', label: 'Пропускная способность', count: 18, icon: 'Activity' },
    { value: 'resource-usage', label: 'Использование ресурсов', count: 32, icon: 'Cpu' },
    { value: 'error-rate', label: 'Частота ошибок', count: 14, icon: 'AlertTriangle' }
  ];

  const thresholdOptions = [
    { value: 'all', label: 'Все пороги', count: 89 },
    { value: 'good', label: 'В норме', count: 65, color: 'text-success' },
    { value: 'warning', label: 'Предупреждение', count: 18, color: 'text-warning' },
    { value: 'critical', label: 'Критично', count: 6, color: 'text-error' }
  ];

  const optimizationSuggestions = [
    {
      title: 'Медленные запросы к БД',
      description: 'Обнаружены запросы с временем выполнения > 500мс',
      impact: 'high',
      action: 'Оптимизировать индексы',
      icon: 'Database'
    },
    {
      title: 'Неэффективный кэш',
      description: 'Низкий hit rate кэша (65%)',
      impact: 'medium',
      action: 'Пересмотреть стратегию',
      icon: 'Zap'
    },
    {
      title: 'Большие пакеты JS',
      description: 'Размер bundle превышает рекомендуемый',
      impact: 'medium',
      action: 'Включить code splitting',
      icon: 'Package'
    }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-primary';
      default: return 'text-text-secondary';
    }
  };

  const getImpactBg = (impact) => {
    switch (impact) {
      case 'high': return 'bg-error-50 border-error-200';
      case 'medium': return 'bg-warning-50 border-warning-200';
      case 'low': return 'bg-primary-50 border-primary-200';
      default: return 'bg-secondary-50 border-secondary-200';
    }
  };

  return (
    <div className="space-y-6">
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

      {/* Component Filter */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="font-medium text-text-primary mb-3 flex items-center">
          <Icon name="Layers" size={16} className="mr-2" />
          Компоненты системы
        </h3>
        <div className="space-y-2">
          {componentOptions.map((option) => (
            <label key={option.value} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="component"
                  value={option.value}
                  checked={filters.component === option.value}
                  onChange={(e) => handleFilterChange('component', e.target.value)}
                  className="mr-3 text-primary focus:ring-primary"
                />
                <div className="flex items-center">
                  {option.icon && (
                    <Icon name={option.icon} size={14} className="mr-2 text-text-muted" />
                  )}
                  <span className={`text-sm group-hover:text-text-primary ${
                    filters.component === option.value ? 'text-text-primary font-medium' : 'text-text-secondary'
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

      {/* Metric Filter */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="font-medium text-text-primary mb-3 flex items-center">
          <Icon name="BarChart3" size={16} className="mr-2" />
          Тип метрики
        </h3>
        <div className="space-y-2">
          {metricOptions.map((option) => (
            <label key={option.value} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="metric"
                  value={option.value}
                  checked={filters.metric === option.value}
                  onChange={(e) => handleFilterChange('metric', e.target.value)}
                  className="mr-3 text-primary focus:ring-primary"
                />
                <div className="flex items-center">
                  {option.icon && (
                    <Icon name={option.icon} size={14} className="mr-2 text-text-muted" />
                  )}
                  <span className={`text-sm group-hover:text-text-primary ${
                    filters.metric === option.value ? 'text-text-primary font-medium' : 'text-text-secondary'
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

      {/* Threshold Filter */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="font-medium text-text-primary mb-3 flex items-center">
          <Icon name="Target" size={16} className="mr-2" />
          Пороговые значения
        </h3>
        <div className="space-y-2">
          {thresholdOptions.map((option) => (
            <label key={option.value} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="threshold"
                  value={option.value}
                  checked={filters.threshold === option.value}
                  onChange={(e) => handleFilterChange('threshold', e.target.value)}
                  className="mr-3 text-primary focus:ring-primary"
                />
                <span className={`text-sm group-hover:text-text-primary ${
                  filters.threshold === option.value ? 'text-text-primary font-medium' : 'text-text-secondary'
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

      {/* Optimization Suggestions */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="font-medium text-text-primary mb-3 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2" />
          Рекомендации по оптимизации
        </h3>
        <div className="space-y-3">
          {optimizationSuggestions.map((suggestion, index) => (
            <div key={index} className={`p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-all duration-200 ${
              getImpactBg(suggestion.impact)
            }`}>
              <div className="flex items-start space-x-3">
                <Icon name={suggestion.icon} size={16} className={`mt-0.5 ${getImpactColor(suggestion.impact)}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-text-primary">{suggestion.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      suggestion.impact === 'high' ? 'bg-error text-white' :
                      suggestion.impact === 'medium'? 'bg-warning text-white' : 'bg-primary text-white'
                    }`}>
                      {suggestion.impact === 'high' ? 'Высокий' :
                       suggestion.impact === 'medium' ? 'Средний' : 'Низкий'}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mb-2">{suggestion.description}</p>
                  <button className="text-xs text-primary hover:text-primary-700 font-medium">
                    {suggestion.action}
                  </button>
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
            <span className="text-sm">Запустить полную диагностику</span>
          </button>
          <button className="w-full flex items-center space-x-2 px-3 py-2 text-left bg-secondary-100 text-text-primary rounded-lg hover:bg-secondary-200 transition-colors duration-200">
            <Icon name="RefreshCw" size={14} />
            <span className="text-sm">Обновить метрики</span>
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

export default PerformanceFilters;