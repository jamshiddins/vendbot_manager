import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ onFilterChange, filterValues, regions }) => {
  const [localFilters, setLocalFilters] = useState({
    status: 'all',
    region: 'all',
    type: 'all',
    search: ''
  });
  
  // Initialize local state from props
  useEffect(() => {
    setLocalFilters(filterValues || {
      status: 'all',
      region: 'all',
      type: 'all',
      search: ''
    });
  }, [filterValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...localFilters, [name]: value };
    setLocalFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setLocalFilters(prev => ({
      ...prev,
      search: value
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onFilterChange?.(localFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      status: 'all',
      region: 'all',
      type: 'all',
      search: ''
    };
    setLocalFilters(resetFilters);
    onFilterChange?.(resetFilters);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-5 sticky top-20">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-heading font-semibold text-text-primary">Фильтры</h3>
        <button 
          onClick={handleReset}
          className="text-sm text-primary hover:text-primary-700 transition-colors duration-200"
        >
          Сбросить
        </button>
      </div>

      {/* Search */}
      <form onSubmit={handleSearchSubmit} className="mb-5">
        <div className="relative">
          <input
            type="text"
            name="search"
            placeholder="Поиск машин..."
            value={localFilters?.search || ''}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icon name="Search" size={16} className="text-text-secondary" />
          </div>
          <button 
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary-700"
          >
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </form>

      {/* Status Filter */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-text-secondary mb-2">Статус</label>
        <select
          name="status"
          value={localFilters?.status || 'all'}
          onChange={handleInputChange}
          className="w-full p-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">Все статусы</option>
          <option value="online">В сети</option>
          <option value="offline">Не в сети</option>
          <option value="maintenance">Обслуживание</option>
          <option value="warning">Внимание</option>
        </select>
      </div>

      {/* Region Filter */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-text-secondary mb-2">Регион</label>
        <select
          name="region"
          value={localFilters?.region || 'all'}
          onChange={handleInputChange}
          className="w-full p-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">Все регионы</option>
          {regions?.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      {/* Type Filter */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-text-secondary mb-2">Тип машины</label>
        <select
          name="type"
          value={localFilters?.type || 'all'}
          onChange={handleInputChange}
          className="w-full p-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">Все типы</option>
          <option value="snack">Снеки</option>
          <option value="coffee">Кофе</option>
          <option value="combo">Комбо</option>
        </select>
      </div>

      {/* Applied Filters Summary */}
      <div className="border-t border-border pt-4 mt-4">
        <p className="text-sm text-text-secondary mb-2">Активные фильтры:</p>
        <div className="flex flex-wrap gap-2">
          {localFilters?.status !== 'all' && (
            <div className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-50 text-primary rounded-lg text-sm">
              <span>Статус: {localFilters?.status === 'online' ? 'В сети' : 
                            localFilters?.status === 'offline' ? 'Не в сети' : 
                            localFilters?.status === 'maintenance' ? 'Обслуживание' : 
                            localFilters?.status === 'warning' ? 'Внимание' : 
                            localFilters?.status}</span>
              <button 
                onClick={() => {
                  const newFilters = { ...localFilters, status: 'all' };
                  setLocalFilters(newFilters);
                  onFilterChange?.(newFilters);
                }}
                className="hover:text-primary-700"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          )}
          {localFilters?.region !== 'all' && (
            <div className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-50 text-primary rounded-lg text-sm">
              <span>Регион: {localFilters?.region}</span>
              <button 
                onClick={() => {
                  const newFilters = { ...localFilters, region: 'all' };
                  setLocalFilters(newFilters);
                  onFilterChange?.(newFilters);
                }}
                className="hover:text-primary-700"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          )}
          {localFilters?.type !== 'all' && (
            <div className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-50 text-primary rounded-lg text-sm">
              <span>Тип: {localFilters?.type === 'snack' ? 'Снеки' : 
                       localFilters?.type === 'coffee' ? 'Кофе' : 
                       localFilters?.type === 'combo' ? 'Комбо' : 
                       localFilters?.type}</span>
              <button 
                onClick={() => {
                  const newFilters = { ...localFilters, type: 'all' };
                  setLocalFilters(newFilters);
                  onFilterChange?.(newFilters);
                }}
                className="hover:text-primary-700"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          )}
          {localFilters?.search && (
            <div className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-50 text-primary rounded-lg text-sm">
              <span>Поиск: {localFilters?.search}</span>
              <button 
                onClick={() => {
                  const newFilters = { ...localFilters, search: '' };
                  setLocalFilters(newFilters);
                  onFilterChange?.(newFilters);
                }}
                className="hover:text-primary-700"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          )}
          {localFilters?.status === 'all' && localFilters?.region === 'all' && localFilters?.type === 'all' && !localFilters?.search && (
            <span className="text-text-muted text-sm">Фильтры не применены</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;