import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import MapComponent from "./maps";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import PropTypes from "prop-types";

const AddUbicationProperty = ({ idUbicacion }) => {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log("enviar");
    } else {
      addUbicaciones();
    }

    setValidated(true);
  };
  const [ubicaciones, setUbicaciones] = useState({
    ID_Ubicacion: idUbicacion,
    Direccion: 0,
    Ciudad: "",
    Provincia: "",
    Pais: "",
    CodigoPostal: "",
    Latitud: "",
    Longitud: "",
  });

  const handleChangeUbicaciones = (e) => {
    const { name, value } = e.target;
    setUbicaciones({ ...ubicaciones, [name]: value });
  };

  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceSelected = (place) => {
    setSelectedPlace(place);
    console.log("Selected place:", place); // Aquí puedes guardar las coordenadas en tu estado o enviarlas a tu backend
  };

  const addUbicaciones = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/ubicaciones",
        ubicaciones
      );
      console.log("Ubicaciones guardadas:", response.data);
    } catch (error) {
      console.error("Error al guardar las Ubicaciones:", error);
    }
  };

  return (
    <div style={{ background: "#007bff1a" }}>
      <Container>
        <Form noValidate validated={validated}>
          <Row className="mb-5 mt-5">
            <h3
              style={{
                color: "#212529",
                textAlign: "center",
                marginBottom: "30px",
                fontWeight: "bold",
              }}
            >
              Datos de Direccion de la propiedad
            </h3>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label style={{ color: "#9bd358cf", fontWeight: "700" }}>
                Pais
              </Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  name="Pais"
                  value={ubicaciones.Pais}
                  onChange={handleChangeUbicaciones}
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa el Pais.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label style={{ color: "#9bd358cf", fontWeight: "700" }}>
                Provincia
              </Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  name="Provincia"
                  value={ubicaciones.Provincia}
                  onChange={handleChangeUbicaciones}
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa la provincia.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label style={{ color: "#9bd358cf", fontWeight: "700" }}>
                Ciudad de la propiedad{" "}
              </Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  name="Ciudad"
                  value={ubicaciones.Ciudad}
                  onChange={handleChangeUbicaciones}
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa la ciudad.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label style={{ color: "#9bd358cf", fontWeight: "700" }}>
                Direccion{" "}
              </Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  name="Direccion"
                  value={ubicaciones.Direccion}
                  onChange={handleChangeUbicaciones}
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa la direccion.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label style={{ color: "#9bd358cf", fontWeight: "700" }}>
                Codigo Postal
              </Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="number"
                  name="CodigoPostal"
                  value={ubicaciones.CodigoPostal}
                  onChange={handleChangeUbicaciones}
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa el codigo postal.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <div style={{ with: "100%" }}>
            <h3
              style={{
                color: "#212529",
                textAlign: "center",
                marginBottom: "30px",
                fontWeight: "bold",
              }}
            >
              Busca la hubicacion de tu propiedad
            </h3>
            <MapComponent onPlaceSelected={handlePlaceSelected} />
            {selectedPlace && (
              <div>
                <h2>Coordenadas seleccionadas:</h2>
                <p>Latitud: {selectedPlace.lat}</p>
                <p>Longitud: {selectedPlace.lng}</p>
                {(ubicaciones.Latitud = selectedPlace.lat)}
                {(ubicaciones.Longitud = selectedPlace.lng)};
              </div>
            )}
          </div>

          <Button variant="primary" onClick={handleSubmit} className="mt-3">
            Agregar Ubicacion
          </Button>
        </Form>
      </Container>
    </div>
  );
};

AddUbicationProperty.propTypes = {
  idUbicacion: PropTypes.number.isRequired,
};

export default AddUbicationProperty;
