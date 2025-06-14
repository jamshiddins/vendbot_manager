import React from 'react';
import Icon from 'components/AppIcon';

const MachineTable = ({
  machines,
  selectedMachines,
  sortConfig,
  onSort,
  onSelectMachine,
  onSelectAll,
  onMachineClick,
  getStatusColor,
  getStatusText
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDateTime = (date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getTimeSince = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Только что';
    if (diffInMinutes < 60) return `${diffInMinutes} мин назад`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} ч назад`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} дн назад`;
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="text-text-muted" />;
    }
    return sortConfig.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const getInventoryLevelColor = (level) => {
    if (level >= 70) return 'text-success';
    if (level >= 30) return 'text-warning';
    return 'text-error';
  };

  const getInventoryLevelBg = (level) => {
    if (level >= 70) return 'bg-success';
    if (level >= 30) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedMachines.length === machines.length && machines.length > 0}
                  onChange={onSelectAll}
                  className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
                />
              </th>
              
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => onSort('id')}
              >
                <div className="flex items-center space-x-2">
                  <span>ID Машины</span>
                  {getSortIcon('id')}
                </div>
              </th>
              
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => onSort('location')}
              >
                <div className="flex items-center space-x-2">
                  <span>Локация</span>
                  {getSortIcon('location')}
                </div>
              </th>
              
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => onSort('status')}
              >
                <div className="flex items-center space-x-2">
                  <span>Статус</span>
                  {getSortIcon('status')}
                </div>
              </th>
              
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => onSort('lastCommunication')}
              >
                <div className="flex items-center space-x-2">
                  <span>Последняя связь</span>
                  {getSortIcon('lastCommunication')}
                </div>
              </th>
              
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => onSort('inventoryLevel')}
              >
                <div className="flex items-center space-x-2">
                  <span>Уровень запасов</span>
                  {getSortIcon('inventoryLevel')}
                </div>
              </th>
              
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => onSort('dailySales')}
              >
                <div className="flex items-center space-x-2">
                  <span>Продажи за день</span>
                  {getSortIcon('dailySales')}
                </div>
              </th>
              
              <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">
                Действия
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-border">
            {machines.map((machine) => (
              <tr 
                key={machine.id}
                className="hover:bg-secondary-50 transition-colors duration-200 cursor-pointer"
                onClick={() => onMachineClick(machine)}
              >
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedMachines.includes(machine.id)}
                    onChange={() => onSelectMachine(machine.id)}
                    className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
                  />
                </td>
                
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-text-primary">{machine.id}</div>
                    <div className="text-sm text-text-secondary">{machine.name}</div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-text-primary">{machine.location}</div>
                    <div className="text-sm text-text-secondary">{machine.address}</div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      machine.status === 'online' ? 'bg-success' :
                      machine.status === 'warning' ? 'bg-warning' : 'bg-error'
                    }`}></div>
                    <span className={`text-sm font-medium ${getStatusColor(machine.status)}`}>
                      {getStatusText(machine.status)}
                    </span>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm text-text-primary">
                      {getTimeSince(machine.lastCommunication)}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {formatDateTime(machine.lastCommunication)}
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-medium ${getInventoryLevelColor(machine.inventoryLevel)}`}>
                          {machine.inventoryLevel}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getInventoryLevelBg(machine.inventoryLevel)}`}
                          style={{ width: `${machine.inventoryLevel}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-text-primary">
                    {formatCurrency(machine.dailySales)}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {machine.machineType}
                  </div>
                </td>
                
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center space-x-2">
                    <button 
                      className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200"
                      title="Подробности"
                      onClick={() => onMachineClick(machine)}
                    >
                      <Icon name="Eye" size={16} />
                    </button>
                    <button 
                      className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200"
                      title="Настройки"
                    >
                      <Icon name="Settings" size={16} />
                    </button>
                    <button 
                      className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200"
                      title="Местоположение"
                    >
                      <Icon name="MapPin" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {machines.map((machine) => (
          <div 
            key={machine.id}
            className="bg-surface border border-border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => onMachineClick(machine)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedMachines.includes(machine.id)}
                  onChange={() => onSelectMachine(machine.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
                />
                <div>
                  <h3 className="text-sm font-medium text-text-primary">{machine.id}</h3>
                  <p className="text-xs text-text-secondary">{machine.name}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  machine.status === 'online' ? 'bg-success' :
                  machine.status === 'warning' ? 'bg-warning' : 'bg-error'
                }`}></div>
                <span className={`text-xs font-medium ${getStatusColor(machine.status)}`}>
                  {getStatusText(machine.status)}
                </span>
              </div>
            </div>
            
            <div className="space-y-2 mb-3">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={14} className="text-text-secondary" />
                <span className="text-sm text-text-primary">{machine.location}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} className="text-text-secondary" />
                <span className="text-sm text-text-primary">
                  {getTimeSince(machine.lastCommunication)}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-xs text-text-secondary mb-1">Запасы</p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-secondary-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getInventoryLevelBg(machine.inventoryLevel)}`}
                      style={{ width: `${machine.inventoryLevel}%` }}
                    ></div>
                  </div>
                  <span className={`text-xs font-medium ${getInventoryLevelColor(machine.inventoryLevel)}`}>
                    {machine.inventoryLevel}%
                  </span>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-text-secondary mb-1">Продажи</p>
                <p className="text-sm font-medium text-text-primary">
                  {formatCurrency(machine.dailySales)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-xs text-text-secondary">{machine.machineType}</span>
              <div className="flex items-center space-x-2">
                <button 
                  className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMachineClick(machine);
                  }}
                >
                  <Icon name="Eye" size={14} />
                </button>
                <button 
                  className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icon name="Settings" size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {machines.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            Машины не найдены
          </h3>
          <p className="text-text-secondary">
            Попробуйте изменить параметры поиска или фильтры
          </p>
        </div>
      )}
    </div>
  );
};

export default MachineTable;