// src/pages/notifications-alerts/components/FilterPanel.jsx
import React from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ filters, onFiltersChange, stats }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filterOptions = {
    type: [
      { value: 'all', label: 'Все типы', count: stats.total },
      { value: 'critical', label: 'Критические', count: stats.critical },
      { value: 'warning', label: 'Предупреждения', count: 0 },
      { value: 'info', label: 'Информационные', count: 0 }
    ],
    status: [
      { value: 'all', label: 'Все статусы', count: stats.total },
      { value: 'new', label: 'Новые', count: stats.unread },
      { value: 'read', label: 'Прочитанные', count: 0 },
      { value: 'archived', label: 'Архивные', count: 0 }
    ],
    priority: [
      { value: 'all', label: 'Все приоритеты', count: stats.total },
      { value: 'critical', label: 'Критический', count: stats.critical },
      { value: 'medium', label: 'Средний', count: 0 },
      { value: 'low', label: 'Низкий', count: 0 }
    ],
    dateRange: [
      { value: '1d', label: 'За день' },
      { value: '7d', label: 'За неделю' },
      { value: '30d', label: 'За месяц' },
      { value: 'all', label: 'За все время' }
    ]
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'critical': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Filter" size={20} className="text-text-primary" />
        <h2 className="text-lg font-semibold text-text-primary">Фильтры</h2>
      </div>

      <div className="space-y-6">
        {/* Type Filter */}
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">Тип уведомления</h3>
          <div className="space-y-2">
            {filterOptions.type.map(option => (
              <label key={option.value} className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-secondary-50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="type"
                    value={option.value}
                    checked={filters.type === option.value}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                  />
                  <div className="flex items-center space-x-2">
                    <Icon name={getTypeIcon(option.value)} size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">{option.label}</span>
                  </div>
                </div>
                <span className="text-xs text-text-secondary bg-secondary-100 px-2 py-1 rounded-full">
                  {option.count}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">Статус</h3>
          <div className="space-y-2">
            {filterOptions.status.map(option => (
              <label key={option.value} className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-secondary-50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={filters.status === option.value}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-text-primary">{option.label}</span>
                </div>
                <span className="text-xs text-text-secondary bg-secondary-100 px-2 py-1 rounded-full">
                  {option.count}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">Приоритет</h3>
          <div className="space-y-2">
            {filterOptions.priority.map(option => (
              <label key={option.value} className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-secondary-50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="priority"
                    value={option.value}
                    checked={filters.priority === option.value}
                    onChange={(e) => handleFilterChange('priority', e.target.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                  />
                  <span className={`text-sm ${getPriorityColor(option.value)}`}>{option.label}</span>
                </div>
                <span className="text-xs text-text-secondary bg-secondary-100 px-2 py-1 rounded-full">
                  {option.count}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Range Filter */}
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">Период</h3>
          <div className="space-y-2">
            {filterOptions.dateRange.map(option => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-secondary-50 transition-colors duration-200">
                <input
                  type="radio"
                  name="dateRange"
                  value={option.value}
                  checked={filters.dateRange === option.value}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                />
                <span className="text-sm text-text-primary">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Reset Filters */}
        <button
          onClick={() => onFiltersChange({
            type: 'all',
            status: 'all',
            priority: 'all',
            dateRange: '7d'
          })}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 border border-border rounded-lg transition-colors duration-200"
        >
          <Icon name="RotateCcw" size={16} />
          <span>Сбросить фильтры</span>
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;