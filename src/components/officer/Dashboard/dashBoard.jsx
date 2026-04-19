import React, { useState } from "react";
import Header from "../Header/OfficerHeader";
import Footer from "../../officer/footer/footer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function PoliceStationDashboard() {
  // 🔷 Station Reference (IMPORTANT)
  const [policeStation] = useState({
    name: "Chinamwali Police Station",
    code: "MW-ZA-01",
  });

  // 🔷 Stats (kept same style as your UI)
  const stats = {
    casesInCourt: 18,
    caseClosed: 23,
    totalCases: 2756,
  };

  // 🔷 Monthly Bar Data (FIXED → months, not districts)
  const monthlyBarData = [
    { month: "Jan", total: 40, solved: 25 },
    { month: "Feb", total: 55, solved: 30 },
    { month: "Mar", total: 60, solved: 38 },
    { month: "Apr", total: 75, solved: 50 },
    { month: "May", total: 90, solved: 65 },
    { month: "Jun", total: 110, solved: 80 },
    { month: "Jul", total: 120, solved: 95 },
    { month: "Aug", total: 140, solved: 110 },
    { month: "Sep", total: 135, solved: 100 },
    { month: "Oct", total: 150, solved: 120 },
    { month: "Nov", total: 165, solved: 135 },
    { month: "Dec", total: 180, solved: 150 },
  ];

  // 🔷 Pie Data
  const pieData = [
    { label: "Fraud", value: 20, color: "#1e3a8a" },
    { label: "Theft", value: 30, color: "#f59e0b" },
    { label: "Assault", value: 25, color: "#0ea5e9" },
    { label: "Burglary", value: 25, color: "#10b981" },
  ];

  // 🔷 Rates
  const stationRates = [
    { name: "Lilongwe", solved: 91.7, unsolved: 52.1 },
    { name: "Blantyre", solved: 79.5, unsolved: 57.3 },
    { name: "Zomba", solved: 78.8, unsolved: 41.2 },
    { name: "Mzuzu", solved: 78.3, unsolved: 51.3 },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-1 overflow-y-auto pt-24 px-6 pb-6">

        {/* 🔷 HEADER */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {policeStation.name} Dashboard
          </h2>
          <p className="text-sm text-gray-500">
            Station Code: {policeStation.code}
          </p>
        </div>

        {/* 🔷 STATS ROW (UNCHANGED STYLE) */}
        <div className="grid grid-cols-4 gap-4 mb-6">

          <StatCard title="Cases in Court" value={stats.casesInCourt} color="bg-blue-500" />
          <StatCard title="Case Closed" value={stats.caseClosed} color="bg-gray-500" />
          <StatCard title="Total Cases" value={stats.totalCases} color="bg-blue-400" />

          {/* QUICK ACTIONS */}
          <div className="bg-yellow-700 text-white rounded-xl p-4 shadow">
            <h3 className="font-semibold mb-3">Quick Actions</h3>

            <button className="w-full bg-white text-black py-2 mb-2 rounded hover:bg-gray-200 transition">
              Register Case
            </button>

            <button className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition">
              Duties
            </button>
          </div>
        </div>

        {/* 🔷 CHART SECTION */}
        <div className="grid grid-cols-3 gap-6 mb-6">

          {/* PIE */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-4 text-gray-600">
              Case Types Distribution
            </h3>

            <div className="flex justify-center">
              <div
                className="w-40 h-40 rounded-full"
                style={{
                  background: `conic-gradient(${pieData
                    .map((p) => `${p.color} ${p.value * 3.6}deg`)
                    .join(",")})`,
                }}
              />
            </div>

            <div className="mt-4 space-y-2">
              {pieData.map((p) => (
                <div key={p.label} className="flex justify-between text-sm">
                  <span>{p.label}</span>
                  <span>{p.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* 🔥 BAR GRAPH (FIXED) */}
          <div className="col-span-2 bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-4 text-gray-600">
              Monthly Case Performance
            </h3>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyBarData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" /> {/* ✅ months now */}
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar dataKey="total" fill="#1e3a8a" name="Total Cases" />
                <Bar dataKey="solved" fill="#f59e0b" name="Solved Cases" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 🔷 RATES (UNCHANGED STYLE) */}
        <div className="bg-white p-4 rounded-xl shadow mb-10">
          <h3 className="font-semibold mb-4 text-gray-600">
           Cases Rates @ our Stations
          </h3>

          
        </div>

      </main>

      <Footer />
    </div>
  );
}

/* 🔷 COMPONENT */
function StatCard({ title, value, color }) {
  return (
    <div className={`${color} text-white p-4 rounded-xl shadow`}>
      <p className="text-sm opacity-80">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}