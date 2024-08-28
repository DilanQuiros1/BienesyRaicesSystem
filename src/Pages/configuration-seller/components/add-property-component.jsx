import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
const CustomLabel = styled(Form.Label)`
  font-weight: bold;
  color: cadetblue;
  font-size: 16px;
`;

const AddProperty = ({ idPropiedad, onShowServices, isEditing }) => {
  const [validated, setValidated] = useState(false);
  const [searchParams] = useSearchParams();
  const [addedSuccess, setAddedSuccess] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    // Verifica si el formulario es válido
    if (form.checkValidity() === false) {
      console.log("Formulario inválido");
    } else {
      // Verifica si todos los campos requeridos están llenos
      const formData = new FormData(form);
      const allFieldsFilled = Array.from(formData.values()).every(
        (value) => value.trim() !== ""
      );

      if (allFieldsFilled) {
        if (isEditing) {
          editPropertySeller();
        } else {
          addPropertySeller();
        }
        console.log("Formulario enviado con éxito");
      } else {
        console.log("Por favor, llena todos los campos requeridos");
      }
    }

    setValidated(true);
  };

  const [property, setProperty] = useState({
    ID_Propiedad: idPropiedad,
    ID_Vendedor: "",
    ID_Caracteristicas: idPropiedad,
    Nombre: "",
    Descripcion: "",
    Fecha_Creacion: "",
    Precio: "",
    ID_Ubicacion: idPropiedad,
  });

  useEffect(() => {
    const fetchProperty = async () => {
      const response = await axios.get(
        `http://localhost:3000/propiedades-selected?ID_Property=${searchParams.get(
          "IdProperty"
        )}`
      );
      if (response.data && response.data.length > 0) {
        const data = response.data[0];
        const formattedFechaCreacion = data.Fecha_Creacion
          ? new Date(data.Fecha_Creacion).toISOString().split("T")[0]
          : "";
        setProperty({
          ID_Propiedad: data.ID_Propiedad,
          ID_Vendedor: data.ID_Vendedor,
          ID_Caracteristicas: data.ID_Propiedad,
          Fecha_Creacion: formattedFechaCreacion,
          Nombre: data.Nombre,
          Descripcion: data.Descripcion,
          Precio: data.Precio,
          ID_Ubicacion: data.ID_Propiedad,
        });
      }
    };
    if (isEditing) {
      fetchProperty();
    }
  }, [searchParams, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const addPropertySeller = async () => {
    console.log(property);
    try {
      if (property.Descripcion.length > 254) {
        Swal.fire("Descripcion muy extesa!");
      } else {
        const response = await axios.post(
          "http://localhost:3000/propiedades",
          property
        );
        console.log("Propiedad guardada:", response.data);
        onShowServices();
      }
    } catch (error) {
      console.error("Error al guardar la propiedad:", error);
    }
  };
  const variant = isEditing ? "warning" : "dark";

  const handleShowServices = () => {
    onShowServices();
  };

  const editPropertySeller = async () => {
    console.log("Edit: ", property);
    try {
      const response = await axios.put(
        `http://localhost:3000/propiedades/${searchParams.get("IdProperty")}`,
        property
      );
      console.log("Propiedad guardada:", response.data);
      setAddedSuccess(true);
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
                disabled={isEditing}
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
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                <Form.Control.Feedback type="invalid">
                  Ingresa la direccion de la propiedad.
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <CustomLabel>Fecha de Creación</CustomLabel>
              <Form.Control
                required
                type="date"
                name="Fecha_Creacion"
                onChange={handleChange}
                value={property.Fecha_Creacion} // Ensure this is in the format 'YYYY-MM-DD'
              />
              <Form.Control.Feedback type="invalid">
                Ingresa la fecha de creación.
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <p style={{ color: "#198754", fontSize: "1.1em" }}>
            Si ya agregaste todos los datos, preciona el siguiente boton.
          </p>
          {addedSuccess && (
            <section style={{ padding: "25px", background: "#dee2e6" }}>
              <p>
                Su propiedad se guardó de forma correcta con los datos que
                proporcionaste, ¡muchas gracias por utilizar nuestros servicios!
              </p>
              {!isEditing && (
                <Button
                  variant="success"
                  onClick={() => window.location.reload()}
                  className="mt-3"
                >
                  Agregar Otra Propiedad
                </Button>
              )}
            </section>
          )}
          <section className="mb-5 mt-5">
            <Button variant={variant} type="submit" className="mt-3">
              {isEditing
                ? "Editar datos principales"
                : "Agregar Datos principales"}
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
  onShowServices: PropTypes.func,
  isEditing: PropTypes.bool.isRequired,
};
export default AddProperty;
