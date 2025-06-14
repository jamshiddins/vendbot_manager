import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AlertsPanel = ({ alerts, pendingOrders, onRestockingClick }) => {
  const [activeTab, setActiveTab] = useState('alerts');

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'text-error bg-error-50 border-l-error';
      case 'warning': return 'text-warning bg-warning-50 border-l-warning';
      case 'info': return 'text-primary bg-primary-50 border-l-primary';
      default: return 'text-text-secondary bg-secondary-50 border-l-secondary';
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-success bg-success-50';
      case 'pending': return 'text-warning bg-warning-50';
      case 'delivered': return 'text-primary bg-primary-50';
      default: return 'text-text-secondary bg-secondary-50';
    }
  };

  const getOrderStatusLabel = (status) => {
    switch (status) {
      case 'confirmed': return 'Подтверждён';
      case 'pending': return 'Ожидает';
      case 'delivered': return 'Доставлен';
      default: return 'Неизвестно';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="font-heading font-semibold text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="Zap" size={18} />
          <span>Быстрые действия</span>
        </h3>
        
        <div className="space-y-3">
          <button
            onClick={onRestockingClick}
            className="w-full flex items-center space-x-3 p-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors duration-200 group"
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Truck" size={16} className="text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-primary group-hover:text-primary-700">
                Создать маршрут пополнения
              </p>
              <p className="text-xs text-primary-600">
                Оптимизированный маршрут
              </p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-primary" />
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors duration-200 group">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={16} className="text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-text-primary">
                Сформировать отчёт
              </p>
              <p className="text-xs text-text-secondary">
                Анализ запасов
              </p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-text-secondary" />
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 bg-accent-50 hover:bg-accent-100 rounded-lg transition-colors duration-200 group">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Icon name="Settings" size={16} className="text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-accent-700">
                Настроить автозаказ
              </p>
              <p className="text-xs text-accent-600">
                Автоматическое пополнение
              </p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-accent" />
          </button>
        </div>
      </div>

      {/* Alerts and Orders */}
      <div className="bg-surface rounded-lg border border-border">
        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'alerts' ?'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon name="AlertTriangle" size={16} />
              <span>Уведомления</span>
              <span className="bg-error text-white text-xs px-2 py-1 rounded-full">
                {alerts.filter(a => a.type === 'critical').length}
              </span>
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'orders' ?'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon name="ShoppingCart" size={16} />
              <span>Заказы</span>
              <span className="bg-warning text-white text-xs px-2 py-1 rounded-full">
                {pendingOrders.length}
              </span>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === 'alerts' ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border-l-4 ${getAlertColor(alert.type)}`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon
                      name={getAlertIcon(alert.type)}
                      size={16}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">
                        {alert.product}
                      </p>
                      <p className="text-sm mt-1">
                        {alert.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs opacity-75">
                          📍 {alert.machine}
                        </p>
                        <p className="text-xs opacity-75">
                          {alert.time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {alerts.length === 0 && (
                <div className="text-center py-8">
                  <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-2" />
                  <p className="text-text-secondary">Нет активных уведомлений</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {pendingOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {order.supplier}
                      </p>
                      <p className="text-xs text-text-secondary">
                        Заказ от {formatDate(order.orderDate)}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                      {getOrderStatusLabel(order.status)}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    {order.products.map((product, index) => (
                      <p key={index} className="text-xs text-text-secondary">
                        • {product}
                      </p>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-text-secondary">
                        Ожидаемая доставка:
                      </p>
                      <p className="text-sm font-medium text-text-primary">
                        {formatDate(order.expectedDelivery)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-text-secondary">Сумма:</p>
                      <p className="text-sm font-medium text-text-primary">
                        {formatPrice(order.total)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {pendingOrders.length === 0 && (
                <div className="text-center py-8">
                  <Icon name="ShoppingCart" size={48} className="text-text-muted mx-auto mb-2" />
                  <p className="text-text-secondary">Нет активных заказов</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertsPanel;