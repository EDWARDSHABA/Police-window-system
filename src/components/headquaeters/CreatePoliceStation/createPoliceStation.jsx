import React, { useState } from "react";
import Header from "../Header/HeadQuartersHeader";
import Footer from "../Footer/footer";
import { sendEmail } from "../../aboutus/aboutUsApi";

const CreatePoliceStationPage = () => {
  // District to shortcut mapping
  const districtShortcuts = {
    Balaka: "BLK",
    Blantyre: "BT",
    Chikwawa: "CH",
    Chiradzulu: "CR",
    Chitipa: "CT",
    Dedza: "DZ",
    Dowa: "DW",
    Karonga: "KR",
    Kasungu: "KA",
    Likoma: "LK",
    Lilongwe: "LL",
    Machinga: "MC",
    Mangochi: "MG",
    Mchinji: "MC",
    Mulanje: "MJ",
    Mwanza: "MW",
    Mzimba: "MZ",
    Neno: "NE",
    "Nkhata Bay": "NK",
    Nkhotakota: "NH",
    Nsanje: "NS",
    Ntcheu: "NT",
    Ntchisi: "NI",
    Phalombe: "PH",
    Rumphi: "RU",
    Salima: "SA",
    Thyolo: "TH",
    Zomba: "ZO",
  };

  const [formData, setFormData] = useState({
    stationName: "",
    district: "",
    region: "",
    policeStationId: "",
    adminName: "",
    adminId: "",
    stationAssigned: "",
    phone: "",
    email: "",
    address: "",
  });

  const BATCH_NUMBER = "MW-FQ-33-222";

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

  const createOtpEmailMessage = ({ adminName, stationName, adminId, stationId, otp, expiresAt }) => {
    const expiresTime = expiresAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return `Dear ${adminName},

Your police station admin account has been created for ${stationName}.

Use the following one-time login OTP for your first login:

OTP: ${otp}

Batch Number: ${BATCH_NUMBER}
Station ID: ${stationId}
Admin ID: ${adminId}

This OTP expires in 2 minutes, at ${expiresTime}.

After logging in, please change your password immediately from your profile settings.

If you did not request this account, contact the system administrator immediately.

Thank you,
Police Window System Team`;
  };

  // generate ID function
  const generateId = (district) => {
    const districtShortcut = districtShortcuts[district] || district;
    const random = (Math.floor(Math.random() * 999999) + 1).toString().padStart(6, '0');
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const code = Array.from({length: 3}, () => letters[Math.floor(Math.random() * letters.length)]).join('');
    const year = new Date().getFullYear();
    return `MW-${districtShortcut}-${random}-${code}-${year}`;
  };

  // generate admin ID function
  const generateAdminId = (adminName) => {
    if (!adminName || adminName.length < 2) return '';
    const first2 = adminName.substring(0, 2).toUpperCase();
    const rand1 = Math.floor(Math.random() * (11000 - 10 + 1)) + 10;
    const rand2 = Math.floor(Math.random() * (9999 - 100 + 1)) + 100;
    return `${first2}-${rand1}-${rand2}`;
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'district') {
      const generatedId = generateId(value);
      setFormData({
        ...formData,
        district: value,
        policeStationId: generatedId,
      });
    } else if (name === 'adminName') {
      const generatedAdminId = generateAdminId(value);
      setFormData({
        ...formData,
        adminName: value,
        adminId: generatedAdminId,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check required fields
    if (!formData.stationName || !formData.district || !formData.region || !formData.adminName) {
      alert("Please fill in all required fields: Station Name, District, Region, and Admin Name.");
      return;
    }

    // Email validation
    if (!formData.email) {
      alert("Please enter the admin email address.");
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address (e.g., admin@example.com).");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/stations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

        const emailBody = createOtpEmailMessage({
          adminName: formData.adminName,
          stationName: formData.stationName,
          adminId: formData.adminId,
          stationId: formData.policeStationId,
          otp,
          expiresAt,
        });

        try {
          await sendEmail({
            email: formData.email,
            name: formData.adminName,
            subject: "Police Window System first login OTP",
            message: emailBody,
          });

          localStorage.setItem(
            "latestStationAdminOtp",
            JSON.stringify({
              email: formData.email,
              otp,
              expiresAt: expiresAt.toISOString(),
              stationName: formData.stationName,
              adminId: formData.adminId,
            })
          );

          alert(
            `✅ Police Station Created Successfully! OTP has been sent to ${formData.email} and expires in 2 minutes.`
          );
        } catch (emailError) {
          console.error(emailError);
          alert(
            "✅ Police Station Created Successfully! But the OTP email could not be sent. Please retry or check email service."
          );
        }

        // reset form
        setFormData({
          stationName: "",
          district: "",
          region: "",
          policeStationId: "",
          adminName: "",
          adminId: "",
          stationAssigned: "",
          phone: "",
          email: "",
          address: "",
        });
      } else {
        alert("❌ Failed to create station");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Server error");
    }
  };

  return (
    <div className="bg-gray-100 h-screen overflow-y-auto p-6 pt-15">
      <Header />

      {/* banner */}
      <div className="bg-blue-600 text-white p-2 rounded-md mb-4 shadow">
        <h2 className="text-lg font-regula">
          You can Create Police station and assign admin to manage the police station <br/>.
          <br/>
        </h2>
        <p className="text-sm opacity-100">
          
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">

        <h2 className="text-xl font-bold mb-4 text-blue-900">
          Police Station Information
        </h2>

        <form onSubmit={handleSubmit}>

          {/* Station Info */}
          <div className="space-y-4">
            <input
              type="text"
              name="stationName"
              placeholder="Police Station Name"
              value={formData.stationName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select District</option>
              <option>Balaka</option>
              <option>Blantyre</option>
              <option>Chikwawa</option>
              <option>Chiradzulu</option>
              <option>Chitipa</option>
              <option>Dedza</option>
              <option>Dowa</option>
              <option>Karonga</option>
              <option>Kasungu</option>
              <option>Likoma</option>
              <option>Lilongwe</option>
              <option>Machinga</option>
              <option>Mangochi</option>
              <option>Mchinji</option>
              <option>Mulanje</option>
              <option>Mwanza</option>
              <option>Mzimba</option>
              <option>Neno</option>
              <option>Nkhata Bay</option>
              <option>Nkhotakota</option>
              <option>Nsanje</option>
              <option>Ntcheu</option>
              <option>Ntchisi</option>
              <option>Phalombe</option>
              <option>Rumphi</option>
              <option>Salima</option>
              <option>Thyolo</option>
              <option>Zomba</option>
            </select>

            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Region</option>
              <option>Southern</option>
              <option>Central</option>
              <option>Northern</option>
            </select>
            <input
              type="text"
              name="policeStationId"
              placeholder="Police Station ID"
              value={formData.policeStationId}
              onChange={handleChange}
              className="p-2 border rounded"
              readOnly
            />
          </div>

          {/* Admin Section */}
          <h3 className="text-lg font-semibold mt-6 mb-3 text-blue-900">
            Assign Police Station Admin
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded">

            <input
              type="text"
              name="adminName"
              placeholder="Admin Name"
              value={formData.adminName}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />

            <input
              type="text"
              name="adminId"
              placeholder="Admin ID"
              value={formData.adminId}
              onChange={handleChange}
              className="p-2 border rounded"
              readOnly
            />

            <input
              type="text"
              name="stationAssigned"
              placeholder="Station Assigned"
              value={formData.stationAssigned}
              onChange={handleChange}
              className="p-2 border rounded"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="p-2 border rounded"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border rounded"
              pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
              title="Please enter a valid email address"
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-6 gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Station
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default CreatePoliceStationPage;
