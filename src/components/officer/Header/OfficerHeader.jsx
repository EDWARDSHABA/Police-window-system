import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/logo.jpeg";
import notificationIcon from "../../../assets/icons/notification.png";
import profileIcon from "../../../assets/icons/profile.png";

export default function Header() {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

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

  const handleUpdateCase = () => {
    navigate("/update-case");
  };

  const handleHelp = () => {
    navigate("/officer-help");
  };

  const isActive = (section) => {
    if (section === "dashboard") return pathname === "/officer-dashboard";
    if (section === "register") return pathname === "/register-case";
    if (section === "update") return pathname === "/update-case" || pathname.startsWith("/update-case/");
    if (section === "view") return pathname === "/view-cases" || pathname.startsWith("/view-case/");
    if (section === "duties") {
      return (
        pathname === "/officer-duties" ||
        pathname === "/duties" ||
        pathname === "/duty-assignment" ||
        pathname === "/duty-assignments"
      );
    }
    if (section === "help") {
      return pathname === "/officer-help" || pathname === "/help" || pathname === "/create-statement" || pathname === "/createStatement";
    }
    return false;
  };

  const navClassName = (section) =>
    `underline-offset-8 transition hover:underline ${isActive(section) ? "underline decoration-2" : ""}`;

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

          <button type="button" onClick={() => navigate("/officer-dashboard")} className={navClassName("dashboard")}>
            Dashboard
          </button>

          <button type="button" onClick={() => navigate("/register-case")} className={navClassName("register")}>
            Register Case
          </button>

          <button type="button" onClick={handleUpdateCase} className={navClassName("update")}>
            Case Update
          </button>

          <button type="button" onClick={() => navigate("/view-cases")} className={navClassName("view")}>
            View Cases
          </button>

          <button type="button" onClick={() => navigate("/officer-duties")} className={navClassName("duties")}>
            Duties
          </button>

          <button type="button" onClick={handleHelp} className={`${navClassName("help")} cursor-pointer`}>
            Help
          </button>

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
