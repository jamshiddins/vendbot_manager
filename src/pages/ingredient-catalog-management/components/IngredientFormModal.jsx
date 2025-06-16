// src/pages/ingredient-catalog-management/components/IngredientFormModal.jsx
import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const IngredientFormModal = ({ ingredient, categories, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    sku: '',
    barcode: '',
    price: '',
    cost: '',
    supplier: '',
    nutritional: {
      calories: '',
      protein: '',
      fat: '',
      carbs: '',
      sugar: '',
      caffeine: '',
      salt: ''
    },
    stock: {
      total: '',
      available: '',
      reserved: '',
      minimum: ''
    },
    allergens: [],
    expiryDate: '',
    description: '',
    image: null
  });
  
  const [activeTab, setActiveTab] = useState('basic');
  const [errors, setErrors] = useState({});

  const allergenOptions = [
    { id: 'milk', name: 'Молоко' },
    { id: 'eggs', name: 'Яйца' },
    { id: 'nuts', name: 'Орехи' },
    { id: 'gluten', name: 'Глютен' },
    { id: 'soy', name: 'Соя' },
    { id: 'fish', name: 'Рыба' },
    { id: 'shellfish', name: 'Моллюски' },
    { id: 'sesame', name: 'Кунжут' }
  ];

  useEffect(() => {
    if (ingredient) {
      setFormData({
        name: ingredient.name || '',
        category: ingredient.category || '',
        sku: ingredient.sku || '',
        barcode: ingredient.barcode || '',
        price: ingredient.price || '',
        cost: ingredient.cost || '',
        supplier: ingredient.supplier || '',
        nutritional: {
          calories: ingredient.nutritional?.calories || '',
          protein: ingredient.nutritional?.protein || '',
          fat: ingredient.nutritional?.fat || '',
          carbs: ingredient.nutritional?.carbs || '',
          sugar: ingredient.nutritional?.sugar || '',
          caffeine: ingredient.nutritional?.caffeine || '',
          salt: ingredient.nutritional?.salt || ''
        },
        stock: {
          total: ingredient.stock?.total || '',
          available: ingredient.stock?.available || '',
          reserved: ingredient.stock?.reserved || '',
          minimum: ingredient.stock?.minimum || ''
        },
        allergens: ingredient.allergens || [],
        expiryDate: ingredient.expiryDate || '',
        description: ingredient.description || '',
        image: ingredient.image || null
      });
    }
  }, [ingredient]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleNestedInputChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleAllergenToggle = (allergenId) => {
    setFormData(prev => ({
      ...prev,
      allergens: prev.allergens.includes(allergenId)
        ? prev.allergens.filter(id => id !== allergenId)
        : [...prev.allergens, allergenId]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Название обязательно';
    }
    
    if (!formData.category) {
      newErrors.category = 'Категория обязательна';
    }
    
    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU обязателен';
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Цена должна быть больше 0';
    }
    
    if (!formData.cost || parseFloat(formData.cost) <= 0) {
      newErrors.cost = 'Себестоимость должна быть больше 0';
    }
    
    if (parseFloat(formData.cost) >= parseFloat(formData.price)) {
      newErrors.cost = 'Себестоимость не может быть больше цены';
      newErrors.price = 'Цена должна быть больше себестоимости';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const processedData = {
      ...formData,
      price: parseFloat(formData.price),
      cost: parseFloat(formData.cost),
      nutritional: Object.fromEntries(
        Object.entries(formData.nutritional).map(([key, value]) => [
          key,
          value === '' ? undefined : parseFloat(value) || value
        ])
      ),
      stock: Object.fromEntries(
        Object.entries(formData.stock).map(([key, value]) => [
          key,
          value === '' ? 0 : parseInt(value, 10) || 0
        ])
      )
    };
    
    onSave(processedData);
  };

  const getCategoryOptions = () => {
    const options = [];
    categories?.forEach(category => {
      if (category.children) {
        category.children.forEach(child => {
          options.push({ id: child.id, name: `${category.name} > ${child.name}` });
        });
      } else {
        options.push({ id: category.id, name: category.name });
      }
    });
    return options;
  };

  const tabs = [
    { id: 'basic', name: 'Основное', icon: 'Package' },
    { id: 'pricing', name: 'Цены', icon: 'DollarSign' },
    { id: 'nutrition', name: 'Пищевая ценность', icon: 'Activity' },
    { id: 'stock', name: 'Склад', icon: 'Archive' },
    { id: 'additional', name: 'Дополнительно', icon: 'Settings' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Название *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.name ? 'border-error-300' : 'border-border'
                }`}
                placeholder="Название ингредиента"
              />
              {errors.name && (
                <p className="text-error-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Категория *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.category ? 'border-error-300' : 'border-border'
                }`}
              >
                <option value="">Выберите категорию</option>
                {getCategoryOptions().map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-error-600 text-sm mt-1">{errors.category}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  SKU *
                </label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => handleInputChange('sku', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.sku ? 'border-error-300' : 'border-border'
                  }`}
                  placeholder="Артикул"
                />
                {errors.sku && (
                  <p className="text-error-600 text-sm mt-1">{errors.sku}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Штрихкод
                </label>
                <input
                  type="text"
                  value={formData.barcode}
                  onChange={(e) => handleInputChange('barcode', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Штрихкод"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Поставщик
              </label>
              <input
                type="text"
                value={formData.supplier}
                onChange={(e) => handleInputChange('supplier', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Название поставщика"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Описание
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Дополнительная информация о продукте"
              />
            </div>
          </div>
        );
        
      case 'pricing':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Цена продажи (₽) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.price ? 'border-error-300' : 'border-border'
                  }`}
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="text-error-600 text-sm mt-1">{errors.price}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Себестоимость (₽) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.cost}
                  onChange={(e) => handleInputChange('cost', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.cost ? 'border-error-300' : 'border-border'
                  }`}
                  placeholder="0.00"
                />
                {errors.cost && (
                  <p className="text-error-600 text-sm mt-1">{errors.cost}</p>
                )}
              </div>
            </div>
            
            {formData.price && formData.cost && (
              <div className="p-4 bg-info-50 border border-info-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="TrendingUp" size={16} className="text-info-600" />
                  <span className="font-medium text-info-900">Маржинальность</span>
                </div>
                <div className="text-sm text-info-700">
                  <p>Прибыль: ₽{(parseFloat(formData.price) - parseFloat(formData.cost)).toFixed(2)}</p>
                  <p>Маржа: {(((parseFloat(formData.price) - parseFloat(formData.cost)) / parseFloat(formData.price)) * 100).toFixed(1)}%</p>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'nutrition':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Калории (на 100г)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.nutritional.calories}
                  onChange={(e) => handleNestedInputChange('nutritional', 'calories', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Белки (г)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.nutritional.protein}
                  onChange={(e) => handleNestedInputChange('nutritional', 'protein', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0.0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Жиры (г)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.nutritional.fat}
                  onChange={(e) => handleNestedInputChange('nutritional', 'fat', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0.0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Углеводы (г)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.nutritional.carbs}
                  onChange={(e) => handleNestedInputChange('nutritional', 'carbs', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0.0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Сахар (г)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.nutritional.sugar}
                  onChange={(e) => handleNestedInputChange('nutritional', 'sugar', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0.0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Кофеин (мг)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.nutritional.caffeine}
                  onChange={(e) => handleNestedInputChange('nutritional', 'caffeine', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Аллергены
              </label>
              <div className="grid grid-cols-2 gap-2">
                {allergenOptions.map(allergen => (
                  <label key={allergen.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.allergens.includes(allergen.id)}
                      onChange={() => handleAllergenToggle(allergen.id)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-text-primary">{allergen.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'stock':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Общий остаток
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock.total}
                  onChange={(e) => handleNestedInputChange('stock', 'total', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Доступно
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock.available}
                  onChange={(e) => handleNestedInputChange('stock', 'available', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Зарезервировано
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock.reserved}
                  onChange={(e) => handleNestedInputChange('stock', 'reserved', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Минимальный остаток
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock.minimum}
                  onChange={(e) => handleNestedInputChange('stock', 'minimum', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        );
        
      case 'additional':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Срок годности
              </label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Изображение
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Icon name="Upload" size={32} className="mx-auto text-text-secondary" />
                  <div className="flex text-sm text-text-secondary">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                      <span>Загрузить файл</span>
                      <input type="file" className="sr-only" accept="image/*" />
                    </label>
                    <p className="pl-1">или перетащите сюда</p>
                  </div>
                  <p className="text-xs text-text-secondary">
                    PNG, JPG, GIF до 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            {ingredient ? 'Редактировать ингредиент' : 'Добавить ингредиент'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Tabs */}
          <div className="border-b border-border">
            <div className="flex overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {renderTabContent()}
          </div>
          
          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-secondary-50 transition-colors"
            >
              Отменить
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {ingredient ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IngredientFormModal;