import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AddMachineModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    location: '',
    type: 'snack',
    region: '',
    status: 'offline'
  });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData?.id?.trim()) newErrors.id = 'ID обязателен';
    if (!formData?.name?.trim()) newErrors.name = 'Название обязательно';
    if (!formData?.location?.trim()) newErrors.location = 'Локация обязательна';
    if (!formData?.region?.trim()) newErrors.region = 'Регион обязателен';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new machine with mock data for demo
    const newMachine = {
      ...formData,
      lastActivity: new Date().toISOString(),
      revenue: 0,
      stock: 100
    };
    
    onAdd?.(newMachine);
  };

  return (
    <div className="fixed inset-0 bg-secondary-900 bg-opacity-75 flex items-center justify-center z-400 p-4">
      <div className="bg-surface rounded-lg shadow-lg w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-text-primary">Добавить новую машину</h2>
          <button 
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-secondary-100 transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-5 pt-5">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-secondary-100 text-text-secondary'}`}>
                1
              </div>
              <span className="text-sm mt-2 text-text-secondary">Основная информация</span>
            </div>
            <div className="w-full max-w-[100px] h-1 bg-secondary-100">
              <div className={`h-1 bg-primary transition-all duration-300 ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-secondary-100 text-text-secondary'}`}>
                2
              </div>
              <span className="text-sm mt-2 text-text-secondary">Настройки</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-5">
            {step === 1 ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="id" className="block text-sm font-medium text-text-secondary mb-1">
                    ID машины*
                  </label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    value={formData?.id || ''}
                    onChange={handleChange}
                    placeholder="VM-XXX"
                    className={`w-full p-2 border ${errors?.id ? 'border-error' : 'border-border'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                  />
                  {errors?.id && <p className="mt-1 text-sm text-error">{errors?.id}</p>}
                </div>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">
                    Название машины*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData?.name || ''}
                    onChange={handleChange}
                    placeholder="ТЦ Метрополис Автомат 1"
                    className={`w-full p-2 border ${errors?.name ? 'border-error' : 'border-border'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                  />
                  {errors?.name && <p className="mt-1 text-sm text-error">{errors?.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-text-secondary mb-1">
                    Адрес размещения*
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData?.location || ''}
                    onChange={handleChange}
                    placeholder="Москва, Ленинградское ш., 16А"
                    className={`w-full p-2 border ${errors?.location ? 'border-error' : 'border-border'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                  />
                  {errors?.location && <p className="mt-1 text-sm text-error">{errors?.location}</p>}
                </div>
                
                <div>
                  <label htmlFor="region" className="block text-sm font-medium text-text-secondary mb-1">
                    Регион*
                  </label>
                  <input
                    type="text"
                    id="region"
                    name="region"
                    value={formData?.region || ''}
                    onChange={handleChange}
                    placeholder="Москва"
                    className={`w-full p-2 border ${errors?.region ? 'border-error' : 'border-border'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                  />
                  {errors?.region && <p className="mt-1 text-sm text-error">{errors?.region}</p>}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-text-secondary mb-1">
                    Тип машины
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData?.type || 'snack'}
                    onChange={handleChange}
                    className="w-full p-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="snack">Снеки</option>
                    <option value="coffee">Кофе</option>
                    <option value="combo">Комбо</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-text-secondary mb-1">
                    Начальный статус
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData?.status || 'offline'}
                    onChange={handleChange}
                    className="w-full p-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="offline">Не в сети</option>
                    <option value="online">В сети</option>
                    <option value="maintenance">Обслуживание</option>
                  </select>
                </div>
                
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-secondary-300 text-primary focus:ring-primary"
                    />
                    <span className="text-text-secondary">Автоматически добавить в систему мониторинга</span>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-secondary-300 text-primary focus:ring-primary"
                    />
                    <span className="text-text-secondary">Включить оповещения о состоянии</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border p-5 flex justify-between">
            {step === 1 ? (
              <button 
                type="button" 
                onClick={onClose}
                className="px-4 py-2 bg-surface border border-border text-text-primary rounded-lg hover:bg-secondary-50 transition-colors duration-200"
              >
                Отмена
              </button>
            ) : (
              <button 
                type="button" 
                onClick={handlePrevStep}
                className="px-4 py-2 bg-surface border border-border text-text-primary rounded-lg hover:bg-secondary-50 transition-colors duration-200"
              >
                Назад
              </button>
            )}
            
            {step === 1 ? (
              <button 
                type="button" 
                onClick={handleNextStep}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                Далее
              </button>
            ) : (
              <button 
                type="submit" 
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                Добавить машину
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMachineModal;