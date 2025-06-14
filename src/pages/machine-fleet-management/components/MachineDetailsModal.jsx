import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const MachineDetailsModal = ({ machine, onClose, getStatusColor, getStatusText }) => {
  const [activeTab, setActiveTab] = useState('overview');

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

  const tabs = [
    { id: 'overview', label: 'Обзор', icon: 'BarChart3' },
    { id: 'inventory', label: 'Запасы', icon: 'Package' },
    { id: 'transactions', label: 'Транзакции', icon: 'CreditCard' },
    { id: 'maintenance', label: 'Обслуживание', icon: 'Wrench' },
    { id: 'location', label: 'Местоположение', icon: 'MapPin' }
  ];

  const getInventoryStatus = (current, max) => {
    const percentage = (current / max) * 100;
    if (percentage >= 70) return { color: 'text-success', bg: 'bg-success', status: 'В наличии' };
    if (percentage >= 30) return { color: 'text-warning', bg: 'bg-warning', status: 'Заканчивается' };
    return { color: 'text-error', bg: 'bg-error', status: 'Требует пополнения' };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-300 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className={`w-3 h-3 rounded-full ${
              machine.status === 'online' ? 'bg-success' :
              machine.status === 'warning' ? 'bg-warning' : 'bg-error'
            }`}></div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-text-primary">
                {machine.name}
              </h2>
              <p className="text-sm text-text-secondary">
                {machine.id} • {machine.location}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              machine.status === 'online' ? 'bg-success-100 text-success' :
              machine.status === 'warning'? 'bg-warning-100 text-warning' : 'bg-error-100 text-error'
            }`}>
              {getStatusText(machine.status)}
            </span>
            
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
              aria-label="Close modal"
            >
              <Icon name="X" size={20} className="text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-secondary-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-secondary mb-1">Продажи за день</p>
                      <p className="text-2xl font-bold text-text-primary">
                        {formatCurrency(machine.dailySales)}
                      </p>
                    </div>
                    <Icon name="TrendingUp" size={24} className="text-success" />
                  </div>
                </div>

                <div className="bg-secondary-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-secondary mb-1">Уровень запасов</p>
                      <p className="text-2xl font-bold text-text-primary">
                        {machine.inventoryLevel}%
                      </p>
                    </div>
                    <Icon name="Package" size={24} className="text-primary" />
                  </div>
                </div>

                <div className="bg-secondary-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-secondary mb-1">Наличные</p>
                      <p className="text-2xl font-bold text-text-primary">
                        {formatCurrency(machine.cashLevel)}
                      </p>
                    </div>
                    <Icon name="Banknote" size={24} className="text-accent" />
                  </div>
                </div>
              </div>

              {/* Machine Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    Информация о машине
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Тип машины:</span>
                      <span className="text-text-primary font-medium">{machine.machineType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Температура:</span>
                      <span className="text-text-primary font-medium">
                        {machine.temperature ? `${machine.temperature}°C` : 'Н/Д'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Последняя связь:</span>
                      <span className="text-text-primary font-medium">
                        {formatDateTime(machine.lastCommunication)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    Местоположение
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-text-secondary block">Адрес:</span>
                      <span className="text-text-primary font-medium">{machine.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Координаты:</span>
                      <span className="text-text-primary font-medium">
                        {machine.coordinates.lat}, {machine.coordinates.lng}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  Текущие запасы
                </h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                  <Icon name="Plus" size={16} />
                  <span>Пополнить</span>
                </button>
              </div>

              <div className="space-y-4">
                {machine.inventory.map((item, index) => {
                  const status = getInventoryStatus(item.current, item.max);
                  const percentage = (item.current / item.max) * 100;
                  
                  return (
                    <div key={index} className="bg-secondary-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-text-primary">{item.product}</h4>
                          <p className="text-sm text-text-secondary">
                            {formatCurrency(item.price)} за единицу
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          status.color === 'text-success' ? 'bg-success-100 text-success' :
                          status.color === 'text-warning'? 'bg-warning-100 text-warning' : 'bg-error-100 text-error'
                        }`}>
                          {status.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-text-secondary">
                            {item.current} из {item.max} единиц
                          </span>
                          <span className={`font-medium ${status.color}`}>
                            {Math.round(percentage)}%
                          </span>
                        </div>
                        <div className="w-full bg-secondary-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${status.bg}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  Последние транзакции
                </h3>
                <button className="text-primary hover:text-primary-700 text-sm font-medium">
                  Показать все
                </button>
              </div>

              {machine.recentTransactions.length > 0 ? (
                <div className="space-y-3">
                  {machine.recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                          <Icon name="ShoppingCart" size={16} className="text-success" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{transaction.product}</p>
                          <p className="text-sm text-text-secondary">{transaction.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-text-primary">
                          {formatCurrency(transaction.amount)}
                        </p>
                        <p className="text-sm text-success">Успешно</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Icon name="CreditCard" size={48} className="text-text-muted mx-auto mb-4" />
                  <p className="text-text-secondary">Нет транзакций за сегодня</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  История обслуживания
                </h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                  <Icon name="Plus" size={16} />
                  <span>Запланировать</span>
                </button>
              </div>

              <div className="space-y-4">
                {machine.maintenanceHistory.map((record, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-secondary-50 rounded-lg">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icon name="Wrench" size={16} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-text-primary">{record.type}</h4>
                        <span className="text-sm text-text-secondary">{record.date}</span>
                      </div>
                      <p className="text-sm text-text-secondary">
                        Выполнил: {record.technician}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'location' && (
            <div className="space-y-6">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Местоположение машины
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Полный адрес
                    </label>
                    <p className="text-text-primary">{machine.address}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Координаты
                    </label>
                    <p className="text-text-primary">
                      {machine.coordinates.lat}, {machine.coordinates.lng}
                    </p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                      <Icon name="Navigation" size={16} />
                      <span>Проложить маршрут</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 text-text-primary rounded-lg hover:bg-secondary-200 transition-colors duration-200">
                      <Icon name="MapPin" size={16} />
                      <span>Показать на карте</span>
                    </button>
                  </div>
                </div>
                
                <div className="bg-secondary-100 rounded-lg overflow-hidden h-64">
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    title={machine.location}
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${machine.coordinates.lat},${machine.coordinates.lng}&z=16&output=embed`}
                    className="border-0"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-secondary-50">
          <div className="text-sm text-text-secondary">
            Последнее обновление: {formatDateTime(machine.lastCommunication)}
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-secondary-100 text-text-primary rounded-lg hover:bg-secondary-200 transition-colors duration-200">
              Настройки
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
              Обслуживание
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineDetailsModal;