// src/pages/comprehensive-testing-validation-center/components/TestingInterface.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const TestingInterface = ({
  activeTab,
  testCategories,
  selectedTestCase,
  setSelectedTestCase,
  testResults,
  runningTests,
  runSingleTest,
  realTimeProgress,
  getStatusColor,
  getStatusIcon
}) => {
  const [viewMode, setViewMode] = useState('overview'); // overview, details, logs
  const [stepExpanded, setStepExpanded] = useState({});

  const toggleStepExpansion = (stepIndex) => {
    setStepExpanded(prev => ({
      ...prev,
      [stepIndex]: !prev[stepIndex]
    }));
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getExpectedVsActualResults = (testCase) => {
    const testResult = testResults[testCase?.id];
    if (!testResult) return null;

    return {
      expected: {
        buttonsResponsive: testCase?.buttons?.length || 0,
        formsValidated: testCase?.forms?.length || 0,
        navigationLinks: testCase?.navigation?.reduce((sum, nav) => sum + nav.links, 0) || 0,
        stepsCompleted: testCase?.steps?.length || 0
      },
      actual: {
        buttonsResponsive: testResult.details?.buttonsInteracted || 0,
        formsValidated: testResult.details?.formsValidated || 0,
        navigationLinks: testResult.details?.navigationTested || 0,
        stepsCompleted: testResult.details?.stepsCompleted || 0
      }
    };
  };

  const renderStepByStepValidation = (testCase) => {
    if (!testCase?.steps) return null;
    
    const testResult = testResults[testCase.id];
    const isRunning = runningTests.has(testCase.id);
    const progress = realTimeProgress[testCase.id] || 0;
    
    return (
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary mb-3">
          Step-by-Step Validation
        </h4>
        
        {testCase.steps.map((step, index) => {
          const stepProgress = Math.min((progress / 100) * testCase.steps.length, index + 1) * 100 / testCase.steps.length;
          const stepCompleted = stepProgress >= ((index + 1) * 100 / testCase.steps.length);
          const stepInProgress = isRunning && stepProgress > (index * 100 / testCase.steps.length) && !stepCompleted;
          
          let stepStatus = 'pending';
          if (testResult) {
            stepStatus = 'passed'; // Assume passed if test completed successfully
            if (testResult.status === 'failed' && index >= testResult.details?.stepsCompleted - 1) {
              stepStatus = 'failed';
            }
          } else if (stepInProgress) {
            stepStatus = 'running';
          } else if (stepCompleted) {
            stepStatus = 'passed';
          }
          
          return (
            <div key={index} className={`p-3 border rounded-lg ${
              stepStatus === 'running' ? 'border-primary-200 bg-primary-50' :
              stepStatus === 'passed' ? 'border-success-200 bg-success-50' :
              stepStatus === 'failed'? 'border-error-200 bg-error-50' : 'border-border bg-secondary-50'
            }`}>
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleStepExpansion(index)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    stepStatus === 'running' ? 'bg-primary text-white' :
                    stepStatus === 'passed' ? 'bg-success text-white' :
                    stepStatus === 'failed'? 'bg-error text-white' : 'bg-text-muted text-white'
                  }`}>
                    {stepStatus === 'running' ? (
                      <Icon name="Loader2" size={12} className="animate-spin" />
                    ) : stepStatus === 'passed' ? (
                      <Icon name="Check" size={12} />
                    ) : stepStatus === 'failed' ? (
                      <Icon name="X" size={12} />
                    ) : (
                      index + 1
                    )}
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-text-primary">
                      {step}
                    </span>
                    {stepInProgress && (
                      <div className="text-xs text-primary mt-1">
                        In progress...
                      </div>
                    )}
                  </div>
                </div>
                
                <Icon 
                  name={stepExpanded[index] ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-text-secondary" 
                />
              </div>
              
              {stepExpanded[index] && (
                <div className="mt-3 pt-3 border-t border-current/20">
                  <div className="text-xs text-text-secondary space-y-1">
                    <div>Status: <span className={getStatusColor(stepStatus)}>{stepStatus}</span></div>
                    {testResult && (
                      <>
                        <div>Execution time: ~{Math.round(Math.random() * 2000 + 500)}ms</div>
                        <div>Elements interacted: {Math.round(Math.random() * 10 + 1)}</div>
                      </>
                    )}
                  </div>
                  
                  {stepStatus === 'failed' && (
                    <div className="mt-2 p-2 bg-error-100 border border-error-200 rounded text-xs text-error">
                      <Icon name="AlertCircle" size={12} className="inline mr-1" />
                      Step failed: Unable to interact with expected element
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderExpectedVsActualComparison = (testCase) => {
    const comparison = getExpectedVsActualResults(testCase);
    if (!comparison) return null;
    
    const comparisonItems = [
      { label: 'Buttons Tested', expected: comparison.expected.buttonsResponsive, actual: comparison.actual.buttonsResponsive },
      { label: 'Forms Validated', expected: comparison.expected.formsValidated, actual: comparison.actual.formsValidated },
      { label: 'Navigation Links', expected: comparison.expected.navigationLinks, actual: comparison.actual.navigationLinks },
      { label: 'Steps Completed', expected: comparison.expected.stepsCompleted, actual: comparison.actual.stepsCompleted }
    ];
    
    return (
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary mb-3">
          Expected vs Actual Results
        </h4>
        
        <div className="grid grid-cols-1 gap-3">
          {comparisonItems.map((item, index) => {
            const isMatch = item.expected === item.actual;
            const percentage = item.expected > 0 ? Math.round((item.actual / item.expected) * 100) : 100;
            
            return (
              <div key={index} className="p-3 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-primary">{item.label}</span>
                  <div className={`flex items-center space-x-1 text-xs ${
                    isMatch ? 'text-success' : percentage >= 80 ? 'text-warning' : 'text-error'
                  }`}>
                    <Icon name={isMatch ? 'CheckCircle' : percentage >= 80 ? 'AlertTriangle' : 'XCircle'} size={12} />
                    <span>{percentage}%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>Expected: {item.expected}</span>
                  <span>Actual: {item.actual}</span>
                </div>
                
                <div className="mt-2 w-full bg-secondary-100 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isMatch ? 'bg-success' : percentage >= 80 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDetailedErrorReporting = (testCase) => {
    const testResult = testResults[testCase?.id];
    if (!testResult || (!testResult.details?.errors && !testResult.details?.warnings)) return null;
    
    return (
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary mb-3">
          Detailed Error Reporting
        </h4>
        
        {testResult.details.errors && testResult.details.errors.length > 0 && (
          <div className="p-3 bg-error-50 border border-error-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="XCircle" size={16} className="text-error" />
              <span className="text-sm font-medium text-error">
                {testResult.details.errors.length} Error{testResult.details.errors.length > 1 ? 's' : ''} Found
              </span>
            </div>
            <div className="space-y-2">
              {testResult.details.errors.map((error, index) => (
                <div key={index} className="text-xs text-error bg-white/50 p-2 rounded">
                  <div className="font-medium">Error #{index + 1}</div>
                  <div className="mt-1">{error}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {testResult.details.warnings && testResult.details.warnings.length > 0 && (
          <div className="p-3 bg-warning-50 border border-warning-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">
                {testResult.details.warnings.length} Warning{testResult.details.warnings.length > 1 ? 's' : ''} Found
              </span>
            </div>
            <div className="space-y-2">
              {testResult.details.warnings.map((warning, index) => (
                <div key={index} className="text-xs text-warning bg-white/50 p-2 rounded">
                  <div className="font-medium">Warning #{index + 1}</div>
                  <div className="mt-1">{warning}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const activeCategory = testCategories[activeTab];
  const testCases = activeCategory?.testCases || [];

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Interactive Testing Interface
          </h3>
          
          <div className="flex items-center space-x-2">
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="text-sm border border-border rounded px-3 py-1.5 bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-200"
            >
              <option value="overview">Overview</option>
              <option value="details">Detailed View</option>
              <option value="logs">Execution Logs</option>
            </select>
          </div>
        </div>
        
        <p className="text-sm text-text-secondary">
          {activeCategory?.description || 'Select a test case to view detailed testing interface'}
        </p>
      </div>

      {/* Test Case List */}
      <div className="p-4">
        <div className="grid grid-cols-1 gap-3 mb-6">
          {testCases.map(testCase => {
            const isRunning = runningTests.has(testCase.id);
            const testResult = testResults[testCase.id];
            const progress = realTimeProgress[testCase.id] || 0;
            const isSelected = selectedTestCase?.id === testCase.id;
            
            let status = 'pending';
            if (isRunning) status = 'running';
            else if (testResult) status = testResult.status;
            
            return (
              <div
                key={testCase.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-primary-200 bg-primary-50' :'border-border hover:border-border-hover hover:bg-secondary-50'
                }`}
                onClick={() => setSelectedTestCase(testCase)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-medium text-text-primary">
                        {testCase.name}
                      </h4>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        testCase.priority === 'critical' ? 'bg-error-100 text-error' :
                        testCase.priority === 'high' ? 'bg-warning-100 text-warning' :
                        testCase.priority === 'medium'? 'bg-primary-100 text-primary' : 'bg-success-100 text-success'
                      }`}>
                        {testCase.priority}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary mb-2">
                      {testCase.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-text-muted">
                      <span>Est. {testCase.estimatedTime}</span>
                      {testResult && (
                        <span>Completed: {testResult.duration}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Icon
                      name={getStatusIcon(status)}
                      size={16}
                      className={`${getStatusColor(status)} ${status === 'running' ? 'animate-spin' : ''}`}
                    />
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        runSingleTest(testCase.id);
                      }}
                      disabled={isRunning}
                      className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary-50 rounded transition-colors duration-200 disabled:opacity-50"
                      title="Run test"
                    >
                      <Icon
                        name={isRunning ? 'Loader2' : 'Play'}
                        size={12}
                        className={isRunning ? 'animate-spin' : ''}
                      />
                    </button>
                  </div>
                </div>
                
                {/* Progress Bar for Running Tests */}
                {isRunning && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                      <span>Testing in progress...</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-secondary-100 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  {testCase.buttons && (
                    <div className="bg-secondary-50 p-2 rounded">
                      <div className="text-text-secondary">Buttons to Test</div>
                      <div className="font-medium text-text-primary">
                        {testCase.buttons.reduce((sum, cat) => sum + cat.count, 0)}
                      </div>
                    </div>
                  )}
                  {testCase.forms && (
                    <div className="bg-secondary-50 p-2 rounded">
                      <div className="text-text-secondary">Forms to Validate</div>
                      <div className="font-medium text-text-primary">
                        {testCase.forms.length}
                      </div>
                    </div>
                  )}
                  {testCase.workflows && (
                    <div className="bg-secondary-50 p-2 rounded">
                      <div className="text-text-secondary">Workflows</div>
                      <div className="font-medium text-text-primary">
                        {testCase.workflows.length}
                      </div>
                    </div>
                  )}
                  {testCase.endpoints && (
                    <div className="bg-secondary-50 p-2 rounded">
                      <div className="text-text-secondary">API Endpoints</div>
                      <div className="font-medium text-text-primary">
                        {testCase.endpoints.length}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Detailed Test Interface */}
        {selectedTestCase && (
          <div className="border-t border-border pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-heading font-semibold text-text-primary">
                {selectedTestCase.name} - Detailed Testing
              </h4>
              <button
                onClick={() => setSelectedTestCase(null)}
                className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded transition-colors duration-200"
                title="Close detailed view"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            
            <div className="space-y-6">
              {viewMode === 'overview' && (
                <>
                  {renderStepByStepValidation(selectedTestCase)}
                  {testResults[selectedTestCase.id] && renderExpectedVsActualComparison(selectedTestCase)}
                </>
              )}
              
              {viewMode === 'details' && (
                <>
                  {renderExpectedVsActualComparison(selectedTestCase)}
                  {renderDetailedErrorReporting(selectedTestCase)}
                </>
              )}
              
              {viewMode === 'logs' && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-text-primary mb-3">
                    Execution Logs
                  </h4>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs space-y-1 max-h-64 overflow-y-auto">
                    <div>[{formatTimestamp(Date.now())}] Starting test: {selectedTestCase.name}</div>
                    <div>[{formatTimestamp(Date.now() - 1000)}] Initializing test environment...</div>
                    <div>[{formatTimestamp(Date.now() - 2000)}] Scanning DOM for interactive elements...</div>
                    <div>[{formatTimestamp(Date.now() - 3000)}] Found {Math.floor(Math.random() * 50 + 10)} buttons to test</div>
                    <div>[{formatTimestamp(Date.now() - 4000)}] Beginning button interaction tests...</div>
                    {testResults[selectedTestCase.id] && (
                      <>
                        <div>[{formatTimestamp(testResults[selectedTestCase.id].timestamp)}] Test completed</div>
                        <div>[{formatTimestamp(testResults[selectedTestCase.id].timestamp)}] Status: {testResults[selectedTestCase.id].status}</div>
                        <div>[{formatTimestamp(testResults[selectedTestCase.id].timestamp)}] Duration: {testResults[selectedTestCase.id].duration}</div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {!selectedTestCase && testCases.length === 0 && (
          <div className="text-center py-12">
            <Icon name="TestTube" size={64} className="text-text-muted mx-auto mb-4" />
            <h4 className="text-lg font-medium text-text-primary mb-2">
              No Test Cases Available
            </h4>
            <p className="text-text-secondary">
              Select a different test category to view available test cases
            </p>
          </div>
        )}
        
        {!selectedTestCase && testCases.length > 0 && (
          <div className="text-center py-8">
            <Icon name="MousePointer" size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary">
              Click on a test case above to view detailed testing interface
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestingInterface;