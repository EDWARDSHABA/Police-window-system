import { useMemo, useState } from "react";
import OfficerHeader from "../Header/OfficerHeader";

const CASES = [
  {
    id: "MW-ZA-001-04-26",
    type: "Robery",
    status: "Aquito",
    name: "Chales Mandale",
    officer: "Sgt.Leoleo",
  },
  {
    id: "MW-ZA-002-04-26",
    type: "Robery",
    status: "Under investigation",
    name: "Hilon Kachamba",
    officer: "Sgt.Makauli",
  },
  {
    id: "MW-ZA-003-04-26",
    type: "Difiement",
    status: "Under investigation",
    name: "Gilo Zened",
    officer: "Sgt.Zengo",
  },
  {
    id: "MW-ZA-004-04-26",
    type: "Difiement",
    status: "Aquito",
    name: "Zero Mavuto",
    officer: "Sgt.Zengo",
  },
  {
    id: "MW-ZA-005-04-26",
    type: "Robery",
    status: "Under investigation",
    name: "Nthawi Mayo",
    officer: "Sgt.Leoleo",
  },
  {
    id: "MW-ZA-006-04-26",
    type: "Assault",
    status: "Under investigation",
    name: "Jay Utaka",
    officer: "Sgt.Makauli",
  },
  {
    id: "MW-ZA-007-04-26",
    type: "Assault",
    status: "Under investigation",
    name: "Yekobe afiko",
    officer: "Sgt.Leoleo",
  },
  {
    id: "MW-ZA-008-04-26",
    type: "Difiement",
    status: "Under investigation",
    name: "Wilson Agilo",
    officer: "Sgt.Leoleo",
  },
  {
    id: "MW-ZA-009-04-26",
    type: "Difiement",
    status: "Under investigation",
    name: "Mobile Course",
    officer: "Sgt.Dolo",
  },
  {
    id: "MW-ZA-010-04-26",
    type: "Robery",
    status: "Under investigation",
    name: "DSA Amfumu",
    officer: "Sgt.Makauli",
  },
  {
    id: "MW-ZA-011-04-26",
    type: "Robery",
    status: "Under investigation",
    name: "Dateb Itheka",
    officer: "Sgt.Leoleo",
  },
  {
    id: "MW-ZA-012-04-26",
    type: "Difiement",
    status: "Under investigation",
    name: "Project Kubeba",
    officer: "Sgt.Leoleo",
  },
  {
    id: "MW-ZA-013-04-26",
    type: "Assault",
    status: "Under investigation",
    name: "Nane Ndikolo",
    officer: "Sgt.Dolo",
  },
];

const CASE_TYPES = ["All", "Assault", "Difiement", "Robery"];
const CASE_STATUSES = ["All", "Aquito", "Under investigation", "Complete"];

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
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <OfficerHeader />

      <main className="pt-28 px-4 md:px-10 pb-10">
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
            <table className="min-w-full border-separate border-spacing-0 text-left">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">CASE ID</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">CASE TYPE</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">STATUS</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">NAME</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">VIEW</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">OFFICER</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredCases.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 text-sm font-medium text-slate-900">{item.id}</td>
                    <td className="px-5 py-4 text-sm text-slate-700">{item.type}</td>
                    <td className="px-5 py-4 text-sm text-slate-700">{item.status}</td>
                    <td className="px-5 py-4 text-sm text-slate-700">{item.name}</td>
                    <td className="px-5 py-4 text-center text-sm text-slate-700">
                      <button className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">
                        ●
                      </button>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-700">{item.officer}</td>
                  </tr>
                ))}
                {filteredCases.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center text-sm text-slate-500">
                      No cases match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
