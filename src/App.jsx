import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Pages */
import HomePage from "./pages/HomePage";

// Headquarters Pages
import HeadquartersPage from "./pages/headquarters/dashboardPage";
import CreatePoliceStationAdminPage from "./pages/headquarters/createPoliceStationAdminPage";
import PoliceStationPage from "./pages/headquarters/createPoliceStationPage";
import ManageAccountsPage from "./pages/headquarters/manageAccountsPage";

// Police Station Pages
import PoliceStationDashboardPage from "./pages/policestation/DashboardPage";
import ManageOfficersPage from "./pages/policestation/manageOfficersPage";
import AssignDutiesPage from "./pages/policestation/assignDutiesPage";
import TrackCasesPage from "./pages/policestation/trackCasesPage";
import CreateOfficer from "./components/policestation/CreateOfficer/createOfficer";

// Officer Pages
import OfficerDashboardPage from "./pages/officer/dashboardPage";
import RegisterCasePage from "./pages/officer/registerCasePage";
import UpdateCasePage from "./pages/officer/updateCasePage";
import CreateStatementPage from "./pages/officer/createStatementPage";
import ViewCasesPage from "./pages/officer/viewCasesPage";

function App() {
  return (
    <Router>
      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<HomePage />} />

        {/* Headquarters */}
        <Route path="/headquarters" element={<HeadquartersPage />} />
        <Route path="/create-admin" element={<CreatePoliceStationAdminPage />} />
        <Route path="/police-stations" element={<PoliceStationPage />} />
        <Route path="/manage-accounts" element={<ManageAccountsPage />} />

        {/* Police Station */}
        <Route path="/dashboard" element={<PoliceStationDashboardPage />} />
        <Route path="/manage-officers" element={<ManageOfficersPage />} />
        <Route path="/assign-duties" element={<AssignDutiesPage />} />
        <Route path="/track-cases" element={<TrackCasesPage />} />
        <Route path="/create-officer" element={<CreateOfficer />} />
        {/* Officer */}
        <Route path="/officer-dashboard" element={<OfficerDashboardPage />} />
        <Route path="/register-case" element={<RegisterCasePage />} />
        <Route path="/update-case" element={<UpdateCasePage />} />
        <Route path="/create-statement" element={<CreateStatementPage />} />
        <Route path="/view-cases" element={<ViewCasesPage />} />

      </Routes>
    </Router>
  );
}

export default App;