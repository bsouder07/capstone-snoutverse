import React, { useState } from "react";
import { Container, Row, Form, InputGroup, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const {handleSignIn} = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e) =>{
    e.preventDefault();

    const {email,password} = data;

    await handleSignIn(email,password);

      navigate("/dashboard")

  };
 
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <h1>  Sign in now!</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mt-5">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            autoComplete="off"
            name="email"
            value={data.email}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mt-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            autoComplete="off"
            name="password"
            value={data.password}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mt-4">
          <Button type="submit">Sign In</Button>
        </Form.Group>
        <Form.Text>
         New account? <Link  to ="/register">Sign Up</Link>
        </Form.Text>
      </Form>
    </Container>
  );


};

export default Login;
