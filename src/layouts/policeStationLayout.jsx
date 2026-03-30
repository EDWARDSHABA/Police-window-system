import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function StationLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* HEADER */}
      <div className="bg-blue-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">POLICE STATION SYSTEM</h1>

        <div className="space-x-4">
          <button onClick={() => navigate("/station-dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/create-officer")}>Create Officer</button>
          <button onClick={() => navigate("/assign-duty")}>Assign Duty</button>
          <button onClick={() => navigate("/manage-officers")}>Manage Officers</button>
          <button onClick={() => navigate("/track-cases")}>Track Cases</button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6 w-full">
        <Outlet />
      </div>

    </div>
  );
}