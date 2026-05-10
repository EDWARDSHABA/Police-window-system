export const DUTIES_STORAGE_KEY = "policeAssignedDuties";

function getDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function parseTimeParts(time) {
  const match = /^(\d{2}):(\d{2})$/.exec(time ?? "");
  if (!match) return null;

  return {
    hours: Number(match[1]),
    minutes: Number(match[2]),
  };
}

function getTimedDate(dateKey, time) {
  const timeParts = parseTimeParts(time);
  if (!dateKey || !timeParts) return null;

  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day, timeParts.hours, timeParts.minutes);
}

function getWeekEndDate(week) {
  const match = /-\s*([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})/.exec(week ?? "");
  if (!match) return null;

  const date = new Date(`${match[1]} ${match[2]}, ${match[3]} 23:59:59`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function normalizeDutyRecord(item) {
  if (!item) return null;

  const startTime = item.startTime ?? "";
  const endTime = item.endTime ?? "";
  const specifyTime = item.specifyTime ?? (startTime && endTime ? `${startTime} - ${endTime}` : "");
  const createdAt = item.createdAt ?? new Date().toISOString();

  return {
    assignmentId: item.assignmentId ?? createdAt,
    id: item.id ?? item.officerId ?? "UNKNOWN-ID",
    officer: item.officer ?? item.officerName ?? "Unknown officer",
    location: item.location ?? "Unknown location",
    dutyType: item.dutyType ?? "Unspecified duty",
    shift: item.shift ?? specifyTime ?? "Unscheduled",
    specifyTime,
    startTime,
    endTime,
    allocationDate: item.allocationDate ?? getDateKey(),
    week: item.week ?? "",
    taskDescription: item.taskDescription ?? "",
    status: item.status ?? "active",
    createdAt,
  };
}

export function isDutyExpired(duty, now = new Date()) {
  const normalizedDuty = normalizeDutyRecord(duty);
  if (!normalizedDuty) return true;

  const startDate = getTimedDate(normalizedDuty.allocationDate, normalizedDuty.startTime);
  const endDate = getTimedDate(normalizedDuty.allocationDate, normalizedDuty.endTime);

  if (startDate && endDate) {
    const adjustedEndDate =
      endDate <= startDate
        ? new Date(endDate.getTime() + 24 * 60 * 60 * 1000)
        : endDate;

    return now >= adjustedEndDate;
  }

  const weekEndDate = getWeekEndDate(normalizedDuty.week);
  return weekEndDate ? now > weekEndDate : false;
}

export function isDutyActive(duty, now = new Date()) {
  const normalizedDuty = normalizeDutyRecord(duty);
  return Boolean(normalizedDuty) && normalizedDuty.status !== "cancelled" && !isDutyExpired(normalizedDuty, now);
}

export function getStoredDuties() {
  const storedDuties = localStorage.getItem(DUTIES_STORAGE_KEY);

  if (!storedDuties) {
    return [];
  }

  try {
    const parsedDuties = JSON.parse(storedDuties);
    return Array.isArray(parsedDuties) ? parsedDuties.map(normalizeDutyRecord).filter(Boolean) : [];
  } catch {
    return [];
  }
}

export function saveDuties(duties) {
  localStorage.setItem(DUTIES_STORAGE_KEY, JSON.stringify(duties));
}

export function addAssignedDuties(records) {
  const existing = getStoredDuties();
  const next = [...records.map(normalizeDutyRecord).filter(Boolean), ...existing];
  saveDuties(next);
  return next;
}

export function getActiveDutyByOfficerId(officerId) {
  return getStoredDuties().find((duty) => duty.id === officerId && isDutyActive(duty));
}
