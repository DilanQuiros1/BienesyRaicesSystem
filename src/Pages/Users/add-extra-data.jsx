import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
function AddExtraData(props) {
  const [userImg, setUserImg] = useState(null);
  const [searchParams] = useSearchParams();
  const [extraData, setExtraData] = useState({
    ID_Usuario: "",
    IG_Profile: "",
    FaceBook_Profile: "",
    Url_Img: "",
    Country_User: "",
    City: "",
    Postal_Code: "",
  });

  useEffect(() => {
    // Fetch data only when the modal is opened
    console.log(props.isEditing);
    if (props.show) {
      const fetchExtraData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/extra-data-user?Correo=${searchParams.get(
              "Correo"
            )}`
          );
          if (response.data.length > 0) {
            const data = response.data[0];
            setExtraData({
              ID_Usuario: data.ID_Usuario,
              IG_Profile: data.IG_Profile,
              FaceBook_Profile: data.FaceBook_Profile,
              Url_Img: data.Url_Img,
              Country_User: data.Country_User,
              City: data.City,
              Postal_Code: data.Postal_Code,
            });
          }
        } catch (error) {
          console.error("Error fetching extra data:", error);
        }
      };

      fetchExtraData();
    }
  }, [props.show, searchParams, props.isEditing]);

  const handleSingleUpload = async () => {
    // Validación para asegurarse de que todos los campos estén completos
    const {
      ID_Usuario,
      IG_Profile,
      FaceBook_Profile,
      Url_Img,
      Country_User,
      City,
      Postal_Code,
    } = extraData;

    if (
      !ID_Usuario ||
      !IG_Profile ||
      !FaceBook_Profile ||
      !Country_User ||
      !City ||
      !Postal_Code
    ) {
      Swal.fire("Por favor, completa todos los campos antes de continuar.");
      return; // Detener la ejecución de la función si falta algún campo
    }

    // Validación para asegurarse de que una imagen esté seleccionada
    if (!userImg) {
      Swal.fire("Por favor, selecciona una imagen antes de continuar.");
      return;
    }

    const formData = new FormData();
    formData.append("image", userImg);

    console.log(extraData);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload-user-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && response.data.url) {
        const imageUrl = response.data.url;
        setExtraData((prevData) => ({
          ...prevData,
          Url_Img: imageUrl,
        }));

        // Procesamiento adicional según la propiedad isEditing
        if (props.isEditing) {
          try {
            const updateResponse = await axios.put(
              `http://localhost:3000/update-close-data?ID_Usuario=${extraData.ID_Usuario}`,
              {
                ...extraData,
                Url_Img: imageUrl,
              }
            );
            console.log(updateResponse);
          } catch (error) {
            console.log(error);
          }
        } else {
          await axios.post("http://localhost:3000/extra-data-user", {
            ...extraData,
            Url_Img: imageUrl,
          });

          Swal.fire("Se agregaron tus datos de forma correcta");
        }
      }
    } catch (error) {
      Swal.fire("Ha ocurrido un error");
      console.error(
        "Error al subir la imagen:",
        error.response?.data || error.message
      );
    }
  };

  const updateExtraDataUser = async () => {};

  const handleImageChange = (e) => {
    setUserImg(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExtraData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Form.Group className="position-relative mb-3">
            <Form.Label>Eligir imagen de perfil</Form.Label>
            <Form.Control
              type="file"
              required
              name="file"
              onChange={handleImageChange}
            />
          </Form.Group>
          <section>
            <h5>Imagen actual de tu perfil</h5>
            <img
              src={
                extraData.Url_Img
                  ? extraData.Url_Img
                  : "https://res.cloudinary.com/djxwusqnb/image/upload/v1724334577/sqiuhcqvtz1evqdkm4s8.png"
              }
              alt="Nathaniel Poole"
              className="rounded-circle mb-3 profile-pic"
              style={{ width: "210px", height: "210px" }}
            />
          </section>
        </section>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>ID Usuario, debe ser el mismo de registro</label>
            <input
              type="text"
              className="form-control"
              name="ID_Usuario"
              value={extraData.ID_Usuario}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Ciudad</label>
            <input
              type="text"
              className="form-control"
              name="City"
              value={extraData.City}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>País</label>
            <input
              type="text"
              className="form-control"
              name="Country_User"
              value={extraData.Country_User}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Código Postal</label>
            <input
              type="text"
              className="form-control"
              name="Postal_Code"
              value={extraData.Postal_Code}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Perfil de Intagram</label>
            <input
              type="text"
              className="form-control"
              name="IG_Profile"
              value={extraData.IG_Profile}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Perfil de FaceBook</label>
            <input
              type="text"
              className="form-control"
              name="FaceBook_Profile"
              value={extraData.FaceBook_Profile}
              onChange={handleChange}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button
          variant={`${props.isEditing ? "warning" : "dark"}`}
          onClick={handleSingleUpload}
        >
          {props.isEditing
            ? "Editar Datos extras de mi perfil"
            : "Agregar mas datos a mi perfil"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

AddExtraData.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool,
};

export default AddExtraData;
