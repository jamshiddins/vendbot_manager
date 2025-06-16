// src/pages/operator-mobile-dashboard/components/TaskCard.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const TaskCard = ({ task, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [photos, setPhotos] = useState(task.photos || []);

  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed': return 'CheckCircle';
      case 'in_progress': return 'Clock';
      case 'pending': return 'Circle';
      default: return 'Circle';
    }
  };

  const getStatusColor = () => {
    switch (task.status) {
      case 'completed': return 'text-success';
      case 'in_progress': return 'text-warning';
      case 'pending': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  };

  const getCardBorder = () => {
    switch (task.status) {
      case 'completed': return 'border-l-success';
      case 'in_progress': return 'border-l-warning';
      case 'pending': return 'border-l-border';
      default: return 'border-l-border';
    }
  };

  const handleStatusChange = (newStatus) => {
    onUpdate({ status: newStatus });
  };

  const handlePhotoCapture = () => {
    // Simulate photo capture
    const newPhoto = `photo_${Date.now()}.jpg`;
    const updatedPhotos = [...photos, newPhoto];
    setPhotos(updatedPhotos);
    onUpdate({ photos: updatedPhotos });
  };

  const canMarkComplete = () => {
    if (task.quantity) {
      return task.quantity.current >= task.quantity.total;
    }
    return task.status !== 'completed';
  };

  return (
    <div className={`bg-surface rounded-lg border ${getCardBorder()} border-l-4 shadow-sm`}>
      {/* Main Card Content */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <button
              onClick={() => {
                if (task.status === 'pending') {
                  handleStatusChange('in_progress');
                } else if (task.status === 'in_progress' && canMarkComplete()) {
                  handleStatusChange('completed');
                }
              }}
              disabled={task.status === 'completed' || (task.status === 'in_progress' && !canMarkComplete())}
              className={`mt-1 ${getStatusColor()} hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Icon name={getStatusIcon()} size={20} />
            </button>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-medium text-text-primary truncate">
                  {task.title}
                </h3>
                {task.required && (
                  <span className="bg-error text-white text-xs px-2 py-1 rounded-full font-medium">
                    Обязательно
                  </span>
                )}
              </div>
              
              <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                {task.description}
              </p>
              
              {/* Quantity Progress */}
              {task.quantity && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-secondary">
                      Прогресс загрузки
                    </span>
                    <span className="text-xs font-medium text-text-primary">
                      {task.quantity.current}/{task.quantity.total} {task.quantity.unit}
                    </span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((task.quantity.current / task.quantity.total) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {/* Photo Count */}
              {photos.length > 0 && (
                <div className="flex items-center space-x-1 mt-2">
                  <Icon name="Camera" size={14} className="text-text-secondary" />
                  <span className="text-xs text-text-secondary">
                    {photos.length} фото
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded hover:bg-secondary-100 transition-colors"
          >
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`text-text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>
      
      {/* Expanded Actions */}
      {isExpanded && (
        <div className="border-t border-border p-4 bg-secondary-50">
          <div className="grid grid-cols-2 gap-2">
            {/* Photo Button */}
            <button
              onClick={handlePhotoCapture}
              className="flex items-center justify-center space-x-2 py-2 px-3 bg-surface border border-border rounded-lg hover:bg-secondary-100 transition-colors"
            >
              <Icon name="Camera" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-primary">Фото</span>
            </button>
            
            {/* Voice Note Button */}
            <button className="flex items-center justify-center space-x-2 py-2 px-3 bg-surface border border-border rounded-lg hover:bg-secondary-100 transition-colors">
              <Icon name="Mic" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-primary">Заметка</span>
            </button>
            
            {task.quantity && (
              <>
                {/* Decrease Quantity */}
                <button
                  onClick={() => {
                    if (task.quantity.current > 0) {
                      onUpdate({
                        quantity: {
                          ...task.quantity,
                          current: task.quantity.current - 1
                        }
                      });
                    }
                  }}
                  disabled={task.quantity.current <= 0}
                  className="flex items-center justify-center space-x-2 py-2 px-3 bg-surface border border-border rounded-lg hover:bg-secondary-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon name="Minus" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-primary">-1 {task.quantity.unit}</span>
                </button>
                
                {/* Increase Quantity */}
                <button
                  onClick={() => {
                    if (task.quantity.current < task.quantity.total) {
                      onUpdate({
                        quantity: {
                          ...task.quantity,
                          current: task.quantity.current + 1
                        }
                      });
                    }
                  }}
                  disabled={task.quantity.current >= task.quantity.total}
                  className="flex items-center justify-center space-x-2 py-2 px-3 bg-surface border border-border rounded-lg hover:bg-secondary-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon name="Plus" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-primary">+1 {task.quantity.unit}</span>
                </button>
              </>
            )}
          </div>
          
          {/* Status Update Buttons */}
          {task.status === 'pending' && (
            <button
              onClick={() => handleStatusChange('in_progress')}
              className="w-full mt-3 py-2 bg-warning text-white rounded-lg font-medium hover:bg-warning-600 transition-colors"
            >
              Начать выполнение
            </button>
          )}
          
          {task.status === 'in_progress' && canMarkComplete() && (
            <button
              onClick={() => handleStatusChange('completed')}
              className="w-full mt-3 py-2 bg-success text-white rounded-lg font-medium hover:bg-success-600 transition-colors"
            >
              Завершить задачу
            </button>
          )}
          
          {task.status === 'completed' && (
            <div className="flex items-center justify-center space-x-2 mt-3 py-2 bg-success-100 text-success rounded-lg">
              <Icon name="CheckCircle" size={16} />
              <span className="text-sm font-medium">Задача выполнена</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskCard;