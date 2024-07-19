import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import styled from "styled-components";

const CustomLabel = styled(Form.Label)`
  font-weight: bold;
  color: cadetblue;
  font-size: 16px;
`;

const AddCaracteristicsProperty = ({ idPropiedad }) => {
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
    try {
      const response = await axios.post(
        "http://localhost:3000/caracteristicas",
        caracteristicas
      );
      console.log("Caracteristicas guardadas:", caracteristicas, e, response);
    } catch (error) {
      console.error("Error al guardar las caracteristicas:", error);
    }
  };

  return (
    <div style={{ background: "#007bff1a" }}>
      <Container className="p-5">
        <Form
          style={{ width: "100%" }}
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <h3
            style={{
              color: "#212529",
              textAlign: "center",
              marginBottom: "30px",
              fontWeight: "bold",
            }}
          >
            Caracteristicas principales de la propiedad
          </h3>
          <Row className="mb-5">
            {" "}
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <CustomLabel>Numero de Baños </CustomLabel>
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
              <CustomLabel>Numero de Pisos </CustomLabel>
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
              <CustomLabel>Numero de Habitaciones </CustomLabel>
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
          <section className="mb-5">
            <Button variant="primary" onClick={handleSubmit} className="mt-3">
              Agregar Caracteristicas
            </Button>
          </section>
        </Form>
      </Container>
    </div>
  );
};

AddCaracteristicsProperty.propTypes = {
  idPropiedad: PropTypes.number.isRequired,
};

export default AddCaracteristicsProperty;
