import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BulkOperations = ({ selectedCount, onClearSelection }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(null);

  const bulkOperations = [
    {
      id: 'activate',
      label: 'Активировать пользователей',
      icon: 'UserCheck',
      color: 'text-success',
      description: 'Активировать выбранных пользователей'
    },
    {
      id: 'deactivate',
      label: 'Деактивировать пользователей',
      icon: 'UserX',
      color: 'text-warning',
      description: 'Деактивировать выбранных пользователей'
    },
    {
      id: 'change_role',
      label: 'Изменить роль',
      icon: 'Shield',
      color: 'text-primary',
      description: 'Назначить новую роль выбранным пользователям'
    },
    {
      id: 'reset_password',
      label: 'Сбросить пароли',
      icon: 'Key',
      color: 'text-accent',
      description: 'Отправить ссылки для сброса паролей'
    },
    {
      id: 'send_notification',
      label: 'Отправить уведомление',
      icon: 'Mail',
      color: 'text-secondary',
      description: 'Отправить сообщение выбранным пользователям'
    },
    {
      id: 'export_data',
      label: 'Экспортировать данные',
      icon: 'Download',
      color: 'text-text-secondary',
      description: 'Экспортировать данные выбранных пользователей'
    },
    {
      id: 'delete',
      label: 'Удалить пользователей',
      icon: 'Trash2',
      color: 'text-error',
      description: 'Удалить выбранных пользователей (необратимо)',
      dangerous: true
    }
  ];

  const handleOperationClick = (operation) => {
    setSelectedOperation(operation);
    setIsDropdownOpen(false);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmOperation = () => {
    console.log(`Executing ${selectedOperation.id} for ${selectedCount} users`);
    setIsConfirmModalOpen(false);
    setSelectedOperation(null);
    onClearSelection();
  };

  const handleCancelOperation = () => {
    setIsConfirmModalOpen(false);
    setSelectedOperation(null);
  };

  return (
    <>
      <div className="flex items-center space-x-3 bg-primary-50 border border-primary-200 rounded-lg px-4 py-2">
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">
            Выбрано: {selectedCount}
          </span>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 px-3 py-1 bg-primary text-white rounded hover:bg-primary-700 transition-colors duration-200"
          >
            <Icon name="Settings" size={14} />
            <span className="text-sm">Действия</span>
            <Icon name="ChevronDown" size={14} />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-surface rounded-lg shadow-lg border border-border z-300">
              <div className="p-2">
                {bulkOperations.map((operation) => (
                  <button
                    key={operation.id}
                    onClick={() => handleOperationClick(operation)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-secondary-50 rounded-lg transition-colors duration-200 ${
                      operation.dangerous ? 'hover:bg-error-50' : ''
                    }`}
                  >
                    <Icon name={operation.icon} size={16} className={operation.color} />
                    <div>
                      <div className={`text-sm font-medium ${operation.dangerous ? 'text-error' : 'text-text-primary'}`}>
                        {operation.label}
                      </div>
                      <div className="text-xs text-text-muted">
                        {operation.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onClearSelection}
          className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
          title="Очистить выбор"
        >
          <Icon name="X" size={16} />
        </button>
      </div>

      {/* Confirmation Modal */}
      {isConfirmModalOpen && selectedOperation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-300 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  selectedOperation.dangerous ? 'bg-error-100' : 'bg-primary-100'
                }`}>
                  <Icon 
                    name={selectedOperation.icon} 
                    size={24} 
                    className={selectedOperation.dangerous ? 'text-error' : 'text-primary'} 
                  />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    Подтверждение действия
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {selectedOperation.label}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-text-primary mb-2">
                  Вы собираетесь выполнить действие "{selectedOperation.label}" для {selectedCount} пользователей.
                </p>
                <p className="text-text-secondary text-sm">
                  {selectedOperation.description}
                </p>
                
                {selectedOperation.dangerous && (
                  <div className="mt-4 p-3 bg-error-50 border border-error-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
                      <div>
                        <p className="text-error text-sm font-medium">Внимание!</p>
                        <p className="text-error text-sm">
                          Это действие необратимо. Удаленные пользователи не могут быть восстановлены.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={handleCancelOperation}
                  className="px-4 py-2 border border-border rounded-lg text-text-secondary hover:bg-secondary-50 transition-colors duration-200"
                >
                  Отмена
                </button>
                <button
                  onClick={handleConfirmOperation}
                  className={`px-4 py-2 rounded-lg text-white transition-colors duration-200 ${
                    selectedOperation.dangerous 
                      ? 'bg-error hover:bg-error-700' :'bg-primary hover:bg-primary-700'
                  }`}
                >
                  Подтвердить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-250"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </>
  );
};

export default BulkOperations;