// src/pages/operator-mobile-dashboard/components/ProgressTracker.jsx
import React from 'react';
import Icon from 'components/AppIcon';

const ProgressTracker = ({ completed, total, percentage }) => {
  const getProgressColor = () => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 50) return 'bg-warning';
    return 'bg-primary';
  };

  const getProgressTextColor = () => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 50) return 'text-warning';
    return 'text-primary';
  };

  const getStatusMessage = () => {
    if (percentage === 100) return 'Все задачи выполнены!';
    if (percentage >= 80) return 'Почти готово';
    if (percentage >= 50) return 'Половина пути пройдена';
    if (percentage > 0) return 'Работа началась';
    return 'Готов к началу работы';
  };

  const getStatusIcon = () => {
    if (percentage === 100) return 'CheckCircle';
    if (percentage >= 80) return 'Clock';
    if (percentage >= 50) return 'Activity';
    if (percentage > 0) return 'Play';
    return 'Circle';
  };

  return (
    <div className="space-y-3">
      {/* Progress Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon 
            name={getStatusIcon()} 
            size={16} 
            className={getProgressTextColor()}
          />
          <span className="text-sm font-medium text-text-primary">
            Прогресс выполнения
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-bold ${getProgressTextColor()}`}>
            {percentage}%
          </span>
          <span className="text-sm text-text-secondary">
            ({completed}/{total})
          </span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-secondary-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ease-out ${getProgressColor()}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        
        {/* Progress Segments */}
        <div className="absolute top-0 left-0 w-full h-2 flex">
          {Array.from({ length: total }, (_, index) => (
            <div 
              key={index}
              className="flex-1 border-r border-background last:border-r-0"
              style={{ width: `${100 / total}%` }}
            >
              {index < completed && (
                <div className="w-full h-full bg-white bg-opacity-30 rounded-sm"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Status Message */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary">
          {getStatusMessage()}
        </span>
        
        {percentage === 100 && (
          <div className="flex items-center space-x-1 text-success">
            <Icon name="Trophy" size={14} />
            <span className="text-xs font-medium">Отлично!</span>
          </div>
        )}
      </div>
      
      {/* Time Estimate */}
      {percentage > 0 && percentage < 100 && (
        <div className="bg-secondary-50 rounded-lg p-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">Оставшееся время:</span>
            <span className="font-medium text-text-primary">
              {Math.round((total - completed) * 8)} мин
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;