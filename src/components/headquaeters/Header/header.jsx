import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/logo.jpeg";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full h-16 bg-yellow-600 text-white flex justify-between items-center px-6 z-50 shadow-md">
      
    <div className="flex items-center gap-3">
    <img src={logo} alt="Logo" className="h-14 w-30 m-0 object-contain" />
    <h2 className="text-lg font-bold">HEADQUARTERS SYSTEM</h2>
    </div>

      <div className="space-x-4">
        <button onClick={() => navigate("/headquarters")} className="hover:underline">
          Dashboard
        </button>
        <button onClick={() => navigate("/police-stations")} className="hover:underline">
          Stations
        </button>
        <button onClick={() => navigate("/manage-accounts")} className="hover:underline">
          Accounts
        </button>
        <button onClick={() => navigate("/create-admin")} className="hover:underline">
          Create Admin
        </button>
      </div>
    </div>
  );
}