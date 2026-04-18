import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StationHeader from "../Header/PoliceStationHeader";
import officersData from "../Data/data";
import Footer from "../../officer/footer/footer";

export default function PoliceStationDashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredOfficers = officersData.filter((officer) =>
    officer.name.toLowerCase().includes(search.toLowerCase()) ||
    officer.badge.includes(search) ||
    officer.rank.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      <StationHeader />

      {/* main content */}
      <div className="flex-1 pt-20 px-6 pb-4 flex flex-col overflow-hidden">

        {/* banner */}
        <div className="bg-blue-300 text-white p-2 rounded-md mb-4 shadow">
          <h2 className="text-lg font-semibold">
            Welcome back Officer, manage your station efficiently.
          </h2>
          <p className="text-sm opacity-90">
            Overview of officers and station activity
          </p>
        </div>

        {/* statistics */}
        <div className="grid grid-cols-4 gap-3 mb-3">
          <div className="bg-white shadow rounded p-3 text-center">
            <p className="text-sm text-gray-500">Total Officers</p>
            <h3 className="text-xl font-bold">{officersData.length}</h3>
          </div>

          <div className="bg-white shadow rounded p-3 text-center">
            <p className="text-sm text-gray-500">Filtered Officers</p>
            <h3 className="text-xl font-bold">{filteredOfficers.length}</h3>
          </div>

          <div className="bg-white shadow rounded p-3 text-center">
            <p className="text-sm text-gray-500">Cases</p>
            <h3 className="text-xl font-bold">--</h3>
          </div>

          <div className="bg-white shadow rounded p-3 text-center">
            <p className="text-sm text-gray-500">Reports</p>
            <h3 className="text-xl font-bold">--</h3>
          </div>
        </div>

        {/* main*/}
        <div className="grid grid-cols-3 gap-6 flex-1 overflow-hidden">

          {/* table */}
          <div className="col-span-2 bg-white shadow rounded p-3 flex flex-col">

            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-700">
                Officers Overview
              </h3>

              <input
                type="text"
                placeholder="Search officers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-3 py-1.5 text-sm rounded focus:ring-1 focus:ring-blue-400"
              />
            </div>

            {/* table */}
            <div className="h-[320px] overflow-y-auto border rounded">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white shadow-sm">
                  <tr className="text-left border-b">
                    <th className="py-2 px-3">#</th>
                    <th className="py-2">Name</th>
                    <th className="py-2">Badge</th>
                    <th className="py-2">Rank</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOfficers.length > 0 ? (
                    filteredOfficers.map((officer, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3">{i + 1}</td>
                        <td className="py-2">{officer.name}</td>
                        <td className="py-2">{officer.badge}</td>
                        <td className="py-2">{officer.rank}</td>
                        <td className="py-2 text-green-600 font-medium">
                          Active
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-gray-500">
                        No results found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* action buttons*/}
          <div className="bg-white shadow rounded p-4">
            <h3 className="font-semibold mb-4 text-gray-700">
              Quick Actions
            </h3>

            <button
              onClick={() => navigate("/create-officer")}
              className="w-full bg-blue-400 text-white py-2 rounded mb-3 hover:bg-blue-600 transition shadow"
            >
              + Add Officer
            </button>

            <button
              onClick={() => navigate("/assign-duties")}
              className="w-full bg-green-400 text-white py-2 rounded mb-3 hover:bg-green-600 transition shadow"
            >
              Assign Duties
            </button>

            <button
              onClick={() => navigate("/manage-officers")}
              className="w-full bg-purple-400 text-white py-2 rounded mb-3 hover:bg-purple-600 transition shadow"
            >
              Manage Officers
            </button>

            <button
              onClick={() => navigate("/track-cases")}
              className="w-full bg-indigo-400 text-white py-2 rounded hover:bg-indigo-600 transition shadow"
            >
              Track Cases
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
