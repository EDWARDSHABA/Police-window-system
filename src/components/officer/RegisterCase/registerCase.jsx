import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import OfficerHeader from "../Header/OfficerHeader";
import Footer from "../footer/footer";

const CASE_TYPES = [
  "Theft", "Assault", "Burglary", "Fraud", "Vandalism",
  "Drug Offence", "Homicide", "Robbery", "Sexual Offence",
  "Missing Person", "Traffic Offence", "Other",
];

// ---------------- SECTION HEADER ----------------
function SectionHeader({ title }) {
  return (
    <div className="bg-sky-600 text-white text-sm font-bold px-4 py-2 rounded-t-md">
      {title}
    </div>
  );
}

const inputCls =
  "w-full bg-gray-200 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none";

const textareaCls =
  "w-full bg-gray-200 border border-gray-300 rounded px-3 py-2 text-sm h-40 resize-none focus:outline-none";

function FieldLabel({ label }) {
  return (
    <label className="text-xs text-gray-600 font-semibold mb-1 block">
      {label}
    </label>
  );
}

function generateCaseId() {
  const now = new Date();
  const rnd = Math.floor(1000 + Math.random() * 9000);
  return `CASE-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${rnd}`;
}

// ---------------- MAIN ----------------
export default function RegisterCase() {
  const navigate = useNavigate();
  const fileRef = useRef();

  const [caseId] = useState(generateCaseId());
  const [loading, setLoading] = useState(false);

  const [caseName, setCaseName] = useState("");
  const [dateOfIncidence, setDateOfIncidence] = useState("");
  const [location, setLocation] = useState("");
  const [typeOfCrime, setTypeOfCrime] = useState("");

  // Victim
  const [vFullName, setVFullName] = useState("");
  const [vGender, setVGender] = useState("");
  const [vOccupation, setVOccupation] = useState("");
  const [vContact, setVContact] = useState("");
  const [vAddress, setVAddress] = useState("");

  // Suspect
  const [sFullName, setSFullName] = useState("");
  const [sGender, setSGender] = useState("");
  const [sOccupation, setSOccupation] = useState("");
  const [sContact, setSContact] = useState("");
  const [sAddress, setSAddress] = useState("");

  // Case info
  const [description, setDescription] = useState("");
  const [reportDetails, setReportDetails] = useState("");

  // NEW: Evidence Notes (NOW REAL INPUT)
  const [evidenceNotes, setEvidenceNotes] = useState("");

  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  const triggerFileSelect = () => {
    fileRef.current.click();
  };

  const removeFile = (i) => {
    setFiles(files.filter((_, idx) => idx !== i));
  };

  const handleSubmit = () => {
    setLoading(true);

    const record = {
      caseId,
      caseName,
      dateOfIncidence,
      location,
      typeOfCrime,
      victim: { vFullName, vGender, vOccupation, vContact, vAddress },
      suspect: { sFullName, sGender, sOccupation, sContact, sAddress },
      description,
      reportDetails,
      evidenceNotes,
      files,
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem(`case:${caseId}`, JSON.stringify(record));

    setTimeout(() => {
      setLoading(false);
      navigate("/officer/view-cases");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <OfficerHeader />

      <div className="max-w-6xl mx-auto w-full px-6 py-6">

        {/* TITLE */}
        <div className="bg-blue-300 text-white p-4 mt-15 rounded mb-6 font-semibold">
          REGISTER NEW CASE HERE
        </div>

        {/* CASE DETAILS */}
        <div className="bg-white border mb-6 rounded">
          <SectionHeader title="CASE DETAILS" />

          <div className="p-4 grid grid-cols-2 gap-4">

            <div>
              <FieldLabel label="Case ID" />
              <input value={caseId} disabled className={inputCls + " bg-gray-300"} />
            </div>

            <div>
              <FieldLabel label="Case Name" />
              <input className={inputCls} value={caseName}
                onChange={(e) => setCaseName(e.target.value)} />
            </div>

            <div>
              <FieldLabel label="Date of Incidence" />
              <input type="date" className={inputCls}
                value={dateOfIncidence}
                onChange={e => setDateOfIncidence(e.target.value)} />
            </div>

            <div>
              <FieldLabel label="Location" />
              <input className={inputCls}
                value={location}
                onChange={e => setLocation(e.target.value)} />
            </div>

            <div>
              <FieldLabel label="Type of Crime" />
              <select className={inputCls}
                value={typeOfCrime}
                onChange={e => setTypeOfCrime(e.target.value)}>
                <option value="">Select</option>
                {CASE_TYPES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

          </div>
        </div>

        {/* VICTIM + DESCRIPTION */}
        <div className="grid grid-cols-2 gap-6 mb-6">

          {/* VICTIM */}
          <div className="bg-white border rounded">
            <SectionHeader title="VICTIM DETAILS" />

            <div className="p-4 space-y-3">

              <div>
                <FieldLabel label="Full Name" />
                <input className={inputCls} value={vFullName}
                  onChange={e => setVFullName(e.target.value)} />
              </div>

              <div>
                <FieldLabel label="Occupation" />
                <input className={inputCls} value={vOccupation}
                  onChange={e => setVOccupation(e.target.value)} />
              </div>

              <div>
                <FieldLabel label="Contact Number" />
                <input className={inputCls} value={vContact}
                  onChange={e => setVContact(e.target.value)} />
              </div>

              <div>
                <FieldLabel label="Gender" />
                <select className={inputCls}
                  value={vGender}
                  onChange={e => setVGender(e.target.value)}>
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div>
                <FieldLabel label="Address" />
                <textarea className={inputCls}
                  value={vAddress}
                  onChange={e => setVAddress(e.target.value)} />
              </div>

            </div>
          </div>

          {/* CASE DESCRIPTION */}
          <div className="bg-white border rounded">
            <SectionHeader title="CASE DESCRIPTION" />

            <div className="p-4 space-y-4">

              <div>
                <FieldLabel label="Victim Statement" />
                <textarea
                  className={textareaCls}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>

              <div>
                <FieldLabel label="Suspect Statement" />
                <textarea
                  className={textareaCls}
                  value={reportDetails}
                  onChange={e => setReportDetails(e.target.value)}
                />
              </div>

            </div>
          </div>

        </div>

        {/* SUSPECT */}
        <div className="grid grid-cols-2 gap-6 mb-6">

          <div className="bg-white border rounded">
            <SectionHeader title="SUSPECT DETAILS" />

            <div className="p-4 space-y-3">

              <div>
                <FieldLabel label="Full Name" />
                <input className={inputCls}
                  value={sFullName}
                  onChange={e => setSFullName(e.target.value)} />
              </div>

              <div>
                <FieldLabel label="Occupation" />
                <input className={inputCls}
                  value={sOccupation}
                  onChange={e => setSOccupation(e.target.value)} />
              </div>

              <div>
                <FieldLabel label="Contact Number" />
                <input className={inputCls}
                  value={sContact}
                  onChange={e => setSContact(e.target.value)} />
              </div>

              <div>
                <FieldLabel label="Gender" />
                <select className={inputCls}
                  value={sGender}
                  onChange={e => setSGender(e.target.value)}>
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Unknown</option>
                </select>
              </div>

              <div>
                <FieldLabel label="Address" />
                <textarea className={inputCls}
                  value={sAddress}
                  onChange={e => setSAddress(e.target.value)} />
              </div>

            </div>
          </div>

          {/* EVIDENCE NOTES (NOW REAL INPUT) */}
          <div className="bg-white border rounded">
            <SectionHeader title="EVIDENCE NOTES" />

            <div className="p-4 space-y-3">
              <div>
                <FieldLabel label="Evidence Notes" />
                <textarea
                  className={textareaCls}
                  value={evidenceNotes}
                  onChange={(e) => setEvidenceNotes(e.target.value)}
                />
              </div>
            </div>
          </div>

        </div>

        {/* UPLOAD */}
        <div className="bg-white border rounded mb-6">
          <SectionHeader title="EVIDENCE UPLOAD" />

          <div className="p-4">

            <input
              type="file"
              multiple
              ref={fileRef}
              className="hidden"
              onChange={handleFileChange}
            />

            <button
              onClick={triggerFileSelect}
              className="mb-3 px-4 py-2 bg-sky-600 text-white rounded"
            >
              + Add Evidence
            </button>

            <div className="space-y-2">
              {files.map((f, i) => (
                <div key={i} className="flex justify-between bg-gray-200 p-2 rounded">
                  <span>{f.name}</span>
                  <button onClick={() => removeFile(i)} className="text-red-600">
                    Remove
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4">
          <button className="px-6 py-2 bg-gray-400 text-white rounded">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-sky-600 text-white rounded"
          >
            {loading ? "Submitting..." : "Submit Case"}
          </button>
        </div>

      </div>

      <Footer />
    </div>
  );
}