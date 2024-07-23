import "../../Styles/MainPages/ListaPrivincias.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FrameComponent6 from "../../components/FrameComponent6";
import CharacteristicSystem from "./characteristics";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const ListaPrivincias = () => {
  return (
    <div>
      <div id="ContainerMain">
        <main>
          <ul id="ListaProvincias">
            <div className="Container-provincia" id="Container-Sj">
              <div className="fondo-img">
                <p>Busco Propiedad en:</p>
                <p>San Jose</p>
              </div>
            </div>
            <div className="Container-provincia" id="Container-Heredia">
              <div className="fondo-img">
                <p>Busco Propiedad en:</p>
                <p>Heredia</p>
              </div>
            </div>
            <div className="Container-provincia" id="Container-pz">
              <div className="fondo-img">
                <p>Busco Propiedad en:</p>
                <p>Perez Zeledon</p>
              </div>
            </div>
            <div className="Container-provincia" id="Container-cartago">
              <div className="fondo-img">
                <p>Busco Propiedad en:</p>
                <p>Cartago</p>
              </div>
            </div>
            <div className="Container-provincia" id="Container-guanacaste">
              <div className="fondo-img">
                <p>Busco Propiedad en:</p>
                <p>Guanacaste</p>
              </div>
            </div>
            <div className="Container-provincia" id="Container-puntarenas">
              <div className="fondo-img">
                <p>Busco Propiedad en:</p>
                <p>Puntarenas</p>
              </div>
            </div>
            <div className="Container-provincia" id="Container-limon">
              <div className="fondo-img">
                <p>Busco Propiedad en:</p>
                <p>Limon</p>
              </div>
            </div>
          </ul>
        </main>
      </div>
      <section id="ventas" className="mt-5">
        {ListaPropiedades()}
      </section>
      <section id="soporte" className="p-5">
        <FrameComponent6 />
      </section>
    </div>
  );
};

const ListaPropiedades = () => {
  const [propiedades, setPropiedades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch propiedades
        const propiedadesResponse = await axios.get(
          "http://localhost:3000/propiedades-principal"
        );
        const propiedadesData = propiedadesResponse.data;

        // Fetch imagenes
        const imagenesResponse = await axios.get(
          "http://localhost:3000/Imagenes"
        );
        const imagenesData = imagenesResponse.data;

        // Combine propiedades and imagenes
        const propiedadesConImagenes = propiedadesData.map((propiedad) => {
          const imagenes = imagenesData.filter(
            (imagen) => imagen.ID_Propiedad === propiedad.ID_Propiedad
          );
          return { ...propiedad, imagenes };
        });

        setPropiedades(propiedadesConImagenes);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mt-5" id="ContainerListaProvincias">
      <div className="ms-5 mt-5" id="ContainerTextInitial">
        <h1 style={{ fontFamily: "Yantramanav", color: "#495057" }}>
          Propiedades e Inmuebles interesantes de RealState.co.cr en Costa Rica
        </h1>
        <p style={{ fontFamily: "bootstrap-icons" }}>
          Conocemos bien nuestro catálogo. ¡Eche un vistazo a los anuncios de
          las propiedades inmobiliarias más importantes de RealState.co.cr!
        </p>
      </div>
      <section id="ContainerCharacteristics">
        <CharacteristicSystem />
      </section>
      <Row className="p-5">
        {propiedades.map((propiedad) => (
          <Col key={propiedad.ID_Propiedad} md={2} lg={3} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={
                  propiedad.imagenes.length > 0
                    ? propiedad.imagenes[0].Url_img
                    : "default.jpg"
                }
              />
              <Card.Body>
                <div className="d-flex">
                  <Card.Title>{propiedad.Precio}</Card.Title>
                  <div className="icon-liked">
                    <i className="bi bi-heart"></i>
                  </div>
                </div>

                <Card.Text>
                  <section className="d-flex mb-2">
                    <i
                      className="bi bi-house-fill"
                      style={{ marginRight: "5px" }}
                    ></i>{" "}
                    {propiedad.Nombre}
                    <br />
                    <i
                      className="bi bi-arrows-fullscreen ms-4"
                      style={{ marginRight: "5px" }}
                    ></i>{" "}
                    {propiedad.Area_Lote} m²
                    <br />
                  </section>
                  <section className="d-flex">
                    <i className="bi bi-droplet-fill"></i> {propiedad.Num_Banos}{" "}
                    Baños
                    <br />
                    <i
                      className="bi bi-door-open-fill ms-4"
                      style={{ marginRight: "7px" }}
                    ></i>{" "}
                    {propiedad.Num_Habitaciones} Dormitorios
                    <br />
                  </section>
                  <i className="bi bi-geo-alt-fill"></i> {propiedad.Ciudad},{" "}
                  {propiedad.Provincia}, {propiedad.Pais}
                  <br />
                </Card.Text>

                <Button variant="primary" style={{ width: "100px" }}>
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/MainProperty"
                  >
                    Ver
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default ListaPrivincias;
