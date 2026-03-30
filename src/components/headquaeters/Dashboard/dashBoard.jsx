import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeadquartersDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-green-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">HEADQUARTERS SYSTEM</h1>
        <div className="space-x-4">
          <button onClick={() => navigate("/headquarters")} className="hover:underline">Dashboard</button>
          <button onClick={() => navigate("/police-stations")} className="hover:underline">Stations</button>
          <button onClick={() => navigate("/manage-accounts")} className="hover:underline">Accounts</button>
          <button onClick={() => navigate("/create-admin")} className="hover:underline">Create Admin</button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
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

        {/* Main Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Stations List */}
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="font-semibold mb-3">Police Stations</h3>
            <ul className="space-y-2">
              <li>Zomba Police Station</li>
              <li>Blantyre Police Station</li>
              <li>Lilongwe Police Station</li>
              <li>Mzuzu Police Station</li>
            </ul>
          </div>

          {/* Admins */}
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="font-semibold mb-3">Station Admins</h3>
            <ul className="space-y-2">
              <li>Admin - Zomba</li>
              <li>Admin - Blantyre</li>
              <li>Admin - Lilongwe</li>
              <li>Admin - Mzuzu</li>
            </ul>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate("/create-admin")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Create Police Station Admin
          </button>

          <button
            onClick={() => navigate("/police-stations")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            View Police Stations
          </button>

          <button
            onClick={() => navigate("/manage-accounts")}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg"
          >
            Manage Accounts
          </button>
        </div>
      </div>
    </div>
  );
}
