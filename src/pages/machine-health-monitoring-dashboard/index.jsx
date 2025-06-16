// src/pages/machine-health-monitoring-dashboard/index.jsx
import React from 'react';

const MachineHealthMonitoringDashboard = () => {
  // Mock data for demonstration
  const machineHealthData = [
    { id: 'VB1001', name: 'VendBot X200', status: 'Healthy', uptime: '99.8%', lastMaintenance: '2023-11-15', issues: 0 },
    { id: 'VB1002', name: 'VendBot X100', status: 'Warning', uptime: '97.2%', lastMaintenance: '2023-10-28', issues: 2 },
    { id: 'VB1003', name: 'VendBot Mini', status: 'Critical', uptime: '85.4%', lastMaintenance: '2023-09-10', issues: 5 },
    { id: 'VB1004', name: 'VendBot X200', status: 'Healthy', uptime: '99.5%', lastMaintenance: '2023-11-10', issues: 0 },
    { id: 'VB1005', name: 'VendBot Pro', status: 'Warning', uptime: '96.8%', lastMaintenance: '2023-10-15', issues: 1 }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Healthy':
        return 'bg-green-100 text-green-800';
      case 'Warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'Critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Machine Health Monitoring Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Health Overview</h3>
          <div className="flex items-center justify-center h-48">
            <div className="relative inline-flex">
              <div className="w-32 h-32 rounded-full bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">80%</span>
                </div>
              </div>
              <svg className="absolute top-0 left-0" width="128" height="128" viewBox="0 0 128 128">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="8"
                  strokeDasharray="376"
                  strokeDashoffset="75"
                  strokeLinecap="round"
                  transform="rotate(-90 64 64)"
                />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Healthy</p>
              <p className="font-semibold text-green-600">60%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Warning</p>
              <p className="font-semibold text-yellow-600">30%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Critical</p>
              <p className="font-semibold text-red-600">10%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Performance Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Avg. Uptime</span>
                <span className="text-sm font-medium">95.7%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '95.7%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Maintenance Compliance</span>
                <span className="text-sm font-medium">87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Error Rate</span>
                <span className="text-sm font-medium">3.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: '3.2%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Responsiveness</span>
                <span className="text-sm font-medium">98.3%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '98.3%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Alerts & Notifications</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-red-500 pl-3 py-2">
              <p className="font-medium">VB1003 Critical Error</p>
              <p className="text-sm text-gray-600">Payment system failure - 2h ago</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-3 py-2">
              <p className="font-medium">VB1002 Low Inventory</p>
              <p className="text-sm text-gray-600">Multiple items below threshold - 4h ago</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-3 py-2">
              <p className="font-medium">VB1005 Temperature Warning</p>
              <p className="text-sm text-gray-600">Cooling system performance degraded - 5h ago</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-3 py-2">
              <p className="font-medium">Maintenance Reminder</p>
              <p className="text-sm text-gray-600">3 machines due for service - Tomorrow</p>
            </div>
          </div>
          <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md text-sm">
            View All Alerts
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Machine Status</h2>
          <div className="flex space-x-2">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm">
              Filter
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm">
              View All
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Machine ID</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uptime</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Maintenance</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issues</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {machineHealthData.map((machine) => (
                <tr key={machine.id} className="hover:bg-gray-50">
                  <td className="py-3 px-3 text-sm font-medium">{machine.id}</td>
                  <td className="py-3 px-3 text-sm">{machine.name}</td>
                  <td className="py-3 px-3 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(machine.status)}`}>
                      {machine.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-sm">{machine.uptime}</td>
                  <td className="py-3 px-3 text-sm">{machine.lastMaintenance}</td>
                  <td className="py-3 px-3 text-sm">{machine.issues}</td>
                  <td className="py-3 px-3 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">Details</button>
                    <button className="text-green-600 hover:text-green-800">Diagnose</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MachineHealthMonitoringDashboard;