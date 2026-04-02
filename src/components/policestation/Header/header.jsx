import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/logo.jpeg";

import notificationIcon from "../../../assets/icons/notification.png";
import profileIcon from "../../../assets/icons/profile.png";

export default function StationHeader() {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full h-16 bg-gray-600 text-white flex justify-between items-center px-6 z-50 shadow-md">

      {/* logo */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Logo"
          className="h-12 w-24 object-contain"
        />
        <h2 className="text-lg font-bold">POLICE STATION SYSTEM</h2>
      </div>

      {/* nav links */}
      <div className="flex gap-10">
        <button onClick={() => navigate("/dashboard")} className="hover:underline">
          Dashboard
        </button>

        <button onClick={() => navigate("/officers")} className="hover:underline">
          Officers
        </button>

        <button onClick={() => navigate("/assign-duties")} className="hover:underline">
          Duties
        </button>

        <button onClick={() => navigate("/track-cases")} className="hover:underline">
          Cases
        </button>

        <button onClick={() => navigate("/statistics")} className="hover:underline">
          Statistics
        </button>
      </div>

      {/* RIGHT - ICONS */}
      <div className="flex items-center gap-4">

        {/* Notifications */}
        <img
          src={notificationIcon}
          alt="Notifications"
          onClick={() => navigate("/notifications")}
          className="h-8 w-8 cursor-pointer hover:scale-110 transition"
        />

        {/* Profile */}
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