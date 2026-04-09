import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import logo from "../../../assets/logo/logo.jpeg";
import notificationIcon from "../../../assets/icons/notification.png";
import profileIcon from "../../../assets/icons/profile.png";

export default function HeadquartersHeader() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  // Close menu when clicking outside
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
      <div className="h-16 flex items-center w-full px-0">

<<<<<<< HEAD
      {/* MAIN HEADER */}
      <div className="h-16 flex justify-between items-center px-6">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-auto object-contain"
          />
          <h2 className="text-lg font-bold">POLICE WINDOW - HEADQUARTERS SYSTEM</h2>
=======
        {/* Logo */}
        <div className="flex items-center gap-3 pl-0">
          <div className="bg-white px-4 py-2 shadow-sm ml-0">
            <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
          </div>
          <h2 className="text-lg font-bold">HEADQUARTERS SYSTEM</h2>
>>>>>>> 043a3c7422a43d5dbabc304d479a3da27c976f7e
        </div>

        {/* Nav */}
        <nav className="flex gap-20 text-sm font-medium ml-20">
          <button onClick={() => navigate("/headquarters")} className="hover:underline">
            Dashboard
          </button>

<<<<<<< HEAD
          <button onClick={() => navigate("/headquarters/police-stations")} className="hover:underline">
            Manage Stations
          </button>

          <button onClick={() => navigate("/statistics")} className="hover:underline">
            Statistics
=======
          <button onClick={() => navigate("/police-stations")} className="hover:underline">
            Police Stations
>>>>>>> 043a3c7422a43d5dbabc304d479a3da27c976f7e
          </button>

          <button onClick={() => navigate("/manage-accounts")} className="hover:underline">
            Manage Accounts
          </button>
          
          <button onClick={() => navigate("/about")} className="hover:underline">
            About Us
          </button>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4 ml-auto pr-6 relative" ref={menuRef}>

          {/* Notifications */}
          <img
            src={notificationIcon}
            alt="Notifications"
            onClick={() => navigate("/notifications")}
            className="h-7 w-7 cursor-pointer hover:scale-110 transition"
          />

          {/* Profile Icon */}
          <img
            src={profileIcon}
            alt="Profile"
            onClick={() => setShowMenu(!showMenu)}
            className="h-9 w-9 cursor-pointer hover:scale-110 transition"
          />
          {showMenu && (
            <div className="absolute right-0 top-12 w-40 bg-white text-gray-800 rounded-md shadow-lg py-2 z-50">
              
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

      <div className="h-1 w-full bg-blue-500"></div>
    </header>
  );
}