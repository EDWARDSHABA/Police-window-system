import React from "react";
import OfficerHeader from "../Header/header";
import Footer from "../footer/footer";

export default function ViewCases() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <OfficerHeader />

      <div className="flex-1 flex items-center justify-center pt-16">
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center">
          <h1 className="text-3xl font-bold text-teal-700 mb-4">
            View Cases
          </h1>
          <p className="text-gray-600 text-lg">
            Browse and review all registered cases in the system.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}