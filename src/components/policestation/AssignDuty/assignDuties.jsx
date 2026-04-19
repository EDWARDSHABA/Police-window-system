import { useState, useMemo } from "react";

const OFFICERS = [
  { id: "1. MW-ZA-22-090-24", name: "Sgt. Victor Max", email: "victor.max@police.gov", phone: "+265123456789" },
  { id: "2. MW-ZA-22-088-24", name: "Sgt. Umi Sri Nko", email: "umi.sri@police.gov", phone: "+265123456790" },
  { id: "3. MW-ZA-23-085-24", name: "Sgt. Camara Shaney", email: "camara.shaney@police.gov", phone: "+265123456791" },
  { id: "4. MW-ZA-23-089-25", name: "Sgt. Victor Max", email: "victor.max2@police.gov", phone: "+265123456792" },
  { id: "5. MW-ZA-23-327-26", name: "Sgt. Daniel Choate", email: "daniel.choate@police.gov", phone: "+265123456793" },
  { id: "6. MW-ZA-23-688-54", name: "Sgt. Martha Sawa", email: "martha.sawa@police.gov", phone: "+265123456794" },
  { id: "7. MW-ZA-23-048-04", name: "Sgt. Rahimi Mao", email: "rahimi.mao@police.gov", phone: "+265123456795" },
  { id: "8. MW-ZA-23-107-26", name: "Sgt. Tebid Nkunu", email: "tebid.nkunu@police.gov", phone: "+265123456796" },
  { id: "9. MW-ZA-23-880-23", name: "Sgt. Victor Max", email: "victor.max3@police.gov", phone: "+265123456797" },
  { id: "10. MW-KW-23-448-23", name: "Sgt. Sharon Milo", email: "sharon.milo@police.gov", phone: "+265123456798" },
  { id: "11. MW-ZA-23-100-24", name: "Sgt. Victor Max", email: "victor.max4@police.gov", phone: "+265123456799" },
  { id: "12. MW-ZA-23-184-04", name: "Sgt. Edmund Blowers", email: "edmund.blowers@police.gov", phone: "+265123456800" },
  { id: "13. MW-ZA-23-284-24", name: "Sgt. Victor Max", email: "victor.max5@police.gov", phone: "+265123456801" },
  { id: "14. MW-ZA-23-184-04", name: "Sgt. Edmund Blowers", email: "edmund.blowers2@police.gov", phone: "+265123456802" },
  { id: "15. MW-ZA-23-284-15", name: "Sgt. Victor Max", email: "victor.max6@police.gov", phone: "+265123456803" },
  { id: "16. MW-ZA-23-688-22", name: "Sgt. Samuel Choate", email: "samuel.choate@police.gov", phone: "+265123456804" },
  { id: "17. MW-ZA-22-088-16", name: "Sgt. Martha Sawa", email: "martha.sawa2@police.gov", phone: "+265123456805" },
];

const LOCATIONS = [
  "Central Station",
  "North Precinct",
  "South Precinct",
  "East Zone",
  "West Zone",
  "Checkpoint A",
  "Checkpoint B",
  "Court Escort",
];

const DUTY_TYPES = [
  "Patrol",
  "Traffic Control",
  "Investigations",
  "Community Policing",
  "Custody",
  "Administrative",
  "Training",
  "Emergency Response",
];

const SHIFTS = ["All Shifts", "Day", "Evening", "Night"];

const NOTIFICATION_METHODS = ["Email", "SMS", "Both"];

// Email sending function - Replace with your actual email API
const sendActualEmail = async (to, subject, body) => {
  // Option 1: Using EmailJS (free tier available)
  // First, sign up at https://www.emailjs.com/ and get your service ID, template ID, and user ID
  
  const emailData = {
    service_id: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
    template_id: 'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
    user_id: 'YOUR_USER_ID', // Replace with your EmailJS user ID
    template_params: {
      to_email: to,
      subject: subject,
      message: body,
    }
  };
  
  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });
    return response.ok;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
  
  // Option 2: Using your own backend API
  /*
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, body })
    });
    return response.ok;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
  */
};

