// src/pages/performance-optimization-tools/index.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/ui/Breadcrumb';

const PerformanceOptimizationTools = () => {
  return (
    <div className="p-6">
      <Helmet>
        <title>Performance Optimization Tools | VendBot Manager</title>
      </Helmet>
      
      <Breadcrumb
        items={[
          { label: 'Dashboard', path: '/dashboard-overview' },
          { label: 'Performance Optimization Tools', path: '/performance-optimization-tools' }
        ]}
      />
      
      <div className="mt-6">
        <h1 className="text-2xl font-bold mb-6">Performance Optimization Tools</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Performance Management</h2>
          <p className="mb-4">Access tools and utilities for optimizing the performance of VendBot applications and services.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-2">Code Profiling</h3>
              <p className="text-gray-600">Profile application code to identify performance bottlenecks.</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-2">Bundle Analysis</h3>
              <p className="text-gray-600">Analyze JavaScript bundles to optimize size and loading time.</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-2">Memory Management</h3>
              <p className="text-gray-600">Monitor and optimize memory usage in applications.</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-2">Network Optimization</h3>
              <p className="text-gray-600">Tools for analyzing and improving network requests.</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-2">Database Query Analysis</h3>
              <p className="text-gray-600">Optimize database queries for better performance.</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-2">Resource Monitoring</h3>
              <p className="text-gray-600">Monitor system resources and track usage patterns.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceOptimizationTools;