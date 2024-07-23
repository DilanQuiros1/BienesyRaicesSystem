import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import axios from "axios";
import PropTypes from "prop-types";
import styled from "styled-components";

const CustomLabel = styled(Form.Label)`
  font-weight: bold;
  color: cadetblue;
  font-size: 16px;
`;

const AddImagesProperty = ({ idPropiedad }) => {
  const [propertyImg, setPropertyImg] = useState({
    ID_Propiedad: 0,
    Url_img: [],
  });
  const [propertyImgtoShow, setPropertyImgtoShow] = useState({
    Url_img: [],
  });

  const [addedSuccess, setAddedSuccess] = useState(false);

  const stateOfAdded = () => {
    setAddedSuccess(true);
    window.location.reload();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPropertyImg({ ...propertyImg, Url_img: files });
    setPropertyImgtoShow({ ...propertyImg, Url_img: files });
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
        try {
          for (const url of urls) {
            console.log("guardar", url);

            const response = await axios.post(
              "http://localhost:3000/imagenes",
              {
                ID_Propiedad: idPropiedad,
                Url_img: url,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            setAddedSuccess(true);
            console.log("se guardo: ", response.data);
          }
        } catch (error) {
          console.error(
            "Error saving imgs:",
            error.response ? error.response.data : error.message
          );
        }

        setPropertyImg({ Url_img: urls });
      }
    } catch (error) {
      console.error(
        "Error uploading images:",
        error.response ? error.response.data : error.message
      );
    } finally {
      //setUploading(false);
    }
  };

  return (
    <div style={{ background: "white" }}>
      <div style={{ width: "100%" }}>
        <Form.Group controlId="formImages">
          <CustomLabel>Imágenes</CustomLabel>
          <Form.Control
            type="file"
            name="Url_img"
            multiple
            onChange={handleImageChange}
          />

          <Row>
            {propertyImgtoShow.Url_img.length > 0 &&
              propertyImgtoShow.Url_img.map((image, index) => (
                <Col key={index} xs={6} md={4} lg={3}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`property-${index}`}
                    className="img-thumbnail mt-2"
                  />
                </Col>
              ))}
          </Row>
          <Row>
            {propertyImgtoShow.Url_img.length > 0 && (
              <p style={{ color: "#198754", fontSize: "1.1em" }}>
                Si ya agregaste todos los datos, preciona el siguiente boton.
              </p>
            )}
            <section className="mb-5">
              <Button variant="dark" onClick={handleUpload2} className="mt-3">
                Agregar Imagenes
              </Button>
            </section>
          </Row>
        </Form.Group>

        {addedSuccess && (
          <section style={{ padding: "25px", background: "#dee2e6" }}>
            <p>
              Su propiedad se aguardado de forma correcta con los datos que
              proporcionastes, muchas gracias por utilizar nuestros Servicios!!
            </p>
            <Button variant="success" onClick={stateOfAdded} className="mt-3">
              Agregar Otra Propiedad
            </Button>
          </section>
        )}
      </div>
    </div>
  );
};

AddImagesProperty.propTypes = {
  idPropiedad: PropTypes.number.isRequired,
};

export default AddImagesProperty;
