import React from "react";
import Footer from "../../officer/footer/footer";
import Header from "../Header/OfficerHeader";
import {
  Download,
  FileText,
  Shield,
  BookOpen,
  Scale,
  Users,
  AlertTriangle,
} from "lucide-react";

export default function RulesPolicies() {
  const documents = [
    {
      name: "Malawi Police Act - Main Legal Framework (2025 - 2026)",
      icon: <Scale size={18} />,
    },
    {
      name: "Constitutional Principles (Supreme Rules)",
      icon: <BookOpen size={18} />,
    },
    {
      name: "Code of Conduct (Disciplinary Rules)",
      icon: <Users size={18} />,
    },
    {
      name: "Use of Force Policy",
      icon: <Shield size={18} />,
    },
    {
      name: "Public Order Management Policy",
      icon: <AlertTriangle size={18} />,
    },
    {
      name: "Community Policing Policy",
      icon: <FileText size={18} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Header />

      {/* CENTERED CONTAINER */}
      <div className="max-w-4xl mx-auto px-4">

        {/* HEADER NOTE */}
        <div className="bg-blue-300 mt-14 text-white px-6 py-3 rounded-lg shadow mb-6 text-center">
          Ignorance of the rules is not an excuse for non-compliance.
        </div>

        {/* PAGE TITLE */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Rules & Policies
        </h1>

        {/* CARD */}
        <div className="bg-white rounded-xl shadow p-6">

          {/* TABLE HEADER */}
          <div className="grid grid-cols-[auto_1fr_auto] items-center font-semibold text-gray-600 border-b pb-3 mb-4">
            <div className="w-8">#</div>
            <div>Document Name</div>
            <div className="text-right">Action</div>
          </div>

          {/* DOCUMENT LIST */}
          <div className="space-y-2">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="grid grid-cols-[auto_1fr_auto] items-center p-3 rounded-lg hover:bg-gray-50 transition"
              >
                {/* NUMBER */}
                <div className="w-8 text-gray-500 font-medium">
                  {index + 1}
                </div>

                {/* NAME */}
                <div className="flex items-center gap-2 text-gray-700">
                  {doc.icon}
                  <span>{doc.name}</span>
                </div>

                {/* ACTION */}
                <div className="flex justify-end">
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition">
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-6 text-center text-sm text-gray-600 italic">
          “All personnel are expected to know and adhere to the rules; ignorance shall not be accepted as justification for any violation.”
        </div>

      </div>

      <Footer />
    </div>
  );
}