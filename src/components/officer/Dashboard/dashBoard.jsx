import React, { useState, useEffect } from "react";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function PoliceStationDashboard() {
  const [policeStation] = useState({
    name: "Chinamwali Police Station",
    code: "MW-ZA-01",
  });

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 720);
    }, 5000); // rotates every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const stats = {
    casesInCourt: 18,
    caseClosed: 23,
    totalCases: 2756,
  };

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

  const pieData = [
    { name: "Fraud", value: 20, color: "#1e3a8a" },
    { name: "Theft", value: 30, color: "#f59e0b" },
    { name: "Assault", value: 25, color: "#0ea5e9" },
    { name: "Burglary", value: 25, color: "#10b981" },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="bg-blue-300 mt-20 text-white px-6 py-3 rounded-lg shadow mb-6">
        <div className="flex items-center gap-3">
          CHINAMWALI POLICE STATION DASHBOARD
          <p className="text-sm text-gray-500">
            Station Code: {policeStation.code}
          </p>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pt-6 px-6 pb-6">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {policeStation.name} Dashboard
          </h2>
          
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard title="Cases in Court" value={stats.casesInCourt} color="bg-blue-500" />
          <StatCard title="Case Closed" value={stats.caseClosed} color="bg-gray-500" />
          <StatCard title="Total Cases" value={stats.totalCases} color="bg-blue-400" />

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
        

        {/* CHARTS */}
        <div className="grid grid-cols-3 gap-6 mb-6">

          {/* 🔥 ROTATING PIE CHART */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-4 text-gray-600">
              Case Types Distribution (%)
            </h3>

            <div
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: "transform 2s ease-in-out",
              }}
            >
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* LEGEND */}
            <div className="mt-4 space-y-2">
              {pieData.map((p) => (
                <div key={p.name} className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 inline-block rounded-full"
                      style={{ backgroundColor: p.color }}
                    />
                    {p.name}
                  </span>
                  <span>{p.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* BAR CHART */}
          <div className="col-span-2 bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-4 text-gray-600">
              Monthly Case Performance
            </h3>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyBarData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#1e3a8a" name="Total Cases" />
                <Bar dataKey="solved" fill="#f59e0b" name="Solved Cases" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* STAT CARD */
function StatCard({ title, value, color }) {
  return (
    <div className={`${color} text-white p-4 rounded-xl shadow`}>
      <p className="text-sm opacity-80">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}