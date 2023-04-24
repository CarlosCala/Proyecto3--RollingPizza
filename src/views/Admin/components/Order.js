import React from "react";

import { Link } from "react-router-dom";

const Order = ({ order }) => {
  console.log(order.total);

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
      <td className="d-flex justify-content-between">
        {order.delivery}
        <Link to={`/order/status/${order._id}`} className="btn btn-warning">
          Realized
        </Link>
      </td>
    </tr>
  );
};

export default Order;
