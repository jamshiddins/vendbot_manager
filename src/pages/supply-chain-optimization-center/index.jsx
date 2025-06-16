// src/pages/supply-chain-optimization-center/index.jsx
import React from 'react';

const SupplyChainOptimizationCenter = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Supply Chain Optimization Center</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Inventory Turnover</h3>
          <div className="flex items-center justify-center h-40">
            <div className="relative inline-flex">
              <div className="w-28 h-28 rounded-full bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">7.4x</span>
                </div>
              </div>
              <svg className="absolute top-0 left-0" width="112" height="112" viewBox="0 0 112 112">
                <circle
                  cx="56"
                  cy="56"
                  r="52"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="8"
                  strokeDasharray="327"
                  strokeDashoffset="82"
                  strokeLinecap="round"
                  transform="rotate(-90 56 56)"
                />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">74% of industry benchmark</p>
          <div className="mt-3">
            <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 rounded-md text-sm font-medium">
              View Details
            </button>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Supply Chain Efficiency</h3>
          <div className="flex items-center justify-center h-40">
            <div className="relative inline-flex">
              <div className="w-28 h-28 rounded-full bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">85%</span>
                </div>
              </div>
              <svg className="absolute top-0 left-0" width="112" height="112" viewBox="0 0 112 112">
                <circle
                  cx="56"
                  cy="56"
                  r="52"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="8"
                  strokeDasharray="327"
                  strokeDashoffset="49"
                  strokeLinecap="round"
                  transform="rotate(-90 56 56)"
                />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">+5% from last quarter</p>
          <div className="mt-3">
            <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 py-2 rounded-md text-sm font-medium">
              View Details
            </button>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Stockout Rate</h3>
          <div className="flex items-center justify-center h-40">
            <div className="relative inline-flex">
              <div className="w-28 h-28 rounded-full bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">2.3%</span>
                </div>
              </div>
              <svg className="absolute top-0 left-0" width="112" height="112" viewBox="0 0 112 112">
                <circle
                  cx="56"
                  cy="56"
                  r="52"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="8"
                  strokeDasharray="327"
                  strokeDashoffset="320"
                  strokeLinecap="round"
                  transform="rotate(-90 56 56)"
                />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">-0.7% from last quarter</p>
          <div className="mt-3">
            <button className="w-full bg-red-50 hover:bg-red-100 text-red-700 py-2 rounded-md text-sm font-medium">
              View Details
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Supply Chain Performance</h3>
          <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
            <p className="text-gray-500">[Performance Chart Visualization]</p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-gray-600">Lead Time</p>
              <p className="text-lg font-semibold">3.2 days</p>
            </div>
            <div className="bg-green-50 p-3 rounded-md">
              <p className="text-sm text-gray-600">Order Accuracy</p>
              <p className="text-lg font-semibold">98.7%</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-md">
              <p className="text-sm text-gray-600">Forecast Accuracy</p>
              <p className="text-lg font-semibold">92.1%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Critical Items</h3>
          <ul className="divide-y divide-gray-200">
            <li className="py-3">
              <div className="flex justify-between">
                <span className="font-medium">Coffee Beans (Premium)</span>
                <span className="text-red-600 text-sm">Low Stock</span>
              </div>
              <div className="mt-1 flex justify-between text-sm">
                <span className="text-gray-500">Current: 24 units</span>
                <span className="text-gray-500">Min: 50 units</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div className="bg-red-600 h-1.5 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </li>
            <li className="py-3">
              <div className="flex justify-between">
                <span className="font-medium">Chocolate Syrup</span>
                <span className="text-yellow-600 text-sm">Medium Stock</span>
              </div>
              <div className="mt-1 flex justify-between text-sm">
                <span className="text-gray-500">Current: 38 units</span>
                <span className="text-gray-500">Min: 30 units</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '55%' }}></div>
              </div>
            </li>
            <li className="py-3">
              <div className="flex justify-between">
                <span className="font-medium">Paper Cups (12oz)</span>
                <span className="text-yellow-600 text-sm">Medium Stock</span>
              </div>
              <div className="mt-1 flex justify-between text-sm">
                <span className="text-gray-500">Current: 450 units</span>
                <span className="text-gray-500">Min: 400 units</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </li>
          </ul>
          <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md text-sm font-medium">
            View All Items
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Supplier Performance</h2>
          <div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm">
              Generate Report
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">On-Time Delivery</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality Rating</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Compliance</th>
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-3 text-sm font-medium">Global Coffee Suppliers</td>
                <td className="py-3 px-3 text-sm">96%</td>
                <td className="py-3 px-3 text-sm">4.8/5</td>
                <td className="py-3 px-3 text-sm">1.2 days</td>
                <td className="py-3 px-3 text-sm">98%</td>
                <td className="py-3 px-3 text-sm">
                  <div className="flex items-center">
                    <span className="mr-2 font-medium">4.7</span>
                    <div className="w-24 bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-3 text-sm font-medium">Sweet Ingredients Co.</td>
                <td className="py-3 px-3 text-sm">88%</td>
                <td className="py-3 px-3 text-sm">4.5/5</td>
                <td className="py-3 px-3 text-sm">1.8 days</td>
                <td className="py-3 px-3 text-sm">95%</td>
                <td className="py-3 px-3 text-sm">
                  <div className="flex items-center">
                    <span className="mr-2 font-medium">4.2</span>
                    <div className="w-24 bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-3 text-sm font-medium">Packaging Solutions Inc.</td>
                <td className="py-3 px-3 text-sm">92%</td>
                <td className="py-3 px-3 text-sm">4.6/5</td>
                <td className="py-3 px-3 text-sm">1.5 days</td>
                <td className="py-3 px-3 text-sm">97%</td>
                <td className="py-3 px-3 text-sm">
                  <div className="flex items-center">
                    <span className="mr-2 font-medium">4.4</span>
                    <div className="w-24 bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-3 text-sm font-medium">Dairy Distributors Ltd.</td>
                <td className="py-3 px-3 text-sm">85%</td>
                <td className="py-3 px-3 text-sm">4.2/5</td>
                <td className="py-3 px-3 text-sm">2.1 days</td>
                <td className="py-3 px-3 text-sm">90%</td>
                <td className="py-3 px-3 text-sm">
                  <div className="flex items-center">
                    <span className="mr-2 font-medium">3.9</span>
                    <div className="w-24 bg-gray-200 rounded-full h-1.5">
                      <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupplyChainOptimizationCenter;