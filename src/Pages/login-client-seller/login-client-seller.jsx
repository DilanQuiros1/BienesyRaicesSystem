import PropTypes from "prop-types";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function LoginClientSeller(props) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [selectedProfile, setSelectedProfile] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleProfileSelect = (eventKey) => {
    console.log("Selected Profile:", eventKey);
    setSelectedProfile(eventKey);
  };

  const handleSubmit = () => {
    console.log("Email:", formValues.email);
    console.log("Password:", formValues.password);
    console.log("Selected Profile:", selectedProfile);
    navigate("/Prueba");
  };

  const getProfileText = () => {
    if (selectedProfile === "1") return "Usuario";
    if (selectedProfile === "2") return "Vendedor";
    return "Seleccionar";
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              Elije tu perfil <i className="bi bi-person-circle"></i>
            </Form.Label>
            <Dropdown onSelect={handleProfileSelect}>
              <Dropdown.Toggle variant="info" id="dropdown-basic">
                {getProfileText()}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1">Usuario</Dropdown.Item>
                <Dropdown.Item eventKey="2">Vendedor</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted">
              agrega tu correo Electronico
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button size="lg" type="button" onClick={handleSubmit}>
          Iniciar Sesion
        </Button>
      </Modal.Footer>
      <Outlet />
    </Modal>
  );
}

LoginClientSeller.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default LoginClientSeller;
