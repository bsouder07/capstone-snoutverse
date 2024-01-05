import "./App.css";
import { BottomNav, Header } from "./components";
import { Route, Router, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Search from "./pages/Search/Search";
import UserDashboardPage from "./pages/UserDashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import EmployeeDashboardPage from "./pages/EmployeeDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import Profile from "./pages/Profile";

import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <>
      <Header />
      <BottomNav/>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
       

        <Route element={<ProtectedRoute requiredRole={0} />}>
          <Route path="/dashboard" element={<Dashboard />} />
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
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
