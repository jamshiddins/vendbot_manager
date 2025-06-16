// src/pages/user-role-management/components/UserTable.jsx
import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const UserTable = ({
  users,
  selectedUsers,
  sortBy,
  sortOrder,
  onSort,
  onUserSelect,
  onSelectAll,
  onEditUser
}) => {
  const formatLastLogin = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} мин назад`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} ч назад`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} дн назад`;
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return 'ArrowUpDown';
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success">
            <div className="w-1.5 h-1.5 bg-success rounded-full mr-1"></div>
            Активен
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-text-secondary">
            <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-1"></div>
            Неактивен
          </span>
        );
      default:
        return null;
    }
  };

  const getRoleBadge = (role) => {
    // Define unique colors for each role to fix the "same role display" issue
    const roleConfig = {
      'Администратор': { 
        color: 'bg-red-100 text-red-800 border border-red-200', 
        icon: 'Shield' 
      },
      'Менеджер парка': { 
        color: 'bg-blue-100 text-blue-800 border border-blue-200', 
        icon: 'Users' 
      },
      'Техник': { 
        color: 'bg-yellow-100 text-yellow-800 border border-yellow-200', 
        icon: 'Wrench' 
      },
      'Аналитик': { 
        color: 'bg-purple-100 text-purple-800 border border-purple-200', 
        icon: 'BarChart3' 
      },
      'Оператор': { 
        color: 'bg-green-100 text-green-800 border border-green-200', 
        icon: 'Monitor' 
      }
    };

    const config = roleConfig[role] || { 
      color: 'bg-gray-100 text-gray-800 border border-gray-200', 
      icon: 'User' 
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon name={config.icon} size={12} className="mr-1" />
        {role}
      </span>
    );
  };

  const allSelected = users.length > 0 && selectedUsers.length === users.length;
  const someSelected = selectedUsers.length > 0 && selectedUsers.length < users.length;

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-secondary-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={input => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </th>
              
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary transition-colors duration-200"
                onClick={() => onSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Пользователь</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </div>
              </th>
              
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary transition-colors duration-200"
                onClick={() => onSort('role')}
              >
                <div className="flex items-center space-x-1">
                  <span>Роль</span>
                  <Icon name={getSortIcon('role')} size={14} />
                </div>
              </th>
              
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary transition-colors duration-200"
                onClick={() => onSort('department')}
              >
                <div className="flex items-center space-x-1">
                  <span>Отдел</span>
                  <Icon name={getSortIcon('department')} size={14} />
                </div>
              </th>
              
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary transition-colors duration-200"
                onClick={() => onSort('lastLogin')}
              >
                <div className="flex items-center space-x-1">
                  <span>Последний вход</span>
                  <Icon name={getSortIcon('lastLogin')} size={14} />
                </div>
              </th>
              
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary transition-colors duration-200"
                onClick={() => onSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>Статус</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </div>
              </th>
              
              <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          
          <tbody className="bg-surface divide-y divide-border">
            {users.map((user) => (
              <tr 
                key={user.id} 
                className={`hover:bg-secondary-50 transition-colors duration-200 ${
                  selectedUsers.includes(user.id) ? 'bg-primary-50' : ''
                }`}
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => onUserSelect(user.id, e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-text-primary">
                        {user.name}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  {getRoleBadge(user.role)}
                </td>
                
                <td className="px-6 py-4">
                  <div className="text-sm text-text-primary">{user.department}</div>
                  <div className="text-sm text-text-secondary flex items-center">
                    <Icon name="MapPin" size={12} className="mr-1" />
                    {user.location}
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="text-sm text-text-primary">
                    {formatLastLogin(user.lastLogin)}
                  </div>
                  <div className="text-sm text-text-secondary">
                    Входов: {user.loginCount}
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  {getStatusBadge(user.status)}
                </td>
                
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onEditUser(user)}
                      className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200"
                      title="Редактировать пользователя"
                    >
                      <Icon name="Edit" size={16} />
                    </button>
                    
                    <button
                      className="p-2 text-text-secondary hover:text-accent hover:bg-accent-50 rounded-lg transition-colors duration-200"
                      title="Сбросить пароль"
                    >
                      <Icon name="Key" size={16} />
                    </button>
                    
                    <button
                      className="p-2 text-text-secondary hover:text-error hover:bg-error-50 rounded-lg transition-colors duration-200"
                      title="Заблокировать пользователя"
                    >
                      <Icon name="UserX" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {users.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary">Пользователи не найдены</p>
        </div>
      )}
    </div>
  );
};

export default UserTable;