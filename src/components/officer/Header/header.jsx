import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/logo.jpeg";

export default function OfficerHeader() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-yellow-600 text-white flex justify-between items-center px-6 z-50 shadow-md">
      
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="h-12 w-16 p-0 object-contain" />
        <h2 className="text-lg font-bold">POLICE WINDOW SYSTEM</h2>
      </div>

      <div className="flex gap-4 text-sm">
        <button onClick={() => navigate("/officer-dashboard")} className="hover:underline">Dashboard</button>
        <button onClick={() => navigate("/register-case")} className="hover:underline">Register</button>
        <button onClick={() => navigate("/update-case")} className="hover:underline">Update</button>
        <button onClick={() => navigate("/create-statement")} className="hover:underline">Assign</button>
        <button onClick={() => navigate("/view-cases")} className="hover:underline">Stats</button>
      </div>

    </header>
  );
}