import { useState, useMemo } from "react";

const OFFICERS = [
  { id: "1. MW-ZA-22-090-24", name: "Sgt. Victor Max" },
  { id: "2. MW-ZA-22-088-24", name: "Sgt. Umi Sri Nko" },
  { id: "3. MW-ZA-23-085-24", name: "Sgt. Camara Shaney" },
  { id: "4. MW-ZA-23-089-25", name: "Sgt. Victor Max" },
  { id: "5. MW-ZA-23-327-26", name: "Sgt. Daniel Choate" },
  { id: "6. MW-ZA-23-688-54", name: "Sgt. Martha Sawa" },
  { id: "7. MW-ZA-23-048-04", name: "Sgt. Rahimi Mao" },
  { id: "8. MW-ZA-23-107-26", name: "Sgt. Tebid Nkunu" },
  { id: "9. MW-ZA-23-880-23", name: "Sgt. Victor Max" },
  { id: "10. MW-KW-23-448-23", name: "Sgt. Sharon Milo" },
  { id: "11. MW-ZA-23-100-24", name: "Sgt. Victor Max" },
  { id: "12. MW-ZA-23-184-04", name: "Sgt. Edmund Blowers" },
  { id: "13. MW-ZA-23-284-24", name: "Sgt. Victor Max" },
  { id: "14. MW-ZA-23-184-04", name: "Sgt. Edmund Blowers" },
  { id: "15. MW-ZA-23-284-15", name: "Sgt. Victor Max" },
  { id: "16. MW-ZA-23-688-22", name: "Sgt. Samuel Choate" },
  { id: "17. MW-ZA-22-088-16", name: "Sgt. Martha Sawa" },
];

const LOCATIONS = [
  "Central Station",
  "North Precinct",
  "South Precinct",
  "East Zone",
  "West Zone",
  "Checkpoint A",
  "Checkpoint B",
  "Court Escort",
];

const DUTY_TYPES = [
  "Patrol",
  "Traffic Control",
  "Investigations",
  "Community Policing",
  "Custody",
  "Administrative",
  "Training",
  "Emergency Response",
];

const SHIFTS = ["All Shifts", "Day", "Evening", "Night"];

