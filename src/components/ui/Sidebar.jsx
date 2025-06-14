import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedGroups, setExpandedGroups] = useState({
    'fleet-operations': true,
    'analytics': true,
    'administration': true
  });

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Панель управления',
      path: '/dashboard-overview',
      icon: 'LayoutDashboard',
      group: null
    },
    {
      id: 'fleet-operations',
      label: 'Управление парком',
      icon: 'Truck',
      group: 'fleet-operations',
      isGroup: true,
      children: [
        {
          id: 'fleet-management',
          label: 'Мониторинг машин',
          path: '/machine-fleet-management',
          icon: 'Monitor'
        },
        {
          id: 'inventory',
          label: 'Управление запасами',
          path: '/inventory-management',
          icon: 'Package'
        },
        {
          id: 'maintenance',
          label: 'Обслуживание',
          path: '/maintenance-service-management',
          icon: 'Wrench'
        }
      ]
    },
    {
      id: 'analytics',
      label: 'Аналитика',
      icon: 'BarChart3',
      group: 'analytics',
      isGroup: true,
      children: [
        {
          id: 'sales-analytics',
          label: 'Отчеты по продажам',
          path: '/sales-analytics-reporting',
          icon: 'TrendingUp'
        }
      ]
    },
    {
      id: 'administration',
      label: 'Администрирование',
      icon: 'Settings',
      group: 'administration',
      isGroup: true,
      children: [
        {
          id: 'user-management',
          label: 'Управление пользователями',
          path: '/user-role-management',
          icon: 'Users'
        },
        {
          id: 'machine-config',
          label: 'Настройки машин',
          path: '/machine-configuration-settings',
          icon: 'Cog'
        }
      ]
    }
  ];

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const renderNavItem = (item, isChild = false) => {
    if (item.isGroup) {
      const isExpanded = expandedGroups[item.group];
      return (
        <div key={item.id} className="mb-1">
          <button
            onClick={() => toggleGroup(item.group)}
            className="w-full flex items-center justify-between px-3 py-2 text-left text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-all duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <Icon 
                name={item.icon} 
                size={18} 
                className="text-text-secondary group-hover:text-text-primary transition-colors duration-200" 
              />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`text-text-secondary transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`} 
            />
          </button>
          
          {isExpanded && (
            <div className="ml-6 mt-1 space-y-1 border-l border-border pl-4">
              {item.children.map(child => renderNavItem(child, true))}
            </div>
          )}
        </div>
      );
    }

    const isActive = isActiveRoute(item.path);
    
    return (
      <button
        key={item.id}
        onClick={() => handleNavigation(item.path)}
        className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-all duration-200 group ${
          isActive
            ? 'bg-primary text-white shadow-sm'
            : 'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
        } ${isChild ? 'text-sm' : ''}`}
      >
        <Icon 
          name={item.icon} 
          size={isChild ? 16 : 18} 
          className={`transition-colors duration-200 ${
            isActive 
              ? 'text-white' :'text-text-secondary group-hover:text-text-primary'
          }`} 
        />
        <span className={`font-medium ${isChild ? 'text-sm' : ''}`}>
          {item.label}
        </span>
        {isActive && (
          <div className="ml-auto w-1 h-1 bg-white rounded-full"></div>
        )}
      </button>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-250 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-surface border-r border-border z-100
        w-80 transform transition-transform duration-300 ease-out-custom
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:fixed
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary">
                  VendingPro
                </h2>
                <p className="text-xs text-text-secondary">
                  Управление парком
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
              aria-label="Close sidebar"
            >
              <Icon name="X" size={18} className="text-text-secondary" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-2">
              {navigationItems.map(item => renderNavItem(item))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <Icon name="Wifi" size={14} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">
                  Система активна
                </p>
                <p className="text-xs text-text-secondary">
                  Все сервисы работают
                </p>
              </div>
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            </div>
            
            <div className="mt-3 text-center">
              <p className="text-xs text-text-muted">
                VendingPro v2.1.0
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;