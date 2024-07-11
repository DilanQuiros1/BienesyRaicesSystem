import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useState } from "react";

function RegisterClientSeller(props) {
  const [validated, setValidated] = useState(false);
  const [formValues, setFormValues] = useState({
    identification: "",
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    sexo: "",
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

  const sendValues = () => {
    console.log("form values: ", formValues);
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
                name="identification"
                value={formValues.identification}
                onChange={handleChange}
                placeholder="Identification"
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
                name="nombre"
                value={formValues.nombre}
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
                name="apellidos"
                value={formValues.apellidos}
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
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  agregue un correo
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustomUsername">
              <Form.Label>Telefono de contacto</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">+506</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder=""
                  name="telefono"
                  value={formValues.telefono}
                  onChange={handleChange}
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  agregueun su telefono de contacto
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>sexo</Form.Label>
              <InputGroup hasValidation>
                <Form.Select
                  aria-label="Default select example"
                  name="sexo"
                  value={formValues.sexo}
                  onChange={handleChange}
                >
                  <option>seleccione...</option>
                  <option value="1">Masculino</option>
                  <option value="2">Femenino</option>
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
                  name="type_user"
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
