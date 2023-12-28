import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { getUserProtectedResource } from "../services/api.services";



function UserDashboardPage() {

  useEffect(()=>{
     getUserProtectedResource()
     .then((response) => console.log(response)); 

  },[])
  return 
    <Container>
      
      
       <h1>DashboardPage </h1>
    
    
    
    </Container>
  
};

export default UserDashboardPage