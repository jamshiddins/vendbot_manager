import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SalesAnalyticsReporting = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('7days');
  const [selectedMachine, setSelectedMachine] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [isExporting, setIsExporting] = useState(false);

  // Mock data for revenue trends
  const revenueData = [
    { date: '01.12', revenue: 45000, transactions: 234, avgValue: 192 },
    { date: '02.12', revenue: 52000, transactions: 267, avgValue: 195 },
    { date: '03.12', revenue: 48000, transactions: 245, avgValue: 196 },
    { date: '04.12', revenue: 61000, transactions: 312, avgValue: 195 },
    { date: '05.12', revenue: 58000, transactions: 298, avgValue: 195 },
    { date: '06.12', revenue: 67000, transactions: 343, avgValue: 195 },
    { date: '07.12', revenue: 72000, transactions: 369, avgValue: 195 }
  ];

  // Mock data for product performance
  const productData = [
    { name: 'Кока-Кола', sales: 1250, revenue: 62500, margin: 45, turnover: 8.5 },
    { name: 'Пепси', sales: 980, revenue: 49000, margin: 42, turnover: 7.2 },
    { name: 'Вода Бон Аква', sales: 850, revenue: 25500, margin: 38, turnover: 9.1 },
    { name: 'Сникерс', sales: 720, revenue: 43200, margin: 52, turnover: 6.8 },
    { name: 'Твикс', sales: 680, revenue: 40800, margin: 50, turnover: 6.5 },
    { name: 'Чипсы Лейс', sales: 560, revenue: 39200, margin: 48, turnover: 5.9 },
    { name: 'Кофе Нескафе', sales: 450, revenue: 36000, margin: 55, turnover: 4.2 }
  ];

  // Mock data for machine performance
  const machinePerformanceData = [
    { name: 'ТЦ Мега', value: 125000, percentage: 28 },
    { name: 'Офис Сити', value: 98000, percentage: 22 },
    { name: 'БЦ Альфа', value: 87000, percentage: 19 },
    { name: 'ТЦ Европа', value: 76000, percentage: 17 },
    { name: 'Другие', value: 64000, percentage: 14 }
  ];

  // Mock data for hourly sales
  const hourlySalesData = [
    { hour: '06:00', sales: 12 },
    { hour: '07:00', sales: 28 },
    { hour: '08:00', sales: 45 },
    { hour: '09:00', sales: 67 },
    { hour: '10:00', sales: 89 },
    { hour: '11:00', sales: 112 },
    { hour: '12:00', sales: 156 },
    { hour: '13:00', sales: 189 },
    { hour: '14:00', sales: 167 },
    { hour: '15:00', sales: 145 },
    { hour: '16:00', sales: 134 },
    { hour: '17:00', sales: 123 },
    { hour: '18:00', sales: 98 },
    { hour: '19:00', sales: 76 },
    { hour: '20:00', sales: 54 },
    { hour: '21:00', sales: 32 },
    { hour: '22:00', sales: 18 }
  ];

  const COLORS = ['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'];

  const keyMetrics = [
    {
      title: 'Общая выручка',
      value: '₽ 450 000',
      change: '+12,5%',
      changeType: 'positive',
      icon: 'TrendingUp',
      period: 'за 7 дней'
    },
    {
      title: 'Средний чек',
      value: '₽ 195',
      change: '+2,1%',
      changeType: 'positive',
      icon: 'CreditCard',
      period: 'за 7 дней'
    },
    {
      title: 'Количество транзакций',
      value: '2 308',
      change: '+8,7%',
      changeType: 'positive',
      icon: 'ShoppingCart',
      period: 'за 7 дней'
    },
    {
      title: 'Пиковые часы',
      value: '12:00-14:00',
      change: '189 продаж/час',
      changeType: 'neutral',
      icon: 'Clock',
      period: 'максимум'
    }
  ];

  const handleExport = async (format) => {
    setIsExporting(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsExporting(false);
    
    // In real app, this would trigger actual export
    console.log(`Exporting report in ${format} format`);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('ru-RU').format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isMenuOpen={isSidebarOpen}
      />
      
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-80' : 'lg:ml-80'} pt-16`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                Аналитика продаж
              </h1>
              <p className="text-text-secondary">
                Комплексная аналитика и отчетность по продажам торговых автоматов
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button
                onClick={() => handleExport('pdf')}
                disabled={isExporting}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50"
              >
                <Icon name="FileText" size={16} />
                <span>PDF отчет</span>
              </button>
              
              <button
                onClick={() => handleExport('excel')}
                disabled={isExporting}
                className="flex items-center space-x-2 px-4 py-2 bg-success text-white rounded-lg hover:bg-success-600 transition-colors duration-200 disabled:opacity-50"
              >
                <Icon name="Download" size={16} />
                <span>Excel</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-surface rounded-lg border border-border p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Период
                </label>
                <select
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="today">Сегодня</option>
                  <option value="7days">7 дней</option>
                  <option value="30days">30 дней</option>
                  <option value="90days">90 дней</option>
                  <option value="custom">Выбрать период</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Машина
                </label>
                <select
                  value={selectedMachine}
                  onChange={(e) => setSelectedMachine(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">Все машины</option>
                  <option value="vm-001">VM-001 (ТЦ Мега)</option>
                  <option value="vm-002">VM-002 (Офис Сити)</option>
                  <option value="vm-003">VM-003 (БЦ Альфа)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Категория товара
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">Все товары</option>
                  <option value="drinks">Напитки</option>
                  <option value="snacks">Снеки</option>
                  <option value="coffee">Кофе</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button className="w-full px-4 py-2 bg-secondary-100 text-text-primary rounded-lg hover:bg-secondary-200 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Icon name="Filter" size={16} />
                  <span>Применить</span>
                </button>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {keyMetrics.map((metric, index) => (
              <div key={index} className="bg-surface rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    metric.changeType === 'positive' ? 'bg-success-100' :
                    metric.changeType === 'negative' ? 'bg-error-100' : 'bg-primary-100'
                  }`}>
                    <Icon 
                      name={metric.icon} 
                      size={20} 
                      className={
                        metric.changeType === 'positive' ? 'text-success' :
                        metric.changeType === 'negative' ? 'text-error' : 'text-primary'
                      } 
                    />
                  </div>
                  {metric.changeType !== 'neutral' && (
                    <span className={`text-sm font-medium ${
                      metric.changeType === 'positive' ? 'text-success' : 'text-error'
                    }`}>
                      {metric.change}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-1">
                  {metric.value}
                </h3>
                <p className="text-sm text-text-secondary">
                  {metric.title}
                </p>
                <p className="text-xs text-text-muted mt-1">
                  {metric.period}
                </p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'overview', label: 'Обзор', icon: 'BarChart3' },
                  { id: 'products', label: 'Товары', icon: 'Package' },
                  { id: 'machines', label: 'Машины', icon: 'Monitor' },
                  { id: 'trends', label: 'Тренды', icon: 'TrendingUp' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Revenue Trends Chart */}
              <div className="bg-surface rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-semibold text-text-primary">
                    Динамика выручки
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-sm bg-primary-100 text-primary rounded-lg">
                      Выручка
                    </button>
                    <button className="px-3 py-1 text-sm text-text-secondary hover:bg-secondary-100 rounded-lg">
                      Транзакции
                    </button>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#1E40AF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#64748B"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="#64748B"
                        fontSize={12}
                        tickFormatter={(value) => `₽${value/1000}k`}
                      />
                      <Tooltip 
                        formatter={(value) => [formatCurrency(value), 'Выручка']}
                        labelStyle={{ color: '#1E293B' }}
                        contentStyle={{ 
                          backgroundColor: '#FFFFFF', 
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#1E40AF" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorRevenue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Hourly Sales Pattern */}
              <div className="bg-surface rounded-lg border border-border p-6">
                <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
                  Почасовая активность продаж
                </h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hourlySalesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis 
                        dataKey="hour" 
                        stroke="#64748B"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="#64748B"
                        fontSize={12}
                      />
                      <Tooltip 
                        formatter={(value) => [value, 'Продажи']}
                        labelStyle={{ color: '#1E293B' }}
                        contentStyle={{ 
                          backgroundColor: '#FFFFFF', 
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar 
                        dataKey="sales" 
                        fill="#1E40AF"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-surface rounded-lg border border-border">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-heading font-semibold text-text-primary">
                  Производительность товаров
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Товар
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Продажи
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Выручка
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Маржа %
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Оборачиваемость
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {productData.map((product, index) => (
                      <tr key={index} className="hover:bg-secondary-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-text-primary">
                            {product.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-text-primary">
                          {formatNumber(product.sales)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-text-primary">
                          {formatCurrency(product.revenue)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            product.margin >= 50 ? 'bg-success-100 text-success' :
                            product.margin >= 40 ? 'bg-warning-100 text-warning': 'bg-error-100 text-error'
                          }`}>
                            {product.margin}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-text-primary">
                          {product.turnover}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'machines' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Machine Performance Chart */}
              <div className="bg-surface rounded-lg border border-border p-6">
                <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
                  Производительность по локациям
                </h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={machinePerformanceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {machinePerformanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top Performing Machines */}
              <div className="bg-surface rounded-lg border border-border p-6">
                <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
                  Топ машины по выручке
                </h2>
                <div className="space-y-4">
                  {machinePerformanceData.map((machine, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0 ? 'bg-warning' :
                          index === 1 ? 'bg-secondary-400' :
                          index === 2 ? 'bg-accent-600' : 'bg-secondary-300'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{machine.name}</p>
                          <p className="text-sm text-text-secondary">{machine.percentage}% от общей выручки</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-text-primary">
                          {formatCurrency(machine.value)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="space-y-8">
              {/* Trend Analysis */}
              <div className="bg-surface rounded-lg border border-border p-6">
                <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
                  Анализ трендов
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-success-50 rounded-lg">
                    <Icon name="TrendingUp" size={32} className="text-success mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      Рост продаж
                    </h3>
                    <p className="text-2xl font-bold text-success mb-2">+12,5%</p>
                    <p className="text-sm text-text-secondary">
                      По сравнению с прошлой неделей
                    </p>
                  </div>
                  
                  <div className="text-center p-6 bg-primary-50 rounded-lg">
                    <Icon name="Users" size={32} className="text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      Новые клиенты
                    </h3>
                    <p className="text-2xl font-bold text-primary mb-2">+8,3%</p>
                    <p className="text-sm text-text-secondary">
                      Увеличение клиентской базы
                    </p>
                  </div>
                  
                  <div className="text-center p-6 bg-warning-50 rounded-lg">
                    <Icon name="Clock" size={32} className="text-warning mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      Пиковое время
                    </h3>
                    <p className="text-2xl font-bold text-warning mb-2">12:00-14:00</p>
                    <p className="text-sm text-text-secondary">
                      Максимальная активность
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-surface rounded-lg border border-border p-6">
                <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
                  Рекомендации по оптимизации
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-primary-50 rounded-lg">
                    <Icon name="Lightbulb" size={20} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-medium text-text-primary mb-1">
                        Увеличить запасы популярных товаров
                      </h3>
                      <p className="text-sm text-text-secondary">
                        Кока-Кола и Сникерс показывают высокий спрос. Рекомендуется увеличить их запасы на 20%.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-warning-50 rounded-lg">
                    <Icon name="AlertTriangle" size={20} className="text-warning mt-1" />
                    <div>
                      <h3 className="font-medium text-text-primary mb-1">
                        Оптимизировать ассортимент
                      </h3>
                      <p className="text-sm text-text-secondary">
                        Некоторые товары имеют низкую оборачиваемость. Рассмотрите замену на более популярные позиции.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-success-50 rounded-lg">
                    <Icon name="Target" size={20} className="text-success mt-1" />
                    <div>
                      <h3 className="font-medium text-text-primary mb-1">
                        Расширить в успешных локациях
                      </h3>
                      <p className="text-sm text-text-secondary">
                        ТЦ Мега показывает отличные результаты. Рассмотрите установку дополнительных машин в этой локации.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SalesAnalyticsReporting;