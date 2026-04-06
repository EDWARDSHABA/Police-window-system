import StationHeader from "../Header/PoliceStationHeader";
import Footer from "../../officer/footer/footer";

export default function TrackCases() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <StationHeader/>
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center">
        <h1 className="text-3xl font-bold text-indigo-800 mb-4">
          Track Cases
        </h1>
        <p className="text-gray-600 text-lg">
          Monitor case progress, status updates, and investigation timelines.
        </p>
      </div>
       <Footer/>
    </div>
  );
}
