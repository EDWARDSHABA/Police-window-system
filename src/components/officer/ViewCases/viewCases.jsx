import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getStoredViewCases } from "../Data/viewCasesData";

const CASE_TYPES = ["All", "Robbery", "Assault", "Burglary", "Fraud", "Theft", "Difiement"];
const CASE_STATUSES = ["All", "Aquito", "Under investigation", "Closed"];

export default function ViewCases() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cases, setCases] = useState(() => getStoredViewCases());
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCases(getStoredViewCases());
  }, [location.key]);

  const filteredCases = useMemo(() => {
    return cases.filter((item) => {
      const caseId = item.id ?? item.caseId ?? "";
      const caseType = item.type ?? item.typeOfCrime ?? "Other";
      const caseStatus = item.status ?? "Under investigation";
      const caseName = item.name ?? item.victim?.vFullName ?? item.caseName ?? "Unknown";
      const assignedOfficer = item.officer ?? "Assigned Officer";

      const matchesType = typeFilter === "" || typeFilter === "All" || caseType === typeFilter;
      const matchesStatus =
        statusFilter === "" || statusFilter === "All" || caseStatus === statusFilter;
      const normalizedSearch = searchTerm.toLowerCase().trim();
      const matchesSearch =
        normalizedSearch === "" ||
        caseId.toLowerCase().includes(normalizedSearch) ||
        caseType.toLowerCase().includes(normalizedSearch) ||
        caseStatus.toLowerCase().includes(normalizedSearch) ||
        caseName.toLowerCase().includes(normalizedSearch) ||
        assignedOfficer.toLowerCase().includes(normalizedSearch);

      return matchesType && matchesStatus && matchesSearch;
    });
  }, [cases, typeFilter, statusFilter, searchTerm]);

  return (
    <>
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">View Cases</h1>
        <p className="mt-2 text-slate-600">Search, filter, and review all registered cases.</p>
      </div>

      <div className="grid gap-3 md:grid-cols-[240px_240px_minmax(240px,1fr)]">
        <label className="block">
          <span className="sr-only">Filter by case type</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className={`w-full rounded-lg border border-slate-300 bg-white px-4 py-3 shadow-sm focus:border-slate-500 focus:outline-none ${
              typeFilter === "" ? "text-slate-400" : "text-slate-900"
            }`}
          >
            <option value="" disabled>
              Filter by case type
            </option>
            {CASE_TYPES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="sr-only">Filter by case status</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`w-full rounded-lg border border-slate-300 bg-white px-4 py-3 shadow-sm focus:border-slate-500 focus:outline-none ${
              statusFilter === "" ? "text-slate-400" : "text-slate-900"
            }`}
          >
            <option value="" disabled>
              Filter by case status
            </option>
            {CASE_STATUSES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="sr-only">Search cases</span>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search cases..."
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none"
          />
        </label>
      </div>
    </div>

    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-3 py-2 font-semibold text-gray-900 text-sm">CASE ID</th>
              <th className="px-3 py-2 font-semibold text-gray-900 text-sm">CASE TYPE</th>
              <th className="px-3 py-2 font-semibold text-gray-900 text-sm">STATUS</th>
              <th className="px-3 py-2 font-semibold text-gray-900 text-sm">NAME</th>
              <th className="px-3 py-2 font-semibold text-gray-900 text-sm">VIEW</th>
              <th className="px-3 py-2 font-semibold text-gray-900 text-sm">OFFICER</th>
              <th className="px-3 py-2 font-semibold text-gray-900 text-sm">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredCases.map((item) => (
              <tr key={item.id ?? item.caseId} className="hover:bg-gray-50 text-xs">
                {(() => {
                  const caseId = item.id ?? item.caseId;
                  const caseStatus = item.status ?? "Under investigation";
                  const isClosed = caseStatus === "Closed";

                  return (
                    <>
                <td className="px-3 py-2 font-medium text-gray-900">{item.id ?? item.caseId}</td>
                <td className="px-3 py-2 text-gray-700">{item.type ?? item.typeOfCrime ?? "Other"}</td>
                <td className="px-3 py-2 text-gray-700">{caseStatus}</td>
                <td className="px-3 py-2 text-gray-700">{item.name ?? item.victim?.vFullName ?? item.caseName ?? "Unknown"}</td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    onClick={() => navigate(`/view-case/${caseId}`)}
                    className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700"
                    aria-label={`View case ${caseId}`}
                  >
                    View
                  </button>
                </td>
                <td className="px-3 py-2 text-gray-700">{item.officer ?? "Assigned Officer"}</td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (isClosed) return;
                      navigate(`/update-case/${caseId}`, { state: { selectedCase: item } });
                    }}
                    className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                      isClosed
                        ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                        : "bg-yellow-50 hover:bg-yellow-100 text-yellow-800 border-yellow-300"
                    }`}
                  >
                    Edit
                  </button>
                </td>
                    </>
                  );
                })()}
              </tr>
            ))}
            {filteredCases.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-16 text-center text-sm text-gray-500">
                  No cases match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}
