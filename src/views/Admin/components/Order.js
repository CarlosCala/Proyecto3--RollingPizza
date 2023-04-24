import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import axios from "../../../config/axiosInit";

const Order = ({ order, UrlOrder, getApiOrder }) => {

  const [show, setShow] = useState(false);

  console.log(order.total);

const products = order.order

const ordenes = products.map((prod) => {
  return  prod.productName + " - "
}
  )

  console.log(ordenes);






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
