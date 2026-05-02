import { useMemo, useState } from "react";
<<<<<<< HEAD
import { useLocation, useNavigate } from "react-router-dom";
=======
import { useLocation, useNavigate, useParams } from "react-router-dom";
>>>>>>> 7d4ef253e9be6d0587b999692b79c2670056754c
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
<<<<<<< HEAD

  const selectedCaseId = state?.selectedCase?.id;
=======
  const { id: routeCaseId } = useParams();
  const selectedCaseId = routeCaseId ?? state?.selectedCase?.id;
>>>>>>> 7d4ef253e9be6d0587b999692b79c2670056754c

  const selectedCase = useMemo(() => {
    if (!selectedCaseId) return normalizeViewCase(state?.selectedCase) ?? null;
    return getViewCaseById(selectedCaseId) ?? normalizeViewCase(state?.selectedCase) ?? null;
  }, [selectedCaseId, state]);

<<<<<<< HEAD
  // ---------------- STATE ----------------
  const [caseId] = useState(selectedCase?.id ?? "MW-ZA-015-04-26");

  const [complainant] = useState(
    selectedCase?.name ??
      selectedCase?.victim?.vFullName ??
      selectedCase?.caseName ??
      ""
  );

  const [suspect] = useState(
    selectedCase?.suspect?.sFullName ?? ""
  );

  const [additionalInfo] = useState(
    selectedCase?.description ?? ""
  );

  const [assignedOfficer] = useState(
    selectedCase?.officer ?? "Sgt. Leoleo"
  );

  const [status, setStatus] = useState(
    selectedCase?.status ?? "Under investigation"
  );

  // Victim
  const [victimGender] = useState(
    selectedCase?.victim?.vGender ?? ""
  );
  const [victimOccupation] = useState(
    selectedCase?.victim?.vOccupation ?? ""
  );
  const [victimContact] = useState(
    selectedCase?.victim?.vContact ?? ""
  );
  const [victimAddress] = useState(
    selectedCase?.victim?.vAddress ?? ""
  );

  // Suspect
  const [suspectGender] = useState(
    selectedCase?.suspect?.sGender ?? ""
  );
  const [suspectOccupation] = useState(
    selectedCase?.suspect?.sOccupation ?? ""
  );
  const [suspectContact] = useState(
    selectedCase?.suspect?.sContact ?? ""
  );
  const [suspectAddress] = useState(
    selectedCase?.suspect?.sAddress ?? ""
  );
=======
  const [status, setStatus] = useState(selectedCase?.status ?? "Under investigation");
>>>>>>> 7d4ef253e9be6d0587b999692b79c2670056754c

  const [suspectStatement] = useState(
    selectedCase?.suspectStatement ?? ""
  );

  // ---------------- ACTION ----------------
  const handleSaveChanges = () => {
    if (!selectedCase?.id) return;
    updateViewCaseStatus(selectedCase.id, status);
    navigate("/view-cases");
  };

<<<<<<< HEAD
  // ---------------- UI ----------------
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <OfficerHeader />

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              Case Details
            </h1>
            <p className="mt-2 text-slate-600">
              Review case information and update its status.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Case ID" value={caseId} readOnly />
            <Field label="Complainant" value={complainant} readOnly />
            <Field label="Assigned Officer" value={assignedOfficer} readOnly />
            <Field label="Suspect" value={suspect} readOnly />

            <Field label="Victim Occupation" value={victimOccupation} readOnly />
            <Field label="Victim Contact" value={victimContact} readOnly />
            <Field label="Victim Address" value={victimAddress} readOnly />
            <Field label="Victim Gender" value={victimGender} readOnly />

            <Field label="Suspect Occupation" value={suspectOccupation} readOnly />
            <Field label="Suspect Contact" value={suspectContact} readOnly />
            <Field label="Suspect Address" value={suspectAddress} readOnly />
            <Field label="Suspect Gender" value={suspectGender} readOnly />

            <Field
              label="Status"
              value={status}
              onChange={setStatus}
              options={CASE_STATUSES}
            />
          </div>

          <div className="mt-6 grid gap-6">
            <TextArea
              label="Additional Information"
              value={additionalInfo}
              readOnly
            />
            <TextArea
              label="Suspect Statement"
              value={suspectStatement}
              readOnly
            />
          </div>

          <div className="mt-8 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="rounded-lg bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Save Status
            </button>

            <button
              type="button"
              onClick={() => navigate("/view-cases")}
              className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Back to Cases
            </button>
=======
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
>>>>>>> 7d4ef253e9be6d0587b999692b79c2670056754c
          </div>
        </div>
      </div>

<<<<<<< HEAD
      <Footer />
    </div>
  );
}

// ---------------- COMPONENTS ----------------

function Field({
  label,
  value,
  onChange,
  placeholder,
  readOnly = false,
  options,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>

      {options ? (
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={value || ""}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={
            onChange ? (e) => onChange(e.target.value) : undefined
          }
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none read-only:bg-slate-100"
        />
      )}
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  readOnly = false,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>

      <textarea
        value={value || ""}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={
          onChange ? (e) => onChange(e.target.value) : undefined
        }
        className="min-h-32 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none read-only:bg-slate-100"
      />
    </label>
  );
}
=======
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
>>>>>>> 7d4ef253e9be6d0587b999692b79c2670056754c
