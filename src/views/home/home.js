import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


const Home = ({ products }) => {
  return (
    <div>
        <h1>home</h1>
        <Link className="btn btn-danger" to={"/product/table"}
        >Admin</Link>
    </div>
  );
};

export default Home;
