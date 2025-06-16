// src/pages/development-environment-setup/index.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/ui/Breadcrumb';

const DevelopmentEnvironmentSetup = () => {
  return (
    <div className="p-6">
      <Helmet>
        <title>Development Environment Setup | VendBot Manager</title>
      </Helmet>
      
      <Breadcrumb
        items={[
          { label: 'Dashboard', path: '/dashboard-overview' },
          { label: 'Development Environment Setup', path: '/development-environment-setup' }
        ]}
      />
      
      <div className="mt-6">
        <h1 className="text-2xl font-bold mb-6">Development Environment Setup</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Environment Configuration</h2>
          <p className="mb-4">This page provides tools and resources for setting up and configuring development environments for the VendBot platform.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-2">Local Development</h3>
              <p className="text-gray-600">Configure your local environment with the necessary dependencies and tools.</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-2">API Configuration</h3>
              <p className="text-gray-600">Set up API connections and test endpoints for development.</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-2">Database Setup</h3>
              <p className="text-gray-600">Configure database connections and seed test data.</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-2">Environment Variables</h3>
              <p className="text-gray-600">Manage environment variables for different deployment contexts.</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-2">Build Configuration</h3>
              <p className="text-gray-600">Customize build settings for development and production.</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-2">Testing Tools</h3>
              <p className="text-gray-600">Set up and configure testing frameworks and tools.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentEnvironmentSetup;