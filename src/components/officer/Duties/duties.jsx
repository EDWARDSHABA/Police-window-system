import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileIcon from "../../../assets/icons/profile.png";
import {
  getCalendarMonth,
  getCurrentOfficerId,
  getDutiesForOfficer,
  getDutyOfficers,
  getHolidayMap,
  setCurrentOfficerId,
} from "../Data/dutiesData";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dutyColors = {
  Patrol: "bg-blue-600",
  Traffic: "bg-sky-700",
  Investigation: "bg-purple-700",
  "Desk duty": "bg-green-700",
  "Desk Duty": "bg-green-700",
};

function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function displayDate(dateString) {
  if (!dateString) return "Date not specified";
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${dateString}T00:00:00`));
}

function displayHolidayDate(dateString) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${dateString}T00:00:00`));
}

function buildCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  return Array.from({ length: totalCells }, (_, index) => {
    const day = index - firstDay + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });
}

function CalendarBadge({ children, color }) {
  return (
    <div className={`mt-1 truncate rounded-sm px-1.5 py-0.5 text-[10px] font-semibold text-white ${color}`}>
      {children}
    </div>
  );
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
  const { year, month } = getCalendarMonth(assignedDuties);
  const calendarDays = buildCalendarDays(year, month);
  const holidayMap = getHolidayMap(year, month);

  const dutiesByDate = assignedDuties.reduce((groupedDuties, duty) => {
    const key = duty.startDate;
    groupedDuties[key] = [...(groupedDuties[key] ?? []), duty];
    return groupedDuties;
  }, {});

  const monthHolidays = Object.entries(holidayMap).map(([date, name]) => ({
    date,
    name,
  }));

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

        <div className="border-t-4 border-yellow-700">
          <h2 className="py-3 text-center text-sm font-black text-slate-800">
            {monthNames[month]} {year} Duty Calendar
          </h2>
          <div className="grid grid-cols-7 border-t border-l border-slate-200 text-center text-xs font-bold text-slate-800">
            {weekDays.map((day) => (
              <div key={day} className="border-r border-b border-slate-200 bg-slate-100 px-2 py-2">
                {day}
              </div>
            ))}
            {calendarDays.map((day, index) => {
              const key = day ? dateKey(year, month, day) : "";
              const duties = dutiesByDate[key] ?? [];
              const holidayName = holidayMap[key];

              return (
                <div
                  key={`${day ?? "empty"}-${index}`}
                  className="min-h-16 border-r border-b border-slate-200 bg-white px-1 py-1 text-left align-top"
                >
                  {day && <span className="text-[11px] font-semibold text-slate-600">{day}</span>}
                  {duties.map((duty) => (
                    <CalendarBadge
                      key={duty.id}
                      color={dutyColors[duty.dutyType] ?? "bg-blue-600"}
                    >
                      {duty.dutyType}
                    </CalendarBadge>
                  ))}
                  {holidayName && (
                    <CalendarBadge color="bg-yellow-700">
                      {holidayName} - {displayHolidayDate(key)}
                    </CalendarBadge>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="mt-5 text-xs text-slate-950">
        <p>
          <span className="font-black text-yellow-800">NOTE:</span>
        </p>
        <p className="mt-1 font-bold">
          The provided holidays are Malawian general public holidays. Use time wisely please.
        </p>
        {monthHolidays.length > 0 && (
          <p className="mt-1 font-semibold">
            {monthHolidays
              .map((holiday) => `${holiday.name} - ${displayDate(holiday.date)}`)
              .join(" | ")}
          </p>
        )}
      </div>

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
