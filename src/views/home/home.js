import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardProduct from "./cardProduct/CardProduct";
import CarouselHome from "./carouselHome/CarouselHome";

const Home = ({ products, loggedUser }) => {
  if (!loggedUser) {
  }

  return (
    <div className="">
      <CarouselHome />
      <Container className="py-5">
        <h1>Products</h1>
        <hr />
        {products?.length !== 0 ? (
          <Row>
            {products?.map((product) => (
              <Col xl={3} lg={4} md={6}>
                <CardProduct
                  product={product}
                  loggedUser={loggedUser}
                  className="cardProduct"
                />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="no-products-found text-center align-items-center justify-content-center">
            <span class="loaderProducts"></span>
            <h1>🍕  Loading Products🍕</h1>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Home;
