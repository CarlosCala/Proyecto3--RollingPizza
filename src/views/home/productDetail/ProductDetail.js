import React from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../config/axiosInit";

const ProductDetail = ({ URL, getApi, UrlOrder, getApiOrder }) => {
  //steate
  const [product, setProduct] = useState({});
  //useParams
  const { _id } = useParams();
  //variables de referencia - references
  const productNameRef = useRef("");
  const productPriceRef = useRef("");

  const navigate = useNavigate();
  //llamado a la api para obtener el producto con su id
  useEffect(() => {
    getOne();
  }, []);

  const getOne = async () => {
    try {
      //peticion con axios
      const res = await axios.get(`${URL}/${_id}`);
      const productApi = await res.data;
      setProduct(productApi);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //enviar los datos
    const newOrder = {
      // para un solo estado con varios inputs
      productName: productNameRef.current.value,
      price: productPriceRef.current.value,
      quantity: product.quantity,
    };

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
          //  peticion con axios
          const res = await axios.post(UrlOrder, newOrder);
          if (res.status === 201) {
            Swal.fire("sent", "your order has been successfully shipped");
          }
          getApiOrder();
          e.target.reset(); // el e.target en este caso por el submit es el form
          //recarca la tabla
          // getApiOrder();
          //navega hasta la tabla de productos
          navigate("/");
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
    <Container className="containerProductDetail">
      <Row className="j">
        <Col >
          <Card
            // style={{ width: "25rem", height: "30rem" }}
            className="bg-cardDetail text-white cardDetail"
          >
            <Card.Img
              variant="top"
              src={product.urlImg}
              className="imgCardDetail"
            />
            <Card.Body className="text-center cardBodyDetail">
              <Card.Title>{product.productName}</Card.Title>
              <Card.Text className="mt-3">
                {product.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col >
          {/* Form Product */}
          <Form className="my-5" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Ej: Café"
                name="productName"
                disabled
                defaultValue={product.productName}
                ref={productNameRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>$Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej: 50"
                name="price"
                defaultValue={product.price}
                ref={productPriceRef}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>quantity*</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej: 3"
                name="quantity"
                min="1"
                onChange={({ target }) =>
                  setProduct({ ...product, quantity: target.value })
                }
              />
            </Form.Group>
            <div className="text-end">
              <button className="btn-yellow">Save</button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
