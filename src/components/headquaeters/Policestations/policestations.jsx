import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/HeadQuartersHeader";
import Footer from "../Footer/footer";

const Policestations = () => {
  const [stations, setStations] = useState([
    {
      policeStationId: "MW-ZA-23-498-24",
      stationName: "Chinamseak Police Station",
      adminName: "Sgt. Victor Max",
      lastLogin: "2 hrs ago",
    },
    {
      policeStationId: "MW-ZA-23-768-24",
      stationName: "6 miles Police Station",
      adminName: "Sgt. Shalion Hilo",
      lastLogin: "Active",
    },
    {
      policeStationId: "MW-ZA-23-495-25",
      stationName: "Chikanda Police Station",
      adminName: "Sgt. Victor Max",
      lastLogin: "3 hrs ago",
    },
    {
      policeStationId: "MW-ZA-23-112-25",
      stationName: "Mafiawalo Police Station",
      adminName: "Sgt. Edward Shawa",
      lastLogin: "2 min ago",
    },
    {
      policeStationId: "MW-ZA-23-498-25",
      stationName: "Domasi Police Station",
      adminName: "Sgt. Victor Max",
      lastLogin: "Active",
    },
    {
      policeStationId: "MW-ZA-23-221-26",
      stationName: "Namaddi Police Station",
      adminName: "Sgt. Samei Chisale",
      lastLogin: "Active",
    },
    {
      policeStationId: "MW-ZA-23-498-24",
      stationName: "Mkubatamayo Police Station",
      adminName: "Sgt. Martha Sawa",
      lastLogin: "Active",
    },
    {
      policeStationId: "MW-ZA-23-598-24",
      stationName: "Namaddi 2 Police Station",
      adminName: "Sgt. Victor Max",
      lastLogin: "2 min ago",
    },
    {
      policeStationId: "MW-ZA-23-198-24",
      stationName: "2 miles Police Station",
      adminName: "Sgt. Kevin Max",
      lastLogin: "2 min ago",
    },
    {
      policeStationId: "MW-ZA-23-6-24",
      stationName: "Nelozi Police Station",
      adminName: "Sgt. Dakot Howa",
      lastLogin: "Active",
    },
    {
      policeStationId: "MW-ZA-23-78-24",
      stationName: "Chinamseak Police Station",
      adminName: "Sgt. Victor Max",
      lastLogin: "1 min ago",
    },
    {
      policeStationId: "MW-ZA-23-090-24",
      stationName: "6 miles Police Station",
      adminName: "Sgt. Shalion Hilo",
      lastLogin: "Active",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const fetchStations = async () => {
    try {
      // API later
    } catch (err) {
      setError("Error fetching police stations: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  const filteredStations = stations.filter(
    (station) =>
      station.stationName.toLowerCase().includes(searchInput.toLowerCase()) ||
      station.adminName.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleCreateNewStation = () => {
    navigate("/headquarters/create-police-station");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <div className="flex-1 overflow-y-auto p-6 mt-16">
        <div className="bg-blue-300 text-white p-4 rounded-md mb-4 shadow">
          <p className="text-sm">
            You can View The List Of Police stations and Create New Police Station
          </p>
        </div>

        <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow">
          {/* Search + Button */}
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search by police, admin"
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full md:w-64 p-2 border border-gray-300 rounded"
            />

            <button
              onClick={handleCreateNewStation}
              className="ml-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
            >
              Create New Station
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="px-4 py-3 text-left">Police ID</th>
                  <th className="px-4 py-3 text-left">Police Name</th>
                  <th className="px-4 py-3 text-left">Police Admin</th>
                  <th className="px-4 py-3 text-left">Last Login</th>
                </tr>
              </thead>

              <tbody>
                {filteredStations.length > 0 ? (
                  filteredStations.map((station, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">
                        {station.policeStationId}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {station.stationName}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {station.adminName}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {station.lastLogin}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-red-600">
                      Not Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Policestations;