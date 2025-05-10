import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import JobsListPage from "./pages/JobsListPage";
import JobPostPage from "./pages/JobPostPage";
import JobDetailPage from "./pages/JobDetailPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ApplicationsReviewPage from "./pages/ApplicationsReviewPage";
import MyApplicationPage from "./pages/MyApplicationsPage";
import { AuthProvider } from "./context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";

function NavigationButtons() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div>
      <button onClick={() => navigate("/login")}>
        Login
      </button>
      <button onClick={() => navigate("/register")}>
        Register
      </button>
      <button onClick={() => navigate("/jobs")}>
        Jobs
      </button>
      <button onClick={() =>{ logout(); navigate("/login")}}>
        Logout
      </button>
    </div>
  );
}

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <NavigationButtons />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/jobs" element={<JobsListPage />} />
          <Route path="/jobs/:jobId" element={<JobDetailPage />} />
          <Route path="/applications" element={<ApplicationsReviewPage />} />
          <Route path="/myapplications" element={<MyApplicationPage />} />
          <Route
            path="/post-job"
            element={
              <ProtectedRoute>
                <JobPostPage />
              </ProtectedRoute>
            }
          />
          {/* Add more routes here */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;