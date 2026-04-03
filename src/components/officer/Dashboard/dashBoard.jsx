import Header from "../Header/OfficerHeader";
import { cases, officers } from "../Data/caseData";
import Footer from "../footer/footer";

export default function Dashboard() {
  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      <Header />

      <main className="p-2 pt-24">


        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
          <StatCard title="Today Cases" value="38" color="bg-blue-500" />
          <StatCard title="Cases in Court" value="18" color="bg-gray-500" />
          <StatCard title="Case Closed" value="23" color="bg-blue-400" />
          <StatCard title="Total Cases" value="2756" color="bg-yellow-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* TABLE */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold text-gray-600 mb-3">
              Recent Cases
            </h3>

            <div className="max-h-[350px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white text-gray-500 border-b">
                  <tr>
                    <th className="py-2 text-left">Case ID</th>
                    <th className="py-2 text-left">Type</th>
                    <th className="py-2 text-left">Status</th>
                    <th className="py-2 text-left">Officer</th>
                  </tr>
                </thead>

                <tbody>
                  {cases.map((item, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="py-2">{item.caseId}</td>
                      <td>{item.type}</td>
                      <td className="text-yellow-600">{item.status}</td>
                      <td>{item.officer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold text-gray-600 mb-3">
              Officers on Duty
            </h3>

            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {officers.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                    {item.name.charAt(0)}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.rank} • {item.badge}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer/>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className={`p-4 rounded-xl text-white shadow ${color}`}>
      <p className="text-sm">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}