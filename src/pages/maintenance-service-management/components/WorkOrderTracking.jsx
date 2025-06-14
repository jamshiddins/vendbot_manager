import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const WorkOrderTracking = ({ requests, technicians }) => {
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock work order updates
  const workOrderUpdates = [
    {
      id: 1,
      requestId: 'SR-001',
      technicianId: 1,
      timestamp: '2024-01-15T10:30:00',
      status: 'started',
      message: 'Прибыл на место, начинаю диагностику монетоприемника',
      location: { lat: 55.7558, lng: 37.6176 },
      photos: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'],
      estimatedCompletion: '2024-01-15T14:00:00'
    },
    {
      id: 2,
      requestId: 'SR-001',
      technicianId: 1,
      timestamp: '2024-01-15T11:15:00',
      status: 'in_progress',
      message: 'Обнаружена неисправность в механизме приема монет. Требуется замена датчика.',
      location: { lat: 55.7558, lng: 37.6176 },
      photos: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop'],
      partsUsed: [
        { name: 'Датчик монетоприемника', quantity: 1, partNumber: 'SENS-001' }
      ]
    },
    {
      id: 3,
      requestId: 'SR-002',
      technicianId: 2,
      timestamp: '2024-01-15T09:45:00',
      status: 'started',
      message: 'Начинаю проверку системы охлаждения',
      location: { lat: 55.7522, lng: 37.6156 },
      photos: []
    },
    {
      id: 4,
      requestId: 'SR-002',
      technicianId: 2,
      timestamp: '2024-01-15T10:30:00',
      status: 'in_progress',
      message: 'Очистил конденсатор, проверяю уровень хладагента',
      location: { lat: 55.7522, lng: 37.6156 },
      photos: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop']
    },
    {
      id: 5,
      requestId: 'SR-003',
      technicianId: 3,
      timestamp: '2024-01-15T08:00:00',
      status: 'scheduled',
      message: 'Плановое обслуживание запланировано на 10:00',
      location: { lat: 55.7489, lng: 37.6201 },
      photos: []
    }
  ];

  // Mock real-time technician locations
  const technicianLocations = [
    {
      technicianId: 1,
      name: 'Иван Петров',
      currentLocation: { lat: 55.7558, lng: 37.6176 },
      lastUpdate: '2024-01-15T11:15:00',
      status: 'working',
      currentTask: 'SR-001'
    },
    {
      technicianId: 2,
      name: 'Мария Сидорова',
      currentLocation: { lat: 55.7522, lng: 37.6156 },
      lastUpdate: '2024-01-15T10:30:00',
      status: 'working',
      currentTask: 'SR-002'
    },
    {
      technicianId: 3,
      name: 'Алексей Козлов',
      currentLocation: { lat: 55.7489, lng: 37.6201 },
      lastUpdate: '2024-01-15T08:00:00',
      status: 'traveling',
      currentTask: 'SR-003'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-secondary-100 text-text-secondary';
      case 'started': return 'bg-primary-100 text-primary';
      case 'in_progress': return 'bg-accent-100 text-accent';
      case 'completed': return 'bg-success-100 text-success';
      case 'on_hold': return 'bg-warning-100 text-warning';
      default: return 'bg-secondary-100 text-text-secondary';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'scheduled': return 'Запланировано';
      case 'started': return 'Начато';
      case 'in_progress': return 'В процессе';
      case 'completed': return 'Завершено';
      case 'on_hold': return 'Приостановлено';
      default: return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled': return 'Calendar';
      case 'started': return 'Play';
      case 'in_progress': return 'Settings';
      case 'completed': return 'CheckCircle';
      case 'on_hold': return 'Pause';
      default: return 'Clock';
    }
  };

  const getTechnicianStatusColor = (status) => {
    switch (status) {
      case 'working': return 'text-success';
      case 'traveling': return 'text-primary';
      case 'break': return 'text-warning';
      case 'offline': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getTechnicianStatusLabel = (status) => {
    switch (status) {
      case 'working': return 'Работает';
      case 'traveling': return 'В пути';
      case 'break': return 'Перерыв';
      case 'offline': return 'Не в сети';
      default: return status;
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWorkOrdersByRequest = (requestId) => {
    return workOrderUpdates.filter(update => update.requestId === requestId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  const filteredRequests = requests.filter(request => {
    if (filterStatus === 'all') return true;
    return request.status === filterStatus;
  });

  const activeWorkOrders = workOrderUpdates.filter(update => 
    ['started', 'in_progress'].includes(update.status)
  );

  return (
    <div className="space-y-6">
      {/* Real-time Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Активные работы</p>
              <p className="text-2xl font-bold text-text-primary">{activeWorkOrders.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="Settings" size={24} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Техники в работе</p>
              <p className="text-2xl font-bold text-text-primary">
                {technicianLocations.filter(t => t.status === 'working').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={24} className="text-success" />
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Завершено сегодня</p>
              <p className="text-2xl font-bold text-text-primary">
                {workOrderUpdates.filter(w => w.status === 'completed').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={24} className="text-accent" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Work Orders List */}
        <div className="lg:col-span-2 bg-surface rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Отслеживание работ
              </h3>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">Все статусы</option>
                <option value="pending">Ожидает</option>
                <option value="assigned">Назначена</option>
                <option value="in_progress">В работе</option>
                <option value="completed">Завершена</option>
              </select>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {filteredRequests.map((request) => {
              const workOrders = getWorkOrdersByRequest(request.id);
              const latestUpdate = workOrders[0];
              const technician = technicians.find(t => t.name === request.assignedTechnician);

              return (
                <div
                  key={request.id}
                  className={`p-6 border-b border-border cursor-pointer hover:bg-secondary-50 transition-colors duration-200 ${
                    selectedWorkOrder?.id === request.id ? 'bg-primary-50' : ''
                  }`}
                  onClick={() => setSelectedWorkOrder(request)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-text-primary">{request.id}</h4>
                      <p className="text-sm text-text-secondary">{request.location}</p>
                      <p className="text-sm text-text-primary mt-1">{request.issueType}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {getStatusLabel(request.status)}
                      </span>
                      <p className="text-xs text-text-muted mt-1">
                        {formatDateTime(request.estimatedCompletion)}
                      </p>
                    </div>
                  </div>

                  {request.assignedTechnician && (
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="User" size={14} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{request.assignedTechnician}</p>
                        <p className="text-xs text-text-secondary">
                          {technician ? getTechnicianStatusLabel(technician.status) : 'Статус неизвестен'}
                        </p>
                      </div>
                    </div>
                  )}

                  {latestUpdate && (
                    <div className="bg-secondary-50 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <Icon 
                          name={getStatusIcon(latestUpdate.status)} 
                          size={16} 
                          className="text-primary mt-0.5" 
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-text-primary">
                            Последнее обновление
                          </p>
                          <p className="text-sm text-text-secondary mt-1">
                            {latestUpdate.message}
                          </p>
                          <p className="text-xs text-text-muted mt-1">
                            {formatDateTime(latestUpdate.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <span>Обновлений: {workOrders.length}</span>
                      {latestUpdate?.photos && latestUpdate.photos.length > 0 && (
                        <span className="flex items-center space-x-1">
                          <Icon name="Camera" size={14} />
                          <span>{latestUpdate.photos.length}</span>
                        </span>
                      )}
                    </div>
                    <button className="text-primary hover:text-primary-700 text-sm font-medium">
                      Подробности
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technician Tracking */}
        <div className="space-y-6">
          {/* Live Technician Locations */}
          <div className="bg-surface rounded-lg border border-border">
            <div className="p-6 border-b border-border">
              <h4 className="font-medium text-text-primary">Местоположение техников</h4>
            </div>
            
            <div className="p-4 space-y-4">
              {technicianLocations.map((location) => (
                <div key={location.technicianId} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-text-primary">{location.name}</p>
                    <p className={`text-sm ${getTechnicianStatusColor(location.status)}`}>
                      {getTechnicianStatusLabel(location.status)}
                    </p>
                    {location.currentTask && (
                      <p className="text-xs text-text-secondary">
                        Задача: {location.currentTask}
                      </p>
                    )}
                    <p className="text-xs text-text-muted">
                      Обновлено: {formatDateTime(location.lastUpdate)}
                    </p>
                  </div>
                  <div className="text-right">
                    <button className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200">
                      <Icon name="MapPin" size={16} className="text-text-secondary" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Updates */}
          <div className="bg-surface rounded-lg border border-border">
            <div className="p-6 border-b border-border">
              <h4 className="font-medium text-text-primary">Последние обновления</h4>
            </div>
            
            <div className="max-h-64 overflow-y-auto">
              {workOrderUpdates
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .slice(0, 10)
                .map((update) => {
                  const technician = technicians.find(t => t.id === update.technicianId);
                  return (
                    <div key={update.id} className="p-4 border-b border-border">
                      <div className="flex items-start space-x-3">
                        <Icon 
                          name={getStatusIcon(update.status)} 
                          size={16} 
                          className="text-primary mt-1" 
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-text-primary">
                              {update.requestId}
                            </span>
                            <span className="text-xs text-text-secondary">
                              {technician?.name}
                            </span>
                          </div>
                          <p className="text-sm text-text-secondary">
                            {update.message}
                          </p>
                          <p className="text-xs text-text-muted mt-1">
                            {formatDateTime(update.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Work Order Details */}
      {selectedWorkOrder && (
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-heading font-semibold text-text-primary">
              Детали работы - {selectedWorkOrder.id}
            </h4>
            <button
              onClick={() => setSelectedWorkOrder(null)}
              className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
            >
              <Icon name="X" size={16} className="text-text-secondary" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Work Order Timeline */}
            <div>
              <h5 className="font-medium text-text-primary mb-4">История работ</h5>
              <div className="space-y-4">
                {getWorkOrdersByRequest(selectedWorkOrder.id).map((update, index) => (
                  <div key={update.id} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(update.status)}`}>
                        <Icon name={getStatusIcon(update.status)} size={14} />
                      </div>
                      {index < getWorkOrdersByRequest(selectedWorkOrder.id).length - 1 && (
                        <div className="w-0.5 h-8 bg-border mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`text-sm font-medium ${getStatusColor(update.status).replace('bg-', 'text-').replace('-100', '')}`}>
                          {getStatusLabel(update.status)}
                        </span>
                        <span className="text-xs text-text-muted">
                          {formatDateTime(update.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mb-2">
                        {update.message}
                      </p>
                      
                      {update.partsUsed && update.partsUsed.length > 0 && (
                        <div className="bg-secondary-50 rounded-lg p-3 mb-2">
                          <p className="text-sm font-medium text-text-primary mb-2">
                            Использованные запчасти:
                          </p>
                          {update.partsUsed.map((part, partIndex) => (
                            <div key={partIndex} className="text-sm text-text-secondary">
                              • {part.name} ({part.partNumber}) - {part.quantity} шт.
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {update.photos && update.photos.length > 0 && (
                        <div className="flex space-x-2">
                          {update.photos.map((photo, photoIndex) => (
                            <Image
                              key={photoIndex}
                              src={photo}
                              alt={`Work photo ${photoIndex + 1}`}
                              className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity duration-200"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Order Info */}
            <div>
              <h5 className="font-medium text-text-primary mb-4">Информация о заявке</h5>
              <div className="space-y-4">
                <div className="bg-secondary-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-text-secondary">Машина</p>
                      <p className="font-medium text-text-primary">{selectedWorkOrder.machineId}</p>
                    </div>
                    <div>
                      <p className="text-text-secondary">Приоритет</p>
                      <p className="font-medium text-text-primary">
                        {selectedWorkOrder.priority === 'critical' ? 'Критический' :
                         selectedWorkOrder.priority === 'high' ? 'Высокий' :
                         selectedWorkOrder.priority === 'medium' ? 'Средний' : 'Низкий'}
                      </p>
                    </div>
                    <div>
                      <p className="text-text-secondary">Создана</p>
                      <p className="font-medium text-text-primary">
                        {formatDateTime(selectedWorkOrder.createdAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-text-secondary">Плановое завершение</p>
                      <p className="font-medium text-text-primary">
                        {formatDateTime(selectedWorkOrder.estimatedCompletion)}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-text-secondary mb-2">Описание проблемы</p>
                  <p className="text-sm text-text-primary bg-secondary-50 rounded-lg p-3">
                    {selectedWorkOrder.description}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-text-secondary mb-2">Местоположение</p>
                  <div className="bg-secondary-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="MapPin" size={16} className="text-text-secondary" />
                      <span className="text-sm text-text-primary">{selectedWorkOrder.location}</span>
                    </div>
                    {selectedWorkOrder.coordinates && (
                      <p className="text-xs text-text-muted mt-1">
                        {selectedWorkOrder.coordinates.lat.toFixed(4)}, {selectedWorkOrder.coordinates.lng.toFixed(4)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkOrderTracking;