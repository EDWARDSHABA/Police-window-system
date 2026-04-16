import StationHeader from "../Header/PoliceStationHeader";
import Footer from "../../officer/footer/footer";

export default function ManageOfficers() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <StationHeader/>
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center">
        <h1 className="text-3xl font-bold text-indigo-800 mb-4">
         Manage Officers
        </h1>
        <p className="text-gray-600 text-lg">
          manage officers, assign cases, and track their performance. Stay organized and ensure efficient case handling with our comprehensive officer management system.
        </p>
      </div>
       <Footer/>
    </div>
  );
}
