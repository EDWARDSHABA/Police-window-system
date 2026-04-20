import OfficerHeader from "../Header/OfficerHeader";
import Footer from "../footer/footer";

export default function UpdateCase() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <OfficerHeader />

      <div className="flex-1 flex items-center justify-center pt-16">
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center">
          <h1 className="text-3xl font-bold text-blue-300 mb-4">
            Update Case
          </h1>
          <p className="text-gray-600 text-lg">
            Modify case details, update status, and manage ongoing investigations.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}