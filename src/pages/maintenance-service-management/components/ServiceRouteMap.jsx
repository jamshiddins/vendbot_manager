import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ServiceRouteMap = ({ requests, technicians }) => {
  const [selectedTechnician, setSelectedTechnician] = useState('all');
  const [routeOptimization, setRouteOptimization] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  // Mock optimized routes data
  const optimizedRoutes = [
    {
      id: 1,
      technicianId: 1,
      technicianName: 'Иван Петров',
      totalDistance: 24.5,
      estimatedTime: 180,
      fuelCost: 850,
      requests: ['SR-001', 'SR-003'],
      waypoints: [
        { lat: 55.7558, lng: 37.6176, location: 'ТЦ Мега, 1 этаж', order: 1 },
        { lat: 55.7489, lng: 37.6201, location: 'Бизнес-центр Альфа', order: 2 }
      ]
    },
    {
      id: 2,
      technicianId: 2,
      technicianName: 'Мария Сидорова',
      totalDistance: 18.2,
      estimatedTime: 120,
      fuelCost: 630,
      requests: ['SR-002'],
      waypoints: [
        { lat: 55.7522, lng: 37.6156, location: 'Офисный центр Сити', order: 1 }
      ]
    },
    {
      id: 3,
      technicianId: 3,
      technicianName: 'Алексей Козлов',
      totalDistance: 31.8,
      estimatedTime: 210,
      fuelCost: 1100,
      requests: ['SR-004'],
      waypoints: [
        { lat: 55.7601, lng: 37.6142, location: 'Торговый центр Европа', order: 1 }
      ]
    }
  ];

  const filteredRoutes = selectedTechnician === 'all' 
    ? optimizedRoutes 
    : optimizedRoutes.filter(route => route.technicianId.toString() === selectedTechnician);

  const getTechnicianById = (id) => {
    return technicians.find(tech => tech.id === id);
  };

  const getRequestById = (id) => {
    return requests.find(req => req.id === id);
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}ч ${mins}м`;
  };

  const handleOptimizeRoutes = () => {
    setRouteOptimization(true);
    // Simulate route optimization
    setTimeout(() => {
      setRouteOptimization(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Route Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <h3 className="text-xl font-heading font-semibold text-text-primary">
            Маршруты обслуживания
          </h3>
          <select
            value={selectedTechnician}
            onChange={(e) => setSelectedTechnician(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Все техники</option>
            {technicians.map((tech) => (
              <option key={tech.id} value={tech.id.toString()}>{tech.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleOptimizeRoutes}
            disabled={routeOptimization}
            className="flex items-center space-x-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-700 transition-colors duration-200 font-medium disabled:opacity-50"
          >
            {routeOptimization ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span>Оптимизация...</span>
              </>
            ) : (
              <>
                <Icon name="Route" size={16} />
                <span>Оптимизировать маршруты</span>
              </>
            )}
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium">
            <Icon name="Download" size={16} />
            <span>Экспорт маршрутов</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2 bg-surface rounded-lg border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-text-primary">Карта маршрутов</h4>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-error rounded-full"></div>
                  <span className="text-text-secondary">Критические</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <span className="text-text-secondary">Высокий приоритет</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-text-secondary">Обычные</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-96 relative">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Service Routes Map"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=55.7558,37.6176&z=12&output=embed"
              className="border-0"
            />
            
            {/* Map Overlay with Route Information */}
            <div className="absolute top-4 left-4 bg-surface rounded-lg shadow-lg p-4 max-w-64">
              <h5 className="font-medium text-text-primary mb-2">Активные маршруты</h5>
              <div className="space-y-2 text-sm">
                {filteredRoutes.map((route) => (
                  <div key={route.id} className="flex items-center justify-between">
                    <span className="text-text-secondary">{route.technicianName}</span>
                    <span className="text-text-primary font-medium">{route.requests.length} заявок</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Route Details */}
        <div className="space-y-6">
          {/* Route Summary */}
          <div className="bg-surface rounded-lg border border-border p-6">
            <h4 className="font-medium text-text-primary mb-4">Сводка маршрутов</h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Всего маршрутов</span>
                <span className="font-medium text-text-primary">{filteredRoutes.length}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Общее расстояние</span>
                <span className="font-medium text-text-primary">
                  {filteredRoutes.reduce((sum, route) => sum + route.totalDistance, 0).toFixed(1)} км
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Общее время</span>
                <span className="font-medium text-text-primary">
                  {formatTime(filteredRoutes.reduce((sum, route) => sum + route.estimatedTime, 0))}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Расходы на топливо</span>
                <span className="font-medium text-text-primary">
                  {filteredRoutes.reduce((sum, route) => sum + route.fuelCost, 0).toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>
          </div>

          {/* Route Optimization Suggestions */}
          <div className="bg-surface rounded-lg border border-border p-6">
            <h4 className="font-medium text-text-primary mb-4">Рекомендации по оптимизации</h4>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-success-50 rounded-lg">
                <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-success">Экономия топлива</p>
                  <p className="text-sm text-text-secondary">
                    Оптимизация маршрутов может сэкономить до 15% топлива
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-primary-50 rounded-lg">
                <Icon name="Clock" size={16} className="text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-primary">Сокращение времени</p>
                  <p className="text-sm text-text-secondary">
                    Возможно сокращение времени в пути на 25 минут
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-warning-50 rounded-lg">
                <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-warning">Перераспределение нагрузки</p>
                  <p className="text-sm text-text-secondary">
                    Рекомендуется перераспределить 2 заявки между техниками
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Route Details Table */}
      <div className="bg-surface rounded-lg border border-border">
        <div className="p-6 border-b border-border">
          <h4 className="font-medium text-text-primary">Детали маршрутов</h4>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-6 font-medium text-text-secondary">Техник</th>
                <th className="text-left py-3 px-6 font-medium text-text-secondary">Заявки</th>
                <th className="text-left py-3 px-6 font-medium text-text-secondary">Расстояние</th>
                <th className="text-left py-3 px-6 font-medium text-text-secondary">Время</th>
                <th className="text-left py-3 px-6 font-medium text-text-secondary">Топливо</th>
                <th className="text-left py-3 px-6 font-medium text-text-secondary">Статус</th>
                <th className="text-left py-3 px-6 font-medium text-text-secondary">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoutes.map((route) => {
                const technician = getTechnicianById(route.technicianId);
                return (
                  <tr
                    key={route.id}
                    className={`border-b border-border hover:bg-secondary-50 cursor-pointer transition-colors duration-200 ${
                      selectedRoute?.id === route.id ? 'bg-primary-50' : ''
                    }`}
                    onClick={() => setSelectedRoute(route)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <Icon name="User" size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{route.technicianName}</p>
                          <p className="text-sm text-text-secondary">
                            {technician?.status === 'available' ? 'Доступен' : 'Занят'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-text-primary">{route.requests.length} заявок</p>
                        <div className="text-sm text-text-secondary">
                          {route.requests.map((reqId, index) => (
                            <span key={reqId}>
                              {reqId}
                              {index < route.requests.length - 1 && ', '}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium text-text-primary">{route.totalDistance} км</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium text-text-primary">{formatTime(route.estimatedTime)}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium text-text-primary">
                        {route.fuelCost.toLocaleString('ru-RU')} ₽
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary">
                        Запланирован
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Edit route:', route.id);
                          }}
                          className="p-1 rounded hover:bg-secondary-200 transition-colors duration-200"
                          title="Редактировать маршрут"
                        >
                          <Icon name="Edit" size={14} className="text-text-secondary" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Navigate route:', route.id);
                          }}
                          className="p-1 rounded hover:bg-secondary-200 transition-colors duration-200"
                          title="Начать навигацию"
                        >
                          <Icon name="Navigation" size={14} className="text-text-secondary" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Share route:', route.id);
                          }}
                          className="p-1 rounded hover:bg-secondary-200 transition-colors duration-200"
                          title="Поделиться маршрутом"
                        >
                          <Icon name="Share" size={14} className="text-text-secondary" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Route Details */}
      {selectedRoute && (
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-text-primary">
              Детали маршрута - {selectedRoute.technicianName}
            </h4>
            <button
              onClick={() => setSelectedRoute(null)}
              className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
            >
              <Icon name="X" size={16} className="text-text-secondary" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-text-primary mb-3">Точки маршрута</h5>
              <div className="space-y-3">
                {selectedRoute.waypoints.map((waypoint, index) => {
                  const request = getRequestById(selectedRoute.requests[index]);
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {waypoint.order}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-text-primary">{waypoint.location}</p>
                        {request && (
                          <p className="text-sm text-text-secondary">
                            {request.issueType} - {request.priority === 'critical' ? 'Критический' : 
                             request.priority === 'high' ? 'Высокий' : 
                             request.priority === 'medium' ? 'Средний' : 'Низкий'}
                          </p>
                        )}
                      </div>
                      <div className="text-sm text-text-muted">
                        {waypoint.lat.toFixed(4)}, {waypoint.lng.toFixed(4)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h5 className="font-medium text-text-primary mb-3">Статистика маршрута</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <span className="text-text-secondary">Общее расстояние</span>
                  <span className="font-medium text-text-primary">{selectedRoute.totalDistance} км</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <span className="text-text-secondary">Время в пути</span>
                  <span className="font-medium text-text-primary">{formatTime(selectedRoute.estimatedTime)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <span className="text-text-secondary">Расход топлива</span>
                  <span className="font-medium text-text-primary">{selectedRoute.fuelCost.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <span className="text-text-secondary">Количество заявок</span>
                  <span className="font-medium text-text-primary">{selectedRoute.requests.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceRouteMap;