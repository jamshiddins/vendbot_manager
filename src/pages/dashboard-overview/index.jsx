import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import KPICards from './components/KPICards';
import MachineMap from './components/MachineMap';
import RecentAlerts from './components/RecentAlerts';
import RevenueTrend from './components/RevenueTrend';
import QuickActions from './components/QuickActions';
import SystemStatus from './components/SystemStatus';

const DashboardOverview = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock real-time data simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Simulate real-time updates
    const updateInterval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => {
      clearTimeout(timer);
      clearInterval(updateInterval);
    };
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Загрузка панели управления...</p>
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
                  Панель управления
                </h1>
                <p className="text-text-secondary">
                  Обзор состояния парка торговых автоматов
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Clock" size={16} />
                  <span>Обновлено: {lastUpdate.toLocaleTimeString('ru-RU')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm text-success font-medium">В сети</span>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="mb-8">
            <KPICards />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Map Section - Takes 2 columns on XL screens */}
            <div className="xl:col-span-2">
              <MachineMap />
            </div>
            
            {/* Alerts Section */}
            <div className="xl:col-span-1">
              <RecentAlerts />
            </div>
          </div>

          {/* Revenue and System Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <RevenueTrend />
            <SystemStatus />
          </div>

          {/* Quick Actions */}
          <QuickActions />
        </div>
      </main>
    </div>
  );
};

export default DashboardOverview;