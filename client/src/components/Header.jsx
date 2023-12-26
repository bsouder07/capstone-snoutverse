import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks"

function Header() {
  const { isAuthenticated, handleSignOut } = useAuth();
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            SnoutVerse
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="top-nav" />
          <Navbar.Collapse id="top-nav">
            <Nav className="me-auto">
              {isAuthenticated ? (
                <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
              ) : (
                <>
                  <Nav.Link as={Link} to="/register">
                    Sign Up
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login">
                    Sign In
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
