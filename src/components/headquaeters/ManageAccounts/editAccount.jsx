import React, { useState } from 'react';
import Footer from '../../officer/footer/footer';

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
    <div className="min-h-screen bg-gray-100 overflow-y-auto p-4">

      {/* Warning Card */}
      <div className="bg-blue-300 text-white p-4 rounded-md mb-4 mt-7 shadow">
        <p className="text-sm">
          You can edit Police stations Admin Details make sure You are sure of this Action
        </p>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col">
        <h1 className="text-sm font-medium text-gray-800 mb-2">
          Edit Police Station Information/Details
        </h1>

        <div className="bg-white border border-gray-200 rounded-lg p-3">

          {/* Station Name */}
          <div className="mb-2">
            <label className="block text-[11px] text-gray-700 mb-0.5">Police Station Name</label>
            <input
              type="text"
              className="w-full h-7 px-2 border border-gray-300 rounded text-xs"
              value={station.name}
              onChange={(e) => setStation({ ...station, name: e.target.value })}
            />
          </div>

          {/* District */}
          <div className="mb-2">
            <label className="block text-[11px] text-gray-700 mb-0.5">District</label>
            <select
              className="w-full h-7 px-2 border border-gray-300 rounded text-xs bg-white"
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
              className="w-full h-7 px-2 border border-gray-300 rounded text-xs bg-white"
              value={station.region}
              onChange={(e) => setStation({ ...station, region: e.target.value })}
            >
              <option value="">-- Select Region --</option>
              {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {/* Station ID */}
          <div className="mb-3">
            <label className="block text-[11px] text-gray-700 mb-0.5">Station ID</label>
            <input
              type="text"
              className="w-full h-7 px-2 border border-gray-200 rounded text-xs bg-gray-100 text-gray-400"
              value={station.stationId}
              disabled
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="h-7 px-3 text-xs rounded border border-gray-300"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              className="h-7 px-3 text-xs rounded bg-blue-600 text-white"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>

          {saved && (
            <p className="text-right text-[10px] text-green-600 mt-2">
              Changes saved successfully!
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}