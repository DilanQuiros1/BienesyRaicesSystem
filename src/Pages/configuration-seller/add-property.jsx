import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import ListOfServices from "./components/extra-services";
import styled from "styled-components";
import FrameComponent6 from "../../components/FrameComponent6";
import HeaderSeller from "./components/header-configuration-seller";
import AddCaracteristicsProperty from "./components/add-caracteristics-property";
import AddUbicationProperty from "./components/add-ubication-property";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPropertyImg({ ...propertyImg, Url_img: files });
  };

  const obtenerContador = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/propiedades/count"
      );
      const nuevoContador = response.data.count + 25;
      setContador(nuevoContador);
      console.log("contador: ", nuevoContador);

      setProperty((prevProperty) => ({
        ...prevProperty,
        ID_Propiedad: nuevoContador,
        ID_Caracteristicas: nuevoContador,
        ID_Ubicacion: nuevoContador,
      }));
      setPropertyImg((prevImg) => ({
        ...prevImg,
        ID_Propiedad: nuevoContador,
      }));
    } catch (error) {
      console.error("Error al obtener el contador:", error);
    }
  };

  useEffect(() => {
    obtenerContador();
  }, []);

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
        try {
          for (const url of urls) {
            console.log("guardar", url);

            const response = await axios.post(
              "http://localhost:3000/imagenes",
              {
                ID_Propiedad: contador,
                Url_img: url,
              }
            );
            console.log("se guardo: ", response);
          }
        } catch (error) {
          console.error("Error saving imgs:", error);
        }

        setPropertyImg({ Url_img: urls });
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      //setUploading(false);
    }
  };

  const addImagesProperty = async (e) => {
    //console.log(propertyImg);
    try {
      handleUpload2();
      for (const url of propertyImg.Url_img) {
        // const response = await axios.post("http://localhost:3000/imagenes", {
        //   ID_Propiedad: 21,
        //   Url_img: url,
        // });
        console.log("Imagenes guardadas, url:", url);
      }
    } catch (error) {
      console.error("Error al guardar las Imagenes:", error);
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

  return (
    <div style={{ background: "#007bff1a" }}>
      <header>
        <HeaderSeller />
      </header>

      <Container className="p-5">
        <section>
          {contador !== null && (
            <AddCaracteristicsProperty idPropiedad={contador} />
          )}
        </section>
        <section style={{ with: "100%" }}>
          {contador !== null && <AddUbicationProperty idUbicacion={contador} />}
        </section>
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
            <Row className="mb-2">
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
            <section className="mb-5 mt-5">
              <Button
                variant="primary"
                onClick={addPropertySeller}
                className="mt-3"
              >
                Agregar Propiedad
              </Button>
            </section>
          </Form>

          <section className="mt-5 mb-5">
            <ListOfServices />
          </section>

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
          <section className="mb-5">
            <Button variant="primary" onClick={handleUpload2} className="mt-3">
              Agregar Imagenes
            </Button>
          </section>
        </div>
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
