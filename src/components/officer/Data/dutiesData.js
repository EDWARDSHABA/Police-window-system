import { defaultOfficers, getStoredOfficers } from "../../policestation/officersStorage";

export const OFFICER_DUTIES_STORAGE_KEY = "officerAssignedDuties";
export const CURRENT_OFFICER_STORAGE_KEY = "currentOfficerId";

export const MALAWI_GENERAL_HOLIDAYS = [
  { date: "2026-01-01", name: "New Year's Day" },
  { date: "2026-01-15", name: "John Chilembwe Day" },
  { date: "2026-03-03", name: "Martyrs' Day" },
  { date: "2026-04-03", name: "Good Friday" },
  { date: "2026-04-06", name: "Easter Monday" },
  { date: "2026-05-01", name: "Labour Day" },
  { date: "2026-05-14", name: "Kamuzu Day" },
  { date: "2026-07-06", name: "Independence Day" },
  { date: "2026-10-15", name: "Mother's Day" },
  { date: "2026-12-25", name: "Christmas Day" },
  { date: "2026-12-26", name: "Boxing Day" },
];

function toDateKey(date) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
}

function normalizeOfficer(officer) {
  const id = officer?._id ?? officer?.id ?? officer?.officerId ?? "";
  const name =
    officer?.name ??
    `${officer?.firstName ?? ""} ${officer?.lastName ?? ""}`.trim() ??
    officer?.officerId ??
    "Unknown Officer";

  return {
    ...officer,
    id,
    officerId: officer?.officerId ?? officer?.id ?? id,
    name: name || "Unknown Officer",
  };
}

export function getDutyOfficers() {
  const officers = getStoredOfficers();
  const normalized = officers.length > 0 ? officers.map(normalizeOfficer) : defaultOfficers;
  return normalized.filter((officer) => officer.id);
}

export function getCurrentOfficerId() {
  return localStorage.getItem(CURRENT_OFFICER_STORAGE_KEY) ?? getDutyOfficers()[0]?.id ?? "";
}

export function setCurrentOfficerId(officerId) {
  localStorage.setItem(CURRENT_OFFICER_STORAGE_KEY, officerId);
}

export function getStoredOfficerDuties() {
  const savedDuties = localStorage.getItem(OFFICER_DUTIES_STORAGE_KEY);

  if (!savedDuties) return [];

  try {
    const parsedDuties = JSON.parse(savedDuties);
    return Array.isArray(parsedDuties) ? parsedDuties : [];
  } catch {
    localStorage.setItem(OFFICER_DUTIES_STORAGE_KEY, JSON.stringify([]));
    return [];
  }
}

export function saveOfficerDuties(duties) {
  localStorage.setItem(OFFICER_DUTIES_STORAGE_KEY, JSON.stringify(duties));
}

export function assignOfficerDuties({
  officers,
  dutyType,
  location,
  week,
  specifyTime,
  shift,
  taskDescription,
}) {
  const existingDuties = getStoredOfficerDuties();
  const assignedAt = new Date().toISOString();
  const startDate = "2026-04-10";

  const newDuties = officers.map((officer) => {
    const normalizedOfficer = normalizeOfficer(officer);

    return {
      id: `${normalizedOfficer.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      officerId: normalizedOfficer.id,
      officerBadge: normalizedOfficer.officerId,
      officerName: normalizedOfficer.name,
      dutyType,
      location,
      week,
      startDate,
      time: specifyTime || shift || "Time not specified",
      shift: shift || "All Shifts",
      taskDescription: taskDescription || "No task description provided.",
      assignedAt,
    };
  });

  saveOfficerDuties([...newDuties, ...existingDuties]);
  return newDuties;
}

export function getDutiesForOfficer(officerId) {
  return getStoredOfficerDuties().filter((duty) => duty.officerId === officerId);
}

export function getCalendarMonth(duties) {
  const dateKey = duties[0]?.startDate ?? "2026-04-01";
  const date = new Date(`${dateKey}T00:00:00`);
  return { year: date.getFullYear(), month: date.getMonth() };
}

export function getHolidayMap(year, month) {
  return MALAWI_GENERAL_HOLIDAYS.reduce((holidayMap, holiday) => {
    const date = new Date(`${holiday.date}T00:00:00`);
    if (date.getFullYear() === year && date.getMonth() === month) {
      holidayMap[toDateKey(date)] = holiday.name;
    }
    return holidayMap;
  }, {});
}
