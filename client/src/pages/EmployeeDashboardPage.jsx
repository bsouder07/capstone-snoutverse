import React from 'react'
import { Container } from 'react-bootstrap'
import { getEmployeeProtectedResource } from '../services/api.services'

function EmployeeDashboardPage() {
 useEffect(()=>{
 getEmployeeProtectedResource()
        .then((response) => console.log(response)) 
   
     },[])

  return (
    <Container> <h1>EmployeeDashboardPage </h1></Container>
  )
}

export default EmployeeDashboardPage