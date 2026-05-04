import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/logo.jpeg";
import notificationIcon from "../../../assets/icons/notification.png";
import profileIcon from "../../../assets/icons/profile.png";

export default function StationHeader({ pageTitle = "" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (section) => {
    if (section === "dashboard") return pathname === "/dashboard";
    if (section === "officers") {
      return pathname === "/manage-officers" || pathname === "/create-officer" || pathname.startsWith("/edit-officer/");
    }
    if (section === "duties") return pathname === "/assign-duties" || pathname === "/assign-duties/new";
    if (section === "view-duties") return pathname === "/view-duties";
    if (section === "cases") return pathname === "/track-cases";
    return false;
  };

  const navClassName = (section) =>
    `underline-offset-8 transition hover:underline ${isActive(section) ? "underline decoration-2" : ""}`;

  return (
    <header className="fixed top-0 left-0 w-full bg-yellow-700 text-white shadow-md z-50">

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

          <button onClick={() => navigate("/dashboard")} className={navClassName("dashboard")}>
            Dashboard
          </button>

          <button onClick={() => navigate("/manage-officers")} className={navClassName("officers")}>
            Officers
          </button>

          <button onClick={() => navigate("/assign-duties")} className={navClassName("duties")}>
            Duties
          </button>

          <button onClick={() => navigate("/view-duties")} className={navClassName("view-duties")}>
            View Duties
          </button>

          <button onClick={() => navigate("/track-cases")} className={navClassName("cases")}>
            Cases
          </button>
           

          {/*<button onClick={() => navigate("/about")} className="hover:underline">
            About Us
          </button>
          */}

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

      {pageTitle ? (
        <div className="border-t border-yellow-600/40 bg-yellow-800/95 px-6 py-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em]">
            {pageTitle}
          </p>
        </div>
      ) : null}

    </header>
  );
}
