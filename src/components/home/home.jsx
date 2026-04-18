import { useState } from "react";
import SignIn from "../authentication/signIn";
import bgImage from "../../assets/images/car.jpg";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay (light, NOT fading) */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Header*/}
      <header className="relative z-10 flex justify-between items-center px-10 py-5 bg-yellow-700 text-white shadow-lg">
        <h1 className="text-2xl font-bold tracking-wide">
          POLICE WINDOW SYSTEM
        </h1>
      </header>

      <div className="relative z-10 flex flex-1 items-center justify-center text-white text-center px-6">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Welcome to the Police Window System
          </h2>

          <p className="mb-6 text-lg opacity-90">
            Manage police operations, stations, and reports efficiently
            through a centralized smart system.
          </p>

          <button
            onClick={() => setShowLogin(true)}
            className="bg-yellow-700 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition"
          >
            Get Started
          </button>
        </div>
      </div>

      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          
          {/* Simple dark overlay ONLY (no blur) */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowLogin(false)}
          ></div>

          {/* Modal */}
          <div className="relative z-10">
            
            {/* Close Button */}
            <button
              onClick={() => setShowLogin(false)}
              className="absolute -top-4 -right-4 bg-red-600 hover:bg-red-700 text-white w-9 h-9 rounded-full shadow-lg"
            >
              ✕
            </button>

            <SignIn />
          </div>
        </div>
      )}
    </div>
  );
}