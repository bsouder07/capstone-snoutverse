import React from "react";
import { useAuth } from "../hooks";



function DashboardPage() {
const {isAuthenticated} = useAuth()



if(isAuthenticated === false){
    
}


  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage