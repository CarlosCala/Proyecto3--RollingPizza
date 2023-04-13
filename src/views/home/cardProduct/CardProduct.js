import React from "react";
import { Card, Col, Row } from "react-bootstrap";
// import { Next } from "react-bootstrap/esm/PageItem";
import { Link, useNavigate } from "react-router-dom";

const CardProduct = ({ product, loggedUser }) => {
  return (
    <div>
      <Card className="my-4 cardProduct border border-ligth cardsProducts">
        <Card.Img
          className="img-fluid cardImg"
          variant="top"
          src={product.urlImg}
        />
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <Card.Title className="m-0 text-truncate">
              {product.productName}
            </Card.Title>
            <span className="badge bg-yellow">New</span>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <p className="mb-0 ms-4 fs-4 ">${product.price}</p>

            {loggedUser && Object.keys(loggedUser).length > 0 ? (
              <Link
                to={`/product/buy/${product._id}`}
                className="btn-gray text-decoration-none text-center"
              >
                Buy
              </Link>
            ) : (
              <Link
                to="auth/login/"
                className="btn-gray text-decoration-none text-center"
              >
                Buy
              </Link>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardProduct;
