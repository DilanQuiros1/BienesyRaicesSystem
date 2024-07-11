import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Container, Row, Col } from "react-bootstrap";

const Services = [
  {
    name: "wi-fi",
  },
  {
    name: "parking",
  },
  {
    name: "pool",
  },
];

function ListOfServices({ onSelectServices }) {
  const [selectedServices, setSelectedServices] = useState([]);

  const handleSelect = (service) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(service)
        ? prevSelected.filter((item) => item !== service)
        : [...prevSelected, service]
    );
  };

  useEffect(() => {
    onSelectServices(selectedServices);
  }, [selectedServices, onSelectServices]);

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
                onClick={() => handleSelect(data.name)}
                active={selectedServices.includes(data.name)}
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
                  <i className="bi bi-check-lg"></i> {service}
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
};

export default ListOfServices;
