import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getStoredViewCases,
  updateViewCaseStatus,
} from "../Data/viewCasesData";

import OfficerHeader from "../Header/OfficerHeader";
import Footer from "../footer/footer";

// =========================
// CONSTANTS
// =========================
const CASE_STATUS_OPTIONS = [
  "Under investigation",
  "Open",
  "Closed",
  "Pending",
];

// =========================
// HELPERS
// =========================
const getViewCaseById = (id) => {
  const cases = getStoredViewCases();
  return cases.find((c) => c.id === id);
};

const normalizeViewCase = (c) => {
  if (!c) return null;
  return {
    id: c.id,
    date: c.date,
    type: c.type,
    location: c.location,
    name: c.name,
    description: c.description,
    notes: c.notes,
    victimGender: c.victimGender,
    victimContact: c.victimContact,
    suspectName: c.suspectName,
    suspectGender: c.suspectGender,
    suspectContact: c.suspectContact,
    officer: c.officer,
    status: c.status,
    fileName: c.fileName,
    suspectStatement: c.suspectStatement,
  };
};

// =========================
// REUSABLE UI
// =========================
function ReadOnlyField({ label, value }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-black">
        {label}
      </label>
      <input
        value={value || "Not provided"}
        readOnly
        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-black"
      />
    </div>
  );
}

function ReadOnlyTextArea({ label, value, rows = 3 }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-black">
        {label}
      </label>
      <textarea
        rows={rows}
        value={value || "Not provided"}
        readOnly
        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-black"
      />
    </div>
  );
}

// =========================
// MAIN COMPONENT
// =========================
export default function UpdateCase() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id: routeCaseId } = useParams();

  // Try to get ID from URL first, then from navigation state
  const selectedCaseId = routeCaseId ?? state?.selectedCase?.id;

  const selectedCase = useMemo(() => {
    if (!selectedCaseId) {
      return normalizeViewCase(state?.selectedCase);
    }
    return (
      getViewCaseById(selectedCaseId) ??
      normalizeViewCase(state?.selectedCase)
    );
  }, [selectedCaseId, state]);

  const [status, setStatus] = useState(
    selectedCase?.status || "Under investigation"
  );

  const handleSaveChanges = () => {
    if (!selectedCase?.id) return;

    updateViewCaseStatus(selectedCase.id, status);
    alert("Case updated successfully");
    navigate("/view-cases");
  };

  if (!selectedCase) {
    return (
      <div className="min-h-screen bg-gray-100">
        <OfficerHeader />
        <div className="mx-auto mt-20 max-w-3xl rounded-2xl border bg-white p-8 text-center shadow">
          <h1 className="text-3xl font-black">No case selected</h1>
          <p className="mt-3 text-gray-600">
            Open a case from View Cases to inspect details.
          </p>
          <button
            onClick={() => navigate("/view-cases")}
            className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            Go to View Cases
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <OfficerHeader />

      <main className="flex-1 mx-auto w-full max-w-7xl p-6 space-y-6 mt-16">
        {/* PAGE HEADER */}
        <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
          <h1 className="text-3xl font-black text-slate-950">Case Dashboard</h1>
          <p className="text-gray-600 font-medium">Case ID: {selectedCase.id}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* LEFT CONTENT AREA */}
          <div className="space-y-6 md:col-span-2">
            
            {/* CASE INFORMATION */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-2xl font-black tracking-tight text-slate-950">
                Case Information
              </h2>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <ReadOnlyField label="Date" value={selectedCase.date} />
                  <ReadOnlyField label="Case Type" value={selectedCase.type} />
                </div>
                <ReadOnlyField label="Location" value={selectedCase.location} />
                <ReadOnlyTextArea 
                  label="Incident Description" 
                  value={selectedCase.description} 
                  rows={4} 
                />
                <ReadOnlyTextArea 
                  label="Additional Notes" 
                  value={selectedCase.notes} 
                />
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="mb-4 text-lg font-bold text-slate-950">Victim Details</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <ReadOnlyField label="Victim Full Name" value={selectedCase.name} />
                  <ReadOnlyField label="Victim Gender" value={selectedCase.victimGender} />
                  <ReadOnlyField label="Victim Contact" value={selectedCase.victimContact} />
                </div>
              </div>
            </div>

            {/* SUSPECT DETAILS */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-2xl font-black tracking-tight text-slate-950">
                Suspect Details
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <ReadOnlyField label="Full Name" value={selectedCase.suspectName} />
                <ReadOnlyField label="Gender" value={selectedCase.suspectGender} />
                <ReadOnlyField label="Contact" value={selectedCase.suspectContact} />
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR (ACTIONS) */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
              <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">Assigned Officer</p>
              <p className="mt-2 text-lg font-bold text-black">{selectedCase.officer}</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
              <label className="mb-2 block text-sm font-medium text-black">Update Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CASE_STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
              <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">Evidence Attached</p>
              <p className="mt-2 text-sm text-gray-700">
                {selectedCase.fileName || "No uploaded evidence on record"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleSaveChanges}
              className="w-full rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700 shadow-md"
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}