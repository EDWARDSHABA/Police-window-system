import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import StationHeader from "../Header/PoliceStationHeader";
import Footer from "../../officer/footer/footer";
import { addAssignedDuties, getActiveDutyByOfficerId } from "../dutiesStorage";
import { assignOfficerDuties } from "../../officer/Data/dutiesData";
import { getStoredOfficers } from "../officersStorage";

export default function AssignDuties() {
  // ==========================
  // STATE
  // ==========================
  const [officers, setOfficers] = useState([]);
  const [loadingOfficers, setLoadingOfficers] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [week] = useState("Current week");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [shift, setShift] = useState("All Shifts");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(new Set());
  const [location, setLocation] = useState("");
  const [dutyType, setDutyType] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const SHIFTS = ["All Shifts", "Day", "Evening", "Night"];
  const getOfficerKey = (officer) => officer?._id ?? officer?.id ?? officer?.officerId;
  const getOfficerName = (officer) =>
    officer?.name ?? `${officer?.firstName ?? ""} ${officer?.lastName ?? ""}`.trim();
  const getOfficerBadge = (officer) => officer?.officerId ?? officer?.id ?? getOfficerKey(officer);
  const getDateKey = () => new Date().toISOString().slice(0, 10);

  // ==========================
  // FETCH OFFICERS FROM BACKEND
  // ==========================
  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        setLoadingOfficers(true);

        const res = await axios.get(
          "http://localhost:5000/api/admin/officers"
        );

        setOfficers(res.data?.length ? res.data : getStoredOfficers());
      } catch (err) {
        console.error("Failed to load officers:", err.message);
        setOfficers(getStoredOfficers());
      } finally {
        setLoadingOfficers(false);
      }
    };

    fetchOfficers();
  }, []);

  // ==========================
  // FILTER OFFICERS
  // ==========================
  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return officers.filter((o) => {
      if (getActiveDutyByOfficerId(getOfficerKey(o))) {
        return false;
      }

      const fullName = getOfficerName(o).toLowerCase();

      const id = (o.officerId || o.id || "").toLowerCase();

      return !q || fullName.includes(q) || id.includes(q);
    });
  }, [search, officers]);

  // ==========================
  // SELECT TOGGLE
  // ==========================
  const toggleOfficer = (id) => {
    if (getActiveDutyByOfficerId(id)) {
      setError("This officer already has an active duty. Cancel it or wait until it expires.");
      setSuccess("");
      return;
    }

    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

    setSuccess("");
    setError("");
  };

  const allChecked =
    filtered.length > 0 &&
    filtered.every((o) => selected.has(getOfficerKey(o)));

  const toggleAll = (e) => {
    if (e.target.checked) {
      setSelected(
        new Set(
          filtered.map(getOfficerKey).filter(Boolean)
        )
      );
    } else {
      setSelected(new Set());
    }
  };

  // ==========================
  // SUBMIT DUTY (CONNECTED TO BACKEND)
  // ==========================
  const handleSubmit = async () => {
    if (selected.size === 0) {
      return setError("Please select at least one officer.");
    }

    if (!location) {
      return setError("Please select location.");
    }

    if (!dutyType) {
      return setError("Please select duty type.");
    }

    if (!startTime || !endTime) {
      return setError("Please select the allocation start and end hour.");
    }

    setError("");
    setLoadingSubmit(true);

    const selectedOfficers = officers.filter((officer) =>
      selected.has(getOfficerKey(officer))
    );
    const busyOfficers = selectedOfficers.filter((officer) =>
      getActiveDutyByOfficerId(getOfficerKey(officer))
    );

    if (busyOfficers.length > 0) {
      setLoadingSubmit(false);
      return setError(
        `Cannot assign duty. Already active: ${busyOfficers.map(getOfficerName).join(", ")}.`
      );
    }

    const allocationDate = getDateKey();
    const specifyTime = `${startTime} - ${endTime}`;
    const assignmentId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    assignOfficerDuties({
      officers: selectedOfficers,
      dutyType,
      location,
      week,
      specifyTime,
      startTime,
      endTime,
      allocationDate,
      shift,
      taskDescription,
      assignmentId,
    });

    const createdDutyRecords = selectedOfficers.map((officer) => ({
      assignmentId,
      id: getOfficerKey(officer),
      officer: getOfficerName(officer),
      location,
      dutyType,
      shift: specifyTime,
      specifyTime,
      startTime,
      endTime,
      allocationDate,
      week,
      taskDescription,
      createdAt: new Date().toISOString(),
    }));

    addAssignedDuties(createdDutyRecords);

    try {
      const payload = {
        officerIds: Array.from(selected),
        dutyType,
        location,
        week,
        specifyTime,
        startTime,
        endTime,
        allocationDate,
        shift,
        taskDescription,
      };

      const res = await axios.post(
        "http://localhost:5000/api/admin/duties",
        payload
      );

      console.log("SERVER RESPONSE:", res.data);

      setSuccess("Duty assigned successfully & emails sent!");
      setSelected(new Set());

      setLocation("");
      setDutyType("");
      setTaskDescription("");
      setStartTime("");
      setEndTime("");
      setShift("All Shifts");
    } catch (err) {
      console.error(err);
      setSuccess("Duty saved locally. Officers can now view it in their Duties page.");
      setError(err.response?.data?.message || "Backend unavailable; email was not sent.");
      setSelected(new Set());
      setLocation("");
      setDutyType("");
      setTaskDescription("");
      setStartTime("");
      setEndTime("");
      setShift("All Shifts");
    } finally {
      setLoadingSubmit(false);
    }
  };

  // ==========================
  // UI
  // ==========================
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <StationHeader />
      <main className="w-full px-4 pb-4 pt-10">
        <div className="bg-blue-500 text-white p-4 rounded mb-6">
          Assign Duties for all officers
        </div>

        <h2 className="text-lg font-bold mb-4">
          Assign Duties
        </h2>

        <div className="flex gap-4">

        {/* LEFT */}
        <div className="flex-1">

          {/* FILTERS */}
          <div className="bg-white p-3 rounded mb-3 flex gap-3">
            <input
              placeholder="Search officer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-1 text-sm"
            />

            <select
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              className="border p-1 text-sm"
            >
              {SHIFTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            <div className="flex items-center gap-2 text-sm">
              <label className="flex items-center gap-1 text-slate-700">
                <span>Start time</span>
                <input
                  type="time"
                  step="3600"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  aria-label="Allocation start hour"
                  className="border p-1 text-sm"
                />
              </label>
              <label className="flex items-center gap-1 text-slate-700">
                <span>End time</span>
                <input
                  type="time"
                  step="3600"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  aria-label="Allocation end hour"
                  className="border p-1 text-sm"
                />
              </label>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="p-2 text-center">No.</th>
                  <th className="p-2 text-center">ID</th>
                  <th className="p-2 text-center">Name</th>
                  <th className="p-2 text-center">
                    <div className="inline-flex items-center justify-center gap-2">
                      <span>Select officer</span>
                      <input
                        type="checkbox"
                        checked={allChecked}
                        onChange={toggleAll}
                      />
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {loadingOfficers ? (
                  <tr>
                    <td colSpan="4" className="p-3 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-3 text-center">
                      No officers found
                    </td>
                  </tr>
                ) : (
                  filtered.map((o, index) => {
                    const officerKey = getOfficerKey(o);
                    return (
                      <tr
                        key={officerKey}
                        className="border-b cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleOfficer(officerKey)}
                      >
                        <td className="p-2 text-center text-xs">
                          {index + 1}
                        </td>

                        <td className="p-2 text-center text-xs">
                          {getOfficerBadge(o)}
                        </td>

                        <td className="p-2 text-center">
                          <span>{getOfficerName(o)}</span>
                        </td>

                        <td className="p-2 text-center">
                          <input
                            type="checkbox"
                            checked={selected.has(officerKey)}
                            onChange={() => toggleOfficer(officerKey)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-72 bg-white p-3 rounded">

          <h3 className="font-bold mb-2">
            Duty Details
          </h3>

          <select
            value={dutyType}
            onChange={(e) => setDutyType(e.target.value)}
            className="border w-full p-1 mb-2"
          >
            <option value="">Select Duty</option>
            <option>Patrol</option>
            <option>Traffic</option>
            <option>Investigation</option>
            <option>Invigilation</option>
            <option>At the station</option>
          </select>

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Type location"
            className="border w-full p-1 mb-2"
          />

          <textarea
            value={taskDescription}
            onChange={(e) =>
              setTaskDescription(e.target.value)
            }
            placeholder="Task description"
            className="border w-full p-1 mb-2"
          />

          {error && (
            <p className="text-red-500 text-xs">{error}</p>
          )}

          {success && (
            <p className="text-green-600 text-xs">
              {success}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loadingSubmit}
            className="bg-blue-600 text-white w-full p-2 mt-2"
          >
            {loadingSubmit ? "Assigning..." : "Submit Duty"}
          </button>
        </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
