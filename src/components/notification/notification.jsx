import CommonHeader from "../commonheader/commonHeader";
import Footer from "../officer/footer/footer";

export default function Notification() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <CommonHeader/>

      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center">

          <h1 className="text-3xl font-bold text-blue-700 mb-4">
            Notifications
          </h1>

          <p className="text-gray-600 text-lg">
            Stay updated with alerts, messages, and system updates.
          </p>

        </div>
      </div>

      <Footer />
    </div>
  );
}