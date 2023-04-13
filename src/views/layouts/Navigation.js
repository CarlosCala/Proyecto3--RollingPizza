import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Navigation = ({ loggedUser, setLoggedUser }) => {
  const [admin, setAdmin] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [loggedUser]);

  const getUsers = async () => {
    setAdmin(loggedUser.admin);
  };

  if (admin === "administrador") {
    localStorage.setItem("authorized", JSON.stringify("true"));
  }

  const logout = () => {
    localStorage.removeItem("user-token");
    localStorage.removeItem("authorized");
    setLoggedUser({});
    setAdmin("");
    navigate("/");
  };

  const isAdmin = loggedUser?.token ? (
    <>
      <Link className="nav-link " to="/product/table">
        {" "}
        Admin page
      </Link>
      <Button className="css-button-arrow--red" onClick={logout}>
        Logout
      </Button>
    </>
  ) : loggedUser && Object.keys(loggedUser).length > 0 ? (
    <>
    <Link className="nav-link" to="/contact">
      ContacUs
    </Link>
    <Button className="css-button-arrow--red" onClick={logout}>
      Logout
    </Button>
    </>
  ) : (
    <Link className="nav-link" to="/auth/login/">
      Login
    </Link>
  );

  return (
    <div className="bgNavigation">
      <Navbar className="bg-red" expand="lg">
        <Container>
          <Navbar.Brand className="logo" href="/">
            <div className="d-flex ">
              <h1 className="display-4 namePage "> La Bella Pizza</h1>
              <img
                className="logo-Img"
                src="https://seeklogo.com/images/P/pizza-logo-42816D88BE-seeklogo.com.png"
              ></img>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div></div>
            <Nav className="ms-auto color-nav display-6 navigations">
              <Link className="nav-link" to="/">
                Home
              </Link>

              {isAdmin}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
