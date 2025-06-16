// src/pages/ingredient-catalog-management/components/StockAlertsPanel.jsx
import React from 'react';
import Icon from '../../../components/AppIcon';

const StockAlertsPanel = ({ alerts, onAlertAction }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'border-error-200 bg-error-50';
      case 'medium':
        return 'border-warning-200 bg-warning-50';
      case 'low':
        return 'border-info-200 bg-info-50';
      default:
        return 'border-border bg-secondary-50';
    }
  };

  const getSeverityIcon = (type) => {
    switch (type) {
      case 'low_stock':
        return 'AlertTriangle';
      case 'expiry_warning':
        return 'Clock';
      case 'reorder_point':
        return 'RefreshCw';
      default:
        return 'Bell';
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'low_stock':
        return 'Мало на складе';
      case 'expiry_warning':
        return 'Истекает срок годности';
      case 'reorder_point':
        return 'Точка заказа';
      default:
        return type;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Уведомления по складу
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">
            {alerts?.length || 0} активных
          </span>
          <button className="p-1 text-text-secondary hover:text-primary transition-colors">
            <Icon name="Settings" size={16} />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {alerts?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={32} className="mx-auto mb-2 text-success-500" />
            <p className="text-text-secondary text-sm">
              Нет активных уведомлений
            </p>
          </div>
        ) : (
          alerts?.map(alert => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border-l-4 ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start space-x-3">
                <Icon
                  name={getSeverityIcon(alert.type)}
                  size={16}
                  className="text-text-secondary mt-0.5 flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-text-secondary uppercase">
                      {getTypeText(alert.type)}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      alert.severity === 'high' ?'bg-error-100 text-error-700'
                        : alert.severity === 'medium' ?'bg-warning-100 text-warning-700' :'bg-info-100 text-info-700'
                    }`}>
                      {alert.severity === 'high' ? 'Высокий' :
                       alert.severity === 'medium' ? 'Средний' : 'Низкий'}
                    </span>
                  </div>
                  
                  <h4 className="font-medium text-text-primary text-sm mb-1">
                    {alert.ingredient}
                  </h4>
                  
                  <div className="text-xs text-text-secondary space-y-1">
                    {alert.type === 'low_stock' && (
                      <p>
                        Остаток: {alert.currentStock} / Минимум: {alert.minimumStock}
                      </p>
                    )}
                    
                    {alert.type === 'expiry_warning' && (
                      <p>
                        Истекает: {alert.expiryDate} ({alert.daysLeft} дней)
                      </p>
                    )}
                    
                    {alert.type === 'reorder_point' && (
                      <p>
                        Остаток: {alert.currentStock} / Точка заказа: {alert.reorderPoint}
                      </p>
                    )}
                    
                    {alert.machines && (
                      <p>
                        Автоматы: {alert.machines.join(', ')}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => onAlertAction(alert.id, 'resolve')}
                      className="text-xs px-2 py-1 bg-success-100 text-success-700 rounded hover:bg-success-200 transition-colors"
                    >
                      Решено
                    </button>
                    
                    <button
                      onClick={() => onAlertAction(alert.id, 'snooze')}
                      className="text-xs px-2 py-1 bg-secondary-100 text-text-secondary rounded hover:bg-secondary-200 transition-colors"
                    >
                      Отложить
                    </button>
                    
                    {(alert.type === 'low_stock' || alert.type === 'reorder_point') && (
                      <button
                        onClick={() => onAlertAction(alert.id, 'reorder')}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
                      >
                        Заказать
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {alerts?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary-700 font-medium transition-colors">
            Посмотреть все уведомления
          </button>
        </div>
      )}
    </div>
  );
};

export default StockAlertsPanel;