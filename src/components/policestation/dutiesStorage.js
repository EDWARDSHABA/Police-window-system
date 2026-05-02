export const DUTIES_STORAGE_KEY = "policeAssignedDuties";

export function normalizeDutyRecord(item) {
  if (!item) return null;

  return {
    id: item.id ?? item.officerId ?? "UNKNOWN-ID",
    officer: item.officer ?? item.officerName ?? "Unknown officer",
    location: item.location ?? "Unknown location",
    dutyType: item.dutyType ?? "Unspecified duty",
    shift: item.shift ?? item.specifyTime ?? "Unscheduled",
    specifyTime: item.specifyTime ?? "",
    week: item.week ?? "",
    taskDescription: item.taskDescription ?? "",
    createdAt: item.createdAt ?? new Date().toISOString(),
  };
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
