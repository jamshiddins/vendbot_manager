import React, { useState, useMemo } from 'react';
import Icon from 'components/AppIcon';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import RolePermissionMatrix from './components/RolePermissionMatrix';
import SecurityAuditTrail from './components/SecurityAuditTrail';
import BulkOperations from './components/BulkOperations';

const UserRoleManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('users');
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Mock users data
  const users = [
    {
      id: 1,
      name: "Иван Петров",
      email: "ivan.petrov@vendbot.ru",
      role: "Администратор",
      department: "IT отдел",
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "active",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      phone: "+7 (495) 123-45-67",
      location: "Москва",
      permissions: ["full_access", "user_management", "system_config"],
      createdAt: new Date(2023, 0, 15),
      loginCount: 245
    },
    {
      id: 2,
      name: "Мария Сидорова",
      email: "maria.sidorova@vendbot.ru",
      role: "Менеджер парка",
      department: "Операции",
      lastLogin: new Date(Date.now() - 30 * 60 * 1000),
      status: "active",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      phone: "+7 (495) 234-56-78",
      location: "Санкт-Петербург",
      permissions: ["machine_management", "inventory_control", "reports_view"],
      createdAt: new Date(2023, 1, 20),
      loginCount: 189
    },
    {
      id: 3,
      name: "Алексей Козлов",
      email: "alexey.kozlov@vendbot.ru",
      role: "Техник",
      department: "Обслуживание",
      lastLogin: new Date(Date.now() - 4 * 60 * 60 * 1000),
      status: "active",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      phone: "+7 (495) 345-67-89",
      location: "Екатеринбург",
      permissions: ["maintenance_access", "machine_status", "inventory_update"],
      createdAt: new Date(2023, 2, 10),
      loginCount: 156
    },
    {
      id: 4,
      name: "Елена Волкова",
      email: "elena.volkova@vendbot.ru",
      role: "Аналитик",
      department: "Финансы",
      lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: "inactive",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      phone: "+7 (495) 456-78-90",
      location: "Новосибирск",
      permissions: ["reports_full", "analytics_access", "financial_data"],
      createdAt: new Date(2023, 3, 5),
      loginCount: 98
    },
    {
      id: 5,
      name: "Дмитрий Морозов",
      email: "dmitry.morozov@vendbot.ru",
      role: "Оператор",
      department: "Операции",
      lastLogin: new Date(Date.now() - 6 * 60 * 60 * 1000),
      status: "active",
      avatar: "https://randomuser.me/api/portraits/men/72.jpg",
      phone: "+7 (495) 567-89-01",
      location: "Казань",
      permissions: ["basic_access", "machine_monitoring"],
      createdAt: new Date(2023, 4, 12),
      loginCount: 67
    }
  ];

  // Mock roles data
  const roles = [
    {
      id: 1,
      name: "Администратор",
      description: "Полный доступ ко всем функциям системы",
      userCount: 2,
      permissions: {
        "Управление пользователями": ["create", "read", "update", "delete"],
        "Управление машинами": ["create", "read", "update", "delete"],
        "Финансовые отчеты": ["create", "read", "update", "delete"],
        "Системные настройки": ["create", "read", "update", "delete"],
        "Аудит безопасности": ["create", "read", "update", "delete"]
      }
    },
    {
      id: 2,
      name: "Менеджер парка",
      description: "Управление машинами и запасами",
      userCount: 5,
      permissions: {
        "Управление пользователями": ["read"],
        "Управление машинами": ["create", "read", "update"],
        "Финансовые отчеты": ["read"],
        "Системные настройки": ["read"],
        "Аудит безопасности": ["read"]
      }
    },
    {
      id: 3,
      name: "Техник",
      description: "Обслуживание и ремонт машин",
      userCount: 12,
      permissions: {
        "Управление пользователями": [],
        "Управление машинами": ["read", "update"],
        "Финансовые отчеты": [],
        "Системные настройки": [],
        "Аудит безопасности": []
      }
    },
    {
      id: 4,
      name: "Аналитик",
      description: "Доступ к отчетам и аналитике",
      userCount: 3,
      permissions: {
        "Управление пользователями": [],
        "Управление машинами": ["read"],
        "Финансовые отчеты": ["create", "read"],
        "Системные настройки": [],
        "Аудит безопасности": ["read"]
      }
    },
    {
      id: 5,
      name: "Оператор",
      description: "Базовый мониторинг машин",
      userCount: 8,
      permissions: {
        "Управление пользователями": [],
        "Управление машинами": ["read"],
        "Финансовые отчеты": [],
        "Системные настройки": [],
        "Аудит безопасности": []
      }
    }
  ];

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      
      return matchesSearch && matchesRole && matchesStatus;
    }).sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'lastLogin') {
        aValue = aValue.getTime();
        bValue = bValue.getTime();
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [users, searchTerm, filterRole, filterStatus, sortBy, sortOrder]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsUserFormOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsUserFormOpen(true);
  };

  const handleUserFormClose = () => {
    setIsUserFormOpen(false);
    setSelectedUser(null);
  };

  const handleUserSelect = (userId, isSelected) => {
    if (isSelected) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedUsers(filteredUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const tabs = [
    { id: 'users', label: 'Пользователи', icon: 'Users' },
    { id: 'roles', label: 'Роли и права', icon: 'Shield' },
    { id: 'audit', label: 'Аудит безопасности', icon: 'FileText' }
  ];

  const uniqueRoles = [...new Set(users.map(user => user.role))];

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleSidebarToggle} isMenuOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-80' : 'lg:ml-80'} pt-16`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                Управление пользователями и ролями
              </h1>
              <p className="text-text-secondary">
                Управление доступом, учетными записями и правами безопасности
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button
                onClick={handleCreateUser}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                <Icon name="UserPlus" size={16} />
                <span>Добавить пользователя</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-200">
                <Icon name="Download" size={16} />
                <span>Экспорт</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-medium">Всего пользователей</p>
                  <p className="text-2xl font-bold text-text-primary mt-1">{users.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={24} className="text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <Icon name="TrendingUp" size={16} className="text-success mr-1" />
                <span className="text-success text-sm font-medium">+12%</span>
                <span className="text-text-muted text-sm ml-1">за месяц</span>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-medium">Активных пользователей</p>
                  <p className="text-2xl font-bold text-text-primary mt-1">
                    {users.filter(u => u.status === 'active').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <Icon name="UserCheck" size={24} className="text-success" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <Icon name="Clock" size={16} className="text-text-muted mr-1" />
                <span className="text-text-muted text-sm">Онлайн: 3</span>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-medium">Ролей в системе</p>
                  <p className="text-2xl font-bold text-text-primary mt-1">{roles.length}</p>
                </div>
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={24} className="text-accent" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <Icon name="Settings" size={16} className="text-text-muted mr-1" />
                <span className="text-text-muted text-sm">Настроено</span>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-medium">Входов сегодня</p>
                  <p className="text-2xl font-bold text-text-primary mt-1">47</p>
                </div>
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <Icon name="LogIn" size={24} className="text-secondary" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <Icon name="Activity" size={16} className="text-text-muted mr-1" />
                <span className="text-text-muted text-sm">Пик: 14:30</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-surface rounded-lg border border-border mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'users' && (
                <div>
                  {/* Search and Filters */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                      <div className="relative">
                        <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
                        <input
                          type="text"
                          placeholder="Поиск пользователей..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-64"
                        />
                      </div>
                      
                      <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="all">Все роли</option>
                        {uniqueRoles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                      
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="all">Все статусы</option>
                        <option value="active">Активные</option>
                        <option value="inactive">Неактивные</option>
                      </select>
                    </div>

                    {selectedUsers.length > 0 && (
                      <BulkOperations 
                        selectedCount={selectedUsers.length}
                        onClearSelection={() => setSelectedUsers([])}
                      />
                    )}
                  </div>

                  <UserTable
                    users={filteredUsers}
                    selectedUsers={selectedUsers}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSort={(field) => {
                      if (sortBy === field) {
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortBy(field);
                        setSortOrder('asc');
                      }
                    }}
                    onUserSelect={handleUserSelect}
                    onSelectAll={handleSelectAll}
                    onEditUser={handleEditUser}
                  />
                </div>
              )}

              {activeTab === 'roles' && (
                <RolePermissionMatrix roles={roles} />
              )}

              {activeTab === 'audit' && (
                <SecurityAuditTrail />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* User Form Modal */}
      {isUserFormOpen && (
        <UserForm
          user={selectedUser}
          roles={roles}
          onClose={handleUserFormClose}
          onSave={(userData) => {
            console.log('Save user:', userData);
            handleUserFormClose();
          }}
        />
      )}
    </div>
  );
};

export default UserRoleManagement;