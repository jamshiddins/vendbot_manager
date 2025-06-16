// src/pages/security-access-control/index.jsx
import React from "react";

const SecurityAccessControl = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Security & Access Control</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-700 mb-4">
          This page is responsible for managing security settings and access control for the VendBot platform.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-lg mb-2">Access Permissions</h3>
            <p className="text-gray-600">Configure user access permissions and role-based controls</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-lg mb-2">Security Policies</h3>
            <p className="text-gray-600">Manage security policies and compliance settings</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-lg mb-2">Audit Logs</h3>
            <p className="text-gray-600">View and export security audit logs</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-lg mb-2">Authentication Settings</h3>
            <p className="text-gray-600">Configure authentication methods and requirements</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityAccessControl;