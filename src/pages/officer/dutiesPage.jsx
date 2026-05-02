import OfficerHeader from "../../components/officer/Header/OfficerHeader";
import Footer from "../../components/officer/footer/footer";
import Duties from "../../components/officer/Duties/duties";

function DutiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <OfficerHeader />
      <main className="flex-1 overflow-y-auto pt-24">
        <div className="min-h-[calc(100vh-6rem)] px-4 py-6 xl:px-10">
          <Duties />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default DutiesPage;
