import "./App.css";
import { BottomNav, Header } from "./components";
import { Route, Router, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Search from "./pages/Search/Search";
import Groups from "./pages/Groups/Groups";
import ProtectedRoute from "./components/ProtectedRoute";
import EmployeeDashboardPage from "./pages/EmployeeDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import Profile from "./pages/Profile/Profile";
import WelcomePage from "./pages/WelcomePage/WelcomePage"
import Dashboard from "./pages/Dashboard/Dashboard";
import GroupPage from "./pages/Groups/GroupPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
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

        <Route element={<ProtectedRoute requiredRole={3} />}>
          <Route path="/groups" element={<Groups />}>
            <Route path=":groupId" element={<GroupPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
