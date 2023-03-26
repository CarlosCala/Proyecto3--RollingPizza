import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function App() {
  const handleClick = () => {
    window.open("https://api.whatsapp.com/send?phone=543814644575", "_blank");
  };
  return (
    <MDBFooter className="text-center text-lg-start text-white bg-footer ">
      <section className="mt-5 ">
        <MDBContainer className="text-center text-md-start">
          <MDBRow className="mt-5">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4  footer">
              <h6 className="text-uppercase fw-bold mb-4 " >
                <MDBIcon icon="gem" className="me-3" />
                La Bella Pizza
              </h6>
              <p>
                Esta pizzería ofrece a sus clientes la mejor variedad de pizzas
                caseras hechas con los mejores ingredientes y sabores
                auténticos, preparadas al momento para ofrecer una experiencia
                de sabor única. Disfruta de la auténtica comida de varias
                culturas en un ambiente acogedor y disfruta de la mejor pizza de
                la ciudad.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4 text-center footer">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <Link
                  to="*"
                  className="text-white text-white text-decoration-none"
                >
                  Pizzas
                </Link>
              </p>
              <p>
                <Link
                  to="*"
                  className="text-white text-white text-decoration-none"
                >
                  Calzones
                </Link>
              </p>
              <p>
                <Link
                  to="*"
                  className="text-white text-white text-decoration-none"
                >
                  Bebidas
                </Link>
              </p>
              <p>
                <Link
                  to="*"
                  className="text-white text-white text-decoration-none"
                >
                  Postres
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4 text-center footer">
              <h6 className="text-uppercase fw-bold mb-4">Social Media </h6>
              <p>
                <Link to="*" className="text-white text-decoration-none">
                  Instagram
                </Link>
              </p>
              <p>
                <Link
                  to="*"
                  className="text-white text-white text-decoration-none"
                >
                  Facebook
                </Link>
              </p>

              <button
                onClick={handleClick}
                className="btn text-white text-decoration-none mr-5"
              >
                WhatsApp
              </button>
              <p>
                <Link
                  to="*"
                  className="text-white text-white text-decoration-none"
                >
                  Twitter
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4 text-center footer">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Av. Aconquija 134 , Yerba Buena , Tucuman
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                bellapizza@outlok.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 0 381 464 4571
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 381 424 9265
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        Copyright © 2023 La Bella Pizza. Todos los derechos reservados. Ninguna parte de este sitio web puede ser reproducida sin el permiso previo por escrito de La Bella Pizza.

      </div>
    </MDBFooter>
  );
}
