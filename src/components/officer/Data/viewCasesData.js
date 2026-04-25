export const VIEW_CASES_STORAGE_KEY = "officerViewCases";

export const DEFAULT_VIEW_CASES = [
  {
    id: "MW-ZA-001-04-26",
    type: "Robbery",
    status: "Aquito",
    name: "Chales Mandela",
    officer: "Sgt. Leoleo",
  },
  {
    id: "MW-ZA-002-04-26",
    type: "Robbery",
    status: "Under investigation",
    name: "Hilon Kachambe",
    officer: "Sgt. Makuali",
  },
  {
    id: "MW-ZA-003-04-26",
    type: "Difiement",
    status: "Under investigation",
    name: "Gilo Zenod",
    officer: "Sgt. Zengo",
  },
  {
    id: "MW-ZA-004-04-26",
    type: "Difiement",
    status: "Aquito",
    name: "Zero Mavuto",
    officer: "Sgt. Zengo",
  },
  {
    id: "MW-ZA-005-04-26",
    type: "Robbery",
    status: "Under investigation",
    name: "Nthawi Mayo",
    officer: "Sgt. Leoleo",
  },
  {
    id: "MW-ZA-006-04-26",
    type: "Assault",
    status: "Under investigation",
    name: "Jay Utaka",
    officer: "Sgt. Makuali",
  },
  {
    id: "MW-ZA-007-04-26",
    type: "Burglary",
    status: "Closed",
    name: "Lydia Phwezi",
    officer: "Sgt. Samuel Ken",
  },
  {
    id: "MW-ZA-008-04-26",
    type: "Fraud",
    status: "Under investigation",
    name: "Patrick Dongo",
    officer: "Sgt. Leoleo",
  },
  {
    id: "MW-ZA-009-04-26",
    type: "Assault",
    status: "Aquito",
    name: "Maureen Chipwanya",
    officer: "Sgt. Makuali",
  },
  {
    id: "MW-ZA-010-04-26",
    type: "Theft",
    status: "Under investigation",
    name: "Brighton Sithole",
    officer: "Sgt. Zengo",
  },
  {
    id: "MW-ZA-011-04-26",
    type: "Robbery",
    status: "Under investigation",
    name: "Dalitso Phiri",
    officer: "Sgt. Leoleo",
  },
  {
    id: "MW-ZA-012-04-26",
    type: "Difiement",
    status: "Closed",
    name: "Erick Banda",
    officer: "Sgt. Samuel Ken",
  },
  {
    id: "MW-ZA-013-04-26",
    type: "Assault",
    status: "Under investigation",
    name: "Witness Chithande",
    officer: "Sgt. Makuali",
  },
];

export function getStoredViewCases() {
  const storedCases = localStorage.getItem(VIEW_CASES_STORAGE_KEY);

  if (!storedCases) {
    localStorage.setItem(VIEW_CASES_STORAGE_KEY, JSON.stringify(DEFAULT_VIEW_CASES));
    return DEFAULT_VIEW_CASES;
  }

  try {
    const parsedCases = JSON.parse(storedCases);
    return Array.isArray(parsedCases) ? parsedCases : DEFAULT_VIEW_CASES;
  } catch {
    localStorage.setItem(VIEW_CASES_STORAGE_KEY, JSON.stringify(DEFAULT_VIEW_CASES));
    return DEFAULT_VIEW_CASES;
  }
}

export function saveViewCases(cases) {
  localStorage.setItem(VIEW_CASES_STORAGE_KEY, JSON.stringify(cases));
}

function normalizeViewCase(caseRecord = {}) {
  const victim = caseRecord.victim ?? {};
  const suspect = caseRecord.suspect ?? {};

  return {
    ...caseRecord,
    id: caseRecord.id ?? caseRecord.caseId ?? "",
    caseId: caseRecord.caseId ?? caseRecord.id ?? "",
    type: caseRecord.type ?? caseRecord.typeOfCrime ?? "Other",
    typeOfCrime: caseRecord.typeOfCrime ?? caseRecord.type ?? "Other",
    status: caseRecord.status ?? "Under investigation",
    name: caseRecord.name ?? victim.vFullName ?? caseRecord.caseName ?? "Unknown",
    caseName: caseRecord.caseName ?? caseRecord.name ?? "Untitled Case",
    officer: caseRecord.officer ?? "Assigned Officer",
    victim: {
      vFullName: victim.vFullName ?? caseRecord.name ?? caseRecord.caseName ?? "",
      vGender: victim.vGender ?? "",
      vOccupation: victim.vOccupation ?? "",
      vContact: victim.vContact ?? "",
      vAddress: victim.vAddress ?? "",
    },
    suspect: {
      sFullName: suspect.sFullName ?? "",
      sGender: suspect.sGender ?? "",
      sOccupation: suspect.sOccupation ?? "",
      sContact: suspect.sContact ?? "",
      sAddress: suspect.sAddress ?? "",
    },
    description: caseRecord.description ?? "",
    suspectStatement: caseRecord.suspectStatement ?? "",
    location: caseRecord.location ?? "",
    dateOfIncidence: caseRecord.dateOfIncidence ?? "",
    files: Array.isArray(caseRecord.files) ? caseRecord.files : [],
    submittedAt: caseRecord.submittedAt ?? new Date().toISOString(),
  };
}

export function addViewCase(caseRecord) {
  const existingCases = getStoredViewCases();
  const nextCase = normalizeViewCase(caseRecord);

  const filteredCases = existingCases.filter((item) => item.id !== nextCase.id);
  const updatedCases = [nextCase, ...filteredCases];
  saveViewCases(updatedCases);
  return nextCase;
}

export function updateViewCaseStatus(caseId, nextStatus) {
  const updatedCases = getStoredViewCases().map((item) =>
    item.id === caseId || item.caseId === caseId
      ? { ...item, id: item.id ?? caseId, caseId: item.caseId ?? caseId, status: nextStatus }
      : item
  );

  saveViewCases(updatedCases);
  return updatedCases.find((item) => item.id === caseId || item.caseId === caseId) ?? null;
}
