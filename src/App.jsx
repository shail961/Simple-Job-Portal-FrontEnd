import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import JobsListPage from "./pages/JobsListPage";
import JobPostPage from "./pages/JobPostPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/jobs" element={<JobsListPage />} />
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