import React from "react";
import { useNavigate } from "react-router-dom";

export default function OfficerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col bg-gray-100">

      {/* ✅ FIXED HEADER */}
      <header className="fixed top-0 left-0 w-full h-16 bg-yellow-800 text-white flex justify-between items-center px-6 z-50">
        <h2 className="text-xl font-bold">POLICE WINDOW SYSTEM</h2>

        <div className="space-x-6">
          <button onClick={() => navigate("/officer-dashboard")} className="hover:underline">Dashboard</button>
          <button onClick={() => navigate("/register-case")} className="hover:underline">Register Case</button>
          <button onClick={() => navigate("/update-case")} className="hover:underline">Case Update</button>
          <button onClick={() => navigate("/create-statement")} className="hover:underline">Duty Assignment</button>
          <button onClick={() => navigate("/view-cases")} className="hover:underline">Statistics</button>
        </div>
      </header>

      {/* ✅ FULL SCREEN CONTENT */}
      <main className="flex-1 pt-16 flex flex-col overflow-hidden">

        {/* ✅ FIXED WIDTH (MATCHES HEADER) */}
        <div className="flex-1 overflow-y-auto w-full px-6 flex flex-col">

          {/* DASHBOARD TITLE */}
          <h2 className="text-lg font-semibold mb-4">Dashboard</h2>

          {/* STATS */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-200 p-4 rounded-lg">
              <p className="text-sm">Today Cases</p>
              <h3 className="text-2xl font-bold">38</h3>
            </div>

            <div className="bg-gray-200 p-4 rounded-lg">
              <p className="text-sm">Cases in Court</p>
              <h3 className="text-2xl font-bold">18</h3>
            </div>

            <div className="bg-blue-300 p-4 rounded-lg">
              <p className="text-sm">Case Closed</p>
              <h3 className="text-2xl font-bold">23</h3>
            </div>

            <div className="bg-yellow-200 p-4 rounded-lg">
              <p className="text-sm">Total Cases</p>
              <h3 className="text-2xl font-bold">79</h3>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-3 gap-6 flex-1">

            {/* TABLE */}
            <div className="col-span-2 bg-white shadow rounded-lg p-4 flex flex-col">
              <h3 className="font-semibold mb-3">Recent Cases</h3>

              <div className="flex justify-end mb-3">
                <input
                  type="text"
                  placeholder="Search by name, id..."
                  className="border p-2 rounded-lg"
                />
              </div>

              <div className="flex-1 overflow-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="p-2">Case ID</th>
                      <th className="p-2">Case Type</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Name</th>
                      <th className="p-2">Officer</th>
                    </tr>
                  </thead>

                  <tbody>
                    {[
                      { id: "MW-ZA-001", type: "Robbery", status: "Acquitted", name: "Charles Mandale", officer: "Sgt. Leo" },
                      { id: "MW-ZA-002", type: "Robbery", status: "Under Investigation", name: "Hilon Kachamba", officer: "Sgt. Max" },
                      { id: "MW-ZA-003", type: "Defilement", status: "Under Investigation", name: "Gilo Zened", officer: "Sgt. Zengo" },
                      { id: "MW-ZA-004", type: "Robbery", status: "Closed", name: "Zero Mavuto", officer: "Sgt. Leo" },
                    ].map((c, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-2">{c.id}</td>
                        <td className="p-2">{c.type}</td>
                        <td className="p-2">{c.status}</td>
                        <td className="p-2">{c.name}</td>
                        <td className="p-2">{c.officer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SIDE PANEL */}
            <div className="bg-white shadow rounded-lg p-4 flex flex-col">
              <h3 className="font-semibold mb-3">Officers on Duty</h3>
              <ul className="space-y-2">
                <li>Sgt. Mathew</li>
                <li>Sgt. Mwale</li>
                <li>Sgt. Banda</li>
                <li>Sgt. Heled</li>
              </ul>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-6 flex gap-4">
            <button onClick={() => navigate("/create-statement")} className="bg-green-500 text-white px-4 py-2 rounded-lg">
              Create Statement
            </button>

            <button onClick={() => navigate("/register-case")} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Register Case
            </button>

            <button onClick={() => navigate("/update-case")} className="bg-yellow-500 text-white px-4 py-2 rounded-lg">
              Update Case
            </button>

            <button onClick={() => navigate("/view-cases")} className="bg-purple-500 text-white px-4 py-2 rounded-lg">
              View Cases
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}