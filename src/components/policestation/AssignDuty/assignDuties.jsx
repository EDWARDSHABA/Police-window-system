import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import StationHeader from "../Header/PoliceStationHeader";
import Footer from "../../officer/footer/footer";
<<<<<<< HEAD
import { addAssignedDuties } from "../dutiesStorage";
=======
import { assignOfficerDuties } from "../../officer/Data/dutiesData";
import { getStoredOfficers } from "../officersStorage";
>>>>>>> 7a0791d988cc9123919b2c5479e3a8c84bc4368f

export default function AssignDuties() {
  // ==========================
  // STATE
  // ==========================
  const [officers, setOfficers] = useState([]);
  const [loadingOfficers, setLoadingOfficers] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [week] = useState("April 10 - April 17, 2026");
  const [specifyTime, setSpecifyTime] = useState("");
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
      const fullName = (o.name || `${o.firstName ?? ""} ${o.lastName ?? ""}`).toLowerCase();

      const id = (o.officerId || o.id || "").toLowerCase();

      return !q || fullName.includes(q) || id.includes(q);
    });
  }, [search, officers]);

  // ==========================
  // SELECT TOGGLE
  // ==========================
  const toggleOfficer = (id) => {
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
      setSelected(new Set(filtered.map(getOfficerKey).filter(Boolean)));
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

    setError("");
    setLoadingSubmit(true);

    const selectedOfficers = officers.filter((officer) =>
      selected.has(getOfficerKey(officer))
    );

    assignOfficerDuties({
      officers: selectedOfficers,
      dutyType,
      location,
      week,
      specifyTime,
      shift,
      taskDescription,
    });

    try {
      const payload = {
        officerIds: Array.from(selected), // 🔥 IMPORTANT FIX
        dutyType,
        location,
        week,
        specifyTime,
        shift,
        taskDescription,
      };

      const res = await axios.post(
        "http://localhost:5000/api/admin/duties",
        payload
      );

      console.log("SERVER RESPONSE:", res.data);

      const selectedOfficerRecords = officers.filter((officer) =>
        selected.has(officer._id)
      );

      const createdDutyRecords = selectedOfficerRecords.map((officer) => ({
        id: officer.officerId,
        officer: `${officer.firstName} ${officer.lastName}`,
        location,
        dutyType,
        shift: specifyTime || shift,
        specifyTime,
        week,
        taskDescription,
        createdAt: new Date().toISOString(),
      }));

      addAssignedDuties(createdDutyRecords);

      setSuccess("Duty assigned successfully & emails sent!");
      setSelected(new Set());

      setLocation("");
      setDutyType("");
      setTaskDescription("");
      setSpecifyTime("");
      setShift("All Shifts");
    } catch (err) {
      console.error(err);
      setSuccess("Duty saved locally. Officers can now view it in their Duties page.");
      setError(err.response?.data?.message || "Backend unavailable; email was not sent.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  // ==========================
  // UI
  // ==========================
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <StationHeader pageTitle="Assign Duties" />

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

            <input
              placeholder="Time (e.g 08:00 - 17:00)"
              value={specifyTime}
              onChange={(e) => setSpecifyTime(e.target.value)}
              className="border p-1 text-sm"
            />
          </div>

          {/* TABLE */}
          <div className="bg-white rounded">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="p-2">ID</th>
                  <th>Name</th>
                  <th>
                    <input
                      type="checkbox"
                      checked={allChecked}
                      onChange={toggleAll}
                    />
                  </th>
                </tr>
              </thead>

              <tbody>
                {loadingOfficers ? (
                  <tr>
                    <td colSpan="3" className="p-3 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="p-3 text-center">
                      No officers found
                    </td>
                  </tr>
                ) : (
                  filtered.map((o) => (
                    <tr
                      key={getOfficerKey(o)}
                      className="border-b cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleOfficer(getOfficerKey(o))}
                    >
                      <td className="p-2 text-xs">
                        {o.officerId ?? o.id}
                      </td>

                      <td className="p-2">
                        {o.name ?? `${o.firstName ?? ""} ${o.lastName ?? ""}`}
                      </td>

                      <td>
                        <input
                          type="checkbox"
                          checked={selected.has(getOfficerKey(o))}
                          onChange={() => toggleOfficer(getOfficerKey(o))}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                    </tr>
                  ))
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

      <Footer />
    </div>
  );
}
