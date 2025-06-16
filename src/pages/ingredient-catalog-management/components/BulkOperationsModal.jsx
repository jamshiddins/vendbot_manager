// src/pages/ingredient-catalog-management/components/BulkOperationsModal.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BulkOperationsModal = ({ selectedIngredients, onClose, onApply }) => {
  const [operation, setOperation] = useState('update_prices');
  const [operationData, setOperationData] = useState({
    priceChange: { type: 'percentage', value: 0 },
    statusChange: 'active',
    supplierChange: '',
    categoryChange: '',
    stockUpdate: { type: 'set', value: 0 }
  });

  const operations = [
    { id: 'update_prices', name: 'Обновить цены', icon: 'DollarSign' },
    { id: 'change_status', name: 'Изменить статус', icon: 'ToggleLeft' },
    { id: 'update_supplier', name: 'Изменить поставщика', icon: 'Truck' },
    { id: 'move_category', name: 'Переместить в категорию', icon: 'FolderOpen' },
    { id: 'update_stock', name: 'Обновить остатки', icon: 'Package' },
    { id: 'delete', name: 'Удалить', icon: 'Trash2', danger: true }
  ];

  const handleOperationDataChange = (field, value) => {
    setOperationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApply = () => {
    onApply(operation, operationData);
  };

  const renderOperationForm = () => {
    switch (operation) {
      case 'update_prices':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Тип изменения цены
              </label>
              <select
                value={operationData.priceChange.type}
                onChange={(e) => handleOperationDataChange('priceChange', {
                  ...operationData.priceChange,
                  type: e.target.value
                })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="percentage">Процент</option>
                <option value="fixed">Фиксированная сумма</option>
                <option value="set">Установить цену</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {operationData.priceChange.type === 'percentage' ?'Изменение в процентах (%)'
                  : operationData.priceChange.type === 'fixed' ?'Изменение в рублях' :'Новая цена (₽)'}
              </label>
              <input
                type="number"
                step="0.01"
                value={operationData.priceChange.value}
                onChange={(e) => handleOperationDataChange('priceChange', {
                  ...operationData.priceChange,
                  value: parseFloat(e.target.value) || 0
                })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>
        );
        
      case 'change_status':
        return (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Новый статус
            </label>
            <select
              value={operationData.statusChange}
              onChange={(e) => handleOperationDataChange('statusChange', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="active">Активен</option>
              <option value="low_stock">Мало на складе</option>
              <option value="out_of_stock">Нет в наличии</option>
              <option value="discontinued">Снят с производства</option>
            </select>
          </div>
        );
        
      case 'update_supplier':
        return (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Новый поставщик
            </label>
            <input
              type="text"
              value={operationData.supplierChange}
              onChange={(e) => handleOperationDataChange('supplierChange', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Название поставщика"
            />
          </div>
        );
        
      case 'move_category':
        return (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Новая категория
            </label>
            <select
              value={operationData.categoryChange}
              onChange={(e) => handleOperationDataChange('categoryChange', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Выберите категорию</option>
              <option value="hot_drinks">Горячие напитки</option>
              <option value="cold_drinks">Холодные напитки</option>
              <option value="energy_drinks">Энергетики</option>
              <option value="chips">Чипсы</option>
              <option value="cookies">Печенье</option>
              <option value="nuts">Орехи</option>
              <option value="coffee_beans">Кофейные зерна</option>
              <option value="milk_products">Молочные продукты</option>
              <option value="syrups">Сиропы</option>
            </select>
          </div>
        );
        
      case 'update_stock':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Операция с остатками
              </label>
              <select
                value={operationData.stockUpdate.type}
                onChange={(e) => handleOperationDataChange('stockUpdate', {
                  ...operationData.stockUpdate,
                  type: e.target.value
                })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="set">Установить количество</option>
                <option value="add">Добавить к текущим остаткам</option>
                <option value="subtract">Вычесть из текущих остатков</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Количество
              </label>
              <input
                type="number"
                min="0"
                value={operationData.stockUpdate.value}
                onChange={(e) => handleOperationDataChange('stockUpdate', {
                  ...operationData.stockUpdate,
                  value: parseInt(e.target.value, 10) || 0
                })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>
        );
        
      case 'delete':
        return (
          <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-error-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-error-900 mb-1">
                  Подтверждение удаления
                </h4>
                <p className="text-sm text-error-700">
                  Это действие необратимо. Все выбранные ингредиенты будут безвозвратно удалены из системы.
                </p>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  const selectedOperation = operations.find(op => op.id === operation);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Массовые операции
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Selected Items Info */}
          <div className="p-4 bg-info-50 border border-info-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Info" size={16} className="text-info-600" />
              <span className="font-medium text-info-900">
                Выбрано ингредиентов: {selectedIngredients?.length || 0}
              </span>
            </div>
            <div className="text-sm text-info-700">
              {selectedIngredients?.slice(0, 3).map(ingredient => ingredient?.name).join(', ')}
              {selectedIngredients?.length > 3 && ` и еще ${selectedIngredients.length - 3}`}
            </div>
          </div>
          
          {/* Operation Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Выберите операцию
            </label>
            <div className="grid grid-cols-2 gap-2">
              {operations.map(op => (
                <button
                  key={op.id}
                  onClick={() => setOperation(op.id)}
                  className={`p-3 text-left border rounded-lg transition-colors ${
                    operation === op.id
                      ? op.danger
                        ? 'border-error-300 bg-error-50 text-error-900' :'border-primary bg-primary/10 text-primary' :'border-border hover:bg-secondary-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon
                      name={op.icon}
                      size={16}
                      className={operation === op.id && op.danger ? 'text-error-600' : ''}
                    />
                    <span className="text-sm font-medium">{op.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Operation Form */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">
              {selectedOperation?.name}
            </h3>
            {renderOperationForm()}
          </div>
        </div>
        
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-secondary-50 transition-colors"
          >
            Отменить
          </button>
          <button
            onClick={handleApply}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedOperation?.danger
                ? 'bg-error-600 text-white hover:bg-error-700' :'bg-primary text-white hover:bg-primary-700'
            }`}
          >
            Применить
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkOperationsModal;