import React, { useState } from "react";
import { Link } from "react-router-dom";

const Order = ({ order, UrlOrder, getApiOrder }) => {
  const [show, setShow] = useState(false);

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
