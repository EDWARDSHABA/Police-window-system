import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/logo.jpeg";

import notificationIcon from "../../../assets/icons/notification.png";
import profileIcon from "../../../assets/icons/profile.png";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full h-15 bg-gray-600 text-white flex justify-between items-center px-6 z-50 shadow-md">

      
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="h-14 w-30 m-0 object-contain" />
        <h2 className="text-lg font-bold">HEADQUARTERS SYSTEM</h2>
      </div>

      
      <div className="space-x-15">
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

        <button onClick={() => navigate("/about")} className="hover:underline">
          About Us
        </button>
      </div>

      <div className="flex items-center gap-4">

        <img
          src={notificationIcon}
          alt="Notifications"
          onClick={() => navigate("/notifications")}
          className="h-8 w-8 cursor-pointer hover:scale-110 transition"
        />

        <img
          src={profileIcon}
          alt="Profile"
          onClick={() => navigate("/profile")}
          className="h-10 w-10 cursor-pointer hover:scale-110 transition"
        />

      </div>
    </div>
  );
}