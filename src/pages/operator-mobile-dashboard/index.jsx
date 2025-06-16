// src/pages/operator-mobile-dashboard/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';
import TaskCard from './components/TaskCard';
import AssignmentOverview from './components/AssignmentOverview';
import QuickActions from './components/QuickActions';
import NavigationMap from './components/NavigationMap';
import ProgressTracker from './components/ProgressTracker';
import NotificationPanel from './components/NotificationPanel';

const OperatorMobileDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('tasks');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [syncStatus, setSyncStatus] = useState('synced');

  // Mock data for current assignments
  const [currentAssignment, setCurrentAssignment] = useState({
    id: 'A001',
    machineId: 'VM-045',
    location: 'Торговый центр "Галерея"',
    address: 'ул. Ленина, 123',
    serviceType: 'Полное обслуживание',
    priority: 'high',
    estimatedTime: '45 мин',
    distance: '2.3 км',
    status: 'in_progress'
  });

  const [tasks, setTasks] = useState([
    {
      id: 'T001',
      title: 'Проверка общего состояния',
      description: 'Визуальный осмотр корпуса и дисплея',
      status: 'completed',
      required: true,
      photos: ['machine_external.jpg']
    },
    {
      id: 'T002',
      title: 'Пополнение кофе',
      description: 'Загрузить 5 кг зернового кофе',
      status: 'in_progress',
      required: true,
      quantity: { current: 2, total: 5, unit: 'кг' }
    },
    {
      id: 'T003',
      title: 'Пополнение сахара',
      description: 'Загрузить 3 кг сахара',
      status: 'pending',
      required: true,
      quantity: { current: 0, total: 3, unit: 'кг' }
    },
    {
      id: 'T004',
      title: 'Очистка монетоприемника',
      description: 'Проверить и очистить от мусора',
      status: 'pending',
      required: false
    },
    {
      id: 'T005',
      title: 'Тестирование напитков',
      description: 'Приготовить тестовые порции всех напитков',
      status: 'pending',
      required: true
    }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 'N001',
      type: 'priority',
      title: 'Срочное задание',
      message: 'Машина VM-078 требует немедленного внимания',
      time: '5 мин назад',
      unread: true
    },
    {
      id: 'N002',
      type: 'update',
      title: 'Маршрут обновлен',
      message: 'Добавлена новая точка обслуживания',
      time: '15 мин назад',
      unread: true
    }
  ]);

  // Handle online/offline status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
      if (navigator.onLine) {
        setSyncStatus('syncing');
        // Simulate sync process
        setTimeout(() => setSyncStatus('synced'), 2000);
      }
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoadingLocation(false);
        }
      );
    } else {
      setIsLoadingLocation(false);
    }
  }, []);

  const handleTaskUpdate = (taskId, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const handleEmergencyCall = () => {
    // Emergency call functionality
    const confirmed = window.confirm('Вызвать службу экстренного реагирования?');
    if (confirmed) {
      // Simulate emergency call
      alert('Вызов отправлен. Ожидайте связи с диспетчером.');
    }
  };

  const handleSupervisorContact = () => {
    // Contact supervisor
    navigate('/contact-supervisor', { state: { assignment: currentAssignment } });
  };

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'syncing': return 'RefreshCw';
      case 'synced': return 'Check';
      case 'error': return 'AlertCircle';
      default: return 'Cloud';
    }
  };

  const getSyncStatusColor = () => {
    switch (syncStatus) {
      case 'syncing': return 'text-warning';
      case 'synced': return 'text-success';
      case 'error': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-surface border-b border-border px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/dashboard-overview')}
              className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
            >
              <Icon name="ArrowLeft" size={20} className="text-text-primary" />
            </button>
            <div>
              <h1 className="text-lg font-heading font-semibold text-text-primary">
                Мобильная панель
              </h1>
              <p className="text-sm text-text-secondary">
                Задание #{currentAssignment?.id}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Sync Status */}
            <div className={`flex items-center space-x-1 ${getSyncStatusColor()}`}>
              <Icon 
                name={getSyncStatusIcon()} 
                size={16} 
                className={syncStatus === 'syncing' ? 'animate-spin' : ''}
              />
            </div>
            
            {/* Online Status */}
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success animate-pulse' : 'bg-error'}`}></div>
              <span className="text-xs text-text-secondary">
                {isOnline ? 'Онлайн' : 'Офлайн'}
              </span>
            </div>
            
            {/* Notifications */}
            <button 
              onClick={() => setActiveTab('notifications')}
              className="relative p-2 rounded-lg hover:bg-secondary-100 transition-colors"
            >
              <Icon name="Bell" size={20} className="text-text-primary" />
              {notifications.filter(n => n.unread).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.filter(n => n.unread).length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {activeTab === 'tasks' && (
          <div className="h-full flex flex-col">
            {/* Assignment Overview */}
            <div className="px-4 py-3 bg-surface border-b border-border">
              <AssignmentOverview 
                assignment={currentAssignment}
                onNavigate={() => setActiveTab('map')}
              />
            </div>
            
            {/* Progress Tracker */}
            <div className="px-4 py-3 bg-secondary-50 border-b border-border">
              <ProgressTracker 
                completed={completedTasks}
                total={totalTasks}
                percentage={progressPercentage}
              />
            </div>
            
            {/* Task List */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={(updates) => handleTaskUpdate(task.id, updates)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="h-full">
            <NavigationMap 
              currentLocation={currentLocation}
              destination={currentAssignment}
              isLoadingLocation={isLoadingLocation}
            />
          </div>
        )}

        {activeTab === 'actions' && (
          <div className="p-4">
            <QuickActions 
              onEmergencyCall={handleEmergencyCall}
              onSupervisorContact={handleSupervisorContact}
              currentAssignment={currentAssignment}
            />
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="h-full">
            <NotificationPanel 
              notifications={notifications}
              onMarkAsRead={(id) => {
                setNotifications(prev => prev.map(n => 
                  n.id === id ? { ...n, unread: false } : n
                ));
              }}
            />
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-surface border-t border-border px-4 py-2 safe-area-inset-bottom">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors min-w-0 ${
              activeTab === 'tasks' ?'text-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
            }`}
          >
            <Icon name="CheckSquare" size={20} />
            <span className="text-xs font-medium">Задачи</span>
            {tasks.filter(t => t.status === 'pending').length > 0 && (
              <span className="absolute -top-1 -right-1 bg-warning text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {tasks.filter(t => t.status === 'pending').length}
              </span>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors min-w-0 ${
              activeTab === 'map' ?'text-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
            }`}
          >
            <Icon name="Map" size={20} />
            <span className="text-xs font-medium">Карта</span>
          </button>
          
          <button
            onClick={() => setActiveTab('actions')}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors min-w-0 ${
              activeTab === 'actions' ?'text-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
            }`}
          >
            <Icon name="Zap" size={20} />
            <span className="text-xs font-medium">Действия</span>
          </button>
          
          <button
            onClick={() => setActiveTab('notifications')}
            className={`relative flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors min-w-0 ${
              activeTab === 'notifications' 
                ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
            }`}
          >
            <Icon name="Bell" size={20} />
            <span className="text-xs font-medium">Уведомления</span>
            {notifications.filter(n => n.unread).length > 0 && (
              <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notifications.filter(n => n.unread).length}
              </span>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default OperatorMobileDashboard;