import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function OfficerLayout() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col bg-gray-100">

      {/* ✅ FIXED HEADER */}
      <header className="fixed top-0 left-0 w-full h-16 bg-yellow-800 text-white flex justify-between items-center px-6 z-50">
        <h1 className="text-xl font-bold">POLICE WINDOW SYSTEM</h1>

        <div className="space-x-6">
          <button onClick={() => navigate("/officer-dashboard")} className="hover:underline">Dashboard</button>
          <button onClick={() => navigate("/register-case")} className="hover:underline">Register Case</button>
          <button onClick={() => navigate("/update-case")} className="hover:underline">Case Update</button>
          <button onClick={() => navigate("/create-statement")} className="hover:underline">Duty Assignment</button>
          <button onClick={() => navigate("/view-cases")} className="hover:underline">Statistics</button>
        </div>
      </header>

      {/* ✅ FULL SCREEN CONTENT */}
      <main className="flex-1 pt-16 flex flex-col overflow-hidden">

        {/* FULL WIDTH */}
        <div className="flex-1 overflow-y-auto w-full">

          {/* INNER SPACING */}
          <div className="px-6 py-6 w-full h-full flex flex-col">
            <Outlet />
          </div>

        </div>
      </main>
    </div>
  );
}