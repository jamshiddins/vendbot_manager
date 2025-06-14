import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BulkActionsModal = ({ selectedProducts, onClose, onAction }) => {
  const [actionType, setActionType] = useState('');
  const [reorderPoint, setReorderPoint] = useState('');
  const [priceAdjustment, setPriceAdjustment] = useState('');
  const [adjustmentType, setAdjustmentType] = useState('percentage');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const actionData = {
      type: actionType,
      products: selectedProducts.map(p => p.id),
      data: {}
    };

    switch (actionType) {
      case 'update_reorder_point':
        actionData.data.reorderPoint = parseInt(reorderPoint);
        break;
      case 'adjust_price':
        actionData.data.adjustment = parseFloat(priceAdjustment);
        actionData.data.type = adjustmentType;
        break;
      case 'mark_for_restock':
        actionData.data.priority = 'high';
        break;
      default:
        break;
    }

    onAction(actionData);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(price);
  };

  const calculateNewPrice = (originalPrice) => {
    if (!priceAdjustment) return originalPrice;
    
    const adjustment = parseFloat(priceAdjustment);
    if (adjustmentType === 'percentage') {
      return originalPrice * (1 + adjustment / 100);
    } else {
      return originalPrice + adjustment;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-300 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Групповые действия
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Выбрано товаров: {selectedProducts.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Selected Products Preview */}
        <div className="p-6 border-b border-border bg-secondary-50">
          <h3 className="text-sm font-medium text-text-primary mb-3">
            Выбранные товары:
          </h3>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {selectedProducts.map((product) => (
              <span
                key={product.id}
                className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary rounded-full text-sm"
              >
                {product.name}
              </span>
            ))}
          </div>
        </div>

        {/* Action Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Action Type Selection */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Выберите действие:
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-secondary-50 cursor-pointer">
                  <input
                    type="radio"
                    name="actionType"
                    value="update_reorder_point"
                    checked={actionType === 'update_reorder_point'}
                    onChange={(e) => setActionType(e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertTriangle" size={16} className="text-warning" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        Обновить точку перезаказа
                      </p>
                      <p className="text-xs text-text-secondary">
                        Установить новый минимальный уровень запасов
                      </p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-secondary-50 cursor-pointer">
                  <input
                    type="radio"
                    name="actionType"
                    value="adjust_price"
                    checked={actionType === 'adjust_price'}
                    onChange={(e) => setActionType(e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <div className="flex items-center space-x-2">
                    <Icon name="DollarSign" size={16} className="text-success" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        Корректировка цен
                      </p>
                      <p className="text-xs text-text-secondary">
                        Изменить цены на выбранные товары
                      </p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-secondary-50 cursor-pointer">
                  <input
                    type="radio"
                    name="actionType"
                    value="mark_for_restock"
                    checked={actionType === 'mark_for_restock'}
                    onChange={(e) => setActionType(e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <div className="flex items-center space-x-2">
                    <Icon name="Package" size={16} className="text-primary" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        Отметить для пополнения
                      </p>
                      <p className="text-xs text-text-secondary">
                        Добавить в список приоритетного пополнения
                      </p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-secondary-50 cursor-pointer">
                  <input
                    type="radio"
                    name="actionType"
                    value="export_data"
                    checked={actionType === 'export_data'}
                    onChange={(e) => setActionType(e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <div className="flex items-center space-x-2">
                    <Icon name="Download" size={16} className="text-accent" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        Экспортировать данные
                      </p>
                      <p className="text-xs text-text-secondary">
                        Скачать информацию о выбранных товарах
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Action-specific inputs */}
            {actionType === 'update_reorder_point' && (
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Новая точка перезаказа:
                </label>
                <input
                  type="number"
                  value={reorderPoint}
                  onChange={(e) => setReorderPoint(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Введите количество"
                  min="0"
                  required
                />
                <p className="text-xs text-text-secondary mt-1">
                  Будет применено ко всем выбранным товарам
                </p>
              </div>
            )}

            {actionType === 'adjust_price' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Тип корректировки:
                  </label>
                  <select
                    value={adjustmentType}
                    onChange={(e) => setAdjustmentType(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="percentage">Процент (%)</option>
                    <option value="fixed">Фиксированная сумма (₽)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Значение корректировки:
                  </label>
                  <input
                    type="number"
                    value={priceAdjustment}
                    onChange={(e) => setPriceAdjustment(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={adjustmentType === 'percentage' ? 'Например: 10 (для +10%)' : 'Например: 5.50 (для +5.50₽)'}
                    step="0.01"
                    required
                  />
                  <p className="text-xs text-text-secondary mt-1">
                    {adjustmentType === 'percentage' ?'Положительное значение для увеличения, отрицательное для уменьшения' :'Положительное значение для увеличения, отрицательное для уменьшения'
                    }
                  </p>
                </div>

                {/* Price Preview */}
                {priceAdjustment && (
                  <div className="bg-secondary-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-text-primary mb-2">
                      Предварительный просмотр цен:
                    </h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {selectedProducts.slice(0, 3).map((product) => (
                        <div key={product.id} className="flex items-center justify-between text-sm">
                          <span className="text-text-secondary">{product.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-text-secondary line-through">
                              {formatPrice(product.price)}
                            </span>
                            <span className="text-primary font-medium">
                              {formatPrice(calculateNewPrice(product.price))}
                            </span>
                          </div>
                        </div>
                      ))}
                      {selectedProducts.length > 3 && (
                        <p className="text-xs text-text-muted">
                          ... и ещё {selectedProducts.length - 3} товаров
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={!actionType || (actionType === 'update_reorder_point' && !reorderPoint) || (actionType === 'adjust_price' && !priceAdjustment)}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Применить действие
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BulkActionsModal;