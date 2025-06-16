import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExportModal = ({ onClose, selectedCount, totalCount }) => {
  const [exportOptions, setExportOptions] = useState({
    format: 'excel',
    includeDetails: true,
    scope: selectedCount > 0 ? 'selected' : 'all'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExportOptions(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting with options:', exportOptions);
    
    // In a real app, this would trigger an API call to generate the export
    setTimeout(() => {
      onClose?.();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-secondary-900 bg-opacity-75 flex items-center justify-center z-400 p-4">
      <div className="bg-surface rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary flex items-center justify-center">
              <Icon name="Download" size={20} />
            </div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">Экспорт данных</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-secondary-100 transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Формат файла
            </label>
            <select
              name="format"
              value={exportOptions?.format}
              onChange={handleChange}
              className="w-full p-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="excel">Excel (.xlsx)</option>
              <option value="csv">CSV (.csv)</option>
              <option value="pdf">PDF (.pdf)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Объем данных
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="scope"
                  value="all"
                  checked={exportOptions?.scope === 'all'}
                  onChange={handleChange}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-text-primary">Все машины ({totalCount})</span>
              </label>
              <label className={`flex items-center space-x-2 ${selectedCount === 0 ? 'opacity-50 pointer-events-none' : ''}`}>
                <input
                  type="radio"
                  name="scope"
                  value="selected"
                  checked={exportOptions?.scope === 'selected'}
                  onChange={handleChange}
                  disabled={selectedCount === 0}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-text-primary">Выбранные машины ({selectedCount})</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="includeDetails"
                checked={exportOptions?.includeDetails}
                onChange={handleChange}
                className="rounded border-secondary-300 text-primary focus:ring-primary"
              />
              <span className="text-text-secondary">Включить расширенные данные (история обслуживания, запасы)</span>
            </label>
          </div>
          
          <div className="bg-secondary-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Info" size={18} className="text-text-secondary" />
              <p className="text-sm text-text-secondary">
                Экспорт может занять некоторое время в зависимости от объема данных.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-5 flex justify-between">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-surface border border-border text-text-primary rounded-lg hover:bg-secondary-50 transition-colors duration-200"
          >
            Отмена
          </button>
          <button 
            onClick={handleExport}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            <Icon name="Download" size={16} />
            <span>Экспортировать</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;