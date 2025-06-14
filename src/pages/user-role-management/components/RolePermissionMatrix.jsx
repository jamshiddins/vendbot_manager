import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const RolePermissionMatrix = ({ roles }) => {
  const [expandedRoles, setExpandedRoles] = useState({});
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);

  const permissionModules = [
    {
      name: 'Управление пользователями',
      permissions: ['create', 'read', 'update', 'delete'],
      icon: 'Users',
      description: 'Создание, просмотр, редактирование и удаление пользователей'
    },
    {
      name: 'Управление машинами',
      permissions: ['create', 'read', 'update', 'delete'],
      icon: 'Monitor',
      description: 'Управление торговыми автоматами и их настройками'
    },
    {
      name: 'Финансовые отчеты',
      permissions: ['create', 'read', 'update', 'delete'],
      icon: 'DollarSign',
      description: 'Доступ к финансовой отчетности и аналитике'
    },
    {
      name: 'Системные настройки',
      permissions: ['create', 'read', 'update', 'delete'],
      icon: 'Settings',
      description: 'Конфигурация системы и глобальные настройки'
    },
    {
      name: 'Аудит безопасности',
      permissions: ['create', 'read', 'update', 'delete'],
      icon: 'Shield',
      description: 'Журналы безопасности и мониторинг доступа'
    }
  ];

  const permissionLabels = {
    create: 'Создание',
    read: 'Просмотр',
    update: 'Редактирование',
    delete: 'Удаление'
  };

  const getPermissionColor = (permission) => {
    switch (permission) {
      case 'create': return 'text-success';
      case 'read': return 'text-primary';
      case 'update': return 'text-warning';
      case 'delete': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const toggleRoleExpansion = (roleId) => {
    setExpandedRoles(prev => ({
      ...prev,
      [roleId]: !prev[roleId]
    }));
  };

  const getRoleColor = (roleName) => {
    switch (roleName) {
      case 'Администратор': return 'bg-error-100 text-error border-error-200';
      case 'Менеджер парка': return 'bg-primary-100 text-primary border-primary-200';
      case 'Техник': return 'bg-warning-100 text-warning border-warning-200';
      case 'Аналитик': return 'bg-accent-100 text-accent border-accent-200';
      case 'Оператор': return 'bg-secondary-100 text-text-secondary border-secondary-200';
      default: return 'bg-secondary-100 text-text-secondary border-secondary-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Матрица ролей и разрешений
          </h3>
          <p className="text-text-secondary text-sm mt-1">
            Управление правами доступа для различных ролей пользователей
          </p>
        </div>
        
        <button
          onClick={() => setIsCreateRoleOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          <Icon name="Plus" size={16} />
          <span>Создать роль</span>
        </button>
      </div>

      {/* Permission Matrix Table */}
      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Модуль системы
                </th>
                {roles.map(role => (
                  <th key={role.id} className="px-4 py-4 text-center text-xs font-medium text-text-secondary uppercase tracking-wider min-w-32">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(role.name)}`}>
                      {role.name}
                    </div>
                    <div className="text-xs text-text-muted mt-1">
                      {role.userCount} польз.
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-border">
              {permissionModules.map((module, moduleIndex) => (
                <tr key={moduleIndex} className="hover:bg-secondary-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Icon name={module.icon} size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">{module.name}</div>
                        <div className="text-sm text-text-secondary">{module.description}</div>
                      </div>
                    </div>
                  </td>
                  {roles.map(role => (
                    <td key={role.id} className="px-4 py-4 text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {module.permissions.map(permission => {
                          const hasPermission = role.permissions[module.name]?.includes(permission);
                          return (
                            <div
                              key={permission}
                              className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                                hasPermission
                                  ? `bg-${permission === 'create' ? 'success' : permission === 'read' ? 'primary' : permission === 'update' ? 'warning' : 'error'}-100 ${getPermissionColor(permission)}`
                                  : 'bg-secondary-100 text-text-muted'
                              }`}
                              title={permissionLabels[permission]}
                            >
                              {hasPermission ? (
                                <Icon name="Check" size={12} />
                              ) : (
                                <Icon name="X" size={12} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Details Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {roles.map(role => (
          <div key={role.id} className="bg-surface rounded-lg border border-border overflow-hidden">
            <div 
              className="p-4 cursor-pointer hover:bg-secondary-50 transition-colors duration-200"
              onClick={() => toggleRoleExpansion(role.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(role.name)}`}>
                    {role.name}
                  </div>
                  <span className="text-sm text-text-secondary">
                    {role.userCount} пользователей
                  </span>
                </div>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`text-text-secondary transition-transform duration-200 ${
                    expandedRoles[role.id] ? 'rotate-180' : ''
                  }`} 
                />
              </div>
              <p className="text-sm text-text-secondary mt-2">{role.description}</p>
            </div>

            {expandedRoles[role.id] && (
              <div className="border-t border-border p-4 bg-secondary-50">
                <h4 className="font-medium text-text-primary mb-3">Детальные разрешения:</h4>
                <div className="space-y-3">
                  {Object.entries(role.permissions).map(([moduleName, permissions]) => (
                    <div key={moduleName} className="flex items-center justify-between">
                      <span className="text-sm text-text-primary">{moduleName}</span>
                      <div className="flex space-x-1">
                        {['create', 'read', 'update', 'delete'].map(permission => (
                          <div
                            key={permission}
                            className={`w-6 h-6 rounded flex items-center justify-center text-xs ${
                              permissions.includes(permission)
                                ? `bg-${permission === 'create' ? 'success' : permission === 'read' ? 'primary' : permission === 'update' ? 'warning' : 'error'}-100 ${getPermissionColor(permission)}`
                                : 'bg-secondary-200 text-text-muted'
                            }`}
                            title={permissionLabels[permission]}
                          >
                            {permissions.includes(permission) ? (
                              <Icon name="Check" size={12} />
                            ) : (
                              <Icon name="X" size={12} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center space-x-2 mt-4 pt-3 border-t border-border">
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary hover:bg-primary-50 rounded transition-colors duration-200">
                    <Icon name="Edit" size={14} />
                    <span>Редактировать</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm text-text-secondary hover:bg-secondary-100 rounded transition-colors duration-200">
                    <Icon name="Copy" size={14} />
                    <span>Дублировать</span>
                  </button>
                  {role.userCount === 0 && (
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm text-error hover:bg-error-50 rounded transition-colors duration-200">
                      <Icon name="Trash2" size={14} />
                      <span>Удалить</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="bg-secondary-50 rounded-lg p-4">
        <h4 className="font-medium text-text-primary mb-3">Обозначения разрешений:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(permissionLabels).map(([key, label]) => (
            <div key={key} className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded flex items-center justify-center bg-${key === 'create' ? 'success' : key === 'read' ? 'primary' : key === 'update' ? 'warning' : 'error'}-100 ${getPermissionColor(key)}`}>
                <Icon name="Check" size={10} />
              </div>
              <span className="text-sm text-text-primary">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RolePermissionMatrix;