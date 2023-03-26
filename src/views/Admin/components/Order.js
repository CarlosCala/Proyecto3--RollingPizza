import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import axios from "../../../config/axiosInit";

const Order = ({ order, UrlOrder, getApiOrder }) => {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <tr>
      <td>{order._id}</td>
      <td>{order.productName}</td>
      <td>${order.price}</td>
      <td>${order.quantity}</td>
      <td className="d-flex justify-content-between">
        {order.delivery}
        <Link to={`/order/status/${order._id}`} >
        Realized
        </Link>
      </td>
      


    </tr>
  );
};

export default Order;
