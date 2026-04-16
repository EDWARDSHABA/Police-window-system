import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StationHeader from "../Header/PoliceStationHeader";
import Footer from "../../officer/footer/footer";
import { getStoredOfficers, saveOfficers } from "../officersStorage";

export default function ManageOfficers() {
  const [search, setSearch] = useState("");
  const [officers, setOfficers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ LOAD officers from storage
  useEffect(() => {
    const stored = getStoredOfficers() || [];
    setOfficers(stored);
  }, []);

  // ✅ OPTIONAL: refresh when coming back from create page
  useEffect(() => {
    if (location.state?.message) {
      const stored = getStoredOfficers() || [];
      setOfficers(stored);
    }
  }, [location.state]);

  // ✅ Toggle status + persist
  const toggleStatus = (index) => {
    const updated = officers.map((officer, i) =>
      i === index ? { ...officer, active: !officer.active } : officer
    );

    setOfficers(updated);
    saveOfficers(updated);
  };

  // ✅ Delete + persist
  const handleDeleteOfficer = (id) => {
    const updated = officers.filter((officer) => officer.id !== id);
    setOfficers(updated);
    saveOfficers(updated);
  };

  const filteredOfficers = officers.filter((officer) =>
    officer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <StationHeader />

      <div className="flex-1 p-6 pt-24">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Manage Officer Accounts
          </button>

          <button
            onClick={() => navigate("/create-officer")}
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            CREATE NEW OFFICER
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center border rounded px-2 bg-white">
            <input
              type="text"
              placeholder="Search Officer"
              className="p-2 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="text-sm text-gray-500">Search</span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-200 p-4 rounded mb-6 grid grid-cols-3 gap-4">
          <input className="p-2 rounded border" placeholder="Filter by ID" />
          <input className="p-2 rounded border" placeholder="Filter by Name" />
          <input className="p-2 rounded border" placeholder="Filter by Rank" />
        </div>

        {/* Table */}
        <div className="bg-white rounded shadow p-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr className="text-left">
                <th className="p-2">Police ID</th>
                <th className="p-2">Officer</th>
                <th className="p-2">Activate/Deactivate</th>
                <th className="p-2">Rank</th>
                <th className="p-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredOfficers.map((officer, index) => (
                <tr key={officer.id} className="border-b">
                  <td className="p-2">{officer.id}</td>
                  <td className="p-2">{officer.name}</td>

                  {/* Toggle */}
                  <td className="p-2">
                    <div
                      onClick={() => toggleStatus(index)}
                      className={`w-12 h-3 rounded-full cursor-pointer ${
                        officer.active ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                  </td>

                  <td className="p-2">{officer.rank}</td>

                  {/* Actions */}
                  <td className="p-2 flex justify-center gap-3">
                    <button className="text-blue-500">Edit</button>
                    <button className="text-black">Settings</button>
                    <button
                      onClick={() => handleDeleteOfficer(officer.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredOfficers.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No officers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}