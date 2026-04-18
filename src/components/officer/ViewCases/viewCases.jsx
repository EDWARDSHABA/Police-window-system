import { useMemo, useState } from "react";

const CASES = [
  {
    id: "MW-ZA-001-04-26",
    type: "Robbery",
    status: "Aquito",
    name: "Chales Mandela",
    officer: "Sgt. Leoleo",
  },
  {
    id: "MW-ZA-002-04-26",
    type: "Robbery",
    status: "Under investigation",
    name: "Hilon Kachambe",
    officer: "Sgt. Makuali",
  },
  {
    id: "MW-ZA-003-04-26",
    type: "Difiement",
    status: "Under investigation",
    name: "Gilo Zenod",
    officer: "Sgt. Zengo",
  },
  {
    id: "MW-ZA-004-04-26",
    type: "Difiement",
    status: "Aquito",
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
  {
    id: "MW-ZA-006-04-26",
    type: "Assault",
    status: "Under investigation",
    name: "Jay Utaka",
    officer: "Sgt. Makuali",
  },
  {
    id: "MW-ZA-007-04-26",
    type: "Burglary",
    status: "Closed",
    name: "Lydia Phwezi",
    officer: "Sgt. Samuel Ken",
  },
  {
    id: "MW-ZA-008-04-26",
    type: "Fraud",
    status: "Under investigation",
    name: "Patrick Dongo",
    officer: "Sgt. Leoleo",
  },
  {
    id: "MW-ZA-009-04-26",
    type: "Assault",
    status: "Aquito",
    name: "Maureen Chipwanya",
    officer: "Sgt. Makuali",
  },
  {
    id: "MW-ZA-010-04-26",
    type: "Theft",
    status: "Under investigation",
    name: "Brighton Sithole",
    officer: "Sgt. Zengo",
  },
  {
    id: "MW-ZA-011-04-26",
    type: "Robbery",
    status: "Under investigation",
    name: "Dalitso Phiri",
    officer: "Sgt. Leoleo",
  },
  {
    id: "MW-ZA-012-04-26",
    type: "Difiement",
    status: "Closed",
    name: "Erick Banda",
    officer: "Sgt. Samuel Ken",
  },
  {
    id: "MW-ZA-013-04-26",
    type: "Assault",
    status: "Under investigation",
    name: "Witness Chithande",
    officer: "Sgt. Makuali",
  },
];

const CASE_TYPES = ["All", "Robbery", "Assault", "Burglary", "Fraud", "Theft", "Difiement"];
const CASE_STATUSES = ["All", "Aquito", "Under investigation", "Closed"];

export default function ViewCases() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCases = useMemo(() => {
    return CASES.filter((item) => {
      const matchesType = typeFilter === "All" || item.type === typeFilter;
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      const normalizedSearch = searchTerm.toLowerCase().trim();
      const matchesSearch =
        normalizedSearch === "" ||
        item.id.toLowerCase().includes(normalizedSearch) ||
        item.type.toLowerCase().includes(normalizedSearch) ||
        item.status.toLowerCase().includes(normalizedSearch) ||
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.officer.toLowerCase().includes(normalizedSearch);

      return matchesType && matchesStatus && matchesSearch;
    });
  }, [typeFilter, statusFilter, searchTerm]);

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
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none"
          >
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
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none"
          >
            {CASE_STATUSES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="sr-only">Search cases</span>
          <div className="relative">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search cases..."
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pr-12 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none"
            />
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
              🔍
            </span>
          </div>
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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredCases.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 text-xs">
                <td className="px-3 py-2 font-medium text-gray-900">{item.id}</td>
                <td className="px-3 py-2 text-gray-700">{item.type}</td>
                <td className="px-3 py-2 text-gray-700">{item.status}</td>
                <td className="px-3 py-2 text-gray-700">{item.name}</td>
                <td className="px-3 py-2 text-center">
                  <button className="bg-yellow-50 hover:bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold border border-yellow-300">
                    Edit
                  </button>
                </td>
                <td className="px-3 py-2 text-gray-700">{item.officer}</td>
              </tr>
            ))}
            {filteredCases.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-16 text-center text-sm text-gray-500">
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
