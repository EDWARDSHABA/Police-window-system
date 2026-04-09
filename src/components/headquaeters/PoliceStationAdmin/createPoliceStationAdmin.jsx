import React, { useState } from "react";
import Header from "../Header/HeadQuartersHeader";
import Footer from "../../officer/footer/footer";

export default function CreatePoliceStationAdmin() {
  const [formData, setFormData] = useState({
    adminName: "",
    adminId: "", // hidden but stored
    stationAssigned: "",
    phone: "",
    email: "",
    address: "",
  });

  // 🔥 Static stations
  const stations = [
    "Chinamwali Police Station",
    "Lilongwe Central",
    "Blantyre Urban",
    "Mzuzu Station",
    "Zomba Police Station",
    "Kasungu Police Station",
    "Mangochi Police Station",
    "Salima Police Station",
  ];

  // 🔥 Generate Admin ID (hidden)
  const generateAdminId = (adminName) => {
    if (!adminName || adminName.trim().length < 2) return "";

    const initials = adminName
      .trim()
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    const random = Math.floor(1000 + Math.random() * 9000);

    return `ADM-${initials}-${random}`;
  };

  // 🔥 Generate OTP
  const generateOTP = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  // 🔥 Validate Email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // 🔥 Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "adminName") {
        return {
          ...prev,
          adminName: value,
          adminId: generateAdminId(value), // generated but hidden
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // 🔥 Handle submit (frontend only)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.adminName || !formData.stationAssigned) {
      alert("Please fill required fields");
      return;
    }

    if (!formData.email || !validateEmail(formData.email)) {
      alert("Enter a valid email");
      return;
    }

    const otp = generateOTP();

    const existingAdmins =
      JSON.parse(localStorage.getItem("stationAdmins")) || [];

    const newAdmin = {
      ...formData,
      otp,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "stationAdmins",
      JSON.stringify([...existingAdmins, newAdmin])
    );

    alert(
      `✅ Admin Created Successfully!\n\nAdmin ID: ${formData.adminId}\nOTP: ${otp}`
    );

    // Reset form
    setFormData({
      adminName: "",
      adminId: "",
      stationAssigned: "",
      phone: "",
      email: "",
      address: "",
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen overflow-y-auto p-6 pt-16">
      <Header />

      {/* Banner */}
      <div className="bg-blue-300 text-white p-4 rounded-md mb-6 shadow">
        <h2 className="text-xl font-semibold">
          Create Police Station Administrator
        </h2>

      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">
          Admin Information
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Admin Name */}
            <input
              type="text"
              name="adminName"
              placeholder="Admin Name"
              value={formData.adminName}
              onChange={handleChange}
              className="p-3 border rounded-lg text-lg"
              required
            />

            {/* Station Dropdown */}
            <select
              name="stationAssigned"
              value={formData.stationAssigned}
              onChange={handleChange}
              className="p-3 border rounded-lg text-lg"
              required
            >
              <option value="">Select Police Station</option>
              {stations.map((station, index) => (
                <option key={index} value={station}>
                  {station}
                </option>
              ))}
            </select>

            {/* Phone */}
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="p-3 border rounded-lg text-lg"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border rounded-lg text-lg"
              required
            />

            {/* Address*/}
            <div className="md:col-span-2">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-lg"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-8 gap-4">
            <button
              type="button"
              className="px-6 py-3 bg-gray-300 rounded-lg text-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700"
            >
              Create Admin
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}