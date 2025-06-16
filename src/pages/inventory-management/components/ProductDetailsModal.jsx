// src/pages/inventory-management/components/ProductDetailsModal.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ProductDetailsModal = ({ product, onClose, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    reorderPoint: product.reorderPoint,
    supplier: product.supplier
  });

  // Mock machine details for this product
  const machineDetails = [
    {
      id: 'VM-001',
      name: 'ТЦ Мега - 1 этаж',
      currentStock: 45,
      capacity: 60,
      lastRestocked: '2024-01-15',
      salesLast7Days: 23,
      status: 'normal'
    },
    {
      id: 'VM-003',
      name: 'Офисный центр Сити',
      currentStock: 12,
      capacity: 60,
      lastRestocked: '2024-01-12',
      salesLast7Days: 31,
      status: 'low'
    },
    {
      id: 'VM-007',
      name: 'Бизнес-центр Альфа',
      currentStock: 38,
      capacity: 60,
      lastRestocked: '2024-01-14',
      salesLast7Days: 18,
      status: 'normal'
    }
  ];

  // Mock sales history
  const salesHistory = [
    { date: '2024-01-16', quantity: 8, revenue: 719.20 },
    { date: '2024-01-15', quantity: 12, revenue: 1078.80 },
    { date: '2024-01-14', quantity: 15, revenue: 1348.50 },
    { date: '2024-01-13', quantity: 9, revenue: 809.10 },
    { date: '2024-01-12', quantity: 11, revenue: 988.90 },
    { date: '2024-01-11', quantity: 7, revenue: 629.30 },
    { date: '2024-01-10', quantity: 13, revenue: 1168.70 }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onUpdate({
      ...product,
      ...formData
    });
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

  const getStockPercentage = (current, capacity) => {
    return Math.round((current / capacity) * 100);
  };

  const getStockStatus = (current, capacity) => {
    const percentage = (current / capacity) * 100;
    if (percentage <= 20) return 'critical';
    if (percentage <= 40) return 'low';
    return 'normal';
  };

  const getStockColor = (status) => {
    switch (status) {
      case 'critical': return 'bg-error';
      case 'low': return 'bg-warning';
      case 'normal': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  const handleReplenish = (machineId, machineName) => {
    console.log(`Replenishing ${product.name} in machine ${machineId}`);
    alert(`Добавление запасов ${product.name} в машину ${machineName}`);
  };

  const handleViewStats = (machineId, machineName) => {
    console.log(`Viewing stats for ${product.name} in machine ${machineId}`);
    alert(`Просмотр статистики продаж ${product.name} в машине ${machineName}`);
  };

  const totalSales7Days = salesHistory.reduce((sum, day) => sum + day.quantity, 0);
  const totalRevenue7Days = salesHistory.reduce((sum, day) => sum + day.revenue, 0);
  const averageDailySales = Math.round(totalSales7Days / 7);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-300 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary-100">
              <Image
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-text-primary">
                {product.name}
              </h2>
              <p className="text-sm text-text-secondary">
                SKU: {product.sku} • Категория: {product.category}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 ${
                editMode 
                  ? 'bg-secondary-100 text-text-primary hover:bg-secondary-200' :'bg-primary text-white hover:bg-primary-700'
              }`}
            >
              <Icon name={editMode ? "X" : "Edit"} size={16} />
              <span>{editMode ? 'Отмена' : 'Редактировать'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
            >
              <Icon name="X" size={20} className="text-text-secondary" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Product Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Basic Information */}
              <div className="bg-secondary-50 p-4 rounded-lg">
                <h3 className="font-heading font-semibold text-text-primary mb-4">
                  Основная информация
                </h3>
                <div className="space-y-3">
                  {editMode ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">
                          Название:
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">
                          Цена:
                        </label>
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">
                          Точка перезаказа:
                        </label>
                        <input
                          type="number"
                          value={formData.reorderPoint}
                          onChange={(e) => handleInputChange('reorderPoint', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">
                          Поставщик:
                        </label>
                        <input
                          type="text"
                          value={formData.supplier}
                          onChange={(e) => handleInputChange('supplier', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <button
                        onClick={handleSave}
                        className="w-full px-4 py-2 bg-success text-white rounded-lg hover:bg-success-600 transition-colors duration-200"
                      >
                        Сохранить изменения
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Цена:</span>
                        <span className="font-medium text-text-primary">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Поставщик:</span>
                        <span className="font-medium text-text-primary">
                          {product.supplier}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Точка перезаказа:</span>
                        <span className="font-medium text-text-primary">
                          {product.reorderPoint} шт.
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Последнее пополнение:</span>
                        <span className="font-medium text-text-primary">
                          {formatDate(product.lastRestocked)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Stock Summary */}
              <div className="bg-secondary-50 p-4 rounded-lg">
                <h3 className="font-heading font-semibold text-text-primary mb-4">
                  Сводка по запасам
                </h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      {product.currentStock}
                    </div>
                    <div className="text-sm text-text-secondary">
                      Общий запас
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-text-primary">
                        {product.totalCapacity}
                      </div>
                      <div className="text-xs text-text-secondary">
                        Общая ёмкость
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-text-primary">
                        {product.machines.length}
                      </div>
                      <div className="text-xs text-text-secondary">
                        Автоматов
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sales Analytics */}
              <div className="bg-secondary-50 p-4 rounded-lg">
                <h3 className="font-heading font-semibold text-text-primary mb-4">
                  Аналитика продаж (7 дней)
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Продано:</span>
                    <span className="font-medium text-text-primary">
                      {totalSales7Days} шт.
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Выручка:</span>
                    <span className="font-medium text-text-primary">
                      {formatPrice(totalRevenue7Days)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Среднее в день:</span>
                    <span className="font-medium text-text-primary">
                      {averageDailySales} шт.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Machine Details & Sales History */}
            <div className="lg:col-span-2 space-y-6">
              {/* Machine Details */}
              <div>
                <h3 className="font-heading font-semibold text-text-primary mb-4">
                  Распределение по автоматам
                </h3>
                <div className="bg-surface border border-border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-secondary-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                            Автомат
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                            Запас
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                            Продажи (7 дней)
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                            Последнее пополнение
                          </th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-text-secondary">
                            Действия
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {machineDetails.map((machine) => {
                          const percentage = getStockPercentage(machine.currentStock, machine.capacity);
                          const status = getStockStatus(machine.currentStock, machine.capacity);
                          
                          return (
                            <tr key={machine.id} className="hover:bg-secondary-50">
                              <td className="px-4 py-4">
                                <div>
                                  <p className="font-medium text-text-primary">
                                    {machine.id}
                                  </p>
                                  <p className="text-sm text-text-secondary">
                                    {machine.name}
                                  </p>
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-text-primary font-medium">
                                      {machine.currentStock} / {machine.capacity}
                                    </span>
                                    <span className="text-text-secondary">
                                      {percentage}%
                                    </span>
                                  </div>
                                  <div className="w-full bg-secondary-200 rounded-full h-2">
                                    <div
                                      className={`h-2 rounded-full transition-all duration-300 ${getStockColor(status)}`}
                                      style={{ width: `${Math.min(percentage, 100)}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <span className="text-sm font-medium text-text-primary">
                                  {machine.salesLast7Days} шт.
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="text-sm text-text-secondary">
                                  {formatDate(machine.lastRestocked)}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <div className="flex items-center justify-center space-x-2">
                                  <button 
                                    className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
                                    onClick={() => handleReplenish(machine.id, machine.name)}
                                  >
                                    <Icon name="Plus" size={16} className="text-primary" />
                                  </button>
                                  <button 
                                    className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
                                    onClick={() => handleViewStats(machine.id, machine.name)}
                                  >
                                    <Icon name="BarChart3" size={16} className="text-text-secondary" />
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
              </div>

              {/* Sales History */}
              <div>
                <h3 className="font-heading font-semibold text-text-primary mb-4">
                  История продаж
                </h3>
                <div className="bg-surface border border-border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-secondary-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                            Дата
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                            Количество
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                            Выручка
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                            Средняя цена
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {salesHistory.map((day, index) => (
                          <tr key={index} className="hover:bg-secondary-50">
                            <td className="px-4 py-3">
                              <span className="text-sm font-medium text-text-primary">
                                {formatDate(day.date)}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-sm text-text-primary">
                                {day.quantity} шт.
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-sm font-medium text-success">
                                {formatPrice(day.revenue)}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-sm text-text-secondary">
                                {formatPrice(day.revenue / day.quantity)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;