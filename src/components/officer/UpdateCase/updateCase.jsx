import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getStoredViewCases, updateViewCaseStatus } from "../Data/viewCasesData";
// FIXED: Changed 'Header' to 'OfficerHeader' to match the usage below
import OfficerHeader from "../Header/OfficerHeader"; 
import Footer from "../footer/footer";

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

  // State declarations
  const [caseId] = useState(selectedCase?.id ?? "MW-ZA-015-04-26");
  const [complainant] = useState(selectedCase?.name ?? "");
  const [suspect, setSuspect] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [assignedOfficer] = useState(selectedCase?.officer ?? "Sgt. Leoleo");
  const [status, setStatus] = useState(selectedCase?.status ?? "Under investigation");
  
  // Victim & Suspect details
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
      {/* This now works because the import name matches */}
      <OfficerHeader />

      <div className="flex-1 flex items-center justify-center pt-16">
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-2xl">
          <h1 className="text-3xl font-bold text-blue-500 mb-4">
            Update Case: {caseId}
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Modify case details for <strong>{complainant}</strong>, update status, and manage ongoing investigations.
          </p>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Update Status:</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="Under investigation">Under investigation</option>
              <option value="Closed">Closed</option>
              <option value="Pending">Pending</option>
              <option value="Court Case">Court Case</option>
            </select>
          </div>

          <button 
            onClick={handleSaveChanges}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
