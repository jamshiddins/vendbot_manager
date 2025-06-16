// src/pages/performance-monitoring-optimization/components/OptimizationTools.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const OptimizationTools = ({ onOptimizationAction, currentData }) => {
  const [runningOptimization, setRunningOptimization] = useState(null);
  const [expanded, setExpanded] = useState({});

  const optimizationTools = [
    {
      id: 'cache-optimization',
      title: 'Оптимизация кэша',
      description: 'Анализирует и оптимизирует стратегии кэширования для улучшения производительности.',
      icon: 'Zap',
      impact: 'medium',
      estimatedTime: '3-5 мин',
      actions: [
        { id: 'analyze', label: 'Анализировать использование кэша', time: '~2 мин' },
        { id: 'optimize', label: 'Оптимизировать стратегию кэширования', time: '~3 мин' },
        { id: 'clear', label: 'Очистить кэш', time: '<1 мин' }
      ]
    },
    {
      id: 'db-query-optimization',
      title: 'Оптимизация запросов БД',
      description: 'Находит и оптимизирует медленные запросы к базе данных.',
      icon: 'Database',
      impact: 'high',
      estimatedTime: '5-8 мин',
      actions: [
        { id: 'analyze', label: 'Анализировать производительность запросов', time: '~3 мин' },
        { id: 'index', label: 'Создать недостающие индексы', time: '~5 мин' },
        { id: 'rewrite', label: 'Переписать проблемные запросы', time: '~5 мин' }
      ]
    },
    {
      id: 'memory-management',
      title: 'Управление памятью',
      description: 'Анализирует использование памяти и устраняет утечки.',
      icon: 'MemoryStick',
      impact: 'medium',
      estimatedTime: '4-6 мин',
      actions: [
        { id: 'analyze', label: 'Анализировать использование памяти', time: '~3 мин' },
        { id: 'optimize', label: 'Оптимизировать использование ресурсов', time: '~4 мин' },
        { id: 'clean', label: 'Очистить неиспользуемые ресурсы', time: '~2 мин' }
      ]
    },
    {
      id: 'asset-optimization',
      title: 'Оптимизация ресурсов',
      description: 'Сжимает и оптимизирует статические ресурсы для быстрой загрузки.',
      icon: 'FileImage',
      impact: 'low',
      estimatedTime: '2-4 мин',
      actions: [
        { id: 'analyze', label: 'Анализировать размеры ресурсов', time: '~2 мин' },
        { id: 'compress', label: 'Сжать изображения и файлы', time: '~3 мин' },
        { id: 'cache', label: 'Настроить кэширование ресурсов', time: '~2 мин' }
      ]
    }
  ];

  const handleExpandToggle = (id) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleOptimizeAction = (toolId, actionId) => {
    setRunningOptimization(`${toolId}-${actionId}`);
    
    // Simulate optimization action
    setTimeout(() => {
      onOptimizationAction(actionId, toolId);
      setRunningOptimization(null);
    }, 3000);
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-primary';
      default: return 'text-text-secondary';
    }
  };

  const getImpactBadge = (impact) => {
    switch (impact) {
      case 'high':
        return <span className="text-xs bg-error text-white px-2 py-0.5 rounded">Высокий</span>;
      case 'medium':
        return <span className="text-xs bg-warning text-white px-2 py-0.5 rounded">Средний</span>;
      case 'low':
        return <span className="text-xs bg-primary text-white px-2 py-0.5 rounded">Низкий</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <h3 className="font-medium text-text-primary mb-4 flex items-center">
        <Icon name="Tool" size={16} className="mr-2" />
        Инструменты оптимизации
      </h3>
      
      <div className="space-y-3">
        {optimizationTools.map((tool) => {
          const isExpanded = expanded[tool.id];
          const isRunning = runningOptimization && runningOptimization.startsWith(tool.id);
          
          return (
            <div key={tool.id} className="border border-border rounded-lg overflow-hidden transition-all duration-200">
              {/* Tool header */}
              <div
                className={`p-3 flex items-center justify-between cursor-pointer hover:bg-secondary-50 ${isExpanded ? 'bg-secondary-50' : ''}`}
                onClick={() => handleExpandToggle(tool.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-1.5 rounded-md ${getImpactColor(tool.impact)} bg-opacity-10`}>
                    <Icon name={tool.icon} size={16} className={getImpactColor(tool.impact)} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">{tool.title}</h4>
                    <p className="text-xs text-text-secondary">{tool.estimatedTime}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {getImpactBadge(tool.impact)}
                  <Icon
                    name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
                    size={16}
                    className="text-text-muted"
                  />
                </div>
              </div>
              
              {/* Expanded content */}
              {isExpanded && (
                <div className="px-3 py-2 border-t border-border bg-secondary-50">
                  <p className="text-xs text-text-secondary mb-3">{tool.description}</p>
                  
                  <div className="space-y-2">
                    {tool.actions.map((action) => {
                      const isActionRunning = runningOptimization === `${tool.id}-${action.id}`;
                      
                      return (
                        <div key={action.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              className={`text-xs px-2 py-1 rounded flex items-center space-x-1 ${isActionRunning ? 'bg-primary text-white' : 'bg-secondary-100 text-text-primary hover:bg-secondary-200'}`}
                              onClick={() => handleOptimizeAction(tool.id, action.id)}
                              disabled={isRunning}
                            >
                              {isActionRunning ? (
                                <>
                                  <Icon name="Loader" size={12} className="animate-spin" />
                                  <span>Выполняется...</span>
                                </>
                              ) : (
                                <>
                                  <Icon name="Play" size={12} />
                                  <span>{action.label}</span>
                                </>
                              )}
                            </button>
                          </div>
                          <span className="text-xs text-text-muted">{action.time}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Run all optimizations button */}
      <button
        className="w-full mt-4 flex items-center justify-center space-x-2 bg-primary hover:bg-primary-700 text-white py-2 rounded-lg transition-colors duration-200"
        onClick={() => handleOptimizeAction('all', 'run-all')}
        disabled={runningOptimization !== null}
      >
        {runningOptimization === 'all-run-all' ? (
          <>
            <Icon name="Loader" size={16} className="animate-spin" />
            <span>Запуск полной оптимизации...</span>
          </>
        ) : (
          <>
            <Icon name="Zap" size={16} />
            <span>Запустить все оптимизации</span>
          </>
        )}
      </button>
    </div>
  );
};

export default OptimizationTools;