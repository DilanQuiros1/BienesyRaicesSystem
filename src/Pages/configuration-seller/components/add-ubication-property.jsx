import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MapComponent from "./maps";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";

const AddUbicationProperty = ({ idUbicacion, onShowProperty, isEditing }) => {
  const [validated, setValidated] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [ubicaciones, setUbicaciones] = useState({
    ID_Ubicacion: idUbicacion,
    Direccion: "",
    Ciudad: "",
    Provincia: "",
    Pais: "",
    CodigoPostal: "",
    Latitud: "",
    Longitud: "",
  });
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchUbicaciones = async () => {
      const response = await axios.get(
        `http://localhost:3000/ubicaciones-property?ID_Ubicacion=${searchParams.get(
          "IdProperty"
        )}`
      );

      if (response.data && response.data.length > 0) {
        const data = response.data[0];
        setUbicaciones({
          ID_Ubicacion: idUbicacion,
          Direccion: data.Direccion,
          Ciudad: data.Ciudad,
          Provincia: data.Provincia,
          Pais: data.Pais,
          CodigoPostal: data.CodigoPostal,
          Latitud: data.Latitud,
          Longitud: data.Longitud,
        });
      }
    };

    if (isEditing) {
      fetchUbicaciones();
    }
  }, [isEditing, idUbicacion]);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    // Verifica si el formulario es válido
    if (
      form.checkValidity() === false ||
      ubicaciones.Latitud.length == 0 ||
      ubicaciones.Longitud.length == 0
    ) {
      console.log("Formulario inválido");
    } else {
      // Verifica si todos los campos requeridos están llenos
      const formData = new FormData(form);
      const allFieldsFilled = Array.from(formData.values()).every(
        (value) => value.trim() !== ""
      );

      if (allFieldsFilled) {
        if (isEditing) {
          editUbicaciones();
        } else {
          addUbicaciones();
        }
        console.log("Formulario enviado con éxito");
      } else {
        console.log("Por favor, llena todos los campos requeridos");
      }
    }

    setValidated(true);
  };

  const handleShowProperty = () => {
    onShowProperty();
  };

  const handleChangeUbicaciones = (e) => {
    const { name, value } = e.target;
    setUbicaciones({ ...ubicaciones, [name]: value });
  };

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
      onShowProperty();
      console.log("Ubicaciones guardadas:", response.data);
    } catch (error) {
      console.error("Error al guardar las Ubicaciones:", error);
    }
  };
  const editUbicaciones = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/ubicaciones/${searchParams.get("IdProperty")}`,
        ubicaciones
      );
      setAddedSuccess(true);
      console.log("Ubicaciones editadas:", response.data);
    } catch (error) {
      console.error("Error al editar las Ubicaciones:", error);
    }
  };

  return (
    <div>
      <div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-5 mt-5">
            <h3
              style={{
                color: "#495057",
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
                Ciudad/Canton de la propiedad{" "}
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
                color: "#495057",
                marginBottom: "30px",
                fontWeight: "bold",
              }}
            >
              Busca la hubicacion de tu propiedad
            </h3>

            <MapComponent
              onPlaceSelected={handlePlaceSelected}
              initialLat={Number(ubicaciones.Latitud)}
              initialLng={Number(ubicaciones.Longitud)}
              isEditing={true}
              value={ubicaciones.Ciudad}
            />
            {selectedPlace && (
              <div>
                <h2>Coordenadas seleccionadas:</h2>
                <p>Latitud: {selectedPlace.lat}</p>
                <p>Longitud: {selectedPlace.lng}</p>
                {(ubicaciones.Latitud = selectedPlace.lat)}
                {(ubicaciones.Longitud = selectedPlace.lng)};
              </div>
            )}
            <section style={{ marginTop: "10px" }}>
              {addedSuccess && (
                <section style={{ padding: "25px", background: "#dee2e6" }}>
                  <p>Se edito la ubicacion de forma correcta</p>
                </section>
              )}
            </section>
          </div>

          <Button variant="dark" type="submit" className="mt-3">
            {isEditing ? "Editar Ubicaciones" : "Agregar Ubicaciones"}
          </Button>
          <Button variant="dark" onClick={handleShowProperty} className="mt-3">
            Mostrar Property
          </Button>
        </Form>
      </div>
    </div>
  );
};

AddUbicationProperty.propTypes = {
  idUbicacion: PropTypes.number,
  onShowProperty: PropTypes.func,
  isEditing: PropTypes.bool.isRequired,
};

export default AddUbicationProperty;
