// src/pages/ingredient-catalog-management/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import CategoryTree from './components/CategoryTree';
import IngredientDatabase from './components/IngredientDatabase';
import StockAlertsPanel from './components/StockAlertsPanel';
import BulkOperationsModal from './components/BulkOperationsModal';
import IngredientFormModal from './components/IngredientFormModal';
import RecipeManagementModal from './components/RecipeManagementModal';
import SupplierIntegrationPanel from './components/SupplierIntegrationPanel';

const IngredientCatalogManagement = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // grid, list, detailed
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState(null);

  // Mock data for ingredient categories
  const [categories] = useState([
    {
      id: 'beverages',
      name: 'Напитки',
      icon: 'Coffee',
      count: 45,
      children: [
        { id: 'hot_drinks', name: 'Горячие напитки', count: 20 },
        { id: 'cold_drinks', name: 'Холодные напитки', count: 15 },
        { id: 'energy_drinks', name: 'Энергетики', count: 10 }
      ]
    },
    {
      id: 'snacks',
      name: 'Снэки',
      icon: 'Package',
      count: 32,
      children: [
        { id: 'chips', name: 'Чипсы', count: 12 },
        { id: 'cookies', name: 'Печенье', count: 10 },
        { id: 'nuts', name: 'Орехи', count: 10 }
      ]
    },
    {
      id: 'coffee_components',
      name: 'Кофейные компоненты',
      icon: 'Droplets',
      count: 18,
      children: [
        { id: 'coffee_beans', name: 'Кофейные зерна', count: 8 },
        { id: 'milk_products', name: 'Молочные продукты', count: 6 },
        { id: 'syrups', name: 'Сиропы', count: 4 }
      ]
    },
    {
      id: 'maintenance',
      name: 'Расходные материалы',
      icon: 'Wrench',
      count: 25,
      children: [
        { id: 'cups', name: 'Стаканчики', count: 8 },
        { id: 'lids', name: 'Крышки', count: 7 },
        { id: 'cleaning', name: 'Средства для чистки', count: 10 }
      ]
    }
  ]);

  // Mock data for ingredients
  const [ingredients, setIngredients] = useState([
    {
      id: 'I001',
      name: 'Кока-Кола 0.5л',
      category: 'cold_drinks',
      sku: 'CC-500',
      barcode: '4607177411729',
      price: 65.00,
      cost: 45.00,
      supplier: 'Coca-Cola HBC',
      nutritional: {
        calories: 210,
        sugar: 53,
        caffeine: 34
      },
      stock: {
        total: 1250,
        available: 850,
        reserved: 400,
        minimum: 200
      },
      allergens: [],
      status: 'active',
      image: null
    },
    {
      id: 'I002',
      name: 'Арабика зерно 1кг',
      category: 'coffee_beans',
      sku: 'CF-AR-1000',
      barcode: '4607177411730',
      price: 850.00,
      cost: 650.00,
      supplier: 'Coffee Masters',
      nutritional: {
        calories: 2,
        caffeine: 95
      },
      stock: {
        total: 150,
        available: 45,
        reserved: 105,
        minimum: 50
      },
      allergens: [],
      status: 'low_stock',
      image: null
    },
    {
      id: 'I003',
      name: 'Молоко 3.2% 1л',
      category: 'milk_products',
      sku: 'ML-32-1000',
      barcode: '4607177411731',
      price: 75.00,
      cost: 55.00,
      supplier: 'Простоквашино',
      nutritional: {
        calories: 640,
        protein: 32,
        fat: 32,
        carbs: 48
      },
      stock: {
        total: 200,
        available: 180,
        reserved: 20,
        minimum: 30
      },
      allergens: ['milk'],
      status: 'active',
      expiryDate: '2024-02-15',
      image: null
    },
    {
      id: 'I004',
      name: 'Lay\'s классические 90г',
      category: 'chips',
      sku: 'LY-CL-90',
      barcode: '4607177411732',
      price: 85.00,
      cost: 60.00,
      supplier: 'PepsiCo',
      nutritional: {
        calories: 510,
        fat: 30,
        carbs: 53,
        salt: 1.5
      },
      stock: {
        total: 300,
        available: 250,
        reserved: 50,
        minimum: 100
      },
      allergens: [],
      status: 'active',
      image: null
    }
  ]);

  const [stockAlerts] = useState([
    {
      id: 'A001',
      type: 'low_stock',
      ingredient: 'Арабика зерно 1кг',
      currentStock: 45,
      minimumStock: 50,
      severity: 'high',
      machines: ['VM-001', 'VM-003', 'VM-007']
    },
    {
      id: 'A002',
      type: 'expiry_warning',
      ingredient: 'Молоко 3.2% 1л',
      expiryDate: '2024-02-15',
      daysLeft: 5,
      severity: 'medium',
      machines: ['VM-002', 'VM-005']
    },
    {
      id: 'A003',
      type: 'reorder_point',
      ingredient: 'Кока-Кола 0.5л',
      currentStock: 850,
      reorderPoint: 800,
      severity: 'low',
      machines: ['VM-004', 'VM-006', 'VM-008']
    }
  ]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleIngredientSelect = (ingredientIds) => {
    setSelectedIngredients(ingredientIds);
  };

  const handleAddIngredient = () => {
    setEditingIngredient(null);
    setIsFormModalOpen(true);
  };

  const handleEditIngredient = (ingredient) => {
    setEditingIngredient(ingredient);
    setIsFormModalOpen(true);
  };

  const handleDeleteIngredient = (ingredientId) => {
    if (window.confirm('Вы уверены, что хотите удалить этот ингредиент?')) {
      setIngredients(prev => prev.filter(ingredient => ingredient.id !== ingredientId));
    }
  };

  const handleIngredientSave = (ingredientData) => {
    if (editingIngredient) {
      // Update existing ingredient
      setIngredients(prev => prev.map(ingredient => 
        ingredient.id === editingIngredient.id 
          ? { ...ingredient, ...ingredientData }
          : ingredient
      ));
    } else {
      // Add new ingredient
      const newIngredient = {
        id: `I${String(ingredients.length + 1).padStart(3, '0')}`,
        ...ingredientData,
        status: 'active'
      };
      setIngredients(prev => [...prev, newIngredient]);
    }
    setIsFormModalOpen(false);
    setEditingIngredient(null);
  };

  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesCategory = selectedCategory === 'all' || ingredient.category === selectedCategory;
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ingredient.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || ingredient.status === filterBy;
    
    return matchesCategory && matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Загрузка каталога ингредиентов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleSidebarToggle} isMenuOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-80' : 'lg:ml-80'} pt-16`}>
        <div className="p-6">
          <div className="mb-6">
            <Breadcrumb />
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
                  Управление каталогом ингредиентов
                </h1>
                <p className="text-text-secondary">
                  Комплексное управление продуктами, рецептами и поставками
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsRecipeModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary-100 transition-colors"
                >
                  <Icon name="Book" size={16} />
                  <span>Рецепты</span>
                </button>
                
                <button
                  onClick={() => setIsBulkModalOpen(true)}
                  disabled={selectedIngredients.length === 0}
                  className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon name="Settings" size={16} />
                  <span>Массовые операции</span>
                  {selectedIngredients.length > 0 && (
                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                      {selectedIngredients.length}
                    </span>
                  )}
                </button>
                
                <button
                  onClick={handleAddIngredient}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Icon name="Plus" size={16} />
                  <span>Добавить ингредиент</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            {/* Left Panel - Categories */}
            <div className="xl:col-span-1">
              <CategoryTree 
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </div>
            
            {/* Center Panel - Ingredient Database */}
            <div className="xl:col-span-3">
              <IngredientDatabase 
                ingredients={filteredIngredients}
                selectedIngredients={selectedIngredients}
                onIngredientSelect={handleIngredientSelect}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                sortBy={sortBy}
                onSortChange={setSortBy}
                filterBy={filterBy}
                onFilterChange={setFilterBy}
                onEdit={handleEditIngredient}
                onDelete={handleDeleteIngredient}
              />
            </div>
            
            {/* Right Panel - Stock Alerts */}
            <div className="xl:col-span-1">
              <StockAlertsPanel 
                alerts={stockAlerts}
                onAlertAction={(alertId, action) => {
                  console.log('Alert action:', alertId, action);
                }}
              />
            </div>
          </div>

          {/* Supplier Integration Panel */}
          <div className="mt-8">
            <SupplierIntegrationPanel 
              suppliers={[
                { id: 'S001', name: 'Coca-Cola HBC', status: 'connected', orders: 12 },
                { id: 'S002', name: 'Coffee Masters', status: 'connected', orders: 8 },
                { id: 'S003', name: 'PepsiCo', status: 'pending', orders: 5 }
              ]}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      {isFormModalOpen && (
        <IngredientFormModal 
          ingredient={editingIngredient}
          categories={categories}
          onSave={handleIngredientSave}
          onClose={() => {
            setIsFormModalOpen(false);
            setEditingIngredient(null);
          }}
        />
      )}
      
      {isBulkModalOpen && (
        <BulkOperationsModal 
          selectedIngredients={selectedIngredients.map(id => 
            ingredients.find(ingredient => ingredient.id === id)
          ).filter(Boolean)}
          onClose={() => setIsBulkModalOpen(false)}
          onApply={(operation, data) => {
            console.log('Bulk operation:', operation, data);
            setIsBulkModalOpen(false);
          }}
        />
      )}
      
      {isRecipeModalOpen && (
        <RecipeManagementModal 
          ingredients={ingredients}
          onClose={() => setIsRecipeModalOpen(false)}
        />
      )}
    </div>
  );
};

export default IngredientCatalogManagement;