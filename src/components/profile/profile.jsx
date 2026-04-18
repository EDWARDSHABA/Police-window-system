import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeadquartersHeader from "../headquaeters/Header/HeadQuartersHeader";
import Footer from "../officer/footer/footer";
import member2 from "../../assets/images/member2.jpeg";

export default function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Password updated successfully (connect to backend)");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <HeadquartersHeader />

      {/* MAIN CENTER AREA */}
      <div className="flex-1 flex justify-center items-center pt-24 pb-16 px-4">

        <div className="w-full max-w-5xl flex flex-col items-center">

          {/* Top bar */}
          <div className="w-full h-10 bg-blue-300 mt-2 rounded"></div>

          {/* MAIN CARD */}
          <div className="w-full bg-white mt-6 shadow-lg rounded flex flex-col md:flex-row overflow-hidden">

            {/* LEFT SIDE */}
            <div className="md:w-1/2 p-6 bg-gray-100 border-b md:border-b-0 md:border-r">

              <div className="flex items-center gap-4 mb-5">

                <img
                  src={member2}
                  alt="officer"
                  className="w-20 h-20 rounded-md object-cover"
                />

                <div>
                  <h2 className="font-semibold text-lg">
                    Edward Young Shaba
                  </h2>
                  <p className="text-sm text-gray-500">Batch Number</p>
                  <div className="w-32 h-1 bg-blue-300 mt-1"></div>
                  <p className="text-sm text-gray-500 mt-2">Position</p>
                  <div className="w-24 h-1 bg-blue-300 mt-1"></div>
                </div>

              </div>

              <div className="space-y-3 text-sm text-gray-700">
                <p><span className="font-semibold">Name:</span> Edward Young Shaba</p>
                <p><span className="font-semibold">Batch Number:</span> MW-FQ-33-222</p>
                <p><span className="font-semibold">Station:</span> Zomba Police Station</p>
                <p><span className="font-semibold">Email:</span> edwardyoungshaba133@gmail.com</p>
                <p><span className="font-semibold">Phone:</span> 0885927420</p>
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="md:w-1/2 p-6 flex flex-col justify-center">

              <h3 className="font-semibold mb-4 text-lg text-center md:text-left">
                Change Password
              </h3>

              <div className="flex flex-col gap-3">

                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="p-2 border rounded bg-gray-100"
                />

                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="p-2 border rounded bg-gray-100"
                />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="p-2 border rounded bg-gray-100"
                />

                <button
                  onClick={handleSubmit}
                  className="mt-3 bg-blue-300 hover:bg-blue-400 text-white py-2 rounded transition"
                >
                  Update Password
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />

    </div>
  );
}