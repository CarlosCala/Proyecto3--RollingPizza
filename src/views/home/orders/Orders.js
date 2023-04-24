import axios from "../../../config/axiosInit";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Orders = ({ getApiOrder }) => {
  const [order, setOrder] = useState([]);

  const UrlOrder = process.env.REACT_APP_API_ORDER;

  const ordersArray = JSON.parse(localStorage.getItem("order")) || [];

  useEffect(() => {
    setOrder(ordersArray);
  }, []);

  const navigate = useNavigate();

  const email = JSON.parse(localStorage.getItem("user-token"))?.email;

  const totalPrice = ordersArray.reduce((acumulador, venta) => {
    const ventas = Number(venta.price);

    return acumulador + ventas;
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    //enviar los datos
    const newOrder = {
      order: order,
      email: email,
      total: totalPrice,
    };

    console.log(newOrder);

    Swal.fire({
      title: "Are you sure you want to order this?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Order",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.post(UrlOrder, newOrder);
          if (res.status === 201) {
            Swal.fire("sent", "your order has been successfully shipped");
          }
          getApiOrder();
          localStorage.removeItem("order");
          navigate("/");
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      }
    });
  };

  const deleteOrders =(e) => {
      e.preventDefault()
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("order");
          setOrder([]);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })




  }

  return (
    <Container className="ordersContainer">
      {ordersArray?.length !== 0 ? (
        <>

        <div className=" d-flex justify-content-end mt-2">
          <button className="btn btn-outline-danger" onClick={deleteOrders}>
           clear orders
          </button>
        </div>
          <Table className="align-middle mt-3 text-white bg-black">
            <thead>
              <tr>
                <th>ProductName</th>
                {/* <th>Quantity</th> */}
                <th className="text-end">Price</th>
              </tr>
            </thead>
            <tbody>
              {ordersArray?.map((order) => (
                <tr>
                  <td>{order.productName}</td>
                  {/* <td>{order.quantity}</td> */}
                  <td className="text-end">{order.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between mt-2 bg-black text-white">
            <h3>total</h3>
            <h4>${totalPrice}</h4>
          </div>
          <div className="text-center mt-4">
            <button
              type="submit"
              className="btnOrder "
              onClick={handleSubmit}
            >
              Order
            </button>
          </div>
        </>
      ) : (
        <div className="text-center  mt-5">
          <h1>🍕 You have not placed an order 🍕</h1>
        </div>
      )}
    </Container>
  );
};

export default Orders;
