import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileIcon from "../../../assets/icons/profile.png";
import {
  getCurrentOfficerId,
  getDutiesForOfficer,
  getDutyOfficers,
  setCurrentOfficerId,
} from "../Data/dutiesData";

function displayDate(dateString) {
  if (!dateString) return "Date not specified";
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${dateString}T00:00:00`));
}

export default function Duties() {
  const navigate = useNavigate();
  const officers = useMemo(() => getDutyOfficers(), []);
  const [selectedOfficerId, setSelectedOfficerId] = useState(() => getCurrentOfficerId());
  const assignedDuties = useMemo(
    () => getDutiesForOfficer(selectedOfficerId),
    [selectedOfficerId]
  );
  const selectedOfficer = officers.find((officer) => officer.id === selectedOfficerId) ?? officers[0];

  const handleOfficerChange = (event) => {
    setSelectedOfficerId(event.target.value);
    setCurrentOfficerId(event.target.value);
  };

  return (
    <div className="mx-auto w-full max-w-7xl pb-16 text-slate-950">
      <div className="mb-4 flex items-center gap-3 border-b border-sky-300 pb-2">
        <button
          type="button"
          aria-label="Back"
          onClick={() => navigate(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold text-blue-800 hover:bg-blue-50"
        >
          &larr;
        </button>
        <div className="rounded-t-lg bg-sky-200 px-6 py-2 text-xs font-black uppercase text-slate-950">
          Duty Assignments
        </div>
      </div>

      <h1 className="mb-5 text-sm font-black uppercase tracking-wide text-slate-950">
        Duty Assignments and Shift Allocation
      </h1>

      <section className="rounded-sm border border-slate-300 bg-white shadow-sm">
        <div className="bg-slate-200 p-2">
          <label className="block text-[10px] font-bold uppercase text-slate-700" htmlFor="officer">
            Select Officer
          </label>
          <div className="mt-1 inline-flex items-center gap-2 rounded-sm border border-slate-300 bg-white px-2 py-1">
            <img src={profileIcon} alt="" className="h-8 w-8 rounded-sm object-cover" />
            <select
              id="officer"
              value={selectedOfficer?.id ?? ""}
              onChange={handleOfficerChange}
              className="bg-white text-xs font-semibold text-slate-900 outline-none"
            >
              {officers.map((officer) => (
                <option key={officer.id} value={officer.id}>
                  {officer.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-2 text-xs font-medium text-slate-950">My Assigned Duties</h2>
        <div className="overflow-hidden rounded-sm border border-slate-400 bg-white shadow-sm">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-4 border-yellow-700 bg-slate-200 text-slate-950">
                <th className="px-4 py-2 font-medium">Date weekly</th>
                <th className="px-4 py-2 font-medium">Time</th>
                <th className="px-4 py-2 font-medium">Duty Type</th>
                <th className="px-4 py-2 font-medium">Location</th>
                <th className="px-4 py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {assignedDuties.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-10 text-center text-slate-500">
                    No duties assigned to {selectedOfficer?.name ?? "this officer"} yet.
                  </td>
                </tr>
              ) : (
                assignedDuties.map((duty) => (
                  <tr key={duty.id} className="border-b border-slate-400 last:border-b-0">
                    <td className="px-4 py-4 text-slate-900">
                      {displayDate(duty.startDate)}
                      <span className="block text-xs text-slate-500">{duty.week}</span>
                    </td>
                    <td className="px-4 py-4 text-slate-900">{duty.time}</td>
                    <td className="px-4 py-4 text-slate-900">{duty.dutyType}</td>
                    <td className="px-4 py-4 text-slate-900">{duty.location}</td>
                    <td className="px-4 py-4 text-slate-900">{duty.taskDescription}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
