import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeadquartersHeader from "../Header/HeadQuartersHeader";
import Footer from "../../officer/footer/footer";
import headquartersData from "../Data/heardQuartersData";

const stations = [
  "Chinamwali Police Station",
  "Lilongwe Central",
  "Blantyre Urban",
  "Mzuzu Station",
  "Zomba Station",
];

const stationAnalytics = {
  "Chinamwali Police Station": {
    total: [18, 24, 28, 32, 38, 42, 48, 50, 47, 52, 56, 59],
    solved: [12, 18, 22, 26, 30, 34, 38, 41, 39, 43, 46, 49],
  },
  "Lilongwe Central": {
    total: [22, 30, 34, 40, 48, 52, 58, 61, 59, 63, 66, 69],
    solved: [15, 22, 26, 31, 37, 41, 47, 50, 48, 52, 55, 58],
  },
  "Blantyre Urban": {
    total: [16, 21, 27, 33, 41, 45, 50, 54, 53, 57, 60, 64],
    solved: [11, 16, 21, 26, 32, 36, 41, 44, 43, 47, 50, 54],
  },
  "Mzuzu Station": {
    total: [12, 18, 22, 27, 33, 38, 44, 48, 46, 49, 53, 57],
    solved: [8, 13, 17, 21, 26, 30, 34, 38, 36, 39, 43, 46],
  },
  "Zomba Station": {
    total: [14, 19, 24, 29, 35, 39, 45, 49, 47, 50, 54, 58],
    solved: [9, 14, 19, 23, 29, 33, 37, 41, 39, 42, 46, 49],
  },
};

const stationRates = [
  { name: "Lilongwe Central", solved: 91.7, unsolved: 72.3 },
  { name: "Blantyre Urban", solved: 93.9, unsolved: 52.8 },
  { name: "Blantyre Central", solved: 79.5, unsolved: 57.3 },
  { name: "Lilongwe", solved: 91.7, unsolved: 72.3 },
  { name: "Zomba", solved: 78.8, unsolved: 41.2 },
  { name: "Mzuzu", solved: 78.3, unsolved: 51.3 },
];

const caseTypes = [
  { label: "Theft", value: 45, color: "#1f3f6d" },
  { label: "Assault", value: 25, color: "#b28722" },
  { label: "Burglary", value: 15, color: "#5f83c7" },
  { label: "Fraud", value: 10, color: "#b37c0f" },
  { label: "Other", value: 5, color: "#d4bf42" },
];

const monthLabels = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function buildPath(values, maxValue) {
  return values
    .map((value, index) => {
      const x = 50 + index * 52;
      const y = 260 - (value / maxValue) * 220;
      return `${x},${y}`;
    })
    .join(" ");
}

export default function HeadquartersDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState(stations[0]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setDashboardData(headquartersData);
      setLoading(false);
    }, 500);
  }, []);

  const totalStations = dashboardData?.totalStations || 0;
  const totalOfficers = dashboardData?.totalOfficers || 0;
  const totalCases = dashboardData?.totalCases || 0;

  const currentStationData = stationAnalytics[selectedStation];

  const maxChartValue = useMemo(
    () =>
      Math.max(...currentStationData.total, ...currentStationData.solved) + 10,
    [currentStationData]
  );

  const totalPath = buildPath(currentStationData.total, maxChartValue);
  const solvedPath = buildPath(currentStationData.solved, maxChartValue);

  const totalSum = currentStationData.total.reduce((a, b) => a + b, 0);
  const solvedSum = currentStationData.solved.reduce((a, b) => a + b, 0);

  const distributionOffset = useMemo(() => {
    return caseTypes.reduce((acc, item) => {
      acc.push({
        ...item,
        offset: acc.length
          ? acc[acc.length - 1].offset + acc[acc.length - 1].value
          : 0,
      });
      return acc;
    }, []);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      <HeadquartersHeader />

      <main className="flex-1 overflow-y-auto pt-24 px-6 pb-10">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center text-blue-500 font-semibold py-20">
              Loading dashboard...
            </div>
          ) : (
            <>
              {/* Welcome Banner */}
              <div className="bg-blue-300 text-white p-3 rounded-md mb-6 shadow">
                <h2 className="text-lg font-semibold">
                  Welcome Back, Mr Edward Young Shaba
                </h2>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-3 gap-3 mb-6">
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

              {/* Station Selector + Charts */}
              <div className="bg-white rounded-3xl shadow p-6 mb-6">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Select Station
                    </h2>
                    <p className="text-sm text-gray-500">
                      View monthly case trends and performance for a single station.
                    </p>
                  </div>
                  <select
                    value={selectedStation}
                    onChange={(e) => setSelectedStation(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {stations.map((station) => (
                      <option key={station} value={station}>
                        {station}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                  {/* Line Chart */}
                  <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Monthly Case Trend
                        </h3>
                        <p className="text-sm text-gray-500">
                          Total and solved case volumes over the year.
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-2 text-sm text-gray-700">
                          <span className="h-2.5 w-2.5 rounded-full bg-slate-800"></span>
                          Total Cases
                        </span>
                        <span className="inline-flex items-center gap-2 text-sm text-gray-700">
                          <span className="h-2.5 w-2.5 rounded-full bg-orange-500"></span>
                          Solved Cases
                        </span>
                      </div>
                    </div>

                <button
                  onClick={() => navigate("/headquarters/police-stations")}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition shadow"
                >
                  Manage Stations
                </button>
              </div>

              {/* Rates Across Stations */}
              <section className="bg-white rounded-3xl shadow p-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-5">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Rates Across Stations
                    </h2>
                    <p className="text-sm text-gray-500">
                      Solved vs unsolved performance for the key registered
                      stations.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {stationRates.map((station) => (
                    <div
                      key={station.name}
                      className="rounded-3xl bg-slate-50 p-4 border border-slate-200"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-base font-semibold text-gray-800">
                            {station.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Solved: {station.solved}% — Unsolved:{" "}
                            {station.unsolved}%
                          </p>
                        </div>
                        <div className="flex gap-2 text-sm text-gray-600">
                          <span className="inline-flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-slate-800" />{" "}
                            Solved
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-amber-700" />{" "}
                            Unsolved
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 h-4 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-slate-800"
                          style={{ width: `${station.solved}%` }}
                        />
                      </div>
                      <div className="mt-2 h-4 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-amber-700"
                          style={{ width: `${station.unsolved}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}