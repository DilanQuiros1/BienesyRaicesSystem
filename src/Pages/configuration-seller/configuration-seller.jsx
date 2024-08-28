import { Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./Styles-configuration-seller/configuration-seller.css";
import RegisterClientSeller from "../login-client-seller/register-client-seller";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FrameComponent6 from "../../components/FrameComponent6";
import { useSearchParams } from "react-router-dom";
import ListaPropiedadesDinamic from "../../components/List-Propertys-dinamic";
import axios from "axios";
function Prueba() {
  const [modalShow, setModalShow] = useState(false);
  const [propertyCount, setPropertyCount] = useState(0);
  const [emailSeller, setEmailSeller] = useState();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const email = searchParams.get("Correo");
    setEmailSeller(email || ""); // Default to empty string if email is null
    const fetchPropertyCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/propiedades-count-vendedores",
          {
            params: { Correo: email },
          }
        );

        setPropertyCount(response.data.total);
      } catch (error) {
        console.error("Error fetching property count:", error);
      }
    };
    fetchPropertyCount();
    console.log(email); // Log the new email value
  }, [searchParams]);

  const navigateAddProperty = () => {
    navigate({
      pathname: "/RegisterProperty",
      search: `?Correo=${encodeURIComponent(searchParams.get("Correo"))}`,
    });
  };

  return (
    <div className="seller-view">
      <header className="seller-header">
        <h1 className="mt-4">Bienvenido a tu perfil de vendedor</h1>
        <p>Esperamos tengas saques el mayor provecho del sistema </p>
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
            <Button
              variant="success"
              onClick={navigateAddProperty}
              className="seller-button"
            >
              Agregar Propiedad
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
        {emailSeller && (
          <ListaPropiedadesDinamic
            nameApi={`http://localhost:3000/propiedades-principal-vendedores?Correo=${emailSeller}`}
            isviewSeller={true}
            correoSeller={emailSeller}
          />
        )}
        {propertyCount === 0 && (
          <Row className="text-center">
            <Col>
              <Alert variant="warning">
                <h4 className="mb-3">No hay propiedades disponibles</h4>
                <p>
                  Actualmente no tienes propiedades publicadas. ¡Es un buen
                  momento para agregar nuevas propiedades y aprovechar todas las
                  ventajas que nuestro sistema ofrece!
                </p>
                <Button variant="success" onClick={navigateAddProperty}>
                  Agregar Propiedad
                </Button>
              </Alert>
            </Col>
          </Row>
        )}
      </main>
      <section
        id="soporte"
        style={{
          padding: "30px",
          backgroundImage: "linear-gradient(180deg, #f8f9fa00, #495057)",
          marginTop: "100px",
        }}
      >
        <FrameComponent6 />
      </section>
    </div>
  );
}

export default Prueba;
