import React, { useEffect, useState } from "react";
import CommonHeader from "../commonheader/commonHeader";
import Footer from "../officer/footer/footer";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const mockData = [
    {
      _id: "1",
      title: "New Case Assigned",
      message: "Officer John has been assigned to a new robbery case.",
      read: false,
      createdAt: new Date(),
    },
    {
      _id: "2",
      title: "System Update",
      message: "Police Window System has been updated successfully.",
      read: true,
      createdAt: new Date(),
    },
    {
      _id: "3",
      title: "Message Received",
      message: "You received a new message from Headquarters.",
      read: false,
      createdAt: new Date(),
    },
  ];

  const loadNotifications = () => {
    setLoading(true);

    setTimeout(() => {
      setNotifications(mockData);
      setLoading(false);
    }, 800); // simulate API delay
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const deleteNotification = (id) => {
    const filtered = notifications.filter((n) => n._id !== id);
    setNotifications(filtered);
  }

  const markAsRead = (id) => {
    const updated = notifications.map((n) =>
      n._id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <CommonHeader />

      <div className="flex-1 px-6 pt-24 pb-10">

        {/* header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">
            Notifications
          </h1>

          <button
            onClick={loadNotifications}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="text-center text-gray-500">
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-xl shadow text-gray-500">
            No notifications available
          </div>
        ) : (
          <div className="space-y-4">

            {notifications.map((note) => (
              <div
                key={note._id}
                className={`bg-white shadow-md rounded-xl p-4 flex justify-between items-start border-l-4 ${
                  note.read ? "border-gray-300" : "border-blue-500"
                }`}
              >

                {/* content */}
                <div className="flex-1">

                  <h2 className="font-semibold text-gray-800">
                    {note.title}
                  </h2>

                  <p className="text-gray-600 text-sm mt-1">
                    {note.message}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    {note.createdAt.toLocaleString()}
                  </p>

                  {/* buttons */}
                  <div className="flex gap-3 mt-3">

                    {!note.read && (
                      <button
                        onClick={() => markAsRead(note._id)}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Mark as read
                      </button>
                    )}

                    <button
                      onClick={() => deleteNotification(note._id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Delete
                    </button>

                  </div>

                </div>

                
                <div>
                  {!note.read && (
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                      New
                    </span>
                  )}
                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}