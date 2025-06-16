// src/pages/operator-mobile-dashboard/components/NavigationMap.jsx
import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const NavigationMap = ({ currentLocation, destination, isLoadingLocation }) => {
  const [route, setRoute] = useState(null);
  const [trafficInfo, setTrafficInfo] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  // Mock route data
  useEffect(() => {
    if (currentLocation && destination) {
      // Simulate route calculation
      setTimeout(() => {
        setRoute({
          distance: '2.3 км',
          duration: '8 мин',
          traffic: 'light',
          waypoints: [
            { lat: currentLocation.lat, lng: currentLocation.lng, name: 'Текущее местоположение' },
            { lat: currentLocation.lat + 0.01, lng: currentLocation.lng + 0.01, name: 'Поворот направо' },
            { lat: currentLocation.lat + 0.02, lng: currentLocation.lng + 0.015, name: destination.location }
          ]
        });
        
        setTrafficInfo({
          level: 'light',
          incidents: [],
          alternativeRoutes: 2
        });
      }, 1000);
    }
  }, [currentLocation, destination]);

  const getTrafficColor = (level) => {
    switch (level) {
      case 'heavy': return 'text-error';
      case 'moderate': return 'text-warning';
      case 'light': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getTrafficLabel = (level) => {
    switch (level) {
      case 'heavy': return 'Плотный трафик';
      case 'moderate': return 'Умеренный трафик';
      case 'light': return 'Свободная дорога';
      default: return 'Неизвестно';
    }
  };

  const handleStartNavigation = () => {
    setIsNavigating(true);
    // In a real app, this would open the device's navigation app
    const address = encodeURIComponent(destination?.address || destination?.location);
    const mapsUrl = `https://maps.google.com/maps?daddr=${address}`;
    
    if (window.confirm('Открыть навигацию в картах?')) {
      window.open(mapsUrl, '_blank');
    }
  };

  if (isLoadingLocation) {
    return (
      <div className="h-full flex items-center justify-center bg-secondary-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Определение местоположения...</p>
        </div>
      </div>
    );
  }

  if (!currentLocation) {
    return (
      <div className="h-full flex items-center justify-center bg-secondary-50 p-4">
        <div className="text-center max-w-sm">
          <Icon name="MapPin" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            Местоположение недоступно
          </h3>
          <p className="text-text-secondary mb-4">
            Разрешите доступ к геолокации для использования навигации
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Map Placeholder */}
      <div className="flex-1 bg-secondary-100 relative overflow-hidden">
        {/* Mock Map Interface */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
          {/* Current Location Marker */}
          <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
              Вы здесь
            </div>
          </div>
          
          {/* Destination Marker */}
          <div className="absolute bottom-1/3 right-1/3 transform translate-x-1/2 translate-y-1/2">
            <div className="w-6 h-6 bg-error rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              <Icon name="MapPin" size={12} className="text-white" />
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
              {destination?.machineId}
            </div>
          </div>
          
          {/* Mock Route Line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d="M 33% 66% Q 50% 50% 66% 33%"
              stroke="#1E40AF"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
          </svg>
        </div>
        
        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-secondary-50 transition-colors">
            <Icon name="Plus" size={20} className="text-text-primary" />
          </button>
          <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-secondary-50 transition-colors">
            <Icon name="Minus" size={20} className="text-text-primary" />
          </button>
          <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-secondary-50 transition-colors">
            <Icon name="Navigation" size={20} className="text-text-primary" />
          </button>
        </div>
      </div>
      
      {/* Route Information */}
      <div className="bg-surface border-t border-border p-4 space-y-4">
        {route ? (
          <>
            {/* Route Summary */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-text-primary">{route.duration}</p>
                  <p className="text-xs text-text-secondary">Время в пути</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-text-primary">{route.distance}</p>
                  <p className="text-xs text-text-secondary">Расстояние</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`flex items-center space-x-1 ${getTrafficColor(route.traffic)}`}>
                  <Icon name="Activity" size={16} />
                  <span className="text-sm font-medium">
                    {getTrafficLabel(route.traffic)}
                  </span>
                </div>
                {trafficInfo?.alternativeRoutes > 0 && (
                  <p className="text-xs text-text-secondary mt-1">
                    +{trafficInfo.alternativeRoutes} альтернативных маршрута
                  </p>
                )}
              </div>
            </div>
            
            {/* Destination Info */}
            <div className="bg-secondary-50 rounded-lg p-3">
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={16} className="text-primary mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">
                    {destination?.location}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {destination?.address}
                  </p>
                  <p className="text-xs text-text-muted mt-1">
                    Машина: {destination?.machineId}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Navigation Button */}
            <button
              onClick={handleStartNavigation}
              disabled={isNavigating}
              className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Icon name="Navigation" size={20} />
              <span>
                {isNavigating ? 'Навигация запущена' : 'Начать навигацию'}
              </span>
            </button>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-text-secondary">Построение маршрута...</p>
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
          <button className="flex flex-col items-center space-y-1 p-2 hover:bg-secondary-100 rounded-lg transition-colors">
            <Icon name="Phone" size={16} className="text-text-secondary" />
            <span className="text-xs text-text-secondary">Позвонить</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1 p-2 hover:bg-secondary-100 rounded-lg transition-colors">
            <Icon name="MessageSquare" size={16} className="text-text-secondary" />
            <span className="text-xs text-text-secondary">Сообщение</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1 p-2 hover:bg-secondary-100 rounded-lg transition-colors">
            <Icon name="Share" size={16} className="text-text-secondary" />
            <span className="text-xs text-text-secondary">Поделиться</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationMap;