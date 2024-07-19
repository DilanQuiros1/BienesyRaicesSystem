import { useState } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Container, Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
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

function ListOfServices({ idPropiedad }) {
  const [selectedServices, setSelectedServices] = useState([]);
  // const handleSelectServices = (services) => {
  //   setSelectedServices(services);
  //   //console.log("Selected services:", services);
  // };

  const handleSelect = (service) => {
    setSelectedServices((prevSelected) =>
      prevSelected.some((item) => item.ID_Servicio === service.ID_Servicio)
        ? prevSelected.filter(
            (item) => item.ID_Servicio !== service.ID_Servicio
          )
        : [...prevSelected, service]
    );
  };
  const addServicios = async () => {
    try {
      for (const service of selectedServices) {
        const response = await axios.post(
          "http://localhost:3000/propiedad-servicio",
          {
            Propiedad_ID: idPropiedad - 1,
            Servicio_ID: service.ID_Servicio, // Usamos el nombre del servicio directamente
          }
        );
        console.log("", response);
      }
      //console.log("Service added:", response.data);
    } catch (error) {
      console.error("Error saving services:", error);
    }
  };
  return (
    <div style={{ background: "#007bff1a" }}>
      <Container>
        <Row>
          <Col>
            <h3
              style={{
                color: "#212529",
                textAlign: "center",
                marginBottom: "30px",
                fontWeight: "bold",
              }}
            >
              Servicios adicionales de la propiedad
            </h3>
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
          <section>
            {" "}
            <Button variant="primary" onClick={addServicios} className="mt-3">
              Agregar Servicios
            </Button>
          </section>
        </Row>
      </Container>
    </div>
  );
}

ListOfServices.propTypes = {
  idPropiedad: PropTypes.number.isRequired,
};

export default ListOfServices;
