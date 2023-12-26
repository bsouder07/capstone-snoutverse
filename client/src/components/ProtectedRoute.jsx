import { Navigate, Outlet, Route } from "react-router-dom"
import { useAuth } from "../hooks"




function ProtectedRoute({path, element}) {

const {isAuthenticated} = useAuth();
  if (isAuthenticated === null) return <p>Loading...</p>
  else if (isAuthenticated === false) return <Navigate to = "/login" />
  else return <Outlet/>;


}

export default ProtectedRoute;