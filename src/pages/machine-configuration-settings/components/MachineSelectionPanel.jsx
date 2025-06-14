import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const MachineSelectionPanel = ({
  locations,
  selectedMachine,
  selectedMachines,
  onMachineSelect,
  onBulkSelect,
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange,
  syncStatus,
  getStatusColor,
  getStatusBg
}) => {
  const [expandedLocations, setExpandedLocations] = useState({});
  const [bulkSelectMode, setBulkSelectMode] = useState(false);

  const toggleLocation = (locationId) => {
    setExpandedLocations(prev => ({
      ...prev,
      [locationId]: !prev[locationId]
    }));
  };

  const handleBulkSelectToggle = () => {
    setBulkSelectMode(!bulkSelectMode);
    if (bulkSelectMode) {
      onBulkSelect([]);
    }
  };

  const handleMachineCheck = (machine, checked) => {
    if (checked) {
      onBulkSelect([...selectedMachines, machine]);
    } else {
      onBulkSelect(selectedMachines.filter(m => m.id !== machine.id));
    }
  };

  const handleLocationCheck = (location, checked) => {
    if (checked) {
      const newMachines = location.machines.filter(
        machine => !selectedMachines.find(m => m.id === machine.id)
      );
      onBulkSelect([...selectedMachines, ...newMachines]);
    } else {
      const locationMachineIds = location.machines.map(m => m.id);
      onBulkSelect(selectedMachines.filter(m => !locationMachineIds.includes(m.id)));
    }
  };

  const filteredLocations = locations.map(location => ({
    ...location,
    machines: location.machines.filter(machine => {
      const matchesSearch = machine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           machine.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'all' || machine.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
  })).filter(location => location.machines.length > 0);

  const totalMachines = locations.reduce((sum, location) => sum + location.machines.length, 0);
  const onlineMachines = locations.reduce((sum, location) => 
    sum + location.machines.filter(m => m.status === 'online').length, 0
  );

  const getSyncStatusIcon = (machineId) => {
    const status = syncStatus[machineId];
    switch (status) {
      case 'syncing':
        return <Icon name="Loader2" size={14} className="text-primary animate-spin" />;
      case 'success':
        return <Icon name="CheckCircle" size={14} className="text-success" />;
      case 'error':
        return <Icon name="XCircle" size={14} className="text-error" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Выбор машин
          </h2>
          <button
            onClick={handleBulkSelectToggle}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm transition-colors duration-200 ${
              bulkSelectMode 
                ? 'bg-primary text-white' :'bg-secondary-100 text-text-primary hover:bg-secondary-200'
            }`}
          >
            <Icon name={bulkSelectMode ? "X" : "CheckSquare"} size={14} />
            <span>{bulkSelectMode ? 'Отмена' : 'Выбрать'}</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Поиск машин..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Filter */}
        <select
          value={filterStatus}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">Все статусы</option>
          <option value="online">В сети</option>
          <option value="warning">Предупреждение</option>
          <option value="offline">Не в сети</option>
        </select>

        {/* Stats */}
        <div className="flex items-center justify-between mt-4 p-3 bg-secondary-50 rounded-lg">
          <div className="text-center">
            <p className="text-sm font-medium text-text-primary">{totalMachines}</p>
            <p className="text-xs text-text-secondary">Всего</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-success">{onlineMachines}</p>
            <p className="text-xs text-text-secondary">В сети</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-primary">{selectedMachines.length}</p>
            <p className="text-xs text-text-secondary">Выбрано</p>
          </div>
        </div>
      </div>

      {/* Machine List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredLocations.map(location => {
          const isExpanded = expandedLocations[location.id] !== false; // Default to expanded
          const locationMachines = location.machines;
          const selectedLocationMachines = locationMachines.filter(m => 
            selectedMachines.find(sm => sm.id === m.id)
          );
          const isLocationFullySelected = locationMachines.length > 0 && 
            selectedLocationMachines.length === locationMachines.length;
          const isLocationPartiallySelected = selectedLocationMachines.length > 0 && 
            selectedLocationMachines.length < locationMachines.length;

          return (
            <div key={location.id} className="border-b border-border last:border-b-0">
              {/* Location Header */}
              <div className="flex items-center p-3 hover:bg-secondary-50 transition-colors duration-200">
                {bulkSelectMode && (
                  <input
                    type="checkbox"
                    checked={isLocationFullySelected}
                    ref={input => {
                      if (input) input.indeterminate = isLocationPartiallySelected;
                    }}
                    onChange={(e) => handleLocationCheck(location, e.target.checked)}
                    className="mr-3 rounded border-border focus:ring-primary"
                  />
                )}
                
                <button
                  onClick={() => toggleLocation(location.id)}
                  className="flex items-center space-x-2 flex-1 text-left"
                >
                  <Icon 
                    name={isExpanded ? "ChevronDown" : "ChevronRight"} 
                    size={16} 
                    className="text-text-secondary" 
                  />
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">{location.name}</p>
                    <p className="text-xs text-text-secondary">{location.address}</p>
                  </div>
                  <span className="text-xs text-text-secondary bg-secondary-100 px-2 py-1 rounded-full">
                    {locationMachines.length}
                  </span>
                </button>
              </div>

              {/* Machines */}
              {isExpanded && (
                <div className="ml-6 border-l border-border">
                  {locationMachines.map(machine => {
                    const isSelected = selectedMachine?.id === machine.id;
                    const isChecked = selectedMachines.find(m => m.id === machine.id);
                    
                    return (
                      <div
                        key={machine.id}
                        className={`flex items-center p-3 cursor-pointer transition-colors duration-200 ${
                          isSelected ? 'bg-primary-50 border-r-2 border-r-primary' : 'hover:bg-secondary-50'
                        }`}
                        onClick={() => !bulkSelectMode && onMachineSelect(machine)}
                      >
                        {bulkSelectMode && (
                          <input
                            type="checkbox"
                            checked={!!isChecked}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleMachineCheck(machine, e.target.checked);
                            }}
                            className="mr-3 rounded border-border focus:ring-primary"
                          />
                        )}
                        
                        <div className="flex items-center space-x-3 flex-1">
                          <div className={`w-3 h-3 rounded-full ${getStatusBg(machine.status)}`}>
                            <div className={`w-full h-full rounded-full ${getStatusColor(machine.status)} opacity-60`}></div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-text-primary">{machine.name}</p>
                              {getSyncStatusIcon(machine.id)}
                            </div>
                            <p className="text-xs text-text-secondary">{machine.id}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              {machine.temperature && (
                                <span className="text-xs text-text-secondary">
                                  🌡️ {machine.temperature}°C
                                </span>
                              )}
                              <span className="text-xs text-text-secondary">
                                📦 {machine.products}
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-xs font-medium text-text-primary">
                              {machine.revenue.toLocaleString('ru-RU')} ₽
                            </p>
                            <p className="text-xs text-text-secondary">
                              {new Date(machine.lastSync).toLocaleTimeString('ru-RU', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredLocations.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Search" size={32} className="text-text-muted mx-auto mb-3" />
          <p className="text-text-secondary">Машины не найдены</p>
          <p className="text-sm text-text-muted mt-1">
            Попробуйте изменить параметры поиска или фильтра
          </p>
        </div>
      )}
    </div>
  );
};

export default MachineSelectionPanel;