import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getStoredViewCases, updateViewCaseStatus } from "../Data/viewCasesData";

export default function UpdateCase() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const selectedCaseId = state?.selectedCase?.id;
  const selectedCase = useMemo(() => {
    if (!selectedCaseId) return state?.selectedCase ?? null;

    return (
      getStoredViewCases().find((item) => item.id === selectedCaseId) ??
      state?.selectedCase ??
      null
    );
  }, [selectedCaseId, state]);

  const [caseId] = useState(selectedCase?.id ?? "MW-ZA-015-04-26");
  const [complainant] = useState(selectedCase?.name ?? "");
  const [suspect, setSuspect] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [assignedOfficer] = useState(selectedCase?.officer ?? "Sgt. Leoleo");
  const [status, setStatus] = useState(selectedCase?.status ?? "Under investigation");
  const [victimGender, setVictimGender] = useState("");
  const [victimOccupation, setVictimOccupation] = useState("");
  const [victimContact, setVictimContact] = useState("");
  const [victimAddress, setVictimAddress] = useState("");
  const [suspectGender, setSuspectGender] = useState("");
  const [suspectOccupation, setSuspectOccupation] = useState("");
  const [suspectContact, setSuspectContact] = useState("");
  const [suspectAddress, setSuspectAddress] = useState("");
  const [suspectStatement] = useState("");

  const handleSaveChanges = () => {
    updateViewCaseStatus(caseId, status);
    navigate("/view-cases");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <OfficerHeader />

      <div className="flex-1 flex items-center justify-center pt-16">
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center">
          <h1 className="text-3xl font-bold text-blue-300 mb-4">
            Update Case
          </h1>
          <p className="text-gray-600 text-lg">
            Modify case details, update status, and manage ongoing investigations.
          </p>
        </div>
      </div>

    </div>
  );
}
