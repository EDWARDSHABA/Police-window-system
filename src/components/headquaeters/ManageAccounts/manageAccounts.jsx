// src/components/PoliceStationManage.js - Audit Logs Auto-delete after 48 Hours
import React, { useState, useEffect } from 'react';

const ManageAccounts = () => {
  const [stations, setStations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStation, setEditingStation] = useState(null);
  const [formData, setFormData] = useState({ id: '', name: '', admin: '' });
  const [notification, setNotification] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);

  // 48 hours in milliseconds
  const FORTY_EIGHT_HOURS = 48 * 60 * 60 * 1000;

  useEffect(() => {
    loadData();
    // Clean up old audit logs every hour
    const interval = setInterval(() => {
      cleanupOldAuditLogs();
    }, 60 * 60 * 1000); // Check every hour
    
    return () => clearInterval(interval);
  }, []);

  const cleanupOldAuditLogs = () => {
    const now = new Date();
    const filteredLogs = auditLogs.filter(log => {
      const logDate = new Date(log.timestamp);
      const timeDiff = now - logDate;
      return timeDiff < FORTY_EIGHT_HOURS;
    });
    
    if (filteredLogs.length !== auditLogs.length) {
      setAuditLogs(filteredLogs);
      localStorage.setItem('auditLogs', JSON.stringify(filteredLogs));
    }
  };

  const loadData = () => {
    const storedStations = localStorage.getItem('policeStations');
    if (storedStations) {
      setStations(JSON.parse(storedStations));
    } else {
      const mockData = [
        { id: "MW-ZA-23-898-24", name: "", admin: "Sgt. Victor Max", lastLogin: new Date().toISOString(), status: "active", createdAt: "2024-01-15" },
        { id: "MW-ZA-23-768-24", name: "7 miles Police Station", admin: "Sgt. Martha Sawasawa", lastLogin: new Date().toISOString(), status: "active", createdAt: "2024-02-20" },
        { id: "MW-ZA-23-895-25", name: "Chikanda Police Station", admin: "Sgt. Victor Max", lastLogin: new Date().toISOString(), status: "active", createdAt: "2024-03-10" },
        { id: "MW-ZA-23-112-25", name: "Matawale Police Station", admin: "Sgt. Edward Shawa", lastLogin: new Date().toISOString(), status: "active", createdAt: "2024-01-28" },
        { id: "MW-ZA-23-898-25", name: "Domasi Police Station", admin: "Sgt. Victor Max", lastLogin: new Date().toISOString(), status: "active", createdAt: "2024-04-05" },
        { id: "MW-ZA-23-221-26", name: "Namadzi Police Station", admin: "Sgt. Samuel Ken Chisale", lastLogin: new Date().toISOString(), status: "active", createdAt: "2024-05-12" },
      ];
      setStations(mockData);
      localStorage.setItem('policeStations', JSON.stringify(mockData));
    }

    const storedLogs = localStorage.getItem('auditLogs');
    if (storedLogs) {
      const parsedLogs = JSON.parse(storedLogs);
      // Filter out logs older than 48 hours on load
      const now = new Date();
      const freshLogs = parsedLogs.filter(log => {
        const logDate = new Date(log.timestamp);
        const timeDiff = now - logDate;
        return timeDiff < FORTY_EIGHT_HOURS;
      });
      setAuditLogs(freshLogs);
      localStorage.setItem('auditLogs', JSON.stringify(freshLogs));
    } else {
      const mockLogs = [
        { id: 1, action: "3 admins created 8 police officers accounts", admin: "System", details: "Bulk account creation approved", timestamp: new Date().toISOString(), location: "Zonal HQ" },
        { id: 2, action: "Admin Banda for Zomba police deleted officers account", admin: "Admin Banda", details: "Officer account deactivation due to transfer", timestamp: new Date(Date.now() - 86400000).toISOString(), location: "Zomba District" },
      ];
      setAuditLogs(mockLogs);
      localStorage.setItem('auditLogs', JSON.stringify(mockLogs));
    }
  };

  // Function to generate auto Police ID
  const generatePoliceId = () => {
    const year = new Date().getFullYear().toString().slice(-2);
    const randomNum = Math.floor(Math.random() * 900) + 100;
    const lastTwoDigits = Math.floor(Math.random() * 90) + 10;
    
    // Get the last used sequence number
    const existingIds = stations.map(s => s.id);
    let sequence = 1;
    
    if (existingIds.length > 0) {
      // Extract sequence numbers from existing IDs
      const sequences = existingIds.map(id => {
        const match = id.match(/MW-ZA-23-(\d+)-/);
        return match ? parseInt(match[1]) : 0;
      });
      const maxSequence = Math.max(...sequences, 0);
      sequence = maxSequence + 1;
    }
    
    return `MW-ZA-23-${sequence.toString().padStart(3, '0')}-${randomNum}`;
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
    const autoId = generatePoliceId();
    setFormData({ id: autoId, name: '', admin: '' });
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
    if (!formData.name || !formData.admin) {
      showNotification('Please fill all fields', 'error');
      return;
    }

    if (editingStation) {
      const updated = stations.map(s => 
        s.id === editingStation.id ? { ...s, name: formData.name, admin: formData.admin } : s
      );
      saveStations(updated);
      addAuditLog(`Updated police station: ${formData.name}`, "Current User", `Station ${formData.id} information updated`, "Management Console");
      showNotification(`${formData.name} has been updated`);
    } else {
      // Check if ID already exists (should not happen with auto-generation, but just in case)
      if (stations.some(s => s.id === formData.id)) {
        // Regenerate a new ID if collision occurs
        const newId = generatePoliceId();
        setFormData({ ...formData, id: newId });
        showNotification('ID collision detected, new ID generated', 'error');
        return;
      }
      const newStation = { 
        id: formData.id,
        name: formData.name, 
        admin: formData.admin,
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg animate-slide-in ${
          notification.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'
        } text-white`}>
          {notification.message}
        </div>
      )}

      {/* Header has been removed - Add your custom header above this component */}

      {/* Main Content - Full width */}
      <div className="flex-1 flex flex-col px-6 py-4">
        {/* Blue Compliance Card */}
        <div className="mb-4 flex-shrink-0">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md p-4 border-l-4 border-yellow-400">
            <p className="text-white text-md font-medium">
              Manage Police Stations responsibly, failing to comply by the law.
            </p>
          </div>
        </div>

        {/* Two Column Layout: Table and Audit Log - Full height */}
        <div className="flex flex-1 flex-col lg:flex-row gap-6 min-h-0">
          {/* Police Stations Table - Left side */}
          <div className="w-full lg:w-8/12 flex flex-col min-h-0">
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
              {/* Header with "Manage Police Stations" text at top left and Search at top right */}
              <div className="p-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                      <span className="text-xl">🏢</span> Manage Police Stations
                    </h2>
                  </div>
                  <div className="relative w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-sm">🔍</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Search by name, ID or admin..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    />
                  </div>
                </div>
              </div>
              <div className="overflow-auto flex-1">
                <table className="w-full table-auto">
                  <thead className="bg-gradient-to-r from-blue-900 to-blue-800 sticky top-0">
                    <tr>
                      <th className="px-5 py-3.5 text-left text-xs font-medium text-white uppercase tracking-wider">Police ID</th>
                      <th className="px-5 py-3.5 text-left text-xs font-medium text-white uppercase tracking-wider">Station Name</th>
                      <th className="px-5 py-3.5 text-left text-xs font-medium text-white uppercase tracking-wider">Admin</th>
                      <th className="px-5 py-3.5 text-left text-xs font-medium text-white uppercase tracking-wider">Last Login</th>
                      <th className="px-5 py-3.5 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                      <th className="px-5 py-3.5 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredStations.map((station) => (
                      <tr key={station.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3.5 font-mono text-sm text-gray-700 align-middle whitespace-nowrap">
                          {station.id}
                        </td>
                        <td className="px-5 py-3.5 text-sm font-medium text-gray-900 align-middle">
                          {station.name}
                        </td>
                        <td className="px-5 py-3.5 text-sm text-gray-600 align-middle whitespace-nowrap">
                          {station.admin}
                        </td>
                        <td className="px-5 py-3.5 text-sm text-gray-500 align-middle whitespace-nowrap">
                          {formatLastLogin(station.lastLogin)}
                        </td>
                        <td className="px-5 py-3.5 align-middle">
                          <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700 whitespace-nowrap">
                            ✓ Active
                          </span>
                        </td>
                        <td className="px-5 py-3.5 align-middle">
                          <div className="flex items-center gap-3 whitespace-nowrap">
                            <button
                              onClick={() => handleEditStation(station)}
                              className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDeleteStation(station.id, station.name)}
                              className="inline-flex items-center text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
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
          <div className="w-full lg:w-4/12 flex flex-col min-h-0">
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
              <div className="px-5 py-3.5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 flex-shrink-0">
                <h2 className="font-semibold text-gray-800 flex items-center gap-2 text-base">
                  <span className="text-lg">📋</span> Audit Log
                  <span className="text-xs text-gray-500 ml-2">(Auto-deletes after 48 hours)</span>
                </h2>
              </div>
              <div className="divide-y divide-gray-100 overflow-auto flex-1">
                {auditLogs.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>No audit logs available</p>
                    <p className="text-xs mt-2">Logs older than 48 hours are automatically deleted</p>
                  </div>
                ) : (
                  auditLogs.map((log) => (
                    <div key={log.id} className="px-5 py-3.5 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="text-blue-600 text-base flex-shrink-0">📄</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 break-words">{log.action}</p>
                          <p className="text-xs text-gray-500 mt-1 break-words">{log.details}</p>
                          <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                            <span className="whitespace-nowrap">🕐 {new Date(log.timestamp).toLocaleString()}</span>
                            <span className="whitespace-nowrap">📍 {log.location}</span>
                            <span className="whitespace-nowrap">👤 {log.admin}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Police ID (Auto-generated)</label>
                <input
                  type="text"
                  value={formData.id}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 font-mono text-sm"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">✓ ID is automatically generated</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Station Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter police station name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin (Officer in Charge) *</label>
                <input
                  type="text"
                  value={formData.admin}
                  onChange={(e) => setFormData({ ...formData, admin: e.target.value })}
                  placeholder="e.g., Sgt. Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
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

export default ManageAccounts;
