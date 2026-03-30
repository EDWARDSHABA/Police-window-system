import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      
      {/* Title */}
      <h1 className="text-4xl font-bold mb-10 text-gray-800">
        POLICE WINDOW SYSTEM
      </h1>

      {/* Cards / Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-10/12">
        
        {/* Headquarters */}
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            Headquarters
          </h2>
          <p className="text-gray-600 mb-6">
            Manage stations, admins, and system-wide operations.
          </p>
          <button
            onClick={() => navigate("/headquarters")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg"
          >
            Go to Dashboard
          </button>
        </div>

        {/* Police Station */}
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Police Station
          </h2>
          <p className="text-gray-600 mb-6">
            Manage officers, duties, and station operations.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Go to Dashboard
          </button>
        </div>

        {/* Police Officer */}
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-700">
            Police Officer
          </h2>
          <p className="text-gray-600 mb-6">
            Handle cases, statements, and daily assignments.
          </p>
          <button
            onClick={() => navigate("/officer-dashboard")}
            className="bg-yellow-600 text-white px-6 py-2 rounded-lg"
          >
            Go to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}