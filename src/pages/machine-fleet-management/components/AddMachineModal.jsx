// src/pages/machine-fleet-management/components/AddMachineModal.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AddMachineModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    location: '',
    address: '',
    machineType: '',
    coordinates: { lat: '', lng: '' },
    temperature: '',
    status: 'offline'
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'lat' || name === 'lng') {
      setFormData(prev => ({
        ...prev,
        coordinates: {
          ...prev.coordinates,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.id.trim()) newErrors.id = 'ID машины обязателен';
    if (!formData.name.trim()) newErrors.name = 'Название обязательно';
    if (!formData.location.trim()) newErrors.location = 'Местоположение обязательно';
    if (!formData.address.trim()) newErrors.address = 'Адрес обязателен';
    if (!formData.machineType) newErrors.machineType = 'Тип машины обязателен';
    if (!formData.coordinates.lat) newErrors.lat = 'Широта обязательна';
    if (!formData.coordinates.lng) newErrors.lng = 'Долгота обязательна';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newMachine = {
        ...formData,
        lastCommunication: new Date(),
        inventoryLevel: 0,
        dailySales: 0,
        cashLevel: 0,
        recentTransactions: [],
        inventory: [],
        maintenanceHistory: []
      };
      onSave(newMachine);
      onClose();
      // Reset form
      setFormData({
        id: '',
        name: '',
        location: '',
        address: '',
        machineType: '',
        coordinates: { lat: '', lng: '' },
        temperature: '',
        status: 'offline'
      });
      setErrors({});
    }
  };

  const handleClose = () => {
    setFormData({
      id: '',
      name: '',
      location: '',
      address: '',
      machineType: '',
      coordinates: { lat: '', lng: '' },
      temperature: '',
      status: 'offline'
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Добавить новую машину
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-secondary-100 rounded-lg transition-colors duration-200"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Machine ID */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                ID машины *
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                placeholder="VM-XXX"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.id ? 'border-error' : 'border-border'
                }`}
              />
              {errors.id && (
                <p className="mt-1 text-sm text-error">{errors.id}</p>
              )}
            </div>

            {/* Machine Name */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Название машины *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Автомат Центр #1"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.name ? 'border-error' : 'border-border'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-error">{errors.name}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Местоположение *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="ТЦ Центр, 1 этаж"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.location ? 'border-error' : 'border-border'
                }`}
              />
              {errors.location && (
                <p className="mt-1 text-sm text-error">{errors.location}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Адрес *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="ул. Примерная, 123, Москва"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.address ? 'border-error' : 'border-border'
                }`}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-error">{errors.address}</p>
              )}
            </div>

            {/* Machine Type */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Тип машины *
              </label>
              <select
                name="machineType"
                value={formData.machineType}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.machineType ? 'border-error' : 'border-border'
                }`}
              >
                <option value="">Выберите тип</option>
                <option value="Напитки">Напитки</option>
                <option value="Снеки">Снеки</option>
                <option value="Комбо">Комбо</option>
                <option value="Кофе">Кофе</option>
              </select>
              {errors.machineType && (
                <p className="mt-1 text-sm text-error">{errors.machineType}</p>
              )}
            </div>

            {/* Temperature */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Температура (°C)
              </label>
              <input
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleInputChange}
                placeholder="4.0"
                step="0.1"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Coordinates */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Широта *
              </label>
              <input
                type="number"
                name="lat"
                value={formData.coordinates.lat}
                onChange={handleInputChange}
                placeholder="55.7558"
                step="any"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.lat ? 'border-error' : 'border-border'
                }`}
              />
              {errors.lat && (
                <p className="mt-1 text-sm text-error">{errors.lat}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Долгота *
              </label>
              <input
                type="number"
                name="lng"
                value={formData.coordinates.lng}
                onChange={handleInputChange}
                placeholder="37.6176"
                step="any"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.lng ? 'border-error' : 'border-border'
                }`}
              />
              {errors.lng && (
                <p className="mt-1 text-sm text-error">{errors.lng}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-border">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-text-secondary border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-200"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              <Icon name="Plus" size={16} />
              <span>Добавить машину</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMachineModal;