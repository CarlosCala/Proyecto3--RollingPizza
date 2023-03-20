import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Product from "./components/Product";

const AdminTable = ({ products, URL, getApi }) => {
  return (
    <>
      <Container className="adminTable p-4">
        <div>
        <Link
            to="/"
            className="btn btn-outline-danger text-center"
          >
            Home
          </Link>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-5 text-white">
          <Link
            to="/product/table"
            className="btn-orange  text-decoration-none text-center"
          >
            Product Control
          </Link>
          <Link
            to=""
            className="btn-orange  text-decoration-none text-center"
          >
            Order Control
          </Link>
          <Link
            to="/user/register"
            className="btn-orange  text-decoration-none text-center"
          >
            User Control
          </Link>
        </div>
        <hr />
        <div className="text-center">
        <Link 
            to="/product/create"
            className="btn btn-outline-danger text-center"
          >
            Add Product
          </Link>
          </div>
        {/* Table of products */}
        {products?.length !== 0 ? (
          <Table bordered hover responsive className="align-middle mt-3 text-white bg-black">
            <thead>
              <tr>
                <th>N.</th>
                <th>Name</th>
                <th>Price</th>
                <th>Image url</th>
                <th>category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  URL={URL}
                  getApi={getApi}
                />
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="no-products-found d-flex align-items-center justify-content-center">
            {/* No products found message */}
            <h1>🍕 No products found 🍕</h1>
          </div>
        )}
        <hr />
      </Container>
    </>
  );
};

export default AdminTable;
