import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MapComponent from "./components/maps";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import ListOfServices from "./components/extra-services";
import styled from "styled-components";
import FrameComponent6 from "../../components/FrameComponent6";
import DescriptionEditSeller from "./components/description-edit-seller";
const CustomLabel = styled(Form.Label)`
  font-weight: bold;
  color: cadetblue;
  font-size: 16px;
`;

const EditPropertySeller = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [property, setProperty] = useState({
    name: "",
    price: "",
    images: [],
    bedrooms: "",
    bathrooms: "",
    size: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProperty({ ...property, images: files });
  };

  const [selectedServices, setSelectedServices] = useState([]);
  const handleSelectServices = (services) => {
    setSelectedServices(services);
    //console.log("Selected services:", services);
  };

  const handleShowSelectedServices = () => {
    console.log("Selected services:", selectedServices);
  };

  const addProperty = () => {
    console.log("Selected services:", selectedServices);
    console.log(property);
    handleUpload2();
    console.log(
      "coordenadas a guardar: ",
      selectedPlace.lat,
      " ",
      selectedPlace.lng
    );

    handleShowSelectedServices();
  };

  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceSelected = (place) => {
    setSelectedPlace(place);
    console.log("Selected place:", place); // Aquí puedes guardar las coordenadas en tu estado o enviarlas a tu backend
  };

  const handleUpload2 = async () => {
    const formData = new FormData();
    for (const file of property.images) {
      formData.append("images", file);
    }
    console.log("Imagenes: ", property.images);
    try {
      const response = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      //setUploading(false);
    }
  };

  return (
    <div style={{ background: "#007bff1a" }}>
      <header style={{ padding: "50px" }}>
        <DescriptionEditSeller />
      </header>

      <Accordion
        defaultActiveKey="0"
        flush
        style={{ padding: "0 100px 100px 100px" }}
      >
        <Accordion.Item eventKey="0" style={{ borderRadius: "10px" }}>
          <Accordion.Header>
            <h3
              style={{
                color: "#CCC",

                fontWeight: "bold",
              }}
            >
              {" "}
              Mostrar Datos para Editar informacion
            </h3>
          </Accordion.Header>
          <Accordion.Body>
            <Form
              style={{ width: "100%" }}
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <Row className="mb-5">
                <h3
                  style={{
                    color: "#212529",
                    textAlign: "center",
                    marginBottom: "30px",
                    fontWeight: "bold",
                  }}
                >
                  Datos de principales de la propiedad
                </h3>

                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <CustomLabel>Nombre de propiedad</CustomLabel>
                  <Form.Control
                    required
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={property.name}
                    defaultValue="Mark"
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingresa el nombre de la propiedad.
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationCustomUsername"
                >
                  <CustomLabel>Estado de la propiedad </CustomLabel>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      name="status"
                      value={property.status}
                      onChange={handleChange}
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a username.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <CustomLabel>Número de dormitorios</CustomLabel>
                  <Form.Control
                    type="number"
                    name="bedrooms"
                    onChange={handleChange}
                    value={property.bedrooms}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingresa el numero de dormitorios.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row></Row>

              <Row className="mb-5">
                {" "}
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationCustomUsername"
                >
                  <CustomLabel>Precio </CustomLabel>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="price"
                      value={property.price}
                      onChange={handleChange}
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingresa el precio.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationCustomUsername"
                >
                  <CustomLabel>Numero de Baños </CustomLabel>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="number"
                      name="bathrooms"
                      value={property.bathrooms}
                      onChange={handleChange}
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Agregar cantidad de baños
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationCustomUsername"
                >
                  <CustomLabel>Tamaño de la propiedad </CustomLabel>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">m²</InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="size"
                      value={property.size}
                      onChange={handleChange}
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingresa el Tamaño de la propiedad.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-5">
                <Form.Group controlId="validationCustom01">
                  <CustomLabel>Descripcion General</CustomLabel>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control as="textarea" rows={5} />
                  </Form.Group>
                  <Form.Control.Feedback type="invalid">
                    Ingresa el nombre de la propiedad.
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group controlId="formImages">
                <CustomLabel>Imágenes</CustomLabel>
                <Form.Control
                  type="file"
                  name="images"
                  multiple
                  onChange={handleImageChange}
                />
                {/* <button onClick={handleUpload2}>Subir imagenes</button> */}
                <Row>
                  {property.images.length > 0 &&
                    property.images.map((image, index) => (
                      <Col key={index} xs={6} md={4} lg={3}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`property-${index}`}
                          className="img-thumbnail mt-2"
                        />
                      </Col>
                    ))}
                </Row>
              </Form.Group>

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
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationCustomUsername"
                >
                  <Form.Label style={{ color: "#9bd358cf", fontWeight: "700" }}>
                    Pais
                  </Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="number"
                      name="size"
                      value={property.size}
                      onChange={handleChange}
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingresa el Pais.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationCustomUsername"
                >
                  <Form.Label style={{ color: "#9bd358cf", fontWeight: "700" }}>
                    Provincia
                  </Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="number"
                      name="size"
                      value={property.size}
                      onChange={handleChange}
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingresa la provincia.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationCustomUsername"
                >
                  <Form.Label style={{ color: "#9bd358cf", fontWeight: "700" }}>
                    Ciudad de la propiedad{" "}
                  </Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="number"
                      name="size"
                      value={property.size}
                      onChange={handleChange}
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingresa la ciudad.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationCustomUsername"
                >
                  <Form.Label style={{ color: "#9bd358cf", fontWeight: "700" }}>
                    Direccion{" "}
                  </Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="number"
                      name="size"
                      value={property.size}
                      onChange={handleChange}
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingresa la direccion.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationCustomUsername"
                >
                  <Form.Label style={{ color: "#9bd358cf", fontWeight: "700" }}>
                    Codigo Postal
                  </Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="number"
                      name="size"
                      value={property.size}
                      onChange={handleChange}
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingresa el codigo postal.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>

              <section className="mt-5">
                <ListOfServices onSelectServices={handleSelectServices} />
              </section>
              <div>
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
                  </div>
                )}
              </div>

              <Button variant="primary" onClick={addProperty} className="mt-3">
                Registrar propiedad
              </Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <section
        id="soporte"
        style={{
          padding: "30px",
          backgroundImage: "linear-gradient(180deg, #f8f9fa00, #495057)",
        }}
      >
        <FrameComponent6 />
      </section>
    </div>
  );
};

export default EditPropertySeller;