// SMS sending function - Replace with your actual SMS API
const sendActualSMS = async (phoneNumber, message) => {
  // Option 1: Using Twilio
  // First, set up Twilio account and get your credentials
  
  const smsData = {
    to: phoneNumber,
    message: message,
    // Add your Twilio credentials
    accountSid: 'YOUR_TWILIO_ACCOUNT_SID',
    authToken: 'YOUR_TWILIO_AUTH_TOKEN',
    fromNumber: 'YOUR_TWILIO_PHONE_NUMBER'
  };
  
  try {
    const response = await fetch('/api/send-sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(smsData)
    });
    return response.ok;
  } catch (error) {
    console.error('SMS sending failed:', error);
    return false;
  }
  
  // Option 2: Using Africa's Talking (great for African countries)
  /*
  try {
    const response = await fetch('/api/send-sms-africastalking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: phoneNumber,
        message: message,
        username: 'YOUR_USERNAME',
        apiKey: 'YOUR_API_KEY'
      })
    });
    return response.ok;
  } catch (error) {
    console.error('SMS sending failed:', error);
    return false;
  }
  */
};

export default function AssignDuties() {
  const [week] = useState("April 10 - April 17, 2026");
  const [specifyTime, setSpecifyTime] = useState("");
  const [shift, setShift] = useState("All Shifts");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(new Set());
  const [location, setLocation] = useState("");
  const [dutyType, setDutyType] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [notificationMethod, setNotificationMethod] = useState("Email");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
  const [notifyAdmin, setNotifyAdmin] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState({ show: false, message: "", type: "" });

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return OFFICERS.filter(
      (o) =>
        !q || o.name.toLowerCase().includes(q) || o.id.toLowerCase().includes(q)
    );
  }, [search]);

  const toggleOfficer = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setSubmitted(false);
    setError("");
    setNotificationStatus({ show: false, message: "", type: "" });
  };

  const toggleAll = (e) => {
    if (e.target.checked) {
      setSelected(new Set(filtered.map((o) => o.id)));
    } else {
      setSelected(new Set());
    }
  };

  const allChecked =
    filtered.length > 0 && filtered.every((o) => selected.has(o.id));

  // Function to send notifications to officers
  const sendOfficerNotifications = async (selectedOfficers, dutyDetails) => {
    const notifications = [];
    
    for (const officer of selectedOfficers) {
      if (notificationMethod === "Email" || notificationMethod === "Both") {
        const emailSubject = `Duty Assignment - ${dutyDetails.dutyType}`;
        const emailBody = `
Dear ${officer.name},

You have been assigned to the following duty:

Duty Type: ${dutyDetails.dutyType}
Location: ${dutyDetails.location}
Date: ${dutyDetails.week}
Time: ${dutyDetails.specifyTime || "Regular shift"}
Shift: ${dutyDetails.shift}
Task: ${dutyDetails.taskDescription || "No additional details"}

Please report to your assigned location on time.

Regards,
Police Administration
        `;
        
        const emailResult = await sendActualEmail(officer.email, emailSubject, emailBody);
        notifications.push({ 
          recipient: officer.name, 
          method: "Email", 
          address: officer.email,
          success: emailResult 
        });
        
        console.log(`Email ${emailResult ? 'sent' : 'failed'} to ${officer.email}`);
      }
      
      if (notificationMethod === "SMS" || notificationMethod === "Both") {
        const smsMessage = `DUTY ALERT: ${officer.name}, you are assigned to ${dutyDetails.dutyType} at ${dutyDetails.location} on ${dutyDetails.week}. Report as directed.`;
        
        const smsResult = await sendActualSMS(officer.phone, smsMessage);
        notifications.push({ 
          recipient: officer.name, 
          method: "SMS", 
          address: officer.phone,
          success: smsResult 
        });
        
        console.log(`SMS ${smsResult ? 'sent' : 'failed'} to ${officer.phone}`);
      }
    }
    
    return notifications;
  };

  // Function to send notifications to admin
  const sendAdminNotifications = async (dutyDetails, selectedOfficers) => {
    const adminNotifications = [];
    
    if (notifyAdmin) {
      const officerList = selectedOfficers.map(o => `${o.name} (${o.id})`).join('\n');
      
      // Send email to admin if provided
      if (adminEmail && (notificationMethod === "Email" || notificationMethod === "Both")) {
        const adminEmailSubject = `Duty Assignment Summary - ${dutyDetails.week}`;
        const adminEmailBody = `
Duty Assignment Summary:

Date: ${dutyDetails.week}
Time: ${dutyDetails.specifyTime || "Regular shift"}
Shift: ${dutyDetails.shift}
Duty Type: ${dutyDetails.dutyType}
Location: ${dutyDetails.location}
Task Description: ${dutyDetails.taskDescription || "No additional details"}

Assigned Officers:
${officerList}

Total Officers Assigned: ${selectedOfficers.length}

This is an automated notification from the Police Duty Assignment System.
        `;
        
        const emailResult = await sendActualEmail(adminEmail, adminEmailSubject, adminEmailBody);
        adminNotifications.push({
          recipient: "Admin",
          method: "Email",
          address: adminEmail,
          success: emailResult
        });
        
        console.log(`Admin email ${emailResult ? 'sent' : 'failed'} to ${adminEmail}`);
      }
      
      // Send SMS to admin if provided
      if (adminPhone && (notificationMethod === "SMS" || notificationMethod === "Both")) {
        const adminSMSMessage = `DUTY SUMMARY: ${selectedOfficers.length} officers assigned to ${dutyDetails.dutyType} at ${dutyDetails.location} on ${dutyDetails.week}. Check email for details.`;
        
        const smsResult = await sendActualSMS(adminPhone, adminSMSMessage);
        adminNotifications.push({
          recipient: "Admin",
          method: "SMS",
          address: adminPhone,
          success: smsResult
        });
        
        console.log(`Admin SMS ${smsResult ? 'sent' : 'failed'} to ${adminPhone}`);
      }
    }
    
    return adminNotifications;
  };

  const handleSubmit = async () => {
    // Validation
    if (selected.size === 0) {
      setError("Please select at least one officer.");
      return;
    }
    if (!location) {
      setError("Please select a location.");
      return;
    }
    if (!dutyType) {
      setError("Please select a duty type.");
      return;
    }
    
    // Validate admin contact info if notify admin is checked
    if (notifyAdmin) {
      if ((notificationMethod === "Email" || notificationMethod === "Both") && !adminEmail) {
        setError("Please enter admin email address for email notifications.");
        return;
      }
      if ((notificationMethod === "SMS" || notificationMethod === "Both") && !adminPhone) {
        setError("Please enter admin phone number for SMS notifications.");
        return;
      }
    }
    
    setError("");
    
    // Get selected officers' details
    const selectedOfficers = OFFICERS.filter(o => selected.has(o.id));
    
    // Prepare duty details for notification
    const dutyDetails = {
      dutyType,
      location,
      week,
      specifyTime: specifyTime || "Regular shift",
      shift: shift === "All Shifts" ? "Regular shift" : shift,
      taskDescription: taskDescription || "No additional details"
    };
    
    // Send notifications
    setNotificationStatus({ show: true, message: "Sending notifications to officers...", type: "info" });
    
    try {
      // Send notifications to officers
      const officerNotifications = await sendOfficerNotifications(selectedOfficers, dutyDetails);
      
      setNotificationStatus({ show: true, message: "Sending admin notifications...", type: "info" });
      
      // Send notifications to admin
      const adminNotifications = await sendAdminNotifications(dutyDetails, selectedOfficers);
      
      const allNotifications = [...officerNotifications, ...adminNotifications];
      const successful = allNotifications.filter(n => n.success).length;
      const total = allNotifications.length;
      
      // Prepare detailed message
      let statusMessage = "";
      if (successful === total) {
        statusMessage = `✅ All notifications sent successfully! (${total} notifications sent)`;
      } else if (successful > 0) {
        statusMessage = `⚠️ ${successful} out of ${total} notifications sent successfully. Check console for details.`;
      } else {
        statusMessage = `❌ Failed to send notifications. Please check your API configuration and try again.`;
      }
      
      // Add summary of sent notifications
      const officerEmailCount = officerNotifications.filter(n => n.method === "Email" && n.success).length;
      const officerSMSCount = officerNotifications.filter(n => n.method === "SMS" && n.success).length;
      const adminEmailCount = adminNotifications.filter(n => n.method === "Email" && n.success).length;
      const adminSMSCount = adminNotifications.filter(n => n.method === "SMS" && n.success).length;
      
      if (successful > 0) {
        statusMessage += `\n\nSummary:\n- Officer Emails: ${officerEmailCount}\n- Officer SMS: ${officerSMSCount}\n- Admin Emails: ${adminEmailCount}\n- Admin SMS: ${adminSMSCount}`;
      }
      
      setNotificationStatus({ 
        show: true, 
        message: statusMessage, 
        type: successful === total ? "success" : successful > 0 ? "warning" : "error" 
      });
    } catch (error) {
      console.error("Notification error:", error);
      setNotificationStatus({ 
        show: true, 
        message: "❌ Failed to send notifications. Please check your internet connection and API configuration.", 
        type: "error" 
      });
    }
    
    setSubmitted(true);
    setSelected(new Set());
    setLocation("");
    setDutyType("");
    setTaskDescription("");
    setAdminEmail("");
    setAdminPhone("");
    setNotifyAdmin(false);
    
    // Auto-hide notification after 8 seconds
    setTimeout(() => {
      setNotificationStatus({ show: false, message: "", type: "" });
    }, 8000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      {/* Page Title */}
      <div className="mb-4">
        <h1 className="text-base font-semibold text-gray-800">Assign Duties</h1>
      </div>

      <div className="flex gap-4 items-start">
        {/* LEFT COLUMN */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">

          {/* Filters Row */}
          <div className="bg-white border border-gray-200 rounded p-3">
            <div className="flex flex-wrap gap-3 items-end">
              {/* Select Week */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Select Week</label>
                <div className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1 text-xs text-gray-700 bg-white">
                  <svg className="w-3 h-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                    <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
                    <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
                    <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
                  </svg>
                  <span>{week}</span>
                </div>
              </div>

              {/* Specify Time */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Specify Time</label>
                <input
                  type="text"
                  value={specifyTime}
                  onChange={(e) => setSpecifyTime(e.target.value)}
                  placeholder="e.g., 08:00 - 17:00"
                  className="border border-gray-300 rounded px-2 py-1 text-xs w-32 outline-none focus:border-blue-400"
                />
              </div>

              {/* Select Shift */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Select Shift</label>
                <select
                  value={shift}
                  onChange={(e) => setShift(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-xs w-28 outline-none focus:border-blue-400 bg-white"
                >
                  {SHIFTS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Search Officer */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 opacity-0">s</label>
                <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Officer"
                    className="px-2 py-1 text-xs outline-none w-32"
                  />
                  <button className="px-2 py-1 bg-gray-100 border-l border-gray-300 hover:bg-gray-200 transition-colors">
                    <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                      <path d="M21 21l-4.35-4.35" strokeWidth="2"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Status Banner */}
          {notificationStatus.show && (
            <div className={`rounded p-3 text-sm whitespace-pre-line ${
              notificationStatus.type === "success" ? "bg-green-100 text-green-800 border border-green-200" :
              notificationStatus.type === "warning" ? "bg-yellow-100 text-yellow-800 border border-yellow-200" :
              notificationStatus.type === "error" ? "bg-red-100 text-red-800 border border-red-200" :
              "bg-blue-100 text-blue-800 border border-blue-200"
            }`}>
              {notificationStatus.message}
            </div>
          )}

          {/* Officer Table */}
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <table className="w-full text-xs" style={{ tableLayout: "fixed" }}>
              <colgroup>
                <col style={{ width: "180px" }} />
                <col style={{ width: "auto" }} />
                <col style={{ width: "60px" }} />
              </colgroup>
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-3 py-2 font-medium text-gray-600">Police ID</th>
                  <th className="text-left px-3 py-2 font-medium text-gray-600">Officer</th>
                  <th className="text-left px-3 py-2 font-medium text-gray-600">
                    <div className="flex items-center gap-1">
                      <span>Action</span>
                      <input
                        type="checkbox"
                        checked={allChecked}
                        onChange={toggleAll}
                        className="ml-1 accent-blue-600 cursor-pointer"
                        title="Select all"
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((officer) => (
                  <tr
                    key={officer.id}
                    className={`border-b border-gray-100 cursor-pointer transition-colors ${
                      selected.has(officer.id)
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => toggleOfficer(officer.id)}
                  >
                    <td className="px-3 py-1.5 text-gray-500 truncate">{officer.id}</td>
                    <td className="px-3 py-1.5 text-gray-700">{officer.name}</td>
                    <td className="px-3 py-1.5">
                      <input
                        type="checkbox"
                        checked={selected.has(officer.id)}
                        onChange={() => toggleOfficer(officer.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="accent-blue-600 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Duty Details Bottom */}
          <div className="bg-white border border-gray-200 rounded p-3">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Duty Type</label>
                <div className="border border-gray-300 rounded px-2 py-2 text-xs text-gray-400 min-h-[36px]">
                  {dutyType || ""}
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Location</label>
                <div className="border border-gray-300 rounded px-2 py-2 text-xs text-gray-400 min-h-[36px]">
                  {location || ""}
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-xs text-gray-500 mb-1">Task Description</label>
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:border-blue-400 resize-none"
                placeholder="Enter specific task details..."
              />
            </div>
            {error && (
              <p className="text-xs text-red-500 mb-2">{error}</p>
            )}
            {submitted && (
              <p className="text-xs text-green-600 mb-2">
                Duties submitted successfully.
              </p>
            )}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-5 py-2 rounded transition-colors"
              >
                Submit Duties
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-64 flex flex-col gap-3 shrink-0">

          {/* View Assigned Duties */}
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 px-3 rounded transition-colors text-center">
            View Assigned Duties
          </button>

          {/* Selected Officers Card */}
          <div className="bg-white border border-gray-200 rounded p-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-600 font-medium">Selected Officers</span>
              <span className="bg-blue-500 text-white text-xs font-semibold w-6 h-6 rounded-full flex items-center justify-center">
                {selected.size}
              </span>
            </div>

            {/* Select Location */}
            <div className="mb-2">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:border-blue-400 bg-white text-gray-600"
              >
                <option value="">Select Location</option>
                {LOCATIONS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>

            {/* Select Duty Type */}
            <div className="mb-3">
              <select
                value={dutyType}
                onChange={(e) => setDutyType(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:border-blue-400 bg-white text-gray-600"
              >
                <option value="">Select Duty Type</option>
                {DUTY_TYPES.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Notification Method Selection */}
            <div className="mb-3">
              <label className="block text-xs text-gray-500 mb-1">Notify Officers Via</label>
              <select
                value={notificationMethod}
                onChange={(e) => setNotificationMethod(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:border-blue-400 bg-white text-gray-600"
              >
                {NOTIFICATION_METHODS.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Notify Admin Toggle */}
            <div className="mb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyAdmin}
                  onChange={(e) => setNotifyAdmin(e.target.checked)}
                  className="accent-blue-600"
                />
                <span className="text-xs text-gray-700">Notify Admin</span>
              </label>
            </div>

            {/* Admin Contact Fields - Show only if notify admin is checked */}
            {notifyAdmin && (
              <div className="space-y-2 mb-3 border-t border-gray-100 pt-3">
                {(notificationMethod === "Email" || notificationMethod === "Both") && (
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Admin Email</label>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="admin@police.gov"
                      className="w-full border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:border-blue-400"
                    />
                  </div>
                )}
                
                {(notificationMethod === "SMS" || notificationMethod === "Both") && (
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Admin Phone</label>
                    <input
                      type="tel"
                      value={adminPhone}
                      onChange={(e) => setAdminPhone(e.target.value)}
                      placeholder="+265123456789"
                      className="w-full border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:border-blue-400"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Hint text */}
            <p className="text-xs text-gray-400 leading-relaxed">
              {notifyAdmin 
                ? "Officers and admin will be notified immediately upon assignment via your selected method."
                : "Officers will be notified immediately upon assignment via your selected method."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}