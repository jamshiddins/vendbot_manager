import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different user types
  const mockCredentials = [
    {
      email: 'admin@vendbot.ru',
      password: 'admin123',
      role: 'Администратор',
      name: 'Иван Петров'
    },
    {
      email: 'operator@vendbot.ru',
      password: 'operator123',
      role: 'Оператор',
      name: 'Мария Сидорова'
    },
    {
      email: 'technician@vendbot.ru',
      password: 'tech123',
      role: 'Техник',
      name: 'Алексей Козлов'
    }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Введите адрес электронной почты';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный адрес электронной почты';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Введите пароль';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check credentials
      const user = mockCredentials.find(
        cred => cred.email === formData.email && cred.password === formData.password
      );

      if (user) {
        // Store user data in localStorage (in real app, use secure token storage)
        localStorage.setItem('vendbot_user', JSON.stringify({
          email: user.email,
          role: user.role,
          name: user.name,
          loginTime: new Date().toISOString()
        }));

        // Redirect to dashboard
        navigate('/dashboard-overview');
      } else {
        setErrors({
          general: 'Неверный адрес электронной почты или пароль. Проверьте введенные данные и попробуйте снова.'
        });
      }
    } catch (error) {
      setErrors({
        general: 'Произошла ошибка при входе в систему. Попробуйте позже.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Функция восстановления пароля будет доступна в следующей версии системы.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex items-center justify-center px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-accent rounded-full"></div>
        <div className="absolute bottom-32 left-32 w-28 h-28 bg-secondary rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-primary rounded-full"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-surface rounded-2xl shadow-lg border border-border p-8">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <Icon name="Zap" size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
              VendBot Manager
            </h1>
            <p className="text-text-secondary">
              Система управления торговыми автоматами
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="bg-error-50 border border-error-200 rounded-lg p-4 flex items-start space-x-3">
                <Icon name="AlertCircle" size={20} className="text-error mt-0.5" />
                <p className="text-sm text-error">{errors.general}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                Адрес электронной почты
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Mail" size={20} className="text-text-secondary" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 ${
                    errors.email 
                      ? 'border-error bg-error-50' :'border-border bg-surface hover:border-secondary-300'
                  }`}
                  placeholder="example@vendbot.ru"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-error flex items-center space-x-1">
                  <Icon name="AlertCircle" size={16} />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                Пароль
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Lock" size={20} className="text-text-secondary" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 ${
                    errors.password 
                      ? 'border-error bg-error-50' :'border-border bg-surface hover:border-secondary-300'
                  }`}
                  placeholder="Введите пароль"
                  autoComplete="current-password"
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-error flex items-center space-x-1">
                  <Icon name="AlertCircle" size={16} />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-sm text-text-secondary">Запомнить меня</span>
              </label>
              
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-primary hover:text-primary-700 transition-colors duration-200"
              >
                Забыли пароль?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Вход в систему...</span>
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={20} />
                  <span>Войти в систему</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-text-muted text-center mb-3">
              Демонстрационные учетные данные:
            </p>
            <div className="space-y-2 text-xs">
              <div className="bg-secondary-50 rounded-lg p-3">
                <p className="font-medium text-text-primary">Администратор:</p>
                <p className="text-text-secondary">admin@vendbot.ru / admin123</p>
              </div>
              <div className="bg-secondary-50 rounded-lg p-3">
                <p className="font-medium text-text-primary">Оператор:</p>
                <p className="text-text-secondary">operator@vendbot.ru / operator123</p>
              </div>
              <div className="bg-secondary-50 rounded-lg p-3">
                <p className="font-medium text-text-primary">Техник:</p>
                <p className="text-text-secondary">technician@vendbot.ru / tech123</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} VendBot Manager. Все права защищены.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;