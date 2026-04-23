import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/logo.jpeg";
import notificationIcon from "../../../assets/icons/notification.png";
import profileIcon from "../../../assets/icons/profile.png";

export default function Header() {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setProfileMenuOpen(false);
    window.location.href = "/login";
  };

  const handleProfileClick = () => {
    setProfileMenuOpen((open) => !open);
  };

  const handleViewProfile = () => {
    setProfileMenuOpen(false);
    navigate("/profile");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-yellow-700 text-white shadow-md z-50">

      {/* MAIN HEADER */}
      <div className="h-16 flex justify-between items-center px-6">

        {/* LOGO + TITLE */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Police Logo"
            className="h-12 w-auto object-contain"
          />

          <h2 className="text-xl font-bold tracking-wide">
            POLICE WINDOW SYSTEM
          </h2>
        </div>

        {/* NAVIGATION */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">

          <button onClick={() => navigate("/officer-dashboard")} className="hover:underline">
            Dashboard
          </button>

          <button onClick={() => navigate("/register-case")} className="hover:underline">
            Register Case
          </button>

          <button onClick={() => navigate("/update-case")} className="hover:underline">
            Case Update
          </button>

          <button onClick={() => navigate("/view-cases")} className="hover:underline">
            View Cases
          </button>

          <button onClick={() => navigate("/create-statement")} className="hover:underline">
            Rules Policies
          </button>

          <span className="hover:underline cursor-pointer">
            Help
          </span>

        </nav>

        
                {/* ICONS */}
                <div className="flex items-center gap-4">

                  <img
                    src={notificationIcon}
                    alt="Notifications"
                    onClick={() => navigate("/notifications")}
                    className="h-7 w-7 cursor-pointer hover:scale-110 transition"
                  />

                  <div className="relative">
                    <button
                      type="button"
                      onClick={handleProfileClick}
                      className="h-9 w-9 rounded-full overflow-hidden border border-white/20 bg-white/10 flex items-center justify-center cursor-pointer hover:scale-110 transition"
                    >
                      <img
                        src={profileIcon}
                        alt="Profile"
                        className="h-6 w-6"
                      />
                    </button>

                    {profileMenuOpen && (
                      <div className="absolute right-0 mt-2 w-40 rounded-xl border border-slate-200 bg-white text-slate-900 shadow-xl z-50">
                        <button
                          type="button"
                          onClick={handleViewProfile}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
                        >
                          Profile
                        </button>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-slate-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>

                </div>

              </div>
    </header>
  );
}