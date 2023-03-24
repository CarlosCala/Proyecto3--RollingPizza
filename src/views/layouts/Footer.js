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
  return (
    <MDBFooter className="text-center text-lg-start text-dark bg-footer">
      
      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                La Bella Pizza
              </h6>
              <p>
                Esta pizzería ofrece a sus clientes la mejor variedad
                de pizzas caseras hechas con los mejores ingredientes y sabores
                auténticos, preparadas al momento para ofrecer una experiencia
                de sabor única. Disfruta de la auténtica comida de varias culturas en un
                ambiente acogedor y disfruta de la mejor pizza de la ciudad.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
              <Link to="*" className="text-dark">
              Pizzas</Link>
              </p>
              <p>
              <Link to="*" className="text-dark">
              Calzones</Link>
              </p>
              <p>
              <Link to="*" className="text-dark">
              Bebidas</Link>
              </p>
              <p>
              <Link to="*" className="text-dark">
              Postres</Link>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Social Media </h6>
              <p>
              <Link to="*" className="text-dark">
              Instagram</Link>
              </p>
              <p>
              <Link to="*" className="text-dark">
              Facebook</Link>
              </p>
              <p>
              <Link to="*" className="text-dark">
              TikTok</Link>
              </p>
              <p>
              <Link to="*" className="text-dark">
              Twitter</Link>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@example.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2021 Copyright:
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
  );
}
