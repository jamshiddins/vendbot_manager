// src/pages/ingredient-catalog-management/components/IngredientDatabase.jsx
import React from 'react';
import Icon from '../../../components/AppIcon';
import AppImage from '../../../components/AppImage';

const IngredientDatabase = ({
  ingredients,
  selectedIngredients,
  onIngredientSelect,
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  filterBy,
  onFilterChange,
  onEdit,
  onDelete
}) => {
  const handleSelectAll = () => {
    if (selectedIngredients.length === ingredients.length) {
      onIngredientSelect([]);
    } else {
      onIngredientSelect(ingredients.map(ingredient => ingredient.id));
    }
  };

  const handleSelectIngredient = (ingredientId) => {
    if (selectedIngredients.includes(ingredientId)) {
      onIngredientSelect(selectedIngredients.filter(id => id !== ingredientId));
    } else {
      onIngredientSelect([...selectedIngredients, ingredientId]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success-600 bg-success-50';
      case 'low_stock':
        return 'text-warning-600 bg-warning-50';
      case 'out_of_stock':
        return 'text-error-600 bg-error-50';
      case 'discontinued':
        return 'text-text-secondary bg-secondary-100';
      default:
        return 'text-text-secondary bg-secondary-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Активен';
      case 'low_stock':
        return 'Мало на складе';
      case 'out_of_stock':
        return 'Нет в наличии';
      case 'discontinued':
        return 'Снят с производства';
      default:
        return status;
    }
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {ingredients?.map(ingredient => (
        <div
          key={ingredient.id}
          className="bg-white rounded-lg border border-border p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <input
              type="checkbox"
              checked={selectedIngredients.includes(ingredient.id)}
              onChange={() => handleSelectIngredient(ingredient.id)}
              className="rounded border-border text-primary focus:ring-primary"
            />
            <div className="flex space-x-1">
              <button
                onClick={() => onEdit(ingredient)}
                className="p-1 text-text-secondary hover:text-primary transition-colors"
              >
                <Icon name="Edit2" size={14} />
              </button>
              <button
                onClick={() => onDelete(ingredient.id)}
                className="p-1 text-text-secondary hover:text-error-600 transition-colors"
              >
                <Icon name="Trash2" size={14} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
              {ingredient.image ? (
                <AppImage
                  src={ingredient.image}
                  alt={ingredient.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Icon name="Package" size={20} className="text-text-secondary" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-text-primary truncate">
                {ingredient.name}
              </h4>
              <p className="text-sm text-text-secondary">
                SKU: {ingredient.sku}
              </p>
            </div>
          </div>
          
          <div className="space-y-2 mb-3">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Цена:</span>
              <span className="font-medium text-text-primary">
                ₽{ingredient.price?.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Остаток:</span>
              <span className="font-medium text-text-primary">
                {ingredient.stock?.available || 0}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span
              className={`text-xs px-2 py-1 rounded-full ${getStatusColor(ingredient.status)}`}
            >
              {getStatusText(ingredient.status)}
            </span>
            <span className="text-xs text-text-secondary">
              {ingredient.supplier}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-secondary-50">
            <tr>
              <th className="w-12 px-6 py-3">
                <input
                  type="checkbox"
                  checked={selectedIngredients.length === ingredients.length && ingredients.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Ингредиент
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Цена
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Остаток
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Статус
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Поставщик
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {ingredients?.map(ingredient => (
              <tr key={ingredient.id} className="hover:bg-secondary-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIngredients.includes(ingredient.id)}
                    onChange={() => handleSelectIngredient(ingredient.id)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary-100 rounded flex items-center justify-center">
                      {ingredient.image ? (
                        <AppImage
                          src={ingredient.image}
                          alt={ingredient.name}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <Icon name="Package" size={16} className="text-text-secondary" />
                      )}
                    </div>
                    <span className="font-medium text-text-primary">
                      {ingredient.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {ingredient.sku}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-text-primary">
                  ₽{ingredient.price?.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-text-primary">
                  {ingredient.stock?.available || 0}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusColor(ingredient.status)}`}
                  >
                    {getStatusText(ingredient.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {ingredient.supplier}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onEdit(ingredient)}
                      className="p-1 text-text-secondary hover:text-primary transition-colors"
                    >
                      <Icon name="Edit2" size={14} />
                    </button>
                    <button
                      onClick={() => onDelete(ingredient.id)}
                      className="p-1 text-text-secondary hover:text-error-600 transition-colors"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Search and Controls */}
      <div className="bg-white rounded-lg border border-border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Icon
                name="Search"
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
              />
              <input
                type="text"
                placeholder="Поиск по названию или SKU..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={filterBy}
              onChange={(e) => onFilterChange(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Все статусы</option>
              <option value="active">Активные</option>
              <option value="low_stock">Мало на складе</option>
              <option value="out_of_stock">Нет в наличии</option>
              <option value="discontinued">Сняты с производства</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="name">По названию</option>
              <option value="sku">По SKU</option>
              <option value="price">По цене</option>
              <option value="stock">По остаткам</option>
            </select>
            
            <div className="flex border border-border rounded-lg">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-secondary-50'}`}
              >
                <Icon name="Grid3X3" size={16} />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-secondary-50'}`}
              >
                <Icon name="List" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Results */}
      <div>
        {ingredients?.length === 0 ? (
          <div className="bg-white rounded-lg border border-border p-8 text-center">
            <Icon name="Package" size={48} className="mx-auto mb-4 text-text-secondary" />
            <h3 className="text-lg font-medium text-text-primary mb-2">
              Ингредиенты не найдены
            </h3>
            <p className="text-text-secondary">
              Попробуйте изменить критерии поиска или добавить новый ингредиент
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-text-secondary">
                Найдено: {ingredients.length} ингредиентов
                {selectedIngredients.length > 0 && (
                  <span className="ml-2">
                    • Выбрано: {selectedIngredients.length}
                  </span>
                )}
              </p>
            </div>
            
            {viewMode === 'grid' ? renderGridView() : renderListView()}
          </>
        )}
      </div>
    </div>
  );
};

export default IngredientDatabase;