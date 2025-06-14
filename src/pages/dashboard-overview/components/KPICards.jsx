import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const KPICards = () => {
  const navigate = useNavigate();

  const kpiData = [
    {
      id: 'total-machines',
      title: 'Всего машин',
      value: '247',
      change: '+12',
      changeType: 'positive',
      icon: 'Zap',
      color: 'primary',
      description: 'Активных торговых автоматов',
      onClick: () => navigate('/machine-fleet-management')
    },
    {
      id: 'active-machines',
      title: 'Активные машины',
      value: '231',
      change: '-3',
      changeType: 'negative',
      icon: 'Activity',
      color: 'success',
      description: 'Машин в рабочем состоянии',
      onClick: () => navigate('/machine-fleet-management')
    },
    {
      id: 'daily-revenue',
      title: 'Выручка за день',
      value: '₽847,320',
      change: '+18.5%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'accent',
      description: 'По сравнению с вчера',
      onClick: () => navigate('/sales-analytics-reporting')
    },
    {
      id: 'critical-alerts',
      title: 'Критические уведомления',
      value: '7',
      change: '+2',
      changeType: 'warning',
      icon: 'AlertTriangle',
      color: 'error',
      description: 'Требуют немедленного внимания',
      onClick: () => navigate('/maintenance-service-management')
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      case 'warning': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'positive': return 'TrendingUp';
      case 'negative': return 'TrendingDown';
      case 'warning': return 'AlertTriangle';
      default: return 'Minus';
    }
  };

  const getCardBorderColor = (color) => {
    switch (color) {
      case 'primary': return 'border-l-primary';
      case 'success': return 'border-l-success';
      case 'accent': return 'border-l-accent';
      case 'error': return 'border-l-error';
      default: return 'border-l-secondary';
    }
  };

  const getIconBgColor = (color) => {
    switch (color) {
      case 'primary': return 'bg-primary-100 text-primary';
      case 'success': return 'bg-success-100 text-success';
      case 'accent': return 'bg-accent-100 text-accent';
      case 'error': return 'bg-error-100 text-error';
      default: return 'bg-secondary-100 text-secondary';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {kpiData.map((kpi) => (
        <div
          key={kpi.id}
          onClick={kpi.onClick}
          className={`bg-surface rounded-lg border border-border ${getCardBorderColor(kpi.color)} border-l-4 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${getIconBgColor(kpi.color)} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
              <Icon name={kpi.icon} size={24} />
            </div>
            <div className={`flex items-center space-x-1 ${getChangeColor(kpi.changeType)}`}>
              <Icon name={getChangeIcon(kpi.changeType)} size={16} />
              <span className="text-sm font-medium">{kpi.change}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wide">
              {kpi.title}
            </h3>
            <p className="text-3xl font-bold text-text-primary">
              {kpi.value}
            </p>
            <p className="text-sm text-text-muted">
              {kpi.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;