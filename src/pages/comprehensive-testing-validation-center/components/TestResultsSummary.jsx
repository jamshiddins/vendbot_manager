// src/pages/comprehensive-testing-validation-center/components/TestResultsSummary.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const TestResultsSummary = ({
  selectedTestCase,
  testResults,
  runningTests,
  performanceData,
  crossBrowserResults,
  accessibilityResults,
  responsiveResults,
  getStatusColor,
  getStatusIcon
}) => {
  const [activePanel, setActivePanel] = useState('results'); // results, performance, browser, accessibility

  const formatDuration = (duration) => {
    if (typeof duration === 'string') return duration;
    return `${duration}s`;
  };

  const getPerformanceStatus = (current, target) => {
    const currentValue = parseFloat(current);
    const targetValue = parseFloat(target);
    
    if (currentValue <= targetValue * 0.7) return 'excellent';
    if (currentValue <= targetValue * 0.9) return 'good';
    if (currentValue <= targetValue) return 'warning';
    return 'poor';
  };

  const getPerformanceColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-primary';
      case 'warning': return 'text-warning';
      case 'poor': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const renderTestResults = () => {
    if (!selectedTestCase) {
      return (
        <div className="text-center py-8">
          <Icon name="BarChart3" size={48} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary text-sm">
            Select a test case to view results summary
          </p>
        </div>
      );
    }

    const testResult = testResults[selectedTestCase.id];
    const isRunning = runningTests.has(selectedTestCase.id);

    if (isRunning) {
      return (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Loader2" size={16} className="text-primary animate-spin" />
            <span className="text-sm font-medium text-primary">Test in Progress</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Status</span>
              <span className="text-primary">Running</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Estimated Time</span>
              <span className="text-text-primary">{selectedTestCase.estimatedTime}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Priority</span>
              <span className={`capitalize ${
                selectedTestCase.priority === 'critical' ? 'text-error' :
                selectedTestCase.priority === 'high' ? 'text-warning' :
                selectedTestCase.priority === 'medium'? 'text-primary' : 'text-success'
              }`}>
                {selectedTestCase.priority}
              </span>
            </div>
          </div>
        </div>
      );
    }

    if (!testResult) {
      return (
        <div className="space-y-4">
          <div className="text-center py-6">
            <Icon name="Clock" size={32} className="text-text-muted mx-auto mb-2" />
            <p className="text-sm text-text-secondary">
              Test not executed yet
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Status</span>
              <span className="text-text-muted">Pending</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Estimated Time</span>
              <span className="text-text-primary">{selectedTestCase.estimatedTime}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Priority</span>
              <span className={`capitalize ${
                selectedTestCase.priority === 'critical' ? 'text-error' :
                selectedTestCase.priority === 'high' ? 'text-warning' :
                selectedTestCase.priority === 'medium'? 'text-primary' : 'text-success'
              }`}>
                {selectedTestCase.priority}
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon 
            name={getStatusIcon(testResult.status)} 
            size={16} 
            className={getStatusColor(testResult.status)} 
          />
          <span className={`text-sm font-medium capitalize ${getStatusColor(testResult.status)}`}>
            {testResult.status}
          </span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Duration</span>
            <span className="text-text-primary font-mono">{testResult.duration}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Completed</span>
            <span className="text-text-primary">
              {testResult.timestamp.toLocaleTimeString('ru-RU')}
            </span>
          </div>
          
          {testResult.details && (
            <>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Elements Tested</span>
                <span className="text-text-primary">{testResult.details.buttonsInteracted}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Steps Completed</span>
                <span className="text-text-primary">{testResult.details.stepsCompleted}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Performance Score</span>
                <span className={`text-text-primary font-medium ${
                  testResult.details.performanceScore >= 90 ? 'text-success' :
                  testResult.details.performanceScore >= 70 ? 'text-warning': 'text-error'
                }`}>
                  {testResult.details.performanceScore}/100
                </span>
              </div>
              
              {testResult.details.errorsFound > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Errors Found</span>
                  <span className="text-error font-medium">{testResult.details.errorsFound}</span>
                </div>
              )}
              
              {testResult.details.warningsFound > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Warnings</span>
                  <span className="text-warning font-medium">{testResult.details.warningsFound}</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  const renderPerformanceMetrics = () => {
    return (
      <div className="space-y-4">
        <h5 className="text-sm font-medium text-text-primary mb-3">Load Times</h5>
        <div className="space-y-3">
          {Object.entries(performanceData.loadTimes).map(([page, data]) => {
            const status = getPerformanceStatus(data.current, data.target);
            return (
              <div key={page} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">{page}</span>
                  <span className={`font-mono ${getPerformanceColor(status)}`}>
                    {data.current}
                  </span>
                </div>
                <div className="w-full bg-secondary-100 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${
                      status === 'excellent' ? 'bg-success' :
                      status === 'good' ? 'bg-primary' :
                      status === 'warning'? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ 
                      width: `${Math.min((parseFloat(data.target) / parseFloat(data.current)) * 100, 100)}%` 
                    }}
                  />
                </div>
                <div className="text-xs text-text-muted">
                  Target: {data.target}
                </div>
              </div>
            );
          })}
        </div>
        
        <h5 className="text-sm font-medium text-text-primary mb-3 mt-6">Interactions</h5>
        <div className="space-y-3">
          {Object.entries(performanceData.interactions).map(([interaction, data]) => {
            const status = getPerformanceStatus(data.avgResponse, data.target);
            return (
              <div key={interaction} className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">{interaction}</span>
                <div className="text-right">
                  <div className={`font-mono ${getPerformanceColor(status)}`}>
                    {data.avgResponse}
                  </div>
                  <div className="text-xs text-text-muted">
                    Target: {data.target}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCrossBrowserResults = () => {
    return (
      <div className="space-y-4">
        <h5 className="text-sm font-medium text-text-primary mb-3">Browser Compatibility</h5>
        <div className="space-y-3">
          {Object.entries(crossBrowserResults.compatibility).map(([browser, data]) => {
            const compatibilityScore = parseFloat(data.compatibility);
            return (
              <div key={browser} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">{browser}</span>
                  <span className={`font-medium ${
                    compatibilityScore >= 95 ? 'text-success' :
                    compatibilityScore >= 90 ? 'text-primary' :
                    compatibilityScore >= 85 ? 'text-warning': 'text-error'
                  }`}>
                    {data.compatibility}
                  </span>
                </div>
                <div className="w-full bg-secondary-100 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${
                      compatibilityScore >= 95 ? 'bg-success' :
                      compatibilityScore >= 90 ? 'bg-primary' :
                      compatibilityScore >= 85 ? 'bg-warning': 'bg-error'
                    }`}
                    style={{ width: `${compatibilityScore}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>Passed: {data.passed}</span>
                  <span>Failed: {data.failed}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAccessibilityResults = () => {
    return (
      <div className="space-y-4">
        <h5 className="text-sm font-medium text-text-primary mb-3">Accessibility Compliance</h5>
        <div className="space-y-3">
          {Object.entries(accessibilityResults.compliance).map(([standard, data]) => {
            const complianceScore = parseFloat(data.compliance);
            return (
              <div key={standard} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">{standard}</span>
                  <span className={`font-medium ${
                    complianceScore >= 95 ? 'text-success' :
                    complianceScore >= 90 ? 'text-primary' :
                    complianceScore >= 80 ? 'text-warning': 'text-error'
                  }`}>
                    {data.compliance}
                  </span>
                </div>
                <div className="w-full bg-secondary-100 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${
                      complianceScore >= 95 ? 'bg-success' :
                      complianceScore >= 90 ? 'bg-primary' :
                      complianceScore >= 80 ? 'bg-warning': 'bg-error'
                    }`}
                    style={{ width: `${complianceScore}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>Passed: {data.passed}</span>
                  <span>Failed: {data.failed}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderQuickActions = () => {
    if (!selectedTestCase) return null;
    
    const testResult = testResults[selectedTestCase.id];
    const isRunning = runningTests.has(selectedTestCase.id);
    
    return (
      <div className="space-y-2">
        <h5 className="text-sm font-medium text-text-primary mb-3">Quick Actions</h5>
        
        <button className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-secondary-100 rounded-lg transition-colors duration-200 text-sm text-text-primary">
          <Icon name="RefreshCw" size={14} />
          <span>Re-run Test</span>
        </button>
        
        <button className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-secondary-100 rounded-lg transition-colors duration-200 text-sm text-text-primary">
          <Icon name="Download" size={14} />
          <span>Export Results</span>
        </button>
        
        <button className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-secondary-100 rounded-lg transition-colors duration-200 text-sm text-text-primary">
          <Icon name="Share" size={14} />
          <span>Share Report</span>
        </button>
        
        {testResult?.status === 'failed' && (
          <button className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-error-50 rounded-lg transition-colors duration-200 text-sm text-error">
            <Icon name="Bug" size={14} />
            <span>Debug Issues</span>
          </button>
        )}
        
        <button className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-secondary-100 rounded-lg transition-colors duration-200 text-sm text-text-primary">
          <Icon name="FileText" size={14} />
          <span>View Full Report</span>
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Test Results Panel */}
      <div className="bg-surface rounded-lg border border-border">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActivePanel('results')}
              className={`text-sm font-medium transition-colors duration-200 ${
                activePanel === 'results' ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Results
            </button>
            <button
              onClick={() => setActivePanel('performance')}
              className={`text-sm font-medium transition-colors duration-200 ${
                activePanel === 'performance' ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Performance
            </button>
            <button
              onClick={() => setActivePanel('browser')}
              className={`text-sm font-medium transition-colors duration-200 ${
                activePanel === 'browser' ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Browser
            </button>
            <button
              onClick={() => setActivePanel('accessibility')}
              className={`text-sm font-medium transition-colors duration-200 ${
                activePanel === 'accessibility' ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              A11y
            </button>
          </div>
        </div>
        
        <div className="p-4">
          {activePanel === 'results' && renderTestResults()}
          {activePanel === 'performance' && renderPerformanceMetrics()}
          {activePanel === 'browser' && renderCrossBrowserResults()}
          {activePanel === 'accessibility' && renderAccessibilityResults()}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface rounded-lg border border-border">
        <div className="p-4 border-b border-border">
          <h4 className="text-sm font-medium text-text-primary">Quick Actions</h4>
        </div>
        <div className="p-4">
          {renderQuickActions()}
        </div>
      </div>

      {/* Responsive Design Validation */}
      <div className="bg-surface rounded-lg border border-border">
        <div className="p-4 border-b border-border">
          <h4 className="text-sm font-medium text-text-primary">Responsive Design</h4>
        </div>
        <div className="p-4 space-y-3">
          {Object.entries(responsiveResults.validation).map(([breakpoint, data]) => {
            const successRate = data.layouts > 0 ? Math.round((data.passed / data.layouts) * 100) : 0;
            return (
              <div key={breakpoint} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">{breakpoint}</span>
                  <span className={`font-medium ${
                    successRate >= 95 ? 'text-success' :
                    successRate >= 85 ? 'text-primary' :
                    successRate >= 70 ? 'text-warning': 'text-error'
                  }`}>
                    {successRate}%
                  </span>
                </div>
                <div className="w-full bg-secondary-100 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full ${
                      successRate >= 95 ? 'bg-success' :
                      successRate >= 85 ? 'bg-primary' :
                      successRate >= 70 ? 'bg-warning': 'bg-error'
                    }`}
                    style={{ width: `${successRate}%` }}
                  />
                </div>
                <div className="text-xs text-text-muted">
                  {data.passed}/{data.layouts} layouts
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TestResultsSummary;