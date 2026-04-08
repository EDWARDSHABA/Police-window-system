import React, { useState } from 'react';

const PoliceStationManage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Martha sawasawa',
    batch: 'MW-PO_23_222',
    position: 'Insp. Admin',
    station: 'Zomba Police Station',
    email: 'sawasawa@mwp.pol.com',
    phone: '0885968773',
    photo:
      'https://images.unsplash.com/photo-1603415526960-f7b936f1a3f7?auto=format&fit=crop&w=512&q=80',
  });

  const handleChange = (field) => (event) => {
    setProfile((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfile((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const isProfileValid =
    profile.name.trim() !== '' &&
    profile.batch.trim() !== '' &&
    profile.station.trim() !== '' &&
    profile.email.trim() !== '' &&
    profile.phone.trim() !== '';

  const handleSave = (event) => {
    event.preventDefault();
    if (!isProfileValid) {
      return;
    }
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-slate-300 bg-white shadow-lg">
        <div className="h-16 bg-sky-600" />

        <div className="grid gap-6 p-6 lg:grid-cols-[1.4fr_1fr] lg:gap-0">
          <div className="rounded-3xl bg-slate-200 p-6 lg:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
              <div className="flex-shrink-0">
                <div className="relative h-40 w-40 overflow-hidden rounded-[32px] border-4 border-white bg-slate-300 shadow-xl">
                  <img src={profile.photo} alt="Profile" className="h-full w-full object-cover" />
                </div>
                {isEditing && (
                  <label className="mt-4 inline-flex cursor-pointer items-center rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100">
                    Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="sr-only"
                    />
                  </label>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">{profile.name}</h2>
                    <p className="text-sm text-slate-500">
                      Batch Number <span className="font-medium text-slate-900">{profile.batch}</span>
                    </p>
                    <p className="text-sm text-slate-500">
                      Position <span className="font-medium text-slate-900">{profile.position}</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleToggleEdit}
                    className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
                  >
                    {isEditing ? 'Cancel' : 'Edit Details'}
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-pink-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-700" />
                </div>
              </div>
            </div>

            <form onSubmit={handleSave} className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-300 text-slate-700">👤</span>
                  <div className="w-full">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Name</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.name}
                        onChange={handleChange('name')}
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:bg-white"
                      />
                    ) : (
                      <p className="text-sm font-medium text-slate-900">{profile.name}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-300 text-slate-700">#</span>
                  <div className="w-full">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Batch Number</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.batch}
                        onChange={handleChange('batch')}
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:bg-white"
                      />
                    ) : (
                      <p className="text-sm font-medium text-slate-900">{profile.batch}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-300 text-slate-700">📍</span>
                  <div className="w-full">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Station</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.station}
                        onChange={handleChange('station')}
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:bg-white"
                      />
                    ) : (
                      <p className="text-sm font-medium text-slate-900">{profile.station}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-300 text-slate-700">✉️</span>
                  <div className="w-full">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Email</p>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profile.email}
                        onChange={handleChange('email')}
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:bg-white"
                      />
                    ) : (
                      <p className="text-sm font-medium text-slate-900 truncate">{profile.email}</p>
                    )}
                  </div>
                </div>              </div>
              <div className="sm:col-span-2 rounded-3xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-300 text-slate-700">📱</span>
                  <div className="w-full">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Phone</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.phone}
                        onChange={handleChange('phone')}
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:bg-white"
                      />
                    ) : (
                      <p className="text-sm font-medium text-slate-900">{profile.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {isEditing && (
                <>
                  <div className="sm:col-span-2 text-right text-sm text-rose-600">
                    {!isProfileValid && 'Please fill in all fields before saving.'}
                  </div>
                  <div className="sm:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={!isProfileValid}
                      className={`inline-flex h-12 items-center justify-center rounded-2xl px-6 text-sm font-semibold shadow-md transition ${
                        isProfileValid
                          ? 'bg-sky-600 text-white hover:bg-sky-700'
                          : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      Save Changes
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>

          <div className="rounded-3xl border border-slate-300 bg-white p-6 shadow-sm lg:p-8">
            <h3 className="mb-6 text-xl font-semibold text-slate-900">Change Password</h3>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700">Current Password</label>
                <input
                  type="password"
                  className="mt-3 h-12 w-full rounded-2xl border border-slate-200 bg-slate-300 px-4 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
                  placeholder="Current Password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">New Password</label>
                <input
                  type="password"
                  className="mt-3 h-12 w-full rounded-2xl border border-slate-200 bg-slate-300 px-4 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
                  placeholder="New Password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Confirm New Password</label>
                <input
                  type="password"
                  className="mt-3 h-12 w-full rounded-2xl border border-slate-200 bg-slate-300 px-4 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
                  placeholder="Confirm new password"
                />
              </div>
              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-sky-700"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliceStationManage;
