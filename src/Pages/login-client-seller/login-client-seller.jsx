import PropTypes from "prop-types";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";

const LoginClientSeller = (props) => {
  const [formValues, setFormValues] = useState({
    Correo: "",
    Password_Usuario: "",
    Tipo: "",
  });

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [verifiFilds, setverifyFilds] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleProfileSelect = (eventKey) => {
    setSelectedProfile(eventKey);
    setFormValues((prevValues) => ({
      ...prevValues,
      Tipo: eventKey,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      validateLogin();
    }

    setValidated(true);
  };

  const validateLogin = async () => {
    if (
      !formValues.Correo ||
      !formValues.Password_Usuario ||
      !selectedProfile
    ) {
      setverifyFilds("Ingresa todos los datos para continuar");
      return;
    }
    if (selectedProfile === "Manage") {
      if (
        formValues.Correo === "realstate@gmail.com" &&
        formValues.Password_Usuario === "realstate1"
      ) {
        navigate({
          pathname: "/Management",
        });
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/login",
          formValues
        );
        if (response.data.message === "Login exitoso") {
          console.log("auth: ", response.data.token);
          const token = response.data.token;
          localStorage.setItem("authToken", token);
          if (selectedProfile === "Vendedor") {
            navigate({
              pathname: "/Prueba",
              search: `?Correo=${encodeURIComponent(formValues.Correo)}`,
            });
          } else {
            navigate({
              pathname: "/UserProfile",
              search: `?Correo=${encodeURIComponent(formValues.Correo)}`,
            });
          }
        } else {
          setverifyFilds(
            "Login inválido. Por favor, verifica tus credenciales."
          );
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setverifyFilds("Credenciales inválidas.");
        } else {
          setverifyFilds(
            "Error al intentar iniciar sesión. Inténtalo de nuevo."
          );
        }
      }
    }
  };

  const getProfileText = () => {
    if (selectedProfile === "Cliente") return "Usuario";
    if (selectedProfile === "Vendedor") return "Vendedor";
    if (selectedProfile === "Manage") return "Administrador";
    return "Seleccionar";
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Iniciar Sesion
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formProfileSelect">
            <Form.Label>Elije tu perfil</Form.Label>
            <Dropdown onSelect={handleProfileSelect}>
              <Dropdown.Toggle variant="info" id="dropdown-basic">
                {getProfileText()}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Cliente">Usuario</Dropdown.Item>
                <Dropdown.Item eventKey="Vendedor">Vendedor</Dropdown.Item>
                <Dropdown.Item eventKey="Manage">Administrador</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {!selectedProfile && (
              <Form.Control.Feedback
                type="invalid"
                style={{ display: "block" }}
              >
                Por favor, selecciona tu perfil.
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="Correo"
              value={formValues.Correo}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingresa un correo electrónico válido.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Agrega tu password"
              name="Password_Usuario"
              value={formValues.Password_Usuario}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingresa una contraseña.
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
        {verifiFilds && <p className="text-danger">{verifiFilds}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={props.onHide}>
          Close
        </Button>
        <Button type="submit" variant="dark" onClick={handleSubmit}>
          Iniciar Sesion
        </Button>
      </Modal.Footer>
      <Outlet />
    </Modal>
  );
};

LoginClientSeller.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default LoginClientSeller;
