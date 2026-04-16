// ONLY CHANGE: ensure latest storage is used safely

const handleSave = () => {
  const savedOfficers = getStoredOfficers() || [];

  const officerId =
    formData.batchNumber.trim() ||
    `MW-${Date.now().toString().slice(-8)}`;

  const newOfficer = {
    id: officerId,
    name: `${formData.firstName} ${formData.lastName}`.trim(),
    rank: formData.position,
    active: true,
    email: formData.email,
    phone: formData.phone,
    address: formData.address,
    dob: formData.dob,
    gender: formData.gender,
    department: formData.department,
    policeName: formData.policeName,
    joiningDate: formData.joiningDate,
  };

  // Save new officer at top
  saveOfficers([newOfficer, ...savedOfficers]);

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