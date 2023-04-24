import React, { useState } from "react";
import { Link } from "react-router-dom";

<<<<<<< HEAD
const Order = ({ order }) => {
=======
const Order = ({ order, UrlOrder, getApiOrder }) => {
  const [show, setShow] = useState(false);

>>>>>>> b4357294a0a8caf9de3a28b8d8582a91b81f36c9
  const products = order.order;

  const ordenes = products.map((prod) => {
    return prod.productName + " - ";
  });


  return (
    <tr>
      <td>{order._id}</td>
      <td>{ordenes}</td>
      <td>${order.total}</td>
      <td>{order.email}</td>
      <td className="d-flex flex-wrap justify-content-between text-center">
        {order.delivery}
        <Link to={`/order/status/${order._id}`} className="btn btn-warning mt-2">
          Realized
        </Link>
      </td>
    </tr>
  );
};

export default Order;
