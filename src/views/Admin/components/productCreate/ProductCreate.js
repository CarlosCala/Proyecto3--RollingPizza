import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  validateProductName,
  validatePrice,
  validateUrl,
  validateCategory,
} from "../../../../helpers/validateFields";
import { useNavigate } from "react-router-dom";
import axios from "../../../../config/axiosInit";

const ProductCreate = ({ URL, getApi }) => {

  const [inputs, setInputs] = useState({});
  //useNavigate
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (

      !validateProductName(inputs.productName) ||
      !validatePrice(inputs.price) ||
      !validateUrl(inputs.urlImg) ||
      !validateCategory(inputs.category)
    ) {
      Swal.fire("oops! ", "Some data is invalid", "error");
      return;
    }
    //enviar los datos
    const newProduct = {
      // para un solo estado con varios inputs
      productName: inputs.productName,
      price: inputs.price,
      urlImg: inputs.urlImg,
      category: inputs.category,
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
          //  peticion con axios
          const res = await axios.post(URL, newProduct, {
            headers: {
              "Content-Type": "application/json"
            },
          });
          console.log(res);

          if (res.status === 201) {
            Swal.fire("created", "Your product has been created successfully");
          }
          e.target.reset(); // el e.target en este caso por el submit es el form
          //recarca la tabla
          getApi();
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
    <div>
      <Container className="py-5">
        <div className="bg-AddProduct">
        <h1>Add Product</h1>
        </div>
        <hr />
        {/* Form Product */}
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Café"
              name="productName"
              value={inputs.productName || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price*</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 50"
              name="price"
              value={inputs.price || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image URL*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: https://media.istockphoto.com/photos/two-freshly-baked-french-id1277579771?k=20"
              name="urlImg"
              value={inputs.urlImg || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Category*</Form.Label>
            <Form.Select
              name="category"
              value={inputs.category || ""}
              onChange={(e) => handleChange(e)}
            >
              <option value="">Select an option</option>
              <option value="italiana">Italiana</option>
              <option value="americana">Americana</option>
              <option value="especial">Especial</option>
              <option value="fugazzeta">Fugazzeta</option>
              <option value="bebidas">Bebidas</option>
              <option value="postre">Postre</option>
            </Form.Select>
          </Form.Group>
          <div className="text-end">
            <button className="btn-yellow">Save</button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default ProductCreate;
