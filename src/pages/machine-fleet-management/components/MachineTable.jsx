import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import { format } from 'date-fns';

const MachineTable = ({ machines, onSelectMachine, onSelectionChange, selectedMachines }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const sortedMachines = [...(machines || [])].sort((a, b) => {
    if (a?.[sortConfig?.key] < b?.[sortConfig?.key]) {
      return sortConfig?.direction === 'asc' ? -1 : 1;
    }
    if (a?.[sortConfig?.key] > b?.[sortConfig?.key]) {
      return sortConfig?.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleCheckboxChange = (machineId) => {
    const newSelectedMachines = selectedMachines?.includes(machineId)
      ? selectedMachines?.filter(id => id !== machineId)
      : [...(selectedMachines || []), machineId];
    
    onSelectionChange?.(newSelectedMachines);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      onSelectionChange?.(machines?.map(machine => machine?.id));
    } else {
      onSelectionChange?.([]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'offline': return 'bg-error';
      case 'maintenance': return 'bg-accent';
      case 'warning': return 'bg-warning';
      default: return 'bg-secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'В сети';
      case 'offline': return 'Не в сети';
      case 'maintenance': return 'Обслуживание';
      case 'warning': return 'Внимание';
      default: return 'Неизвестно';
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'snack': return 'Снеки';
      case 'coffee': return 'Кофе';
      case 'combo': return 'Комбо';
      default: return type;
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary-50">
              <th className="px-4 py-3 text-left">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-secondary-300 text-primary focus:ring-primary"
                    checked={selectedMachines?.length > 0 && selectedMachines?.length === machines?.length}
                    onChange={handleSelectAll}
                  />
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('id')}
                  className="group flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>ID</span>
                  <Icon name={getSortIcon('id')} size={14} className="opacity-50 group-hover:opacity-100" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="group flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>Название/Локация</span>
                  <Icon name={getSortIcon('name')} size={14} className="opacity-50 group-hover:opacity-100" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="group flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>Статус</span>
                  <Icon name={getSortIcon('status')} size={14} className="opacity-50 group-hover:opacity-100" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('type')}
                  className="group flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>Тип</span>
                  <Icon name={getSortIcon('type')} size={14} className="opacity-50 group-hover:opacity-100" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('lastActivity')}
                  className="group flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>Последняя активность</span>
                  <Icon name={getSortIcon('lastActivity')} size={14} className="opacity-50 group-hover:opacity-100" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('revenue')}
                  className="group flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>Выручка (день)</span>
                  <Icon name={getSortIcon('revenue')} size={14} className="opacity-50 group-hover:opacity-100" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('stock')}
                  className="group flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>Запасы (%)</span>
                  <Icon name={getSortIcon('stock')} size={14} className="opacity-50 group-hover:opacity-100" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-text-secondary">Действия</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedMachines?.length > 0 ? (
              sortedMachines?.map((machine) => (
                <tr 
                  key={machine?.id} 
                  className="border-b border-border hover:bg-secondary-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="rounded border-secondary-300 text-primary focus:ring-primary"
                      checked={selectedMachines?.includes(machine?.id)}
                      onChange={() => handleCheckboxChange(machine?.id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-text-primary">{machine?.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-text-primary">{machine?.name}</p>
                      <p className="text-sm text-text-secondary truncate max-w-xs">{machine?.location}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(machine?.status)}`}></div>
                      <span className="text-text-primary">{getStatusText(machine?.status)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-text-primary">{getTypeText(machine?.type)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-text-primary">
                      {machine?.lastActivity ? format(new Date(machine?.lastActivity), 'dd.MM.yyyy HH:mm') : 'Н/Д'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-text-primary">₽{machine?.revenue?.toLocaleString('ru-RU')}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-secondary-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${machine?.stock > 30 ? 'bg-success' : 'bg-warning'}`}
                          style={{ width: `${machine?.stock}%` }}
                        ></div>
                      </div>
                      <span className="text-text-primary">{machine?.stock}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => onSelectMachine?.(machine)}
                        className="p-1 text-text-secondary hover:text-primary rounded-md hover:bg-primary-50 transition-colors duration-200"
                        title="Подробности"
                      >
                        <Icon name="Info" size={18} />
                      </button>
                      <button 
                        className="p-1 text-text-secondary hover:text-primary rounded-md hover:bg-primary-50 transition-colors duration-200"
                        title="Настройки"
                      >
                        <Icon name="Settings" size={18} />
                      </button>
                      <button 
                        className="p-1 text-text-secondary hover:text-error rounded-md hover:bg-error-50 transition-colors duration-200"
                        title="Отключить"
                      >
                        <Icon name="Power" size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-4 py-6 text-center text-text-secondary">
                  <div className="flex flex-col items-center">
                    <Icon name="Search" size={24} className="mb-2 text-text-muted" />
                    <p>Нет данных по заданным фильтрам</p>
                    <p className="text-sm text-text-muted mt-1">Попробуйте изменить параметры поиска</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="px-4 py-3 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-text-secondary mb-2 sm:mb-0">
          Показано {sortedMachines?.length} из {sortedMachines?.length} машин
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 rounded-md border border-border text-text-secondary hover:bg-secondary-50 disabled:opacity-50 disabled:pointer-events-none">
            <Icon name="ChevronLeft" size={16} />
          </button>
          <button className="px-3 py-1 rounded-md border border-border bg-primary text-white">
            1
          </button>
          <button className="px-3 py-1 rounded-md border border-border text-text-secondary hover:bg-secondary-50 disabled:opacity-50 disabled:pointer-events-none">
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MachineTable;