// src/components/PoliceStationManage.js - "Manage Police Stations" at Top Left of Table
import React, { useState, useEffect } from 'react';

const PoliceStationManage = () => {
  const [stations, setStations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStation, setEditingStation] = useState(null);
  const [formData, setFormData] = useState({ id: '', name: '', admin: '' });
  const [notification, setNotification] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const storedStations = localStorage.getItem('policeStations');
    if (storedStations) {
      setStations(JSON.parse(storedStations));
    } else {
      const mockData = [
        { id: "MW-ZA-23-898-24", name: "Chinamwali Police Station", admin: "Sgt. Victor Max", lastLogin: new Date().toISOString(), status: "active", createdAt: "2024-01-15" },
        { id: "MW-ZA-23-768-24", name: "6 miles Police Station", admin: "Sgt. Shalom Hilo", lastLogin: new Date().toISOString(), status: "active", createdAt: "2024-02-20" },
        { id: "MW-ZA-23-895-25", name: "Chikanda Police Station", admin: "Sgt. Victor Max", lastLogin: new Date().toISOString(), status: "active", createdAt: "2024-03-10" },
        { id: "MW-ZA-23-112-25", name: "Matawale Police Station", admin: "Sgt. Edward Shawa", lastLogin: new Date().toISOString(), status: "active", createdAt: "2024-01-28" },
        { id: "MW-ZA-23-898-25", name: "Domasi Police Station", admin: "Sgt. Victor Max", lastLogin: new Date().toISOString(), status: "active", createdAt: "2024-04-05" },
        { id: "MW-ZA-23-221-26", name: "Namadzi Police Station", admin: "Sgt. Samuel Chisale", lastLogin: new Date().toISOString(), status: "active", createdAt: "2024-05-12" },
      ];
      setStations(mockData);
      localStorage.setItem('policeStations', JSON.stringify(mockData));
    }

    const storedLogs = localStorage.getItem('auditLogs');
    if (storedLogs) {
      setAuditLogs(JSON.parse(storedLogs));
    } else {
      const mockLogs = [
        { id: 1, action: "3 admins created 8 police officers accounts", admin: "System", details: "Bulk account creation approved", timestamp: new Date().toISOString(), location: "Zonal HQ" },
        { id: 2, action: "Admin Banda for Zomba police deleted officers account", admin: "Admin Banda", details: "Officer account deactivation due to transfer", timestamp: new Date(Date.now() - 86400000).toISOString(), location: "Zomba District" },
      ];
      setAuditLogs(mockLogs);
      localStorage.setItem('auditLogs', JSON.stringify(mockLogs));
    }
  };

  const saveStations = (newStations) => {
    setStations(newStations);
    localStorage.setItem('policeStations', JSON.stringify(newStations));
  };

  const addAuditLog = (action, admin, details, location) => {
    const newLog = {
      id: Date.now(),
      action,
      admin,
      details,
      timestamp: new Date().toISOString(),
      location
    };
    const updatedLogs = [newLog, ...auditLogs];
    setAuditLogs(updatedLogs);
    localStorage.setItem('auditLogs', JSON.stringify(updatedLogs));
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddStation = () => {
    setEditingStation(null);
    setFormData({ id: '', name: '', admin: '' });
    setIsModalOpen(true);
  };

  const handleEditStation = (station) => {
    setEditingStation(station);
    setFormData({ id: station.id, name: station.name, admin: station.admin });
    setIsModalOpen(true);
  };

  const handleDeleteStation = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      const filtered = stations.filter(s => s.id !== id);
      saveStations(filtered);
      addAuditLog(`Deleted police station: ${name}`, "Current User", `Station ${id} removed from registry`, "Management Console");
      showNotification(`${name} has been deleted`, 'error');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.name || !formData.admin) {
      showNotification('Please fill all fields', 'error');
      return;
    }

    if (editingStation) {
      const updated = stations.map(s => 
        s.id === editingStation.id ? { ...s, ...formData } : s
      );
      saveStations(updated);
      addAuditLog(`Updated police station: ${formData.name}`, "Current User", `Station ${formData.id} information updated`, "Management Console");
      showNotification(`${formData.name} has been updated`);
    } else {
      if (stations.some(s => s.id === formData.id)) {
        showNotification('Police ID already exists', 'error');
        return;
      }
      const newStation = { 
        ...formData, 
        status: 'active', 
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      saveStations([...stations, newStation]);
      addAuditLog(`Registered new police station: ${formData.name}`, "Current User", `Station ${formData.id} added to registry with admin ${formData.admin}`, "Management Console");
      showNotification(`${formData.name} has been registered`);
    }
    setIsModalOpen(false);
  };

  const formatLastLogin = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hrs ago`;
    return `${diffDays} days ago`;
  };

  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.admin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg animate-slide-in ${
          notification.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'
        } text-white`}>
          {notification.message}
        </div>
      )}

      {/* Header with Police Navy Theme */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Compliance Banner */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4 mb-4 flex items-center gap-3 shadow-md">
            <div className="text-yellow-600 text-2xl">⚖️</div>
            <div>
              <span className="font-bold text-yellow-800">K. Dalot v</span>
              <span className="text-yellow-700 ml-2">— Manage Police Stations responsibly, failing to comply by the law.</span>
            </div>
            <div className="ml-auto bg-yellow-100 px-3 py-1 rounded-full text-xs font-medium text-yellow-800">
              Police Act Compliance
            </div>
          </div>
          
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-3xl">👮</span>
                Police Stations Command Centre
              </h1>
              <p className="text-blue-200 text-sm mt-1">Real-time oversight · Station accountability & tracking</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-700 bg-opacity-50 rounded-full px-4 py-2 flex items-center gap-2 backdrop-blur-sm">
                <span className="text-blue-200">👤</span>
                <span className="text-sm font-medium text-white">Zonal Commander: K. Dalot</span>
              </div>
              <button
                onClick={handleAddStation}
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
              >
                <span>+</span>
                Register Station
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-600 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Stations</p>
                <p className="text-2xl font-bold text-blue-900">{stations.length}</p>
              </div>
              <div className="text-3xl">🏢</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-emerald-600 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Stations</p>
                <p className="text-2xl font-bold text-emerald-600">{stations.filter(s => s.status === 'active').length}</p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-amber-600 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Today</p>
                <p className="text-2xl font-bold text-amber-600">{stations.filter(s => s.createdAt === new Date().toISOString().split('T')[0]).length}</p>
              </div>
              <div className="text-3xl">🕐</div>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Table and Audit Log - SIDE BY SIDE */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Police Stations Table - Left side */}
          <div className="w-full lg:w-8/12">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Header with "Manage Police Stations" text at top left and Search at top right */}
              <div className="p-3 border-b border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-md font-semibold text-gray-700 flex items-center gap-2">
                      <span>🏢</span> Manage Police Stations
                    </h2>
                  </div>
                  <div className="relative w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-sm">🔍</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="bg-gradient-to-r from-blue-900 to-blue-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-32">Police ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Station Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-36">Admin</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-28">Last Login</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-20">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-28">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredStations.map((station) => (
                      <tr key={station.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-gray-700 align-middle whitespace-nowrap">
                          {station.id}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 align-middle">
                          {station.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 align-middle whitespace-nowrap">
                          {station.admin}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500 align-middle whitespace-nowrap">
                          {formatLastLogin(station.lastLogin)}
                        </td>
                        <td className="px-4 py-3 align-middle">
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700 whitespace-nowrap">
                            ✓ Active
                          </span>
                        </td>
                        <td className="px-4 py-3 align-middle">
                          <div className="flex items-center gap-2 whitespace-nowrap">
                            <button
                              onClick={() => handleEditStation(station)}
                              className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDeleteStation(station.id, station.name)}
                              className="inline-flex items-center text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredStations.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <p>No police stations found</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Audit Log Section - Right side */}
          <div className="w-full lg:w-4/12">
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
              <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 flex-shrink-0">
                <h2 className="font-semibold text-gray-800 flex items-center gap-2 text-sm">
                  <span>📋</span> Audit Log
                </h2>
              </div>
              <div className="divide-y divide-gray-100 overflow-y-auto flex-1 max-h-[600px]">
                {auditLogs.map((log) => (
                  <div key={log.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-2">
                      <div className="text-blue-600 text-lg flex-shrink-0">📄</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 break-words">{log.action}</p>
                        <p className="text-xs text-gray-500 mt-1 break-words">{log.details}</p>
                        <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-400">
                          <span className="whitespace-nowrap">🕐 {new Date(log.timestamp).toLocaleString()}</span>
                          <span className="whitespace-nowrap">📍 {log.location}</span>
                          <span className="whitespace-nowrap">👤 {log.admin}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-blue-900">
              {editingStation ? '✏️ Edit Police Station' : '➕ Register New Police Station'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Police ID</label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="e.g., MW-ZA-23-XXX-XX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!!editingStation}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Station Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter police station name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin (Officer in Charge)</label>
                <input
                  type="text"
                  value={formData.admin}
                  onChange={(e) => setFormData({ ...formData, admin: e.target.value })}
                  placeholder="e.g., Sgt. Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingStation ? 'Update Station' : 'Register Station'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PoliceStationManage;