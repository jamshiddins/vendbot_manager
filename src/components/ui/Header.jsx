import React, { useState } from 'react';
import Icon from '../AppIcon';

const Header = ({ onMenuToggle, isMenuOpen }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications] = useState([
    {
      id: 1,
      type: 'error',
      title: 'Машина VM-001 не отвечает',
      message: 'Потеря связи более 5 минут',
      time: '2 мин назад',
      unread: true
    },
    {
      id: 2,
      type: 'warning',
      title: 'Низкий уровень запасов',
      message: 'Кока-Кола в машине VM-015',
      time: '15 мин назад',
      unread: true
    },
    {
      id: 3,
      type: 'success',
      title: 'Обслуживание завершено',
      message: 'Машина VM-008 готова к работе',
      time: '1 час назад',
      unread: false
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationOpen(false);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'error': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'success': return 'CheckCircle';
      default: return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'success': return 'text-success';
      default: return 'text-primary';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-200 h-16">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <Icon 
              name={isMenuOpen ? "X" : "Menu"} 
              size={20} 
              className="text-text-primary"
            />
          </button>
          
          <div className="hidden lg:block">
            <h1 className="text-lg font-heading font-semibold text-text-primary">
              Управление Торговыми Автоматами
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="hidden md:flex items-center bg-secondary-50 rounded-lg px-3 py-2 min-w-64">
            <Icon name="Search" size={16} className="text-text-secondary mr-2" />
            <input
              type="text"
              placeholder="Поиск машин, локаций..."
              className="bg-transparent border-none outline-none text-sm text-text-primary placeholder-text-secondary flex-1"
            />
          </div>

          {/* Quick Actions */}
          <button className="hidden md:flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            <Icon name="Plus" size={16} />
            <span className="text-sm font-medium">Добавить</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className="relative p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
              aria-label="Notifications"
            >
              <Icon name="Bell" size={20} className="text-text-primary" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-surface rounded-lg shadow-lg border border-border z-300">
                <div className="p-4 border-b border-border">
                  <h3 className="font-heading font-semibold text-text-primary">Уведомления</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-border hover:bg-secondary-50 cursor-pointer transition-colors duration-200 ${
                        notification.unread ? 'bg-primary-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon
                          name={getNotificationIcon(notification.type)}
                          size={16}
                          className={`mt-1 ${getNotificationColor(notification.type)}`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary truncate">
                            {notification.title}
                          </p>
                          <p className="text-sm text-text-secondary mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-text-muted mt-2">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border">
                  <button className="w-full text-center text-sm text-primary hover:text-primary-700 font-medium">
                    Показать все уведомления
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={handleProfileClick}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
              aria-label="User profile"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-text-primary">Иван Петров</p>
                <p className="text-xs text-text-secondary">Администратор</p>
              </div>
              <Icon name="ChevronDown" size={16} className="text-text-secondary" />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface rounded-lg shadow-lg border border-border z-300">
                <div className="p-2">
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-secondary-100 rounded-lg transition-colors duration-200">
                    <Icon name="User" size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">Профиль</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-secondary-100 rounded-lg transition-colors duration-200">
                    <Icon name="Settings" size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">Настройки</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-secondary-100 rounded-lg transition-colors duration-200">
                    <Icon name="HelpCircle" size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">Помощь</span>
                  </button>
                  <hr className="my-2 border-border" />
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-error-50 rounded-lg transition-colors duration-200 text-error">
                    <Icon name="LogOut" size={16} />
                    <span className="text-sm">Выйти</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;