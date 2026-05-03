import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { getStoredViewCases } from "../Data/viewCasesData";

import Header from "../Header/OfficerHeader";
import Footer from "../../officer/footer/footer";

const CASE_TYPES = ["All", "Robbery", "Assault", "Burglary", "Fraud", "Theft", "Defilement"];
const CASE_STATUSES = ["All", "Aquitted", "Under investigation", "Closed"];

export default function ViewCases() {
  const location = useLocation();

  const [cases, setCases] = useState(() => getStoredViewCases());
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // =========================
  // POPUPS
  // =========================
  const [viewCase, setViewCase] = useState(null);
  const [editCase, setEditCase] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    setCases(getStoredViewCases());
  }, [location.key]);

  const filteredCases = useMemo(() => {
    return cases.filter((item) => {
      const caseId = item.id ?? item.caseId ?? "";
      const caseType = item.type ?? item.typeOfCrime ?? "Other";
      const caseStatus = item.status ?? "Under investigation";
      const caseName =
        item.name ?? item.victim?.vFullName ?? item.caseName ?? "Unknown";
      const assignedOfficer = item.officer ?? "Assigned Officer";

      const search = searchTerm.toLowerCase();

      return (
        (typeFilter === "All" || caseType === typeFilter) &&
        (statusFilter === "All" || caseStatus === statusFilter) &&
        (
          caseId.toLowerCase().includes(search) ||
          caseType.toLowerCase().includes(search) ||
          caseStatus.toLowerCase().includes(search) ||
          caseName.toLowerCase().includes(search) ||
          assignedOfficer.toLowerCase().includes(search)
        )
      );
    });
  }, [cases, typeFilter, statusFilter, searchTerm]);

  // =========================
  // SAVE STATUS
  // =========================
  const handleSave = () => {
    const updated = cases.map((c) =>
      c.id === editCase.id ? { ...c, status: newStatus } : c
    );
    setCases(updated);
    setEditCase(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 relative">

      <Header />

      <div className="flex-1 p-6 mt-16">

        {/* FILTERS */}
        <div className="bg-white p-4 rounded shadow mb-6 flex gap-4">
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="border p-2">
            {CASE_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border p-2">
            {CASE_STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>

          <input
            className="border p-2 ml-auto"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">TYPE</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">NAME</th>
                <th className="p-3">VIEW</th>
                <th className="p-3">OFFICER</th>
                <th className="p-3">ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredCases.map((item) => {
                const isClosed = item.status === "Closed";

                return (
                  <tr key={item.id} className="border-b">

                    <td className="p-3">{item.id}</td>
                    <td className="p-3">{item.type}</td>
                    <td className="p-3">{item.status}</td>
                    <td className="p-3">{item.name}</td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() => setViewCase(item)}
                        className="text-blue-600 font-bold"
                      >
                        View
                      </button>
                    </td>

                    <td className="p-3">{item.officer}</td>

                    <td className="p-3">
                      <button
                        disabled={isClosed}
                        onClick={() => {
                          if (isClosed) {
                            alert("Case is CLOSED and cannot be edited.");
                            return;
                          }
                          setEditCase(item);
                          setNewStatus(item.status);
                        }}
                        className={`px-3 py-1 rounded text-xs ${
                          isClosed ? "bg-gray-300" : "bg-yellow-200"
                        }`}
                      >
                        Edit
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================
          VIEW POPUP (SOFT OVERLAY)
      ========================= */}
      {viewCase && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded w-[500px] shadow-2xl">
            <h2 className="text-xl font-bold mb-3">Case Details</h2>

            <p><b>ID:</b> {viewCase.id}</p>
            <p><b>Type:</b> {viewCase.type}</p>
            <p><b>Status:</b> {viewCase.status}</p>
            <p><b>Name:</b> {viewCase.name}</p>
            <p><b>Officer:</b> {viewCase.officer}</p>
            <p className="mt-2"><b>Description:</b> {viewCase.description}</p>

            <button
              onClick={() => setViewCase(null)}
              className="mt-4 bg-gray-300 px-4 py-2 rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* =========================
          EDIT POPUP (SOFT OVERLAY)
      ========================= */}
      {editCase && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded w-[400px] shadow-2xl">

            <h2 className="text-xl font-bold mb-3">Update Status</h2>

            <p className="mb-2"><b>ID:</b> {editCase.id}</p>

            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="border p-2 w-full"
            >
              {CASE_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
              >
                Save
              </button>

              <button
                onClick={() => setEditCase(null)}
                className="bg-gray-300 px-4 py-2 rounded w-full"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}