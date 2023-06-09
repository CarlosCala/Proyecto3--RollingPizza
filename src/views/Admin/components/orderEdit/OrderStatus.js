import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import axios from "../../../../config/axiosInit";

const OrderStatus = ({ UrlOrder, getApiOrder }) => {
  //steate
  const [order, setOrder] = useState({});

  const {_id} = useParams();

  const navigate = useNavigate();


  useEffect(() => {
    getOne();
  }, []);

  const getOne = async () => {
    try {
      //peticion con axios
      const res = await axios.get(`${UrlOrder}/${_id}`);
      const orderApi = await res.data;
      setOrder(orderApi);
    } catch (error) {
      Swal.fire('database error')
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const orderUpdate = {
      order: order,
      email: order.email,
      total: order.totalPrice,
      delivery : order.delivery
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {


          const res = await axios.put(`${UrlOrder}/${_id}` , orderUpdate)


          if (res.status === 200) {
            Swal.fire("Update", "your file has been updated", "succes");
          }
       
          getApiOrder();
          navigate("/order/table");
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      }
    });
  };

  return (
    <div>
      <Container className="py-5 orderStatusContainer">
        <div className="bgEditUser">
        <h1 className="display-5">OrderStatus</h1>
        </div>
        <hr />
        {/* Form Product */}
        <Form className="my-5" onSubmit={handleSubmit}>
         <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>OrderProduct* </Form.Label>
            <Form.Control
              type="text"
              defaultValue={order._id}
              // ref={orderNameRef}
              disabled
                          />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Delivery*</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={order.delivery}
              onChange={({ target }) =>
              setOrder({ ...order, delivery: target.value })
              }
            >
              <option>Select rol </option>
              <option value="realized">Realized</option>
              <option value="pending">Pending</option>
            </Form.Select>
          </Form.Group>
          <div className="text-end">
            <button className="btn-red">Update</button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default OrderStatus;
