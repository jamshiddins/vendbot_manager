// src/pages/machine-fleet-management/index.jsx
import React, { useState, useMemo } from 'react';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import MachineTable from './components/MachineTable';
import FilterPanel from './components/FilterPanel';
import BulkActionsPanel from './components/BulkActionsPanel';
import MachineDetailsModal from './components/MachineDetailsModal';
import ExportModal from './components/ExportModal';
import AddMachineModal from './components/AddMachineModal';

const MachineFleetManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    status: '',
    machineType: '',
    dateRange: ''
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'lastCommunication',
    direction: 'desc'
  });
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAddMachineModalOpen, setIsAddMachineModalOpen] = useState(false);
  const [machinesData, setMachinesData] = useState([
    {
      id: 'VM-001',
      name: 'Автомат Мега #1',
      location: 'ТЦ Мега, 1 этаж',
      address: 'ул. Ленинградская, 2, Москва',
      status: 'online',
      lastCommunication: new Date(Date.now() - 5 * 60 * 1000),
      inventoryLevel: 85,
      dailySales: 12450,
      machineType: 'Напитки',
      temperature: 4.2,
      cashLevel: 8500,
      coordinates: { lat: 55.7558, lng: 37.6176 },
      recentTransactions: [
        { id: 1, product: 'Кока-Кола 0.5л', amount: 120, time: '14:30' },
        { id: 2, product: 'Вода Бон Аква', amount: 80, time: '14:25' },
        { id: 3, product: 'Сок Добрый', amount: 95, time: '14:20' }
      ],
      inventory: [
        { product: 'Кока-Кола 0.5л', current: 15, max: 20, price: 120 },
        { product: 'Пепси 0.5л', current: 12, max: 20, price: 115 },
        { product: 'Вода Бон Аква', current: 25, max: 30, price: 80 }
      ],
      maintenanceHistory: [
        { date: '2024-01-15', type: 'Плановое ТО', technician: 'Иванов И.И.' },
        { date: '2024-01-10', type: 'Пополнение', technician: 'Петров П.П.' }
      ]
    },
    {
      id: 'VM-002',
      name: 'Автомат Офис #2',
      location: 'Офисный центр Сити',
      address: 'Проспект Мира, 45, Москва',
      status: 'warning',
      lastCommunication: new Date(Date.now() - 15 * 60 * 1000),
      inventoryLevel: 25,
      dailySales: 8900,
      machineType: 'Снеки',
      temperature: 22.1,
      cashLevel: 4200,
      coordinates: { lat: 55.7558, lng: 37.6176 },
      recentTransactions: [
        { id: 1, product: 'Чипсы Лейс', amount: 150, time: '13:45' },
        { id: 2, product: 'Шоколад Сникерс', amount: 180, time: '13:30' }
      ],
      inventory: [
        { product: 'Чипсы Лейс', current: 3, max: 15, price: 150 },
        { product: 'Шоколад Сникерс', current: 8, max: 20, price: 180 },
        { product: 'Орешки KP', current: 12, max: 15, price: 120 }
      ],
      maintenanceHistory: [
        { date: '2024-01-12', type: 'Пополнение', technician: 'Сидоров С.С.' }
      ]
    },
    {
      id: 'VM-003',
      name: 'Автомат Альфа #3',
      location: 'Бизнес-центр Альфа',
      address: 'ул. Тверская, 12, Москва',
      status: 'offline',
      lastCommunication: new Date(Date.now() - 2 * 60 * 60 * 1000),
      inventoryLevel: 0,
      dailySales: 0,
      machineType: 'Напитки',
      temperature: null,
      cashLevel: 12000,
      coordinates: { lat: 55.7558, lng: 37.6176 },
      recentTransactions: [],
      inventory: [
        { product: 'Кока-Кола 0.5л', current: 0, max: 20, price: 120 },
        { product: 'Вода Бон Аква', current: 0, max: 30, price: 80 }
      ],
      maintenanceHistory: [
        { date: '2024-01-08', type: 'Ремонт', technician: 'Козлов К.К.' }
      ]
    },
    {
      id: 'VM-004',
      name: 'Автомат Европа #4',
      location: 'Торговый центр Европа',
      address: 'Кутузовский проспект, 57, Москва',
      status: 'online',
      lastCommunication: new Date(Date.now() - 2 * 60 * 1000),
      inventoryLevel: 92,
      dailySales: 15600,
      machineType: 'Комбо',
      temperature: 3.8,
      cashLevel: 9800,
      coordinates: { lat: 55.7558, lng: 37.6176 },
      recentTransactions: [
        { id: 1, product: 'Кофе Американо', amount: 200, time: '15:10' },
        { id: 2, product: 'Чай зеленый', amount: 150, time: '15:05' },
        { id: 3, product: 'Круассан', amount: 220, time: '15:00' }
      ],
      inventory: [
        { product: 'Кофе Американо', current: 18, max: 20, price: 200 },
        { product: 'Чай зеленый', current: 25, max: 30, price: 150 },
        { product: 'Круассан', current: 8, max: 10, price: 220 }
      ],
      maintenanceHistory: [
        { date: '2024-01-14', type: 'Плановое ТО', technician: 'Морозов М.М.' }
      ]
    },
    {
      id: 'VM-005',
      name: 'Автомат Метро #5',
      location: 'Станция метро Сокольники',
      address: 'Сокольническая площадь, 1, Москва',
      status: 'online',
      lastCommunication: new Date(Date.now() - 1 * 60 * 1000),
      inventoryLevel: 67,
      dailySales: 18200,
      machineType: 'Напитки',
      temperature: 4.5,
      cashLevel: 15600,
      coordinates: { lat: 55.7558, lng: 37.6176 },
      recentTransactions: [
        { id: 1, product: 'Энергетик Red Bull', amount: 280, time: '15:20' },
        { id: 2, product: 'Вода Святой Источник', amount: 70, time: '15:18' }
      ],
      inventory: [
        { product: 'Энергетик Red Bull', current: 10, max: 15, price: 280 },
        { product: 'Вода Святой Источник', current: 20, max: 25, price: 70 },
        { product: 'Сок Rich', current: 14, max: 20, price: 130 }
      ],
      maintenanceHistory: [
        { date: '2024-01-13', type: 'Пополнение', technician: 'Волков В.В.' }
      ]
    }
  ]);

  // Filter and search logic
  const filteredMachines = useMemo(() => {
    let filtered = machinesData;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(machine =>
        machine.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        machine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        machine.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        machine.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.location) {
      filtered = filtered.filter(machine => machine.location.includes(filters.location));
    }
    if (filters.status) {
      filtered = filtered.filter(machine => machine.status === filters.status);
    }
    if (filters.machineType) {
      filtered = filtered.filter(machine => machine.machineType === filters.machineType);
    }

    return filtered;
  }, [searchQuery, filters, machinesData]);

  // Sort logic
  const sortedMachines = useMemo(() => {
    if (!sortConfig.key) return filteredMachines;

    return [...filteredMachines].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'lastCommunication') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredMachines, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectMachine = (machineId) => {
    setSelectedMachines(prev =>
      prev.includes(machineId)
        ? prev.filter(id => id !== machineId)
        : [...prev, machineId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMachines.length === sortedMachines.length) {
      setSelectedMachines([]);
    } else {
      setSelectedMachines(sortedMachines.map(machine => machine.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for machines:`, selectedMachines);
    // Implement bulk actions logic here
    setSelectedMachines([]);
  };

  const handleExport = (format) => {
    console.log(`Exporting data in ${format} format`);
    // Implement export logic here
    setIsExportModalOpen(false);
  };

  const handleAddMachine = (newMachine) => {
    setMachinesData(prevMachines => [...prevMachines, newMachine]);
    console.log('New machine added:', newMachine);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-success';
      case 'warning': return 'text-warning';
      case 'offline': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'В сети';
      case 'warning': return 'Предупреждение';
      case 'offline': return 'Не в сети';
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
                Мониторинг машин
              </h1>
              <p className="text-text-secondary">
                Управление и мониторинг торговых автоматов в режиме реального времени
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 text-text-primary rounded-lg hover:bg-secondary-200 transition-colors duration-200"
              >
                <Icon name="Download" size={16} />
                <span>Экспорт</span>
              </button>
              
              <button 
                onClick={() => setIsAddMachineModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                <Icon name="Plus" size={16} />
                <span>Добавить машину</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Всего машин</p>
                  <p className="text-2xl font-bold text-text-primary">{machinesData.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon name="Monitor" size={24} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">В сети</p>
                  <p className="text-2xl font-bold text-success">
                    {machinesData.filter(m => m.status === 'online').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <Icon name="Wifi" size={24} className="text-success" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Требуют внимания</p>
                  <p className="text-2xl font-bold text-warning">
                    {machinesData.filter(m => m.status === 'warning').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={24} className="text-warning" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Не в сети</p>
                  <p className="text-2xl font-bold text-error">
                    {machinesData.filter(m => m.status === 'offline').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-error-100 rounded-lg flex items-center justify-center">
                  <Icon name="WifiOff" size={24} className="text-error" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-surface rounded-lg border border-border mb-6">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 lg:mb-0">
                  Поиск и фильтры
                </h3>
                <div className="text-sm text-text-secondary">
                  Найдено: {filteredMachines.length} из {machinesData.length} машин
                </div>
              </div>

              <FilterPanel
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filters={filters}
                onFiltersChange={setFilters}
                machinesData={machinesData}
              />
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedMachines.length > 0 && (
            <BulkActionsPanel
              selectedCount={selectedMachines.length}
              onBulkAction={handleBulkAction}
              onClearSelection={() => setSelectedMachines([])}
            />
          )}

          {/* Machines Table */}
          <div className="bg-surface rounded-lg border border-border">
            <MachineTable
              machines={sortedMachines}
              selectedMachines={selectedMachines}
              sortConfig={sortConfig}
              onSort={handleSort}
              onSelectMachine={handleSelectMachine}
              onSelectAll={handleSelectAll}
              onMachineClick={setSelectedMachine}
              getStatusColor={getStatusColor}
              getStatusText={getStatusText}
            />
          </div>
        </div>
      </main>

      {/* Machine Details Modal */}
      {selectedMachine && (
        <MachineDetailsModal
          machine={selectedMachine}
          onClose={() => setSelectedMachine(null)}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
        />
      )}

      {/* Export Modal */}
      {isExportModalOpen && (
        <ExportModal
          onClose={() => setIsExportModalOpen(false)}
          onExport={handleExport}
          totalRecords={filteredMachines.length}
        />
      )}

      {/* Add Machine Modal */}
      {isAddMachineModalOpen && (
        <AddMachineModal
          isOpen={isAddMachineModalOpen}
          onClose={() => setIsAddMachineModalOpen(false)}
          onSave={handleAddMachine}
        />
      )}
    </div>
  );
};

export default MachineFleetManagement;