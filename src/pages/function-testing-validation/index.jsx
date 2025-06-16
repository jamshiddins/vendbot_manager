// src/pages/function-testing-validation/index.jsx
import React, { useState } from 'react';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';

const FunctionTestingValidation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState('ui');
  const [runningTests, setRunningTests] = useState(new Set());
  const [testResults, setTestResults] = useState({});
  const [selectedTest, setSelectedTest] = useState(null);

  // Mock test data
  const testModules = {
    ui: {
      title: 'Интерфейс пользователя',
      icon: 'Monitor',
      tests: [
        {
          id: 'ui-001',
          name: 'Навигационное меню',
          description: 'Проверка работы главного меню и навигации',
          status: 'passed',
          lastRun: new Date(Date.now() - 10 * 60 * 1000),
          duration: '2.3s',
          steps: [
            { name: 'Загрузка страницы', status: 'passed', duration: '0.5s' },
            { name: 'Отображение меню', status: 'passed', duration: '0.2s' },
            { name: 'Переходы между разделами', status: 'passed', duration: '1.1s' },
            { name: 'Адаптивность на мобильных', status: 'passed', duration: '0.5s' }
          ]
        },
        {
          id: 'ui-002',
          name: 'Формы ввода данных',
          description: 'Тестирование всех форм в системе',
          status: 'failed',
          lastRun: new Date(Date.now() - 25 * 60 * 1000),
          duration: '1.8s',
          error: 'Validation error on machine form',
          steps: [
            { name: 'Форма добавления машины', status: 'failed', duration: '0.9s', error: 'Поле координат не валидируется' },
            { name: 'Форма пользователя', status: 'passed', duration: '0.4s' },
            { name: 'Форма настроек', status: 'passed', duration: '0.5s' }
          ]
        },
        {
          id: 'ui-003',
          name: 'Таблицы данных',
          description: 'Проверка сортировки, фильтрации и пагинации',
          status: 'warning',
          lastRun: new Date(Date.now() - 45 * 60 * 1000),
          duration: '3.1s',
          steps: [
            { name: 'Загрузка данных', status: 'passed', duration: '1.2s' },
            { name: 'Сортировка столбцов', status: 'passed', duration: '0.8s' },
            { name: 'Фильтрация', status: 'warning', duration: '1.1s', warning: 'Медленная загрузка фильтров' }
          ]
        }
      ]
    },
    database: {
      title: 'Операции с базой данных',
      icon: 'Database',
      tests: [
        {
          id: 'db-001',
          name: 'Подключение к БД',
          description: 'Тестирование соединения с базой данных',
          status: 'passed',
          lastRun: new Date(Date.now() - 5 * 60 * 1000),
          duration: '0.8s',
          steps: [
            { name: 'Подключение к основной БД', status: 'passed', duration: '0.3s' },
            { name: 'Подключение к аналитической БД', status: 'passed', duration: '0.5s' }
          ]
        },
        {
          id: 'db-002',
          name: 'CRUD операции',
          description: 'Создание, чтение, обновление и удаление данных',
          status: 'passed',
          lastRun: new Date(Date.now() - 15 * 60 * 1000),
          duration: '4.2s',
          steps: [
            { name: 'Создание записи', status: 'passed', duration: '1.1s' },
            { name: 'Чтение данных', status: 'passed', duration: '0.8s' },
            { name: 'Обновление записи', status: 'passed', duration: '1.3s' },
            { name: 'Удаление записи', status: 'passed', duration: '1.0s' }
          ]
        }
      ]
    },
    api: {
      title: 'API интеграции',
      icon: 'Zap',
      tests: [
        {
          id: 'api-001',
          name: 'Платежные системы',
          description: 'Тестирование интеграции с платежными шлюзами',
          status: 'passed',
          lastRun: new Date(Date.now() - 30 * 60 * 1000),
          duration: '5.6s',
          steps: [
            { name: 'Сбербанк API', status: 'passed', duration: '2.8s' },
            { name: 'Тинькофф API', status: 'passed', duration: '2.8s' }
          ]
        },
        {
          id: 'api-002',
          name: 'Внешние сервисы',
          description: 'Проверка интеграции с внешними API',
          status: 'warning',
          lastRun: new Date(Date.now() - 60 * 60 * 1000),
          duration: '8.2s',
          steps: [
            { name: 'Погодный API', status: 'passed', duration: '1.5s' },
            { name: 'Уведомления', status: 'warning', duration: '6.7s', warning: 'Высокое время отклика' }
          ]
        }
      ]
    },
    business: {
      title: 'Бизнес-логика',
      icon: 'Settings',
      tests: [
        {
          id: 'biz-001',
          name: 'Расчет выручки',
          description: 'Тестирование алгоритмов расчета финансовых показателей',
          status: 'passed',
          lastRun: new Date(Date.now() - 20 * 60 * 1000),
          duration: '1.5s',
          steps: [
            { name: 'Дневная выручка', status: 'passed', duration: '0.4s' },
            { name: 'Месячная выручка', status: 'passed', duration: '0.6s' },
            { name: 'Комиссии', status: 'passed', duration: '0.5s' }
          ]
        },
        {
          id: 'biz-002',
          name: 'Управление запасами',
          description: 'Алгоритмы пополнения и контроля остатков',
          status: 'failed',
          lastRun: new Date(Date.now() - 40 * 60 * 1000),
          duration: '2.1s',
          error: 'Incorrect stock calculation',
          steps: [
            { name: 'Подсчет остатков', status: 'failed', duration: '1.2s', error: 'Неверный алгоритм подсчета' },
            { name: 'Алерты пополнения', status: 'passed', duration: '0.9s' }
          ]
        }
      ]
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'passed': return 'CheckCircle';
      case 'failed': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      case 'running': return 'Loader2';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'passed': return 'text-success';
      case 'failed': return 'text-error';
      case 'warning': return 'text-warning';
      case 'running': return 'text-primary';
      default: return 'text-text-muted';
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      passed: 'bg-success-100 text-success border-success-200',
      failed: 'bg-error-100 text-error border-error-200',
      warning: 'bg-warning-100 text-warning border-warning-200',
      running: 'bg-primary-100 text-primary border-primary-200'
    };

    const labels = {
      passed: 'Успешно',
      failed: 'Ошибка',
      warning: 'Предупреждение',
      running: 'Выполняется'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        <Icon 
          name={getStatusIcon(status)} 
          size={12} 
          className={`mr-1 ${status === 'running' ? 'animate-spin' : ''}`}
        />
        {labels[status] || 'Неизвестно'}
      </span>
    );
  };

  const runTest = (testId) => {
    setRunningTests(prev => new Set([...prev, testId]));
    
    // Simulate test execution
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      const newStatus = success ? 'passed' : (Math.random() > 0.5 ? 'failed' : 'warning');
      
      setTestResults(prev => ({
        ...prev,
        [testId]: {
          status: newStatus,
          duration: `${(Math.random() * 5 + 1).toFixed(1)}s`,
          timestamp: new Date()
        }
      }));
      
      setRunningTests(prev => {
        const newSet = new Set(prev);
        newSet.delete(testId);
        return newSet;
      });
    }, 3000);
  };

  const runAllTests = () => {
    const allTests = Object.values(testModules).flatMap(module => module.tests.map(test => test.id));
    allTests.forEach(testId => {
      setTimeout(() => runTest(testId), Math.random() * 1000);
    });
  };

  const getTotalTests = () => {
    return Object.values(testModules).reduce((total, module) => total + module.tests.length, 0);
  };

  const getPassedTests = () => {
    return Object.values(testModules).reduce((total, module) => {
      return total + module.tests.filter(test => {
        const result = testResults[test.id];
        return (result?.status || test.status) === 'passed';
      }).length;
    }, 0);
  };

  const getFailedTests = () => {
    return Object.values(testModules).reduce((total, module) => {
      return total + module.tests.filter(test => {
        const result = testResults[test.id];
        return (result?.status || test.status) === 'failed';
      }).length;
    }, 0);
  };

  const formatLastRun = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} мин назад`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} ч назад`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} дн назад`;
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
                Тестирование и валидация функций
              </h1>
              <p className="text-text-secondary">
                Автоматическое и ручное тестирование всех компонентов системы
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-200">
                <Icon name="FileText" size={16} />
                <span>Отчет о тестах</span>
              </button>
              
              <button 
                onClick={runAllTests}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                <Icon name="Play" size={16} />
                <span>Запустить все тесты</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Всего тестов</p>
                  <p className="text-2xl font-bold text-text-primary">{getTotalTests()}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon name="TestTube" size={24} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Успешных</p>
                  <p className="text-2xl font-bold text-success">{getPassedTests()}</p>
                </div>
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-success" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">С ошибками</p>
                  <p className="text-2xl font-bold text-error">{getFailedTests()}</p>
                </div>
                <div className="w-12 h-12 bg-error-100 rounded-lg flex items-center justify-center">
                  <Icon name="XCircle" size={24} className="text-error" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Покрытие кода</p>
                  <p className="text-2xl font-bold text-text-primary">87.3%</p>
                </div>
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <Icon name="Target" size={24} className="text-accent" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-12 gap-6">
            {/* Test Categories - Left Panel (30%) */}
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-surface rounded-lg border border-border">
                <div className="p-4 border-b border-border">
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    Модули тестирования
                  </h3>
                </div>
                <div className="p-4 space-y-2">
                  {Object.entries(testModules).map(([key, module]) => {
                    const moduleTests = module.tests;
                    const passedCount = moduleTests.filter(test => {
                      const result = testResults[test.id];
                      return (result?.status || test.status) === 'passed';
                    }).length;
                    
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedModule(key);
                          setSelectedTest(null);
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                          selectedModule === key 
                            ? 'bg-primary-50 text-primary border border-primary-200' :'hover:bg-secondary-50 text-text-primary border border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <Icon name={module.icon} size={20} />
                            <span className="font-medium">{module.title}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-text-secondary">
                            {passedCount}/{moduleTests.length} тестов
                          </span>
                          <div className="flex items-center space-x-1">
                            <div className="w-16 bg-secondary-100 rounded-full h-1.5">
                              <div 
                                className="bg-success h-1.5 rounded-full" 
                                style={{ width: `${(passedCount / moduleTests.length) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-text-muted">
                              {Math.round((passedCount / moduleTests.length) * 100)}%
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Test List - Center Section (50%) */}
            <div className="col-span-12 lg:col-span-5">
              <div className="bg-surface rounded-lg border border-border">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-heading font-semibold text-text-primary">
                      {testModules[selectedModule]?.title || 'Тесты'}
                    </h3>
                    <button 
                      onClick={() => {
                        testModules[selectedModule]?.tests.forEach(test => runTest(test.id));
                      }}
                      className="flex items-center space-x-2 px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                    >
                      <Icon name="Play" size={14} />
                      <span className="text-sm">Запустить модуль</span>
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {testModules[selectedModule]?.tests.map(test => {
                    const isRunning = runningTests.has(test.id);
                    const result = testResults[test.id];
                    const currentStatus = isRunning ? 'running' : (result?.status || test.status);
                    
                    return (
                      <div 
                        key={test.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                          selectedTest?.id === test.id
                            ? 'border-primary-200 bg-primary-50' :'border-border hover:bg-secondary-50'
                        }`}
                        onClick={() => setSelectedTest(test)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-text-primary">{test.name}</h4>
                              {getStatusBadge(currentStatus)}
                            </div>
                            <p className="text-sm text-text-secondary mb-2">{test.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-text-muted">
                              <span>Последний запуск: {formatLastRun(result?.timestamp || test.lastRun)}</span>
                              <span>Время: {result?.duration || test.duration}</span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              runTest(test.id);
                            }}
                            disabled={isRunning}
                            className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
                            title="Запустить тест"
                          >
                            <Icon 
                              name={isRunning ? 'Loader2' : 'Play'} 
                              size={16} 
                              className={isRunning ? 'animate-spin' : ''}
                            />
                          </button>
                        </div>
                        
                        {(test.error || (result?.status === 'failed')) && (
                          <div className="mt-2 p-2 bg-error-50 border border-error-200 rounded text-sm text-error">
                            <Icon name="AlertCircle" size={14} className="inline mr-1" />
                            {test.error || 'Test failed'}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Test Details - Right Panel (20%) */}
            <div className="col-span-12 lg:col-span-3">
              <div className="bg-surface rounded-lg border border-border mb-6">
                <div className="p-4 border-b border-border">
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    Детали теста
                  </h3>
                </div>
                <div className="p-4">
                  {selectedTest ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-text-primary mb-2">{selectedTest.name}</h4>
                        <p className="text-sm text-text-secondary mb-3">{selectedTest.description}</p>
                        {getStatusBadge(testResults[selectedTest.id]?.status || selectedTest.status)}
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-text-primary mb-2">Шаги выполнения</h5>
                        <div className="space-y-2">
                          {selectedTest.steps.map((step, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <Icon 
                                name={getStatusIcon(step.status)} 
                                size={14} 
                                className={`mt-0.5 ${getStatusColor(step.status)}`}
                              />
                              <div className="flex-1">
                                <div className="text-sm text-text-primary">{step.name}</div>
                                <div className="text-xs text-text-muted">{step.duration}</div>
                                {step.error && (
                                  <div className="text-xs text-error mt-1">{step.error}</div>
                                )}
                                {step.warning && (
                                  <div className="text-xs text-warning mt-1">{step.warning}</div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="border-t border-border pt-4">
                        <button 
                          onClick={() => runTest(selectedTest.id)}
                          disabled={runningTests.has(selectedTest.id)}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50"
                        >
                          <Icon 
                            name={runningTests.has(selectedTest.id) ? 'Loader2' : 'Play'} 
                            size={16} 
                            className={runningTests.has(selectedTest.id) ? 'animate-spin' : ''}
                          />
                          <span>Запустить тест</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Icon name="TestTube" size={48} className="text-text-muted mx-auto mb-4" />
                      <p className="text-text-secondary">Выберите тест для просмотра деталей</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Test Logs */}
              <div className="bg-surface rounded-lg border border-border">
                <div className="p-4 border-b border-border">
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    Логи выполнения
                  </h3>
                </div>
                <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
                  <div className="text-xs">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-text-secondary">15:45</span>
                    </div>
                    <p className="text-text-primary">UI тест навигации завершен успешно</p>
                  </div>
                  <div className="text-xs">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-error rounded-full"></div>
                      <span className="text-text-secondary">15:40</span>
                    </div>
                    <p className="text-text-primary">Ошибка в тесте формы добавления машины</p>
                  </div>
                  <div className="text-xs">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                      <span className="text-text-secondary">15:35</span>
                    </div>
                    <p className="text-text-primary">Медленная загрузка в тесте таблиц</p>
                  </div>
                  <div className="text-xs">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-text-secondary">15:30</span>
                    </div>
                    <p className="text-text-primary">Тест подключения к БД прошел успешно</p>
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

export default FunctionTestingValidation;