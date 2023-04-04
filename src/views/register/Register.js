// import emailjs from '@emailjs/browser';
import React, { useRef, useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../config/axiosInit";

const Register = ({ setLoggedUser }) => {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [validated, setValidated] = useState(false);

  const URL = process.env.REACT_APP_API_USARIOS;

  const resetValidation = () => {
    form.current.classList.remove("was-validated");
  };

  const form = useRef();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    resetValidation();

    setInputs((values) => ({ ...values, [name]: value }));
  };

  //useNavigate
  const navigate = useNavigate();
  //Funcion para crear el usuario

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Valido los campos
    const isValidForm = form.current.checkValidity();
    form.current.classList.add("was-validated");

    if (!isValidForm) {
      return;
    }
    //Envio los datos para guardarlos
    const newUser = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
    };
    try {
      const res = await axios.post(`${URL}/register`, newUser);
      if (res.status === 201) {
        Swal.fire("Created!", "Your user has been created.", "success");
        // const data = await res.json(); // si es con fetch
        const data = res.data;
        // localStorage.setItem("user-token", JSON.stringify(data));
        // setLoggedUser(data);
        navigate("/auth/login/");
      }
    } catch (error) {
      setError(true);
      error.response.data?.message &&
        setErrorMessage(error.response.data?.message);
    }
  };

  return (
    <div>
      <Container className="py-5">
        <h1>Register</h1>
        <hr />
        <Form className="my-5" onSubmit={handleSubmit} ref={form}>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>User name*</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Ej: John Doe"
              name="name"
              maxLength={30}
              minLength={5}
              value={inputs.name || ""}
              onChange={(e) => handleChange(e)}
              isInvalid={inputs.name && /[^a-zA-Z\s]/.test(inputs.name)}
              isValid={inputs.name && !/[^a-zA-Z\s]/.test(inputs.name)}
            />
            <Form.Control.Feedback type="invalid">
              No se permiten números o simbolos como nombre de usuario
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              type="email"
              placeholder="johndoe@gmail.com"
              name="email"
              maxLength={65}
              value={inputs.email || ""}
              onChange={(e) => handleChange(e)}
              isValid={
                inputs.email &&
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputs.email)
              }
              isInvalid={
                inputs.email &&
                !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputs.email)
              }
            />
            <Form.Control.Feedback type="invalid">
              Utilice un formato de email correcto
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ej: Ingrese su password"
              minLength={8}
              name="password"
              value={inputs.password || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Link to="/auth/login" className="btn-primary text-decoration-none">
            Back to login
          </Link>
          <div className="text-center">
            <button className="btn-yellow">Send</button>
          </div>
        </Form>
        {error ? (
          <Alert variant="danger" onClick={() => setError(false)} dismissible>
            {errorMessage}
          </Alert>
        ) : null}
      </Container>
    </div>
  );
};

export default Register;
