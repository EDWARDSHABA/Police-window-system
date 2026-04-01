import Header from "../headquaeters/Header/header";
import Footer from "../officer/footer/footer";

export default function AboutUs() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

     <Header/>

      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-xl">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          About Us
        </h1>
        <p className="text-gray-600 text-lg">
          We are committed to improving efficiency and coordination within the police system. 
          Our platform helps manage duties, track activities, and enhance communication 
          between headquarters and officers.
        </p>
      </div>
        <Footer/>
    </div>
  );
}