import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ServiceRequestQueue = ({
  requests,
  onRequestSelect,
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  searchQuery,
  setSearchQuery
}) => {
  const [sortBy, setSortBy] = useState('priority');
  const [sortOrder, setSortOrder] = useState('desc');

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-error text-white';
      case 'high': return 'bg-warning text-white';
      case 'medium': return 'bg-primary text-white';
      case 'low': return 'bg-secondary-400 text-white';
      default: return 'bg-secondary-200 text-text-primary';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'critical': return 'Критический';
      case 'high': return 'Высокий';
      case 'medium': return 'Средний';
      case 'low': return 'Низкий';
      default: return priority;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning-100 text-warning';
      case 'assigned': return 'bg-primary-100 text-primary';
      case 'in_progress': return 'bg-accent-100 text-accent';
      case 'completed': return 'bg-success-100 text-success';
      case 'cancelled': return 'bg-secondary-100 text-text-secondary';
      default: return 'bg-secondary-100 text-text-secondary';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Ожидает';
      case 'assigned': return 'Назначена';
      case 'in_progress': return 'В работе';
      case 'completed': return 'Завершена';
      case 'cancelled': return 'Отменена';
      default: return status;
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sortedRequests = [...requests].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        aValue = priorityOrder[a.priority] || 0;
        bValue = priorityOrder[b.priority] || 0;
        break;
      case 'created':
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
        break;
      case 'estimated':
        aValue = new Date(a.estimatedCompletion);
        bValue = new Date(b.estimatedCompletion);
        break;
      case 'location':
        aValue = a.location;
        bValue = b.location;
        break;
      default:
        aValue = a[sortBy];
        bValue = b[sortBy];
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Icon name="Search" size={16} className="text-text-secondary" />
            <input
              type="text"
              placeholder="Поиск по машине, локации или типу проблемы..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-w-80"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Все статусы</option>
            <option value="pending">Ожидает</option>
            <option value="assigned">Назначена</option>
            <option value="in_progress">В работе</option>
            <option value="completed">Завершена</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Все приоритеты</option>
            <option value="critical">Критический</option>
            <option value="high">Высокий</option>
            <option value="medium">Средний</option>
            <option value="low">Низкий</option>
          </select>

          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order);
            }}
            className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="priority-desc">Приоритет (убыв.)</option>
            <option value="priority-asc">Приоритет (возр.)</option>
            <option value="created-desc">Дата создания (новые)</option>
            <option value="created-asc">Дата создания (старые)</option>
            <option value="estimated-asc">Срок выполнения (ближайшие)</option>
            <option value="estimated-desc">Срок выполнения (дальние)</option>
            <option value="location-asc">Локация (А-Я)</option>
            <option value="location-desc">Локация (Я-А)</option>
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-text-secondary">
        <span>Показано {sortedRequests.length} из {requests.length} заявок</span>
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span>Критические</span>
          </span>
          <span className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span>Высокий приоритет</span>
          </span>
          <span className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>В работе</span>
          </span>
        </div>
      </div>

      {/* Service Requests Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-text-secondary">
                <button
                  onClick={() => handleSort('machineId')}
                  className="flex items-center space-x-1 hover:text-text-primary"
                >
                  <span>Машина</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary">
                <button
                  onClick={() => handleSort('location')}
                  className="flex items-center space-x-1 hover:text-text-primary"
                >
                  <span>Локация</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary">Тип проблемы</th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary">
                <button
                  onClick={() => handleSort('priority')}
                  className="flex items-center space-x-1 hover:text-text-primary"
                >
                  <span>Приоритет</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary">Статус</th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary">Техник</th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary">
                <button
                  onClick={() => handleSort('estimated')}
                  className="flex items-center space-x-1 hover:text-text-primary"
                >
                  <span>Срок выполнения</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary">Действия</th>
            </tr>
          </thead>
          <tbody>
            {sortedRequests.map((request) => (
              <tr
                key={request.id}
                className="border-b border-border hover:bg-secondary-50 cursor-pointer transition-colors duration-200"
                onClick={() => onRequestSelect(request)}
              >
                <td className="py-4 px-4">
                  <div className="font-medium text-text-primary">{request.machineId}</div>
                  <div className="text-sm text-text-secondary">{request.id}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={14} className="text-text-secondary" />
                    <span className="text-text-primary">{request.location}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-text-primary">{request.issueType}</div>
                  <div className="text-sm text-text-secondary truncate max-w-48">
                    {request.description}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                    {getPriorityLabel(request.priority)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {getStatusLabel(request.status)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  {request.assignedTechnician ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="User" size={12} className="text-white" />
                      </div>
                      <span className="text-text-primary text-sm">{request.assignedTechnician}</span>
                    </div>
                  ) : (
                    <span className="text-text-secondary text-sm">Не назначен</span>
                  )}
                </td>
                <td className="py-4 px-4">
                  <div className="text-text-primary text-sm">
                    {formatDateTime(request.estimatedCompletion)}
                  </div>
                  <div className="text-xs text-text-secondary">
                    Создана: {formatDateTime(request.createdAt)}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Edit request:', request.id);
                      }}
                      className="p-1 rounded hover:bg-secondary-200 transition-colors duration-200"
                      title="Редактировать"
                    >
                      <Icon name="Edit" size={14} className="text-text-secondary" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('View details:', request.id);
                      }}
                      className="p-1 rounded hover:bg-secondary-200 transition-colors duration-200"
                      title="Подробности"
                    >
                      <Icon name="Eye" size={14} className="text-text-secondary" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Assign technician:', request.id);
                      }}
                      className="p-1 rounded hover:bg-secondary-200 transition-colors duration-200"
                      title="Назначить техника"
                    >
                      <Icon name="UserPlus" size={14} className="text-text-secondary" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedRequests.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary">
            {requests.length === 0 ? 'Нет сервисных заявок' : 'Нет заявок, соответствующих фильтрам'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceRequestQueue;