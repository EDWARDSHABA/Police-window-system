import Header from "../headquaeters/Header/header";
import Footer from "../officer/footer/footer";

export default function Profile() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Header/>
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-xl">
        
        {/* Profile Avatar */}
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-white">
          
        </div>

        {/* Name */}
        <h1 className="text-3xl font-bold text-purple-700 mb-2">
          Officer Profile
        </h1>

        <p className="text-gray-600 text-lg mb-4">
          View and manage your personal information, account details, and assigned responsibilities.
        </p>

        <div className="text-left mt-6 space-y-2">
          <p><span className="font-semibold">Name:</span> Edward young shaba</p>
          <p><span className="font-semibold">Role:</span> HeadQuarters officer admin</p>
          <p><span className="font-semibold">Station:</span>Zomba police HeadQuarters</p>
          <p><span className="font-semibold">Email:</span> edwardyoungshaba@gmail.com</p>
        </div>

      </div>
       <Footer/>
    </div>
  );
}