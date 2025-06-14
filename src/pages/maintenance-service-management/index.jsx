import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import ServiceRequestQueue from './components/ServiceRequestQueue';
import ServiceCalendar from './components/ServiceCalendar';
import MachineHealthDashboard from './components/MachineHealthDashboard';
import ServiceRouteMap from './components/ServiceRouteMap';
import CreateServiceRequestModal from './components/CreateServiceRequestModal';
import WorkOrderTracking from './components/WorkOrderTracking';

const MaintenanceServiceManagement = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('queue');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for service requests
  const serviceRequests = [
    {
      id: 'SR-001',
      machineId: 'VM-001',
      location: 'ТЦ Мега, 1 этаж',
      issueType: 'Неисправность монетоприемника',
      priority: 'critical',
      status: 'assigned',
      assignedTechnician: 'Иван Петров',
      estimatedCompletion: '2024-01-15T14:00:00',
      createdAt: '2024-01-15T09:30:00',
      description: 'Монетоприемник не принимает монеты номиналом 10 рублей',
      coordinates: { lat: 55.7558, lng: 37.6176 }
    },
    {
      id: 'SR-002',
      machineId: 'VM-015',
      location: 'Офисный центр Сити',
      issueType: 'Проблема с охлаждением',
      priority: 'high',
      status: 'in_progress',
      assignedTechnician: 'Мария Сидорова',
      estimatedCompletion: '2024-01-15T16:30:00',
      createdAt: '2024-01-15T08:15:00',
      description: 'Температура в отсеке превышает норму на 5°C',
      coordinates: { lat: 55.7522, lng: 37.6156 }
    },
    {
      id: 'SR-003',
      machineId: 'VM-008',
      location: 'Бизнес-центр Альфа',
      issueType: 'Плановое обслуживание',
      priority: 'medium',
      status: 'scheduled',
      assignedTechnician: 'Алексей Козлов',
      estimatedCompletion: '2024-01-16T10:00:00',
      createdAt: '2024-01-15T07:45:00',
      description: 'Ежемесячное техническое обслуживание',
      coordinates: { lat: 55.7489, lng: 37.6201 }
    },
    {
      id: 'SR-004',
      machineId: 'VM-022',
      location: 'Торговый центр Европа',
      issueType: 'Замена фильтра',
      priority: 'low',
      status: 'pending',
      assignedTechnician: null,
      estimatedCompletion: '2024-01-17T12:00:00',
      createdAt: '2024-01-15T06:20:00',
      description: 'Требуется замена фильтра системы охлаждения',
      coordinates: { lat: 55.7601, lng: 37.6142 }
    }
  ];

  // Mock data for technicians
  const technicians = [
    {
      id: 1,
      name: 'Иван Петров',
      status: 'busy',
      currentLocation: 'ТЦ Мега',
      activeRequests: 2,
      completedToday: 3,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 2,
      name: 'Мария Сидорова',
      status: 'available',
      currentLocation: 'Офисный центр Сити',
      activeRequests: 1,
      completedToday: 4,
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 3,
      name: 'Алексей Козлов',
      status: 'available',
      currentLocation: 'База',
      activeRequests: 0,
      completedToday: 2,
      avatar: 'https://randomuser.me/api/portraits/men/56.jpg'
    }
  ];

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCreateRequest = () => {
    setIsCreateModalOpen(true);
  };

  const handleEmergencyDispatch = () => {
    // Emergency dispatch logic
    console.log('Emergency dispatch initiated');
  };

  const handleBulkScheduling = () => {
    // Bulk scheduling logic
    console.log('Bulk scheduling opened');
  };

  const handlePartsOrdering = () => {
    // Parts ordering logic
    console.log('Parts ordering opened');
  };

  const filteredRequests = serviceRequests.filter(request => {
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || request.priority === filterPriority;
    const matchesSearch = searchQuery === '' || 
      request.machineId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.issueType.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const getStatusCounts = () => {
    return {
      total: serviceRequests.length,
      critical: serviceRequests.filter(r => r.priority === 'critical').length,
      pending: serviceRequests.filter(r => r.status === 'pending').length,
      inProgress: serviceRequests.filter(r => r.status === 'in_progress').length,
      completed: serviceRequests.filter(r => r.status === 'completed').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleSidebarToggle} isMenuOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-80' : 'lg:ml-80'} pt-16`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                Обслуживание и Ремонт
              </h1>
              <p className="text-text-secondary">
                Управление сервисными заявками и координация полевых работ
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mt-4 lg:mt-0">
              <button
                onClick={handleEmergencyDispatch}
                className="flex items-center space-x-2 px-4 py-2 bg-error text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
              >
                <Icon name="AlertTriangle" size={16} />
                <span>Экстренный вызов</span>
              </button>
              
              <button
                onClick={handleBulkScheduling}
                className="flex items-center space-x-2 px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors duration-200 font-medium"
              >
                <Icon name="Calendar" size={16} />
                <span>Массовое планирование</span>
              </button>
              
              <button
                onClick={handlePartsOrdering}
                className="flex items-center space-x-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-700 transition-colors duration-200 font-medium"
              >
                <Icon name="Package" size={16} />
                <span>Заказ запчастей</span>
              </button>
              
              <button
                onClick={handleCreateRequest}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
              >
                <Icon name="Plus" size={16} />
                <span>Создать заявку</span>
              </button>
            </div>
          </div>

          {/* Status Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-secondary">Всего заявок</p>
                  <p className="text-2xl font-bold text-text-primary">{statusCounts.total}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={24} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-secondary">Критические</p>
                  <p className="text-2xl font-bold text-error">{statusCounts.critical}</p>
                </div>
                <div className="w-12 h-12 bg-error-100 rounded-lg flex items-center justify-center">
                  <Icon name="AlertCircle" size={24} className="text-error" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-secondary">Ожидают</p>
                  <p className="text-2xl font-bold text-warning">{statusCounts.pending}</p>
                </div>
                <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={24} className="text-warning" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-secondary">В работе</p>
                  <p className="text-2xl font-bold text-primary">{statusCounts.inProgress}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon name="Settings" size={24} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-secondary">Завершено</p>
                  <p className="text-2xl font-bold text-success">{statusCounts.completed}</p>
                </div>
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-success" />
                </div>
              </div>
            </div>
          </div>

          {/* Technician Status */}
          <div className="bg-surface rounded-lg p-6 border border-border mb-8">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
              Статус техников
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {technicians.map((technician) => (
                <div key={technician.id} className="flex items-center space-x-4 p-4 bg-secondary-50 rounded-lg">
                  <Image
                    src={technician.avatar}
                    alt={technician.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-text-primary">{technician.name}</p>
                    <p className="text-sm text-text-secondary">{technician.currentLocation}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        technician.status === 'available' ?'bg-success-100 text-success' :'bg-warning-100 text-warning'
                      }`}>
                        {technician.status === 'available' ? 'Доступен' : 'Занят'}
                      </span>
                      <span className="text-xs text-text-muted">
                        Активных: {technician.activeRequests}
                      </span>
                      <span className="text-xs text-text-muted">
                        Завершено: {technician.completedToday}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Tabs */}
          <div className="bg-surface rounded-lg border border-border">
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('queue')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === 'queue' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Очередь заявок
                </button>
                <button
                  onClick={() => setActiveTab('calendar')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === 'calendar' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Календарь обслуживания
                </button>
                <button
                  onClick={() => setActiveTab('health')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === 'health' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Состояние машин
                </button>
                <button
                  onClick={() => setActiveTab('routes')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === 'routes' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Маршруты
                </button>
                <button
                  onClick={() => setActiveTab('tracking')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === 'tracking' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Отслеживание работ
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'queue' && (
                <ServiceRequestQueue
                  requests={filteredRequests}
                  onRequestSelect={setSelectedRequest}
                  filterStatus={filterStatus}
                  setFilterStatus={setFilterStatus}
                  filterPriority={filterPriority}
                  setFilterPriority={setFilterPriority}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              )}
              
              {activeTab === 'calendar' && (
                <ServiceCalendar
                  requests={serviceRequests}
                  technicians={technicians}
                />
              )}
              
              {activeTab === 'health' && (
                <MachineHealthDashboard />
              )}
              
              {activeTab === 'routes' && (
                <ServiceRouteMap
                  requests={serviceRequests}
                  technicians={technicians}
                />
              )}
              
              {activeTab === 'tracking' && (
                <WorkOrderTracking
                  requests={serviceRequests}
                  technicians={technicians}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Create Service Request Modal */}
      {isCreateModalOpen && (
        <CreateServiceRequestModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          technicians={technicians}
        />
      )}
    </div>
  );
};

export default MaintenanceServiceManagement;