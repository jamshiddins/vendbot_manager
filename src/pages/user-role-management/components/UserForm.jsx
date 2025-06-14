import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const UserForm = ({ user, roles, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    location: '',
    status: 'active',
    permissions: [],
    notificationPreferences: {
      email: true,
      sms: false,
      push: true,
      critical: true
    },
    locationAccess: [],
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const departments = [
    'IT отдел',
    'Операции',
    'Обслуживание',
    'Финансы',
    'Маркетинг',
    'Управление'
  ];

  const locations = [
    'Москва',
    'Санкт-Петербург',
    'Екатеринбург',
    'Новосибирск',
    'Казань',
    'Нижний Новгород'
  ];

  const availablePermissions = [
    { id: 'machine_management', label: 'Управление машинами', category: 'Операции' },
    { id: 'inventory_control', label: 'Контроль запасов', category: 'Операции' },
    { id: 'financial_reports', label: 'Финансовые отчеты', category: 'Финансы' },
    { id: 'user_management', label: 'Управление пользователями', category: 'Администрирование' },
    { id: 'system_config', label: 'Системные настройки', category: 'Администрирование' },
    { id: 'maintenance_access', label: 'Доступ к обслуживанию', category: 'Техническое' },
    { id: 'analytics_access', label: 'Доступ к аналитике', category: 'Аналитика' },
    { id: 'audit_logs', label: 'Журналы аудита', category: 'Безопасность' }
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || '',
        department: user.department || '',
        location: user.location || '',
        status: user.status || 'active',
        permissions: user.permissions || [],
        notificationPreferences: {
          email: true,
          sms: false,
          push: true,
          critical: true
        },
        locationAccess: [user.location] || [],
        password: '',
        confirmPassword: ''
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен для заполнения';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный формат email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефон обязателен для заполнения';
    }

    if (!formData.role) {
      newErrors.role = 'Роль должна быть выбрана';
    }

    if (!formData.department) {
      newErrors.department = 'Отдел должен быть выбран';
    }

    if (!user && !formData.password) {
      newErrors.password = 'Пароль обязателен для нового пользователя';
    }

    if (!user && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Пароль должен содержать минимум 8 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave(formData);
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handlePermissionToggle = (permissionId) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const handleLocationAccessToggle = (location) => {
    setFormData(prev => ({
      ...prev,
      locationAccess: prev.locationAccess.includes(location)
        ? prev.locationAccess.filter(l => l !== location)
        : [...prev.locationAccess, location]
    }));
  };

  const handleNotificationChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [type]: value
      }
    }));
  };

  const selectedRole = roles.find(role => role.name === formData.role);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-300 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Icon name={user ? "UserCheck" : "UserPlus"} size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-semibold text-text-primary">
                  {user ? 'Редактировать пользователя' : 'Добавить пользователя'}
                </h2>
                <p className="text-sm text-text-secondary">
                  {user ? 'Изменение данных пользователя' : 'Создание новой учетной записи'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
            >
              <Icon name="X" size={20} className="text-text-secondary" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                    Основная информация
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Полное имя *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                          errors.name ? 'border-error' : 'border-border'
                        }`}
                        placeholder="Введите полное имя"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-error">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                          errors.email ? 'border-error' : 'border-border'
                        }`}
                        placeholder="user@vendbot.ru"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-error">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Телефон *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                          errors.phone ? 'border-error' : 'border-border'
                        }`}
                        placeholder="+7 (495) 123-45-67"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-error">{errors.phone}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Роль *
                        </label>
                        <select
                          value={formData.role}
                          onChange={(e) => handleInputChange('role', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                            errors.role ? 'border-error' : 'border-border'
                          }`}
                        >
                          <option value="">Выберите роль</option>
                          {roles.map(role => (
                            <option key={role.id} value={role.name}>
                              {role.name}
                            </option>
                          ))}
                        </select>
                        {errors.role && (
                          <p className="mt-1 text-sm text-error">{errors.role}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Статус
                        </label>
                        <select
                          value={formData.status}
                          onChange={(e) => handleInputChange('status', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="active">Активен</option>
                          <option value="inactive">Неактивен</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Отдел *
                        </label>
                        <select
                          value={formData.department}
                          onChange={(e) => handleInputChange('department', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                            errors.department ? 'border-error' : 'border-border'
                          }`}
                        >
                          <option value="">Выберите отдел</option>
                          {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                        {errors.department && (
                          <p className="mt-1 text-sm text-error">{errors.department}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Основная локация
                        </label>
                        <select
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">Выберите локацию</option>
                          {locations.map(location => (
                            <option key={location} value={location}>{location}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Password Section */}
                {!user && (
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                      Пароль
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Пароль *
                        </label>
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                            errors.password ? 'border-error' : 'border-border'
                          }`}
                          placeholder="Минимум 8 символов"
                        />
                        {errors.password && (
                          <p className="mt-1 text-sm text-error">{errors.password}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Подтверждение пароля *
                        </label>
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                            errors.confirmPassword ? 'border-error' : 'border-border'
                          }`}
                          placeholder="Повторите пароль"
                        />
                        {errors.confirmPassword && (
                          <p className="mt-1 text-sm text-error">{errors.confirmPassword}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Permissions and Settings */}
              <div className="space-y-6">
                {/* Role Permissions */}
                {selectedRole && (
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                      Права доступа
                    </h3>
                    
                    <div className="bg-secondary-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Shield" size={16} className="text-primary" />
                        <span className="font-medium text-text-primary">{selectedRole.name}</span>
                      </div>
                      <p className="text-sm text-text-secondary">{selectedRole.description}</p>
                    </div>

                    <div className="space-y-3">
                      {availablePermissions.map(permission => (
                        <div key={permission.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div>
                            <div className="font-medium text-text-primary">{permission.label}</div>
                            <div className="text-sm text-text-secondary">{permission.category}</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.permissions.includes(permission.id)}
                              onChange={() => handlePermissionToggle(permission.id)}
                              className="sr-only"
                            />
                            <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                              formData.permissions.includes(permission.id) ? 'bg-primary' : 'bg-secondary-300'
                            }`}>
                              <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
                                formData.permissions.includes(permission.id) ? 'translate-x-5' : 'translate-x-0'
                              }`}></div>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location Access */}
                <div>
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                    Доступ к локациям
                  </h3>
                  
                  <div className="space-y-2">
                    {locations.map(location => (
                      <div key={location} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id={`location-${location}`}
                          checked={formData.locationAccess.includes(location)}
                          onChange={() => handleLocationAccessToggle(location)}
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                        <label htmlFor={`location-${location}`} className="text-sm text-text-primary">
                          {location}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notification Preferences */}
                <div>
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                    Настройки уведомлений
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-text-primary">Email уведомления</div>
                        <div className="text-sm text-text-secondary">Получать уведомления на email</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.notificationPreferences.email}
                          onChange={(e) => handleNotificationChange('email', e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                          formData.notificationPreferences.email ? 'bg-primary' : 'bg-secondary-300'
                        }`}>
                          <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
                            formData.notificationPreferences.email ? 'translate-x-5' : 'translate-x-0'
                          }`}></div>
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-text-primary">SMS уведомления</div>
                        <div className="text-sm text-text-secondary">Получать SMS на телефон</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.notificationPreferences.sms}
                          onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                          formData.notificationPreferences.sms ? 'bg-primary' : 'bg-secondary-300'
                        }`}>
                          <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
                            formData.notificationPreferences.sms ? 'translate-x-5' : 'translate-x-0'
                          }`}></div>
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-text-primary">Push уведомления</div>
                        <div className="text-sm text-text-secondary">Уведомления в браузере</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.notificationPreferences.push}
                          onChange={(e) => handleNotificationChange('push', e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                          formData.notificationPreferences.push ? 'bg-primary' : 'bg-secondary-300'
                        }`}>
                          <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
                            formData.notificationPreferences.push ? 'translate-x-5' : 'translate-x-0'
                          }`}></div>
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-text-primary">Критические уведомления</div>
                        <div className="text-sm text-text-secondary">Важные системные события</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.notificationPreferences.critical}
                          onChange={(e) => handleNotificationChange('critical', e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                          formData.notificationPreferences.critical ? 'bg-primary' : 'bg-secondary-300'
                        }`}>
                          <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
                            formData.notificationPreferences.critical ? 'translate-x-5' : 'translate-x-0'
                          }`}></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-secondary-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border rounded-lg text-text-secondary hover:bg-secondary-100 transition-colors duration-200"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading && <Icon name="Loader2" size={16} className="animate-spin" />}
              <span>{user ? 'Сохранить изменения' : 'Создать пользователя'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;