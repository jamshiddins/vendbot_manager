// src/pages/performance-monitoring-optimization/components/MetricsCharts.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const MetricsCharts = ({ filters, data, realTimeUpdates }) => {
  const [activeTab, setActiveTab] = useState('response-time');
  const [chartView, setChartView] = useState('line');
  const [showDataPoints, setShowDataPoints] = useState(true);
  const [timeRange, setTimeRange] = useState(filters?.timeRange || '24h');

  // Simulated chart data - would normally come from a real data source
  const chartTabs = [
    { id: 'response-time', label: 'Время отклика', icon: 'Clock' },
    { id: 'memory-usage', label: 'Использование памяти', icon: 'MemoryStick' },
    { id: 'cpu-utilization', label: 'Загрузка CPU', icon: 'Cpu' },
    { id: 'database-queries', label: 'Запросы к БД', icon: 'Database' }
  ];

  const generateChartData = () => {
    // This would be real data in a production environment
    const timeLabels = {
      '1h': Array.from({ length: 12 }, (_, i) => `${55 - i * 5} мин`).reverse(),
      '6h': Array.from({ length: 12 }, (_, i) => `${i + 1} ч`),
      '24h': Array.from({ length: 12 }, (_, i) => `${i * 2}:00`),
      '7d': Array.from({ length: 7 }, (_, i) => `День ${i + 1}`),
      '30d': Array.from({ length: 10 }, (_, i) => `День ${i * 3 + 1}`)
    };

    const getDataPoints = () => {
      let baseValue = 0;
      switch (activeTab) {
        case 'response-time': baseValue = data.responseTime || 100; break;
        case 'memory-usage': baseValue = data.memoryUsage || 65; break;
        case 'cpu-utilization': baseValue = data.cpuUtilization || 45; break;
        case 'database-queries': baseValue = data.databaseQueries || 80; break;
        default: baseValue = 100;
      }

      return Array.from({ length: timeLabels[timeRange].length }, (_, i) => {
        const variance = (Math.random() - 0.5) * 20;
        const value = Math.max(0, baseValue + variance);
        return Math.round(value);
      });
    };

    return {
      labels: timeLabels[timeRange],
      datasets: [{
        label: chartTabs.find(tab => tab.id === activeTab)?.label || '',
        data: getDataPoints(),
        borderColor: getDatasetColor(activeTab),
        backgroundColor: getDatasetBgColor(activeTab),
        borderWidth: 2,
        pointRadius: showDataPoints ? 4 : 0,
        pointHoverRadius: 6,
        tension: 0.4
      }]
    };
  };

  const getDatasetColor = (metricId) => {
    switch (metricId) {
      case 'response-time': return '#4F46E5'; // Primary color
      case 'memory-usage': return '#F59E0B'; // Warning color
      case 'cpu-utilization': return '#10B981'; // Success color
      case 'database-queries': return '#6B7280'; // Secondary color
      default: return '#4F46E5';
    }
  };

  const getDatasetBgColor = (metricId) => {
    switch (metricId) {
      case 'response-time': return 'rgba(79, 70, 229, 0.1)'; // Primary with opacity
      case 'memory-usage': return 'rgba(245, 158, 11, 0.1)'; // Warning with opacity
      case 'cpu-utilization': return 'rgba(16, 185, 129, 0.1)'; // Success with opacity
      case 'database-queries': return 'rgba(107, 114, 128, 0.1)'; // Secondary with opacity
      default: return 'rgba(79, 70, 229, 0.1)';
    }
  };

  // This would be a real chart in production, using a library like Recharts
  const ChartPlaceholder = ({ data }) => {
    const chartHeight = 220;
    const maxValue = Math.max(...data.datasets[0].data);
    const values = data.datasets[0].data;
    const labels = data.labels;
    const color = data.datasets[0].borderColor;
    const bgColor = data.datasets[0].backgroundColor;
    
    return (
      <div className="relative w-full" style={{ height: `${chartHeight}px` }}>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-text-muted">
          <div>{maxValue}</div>
          <div>{Math.round(maxValue / 2)}</div>
          <div>0</div>
        </div>
        
        {/* Chart area */}
        <div className="absolute left-12 right-0 top-0 bottom-0">
          {/* Background grid */}
          <div className="absolute inset-0 flex flex-col justify-between">
            <div className="border-b border-secondary-200 h-1/3"></div>
            <div className="border-b border-secondary-200 h-1/3"></div>
            <div className="border-b border-secondary-200 h-1/3"></div>
          </div>
          
          {/* Chart */}
          <div className="absolute inset-0">
            {chartView === 'line' ? (
              <>
                <svg className="w-full h-full" viewBox={`0 0 ${labels.length - 1} ${maxValue}`} preserveAspectRatio="none">
                  {/* Line chart */}
                  <path
                    d={`M0,${maxValue - values[0]} ${values.map((value, i) => `L${i},${maxValue - value}`).join(' ')}`}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                  />
                  
                  {/* Area under line */}
                  <path
                    d={`M0,${maxValue - values[0]} ${values.map((value, i) => `L${i},${maxValue - value}`).join(' ')} L${labels.length - 1},${maxValue} L0,${maxValue} Z`}
                    fill={bgColor}
                    opacity="0.2"
                  />
                  
                  {/* Data points */}
                  {showDataPoints && values.map((value, i) => (
                    <circle
                      key={i}
                      cx={i}
                      cy={maxValue - value}
                      r="4"
                      fill="white"
                      stroke={color}
                      strokeWidth="2"
                    />
                  ))}
                </svg>
              </>
            ) : (
              <div className="flex items-end h-full w-full justify-between">
                {values.map((value, i) => (
                  <div key={i} className="group relative flex flex-col items-center">
                    <div
                      className="w-5 rounded-t-sm transition-all duration-200"
                      style={{
                        height: `${(value / maxValue) * 100}%`,
                        backgroundColor: color
                      }}
                    ></div>
                    <div className="invisible group-hover:visible absolute -top-8 -translate-x-1/2 bg-text-primary text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* X-axis labels */}
          <div className="absolute left-0 right-0 bottom-0 transform translate-y-6 flex justify-between text-xs text-text-muted">
            {labels.map((label, i) => (
              i % 2 === 0 && <div key={i} className="transform -translate-x-1/2">{label}</div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const StatisticCard = ({ title, value, unit, icon, change, direction }) => (
    <div className="bg-surface rounded-lg border border-border p-3">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-text-primary">{title}</h4>
        <Icon name={icon} size={16} className="text-text-muted" />
      </div>
      <div className="flex items-baseline space-x-1 mb-2">
        <span className="text-xl font-bold">{value}</span>
        <span className="text-xs text-text-secondary">{unit}</span>
      </div>
      <div className="flex items-center">
        <Icon
          name={direction === 'up' ? 'TrendingUp' : 'TrendingDown'}
          size={14}
          className={direction === 'up' ? 'text-error mr-1' : 'text-success mr-1'}
        />
        <span className={`text-xs ${direction === 'up' ? 'text-error' : 'text-success'}`}>
          {change}% за {filters?.timeRange || '24h'}
        </span>
      </div>
    </div>
  );

  const trendingStats = [
    {
      title: 'Среднее время отклика',
      value: 125,
      unit: 'мс',
      icon: 'Clock',
      change: 12,
      direction: 'up'
    },
    {
      title: 'Макс. использование памяти',
      value: 78,
      unit: '%',
      icon: 'MemoryStick',
      change: 5,
      direction: 'up'
    },
    {
      title: 'Среднее использование CPU',
      value: 42,
      unit: '%',
      icon: 'Cpu',
      change: 3,
      direction: 'down'
    },
    {
      title: 'Частота ошибок',
      value: 0.5,
      unit: '%',
      icon: 'AlertCircle',
      change: 2,
      direction: 'down'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trendingStats.map((stat, index) => (
          <StatisticCard
            key={index}
            title={stat.title}
            value={stat.value}
            unit={stat.unit}
            icon={stat.icon}
            change={stat.change}
            direction={stat.direction}
          />
        ))}
      </div>

      {/* Chart container */}
      <div className="bg-surface rounded-lg border border-border p-4">
        {/* Chart header with tabs */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {chartTabs.map(tab => (
              <button
                key={tab.id}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-sm transition-colors duration-200 ${activeTab === tab.id ? 'bg-primary text-white' : 'text-text-secondary hover:bg-secondary-100'}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon name={tab.icon} size={14} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center rounded-md overflow-hidden border border-border">
              <button
                className={`p-1 ${chartView === 'line' ? 'bg-primary text-white' : 'bg-surface text-text-secondary hover:bg-secondary-100'}`}
                onClick={() => setChartView('line')}
                title="Линейный график"
              >
                <Icon name="LineChart" size={18} />
              </button>
              <button
                className={`p-1 ${chartView === 'bar' ? 'bg-primary text-white' : 'bg-surface text-text-secondary hover:bg-secondary-100'}`}
                onClick={() => setChartView('bar')}
                title="Столбчатый график"
              >
                <Icon name="BarChart" size={18} />
              </button>
            </div>
            
            <button
              className={`p-1 rounded-md border border-border ${showDataPoints ? 'bg-secondary-100' : 'bg-surface'}`}
              onClick={() => setShowDataPoints(!showDataPoints)}
              title={showDataPoints ? 'Скрыть точки данных' : 'Показать точки данных'}
            >
              <Icon name="CircleDot" size={18} className="text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Chart time range selector */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-medium text-text-primary">
            {chartTabs.find(tab => tab.id === activeTab)?.label} 
            <span className="text-text-secondary ml-1">за период</span>
          </h3>

          <div className="flex items-center rounded-md overflow-hidden border border-border text-xs">
            {['1h', '6h', '24h', '7d', '30d'].map(range => (
              <button
                key={range}
                className={`px-2 py-1 ${timeRange === range ? 'bg-primary text-white' : 'bg-surface text-text-secondary hover:bg-secondary-100'}`}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Chart display */}
        <div className="h-60 mb-4">
          {realTimeUpdates && (
            <div className="flex items-center space-x-2 mb-2 text-xs text-primary">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Обновление в реальном времени</span>
            </div>
          )}
          
          <ChartPlaceholder data={generateChartData()} />
        </div>

        {/* Legend / explanation */}
        <div className="flex justify-between items-center pt-4 border-t border-border">
          <div className="flex items-center space-x-4 text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getDatasetColor(activeTab) }}></div>
              <span>{chartTabs.find(tab => tab.id === activeTab)?.label}</span>
            </div>
            
            {activeTab === 'response-time' && (
              <div className="flex items-center space-x-1">
                <div className="w-3 h-0 border-t-2 border-dashed border-error"></div>
                <span className="text-error">Порог предупреждения (200мс)</span>
              </div>
            )}
          </div>
          
          <button className="text-xs text-text-secondary hover:text-primary">
            <Icon name="Download" size={14} className="inline mr-1" />
            Экспорт данных
          </button>
        </div>
      </div>

      {/* Performance insights */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="font-medium text-text-primary mb-3 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2" />
          Аналитические выводы
        </h3>
        
        <div className="space-y-2">
          <div className="p-3 bg-primary-50 border border-primary-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="TrendingUp" size={16} className="text-primary mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-1">Повышенное время отклика API</h4>
                <p className="text-xs text-text-secondary mb-2">
                  Обнаружено увеличение среднего времени отклика API на 12% за последние 24 часа.
                  Это может указывать на проблемы с базой данных или увеличение нагрузки.
                </p>
                <button className="text-xs text-primary hover:text-primary-700 font-medium">
                  Расследовать подробнее
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-success-50 border border-success-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="ThumbsUp" size={16} className="text-success mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-1">Успешная оптимизация кэша</h4>
                <p className="text-xs text-text-secondary mb-2">
                  Недавние изменения в стратегии кэширования привели к снижению нагрузки на базу данных на 23%.
                  Продолжайте мониторинг для подтверждения долгосрочной эффективности.
                </p>
                <button className="text-xs text-success hover:text-success-700 font-medium">
                  Просмотреть детали
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsCharts;