import React from "react";
import Header from "../Header/header"; // adjust path if needed

export default function HeadquartersDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Reusable Header */}
      <Header />

      {/* Content */}
      <div className="p-10">
        <h2 className="text-lg font-semibold mb-4">Headquarters Dashboard</h2>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-green-200 p-4 rounded-lg">
            <p className="text-sm">Total Stations</p>
            <h3 className="text-2xl font-bold">12</h3>
          </div>
          <div className="bg-blue-200 p-4 rounded-lg">
            <p className="text-sm">Total Officers</p>
            <h3 className="text-2xl font-bold">340</h3>
          </div>
          <div className="bg-yellow-200 p-4 rounded-lg">
            <p className="text-sm">Active Cases</p>
            <h3 className="text-2xl font-bold">89</h3>
          </div>
          <div className="bg-purple-200 p-4 rounded-lg">
            <p className="text-sm">Admins</p>
            <h3 className="text-2xl font-bold">8</h3>
          </div>
        </div>
      </div>
    </div>
  );
}