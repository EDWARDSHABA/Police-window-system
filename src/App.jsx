import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("./pages/home/homePage"));
const SignInPage = lazy(() => import("./pages/authentication/signInPage"));

// headquarters
const HeadquartersPage = lazy(() => import("./pages/headquarters/dashboardPage"));
const CreatePoliceStationAdminPage = lazy(() =>
  import("./pages/headquarters/createPoliceStationAdminPage")
);
const PoliceStationPage = lazy(() => import("./pages/headquarters/createPoliceStationPage"));
const PolicestationsPage = lazy(() => import("./pages/headquarters/policestationsPage"));
const ManageAccountsPage = lazy(() => import("./pages/headquarters/manageAccountsPage"));
const EditAccountPage = lazy(() => import("./pages/headquarters/editAccountPage"));

// police station
const PoliceStationDashboardPage = lazy(() => import("./pages/policestation/DashboardPage"));
const ManageOfficersPage = lazy(() => import("./pages/policestation/manageOfficersPage"));
const AssignDutiesPage = lazy(() => import("./pages/policestation/assignDutiesPage"));
const TrackCasesPage = lazy(() => import("./pages/policestation/trackCasesPage"));
const CreateOfficer = lazy(() => import("./components/policestation/CreateOfficer/createOfficer"));
const EditOfficer = lazy(() => import("./components/policestation/editOfficer/editOfficer"));

// officer
const OfficerDashboardPage = lazy(() => import("./pages/officer/dashboardPage"));
const RegisterCasePage = lazy(() => import("./pages/officer/registerCasePage"));
const UpdateCasePage = lazy(() => import("./pages/officer/updateCasePage"));
const CreateStatementPage = lazy(() => import("./pages/officer/createStatementPage"));
const ViewCasesPage = lazy(() => import("./pages/officer/viewCasesPage"));
const CaseDetailsPage = lazy(() => import("./pages/officer/caseDetailsPage"));
const DutiesPage = lazy(() => import("./pages/officer/dutiesPage"));

// general
const NotificationPage = lazy(() => import("./pages/notification/notificationPage"));
const AboutUsPage = lazy(() => import("./pages/aboutus/aboutUsPage"));
const ProfilePage = lazy(() => import("./pages/profile/profilePage"));

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
          <Route path="/assign-duties" element={<AssignDutiesPage />} />
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
