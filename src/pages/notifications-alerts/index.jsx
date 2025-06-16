// src/pages/notifications-alerts/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import FilterPanel from './components/FilterPanel';
import NotificationsList from './components/NotificationsList';
import StatisticsPanel from './components/StatisticsPanel';
import BulkActionsModal from './components/BulkActionsModal';
import NotificationDetailsModal from './components/NotificationDetailsModal';
import SettingsModal from './components/SettingsModal';

const NotificationsAlerts = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showNotificationDetails, setShowNotificationDetails] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    priority: 'all',
    dateRange: '7d'
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'Критическая ошибка автомата АВ-001',
      description: 'Автомат не отвечает на команды более 30 минут',
      machine: 'АВ-001',
      location: 'ТЦ Европа, 1 этаж',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      status: 'new',
      priority: 'critical',
      assignee: null,
      actions: ['Перезагрузить', 'Отправить техника', 'Отключить']
    },
    {
      id: 2,
      type: 'warning',
      title: 'Низкий уровень запасов',
      description: 'В автомате АВ-015 закончились товары в позиции A1-A3',
      machine: 'АВ-015',
      location: 'Офисный центр "Сити", 3 этаж',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      status: 'read',
      priority: 'medium',
      assignee: 'Петров И.В.',
      actions: ['Запланировать пополнение', 'Уведомить поставщика']
    },
    {
      id: 3,
      type: 'info',
      title: 'Успешное обновление ПО',
      description: 'Автомат АВ-032 успешно обновлен до версии 2.1.3',
      machine: 'АВ-032',
      location: 'Метро "Площадь Революции"',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: 'archived',
      priority: 'low',
      assignee: null,
      actions: []
    }
  ]);

  useEffect(() => {
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

  const handleNotificationSelect = (notificationId) => {
    setSelectedNotifications(prev => {
      const isSelected = prev.includes(notificationId);
      if (isSelected) {
        return prev.filter(id => id !== notificationId);
      } else {
        return [...prev, notificationId];
      }
    });
  };

  const handleSelectAll = () => {
    const filteredNotifications = getFilteredNotifications();
    const allIds = filteredNotifications.map(n => n.id);
    setSelectedNotifications(allIds);
  };

  const handleDeselectAll = () => {
    setSelectedNotifications([]);
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowNotificationDetails(true);
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'for notifications:', selectedNotifications);
    // Implement bulk actions logic here
    setSelectedNotifications([]);
    setShowBulkActions(false);
  };

  const getFilteredNotifications = () => {
    return notifications.filter(notification => {
      if (filters.type !== 'all' && notification.type !== filters.type) return false;
      if (filters.status !== 'all' && notification.status !== filters.status) return false;
      if (filters.priority !== 'all' && notification.priority !== filters.priority) return false;
      
      // Date range filter
      const now = new Date();
      const notificationDate = new Date(notification.timestamp);
      const diffDays = Math.floor((now - notificationDate) / (1000 * 60 * 60 * 24));
      
      switch (filters.dateRange) {
        case '1d': return diffDays <= 1;
        case '7d': return diffDays <= 7;
        case '30d': return diffDays <= 30;
        case 'all': return true;
        default: return true;
      }
    });
  };

  const getNotificationStats = () => {
    const total = notifications.length;
    const critical = notifications.filter(n => n.priority === 'critical').length;
    const unread = notifications.filter(n => n.status === 'new').length;
    const assigned = notifications.filter(n => n.assignee).length;
    
    return { total, critical, unread, assigned };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Загрузка уведомлений...</p>
        </div>
      </div>
    );
  }

  const filteredNotifications = getFilteredNotifications();
  const stats = getNotificationStats();

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
                  Уведомления и Алерты
                </h1>
                <p className="text-text-secondary">
                  Централизованное управление системными оповещениями
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-surface border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-200"
                >
                  <Icon name="Settings" size={16} />
                  <span className="text-sm font-medium">Настройки</span>
                </button>
                {selectedNotifications.length > 0 && (
                  <button
                    onClick={() => setShowBulkActions(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
                  >
                    <Icon name="CheckSquare" size={16} />
                    <span className="text-sm font-medium">
                      Действия ({selectedNotifications.length})
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Filter Panel */}
            <div className="xl:col-span-1">
              <FilterPanel 
                filters={filters}
                onFiltersChange={setFilters}
                stats={stats}
              />
            </div>

            {/* Notifications List */}
            <div className="xl:col-span-2">
              <NotificationsList
                notifications={filteredNotifications}
                selectedNotifications={selectedNotifications}
                onNotificationSelect={handleNotificationSelect}
                onNotificationClick={handleNotificationClick}
                onSelectAll={handleSelectAll}
                onDeselectAll={handleDeselectAll}
              />
            </div>

            {/* Statistics Panel */}
            <div className="xl:col-span-1">
              <StatisticsPanel stats={stats} />
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showBulkActions && (
        <BulkActionsModal
          selectedCount={selectedNotifications.length}
          onAction={handleBulkAction}
          onClose={() => setShowBulkActions(false)}
        />
      )}

      {showNotificationDetails && selectedNotification && (
        <NotificationDetailsModal
          notification={selectedNotification}
          onClose={() => setShowNotificationDetails(false)}
        />
      )}

      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

export default NotificationsAlerts;