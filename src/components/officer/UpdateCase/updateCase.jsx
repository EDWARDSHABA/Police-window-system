import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getStoredViewCases, updateViewCaseStatus } from "../Data/viewCasesData";

export default function UpdateCase() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const selectedCaseId = state?.selectedCase?.id;
  const selectedCase = useMemo(() => {
    if (!selectedCaseId) return state?.selectedCase ?? null;

    return (
      getStoredViewCases().find((item) => item.id === selectedCaseId) ??
      state?.selectedCase ??
      null
    );
  }, [selectedCaseId, state]);

  const [caseId] = useState(selectedCase?.id ?? "MW-ZA-015-04-26");
  const [complainant] = useState(selectedCase?.name ?? "");
  const [suspect, setSuspect] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [assignedOfficer] = useState(selectedCase?.officer ?? "Sgt. Leoleo");
  const [status, setStatus] = useState(selectedCase?.status ?? "Under investigation");

  const handleSaveChanges = () => {
    updateViewCaseStatus(caseId, status);
    navigate("/view-cases");
  };

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
            <button
              type="button"
              onClick={handleSaveChanges}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-semibold"
            >
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
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-1">Victim / complainant</label>
              <input
                value={complainant}
                readOnly
                placeholder="Enter complainant name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-1">Suspect</label>
              <input
                value={suspect}
                onChange={(e) => setSuspect(e.target.value)}
                placeholder="Enter suspect name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-1">Any information</label>
              <textarea
                rows={3}
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Add case notes"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:ring-2 focus:ring-yellow-500 outline-none"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option>Under investigation</option>
              <option>Open</option>
              <option>Closed</option>
              <option>Aquito</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
