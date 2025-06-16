// src/pages/field-service-mobile-app/index.jsx
import React from 'react';

const FieldServiceMobileApp = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Field Service Mobile App</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <p className="text-gray-700 mb-4">
          This dashboard provides field service technicians with mobile tools for managing service calls,
          inventory tracking, and real-time communication with headquarters.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Service Requests</h3>
            <p className="text-gray-600">View and manage pending service requests and work orders.</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Route Optimization</h3>
            <p className="text-gray-600">Get optimized service routes and navigation assistance.</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Inventory Management</h3>
            <p className="text-gray-600">Track parts usage and request resupply from the field.</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Documentation</h3>
            <p className="text-gray-600">Access repair manuals and maintenance documentation.</p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Communication</h3>
            <p className="text-gray-600">Chat with support team and other technicians in real-time.</p>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Time Tracking</h3>
            <p className="text-gray-600">Log service hours and travel time for billing purposes.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Offline mode for areas with poor connectivity</li>
          <li>Augmented reality repair assistance</li>
          <li>Customer signature capture for work verification</li>
          <li>Integration with machine diagnostics systems</li>
          <li>Automatic parts ordering based on diagnostic results</li>
        </ul>
      </div>
    </div>
  );
};

export default FieldServiceMobileApp;