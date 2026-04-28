import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getViewCaseById, normalizeViewCase } from "../Data/viewCasesData";

function DetailField({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900">
        {value || "Not provided"}
      </div>
    </div>
  );
}

export default function CaseDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id: routeCaseId } = useParams();
  const selectedCase = useMemo(() => {
    if (!routeCaseId) return normalizeViewCase(state?.selectedCase) ?? null;
    return getViewCaseById(routeCaseId) ?? normalizeViewCase(state?.selectedCase) ?? null;
  }, [routeCaseId, state]);

  if (!selectedCase) {
    return (
      <div className="mx-auto w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Case not found</h1>
        <p className="mt-3 text-slate-600">Return to View Cases and select a case to inspect.</p>
        <button
          type="button"
          onClick={() => navigate("/view-cases")}
          className="mt-6 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Back to View Cases
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              Case Details
            </p>
            <h1 className="mt-2 text-4xl font-bold !text-slate-950">{selectedCase.id}</h1>
            <p className="mt-2 text-slate-600">
              Review the full details of this case. Use Edit if you need to update the case status.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate(`/update-case/${selectedCase.id}`, { state: { selectedCase } })}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Edit Status
            </button>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-bold !text-slate-950">Case Information</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <DetailField label="Case ID" value={selectedCase.id} />
              <DetailField label="Date" value={selectedCase.date} />
              <DetailField label="Case Type" value={selectedCase.type} />
              <DetailField label="Status" value={selectedCase.status} />
              <DetailField label="Location" value={selectedCase.location} />
              <DetailField label="Assigned Officer" value={selectedCase.officer} />
            </div>
            <div className="mt-4 grid gap-4">
              <DetailField label="Victim / Complainant" value={selectedCase.name} />
              <DetailField label="Incident Description" value={selectedCase.description} />
              <DetailField label="Additional Notes" value={selectedCase.notes} />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-bold !text-slate-950">People Involved</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <DetailField label="Victim Name" value={selectedCase.name} />
              <DetailField label="Victim Gender" value={selectedCase.victimGender} />
              <DetailField label="Victim Contact" value={selectedCase.victimContact} />
              <DetailField label="Suspect Name" value={selectedCase.suspectName} />
              <DetailField label="Suspect Gender" value={selectedCase.suspectGender} />
              <DetailField label="Suspect Contact" value={selectedCase.suspectContact} />
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-blue-600 p-6 text-white shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-100">
              Current Status
            </p>
            <p className="mt-3 text-3xl font-bold">{selectedCase.status}</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-bold !text-slate-950">Evidence</h2>
            <p className="mt-3 text-sm text-slate-600">
              {selectedCase.fileName || "No uploaded evidence on record"}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
