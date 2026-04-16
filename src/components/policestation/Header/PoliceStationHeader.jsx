import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/logo.jpeg";
import notificationIcon from "../../../assets/icons/notification.png";
import profileIcon from "../../../assets/icons/profile.png";

export default function StationHeader() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full bg-[#574726] text-white shadow-md z-50">

      {/* MAIN HEADER */}
      <div className="h-16 flex justify-between items-center px-6">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Police Logo"
            className="h-12 w-auto object-contain"
          />
          <h2 className="text-lg font-bold">POLICE STATION SYSTEM</h2>
        </div>

        {/* NAV */}
        <nav className="flex gap-8 text-sm font-medium">

          <button onClick={() => navigate("/dashboard")} className="hover:underline">
            Dashboard
          </button>

          <button onClick={() => navigate("/manage-officers")} className="hover:underline">
            Officers
          </button>

          <button onClick={() => navigate("/assign-duties")} className="hover:underline">
            Duties
          </button>

          <button onClick={() => navigate("/track-cases")} className="hover:underline">
            Cases
          </button>
           

          <button onClick={() => navigate("/about")} className="hover:underline">
            About Us
          </button>

        </nav>

        <div className="flex items-center gap-4">

          <img
            src={notificationIcon}
            alt="Notifications"
            onClick={() => navigate("/notifications")}
            className="h-7 w-7 cursor-pointer hover:scale-110 transition"
          />

          <img
            src={profileIcon}
            alt="Profile"
            onClick={() => navigate("/profile")}
            className="h-9 w-9 cursor-pointer hover:scale-110 transition"
          />

        </div>

      </div>
      
      <div className="h-1 w-full bg-blue-500"></div>

    </header>
  );
}