import { useEffect, useMemo, useState } from "react";
import { MoreHorizontal, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StationHeader from "../Header/PoliceStationHeader";
import Footer from "../../officer/footer/footer";
import { getStoredDuties, saveDuties } from "../dutiesStorage";

export default function ViewDuties() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedDutyType, setSelectedDutyType] = useState("All Duty Types");
  const [duties, setDuties] = useState([]);

  useEffect(() => {
    setDuties(getStoredDuties());
  }, []);

  const dutyTypes = useMemo(
    () => ["All Duty Types", ...new Set(duties.map((row) => row.dutyType))],
    [duties]
  );

  const filteredDuties = useMemo(() => {
    const query = search.trim().toLowerCase();

    return duties.filter((row) => {
      const matchesDutyType =
        selectedDutyType === "All Duty Types" || row.dutyType === selectedDutyType;

      const matchesSearch =
        !query ||
        row.id.toLowerCase().includes(query) ||
        row.officer.toLowerCase().includes(query) ||
        row.location.toLowerCase().includes(query);

      return matchesDutyType && matchesSearch;
    });
  }, [duties, search, selectedDutyType]);

  const handleDelete = (id) => {
    setDuties((current) => {
      const next = current.filter((row, index) => `${row.id}-${index}` !== id);
      saveDuties(next);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <StationHeader />

      <main className="px-4 pb-14 pt-28 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center">
            <div className="h-9 min-w-[170px] rounded-sm bg-sky-500 px-4 text-white shadow-sm">
              <span className="flex h-full items-center text-base font-medium">
                Assigned Duties Table
              </span>
            </div>

            <div className="h-px flex-1 bg-sky-200" />
          </div>

          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="w-full max-w-xs">
              <select
                value={selectedDutyType}
                onChange={(event) => setSelectedDutyType(event.target.value)}
                className="h-11 w-full rounded-sm border border-slate-400 bg-white px-4 text-sm text-slate-700 outline-none"
              >
                {dutyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === "All Duty Types" ? "Filter by Duty Type" : type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex w-full flex-col items-stretch gap-2 sm:max-w-xs">
              <button
                type="button"
                onClick={() => navigate("/assign-duties")}
                className="h-12 rounded-sm bg-sky-500 px-5 text-left text-3xl font-normal text-white shadow-sm transition hover:bg-sky-600 sm:text-[19px]"
              >
                Assign Duties
              </button>

              <label className="flex h-11 items-center rounded-sm border border-slate-400 bg-white px-3">
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search Officer"
                  className="w-full border-none text-sm text-slate-700 outline-none"
                />
                <Search className="h-4 w-4 text-slate-700" />
              </label>
            </div>
          </div>

          <div className="overflow-hidden rounded-sm border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 text-left text-[13px] text-slate-700">
                <thead>
                  <tr className="bg-[#d3d3d3] text-slate-800">
                    <th className="px-4 py-3 font-medium">Police ID</th>
                    <th className="px-4 py-3 font-medium">Officer</th>
                    <th className="px-4 py-3 font-medium">Location</th>
                    <th className="px-4 py-3 font-medium">Duty Type</th>
                    <th className="px-4 py-3 font-medium">Shift/Time</th>
                    <th className="px-4 py-3 font-medium">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredDuties.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-4 py-10 text-center text-sm text-slate-500">
                        No assigned duties match the current filters.
                      </td>
                    </tr>
                  ) : (
                    filteredDuties.map((row, index) => {
                      const rowKey = `${row.id}-${index}`;

                      return (
                        <tr key={rowKey} className="border-b border-slate-100 last:border-b-0">
                          <td className="px-4 py-2 align-top">
                            <span className="text-[12px]">{`${index + 1}. ${row.id}`}</span>
                          </td>
                          <td className="px-4 py-2 align-top">{row.officer}</td>
                          <td className="px-4 py-2 align-top">{row.location}</td>
                          <td className="px-4 py-2 align-top">{row.dutyType}</td>
                          <td className="px-4 py-2 align-top">{row.shift}</td>
                          <td className="px-4 py-2 align-top">
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => handleDelete(rowKey)}
                                className="text-[12px] text-slate-700 transition hover:text-red-600"
                              >
                                Delete
                              </button>
                              {index === filteredDuties.length - 1 ? (
                                <button
                                  type="button"
                                  className="text-slate-400"
                                  aria-label="More actions"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </button>
                              ) : null}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
