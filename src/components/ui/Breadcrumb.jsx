import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeLabels = {
    '/dashboard-overview': 'Панель управления',
    '/machine-fleet-management': 'Мониторинг машин',
    '/inventory-management': 'Управление запасами',
    '/sales-analytics-reporting': 'Отчеты по продажам',
    '/maintenance-service-management': 'Обслуживание',
    '/user-role-management': 'Управление пользователями',
    '/machine-configuration-settings': 'Настройки машин'
  };

  const routeGroups = {
    '/machine-fleet-management': 'Управление парком',
    '/inventory-management': 'Управление парком',
    '/maintenance-service-management': 'Управление парком',
    '/sales-analytics-reporting': 'Аналитика',
    '/user-role-management': 'Администрирование',
    '/machine-configuration-settings': 'Администрирование'
  };

  const generateBreadcrumbs = () => {
    const currentPath = location.pathname;
    const breadcrumbs = [];

    // Always start with Dashboard
    if (currentPath !== '/dashboard-overview') {
      breadcrumbs.push({
        label: 'Панель управления',
        path: '/dashboard-overview',
        isActive: false
      });
    }

    // Add group if exists
    const group = routeGroups[currentPath];
    if (group && currentPath !== '/dashboard-overview') {
      breadcrumbs.push({
        label: group,
        path: null,
        isActive: false,
        isGroup: true
      });
    }

    // Add current page
    const currentLabel = routeLabels[currentPath];
    if (currentLabel) {
      breadcrumbs.push({
        label: currentLabel,
        path: currentPath,
        isActive: true
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      <Icon name="Home" size={16} className="text-text-muted" />
      
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-text-muted" />
          )}
          
          {crumb.isActive ? (
            <span className="text-text-primary font-medium">
              {crumb.label}
            </span>
          ) : crumb.isGroup ? (
            <span className="text-text-secondary">
              {crumb.label}
            </span>
          ) : (
            <button
              onClick={() => handleNavigation(crumb.path)}
              className="text-text-secondary hover:text-primary transition-colors duration-200"
            >
              {crumb.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;