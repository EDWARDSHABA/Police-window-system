import Header from "../Header/header";
import Footer from "../../officer/footer/footer";

export default function PoliceStation() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <Header />

      <div className="flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center mt-10">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">
            Welcome to the Police Station Page
          </h1>
          <p className="text-gray-600 text-lg">
            We are here to serve and protect the community.
          </p>
        </div>
      </div>
       <Footer/>
    </div>
  );
}