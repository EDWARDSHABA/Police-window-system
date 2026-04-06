import StationHeader from "../Header/PoliceStationHeader";
import Footer from "../../officer/footer/footer";

export default function CreateOfficer() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

     <StationHeader/>

      <div className="bg-white shadow-xl rounded-2xl p-10 text-center">
        <h1 className="text-3xl font-bold text-cyan-700 mb-4">
          Create Officer
        </h1>
        <p className="text-gray-600 text-lg">
          Add and manage police officer profiles in the system.
        </p>
      </div>
       <Footer/>
    </div>
  );
}
