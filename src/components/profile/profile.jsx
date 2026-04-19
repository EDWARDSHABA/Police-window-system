import React, { useState } from 'react';

const Profile = () => {
  const [currentTab, setCurrentTab] = useState('batch');
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [profile] = useState({
    name: 'marthasawasawa',
    batch: 'MW-FQ-33-222',
    position: 'Inspector Admin',
    station: 'Zomba Police Station',
    email: 'marthasawasawa31@gmail.com',
    phone: '0885968773',
    photo:
      'https://images.unsplash.com/photo-1603415526960-f7b936f1a3f7?auto=format&fit=crop&w=512&q=80',
  });

  const handlePasswordChange = (field) => (e) => {
    setPasswords((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match');
      return;
    }
    alert('Password updated successfully');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg">
      <div className="h-20 bg-blue-500" />

      <div className="grid gap-6 p-8 lg:grid-cols-[1fr_1fr]">
          {/* Left Side - Profile Info */}
          <div className="border-r border-gray-300 pr-8">
            <div className="flex gap-6 mb-8">
              <div className="flex-shrink-0">
                <div className="h-32 w-32 overflow-hidden rounded-lg border-4 border-gray-300 bg-gray-200">
                  <img src={profile.photo} alt="Profile" className="h-full w-full object-cover" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex gap-6 mb-4">
                  <button
                    onClick={() => setCurrentTab('batch')}
                    className={`pb-2 border-b-2 text-sm font-medium transition ${
                      currentTab === 'batch'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Batch Number
                  </button>
                  <button
                    onClick={() => setCurrentTab('position')}
                    className={`pb-2 border-b-2 text-sm font-medium transition ${
                      currentTab === 'position'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Position
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="font-semibold text-gray-900">Name:</span>
                <span className="ml-2 text-gray-700">{profile.name}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Batch Number:</span>
                <span className="ml-2 text-gray-700">{profile.batch}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Station:</span>
                <span className="ml-2 text-gray-700">{profile.station}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Email:</span>
                <span className="ml-2 text-blue-600">{profile.email}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Phone:</span>
                <span className="ml-2 text-gray-700">{profile.phone}</span>
              </div>
            </div>
          </div>

          {/* Right Side - Change Password */}
          <div className="pl-8">
            <h3 className="mb-6 text-xl font-semibold text-gray-500">Change Password</h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={passwords.current}
                  onChange={handlePasswordChange('current')}
                  className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="New Password"
                  value={passwords.new}
                  onChange={handlePasswordChange('new')}
                  className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={passwords.confirm}
                  onChange={handlePasswordChange('confirm')}
                  className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-500 py-3 text-white font-semibold hover:bg-blue-600 transition"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Profile;
