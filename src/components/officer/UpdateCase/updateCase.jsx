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
  const [victimGender, setVictimGender] = useState("");
  const [victimOccupation, setVictimOccupation] = useState("");
  const [victimContact, setVictimContact] = useState("");
  const [victimAddress, setVictimAddress] = useState("");
  const [suspectGender, setSuspectGender] = useState("");
  const [suspectOccupation, setSuspectOccupation] = useState("");
  const [suspectContact, setSuspectContact] = useState("");
  const [suspectAddress, setSuspectAddress] = useState("");
  const [suspectStatement] = useState("");

  const handleSaveChanges = () => {
    updateViewCaseStatus(caseId, status);
    navigate("/view-cases");
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Update Case</h1>
          <p className="mt-2 text-slate-600">
            Modify case details, update status, and manage ongoing investigations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Case ID" value={caseId} readOnly />
          <Field label="Complainant" value={complainant} readOnly />
          <Field label="Assigned Officer" value={assignedOfficer} readOnly />
          <Field
            label="Suspect"
            value={suspect}
            onChange={setSuspect}
            placeholder="Enter suspect name"
          />
          <Field
            label="Victim Occupation"
            value={victimOccupation}
            onChange={setVictimOccupation}
            placeholder="Enter victim occupation"
          />
          <Field
            label="Victim Contact"
            value={victimContact}
            onChange={setVictimContact}
            placeholder="Enter victim contact"
          />
          <Field
            label="Victim Address"
            value={victimAddress}
            onChange={setVictimAddress}
            placeholder="Enter victim address"
          />
          <Field
            label="Victim Gender"
            value={victimGender}
            onChange={setVictimGender}
            placeholder="Enter victim gender"
          />
          <Field
            label="Suspect Occupation"
            value={suspectOccupation}
            onChange={setSuspectOccupation}
            placeholder="Enter suspect occupation"
          />
          <Field
            label="Suspect Contact"
            value={suspectContact}
            onChange={setSuspectContact}
            placeholder="Enter suspect contact"
          />
          <Field
            label="Suspect Address"
            value={suspectAddress}
            onChange={setSuspectAddress}
            placeholder="Enter suspect address"
          />
          <Field
            label="Suspect Gender"
            value={suspectGender}
            onChange={setSuspectGender}
            placeholder="Enter suspect gender"
          />
          <Field
            label="Status"
            value={status}
            onChange={setStatus}
            placeholder="Enter case status"
          />
        </div>

        <div className="mt-6 grid gap-6">
          <TextArea
            label="Additional Information"
            value={additionalInfo}
            onChange={setAdditionalInfo}
            placeholder="Add investigation notes or case updates"
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
            onClick={() => navigate("/view-cases")}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveChanges}
            className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, readOnly = false }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input
        type="text"
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none read-only:bg-slate-100"
      />
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
