import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'add-machine',
      title: 'Добавить машину',
      description: 'Зарегистрировать новый торговый автомат',
      icon: 'Plus',
      color: 'primary',
      onClick: () => navigate('/machine-fleet-management')
    },
    {
      id: 'bulk-inventory',
      title: 'Массовое пополнение',
      description: 'Обновить запасы для нескольких машин',
      icon: 'Package',
      color: 'success',
      onClick: () => navigate('/inventory-management')
    },
    {
      id: 'schedule-maintenance',
      title: 'Запланировать обслуживание',
      description: 'Создать задачу на техническое обслуживание',
      icon: 'Calendar',
      color: 'warning',
      onClick: () => navigate('/maintenance-service-management')
    },
    {
      id: 'generate-report',
      title: 'Создать отчет',
      description: 'Сформировать отчет по продажам или работе',
      icon: 'FileText',
      color: 'accent',
      onClick: () => navigate('/sales-analytics-reporting')
    },
    {
      id: 'emergency-stop',
      title: 'Экстренная остановка',
      description: 'Остановить работу выбранных машин',
      icon: 'AlertTriangle',
      color: 'error',
      onClick: () => {
        if (window.confirm('Вы уверены, что хотите выполнить экстренную остановку?')) {
          // Handle emergency stop
          alert('Команда экстренной остановки отправлена');
        }
      }
    },
    {
      id: 'user-management',
      title: 'Управление пользователями',
      description: 'Добавить или изменить права пользователей',
      icon: 'Users',
      color: 'secondary',
      onClick: () => navigate('/user-role-management')
    }
  ];

  const getIconBgColor = (color) => {
    switch (color) {
      case 'primary': return 'bg-primary-100 text-primary group-hover:bg-primary group-hover:text-white';
      case 'success': return 'bg-success-100 text-success group-hover:bg-success group-hover:text-white';
      case 'warning': return 'bg-warning-100 text-warning group-hover:bg-warning group-hover:text-white';
      case 'accent': return 'bg-accent-100 text-accent group-hover:bg-accent group-hover:text-white';
      case 'error': return 'bg-error-100 text-error group-hover:bg-error group-hover:text-white';
      case 'secondary': return 'bg-secondary-100 text-secondary group-hover:bg-secondary group-hover:text-white';
      default: return 'bg-secondary-100 text-secondary';
    }
  };

  const getBorderColor = (color) => {
    switch (color) {
      case 'primary': return 'group-hover:border-primary';
      case 'success': return 'group-hover:border-success';
      case 'warning': return 'group-hover:border-warning';
      case 'accent': return 'group-hover:border-accent';
      case 'error': return 'group-hover:border-error';
      case 'secondary': return 'group-hover:border-secondary';
      default: return 'group-hover:border-secondary';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Быстрые действия
          </h2>
          <p className="text-sm text-text-secondary">
            Часто используемые операции и команды
          </p>
        </div>
        <button className="text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-200">
          Настроить действия
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={`group p-4 bg-surface border border-border rounded-lg hover:shadow-md transition-all duration-200 text-left ${getBorderColor(action.color)}`}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-lg ${getIconBgColor(action.color)} flex items-center justify-center transition-all duration-200`}>
                <Icon name={action.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-text-primary group-hover:text-text-primary mb-1">
                  {action.title}
                </h3>
                <p className="text-xs text-text-secondary group-hover:text-text-secondary leading-relaxed">
                  {action.description}
                </p>
              </div>
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-text-muted group-hover:text-text-secondary transition-colors duration-200" 
              />
            </div>
          </button>
        ))}
      </div>

      {/* Emergency Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-1">
              Экстренные действия
            </h3>
            <p className="text-xs text-text-secondary">
              Критические операции для чрезвычайных ситуаций
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 bg-error-100 text-error rounded-lg hover:bg-error hover:text-white transition-colors duration-200 text-sm font-medium">
              <Icon name="Power" size={14} className="mr-2" />
              Остановить все
            </button>
            <button className="px-3 py-2 bg-warning-100 text-warning rounded-lg hover:bg-warning hover:text-white transition-colors duration-200 text-sm font-medium">
              <Icon name="AlertTriangle" size={14} className="mr-2" />
              Режим обслуживания
            </button>
          </div>
        </div>
      </div>

      {/* Recent Actions Log */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">Последние действия</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">Добавлена машина VM-247</span>
            <span className="text-text-muted">5 мин назад</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">Создан отчет по продажам</span>
            <span className="text-text-muted">12 мин назад</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">Обновлены запасы (15 машин)</span>
            <span className="text-text-muted">1 час назад</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;