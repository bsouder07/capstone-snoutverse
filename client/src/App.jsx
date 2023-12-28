import "./App.css";
import { Header } from "./components";
import { Route, Router, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboardPage from "./pages/UserDashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import EmployeeDashboardPage from "./pages/EmployeeDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute requiredRole={0} />}>
          <Route path="/dashboard" element={<UserDashboardPage />} />
        </Route>
        <Route element={<ProtectedRoute requiredRole={2} />}>
          <Route
            path="/dashboard/employee"
            element={<EmployeeDashboardPage />}
          />
        </Route>
        <Route element={<ProtectedRoute requiredRole={1} />}>
          <Route
            path="/dashboard/admin"
            element={<AdminDashboardPage />}
          />
        </Route>
        <Route element={<ProtectedRoute requiredRole={2} />}>
          <Route
            path="/dashboard/employee"
            element={<EmployeeDashboardPage />}
          />
        </Route>

        <Route element={<ProtectedRoute requiredRole={3} />}>
          <Route path="/profile/:userId" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
