import React, { useEffect, useState } from "react";
import OfficerHeader from "../Header/header";
import Footer from "../footer/footer";

export default function OfficerDashboard() {

  const [cases, setCases] = useState([]);

  // 🔥 API READY (connect your backend here)
  useEffect(() => {
    // Example fetch (replace with your API)
    setCases([
      { id: "MW-001", type: "Robbery", status: "Open", name: "John Banda", officer: "Sgt A" },
      { id: "MW-002", type: "Fraud", status: "Closed", name: "Mary Phiri", officer: "Sgt B" },
      { id: "MW-003", type: "Theft", status: "Pending", name: "James Zulu", officer: "Sgt C" },
    ]);
  }, []);

  return (
    <div className="h-full w-full flex flex-col overflow-hidden bg-gray-100">

      <OfficerHeader />

      <div className="flex flex-col flex-1 pt-16 overflow-hidden">

        <main className="flex-1 flex flex-col overflow-hidden p-4">

          {/* TITLE */}
          <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>

          {/* STATS */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="bg-blue-200 p-4 rounded-lg shadow">Today Cases: 38</div>
            <div className="bg-gray-200 p-4 rounded-lg shadow">In Court: 18</div>
            <div className="bg-green-200 p-4 rounded-lg shadow">Closed: 23</div>
            <div className="bg-yellow-200 p-4 rounded-lg shadow">Total: 79</div>
          </div>

          {/* MAIN CONTENT */}
          <div className="grid grid-cols-3 gap-4 flex-1 overflow-hidden">

            {/* TABLE */}
            <div className="col-span-2 bg-white rounded-lg shadow p-4 flex flex-col">

              <div className="flex justify-between mb-2">
                <h3 className="font-semibold">Recent Cases</h3>
                <input placeholder="Search..." className="border p-1 rounded-lg" />
              </div>

              {/* SCROLL AREA */}
              <div className="flex-1 overflow-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="p-2">ID</th>
                      <th className="p-2">Type</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Name</th>
                      <th className="p-2">Officer</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cases.map((c, i) => (
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
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-2">Officers on Duty</h3>
              <ul className="space-y-1 text-sm">
                <li>Sgt. Mathew</li>
                <li>Sgt. Mwale</li>
                <li>Sgt. Banda</li>
                <li>Sgt. Heled</li>
              </ul>
            </div>

          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 mt-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Create</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Register</button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">Update</button>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg">View</button>
          </div>

        </main>

        {/* FOOTER */}
        <div className="h-12 bg-gray-200 flex items-center justify-center">
          <Footer />
        </div>

      </div>
    </div>
  );
}