import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import MachineSelectionPanel from './components/MachineSelectionPanel';
import ConfigurationWorkspace from './components/ConfigurationWorkspace';
import BulkConfigurationModal from './components/BulkConfigurationModal';
import TemplateManagementModal from './components/TemplateManagementModal';

const MachineConfigurationSettings = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState({});

  // Mock data for machines organized by location
  const machineLocations = [
    {
      id: 'location-1',
      name: 'ТЦ Мега',
      address: 'Химки, МКАД 65-й км',
      machines: [
        {
          id: 'VM-001',
          name: 'Мега - Вход А',
          status: 'online',
          lastSync: new Date(Date.now() - 5 * 60 * 1000),
          temperature: 4.2,
          revenue: 15420,
          products: 45,
          location: { lat: 55.8969, lng: 37.4394 }
        },
        {
          id: 'VM-002',
          name: 'Мега - Фуд-корт',
          status: 'warning',
          lastSync: new Date(Date.now() - 15 * 60 * 1000),
          temperature: 6.8,
          revenue: 12340,
          products: 38,
          location: { lat: 55.8969, lng: 37.4394 }
        }
      ]
    },
    {
      id: 'location-2',
      name: 'Офисный центр Сити',
      address: 'Москва, ул. Тверская 15',
      machines: [
        {
          id: 'VM-015',
          name: 'Сити - Лобби',
          status: 'online',
          lastSync: new Date(Date.now() - 2 * 60 * 1000),
          temperature: 3.8,
          revenue: 8750,
          products: 52,
          location: { lat: 55.7558, lng: 37.6176 }
        },
        {
          id: 'VM-016',
          name: 'Сити - 5 этаж',
          status: 'offline',
          lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000),
          temperature: null,
          revenue: 6420,
          products: 28,
          location: { lat: 55.7558, lng: 37.6176 }
        }
      ]
    },
    {
      id: 'location-3',
      name: 'Бизнес-центр Альфа',
      address: 'Москва, Садовое кольцо 12',
      machines: [
        {
          id: 'VM-008',
          name: 'Альфа - Главный вход',
          status: 'online',
          lastSync: new Date(Date.now() - 1 * 60 * 1000),
          temperature: 4.5,
          revenue: 11200,
          products: 41,
          location: { lat: 55.7522, lng: 37.6156 }
        }
      ]
    }
  ];

  // Mock configuration templates
  const configurationTemplates = [
    {
      id: 'template-1',
      name: 'Стандартная конфигурация офиса',
      description: 'Базовые настройки для офисных зданий',
      category: 'office',
      settings: {
        operatingHours: { start: '08:00', end: '20:00' },
        temperature: { min: 2, max: 6 },
        paymentMethods: ['card', 'cash', 'contactless'],
        maxTransactionAmount: 1000
      },
      createdAt: new Date('2024-01-15'),
      usageCount: 12
    },
    {
      id: 'template-2',
      name: 'Конфигурация ТЦ',
      description: 'Настройки для торговых центров',
      category: 'mall',
      settings: {
        operatingHours: { start: '10:00', end: '22:00' },
        temperature: { min: 3, max: 7 },
        paymentMethods: ['card', 'cash', 'contactless', 'mobile'],
        maxTransactionAmount: 2000
      },
      createdAt: new Date('2024-01-20'),
      usageCount: 8
    }
  ];

  useEffect(() => {
    // Auto-select first machine if none selected
    if (!selectedMachine && machineLocations.length > 0 && machineLocations[0].machines.length > 0) {
      setSelectedMachine(machineLocations[0].machines[0]);
    }
  }, []);

  const handleMachineSelect = (machine) => {
    setSelectedMachine(machine);
    setActiveTab('products');
  };

  const handleBulkSelect = (machines) => {
    setSelectedMachines(machines);
  };

  const handleSyncConfiguration = async (machineId) => {
    setIsLoading(true);
    setSyncStatus(prev => ({ ...prev, [machineId]: 'syncing' }));
    
    // Simulate API call
    setTimeout(() => {
      setSyncStatus(prev => ({ ...prev, [machineId]: 'success' }));
      setIsLoading(false);
      
      // Clear status after 3 seconds
      setTimeout(() => {
        setSyncStatus(prev => ({ ...prev, [machineId]: null }));
      }, 3000);
    }, 2000);
  };

  const handleBulkSync = async () => {
    if (selectedMachines.length === 0) return;
    
    setIsLoading(true);
    const machineIds = selectedMachines.map(m => m.id);
    
    machineIds.forEach(id => {
      setSyncStatus(prev => ({ ...prev, [id]: 'syncing' }));
    });
    
    // Simulate bulk sync
    setTimeout(() => {
      machineIds.forEach(id => {
        setSyncStatus(prev => ({ ...prev, [id]: 'success' }));
      });
      setIsLoading(false);
      
      // Clear status after 3 seconds
      setTimeout(() => {
        const clearedStatus = {};
        machineIds.forEach(id => {
          clearedStatus[id] = null;
        });
        setSyncStatus(prev => ({ ...prev, ...clearedStatus }));
      }, 3000);
    }, 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-success';
      case 'warning': return 'text-warning';
      case 'offline': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'online': return 'bg-success-100';
      case 'warning': return 'bg-warning-100';
      case 'offline': return 'bg-error-100';
      default: return 'bg-secondary-100';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isMenuOpen={isSidebarOpen}
      />
      
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="lg:ml-80 pt-16">
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                Настройки машин
              </h1>
              <p className="text-text-secondary">
                Управление конфигурацией и параметрами торговых автоматов
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button
                onClick={() => setIsTemplateModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 text-text-primary rounded-lg hover:bg-secondary-200 transition-colors duration-200"
              >
                <Icon name="FileText" size={16} />
                <span>Шаблоны</span>
              </button>
              
              <button
                onClick={() => setIsBulkModalOpen(true)}
                disabled={selectedMachines.length === 0}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Icon name="Settings" size={16} />
                <span>Массовая настройка</span>
                {selectedMachines.length > 0 && (
                  <span className="bg-primary-600 px-2 py-1 rounded-full text-xs">
                    {selectedMachines.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Machine Selection Panel */}
            <div className="lg:col-span-4">
              <MachineSelectionPanel
                locations={machineLocations}
                selectedMachine={selectedMachine}
                selectedMachines={selectedMachines}
                onMachineSelect={handleMachineSelect}
                onBulkSelect={handleBulkSelect}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filterStatus={filterStatus}
                onFilterChange={setFilterStatus}
                syncStatus={syncStatus}
                getStatusColor={getStatusColor}
                getStatusBg={getStatusBg}
              />
            </div>

            {/* Configuration Workspace */}
            <div className="lg:col-span-8">
              {selectedMachine ? (
                <ConfigurationWorkspace
                  machine={selectedMachine}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  onSync={() => handleSyncConfiguration(selectedMachine.id)}
                  syncStatus={syncStatus[selectedMachine.id]}
                  isLoading={isLoading}
                />
              ) : (
                <div className="bg-surface rounded-lg border border-border p-12 text-center">
                  <Icon name="Settings" size={48} className="text-text-muted mx-auto mb-4" />
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                    Выберите машину для настройки
                  </h3>
                  <p className="text-text-secondary">
                    Выберите торговый автомат из списка слева для просмотра и изменения его конфигурации
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Bulk Configuration Modal */}
      <BulkConfigurationModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        selectedMachines={selectedMachines}
        onSync={handleBulkSync}
        isLoading={isLoading}
        templates={configurationTemplates}
      />

      {/* Template Management Modal */}
      <TemplateManagementModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        templates={configurationTemplates}
      />
    </div>
  );
};

export default MachineConfigurationSettings;