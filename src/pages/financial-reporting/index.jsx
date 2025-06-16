// src/pages/financial-reporting/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const FinancialReporting = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('month');
  const [selectedView, setSelectedView] = useState('profit');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [isExporting, setIsExporting] = useState(false);

  // Mock data for financial overview
  const financialData = [
    { month: 'Янв', revenue: 380000, expenses: 285000, profit: 95000 },
    { month: 'Фев', revenue: 420000, expenses: 310000, profit: 110000 },
    { month: 'Мар', revenue: 450000, expenses: 325000, profit: 125000 },
    { month: 'Апр', revenue: 470000, expenses: 340000, profit: 130000 },
    { month: 'Май', revenue: 520000, expenses: 370000, profit: 150000 },
    { month: 'Июн', revenue: 560000, expenses: 385000, profit: 175000 }
  ];

  // Mock data for expense breakdown
  const expenseData = [
    { name: 'Продукты', value: 210000, percentage: 54 },
    { name: 'Обслуживание', value: 65000, percentage: 17 },
    { name: 'Аренда', value: 48000, percentage: 12 },
    { name: 'Зарплаты', value: 42000, percentage: 11 },
    { name: 'Другое', value: 20000, percentage: 6 }
  ];

  // Mock data for location profitability
  const locationProfitData = [
    { name: 'ТЦ Мега', revenue: 180000, expenses: 120000, profit: 60000, margin: 33 },
    { name: 'Офис Сити', revenue: 150000, expenses: 105000, profit: 45000, margin: 30 },
    { name: 'БЦ Альфа', revenue: 120000, expenses: 90000, profit: 30000, margin: 25 },
    { name: 'ТЦ Европа', revenue: 110000, expenses: 70000, profit: 40000, margin: 36 }
  ];

  // Mock data for cash flow
  const cashFlowData = [
    { date: '01.06', inflow: 18500, outflow: 12000, balance: 6500 },
    { date: '08.06', inflow: 19200, outflow: 14500, balance: 4700 },
    { date: '15.06', inflow: 21000, outflow: 16000, balance: 5000 },
    { date: '22.06', inflow: 20500, outflow: 15200, balance: 5300 },
    { date: '29.06', inflow: 22800, outflow: 16800, balance: 6000 }
  ];

  const COLORS = ['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'];

  const keyMetrics = [
    {
      title: 'Общая выручка',
      value: '₽ 560 000',
      change: '+7,7%',
      changeType: 'positive',
      icon: 'TrendingUp',
      period: 'за месяц'
    },
    {
      title: 'Расходы',
      value: '₽ 385 000',
      change: '+3,9%',
      changeType: 'negative',
      icon: 'TrendingDown',
      period: 'за месяц'
    },
    {
      title: 'Чистая прибыль',
      value: '₽ 175 000',
      change: '+16,7%',
      changeType: 'positive',
      icon: 'DollarSign',
      period: 'за месяц'
    },
    {
      title: 'Рентабельность',
      value: '31,3%',
      change: '+2,5%',
      changeType: 'positive',
      icon: 'Percent',
      period: 'за месяц'
    }
  ];

  const handleExport = async (format) => {
    setIsExporting(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsExporting(false);
    
    // In real app, this would trigger actual export
    console.log(`Exporting financial report in ${format} format`);
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
                Финансовая отчетность
              </h1>
              <p className="text-text-secondary">
                Детальный финансовый анализ и отчетность по вашему бизнесу
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
                  <option value="month">Месяц</option>
                  <option value="quarter">Квартал</option>
                  <option value="half">Полгода</option>
                  <option value="year">Год</option>
                  <option value="custom">Выбрать период</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Вид отчета
                </label>
                <select
                  value={selectedView}
                  onChange={(e) => setSelectedView(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="profit">Прибыль и убытки</option>
                  <option value="cash">Движение денежных средств</option>
                  <option value="balance">Баланс</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Локация
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">Все локации</option>
                  <option value="tc-mega">ТЦ Мега</option>
                  <option value="office-city">Офис Сити</option>
                  <option value="bc-alpha">БЦ Альфа</option>
                  <option value="tc-europa">ТЦ Европа</option>
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
                  { id: 'overview', label: 'Обзор', icon: 'PieChart' },
                  { id: 'details', label: 'Детали', icon: 'BarChart2' },
                  { id: 'locations', label: 'Локации', icon: 'MapPin' },
                  { id: 'cashflow', label: 'Денежный поток', icon: 'DollarSign' }
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
              {/* Financial Overview Chart */}
              <div className="bg-surface rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-semibold text-text-primary">
                    Финансовый обзор
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-sm bg-primary-100 text-primary rounded-lg">
                      Прибыль
                    </button>
                    <button className="px-3 py-1 text-sm text-text-secondary hover:bg-secondary-100 rounded-lg">
                      Выручка
                    </button>
                    <button className="px-3 py-1 text-sm text-text-secondary hover:bg-secondary-100 rounded-lg">
                      Расходы
                    </button>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={financialData}>
                      <defs>
                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#1E40AF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#64748B"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="#64748B"
                        fontSize={12}
                        tickFormatter={(value) => `₽${value/1000}k`}
                      />
                      <Tooltip 
                        formatter={(value) => [formatCurrency(value), 'Прибыль']}
                        labelStyle={{ color: '#1E293B' }}
                        contentStyle={{ 
                          backgroundColor: '#FFFFFF', 
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="profit" 
                        stroke="#1E40AF" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorProfit)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Expense Breakdown */}
              <div className="bg-surface rounded-lg border border-border p-6">
                <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
                  Структура расходов
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expenseData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name} ${percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {expenseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-4">
                    {expenseData.map((expense, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                          <div>
                            <p className="font-medium text-text-primary">{expense.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-text-primary">
                            {formatCurrency(expense.value)}
                          </p>
                          <p className="text-sm text-text-secondary">
                            {expense.percentage}% от общих расходов
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="bg-surface rounded-lg border border-border">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-heading font-semibold text-text-primary">
                  Детальный отчет о прибылях и убытках
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Показатель
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Текущий период
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Предыдущий период
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Изменение
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                        % изменения
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="hover:bg-secondary-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-text-primary">
                        Выручка
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-text-primary">
                        {formatCurrency(560000)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-text-primary">
                        {formatCurrency(520000)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-success">
                        +{formatCurrency(40000)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-success-100 text-success">
                          +7.7%
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-secondary-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-text-primary">
                        Себестоимость продаж
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-text-primary">
                        {formatCurrency(210000)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-text-primary">
                        {formatCurrency(198000)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-error">
                        -{formatCurrency(12000)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-error-100 text-error">
                          +6.1%
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-secondary-50 bg-secondary-50 font-medium">
                      <td className="px-6 py-4 whitespace-nowrap text-text-primary">
                        Валовая прибыль
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-text-primary">
                        {formatCurrency(350000)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-text-primary">
                        {formatCurrency(322000)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-success">
                        +{formatCurrency(28000)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-success-100 text-success">
                          +8.7%
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-secondary-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-text-primary">
                        Операционные расходы
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-text-primary">
                        {formatCurrency(175000)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-text-primary">
                        {formatCurrency(172000)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-error">
                        -{formatCurrency(3000)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-error-100 text-error">
                          +1.7%
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-secondary-50 bg-secondary-50 font-medium">
                      <td className="px-6 py-4 whitespace-nowrap text-text-primary">
                        Чистая прибыль
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-text-primary">
                        {formatCurrency(175000)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-text-primary">
                        {formatCurrency(150000)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-success">
                        +{formatCurrency(25000)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-success-100 text-success">
                          +16.7%
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'locations' && (
            <div className="bg-surface rounded-lg border border-border">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-heading font-semibold text-text-primary">
                  Финансовые показатели по локациям
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Локация
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Выручка
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Расходы
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Прибыль
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Рентабельность
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {locationProfitData.map((location, index) => (
                      <tr key={index} className="hover:bg-secondary-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-text-primary">
                            {location.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-text-primary">
                          {formatCurrency(location.revenue)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-text-primary">
                          {formatCurrency(location.expenses)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-text-primary">
                          {formatCurrency(location.profit)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            location.margin >= 30 ? 'bg-success-100 text-success' :
                            location.margin >= 20 ? 'bg-warning-100 text-warning': 'bg-error-100 text-error'
                          }`}>
                            {location.margin}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Сравнение прибыльности локаций
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={locationProfitData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis 
                        dataKey="name" 
                        stroke="#64748B"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="#64748B"
                        fontSize={12}
                        tickFormatter={(value) => `₽${value/1000}k`}
                      />
                      <Tooltip 
                        formatter={(value) => [formatCurrency(value), 'Значение']}
                        labelStyle={{ color: '#1E293B' }}
                        contentStyle={{ 
                          backgroundColor: '#FFFFFF', 
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="revenue" name="Выручка" fill="#60A5FA" />
                      <Bar dataKey="profit" name="Прибыль" fill="#1E40AF" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cashflow' && (
            <div className="space-y-8">
              {/* Cash Flow Chart */}
              <div className="bg-surface rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-semibold text-text-primary">
                    Движение денежных средств
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-sm bg-primary-100 text-primary rounded-lg">
                      Все
                    </button>
                    <button className="px-3 py-1 text-sm text-text-secondary hover:bg-secondary-100 rounded-lg">
                      Приход
                    </button>
                    <button className="px-3 py-1 text-sm text-text-secondary hover:bg-secondary-100 rounded-lg">
                      Расход
                    </button>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cashFlowData}>
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
                        formatter={(value) => [formatCurrency(value), 'Сумма']}
                        labelStyle={{ color: '#1E293B' }}
                        contentStyle={{ 
                          backgroundColor: '#FFFFFF', 
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="inflow" 
                        name="Приход"
                        stroke="#10B981" 
                        strokeWidth={2}
                        dot={{ r: 5 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="outflow" 
                        name="Расход"
                        stroke="#EF4444" 
                        strokeWidth={2}
                        dot={{ r: 5 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="balance" 
                        name="Баланс"
                        stroke="#1E40AF" 
                        strokeWidth={2}
                        dot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Cash Flow Transactions */}
              <div className="bg-surface rounded-lg border border-border">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-heading font-semibold text-text-primary">
                    Последние транзакции
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                          Дата
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                          Описание
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                          Категория
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                          Сумма
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-secondary-50">
                        <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                          29.06.2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-text-primary">
                          Выручка от продаж (ТЦ Мега)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-success-100 text-success">
                            Доход
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-success font-medium">
                          +{formatCurrency(22800)}
                        </td>
                      </tr>
                      <tr className="hover:bg-secondary-50">
                        <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                          28.06.2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-text-primary">
                          Закупка товара
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-error-100 text-error">
                            Расход
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-error font-medium">
                          -{formatCurrency(12500)}
                        </td>
                      </tr>
                      <tr className="hover:bg-secondary-50">
                        <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                          25.06.2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-text-primary">
                          Оплата аренды (БЦ Альфа)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-error-100 text-error">
                            Расход
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-error font-medium">
                          -{formatCurrency(8500)}
                        </td>
                      </tr>
                      <tr className="hover:bg-secondary-50">
                        <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                          22.06.2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-text-primary">
                          Выручка от продаж (Офис Сити)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-success-100 text-success">
                            Доход
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-success font-medium">
                          +{formatCurrency(20500)}
                        </td>
                      </tr>
                      <tr className="hover:bg-secondary-50">
                        <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                          20.06.2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-text-primary">
                          Техобслуживание автоматов
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-error-100 text-error">
                            Расход
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-error font-medium">
                          -{formatCurrency(4300)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FinancialReporting;