import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  CASE_STATUS_OPTIONS,
  getViewCaseById,
  normalizeViewCase,
  updateViewCaseStatus,
} from "../Data/viewCasesData";

const CASE_STATUSES = ["Aquito", "Under investigation", "Closed"];

export default function UpdateCase() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id: routeCaseId } = useParams();
  const selectedCaseId = routeCaseId ?? state?.selectedCase?.id;
  const selectedCase = useMemo(() => {
    if (!selectedCaseId) return normalizeViewCase(state?.selectedCase) ?? null;

    return getViewCaseById(selectedCaseId) ?? normalizeViewCase(state?.selectedCase) ?? null;
  }, [selectedCaseId, state]);

  const [caseId] = useState(selectedCase?.id ?? "MW-ZA-015-04-26");
  const [complainant] = useState(
    selectedCase?.name ?? selectedCase?.victim?.vFullName ?? selectedCase?.caseName ?? ""
  );
  const [suspect] = useState(selectedCase?.suspect?.sFullName ?? "");
  const [additionalInfo] = useState(selectedCase?.description ?? "");
  const [assignedOfficer] = useState(selectedCase?.officer ?? "Sgt. Leoleo");
  const [status, setStatus] = useState(selectedCase?.status ?? "Under investigation");
  const [victimGender] = useState(selectedCase?.victim?.vGender ?? "");
  const [victimOccupation] = useState(
    selectedCase?.victim?.vOccupation ?? ""
  );
  const [victimContact] = useState(selectedCase?.victim?.vContact ?? "");
  const [victimAddress] = useState(selectedCase?.victim?.vAddress ?? "");
  const [suspectGender] = useState(selectedCase?.suspect?.sGender ?? "");
  const [suspectOccupation] = useState(
    selectedCase?.suspect?.sOccupation ?? ""
  );
  const [suspectContact] = useState(selectedCase?.suspect?.sContact ?? "");
  const [suspectAddress] = useState(selectedCase?.suspect?.sAddress ?? "");
  const [suspectStatement] = useState(selectedCase?.suspectStatement ?? "");

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
          className="mt-6 rounded-lg bg-yellow-600 px-4 py-2 font-semibold text-white hover:bg-yellow-700"
        >
          Go to View Cases
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Case Details</h1>
          <p className="mt-2 text-slate-600">
            Review the registered case information below. This page is view-only.
          </p>
        </div>
      </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Case ID" value={caseId} readOnly />
          <Field label="Complainant" value={complainant} readOnly />
          <Field label="Assigned Officer" value={assignedOfficer} readOnly />
          <Field
            label="Suspect"
            value={suspect}
            placeholder="Enter suspect name"
            readOnly
          />
          <Field
            label="Victim Occupation"
            value={victimOccupation}
            placeholder="Enter victim occupation"
            readOnly
          />
          <Field
            label="Victim Contact"
            value={victimContact}
            placeholder="Enter victim contact"
            readOnly
          />
          <Field
            label="Victim Address"
            value={victimAddress}
            placeholder="Enter victim address"
            readOnly
          />
          <Field
            label="Victim Gender"
            value={victimGender}
            placeholder="Enter victim gender"
            readOnly
          />
          <Field
            label="Suspect Occupation"
            value={suspectOccupation}
            placeholder="Enter suspect occupation"
            readOnly
          />
          <Field
            label="Suspect Contact"
            value={suspectContact}
            placeholder="Enter suspect contact"
            readOnly
          />
          <Field
            label="Suspect Address"
            value={suspectAddress}
            placeholder="Enter suspect address"
            readOnly
          />
          <Field
            label="Suspect Gender"
            value={suspectGender}
            placeholder="Enter suspect gender"
            readOnly
          />
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
            placeholder="Add investigation notes or case updates"
            readOnly
          />
          <TextArea
            label="Suspect Statement"
            value={suspectStatement}
            readOnly
            placeholder="No suspect statement available"
          />
        </div>

        <div className="mt-8 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={handleSaveChanges}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
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
        </div>
      </div>
    
  );
}

function Field({ label, value, onChange, placeholder, readOnly = false, options }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      {options ? (
        <select
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
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
          value={value}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={onChange ? (event) => onChange(event.target.value) : undefined}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none read-only:bg-slate-100"
        />
      )}
    </label>
  );
}

function TextArea({ label, value, onChange, placeholder, readOnly = false }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <textarea
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        className="min-h-32 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none read-only:bg-slate-100"
      />
    </label>
  );
}
