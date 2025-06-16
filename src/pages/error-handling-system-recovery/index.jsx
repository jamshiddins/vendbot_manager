// src/pages/error-handling-system-recovery/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import ErrorDashboard from './components/ErrorDashboard';
import ErrorFilters from './components/ErrorFilters';
import ErrorDetails from './components/ErrorDetails';
import SystemHealth from './components/SystemHealth';
import RecoveryTools from './components/RecoveryTools';
import AlertsPanel from './components/AlertsPanel';

const ErrorHandlingSystemRecovery = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedError, setSelectedError] = useState(null);
  const [errorFilters, setErrorFilters] = useState({
    severity: 'all',
    module: 'all',
    timeRange: '24h',
    status: 'all'
  });
  const [systemStatus, setSystemStatus] = useState({
    overallHealth: 'good',
    activeErrors: 12,
    criticalErrors: 2,
    recoveryInProgress: 3
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Simulate real-time error monitoring
    const updateInterval = setInterval(() => {
      // Simulate random error updates
      setSystemStatus(prev => ({
        ...prev,
        activeErrors: Math.floor(Math.random() * 20) + 5,
        criticalErrors: Math.floor(Math.random() * 5)
      }));
    }, 10000);

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

  const handleErrorSelect = (error) => {
    setSelectedError(error);
  };

  const handleFilterChange = (filters) => {
    setErrorFilters(filters);
  };

  const handleRecoveryAction = (action, errorId) => {
    console.log(`Executing recovery action: ${action} for error: ${errorId}`);
    // Simulate recovery action
    setSystemStatus(prev => ({
      ...prev,
      recoveryInProgress: prev.recoveryInProgress + 1
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Загрузка системы диагностики...</p>
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
                  Обработка ошибок и восстановление системы
                </h1>
                <p className="text-text-secondary">
                  Мониторинг ошибок, диагностика и автоматизированное восстановление
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                  systemStatus.overallHealth === 'good' ? 'bg-success-50 text-success' :
                  systemStatus.overallHealth === 'warning'? 'bg-warning-50 text-warning' : 'bg-error-50 text-error'
                }`}>
                  <Icon 
                    name={systemStatus.overallHealth === 'good' ? 'CheckCircle' : 
                          systemStatus.overallHealth === 'warning' ? 'AlertTriangle' : 'AlertCircle'} 
                    size={16} 
                  />
                  <span className="text-sm font-medium">
                    {systemStatus.overallHealth === 'good' ? 'Система стабильна' :
                     systemStatus.overallHealth === 'warning'? 'Требует внимания' : 'Критические ошибки'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts Panel */}
          <div className="mb-6">
            <AlertsPanel 
              criticalCount={systemStatus.criticalErrors}
              activeCount={systemStatus.activeErrors}
              recoveryCount={systemStatus.recoveryInProgress}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left Panel - Error Filters */}
            <div className="xl:col-span-3">
              <ErrorFilters 
                filters={errorFilters}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* Center Panel - Error Dashboard */}
            <div className="xl:col-span-6">
              <ErrorDashboard 
                filters={errorFilters}
                onErrorSelect={handleErrorSelect}
                selectedError={selectedError}
              />
              
              {selectedError && (
                <div className="mt-6">
                  <ErrorDetails 
                    error={selectedError}
                    onRecoveryAction={handleRecoveryAction}
                  />
                </div>
              )}
            </div>

            {/* Right Panel - System Health & Recovery Tools */}
            <div className="xl:col-span-3 space-y-6">
              <SystemHealth 
                status={systemStatus}
              />
              
              <RecoveryTools 
                onRecoveryAction={handleRecoveryAction}
                selectedError={selectedError}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErrorHandlingSystemRecovery;