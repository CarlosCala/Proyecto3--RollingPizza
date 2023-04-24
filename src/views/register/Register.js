// import emailjs from '@emailjs/browser';
import React, { useRef, useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../config/axiosInit";
import emailjs from "@emailjs/browser";

const Register = ({ setLoggedUser }) => {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [shown, setShown] = useState(false);
  const [password, setPassword] = React.useState("");

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
  const navigate = useNavigate();

  const switchShown = () => setShown(!shown);

  const onPassword = ({ currentTarget }) => setPassword(currentTarget.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidForm = form.current.checkValidity();
    form.current.classList.add("was-validated");

    if (!isValidForm) {
      return;
    }

    if (inputs.password !== inputs.passwordTwo) {
      setErrorMessage("Las contraseñas no coinciden");
      setError(true);
      return;
    }

    const newUser = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
    };
    try {
      setLoading(true);
      const res = await axios.post(`${URL}/register`, newUser);
      if (res.status === 201) {
        Swal.fire("Created!", "Your user has been created.", "success");
        const data = res.data;
        navigate("/auth/login/");
      }
    } catch (error) {
      setError(true);
      error.response.data?.message &&
        setErrorMessage(error.response.data?.message);
    } finally {
      setLoading(false);
    }

    emailjs
      .sendForm(
        "service_bu5pb33",
        "template_7qe4chh",
        form.current,
        "P_xOKQw16BgcYaIBL"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <Container className="py-5 registerContainer">
        <h1 className="registeTitle">Register</h1>
        <hr />
        <Form className="my-5" onSubmit={handleSubmit} ref={form}>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>User name*</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Ej: James Parker"
              name="name"
              maxLength={30}
              minLength={5}
              value={inputs.name || ""}
              onChange={(e) => handleChange(e)}
              isInvalid={inputs.name && /[^a-zA-Z\s]/.test(inputs.name)}
              isValid={inputs.name && !/[^a-zA-Z\s]/.test(inputs.name)}
            />
            <Form.Control.Feedback type="invalid">
              No numbers or symbols allowed as user name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              type="email"
              placeholder="jamesP@gmail.com"
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
              Use a correct email format.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password*</Form.Label>
            <Form.Control
              type={shown ? "text" : "password"}
              placeholder="Ej: enter your password"
              minLength={8}
              name="password"
              value={inputs.password || ""}
              onChange={(e) => {
                handleChange(e);
                onPassword();
              }}
            />
          </Form.Group>

          <Form.Group
            className="mb-3 text-end formShowPassword"
            controlId="formBasicPassword"
          >
            <Form.Control
              className="showPassword"
              type="button"
              value={shown ? "Ocultar" : "Mostrar"}
              onClick={switchShown}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPasswordRep">
            <Form.Label>Repeat Password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ej: Repeat your password"
              minLength="5"
              maxLength="18"
              name="passwordTwo"
              required
              onChange={(e) => handleChange(e)}
              isInvalid={inputs.password !== inputs.passwordTwo}
            />

            <Form.Control.Feedback type="invalid">
              Las contraseñas no coinciden
            </Form.Control.Feedback>
          </Form.Group>
          {loading ? (
            <div className="text-center">
              <span class="loader"></span>
            </div>
          ) : (
            <div className="text-center">
              <button className="btn-yellow">Register</button>
            </div>
          )}
          <Link to="/auth/login" className="btn btnBack text-decoration-none">
            Back to login
          </Link>
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
