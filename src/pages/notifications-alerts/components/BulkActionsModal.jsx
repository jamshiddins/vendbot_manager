// src/pages/notifications-alerts/components/BulkActionsModal.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BulkActionsModal = ({ selectedCount, onAction, onClose }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [assignee, setAssignee] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const bulkActions = [
    {
      id: 'mark-read',
      label: 'Отметить как прочитанные',
      icon: 'MailOpen',
      color: 'primary',
      description: 'Изменить статус на "Прочитано"'
    },
    {
      id: 'archive',
      label: 'Архивировать',
      icon: 'Archive',
      color: 'secondary',
      description: 'Переместить в архив'
    },
    {
      id: 'assign',
      label: 'Назначить ответственного',
      icon: 'UserPlus',
      color: 'success',
      description: 'Назначить сотрудника для обработки'
    },
    {
      id: 'delete',
      label: 'Удалить',
      icon: 'Trash2',
      color: 'error',
      description: 'Безвозвратно удалить уведомления'
    }
  ];

  const teamMembers = [
    { id: 'petrov', name: 'Петров И.В.', role: 'Техник' },
    { id: 'sidorov', name: 'Сидоров А.П.', role: 'Инженер' },
    { id: 'ivanov', name: 'Иванов С.М.', role: 'Руководитель' }
  ];

  const handleSubmit = () => {
    if (!selectedAction) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      const actionData = {
        action: selectedAction,
        assignee: selectedAction === 'assign' ? assignee : null
      };
      
      onAction(actionData);
      setIsProcessing(false);
    }, 1000);
  };

  const getActionColor = (color) => {
    switch (color) {
      case 'primary': return 'text-primary bg-primary-50 border-primary-200';
      case 'secondary': return 'text-secondary bg-secondary-50 border-secondary-200';
      case 'success': return 'text-success bg-success-50 border-success-200';
      case 'error': return 'text-error bg-error-50 border-error-200';
      default: return 'text-text-secondary bg-secondary-50 border-border';
    }
  };

  const selectedActionData = bulkActions.find(action => action.id === selectedAction);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-300">
      <div className="bg-surface rounded-lg border border-border w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">
              Массовые действия
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Выбрано уведомлений: {selectedCount}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text-primary mb-4">
              Выберите действие:
            </h3>
            
            {bulkActions.map((action) => (
              <label
                key={action.id}
                className={`flex items-start space-x-4 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedAction === action.id
                    ? getActionColor(action.color)
                    : 'border-border hover:border-secondary-300 hover:bg-secondary-25'
                }`}
              >
                <input
                  type="radio"
                  name="bulkAction"
                  value={action.id}
                  checked={selectedAction === action.id}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                />
                <div className="flex items-start space-x-3 flex-1">
                  <Icon name={action.icon} size={20} className="mt-0.5" />
                  <div>
                    <h4 className="font-medium text-text-primary">
                      {action.label}
                    </h4>
                    <p className="text-sm text-text-secondary mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              </label>
            ))}

            {/* Assignee Selection */}
            {selectedAction === 'assign' && (
              <div className="mt-6 p-4 bg-secondary-50 rounded-lg border border-secondary-200">
                <h4 className="font-medium text-text-primary mb-3">
                  Выберите ответственного:
                </h4>
                <div className="space-y-2">
                  {teamMembers.map((member) => (
                    <label
                      key={member.id}
                      className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-surface transition-colors duration-200"
                    >
                      <input
                        type="radio"
                        name="assignee"
                        value={member.id}
                        checked={assignee === member.id}
                        onChange={(e) => setAssignee(e.target.value)}
                        className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                      />
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <Icon name="User" size={16} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{member.name}</p>
                          <p className="text-sm text-text-secondary">{member.role}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Confirmation */}
            {selectedActionData && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertTriangle" size={20} className="text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">
                      Подтверждение действия
                    </h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Действие "{selectedActionData.label}" будет применено к {selectedCount} уведомлениям.
                      {selectedActionData.id === 'delete' && ' Это действие нельзя отменить.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-4 p-6 border-t border-border bg-secondary-25">
          <button
            onClick={onClose}
            className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 border border-border rounded-lg transition-colors duration-200"
            disabled={isProcessing}
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedAction || isProcessing || (selectedAction === 'assign' && !assignee)}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Обработка...</span>
              </>
            ) : (
              <>
                <Icon name="Check" size={16} />
                <span>Применить</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsModal;