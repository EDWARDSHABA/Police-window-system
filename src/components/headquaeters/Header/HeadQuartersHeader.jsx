import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import logo from "../../../assets/logo/logo.jpeg";
import notificationIcon from "../../../assets/icons/notification.png";
import profileIcon from "../../../assets/icons/profile.png";

export default function HeadquartersHeader() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-yellow-700 text-white shadow-md z-50">
      
      {/* MAIN HEADER */}
      <div className="h-16 flex items-center justify-between px-6 w-full">

        {/* LEFT: LOGO */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-auto object-contain"
          />
          <h2 className="text-lg font-bold whitespace-nowrap">
            POLICE WINDOW - HEADQUARTERS SYSTEM
          </h2>
        </div>

        {/* CENTER: NAV */}
        <nav className="flex gap-10 text-sm font-medium mx-10 flex-1 justify-center">
          <button onClick={() => navigate("/headquarters")} className="hover:underline">
            Dashboard
          </button>

          <button onClick={() => navigate("/headquarters/police-stations")} className="hover:underline">
            Stations
          </button>

           <button onClick={() => navigate("/manage-accounts")} className="hover:underline">
            Manage Accounts
          </button>

          <button onClick={() => navigate("/about")} className="hover:underline">
            About Us
          </button>
        </nav>

        {/* RIGHT: ICONS */}
        <div className="flex items-center gap-6 relative" ref={menuRef}>

          {/* Notifications */}
          <img
            src={notificationIcon}
            alt="Notifications"
            onClick={() => navigate("/notifications")}
            className="h-7 w-7 cursor-pointer hover:scale-110 transition"
          />

          {/* Profile */}
          <img
            src={profileIcon}
            alt="Profile"
            onClick={() => setShowMenu(!showMenu)}
            className="h-9 w-9 cursor-pointer hover:scale-110 transition"
          />

          {/* Dropdown */}
          {showMenu && (
            <div className="absolute right-0 top-14 w-44 bg-white text-gray-800 rounded-md shadow-lg py-2 z-50">
              
              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate("/profile");
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </button>

              <button
                onClick={() => {
                  setShowMenu(false);
                  localStorage.removeItem("authToken");
                  navigate("/signin");
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
              >
                Logout
              </button>

            </div>
          )}
        </div>

      </div>

      {/* Bottom line */}
      <div className="h-1 w-full bg-blue-500"></div>
    </header>
  );
}