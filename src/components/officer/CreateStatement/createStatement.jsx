import OfficerHeader from "../Header/header";
import Footer from "../footer/footer";

export default function CreateStatement() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <OfficerHeader />

      <div className="flex-1 flex items-center justify-center pt-16">
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center">
          <h1 className="text-3xl font-bold text-indigo-700 mb-4">
            Create Statement
          </h1>
          <p className="text-gray-600 text-lg">
            Record and manage official statements efficiently.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}