// import emailjs from '@emailjs/browser';
import React, { useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../config/axiosInit";


const Register = ({ setLoggedUser }) => {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const URL = process.env.REACT_APP_API_USARIOS;

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  //useNavigate
  const navigate = useNavigate();



  //Funcion para crear el usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Valido los campos

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
        localStorage.setItem("user-token", JSON.stringify(data));
        setLoggedUser(data);
        navigate("/");
      }
    } catch (error) {
      setError(true);
      error.response.data?.message &&
        setErrorMessage(error.response.data?.message);
    }
  };

    //enviar email


 


  // var templateParams = {
  //   from_name: "La Bella Pizza",
  //   user_name: inputs.name,
  //   destinatario: inputs.email,
  //   message:
  //     "¡Hola y bienvenido a nuestra pizzería en línea! Con tu registro, podrás realizar pedidos en línea de manera rápida y sencilla, guardar tus direcciones y métodos de pago preferidos, y recibir actualizaciones sobre nuestras últimas ofertas y promociones especiales.",
  // };

  //  const functionEmail =() => {
    
  //   emailjs.send("service_bu5pb33", "template_7qe4chh", templateParams).then(
  //     function (response) {
  //       console.log("SUCCESS!", response.status, response.text);
  //     },
  //     function (error) {
  //       console.log("FAILED...", error);
  //     }
  //   );

  //   console.log("hola soy handleEmail");
  // }




  return (
    <div>
      <Container className="py-5">
        {/* <h1>Register</h1> <button className="btn-yellow" onClick={functionEmail}>Suscript</button> */}
        <hr />
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>User name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: John Doe"
              name="name"
              value={inputs.name || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              type="text"
              placeholder="johndoe@gmail.com"
              name="email"
              value={inputs.email || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ej: Ingrese su password"
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