export default function AssignDuties() {
  const [week] = useState("April 10 - April 17, 2026");
  const [specifyTime, setSpecifyTime] = useState("");
  const [shift, setShift] = useState("All Shifts");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(new Set());
  const [location, setLocation] = useState("");
  const [dutyType, setDutyType] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return OFFICERS.filter(
      (o) =>
        !q || o.name.toLowerCase().includes(q) || o.id.toLowerCase().includes(q)
    );
  }, [search]);

  const toggleOfficer = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setSubmitted(false);
    setError("");
  };

  const toggleAll = (e) => {
    if (e.target.checked) {
      setSelected(new Set(filtered.map((o) => o.id)));
    } else {
      setSelected(new Set());
    }
  };

  const allChecked =
    filtered.length > 0 && filtered.every((o) => selected.has(o.id));

  const handleSubmit = () => {
    if (selected.size === 0) {
      setError("Please select at least one officer.");
      return;
    }
    if (!location) {
      setError("Please select a location.");
      return;
    }
    if (!dutyType) {
      setError("Please select a duty type.");
      return;
    }
    setError("");
    setSubmitted(true);
    setSelected(new Set());
    setLocation("");
    setDutyType("");
    setTaskDescription("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      {/* Page Title */}
      <div className="mb-4">
        <h1 className="text-base font-semibold text-gray-800">Assign Duties</h1>
      </div>

      <div className="flex gap-4 items-start">
        {/* LEFT COLUMN */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">

          {/* Filters Row */}
          <div className="bg-white border border-gray-200 rounded p-3">
            <div className="flex flex-wrap gap-3 items-end">
              {/* Select Week */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Select Week</label>
                <div className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1 text-xs text-gray-700 bg-white">
                  <svg className="w-3 h-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                    <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
                    <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
                    <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
                  </svg>
                  <span>{week}</span>
                </div>
              </div>

              {/* Specify Time */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Specify Time</label>
                <input
                  type="text"
                  value={specifyTime}
                  onChange={(e) => setSpecifyTime(e.target.value)}
                  placeholder="Off"
                  className="border border-gray-300 rounded px-2 py-1 text-xs w-24 outline-none focus:border-blue-400"
                />
              </div>

              {/* Select Shift */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Select Shift</label>
                <select
                  value={shift}
                  onChange={(e) => setShift(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-xs w-28 outline-none focus:border-blue-400 bg-white"
                >
                  {SHIFTS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Search Officer */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 opacity-0">s</label>
                <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Officer"
                    className="px-2 py-1 text-xs outline-none w-32"
                  />
                  <button className="px-2 py-1 bg-gray-100 border-l border-gray-300 hover:bg-gray-200 transition-colors">
                    <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                      <path d="M21 21l-4.35-4.35" strokeWidth="2"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Officer Table */}
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <table className="w-full text-xs" style={{ tableLayout: "fixed" }}>
              <colgroup>
                <col style={{ width: "180px" }} />
                <col style={{ width: "auto" }} />
                <col style={{ width: "60px" }} />
              </colgroup>
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-3 py-2 font-medium text-gray-600">Police ID</th>
                  <th className="text-left px-3 py-2 font-medium text-gray-600">Officer</th>
                  <th className="text-left px-3 py-2 font-medium text-gray-600">
                    <div className="flex items-center gap-1">
                      <span>Action</span>
                      <input
                        type="checkbox"
                        checked={allChecked}
                        onChange={toggleAll}
                        className="ml-1 accent-blue-600 cursor-pointer"
                        title="Select all"
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((officer) => (
                  <tr
                    key={officer.id}
                    className={`border-b border-gray-100 cursor-pointer transition-colors ${
                      selected.has(officer.id)
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => toggleOfficer(officer.id)}
                  >
                    <td className="px-3 py-1.5 text-gray-500 truncate">{officer.id}</td>
                    <td className="px-3 py-1.5 text-gray-700">{officer.name}</td>
                    <td className="px-3 py-1.5">
                      <input
                        type="checkbox"
                        checked={selected.has(officer.id)}
                        onChange={() => toggleOfficer(officer.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="accent-blue-600 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Duty Details Bottom */}
          <div className="bg-white border border-gray-200 rounded p-3">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Duty Type</label>
                <div className="border border-gray-300 rounded px-2 py-2 text-xs text-gray-400 min-h-[36px]">
                  {dutyType || ""}
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Location</label>
                <div className="border border-gray-300 rounded px-2 py-2 text-xs text-gray-400 min-h-[36px]">
                  {location || ""}
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-xs text-gray-500 mb-1">Task Description</label>
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:border-blue-400 resize-none"
              />
            </div>
            {error && (
              <p className="text-xs text-red-500 mb-2">{error}</p>
            )}
            {submitted && (
              <p className="text-xs text-green-600 mb-2">
                Duties submitted successfully.
              </p>
            )}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-5 py-2 rounded transition-colors"
              >
                Submit Duties
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-52 flex flex-col gap-3 shrink-0">

          {/* View Assigned Duties */}
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 px-3 rounded transition-colors text-center">
            View Assigned Duties
          </button>

          {/* Selected Officers Card */}
          <div className="bg-white border border-gray-200 rounded p-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-600 font-medium">Selected Officers</span>
              <span className="bg-blue-500 text-white text-xs font-semibold w-6 h-6 rounded-full flex items-center justify-center">
                {selected.size}
              </span>
            </div>

            {/* Select Location */}
            <div className="mb-2">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:border-blue-400 bg-white text-gray-600"
              >
                <option value="">Select Location</option>
                {LOCATIONS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>

            {/* Select Duty Type */}
            <div className="mb-3">
              <select
                value={dutyType}
                onChange={(e) => setDutyType(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:border-blue-400 bg-white text-gray-600"
              >
                <option value="">Select Duty Type</option>
                {DUTY_TYPES.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Hint text */}
            <p className="text-xs text-gray-400 leading-relaxed">
              You can only select units below the required duty or location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
