import React from "react";
import { Container, Row, Col, Card, Button,Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../config/axiosInit";

const ProductDetail = ({ URL, getApi, UrlOrder, getApiOrder }) => {
  //steate
  const [product, setProduct] = useState({});
  const [inputs, setInputs] = useState({});
  //useParams
  const { _id } = useParams();
  //variables de referencia - references

  const navigate = useNavigate();


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

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
        productName: inputs.productName,
        price: inputs.price,
        quantity: inputs.quantity  
      };

    Swal.fire({
      title: "Will this be your order?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "order",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          //  peticion con axios
          const res = await axios.post(UrlOrder, newOrder)


          if (res.status === 201) {
            Swal.fire("sent", "your order has been successfully shipped");
          }
          e.target.reset(); // el e.target en este caso por el submit es el form
          //recarca la tabla
          getApiOrder();
          //navega hasta la tabla de productos
          navigate("/product/table");
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
    <Container className="bg-productDetail ">
              <Row className="j">
        <Col sm={8} >
        <Card
            style={{ width: "25rem", height: "30rem" }}
            className="bgCardDetail bg-black text-white"
          >
            <Card.Img
              variant="top"
              src={product.urlImg}
              className="imgCardDetail mt-1"
            />
            <Card.Body className="text-center">
              <Card.Title>{product.productName}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>

            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
        {/* Form Product */}
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Ej: Café"
              name="productName"
              disabled
              value={product.productName}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>$Price$</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 50"
              name="price"
              value={product.price}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>quantity*</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 3"
              name="quantity"
              onChange={(e) => handleChange(e)}
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
