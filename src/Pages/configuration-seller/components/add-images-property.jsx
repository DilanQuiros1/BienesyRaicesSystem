import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CustomLabel = styled(Form.Label)`
  font-weight: bold;
  color: cadetblue;
  font-size: 16px;
`;

const AddImagesProperty = ({ idPropiedad, isEditing }) => {
  const [propertyImg, setPropertyImg] = useState([]);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [idProp, setIdProp] = useState();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (isEditing) {
      setIdProp(searchParams.get("IdProperty"));
    } else {
      setIdProp(idPropiedad);
    }
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/imagenes-property?ID_Propiedad=${searchParams.get(
            "IdProperty"
          )}`
        );
        const loadedImages = await Promise.all(
          response.data.map(async (img) => {
            const file = await urlToFile(img.Url_img, `image-${img.ID}.jpg`);
            return { url: URL.createObjectURL(file), file };
          })
        );
        setPropertyImg(loadedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (isEditing) {
      fetchImages();
    }
  }, [isEditing, searchParams, idPropiedad]);

  // Función para convertir una URL a un objeto File
  const urlToFile = async (url, filename) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file: file,
    }));
    setPropertyImg((prevState) => [...prevState, ...newImages]);
  };

  const handleUpload2 = async () => {
    const formData = new FormData();
    propertyImg.forEach((image) => {
      if (image.file) {
        formData.append("images", image.file);
      }
    });

    try {
      if (isEditing) {
        deleteImagesToEdit();
      }

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
        await Promise.all(
          urls.map((url) =>
            axios.post(
              "http://localhost:3000/imagenes",
              {
                ID_Propiedad: idProp,
                Url_img: url,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
          )
        );

        setAddedSuccess(true);
      }
    } catch (error) {
      console.error(
        "Error uploading images:",
        error.response?.data || error.message
      );
    }
  };

  const deleteImagesToEdit = async () => {
    const response = await axios.delete(
      `http://localhost:3000/imagenes/${searchParams.get("IdProperty")}`
    );
    console.log(response);
  };

  const handleDeleteImage = (imageIndex) => {
    setPropertyImg((prevState) =>
      prevState.filter((_, index) => index !== imageIndex)
    );
  };

  const variant = isEditing ? "warning" : "dark";

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
            {propertyImg.length > 0 &&
              propertyImg.map((image, index) => (
                <Col key={index} xs={6} md={4} lg={3}>
                  <div style={{ position: "relative", marginBottom: "1rem" }}>
                    <img
                      style={{
                        height: "200px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      src={image.url}
                      alt={`property-${index}`}
                      className="img-thumbnail"
                    />
                    <button
                      onClick={() => handleDeleteImage(index)}
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        backgroundColor: "rgba(255,255,255,0.7)",
                        border: "none",
                        borderRadius: "50%",
                        padding: "5px",
                        cursor: "pointer",
                      }}
                    >
                      <FontAwesomeIcon icon={faTimes} color="red" />
                    </button>
                  </div>
                </Col>
              ))}
          </Row>
          <Row>
            {propertyImg.length > 0 && (
              <p style={{ color: "#198754", fontSize: "1.1em" }}>
                <span style={{ color: "#6c757d" }}>
                  Puedes agregar más imágenes si deseas
                </span>
                , si ya agregaste todos los datos, presiona el siguiente botón.
              </p>
            )}
            {!addedSuccess && (
              <section className="mb-5">
                <Button
                  variant={variant}
                  onClick={handleUpload2}
                  className="mt-3"
                >
                  {isEditing ? "Editar Imágenes" : "Agregar Imágenes"}
                </Button>
              </section>
            )}
          </Row>
        </Form.Group>

        {addedSuccess && (
          <section style={{ padding: "25px", background: "#dee2e6" }}>
            <p>
              {!isEditing
                ? "Su propiedad se guardó de forma correcta con los datos que proporcionaste, ¡muchas gracias por utilizar nuestros servicios!"
                : "Su propiedad se edito de forma correcta con los datos que proporcionaste, ¡muchas gracias por utilizar nuestros servicios!"}
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
      </div>
    </div>
  );
};

AddImagesProperty.propTypes = {
  idPropiedad: PropTypes.number.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default AddImagesProperty;
