import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../officer/footer/footer";
import { getStoredOfficers, saveOfficers } from "../officersStorage";

export default function CreateOfficer() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
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

  // ✅ OTP generator
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ PHONE VALIDATION (numbers only)
    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "");
      setFormData({ ...formData, phone: cleaned });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!isValidEmail(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.dob) newErrors.dob = "DOB is required";
    if (!formData.gender) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.batchNumber) newErrors.batchNumber = "Required";
    if (!formData.policeName) newErrors.policeName = "Required";
    if (!formData.position) newErrors.position = "Required";
    if (!formData.joiningDate) newErrors.joiningDate = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setErrors({});
    setStep(step + 1);
  };

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      navigate("/manage-officers", {
        state: { message: "Officer created successfully." },
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [success, navigate]);

  const handleSave = async () => {
    const savedOfficers = getStoredOfficers() || [];

    const officerId =
      formData.batchNumber.trim() ||
      `MW-${Date.now().toString().slice(-8)}`;

    const otp = generateOTP(); // ✅ generate OTP

    const newOfficer = {
      id: officerId,
      name: `${formData.firstName} ${formData.lastName}`,
      rank: formData.position,
      active: true,
      email: formData.email,
      phone: formData.phone,
      otp: otp, // optional store
    };

    saveOfficers([newOfficer, ...savedOfficers]);

    // ✅ EMAIL CONTENT
    const fullName = `${formData.firstName} ${formData.lastName}`;
    const emailMessage = `
Hey ${fullName},

Your account has been created successfully.

Use the following details to login:

Batch Number: ${formData.batchNumber}
OTP: ${otp}

Thank you.
    `;

    console.log("EMAIL TO SEND:", {
      to: formData.email,
      message: emailMessage,
    });

    // ===========================
    // ✅ BACKEND API CALL (RECOMMENDED)
    // ===========================
    try {
      await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: formData.email,
          subject: "Police Account Created",
          message: emailMessage,
        }),
      });
    } catch (err) {
      console.error("Email failed:", err);
    }

    setSuccess(true);

    setFormData({
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

    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded shadow-md p-6 max-w-5xl mx-auto">

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 p-4 mb-4 rounded">
            Officer created successfully. Email sent!
          </div>
        )}

        <div className="bg-blue-500 text-white text-center py-6 rounded mb-6">
          <h2 className="text-xl font-semibold">Create Officer</h2>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className="grid grid-cols-2 gap-4">

              <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="border p-2" />
              <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="border p-2" />
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2" />

              {/* ✅ PHONE FIX */}
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone (numbers only)"
                className="border p-2"
              />
            </div>

            <button onClick={handleNext} className="mt-4 bg-blue-500 text-white px-4 py-2">
              Next
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <input name="batchNumber" value={formData.batchNumber} onChange={handleChange} placeholder="Batch Number" className="border p-2 w-full" />
            <button onClick={handleSave} className="mt-4 bg-blue-500 text-white px-4 py-2">
              Save Officer
            </button>
          </>
        )}

      </div>
      <Footer />
    </div>
  );
}