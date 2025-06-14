import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const InventoryTable = ({
  products,
  selectedProducts,
  sortConfig,
  onSort,
  onProductSelect,
  onSelectAll,
  onProductDetails,
  getStockStatus,
  getStockColor,
  getStockLabel
}) => {
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const getStockPercentage = (current, total) => {
    return Math.round((current / total) * 100);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-secondary-50 border-b border-border">
          <tr>
            <th className="px-4 py-3 text-left">
              <input
                type="checkbox"
                checked={selectedProducts.length === products.length && products.length > 0}
                onChange={onSelectAll}
                className="rounded border-border focus:ring-primary"
              />
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
              Товар
            </th>
            <th 
              className="px-4 py-3 text-left text-sm font-medium text-text-secondary cursor-pointer hover:text-text-primary transition-colors duration-200"
              onClick={() => onSort('name')}
            >
              <div className="flex items-center space-x-1">
                <span>Название</span>
                <Icon name={getSortIcon('name')} size={14} />
              </div>
            </th>
            <th 
              className="px-4 py-3 text-left text-sm font-medium text-text-secondary cursor-pointer hover:text-text-primary transition-colors duration-200"
              onClick={() => onSort('currentStock')}
            >
              <div className="flex items-center space-x-1">
                <span>Запас</span>
                <Icon name={getSortIcon('currentStock')} size={14} />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
              Статус
            </th>
            <th 
              className="px-4 py-3 text-left text-sm font-medium text-text-secondary cursor-pointer hover:text-text-primary transition-colors duration-200"
              onClick={() => onSort('price')}
            >
              <div className="flex items-center space-x-1">
                <span>Цена</span>
                <Icon name={getSortIcon('price')} size={14} />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
              Поставщик
            </th>
            <th className="px-4 py-3 text-center text-sm font-medium text-text-secondary">
              Действия
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((product) => {
            const status = getStockStatus(product);
            const percentage = getStockPercentage(product.currentStock, product.totalCapacity);
            
            return (
              <tr 
                key={product.id} 
                className="hover:bg-secondary-50 transition-colors duration-200"
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => onProductSelect(product.id)}
                    className="rounded border-border focus:ring-primary"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-secondary-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {product.sku}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {product.machines.length} машин
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => onProductDetails(product)}
                    className="text-sm font-medium text-text-primary hover:text-primary transition-colors duration-200"
                  >
                    {product.name}
                  </button>
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-primary font-medium">
                        {product.currentStock} / {product.totalCapacity}
                      </span>
                      <span className="text-text-secondary">
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-secondary-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          status === 'critical' ? 'bg-error' :
                          status === 'low_stock' ? 'bg-warning' : 'bg-success'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-text-secondary">
                      Мин. уровень: {product.reorderPoint}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStockColor(status)}`}>
                    {getStockLabel(status)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm font-medium text-text-primary">
                    {formatPrice(product.price)}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm text-text-primary">
                      {product.supplier}
                    </p>
                    <p className="text-xs text-text-secondary">
                      Обновлено: {formatDate(product.lastRestocked)}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => onProductDetails(product)}
                      className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
                      title="Подробности"
                    >
                      <Icon name="Eye" size={16} className="text-text-secondary" />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
                      title="Редактировать"
                    >
                      <Icon name="Edit" size={16} className="text-text-secondary" />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-primary-100 transition-colors duration-200"
                      title="Пополнить"
                    >
                      <Icon name="Plus" size={16} className="text-primary" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {products.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Package" size={48} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary">Товары не найдены</p>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;