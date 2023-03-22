import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Navigation = ({ loggedUser, setLoggedUser }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user-token");
    setLoggedUser({});
    navigate("/");
  };

  return (
    <div>
      <Navbar className="bg-red" expand="lg">
        <Container>
          <Navbar.Brand className="logo" href="/">
            Crud Hamburguesería
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto color-nav">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/product/table">
                admin
              </Link>
              {loggedUser.token ? (
                <>
                  <Button variant="dark" onClick={logout}>
                    Logout
                  </Button>
                  <Link className="nav-link" to="/product/table">
                    {" "}
                    Manager Products
                  </Link>
                </>
              ) : (
                <Link className="nav-link" to="/auth/login/">
                  Login
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
