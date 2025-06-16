// src/pages/comprehensive-testing-validation-center/components/AutomatedRegression.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AutomatedRegression = ({ regressionData }) => {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [scheduleSettings, setScheduleSettings] = useState({
    frequency: 'daily',
    time: '02:00',
    enabled: true
  });

  const formatRelativeTime = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  const formatFutureTime = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((date - now) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((date - now) / (1000 * 60));
      return `in ${diffInMinutes} minutes`;
    } else if (diffInHours < 24) {
      return `in ${diffInHours} hours`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `in ${diffInDays} days`;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'passed': return 'text-success';
      case 'failed': return 'text-error';
      case 'warning': return 'text-warning';
      case 'running': return 'text-primary';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'passed': return 'CheckCircle';
      case 'failed': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      case 'running': return 'Loader2';
      default: return 'Circle';
    }
  };

  const runRegressionTests = () => {
    // Simulate running regression tests
    console.log('Running automated regression tests...');
  };

  const updateSchedule = () => {
    setIsSchedulerOpen(false);
    // Handle schedule update logic here
    console.log('Updated schedule:', scheduleSettings);
  };

  const successRate = regressionData.totalSuites > 0 
    ? Math.round((regressionData.passedSuites / regressionData.totalSuites) * 100)
    : 0;

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Automated Regression
          </h3>
          <div className={`text-lg font-bold ${
            successRate >= 90 ? 'text-success' :
            successRate >= 70 ? 'text-warning': 'text-error'
          }`}>
            {successRate}%
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            {regressionData.passedSuites}/{regressionData.totalSuites} suites passing
          </div>
          <button
            onClick={runRegressionTests}
            className="flex items-center space-x-2 px-3 py-1.5 bg-primary text-white text-sm rounded hover:bg-primary-700 transition-colors duration-200"
          >
            <Icon name="Play" size={14} />
            <span>Run Now</span>
          </button>
        </div>
      </div>

      {/* Schedule Info */}
      <div className="p-4 border-b border-border">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Last Run</span>
            <span className="text-text-primary">
              {formatRelativeTime(regressionData.lastRun)}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Next Scheduled</span>
            <span className="text-text-primary">
              {formatFutureTime(regressionData.nextScheduled)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Auto Schedule</span>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                scheduleSettings.enabled ? 'bg-success animate-pulse' : 'bg-text-muted'
              }`}></div>
              <button
                onClick={() => setIsSchedulerOpen(true)}
                className="text-sm text-primary hover:text-primary-700 transition-colors duration-200"
              >
                Configure
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Test Suites Results */}
      <div className="p-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">Recent Test Suites</h4>
        
        <div className="space-y-2">
          {regressionData.recentResults.map((suite, index) => {
            return (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-secondary-50 rounded transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={getStatusIcon(suite.status)} 
                    size={14} 
                    className={getStatusColor(suite.status)}
                  />
                  <span className="text-sm text-text-primary">{suite.suite}</span>
                </div>
                <div className="text-xs text-text-muted">
                  {suite.duration}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Coverage and Statistics */}
      <div className="p-4 border-t border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">Test Coverage</h4>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-secondary-50 p-3 rounded">
            <div className="text-xs text-text-secondary mb-1">Code Coverage</div>
            <div className="text-sm font-medium text-text-primary mb-2">87.5%</div>
            <div className="w-full bg-secondary-100 rounded-full h-1.5">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: '87.5%' }} />
            </div>
          </div>
          
          <div className="bg-secondary-50 p-3 rounded">
            <div className="text-xs text-text-secondary mb-1">Branch Coverage</div>
            <div className="text-sm font-medium text-text-primary mb-2">92.3%</div>
            <div className="w-full bg-secondary-100 rounded-full h-1.5">
              <div className="bg-success h-1.5 rounded-full" style={{ width: '92.3%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Alert Notifications */}
      <div className="p-4 border-t border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">Alert Settings</h4>
        
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm">
            <input 
              type="checkbox" 
              defaultChecked 
              className="text-primary focus:ring-primary-200"
            />
            <span className="text-text-primary">Email on test failures</span>
          </label>
          
          <label className="flex items-center space-x-2 text-sm">
            <input 
              type="checkbox" 
              defaultChecked 
              className="text-primary focus:ring-primary-200"
            />
            <span className="text-text-primary">Slack notifications</span>
          </label>
          
          <label className="flex items-center space-x-2 text-sm">
            <input 
              type="checkbox" 
              className="text-primary focus:ring-primary-200"
            />
            <span className="text-text-primary">SMS for critical failures</span>
          </label>
        </div>
      </div>

      {/* Historical Trends */}
      <div className="p-4 border-t border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">7-Day Trend</h4>
        
        <div className="flex items-end justify-between h-16 space-x-1">
          {[95, 87, 92, 89, 96, 94, 91].map((value, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className={`w-full rounded-t ${
                  value >= 90 ? 'bg-success' :
                  value >= 80 ? 'bg-warning': 'bg-error'
                }`}
                style={{ height: `${(value / 100) * 100}%` }}
              />
              <div className="text-xs text-text-muted mt-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Configuration Modal */}
      {isSchedulerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-300">
          <div className="bg-surface rounded-lg border border-border p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Schedule Configuration
              </h3>
              <button
                onClick={() => setIsSchedulerOpen(false)}
                className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded transition-colors duration-200"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Frequency
                </label>
                <select
                  value={scheduleSettings.frequency}
                  onChange={(e) => setScheduleSettings(prev => ({
                    ...prev,
                    frequency: e.target.value
                  }))}
                  className="w-full border border-border rounded px-3 py-2 bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-200"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={scheduleSettings.time}
                  onChange={(e) => setScheduleSettings(prev => ({
                    ...prev,
                    time: e.target.value
                  }))}
                  className="w-full border border-border rounded px-3 py-2 bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={scheduleSettings.enabled}
                  onChange={(e) => setScheduleSettings(prev => ({
                    ...prev,
                    enabled: e.target.checked
                  }))}
                  className="text-primary focus:ring-primary-200"
                />
                <span className="text-sm text-text-primary">Enable automated runs</span>
              </label>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsSchedulerOpen(false)}
                className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={updateSchedule}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-700 transition-colors duration-200"
              >
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutomatedRegression;