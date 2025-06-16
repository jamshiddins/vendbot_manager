import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import MachineTable from './components/MachineTable';
import FilterPanel from './components/FilterPanel';
import BulkActionsPanel from './components/BulkActionsPanel';
import MachineDetailsModal from './components/MachineDetailsModal';
import AddMachineModal from './components/AddMachineModal';
import ExportModal from './components/ExportModal';

const MachineFleetManagement = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [machineData, setMachineData] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [filterValues, setFilterValues] = useState({
    status: 'all',
    region: 'all',
    type: 'all',
    search: ''
  });

  // Mock data fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setMachineData([
        {
          id: 'VM-001',
          name: 'Центральный офис 1',
          location: 'Москва, Ленинградский пр-т, 15',
          status: 'online',
          type: 'snack',
          lastActivity: '2023-11-24T08:30:00',
          revenue: 14500,
          stock: 87,
          region: 'Москва'
        },
        {
          id: 'VM-002',
          name: 'ТЦ Метрополис Автомат 2',
          location: 'Москва, Ленинградское ш., 16А',
          status: 'offline',
          type: 'coffee',
          lastActivity: '2023-11-24T06:12:00',
          revenue: 9800,
          stock: 45,
          region: 'Москва'
        },
        {
          id: 'VM-003',
          name: 'Бизнес-центр Атлантик',
          location: 'Санкт-Петербург, Невский пр-т, 78',
          status: 'maintenance',
          type: 'combo',
          lastActivity: '2023-11-23T17:45:00',
          revenue: 11200,
          stock: 63,
          region: 'Санкт-Петербург'
        },
        {
          id: 'VM-004',
          name: 'Аэропорт Пулково Терминал 1',
          location: 'Санкт-Петербург, Пулковское ш., 41',
          status: 'online',
          type: 'snack',
          lastActivity: '2023-11-24T09:15:00',
          revenue: 18600,
          stock: 92,
          region: 'Санкт-Петербург'
        },
        {
          id: 'VM-005',
          name: 'ТРЦ Мега Химки',
          location: 'Химки, Ленинградское ш., вл2',
          status: 'warning',
          type: 'coffee',
          lastActivity: '2023-11-24T07:50:00',
          revenue: 13400,
          stock: 28,
          region: 'Московская обл.'
        },
        {
          id: 'VM-006',
          name: 'Университет ИТМО',
          location: 'Санкт-Петербург, Кронверкский пр., 49',
          status: 'online',
          type: 'combo',
          lastActivity: '2023-11-24T08:42:00',
          revenue: 15700,
          stock: 74,
          region: 'Санкт-Петербург'
        },
        {
          id: 'VM-007',
          name: 'ЖД Вокзал Казань',
          location: 'Казань, Привокзальная пл., 1',
          status: 'online',
          type: 'snack',
          lastActivity: '2023-11-24T09:10:00',
          revenue: 12900,
          stock: 81,
          region: 'Татарстан'
        },
        {
          id: 'VM-008',
          name: 'Аэропорт Сочи',
          location: 'Сочи, Аэропорт, терминал А',
          status: 'online',
          type: 'coffee',
          lastActivity: '2023-11-24T08:05:00',
          revenue: 21500,
          stock: 66,
          region: 'Краснодарский край'
        }
      ]);
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

  const handleSelectMachine = (machine) => {
    setSelectedMachine(machine);
    setShowDetailsModal(true);
  };

  const handleSelectionChange = (selectedIds) => {
    setSelectedMachines(selectedIds);
  };

  const handleAddMachine = () => {
    setShowAddModal(true);
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const handleFilterChange = (newFilters) => {
    setFilterValues(newFilters);
  };

  const filteredMachines = machineData?.filter(machine => {
    let matches = true;
    
    if (filterValues?.status !== 'all' && machine?.status !== filterValues?.status) {
      matches = false;
    }
    
    if (filterValues?.region !== 'all' && machine?.region !== filterValues?.region) {
      matches = false;
    }
    
    if (filterValues?.type !== 'all' && machine?.type !== filterValues?.type) {
      matches = false;
    }
    
    if (filterValues?.search && !(
      machine?.id?.toLowerCase().includes(filterValues?.search.toLowerCase()) ||
      machine?.name?.toLowerCase().includes(filterValues?.search.toLowerCase()) ||
      machine?.location?.toLowerCase().includes(filterValues?.search.toLowerCase())
    )) {
      matches = false;
    }
    
    return matches;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Загрузка данных о машинах...</p>
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
                  Управление парком машин
                </h1>
                <p className="text-text-secondary">
                  Мониторинг и управление всеми торговыми автоматами
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={handleAddMachine}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  <Icon name="Plus" size={16} />
                  <span>Добавить машину</span>
                </button>
                <button 
                  onClick={handleExport}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-surface border border-border text-text-primary rounded-lg hover:bg-secondary-50 transition-colors duration-200"
                >
                  <Icon name="Download" size={16} />
                  <span>Экспорт</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            {/* Filter Panel */}
            <div className="lg:col-span-1">
              <FilterPanel 
                onFilterChange={handleFilterChange} 
                filterValues={filterValues}
                regions={[...new Set(machineData?.map(m => m?.region))].sort()}
              />
            </div>

            {/* Machine Data and Actions */}
            <div className="lg:col-span-3 space-y-6">
              {selectedMachines?.length > 0 && (
                <BulkActionsPanel 
                  selectedCount={selectedMachines?.length} 
                  onClearSelection={() => setSelectedMachines([])} 
                />
              )}
              
              <MachineTable 
                machines={filteredMachines} 
                onSelectMachine={handleSelectMachine}
                onSelectionChange={handleSelectionChange}
                selectedMachines={selectedMachines}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showDetailsModal && selectedMachine && (
        <MachineDetailsModal 
          machine={selectedMachine} 
          onClose={() => setShowDetailsModal(false)} 
        />
      )}

      {showAddModal && (
        <AddMachineModal 
          onClose={() => setShowAddModal(false)} 
          onAdd={(newMachine) => {
            setMachineData([...machineData, newMachine]);
            setShowAddModal(false);
          }}
        />
      )}

      {showExportModal && (
        <ExportModal 
          onClose={() => setShowExportModal(false)} 
          selectedCount={selectedMachines?.length}
          totalCount={machineData?.length}
        />
      )}
    </div>
  );
};

export default MachineFleetManagement;