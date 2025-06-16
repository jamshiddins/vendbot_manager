// src/pages/field-service-mobile-app/components/ServiceRequestList.jsx
import React from 'react';

const ServiceRequestList = ({ requests = [] }) => {
  // This component would receive actual requests from props in a real implementation
  const demoRequests = [
    {
      id: 'SR-10045',
      machine: 'VendBot Pro X200',
      location: '123 Main St, Suite 400',
      issue: 'Payment system malfunction',
      priority: 'high',
      status: 'assigned'
    },
    {
      id: 'SR-10046',
      machine: 'VendBot Mini 100',
      location: '456 Park Ave',
      issue: 'Cooling system error',
      priority: 'medium',
      status: 'en-route'
    },
    {
      id: 'SR-10047',
      machine: 'VendBot Pro X200',
      location: '789 Broadway, Floor 3',
      issue: 'Inventory discrepancy',
      priority: 'low',
      status: 'scheduled'
    }
  ];

  const requestsToShow = requests.length > 0 ? requests : demoRequests;

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'en-route':
        return 'bg-purple-100 text-purple-800';
      case 'scheduled':
        return 'bg-indigo-100 text-indigo-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-3">Service Requests</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Machine</th>
              <th className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
              <th className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {requestsToShow.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm">{request.id}</td>
                <td className="py-3 px-4 text-sm">{request.machine}</td>
                <td className="py-3 px-4 text-sm">{request.location}</td>
                <td className="py-3 px-4 text-sm">{request.issue}</td>
                <td className="py-3 px-4 text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityClass(request.priority)}`}>
                    {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(request.status)}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">View</button>
                  <button className="text-green-600 hover:text-green-800">Accept</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceRequestList;