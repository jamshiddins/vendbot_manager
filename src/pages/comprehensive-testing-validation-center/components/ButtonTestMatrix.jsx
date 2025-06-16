// src/pages/comprehensive-testing-validation-center/components/ButtonTestMatrix.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ButtonTestMatrix = ({ buttonStats }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [testInProgress, setTestInProgress] = useState(false);
  const [lastTestResults, setLastTestResults] = useState(null);

  const runButtonTests = () => {
    setTestInProgress(true);
    
    // Simulate button testing process
    setTimeout(() => {
      setTestInProgress(false);
      setLastTestResults({
        timestamp: new Date(),
        totalButtons: buttonStats.totalButtons,
        testedButtons: buttonStats.testedButtons + Math.floor(Math.random() * 10),
        newIssues: Math.floor(Math.random() * 3),
        fixedIssues: Math.floor(Math.random() * 2)
      });
    }, 3000);
  };

  const getHealthScore = () => {
    if (!buttonStats.totalButtons) return 0;
    return Math.round((buttonStats.passedButtons / buttonStats.totalButtons) * 100);
  };

  const getHealthColor = (score) => {
    if (score >= 95) return 'text-success';
    if (score >= 85) return 'text-primary';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const toggleCategory = (categoryName) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  const healthScore = getHealthScore();

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Button Testing Matrix
          </h3>
          <div className={`text-lg font-bold ${getHealthColor(healthScore)}`}>
            {healthScore}%
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            {buttonStats.testedButtons}/{buttonStats.totalButtons} buttons validated
          </div>
          <button
            onClick={runButtonTests}
            disabled={testInProgress}
            className="flex items-center space-x-2 px-3 py-1.5 bg-primary text-white text-sm rounded hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50"
          >
            <Icon 
              name={testInProgress ? 'Loader2' : 'MousePointer'} 
              size={14} 
              className={testInProgress ? 'animate-spin' : ''}
            />
            <span>{testInProgress ? 'Testing...' : 'Test All'}</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-success">
              {buttonStats.passedButtons}
            </div>
            <div className="text-xs text-text-secondary">Passed</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-error">
              {buttonStats.failedButtons}
            </div>
            <div className="text-xs text-text-secondary">Failed</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-secondary-100 rounded-full h-2">
            <div 
              className="bg-success h-2 rounded-full transition-all duration-300"
              style={{ width: `${(buttonStats.passedButtons / buttonStats.totalButtons) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-text-muted mt-1">
            <span>0</span>
            <span>{buttonStats.totalButtons}</span>
          </div>
        </div>
      </div>

      {/* Button Categories */}
      <div className="p-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">Button Categories</h4>
        
        <div className="space-y-2">
          {buttonStats.categories.map((category, index) => {
            const successRate = category.total > 0 ? Math.round((category.passed / category.total) * 100) : 0;
            const isExpanded = expandedCategory === category.name;
            
            return (
              <div key={index} className="border border-border rounded-lg">
                <div 
                  className="p-3 cursor-pointer hover:bg-secondary-50 transition-colors duration-200"
                  onClick={() => toggleCategory(category.name)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={isExpanded ? "ChevronDown" : "ChevronRight"} 
                        size={14} 
                        className="text-text-secondary" 
                      />
                      <span className="text-sm font-medium text-text-primary">
                        {category.name}
                      </span>
                    </div>
                    <div className={`text-sm font-medium ${
                      successRate >= 95 ? 'text-success' :
                      successRate >= 85 ? 'text-primary' :
                      successRate >= 70 ? 'text-warning': 'text-error'
                    }`}>
                      {successRate}%
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
                    <span>{category.tested}/{category.total} tested</span>
                    <span>{category.failed} failed</span>
                  </div>
                  
                  <div className="w-full bg-secondary-100 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        successRate >= 95 ? 'bg-success' :
                        successRate >= 85 ? 'bg-primary' :
                        successRate >= 70 ? 'bg-warning': 'bg-error'
                      }`}
                      style={{ width: `${successRate}%` }}
                    />
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="px-3 pb-3 border-t border-border">
                    <div className="mt-3 space-y-2">
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="bg-success-50 p-2 rounded">
                          <div className="text-success font-medium">{category.passed}</div>
                          <div className="text-text-secondary">Passed Tests</div>
                        </div>
                        <div className="bg-error-50 p-2 rounded">
                          <div className="text-error font-medium">{category.failed}</div>
                          <div className="text-text-secondary">Failed Tests</div>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="text-xs text-text-secondary mb-2">Recent Issues:</div>
                        <div className="space-y-1">
                          {category.failed > 0 && (
                            <div className="text-xs text-error bg-error-50 p-2 rounded">
                              • Click handler not responding
                            </div>
                          )}
                          {category.failed > 1 && (
                            <div className="text-xs text-error bg-error-50 p-2 rounded">
                              • Visual state not updating
                            </div>
                          )}
                          {category.failed === 0 && (
                            <div className="text-xs text-success bg-success-50 p-2 rounded">
                              ✓ All buttons functioning correctly
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <button className="w-full mt-2 px-3 py-1.5 bg-primary text-white text-xs rounded hover:bg-primary-700 transition-colors duration-200">
                        Test Category
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Test Results */}
      {lastTestResults && (
        <div className="p-4 border-t border-border">
          <h4 className="text-sm font-medium text-text-primary mb-3">Last Test Run</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Completed</span>
              <span className="text-text-primary">
                {lastTestResults.timestamp.toLocaleTimeString('ru-RU')}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Buttons Tested</span>
              <span className="text-text-primary">{lastTestResults.testedButtons}</span>
            </div>
            {lastTestResults.newIssues > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">New Issues</span>
                <span className="text-error">{lastTestResults.newIssues}</span>
              </div>
            )}
            {lastTestResults.fixedIssues > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Fixed Issues</span>
                <span className="text-success">{lastTestResults.fixedIssues}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Button State Testing */}
      <div className="p-4 border-t border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">Button State Testing</h4>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-secondary-50 p-2 rounded">
            <div className="text-text-secondary">Hover States</div>
            <div className="font-medium text-text-primary">95% Pass</div>
          </div>
          <div className="bg-secondary-50 p-2 rounded">
            <div className="text-text-secondary">Click Events</div>
            <div className="font-medium text-text-primary">98% Pass</div>
          </div>
          <div className="bg-secondary-50 p-2 rounded">
            <div className="text-text-secondary">Disabled States</div>
            <div className="font-medium text-text-primary">92% Pass</div>
          </div>
          <div className="bg-secondary-50 p-2 rounded">
            <div className="text-text-secondary">Loading States</div>
            <div className="font-medium text-text-primary">89% Pass</div>
          </div>
        </div>
      </div>

      {/* Test Progress Indicator */}
      {testInProgress && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Loader2" size={14} className="text-primary animate-spin" />
            <span className="text-sm text-primary">Testing buttons...</span>
          </div>
          <div className="w-full bg-secondary-100 rounded-full h-1.5">
            <div className="bg-primary h-1.5 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonTestMatrix;