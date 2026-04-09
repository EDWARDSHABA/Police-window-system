
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

import HeadquartersPage from "./pages/headquarters/dashboardPage";
import CreatePoliceStationAdminPage from "./pages/headquarters/createPoliceStationAdminPage";
import PoliceStationPage from "./pages/headquarters/createPoliceStationPage";
import PolicestationsPage from "./pages/headquarters/policestationsPage";
import ManageAccountsPage from "./pages/headquarters/manageAccountsPage";
import StatisticsPage from "./pages/headquarters/statisticsPage";

import PoliceStationDashboardPage from "./pages/policestation/DashboardPage";
import ManageOfficersPage from "./pages/policestation/manageOfficersPage";
import AssignDutiesPage from "./pages/policestation/assignDutiesPage";
import TrackCasesPage from "./pages/policestation/trackCasesPage";
import CreateOfficer from "./components/policestation/CreateOfficer/createOfficer";

import OfficerDashboardPage from "./pages/officer/dashboardPage";
import RegisterCasePage from "./pages/officer/registerCasePage";
import UpdateCasePage from "./pages/officer/updateCasePage";
import CreateStatementPage from "./pages/officer/createStatementPage";
import ViewCasesPage from "./pages/officer/viewCasesPage";

import NotificationPage from "./pages/notification/notificationPage";
import AboutUsPage from "./pages/aboutus/aboutUsPage";
import ProfilePage from "./pages/profile/profilePage";

function App() {
  return (
    <Router>
      <Routes>

      
        <Route path="/" element={<HomePage />} />

  
        <Route path="/headquarters" element={<HeadquartersPage />} />
        <Route path="/headquarters/create-admin" element={<CreatePoliceStationAdminPage />} />
        <Route path="/headquarters/police-stations" element={<PolicestationsPage />} />
        <Route path="/headquarters/create-police-station" element={<PoliceStationPage />} />
        <Route path="/manage-accounts" element={<ManageAccountsPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/police-stations" element={<PoliceStationPage />} />

  
        <Route path="/dashboard" element={<PoliceStationDashboardPage />} />
        <Route path="/manage-officers" element={<ManageOfficersPage />} />
        <Route path="/assign-duties" element={<AssignDutiesPage />} />
        <Route path="/track-cases" element={<TrackCasesPage />} />
        <Route path="/create-officer" element={<CreateOfficer />} />

        <Route path="/officer-dashboard" element={<OfficerDashboardPage />} />
        <Route path="/register-case" element={<RegisterCasePage />} />
        <Route path="/update-case" element={<UpdateCasePage />} />
        <Route path="/create-statement" element={<CreateStatementPage />} />
        <Route path="/view-cases" element={<ViewCasesPage />} />

        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/profile" element={<ProfilePage />} />

      </Routes>
    </Router>
  );
}

export default App;