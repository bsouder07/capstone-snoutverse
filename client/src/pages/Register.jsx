import React, { useState } from "react";
import { Container, Row, Form, InputGroup, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../providers/AuthProvider/useAuth";


const initialState = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  // const [profileImage, setProfileImage] = useState(null);
  const {handleSignUp} = useAuth();
  const navigate = useNavigate()
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    const {username,password,confirmPassword} = data;

    await handleSignUp(username,password,confirmPassword);
  }

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // const handleProfileImageChange = (e) => {
  //   setProfileImage(e.target.files[0]);
  // };


  return (
    <div>
      <Container className="mb-5">
        <Row className="pt-5 justify-content-center">
          <Form
            noValidate
            validated
            style={{ width: "650px" }}
            onSubmit={handleSubmit}
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
                {/* <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group> */}
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

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={handleInputChange}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.userName}
                  </Form.Control.Feedback>
                </Form.Group>
                {data.errorMessage && (
                  <span className="form-error text-warning">
                    {data.errorMessage}
                  </span>
                )}
              </Col>

              {/* <Col md={6}>
                <Form.Group controlId="profile-image-upload">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleProfileImageChange}
                    accept="image/*"
                  />
                </Form.Group>
              </Col> */}
            </Row>
            <Row className="mr-0">
              <Col>
                Already Registered?
                <Button
                  as="a"
                  variant="link"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </Col>
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

export default Register;
