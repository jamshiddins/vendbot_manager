import React, { useState, useMemo } from 'react';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import ProductCatalogTree from './components/ProductCatalogTree';
import InventoryTable from './components/InventoryTable';
import AlertsPanel from './components/AlertsPanel';
import BulkActionsModal from './components/BulkActionsModal';
import RestockingModal from './components/RestockingModal';
import ProductDetailsModal from './components/ProductDetailsModal';

const InventoryManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showRestockingModal, setShowRestockingModal] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Mock data for products
  const products = [
    {
      id: 1,
      name: "Кока-Кола 0.5л",
      sku: "CC-500-001",
      category: "beverages",
      subcategory: "carbonated",
      currentStock: 245,
      totalCapacity: 480,
      reorderPoint: 100,
      price: 89.90,
      supplier: "Coca-Cola HBC Russia",
      lastRestocked: "2024-01-15",
      machines: ["VM-001", "VM-003", "VM-007", "VM-012"],
      status: "in_stock",
      image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: "Пепси 0.5л",
      sku: "PP-500-002",
      category: "beverages",
      subcategory: "carbonated",
      currentStock: 78,
      totalCapacity: 360,
      reorderPoint: 80,
      price: 85.50,
      supplier: "PepsiCo Russia",
      lastRestocked: "2024-01-12",
      machines: ["VM-002", "VM-005", "VM-009"],
      status: "low_stock",
      image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      name: "Сникерс",
      sku: "SN-001-003",
      category: "snacks",
      subcategory: "chocolate",
      currentStock: 156,
      totalCapacity: 240,
      reorderPoint: 60,
      price: 65.00,
      supplier: "Mars Russia",
      lastRestocked: "2024-01-14",
      machines: ["VM-001", "VM-004", "VM-008"],
      status: "in_stock",
      image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=100&h=100&fit=crop"
    },
    {
      id: 4,
      name: "Чипсы Лейс Классические",
      sku: "LC-150-004",
      category: "snacks",
      subcategory: "chips",
      currentStock: 23,
      totalCapacity: 180,
      reorderPoint: 45,
      price: 78.90,
      supplier: "PepsiCo Russia",
      lastRestocked: "2024-01-10",
      machines: ["VM-003", "VM-006", "VM-010"],
      status: "critical",
      image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=100&h=100&fit=crop"
    },
    {
      id: 5,
      name: "Вода Бон Аква 0.5л",
      sku: "BA-500-005",
      category: "beverages",
      subcategory: "water",
      currentStock: 312,
      totalCapacity: 400,
      reorderPoint: 120,
      price: 45.00,
      supplier: "Coca-Cola HBC Russia",
      lastRestocked: "2024-01-16",
      machines: ["VM-001", "VM-002", "VM-005", "VM-011"],
      status: "in_stock",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop"
    },
    {
      id: 6,
      name: "Кофе Нескафе 3в1",
      sku: "NF-3IN1-006",
      category: "beverages",
      subcategory: "coffee",
      currentStock: 89,
      totalCapacity: 150,
      reorderPoint: 40,
      price: 25.50,
      supplier: "Nestle Russia",
      lastRestocked: "2024-01-13",
      machines: ["VM-004", "VM-007", "VM-009"],
      status: "in_stock",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100&h=100&fit=crop"
    },
    {
      id: 7,
      name: "Твикс",
      sku: "TW-001-007",
      category: "snacks",
      subcategory: "chocolate",
      currentStock: 12,
      totalCapacity: 120,
      reorderPoint: 30,
      price: 68.00,
      supplier: "Mars Russia",
      lastRestocked: "2024-01-08",
      machines: ["VM-002", "VM-006"],
      status: "critical",
      image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=100&h=100&fit=crop"
    },
    {
      id: 8,
      name: "Орбит Мята",
      sku: "OR-MINT-008",
      category: "snacks",
      subcategory: "gum",
      currentStock: 67,
      totalCapacity: 200,
      reorderPoint: 50,
      price: 35.90,
      supplier: "Mars Russia",
      lastRestocked: "2024-01-11",
      machines: ["VM-001", "VM-003", "VM-008", "VM-012"],
      status: "low_stock",
      image: "https://images.unsplash.com/photo-1582142306909-195724d33c8c?w=100&h=100&fit=crop"
    }
  ];

  // Mock data for categories
  const categories = [
    {
      id: 'all',
      name: 'Все товары',
      icon: 'Package',
      count: products.length
    },
    {
      id: 'beverages',
      name: 'Напитки',
      icon: 'Coffee',
      count: products.filter(p => p.category === 'beverages').length,
      subcategories: [
        { id: 'carbonated', name: 'Газированные', count: 2 },
        { id: 'water', name: 'Вода', count: 1 },
        { id: 'coffee', name: 'Кофе', count: 1 }
      ]
    },
    {
      id: 'snacks',
      name: 'Снеки',
      icon: 'Cookie',
      count: products.filter(p => p.category === 'snacks').length,
      subcategories: [
        { id: 'chocolate', name: 'Шоколад', count: 2 },
        { id: 'chips', name: 'Чипсы', count: 1 },
        { id: 'gum', name: 'Жвачка', count: 1 }
      ]
    }
  ];

  // Mock data for alerts
  const alerts = [
    {
      id: 1,
      type: 'critical',
      product: 'Чипсы Лейс Классические',
      machine: 'VM-003',
      message: 'Критически низкий запас (23 шт.)',
      time: '5 мин назад'
    },
    {
      id: 2,
      type: 'critical',
      product: 'Твикс',
      machine: 'VM-006',
      message: 'Критически низкий запас (12 шт.)',
      time: '12 мин назад'
    },
    {
      id: 3,
      type: 'warning',
      product: 'Пепси 0.5л',
      machine: 'VM-005',
      message: 'Низкий запас (78 шт.)',
      time: '25 мин назад'
    },
    {
      id: 4,
      type: 'info',
      product: 'Кока-Кола 0.5л',
      machine: 'Все машины',
      message: 'Запланирована поставка на завтра',
      time: '1 час назад'
    }
  ];

  // Mock data for pending orders
  const pendingOrders = [
    {
      id: 1,
      supplier: 'Coca-Cola HBC Russia',
      products: ['Кока-Кола 0.5л', 'Вода Бон Аква 0.5л'],
      orderDate: '2024-01-16',
      expectedDelivery: '2024-01-18',
      status: 'confirmed',
      total: 15750.00
    },
    {
      id: 2,
      supplier: 'Mars Russia',
      products: ['Сникерс', 'Твикс'],
      orderDate: '2024-01-15',
      expectedDelivery: '2024-01-17',
      status: 'pending',
      total: 8900.00
    }
  ];

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.supplier.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(product => product.status === filterStatus);
    }

    // Sort products
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [products, selectedCategory, searchQuery, filterStatus, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleProductSelect = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const handleProductDetails = (product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const getStockStatus = (product) => {
    const percentage = (product.currentStock / product.totalCapacity) * 100;
    if (percentage <= 20) return 'critical';
    if (percentage <= 40) return 'low_stock';
    return 'in_stock';
  };

  const getStockColor = (status) => {
    switch (status) {
      case 'critical': return 'text-error bg-error-50 border-error-200';
      case 'low_stock': return 'text-warning bg-warning-50 border-warning-200';
      case 'in_stock': return 'text-success bg-success-50 border-success-200';
      default: return 'text-text-secondary bg-secondary-50 border-border';
    }
  };

  const getStockLabel = (status) => {
    switch (status) {
      case 'critical': return 'Критический';
      case 'low_stock': return 'Низкий';
      case 'in_stock': return 'В наличии';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} isMenuOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-80' : 'lg:ml-80'} pt-16`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                Управление запасами
              </h1>
              <p className="text-text-secondary">
                Контроль уровня запасов и автоматическое пополнение товаров
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button
                onClick={() => setShowRestockingModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                <Icon name="Truck" size={16} />
                <span>Создать маршрут</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 text-text-primary rounded-lg hover:bg-secondary-200 transition-colors duration-200">
                <Icon name="Download" size={16} />
                <span>Экспорт</span>
              </button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel - Product Catalog Tree */}
            <div className="lg:col-span-3">
              <ProductCatalogTree
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </div>

            {/* Center Panel - Inventory Table */}
            <div className="lg:col-span-6">
              <div className="bg-surface rounded-lg border border-border">
                {/* Search and Filters */}
                <div className="p-4 border-b border-border">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                        <input
                          type="text"
                          placeholder="Поиск по названию, SKU или поставщику..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="all">Все статусы</option>
                      <option value="in_stock">В наличии</option>
                      <option value="low_stock">Низкий запас</option>
                      <option value="critical">Критический</option>
                    </select>
                  </div>
                  
                  {selectedProducts.length > 0 && (
                    <div className="mt-4 flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                      <span className="text-sm text-primary font-medium">
                        Выбрано товаров: {selectedProducts.length}
                      </span>
                      <button
                        onClick={() => setShowBulkActions(true)}
                        className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary-700 transition-colors duration-200"
                      >
                        Групповые действия
                      </button>
                    </div>
                  )}
                </div>

                {/* Inventory Table */}
                <InventoryTable
                  products={filteredProducts}
                  selectedProducts={selectedProducts}
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  onProductSelect={handleProductSelect}
                  onSelectAll={handleSelectAll}
                  onProductDetails={handleProductDetails}
                  getStockStatus={getStockStatus}
                  getStockColor={getStockColor}
                  getStockLabel={getStockLabel}
                />
              </div>
            </div>

            {/* Right Panel - Alerts and Actions */}
            <div className="lg:col-span-3">
              <AlertsPanel
                alerts={alerts}
                pendingOrders={pendingOrders}
                onRestockingClick={() => setShowRestockingModal(true)}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showBulkActions && (
        <BulkActionsModal
          selectedProducts={selectedProducts.map(id => products.find(p => p.id === id))}
          onClose={() => setShowBulkActions(false)}
          onAction={(action) => {
            console.log('Bulk action:', action);
            setShowBulkActions(false);
            setSelectedProducts([]);
          }}
        />
      )}

      {showRestockingModal && (
        <RestockingModal
          products={products}
          onClose={() => setShowRestockingModal(false)}
          onCreateRoute={(route) => {
            console.log('Create route:', route);
            setShowRestockingModal(false);
          }}
        />
      )}

      {showProductDetails && selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => {
            setShowProductDetails(false);
            setSelectedProduct(null);
          }}
          onUpdate={(updatedProduct) => {
            console.log('Update product:', updatedProduct);
            setShowProductDetails(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default InventoryManagement;