import React, { useState } from "react";
import Footer from "../../officer/footer/footer";

export default function CreateOfficer() {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateStep1 = () => {
    let newErrors = {};

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
    let newErrors = {};

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

  const handleSave = () => {
    setSuccess(true);

    // reset form after success
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

        {/* SUCCESS POPUP */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 p-4 mb-4 rounded">
            ✅ Officer created successfully!
          </div>
        )}

        {/* Header */}
        <div className="bg-blue-500 text-white text-center py-6 rounded mb-6">
          <h2 className="text-xl font-semibold">👤 Create Officer</h2>
          <p className="text-sm mt-1">
            Please verify details before saving
          </p>
        </div>

        {/* Stepper */}
        <div className="flex justify-center mb-8 space-x-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="text-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${step === s ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
                {s}
              </div>
              <p className="text-sm mt-1">
                {s === 1 && "Personal Info"}
                {s === 2 && "Work Details"}
                {s === 3 && "Verification"}
              </p>
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h3 className="mb-4 font-semibold">Personal Information</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="border p-2 w-full"/>
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              </div>

              <div>
                <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="border p-2 w-full"/>
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              </div>

              <div>
                <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 w-full"/>
                <p className="text-red-500 text-sm">{errors.email}</p>
              </div>

              <div>
                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="border p-2 w-full"/>
                <p className="text-red-500 text-sm">{errors.phone}</p>
              </div>
            </div>

            <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="border p-2 w-full mt-4"/>
            <p className="text-red-500 text-sm">{errors.address}</p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="border p-2"/>
              <select name="gender" value={formData.gender} onChange={handleChange} className="border p-2">
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div className="flex justify-end mt-6">
              <button onClick={handleNext} className="bg-blue-500 text-white px-6 py-2 rounded">
                Next
              </button>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h3 className="mb-4 font-semibold">Work Details</h3>

            <div className="grid grid-cols-2 gap-4">
              <input name="batchNumber" value={formData.batchNumber} onChange={handleChange} placeholder="Batch Number" className="border p-2"/>
              <input name="department" value={formData.department} onChange={handleChange} placeholder="Department" className="border p-2"/>
              <input name="policeName" value={formData.policeName} onChange={handleChange} placeholder="Police Name" className="border p-2"/>

              <select name="position" value={formData.position} onChange={handleChange} className="border p-2">
                <option value="">Position</option>
                <option>Constable</option>
                <option>Sergeant</option>
                <option>Inspector</option>
              </select>

              <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} className="border p-2"/>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(1)} className="border px-6 py-2 rounded">
                Previous
              </button>

              <button onClick={handleNext} className="bg-blue-500 text-white px-6 py-2 rounded">
                Next
              </button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h3 className="mb-4 font-semibold">Verification</h3>

            <div className="bg-gray-100 p-4 rounded space-y-2">
              <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Address:</strong> {formData.address}</p>
              <p><strong>DOB:</strong> {formData.dob}</p>
              <p><strong>Gender:</strong> {formData.gender}</p>
              <hr/>
              <p><strong>Batch:</strong> {formData.batchNumber}</p>
              <p><strong>Department:</strong> {formData.department}</p>
              <p><strong>Police Name:</strong> {formData.policeName}</p>
              <p><strong>Position:</strong> {formData.position}</p>
              <p><strong>Joining Date:</strong> {formData.joiningDate}</p>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(2)} className="border px-6 py-2 rounded">
                Previous
              </button>

              <button onClick={handleSave} className="bg-blue-500 text-white px-6 py-2 rounded">
                Save Officer
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}