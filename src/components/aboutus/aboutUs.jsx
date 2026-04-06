import React, { useState } from "react";
import CommonHeader from "../commonheader/commonHeader";
import Footer from "../officer/footer/footer";
import { sendEmail } from "./aboutUsApi";

import member1 from "../../assets/images/member1.jpg";
import member2 from "../../assets/images/member2.jpeg";
import member3 from "../../assets/images/member3.jpeg";
import member4 from "../../assets/images/member4.jpeg";

export default function AboutUs() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  //send email
  const handleSendEmail = async () => {
    if (!selectedMember || !message) {
      alert("Please fill message first");
      return;
    }

    try {
      setLoading(true);

      await sendEmail({
        email: selectedMember.email,
        name: selectedMember.name,
        subject,
        message,
      });

      alert("Email sent successfully!");

      setMessage("");
      setSubject("");
      setSelectedMember(null);

    } catch (error) {
      console.error(error);
      alert("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  const createWhatsAppLink = (phone, name) => {
    const msg = `Hello ${name}, I am contacting you about the Police Window System.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  const team = [
    {
      name: "Edward Young Shaba",
      role: "Full Stack Developer",
      email: "edwardyoungshaba133@gmail.com",
      phone: "265885927420",
      image: member2,
    },
    {
      name: "Kelvin Dalot",
      role: "Frontend Developer",
      email: "kelvindalot@gmail.com",
      phone: "265997631984",
      image: member4,
    },
    {
      name: "Achina Chisale",
      role: "Backend Developer",
      email: "achinachisale@gmail.com",
      phone: "265777000000",
      image: member3,
    },
    {
      name: "Martha Sawasawa",
      role: "UI/UX Designer",
      email: "martha@gmail.com",
      phone: "265666000000",
      image: member1,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <CommonHeader />

      {/* team members */}
      <div className="flex-1 px-6 pt-24 pb-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-700">About Us</h1>
          <p className="text-gray-600 mt-2">
            Meet the team behind the Police Window System
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div key={index} className="bg-white shadow-lg rounded-2xl p-5 text-center">

              <img
                src={member.image}
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              />

              <h2 className="text-lg font-bold">{member.name}</h2>
              <p className="text-sm text-blue-500 mb-3">{member.role}</p>

              <button
                onClick={() => setSelectedMember(member)}
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                📧 Send Email
              </button>

              <a
                href={createWhatsAppLink(member.phone, member.name)}
                target="_blank"
                rel="noreferrer"
                className="block text-sm text-green-600 mt-2"
              >
                💬 WhatsApp
              </a>

            </div>
          ))}
        </div>
      </div>

      {/* email modal*/}
      {selectedMember && (
        <div className="fixed inset-0 bg-gray-100 z-50 flex flex-col">

          {/* header */}
          <div className="bg-gray-600 text-white px-6 py-4 flex justify-between items-center shadow">
            <h2 className="text-lg font-bold">
              Compose Email → {selectedMember.name}
            </h2>

            <button
              onClick={() => setSelectedMember(null)}
              className="text-xl"
            >
              ✕
            </button>
          </div>

          {/* body */}
          <div className="flex-1 flex justify-center p-6">

            <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 flex flex-col">

              {/* to */}
              <div className="mb-3">
                <label className="text-sm text-gray-500">To</label>
                <div className="border p-2 rounded bg-gray-50">
                  {selectedMember.email}
                </div>
              </div>

              {/* subject */}
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="border p-2 rounded mb-3 focus:ring-2 focus:ring-green-500"
              />

              {/* message */}
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                className="border p-3 rounded h-60 resize-none focus:ring-2 focus:ring-green-500"
              />

              {/* buttons */}
              <div className="flex justify-between mt-6">

                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-red-600 font-semibold"
                >
                  Discard
                </button>

                <button
                  onClick={handleSendEmail}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                  {loading ? "Sending..." : "Send Email"}
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}