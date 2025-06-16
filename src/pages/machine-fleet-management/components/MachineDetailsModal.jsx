import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MachineDetailsModal = ({ machine, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for charts and details
  const salesData = [
    { time: '00:00', sales: 1200 },
    { time: '03:00', sales: 800 },
    { time: '06:00', sales: 500 },
    { time: '09:00', sales: 1500 },
    { time: '12:00', sales: 2500 },
    { time: '15:00', sales: 2300 },
    { time: '18:00', sales: 3200 },
    { time: '21:00', sales: 2100 }
  ];

  const inventoryItems = [
    { id: 1, name: 'Кока-Кола 0.5л', stock: 24, capacity: 40, price: 120 },
    { id: 2, name: 'Сникерс', stock: 18, capacity: 30, price: 90 },
    { id: 3, name: 'Чипсы Lays', stock: 12, capacity: 20, price: 150 },
    { id: 4, name: 'Вода Аква Минерале 0.5л', stock: 30, capacity: 40, price: 80 },
    { id: 5, name: 'Орбит', stock: 25, capacity: 50, price: 50 }
  ];

  const maintenanceHistory = [
    { id: 1, date: '2023-11-15T10:30:00', type: 'Плановое обслуживание', technician: 'Иванов А.П.', status: 'completed' },
    { id: 2, date: '2023-10-22T14:15:00', type: 'Ремонт купюроприемника', technician: 'Петров И.С.', status: 'completed' },
    { id: 3, date: '2023-09-05T09:45:00', type: 'Перезагрузка системы', technician: 'Сидоров К.В.', status: 'completed' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'offline': return 'bg-error';
      case 'maintenance': return 'bg-accent';
      case 'warning': return 'bg-warning';
      default: return 'bg-secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'В сети';
      case 'offline': return 'Не в сети';
      case 'maintenance': return 'Обслуживание';
      case 'warning': return 'Внимание';
      default: return 'Неизвестно';
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'snack': return 'Снеки';
      case 'coffee': return 'Кофе';
      case 'combo': return 'Комбо';
      default: return type;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-md">
          <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
          <p className="text-sm text-text-secondary">
            Продажи: <span className="font-medium text-primary">₽{payload[0]?.value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Basic Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Machine Details */}
              <div className="bg-secondary-50 rounded-lg p-4">
                <h3 className="font-medium text-text-primary mb-3">Основная информация</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">ID:</span>
                    <span className="text-text-primary font-medium">{machine?.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Тип:</span>
                    <span className="text-text-primary">{getTypeText(machine?.type)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Модель:</span>
                    <span className="text-text-primary">VendPro X500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Серийный номер:</span>
                    <span className="text-text-primary">VP-{machine?.id}-22-11456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Установлен:</span>
                    <span className="text-text-primary">15.06.2022</span>
                  </div>
                </div>
              </div>

              {/* Status and Performance */}
              <div className="bg-secondary-50 rounded-lg p-4">
                <h3 className="font-medium text-text-primary mb-3">Статус и производительность</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Статус:</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(machine?.status)}`}></div>
                      <span className="text-text-primary">{getStatusText(machine?.status)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Последняя активность:</span>
                    <span className="text-text-primary">
                      {machine?.lastActivity ? format(new Date(machine?.lastActivity), 'dd.MM.yyyy HH:mm') : 'Н/Д'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Выручка (день):</span>
                    <span className="text-text-primary">₽{machine?.revenue?.toLocaleString('ru-RU')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Выручка (месяц):</span>
                    <span className="text-text-primary">₽{(machine?.revenue * 30 * 0.85)?.toLocaleString('ru-RU')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Уровень запасов:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-secondary-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${machine?.stock > 30 ? 'bg-success' : 'bg-warning'}`}
                          style={{ width: `${machine?.stock}%` }}
                        ></div>
                      </div>
                      <span className="text-text-primary">{machine?.stock}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sales Chart */}
            <div>
              <h3 className="font-medium text-text-primary mb-3">Продажи за 24 часа</h3>
              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis 
                        dataKey="time" 
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
                        tickFormatter={(value) => `₽${value}`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="#1E40AF" 
                        strokeWidth={3}
                        dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#1E40AF', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        );
      case 'inventory':
        return (
          <div>
            <h3 className="font-medium text-text-primary mb-3">Инвентарь и запасы</h3>
            <div className="bg-surface border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary-50 border-b border-border">
                    <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Название товара</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Запас</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Вместимость</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Цена</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems?.map((item) => (
                    <tr key={item?.id} className="border-b border-border">
                      <td className="px-4 py-3">
                        <span className="font-medium text-text-primary">{item?.name}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-text-primary">{item?.stock} шт.</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-text-primary">{item?.capacity} шт.</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-text-primary">₽{item?.price}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${(item?.stock / item?.capacity) > 0.3 ? 'bg-success' : 'bg-warning'}`}></div>
                          <span className="text-text-primary">
                            {(item?.stock / item?.capacity) > 0.5 ? 'Достаточно' : 
                             (item?.stock / item?.capacity) > 0.3 ? 'Средний запас' : 'Низкий запас'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 border-t border-border">
                <button className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                  <Icon name="ShoppingCart" size={16} />
                  <span>Пополнить запасы</span>
                </button>
              </div>
            </div>
          </div>
        );
      case 'maintenance':
        return (
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-text-primary">История обслуживания</h3>
              <button className="inline-flex items-center space-x-2 px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm">
                <Icon name="Calendar" size={14} />
                <span>Запланировать</span>
              </button>
            </div>
            <div className="bg-surface border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary-50 border-b border-border">
                    <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Дата</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Тип</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Техник</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {maintenanceHistory?.map((record) => (
                    <tr key={record?.id} className="border-b border-border">
                      <td className="px-4 py-3">
                        <span className="text-text-primary">
                          {format(new Date(record?.date), 'dd.MM.yyyy HH:mm')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-text-primary">{record?.type}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-text-primary">{record?.technician}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-50 text-success">
                          Выполнено
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-text-primary mb-3">Диагностика</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-success-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center text-success">
                      <Icon name="CheckCircle" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">Система охлаждения</p>
                      <p className="text-sm text-success">Работает нормально</p>
                    </div>
                  </div>
                </div>
                <div className="bg-success-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center text-success">
                      <Icon name="CheckCircle" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">Платежная система</p>
                      <p className="text-sm text-success">Работает нормально</p>
                    </div>
                  </div>
                </div>
                <div className="bg-warning-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-warning-100 flex items-center justify-center text-warning">
                      <Icon name="AlertTriangle" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">Механизм выдачи</p>
                      <p className="text-sm text-warning">Требует внимания</p>
                    </div>
                  </div>
                </div>
                <div className="bg-success-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center text-success">
                      <Icon name="CheckCircle" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">Программное обеспечение</p>
                      <p className="text-sm text-success">Актуальная версия</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div>
            <h3 className="font-medium text-text-primary mb-3">Настройки машины</h3>
            <div className="space-y-6">
              {/* Network Settings */}
              <div className="bg-surface border border-border rounded-lg p-4">
                <h4 className="font-medium text-text-primary mb-3">Сетевые настройки</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-text-secondary mb-1">IP-адрес</label>
                    <input 
                      type="text" 
                      value="192.168.1.45" 
                      className="w-full p-2 border border-border rounded-lg" 
                      readOnly 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-1">Маска подсети</label>
                    <input 
                      type="text" 
                      value="255.255.255.0" 
                      className="w-full p-2 border border-border rounded-lg" 
                      readOnly 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-1">Шлюз</label>
                    <input 
                      type="text" 
                      value="192.168.1.1" 
                      className="w-full p-2 border border-border rounded-lg" 
                      readOnly 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm text-text-secondary">Подключено к сети</span>
                    </div>
                    <button className="text-sm text-primary hover:text-primary-700 transition-colors duration-200">
                      Изменить
                    </button>
                  </div>
                </div>
              </div>

              {/* Payment Settings */}
              <div className="bg-surface border border-border rounded-lg p-4">
                <h4 className="font-medium text-text-primary mb-3">Настройки оплаты</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Прием банкнот</span>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input 
                        type="checkbox" 
                        name="toggle-bills" 
                        id="toggle-bills" 
                        checked 
                        className="sr-only" 
                      />
                      <label 
                        htmlFor="toggle-bills" 
                        className="block overflow-hidden h-6 rounded-full bg-success cursor-pointer"
                      >
                        <span className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform translate-x-4"></span>
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Прием монет</span>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input 
                        type="checkbox" 
                        name="toggle-coins" 
                        id="toggle-coins" 
                        checked 
                        className="sr-only" 
                      />
                      <label 
                        htmlFor="toggle-coins" 
                        className="block overflow-hidden h-6 rounded-full bg-success cursor-pointer"
                      >
                        <span className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform translate-x-4"></span>
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Банковские карты</span>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input 
                        type="checkbox" 
                        name="toggle-cards" 
                        id="toggle-cards" 
                        checked 
                        className="sr-only" 
                      />
                      <label 
                        htmlFor="toggle-cards" 
                        className="block overflow-hidden h-6 rounded-full bg-success cursor-pointer"
                      >
                        <span className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform translate-x-4"></span>
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Мобильные платежи</span>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input 
                        type="checkbox" 
                        name="toggle-mobile" 
                        id="toggle-mobile" 
                        checked 
                        className="sr-only" 
                      />
                      <label 
                        htmlFor="toggle-mobile" 
                        className="block overflow-hidden h-6 rounded-full bg-success cursor-pointer"
                      >
                        <span className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform translate-x-4"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Settings */}
              <div className="bg-surface border border-border rounded-lg p-4">
                <h4 className="font-medium text-text-primary mb-3">Системные настройки</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-text-secondary mb-1">Текущая версия ПО</label>
                    <div className="flex items-center justify-between">
                      <span className="text-text-primary">v2.1.5</span>
                      <button className="text-sm text-primary hover:text-primary-700 transition-colors duration-200">
                        Обновить
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-1">Язык интерфейса</label>
                    <select className="w-full p-2 border border-border rounded-lg">
                      <option>Русский</option>
                      <option>English</option>
                    </select>
                  </div>
                  <div>
                    <button className="inline-flex items-center space-x-2 px-4 py-2 bg-surface border border-border text-text-primary rounded-lg hover:bg-secondary-50 transition-colors duration-200">
                      <Icon name="RefreshCw" size={16} />
                      <span>Перезагрузить систему</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-secondary-900 bg-opacity-75 flex items-center justify-center z-400 p-4">
      <div className="bg-surface rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(machine?.status)}`}></div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">{machine?.name}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-secondary-100 transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary'} transition-colors duration-200`}
            >
              Обзор
            </button>
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'inventory' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary'} transition-colors duration-200`}
            >
              Инвентарь
            </button>
            <button 
              onClick={() => setActiveTab('maintenance')}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'maintenance' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary'} transition-colors duration-200`}
            >
              Обслуживание
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'settings' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary'} transition-colors duration-200`}
            >
              Настройки
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-5 flex justify-between items-center">
          <div className="text-sm text-text-secondary">
            ID: <span className="font-medium text-text-primary">{machine?.id}</span> • 
            Локация: <span className="font-medium text-text-primary">{machine?.location}</span>
          </div>
          <div className="space-x-3">
            <button className="px-4 py-2 bg-surface border border-border text-text-primary rounded-lg hover:bg-secondary-50 transition-colors duration-200">
              Закрыть
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
              Сохранить изменения
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineDetailsModal;