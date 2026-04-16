import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../officer/footer/footer";
import { getStoredOfficers } from "../officersStorage";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

export default function Dashboard() {
  const navigate = useNavigate();

  const [totalOfficers, setTotalOfficers] = useState(0);
  const [displayCount, setDisplayCount] = useState(1000);
  const [rotation, setRotation] = useState(0);

  // 📊 DATA
  const lineData = [
    { month: "Jan", theft: 20, assault: 10, fraud: 5 },
    { month: "Feb", theft: 30, assault: 15, fraud: 10 },
    { month: "Mar", theft: 25, assault: 20, fraud: 8 },
    { month: "Apr", theft: 40, assault: 18, fraud: 12 },
    { month: "May", theft: 35, assault: 22, fraud: 15 },
    { month: "Jun", theft: 50, assault: 30, fraud: 18 },
    { month: "Jul", theft: 45, assault: 28, fraud: 20 },
    { month: "Aug", theft: 55, assault: 35, fraud: 25 },
    { month: "Sep", theft: 60, assault: 38, fraud: 28 },
    { month: "Oct", theft: 58, assault: 36, fraud: 30 },
    { month: "Nov", theft: 65, assault: 40, fraud: 35 },
    { month: "Dec", theft: 70, assault: 45, fraud: 40 },
  ];

  const pieData = [
    { name: "Theft", value: 40 },
    { name: "Assault", value: 25 },
    { name: "Burglary", value: 20 },
    { name: "Fraud", value: 15 },
  ];

  const COLORS = ["#1E3A8A", "#F59E0B", "#10B981", "#EF4444"];

  const barData = [
    { month: "Jan", solved: 60, unsolved: 40 },
    { month: "Feb", solved: 70, unsolved: 30 },
    { month: "Mar", solved: 65, unsolved: 35 },
    { month: "Apr", solved: 80, unsolved: 20 },
    { month: "May", solved: 75, unsolved: 25 },
    { month: "Jun", solved: 85, unsolved: 15 },
    { month: "Jul", solved: 88, unsolved: 12 },
    { month: "Aug", solved: 90, unsolved: 10 },
    { month: "Sep", solved: 87, unsolved: 13 },
    { month: "Oct", solved: 85, unsolved: 15 },
    { month: "Nov", solved: 89, unsolved: 11 },
    { month: "Dec", solved: 92, unsolved: 8 },
  ];

  // ✅ Sync officers
  useEffect(() => {
    const count = getStoredOfficers().length;
    setTotalOfficers(count);
  }, []);

  // ✅ Animated Counter
  useEffect(() => {
    let start = 1000;
    const end = totalOfficers;

    if (end === 0) return;

    const interval = setInterval(() => {
      start -= Math.ceil((start - end) / 10);

      if (start <= end) {
        start = end;
        clearInterval(interval);
      }

      setDisplayCount(start);
    }, 30);

    return () => clearInterval(interval);
  }, [totalOfficers]);

  // ✅ Pie Rotation Logic (every 30s)
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 360);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6">
      
      {/* WELCOME */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-5 rounded-xl shadow mb-6 text-lg font-semibold">
        Welcome Back, Officer Admin 👮‍♂️
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6 mb-6">

        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-5 rounded-xl shadow hover:scale-105 transition">
          <p className="text-sm opacity-80">Total Officers</p>
          <h2 className="text-2xl font-bold">{displayCount}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:scale-105 transition">
          <p className="text-sm text-gray-500">Today's Cases</p>
          <h2 className="text-2xl font-bold">22</h2>
        </div>

        <div className="bg-yellow-500 text-white p-5 rounded-xl shadow hover:scale-105 transition">
          <p className="text-sm opacity-80">All Cases</p>
          <h2 className="text-2xl font-bold">107</h2>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold mb-3">Quick Actions</h3>

          <button
            onClick={() => navigate("/create-officer")}
            className="w-full bg-blue-500 text-white py-2 rounded mb-3 hover:bg-blue-700 transition"
          >
            Officers
          </button>

          <button
            onClick={() => navigate("/assign-duties")}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Assign Duties
          </button>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-3 gap-6 mb-6">

        {/* PIE */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="mb-3 font-semibold">Case Types Distribution</h3>

          <div
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: "transform 2s ease-in-out",
            }}
          >
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={80} label>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LINE */}
        <div className="col-span-2 bg-white p-5 rounded-xl shadow">
          <h3 className="mb-3 font-semibold">Monthly Case Trends</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Line type="monotone" dataKey="theft" stroke="#1E3A8A" />
              <Line type="monotone" dataKey="assault" stroke="#F59E0B" />
              <Line type="monotone" dataKey="fraud" stroke="#10B981" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BAR */}
      <div className="bg-white p-5 rounded-xl shadow mb-10">
        <h3 className="mb-3 font-semibold">Monthly Case Resolution</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey="solved" fill="#1E3A8A" />
            <Bar dataKey="unsolved" fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Footer />
    </div>
  );
}