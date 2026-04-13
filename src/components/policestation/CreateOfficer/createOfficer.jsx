import React, { useState } from "react";

export default function CreateOfficer() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

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

  // Email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validate Step 1
  const validateStep1 = () => {
    let newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!isValidEmail(formData.email))
      newErrors.email = "Enter a valid email (must include @)";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Step 2
  const validateStep2 = () => {
    let newErrors = {};

    if (!formData.batchNumber)
      newErrors.batchNumber = "Batch number is required";
    if (!formData.policeName)
      newErrors.policeName = "Police name is required";
    if (!formData.position)
      newErrors.position = "Position is required";
    if (!formData.joiningDate)
      newErrors.joiningDate = "Joining date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Next
  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setErrors({});
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        CREATE OFFICER
      </button>

      <div className="bg-white rounded shadow-md p-6 max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="bg-blue-500 text-white text-center py-6 rounded mb-6">
          <h2 className="text-xl font-semibold">👤 Create Officer</h2>
          <p className="text-sm mt-1">
            Please Verify the details before you save the Officer
          </p>
        </div>

        {/* Stepper */}
        <div className="flex justify-center items-center mb-8 space-x-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full font-bold
                ${step === s ? "bg-blue-500 text-white" : "bg-gray-300"}`}
              >
                {s}
              </div>
              <p className="mt-2 text-sm">
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
            <h3 className="font-semibold mb-4">Personal Information</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input name="firstName" placeholder="First Name *" className="border p-2 w-full" onChange={handleChange} />
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              </div>

              <div>
                <input name="lastName" placeholder="Last Name *" className="border p-2 w-full" onChange={handleChange} />
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              </div>

              <div>
                <input name="email" placeholder="Email Address *" className="border p-2 w-full" onChange={handleChange} />
                <p className="text-red-500 text-sm">{errors.email}</p>
              </div>

              <div>
                <input name="phone" placeholder="Phone Number *" className="border p-2 w-full" onChange={handleChange} />
                <p className="text-red-500 text-sm">{errors.phone}</p>
              </div>
            </div>

            <div className="mt-4">
              <textarea name="address" placeholder="Residential Address *" className="border p-2 w-full" onChange={handleChange} />
              <p className="text-red-500 text-sm">{errors.address}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <input type="date" name="dob" className="border p-2 w-full" onChange={handleChange} />
                <p className="text-red-500 text-sm">{errors.dob}</p>
              </div>

              <div>
                <select name="gender" className="border p-2 w-full" onChange={handleChange}>
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <p className="text-red-500 text-sm">{errors.gender}</p>
              </div>
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
            <h3 className="font-semibold mb-4">Work Details</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input name="batchNumber" placeholder="Batch Number *" className="border p-2 w-full" onChange={handleChange} />
                <p className="text-red-500 text-sm">{errors.batchNumber}</p>
              </div>

              <div>
                <input name="department" placeholder="Department" className="border p-2 w-full" onChange={handleChange} />
              </div>

              <div>
                <input name="policeName" placeholder="Police Name *" className="border p-2 w-full" onChange={handleChange} />
                <p className="text-red-500 text-sm">{errors.policeName}</p>
              </div>

              <div>
                <select name="position" className="border p-2 w-full" onChange={handleChange}>
                  <option value="">Position *</option>
                  <option>Constable</option>
                  <option>Sergeant</option>
                  <option>Inspector</option>
                  <option>Superintendent</option>
                </select>
                <p className="text-red-500 text-sm">{errors.position}</p>
              </div>

              <div>
                <input type="date" name="joiningDate" className="border p-2 w-full" onChange={handleChange} />
                <p className="text-red-500 text-sm">{errors.joiningDate}</p>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(1)} className="border px-6 py-2 rounded">
                ← Previous
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
            <h3 className="font-semibold mb-4">Verification</h3>

            <div className="bg-gray-100 p-4 rounded text-sm">
              <pre>{JSON.stringify(formData, null, 2)}</pre>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(2)} className="border px-6 py-2 rounded">
                ← Previous
              </button>

              <button className="bg-blue-500 text-white px-6 py-2 rounded">
                Save Officer
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}