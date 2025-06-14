import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const CreateServiceRequestModal = ({ isOpen, onClose, technicians }) => {
  const [formData, setFormData] = useState({
    machineId: '',
    location: '',
    issueType: '',
    priority: 'medium',
    description: '',
    assignedTechnician: '',
    estimatedCompletion: '',
    photos: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock machine list
  const machines = [
    { id: 'VM-001', location: 'ТЦ Мега, 1 этаж' },
    { id: 'VM-002', location: 'Офисный центр Бизнес' },
    { id: 'VM-003', location: 'Торговый центр Европа' },
    { id: 'VM-004', location: 'Бизнес-центр Альфа' },
    { id: 'VM-005', location: 'ТЦ Атриум' }
  ];

  const issueTypes = [
    'Неисправность монетоприемника',
    'Проблема с охлаждением',
    'Неисправность купюроприемника',
    'Проблема с выдачей товара',
    'Неисправность дисплея',
    'Проблема с подключением к сети',
    'Механическая поломка',
    'Плановое обслуживание',
    'Замена расходных материалов',
    'Другое'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Auto-fill location when machine is selected
    if (name === 'machineId') {
      const selectedMachine = machines.find(m => m.id === value);
      if (selectedMachine) {
        setFormData(prev => ({
          ...prev,
          location: selectedMachine.location
        }));
      }
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const photoUrls = files.map(file => URL.createObjectURL(file));
    
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...photoUrls]
    }));
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.machineId) {
      newErrors.machineId = 'Выберите машину';
    }

    if (!formData.issueType) {
      newErrors.issueType = 'Выберите тип проблемы';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Введите описание проблемы';
    }

    if (!formData.estimatedCompletion) {
      newErrors.estimatedCompletion = 'Укажите планируемое время завершения';
    } else {
      const completionDate = new Date(formData.estimatedCompletion);
      const now = new Date();
      if (completionDate <= now) {
        newErrors.estimatedCompletion = 'Время завершения должно быть в будущем';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Creating service request:', formData);
      
      // Reset form
      setFormData({
        machineId: '',
        location: '',
        issueType: '',
        priority: 'medium',
        description: '',
        assignedTechnician: '',
        estimatedCompletion: '',
        photos: []
      });
      
      onClose();
    } catch (error) {
      console.error('Error creating service request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-primary';
      case 'low': return 'text-secondary-600';
      default: return 'text-text-secondary';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-300 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="Plus" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-text-primary">
                Создать сервисную заявку
              </h2>
              <p className="text-sm text-text-secondary">
                Заполните форму для создания новой заявки на обслуживание
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Machine Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Машина *
                </label>
                <select
                  name="machineId"
                  value={formData.machineId}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.machineId ? 'border-error' : 'border-border'
                  }`}
                >
                  <option value="">Выберите машину</option>
                  {machines.map((machine) => (
                    <option key={machine.id} value={machine.id}>
                      {machine.id} - {machine.location}
                    </option>
                  ))}
                </select>
                {errors.machineId && (
                  <p className="text-sm text-error mt-1">{errors.machineId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Локация
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Автоматически заполняется при выборе машины"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-secondary-50"
                  readOnly
                />
              </div>
            </div>

            {/* Issue Type and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Тип проблемы *
                </label>
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.issueType ? 'border-error' : 'border-border'
                  }`}
                >
                  <option value="">Выберите тип проблемы</option>
                  {issueTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.issueType && (
                  <p className="text-sm text-error mt-1">{errors.issueType}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Приоритет
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="low">Низкий</option>
                  <option value="medium">Средний</option>
                  <option value="high">Высокий</option>
                  <option value="critical">Критический</option>
                </select>
                <div className="flex items-center space-x-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${
                    formData.priority === 'critical' ? 'bg-error' :
                    formData.priority === 'high' ? 'bg-warning' :
                    formData.priority === 'medium' ? 'bg-primary' : 'bg-secondary-400'
                  }`}></div>
                  <span className={`text-sm ${getPriorityColor(formData.priority)}`}>
                    {formData.priority === 'critical' ? 'Критический приоритет' :
                     formData.priority === 'high' ? 'Высокий приоритет' :
                     formData.priority === 'medium' ? 'Средний приоритет' : 'Низкий приоритет'}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Описание проблемы *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Подробно опишите проблему, симптомы и любую дополнительную информацию..."
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
                  errors.description ? 'border-error' : 'border-border'
                }`}
              />
              {errors.description && (
                <p className="text-sm text-error mt-1">{errors.description}</p>
              )}
            </div>

            {/* Technician Assignment and Completion Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Назначить техника
                </label>
                <select
                  name="assignedTechnician"
                  value={formData.assignedTechnician}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Автоматическое назначение</option>
                  {technicians.map((tech) => (
                    <option key={tech.id} value={tech.name}>
                      {tech.name} ({tech.status === 'available' ? 'Доступен' : 'Занят'})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-text-muted mt-1">
                  Оставьте пустым для автоматического назначения ближайшего доступного техника
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Планируемое время завершения *
                </label>
                <input
                  type="datetime-local"
                  name="estimatedCompletion"
                  value={formData.estimatedCompletion}
                  onChange={handleInputChange}
                  min={new Date().toISOString().slice(0, 16)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.estimatedCompletion ? 'border-error' : 'border-border'
                  }`}
                />
                {errors.estimatedCompletion && (
                  <p className="text-sm text-error mt-1">{errors.estimatedCompletion}</p>
                )}
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Фотографии проблемы
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <Icon name="Camera" size={32} className="text-text-muted" />
                  <p className="text-sm text-text-secondary">
                    Нажмите для загрузки фотографий или перетащите их сюда
                  </p>
                  <p className="text-xs text-text-muted">
                    Поддерживаются форматы: JPG, PNG, GIF (макс. 5MB каждая)
                  </p>
                </label>
              </div>

              {/* Photo Preview */}
              {formData.photos.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-text-primary mb-2">
                    Загруженные фотографии ({formData.photos.length})
                  </p>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-16 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border bg-secondary-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-text-secondary">
                * Обязательные поля
              </div>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-border text-text-primary rounded-lg hover:bg-secondary-100 transition-colors duration-200 font-medium"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="Loader2" size={16} className="animate-spin" />
                      <span>Создание...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="Plus" size={16} />
                      <span>Создать заявку</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServiceRequestModal;