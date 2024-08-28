import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
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
  const [searchParams, setSearhParams] = useSearchParams();
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [caracteristicas, setCaracteristicas] = useState({
    ID_Caracteristicas: "",
    Num_Habitaciones: "",
    Num_Banos: "",
    Num_Pisos: "",
    Area_Lote: "",
    Area_Casa: "",
  });

  useEffect(() => {
    const fetchCharacteristics = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/caracteristicas-property?ID_Propiedad=${searchParams.get(
            "IdProperty"
          )}`
        );
        console.log(response);
        if (response.data && response.data.length > 0) {
          const data = response.data[0];
          setCaracteristicas({
            ID_Caracteristicas: data.ID_Propiedad,
            Num_Habitaciones: data.Num_Habitaciones,
            Num_Banos: data.Num_Banos,
            Num_Pisos: data.Num_Pisos,
            Area_Lote: data.Area_Lote,
            Area_Casa: data.Area_Casa,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (isEditing) {
      fetchCharacteristics();
    }
  }, [isEditing, idPropiedad]);

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
          editCaracteristicas();
        } else {
          addCaracteristicas();
        }
        //console.log("Formulario enviado con éxito");
      } else {
        console.log("Por favor, llena todos los campos requeridos");
      }
    }

    setValidated(true);
  };

  const handleShowUbicationClick = () => {
    onShowUbication();
    setSearhParams({ ID_Propiedad: caracteristicas.ID_Caracteristicas });
  };

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
      setSearhParams({ ID_Propiedad: caracteristicas.ID_Caracteristicas });
      onShowUbication();
      console.log("Caracteristicas guardadas:", caracteristicas, e, response);
    } catch (error) {
      console.error("Error al guardar las caracteristicas:", error);
      Swal.fire("Error al registrar datos de propiedad");
    }
  };

  const editCaracteristicas = async () => {
    console.log("Edit: ", caracteristicas);
    try {
      const response = await axios.put(
        `http://localhost:3000/caracteristicas/${searchParams.get(
          "IdProperty"
        )}`,
        caracteristicas
      );
      console.log(response);
      setAddedSuccess(true);
    } catch (error) {
      console.error("Error al editar las caracteristicas:", error);
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
                <CustomLabel> N. Finca/Propiedad</CustomLabel>
                <InputGroup hasValidation>
                  <Form.Control
                    type="number"
                    name="ID_Caracteristicas"
                    value={caracteristicas.ID_Caracteristicas}
                    onChange={handleChangeCaracteristicas}
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Agregar Numero de Fica o propiedad
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
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
        {addedSuccess && (
          <section style={{ padding: "25px", background: "#dee2e6" }}>
            <p>
              Se editaron las caracteristicas de forma correcta con los datos
              que proporcionaste, ¡muchas gracias por utilizar nuestros
              servicios!
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
        <section className="mb-5">
          <Button variant="dark" type="submit" className="mt-3">
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
  onShowUbication: PropTypes.func,
  isEditing: PropTypes.bool.isRequired,
};

export default AddCaracteristicsProperty;
