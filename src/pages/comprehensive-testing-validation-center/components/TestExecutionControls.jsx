// src/pages/comprehensive-testing-validation-center/components/TestExecutionControls.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const TestExecutionControls = ({
  testCategories,
  activeTab,
  setActiveTab,
  runBatchTests,
  runSingleTest,
  runningTests,
  testResults,
  realTimeProgress
}) => {
  const [batchSelection, setBatchSelection] = useState(new Set());
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortBy, setSortBy] = useState('priority');

  const handleBatchToggle = (testId) => {
    const newSelection = new Set(batchSelection);
    if (newSelection.has(testId)) {
      newSelection.delete(testId);
    } else {
      newSelection.add(testId);
    }
    setBatchSelection(newSelection);
  };

  const runSelectedTests = () => {
    batchSelection.forEach(testId => {
      setTimeout(() => runSingleTest(testId), Math.random() * 1000);
    });
    setBatchSelection(new Set());
  };

  const getTestStatus = (testId) => {
    if (runningTests.has(testId)) return 'running';
    if (testResults[testId]) return testResults[testId].status;
    return 'pending';
  };

  const getStatusBadge = (status) => {
    const colors = {
      passed: 'bg-success-100 text-success border-success-200',
      failed: 'bg-error-100 text-error border-error-200',
      warning: 'bg-warning-100 text-warning border-warning-200',
      running: 'bg-primary-100 text-primary border-primary-200',
      pending: 'bg-gray-100 text-gray-600 border-gray-200'
    };

    const labels = {
      passed: 'Passed',
      failed: 'Failed',
      warning: 'Warning',
      running: 'Running',
      pending: 'Pending'
    };

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
        colors[status] || colors.pending
      }`}>
        {labels[status] || 'Unknown'}
      </span>
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-primary';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const filterAndSortTests = (tests) => {
    let filtered = tests;
    
    if (filterPriority !== 'all') {
      filtered = filtered.filter(test => test.priority === filterPriority);
    }
    
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'name':
          return a.name.localeCompare(b.name);
        case 'status':
          return getTestStatus(a.id).localeCompare(getTestStatus(b.id));
        default:
          return 0;
      }
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Test Execution Controls
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">
              {runningTests.size} running
            </span>
            {runningTests.size > 0 && (
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            )}
          </div>
        </div>
        
        {/* Batch Controls */}
        {batchSelection.size > 0 && (
          <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg border border-primary-200 mb-4">
            <span className="text-sm text-primary font-medium">
              {batchSelection.size} tests selected
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setBatchSelection(new Set())}
                className="text-xs px-2 py-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                Clear
              </button>
              <button
                onClick={runSelectedTests}
                className="flex items-center space-x-1 px-3 py-1 bg-primary text-white rounded text-xs hover:bg-primary-700 transition-colors duration-200"
              >
                <Icon name="Play" size={12} />
                <span>Run Selected</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Filters and Sort */}
        <div className="flex items-center space-x-3">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="text-sm border border-border rounded px-2 py-1 bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-200"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-border rounded px-2 py-1 bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-200"
          >
            <option value="priority">Sort by Priority</option>
            <option value="name">Sort by Name</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {Object.entries(testCategories).map(([key, category]) => {
            const categoryTests = category.testCases || [];
            const completedTests = categoryTests.filter(test => testResults[test.id]).length;
            const runningCount = categoryTests.filter(test => runningTests.has(test.id)).length;
            
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === key
                    ? 'border-primary text-primary bg-primary-50' :'border-transparent text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={category.icon} size={16} />
                  <span>{category.title}</span>
                  {runningCount > 0 && (
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                  )}
                </div>
                <div className="text-xs text-text-muted mt-1">
                  {completedTests}/{categoryTests.length}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Test Case Selection */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-text-primary">
            {testCategories[activeTab]?.title || 'Test Cases'}
          </h4>
          <button
            onClick={() => runBatchTests(activeTab)}
            disabled={!testCategories[activeTab]?.testCases?.length}
            className="flex items-center space-x-1 px-3 py-1 bg-primary text-white rounded text-xs hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="Play" size={12} />
            <span>Run Category</span>
          </button>
        </div>
        
        <div className="space-y-2">
          {testCategories[activeTab]?.testCases && 
            filterAndSortTests(testCategories[activeTab].testCases).map(test => {
              const status = getTestStatus(test.id);
              const progress = realTimeProgress[test.id] || 0;
              const isSelected = batchSelection.has(test.id);
              
              return (
                <div
                  key={test.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-primary-200 bg-primary-50' :'border-border hover:border-border-hover hover:bg-secondary-50'
                  }`}
                  onClick={() => handleBatchToggle(test.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start space-x-3 flex-1">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleBatchToggle(test.id)}
                        className="mt-0.5 text-primary focus:ring-primary-200"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h5 className="text-sm font-medium text-text-primary">
                            {test.name}
                          </h5>
                          <Icon
                            name="Info"
                            size={12}
                            className={getPriorityColor(test.priority)}
                            title={`Priority: ${test.priority}`}
                          />
                        </div>
                        <p className="text-xs text-text-secondary mb-2">
                          {test.description}
                        </p>
                        <div className="flex items-center space-x-3 text-xs text-text-muted">
                          <span>Est. {test.estimatedTime}</span>
                          {getStatusBadge(status)}
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        runSingleTest(test.id);
                      }}
                      disabled={status === 'running'}
                      className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary-50 rounded transition-colors duration-200 disabled:opacity-50"
                      title="Run single test"
                    >
                      <Icon
                        name={status === 'running' ? 'Loader2' : 'Play'}
                        size={12}
                        className={status === 'running' ? 'animate-spin' : ''}
                      />
                    </button>
                  </div>
                  
                  {/* Progress Bar */}
                  {status === 'running' && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                        <span>Testing in progress...</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-secondary-100 rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Test Result Summary */}
                  {testResults[test.id] && (
                    <div className="mt-2 text-xs">
                      <div className="flex items-center justify-between text-text-muted">
                        <span>Duration: {testResults[test.id].duration}</span>
                        <span>Completed: {testResults[test.id].timestamp.toLocaleTimeString()}</span>
                      </div>
                      {testResults[test.id].details && (
                        <div className="mt-1 text-text-secondary">
                          {testResults[test.id].details.buttonsInteracted && (
                            <span>Buttons tested: {testResults[test.id].details.buttonsInteracted}</span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          }
        </div>
        
        {!testCategories[activeTab]?.testCases?.length && (
          <div className="text-center py-8">
            <Icon name="TestTube" size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary">No test cases available for this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestExecutionControls;