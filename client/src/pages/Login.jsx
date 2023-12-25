import React, { useState } from "react";
import { Container, Row, Form, InputGroup, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const initialState = {
  userName: "",
  password: "",
};

const Login = () => {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
 
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <h1>  Sign in now!</h1>
      <Form onSubmit={() => {}}>
        <Form.Group className="mb-3">
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
        <Form.Group className="mb-3">
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
        <Form.Group className="mb-3">
          <Button type="submit">Sign In</Button>
        </Form.Group>
        <Form.Text>
         New account? <Link to ="/register">Sign Up</Link>
        </Form.Text>
      </Form>
    </Container>
  );


};

export default Login;
