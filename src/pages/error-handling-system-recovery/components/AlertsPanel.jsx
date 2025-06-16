// src/pages/error-handling-system-recovery/components/AlertsPanel.jsx
import React from 'react';
import Icon from 'components/AppIcon';

const AlertsPanel = ({ criticalCount, activeCount, recoveryCount }) => {
  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Критические ошибки обнаружены',
      message: `${criticalCount} критических ошибок требуют немедленного внимания`,
      count: criticalCount,
      action: 'Просмотреть',
      actionType: 'error'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Активные проблемы',
      message: `${activeCount} активных проблем в системе мониторинга`,
      count: activeCount,
      action: 'Анализировать',
      actionType: 'warning'
    },
    {
      id: 3,
      type: 'info',
      title: 'Восстановление в процессе',
      message: `${recoveryCount} процедур восстановления выполняются`,
      count: recoveryCount,
      action: 'Мониторинг',
      actionType: 'info'
    }
  ];

  const getAlertStyle = (type) => {
    switch (type) {
      case 'critical':
        return {
          containerClass: 'bg-error-50 border-error-200 border-l-4 border-l-error',
          iconClass: 'text-error',
          countClass: 'bg-error text-white',
          actionClass: 'bg-error text-white hover:bg-error-700'
        };
      case 'warning':
        return {
          containerClass: 'bg-warning-50 border-warning-200 border-l-4 border-l-warning',
          iconClass: 'text-warning',
          countClass: 'bg-warning text-white',
          actionClass: 'bg-warning text-white hover:bg-warning-700'
        };
      case 'info':
        return {
          containerClass: 'bg-primary-50 border-primary-200 border-l-4 border-l-primary',
          iconClass: 'text-primary',
          countClass: 'bg-primary text-white',
          actionClass: 'bg-primary text-white hover:bg-primary-700'
        };
      default:
        return {
          containerClass: 'bg-secondary-50 border-secondary-200 border-l-4 border-l-secondary',
          iconClass: 'text-secondary',
          countClass: 'bg-secondary text-white',
          actionClass: 'bg-secondary text-white hover:bg-secondary-700'
        };
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'info': return 'Info';
      default: return 'Circle';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {alerts.map((alert) => {
        const styles = getAlertStyle(alert.type);
        
        return (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${styles.containerClass}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <Icon 
                  name={getAlertIcon(alert.type)} 
                  size={20} 
                  className={styles.iconClass}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-text-primary text-sm">
                      {alert.title}
                    </h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${styles.countClass}`}>
                      {alert.count}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-3">
                    {alert.message}
                  </p>
                  <button className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-200 ${styles.actionClass}`}>
                    {alert.action}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AlertsPanel;