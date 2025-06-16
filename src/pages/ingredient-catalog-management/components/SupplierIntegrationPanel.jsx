// src/pages/ingredient-catalog-management/components/SupplierIntegrationPanel.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SupplierIntegrationPanel = ({ suppliers }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    email: '',
    phone: '',
    apiEndpoint: '',
    apiKey: '',
    integrationType: 'manual'
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'text-success-600 bg-success-50';
      case 'pending':
        return 'text-warning-600 bg-warning-50';
      case 'error':
        return 'text-error-600 bg-error-50';
      case 'disconnected':
        return 'text-text-secondary bg-secondary-100';
      default:
        return 'text-text-secondary bg-secondary-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'connected':
        return 'Подключен';
      case 'pending':
        return 'Ожидание';
      case 'error':
        return 'Ошибка';
      case 'disconnected':
        return 'Отключен';
      default:
        return status;
    }
  };

  const handleAddSupplier = () => {
    // Here you would typically send the data to your backend
    console.log('Adding supplier:', newSupplier);
    setIsAddModalOpen(false);
    setNewSupplier({
      name: '',
      email: '',
      phone: '',
      apiEndpoint: '',
      apiKey: '',
      integrationType: 'manual'
    });
  };

  const handleSupplierAction = (supplierId, action) => {
    console.log('Supplier action:', supplierId, action);
    // Handle supplier actions like sync, disconnect, etc.
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Truck" size={20} className="text-primary" />
            <div>
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Интеграция поставщиков
              </h3>
              <p className="text-sm text-text-secondary">
                Управление подключениями и автоматическими заказами
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center space-x-2 px-3 py-2 text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors"
            >
              <Icon name="Plus" size={16} />
              <span>Добавить поставщика</span>
            </button>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-text-secondary hover:text-primary transition-colors"
            >
              <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Supplier Stats */}
      <div className="p-4 bg-secondary-50 border-b border-border">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success-600">
              {suppliers?.filter(s => s.status === 'connected').length || 0}
            </div>
            <div className="text-sm text-text-secondary">Подключено</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning-600">
              {suppliers?.filter(s => s.status === 'pending').length || 0}
            </div>
            <div className="text-sm text-text-secondary">Ожидание</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {suppliers?.reduce((acc, s) => acc + (s.orders || 0), 0) || 0}
            </div>
            <div className="text-sm text-text-secondary">Заказов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">
              {suppliers?.length || 0}
            </div>
            <div className="text-sm text-text-secondary">Всего</div>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4">
          <div className="space-y-4">
            {suppliers?.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="Truck" size={48} className="mx-auto mb-4 text-text-secondary" />
                <h4 className="text-lg font-medium text-text-primary mb-2">
                  Нет подключенных поставщиков
                </h4>
                <p className="text-text-secondary mb-4">
                  Добавьте поставщиков для автоматизации заказов
                </p>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Добавить первого поставщика
                </button>
              </div>
            ) : (
              suppliers?.map(supplier => (
                <div
                  key={supplier.id}
                  className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                        <Icon name="Building" size={20} className="text-text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-text-primary">{supplier.name}</h4>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getStatusColor(supplier.status)}`}
                          >
                            {getStatusText(supplier.status)}
                          </span>
                          <span className="text-sm text-text-secondary">
                            {supplier.orders} заказов
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {supplier.status === 'connected' && (
                        <button
                          onClick={() => handleSupplierAction(supplier.id, 'sync')}
                          className="p-2 text-text-secondary hover:text-primary transition-colors"
                          title="Синхронизировать"
                        >
                          <Icon name="RefreshCw" size={16} />
                        </button>
                      )}
                      
                      <button
                        onClick={() => setSelectedSupplier(supplier)}
                        className="p-2 text-text-secondary hover:text-primary transition-colors"
                        title="Настройки"
                      >
                        <Icon name="Settings" size={16} />
                      </button>
                      
                      <button
                        onClick={() => handleSupplierAction(supplier.id, 'disconnect')}
                        className="p-2 text-text-secondary hover:text-error-600 transition-colors"
                        title="Отключить"
                      >
                        <Icon name="Unlink" size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {supplier.status === 'error' && (
                    <div className="flex items-start space-x-2 p-3 bg-error-50 border border-error-200 rounded-lg">
                      <Icon name="AlertTriangle" size={16} className="text-error-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-error-900">Ошибка подключения</p>
                        <p className="text-sm text-error-700">Проверьте настройки API или обратитесь к поставщику</p>
                        <button
                          onClick={() => handleSupplierAction(supplier.id, 'retry')}
                          className="text-sm text-error-600 font-medium hover:text-error-700 mt-1"
                        >
                          Попробовать снова
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {supplier.status === 'pending' && (
                    <div className="flex items-center space-x-2 p-3 bg-warning-50 border border-warning-200 rounded-lg">
                      <Icon name="Clock" size={16} className="text-warning-600" />
                      <p className="text-sm text-warning-700">
                        Ожидается подтверждение от поставщика
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
      
      {/* Add Supplier Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-text-primary">
                Добавить поставщика
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Название поставщика
                </label>
                <input
                  type="text"
                  value={newSupplier.name}
                  onChange={(e) => setNewSupplier(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Название компании"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newSupplier.email}
                    onChange={(e) => setNewSupplier(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={newSupplier.phone}
                    onChange={(e) => setNewSupplier(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Тип интеграции
                </label>
                <select
                  value={newSupplier.integrationType}
                  onChange={(e) => setNewSupplier(prev => ({ ...prev, integrationType: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="manual">Ручные заказы</option>
                  <option value="api">API интеграция</option>
                  <option value="email">Email автоматизация</option>
                </select>
              </div>
              
              {newSupplier.integrationType === 'api' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      API Endpoint
                    </label>
                    <input
                      type="url"
                      value={newSupplier.apiEndpoint}
                      onChange={(e) => setNewSupplier(prev => ({ ...prev, apiEndpoint: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="https://api.supplier.com/v1"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      API Key
                    </label>
                    <input
                      type="password"
                      value={newSupplier.apiKey}
                      onChange={(e) => setNewSupplier(prev => ({ ...prev, apiKey: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Введите API ключ"
                    />
                  </div>
                </>
              )}
            </div>
            
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-secondary-50 transition-colors"
              >
                Отменить
              </button>
              <button
                onClick={handleAddSupplier}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierIntegrationPanel;