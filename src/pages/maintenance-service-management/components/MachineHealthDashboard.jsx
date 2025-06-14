import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const MachineHealthDashboard = () => {
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [filterHealth, setFilterHealth] = useState('all');

  // Mock machine health data
  const machineHealthData = [
    {
      id: 'VM-001',
      location: 'ТЦ Мега, 1 этаж',
      status: 'critical',
      healthScore: 25,
      lastMaintenance: '2024-01-10T10:00:00',
      nextMaintenance: '2024-01-20T10:00:00',
      components: {
        cooling: { status: 'critical', value: 15, unit: '°C', threshold: 8 },
        coinAcceptor: { status: 'error', value: 0, unit: '%', threshold: 95 },
        billValidator: { status: 'good', value: 98, unit: '%', threshold: 95 },
        dispensing: { status: 'warning', value: 85, unit: '%', threshold: 90 },
        connectivity: { status: 'good', value: 100, unit: '%', threshold: 95 }
      },
      alerts: [
        'Превышение температуры охлаждения',
        'Монетоприемник не функционирует',
        'Требуется очистка механизма выдачи'
      ]
    },
    {
      id: 'VM-015',
      location: 'Офисный центр Сити',
      status: 'warning',
      healthScore: 75,
      lastMaintenance: '2024-01-12T14:00:00',
      nextMaintenance: '2024-01-25T14:00:00',
      components: {
        cooling: { status: 'good', value: 6, unit: '°C', threshold: 8 },
        coinAcceptor: { status: 'good', value: 97, unit: '%', threshold: 95 },
        billValidator: { status: 'warning', value: 88, unit: '%', threshold: 95 },
        dispensing: { status: 'good', value: 95, unit: '%', threshold: 90 },
        connectivity: { status: 'good', value: 99, unit: '%', threshold: 95 }
      },
      alerts: [
        'Снижение эффективности купюроприемника'
      ]
    },
    {
      id: 'VM-008',
      location: 'Бизнес-центр Альфа',
      status: 'good',
      healthScore: 92,
      lastMaintenance: '2024-01-14T09:00:00',
      nextMaintenance: '2024-02-14T09:00:00',
      components: {
        cooling: { status: 'good', value: 5, unit: '°C', threshold: 8 },
        coinAcceptor: { status: 'good', value: 99, unit: '%', threshold: 95 },
        billValidator: { status: 'good', value: 96, unit: '%', threshold: 95 },
        dispensing: { status: 'good', value: 98, unit: '%', threshold: 90 },
        connectivity: { status: 'good', value: 100, unit: '%', threshold: 95 }
      },
      alerts: []
    },
    {
      id: 'VM-022',
      location: 'Торговый центр Европа',
      status: 'warning',
      healthScore: 68,
      lastMaintenance: '2024-01-08T16:00:00',
      nextMaintenance: '2024-01-18T16:00:00',
      components: {
        cooling: { status: 'warning', value: 10, unit: '°C', threshold: 8 },
        coinAcceptor: { status: 'good', value: 96, unit: '%', threshold: 95 },
        billValidator: { status: 'good', value: 94, unit: '%', threshold: 95 },
        dispensing: { status: 'warning', value: 82, unit: '%', threshold: 90 },
        connectivity: { status: 'good', value: 98, unit: '%', threshold: 95 }
      },
      alerts: [
        'Повышенная температура охлаждения',
        'Снижение надежности механизма выдачи'
      ]
    }
  ];

  // Mock predictive maintenance data
  const predictiveAlerts = [
    {
      id: 1,
      machineId: 'VM-003',
      component: 'Компрессор охлаждения',
      prediction: 'Возможный отказ через 7-10 дней',
      confidence: 85,
      recommendedAction: 'Заменить компрессор в ближайшие 5 дней',
      priority: 'high'
    },
    {
      id: 2,
      machineId: 'VM-012',
      component: 'Купюроприемник',
      prediction: 'Снижение производительности через 14 дней',
      confidence: 72,
      recommendedAction: 'Запланировать профилактическую чистку',
      priority: 'medium'
    },
    {
      id: 3,
      machineId: 'VM-019',
      component: 'Механизм выдачи',
      prediction: 'Износ подшипников через 21 день',
      confidence: 68,
      recommendedAction: 'Заказать запчасти для замены',
      priority: 'low'
    }
  ];

  // Mock parts inventory
  const partsInventory = [
    {
      id: 1,
      name: 'Компрессор охлаждения',
      partNumber: 'COMP-001',
      inStock: 3,
      minStock: 2,
      maxStock: 8,
      status: 'adequate',
      cost: 15000,
      supplier: 'ТехСервис'
    },
    {
      id: 2,
      name: 'Купюроприемник',
      partNumber: 'BILL-002',
      inStock: 1,
      minStock: 2,
      maxStock: 5,
      status: 'low',
      cost: 8500,
      supplier: 'КэшТех'
    },
    {
      id: 3,
      name: 'Монетоприемник',
      partNumber: 'COIN-003',
      inStock: 5,
      minStock: 3,
      maxStock: 10,
      status: 'good',
      cost: 6200,
      supplier: 'КоинМастер'
    },
    {
      id: 4,
      name: 'Фильтр охлаждения',
      partNumber: 'FILT-004',
      inStock: 0,
      minStock: 5,
      maxStock: 20,
      status: 'critical',
      cost: 450,
      supplier: 'ФильтрПро'
    }
  ];

  const getHealthColor = (status) => {
    switch (status) {
      case 'critical': return 'text-error';
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'good': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getHealthBgColor = (status) => {
    switch (status) {
      case 'critical': return 'bg-error-100';
      case 'error': return 'bg-error-100';
      case 'warning': return 'bg-warning-100';
      case 'good': return 'bg-success-100';
      default: return 'bg-secondary-100';
    }
  };

  const getComponentIcon = (component) => {
    switch (component) {
      case 'cooling': return 'Snowflake';
      case 'coinAcceptor': return 'Coins';
      case 'billValidator': return 'CreditCard';
      case 'dispensing': return 'Package';
      case 'connectivity': return 'Wifi';
      default: return 'Settings';
    }
  };

  const getComponentName = (component) => {
    switch (component) {
      case 'cooling': return 'Охлаждение';
      case 'coinAcceptor': return 'Монетоприемник';
      case 'billValidator': return 'Купюроприемник';
      case 'dispensing': return 'Выдача товара';
      case 'connectivity': return 'Связь';
      default: return component;
    }
  };

  const getStockStatus = (status) => {
    switch (status) {
      case 'critical': return 'bg-error text-white';
      case 'low': return 'bg-warning text-white';
      case 'adequate': return 'bg-primary text-white';
      case 'good': return 'bg-success text-white';
      default: return 'bg-secondary-200 text-text-primary';
    }
  };

  const filteredMachines = machineHealthData.filter(machine => {
    if (filterHealth === 'all') return true;
    return machine.status === filterHealth;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Всего машин</p>
              <p className="text-2xl font-bold text-text-primary">{machineHealthData.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="Monitor" size={24} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Критическое состояние</p>
              <p className="text-2xl font-bold text-error">
                {machineHealthData.filter(m => m.status === 'critical').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-error-100 rounded-lg flex items-center justify-center">
              <Icon name="AlertCircle" size={24} className="text-error" />
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Требуют внимания</p>
              <p className="text-2xl font-bold text-warning">
                {machineHealthData.filter(m => m.status === 'warning').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={24} className="text-warning" />
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Исправные</p>
              <p className="text-2xl font-bold text-success">
                {machineHealthData.filter(m => m.status === 'good').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={24} className="text-success" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Machine Health List */}
        <div className="lg:col-span-2 bg-surface rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Состояние машин
              </h3>
              <select
                value={filterHealth}
                onChange={(e) => setFilterHealth(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">Все машины</option>
                <option value="critical">Критическое</option>
                <option value="warning">Требуют внимания</option>
                <option value="good">Исправные</option>
              </select>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {filteredMachines.map((machine) => (
              <div
                key={machine.id}
                className={`p-6 border-b border-border cursor-pointer hover:bg-secondary-50 transition-colors duration-200 ${
                  selectedMachine?.id === machine.id ? 'bg-primary-50' : ''
                }`}
                onClick={() => setSelectedMachine(machine)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-text-primary">{machine.id}</h4>
                    <p className="text-sm text-text-secondary">{machine.location}</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getHealthBgColor(machine.status)} ${getHealthColor(machine.status)}`}>
                      Здоровье: {machine.healthScore}%
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-4 mb-4">
                  {Object.entries(machine.components).map(([key, component]) => (
                    <div key={key} className="text-center">
                      <Icon
                        name={getComponentIcon(key)}
                        size={20}
                        className={`mx-auto mb-1 ${getHealthColor(component.status)}`}
                      />
                      <p className="text-xs text-text-secondary">{getComponentName(key)}</p>
                      <p className={`text-xs font-medium ${getHealthColor(component.status)}`}>
                        {component.value}{component.unit}
                      </p>
                    </div>
                  ))}
                </div>

                {machine.alerts.length > 0 && (
                  <div className="bg-warning-50 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-warning mb-1">Активные предупреждения:</p>
                        <ul className="text-sm text-text-secondary space-y-1">
                          {machine.alerts.map((alert, index) => (
                            <li key={index}>• {alert}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Machine Details & Predictive Maintenance */}
        <div className="space-y-6">
          {/* Selected Machine Details */}
          {selectedMachine && (
            <div className="bg-surface rounded-lg border border-border p-6">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                Детали машины {selectedMachine.id}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-text-secondary">Последнее обслуживание</p>
                  <p className="text-sm text-text-primary">{formatDate(selectedMachine.lastMaintenance)}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-text-secondary">Следующее обслуживание</p>
                  <p className="text-sm text-text-primary">{formatDate(selectedMachine.nextMaintenance)}</p>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium text-text-secondary mb-3">Компоненты</p>
                  <div className="space-y-3">
                    {Object.entries(selectedMachine.components).map(([key, component]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon
                            name={getComponentIcon(key)}
                            size={16}
                            className={getHealthColor(component.status)}
                          />
                          <span className="text-sm text-text-primary">{getComponentName(key)}</span>
                        </div>
                        <div className="text-right">
                          <span className={`text-sm font-medium ${getHealthColor(component.status)}`}>
                            {component.value}{component.unit}
                          </span>
                          <p className="text-xs text-text-muted">
                            Норма: {component.threshold}{component.unit}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Predictive Maintenance Alerts */}
          <div className="bg-surface rounded-lg border border-border">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Прогнозное обслуживание
              </h3>
            </div>
            
            <div className="max-h-64 overflow-y-auto">
              {predictiveAlerts.map((alert) => (
                <div key={alert.id} className="p-4 border-b border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-text-primary">{alert.machineId}</p>
                      <p className="text-sm text-text-secondary">{alert.component}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.priority === 'high' ? 'bg-error-100 text-error' :
                      alert.priority === 'medium'? 'bg-warning-100 text-warning' : 'bg-secondary-100 text-text-secondary'
                    }`}>
                      {alert.priority === 'high' ? 'Высокий' :
                       alert.priority === 'medium' ? 'Средний' : 'Низкий'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-text-primary mb-2">{alert.prediction}</p>
                  <p className="text-sm text-text-secondary mb-2">{alert.recommendedAction}</p>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-secondary-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${alert.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-text-muted">{alert.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Parts Inventory */}
      <div className="bg-surface rounded-lg border border-border">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Запасы запчастей
            </h3>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium">
              Заказать запчасти
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-6 font-medium text-text-secondary">Запчасть</th>
                <th className="text-left py-3 px-6 font-medium text-text-secondary">Артикул</th>
                <th className="text-left py-3 px-6 font-medium text-text-secondary">В наличии</th>
                <th className="text-left py-3 px-6 font-medium text-text-secondary">Статус</th>
                <th className="text-left py-3 px-6 font-medium text-text-secondary">Стоимость</th>
                <th className="text-left py-3 px-6 font-medium text-text-secondary">Поставщик</th>
                <th className="text-left py-3 px-6 font-medium text-text-secondary">Действия</th>
              </tr>
            </thead>
            <tbody>
              {partsInventory.map((part) => (
                <tr key={part.id} className="border-b border-border hover:bg-secondary-50">
                  <td className="py-4 px-6">
                    <div className="font-medium text-text-primary">{part.name}</div>
                  </td>
                  <td className="py-4 px-6 text-text-secondary">{part.partNumber}</td>
                  <td className="py-4 px-6">
                    <div className="text-text-primary">{part.inStock} шт.</div>
                    <div className="text-sm text-text-secondary">
                      Мин: {part.minStock}, Макс: {part.maxStock}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStockStatus(part.status)}`}>
                      {part.status === 'critical' ? 'Критический' :
                       part.status === 'low' ? 'Низкий' :
                       part.status === 'adequate' ? 'Достаточно' : 'Хорошо'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-text-primary">
                    {part.cost.toLocaleString('ru-RU')} ₽
                  </td>
                  <td className="py-4 px-6 text-text-secondary">{part.supplier}</td>
                  <td className="py-4 px-6">
                    <button className="text-primary hover:text-primary-700 text-sm font-medium">
                      Заказать
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MachineHealthDashboard;