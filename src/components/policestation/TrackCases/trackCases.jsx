import React, { useState } from "react";
import StationHeader from "../Header/PoliceStationHeader";
import Footer from "../../officer/footer/footer";


export default function CaseDashboardContent() {
  const [caseType, setCaseType] = useState("All");
  const [caseStatus, setCaseStatus] = useState("All");
  const [search, setSearch] = useState("");

  // Sample data (replace with backend later)
  const cases = [
    {
      id: "MW-ZA-001-04-26",
      type: "Robbery",
      status: "Under investigation",
      name: "Chales Mandale",
      officer: "Sgt. Leoleo",
    },
    {
      id: "MW-ZA-002-04-26",
      type: "Robbery",
      status: "Aquitted",
      name: "Hilton Kachamba",
      officer: "Sgt. Makauli",
    },
    {
      id: "MW-ZA-003-04-26",
      type: "Defilement",
      status: "Under investigation",
      name: "Gilo Zened",
      officer: "Sgt. Zengo",
    },
    {
      id: "MW-ZA-004-04-26",
      type: "Assault",
      status: "Complete",
      name: "Zero Mavuto",
      officer: "Sgt. Zengo",
    },
    {
      id: "MW-ZA-005-04-26",
      type: "Robbery",
      status: "Under investigation",
      name: "Nthawi Mayo",
      officer: "Sgt. Leoleo",
    },
  ];

  // FILTER LOGIC
  const filteredCases = cases.filter((c) => {
    const matchType =
      caseType === "All" || c.type === caseType;

    const matchStatus =
      caseStatus === "All" || c.status === caseStatus;

    const matchSearch =
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase());

    return matchType && matchStatus && matchSearch;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <StationHeader /> 
      <div className="mt-10 bg-blue-500 text-white p-4 rounded mb-6">
        All cases here are handled by you and your team. Use the filters to find specific cases or search by case ID or name.
      </div>

      {/* FILTER SECTION */}
      <div className="bg-white p-4 rounded shadow mb-4 flex gap-4 items-center">

        {/* Case Type */}
        <div>
          <label className="text-sm font-semibold">Filter by Case Type</label>
          <select
            value={caseType}
            onChange={(e) => setCaseType(e.target.value)}
            className="border p-2 w-48"
          >
            <option>All</option>
            <option>Assault</option>
            <option>Defilement</option>
            <option>Robbery</option>
          </select>
        </div>

        {/* Case Status */}
        <div>
          <label className="text-sm font-semibold">Filter by Case Status</label>
          <select
            value={caseStatus}
            onChange={(e) => setCaseStatus(e.target.value)}
            className="border p-2 w-48"
          >
            <option>All</option>
            <option>Aquitted</option>
            <option>Under investigation</option>
            <option>Complete</option>
          </select>
        </div>

        {/* Search */}
        <div className="ml-auto">
          <label className="text-sm font-semibold">Search</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search case or name..."
            className="border p-2 w-64"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">CASE ID</th>
              <th className="p-3 text-left">CASE TYPE</th>
              <th className="p-3 text-left">STATUS</th>
              <th className="p-3 text-left">NAME</th>
              <th className="p-3 text-center">VIEW</th>
              <th className="p-3 text-left">OFFICER</th>
            </tr>
          </thead>

          <tbody>
            {filteredCases.length > 0 ? (
              filteredCases.map((c, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{c.id}</td>
                  <td className="p-3">{c.type}</td>
                  <td className="p-3">{c.status}</td>
                  <td className="p-3">{c.name}</td>
                  <td className="p-3 text-center">
                    <button className="text-blue-600">View</button>
                  </td>
                  <td className="p-3">{c.officer}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-center" colSpan="6">
                  No cases found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>      
      <Footer />  
    </div>
  );
}