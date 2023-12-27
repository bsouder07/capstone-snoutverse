import { Navigate, Outlet, Route } from "react-router-dom";
import { useAuth } from "../hooks";
import { Container } from "react-bootstrap";

function ProtectedRoute({ requiredRole = 3 }) {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated === null) return <p>Loading...</p>;
  else if (isAuthenticated === false) return <Navigate to="/login" />;
  else if (user.role > requiredRole)
    return (
      <Container>
        <P>You do not have the proper permission to view this page.</P>
      </Container>
    );
  else return <Outlet />;
}

export default ProtectedRoute;
