// src/pages/comprehensive-testing-validation-center/components/MockDataGenerator.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const MockDataGenerator = ({ mockDataStats }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [generationConfig, setGenerationConfig] = useState({
    recordCount: 100,
    includeRelations: true,
    addNoise: false,
    format: 'json'
  });

  const generateMockData = (template) => {
    setIsGenerating(true);
    setSelectedTemplate(template);
    
    // Simulate data generation process
    setTimeout(() => {
      setIsGenerating(false);
      setSelectedTemplate(null);
      // Update stats would happen here
    }, 2000);
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all mock data? This action cannot be undone.')) {
      // Handle clearing all mock data
      console.log('Clearing all mock data...');
    }
  };

  const downloadDataset = (template) => {
    // Handle dataset download
    console.log(`Downloading ${template.name} dataset...`);
  };

  const getTemplateStatusColor = (isActive) => {
    return isActive ? 'text-success' : 'text-text-muted';
  };

  const getTemplateIcon = (templateName) => {
    switch (templateName.toLowerCase()) {
      case 'machine data': return 'Monitor';
      case 'user profiles': return 'Users';
      case 'transaction history': return 'CreditCard';
      case 'inventory items': return 'Package';
      case 'maintenance records': return 'Wrench';
      default: return 'Database';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Mock Data Generator
          </h3>
          <div className="text-lg font-bold text-primary">
            {mockDataStats.recordsCreated.toLocaleString()}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            {mockDataStats.activeDatasets} active datasets
          </div>
          <button
            onClick={clearAllData}
            className="flex items-center space-x-2 px-3 py-1.5 bg-error text-white text-sm rounded hover:bg-error-700 transition-colors duration-200"
          >
            <Icon name="Trash2" size={14} />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-text-primary">
              {mockDataStats.datasetsGenerated}
            </div>
            <div className="text-xs text-text-secondary">Total Datasets</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-text-primary">
              {mockDataStats.activeDatasets}
            </div>
            <div className="text-xs text-text-secondary">Active</div>
          </div>
        </div>
        
        {/* Storage Usage Indicator */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
            <span>Storage Usage</span>
            <span>2.4 GB / 10 GB</span>
          </div>
          <div className="w-full bg-secondary-100 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '24%' }} />
          </div>
        </div>
      </div>

      {/* Data Templates */}
      <div className="p-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">Available Templates</h4>
        
        <div className="space-y-2">
          {mockDataStats.availableTemplates.map((template, index) => {
            const isGeneratingThis = isGenerating && selectedTemplate?.name === template.name;
            
            return (
              <div 
                key={index} 
                className={`p-3 border rounded-lg transition-all duration-200 ${
                  template.active 
                    ? 'border-success-200 bg-success-50' :'border-border hover:border-border-hover hover:bg-secondary-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={getTemplateIcon(template.name)} 
                      size={16} 
                      className={getTemplateStatusColor(template.active)}
                    />
                    <div>
                      <span className="text-sm font-medium text-text-primary">
                        {template.name}
                      </span>
                      {template.active && (
                        <div className="flex items-center space-x-1 mt-0.5">
                          <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                          <span className="text-xs text-success">Active</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {template.active && (
                      <button
                        onClick={() => downloadDataset(template)}
                        className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary-50 rounded transition-colors duration-200"
                        title="Download dataset"
                      >
                        <Icon name="Download" size={12} />
                      </button>
                    )}
                    
                    <button
                      onClick={() => generateMockData(template)}
                      disabled={isGeneratingThis}
                      className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary-50 rounded transition-colors duration-200 disabled:opacity-50"
                      title="Generate data"
                    >
                      <Icon 
                        name={isGeneratingThis ? 'Loader2' : 'RefreshCw'} 
                        size={12} 
                        className={isGeneratingThis ? 'animate-spin' : ''}
                      />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>{template.records.toLocaleString()} records</span>
                  <span>{template.active ? 'In use' : 'Available'}</span>
                </div>
                
                {isGeneratingThis && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                      <span>Generating data...</span>
                      <span>Processing</span>
                    </div>
                    <div className="w-full bg-secondary-100 rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full animate-pulse" style={{ width: '70%' }} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Generation Configuration */}
      <div className="p-4 border-t border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">Generation Settings</h4>
        
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-text-secondary mb-1">
              Record Count
            </label>
            <input
              type="number"
              value={generationConfig.recordCount}
              onChange={(e) => setGenerationConfig(prev => ({
                ...prev,
                recordCount: parseInt(e.target.value) || 0
              }))}
              className="w-full text-sm border border-border rounded px-2 py-1 bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-200"
              min="1"
              max="10000"
            />
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-xs">
              <input
                type="checkbox"
                checked={generationConfig.includeRelations}
                onChange={(e) => setGenerationConfig(prev => ({
                  ...prev,
                  includeRelations: e.target.checked
                }))}
                className="text-primary focus:ring-primary-200"
              />
              <span className="text-text-primary">Include related data</span>
            </label>
            
            <label className="flex items-center space-x-2 text-xs">
              <input
                type="checkbox"
                checked={generationConfig.addNoise}
                onChange={(e) => setGenerationConfig(prev => ({
                  ...prev,
                  addNoise: e.target.checked
                }))}
                className="text-primary focus:ring-primary-200"
              />
              <span className="text-text-primary">Add realistic noise</span>
            </label>
          </div>
          
          <div>
            <label className="block text-xs text-text-secondary mb-1">
              Export Format
            </label>
            <select
              value={generationConfig.format}
              onChange={(e) => setGenerationConfig(prev => ({
                ...prev,
                format: e.target.value
              }))}
              className="w-full text-sm border border-border rounded px-2 py-1 bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-200"
            >
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
              <option value="xml">XML</option>
              <option value="sql">SQL</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-4 border-t border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">Recent Activity</h4>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Database" size={12} className="text-success" />
              <span className="text-text-primary">Generated Machine Data</span>
            </div>
            <span className="text-text-muted">2 min ago</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={12} className="text-primary" />
              <span className="text-text-primary">Updated User Profiles</span>
            </div>
            <span className="text-text-muted">15 min ago</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Trash2" size={12} className="text-error" />
              <span className="text-text-primary">Cleared Transaction History</span>
            </div>
            <span className="text-text-muted">1 hour ago</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center space-x-2 px-3 py-2 bg-primary text-white text-sm rounded hover:bg-primary-700 transition-colors duration-200">
            <Icon name="Zap" size={14} />
            <span>Quick Generate</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 px-3 py-2 border border-border text-text-primary text-sm rounded hover:bg-secondary-50 transition-colors duration-200">
            <Icon name="Settings" size={14} />
            <span>Templates</span>
          </button>
        </div>
      </div>

      {/* Generation Progress Overlay */}
      {isGenerating && (
        <div className="absolute inset-0 bg-surface/80 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Icon name="Loader2" size={32} className="text-primary animate-spin mx-auto mb-2" />
            <div className="text-sm font-medium text-primary">Generating Mock Data</div>
            <div className="text-xs text-text-secondary mt-1">
              Creating {generationConfig.recordCount} records...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockDataGenerator;