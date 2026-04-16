export const OFFICERS_STORAGE_KEY = "policeOfficers";

export const defaultOfficers = [
  { id: "MW-ZA-23-898-24", name: "Victor Max", rank: "Sub inspector", active: true },
  { id: "MW-ZA-23-768-24", name: "Shalom Hiu", rank: "Constable", active: true },
  { id: "MW-ZA-23-895-25", name: "Victor Max", rank: "Sergeant", active: false },
  { id: "MW-ZA-23-112-25", name: "Edward Shawa", rank: "Inspector", active: true },
  { id: "MW-ZA-23-898-25", name: "Victor Max", rank: "Superintendent", active: false },
];

export function getStoredOfficers() {
  const savedOfficers = localStorage.getItem(OFFICERS_STORAGE_KEY);

  if (savedOfficers !== null) {
    try {
      const parsedOfficers = JSON.parse(savedOfficers);

      if (Array.isArray(parsedOfficers)) {
        return parsedOfficers;
      }
    } catch {
      // Fall back to the defaults below if storage has invalid JSON.
    }
  }

  localStorage.setItem(OFFICERS_STORAGE_KEY, JSON.stringify(defaultOfficers));
  return defaultOfficers;
}

export function saveOfficers(officers) {
  localStorage.setItem(OFFICERS_STORAGE_KEY, JSON.stringify(officers));
}
