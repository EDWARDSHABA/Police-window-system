import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "../Header/header";
import Footer from "../../officer/footer/footer";
import policeStationsData from "../Data/policeStationData";

export default function HeadquartersDashboard() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredStations = policeStationsData.filter((station) =>
    station.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalStations = policeStationsData.length;

  const totalOfficers = policeStationsData.reduce(
    (sum, s) => sum + s.officers,
    0
  );

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">

      <Header />

      <div className="flex-1 pt-20 px-6 pb-4 flex flex-col overflow-hidden">

        {/* banner */}
        <div className="bg-blue-500 text-white p-2 rounded-md mb-4 shadow">
          <h2 className="text-lg font-semibold">
            Welcome Back, Mr Edward Young shaba, this is your home.
          </h2>
          <p className="text-sm opacity-90">
            Here’s what’s happening across all police stations today
          </p>
        </div>

        {/* stat */}
        <div className="grid grid-cols-4 gap-3 mb-3">
          <div className="bg-white shadow rounded p-3 text-center">
            <p className="text-sm text-gray-500">Total Stations</p>
            <h3 className="text-xl font-bold">{totalStations}</h3>
          </div>

          <div className="bg-white shadow rounded p-3 text-center">
            <p className="text-sm text-gray-500">Total Officers</p>
            <h3 className="text-xl font-bold">{totalOfficers}</h3>
          </div>

          <div className="bg-white shadow rounded p-3 text-center">
            <p className="text-sm text-gray-500">Filtered Results</p>
            <h3 className="text-xl font-bold">{filteredStations.length}</h3>
          </div>

          <div className="bg-white shadow rounded p-3 text-center">
            <p className="text-sm text-gray-500">Profile</p>
            <h3 className="text-xl font-bold">--</h3>
          </div>
        </div>

        {/* main */}
        <div className="grid grid-cols-3 gap-6 flex-1 overflow-hidden">

          {/* table */}
          <div className="col-span-2 bg-white shadow rounded p-2 flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-700">
                Police Stations Overview
              </h3>

              <input
                type="text"
                placeholder="Search police station..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-3 py-1.5 text-sm rounded focus:ring-1 focus:ring-blue-400"
              />
            </div>

            <div className="h-[320px] overflow-y-auto border rounded">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white shadow-sm">
                  <tr className="text-left border-b">
                    <th className="py-2 px-3">#</th>
                    <th className="py-2">Police Name</th>
                    <th className="py-2">Admin Name</th>
                    <th className="py-2">Officers</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStations.map((station, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3">{i + 1}</td>
                      <td className="py-2">{station.name}</td>
                      <td className="py-2">{station.admin}</td>
                      <td className="py-2">{station.officers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* action buttons */}
          <div className="bg-white shadow rounded p-4">
            <h3 className="font-semibold mb-4 text-gray-700">
              Quick Actions
            </h3>

            <button
              onClick={() => navigate("/police-stations")}
              className="w-full bg-blue-500 text-white py-2 rounded mb-3 hover:bg-blue-600 transition shadow"
            >
              + Create Police Station
            </button>

            <button
              onClick={() => navigate("/create-admin")}
              className="w-full bg-blue-500 text-white py-2 rounded mb-3 hover:bg-blue-600 transition shadow"
            >
              + Create Police Station Admin
            </button>

            <button
              onClick={() => navigate("/manage-accounts")}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition shadow"
            >
              Manage Stations
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}