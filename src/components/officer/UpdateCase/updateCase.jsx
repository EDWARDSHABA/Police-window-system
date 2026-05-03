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

  // =========================
  // ACTION
  // =========================
  const handleSaveChanges = () => {
    if (!selectedCase?.id) return;

    updateViewCaseStatus(selectedCase.id, status);

    // UX improvement
    alert("Case updated successfully");

    navigate("/view-cases");
  };

  // =========================
  // EMPTY STATE
  // =========================
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

  // =========================
  // UI
  // =========================
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <OfficerHeader />

      <div className="flex-1 mx-auto w-full max-w-7xl p-6 space-y-6 mt-16">

        {/* HEADER */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h1 className="text-3xl font-black">Case Dashboard</h1>
          <p className="text-gray-600">Case ID: {selectedCase.id}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="md:col-span-2 space-y-6">

            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-xl font-bold mb-4">Case Info</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <ReadOnlyField label="Date" value={selectedCase.date} />
                <ReadOnlyField label="Type" value={selectedCase.type} />
                <ReadOnlyField label="Location" value={selectedCase.location} />
                <ReadOnlyField label="Victim" value={selectedCase.name} />
              </div>

              <div className="mt-4">
                <ReadOnlyTextArea label="Description" value={selectedCase.description} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-xl font-bold mb-4">Suspect</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <ReadOnlyField label="Name" value={selectedCase.suspectName} />
                <ReadOnlyField label="Contact" value={selectedCase.suspectContact} />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-4">

            <div className="bg-white p-5 rounded-2xl shadow">
              <p className="text-sm">Officer</p>
              <p className="font-bold">{selectedCase.officer}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow">
              <label className="block mb-2">Status</label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                {CASE_STATUS_OPTIONS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSaveChanges}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Save Changes
            </button>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}