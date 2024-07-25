import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import axios from "axios";
function RegisterClientSeller(props) {
  const [validated, setValidated] = useState(false);
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

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isEditing = props.isEdit;

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      console.log(formValues);
    }

    setValidated(true);
  };

  const registerUser = async (e) => {
    console.log(formValues);
    try {
      const response = await axios.post(
        "http://localhost:3000/usuarios",
        formValues
      );

      console.log("Usuario registrado:", formValues, e, response);
    } catch (error) {
      console.error("Error al registrar usuario", error);
    }
  };

  const sendValues = () => {
    if (isEditing) {
      console.log("editing");
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
                value={formValues.ID_Usuario}
                onChange={handleChange}
                defaultValue=""
              />
              <Form.Control.Feedback>bien!</Form.Control.Feedback>
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
                defaultValue=""
              />
              <Form.Control.Feedback>Bien!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="4"
              className="mb-5"
              controlId="validationCustom02"
            >
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                required
                type="text"
                name="Apellidos"
                value={formValues.Apellidos}
                onChange={handleChange}
                placeholder=""
                defaultValue=""
              />
              <Form.Control.Feedback>Bien!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="validationCustomUsername">
              <Form.Label>Correo Electronico</Form.Label>
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
                  agregue un correo
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="validationCustomUsername">
              <Form.Label>Telefono de contacto</Form.Label>
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
                  agregueun su telefono de contacto
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="5" controlId="validationCustomUsername">
              <Form.Label>Cree una contraseña</Form.Label>
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
                  agregue una contraseña
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="5" controlId="validationCustomUsername">
              <Form.Label>sexo</Form.Label>
              <InputGroup hasValidation>
                <Form.Select
                  aria-label="Default select example"
                  name="Genero"
                  value={formValues.Genero}
                  onChange={handleChange}
                >
                  <option>seleccione...</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  agregue su sexo
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group
              as={Col}
              md="4"
              className="mt-3"
              controlId="validationCustomUsername"
            >
              <Form.Label>Vendedor o Usuario</Form.Label>
              <InputGroup hasValidation>
                <Form.Select
                  aria-label="Default select example"
                  name="Tipo"
                  value={formValues.Tipo}
                  onChange={handleChange}
                >
                  <option>seleccione...</option>
                  <option value="1">Vendedor</option>
                  <option value="2">Usuario</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  agregue su sexo
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3 mt-3">
              <Form.Check
                required
                label="Estoy de acuerdo con terminos y condiciones"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">
          Close
        </Button>
        {isEditing == false && (
          <Button type="button" onClick={sendValues}>
            Agregar Usuario
          </Button>
        )}
        {isEditing == true && (
          <Button
            type="button"
            className="btn btn-warning"
            onClick={sendValues}
          >
            Editar Usuario
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

RegisterClientSeller.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default RegisterClientSeller;
