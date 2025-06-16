// src/pages/api-integration-management/index.jsx
import React, { useState } from 'react';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';

const ApiIntegrationManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState('database');
  const [activeConnection, setActiveConnection] = useState(null);
  const [testResults, setTestResults] = useState({});

  // Mock data for integrations
  const integrations = {
    database: {
      title: 'База данных',
      icon: 'Database',
      connections: [
        {
          id: 'main-db',
          name: 'Основная БД',
          type: 'PostgreSQL',
          status: 'connected',
          host: 'vendbot-main.postgres.com',
          port: 5432,
          database: 'vendbot_production',
          lastCheck: new Date(Date.now() - 2 * 60 * 1000),
          responseTime: 45,
          connections: 12
        },
        {
          id: 'analytics-db',
          name: 'Аналитическая БД',
          type: 'MongoDB',
          status: 'warning',
          host: 'vendbot-analytics.mongo.com',
          port: 27017,
          database: 'vendbot_analytics',
          lastCheck: new Date(Date.now() - 5 * 60 * 1000),
          responseTime: 120,
          connections: 3
        },
        {
          id: 'backup-db',
          name: 'Резервная БД',
          type: 'MySQL',
          status: 'disconnected',
          host: 'vendbot-backup.mysql.com',
          port: 3306,
          database: 'vendbot_backup',
          lastCheck: new Date(Date.now() - 30 * 60 * 1000),
          responseTime: null,
          connections: 0
        }
      ]
    },
    payment: {
      title: 'Платежные шлюзы',
      icon: 'CreditCard',
      connections: [
        {
          id: 'sberbank',
          name: 'Сбербанк',
          type: 'REST API',
          status: 'connected',
          endpoint: 'https://api.sberbank.ru/v1',
          lastCheck: new Date(Date.now() - 1 * 60 * 1000),
          responseTime: 250,
          dailyTransactions: 1247
        },
        {
          id: 'tinkoff',
          name: 'Тинькофф',
          type: 'REST API',
          status: 'connected',
          endpoint: 'https://api.tinkoff.ru/v2',
          lastCheck: new Date(Date.now() - 3 * 60 * 1000),
          responseTime: 189,
          dailyTransactions: 892
        }
      ]
    },
    inventory: {
      title: 'Инвентарные системы',
      icon: 'Package',
      connections: [
        {
          id: 'warehouse-sys',
          name: 'Система складского учета',
          type: 'SOAP API',
          status: 'connected',
          endpoint: 'https://warehouse.vendbot.com/api',
          lastCheck: new Date(Date.now() - 10 * 60 * 1000),
          responseTime: 340,
          syncStatus: 'synced'
        }
      ]
    },
    thirdParty: {
      title: 'Внешние сервисы',
      icon: 'Globe',
      connections: [
        {
          id: 'weather-api',
          name: 'Погодный сервис',
          type: 'REST API',
          status: 'connected',
          endpoint: 'https://api.weather.com/v1',
          lastCheck: new Date(Date.now() - 15 * 60 * 1000),
          responseTime: 95,
          dailyRequests: 456
        },
        {
          id: 'notification-service',
          name: 'Сервис уведомлений',
          type: 'WebSocket',
          status: 'warning',
          endpoint: 'wss://notifications.vendbot.com',
          lastCheck: new Date(Date.now() - 20 * 60 * 1000),
          responseTime: 2000,
          dailyMessages: 1024
        }
      ]
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'warning': return 'text-warning';
      case 'disconnected': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      connected: 'bg-success-100 text-success border-success-200',
      warning: 'bg-warning-100 text-warning border-warning-200',
      disconnected: 'bg-error-100 text-error border-error-200'
    };

    const labels = {
      connected: 'Подключено',
      warning: 'Предупреждение',
      disconnected: 'Отключено'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        <div className={`w-1.5 h-1.5 rounded-full mr-1 ${status === 'connected' ? 'bg-success' : status === 'warning' ? 'bg-warning' : 'bg-error'}`}></div>
        {labels[status] || 'Неизвестно'}
      </span>
    );
  };

  const handleTestConnection = (connectionId) => {
    setTestResults(prev => ({ ...prev, [connectionId]: 'testing' }));
    
    // Simulate API call
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate
      setTestResults(prev => ({
        ...prev,
        [connectionId]: success ? 'success' : 'failed'
      }));
    }, 2000);
  };

  const renderConnectionDetails = () => {
    if (!activeConnection) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Icon name="Database" size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary">Выберите подключение для просмотра деталей</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Connection Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name={integrations[selectedIntegration]?.icon || 'Database'} size={24} className="text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-text-primary">{activeConnection.name}</h3>
              <p className="text-sm text-text-secondary">{activeConnection.type}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusBadge(activeConnection.status)}
            <button
              onClick={() => handleTestConnection(activeConnection.id)}
              disabled={testResults[activeConnection.id] === 'testing'}
              className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50"
            >
              {testResults[activeConnection.id] === 'testing' ? (
                <Icon name="Loader2" size={16} className="animate-spin" />
              ) : (
                <Icon name="Play" size={16} />
              )}
              <span>Тест подключения</span>
            </button>
          </div>
        </div>

        {/* Test Results */}
        {testResults[activeConnection.id] && testResults[activeConnection.id] !== 'testing' && (
          <div className={`p-4 rounded-lg border ${
            testResults[activeConnection.id] === 'success' ?'bg-success-50 border-success-200 text-success-800' :'bg-error-50 border-error-200 text-error-800'
          }`}>
            <div className="flex items-center space-x-2">
              <Icon 
                name={testResults[activeConnection.id] === 'success' ? 'CheckCircle' : 'XCircle'} 
                size={16} 
              />
              <span className="font-medium">
                {testResults[activeConnection.id] === 'success' ?'Подключение успешно' :'Ошибка подключения'
                }
              </span>
            </div>
          </div>
        )}

        {/* Configuration Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {activeConnection.host ? 'Хост' : 'Endpoint'}
            </label>
            <input
              type="text"
              value={activeConnection.host || activeConnection.endpoint || ''}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              readOnly
            />
          </div>

          {activeConnection.port && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Порт
              </label>
              <input
                type="number"
                value={activeConnection.port}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                readOnly
              />
            </div>
          )}

          {activeConnection.database && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                База данных
              </label>
              <input
                type="text"
                value={activeConnection.database}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                readOnly
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Время отклика (мс)
            </label>
            <input
              type="text"
              value={activeConnection.responseTime ? `${activeConnection.responseTime} мс` : 'N/A'}
              className="w-full px-3 py-2 border border-border rounded-lg bg-secondary-50"
              readOnly
            />
          </div>
        </div>
      </div>
    );
  };

  const getTotalConnections = () => {
    return Object.values(integrations).reduce((total, category) => {
      return total + category.connections.length;
    }, 0);
  };

  const getActiveConnections = () => {
    return Object.values(integrations).reduce((total, category) => {
      return total + category.connections.filter(conn => conn.status === 'connected').length;
    }, 0);
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
                Управление API интеграциями
              </h1>
              <p className="text-text-secondary">
                Мониторинг и настройка подключений к внешним системам и сервисам
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-200">
                <Icon name="RefreshCw" size={16} />
                <span>Обновить все</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                <Icon name="Plus" size={16} />
                <span>Добавить интеграцию</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Всего интеграций</p>
                  <p className="text-2xl font-bold text-text-primary">{getTotalConnections()}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={24} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Активные</p>
                  <p className="text-2xl font-bold text-success">{getActiveConnections()}</p>
                </div>
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-success" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Предупреждения</p>
                  <p className="text-2xl font-bold text-warning">2</p>
                </div>
                <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={24} className="text-warning" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Отключенные</p>
                  <p className="text-2xl font-bold text-error">1</p>
                </div>
                <div className="w-12 h-12 bg-error-100 rounded-lg flex items-center justify-center">
                  <Icon name="XCircle" size={24} className="text-error" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-12 gap-6">
            {/* Integration Categories - Left Panel (30%) */}
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-surface rounded-lg border border-border">
                <div className="p-4 border-b border-border">
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    Категории интеграций
                  </h3>
                </div>
                <div className="p-4 space-y-2">
                  {Object.entries(integrations).map(([key, category]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedIntegration(key);
                        setActiveConnection(null);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${
                        selectedIntegration === key 
                          ? 'bg-primary-50 text-primary border border-primary-200' :'hover:bg-secondary-50 text-text-primary'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={category.icon} size={20} />
                        <span className="font-medium">{category.title}</span>
                      </div>
                      <span className="text-xs bg-secondary-100 text-text-secondary px-2 py-1 rounded-full">
                        {category.connections.length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Connections List */}
              <div className="bg-surface rounded-lg border border-border mt-6">
                <div className="p-4 border-b border-border">
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    {integrations[selectedIntegration]?.title || 'Подключения'}
                  </h3>
                </div>
                <div className="p-4 space-y-2">
                  {integrations[selectedIntegration]?.connections?.map(connection => (
                    <button
                      key={connection.id}
                      onClick={() => setActiveConnection(connection)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors duration-200 ${
                        activeConnection?.id === connection.id
                          ? 'bg-primary-50 border-primary-200' :'hover:bg-secondary-50 border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-text-primary">{connection.name}</span>
                        {getStatusBadge(connection.status)}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {connection.type} • {connection.responseTime ? `${connection.responseTime}ms` : 'N/A'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Configuration Details - Center Section (50%) */}
            <div className="col-span-12 lg:col-span-5">
              <div className="bg-surface rounded-lg border border-border">
                <div className="p-4 border-b border-border">
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    Конфигурация подключения
                  </h3>
                </div>
                <div className="p-6">
                  {renderConnectionDetails()}
                </div>
              </div>
            </div>

            {/* Logs and Metrics - Right Panel (20%) */}
            <div className="col-span-12 lg:col-span-3">
              <div className="bg-surface rounded-lg border border-border mb-6">
                <div className="p-4 border-b border-border">
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    Логи подключений
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  <div className="text-xs">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-text-secondary">15:30</span>
                    </div>
                    <p className="text-text-primary">Основная БД подключена</p>
                  </div>
                  <div className="text-xs">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                      <span className="text-text-secondary">15:25</span>
                    </div>
                    <p className="text-text-primary">Медленный отклик MongoDB</p>
                  </div>
                  <div className="text-xs">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-error rounded-full"></div>
                      <span className="text-text-secondary">15:15</span>
                    </div>
                    <p className="text-text-primary">Потеряно соединение с резервной БД</p>
                  </div>
                </div>
              </div>

              <div className="bg-surface rounded-lg border border-border">
                <div className="p-4 border-b border-border">
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    Метрики производительности
                  </h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-secondary">Среднее время отклика</span>
                      <span className="text-text-primary font-medium">245ms</span>
                    </div>
                    <div className="w-full bg-secondary-100 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-secondary">Успешность соединений</span>
                      <span className="text-text-primary font-medium">97.2%</span>
                    </div>
                    <div className="w-full bg-secondary-100 rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '97%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-secondary">Использование ресурсов</span>
                      <span className="text-text-primary font-medium">43%</span>
                    </div>
                    <div className="w-full bg-secondary-100 rounded-full h-2">
                      <div className="bg-warning h-2 rounded-full" style={{ width: '43%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApiIntegrationManagement;