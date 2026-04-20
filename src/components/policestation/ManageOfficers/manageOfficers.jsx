import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StationHeader from "../Header/PoliceStationHeader";
import Footer from "../../officer/footer/footer";
import { getStoredOfficers, saveOfficers } from "../officersStorage";

export default function ManageOfficers() {
  const [search, setSearch] = useState("");
  const [officers, setOfficers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOfficerId, setSelectedOfficerId] = useState(null);
  const [animateModal, setAnimateModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const data = getStoredOfficers();
    setOfficers(data);
  }, []);

  const toggleStatus = (id) => {
    const updated = officers.map((officer) =>
      officer.id === id
        ? { ...officer, active: !officer.active }
        : officer
    );

    setOfficers(updated);
    saveOfficers(updated);
  };

  const confirmDelete = (id) => {
    setSelectedOfficerId(id);
    setShowModal(true);
    setTimeout(() => setAnimateModal(true), 10);
  };

  const closeModal = () => {
    setAnimateModal(false);
    setTimeout(() => {
      setShowModal(false);
      setSelectedOfficerId(null);
    }, 200);
  };

  const handleDeleteOfficer = () => {
    const updated = officers.filter(
      (officer) => officer.id !== selectedOfficerId
    );

    setOfficers(updated);
    saveOfficers(updated);
    closeModal();
  };

  const filteredOfficers = officers.filter((officer) =>
    officer.name.toLowerCase().includes(search.toLowerCase())
  );

  // 👉 Get selected officer object
  const selectedOfficer = officers.find(
    (o) => o.id === selectedOfficerId
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <StationHeader />

      <div className="flex-1 p-6 pt-24">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Officers Accounts
          </button>

          <button
            onClick={() => navigate("/create-officer")}
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            CREATE NEW OFFICER
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center border rounded px-2 bg-white">
            <input
              type="text"
              placeholder="Search Officer"
              className="p-2 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="text-sm text-gray-500">Search</span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded shadow p-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr className="text-left">
                <th className="p-2">Police ID</th>
                <th className="p-2">Officer</th>
                <th className="p-2">Activate/Deactivate</th>
                <th className="p-2">Rank</th>
                <th className="p-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredOfficers.map((officer) => (
                <tr key={officer.id} className="border-b">
                  <td className="p-2">{officer.id}</td>
                  <td className="p-2">{officer.name}</td>

                  <td className="p-2">
                    <div
                      onClick={() => toggleStatus(officer.id)}
                      className={`w-12 h-3 rounded-full cursor-pointer ${
                        officer.active ? "bg-red-500" : "bg-gray-300"
                      }`}
                    />
                  </td>

                  <td className="p-2">{officer.rank}</td>

                  <td className="p-2 flex justify-center gap-3">
                    <button
                      onClick={() =>
                        navigate(`/edit-officer/${officer.id}`)
                      }
                      className="text-blue-500"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => confirmDelete(officer.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
            animateModal
              ? "opacity-100 backdrop-blur-sm bg-black/40"
              : "opacity-0 bg-black/0"
          }`}
        >
          <div
            className={`bg-white rounded-2xl shadow-2xl p-6 w-[340px] text-center transform transition-all duration-300 ${
              animateModal
                ? "scale-100 translate-y-0 opacity-100"
                : "scale-90 translate-y-6 opacity-0"
            }`}
          >
            <div className="text-red-500 text-3xl mb-2">⚠️</div>

            <h2 className="text-lg font-semibold mb-2">
              Delete Officer?
            </h2>

            {/* 👉 DYNAMIC NAME HERE */}
            <p className="text-gray-600 text-sm mb-6">
              {selectedOfficer ? (
                <>
                  You are about to delete{" "}
                  <span className="font-semibold text-gray-800">
                    {selectedOfficer.name}
                  </span>
                  . This action cannot be undone.
                </>
              ) : (
                "This action cannot be undone."
              )}
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteOfficer}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
