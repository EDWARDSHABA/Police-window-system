import React, { useState } from "react";
import StationHeader from "../Header/PoliceStationHeader";
import Footer from "../../officer/footer/footer";

export default function CreateOfficer() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
    batchNumber: "",
    policeName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log("Officer Data:", formData);
    alert("Officer Created Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <StationHeader />

      <div className="flex-1 p-6">
        {/* Header */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          CREATE OFFICER
        </button>

        {/* Card */}
        <div className="bg-white p-8 rounded shadow-md max-w-5xl mx-auto">
          
          {/* Stepper */}
          <div className="flex justify-center items-center mb-8 space-x-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold
                  ${step === s ? "bg-blue-500" : "bg-gray-300 text-black"}`}
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

          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h2 className="font-semibold mb-4">Personal Information</h2>

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="firstName"
                  placeholder="First Name *"
                  className="border p-2"
                  onChange={handleChange}
                />
                <input
                  name="lastName"
                  placeholder="Last Name *"
                  className="border p-2"
                  onChange={handleChange}
                />
                <input
                  name="email"
                  placeholder="Email Address *"
                  className="border p-2"
                  onChange={handleChange}
                />
                <input
                  name="phone"
                  placeholder="Phone Number *"
                  className="border p-2"
                  onChange={handleChange}
                />
              </div>

              <textarea
                name="address"
                placeholder="Residential Address *"
                className="border p-2 w-full mt-4"
                onChange={handleChange}
              />

              <div className="grid grid-cols-2 gap-4 mt-4">
                <input
                  type="date"
                  name="dob"
                  className="border p-2"
                  onChange={handleChange}
                />
                <input
                  name="gender"
                  placeholder="Gender"
                  className="border p-2"
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={nextStep}
                  className="bg-blue-500 text-white px-6 py-2 rounded"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <h2 className="font-semibold mb-4">Work Details</h2>

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="batchNumber"
                  placeholder="Batch Number *"
                  className="border p-2"
                  onChange={handleChange}
                />
                <input
                  name="policeName"
                  placeholder="Police Name *"
                  className="border p-2"
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={prevStep}
                  className="bg-gray-400 text-white px-6 py-2 rounded"
                >
                  Back
                </button>

                <button
                  onClick={nextStep}
                  className="bg-blue-500 text-white px-6 py-2 rounded"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <h2 className="font-semibold mb-4">Verification</h2>

              <p className="text-gray-600 mb-4">
                Review officer details before saving.
              </p>

              <div className="bg-gray-100 p-4 rounded text-sm">
                <pre>{JSON.stringify(formData, null, 2)}</pre>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={prevStep}
                  className="bg-gray-400 text-white px-6 py-2 rounded"
                >
                  Back
                </button>

                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-6 py-2 rounded"
                >
                  Save Officer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}