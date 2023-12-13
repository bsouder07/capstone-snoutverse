import React, { useState } from "react";
import { Container, Row, Form, InputGroup, Col, Button } from "react-bootstrap";

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
    <div>
      <Container className="mb-5">
        <Row className="pt-5 justify-content-center">
          <Form
            noValidate
            validated
            style={{ width: "650px" }}
            onSubmit={handleSignIn}
          >
            <h3 className="mb-3">Sign Up!</h3>
            <Row className="mr-0">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="userName"
                    value={data.userName}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.userName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {data.errorMessage && (
                  <span className="form-error text-warning">
                    {data.errorMessage}
                  </span>
                )}
              </Col>
            </Row>
            <Row className="mr-0">
              <Button type="submit" disabled={data.isSubmitting}>
                Sign up
              </Button>
            </Row>
          </Form>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
