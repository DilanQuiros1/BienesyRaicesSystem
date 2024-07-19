import styled from "styled-components";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const HeaderContainer = styled.div`
  background-image: url("https://res.cloudinary.com/djxwusqnb/image/upload/v1721243119/zc4yvaxwddqlgrwqs5ez.jpg");
  background-size: cover;
  background-position: center;
  padding: 50px 0;
  color: white;
  text-align: center;
`;

const Section = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: black;
  margin: 20px;
`;

const Icon = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;

const HeaderSeller = () => {
  return (
    <HeaderContainer>
      <Container>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "23em",
          }}
        >
          <div>
            <h1
              className="my-4"
              style={{
                color: "white",
                fontFamily: "sans-serif",
                fontWeight: "700",
              }}
            >
              Registrar Propiedad
            </h1>
          </div>
          <div>
            <Button
              variant="secondary"
              style={{ width: "10em", height: "40px" }}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/Prueba"
              >
                Salir
              </Link>
            </Button>
          </div>
        </div>
        <Row>
          <Col md={4}>
            <Section>
              <Icon>🔒</Icon> {/* Puedes usar iconos de tu elección */}
              <h3>SEGURIDAD</h3>
              <p>
                RealState.com te brinda la mayor seguridad donde podras
                administrar tus propiedades de forma segura.
              </p>
            </Section>
          </Col>
          <Col md={4}>
            <Section>
              <Icon>💰</Icon> {/* Puedes usar iconos de tu elección */}
              <h3>EL MEJOR PRECIO</h3>
              <p>
                Con nuestro sistema podras realizar varias funcionalidades para
                brindarte el mejor servicio, al mejor precio
              </p>
            </Section>
          </Col>
          <Col md={4}>
            <Section>
              <Icon>⏰</Icon> {/* Puedes usar iconos de tu elección */}
              <h3>A TIEMPO</h3>
              <p>
                Te ofrecemos un equipo capacitado el cual estara disponible para
                ayudarte, comunicate con soporte si tienes dudas.
              </p>
            </Section>
          </Col>
        </Row>
      </Container>
    </HeaderContainer>
  );
};

export default HeaderSeller;
