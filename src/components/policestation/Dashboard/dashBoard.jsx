import React from "react";
import { useNavigate } from "react-router-dom";

export default function PoliceStationDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-yellow-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Police Window System</h1>
        <div className="space-x-4">
          <button onClick={() => navigate("/dashboard")} className="hover:underline">Dashboard</button>
          <button onClick={() => navigate("/officers")} className="hover:underline">Officers</button>
          <button onClick={() => navigate("/assign-duties")} className="hover:underline">Duties</button>
          <button onClick={() => navigate("/track-cases")} className="hover:underline">Registered Cases</button>
          <button onClick={() => navigate("/statistics")} className="hover:underline">Statistics</button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Officers</h2>
          <button
            onClick={() => navigate("/create-officer")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add new officers
          </button>
        </div>

        {/* Search */}
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search"
            className="border p-2 rounded-lg"
          />
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Badge</th>
                <th className="p-3">Rank</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "James Mwila", badge: "1234", rank: "Inspector" },
                { name: "Michael Kadza", badge: "1754", rank: "Inspector" },
                { name: "Mariam Soko", badge: "1334", rank: "Constable" },
                { name: "Frank Phiri", badge: "1554", rank: "Sergeant" },
                { name: "Sarah Tembo", badge: "1550", rank: "Inspector" },
                { name: "John Banda", badge: "1879", rank: "Constable" },
              ].map((officer, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{officer.name}</td>
                  <td className="p-3">{officer.badge}</td>
                  <td className="p-3">{officer.rank}</td>
                  <td className="p-3 text-green-600">Active</td>
                  <td className="p-3">
                    <button className="text-blue-500 hover:underline">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Navigation Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate("/assign-duties")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Assign Duties
          </button>

          <button
            onClick={() => navigate("/manage-officers")}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg"
          >
            Manage Officers
          </button>

          <button
            onClick={() => navigate("/track-cases")}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
          >
            Track Cases
          </button>
        </div>
      </div>
    </div>
  );
}
