import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import ProductsPricingTab from './ProductsPricingTab';
import HardwareConfigTab from './HardwareConfigTab';
import NetworkSettingsTab from './NetworkSettingsTab';
import OperationalParametersTab from './OperationalParametersTab';

const ConfigurationWorkspace = ({
  machine,
  activeTab,
  onTabChange,
  onSync,
  syncStatus,
  isLoading
}) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [changeHistory, setChangeHistory] = useState([
    {
      id: 1,
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      user: 'Иван Петров',
      action: 'Изменение цены',
      details: 'Кока-Кола: 85₽ → 90₽',
      category: 'products'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      user: 'Анна Сидорова',
      action: 'Настройка температуры',
      details: 'Диапазон: 2-6°C → 3-7°C',
      category: 'hardware'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      user: 'Михаил Козлов',
      action: 'Обновление сети',
      details: 'WiFi пароль изменен',
      category: 'network'
    }
  ]);

  const tabs = [
    {
      id: 'products',
      label: 'Товары и цены',
      icon: 'Package',
      component: ProductsPricingTab
    },
    {
      id: 'hardware',
      label: 'Оборудование',
      icon: 'Cpu',
      component: HardwareConfigTab
    },
    {
      id: 'network',
      label: 'Сеть',
      icon: 'Wifi',
      component: NetworkSettingsTab
    },
    {
      id: 'operational',
      label: 'Операционные',
      icon: 'Settings',
      component: OperationalParametersTab
    }
  ];

  const handleConfigChange = () => {
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    setHasUnsavedChanges(false);
    onSync();
    
    // Add to change history
    const newChange = {
      id: changeHistory.length + 1,
      timestamp: new Date(),
      user: 'Иван Петров',
      action: 'Сохранение конфигурации',
      details: `Вкладка: ${tabs.find(t => t.id === activeTab)?.label}`,
      category: activeTab
    };
    setChangeHistory(prev => [newChange, ...prev]);
  };

  const handleReset = () => {
    setHasUnsavedChanges(false);
    // Reset logic would go here
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'offline': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-success';
      case 'warning': return 'text-warning';
      case 'offline': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const ActiveTabComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Machine Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Icon 
                name={getStatusIcon(machine.status)} 
                size={20} 
                className={getStatusColor(machine.status)} 
              />
              <div>
                <h2 className="text-xl font-heading font-semibold text-text-primary">
                  {machine.name}
                </h2>
                <p className="text-sm text-text-secondary">{machine.id}</p>
              </div>
            </div>
            
            {syncStatus && (
              <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-secondary-100">
                {syncStatus === 'syncing' && (
                  <>
                    <Icon name="Loader2" size={14} className="text-primary animate-spin" />
                    <span className="text-sm text-primary">Синхронизация...</span>
                  </>
                )}
                {syncStatus === 'success' && (
                  <>
                    <Icon name="CheckCircle" size={14} className="text-success" />
                    <span className="text-sm text-success">Синхронизировано</span>
                  </>
                )}
                {syncStatus === 'error' && (
                  <>
                    <Icon name="XCircle" size={14} className="text-error" />
                    <span className="text-sm text-error">Ошибка синхронизации</span>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {hasUnsavedChanges && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span className="text-sm text-warning">Несохраненные изменения</span>
              </div>
            )}
            
            <button
              onClick={handleReset}
              disabled={!hasUnsavedChanges}
              className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              type="button"
            >
              Сбросить
            </button>
            
            <button
              onClick={handleSave}
              disabled={!hasUnsavedChanges || isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              type="button"
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  <span>Сохранение...</span>
                </>
              ) : (
                <>
                  <Icon name="Save" size={16} />
                  <span>Сохранить</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Machine Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center p-3 bg-secondary-50 rounded-lg">
            <p className="text-sm font-medium text-text-primary">
              {machine.temperature ? `${machine.temperature}°C` : 'N/A'}
            </p>
            <p className="text-xs text-text-secondary">Температура</p>
          </div>
          <div className="text-center p-3 bg-secondary-50 rounded-lg">
            <p className="text-sm font-medium text-text-primary">{machine.products}</p>
            <p className="text-xs text-text-secondary">Товаров</p>
          </div>
          <div className="text-center p-3 bg-secondary-50 rounded-lg">
            <p className="text-sm font-medium text-text-primary">
              {machine.revenue.toLocaleString('ru-RU')} ₽
            </p>
            <p className="text-xs text-text-secondary">Выручка</p>
          </div>
          <div className="text-center p-3 bg-secondary-50 rounded-lg">
            <p className="text-sm font-medium text-text-primary">
              {new Date(machine.lastSync).toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            <p className="text-xs text-text-secondary">Последняя синхронизация</p>
          </div>
        </div>
      </div>

      {/* Configuration Tabs */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary text-primary bg-primary-50' :'border-transparent text-text-secondary hover:text-text-primary hover:bg-secondary-50'
              }`}
              type="button"
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {ActiveTabComponent && (
          <ActiveTabComponent
            machine={machine}
            onChange={handleConfigChange}
          />
        )}
      </div>

      {/* Change History */}
      <div className="border-t border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          История изменений
        </h3>
        
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {changeHistory.map(change => (
            <div key={change.id} className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon name="Clock" size={14} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-text-primary">{change.action}</p>
                  <span className="px-2 py-1 text-xs bg-secondary-200 text-text-secondary rounded-full">
                    {change.category}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">{change.details}</p>
                <p className="text-xs text-text-muted">
                  {change.user} • {change.timestamp.toLocaleString('ru-RU')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfigurationWorkspace;