import "../../../Styles/MainPages/ListaPrivincias.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
const propiedades = [
  {
    id: 1,
    imagen: "/src/Imagenes/Img-provincias-main/san-jose.jpg",
    precio: "₡105,000,000",
    dormitorios: 7,
    banos: 7,
    tipo_categoria: 1,
    metrosCuadrados: 260,
    tipo: "Villa",
    ubicacion: "Talamanca, Limón, Costa Rica",
  },
  {
    id: 2,
    imagen: "/src/Imagenes/Img-provincias-main/san-jose.jpg",
    precio: "₡80,000,000",
    dormitorios: 3,
    banos: 2.5,
    tipo_categoria: 1,
    metrosCuadrados: 185,
    tipo: "Casa",
    ubicacion: "Cartago, Cartago, Costa Rica",
  },
  {
    id: 3,
    imagen: "/src/Imagenes/Img-provincias-main/perez-zeledon.jpg",
    precio: "₡13,000,000",
    dormitorios: 0,
    banos: 0,
    tipo_categoria: 1,
    metrosCuadrados: 5437,
    tipo: "Terreno (Parcela)",
    ubicacion: "Guacimo, Limón, Costa Rica",
  },
  {
    id: 4,
    imagen: "/src/Imagenes/Img-provincias-main/san-jose.jpg",
    precio: "₡1,100,000,000",
    dormitorios: 11,
    banos: 14,
    tipo_categoria: 1,
    metrosCuadrados: 515,
    tipo: "Hotel",
    ubicacion: "San Ramón, Alajuela, Costa Rica",
  },
  {
    id: 2,
    imagen: "/src/Imagenes/Img-provincias-main/san-jose.jpg",
    precio: "₡80,000,000",
    dormitorios: 3,
    banos: 2.5,
    tipo_categoria: 1,
    metrosCuadrados: 185,
    tipo: "Casa",
    ubicacion: "Cartago, Cartago, Costa Rica",
  },
  {
    id: 3,
    imagen: "/src/Imagenes/Img-provincias-main/perez-zeledon.jpg",
    precio: "₡13,000,000",
    dormitorios: 0,
    banos: 0,
    tipo_categoria: 2,
    metrosCuadrados: 5437,
    tipo: "Terreno (Parcela)",
    ubicacion: "Guacimo, Limón, Costa Rica",
  },
  {
    id: 4,
    imagen: "/src/Imagenes/Img-provincias-main/san-jose.jpg",
    precio: "₡1,100,000,000",
    dormitorios: 11,
    banos: 14,
    tipo_categoria: 1,
    metrosCuadrados: 515,
    tipo: "Hotel",
    ubicacion: "San Ramón, Alajuela, Costa Rica",
  },
];

function ListaPropiedadesOfSeller() {
  return (
    <section className="mt-5">
      <div className="ms-5">
        <h1 style={{ color: "#198754d6", fontFamily: "Raleway" }}>
          Con RealState.co.cr podras manejar el inventario de tus propiedades
        </h1>
        <p style={{ fontFamily: "bootstrap-icons" }}>
          Esperamos que tus propiedades inmobiliarias más sean de gran
          relevancia en RealState.co.cr!
        </p>
      </div>
      <Row className="p-5">
        {propiedades.map((propiedad) => (
          <Col key={propiedad.id} md={2} lg={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={propiedad.imagen} />
              <Card.Body>
                <Card.Title>{propiedad.precio}</Card.Title>
                <Card.Text>
                  <section className="d-flex mb-2">
                    <i className="bi bi-house-fill"></i> {propiedad.tipo}
                    <br />
                    <i className="bi bi-arrows-fullscreen ms-4"></i>{" "}
                    {propiedad.metrosCuadrados} m²
                    <br />
                  </section>
                  {propiedad.tipo_categoria === 1 && (
                    <section className="d-flex">
                      <i className="bi bi-droplet-fill"></i> {propiedad.banos}
                      <br />
                      <i className="bi bi-door-open-fill ms-4"></i>{" "}
                      {propiedad.dormitorios} Dormitorios
                      <br />
                    </section>
                  )}
                  <i className="bi bi-geo-alt-fill"></i> {propiedad.ubicacion}
                  <br />
                </Card.Text>
                <Button variant="primary" style={{ width: "100px" }}>
                  {" "}
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/MainProperty"
                  >
                    Ver
                  </Link>
                </Button>
                <Button
                  variant="primary"
                  className="btn btn-warning ms-2"
                  style={{ width: "100px" }}
                >
                  {" "}
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/EditPropertySeller"
                  >
                    Editar
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}

export default ListaPropiedadesOfSeller;
