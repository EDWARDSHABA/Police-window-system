import { useMemo, useState } from "react";

const initialCases = [
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

export default function UpdateCase() {
  const [caseId, setCaseId] = useState("MW-ZA-015-04-26");
  const [complainant, setComplainant] = useState("");
  const [suspect, setSuspect] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [assignedOfficer, setAssignedOfficer] = useState("Sgt. Leoleo");
  const [status, setStatus] = useState("Under investigation");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCases = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return initialCases;
    return initialCases.filter(
      (item) =>
        item.id.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.officer.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wider text-black opacity-100">Update Case</p>
            <h1 className="text-4xl font-black text-black mt-1 tracking-tight">Case management dashboard</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-black">
              Selected: <span className="font-semibold">{caseId}</span>
            </div>
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-semibold">
              Save changes
            </button>
          </div>
        </div>
      </div>

      {/* Form and Officer Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Form */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-black text-black mb-4 tracking-tight">Select case to update</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Case ID</label>
              <input
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-1">Victim / complainant</label>
              <input
                value={complainant}
                onChange={(e) => setComplainant(e.target.value)}
                placeholder="Enter name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-1">Suspect</label>
              <input
                value={suspect}
                onChange={(e) => setSuspect(e.target.value)}
                placeholder="Enter suspect name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-1">Any information</label>
              <textarea
                rows={3}
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Add case notes"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Officer and Status */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-200">
            <p className="text-xs uppercase tracking-wider text-black opacity-100">Assigned Officer</p>
            <p className="text-lg font-bold text-black mt-2">{assignedOfficer}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-200">
            <label className="block text-sm font-medium text-black mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option>Under investigation</option>
              <option>Open</option>
              <option>Closed</option>
              <option>Aquito</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
          <div>
            <p className="text-sm uppercase tracking-wider text-black opacity-100">Search Results</p>
            <h2 className="text-3xl font-black text-black mt-1 tracking-tight">Case listings</h2>
          </div>
          <div className="flex gap-2">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, id, officer"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
            />
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-semibold">
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-3 py-2 font-semibold text-gray-900 text-sm">CASE ID</th>
                <th className="px-3 py-2 font-semibold text-gray-900 text-sm">TYPE</th>
                <th className="px-3 py-2 font-semibold text-gray-900 text-sm">STATUS</th>
                <th className="px-3 py-2 font-semibold text-gray-900 text-sm">NAME</th>
                <th className="px-3 py-2 font-semibold text-gray-900 text-sm">VIEW</th>
                <th className="px-3 py-2 font-semibold text-gray-900 text-sm">OFFICER</th>
                <th className="px-3 py-2 font-semibold text-gray-900 text-sm">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCases.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 text-sm">
                  <td className="px-3 py-2 font-medium text-gray-900">{item.id}</td>
                  <td className="px-3 py-2 text-slate-900">{item.type}</td>
                  <td className="px-3 py-2 text-slate-900">{item.status}</td>
                  <td className="px-3 py-2 text-slate-900">{item.name}</td>
                  <td className="px-3 py-2 text-center">
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-yellow-600 text-white rounded-full text-xs">•</span>
                  </td>
                  <td className="px-3 py-2 text-slate-900">{item.officer}</td>
                  <td className="px-3 py-2">
                    <button className="bg-yellow-50 hover:bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold border border-yellow-300">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
