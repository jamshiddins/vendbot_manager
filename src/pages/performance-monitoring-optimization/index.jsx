// src/pages/performance-monitoring-optimization/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import PerformanceDashboard from './components/PerformanceDashboard';
import PerformanceFilters from './components/PerformanceFilters';
import MetricsCharts from './components/MetricsCharts';
import OptimizationTools from './components/OptimizationTools';
import SystemHealthIndicators from './components/SystemHealthIndicators';

const PerformanceMonitoringOptimization = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [performanceFilters, setPerformanceFilters] = useState({
    timeRange: '24h',
    component: 'all',
    metric: 'all',
    threshold: 'all'
  });
  const [performanceData, setPerformanceData] = useState({
    responseTime: 125,
    memoryUsage: 68,
    cpuUtilization: 45,
    databaseQueries: 89,
    overallScore: 87
  });
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Simulate real-time performance monitoring
    const updateInterval = setInterval(() => {
      if (realTimeUpdates) {
        setPerformanceData(prev => ({
          responseTime: Math.max(50, Math.min(300, prev.responseTime + (Math.random() - 0.5) * 20)),
          memoryUsage: Math.max(30, Math.min(95, prev.memoryUsage + (Math.random() - 0.5) * 5)),
          cpuUtilization: Math.max(20, Math.min(90, prev.cpuUtilization + (Math.random() - 0.5) * 10)),
          databaseQueries: Math.max(50, Math.min(200, prev.databaseQueries + (Math.random() - 0.5) * 15)),
          overallScore: Math.max(60, Math.min(100, prev.overallScore + (Math.random() - 0.5) * 3))
        }));
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(updateInterval);
    };
  }, [realTimeUpdates]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleFilterChange = (filters) => {
    setPerformanceFilters(filters);
  };

  const handleOptimizationAction = (action, component) => {
    console.log(`Executing optimization: ${action} for component: ${component}`);
    // Simulate optimization action
    setTimeout(() => {
      setPerformanceData(prev => ({
        ...prev,
        overallScore: Math.min(100, prev.overallScore + Math.random() * 5)
      }));
    }, 2000);
  };

  const toggleRealTimeUpdates = () => {
    setRealTimeUpdates(!realTimeUpdates);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Загрузка системы мониторинга...</p>
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
                  Мониторинг производительности и оптимизация
                </h1>
                <p className="text-text-secondary">
                  Анализ производительности системы и автоматическая оптимизация
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleRealTimeUpdates}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    realTimeUpdates 
                      ? 'bg-success text-white hover:bg-success-600' :'bg-secondary-100 text-text-primary hover:bg-secondary-200'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    realTimeUpdates ? 'bg-white animate-pulse' : 'bg-text-muted'
                  }`}></div>
                  <span className="text-sm font-medium">
                    {realTimeUpdates ? 'Реальное время' : 'Обновления отключены'}
                  </span>
                </button>
                <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                  performanceData.overallScore >= 80 ? 'bg-success-50 text-success' :
                  performanceData.overallScore >= 60 ? 'bg-warning-50 text-warning': 'bg-error-50 text-error'
                }`}>
                  <Icon 
                    name={performanceData.overallScore >= 80 ? 'CheckCircle' : 
                          performanceData.overallScore >= 60 ? 'AlertTriangle' : 'AlertCircle'} 
                    size={16} 
                  />
                  <span className="text-sm font-medium">
                    Оценка: {Math.round(performanceData.overallScore)}/100
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Dashboard */}
          <div className="mb-6">
            <PerformanceDashboard 
              data={performanceData}
              realTimeUpdates={realTimeUpdates}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left Panel - Performance Filters */}
            <div className="xl:col-span-3">
              <PerformanceFilters 
                filters={performanceFilters}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* Center Panel - Metrics and Charts */}
            <div className="xl:col-span-6">
              <MetricsCharts 
                filters={performanceFilters}
                data={performanceData}
                realTimeUpdates={realTimeUpdates}
              />
            </div>

            {/* Right Panel - Optimization Tools & System Health */}
            <div className="xl:col-span-3 space-y-6">
              <OptimizationTools 
                onOptimizationAction={handleOptimizationAction}
                currentData={performanceData}
              />
              
              <SystemHealthIndicators 
                data={performanceData}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PerformanceMonitoringOptimization;