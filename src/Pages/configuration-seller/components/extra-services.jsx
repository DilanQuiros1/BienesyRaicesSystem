import { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import "../Styles-configuration-seller/extra-services.css";

function ListOfServices({ idPropiedad, onShowImages, isEditing }) {
  const [selectedServices, setSelectedServices] = useState([]);
  const [searchParams] = useSearchParams();
  const [idProp, setIdProp] = useState();
  const [addedSuccess, setAddedSuccess] = useState(false);

  // const handleSelectServices = (services) => {
  //   setSelectedServices(services);
  //   //console.log("Selected services:", services);
  // };

  // useEffect(() => {
  //   setIdPropertyEdit(searchParams.get("IdProperty")); // Default to empty string if idProp is null
  // }, [searchParams]);
  const [ServicesData, setServicesData] = useState([]);

  useEffect(() => {
    if (isEditing) {
      setIdProp(searchParams.get("IdProperty"));
    } else {
      setIdProp(idPropiedad);
    }
    const fetchServices = async () => {
      try {
        // Obtener todos los servicios disponibles
        //setIdPropertyEdit();
        const servicesResponse = await axios.get(
          "http://localhost:3000/servicios"
        );
        const listServicesData = servicesResponse.data;

        if (isEditing) {
          // Obtener servicios asignados a la propiedad
          const propertiesServicesResponse = await axios.get(
            `http://localhost:3000/servicios-propiedad?ID_Propiedad=${searchParams.get(
              "IdProperty"
            )}`
          );
          const listServicesProperty = propertiesServicesResponse.data;

          // Encontrar los servicios que ya están asignados a la propiedad
          const assignedServices = listServicesData.filter((service) =>
            listServicesProperty.some(
              (serviceProperty) =>
                serviceProperty.Servicio_ID === service.ID_Servicio
            )
          );
          setServicesData(listServicesData);
          setSelectedServices(assignedServices);
        }

        // Actualizar estados
        setServicesData(listServicesData);
        //setSelectedServices(assignedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [searchParams, isEditing, idPropiedad]);

  const handleSelect = (service) => {
    setSelectedServices((prevSelected) =>
      prevSelected.some((item) => item.ID_Servicio === service.ID_Servicio)
        ? prevSelected.filter(
            (item) => item.ID_Servicio !== service.ID_Servicio
          )
        : [...prevSelected, service]
    );
  };

  const variant = isEditing ? "warning" : "dark";

  const handleShowImages = () => {
    onShowImages();
  };
  const addServicios = async () => {
    try {
      if (isEditing) {
        await deleteServicesToEdit();
      }
      for (const service of selectedServices) {
        const response = await axios.post(
          "http://localhost:3000/propiedad-servicio",
          {
            Propiedad_ID: idProp,
            Servicio_ID: service.ID_Servicio, // Usamos el nombre del servicio directamente
          }
        );
        setAddedSuccess(true);
      }
      //console.log("Service added:", response.data);
    } catch (error) {
      console.error("Error saving services:", error);
    }
  };

  const deleteServicesToEdit = async () => {
    const response = await axios.delete(
      `http://localhost:3000/propiedad-servicio-delete/${idProp}`
    );
    console.log(response);
  };
  return (
    <div>
      <div className="container-extra-services">
        <div>
          <Row>
            <Col>
              <h3
                style={{
                  color: "#495057",

                  marginBottom: "30px",
                  fontWeight: "bold",
                }}
              >
                Servicios adicionales de la propiedad
              </h3>
              <DropdownButton title="Seleccionar Servicios">
                {ServicesData.map((data, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleSelect(data)}
                    active={selectedServices.some(
                      (service) => service.ID_Servicio === data.ID_Servicio
                    )}
                  >
                    {data.Nombre}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="mt-5">
                <h4 style={{ color: "#495057" }}>Servicios Seleccionados:</h4>
                <ul>
                  {selectedServices.length > 0 ? (
                    selectedServices.map((service, index) => (
                      <li key={index}>
                        <i className="bi bi-check-lg"></i> {service.Nombre}
                      </li>
                    ))
                  ) : (
                    <li>No hay servicios seleccionados</li>
                  )}
                </ul>
                {selectedServices.length > 0 ? (
                  <div>
                    <p style={{ color: "#198754", fontSize: "1.1em" }}>
                      Si ya agregaste todos los datos, preciona el siguiente
                      boton.
                    </p>

                    {!addedSuccess && (
                      <section>
                        {" "}
                        <Button
                          variant={variant}
                          onClick={addServicios}
                          className="mt-3"
                        >
                          {isEditing ? "Editar Servicios" : "Agregar Servicios"}
                        </Button>
                      </section>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Col>
          </Row>
        </div>
        <div
          className={`base-class ${
            isEditing ? "img-add-extraServices edit" : "img-add-extraServices"
          }`}
        >
          {" "}
        </div>
      </div>
      <section style={{ marginTop: "10px" }}>
        {addedSuccess && (
          <section style={{ padding: "25px", background: "#dee2e6" }}>
            <p>
              {!isEditing
                ? "Se agregaron los servicios de forma correcta, ¡Preciona el siguiente boton para realizar los ultimos pasos!"
                : "Los servicios de su propiedad se editaron de forma correcta, ¡muchas gracias por utilizar nuestros servicios!"}
            </p>
            {!isEditing && (
              <Button
                variant="success"
                onClick={handleShowImages}
                className="mt-3"
              >
                Continuar
              </Button>
            )}
          </section>
        )}
      </section>
    </div>
  );
}

ListOfServices.propTypes = {
  idPropiedad: PropTypes.number.isRequired,
  onShowImages: PropTypes.func,
  isEditing: PropTypes.bool.isRequired,
};

export default ListOfServices;
