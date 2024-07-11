import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Container, Row, Col } from "react-bootstrap";

const Services = [
  {
    name: "wi-fi",
    ID_Servicio: 1,
  },
  {
    name: "parking",
    ID_Servicio: 2,
  },
  {
    name: "pool",
    ID_Servicio: 3,
  },
];

function ListOfServices({ onSelectServices }) {
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    onSelectServices(selectedServices);
  }, [selectedServices, onSelectServices]);

  const handleSelect = (service) => {
    setSelectedServices((prevSelected) =>
      prevSelected.some((item) => item.ID_Servicio === service.ID_Servicio)
        ? prevSelected.filter(
            (item) => item.ID_Servicio !== service.ID_Servicio
          )
        : [...prevSelected, service]
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <DropdownButton
            id="dropdown-basic-button"
            title="Seleccionar Servicios"
          >
            {Services.map((data, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => handleSelect(data)}
                active={selectedServices.some(
                  (service) => service.ID_Servicio === data.ID_Servicio
                )}
              >
                {data.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <h4 style={{ color: "#495057" }}>Servicios Seleccionados:</h4>
            <ul>
              {selectedServices.map((service, index) => (
                <li key={index}>
                  <i className="bi bi-check-lg"></i> {service.name}
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

ListOfServices.propTypes = {
  onSelectServices: PropTypes.func.isRequired,
  propiedadId: PropTypes.number.isRequired,
};

export default ListOfServices;
