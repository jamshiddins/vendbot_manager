// src/pages/role-based-access-control-center/index.jsx
import React from 'react';

const RoleBasedAccessControlCenter = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Role-Based Access Control Center</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <p className="text-gray-700 mb-4">
          Configure and manage access permissions for different user roles within the system.
          This center allows administrators to define granular permissions and maintain security policies.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3">Role Management</h3>
            <p className="text-gray-600 mb-4">Create, edit and delete user roles with customized permissions.</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
              Manage Roles
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3">Permission Templates</h3>
            <p className="text-gray-600 mb-4">Use pre-defined permission templates for common role types.</p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm">
              View Templates
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Access Control Matrix</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 border-b border-r text-left">Permission/Feature</th>
                <th className="px-4 py-2 border-b border-r text-center">Admin</th>
                <th className="px-4 py-2 border-b border-r text-center">Manager</th>
                <th className="px-4 py-2 border-b border-r text-center">Technician</th>
                <th className="px-4 py-2 border-b border-r text-center">Operator</th>
                <th className="px-4 py-2 border-b text-center">Viewer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b border-r font-medium">User Management</td>
                <td className="px-4 py-2 border-b border-r text-center">Full</td>
                <td className="px-4 py-2 border-b border-r text-center">View/Edit</td>
                <td className="px-4 py-2 border-b border-r text-center">None</td>
                <td className="px-4 py-2 border-b border-r text-center">None</td>
                <td className="px-4 py-2 border-b text-center">None</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-2 border-b border-r font-medium">Machine Configuration</td>
                <td className="px-4 py-2 border-b border-r text-center">Full</td>
                <td className="px-4 py-2 border-b border-r text-center">Full</td>
                <td className="px-4 py-2 border-b border-r text-center">View/Edit</td>
                <td className="px-4 py-2 border-b border-r text-center">View</td>
                <td className="px-4 py-2 border-b text-center">View</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-r font-medium">Inventory Management</td>
                <td className="px-4 py-2 border-b border-r text-center">Full</td>
                <td className="px-4 py-2 border-b border-r text-center">Full</td>
                <td className="px-4 py-2 border-b border-r text-center">View/Edit</td>
                <td className="px-4 py-2 border-b border-r text-center">View</td>
                <td className="px-4 py-2 border-b text-center">View</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-2 border-b border-r font-medium">Financial Reports</td>
                <td className="px-4 py-2 border-b border-r text-center">Full</td>
                <td className="px-4 py-2 border-b border-r text-center">View</td>
                <td className="px-4 py-2 border-b border-r text-center">None</td>
                <td className="px-4 py-2 border-b border-r text-center">None</td>
                <td className="px-4 py-2 border-b text-center">None</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-r font-medium">Service Management</td>
                <td className="px-4 py-2 border-b border-r text-center">Full</td>
                <td className="px-4 py-2 border-b border-r text-center">Full</td>
                <td className="px-4 py-2 border-b border-r text-center">Full</td>
                <td className="px-4 py-2 border-b border-r text-center">View</td>
                <td className="px-4 py-2 border-b text-center">View</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedAccessControlCenter;