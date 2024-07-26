import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import styled from "styled-components";

const CustomLabel = styled(Form.Label)`
  font-weight: bold;
  color: cadetblue;
  font-size: 16px;
`;

const AddCaracteristicsProperty = ({
  idPropiedad,
  onShowUbication,
  isEditing,
}) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log("enviar");
    } else {
      addCaracteristicas();
    }

    setValidated(true);
  };

  const handleShowUbicationClick = () => {
    onShowUbication();
  };

  const [caracteristicas, setCaracteristicas] = useState({
    ID_Caracteristicas: idPropiedad,
    Num_Habitaciones: 0,
    Num_Banos: 0,
    Num_Pisos: 0,
    Area_Lote: "",
    Area_Casa: "",
  });

  const handleChangeCaracteristicas = (e) => {
    const { name, value } = e.target;
    setCaracteristicas({ ...caracteristicas, [name]: value });
  };

  const addCaracteristicas = async (e) => {
    console.log(caracteristicas);
    try {
      const response = await axios.post(
        "http://localhost:3000/caracteristicas",
        caracteristicas
      );
      onShowUbication();
      console.log("Caracteristicas guardadas:", caracteristicas, e, response);
    } catch (error) {
      console.error("Error al guardar las caracteristicas:", error);
    }
  };

  return (
    <div>
      <Form
        style={{ width: "100%" }}
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        {isEditing ? "" : <HeaderCaracteristicas />}

        <div style={{ display: "flex", gap: "80px", width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              maxWidth: "50%",
            }}
          >
            <Row className="mb-5">
              {" "}
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <CustomLabel>N. Baños </CustomLabel>
                <InputGroup hasValidation>
                  <Form.Control
                    type="number"
                    name="Num_Banos"
                    value={caracteristicas.Num_Banos}
                    onChange={handleChangeCaracteristicas}
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Agregar cantidad de baños
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <CustomLabel>N. Pisos </CustomLabel>
                <InputGroup hasValidation>
                  <Form.Control
                    type="number"
                    name="Num_Pisos"
                    value={caracteristicas.Num_Pisos}
                    onChange={handleChangeCaracteristicas}
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Agregar cantidad de baños
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <CustomLabel>N. Habitaciones </CustomLabel>
                <InputGroup hasValidation>
                  <Form.Control
                    type="number"
                    name="Num_Habitaciones"
                    value={caracteristicas.Num_Habitaciones}
                    onChange={handleChangeCaracteristicas}
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Agregar cantidad de baños
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <CustomLabel>Tamaño de lote </CustomLabel>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">m²</InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="Area_Lote"
                    value={caracteristicas.Area_Lote}
                    onChange={handleChangeCaracteristicas}
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingresa el Tamaño de la propiedad.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <CustomLabel>Tamaño de casa </CustomLabel>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">m²</InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="Area_Casa"
                    value={caracteristicas.Area_Casa}
                    onChange={handleChangeCaracteristicas}
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingresa el Tamaño de la propiedad.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
          </div>
          <div>
            <img
              style={{ width: "30em", borderRadius: "10px" }}
              src="https://res.cloudinary.com/djxwusqnb/image/upload/v1721243917/nnv8pkjs7bmqbjgq1vni.jpg"
            />
          </div>
        </div>
        <p style={{ color: "#198754", fontSize: "1.1em" }}>
          Si ya agregaste todos los datos, preciona el siguiente boton.
        </p>
        <section className="mb-5">
          <Button variant="dark" onClick={handleSubmit} className="mt-3">
            {isEditing ? "Editar Caracteristicas" : "Agregar Caracteristicas"}
          </Button>
          <Button
            variant="dark"
            onClick={handleShowUbicationClick}
            className="mt-3"
          >
            {isEditing ? "Editar Caracteristicas" : "Agregar Caracteristicas"}
          </Button>
        </section>
      </Form>
    </div>
  );
};

function HeaderCaracteristicas() {
  return (
    <section className="mb-5">
      <h1
        style={{
          color: "#28a745",
          fontSize: "3em",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        Paso #1
      </h1>
      <h5
        style={{
          color: "#495057",
          marginBottom: "30px",
          fontWeight: "bold",
        }}
      >
        Caracteristicas principales de la propiedad
      </h5>
      <p style={{ color: "#adb5bd" }}>Empecemos con lo basico</p>
      <p style={{ color: "#adb5bd" }}>
        Agrega las caracteristicas principales de tu propiedad
      </p>
      <p style={{ color: "#adb5bd" }}>
        Te guiaremos en el registro de tu propiedad !!
      </p>
    </section>
  );
}

AddCaracteristicsProperty.propTypes = {
  idPropiedad: PropTypes.number.isRequired,
  onShowUbication: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default AddCaracteristicsProperty;
