import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../officer/footer/footer";
import StationHeader from "../Header/PoliceStationHeader";
import { getStoredOfficers, saveOfficers } from "../officersStorage";

export default function EditOfficer() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
    batchNumber: "",
    department: "",
    policeName: "",
    position: "",
    joiningDate: "",
  });

  useEffect(() => {
    const officers = getStoredOfficers() || [];
    const officer = officers.find((o) => o.id === id);

    if (officer) {
      const nameParts = officer.name?.split(" ") || [];

      setFormData({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: officer.email || "",
        phone: officer.phone || "",
        address: officer.address || "",
        dob: officer.dob || "",
        gender: officer.gender || "",
        batchNumber: officer.id || "",
        department: officer.department || "",
        policeName: officer.policeName || "",
        position: officer.rank || "",
        joiningDate: officer.joiningDate || "",
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const officers = getStoredOfficers() || [];

    const updated = officers.map((o) => {
      if (o.id === id) {
        return {
          ...o,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          dob: formData.dob,
          gender: formData.gender,
          department: formData.department,
          policeName: formData.policeName,
          rank: formData.position,
          joiningDate: formData.joiningDate,
        };
      }
      return o;
    });

    saveOfficers(updated);
    setSuccess(true);

    setTimeout(() => navigate("/manage-officers"), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <StationHeader />

      <div className="bg-white rounded shadow-md p-6 max-w-5xl mx-auto">

        {success && (
          <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">
            Officer updated successfully...
          </div>
        )}

        <div className="bg-blue-500 text-white mt-15 text-center py-6 rounded mb-6">
          <h2 className="text-xl font-semibold">Edit Officer</h2>
          <p className="text-sm mt-1">Update officer information</p>
        </div>

        {/* 🧾 VERIFICATION STYLE EDITABLE SECTION */}
        <div className="bg-gray-50 p-6 rounded shadow space-y-4">

          {/* Personal Info */}
          <h3 className="font-semibold text-gray-700">Personal Information</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <div className="flex gap-2">
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  placeholder="First Name"
                />
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">DOB</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm text-gray-600">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
          </div>

          <hr />

          {/* Work Info */}
          <h3 className="font-semibold text-gray-700">Work Information</h3>

          <div className="grid grid-cols-2 gap-4">

            {/* 🔒 Batch NOT editable */}
            <div>
              <label className="text-sm text-gray-600">Batch Number (Locked)</label>
              <input
                value={formData.batchNumber}
                disabled
                className="border p-2 w-full bg-gray-200 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Department</label>
              <input
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Police Name</label>
              <input
                name="policeName"
                value={formData.policeName}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Position</label>
              <input
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Joining Date</label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>

          </div>

          {/* Save */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-6 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}