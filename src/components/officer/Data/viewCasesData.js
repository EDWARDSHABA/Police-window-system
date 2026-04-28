export const VIEW_CASES_STORAGE_KEY = "officerViewCases";

export const CASE_STATUS_OPTIONS = ["Under investigation", "Open", "Closed", "Aquito"];

function buildCaseDetails({
  id,
  type,
  status,
  name,
  officer,
  date,
  location,
  description,
  notes,
  victimGender,
  victimContact,
  suspectName,
  suspectGender,
  suspectContact,
  evidence,
  fileName,
}) {
  return {
    id,
    type,
    status,
    name,
    officer,
    date: date ?? "2026-04-25",
    location: location ?? "Blantyre Central",
    description:
      description ?? `${type} case reported by ${name}. Initial report recorded for investigation.`,
    notes: notes ?? "No additional notes recorded.",
    victimGender: victimGender ?? "Not provided",
    victimContact: victimContact ?? "Not provided",
    suspectName: suspectName ?? "Unknown",
    suspectGender: suspectGender ?? "Not provided",
    suspectContact: suspectContact ?? "Not provided",
    evidence: evidence ?? null,
    fileName: fileName ?? "",
  };
}

export const DEFAULT_VIEW_CASES = [
  buildCaseDetails({
    id: "MW-ZA-001-04-26",
    type: "Robbery",
    status: "Aquito",
    name: "Chales Mandela",
    officer: "Sgt. Leoleo",
    location: "Limbe Market",
    victimGender: "Male",
    victimContact: "+265 991 111 001",
    suspectName: "Peter Mvula",
    suspectGender: "Male",
    suspectContact: "+265 996 221 908",
  }),
  buildCaseDetails({
    id: "MW-ZA-002-04-26",
    type: "Robbery",
    status: "Under investigation",
    name: "Hilon Kachambe",
    officer: "Sgt. Makuali",
    location: "Chichiri Bus Depot",
    victimGender: "Female",
    victimContact: "+265 991 111 002",
  }),
  buildCaseDetails({
    id: "MW-ZA-003-04-26",
    type: "Difiement",
    status: "Under investigation",
    name: "Gilo Zenod",
    officer: "Sgt. Zengo",
  }),
  buildCaseDetails({
    id: "MW-ZA-004-04-26",
    type: "Difiement",
    status: "Aquito",
    name: "Zero Mavuto",
    officer: "Sgt. Zengo",
  }),
  buildCaseDetails({
    id: "MW-ZA-005-04-26",
    type: "Robbery",
    status: "Under investigation",
    name: "Nthawi Mayo",
    officer: "Sgt. Leoleo",
  }),
  buildCaseDetails({
    id: "MW-ZA-006-04-26",
    type: "Assault",
    status: "Under investigation",
    name: "Jay Utaka",
    officer: "Sgt. Makuali",
  }),
  buildCaseDetails({
    id: "MW-ZA-007-04-26",
    type: "Burglary",
    status: "Closed",
    name: "Lydia Phwezi",
    officer: "Sgt. Samuel Ken",
  }),
  buildCaseDetails({
    id: "MW-ZA-008-04-26",
    type: "Fraud",
    status: "Under investigation",
    name: "Patrick Dongo",
    officer: "Sgt. Leoleo",
  }),
  buildCaseDetails({
    id: "MW-ZA-009-04-26",
    type: "Assault",
    status: "Aquito",
    name: "Maureen Chipwanya",
    officer: "Sgt. Makuali",
  }),
  buildCaseDetails({
    id: "MW-ZA-010-04-26",
    type: "Theft",
    status: "Under investigation",
    name: "Brighton Sithole",
    officer: "Sgt. Zengo",
  }),
  buildCaseDetails({
    id: "MW-ZA-011-04-26",
    type: "Robbery",
    status: "Under investigation",
    name: "Dalitso Phiri",
    officer: "Sgt. Leoleo",
  }),
  buildCaseDetails({
    id: "MW-ZA-012-04-26",
    type: "Difiement",
    status: "Closed",
    name: "Erick Banda",
    officer: "Sgt. Samuel Ken",
  }),
  buildCaseDetails({
    id: "MW-ZA-013-04-26",
    type: "Assault",
    status: "Under investigation",
    name: "Witness Chithande",
    officer: "Sgt. Makuali",
  }),
];

export function normalizeViewCase(item) {
  if (!item) return null;

  return {
    ...buildCaseDetails({
      id: item.id ?? item.caseId ?? "CASE-UNKNOWN",
      type: item.type ?? item.crimeType ?? "Unknown",
      status: item.status ?? "Under investigation",
      name: item.name ?? item.complainant ?? "Unknown complainant",
      officer: item.officer ?? item.assignedOfficer ?? "Unassigned officer",
      date: item.date,
      location: item.location,
      description: item.description,
      notes: item.notes,
      victimGender: item.victimGender,
      victimContact: item.victimContact,
      suspectName: item.suspectName ?? item.suspect,
      suspectGender: item.suspectGender,
      suspectContact: item.suspectContact,
      evidence: item.evidence,
      fileName: item.fileName,
    }),
    ...item,
  };
}

export function getStoredViewCases() {
  const storedCases = localStorage.getItem(VIEW_CASES_STORAGE_KEY);

  if (!storedCases) {
    localStorage.setItem(VIEW_CASES_STORAGE_KEY, JSON.stringify(DEFAULT_VIEW_CASES));
    return DEFAULT_VIEW_CASES;
  }

  try {
    const parsedCases = JSON.parse(storedCases);
    return Array.isArray(parsedCases) ? parsedCases.map(normalizeViewCase) : DEFAULT_VIEW_CASES;
  } catch {
    localStorage.setItem(VIEW_CASES_STORAGE_KEY, JSON.stringify(DEFAULT_VIEW_CASES));
    return DEFAULT_VIEW_CASES;
  }
}

export function saveViewCases(cases) {
  localStorage.setItem(VIEW_CASES_STORAGE_KEY, JSON.stringify(cases));
}

export function getViewCaseById(caseId) {
  return getStoredViewCases().find((item) => item.id === caseId) ?? null;
}

export function addViewCase(caseRecord) {
  const normalizedRecord = normalizeViewCase({
    ...caseRecord,
    id: caseRecord?.id ?? caseRecord?.caseId,
    caseId: caseRecord?.caseId ?? caseRecord?.id,
    type: caseRecord?.type ?? caseRecord?.typeOfCrime,
    name: caseRecord?.name ?? caseRecord?.victim?.vFullName ?? caseRecord?.caseName,
    officer: caseRecord?.officer ?? "Assigned Officer",
    date: caseRecord?.date ?? caseRecord?.dateOfIncidence,
    suspectName: caseRecord?.suspectName ?? caseRecord?.suspect?.sFullName,
    suspectGender: caseRecord?.suspectGender ?? caseRecord?.suspect?.sGender,
    suspectContact: caseRecord?.suspectContact ?? caseRecord?.suspect?.sContact,
    victimGender: caseRecord?.victimGender ?? caseRecord?.victim?.vGender,
    victimContact: caseRecord?.victimContact ?? caseRecord?.victim?.vContact,
    fileName:
      caseRecord?.fileName ??
      (Array.isArray(caseRecord?.files) && caseRecord.files.length > 0
        ? caseRecord.files.map((file) => file?.name).filter(Boolean).join(", ")
        : ""),
  });

  const existingCases = getStoredViewCases();
  const updatedCases = [
    normalizedRecord,
    ...existingCases.filter((item) => item.id !== normalizedRecord.id),
  ];

  saveViewCases(updatedCases);
  return normalizedRecord;
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
