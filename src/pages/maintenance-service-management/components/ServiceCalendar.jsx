import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ServiceCalendar = ({ requests, technicians }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'week', 'month'
  const [selectedTechnician, setSelectedTechnician] = useState('all');

  const formatDate = (date) => {
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWeekDays = (date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const getMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    const endDate = new Date(lastDay);

    // Adjust to start from Monday
    const startDay = firstDay.getDay();
    startDate.setDate(firstDay.getDate() - (startDay === 0 ? 6 : startDay - 1));

    // Adjust to end on Sunday
    const endDay = lastDay.getDay();
    endDate.setDate(lastDay.getDate() + (endDay === 0 ? 0 : 7 - endDay));

    const days = [];
    const current = new Date(startDate);
    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const getRequestsForDate = (date) => {
    const dateStr = date.toDateString();
    return requests.filter(request => {
      const requestDate = new Date(request.estimatedCompletion).toDateString();
      const technicianMatch = selectedTechnician === 'all' || request.assignedTechnician === selectedTechnician;
      return requestDate === dateStr && technicianMatch;
    });
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(currentDate.getDate() + (direction * 7));
    } else {
      newDate.setMonth(currentDate.getMonth() + direction);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-error';
      case 'high': return 'bg-warning';
      case 'medium': return 'bg-primary';
      case 'low': return 'bg-secondary-400';
      default: return 'bg-secondary-200';
    }
  };

  const weekDays = getWeekDays(currentDate);
  const monthDays = getMonthDays(currentDate);

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <h3 className="text-xl font-heading font-semibold text-text-primary">
            {viewMode === 'week' ? 'Недельный вид' : 'Месячный вид'}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateDate(-1)}
              className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
            >
              <Icon name="ChevronLeft" size={16} className="text-text-secondary" />
            </button>
            <span className="text-lg font-medium text-text-primary min-w-48 text-center">
              {viewMode === 'week' 
                ? `${formatDate(weekDays[0])} - ${formatDate(weekDays[6])}`
                : currentDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
              }
            </span>
            <button
              onClick={() => navigateDate(1)}
              className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
            >
              <Icon name="ChevronRight" size={16} className="text-text-secondary" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedTechnician}
            onChange={(e) => setSelectedTechnician(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Все техники</option>
            {technicians.map((tech) => (
              <option key={tech.id} value={tech.name}>{tech.name}</option>
            ))}
          </select>

          <div className="flex items-center bg-secondary-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-200 ${
                viewMode === 'week' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Неделя
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-200 ${
                viewMode === 'month' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Месяц
            </button>
          </div>

          <button
            onClick={goToToday}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
          >
            Сегодня
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      {viewMode === 'week' ? (
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          {/* Week Header */}
          <div className="grid grid-cols-8 border-b border-border">
            <div className="p-4 bg-secondary-50 font-medium text-text-secondary">Время</div>
            {weekDays.map((day, index) => (
              <div key={index} className="p-4 bg-secondary-50 text-center">
                <div className="font-medium text-text-primary">
                  {day.toLocaleDateString('ru-RU', { weekday: 'short' })}
                </div>
                <div className="text-sm text-text-secondary">
                  {day.getDate()}
                </div>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="max-h-96 overflow-y-auto">
            {Array.from({ length: 12 }, (_, hour) => hour + 8).map((hour) => (
              <div key={hour} className="grid grid-cols-8 border-b border-border min-h-16">
                <div className="p-2 bg-secondary-50 text-sm text-text-secondary font-medium">
                  {hour}:00
                </div>
                {weekDays.map((day, dayIndex) => {
                  const dayRequests = getRequestsForDate(day).filter(request => {
                    const requestHour = new Date(request.estimatedCompletion).getHours();
                    return requestHour === hour;
                  });

                  return (
                    <div key={dayIndex} className="p-1 border-r border-border">
                      {dayRequests.map((request) => (
                        <div
                          key={request.id}
                          className={`p-2 rounded text-xs text-white mb-1 cursor-pointer hover:opacity-80 transition-opacity duration-200 ${getPriorityColor(request.priority)}`}
                          title={`${request.machineId} - ${request.issueType}`}
                        >
                          <div className="font-medium truncate">{request.machineId}</div>
                          <div className="truncate">{formatTime(request.estimatedCompletion)}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          {/* Month Header */}
          <div className="grid grid-cols-7 border-b border-border">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
              <div key={day} className="p-4 bg-secondary-50 text-center font-medium text-text-secondary">
                {day}
              </div>
            ))}
          </div>

          {/* Month Days */}
          <div className="grid grid-cols-7">
            {monthDays.map((day, index) => {
              const dayRequests = getRequestsForDate(day);
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
              const isToday = day.toDateString() === new Date().toDateString();

              return (
                <div
                  key={index}
                  className={`min-h-32 p-2 border-r border-b border-border ${
                    !isCurrentMonth ? 'bg-secondary-50' : ''
                  } ${isToday ? 'bg-primary-50' : ''}`}
                >
                  <div className={`text-sm font-medium mb-2 ${
                    !isCurrentMonth ? 'text-text-muted' : 'text-text-primary'
                  } ${isToday ? 'text-primary' : ''}`}>
                    {day.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {dayRequests.slice(0, 3).map((request) => (
                      <div
                        key={request.id}
                        className={`p-1 rounded text-xs text-white cursor-pointer hover:opacity-80 transition-opacity duration-200 ${getPriorityColor(request.priority)}`}
                        title={`${request.machineId} - ${request.issueType} - ${formatTime(request.estimatedCompletion)}`}
                      >
                        <div className="truncate">{request.machineId}</div>
                      </div>
                    ))}
                    {dayRequests.length > 3 && (
                      <div className="text-xs text-text-secondary">
                        +{dayRequests.length - 3} еще
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-6 text-sm">
        <span className="font-medium text-text-secondary">Приоритет:</span>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-error rounded"></div>
          <span className="text-text-secondary">Критический</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-warning rounded"></div>
          <span className="text-text-secondary">Высокий</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded"></div>
          <span className="text-text-secondary">Средний</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-secondary-400 rounded"></div>
          <span className="text-text-secondary">Низкий</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCalendar;