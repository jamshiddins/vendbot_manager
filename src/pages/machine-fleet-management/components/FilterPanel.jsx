import React from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  machinesData
}) => {
  const locations = [...new Set(machinesData.map(machine => machine.location))];
  const machineTypes = [...new Set(machinesData.map(machine => machine.machineType))];
  
  const statusOptions = [
    { value: '', label: 'Все статусы' },
    { value: 'online', label: 'В сети' },
    { value: 'warning', label: 'Предупреждение' },
    { value: 'offline', label: 'Не в сети' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'Все время' },
    { value: 'today', label: 'Сегодня' },
    { value: 'week', label: 'Эта неделя' },
    { value: 'month', label: 'Этот месяц' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    onSearchChange('');
    onFiltersChange({
      location: '',
      status: '',
      machineType: '',
      dateRange: ''
    });
  };

  const hasActiveFilters = searchQuery || Object.values(filters).some(value => value !== '');

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="Search" size={16} className="text-text-secondary" />
        </div>
        <input
          type="text"
          placeholder="Поиск по ID, названию, локации или адресу..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-surface text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <Icon name="X" size={16} className="text-text-secondary hover:text-text-primary" />
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Локация
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Все локации</option>
            {locations.map(location => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Статус
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Machine Type Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Тип машины
          </label>
          <select
            value={filters.machineType}
            onChange={(e) => handleFilterChange('machineType', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Все типы</option>
            {machineTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Период
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {dateRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters and Clear Button */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2 flex-wrap">
            <span className="text-sm text-text-secondary">Активные фильтры:</span>
            
            {searchQuery && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary">
                Поиск: "{searchQuery}"
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-2 hover:text-primary-700"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {filters.location && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary-100 text-text-primary">
                Локация: {filters.location}
                <button
                  onClick={() => handleFilterChange('location', '')}
                  className="ml-2 hover:text-text-secondary"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {filters.status && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary-100 text-text-primary">
                Статус: {statusOptions.find(opt => opt.value === filters.status)?.label}
                <button
                  onClick={() => handleFilterChange('status', '')}
                  className="ml-2 hover:text-text-secondary"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {filters.machineType && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary-100 text-text-primary">
                Тип: {filters.machineType}
                <button
                  onClick={() => handleFilterChange('machineType', '')}
                  className="ml-2 hover:text-text-secondary"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {filters.dateRange && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary-100 text-text-primary">
                Период: {dateRangeOptions.find(opt => opt.value === filters.dateRange)?.label}
                <button
                  onClick={() => handleFilterChange('dateRange', '')}
                  className="ml-2 hover:text-text-secondary"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
          
          <button
            onClick={clearFilters}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-colors duration-200"
          >
            <Icon name="X" size={14} />
            <span>Очистить все</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;