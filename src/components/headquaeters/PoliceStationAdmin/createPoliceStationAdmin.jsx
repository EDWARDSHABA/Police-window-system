import Header from "../Header/HeadQuartersHeader";
import Footer from "../../officer/footer/footer";

export default function CreatePoliceStationAdmin() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      
      <Header />

      {/* Content */}
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center mt-10">
          <h1 className="text-3xl font-bold text-red-700 mb-4">
            Create Police Station Admin
          </h1>
          <p className="text-gray-600 text-lg">
            Add and manage administrators for police stations.
          </p>
        </div>
      </div>
       <Footer/>
    </div>
  );
}