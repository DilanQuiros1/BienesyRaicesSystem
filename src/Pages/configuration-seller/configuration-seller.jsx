import { Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import "./Styles-configuration-seller/configuration-seller.css";
import RegisterClientSeller from "../login-client-seller/register-client-seller";
import { Link } from "react-router-dom";
import ListaPropiedadesOfSeller from "./components/propertys-of-seller";

function Prueba() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className="seller-view">
      <header className="seller-header">
        <h1 className="mt-4">Bienvenido a tu perfil de vendedor</h1>
        <p>Esperamos tengas saques el mayor provecho del sistema</p>
      </header>
      <Container className="seller-content">
        <Row
          className="justify-content-center"
          style={{ position: "relative", left: "18%" }}
        >
          <Col xs="auto">
            <Button
              variant="primary"
              className="seller-button"
              onClick={() => setModalShow(true)}
            >
              Editar Perfil
            </Button>
            <RegisterClientSeller
              show={modalShow}
              onHide={() => setModalShow(false)}
              isEdit={true}
            />
          </Col>
          <Col xs="auto">
            <Button variant="success" className="seller-button">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/RegisterProperty"
              >
                Agregar Propiedad
              </Link>
            </Button>
          </Col>
          <Col xs="auto">
            <Button variant="secondary" className="seller-button">
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Home
              </Link>
            </Button>
          </Col>
        </Row>
      </Container>
      <main style={{ position: "relative", top: "150px" }} className="p-5">
        <ListaPropiedadesOfSeller />
      </main>
    </div>
  );
}

export default Prueba;
