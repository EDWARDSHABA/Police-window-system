import Header from "../Header/HeadQuartersHeader";
import Footer from "../../officer/footer/footer";

export default function ManageAccounts() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Header */}
      <Header />

      {/* Content */}
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center mt-10">
          <h1 className="text-3xl font-bold text-purple-700 mb-4">
            Manage Accounts
          </h1>
          <p className="text-gray-600 text-lg">
            Create, update, and manage user accounts within the system.
          </p>
        </div>
      </div>
       <Footer/>
    </div>
  );
}