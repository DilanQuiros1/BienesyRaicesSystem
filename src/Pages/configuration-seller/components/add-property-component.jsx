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

const AddProperty = ({ idPropiedad, onShowServices }) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleShowServices = () => {
    onShowServices();
  };

  const [property, setProperty] = useState({
    ID_Propiedad: idPropiedad,
    ID_Vendedor: 0,
    ID_Caracteristicas: idPropiedad,
    Nombre: "",
    Descripcion: "",
    Precio: "",
    ID_Ubicacion: idPropiedad,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const addPropertySeller = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/propiedades",
        property
      );
      console.log("Propiedad guardada:", response.data);
      onShowServices();
    } catch (error) {
      console.error("Error al guardar la propiedad:", error);
    }
  };

  return (
    <div style={{ background: "white" }}>
      <div style={{ width: "100%" }}>
        <Form
          style={{ width: "100%" }}
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Row className="mb-5">
            <h3
              style={{
                color: "#495057",
                marginBottom: "30px",
                fontWeight: "bold",
              }}
            >
              Datos de principales de la propiedad
            </h3>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <CustomLabel>ID de Vendedor</CustomLabel>
              <Form.Control
                required
                type="number"
                name="ID_Vendedor"
                onChange={handleChange}
                value={property.ID_Vendedor}
              />
              <Form.Control.Feedback type="invalid">
                Ingresa su ID.
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <CustomLabel>Nombre de propiedad</CustomLabel>
              <Form.Control
                required
                type="text"
                name="Nombre"
                onChange={handleChange}
                value={property.Nombre}
                defaultValue="Mark"
              />
              <Form.Control.Feedback type="invalid">
                Ingresa el nombre de la propiedad.
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <CustomLabel>Precio </CustomLabel>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                <Form.Control
                  type="number"
                  name="Precio"
                  value={property.Precio}
                  onChange={handleChange}
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa el precio.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <section style={{ display: "flex", gap: "10px" }}>
            <div style={{ width: "50%" }}>
              <img
                style={{
                  width: "100%",
                  height: "17.8em",
                  borderRadius: "10px",
                }}
                src="https://res.cloudinary.com/djxwusqnb/image/upload/v1721942408/pr89me44zgqd7agqsp7a.png"
                alt=""
              />
            </div>
            <div style={{ width: "50%" }}>
              <img
                src="https://res.cloudinary.com/djxwusqnb/image/upload/v1721696201/kpzuxiojryoqhjmijtso.png"
                style={{
                  width: "100%",
                  height: "17.8em",
                  borderRadius: "10px",
                }}
                alt=""
              />
            </div>
          </section>
          <Row className="mb-2 mt-5">
            <Form.Group controlId="validationCustom01">
              <CustomLabel>Descripcion General</CustomLabel>
              <Form.Group className="mb-3">
                <Form.Control
                  required
                  name="Descripcion"
                  onChange={handleChange}
                  value={property.Descripcion}
                  as="textarea"
                  rows={5}
                />
              </Form.Group>
              <Form.Control.Feedback type="invalid">
                Ingresa la description de la propiedad.
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <p style={{ color: "#198754", fontSize: "1.1em" }}>
            Si ya agregaste todos los datos, preciona el siguiente boton.
          </p>
          <section className="mb-5 mt-5">
            <Button variant="dark" onClick={addPropertySeller} className="mt-3">
              Agregar Propiedad
            </Button>
            <Button
              variant="dark"
              onClick={handleShowServices}
              className="mt-3"
            >
              Mostrar Servicios
            </Button>
          </section>
        </Form>
      </div>
    </div>
  );
};
AddProperty.propTypes = {
  idPropiedad: PropTypes.number.isRequired,
  onShowServices: PropTypes.func.isRequired,
};
export default AddProperty;
