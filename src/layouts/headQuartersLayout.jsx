import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function HeadQuarterLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* HEADER */}
      <div className="bg-green-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">HEADQUARTERS SYSTEM</h1>

        <div className="space-x-4">
          <button onClick={() => navigate("/headquarters")}>Dashboard</button>
          <button onClick={() => navigate("/create-station")}>Stations</button>
          <button onClick={() => navigate("/manage-accounts")}>Accounts</button>
          <button onClick={() => navigate("/create-admin")}>Create Admin</button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6 w-full">
        <Outlet />
      </div>

    </div>
  );
}