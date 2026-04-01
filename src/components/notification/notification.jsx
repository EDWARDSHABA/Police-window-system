import Header from "../headquaeters/Header/header";
import Footer from "../officer/footer/footer";

export default function Notification() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

     <Header/>

      <div className="bg-white shadow-xl rounded-2xl p-10 text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Notifications
        </h1>
        <p className="text-gray-600 text-lg">
          Stay updated with the latest alerts, messages, and important system updates.
        </p>
      </div>
        <Footer/>
    </div>
  );
}