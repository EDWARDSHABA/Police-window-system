import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StationHeader from "../Header/PoliceStationHeader";
import Footer from "../../officer/footer/footer";
import { getStoredOfficers, saveOfficers } from "../officersStorage";

export default function ManageOfficers() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [officers, setOfficers] = useState([
    { id: "MW-ZA-23-898-24", name: "Victor Max", rank: "Sub inspector", active: true },
    { id: "MW-ZA-23-768-24", name: "Shalom Hiu", rank: "Constable", active: true },
    { id: "MW-ZA-23-895-25", name: "Victor Max", rank: "Sergeant", active: false },
    { id: "MW-ZA-23-112-25", name: "Edward Shawa", rank: "Inspector", active: true },
    { id: "MW-ZA-23-898-25", name: "Victor Max", rank: "Superintendent", active: false },
  ]);

  const toggleStatus = (index) => {
    setOfficers((currentOfficers) =>
      currentOfficers.map((officer, officerIndex) =>
        officerIndex === index
          ? { ...officer, active: !officer.active }
          : officer
      )
    );
  };

  const handleDeleteOfficer = (id) => {
    setOfficers((currentOfficers) =>
      currentOfficers.filter((officer) => officer.id !== id)
    );
    setNotification("Officer deleted successfully.");
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

        <div className="bg-gray-200 p-4 rounded mb-6 grid grid-cols-3 gap-4">
          <input className="p-2 rounded border" placeholder="Filter by ID" />
          <input className="p-2 rounded border" placeholder="Filter by Name" />
          <input className="p-2 rounded border" placeholder="Filter by Rank" />
        </div>

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
              {officers
                .filter((o) =>
                  o.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((officer, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{officer.id}</td>
                    <td className="p-2">{officer.name}</td>

                    {/* Toggle */}
                    <td className="p-2">
                      <div
                        onClick={() => toggleStatus(index)}
                        className={`w-12 h-3 rounded-full cursor-pointer ${
                          officer.active ? "bg-red-500" : "bg-gray-300"
                        }`}
                      ></div>
                    </td>

                    <td className="p-2">{officer.rank}</td>

                    {/* Actions */}
                    <td className="p-2 flex justify-center gap-3">
                      <button type="button" className="text-blue-500 cursor-pointer">
                        Edit
                      </button>
                      <button type="button" className="text-black cursor-pointer">
                        Settings
                      </button>
                      <button type="button" className="text-red-500 cursor-pointer">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}
