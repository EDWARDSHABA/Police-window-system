import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HeadquartersPage from "./pages/headquarters/dashboardPage";
import CreatePoliceStationAdminPage from "./pages/headquarters/createPoliceStationAdminPage";
import PoliceStationPage from "./pages/headquarters/createPoliceStationPage";
import PolicestationsPage from "./pages/headquarters/policestationsPage";
import ManageAccountsPage from "./pages/headquarters/manageAccountsPage";

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

        {/* landing page */}
        <Route path="/" element={<HeadquartersPage />} />

        {/* headquarters */}
        <Route path="/headquarters" element={<HeadquartersPage />} />
        <Route path="/headquarters/create-admin" element={<CreatePoliceStationAdminPage />} />
        <Route path="/headquarters/police-stations" element={<PolicestationsPage />} />
        <Route path="/headquarters/create-police-station" element={<PoliceStationPage />} />
        <Route path="/manage-accounts" element={<ManageAccountsPage />} />
<<<<<<< HEAD
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/police-stations" element={<PoliceStationPage />} />
=======
      
>>>>>>> 043a3c7422a43d5dbabc304d479a3da27c976f7e

        {/* police station */}
        <Route path="/dashboard" element={<PoliceStationDashboardPage />} />
        <Route path="/manage-officers" element={<ManageOfficersPage />} />
        <Route path="/assign-duties" element={<AssignDutiesPage />} />
        <Route path="/track-cases" element={<TrackCasesPage />} />
        <Route path="/create-officer" element={<CreateOfficer />} />

        {/* officer pages */}
        <Route path="/officer-dashboard" element={<OfficerDashboardPage />} />
        <Route path="/register-case" element={<RegisterCasePage />} />
        <Route path="/update-case" element={<UpdateCasePage />} />
        <Route path="/create-statement" element={<CreateStatementPage />} />
        <Route path="/view-cases" element={<ViewCasesPage />} />

        {/*general pages*/}
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/profile" element={<ProfilePage />} />

      </Routes>
    </Router>
  );
}

export default App;