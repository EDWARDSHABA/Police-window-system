import React, { useState } from 'react';

const DISTRICTS = ["Blantyre", "Zomba", "Lilongwe", "Mzuzu", "Kasungu", "Mangochi"];
const REGIONS = ["Southern", "Central", "Northern"];

export default function EditPoliceStation() {
  const [station, setStation] = useState({
    name: "Central Police Station",
    district: "Blantyre",
    region: "Southern",
    stationId: "STN-20241031",
  });

  const [admin, setAdmin] = useState({
    adminName: "John Banda",
    batchNumber: "BT-2023-007",
    stationAssigned: "Central Police Station",
    adminId: "ADM-00142",
    phone: "+265 999 000 111",
    email: "j.banda@malawipolice.gov.mw",
    address: "P.O. Box 101, Blantyre",
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    console.log("Saving:", { station, admin });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top spacing to push card down */}
      <div className="pt-6"></div>

      {/* Full Width Warning Card */}
      <div className="w-full bg-gradient-to-r from-blue-300 to-blue-300 shadow-md border-l-4 border-yellow-400">
        <div className="max-w-3xl mx-auto px-4 py-2.5">
          <p className="text-white text-sm font-medium text-left">
           Make sure every edit you do here are accepted by the Malawi Police  Policies, Rules and regulations and are supported from the above.
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-sm font-medium text-gray-800 mb-2 mt-1">
          Edit Police Station Information/Details
        </h1>

        <div className="bg-white border border-gray-200 rounded-lg p-3">
          {/* Station Name */}
          <div className="mb-2">
            <label className="block text-[11px] text-gray-700 mb-0.5">Police Station Name</label>
            <input
              type="text"
              className="w-full h-7 px-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-yellow-500"
              value={station.name}
              onChange={(e) => setStation({ ...station, name: e.target.value })}
            />
          </div>

          {/* District */}
          <div className="mb-2">
            <label className="block text-[11px] text-gray-700 mb-0.5">District</label>
            <select
              className="w-full h-7 px-2 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
              value={station.district}
              onChange={(e) => setStation({ ...station, district: e.target.value })}
            >
              <option value="">-- Select District --</option>
              {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* Region */}
          <div className="mb-2">
            <label className="block text-[11px] text-gray-700 mb-0.5">Region</label>
            <select
              className="w-full h-7 px-2 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
              value={station.region}
              onChange={(e) => setStation({ ...station, region: e.target.value })}
            >
              <option value="">-- Select Region --</option>
              {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {/* Station ID (auto-generated) */}
          <div className="mb-3">
            <label className="block text-[11px] text-gray-700 mb-0.5">Station ID</label>
            <input
              type="text"
              className="w-full h-7 px-2 border border-gray-200 rounded text-xs bg-gray-100 text-gray-400 cursor-not-allowed"
              value={station.stationId}
              disabled
            />
            <p className="text-[9px] text-gray-400 mt-0.5">auto generated</p>
          </div>

          {/* Admin Section */}
          <div className="bg-[#8B7536] rounded-lg p-2.5">
            <h2 className="text-white text-[11px] font-medium mb-2">Edit Police Station Admin</h2>

            <div className="grid grid-cols-2 gap-3">
              {/* Left column */}
              <div className="space-y-1.5">
                {[
                  { label: "Admin Name", key: "adminName", type: "text", placeholder: "Full name" },
                  { label: "Batch Number", key: "batchNumber", type: "text", placeholder: "Batch number" },
                  { label: "Police Station Assigned", key: "stationAssigned", type: "text", placeholder: "Station name" },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-[9px] text-yellow-200 mb-0.5">{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      className="w-full h-6 px-2 rounded text-xs text-white bg-white/15 border border-white/25 placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                      value={admin[key]}
                      onChange={(e) => setAdmin({ ...admin, [key]: e.target.value })}
                    />
                  </div>
                ))}

                {/* Admin ID (auto-generated) */}
                <div>
                  <label className="block text-[9px] text-yellow-200 mb-0.5">Admin ID</label>
                  <input
                    type="text"
                    className="w-full h-6 px-2 rounded text-xs text-white/50 bg-black/20 border border-white/15 cursor-not-allowed"
                    value={admin.adminId}
                    disabled
                  />
                  <p className="text-[8px] text-yellow-200/50 mt-0.5">auto generated</p>
                </div>
              </div>

              {/* Right column — Contact Details */}
              <div className="bg-white/10 border border-white/20 rounded-lg p-2">
                <p className="text-[9px] text-yellow-200 mb-1.5">Contact Details</p>
                <div className="space-y-1.5">
                  {[
                    { key: "phone", type: "tel", placeholder: "Phone number" },
                    { key: "email", type: "email", placeholder: "Email address" },
                    { key: "address", type: "text", placeholder: "Address" },
                  ].map(({ key, type, placeholder }) => (
                    <input
                      key={key}
                      type={type}
                      placeholder={placeholder}
                      className="w-full h-6 px-2 rounded text-xs text-white bg-white/15 border border-white/25 placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                      value={admin[key]}
                      onChange={(e) => setAdmin({ ...admin, [key]: e.target.value })}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-2.5">
            <button
              className="h-7 px-3 text-xs rounded border border-gray-300 text-gray-600 bg-gray-50 hover:bg-gray-100"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              className="h-7 px-3 text-xs rounded bg-[#8B7536] text-white hover:bg-[#7a6530]"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>

          {saved && (
            <p className="text-right text-[10px] text-green-600 mt-1.5">Changes saved successfully!</p>
          )}
        </div>
      </div>
    </div>
  );
}