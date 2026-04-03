import React, { useState } from "react";
import CommonHeader from "../commonheader/commonHeader";
import Footer from "../officer/footer/footer";
import { sendEmail } from "./aboutUsApi";

import member1 from "../../assets/images/member1.jpg";
import member2 from "../../assets/images/member2.jpg";
import member3 from "../../assets/images/member3.jpg";
import member4 from "../../assets/images/member4.jpg";

export default function AboutUs() {

  const [selectedMember, setSelectedMember] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSendEmail = async () => {
    if (!selectedMember || !message) return;

    try {
      setLoading(true);

      await sendEmail({
        email: selectedMember.email,
        name: selectedMember.name,
        message: message,
      });

      alert("Email sent successfully!");

      setMessage("");
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

      <div className="flex-1 px-6 pt-24 pb-10">

        {/* title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-700">About Us</h1>
          <p className="text-gray-600 mt-2">
            Meet the team behind the Police Window System
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-5 text-center"
            >

              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              />

              <h2 className="text-lg font-bold">{member.name}</h2>
              <p className="text-sm text-blue-500 mb-3">{member.role}</p>

            
              <button
                onClick={() => setSelectedMember(member)}
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                📧 {member.email}
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

      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-lg w-96">

            <h2 className="text-lg font-bold mb-2">
              Send Email to {selectedMember.name}
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              {selectedMember.email}
            </p>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
              className="w-full border p-2 rounded h-32 mb-4"
            />

            <div className="flex justify-between">

              <button
                onClick={() => setSelectedMember(null)}
                className="text-red-500"
              >
                Cancel
              </button>

              <button
                onClick={handleSendEmail}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                {loading ? "Sending..." : "Send"}
              </button>

            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}