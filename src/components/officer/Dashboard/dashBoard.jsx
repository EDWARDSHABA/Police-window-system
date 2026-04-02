import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import OfficerHeader from "../Header/header";
import Footer from "../footer/footer";
import casesData from "../Data/caseData";

export default function OfficerDashboard() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const cases = casesData;

  const filteredCases = cases.filter((c) =>
    c.id.toLowerCase().includes(search.toLowerCase()) ||
    c.type.toLowerCase().includes(search.toLowerCase()) ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.status.toLowerCase().includes(search.toLowerCase()) ||
    c.officer.toLowerCase().includes(search.toLowerCase())
  );

  const totalCases = cases.length;
  const openCases = cases.filter((c) => c.status === "Open").length;
  const closedCases = cases.filter((c) => c.status === "Closed").length;
  const pendingCases = cases.filter((c) => c.status === "Pending").length;

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">

      <OfficerHeader />

      <div className="flex-1 pt-20 px-6 pb-4 flex flex-col overflow-hidden">

        {/* banner */}
        <div className="bg-blue-300 text-white p-2 rounded-md mb-4 shadow">
          <h2 className="text-lg font-semibold">
            Officer Case Dashboard
          </h2>
          <p className="text-sm opacity-100">
            All cases are loaded from the central data component
          </p>
        </div>

        {/* statistics */}
        <div className="grid grid-cols-4 gap-3 mb-3">
          <div className="bg-white shadow rounded p-3 text-center">
            <p className="text-sm text-gray-500">Total Cases</p>
            <h3 className="text-xl font-bold">{totalCases}</h3>
          </div>

          <div className="bg-white shadow rounded p-3 text-center">
            <p className="text-sm text-gray-500">Open</p>
            <h3 className="text-xl font-bold text-blue-600">{openCases}</h3>
          </div>

          <div className="bg-white shadow rounded p-3 text-center">
            <p className="text-sm text-gray-500">Closed</p>
            <h3 className="text-xl font-bold text-green-600">{closedCases}</h3>
          </div>

          <div className="bg-white shadow rounded p-3 text-center">
            <p className="text-sm text-gray-500">Pending</p>
            <h3 className="text-xl font-bold text-yellow-600">{pendingCases}</h3>
          </div>
        </div>

        {/* main */}
        <div className="grid grid-cols-3 gap-6 flex-1 overflow-hidden">

          {/* table */}
          <div className="col-span-2 bg-white shadow rounded p-2 flex flex-col">

            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-700">
                Cases Overview
              </h3>

              <input
                type="text"
                placeholder="Search cases..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-3 py-1.5 text-sm rounded focus:ring-1 focus:ring-green-400"
              />
            </div>

            <div className="h-[320px] overflow-y-auto border rounded">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white shadow-sm">
                  <tr className="text-left border-b">
                    <th className="py-2 px-3">ID</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Name</th>
                    <th className="py-2">Officer</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCases.map((c, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3">{c.id}</td>
                      <td className="py-2">{c.type}</td>
                      <td className="py-2">{c.status}</td>
                      <td className="py-2">{c.name}</td>
                      <td className="py-2">{c.officer}</td>
                    </tr>
                  ))}
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
              onClick={() => navigate("/create-case")}
              className="w-full bg-green-400 text-white py-2 rounded mb-3 hover:bg-green-600 transition shadow"
            >
              + Create Case
            </button>

            <button
              onClick={() => navigate("/register-suspect")}
              className="w-full bg-blue-400 text-white py-2 rounded mb-3 hover:bg-blue-600 transition shadow"
            >
              + Register Suspect
            </button>

            <button
              onClick={() => navigate("/case-reports")}
              className="w-full bg-yellow-300 text-white py-2 rounded hover:bg-yellow-600 transition shadow"
            >
              View Reports
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}