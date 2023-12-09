import React, { useState } from 'react';
import { Container, Row, Form, InputGroup, Col, Button } from 'react-bootstrap';

const Register = () => {
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email:'',
    password: '',
    errorMessage: '',
    isSubmitting: false,
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSignup = (e) => {
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
            onSubmit={handleSignup}
          >
            <h3 className="mb-3">Sign Up!</h3>
            <Row className="mr-0">
            
              <Col md={6}>
                <Form.Group controlId="firstname-register">
                  <Form.Label>First Name</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="inputGroup">@</InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="firstname"
                      placeholder="FirstName"
                      aria-describedby="inputGroup"
                      required
                      value={data.firstname}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group controlId="lastname-register">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    placeholder="LastName"
                    required
                    value={data.lastname}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="email-register">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Email"
                    required
                    value={data.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="Register">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    required
                    id="inputPasswordRegister"
                    value={data.password}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                {data.errorMessage && (
                  <span className="form-error text-warning">
                    {data.errorMessage}
                  </span>
                )}
              </Col>

              <Col md={6}>
                <Form.Group controlId="profile-image-upload">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleProfileImageChange}
                    accept="image/*"
                  />
                </Form.Group>
              </Col>
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