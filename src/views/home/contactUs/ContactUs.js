import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_bu5pb33",
        "template_xj71bql",
        form.current,
        "P_xOKQw16BgcYaIBL"
      )
      .then(
        (result) => {
          Swal.fire({
            icon: "success",
            title: "submit",
            text: "we will get back to you as soon as possible!",
          });
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <Container className="contactFormContainer py-5 ">
      <div className="text-center bgContactForm">
        <h1 clas>Contact Us</h1>
      </div>
      <Form ref={form} onSubmit={sendEmail}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Richar Parker"
            name="name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email </Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>enter your inquiry here</Form.Label>
          <Form.Control as="textarea" rows={3} name="message" required />
        </Form.Group>
        <Button type="submit" className="btn btn-warning">
          submit
        </Button>
      </Form>
    </Container>
  );
};

export default ContactUs;
