import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";
import useAuth from "../../hooks/useAuth";
import useAuthProvider from "../../providers/AuthProvider/useAuthProvider";

function Header() {

  const { handleSignOut } = useAuth();
  const { state } = useAuthProvider();

  const isLoggedIn = state.isAuthenticated;

  return (
    <Navbar bg="primary" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to={isLoggedIn ? "/dashboard" : "/"} id="title">
          SnoutVerse
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="top-nav" />
        <Navbar.Collapse id="top-nav" className="justify-content-end">
          <Nav>
            {isLoggedIn ? (
              <Button onClick={handleSignOut}>Log Out</Button>
            ) : (
              <>
                <Button className="m-2" variant="dark" as={Link} to="/register">
                  Sign Up
                </Button>
                <Button className="m-2" variant="dark" as={Link} to="/login">
                  Sign In
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
