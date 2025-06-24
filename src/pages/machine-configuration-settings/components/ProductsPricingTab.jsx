import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ProductsPricingTab = ({ machine, onChange }) => {
  const [products, setProducts] = useState([
    {
      id: 'prod-1',
      name: 'Кока-Кола 0.33л',
      category: 'Напитки',
      price: 90,
      cost: 45,
      stock: 12,
      maxStock: 15,
      position: 'A1',
      image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=100&h=100&fit=crop',
      isActive: true,
      salesCount: 145,
      lastSale: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 'prod-2',
      name: 'Пепси 0.33л',
      category: 'Напитки',
      price: 85,
      cost: 42,
      stock: 8,
      maxStock: 15,
      position: 'A2',
      image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=100&h=100&fit=crop',
      isActive: true,
      salesCount: 98,
      lastSale: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      id: 'prod-3',
      name: 'Вода Бон Аква 0.5л',
      category: 'Напитки',
      price: 45,
      cost: 20,
      stock: 20,
      maxStock: 25,
      position: 'B1',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop',
      isActive: true,
      salesCount: 203,
      lastSale: new Date(Date.now() - 1 * 60 * 60 * 1000)
    },
    {
      id: 'prod-4',
      name: 'Сникерс',
      category: 'Снеки',
      price: 75,
      cost: 35,
      stock: 5,
      maxStock: 20,
      position: 'C1',
      image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=100&h=100&fit=crop',
      isActive: true,
      salesCount: 67,
      lastSale: new Date(Date.now() - 6 * 60 * 60 * 1000)
    },
    {
      id: 'prod-5',
      name: 'Чипсы Лейс',
      category: 'Снеки',
      price: 95,
      cost: 48,
      stock: 0,
      maxStock: 18,
      position: 'C2',
      image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=100&h=100&fit=crop',
      isActive: false,
      salesCount: 89,
      lastSale: new Date(Date.now() - 24 * 60 * 60 * 1000)
    }
  ]);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [bulkEditMode, setBulkEditMode] = useState(false);
  const [bulkPrice, setBulkPrice] = useState('');
  const [bulkPriceType, setBulkPriceType] = useState('fixed'); // fixed, increase, decrease
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    cost: '',
    stock: '',
    maxStock: '',
    position: '',
    isActive: true
  });

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const handleProductUpdate = (productId, field, value) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, [field]: value }
        : product
    ));
    onChange();
  };

  const handleBulkPriceUpdate = () => {
    if (!bulkPrice || selectedProducts.length === 0) return;

    const priceValue = parseFloat(bulkPrice);
    if (isNaN(priceValue)) return;

    setProducts(prev => prev.map(product => {
      if (selectedProducts.includes(product.id)) {
        let newPrice = product.price;
        
        switch (bulkPriceType) {
          case 'fixed':
            newPrice = priceValue;
            break;
          case 'increase':
            newPrice = product.price + priceValue;
            break;
          case 'decrease':
            newPrice = Math.max(0, product.price - priceValue);
            break;
          default:
            break;
        }
        
        return { ...product, price: newPrice };
      }
      return product;
    }));

    setBulkPrice('');
    setSelectedProducts([]);
    setBulkEditMode(false);
    onChange();
  };

  const handleProductToggle = (productId, checked) => {
    if (checked) {
      setSelectedProducts(prev => [...prev, productId]);
    } else {
      setSelectedProducts(prev => prev.filter(id => id !== productId));
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setNewProduct({
      name: '',
      category: '',
      price: '',
      cost: '',
      stock: '',
      maxStock: '',
      position: '',
      isActive: true
    });
    setIsNewProductModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      cost: product.cost.toString(),
      stock: product.stock.toString(),
      maxStock: product.maxStock.toString(),
      position: product.position,
      isActive: product.isActive
    });
    setIsNewProductModalOpen(true);
  };

  const handleSaveProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) return;

    const productData = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      cost: parseFloat(newProduct.cost) || 0,
      stock: parseInt(newProduct.stock) || 0,
      maxStock: parseInt(newProduct.maxStock) || 0,
      salesCount: 0,
      lastSale: null
    };

    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id ? { ...editingProduct, ...productData } : p
      ));
    } else {
      // Add new product
      const newId = `prod-${products.length + 1}`;
      setProducts(prev => [
        ...prev,
        {
          id: newId,
          ...productData,
          image: null
        }
      ]);
    }

    setIsNewProductModalOpen(false);
    onChange();
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      setProducts(prev => prev.filter(product => product.id !== productId));
      onChange();
    }
  };

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery?.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return b.price - a.price;
        case 'stock':
          return b.stock - a.stock;
        case 'sales':
          return b.salesCount - a.salesCount;
        default:
          return 0;
      }
    });

  const getStockStatus = (stock, maxStock) => {
    if (!maxStock) return { status: 'good', color: 'text-success', bg: 'bg-success-100' };
    
    const percentage = (stock / maxStock) * 100;
    if (percentage === 0) return { status: 'empty', color: 'text-error', bg: 'bg-error-100' };
    if (percentage < 20) return { status: 'low', color: 'text-warning', bg: 'bg-warning-100' };
    if (percentage < 50) return { status: 'medium', color: 'text-primary', bg: 'bg-primary-100' };
    return { status: 'good', color: 'text-success', bg: 'bg-success-100' };
  };

  const totalRevenue = products.reduce((sum, product) => sum + (product.price * product.salesCount), 0);
  const totalProfit = products.reduce((sum, product) => sum + ((product.price - product.cost) * product.salesCount), 0);
  const averagePrice = products.length > 0 ? products.reduce((sum, product) => sum + product.price, 0) / products.length : 0;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-primary-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Package" size={20} className="text-primary" />
            <div>
              <p className="text-sm text-text-secondary">Всего товаров</p>
              <p className="text-lg font-semibold text-text-primary">{products.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-success-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={20} className="text-success" />
            <div>
              <p className="text-sm text-text-secondary">Общая выручка</p>
              <p className="text-lg font-semibold text-text-primary">
                {totalRevenue.toLocaleString('ru-RU')} ₽
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-accent-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="DollarSign" size={20} className="text-accent" />
            <div>
              <p className="text-sm text-text-secondary">Прибыль</p>
              <p className="text-lg font-semibold text-text-primary">
                {totalProfit.toLocaleString('ru-RU')} ₽
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-secondary-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="BarChart3" size={20} className="text-secondary" />
            <div>
              <p className="text-sm text-text-secondary">Средняя цена</p>
              <p className="text-lg font-semibold text-text-primary">
                {averagePrice.toFixed(0)} ₽
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Все категории' : category}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="name">По названию</option>
            <option value="price">По цене</option>
            <option value="stock">По остатку</option>
            <option value="sales">По продажам</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleAddProduct}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            <Icon name="Plus" size={16} />
            <span>Добавить товар</span>
          </button>
          
          <button
            onClick={() => setBulkEditMode(!bulkEditMode)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
              bulkEditMode 
                ? 'bg-primary text-white' :'bg-secondary-100 text-text-primary hover:bg-secondary-200'
            }`}
          >
            <Icon name={bulkEditMode ? "X" : "Edit"} size={16} />
            <span>{bulkEditMode ? 'Отмена' : 'Массовое редактирование'}</span>
          </button>
        </div>
      </div>

      {/* Bulk Edit Panel */}
      {bulkEditMode && (
        <div className="bg-primary-50 p-4 rounded-lg border border-primary-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">
              Массовое изменение цен
            </h3>
            <span className="text-sm text-text-secondary">
              Выбрано: {selectedProducts.length} товаров
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={bulkPriceType}
              onChange={(e) => setBulkPriceType(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="fixed">Установить цену</option>
              <option value="increase">Увеличить на</option>
              <option value="decrease">Уменьшить на</option>
            </select>
            
            <input
              type="number"
              placeholder="Цена в рублях"
              value={bulkPrice}
              onChange={(e) => setBulkPrice(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            
            <button
              onClick={handleBulkPriceUpdate}
              disabled={!bulkPrice || selectedProducts.length === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Icon name="Check" size={16} />
              <span>Применить</span>
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 border-b border-border">
              <tr>
                {bulkEditMode && (
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProducts(filteredProducts.map(p => p.id));
                        } else {
                          setSelectedProducts([]);
                        }
                      }}
                      className="rounded border-border focus:ring-primary"
                    />
                  </th>
                )}
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Товар</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Позиция</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Цена</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Себестоимость</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Остаток</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Продажи</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Статус</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.map(product => {
                const stockStatus = getStockStatus(product.stock, product.maxStock);
                const isSelected = selectedProducts.includes(product.id);
                
                return (
                  <tr key={product.id} className={`hover:bg-secondary-50 ${isSelected ? 'bg-primary-50' : ''}`}>
                    {bulkEditMode && (
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleProductToggle(product.id, e.target.checked)}
                          className="rounded border-border focus:ring-primary"
                        />
                      </td>
                    )}
                    
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                          onError={(e) => {
                            e.target.src = '/assets/images/no_image.png';
                          }}
                        />
                        <div>
                          <p className="text-sm font-medium text-text-primary">{product.name}</p>
                          <p className="text-xs text-text-secondary">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-medium bg-secondary-100 text-text-secondary rounded-full">
                        {product.position}
                      </span>
                    </td>
                    
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={product.price}
                          onChange={(e) => handleProductUpdate(product.id, 'price', parseFloat(e.target.value) || 0)}
                          className="w-20 px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <span className="text-sm text-text-secondary">₽</span>
                      </div>
                    </td>
                    
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={product.cost}
                          onChange={(e) => handleProductUpdate(product.id, 'cost', parseFloat(e.target.value) || 0)}
                          className="w-20 px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <span className="text-sm text-text-secondary">₽</span>
                      </div>
                    </td>
                    
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${stockStatus.bg}`}></div>
                        <span className={`text-sm font-medium ${stockStatus.color}`}>
                          {product.stock}/{product.maxStock}
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-text-primary">{product.salesCount}</p>
                        <p className="text-xs text-text-secondary">
                          {product.lastSale ? product.lastSale.toLocaleDateString('ru-RU') : '-'}
                        </p>
                      </div>
                    </td>
                    
                    <td className="px-4 py-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={product.isActive}
                          onChange={(e) => handleProductUpdate(product.id, 'isActive', e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          product.isActive ? 'bg-success' : 'bg-secondary-300'
                        }`}>
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            product.isActive ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </div>
                      </label>
                    </td>
                    
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="p-1 text-text-secondary hover:text-primary transition-colors duration-200"
                          title="Редактировать"
                        >
                          <Icon name="Edit" size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1 text-text-secondary hover:text-error transition-colors duration-200"
                          title="Удалить"
                        >
                          <Icon name="Trash2" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Package" size={48} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary">Товары не найдены</p>
          <p className="text-sm text-text-muted mt-1">
            Попробуйте изменить параметры поиска или фильтра
          </p>
        </div>
      )}

      {/* New/Edit Product Modal */}
      {isNewProductModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-heading font-semibold text-text-primary">
                {editingProduct ? 'Редактировать товар' : 'Добавить товар'}
              </h2>
              <button
                onClick={() => setIsNewProductModalOpen(false)}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Название *
                </label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Название товара"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Категория *
                </label>
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Категория товара"
                  list="category-options"
                />
                <datalist id="category-options">
                  {categories.filter(c => c !== 'all').map(category => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Цена (₽) *
                  </label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Себестоимость (₽)
                  </label>
                  <input
                    type="number"
                    value={newProduct.cost}
                    onChange={(e) => setNewProduct({...newProduct, cost: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Остаток
                  </label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Максимум
                  </label>
                  <input
                    type="number"
                    value={newProduct.maxStock}
                    onChange={(e) => setNewProduct({...newProduct, maxStock: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Позиция
                </label>
                <input
                  type="text"
                  value={newProduct.position}
                  onChange={(e) => setNewProduct({...newProduct, position: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="A1, B2, etc."
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-text-primary">
                  Активен
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newProduct.isActive}
                    onChange={(e) => setNewProduct({...newProduct, isActive: e.target.checked})}
                    className="sr-only"
                  />
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    newProduct.isActive ? 'bg-success' : 'bg-secondary-300'
                  }`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      newProduct.isActive ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </div>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
              <button
                type="button"
                onClick={() => setIsNewProductModalOpen(false)}
                className="px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-secondary-50 transition-colors"
              >
                Отменить
              </button>
              <button
                type="button"
                onClick={handleSaveProduct}
                disabled={!newProduct.name || !newProduct.price || !newProduct.category}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingProduct ? 'Сохранить' : 'Добавить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPricingTab;