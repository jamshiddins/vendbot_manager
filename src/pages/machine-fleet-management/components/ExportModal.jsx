import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExportModal = ({ onClose, onExport, totalRecords }) => {
  const [exportFormat, setExportFormat] = useState('excel');
  const [exportOptions, setExportOptions] = useState({
    includeTransactions: true,
    includeInventory: true,
    includeMaintenance: false,
    dateRange: 'all'
  });

  const formatOptions = [
    {
      id: 'excel',
      name: 'Excel (.xlsx)',
      description: 'Подходит для анализа данных и создания отчетов',
      icon: 'FileSpreadsheet'
    },
    {
      id: 'csv',
      name: 'CSV (.csv)',
      description: 'Универсальный формат для импорта в другие системы',
      icon: 'FileText'
    },
    {
      id: 'pdf',
      name: 'PDF (.pdf)',
      description: 'Готовый к печати отчет с форматированием',
      icon: 'FileImage'
    }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'Все время' },
    { value: 'today', label: 'Сегодня' },
    { value: 'week', label: 'Эта неделя' },
    { value: 'month', label: 'Этот месяц' },
    { value: 'quarter', label: 'Этот квартал' },
    { value: 'year', label: 'Этот год' }
  ];

  const handleOptionChange = (key, value) => {
    setExportOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleExport = () => {
    onExport(exportFormat, exportOptions);
  };

  const getEstimatedSize = () => {
    let baseSize = totalRecords * 0.5; // KB per record
    if (exportOptions.includeTransactions) baseSize *= 1.5;
    if (exportOptions.includeInventory) baseSize *= 1.3;
    if (exportOptions.includeMaintenance) baseSize *= 1.2;
    
    if (baseSize < 1024) {
      return `~${Math.round(baseSize)} КБ`;
    } else {
      return `~${Math.round(baseSize / 1024 * 10) / 10} МБ`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-300 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-lg w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Экспорт данных
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Выберите формат и параметры экспорта
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Format Selection */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
              Формат файла
            </h3>
            <div className="space-y-3">
              {formatOptions.map((format) => (
                <label
                  key={format.id}
                  className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                    exportFormat === format.id
                      ? 'border-primary bg-primary-50' :'border-border hover:bg-secondary-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="exportFormat"
                    value={format.id}
                    checked={exportFormat === format.id}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="w-4 h-4 text-primary bg-surface border-border focus:ring-primary focus:ring-2 mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Icon name={format.icon} size={16} className="text-text-secondary" />
                      <span className="font-medium text-text-primary">{format.name}</span>
                    </div>
                    <p className="text-sm text-text-secondary mt-1">
                      {format.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
              Включить в экспорт
            </h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={exportOptions.includeTransactions}
                  onChange={(e) => handleOptionChange('includeTransactions', e.target.checked)}
                  className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
                />
                <div>
                  <span className="text-text-primary font-medium">История транзакций</span>
                  <p className="text-sm text-text-secondary">Данные о продажах и операциях</p>
                </div>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={exportOptions.includeInventory}
                  onChange={(e) => handleOptionChange('includeInventory', e.target.checked)}
                  className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
                />
                <div>
                  <span className="text-text-primary font-medium">Данные о запасах</span>
                  <p className="text-sm text-text-secondary">Текущие остатки товаров</p>
                </div>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={exportOptions.includeMaintenance}
                  onChange={(e) => handleOptionChange('includeMaintenance', e.target.checked)}
                  className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
                />
                <div>
                  <span className="text-text-primary font-medium">История обслуживания</span>
                  <p className="text-sm text-text-secondary">Записи о техническом обслуживании</p>
                </div>
              </label>
            </div>
          </div>

          {/* Date Range */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
              Временной период
            </h3>
            <select
              value={exportOptions.dateRange}
              onChange={(e) => handleOptionChange('dateRange', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {dateRangeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Export Summary */}
          <div className="bg-secondary-50 rounded-lg p-4">
            <h4 className="font-medium text-text-primary mb-2">Сводка экспорта</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Количество записей:</span>
                <span className="text-text-primary font-medium">{totalRecords}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Формат файла:</span>
                <span className="text-text-primary font-medium">
                  {formatOptions.find(f => f.id === exportFormat)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Примерный размер:</span>
                <span className="text-text-primary font-medium">{getEstimatedSize()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-secondary-50">
          <div className="text-sm text-text-secondary">
            Файл будет загружен в папку "Загрузки"
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-secondary-100 text-text-primary rounded-lg hover:bg-secondary-200 transition-colors duration-200"
            >
              Отмена
            </button>
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              <Icon name="Download" size={16} />
              <span>Экспортировать</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;