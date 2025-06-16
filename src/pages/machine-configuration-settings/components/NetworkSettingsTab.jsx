import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const NetworkSettingsTab = ({ machine, onChange }) => {
  const [networkConfig, setNetworkConfig] = useState({
    connection: {
      type: 'wifi', // wifi, ethernet, cellular
      status: 'connected',
      signalStrength: 85,
      ipAddress: '192.168.1.45',
      gateway: '192.168.1.1',
      dns: '8.8.8.8',
      lastConnected: new Date(Date.now() - 5 * 60 * 1000)
    },
    wifi: {
      ssid: 'VendingNet_Main',
      password: '********',
      security: 'WPA2',
      channel: 6,
      frequency: '2.4GHz',
      autoConnect: true
    },
    ethernet: {
      enabled: false,
      dhcp: true,
      staticIp: '192.168.1.100',
      subnet: '255.255.255.0',
      gateway: '192.168.1.1'
    },
    cellular: {
      enabled: false,
      provider: 'МТС',
      apn: 'internet.mts.ru',
      signalStrength: 0,
      dataUsage: {
        current: 245, // MB
        limit: 1000 // MB
      }
    },
    firewall: {
      enabled: true,
      allowedPorts: [80, 443, 22, 8080],
      blockedIps: ['192.168.1.50'],
      intrusion: {
        detection: true,
        lastAttempt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        attempts: 3
      }
    },
    vpn: {
      enabled: false,
      server: 'vpn.vendingpro.ru',
      protocol: 'OpenVPN',
      status: 'disconnected'
    },
    monitoring: {
      pingInterval: 30, // seconds
      timeoutThreshold: 10, // seconds
      retryAttempts: 3,
      alertOnDisconnect: true
    }
  });

  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionTestResult, setConnectionTestResult] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleConfigUpdate = (section, field, value) => {
    setNetworkConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    onChange();
  };

  const handleNestedConfigUpdate = (section, subsection, field, value) => {
    setNetworkConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
      }
    }));
    onChange();
  };

  const testConnection = () => {
    setTestingConnection(true);
    setConnectionTestResult(null);
    
    // Simulate connection test
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      setConnectionTestResult({
        success,
        latency: success ? Math.floor(Math.random() * 50) + 10 : null,
        timestamp: new Date()
      });
      setTestingConnection(false);
    }, 3000);
  };

  const getConnectionStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'connecting': return 'text-warning';
      case 'disconnected': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getSignalStrengthBars = (strength) => {
    const bars = Math.ceil(strength / 25);
    return Array.from({ length: 4 }, (_, i) => (
      <div
        key={i}
        className={`w-1 bg-current ${
          i < bars ? 'opacity-100' : 'opacity-30'
        }`}
        style={{ height: `${(i + 1) * 4}px` }}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Connection Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-text-primary">Статус подключения</h3>
            <div className={`w-3 h-3 rounded-full ${
              networkConfig.connection.status === 'connected' ? 'bg-success' : 'bg-error'
            }`}></div>
          </div>
          <p className={`text-sm ${getConnectionStatusColor(networkConfig.connection.status)}`}>
            {networkConfig.connection.status === 'connected' ? 'Подключено' : 'Отключено'}
          </p>
          <p className="text-xs text-text-secondary mt-1">
            {networkConfig.connection.lastConnected.toLocaleString('ru-RU')}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-text-primary">Тип подключения</h3>
            <Icon 
              name={networkConfig.connection.type === 'wifi' ? 'Wifi' : 
                   networkConfig.connection.type === 'ethernet' ? 'Cable' : 'Smartphone'} 
              size={16} 
              className="text-primary" 
            />
          </div>
          <p className="text-sm text-text-primary capitalize">
            {networkConfig.connection.type === 'wifi' ? 'Wi-Fi' : 
             networkConfig.connection.type === 'ethernet' ? 'Ethernet' : 'Сотовая связь'}
          </p>
          <p className="text-xs text-text-secondary">
            IP: {networkConfig.connection.ipAddress}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-text-primary">Качество сигнала</h3>
            <div className={`flex items-end space-x-1 ${getConnectionStatusColor(networkConfig.connection.status)}`}>
              {getSignalStrengthBars(networkConfig.connection.signalStrength)}
            </div>
          </div>
          <p className="text-sm text-text-primary">
            {networkConfig.connection.signalStrength}%
          </p>
          <p className="text-xs text-text-secondary">
            Отличное качество
          </p>
        </div>
      </div>

      {/* Connection Test */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Тест подключения
          </h3>
          <button
            onClick={testConnection}
            disabled={testingConnection}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            type="button"
          >
            {testingConnection ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span>Тестирование...</span>
              </>
            ) : (
              <>
                <Icon name="Zap" size={16} />
                <span>Тест соединения</span>
              </>
            )}
          </button>
        </div>

        {connectionTestResult && (
          <div className={`p-3 rounded-lg ${
            connectionTestResult.success ? 'bg-success-50 border border-success-200' : 'bg-error-50 border border-error-200'
          }`}>
            <div className="flex items-center space-x-2">
              <Icon 
                name={connectionTestResult.success ? "CheckCircle" : "XCircle"} 
                size={16} 
                className={connectionTestResult.success ? 'text-success' : 'text-error'} 
              />
              <span className={`font-medium ${connectionTestResult.success ? 'text-success' : 'text-error'}`}>
                {connectionTestResult.success ? 'Соединение успешно' : 'Ошибка соединения'}
              </span>
            </div>
            {connectionTestResult.success && (
              <p className="text-sm text-text-secondary mt-1">
                Задержка: {connectionTestResult.latency}мс
              </p>
            )}
          </div>
        )}
      </div>

      {/* Wi-Fi Settings */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Настройки Wi-Fi
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Сеть (SSID)
              </label>
              <input
                type="text"
                value={networkConfig.wifi.ssid}
                onChange={(e) => handleConfigUpdate('wifi', 'ssid', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Пароль
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={networkConfig.wifi.password}
                  onChange={(e) => handleConfigUpdate('wifi', 'password', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                >
                  <Icon name="Eye" size={16} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Тип безопасности
              </label>
              <select
                value={networkConfig.wifi.security}
                onChange={(e) => handleConfigUpdate('wifi', 'security', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="WPA2">WPA2</option>
                <option value="WPA3">WPA3</option>
                <option value="WEP">WEP</option>
                <option value="Open">Открытая</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-text-primary">
                Автоподключение
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={networkConfig.wifi.autoConnect}
                  onChange={(e) => handleConfigUpdate('wifi', 'autoConnect', e.target.checked)}
                  className="sr-only"
                />
                <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  networkConfig.wifi.autoConnect ? 'bg-success' : 'bg-secondary-300'
                }`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    networkConfig.wifi.autoConnect ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Канал
              </label>
              <select
                value={networkConfig.wifi.channel}
                onChange={(e) => handleConfigUpdate('wifi', 'channel', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {Array.from({ length: 11 }, (_, i) => i + 1).map(channel => (
                  <option key={channel} value={channel}>Канал {channel}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Частота
              </label>
              <select
                value={networkConfig.wifi.frequency}
                onChange={(e) => handleConfigUpdate('wifi', 'frequency', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="2.4GHz">2.4 ГГц</option>
                <option value="5GHz">5 ГГц</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Расширенные настройки
          </h3>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2 text-primary hover:text-primary-700 transition-colors duration-200"
            type="button"
          >
            <Icon name={showAdvanced ? "ChevronUp" : "ChevronDown"} size={16} />
            <span>{showAdvanced ? 'Скрыть' : 'Показать'}</span>
          </button>
        </div>

        {showAdvanced && (
          <div className="space-y-6">
            {/* Firewall Settings */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Настройки брандмауэра</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-primary">
                    Включить брандмауэр
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={networkConfig.firewall.enabled}
                      onChange={(e) => handleConfigUpdate('firewall', 'enabled', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      networkConfig.firewall.enabled ? 'bg-success' : 'bg-secondary-300'
                    }`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        networkConfig.firewall.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Разрешенные порты
                  </label>
                  <input
                    type="text"
                    value={networkConfig.firewall.allowedPorts.join(', ')}
                    onChange={(e) => handleConfigUpdate('firewall', 'allowedPorts', 
                      e.target.value.split(',').map(p => parseInt(p.trim())).filter(p => !isNaN(p))
                    )}
                    placeholder="80, 443, 22"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Monitoring Settings */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Мониторинг соединения</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Интервал пинга (сек)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="300"
                    value={networkConfig.monitoring.pingInterval}
                    onChange={(e) => handleConfigUpdate('monitoring', 'pingInterval', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Таймаут (сек)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="60"
                    value={networkConfig.monitoring.timeoutThreshold}
                    onChange={(e) => handleConfigUpdate('monitoring', 'timeoutThreshold', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Попытки повтора
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={networkConfig.monitoring.retryAttempts}
                    onChange={(e) => handleConfigUpdate('monitoring', 'retryAttempts', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* VPN Settings */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Настройки VPN</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-primary">
                    Включить VPN
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={networkConfig.vpn.enabled}
                      onChange={(e) => handleConfigUpdate('vpn', 'enabled', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      networkConfig.vpn.enabled ? 'bg-success' : 'bg-secondary-300'
                    }`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        networkConfig.vpn.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </div>
                  </label>
                </div>

                {networkConfig.vpn.enabled && (
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      VPN сервер
                    </label>
                    <input
                      type="text"
                      value={networkConfig.vpn.server}
                      onChange={(e) => handleConfigUpdate('vpn', 'server', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Network Statistics */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Статистика сети
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-secondary-50 rounded-lg">
            <Icon name="Download" size={20} className="text-primary mx-auto mb-2" />
            <p className="text-sm font-medium text-text-primary">1.2 ГБ</p>
            <p className="text-xs text-text-secondary">Загружено</p>
          </div>
          
          <div className="text-center p-3 bg-secondary-50 rounded-lg">
            <Icon name="Upload" size={20} className="text-primary mx-auto mb-2" />
            <p className="text-sm font-medium text-text-primary">345 МБ</p>
            <p className="text-xs text-text-secondary">Отправлено</p>
          </div>
          
          <div className="text-center p-3 bg-secondary-50 rounded-lg">
            <Icon name="Clock" size={20} className="text-primary mx-auto mb-2" />
            <p className="text-sm font-medium text-text-primary">99.8%</p>
            <p className="text-xs text-text-secondary">Время работы</p>
          </div>
          
          <div className="text-center p-3 bg-secondary-50 rounded-lg">
            <Icon name="Zap" size={20} className="text-primary mx-auto mb-2" />
            <p className="text-sm font-medium text-text-primary">25 мс</p>
            <p className="text-xs text-text-secondary">Средняя задержка</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkSettingsTab;