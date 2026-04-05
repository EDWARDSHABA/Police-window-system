import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeadquartersHeader from "../Header/HeadQuartersHeader";
import Footer from "../../officer/footer/footer";
import { fetchHeadquarterDashboard } from "./headQuartersDashboardApi";

export default function HeadquartersDashboard() {
  const [search, setSearch] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const res = await fetchHeadquarterDashboard();
        setDashboardData(res.data);
        setError(null);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const totalStations = dashboardData?.totalStations || 0;
  const totalOfficers = dashboardData?.totalOfficers || 0;
  const totalCases = dashboardData?.totalCases || 0;

  const filteredStations =
    dashboardData?.recentStations?.filter((station) =>
      station.stationName?.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <HeadquartersHeader />

      {/* MAIN CONTENT */}
      <div className="flex-1 pt-20 px-6 pb-10 flex flex-col">

        {/* Loading */}
        {loading && (
          <div className="text-center text-blue-500 font-semibold">
            Loading dashboard...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center text-red-500 font-semibold">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Welcome Banner */}
            <div className="bg-blue-400 text-white p-3 rounded-md mb-4 shadow">
              <h2 className="text-lg font-semibold">
                Welcome Back, Mr Edward Young Shaba
              </h2>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white shadow rounded p-3 text-center">
                <p className="text-sm text-gray-500">Total Stations</p>
                <h3 className="text-xl font-bold">{totalStations}</h3>
              </div>

              <div className="bg-white shadow rounded p-3 text-center">
                <p className="text-sm text-gray-500">Total Officers</p>
                <h3 className="text-xl font-bold">{totalOfficers}</h3>
              </div>

              <div className="bg-white shadow rounded p-3 text-center">
                <p className="text-sm text-gray-500">Total Cases</p>
                <h3 className="text-xl font-bold">{totalCases}</h3>
              </div>
            </div>

            {/* CONTENT GRID */}
            <div className="grid grid-cols-3 gap-6 flex-1">

              {/* TABLE SECTION */}
              <div className="col-span-2 bg-white shadow rounded p-3 flex flex-col">

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

                {/* SCROLLABLE TABLE */}
                <div className="h-[350px] overflow-y-auto border rounded">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-white shadow-sm">
                      <tr className="text-left border-b">
                        <th className="py-2 px-3">#</th>
                        <th className="py-2">Station Name</th>
                        <th className="py-2">Location</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredStations.length > 0 ? (
                        filteredStations.map((station, i) => (
                          <tr
                            key={station._id || i}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="py-2 px-3">{i + 1}</td>
                            <td className="py-2">{station.stationName}</td>
                            <td className="py-2">{station.location}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center py-4 text-gray-500">
                            No stations found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* QUICK ACTIONS */}
              <div className="bg-white shadow rounded p-6">
                <h3 className="font-semibold mb-4 text-gray-700">
                  Quick Actions
                </h3>

                <button
                  onClick={() => navigate("/police-stations")}
                  className="w-full bg-blue-500 text-white py-2 rounded mb-3 hover:bg-blue-700 transition shadow"
                >
                  + Create Police Station
                </button>

                <button
                  onClick={() => navigate("/manage-accounts")}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition shadow"
                >
                  Manage Stations
                </button>
              </div>

            </div>
          </>
        )}
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}