import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getStoredViewCases,
  updateViewCaseStatus,
} from "../Data/viewCasesData";
import OfficerHeader from "../Header/OfficerHeader";
import Footer from "../footer/footer";

function ReadOnlyField({ label, value }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-black">{label}</label>
      <input
        value={value || "Not provided"}
        readOnly
        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-black outline-none"
      />
    </div>
  );
}

function ReadOnlyTextArea({ label, value, rows = 3 }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-black">{label}</label>
      <textarea
        rows={rows}
        value={value || "Not provided"}
        readOnly
        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-black outline-none"
      />
    </div>
  );
}

export default function UpdateCase() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id: routeCaseId } = useParams();
  const selectedCaseId = routeCaseId ?? state?.selectedCase?.id;

  const selectedCase = useMemo(() => {
    if (!selectedCaseId) return normalizeViewCase(state?.selectedCase) ?? null;
    return getViewCaseById(selectedCaseId) ?? normalizeViewCase(state?.selectedCase) ?? null;
  }, [selectedCaseId, state]);

  const [status, setStatus] = useState(selectedCase?.status ?? "Under investigation");

  const [suspectStatement] = useState(
    selectedCase?.suspectStatement ?? ""
  );

  // ---------------- ACTION ----------------
  const handleSaveChanges = () => {
    if (!selectedCase?.id) return;
    updateViewCaseStatus(selectedCase.id, status);
    navigate("/view-cases");
  };

  if (!selectedCase) {
    return (
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg">
        <h1 className="text-3xl font-black text-black">No case selected</h1>
        <p className="mt-3 text-gray-600">
          Open a case from View Cases to inspect details or update its status.
        </p>
        <button
          type="button"
          onClick={() => navigate("/view-cases")}
          className="mt-6 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Go to View Cases
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wider text-black opacity-100">Update Case</p>
            <h1 className="mt-1 text-4xl font-black tracking-tight !text-slate-950">
              Case management dashboard
            </h1>
          </div>
          <div className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-black">
            Selected: <span className="font-semibold">{selectedCase.id}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-black tracking-tight !text-slate-950">
              Case information
            </h2>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <ReadOnlyField label="Case ID" value={selectedCase.id} />
                <ReadOnlyField label="Date" value={selectedCase.date} />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <ReadOnlyField label="Case Type" value={selectedCase.type} />
                <ReadOnlyField label="Location" value={selectedCase.location} />
              </div>

              <ReadOnlyField label="Victim / complainant" value={selectedCase.name} />
              <ReadOnlyTextArea label="Incident Description" value={selectedCase.description} rows={4} />
              <ReadOnlyTextArea label="Additional Notes" value={selectedCase.notes} />

              <div className="border-t border-gray-200 pt-4">
                <h3 className="mb-4 text-lg font-bold !text-slate-950">Victim Details</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <ReadOnlyField label="Victim Full Name" value={selectedCase.name} />
                  <ReadOnlyField label="Victim Gender" value={selectedCase.victimGender} />
                  <ReadOnlyField label="Victim Contact" value={selectedCase.victimContact} />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-black tracking-tight !text-slate-950">
              Suspect Details
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <ReadOnlyField label="Suspect Full Name" value={selectedCase.suspectName} />
              <ReadOnlyField label="Suspect Gender" value={selectedCase.suspectGender} />
              <ReadOnlyField label="Suspect Contact" value={selectedCase.suspectContact} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
            <p className="text-xs uppercase tracking-wider text-black opacity-100">Assigned Officer</p>
            <p className="mt-2 text-lg font-bold text-black">{selectedCase.officer}</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
            <label className="mb-2 block text-sm font-medium text-black">Status</label>
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
            <p className="text-xs uppercase tracking-wider text-black opacity-100">Evidence</p>
            <p className="mt-2 text-sm text-gray-700">
              {selectedCase.fileName || "No uploaded evidence on record"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleSaveChanges}
            className="w-full rounded-lg bg-blue-600 px-6 py-2 font-bold text-white transition hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
