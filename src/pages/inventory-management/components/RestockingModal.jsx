import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const RestockingModal = ({ products, onClose, onCreateRoute }) => {
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [routeType, setRouteType] = useState('optimal');
  const [priority, setPriority] = useState('normal');
  const [scheduledDate, setScheduledDate] = useState('');
  const [notes, setNotes] = useState('');

  // Mock machine data with locations
  const machines = [
    {
      id: 'VM-001',
      name: 'ТЦ Мега - 1 этаж',
      address: 'ул. Ленина, 123, ТЦ Мега',
      status: 'critical',
      lowStockItems: 3,
      coordinates: { lat: 55.7558, lng: 37.6176 },
      lastService: '2024-01-10'
    },
    {
      id: 'VM-003',
      name: 'Офисный центр Сити',
      address: 'пр. Мира, 45, БЦ Сити',
      status: 'warning',
      lowStockItems: 2,
      coordinates: { lat: 55.7558, lng: 37.6176 },
      lastService: '2024-01-12'
    },
    {
      id: 'VM-005',
      name: 'Торговый центр Европа',
      address: 'ул. Гагарина, 78, ТЦ Европа',
      status: 'warning',
      lowStockItems: 1,
      coordinates: { lat: 55.7558, lng: 37.6176 },
      lastService: '2024-01-14'
    },
    {
      id: 'VM-007',
      name: 'Бизнес-центр Альфа',
      address: 'ул. Советская, 12, БЦ Альфа',
      status: 'normal',
      lowStockItems: 0,
      coordinates: { lat: 55.7558, lng: 37.6176 },
      lastService: '2024-01-15'
    }
  ];

  const handleMachineToggle = (machineId) => {
    setSelectedMachines(prev =>
      prev.includes(machineId)
        ? prev.filter(id => id !== machineId)
        : [...prev, machineId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMachines.length === machines.length) {
      setSelectedMachines([]);
    } else {
      setSelectedMachines(machines.map(m => m.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const routeData = {
      machines: selectedMachines,
      type: routeType,
      priority,
      scheduledDate,
      notes,
      estimatedDuration: calculateEstimatedDuration(),
      totalDistance: calculateTotalDistance()
    };

    onCreateRoute(routeData);
  };

  const calculateEstimatedDuration = () => {
    // Mock calculation: 30 minutes per machine + travel time
    const baseTime = selectedMachines.length * 30;
    const travelTime = selectedMachines.length * 15; // 15 minutes travel between machines
    return baseTime + travelTime;
  };

  const calculateTotalDistance = () => {
    // Mock calculation: average 5km between machines
    return selectedMachines.length * 5;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'text-error bg-error-50 border-error-200';
      case 'warning': return 'text-warning bg-warning-50 border-warning-200';
      case 'normal': return 'text-success bg-success-50 border-success-200';
      default: return 'text-text-secondary bg-secondary-50 border-border';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'critical': return 'Критический';
      case 'warning': return 'Требует внимания';
      case 'normal': return 'Нормальный';
      default: return 'Неизвестно';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error text-white';
      case 'normal': return 'bg-primary text-white';
      case 'low': return 'bg-secondary text-white';
      default: return 'bg-secondary text-white';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-300 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Создание маршрута пополнения
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Оптимизированный маршрут для обслуживания торговых автоматов
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Route Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Тип маршрута:
                </label>
                <select
                  value={routeType}
                  onChange={(e) => setRouteType(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="optimal">Оптимальный (по расстоянию)</option>
                  <option value="priority">По приоритету (критические первые)</option>
                  <option value="geographic">Географический (по районам)</option>
                  <option value="custom">Пользовательский</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Приоритет:
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="high">Высокий</option>
                  <option value="normal">Обычный</option>
                  <option value="low">Низкий</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Дата обслуживания:
                </label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Примечания:
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows="3"
                  placeholder="Дополнительные инструкции для техника..."
                />
              </div>
            </div>

            {/* Machine Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  Выбор торговых автоматов
                </h3>
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-sm text-primary hover:text-primary-700 font-medium"
                >
                  {selectedMachines.length === machines.length ? 'Снять выделение' : 'Выбрать все'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {machines.map((machine) => (
                  <div
                    key={machine.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedMachines.includes(machine.id)
                        ? 'border-primary bg-primary-50' :'border-border hover:border-primary-300 hover:bg-secondary-50'
                    }`}
                    onClick={() => handleMachineToggle(machine.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedMachines.includes(machine.id)}
                        onChange={() => handleMachineToggle(machine.id)}
                        className="mt-1 text-primary focus:ring-primary"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-text-primary">
                            {machine.id}
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(machine.status)}`}>
                            {getStatusLabel(machine.status)}
                          </span>
                        </div>
                        <p className="text-sm text-text-primary mb-1">
                          {machine.name}
                        </p>
                        <p className="text-xs text-text-secondary mb-2">
                          📍 {machine.address}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-text-secondary">
                            Товаров с низким запасом: {machine.lowStockItems}
                          </span>
                          <span className="text-text-secondary">
                            Последнее обслуживание: {new Date(machine.lastService).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Route Summary */}
            {selectedMachines.length > 0 && (
              <div className="bg-secondary-50 p-4 rounded-lg">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                  Сводка маршрута
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {selectedMachines.length}
                    </div>
                    <div className="text-sm text-text-secondary">
                      Автоматов
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">
                      {Math.round(calculateEstimatedDuration() / 60)}ч {calculateEstimatedDuration() % 60}м
                    </div>
                    <div className="text-sm text-text-secondary">
                      Время
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">
                      {calculateTotalDistance()}км
                    </div>
                    <div className="text-sm text-text-secondary">
                      Расстояние
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(priority)}`}>
                      {priority === 'high' ? 'Высокий' : priority === 'normal' ? 'Обычный' : 'Низкий'}
                    </div>
                    <div className="text-sm text-text-secondary mt-1">
                      Приоритет
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between p-6 border-t border-border bg-secondary-50">
            <div className="text-sm text-text-secondary">
              {selectedMachines.length === 0 
                ? 'Выберите хотя бы один торговый автомат'
                : `Выбрано автоматов: ${selectedMachines.length}`
              }
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={selectedMachines.length === 0 || !scheduledDate}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
              >
                <Icon name="Route" size={16} />
                <span>Создать маршрут</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestockingModal;