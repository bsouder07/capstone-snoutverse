import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {

  

  return (
    <Navbar bg="primary" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" id="title">
          SnoutVerse
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="top-nav" />
        <Navbar.Collapse id="top-nav" className="justify-content-end">
          <Nav>
            {isLoggedIn ? (
              <Nav.Link>Log Out</Nav.Link>
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
  );
}

export default Header;
