import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const TemplateManagementModal = ({ isOpen, onClose, templates }) => {
  const [activeTab, setActiveTab] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    category: 'office',
    settings: {
      operatingHours: { start: '08:00', end: '20:00' },
      temperature: { min: 2, max: 6 },
      paymentMethods: ['card', 'cash'],
      maxTransactionAmount: 1000,
      alerts: {
        lowStock: 20,
        temperature: true,
        maintenance: true
      }
    }
  });

  const categories = [
    { id: 'office', name: 'Офисные здания', icon: 'Building' },
    { id: 'mall', name: 'Торговые центры', icon: 'ShoppingBag' },
    { id: 'transport', name: 'Транспортные узлы', icon: 'Train' },
    { id: 'education', name: 'Учебные заведения', icon: 'GraduationCap' },
    { id: 'healthcare', name: 'Медицинские учреждения', icon: 'Heart' },
    { id: 'custom', name: 'Пользовательские', icon: 'Settings' }
  ];

  const paymentMethods = [
    { id: 'cash', name: 'Наличные' },
    { id: 'card', name: 'Банковские карты' },
    { id: 'contactless', name: 'Бесконтактная оплата' },
    { id: 'mobile', name: 'Мобильные платежи' }
  ];

  const handleTemplateUpdate = (field, value) => {
    setNewTemplate(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSettingsUpdate = (section, field, value) => {
    setNewTemplate(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [section]: {
          ...prev.settings[section],
          [field]: value
        }
      }
    }));
  };

  const handlePaymentMethodToggle = (method) => {
    setNewTemplate(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        paymentMethods: prev.settings.paymentMethods.includes(method)
          ? prev.settings.paymentMethods.filter(m => m !== method)
          : [...prev.settings.paymentMethods, method]
      }
    }));
  };

  const handleCreateTemplate = () => {
    // Here you would typically save the template to your backend
    console.log('Creating template:', newTemplate);
    setIsCreating(false);
    setActiveTab('list');
    setNewTemplate({
      name: '',
      description: '',
      category: 'office',
      settings: {
        operatingHours: { start: '08:00', end: '20:00' },
        temperature: { min: 2, max: 6 },
        paymentMethods: ['card', 'cash'],
        maxTransactionAmount: 1000,
        alerts: {
          lowStock: 20,
          temperature: true,
          maintenance: true
        }
      }
    });
  };

  const handleEditTemplate = (template) => {
    setSelectedTemplate(template);
    setNewTemplate(template);
    setIsCreating(true);
    setActiveTab('create');
  };

  const handleDeleteTemplate = (templateId) => {
    // Here you would typically delete the template from your backend
    console.log('Deleting template:', templateId);
  };

  const filteredTemplates = templates.filter(template =>
    template?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template?.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : 'Settings';
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Неизвестная категория';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-300 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Управление шаблонами
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Создавайте и управляйте шаблонами конфигурации для быстрой настройки машин
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary-100 rounded-lg transition-colors duration-200"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === 'list' ?'border-primary text-primary bg-primary-50' :'border-transparent text-text-secondary hover:text-text-primary hover:bg-secondary-50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Icon name="List" size={16} />
              <span>Список шаблонов</span>
            </div>
          </button>
          <button
            onClick={() => {
              setActiveTab('create');
              setIsCreating(false);
              setSelectedTemplate(null);
            }}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === 'create' ?'border-primary text-primary bg-primary-50' :'border-transparent text-text-secondary hover:text-text-primary hover:bg-secondary-50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Icon name="Plus" size={16} />
              <span>Создать шаблон</span>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'list' ? (
            <div className="p-6">
              {/* Search and Filters */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1">
                  <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Поиск шаблонов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => {
                    setActiveTab('create');
                    setIsCreating(false);
                    setSelectedTemplate(null);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  <Icon name="Plus" size={16} />
                  <span>Новый шаблон</span>
                </button>
              </div>

              {/* Templates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTemplates.map(template => (
                  <div key={template.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Icon name={getCategoryIcon(template.category)} size={16} className="text-primary" />
                        <h3 className="font-medium text-text-primary">{template.name}</h3>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleEditTemplate(template)}
                          className="p-1 text-text-secondary hover:text-primary transition-colors duration-200"
                          title="Редактировать"
                        >
                          <Icon name="Edit" size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="p-1 text-text-secondary hover:text-error transition-colors duration-200"
                          title="Удалить"
                        >
                          <Icon name="Trash2" size={14} />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-text-secondary mb-3">{template.description}</p>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Категория:</span>
                        <span className="text-text-primary">{getCategoryName(template.category)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Часы работы:</span>
                        <span className="text-text-primary">
                          {template?.settings?.operatingHours?.start} - {template?.settings?.operatingHours?.end}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Температура:</span>
                        <span className="text-text-primary">
                          {template?.settings?.temperature?.min}°C - {template?.settings?.temperature?.max}°C
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Использований:</span>
                        <span className="text-text-primary">{template.usageCount}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-secondary">
                          {template.createdAt.toLocaleDateString('ru-RU')}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Icon name="Users" size={12} className="text-text-secondary" />
                          <span className="text-xs text-text-secondary">{template.usageCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredTemplates.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="FileText" size={48} className="text-text-muted mx-auto mb-4" />
                  <p className="text-text-secondary">Шаблоны не найдены</p>
                  <p className="text-sm text-text-muted mt-1">
                    Попробуйте изменить параметры поиска или создайте новый шаблон
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Create/Edit Template */
            <div className="p-6">
              <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                    {selectedTemplate ? 'Редактирование шаблона' : 'Создание нового шаблона'}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Заполните основную информацию и настройки для шаблона конфигурации
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="bg-secondary-50 rounded-lg p-4">
                    <h4 className="font-medium text-text-primary mb-4">Основная информация</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Название шаблона *
                        </label>
                        <input
                          type="text"
                          value={newTemplate.name}
                          onChange={(e) => handleTemplateUpdate('name', e.target.value)}
                          placeholder="Например: Стандартная конфигурация офиса"
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Категория
                        </label>
                        <select
                          value={newTemplate.category}
                          onChange={(e) => handleTemplateUpdate('category', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          {categories.map(category => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Описание
                      </label>
                      <textarea
                        value={newTemplate.description}
                        onChange={(e) => handleTemplateUpdate('description', e.target.value)}
                        placeholder="Краткое описание назначения и особенностей шаблона"
                        rows="3"
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Operating Hours */}
                  <div className="border border-border rounded-lg p-4">
                    <h4 className="font-medium text-text-primary mb-4">Часы работы</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Время открытия
                        </label>
                        <input
                          type="time"
                          value={newTemplate.settings.operatingHours.start}
                          onChange={(e) => handleSettingsUpdate('operatingHours', 'start', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Время закрытия
                        </label>
                        <input
                          type="time"
                          value={newTemplate.settings.operatingHours.end}
                          onChange={(e) => handleSettingsUpdate('operatingHours', 'end', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Temperature Settings */}
                  <div className="border border-border rounded-lg p-4">
                    <h4 className="font-medium text-text-primary mb-4">Температурный режим</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Минимальная температура (°C)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={newTemplate.settings.temperature.min}
                          onChange={(e) => handleSettingsUpdate('temperature', 'min', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Максимальная температура (°C)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={newTemplate.settings.temperature.max}
                          onChange={(e) => handleSettingsUpdate('temperature', 'max', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="border border-border rounded-lg p-4">
                    <h4 className="font-medium text-text-primary mb-4">Способы оплаты</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {paymentMethods.map(method => (
                        <label key={method.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newTemplate.settings.paymentMethods.includes(method.id)}
                            onChange={() => handlePaymentMethodToggle(method.id)}
                            className="mr-3 rounded border-border focus:ring-primary"
                          />
                          <span className="text-sm text-text-primary">{method.name}</span>
                        </label>
                      ))}
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Максимальная сумма транзакции (₽)
                      </label>
                      <input
                        type="number"
                        value={newTemplate.settings.maxTransactionAmount}
                        onChange={(e) => handleSettingsUpdate('maxTransactionAmount', '', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Alert Settings */}
                  <div className="border border-border rounded-lg p-4">
                    <h4 className="font-medium text-text-primary mb-4">Настройки уведомлений</h4>
                    
                    <div className="space-y-4">
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Порог низкого остатка (%)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={newTemplate?.settings?.alerts?.lowStock}
                          onChange={(e) => handleSettingsUpdate('alerts', 'lowStock', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newTemplate?.settings?.alerts?.temperature}
                            onChange={(e) => handleSettingsUpdate('alerts', 'temperature', e.target.checked)}
                            className="mr-3 rounded border-border focus:ring-primary"
                          />
                          <span className="text-sm text-text-primary">Температурные уведомления</span>
                        </label>

                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newTemplate?.settings?.alerts?.maintenance}
                            onChange={(e) => handleSettingsUpdate('alerts', 'maintenance', e.target.checked)}
                            className="mr-3 rounded border-border focus:ring-primary"
                          />
                          <span className="text-sm text-text-primary">Уведомления о обслуживании</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {activeTab === 'create' && (
          <div className="flex items-center justify-between p-6 border-t border-border">
            <button
              onClick={() => setActiveTab('list')}
              className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              Отмена
            </button>
            
            <button
              onClick={handleCreateTemplate}
              disabled={!newTemplate.name.trim()}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Icon name="Save" size={16} />
              <span>{selectedTemplate ? 'Сохранить изменения' : 'Создать шаблон'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateManagementModal;