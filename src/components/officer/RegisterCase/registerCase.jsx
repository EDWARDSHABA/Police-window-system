import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import OfficerHeader from "../Header/OfficerHeader";
import Footer from "../footer/footer";
const CASE_TYPES = [
  "Theft","Assault","Burglary","Fraud","Vandalism",
  "Drug Offence","Homicide","Robbery","Sexual Offence",
  "Missing Person","Traffic Offence","Other",
];

function SectionHeader({ title }) {
  return (
    <div className="bg-sky-500 text-white text-xs font-semibold px-3 py-1.5 rounded-sm mb-3">
      {title}
    </div>
  );
}

const inputCls = "border border-gray-300 rounded-sm px-1.5 py-0.5 text-xs outline-none focus:border-sky-400 bg-white w-full";
const textareaCls = "border border-gray-300 rounded-sm px-1.5 py-1 text-xs outline-none focus:border-sky-400 bg-white w-full resize-none";

function generateCaseId() {
  const now = new Date();
  const yr = now.getFullYear();
  const mo = String(now.getMonth() + 1).padStart(2, "0");
  const dy = String(now.getDate()).padStart(2, "0");
  const rnd = Math.floor(1000 + Math.random() * 9000);
  return `CASE-${yr}${mo}${dy}-${rnd}`;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
}

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

// ── Evidence Vault ─────────────────────────────────────────────────────────
function EvidenceVault({ onClose }) {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const allCases = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('case:')) {
            try {
              const value = localStorage.getItem(key);
              if (value) allCases.push(JSON.parse(value));
            } catch (_) {}
          }
        }
        allCases.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
        setCases(allCases);
      } catch (_) {
        setCases([]);
      }
      setLoading(false);
    }
    load();
  }, []);

  const filtered = cases.filter(c =>
    !search ||
    c.caseId?.toLowerCase().includes(search.toLowerCase()) ||
    c.typeOfCrime?.toLowerCase().includes(search.toLowerCase()) ||
    c.vFullName?.toLowerCase().includes(search.toLowerCase()) ||
    c.sFullName?.toLowerCase().includes(search.toLowerCase())
  );

  const downloadFile = (ev) => {
    const a = document.createElement("a");
    a.href = ev.data;
    a.download = ev.name;
    a.click();
  };

  return (
    <div style={{ minHeight: 520, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "32px 16px" }}>
      <div className="bg-white rounded-lg w-full max-w-2xl">
        {/* Header */}
        <div className="bg-sky-500 text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <span className="text-sm font-semibold">Evidence Vault</span>
            {!loading && (
              <span className="text-xs bg-sky-400 px-2 py-0.5 rounded-full">
                {cases.length} case{cases.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <button onClick={onClose} className="text-white hover:text-sky-100 text-xl leading-none">✕</button>
        </div>

        <div className="p-4">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by case ID, crime type, victim or suspect name…"
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs outline-none focus:border-sky-400 mb-3"
          />

          {loading ? (
            <div className="flex items-center justify-center py-12 gap-2 text-gray-400">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <span className="text-xs">Loading evidence records…</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <p className="text-xs text-gray-400">
                {cases.length === 0 ? "No cases with evidence have been submitted yet." : "No cases match your search."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2" style={{ maxHeight: 420, overflowY: "auto" }}>
              {filtered.map(c => (
                <div key={c.caseId} className="border border-gray-200 rounded overflow-hidden">
                  {/* Case row header */}
                  <button
                    className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
                    onClick={() => setExpanded(expanded === c.caseId ? null : c.caseId)}
                  >
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-gray-800 font-mono">{c.caseId}</span>
                        <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full shrink-0">{c.typeOfCrime}</span>
                        {c.evidence?.length > 0 && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full shrink-0">
                            {c.evidence.length} file{c.evidence.length !== 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">
                        Submitted {formatDate(c.submittedAt)} &middot; Incident {formatDate(c.dateOfIncidence)}
                      </p>
                    </div>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ml-2 ${expanded === c.caseId ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Expanded panel */}
                  {expanded === c.caseId && (
                    <div className="border-t border-gray-100 px-3 py-3 bg-gray-50">
                      {/* Case meta */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3">
                        {[
                          ["Victim", c.vFullName], ["Suspect", c.sFullName],
                          ["Location", c.location], ["Crime type", c.typeOfCrime],
                        ].map(([lbl, val]) => (
                          <div key={lbl} className="text-xs">
                            <span className="text-gray-400">{lbl}: </span>
                            <span className="text-gray-700">{val || "—"}</span>
                          </div>
                        ))}
                      </div>

                      {/* Description snippet */}
                      {c.description && (
                        <div className="mb-3 bg-white border border-gray-200 rounded px-2 py-1.5">
                          <p className="text-xs text-gray-400 mb-0.5 font-medium">Description</p>
                          <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{c.description}</p>
                        </div>
                      )}

                      {/* Evidence files */}
                      <p className="text-xs font-medium text-gray-600 mb-1.5">Evidence files</p>
                      {c.evidence && c.evidence.length > 0 ? (
                        <div className="flex flex-col gap-1">
                          {c.evidence.map((ev, i) => (
                            <div key={i} className="flex items-center justify-between bg-white border border-gray-200 rounded px-2 py-1.5">
                              <div className="flex items-center gap-2 min-w-0">
                                <svg className="w-3.5 h-3.5 text-sky-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                                <div className="min-w-0">
                                  <p className="text-xs text-gray-700 truncate font-medium">{ev.name}</p>
                                  <p className="text-xs text-gray-400">{formatBytes(ev.size)} &middot; {formatDate(ev.uploadedAt)}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => downloadFile(ev)}
                                className="shrink-0 ml-2 flex items-center gap-1 text-xs text-sky-600 hover:text-sky-800 border border-sky-200 hover:border-sky-400 bg-sky-50 hover:bg-sky-100 px-2 py-1 rounded transition-colors"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400 italic">No evidence files attached to this case.</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function RegisterCase() {
  const navigate = useNavigate();
  const [caseId] = useState(generateCaseId);
  const [dateOfIncidence, setDateOfIncidence] = useState("");
  const [location, setLocation] = useState("");
  const [typeOfCrime, setTypeOfCrime] = useState("");

  const [vFullName, setVFullName] = useState("");
  const [vGender, setVGender] = useState("");
  const [vOccupation, setVOccupation] = useState("");
  const [vContact, setVContact] = useState("");
  const [vAddress, setVAddress] = useState("");

  const [sFullName, setSFullName] = useState("");
  const [sGender, setSGender] = useState("");
  const [sOccupation, setSsOccupation] = useState("");
  const [sContact, setSContact] = useState("");
  const [sAddress, setSAddress] = useState("");

  const [description, setDescription] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [files, setFiles] = useState([]);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedCaseId, setSubmittedCaseId] = useState("");
  const [submittedFileCount, setSubmittedFileCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [showVault, setShowVault] = useState(false);

  const fileRef = useRef();

  const validate = () => {
    const e = {};
    if (!dateOfIncidence) e.dateOfIncidence = true;
    if (!location.trim()) e.location = true;
    if (!typeOfCrime) e.typeOfCrime = true;
    if (!vFullName.trim()) e.vFullName = true;
    if (!vGender) e.vGender = true;
    if (!sFullName.trim()) e.sFullName = true;
    if (!description.trim()) e.description = true;
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setSaving(true);
    setSaveError("");

    try {
      const evidenceRecords = await Promise.all(
        files.map(async (f) => ({
          name: f.name,
          size: f.size,
          type: f.type,
          uploadedAt: new Date().toISOString(),
          data: await fileToBase64(f),
        }))
      );

      const record = {
        caseId, dateOfIncidence, location, typeOfCrime,
        vFullName, vGender, vOccupation, vContact, vAddress,
        sFullName, sGender, sOccupation, sContact, sAddress,
        description, reportDetails,
        evidence: evidenceRecords,
        submittedAt: new Date().toISOString(),
      };

      localStorage.setItem(`case:${caseId}`, JSON.stringify(record));

      // Add to view cases
      const currentCases = JSON.parse(localStorage.getItem('officerViewCases') || '[]');
      const newCase = {
        id: caseId,
        type: typeOfCrime,
        status: "Under investigation",
        name: vFullName,
        officer: "Officer", // Placeholder, as officer not specified in form
      };
      currentCases.push(newCase);
      localStorage.setItem('officerViewCases', JSON.stringify(currentCases));

      navigate('/officer/view-cases');
    } catch (err) {
      setSaveError("Failed to save the case: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Cancel case registration? All entered data will be lost.")) {
      setDateOfIncidence(""); setLocation(""); setTypeOfCrime("");
      setVFullName(""); setVGender(""); setVOccupation(""); setVContact(""); setVAddress("");
      setSFullName(""); setSGender(""); setSsOccupation(""); setSContact(""); setSAddress("");
      setDescription(""); setReportDetails(""); setFiles([]);
      setErrors({}); setSubmitted(false); setSaveError("");
    }
  };

  const handleFileChange = (e) => {
    setFiles(prev => [...prev, ...Array.from(e.target.files)]);
    e.target.value = "";
  };

  const removeFile = (i) => setFiles(prev => prev.filter((_, idx) => idx !== i));
  const errCls = (key) => errors[key] ? "border-red-400 bg-red-50" : "";

  // ── Success screen ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-sm w-full text-center shadow-sm">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-sm font-semibold text-gray-800 mb-1">Case Registered Successfully</h2>
          <p className="text-xs text-gray-500 mb-1">
            Case ID: <span className="font-mono font-semibold text-gray-700">{submittedCaseId}</span>
          </p>
          <p className="text-xs text-gray-400 mb-1">
            {submittedFileCount > 0
              ? `${submittedFileCount} evidence file${submittedFileCount > 1 ? "s" : ""} saved to the Evidence Vault.`
              : "No evidence files were attached."}
          </p>
          <p className="text-xs text-gray-400 mb-6">
            The case has been submitted and recorded. It cannot be deleted or edited.
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setShowVault(true)}
              className="bg-sky-500 hover:bg-sky-600 text-white text-xs font-medium px-6 py-2 rounded transition-colors flex items-center justify-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              Open Evidence Vault
            </button>
            <button
              onClick={() => { setSubmitted(false); setFiles([]); }}
              className="border border-gray-300 text-gray-600 text-xs px-6 py-2 rounded hover:bg-gray-50 transition-colors"
            >
              Register Another Case
            </button>
          </div>
        </div>

        {showVault && (
          <div style={{ position: "fixed", inset: 0, zIndex: 50, overflowY: "auto" }}>
            <EvidenceVault onClose={() => setShowVault(false)} />
          </div>
        )}
      </div>
    );
  }

  // ── Main form ──
  return (
    
    <div className="min-h-screen bg-gray-100 font-sans relative">
      <OfficerHeader />
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center">
        <button className="text-gray-500 hover:text-gray-700 p-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="absolute right-4 top-18 flex flex-col items-end gap-2">
        <button className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          REGISTER NEW CASE
        </button>
        <button
          onClick={() => setShowVault(true)}
          className="flex items-center gap-1.5 border border-sky-300 text-sky-600 hover:bg-sky-50 text-xs px-3 py-1.5 rounded transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          Evidence Vault
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4">
        <p className="text-xs text-gray-600 mb-3">Enter the details of the new case below:</p>

        {/* CASE INFORMATION */}
        <div className="bg-gray-100 border border-gray-300 rounded p-3 mb-3">
          <SectionHeader title="Case Information" />
          <div className="flex items-center gap-2 mb-1.5">
            <label className="text-xs text-gray-600 w-28 shrink-0">Case ID</label>
            <input className={`${inputCls} w-36 bg-gray-200 text-gray-500 cursor-not-allowed`} value={caseId} readOnly />
          </div>
          <div className="flex items-center gap-2 mb-1.5">
            <label className="text-xs text-gray-600 w-28 shrink-0">Date of Incidence</label>
            <input type="date" className={`${inputCls} w-36 ${errCls("dateOfIncidence")}`}
              value={dateOfIncidence} onChange={e => { setDateOfIncidence(e.target.value); setErrors(p => ({ ...p, dateOfIncidence: false })); }} />
          </div>
          <div className="flex items-center gap-2 mb-1.5">
            <label className="text-xs text-gray-600 w-28 shrink-0">Location</label>
            <input className={`${inputCls} w-48 ${errCls("location")}`}
              value={location} onChange={e => { setLocation(e.target.value); setErrors(p => ({ ...p, location: false })); }} />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-600 w-28 shrink-0">Type of Crime</label>
            <select className={`${inputCls} w-36 ${errCls("typeOfCrime")}`}
              value={typeOfCrime} onChange={e => { setTypeOfCrime(e.target.value); setErrors(p => ({ ...p, typeOfCrime: false })); }}>
              <option value=""></option>
              {CASE_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* VICTIM & SUSPECT */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Victim */}
          <div className="bg-gray-100 border border-gray-300 rounded p-3">
            <SectionHeader title="VICTIM DETAILS" />
            <div className="flex gap-2 mb-1.5">
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-0.5">Full Name</label>
                <input className={`${inputCls} ${errCls("vFullName")}`} value={vFullName}
                  onChange={e => { setVFullName(e.target.value); setErrors(p => ({ ...p, vFullName: false })); }} />
              </div>
              <div className="w-20">
                <label className="block text-xs text-gray-600 mb-0.5">Gender</label>
                <select className={`${inputCls} ${errCls("vGender")}`} value={vGender}
                  onChange={e => { setVGender(e.target.value); setErrors(p => ({ ...p, vGender: false })); }}>
                  <option value=""></option>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
            </div>
            <div className="mb-1.5">
              <label className="block text-xs text-gray-600 mb-0.5">Occupation</label>
              <input className={inputCls} value={vOccupation} onChange={e => setVOccupation(e.target.value)} />
            </div>
            <div className="mb-1.5">
              <label className="block text-xs text-gray-600 mb-0.5">Contact Number</label>
              <input className={inputCls} value={vContact} onChange={e => setVContact(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-0.5">Address</label>
              <textarea className={textareaCls} rows={3} value={vAddress} onChange={e => setVAddress(e.target.value)} />
            </div>
          </div>

          {/* Suspect */}
          <div className="bg-gray-100 border border-gray-300 rounded p-3">
            <SectionHeader title="SUSPECT DETAILS" />
            <div className="flex gap-2 mb-1.5">
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-0.5">Full Name</label>
                <input className={`${inputCls} ${errCls("sFullName")}`} value={sFullName}
                  onChange={e => { setSFullName(e.target.value); setErrors(p => ({ ...p, sFullName: false })); }} />
              </div>
              <div className="w-20">
                <label className="block text-xs text-gray-600 mb-0.5">Gender</label>
                <select className={inputCls} value={sGender} onChange={e => setSGender(e.target.value)}>
                  <option value=""></option>
                  <option>Male</option><option>Female</option><option>Other</option><option>Unknown</option>
                </select>
              </div>
            </div>
            <div className="mb-1.5">
              <label className="block text-xs text-gray-600 mb-0.5">Occupation</label>
              <input className={inputCls} value={sOccupation} onChange={e => setSsOccupation(e.target.value)} />
            </div>
            <div className="mb-1.5">
              <label className="block text-xs text-gray-600 mb-0.5">Contact Number</label>
              <input className={inputCls} value={sContact} onChange={e => setSContact(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-0.5">Address</label>
              <textarea className={textareaCls} rows={3} value={sAddress} onChange={e => setSAddress(e.target.value)} />
            </div>
          </div>
        </div>

        {/* CASE DETAILS */}
        <div className="bg-gray-100 border border-gray-300 rounded p-3 mb-3">
          <SectionHeader title="CASE DETAILS" />

          <div className="mb-3">
            <label className="block text-xs text-gray-600 mb-0.5">Victim statement</label>
            <textarea className={`${textareaCls} ${errCls("description")}`} rows={6}
              value={description} onChange={e => { setDescription(e.target.value); setErrors(p => ({ ...p, description: false })); }} />
          </div>

          {/* Evidence Upload */}
          <div className="mb-3">
            <label className="block text-xs text-gray-600 mb-1">Evidence upload</label>
            <input type="file" multiple ref={fileRef} className="hidden" onChange={handleFileChange} />
            <button
              onClick={() => fileRef.current.click()}
              className="flex items-center gap-1.5 border border-gray-300 bg-white hover:bg-gray-50 text-xs text-gray-600 px-3 py-1.5 rounded-sm transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload files
            </button>

            {files.length > 0 && (
              <div className="mt-2 flex flex-col gap-1">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center justify-between bg-white border border-gray-200 rounded px-2 py-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <svg className="w-3.5 h-3.5 text-sky-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      <span className="text-xs text-gray-700 truncate font-medium">{f.name}</span>
                      <span className="text-xs text-gray-400 shrink-0">{formatBytes(f.size)}</span>
                    </div>
                    <button onClick={() => removeFile(i)} className="text-gray-400 hover:text-red-500 ml-2 text-xs leading-none">✕</button>
                  </div>
                ))}
                <p className="text-xs text-sky-600 mt-0.5">
                  {files.length} file{files.length > 1 ? "s" : ""} will be saved to the Evidence Vault on submit.
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-0.5">Suspect<br />statement</label>
            <textarea className={textareaCls} rows={5} value={reportDetails}
              onChange={e => setReportDetails(e.target.value)} />
          </div>
        </div>

        {/* WARNING */}
        <div className="mb-4">
          <p className="text-xs text-amber-700 font-medium leading-relaxed">
            MAKE SURE THE DETAILS COLLECTED ARE ACCURATE AND HAVE RECORDED AS SAID BY THE PARTIES.
            CASE ONCE SUBMITTED IT CAN NEVER DELETED OR EDITED.
          </p>
        </div>

        {Object.keys(errors).some(k => errors[k]) && (
          <p className="text-xs text-red-500 mb-3">Please fill in all required fields highlighted above.</p>
        )}
        {saveError && (
          <p className="text-xs text-red-500 mb-3">{saveError}</p>
        )}

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pb-6">
          <button onClick={handleCancel}
            className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 text-xs px-6 py-2 rounded transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={saving}
            className="bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white text-xs font-semibold px-6 py-2 rounded transition-colors flex items-center gap-1.5">
            {saving && (
              <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
            )}
            {saving ? "Saving…" : "Submit Case"}
          </button>
        </div>
      </div>

      {/* Evidence Vault overlay */}
      {showVault && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, overflowY: "auto" }}>
          <EvidenceVault onClose={() => setShowVault(false)} />
        </div>
      )}
      <Footer />
    </div>
  );
}
