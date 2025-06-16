// src/pages/component-library-design-system/index.jsx
import React from 'react';

const ComponentLibraryDesignSystem = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Component Library & Design System</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <p className="text-gray-700 mb-4">
          This page provides a comprehensive library of UI components and design guidelines 
          for the VendBot Manager application. Use these components to maintain 
          consistency across the application.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Button Components</h3>
          <div className="space-y-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
              Primary Button
            </button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 mr-2">
              Secondary Button
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Danger Button
            </button>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Form Elements</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text Input</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Enter text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Dropdown</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold mb-3">Card Components</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 className="font-medium mb-2">Basic Card</h4>
            <p className="text-sm text-gray-600">A simple card component for displaying information.</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gray-100 p-3 border-b border-gray-200">
              <h4 className="font-medium">Card with Header</h4>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600">Card content with a distinct header section.</p>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 className="font-medium mb-2">Interactive Card</h4>
            <p className="text-sm text-gray-600 mb-3">Card with an action button.</p>
            <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
              Action
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold mb-3">Color Palette</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="h-16 bg-blue-600 rounded-t-lg"></div>
            <div className="bg-gray-100 p-2 rounded-b-lg text-sm">
              <p>Primary Blue</p>
              <p className="text-xs text-gray-500">#2563EB</p>
            </div>
          </div>
          <div>
            <div className="h-16 bg-gray-800 rounded-t-lg"></div>
            <div className="bg-gray-100 p-2 rounded-b-lg text-sm">
              <p>Dark Gray</p>
              <p className="text-xs text-gray-500">#1F2937</p>
            </div>
          </div>
          <div>
            <div className="h-16 bg-green-600 rounded-t-lg"></div>
            <div className="bg-gray-100 p-2 rounded-b-lg text-sm">
              <p>Success Green</p>
              <p className="text-xs text-gray-500">#16A34A</p>
            </div>
          </div>
          <div>
            <div className="h-16 bg-red-600 rounded-t-lg"></div>
            <div className="bg-gray-100 p-2 rounded-b-lg text-sm">
              <p>Error Red</p>
              <p className="text-xs text-gray-500">#DC2626</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentLibraryDesignSystem;