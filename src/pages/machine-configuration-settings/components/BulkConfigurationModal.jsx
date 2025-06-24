import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BulkConfigurationModal = ({ 
  isOpen, 
  onClose, 
  selectedMachines, 
  onSync, 
  isLoading, 
  templates 
}) => {
  const [activeTab, setActiveTab] = useState('template');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customConfig, setCustomConfig] = useState({
    operatingHours: {
      enabled: false,
      start: '08:00',
      end: '22:00'
    },
    temperature: {
      enabled: false,
      target: 4.0,
      min: 2.0,
      max: 8.0
    },
    pricing: {
      enabled: false,
      adjustment: 'percentage',
      value: 0
    },
    alerts: {
      enabled: false,
      lowStock: 20,
      temperature: true
    }
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    const template = templates?.find(t => t.id === templateId);
    if (template) {
      // Convert template settings to custom config format
      setCustomConfig({
        operatingHours: {
          enabled: true,
          start: template.settings?.operatingHours?.start,
          end: template.settings?.operatingHours?.end
        },
        temperature: {
          enabled: true,
          target: (template.settings?.temperature?.min + template.settings?.temperature?.max) / 2,
          min: template.settings?.temperature?.min,
          max: template.settings?.temperature?.max
        },
        pricing: {
          enabled: false,
          adjustment: 'percentage',
          value: 0
        },
        alerts: {
          enabled: true,
          lowStock: 20,
          temperature: true
        }
      });
    }
  };

  const handleCustomConfigUpdate = (section, field, value) => {
    setCustomConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleApplyConfiguration = () => {
    if (!selectedMachines?.length) return;
    
    setPreviewMode(false);
    onSync();
  };

  const getAffectedMachinesCount = () => {
    return selectedMachines?.length || 0;
  };

  const getConfigurationSummary = () => {
    const summary = [];
    
    if (activeTab === 'template' && selectedTemplate) {
      const template = templates?.find(t => t.id === selectedTemplate);
      if (template) {
        summary.push(`Шаблон: ${template.name}`);
        summary.push(`Часы работы: ${template.settings?.operatingHours?.start} - ${template.settings?.operatingHours?.end}`);
        summary.push(`Температура: ${template.settings?.temperature?.min}°C - ${template.settings?.temperature?.max}°C`);
      }
    } else {
      if (customConfig?.operatingHours?.enabled) {
        summary.push(`Часы работы: ${customConfig.operatingHours.start} - ${customConfig.operatingHours.end}`);
      }
      if (customConfig?.temperature?.enabled) {
        summary.push(`Температура: ${customConfig.temperature.min}°C - ${customConfig.temperature.max}°C`);
      }
      if (customConfig?.pricing?.enabled) {
        summary.push(`Цены: ${customConfig.pricing.adjustment === 'percentage' ? 
          `${customConfig.pricing.value > 0 ? '+' : ''}${customConfig.pricing.value}%` : 
          `${customConfig.pricing.value > 0 ? '+' : ''}${customConfig.pricing.value}₽`}`);
      }
      if (customConfig?.alerts?.enabled) {
        summary.push(`Уведомления: порог остатков ${customConfig.alerts.lowStock}%`);
      }
    }
    
    return summary;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-300 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Массовая настройка машин
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Выбрано машин: {getAffectedMachinesCount()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary-100 rounded-lg transition-colors duration-200"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {!previewMode ? (
            <div className="p-6">
              {/* Tab Navigation */}
              <div className="flex space-x-1 mb-6 bg-secondary-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('template')}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    activeTab === 'template' ?'bg-white text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Использовать шаблон
                </button>
                <button
                  onClick={() => setActiveTab('custom')}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    activeTab === 'custom' ?'bg-white text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Настроить вручную
                </button>
              </div>

              {/* Template Tab */}
              {activeTab === 'template' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    Выберите шаблон конфигурации
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {templates?.map(template => (
                      <div
                        key={template.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedTemplate === template.id
                            ? 'border-primary bg-primary-50' :'border-border hover:border-primary-300 hover:bg-secondary-50'
                        }`}
                        onClick={() => handleTemplateSelect(template.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-text-primary">{template.name}</h4>
                          <div className="flex items-center space-x-1">
                            <Icon name="Users" size={14} className="text-text-secondary" />
                            <span className="text-xs text-text-secondary">{template.usageCount}</span>
                          </div>
                        </div>
                        <p className="text-sm text-text-secondary mb-3">{template.description}</p>
                        
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Часы работы:</span>
                            <span className="text-text-primary">
                              {template.settings?.operatingHours?.start} - {template.settings?.operatingHours?.end}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Температура:</span>
                            <span className="text-text-primary">
                              {template.settings?.temperature?.min}°C - {template.settings?.temperature?.max}°C
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Макс. сумма:</span>
                            <span className="text-text-primary">
                              {template.settings?.maxTransactionAmount}₽
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Tab */}
              {activeTab === 'custom' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    Настройка параметров
                  </h3>

                  {/* Operating Hours */}
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-text-primary">Часы работы</h4>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={customConfig.operatingHours.enabled}
                          onChange={(e) => handleCustomConfigUpdate('operatingHours', 'enabled', e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          customConfig.operatingHours.enabled ? 'bg-success' : 'bg-secondary-300'
                        }`}>
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            customConfig.operatingHours.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </div>
                      </label>
                    </div>

                    {customConfig.operatingHours.enabled && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Время открытия
                          </label>
                          <input
                            type="time"
                            value={customConfig.operatingHours.start}
                            onChange={(e) => handleCustomConfigUpdate('operatingHours', 'start', e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Время закрытия
                          </label>
                          <input
                            type="time"
                            value={customConfig.operatingHours.end}
                            onChange={(e) => handleCustomConfigUpdate('operatingHours', 'end', e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Temperature */}
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-text-primary">Температурный режим</h4>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={customConfig.temperature.enabled}
                          onChange={(e) => handleCustomConfigUpdate('temperature', 'enabled', e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          customConfig.temperature.enabled ? 'bg-success' : 'bg-secondary-300'
                        }`}>
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            customConfig.temperature.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </div>
                      </label>
                    </div>

                    {customConfig.temperature.enabled && (
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Целевая (°C)
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={customConfig.temperature.target}
                            onChange={(e) => handleCustomConfigUpdate('temperature', 'target', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Минимум (°C)
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={customConfig.temperature.min}
                            onChange={(e) => handleCustomConfigUpdate('temperature', 'min', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Максимум (°C)
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={customConfig.temperature.max}
                            onChange={(e) => handleCustomConfigUpdate('temperature', 'max', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-text-primary">Корректировка цен</h4>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={customConfig.pricing.enabled}
                          onChange={(e) => handleCustomConfigUpdate('pricing', 'enabled', e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          customConfig.pricing.enabled ? 'bg-success' : 'bg-secondary-300'
                        }`}>
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            customConfig.pricing.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </div>
                      </label>
                    </div>

                    {customConfig.pricing.enabled && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Тип корректировки
                          </label>
                          <select
                            value={customConfig.pricing.adjustment}
                            onChange={(e) => handleCustomConfigUpdate('pricing', 'adjustment', e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="percentage">Процент (%)</option>
                            <option value="fixed">Фиксированная сумма (₽)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Значение
                          </label>
                          <input
                            type="number"
                            value={customConfig.pricing.value}
                            onChange={(e) => handleCustomConfigUpdate('pricing', 'value', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Alerts */}
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-text-primary">Уведомления</h4>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={customConfig.alerts.enabled}
                          onChange={(e) => handleCustomConfigUpdate('alerts', 'enabled', e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          customConfig.alerts.enabled ? 'bg-success' : 'bg-secondary-300'
                        }`}>
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            customConfig.alerts.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </div>
                      </label>
                    </div>

                    {customConfig.alerts.enabled && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Порог низкого остатка (%)
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="50"
                            value={customConfig.alerts.lowStock}
                            onChange={(e) => handleCustomConfigUpdate('alerts', 'lowStock', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-text-primary">
                            Температурные уведомления
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={customConfig.alerts.temperature}
                              onChange={(e) => handleCustomConfigUpdate('alerts', 'temperature', e.target.checked)}
                              className="sr-only"
                            />
                            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              customConfig.alerts.temperature ? 'bg-success' : 'bg-secondary-300'
                            }`}>
                              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                customConfig.alerts.temperature ? 'translate-x-6' : 'translate-x-1'
                              }`} />
                            </div>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Preview Mode */
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                  Предварительный просмотр изменений
                </h3>
                <p className="text-sm text-text-secondary">
                  Проверьте настройки перед применением к {getAffectedMachinesCount()} машинам
                </p>
              </div>

              {/* Configuration Summary */}
              <div className="bg-secondary-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-text-primary mb-3">Применяемые настройки:</h4>
                <div className="space-y-2">
                  {getConfigurationSummary().map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={14} className="text-success" />
                      <span className="text-sm text-text-primary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Affected Machines List */}
              <div className="border border-border rounded-lg">
                <div className="p-4 border-b border-border">
                  <h4 className="font-medium text-text-primary">Затронутые машины</h4>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {selectedMachines?.map(machine => (
                    <div key={machine.id} className="flex items-center justify-between p-3 border-b border-border last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          machine.status === 'online' ? 'bg-success' :
                          machine.status === 'warning' ? 'bg-warning' : 'bg-error'
                        }`}></div>
                        <div>
                          <p className="text-sm font-medium text-text-primary">{machine.name}</p>
                          <p className="text-xs text-text-secondary">{machine.id}</p>
                        </div>
                      </div>
                      <span className="text-xs text-text-secondary capitalize">
                        {machine.status === 'online' ? 'В сети' :
                         machine.status === 'warning' ? 'Предупреждение' : 'Не в сети'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Отмена
          </button>
          
          <div className="flex items-center space-x-3">
            {!previewMode ? (
              <button
                onClick={() => setPreviewMode(true)}
                disabled={
                  (activeTab === 'template' && !selectedTemplate) ||
                  (activeTab === 'custom' && !Object.values(customConfig).some(config => config.enabled))
                }
                className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 text-text-primary rounded-lg hover:bg-secondary-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Icon name="Eye" size={16} />
                <span>Предварительный просмотр</span>
              </button>
            ) : (
              <button
                onClick={() => setPreviewMode(false)}
                className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 text-text-primary rounded-lg hover:bg-secondary-200 transition-colors duration-200"
              >
                <Icon name="ArrowLeft" size={16} />
                <span>Назад к настройкам</span>
              </button>
            )}
            
            <button
              onClick={handleApplyConfiguration}
              disabled={
                isLoading ||
                !selectedMachines?.length ||
                (activeTab === 'template' && !selectedTemplate) ||
                (activeTab === 'custom' && !Object.values(customConfig).some(config => config.enabled))
              }
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  <span>Применение...</span>
                </>
              ) : (
                <>
                  <Icon name="Check" size={16} />
                  <span>Применить к {getAffectedMachinesCount()} машинам</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkConfigurationModal;