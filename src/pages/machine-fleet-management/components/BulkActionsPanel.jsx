import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BulkActionsPanel = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const bulkActions = [
    {
      id: 'update-config',
      label: 'Обновить конфигурацию',
      icon: 'Settings',
      description: 'Применить настройки к выбранным машинам'
    },
    {
      id: 'schedule-maintenance',
      label: 'Запланировать обслуживание',
      icon: 'Wrench',
      description: 'Создать задачи обслуживания'
    },
    {
      id: 'update-prices',
      label: 'Обновить цены',
      icon: 'DollarSign',
      description: 'Изменить цены на товары'
    },
    {
      id: 'reboot',
      label: 'Перезагрузить',
      icon: 'RotateCcw',
      description: 'Выполнить перезагрузку машин'
    },
    {
      id: 'disable',
      label: 'Отключить',
      icon: 'Power',
      description: 'Временно отключить машины',
      variant: 'warning'
    },
    {
      id: 'delete',
      label: 'Удалить из системы',
      icon: 'Trash2',
      description: 'Удалить машины из базы данных',
      variant: 'danger'
    }
  ];

  const handleActionClick = (actionId) => {
    onBulkAction(actionId);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">
              Выбрано машин: <span className="font-bold">{selectedCount}</span>
            </span>
          </div>
          
          <button
            onClick={onClearSelection}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Снять выделение
          </button>
        </div>

        <div className="flex items-center space-x-3">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => handleActionClick('update-config')}
              className="flex items-center space-x-2 px-3 py-2 bg-surface text-text-primary border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-200"
            >
              <Icon name="Settings" size={16} />
              <span className="text-sm">Настройки</span>
            </button>
            
            <button
              onClick={() => handleActionClick('schedule-maintenance')}
              className="flex items-center space-x-2 px-3 py-2 bg-surface text-text-primary border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-200"
            >
              <Icon name="Wrench" size={16} />
              <span className="text-sm">Обслуживание</span>
            </button>
          </div>

          {/* Bulk Actions Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              <Icon name="MoreHorizontal" size={16} />
              <span className="text-sm font-medium">Действия</span>
              <Icon 
                name="ChevronDown" 
                size={14} 
                className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-72 bg-surface rounded-lg shadow-lg border border-border z-20">
                  <div className="p-2">
                    <div className="px-3 py-2 border-b border-border">
                      <h3 className="text-sm font-medium text-text-primary">
                        Массовые операции
                      </h3>
                      <p className="text-xs text-text-secondary mt-1">
                        Применить к {selectedCount} выбранным машинам
                      </p>
                    </div>
                    
                    <div className="py-2 space-y-1">
                      {bulkActions.map((action) => (
                        <button
                          key={action.id}
                          onClick={() => handleActionClick(action.id)}
                          className={`w-full flex items-start space-x-3 px-3 py-3 text-left rounded-lg transition-colors duration-200 ${
                            action.variant === 'danger' ?'hover:bg-error-50 text-error hover:text-error-700'
                              : action.variant === 'warning' ?'hover:bg-warning-50 text-warning hover:text-warning-700' :'hover:bg-secondary-100 text-text-primary hover:text-text-primary'
                          }`}
                        >
                          <Icon 
                            name={action.icon} 
                            size={16} 
                            className={`mt-0.5 ${
                              action.variant === 'danger' ? 'text-error' :
                              action.variant === 'warning'? 'text-warning' : 'text-text-secondary'
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium">
                              {action.label}
                            </div>
                            <div className="text-xs text-text-secondary mt-1">
                              {action.description}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsPanel;