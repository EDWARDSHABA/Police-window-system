import { useNavigate } from "react-router-dom";
import bgImage from "../assets/images/car.jpg";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/90"></div>

      {/* content */}
      <div className="relative z-10 text-center px-6">

        {/* title*/}
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
          Police Window System
        </h1>

        <p className="text-gray-400 mb-14 text-lg">
          Secure • Manage • Monitor Law Enforcement Operations
        </p>

        {/* text buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">

          <button
            onClick={() => navigate("/headquarters")}
            className="text-2xl md:text-3xl font-semibold 
            text-white/70 hover:text-white 
            transition duration-300 relative
            after:block after:h-[2px] after:w-0 after:bg-white/70 
            after:transition-all after:duration-300 hover:after:w-full"
          >
            Headquarters
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="text-2xl md:text-3xl font-semibold 
            text-white/70 hover:text-white 
            transition duration-300 relative
            after:block after:h-[2px] after:w-0 after:bg-white/70 
            after:transition-all after:duration-300 hover:after:w-full"
          >
            Police Station
          </button>

          <button
            onClick={() => navigate("/officer-dashboard")}
            className="text-2xl md:text-3xl font-semibold 
            text-white/70 hover:text-white 
            transition duration-300 relative
            after:block after:h-[2px] after:w-0 after:bg-white/70 
            after:transition-all after:duration-300 hover:after:w-full"
          >
            Police Officer
          </button>

        </div>
      </div>
    </div>
  );
}