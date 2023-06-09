import React, { useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../config/axiosInit";

const Login = ({ setLoggedUser }) => {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const URL = process.env.REACT_APP_API_USARIOS;
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  //useNavigate
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${URL}/login`, {
        email: inputs.email,
        password: inputs.password,
      });

      if (res.status === 200) {
        Swal.fire("Logged!", "Your user has been logged.", "success");
        const data = res.data;
        if (data.admin === "administrador") {
          localStorage.setItem("user-token", JSON.stringify(data));
          setLoggedUser(data);
        } else {
          delete data["token"];
          localStorage.setItem("user-token", JSON.stringify(data));
          setLoggedUser(data);
        }

        navigate("/");
      }
    } catch (error) {
      setError(true);
      error.response.data?.message &&
        setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container className="py-5 loginContainer">
        <h1 className="loginTitle">Login</h1>
        <hr />
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              type="email"
              placeholder="johndoe@gmail.com"
              name="email"
              maxLength="45"
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
          {loading ? (
            <div className="text-center mt-1">
              <span class="loader"></span>
            </div>
          ) : (
            <>
              <Link
                to="/auth/register"
                className="btn btnNewUser text-decoration-none "
              >
                Register new user
              </Link>
              <div className="text-center">
                <button className="btn-yellow">Send</button>
              </div>
            </>
          )}
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

export default Login;
