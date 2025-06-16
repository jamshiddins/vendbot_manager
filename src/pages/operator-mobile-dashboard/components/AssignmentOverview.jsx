// src/pages/operator-mobile-dashboard/components/AssignmentOverview.jsx
import React from 'react';
import Icon from 'components/AppIcon';

const AssignmentOverview = ({ assignment, onNavigate }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error-100';
      case 'medium': return 'bg-warning-100';
      case 'low': return 'bg-success-100';
      default: return 'bg-secondary-100';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'Высокий';
      case 'medium': return 'Средний';
      case 'low': return 'Низкий';
      default: return 'Обычный';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in_progress': return 'Clock';
      case 'completed': return 'CheckCircle';
      case 'pending': return 'Calendar';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_progress': return 'text-warning';
      case 'completed': return 'text-success';
      case 'pending': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'in_progress': return 'В процессе';
      case 'completed': return 'Завершено';
      case 'pending': return 'Ожидает';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              {assignment?.machineId}
            </h2>
            <div className="flex items-center space-x-2">
              <Icon name={getStatusIcon(assignment?.status)} size={14} className={getStatusColor(assignment?.status)} />
              <span className="text-sm text-text-secondary">
                {getStatusLabel(assignment?.status)}
              </span>
            </div>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full ${getPriorityBg(assignment?.priority)}`}>
          <span className={`text-sm font-medium ${getPriorityColor(assignment?.priority)}`}>
            {getPriorityLabel(assignment?.priority)}
          </span>
        </div>
      </div>
      
      {/* Location Info */}
      <div className="bg-secondary-50 rounded-lg p-3">
        <div className="flex items-start space-x-3">
          <Icon name="MapPin" size={16} className="text-primary mt-1" />
          <div className="flex-1">
            <p className="text-sm font-medium text-text-primary">
              {assignment?.location}
            </p>
            <p className="text-sm text-text-secondary mt-1">
              {assignment?.address}
            </p>
          </div>
          <button
            onClick={onNavigate}
            className="p-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Icon name="Navigation" size={16} />
          </button>
        </div>
      </div>
      
      {/* Service Details */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 bg-secondary-50 rounded-lg">
          <Icon name="Wrench" size={20} className="text-text-secondary mx-auto mb-1" />
          <p className="text-xs text-text-secondary mb-1">Тип обслуживания</p>
          <p className="text-sm font-medium text-text-primary">
            {assignment?.serviceType}
          </p>
        </div>
        
        <div className="text-center p-3 bg-secondary-50 rounded-lg">
          <Icon name="Clock" size={20} className="text-text-secondary mx-auto mb-1" />
          <p className="text-xs text-text-secondary mb-1">Время выполнения</p>
          <p className="text-sm font-medium text-text-primary">
            {assignment?.estimatedTime}
          </p>
        </div>
        
        <div className="text-center p-3 bg-secondary-50 rounded-lg">
          <Icon name="MapPin" size={20} className="text-text-secondary mx-auto mb-1" />
          <p className="text-xs text-text-secondary mb-1">Расстояние</p>
          <p className="text-sm font-medium text-text-primary">
            {assignment?.distance}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssignmentOverview;