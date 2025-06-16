// src/pages/code-quality-testing-dashboard/index.jsx
import React from 'react';

const CodeQualityTestingDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Code Quality & Testing Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Code Coverage</h2>
          <div className="flex items-center mb-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
            </div>
            <span className="ml-2 font-medium">78%</span>
          </div>
          <p className="text-gray-600 text-sm">Target: 80%</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Code Quality</h2>
          <div className="flex items-center mb-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
            </div>
            <span className="ml-2 font-medium">A+</span>
          </div>
          <p className="text-gray-600 text-sm">0 critical issues found</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-center">
              <span className="text-green-600 font-bold text-xl">248</span>
              <span className="text-sm text-gray-600">Passing</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-red-600 font-bold text-xl">3</span>
              <span className="text-sm text-gray-600">Failing</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-yellow-600 font-bold text-xl">12</span>
              <span className="text-sm text-gray-600">Skipped</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Code Issues</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border-b pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Potential memory leak in useEffect cleanup</h3>
                    <p className="text-sm text-gray-600">src/components/DataFetcher.jsx:42</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">Warning</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">Missing dependency in useEffect hook may cause unexpected behavior</p>
              </div>
            ))}
          </div>
          <button className="mt-4 text-blue-600 text-sm font-medium hover:underline">View all issues</button>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Test Execution Timeline</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded border">
            <p className="text-gray-500">Timeline visualization will appear here</p>
          </div>
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <span>Last run: 2 hours ago</span>
            <span>Average duration: 4m 23s</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Testing Activity</h2>
          <select className="border rounded p-2 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Suite</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { date: 'May 28, 2023', suite: 'API Integration Tests', status: 'Passed', duration: '2m 46s', author: 'Alex Chen' },
                { date: 'May 27, 2023', suite: 'User Authentication', status: 'Failed', duration: '3m 12s', author: 'Morgan Lee' },
                { date: 'May 27, 2023', suite: 'Dashboard Components', status: 'Passed', duration: '1m 52s', author: 'Jamie Wilson' },
                { date: 'May 26, 2023', suite: 'E2E Workflow Tests', status: 'Passed', duration: '6m 03s', author: 'Taylor Smith' },
              ].map((test, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{test.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{test.suite}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${test.status === 'Passed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{test.duration}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{test.author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CodeQualityTestingDashboard;