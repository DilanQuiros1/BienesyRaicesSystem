import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import MapComponent from "./components/maps";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import ListOfServices from "./components/extra-services";
import styled from "styled-components";
import FrameComponent6 from "../../components/FrameComponent6";
import HeaderSeller from "./components/header-configuration-seller";
const CustomLabel = styled(Form.Label)`
  font-weight: bold;
  color: cadetblue;
  font-size: 16px;
`;

const RegisterProperty = () => {
  const [contador, setContador] = useState(null);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [propertyImg, setPropertyImg] = useState({
    ID_Propiedad: 0,
    Url_img: [],
  });

  const [property, setProperty] = useState({
    ID_Propiedad: 0,
    ID_Vendedor: 0,
    ID_Caracteristicas: 0,
    Nombre: "",
    Descripcion: "",
    Precio: "",
    ID_Ubicacion: "",
  });

  const [caracteristicas, setCaracteristicas] = useState({
    ID_Caracteristicas: contador,
    Num_Habitaciones: 0,
    Num_Banos: 0,
    Num_Pisos: 0,
    Area_Lote: "",
    Area_Casa: "",
  });

  const [ubicaciones, setUbicaciones] = useState({
    ID_Ubicacion: 0,
    Direccion: 0,
    Ciudad: "",
    Provincia: "",
    Pais: "",
    CodigoPostal: "",
    Latitud: "",
    Longitud: "",
  });

  // {
  //   "ID_Ubicacion": 4,
  //   "Direccion": "Calle Principal 123",
  //   "Ciudad": "Madrid",
  //   "Provincia": "Madrid",
  //   "Pais": "España",
  //   "CodigoPostal": "28001",
  //   "Latitud": "40.41680000",
  //   "Longitud": "-3.70380000"
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };
  const handleChangeCaracteristicas = (e) => {
    const { name, value } = e.target;
    setCaracteristicas({ ...caracteristicas, [name]: value });
  };

  const handleChangeUbicaciones = (e) => {
    const { name, value } = e.target;
    setUbicaciones({ ...ubicaciones, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPropertyImg({ ...propertyImg, Url_img: files });
  };

  const [selectedServices, setSelectedServices] = useState([
    {
      ID_Propiedad: 0,
      ID_Servicio: 0,
    },
  ]);
  const handleSelectServices = (services) => {
    setSelectedServices(services);
    //console.log("Selected services:", services);
  };

  const handleShowSelectedServices = () => {
    console.log("Selected services:", selectedServices);
  };

  const addProperty = () => {
    // addCaracteristicas();
    // addUbicaciones();
    // addPropertySeller();
    // handleUpload2();
    // addImagesProperty();
    console.log("Imagenes: ", propertyImg);
    //addServicios();
    console.log("Selected services:", selectedServices);
    console.log("Propiedades: ", property);
    console.log("Ubicaciones", ubicaciones);
    console.log("caracteristicas: ", caracteristicas);
    //handleUpload2();
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
    for (const file of propertyImg.Url_img) {
      formData.append("images", file);
    }
    console.log("Imagenes: ", propertyImg.Url_img);
    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && Array.isArray(response.data)) {
        const urls = response.data.map((img) => img.secure_url);
        setPropertyImg({ Url_img: urls });
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      //setUploading(false);
    }
  };

  useEffect(() => {
    const obtenerContador = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/propiedades/count"
        );
        const nuevoContador = response.data.count + 1;
        setContador(nuevoContador);
        setCaracteristicas((prevCaracteristicas) => ({
          ...prevCaracteristicas,
          ID_Caracteristicas: nuevoContador,
        }));
        setProperty((prevProperty) => ({
          ...prevProperty,
          ID_Propiedad: contador,
        }));
        setPropertyImg((prevImg) => ({
          ...prevImg,
          ID_Propiedad: contador,
        }));
        setProperty((prevProperty) => ({
          ...prevProperty,
          ID_Caracteristicas: contador,
        }));
        setProperty((prevProperty) => ({
          ...prevProperty,
          ID_Ubicacion: contador,
        }));
        setUbicaciones((prevUbicacion) => ({
          ...prevUbicacion,
          ID_Ubicacion: contador,
        }));
      } catch (error) {
        console.error("Error al obtener el contador:", error);
      }
    };

    obtenerContador();
  }, []);

  const addCaracteristicas = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/caracteristicas",
        caracteristicas
      );
      console.log("Caracteristicas guardadas:", response.data);
    } catch (error) {
      console.error("Error al guardar las caracteristicas:", error);
    }
  };

  const addImagesProperty = async (e) => {
    console.log(propertyImg);
    try {
      const response = await axios.post(
        "http://localhost:3000/imagenes",
        propertyImg
      );
      console.log("Imagenes guardadas:", response.data);
    } catch (error) {
      console.error("Error al guardar las Imagenes:", error);
    }
  };

  const addUbicaciones = async (e) => {
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

  const addPropertySeller = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/propiedades",
        property
      );
      console.log("Propiedad guardada:", response.data);
    } catch (error) {
      console.error("Error al guardar las Ubicaciones:", error);
    }
  };

  const addServicios = async () => {
    try {
      for (const service of selectedServices) {
        const response = await axios.post(
          "http://localhost:3000/propiedad-servicio",
          {
            Propiedad_ID: contador,
            Servicio_ID: service.ID_Servicio, // Usamos el nombre del servicio directamente
          }
        );
        console.log("", response);
      }
      //console.log("Service added:", response.data);
    } catch (error) {
      console.error("Error saving services:", error);
    }
  };

  return (
    <div style={{ background: "#007bff1a" }}>
      <header>
        <HeaderSeller />
      </header>

      <Container className="p-5">
        <Container style={{ width: "100%" }}>
          <Row style={{ margin: "0" }}>
            <Col xs={9}></Col>
            <Col></Col>
          </Row>
        </Container>
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
              <CustomLabel>ID de Vendedor</CustomLabel>
              <Form.Control
                required
                type="number"
                name="ID_Vendedor"
                onChange={handleChange}
                value={property.ID_Vendedor}
                defaultValue=""
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
          <Row className="mb-5">
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

          <Form.Group controlId="formImages">
            <CustomLabel>Imágenes</CustomLabel>
            <Form.Control
              type="file"
              name="Url_img"
              multiple
              onChange={handleImageChange}
            />
            {/* <button onClick={handleUpload2}>Subir imagenes</button> */}
            <Row>
              {/* {propertyImg.Url_img.length > 0 &&
                propertyImg.Url_img.map((image, index) => (
                  <Col key={index} xs={6} md={4} lg={3}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`property-${index}`}
                      className="img-thumbnail mt-2"
                    />
                  </Col>
                ))} */}
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
                  value={property.CodigoPostal}
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
                {(ubicaciones.Latitud = selectedPlace.lat)}
                {(ubicaciones.Longitud = selectedPlace.lng)};
              </div>
            )}
          </div>

          <Button variant="primary" onClick={addProperty} className="mt-3">
            Registrar propiedad
          </Button>
        </Form>
      </Container>
      <section
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

export default RegisterProperty;
