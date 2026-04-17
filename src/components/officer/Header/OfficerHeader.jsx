import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/logo.jpeg";
import notificationIcon from "../../../assets/icons/notification.png";
import profileIcon from "../../../assets/icons/profile.png";

export default function Header() {
  const navigate = useNavigate();

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
            Statement
          </button>

          <span className="hover:underline cursor-pointer">
            Statistics
          </span>

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
        
                  <img
                    src={profileIcon}
                    alt="Profile"
                    onClick={() => navigate("/profile")}
                    className="h-9 w-9 cursor-pointer hover:scale-110 transition"
                  />
        
                </div>
        
              </div>
    </header>
  );
}