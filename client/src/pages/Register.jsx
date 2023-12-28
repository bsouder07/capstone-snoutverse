import React, { useState } from "react";
import { Container, Row, Form, InputGroup, Col, Button } from "react-bootstrap";
import { Link, useNavigate} from "react-router-dom";
import { useAuth } from "../hooks";
import UploadFile from "../components/UploadFile"


const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  };

const Register = () => {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const { handleSignUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, confirmPassword } = data;

    await handleSignUp(email, password, confirmPassword);
    navigate("/dashboard");

    
  };

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
 const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    };
  return (
    <Container>
      <h1>Create an Account</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            autoComplete="off"
            name="email"
            value={data.email}
            onChange={handleInputChange}
            isInvalid={errors.email}
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
            isInvalid={errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            autoComplete="off"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleInputChange}
            isInvalid={errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="profile-image-upload">
          <Form.Label>Profile Picture</Form.Label>
          <UploadFile onFileChange={(file) => setProfileImage(file)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Button type="submit">Create Account </Button>
        </Form.Group>
        <Form.Text>
          Already have an account? <Link to = "/login">Sign In</Link>
        </Form.Text>
      </Form>
    </Container>
  );


   
};

export default Register;
