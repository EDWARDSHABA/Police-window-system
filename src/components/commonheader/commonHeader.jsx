import HeadquartersHeader from "../headquaeters/Header/HeadQuartersHeader";
import StationHeader from "../policestation/Header/PoliceStationHeader";
import Header from "../officer/Header/OfficerHeader";

export default function CommonHeader() {
  const role = localStorage.getItem("role");

  if (role === "station") return <StationHeader />;
  if (role === "officer") return <OfficerHeader />;
  

  return <HeadquartersHeader />;
}