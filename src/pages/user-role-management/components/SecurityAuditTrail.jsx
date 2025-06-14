import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SecurityAuditTrail = () => {
  const [dateRange, setDateRange] = useState('7days');
  const [eventType, setEventType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock audit data
  const auditEvents = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      user: 'Иван Петров',
      userEmail: 'ivan.petrov@vendbot.ru',
      action: 'login_success',
      description: 'Успешный вход в систему',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      location: 'Москва, Россия',
      severity: 'info'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      user: 'Мария Сидорова',
      userEmail: 'maria.sidorova@vendbot.ru',
      action: 'permission_change',
      description: 'Изменены права доступа пользователя Алексей Козлов',
      ipAddress: '192.168.1.105',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      location: 'Санкт-Петербург, Россия',
      severity: 'warning',
      details: {
        targetUser: 'Алексей Козлов',
        changedPermissions: ['machine_management', 'inventory_control']
      }
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      user: 'Система',
      userEmail: 'system@vendbot.ru',
      action: 'login_failed',
      description: 'Неудачная попытка входа - неверный пароль',
      ipAddress: '203.0.113.45',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
      location: 'Неизвестно',
      severity: 'error',
      details: {
        attemptedUser: 'admin@vendbot.ru',
        failureReason: 'invalid_password'
      }
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      user: 'Иван Петров',
      userEmail: 'ivan.petrov@vendbot.ru',
      action: 'user_created',
      description: 'Создан новый пользователь Дмитрий Морозов',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      location: 'Москва, Россия',
      severity: 'info',
      details: {
        createdUser: 'Дмитрий Морозов',
        assignedRole: 'Оператор'
      }
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      user: 'Елена Волкова',
      userEmail: 'elena.volkova@vendbot.ru',
      action: 'data_export',
      description: 'Экспорт пользовательских данных',
      ipAddress: '192.168.1.110',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      location: 'Новосибирск, Россия',
      severity: 'warning',
      details: {
        exportType: 'user_list',
        recordCount: 150
      }
    },
    {
      id: 6,
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      user: 'Система',
      userEmail: 'system@vendbot.ru',
      action: 'password_reset',
      description: 'Сброс пароля для пользователя maria.sidorova@vendbot.ru',
      ipAddress: '192.168.1.105',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      location: 'Санкт-Петербург, Россия',
      severity: 'info',
      details: {
        targetUser: 'Мария Сидорова',
        resetMethod: 'email_link'
      }
    }
  ];

  const getActionIcon = (action) => {
    switch (action) {
      case 'login_success': return 'LogIn';
      case 'login_failed': return 'AlertCircle';
      case 'permission_change': return 'Shield';
      case 'user_created': return 'UserPlus';
      case 'user_deleted': return 'UserX';
      case 'data_export': return 'Download';
      case 'password_reset': return 'Key';
      case 'system_config': return 'Settings';
      default: return 'Activity';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'login_success': return 'text-success';
      case 'login_failed': return 'text-error';
      case 'permission_change': return 'text-warning';
      case 'user_created': return 'text-primary';
      case 'user_deleted': return 'text-error';
      case 'data_export': return 'text-accent';
      case 'password_reset': return 'text-secondary';
      case 'system_config': return 'text-primary';
      default: return 'text-text-secondary';
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'info':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary">
            Информация
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning">
            Предупреждение
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error">
            Ошибка
          </span>
        );
      default:
        return null;
    }
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} мин назад`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} ч назад`;
    } else {
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const filteredEvents = auditEvents.filter(event => {
    const matchesSearch = event.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.ipAddress.includes(searchTerm);
    const matchesType = eventType === 'all' || event.action.includes(eventType);
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Журнал аудита безопасности
          </h3>
          <p className="text-text-secondary text-sm mt-1">
            История входов, изменений прав доступа и системных событий
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-200">
            <Icon name="Download" size={16} />
            <span>Экспорт журнала</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            <Icon name="Settings" size={16} />
            <span>Настройки аудита</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Всего событий</p>
              <p className="text-xl font-bold text-text-primary">{auditEvents.length}</p>
            </div>
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={20} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Успешные входы</p>
              <p className="text-xl font-bold text-text-primary">
                {auditEvents.filter(e => e.action === 'login_success').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
              <Icon name="LogIn" size={20} className="text-success" />
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Неудачные попытки</p>
              <p className="text-xl font-bold text-text-primary">
                {auditEvents.filter(e => e.action === 'login_failed').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-error-100 rounded-lg flex items-center justify-center">
              <Icon name="AlertCircle" size={20} className="text-error" />
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Изменения прав</p>
              <p className="text-xl font-bold text-text-primary">
                {auditEvents.filter(e => e.action === 'permission_change').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-warning" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Поиск по пользователю, действию, IP..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-64"
              />
            </div>
            
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Все события</option>
              <option value="login">Входы в систему</option>
              <option value="permission">Изменения прав</option>
              <option value="user">Управление пользователями</option>
              <option value="data">Работа с данными</option>
              <option value="system">Системные события</option>
            </select>
            
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="1day">Последний день</option>
              <option value="7days">Последние 7 дней</option>
              <option value="30days">Последние 30 дней</option>
              <option value="90days">Последние 90 дней</option>
            </select>
          </div>

          <div className="text-sm text-text-secondary">
            Найдено событий: {filteredEvents.length}
          </div>
        </div>
      </div>

      {/* Audit Events List */}
      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="divide-y divide-border">
          {filteredEvents.map((event) => (
            <div key={event.id} className="p-6 hover:bg-secondary-50 transition-colors duration-200">
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  event.severity === 'error' ? 'bg-error-100' :
                  event.severity === 'warning' ? 'bg-warning-100' : 'bg-primary-100'
                }`}>
                  <Icon 
                    name={getActionIcon(event.action)} 
                    size={20} 
                    className={getActionColor(event.action)} 
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-sm font-medium text-text-primary">
                        {event.description}
                      </h4>
                      {getSeverityBadge(event.severity)}
                    </div>
                    <span className="text-sm text-text-muted">
                      {formatTimestamp(event.timestamp)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-text-secondary">Пользователь:</span>
                      <div className="font-medium text-text-primary">{event.user}</div>
                      <div className="text-text-muted">{event.userEmail}</div>
                    </div>
                    
                    <div>
                      <span className="text-text-secondary">IP адрес:</span>
                      <div className="font-medium text-text-primary">{event.ipAddress}</div>
                      <div className="text-text-muted">{event.location}</div>
                    </div>
                    
                    <div>
                      <span className="text-text-secondary">Браузер:</span>
                      <div className="font-medium text-text-primary truncate" title={event.userAgent}>
                        {event.userAgent.split(' ')[0]}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-text-secondary">Действие:</span>
                      <div className="font-medium text-text-primary">{event.action}</div>
                    </div>
                  </div>
                  
                  {event.details && (
                    <div className="mt-3 p-3 bg-secondary-50 rounded-lg">
                      <span className="text-text-secondary text-sm">Дополнительная информация:</span>
                      <div className="mt-1 text-sm">
                        {Object.entries(event.details).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-text-secondary capitalize">
                              {key.replace('_', ' ')}:
                            </span>
                            <span className="text-text-primary font-medium">
                              {Array.isArray(value) ? value.join(', ') : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Icon name="FileText" size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary">События не найдены</p>
            <p className="text-text-muted text-sm mt-1">
              Попробуйте изменить параметры фильтрации
            </p>
          </div>
        )}
      </div>

      {/* Security Recommendations */}
      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
          <div>
            <h4 className="font-medium text-warning mb-2">Рекомендации по безопасности</h4>
            <ul className="text-sm text-warning space-y-1">
              <li>• Регулярно проверяйте журнал на предмет подозрительной активности</li>
              <li>• Настройте автоматические уведомления для критических событий</li>
              <li>• Проводите аудит прав доступа не реже одного раза в квартал</li>
              <li>• Блокируйте IP-адреса с множественными неудачными попытками входа</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityAuditTrail;