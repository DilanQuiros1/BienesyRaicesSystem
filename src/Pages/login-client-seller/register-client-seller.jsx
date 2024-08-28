import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
function RegisterClientSeller(props) {
  const [validated, setValidated] = useState(false);
  const [searchValue] = useSearchParams();
  const [formValues, setFormValues] = useState({
    ID_Usuario: "",
    Nombre: "",
    Apellidos: "",
    Password_Usuario: "",
    Correo: "",
    Telefono: "",
    Genero: "",
    Tipo: "",
    Fecha_Creacion: "2024-07-08T13:09:15.000Z",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `http://localhost:3000/buscar-usuario?Correo=${searchValue.get(
          "Correo"
        )}`
      );
      console.log(response);
      if (response.data && response.data.length > 0) {
        const data = response.data[0];
        setFormValues({
          ID_Usuario: data.ID_Usuario,
          Nombre: data.Nombre,
          Apellidos: data.Apellidos,
          Password_Usuario: data.Password_Usuario,
          Correo: data.Correo,
          Telefono: data.Telefono,
          Genero: data.Genero,
          Tipo: data.Tipo === "Vendedor" ? "1" : "2",
          Fecha_Creacion: "2024-07-08T13:09:15.000Z",
        });
      }
    };

    fetchUser();
  }, [searchValue]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isEditing = props.isEdit;

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      sendValues();
    }

    setValidated(true);
  };

  const registerUser = async () => {
    if (formValues.ID_Usuario.length === 9) {
      try {
        const response = await axios.post(
          "http://localhost:3000/usuarios",
          formValues
        );
        Swal.fire({
          title: "Usuario registrado de forma correcta",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
          },
        });
      } catch (error) {
        console.error("Error al registrar usuario", error);
      }
    } else {
      Swal.fire("SNumero de identificacion invalido!");
    }
  };

  const editUser = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/usuarios?Correo=${searchValue.get("Correo")}`,
        formValues
      );
      console.log("Usuario Editado:", response);
    } catch (error) {
      console.error("Error al Editar usuario", error);
    }
  };

  const sendValues = () => {
    if (isEditing) {
      editUser();
    } else {
      registerUser();
    }
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
          {props.isEdit === false ? "Registrar Usuario" : "Editar Usuario"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group
              className="mb-5"
              as={Col}
              md="4"
              controlId="validationCustom01"
            >
              <Form.Label>Identification</Form.Label>
              <Form.Control
                required
                type="number"
                name="ID_Usuario"
                // disabled={props.closeFields ? "false" : "true"}
                value={formValues.ID_Usuario}
                onChange={handleChange}
                placeholder=""
              />
              <Form.Control.Feedback type="invalid">
                Por favor, ingrese una identificación.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="4"
              className="mb-5"
              controlId="validationCustom02"
            >
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                required
                type="text"
                name="Nombre"
                value={formValues.Nombre}
                onChange={handleChange}
                placeholder=""
              />
              <Form.Control.Feedback type="invalid">
                Por favor, ingrese un nombre.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="4"
              className="mb-5"
              controlId="validationCustom03"
            >
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                required
                type="text"
                name="Apellidos"
                value={formValues.Apellidos}
                onChange={handleChange}
                placeholder=""
              />
              <Form.Control.Feedback type="invalid">
                Por favor, ingrese apellidos.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="validationCustom04">
              <Form.Label>Correo Electrónico</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder=""
                  name="Correo"
                  value={formValues.Correo}
                  onChange={handleChange}
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, ingrese un correo electrónico.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="validationCustom05">
              <Form.Label>Teléfono de Contacto</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">+506</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder=""
                  name="Telefono"
                  value={formValues.Telefono}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, ingrese un número de teléfono.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            {!isEditing && (
              <Form.Group as={Col} md="5" controlId="validationCustom06">
                <Form.Label>Contraseña</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="password"
                    placeholder=""
                    name="Password_Usuario"
                    value={formValues.Password_Usuario}
                    onChange={handleChange}
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, cree una contraseña.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            )}
            <Form.Group as={Col} md="5" controlId="validationCustom07">
              <Form.Label>Género</Form.Label>
              <Form.Select
                aria-label="Seleccione un género"
                name="Genero"
                value={formValues.Genero}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Por favor, seleccione un género.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="4"
              className="mt-3"
              controlId="validationCustom08"
            >
              <Form.Label>Tipo de Usuario</Form.Label>
              <Form.Select
                aria-label="Seleccione tipo de usuario"
                name="Tipo"
                value={formValues.Tipo}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                <option value="1">Vendedor</option>
                <option value="2">Usuario</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Por favor, seleccione un tipo de usuario.
              </Form.Control.Feedback>
            </Form.Group>
            {!isEditing && (
              <Form.Group className="mb-3 mt-3">
                <Form.Check
                  required
                  label="Estoy de acuerdo con los términos y condiciones"
                  feedback="Debe aceptar antes de enviar."
                  feedbackType="invalid"
                />
              </Form.Group>
            )}
          </Row>
          <Modal.Footer>
            <Button onClick={props.onHide} variant="secondary">
              Cerrar
            </Button>
            {isEditing ? (
              <Button type="submit" className="btn btn-warning">
                Editar Usuario
              </Button>
            ) : (
              <Button type="submit">Agregar Usuario</Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

RegisterClientSeller.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
  closeFields: PropTypes.bool,
};

export default RegisterClientSeller;
