import { useEffect, useRef, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  validateCategory,
  validatePrice,
  validateProductName,
  validateUrl,
} from "../../../../helpers/validateFields";
import axios from "../../../../config/axiosInit";

const ProductEdit = ({ URL, getApi }) => {
  //steate
  const [product, setProduct] = useState({});
  const [inputs, setInputs] = useState({});
  //useParams
  const { _id } = useParams();
  //variables de referencia - references
  const productNameRef = useRef("");
  const productPriceRef = useRef("");
  const productDescription = useRef("");
  const productImgRef = useRef("");

  const navigate = useNavigate();

  const resetValidation = () => {
    form.current.classList.remove("was-validated");
  };

  const form = useRef();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    resetValidation();

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

    const isValidForm = form.current.checkValidity();
    form.current.classList.add("was-validated");

    if (!isValidForm) {
      return;
    }

    //validaciones
    if (
      !validateProductName(productNameRef.current.value) ||
      !validatePrice(productPriceRef.current.value) ||
      !validateUrl(productImgRef.current.value) ||
      !validateCategory(product.category)
    ) {
      Swal.fire("oops! ", "Some data is invalid", "error");
      return;
    }
    // guardar el objeto
    const productUpdate = {
      productName: productNameRef.current.value,
      price: productPriceRef.current.value,
      description: productDescription.current.value,
      urlImg: productImgRef.current.value,
      category: product.category,
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
          const res = await axios.put(`${URL}/${_id}`, productUpdate);

          if (res.status === 200) {
            Swal.fire("Update", "your file has been updated", "succes");
          }
          getApi();
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
      <Container className="py-5 containerEditProduct">
        <h1 className="editProduct">Edit Product</h1>
        <hr />
        {/* Form Product */}
        <Form className="my-5" onSubmit={handleSubmit} ref={form}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Café"
              defaultValue={product.productName}
              ref={productNameRef}
              onChange={(e) => handleChange(e)}
              isInvalid={
                productNameRef.current.value &&
                /[^a-zA-Z\s]/.test(productNameRef.current.value)
              }
            />
            <Form.Control.Feedback type="invalid">
              No numbers or symbols are allowed as product name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price*</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 50"
              defaultValue={product.price}
              ref={productPriceRef}
              onChange={(e) => handleChange(e)}
              min={1}
              max={10000}
              isInvalid={productPriceRef.current.value > 10000}
            />
            <Form.Control.Feedback type="invalid">
              the price must be less than $10000
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description*</Form.Label>
            <Form.Control
              type="text"
              placeholder="pizza topped with mozzarella cheese and cantimpalo"
              name="description"
              defaultValue={product.description}
              onChange={(e) => handleChange(e)}
              maxLength={150}
              ref={productDescription}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image URL*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: https://media.istockphoto.com/photos/two-freshly-baked-french-id1277579771?k=20"
              defaultValue={product.urlImg}
              ref={productImgRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Category*</Form.Label>
            <Form.Select
              value={product.category}
              onChange={({ target }) =>
                setProduct({ ...product, category: target.value })
              }
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
            <button className="btn-orange">Update</button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default ProductEdit;
