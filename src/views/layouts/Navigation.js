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
    <div className="bgNavigation">
      <Navbar className="bg-red" expand="lg">
        <Container>
          <Navbar.Brand className="logo" href="/">
            <div className="d-flex ">
              <h1 className="display-4 "> La Bella Pizza</h1>
              <img
                className="logo-Img"
                src="https://seeklogo.com/images/P/pizza-logo-42816D88BE-seeklogo.com.png"
              ></img>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div>
              
            </div>
            <Nav className="ms-auto color-nav display-5">
              <Link className="nav-link" to="/">
                Home
              </Link>
              {/* <Link className="nav-link" to="/product/table">
                admin
              </Link> */}
              {loggedUser.token ? (
                <>
                  <Button variant="dark" onClick={logout}>
                    Logout
                  </Button>
                  <Link className="nav-link logoutBtn" to="/product/table">
                    {" "}
                    Admin page
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
