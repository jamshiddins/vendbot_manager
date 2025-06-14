import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const MachineMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapView, setMapView] = useState('map'); // 'map' or 'list'

  const machineLocations = [
    {
      id: 'vm-001',
      name: 'ТЦ Мега Белая Дача',
      address: 'Котельническая наб., 1/15, Москва',
      status: 'active',
      lat: 55.7558,
      lng: 37.6176,
      revenue: '₽12,450',
      lastUpdate: '2 мин назад',
      issues: 0,
      products: 45
    },
    {
      id: 'vm-002',
      name: 'Офисный центр Сити',
      address: 'Пресненская наб., 12, Москва',
      status: 'warning',
      lat: 55.7494,
      lng: 37.5381,
      revenue: '₽8,320',
      lastUpdate: '5 мин назад',
      issues: 1,
      products: 23
    },
    {
      id: 'vm-003',
      name: 'Бизнес-центр Альфа',
      address: 'Тверская ул., 16, Москва',
      status: 'error',
      lat: 55.7665,
      lng: 37.6065,
      revenue: '₽0',
      lastUpdate: '15 мин назад',
      issues: 3,
      products: 0
    },
    {
      id: 'vm-004',
      name: 'ТЦ Европейский',
      address: 'Киевская ул., 2, Москва',
      status: 'active',
      lat: 55.7441,
      lng: 37.5661,
      revenue: '₽15,680',
      lastUpdate: '1 мин назад',
      issues: 0,
      products: 52
    },
    {
      id: 'vm-005',
      name: 'Аэропорт Домодедово',
      address: 'Домодедово, Московская обл.',
      status: 'maintenance',
      lat: 55.4108,
      lng: 37.9034,
      revenue: '₽22,100',
      lastUpdate: '30 мин назад',
      issues: 0,
      products: 38
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'error': return 'bg-error';
      case 'maintenance': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Активна';
      case 'warning': return 'Предупреждение';
      case 'error': return 'Ошибка';
      case 'maintenance': return 'Обслуживание';
      default: return 'Неизвестно';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      case 'maintenance': return 'Wrench';
      default: return 'HelpCircle';
    }
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Карта машин
          </h2>
          <p className="text-sm text-text-secondary">
            Географическое расположение торговых автоматов
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setMapView('map')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              mapView === 'map' ?'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
            }`}
          >
            <Icon name="Map" size={16} className="mr-2" />
            Карта
          </button>
          <button
            onClick={() => setMapView('list')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              mapView === 'list' ?'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
            }`}
          >
            <Icon name="List" size={16} className="mr-2" />
            Список
          </button>
        </div>
      </div>

      {mapView === 'map' ? (
        <div className="relative">
          {/* Map Container */}
          <div className="w-full h-96 bg-secondary-100 rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Vending Machines Map"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=55.7558,37.6176&z=11&output=embed"
              className="border-0"
            />
          </div>

          {/* Map Legend */}
          <div className="absolute top-4 right-4 bg-surface rounded-lg border border-border p-4 shadow-lg">
            <h4 className="text-sm font-medium text-text-primary mb-3">Статус машин</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-xs text-text-secondary">Активна</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span className="text-xs text-text-secondary">Предупреждение</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-error rounded-full"></div>
                <span className="text-xs text-text-secondary">Ошибка</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span className="text-xs text-text-secondary">Обслуживание</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {machineLocations.map((location) => (
            <div
              key={location.id}
              onClick={() => handleLocationClick(location)}
              className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 cursor-pointer transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 ${getStatusColor(location.status)} rounded-full`}></div>
                <div>
                  <h4 className="font-medium text-text-primary">{location.name}</h4>
                  <p className="text-sm text-text-secondary">{location.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-sm font-medium text-text-primary">{location.revenue}</p>
                  <p className="text-xs text-text-secondary">{location.lastUpdate}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name={getStatusIcon(location.status)} size={16} className={getStatusColor(location.status).replace('bg-', 'text-')} />
                  <span className="text-sm text-text-secondary">{getStatusText(location.status)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected Location Details */}
      {selectedLocation && (
        <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-text-primary">{selectedLocation.name}</h4>
            <button
              onClick={() => setSelectedLocation(null)}
              className="p-1 rounded hover:bg-primary-100 transition-colors duration-200"
            >
              <Icon name="X" size={16} className="text-text-secondary" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-text-secondary">Статус</p>
              <p className="font-medium text-text-primary">{getStatusText(selectedLocation.status)}</p>
            </div>
            <div>
              <p className="text-text-secondary">Выручка</p>
              <p className="font-medium text-text-primary">{selectedLocation.revenue}</p>
            </div>
            <div>
              <p className="text-text-secondary">Товары</p>
              <p className="font-medium text-text-primary">{selectedLocation.products} шт.</p>
            </div>
            <div>
              <p className="text-text-secondary">Проблемы</p>
              <p className="font-medium text-text-primary">{selectedLocation.issues}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MachineMap;