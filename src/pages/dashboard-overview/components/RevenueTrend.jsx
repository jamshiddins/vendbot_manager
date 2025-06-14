import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from 'components/AppIcon';

const RevenueTrend = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [chartType, setChartType] = useState('line');

  const revenueData = {
    '7d': [
      { date: '18.11', revenue: 45000, transactions: 234, day: 'Пн' },
      { date: '19.11', revenue: 52000, transactions: 267, day: 'Вт' },
      { date: '20.11', revenue: 48000, transactions: 245, day: 'Ср' },
      { date: '21.11', revenue: 61000, transactions: 312, day: 'Чт' },
      { date: '22.11', revenue: 58000, transactions: 298, day: 'Пт' },
      { date: '23.11', revenue: 72000, transactions: 367, day: 'Сб' },
      { date: '24.11', revenue: 68000, transactions: 345, day: 'Вс' }
    ],
    '30d': [
      { date: '25.10', revenue: 1250000, transactions: 6420, day: 'Окт' },
      { date: '01.11', revenue: 1180000, transactions: 6100, day: 'Нояб' },
      { date: '08.11', revenue: 1320000, transactions: 6780, day: 'Нояб' },
      { date: '15.11', revenue: 1290000, transactions: 6650, day: 'Нояб' },
      { date: '22.11', revenue: 1410000, transactions: 7230, day: 'Нояб' }
    ],
    '90d': [
      { date: 'Авг', revenue: 3200000, transactions: 16500, day: 'Авг' },
      { date: 'Сен', revenue: 3450000, transactions: 17800, day: 'Сен' },
      { date: 'Окт', revenue: 3680000, transactions: 18900, day: 'Окт' },
      { date: 'Нояб', revenue: 3920000, transactions: 20100, day: 'Нояб' }
    ]
  };

  const currentData = revenueData[timeRange];
  const totalRevenue = currentData.reduce((sum, item) => sum + item.revenue, 0);
  const totalTransactions = currentData.reduce((sum, item) => sum + item.transactions, 0);
  const avgRevenue = Math.round(totalRevenue / currentData.length);

  const formatRevenue = (value) => {
    if (value >= 1000000) {
      return `₽${(value / 1000000).toFixed(1)}М`;
    } else if (value >= 1000) {
      return `₽${(value / 1000).toFixed(0)}К`;
    }
    return `₽${value.toLocaleString('ru-RU')}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-text-primary mb-2">
            {data.day}, {label}
          </p>
          <div className="space-y-1">
            <p className="text-sm text-text-secondary">
              Выручка: <span className="font-medium text-text-primary">{formatRevenue(data.revenue)}</span>
            </p>
            <p className="text-sm text-text-secondary">
              Транзакции: <span className="font-medium text-text-primary">{data.transactions}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Динамика выручки
          </h2>
          <p className="text-sm text-text-secondary">
            Анализ доходов по периодам
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {/* Chart Type Toggle */}
          <div className="flex items-center bg-secondary-100 rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                chartType === 'line' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="TrendingUp" size={16} />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                chartType === 'bar' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="BarChart3" size={16} />
            </button>
          </div>

          {/* Time Range Selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="7d">7 дней</option>
            <option value="30d">30 дней</option>
            <option value="90d">3 месяца</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-primary-50 rounded-lg">
          <p className="text-sm text-text-secondary mb-1">Общая выручка</p>
          <p className="text-lg font-semibold text-primary">{formatRevenue(totalRevenue)}</p>
        </div>
        <div className="text-center p-3 bg-success-50 rounded-lg">
          <p className="text-sm text-text-secondary mb-1">Средняя выручка</p>
          <p className="text-lg font-semibold text-success">{formatRevenue(avgRevenue)}</p>
        </div>
        <div className="text-center p-3 bg-accent-50 rounded-lg">
          <p className="text-sm text-text-secondary mb-1">Транзакции</p>
          <p className="text-lg font-semibold text-accent">{totalTransactions.toLocaleString('ru-RU')}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="date" 
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatRevenue}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#1E40AF" 
                strokeWidth={3}
                dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#1E40AF', strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="date" 
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatRevenue}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="revenue" 
                fill="#1E40AF"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Growth Indicator */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm text-text-secondary">
              Рост за период: <span className="font-medium text-success">+12.5%</span>
            </span>
          </div>
          <button className="text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-200">
            Подробный отчет
          </button>
        </div>
      </div>
    </div>
  );
};

export default RevenueTrend;