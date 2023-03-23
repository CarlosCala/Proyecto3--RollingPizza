import React from "react";
import { Col, Container, Row ,Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Product from "./components/Product";
import User from "./components/User"

const UserTable = ({ users, UrlUser, getApiUser }) => {
  return (
    <div className="UserTable p-4">
      <Container > 
        <div className="d-flex align-items-center justify-content-between mt-5 ">
        <Link
            to="/product/table"
            className="btn btn-outline-danger"
          >
            Product Control 
          </Link>
          <Link
            to=""
            className="btn btn-outline-danger"
          >
            Order Control
          </Link>
          <Link
            to="/user/table"
            className="btn btn-outline-danger"
          >
            User Controll
          </Link>
        </div>
        <hr />
        {/* Table of products */}
        {users?.length !== 0 ?
        <Table bordered hover responsive className="align-middle mt-3 text-white bg-black">
          <thead>
            <tr>
              <th>N.</th>
              <th>Name</th>
              <th>email</th>
              {/* <th>password</th> */}
              <th>status</th>
              <th>Admin</th>
              <th>Actions</th>

            </tr>
          </thead>
          <tbody>
          {users?.map((user) => (
            <User
              key={user.id}
              user={user}
              UrlUser={UrlUser}
              getApiUser={getApiUser}
              users={users}
            />
          ))}
          </tbody>
        </Table>
        :
        <div className="no-products-found d-flex align-items-center justify-content-center">
        {/* No products found message */}
          <h1>🍕 No User found 🍕</h1>
          </div>
        }
        <hr />
      </Container>
      </div>
  );
};

export default UserTable;