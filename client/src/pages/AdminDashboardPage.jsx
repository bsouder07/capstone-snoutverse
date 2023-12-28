import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { getAdminProtectedResource } from "../services/api.services";



function AdminDashboardPage() {

  useEffect(()=>{
     getAdminProtectedResource()
     .then((response) => console.log(response)) 

  },[])
  return 
    <Container>
      
      
       <h1>DashboardPage </h1>
    
    
    
    </Container>
  
}

export default AdminDashboardPage