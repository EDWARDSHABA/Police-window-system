import React, { useState, useEffect, useRef } from "react";
import Header from "../Header/OfficerHeader";
import Footer from "../footer/footer";

const RegisterCase = () => {
  const [step, setStep] = useState(1);
  const topRef = useRef(null);

  const [formData, setFormData] = useState({
    caseId: "CASE-" + Date.now(),
    date: "",
    location: "",
    crimeType: "",
    description: "",
    notes: "",
    evidence: null,
    fileName: "",
  });

  const [preview, setPreview] = useState(null);

  // 🔥 AUTO SCROLL TO TOP ON STEP CHANGE
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [step]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        evidence: reader.result,
        fileName: file.name,
      });

      if (file.type.startsWith("image/")) {
        setPreview(reader.result);
      } else {
        setPreview(null);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const existing =
      JSON.parse(localStorage.getItem("cases")) || [];

    existing.push(formData);
    localStorage.setItem("cases", JSON.stringify(existing));

    alert("✅ Case Registered Successfully");
    setStep(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <Header />

      {/* MAIN CONTENT */}
      <div className="flex-1 pt-20 px-6 pb-6 flex flex-col">

        {/* TOP REF FOR SCROLL */}
        <div ref={topRef}></div>

        {/* HEADER */}
        <div className="bg-white shadow p-4 rounded mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Register New Case
          </h2>

          {/* 🔵 STEP INDICATOR */}
          <div className="flex items-center gap-2 mt-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-3 h-3 rounded-full ${
                  step >= s ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* CONTENT BOX */}
        <div className="flex-1 bg-white shadow rounded p-4 flex flex-col">

          {/* SCROLLABLE CONTENT */}
          <div className="flex-1 overflow-y-auto pr-2 pb-6">

            {/* STEP 1 */}
            {step === 1 && (
              <div className="grid md:grid-cols-2 gap-4">

                <input
                  value={formData.caseId}
                  disabled
                  className="p-3 border rounded bg-gray-200"
                />

                <input
                  type="date"
                  name="date"
                  onChange={handleChange}
                  className="p-3 border rounded"
                />

                <input
                  name="location"
                  placeholder="Location"
                  onChange={handleChange}
                  className="p-3 border rounded md:col-span-2"
                />

                <select
                  name="crimeType"
                  onChange={handleChange}
                  className="p-3 border rounded md:col-span-2"
                >
                  <option>Select Crime</option>
                  <option>Robbery</option>
                  <option>Assault</option>
                  <option>Fraud</option>
                </select>

              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <h4 className="font-semibold mb-2">Victim</h4>
                  <input className="w-full p-2 border rounded mb-2" placeholder="Full Name" />
                  <input className="w-full p-2 border rounded mb-2" placeholder="Gender" />
                  <input className="w-full p-2 border rounded mb-2" placeholder="Contact" />
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Suspect</h4>
                  <input className="w-full p-2 border rounded mb-2" placeholder="Full Name" />
                  <input className="w-full p-2 border rounded mb-2" placeholder="Gender" />
                  <input className="w-full p-2 border rounded mb-2" placeholder="Contact" />
                </div>

              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-4">

                <textarea
                  name="description"
                  onChange={handleChange}
                  className="w-full p-3 border rounded h-28"
                  placeholder="Incident Description"
                />

                <div>
                  <label className="block mb-1 font-medium">
                    Upload Evidence
                  </label>

                  <input
                    type="file"
                    onChange={handleFile}
                    className="w-full border p-2 rounded"
                  />

                  {formData.fileName && (
                    <p className="text-sm text-gray-600 mt-1">
                      📄 {formData.fileName}
                    </p>
                  )}

                  {preview && (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-32 mt-2 rounded border"
                    />
                  )}
                </div>

                <textarea
                  name="notes"
                  onChange={handleChange}
                  className="w-full p-3 border rounded h-20"
                  placeholder="Additional Notes"
                />

              </div>
            )}

          </div>

          {/* 🔥 STICKY ACTION BAR */}
          <div className="flex justify-between border-t pt-3 bg-white sticky bottom-0">

            <button
              onClick={prevStep}
              disabled={step === 1}
              className="bg-gray-400 text-white px-5 py-2 rounded disabled:opacity-50"
            >
              Back
            </button>

            {step < 3 ? (
              <button
                onClick={nextStep}
                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
              >
                Submit ✔
              </button>
            )}

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegisterCase;