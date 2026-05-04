import { useRef, useState } from "react";
import { CalendarDays, FilePlus2, FileText, MapPin, ShieldAlert, UserRound, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OfficerHeader from "../Header/OfficerHeader";
import Footer from "../footer/footer";
import { addViewCase } from "../Data/viewCasesData";

const CASE_TYPES = [
  "Theft",
  "Assault",
  "Burglary",
  "Fraud",
  "Vandalism",
  "Drug Offence",
  "Homicide",
  "Robbery",
  "Sexual Offence",
  "Missing Person",
  "Traffic Offence",
  "Other",
];

const GENDER_OPTIONS = ["Male", "Female", "Unknown"];

const inputCls =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100";

const readOnlyInputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 outline-none";

const textareaCls =
  "min-h-[140px] w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100";

function FieldLabel({ label, required = false }) {
  return (
    <label className="mb-2 block text-sm font-semibold text-slate-800">
      {label}
      {required ? <span className="ml-1 text-red-500">*</span> : null}
    </label>
  );
}

function SectionCard({ icon, title, description, children }) {
  const Icon = icon;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-start gap-3 border-b border-slate-100 px-5 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-black tracking-tight text-slate-950">{title}</h2>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function generateCaseId() {
  const now = new Date();
  const rnd = Math.floor(1000 + Math.random() * 9000);
  return `CASE-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${rnd}`;
}

export default function RegisterCase() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [caseId] = useState(generateCaseId());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitNotice, setSubmitNotice] = useState("");

  const [caseName, setCaseName] = useState("");
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
  const [sOccupation, setSOccupation] = useState("");
  const [sContact, setSContact] = useState("");
  const [sAddress, setSAddress] = useState("");

  const [description, setDescription] = useState("");
  const [witnessVictimStatement, setWitnessVictimStatement] = useState("");
  const [suspectStatement, setSuspectStatement] = useState("");
  const [witnessSuspectStatement, setWitnessSuspectStatement] = useState("");

  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const nextFiles = Array.from(event.target.files ?? []);

    if (!nextFiles.length) {
      return;
    }

    setFiles((current) => {
      const existingKeys = new Set(current.map((file) => `${file.name}-${file.size}-${file.lastModified}`));
      const uniqueNext = nextFiles.filter(
        (file) => !existingKeys.has(`${file.name}-${file.size}-${file.lastModified}`)
      );
      return [...current, ...uniqueNext];
    });

    event.target.value = "";
  };

  const triggerFileSelect = () => {
    fileRef.current?.click();
  };

  const removeFile = (indexToRemove) => {
    setFiles((current) => current.filter((_, index) => index !== indexToRemove));
  };

  const validateForm = () => {
    if (!caseName.trim()) return "Case name is required.";
    if (!dateOfIncidence) return "Date of incidence is required.";
    if (!location.trim()) return "Location is required.";
    if (!typeOfCrime) return "Type of crime is required.";
    if (!vFullName.trim()) return "Victim full name is required.";
    if (!description.trim()) return "Victim statement is required.";
    return "";
  };

  const handleSubmit = () => {
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      setSubmitNotice("");
      return;
    }

    setError("");
    setSubmitNotice("");
    setLoading(true);

    const record = {
      caseId,
      caseName: caseName.trim(),
      dateOfIncidence,
      location: location.trim(),
      typeOfCrime,
      victim: {
        vFullName: vFullName.trim(),
        vGender,
        vOccupation: vOccupation.trim(),
        vContact: vContact.trim(),
        vAddress: vAddress.trim(),
      },
      suspect: {
        sFullName: sFullName.trim(),
        sGender,
        sOccupation: sOccupation.trim(),
        sContact: sContact.trim(),
        sAddress: sAddress.trim(),
      },
      description: description.trim(),
      witnessVictimStatement: witnessVictimStatement.trim(),
      suspectStatement: suspectStatement.trim(),
      witnessSuspectStatement: witnessSuspectStatement.trim(),
      files,
      fileName: files.map((file) => file.name).join(", "),
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem(`case:${caseId}`, JSON.stringify(record));
    addViewCase(record);

    setTimeout(() => {
      setLoading(false);
      setSubmitNotice("Case submitted successfully. Redirecting to View Cases...");
      navigate("/view-cases");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <OfficerHeader />

      <main className="mx-auto w-full max-w-7xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 px-6 py-5 text-white shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-100">
                Intake Desk
              </p>
              <h1 className="mt-1 text-2xl font-black">Register New Case</h1>
              <p className="mt-2 max-w-2xl text-sm text-sky-50">
                Capture incident details, involved people, witness notes, and evidence in one place.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-white/15 px-4 py-3 backdrop-blur-sm">
                <p className="text-[11px] uppercase tracking-[0.18em] text-sky-100">Case ID</p>
                <p className="mt-1 text-sm font-bold">{caseId}</p>
              </div>
              <div className="rounded-xl bg-white/15 px-4 py-3 backdrop-blur-sm">
                <p className="text-[11px] uppercase tracking-[0.18em] text-sky-100">Evidence Files</p>
                <p className="mt-1 text-sm font-bold">{files.length}</p>
              </div>
              <div className="rounded-xl bg-white/15 px-4 py-3 backdrop-blur-sm">
                <p className="text-[11px] uppercase tracking-[0.18em] text-sky-100">Status</p>
                <p className="mt-1 text-sm font-bold">Draft</p>
              </div>
            </div>
          </div>
        </div>

        {error ? (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <SectionCard
              icon={ShieldAlert}
              title="Case Details"
              description="Record the incident reference and the basic facts of the reported case."
            >
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <FieldLabel label="Case ID" />
                  <input value={caseId} readOnly className={readOnlyInputCls} />
                </div>

                <div>
                  <FieldLabel label="Case Name" required />
                  <input
                    className={inputCls}
                    value={caseName}
                    onChange={(event) => setCaseName(event.target.value)}
                    placeholder="Short case title"
                  />
                </div>

                <div>
                  <FieldLabel label="Type of Crime" required />
                  <select
                    className={inputCls}
                    value={typeOfCrime}
                    onChange={(event) => setTypeOfCrime(event.target.value)}
                  >
                    <option value="">Select crime type</option>
                    {CASE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <FieldLabel label="Date of Incidence" required />
                  <input
                    type="date"
                    className={inputCls}
                    value={dateOfIncidence}
                    onChange={(event) => setDateOfIncidence(event.target.value)}
                  />
                </div>

                <div className="md:col-span-2 xl:col-span-2">
                  <FieldLabel label="Location" required />
                  <input
                    className={inputCls}
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Area, street, station, or landmark"
                  />
                </div>
              </div>
            </SectionCard>

            <div className="grid gap-6 lg:grid-cols-2">
              <SectionCard
                icon={UserRound}
                title="Victim Details"
                description="Capture the person reporting harm or loss and their contact details."
              >
                <div className="space-y-4">
                  <div>
                    <FieldLabel label="Full Name" required />
                    <input
                      className={inputCls}
                      value={vFullName}
                      onChange={(event) => setVFullName(event.target.value)}
                      placeholder="Victim full name"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <FieldLabel label="Gender" />
                      <select
                        className={inputCls}
                        value={vGender}
                        onChange={(event) => setVGender(event.target.value)}
                      >
                        <option value="">Select gender</option>
                        {GENDER_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <FieldLabel label="Occupation" />
                      <input
                        className={inputCls}
                        value={vOccupation}
                        onChange={(event) => setVOccupation(event.target.value)}
                        placeholder="Occupation"
                      />
                    </div>
                  </div>

                  <div>
                    <FieldLabel label="Contact Number" />
                    <input
                      className={inputCls}
                      value={vContact}
                      onChange={(event) => setVContact(event.target.value)}
                      placeholder="Phone number"
                    />
                  </div>

                  <div>
                    <FieldLabel label="Address" />
                    <textarea
                      className={textareaCls}
                      value={vAddress}
                      onChange={(event) => setVAddress(event.target.value)}
                      placeholder="Residential or known address"
                    />
                  </div>
                </div>
              </SectionCard>

              <SectionCard
                icon={FileText}
                title="Victim and Witness Statements"
                description="Store the main account of the incident and supporting witness notes."
              >
                <div className="space-y-4">
                  <div>
                    <FieldLabel label="Victim Statement" required />
                    <textarea
                      className={textareaCls}
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder="Describe the incident as reported by the victim"
                    />
                  </div>

                  <div>
                    <FieldLabel label="Witness of Victim Statement" />
                    <textarea
                      className={textareaCls}
                      value={witnessVictimStatement}
                      onChange={(event) => setWitnessVictimStatement(event.target.value)}
                      placeholder="Add witness observations tied to the victim statement"
                    />
                  </div>
                </div>
              </SectionCard>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <SectionCard
                icon={UserRound}
                title="Suspect Details"
                description="Add any known suspect information or leave unknown fields blank."
              >
                <div className="space-y-4">
                  <div>
                    <FieldLabel label="Full Name" />
                    <input
                      className={inputCls}
                      value={sFullName}
                      onChange={(event) => setSFullName(event.target.value)}
                      placeholder="Suspect full name"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <FieldLabel label="Gender" />
                      <select
                        className={inputCls}
                        value={sGender}
                        onChange={(event) => setSGender(event.target.value)}
                      >
                        <option value="">Select gender</option>
                        {GENDER_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <FieldLabel label="Occupation" />
                      <input
                        className={inputCls}
                        value={sOccupation}
                        onChange={(event) => setSOccupation(event.target.value)}
                        placeholder="Occupation"
                      />
                    </div>
                  </div>

                  <div>
                    <FieldLabel label="Contact Number" />
                    <input
                      className={inputCls}
                      value={sContact}
                      onChange={(event) => setSContact(event.target.value)}
                      placeholder="Phone number"
                    />
                  </div>

                  <div>
                    <FieldLabel label="Address" />
                    <textarea
                      className={textareaCls}
                      value={sAddress}
                      onChange={(event) => setSAddress(event.target.value)}
                      placeholder="Residential or known address"
                    />
                  </div>
                </div>
              </SectionCard>

              <SectionCard
                icon={FileText}
                title="Suspect Statements"
                description="Record the suspect response and any supporting witness statement."
              >
                <div className="space-y-4">
                  <div>
                    <FieldLabel label="Suspect Statement" />
                    <textarea
                      className={textareaCls}
                      value={suspectStatement}
                      onChange={(event) => setSuspectStatement(event.target.value)}
                      placeholder="Add suspect statement"
                    />
                  </div>

                  <div>
                    <FieldLabel label="Witness Suspect Statement" />
                    <textarea
                      className={textareaCls}
                      value={witnessSuspectStatement}
                      onChange={(event) => setWitnessSuspectStatement(event.target.value)}
                      placeholder="Add witness statement related to the suspect"
                    />
                  </div>
                </div>
              </SectionCard>
            </div>

            <SectionCard
              icon={FilePlus2}
              title="Evidence Upload"
              description="Attach documents, images, or supporting material for the case record."
            >
              <input
                type="file"
                multiple
                ref={fileRef}
                className="hidden"
                onChange={handleFileChange}
              />

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Attached files</p>
                  <p className="text-sm text-slate-500">
                    {files.length ? `${files.length} file(s) added to this case.` : "No evidence attached yet."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={triggerFileSelect}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                  <FilePlus2 className="h-4 w-4" />
                  Add Evidence
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {files.length ? (
                  files.map((file, index) => (
                    <div
                      key={`${file.name}-${file.size}-${index}`}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-800">{file.name}</p>
                        <p className="text-xs text-slate-500">{`${Math.max(1, Math.round(file.size / 1024))} KB`}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                        aria-label={`Remove ${file.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                    Evidence files will appear here after upload.
                  </div>
                )}
              </div>
            </SectionCard>
          </div>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black tracking-tight text-slate-950">Case Summary</h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-4 w-4 text-sky-600" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Incident Date</p>
                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {dateOfIncidence || "Not selected"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-sky-600" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Location</p>
                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {location || "No location added"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldAlert className="mt-0.5 h-4 w-4 text-sky-600" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Crime Type</p>
                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {typeOfCrime || "Not selected"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <UserRound className="mt-0.5 h-4 w-4 text-sky-600" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Complainant</p>
                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {vFullName || "No name added"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black tracking-tight text-slate-950">Before Submit</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>Case name, incident date, location, and crime type should be filled in.</li>
                <li>Victim full name and victim statement are required for submission.</li>
                <li>Evidence is optional, but attached filenames will be saved into the case record.</li>
              </ul>
            </section>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="h-12 rounded-xl bg-sky-600 px-5 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-300"
                >
                  {loading ? "Submitting..." : "Submit Case"}
                </button>

                {error ? (
                  <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {error}
                  </p>
                ) : null}

                {submitNotice ? (
                  <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                    {submitNotice}
                  </p>
                ) : null}

                <button
                  type="button"
                  onClick={() => navigate("/view-cases")}
                  className="h-12 rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
