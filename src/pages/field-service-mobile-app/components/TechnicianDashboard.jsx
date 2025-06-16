// src/pages/field-service-mobile-app/components/TechnicianDashboard.jsx
import React from 'react';

const TechnicianDashboard = () => {
  // Mock data for demonstration
  const todayStats = {
    completedJobs: 3,
    pendingJobs: 2,
    totalHours: 5.5,
    mileage: 27
  };

  const upcomingJobs = [
    { time: '1:30 PM', location: '123 Main St', type: 'Repair' },
    { time: '3:15 PM', location: '456 Oak Ave', type: 'Maintenance' }
  ];

  return (
    <div className="mt-6">
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg font-semibold mb-3">Today's Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-xl font-bold text-blue-700">{todayStats.completedJobs}</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-xl font-bold text-yellow-700">{todayStats.pendingJobs}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">Hours</p>
            <p className="text-xl font-bold text-green-700">{todayStats.totalHours}</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">Mileage</p>
            <p className="text-xl font-bold text-purple-700">{todayStats.mileage} mi</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-3">Upcoming Jobs</h3>
        {upcomingJobs.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {upcomingJobs.map((job, index) => (
              <li key={index} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">{job.time}</p>
                  <p className="text-sm text-gray-600">{job.location}</p>
                </div>
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {job.type}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-4">No upcoming jobs scheduled</p>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
          Start New Job
        </button>
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md">
          View Weekly Schedule
        </button>
      </div>
    </div>
  );
};

export default TechnicianDashboard;