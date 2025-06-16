import React from 'react';
import Icon from 'components/AppIcon';

const BulkActionsPanel = ({ selectedCount, onClearSelection }) => {
  return (
    <div className="bg-primary-50 border border-primary-100 rounded-lg px-5 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center">
            <Icon name="CheckSquare" size={18} />
          </div>
          <div>
            <h3 className="text-primary font-medium">Выбрано машин: {selectedCount}</h3>
            <p className="text-sm text-text-secondary">Выберите действие для выбранных машин</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <button className="inline-flex items-center space-x-2 px-3 py-1.5 bg-surface border border-border text-text-primary rounded-md hover:bg-secondary-50 transition-colors duration-200">
            <Icon name="Power" size={14} />
            <span className="text-sm">Перезагрузить</span>
          </button>
          <button className="inline-flex items-center space-x-2 px-3 py-1.5 bg-surface border border-border text-text-primary rounded-md hover:bg-secondary-50 transition-colors duration-200">
            <Icon name="RefreshCw" size={14} />
            <span className="text-sm">Обновить ПО</span>
          </button>
          <button className="inline-flex items-center space-x-2 px-3 py-1.5 bg-surface border border-border text-text-primary rounded-md hover:bg-secondary-50 transition-colors duration-200">
            <Icon name="Settings" size={14} />
            <span className="text-sm">Настройки</span>
          </button>
          <button 
            onClick={onClearSelection}
            className="inline-flex items-center space-x-2 px-3 py-1.5 text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <Icon name="X" size={14} />
            <span className="text-sm">Отменить выбор</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsPanel;