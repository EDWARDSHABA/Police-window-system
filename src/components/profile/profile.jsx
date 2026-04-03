import CommonHeader from "../commonheader/commonHeader";
import Footer from "../officer/footer/footer";

export default function Profile() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <CommonHeader/>
    

      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-xl">

          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-white">
            O
          </div>

          <h1 className="text-3xl font-bold text-purple-700 mb-2">
            Officer Profile
          </h1>

          <p className="text-gray-600 mb-4">
            View and manage your account details.
          </p>

          <div className="text-left space-y-2">
            <p><b>Name:</b> Edward Young Shaba</p>
            <p><b>Role:</b> HQ Officer Admin</p>
            <p><b>Station:</b> Zomba Police HQ</p>
            <p><b>Email:</b> edward@example.com</p>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}