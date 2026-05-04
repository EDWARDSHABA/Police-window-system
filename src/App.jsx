import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateOfficer from "./components/policestation/CreateOfficer/createOfficer";
import EditOfficer from "./components/policestation/editOfficer/editOfficer";
import AboutUsPage from "./pages/aboutus/aboutUsPage";
import SignInPage from "./pages/authentication/signInPage";
import HeadquartersPage from "./pages/headquarters/dashboardPage";
import EditAccountPage from "./pages/headquarters/editAccountPage";
import ManageAccountsPage from "./pages/headquarters/manageAccountsPage";
import PolicestationsPage from "./pages/headquarters/policestationsPage";
import CreatePoliceStationAdminPage from "./pages/headquarters/createPoliceStationAdminPage";
import PoliceStationPage from "./pages/headquarters/createPoliceStationPage";
import HomePage from "./pages/home/homePage";
import NotificationPage from "./pages/notification/notificationPage";
import DutiesPage from "./pages/officer/dutiesPage";
import CaseDetailsPage from "./pages/officer/caseDetailsPage";
import CreateStatementPage from "./pages/officer/createStatementPage";
import OfficerDashboardPage from "./pages/officer/dashboardPage";
import RegisterCasePage from "./pages/officer/registerCasePage";
import UpdateCasePage from "./pages/officer/updateCasePage";
import ViewCasesPage from "./pages/officer/viewCasesPage";
import AssignDutiesPage from "./pages/policestation/assignDutiesPage";
import PoliceStationDashboardPage from "./pages/policestation/DashboardPage";
import ManageOfficersPage from "./pages/policestation/manageOfficersPage";
import PoliceDutiesPage from "./pages/policestation/policeDutiesPage";
import TrackCasesPage from "./pages/policestation/trackCasesPage";
import ViewDutiesPage from "./pages/policestation/viewDutiesPage";
import ProfilePage from "./pages/profile/profilePage";

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6 text-center">
      <div className="rounded-2xl border border-slate-200 bg-white px-8 py-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Loading Police Window System</h1>
        <p className="mt-2 text-sm text-slate-600">Preparing the requested page...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/signin" element={<SignInPage />} />

          <Route path="/headquarters" element={<HeadquartersPage />} />
          <Route path="/headquarters/create-admin" element={<CreatePoliceStationAdminPage />} />
          <Route path="/headquarters/police-stations" element={<PolicestationsPage />} />
          <Route path="/headquarters/create-police-station" element={<PoliceStationPage />} />
          <Route path="/manage-accounts" element={<ManageAccountsPage />} />
          <Route path="/manage-accounts/edit/:id" element={<EditAccountPage />} />
          <Route path="/police-stations" element={<PoliceStationPage />} />
          <Route path="/edit-stations" element={<EditAccountPage />} />

          <Route path="/dashboard" element={<PoliceStationDashboardPage />} />
          <Route path="/manage-officers" element={<ManageOfficersPage />} />
          <Route path="/assign-duties" element={<PoliceDutiesPage />} />
          <Route path="/assign-duties/new" element={<AssignDutiesPage />} />
          <Route path="/view-duties" element={<ViewDutiesPage />} />
          <Route path="/track-cases" element={<TrackCasesPage />} />
          <Route path="/create-officer" element={<CreateOfficer />} />
          <Route path="/edit-officer/:id" element={<EditOfficer />} />

          <Route path="/officer-dashboard" element={<OfficerDashboardPage />} />
          <Route path="/register-case" element={<RegisterCasePage />} />
          <Route path="/update-case" element={<UpdateCasePage />} />
          <Route path="/update-case/:id" element={<UpdateCasePage />} />
          <Route path="/create-statement" element={<CreateStatementPage />} />
          <Route path="/createStatement" element={<CreateStatementPage />} />
          <Route path="/officer-help" element={<CreateStatementPage />} />
          <Route path="/help" element={<CreateStatementPage />} />
          <Route path="/view-cases" element={<ViewCasesPage />} />
          <Route path="/view-case/:id" element={<CaseDetailsPage />} />
          <Route path="/officer-duties" element={<DutiesPage />} />
          <Route path="/duties" element={<DutiesPage />} />
          <Route path="/duty-assignment" element={<DutiesPage />} />
          <Route path="/duty-assignments" element={<DutiesPage />} />

          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
