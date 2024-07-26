import AddProperty from "./components/add-property-component";
import AddCaracteristicsProperty from "./components/add-caracteristics-property";

import AddUbicationProperty from "./components/add-ubication-property";
import Accordion from "react-bootstrap/Accordion";
import ListOfServices from "./components/extra-services";
import AddImagesProperty from "./components/add-images-property";
import FrameComponent6 from "../../components/FrameComponent6";
import DescriptionEditSeller from "./components/description-edit-seller";

const EditPropertySeller = () => {
  return (
    <div style={{ background: "#007bff1a" }}>
      <header style={{ padding: "50px" }}>
        <DescriptionEditSeller />
      </header>

      {/* {PartToEdit()} */}

      <Accordion
        defaultActiveKey="0"
        flush
        style={{ padding: "0 100px 30px 100px" }}
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h3
              style={{
                color: "#495057",
                fontFamily: "Yantramanav",
                fontWeight: "bold",
              }}
            >
              {" "}
              Mostrar Datos para Editar caracteristicas principales de la
              propiedad
            </h3>
          </Accordion.Header>
          <Accordion.Body>
            <AddCaracteristicsProperty isEditing={true} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion
        defaultActiveKey="0"
        flush
        style={{ padding: "0 100px 30px 100px" }}
      >
        <Accordion.Item eventKey="0" style={{ borderRadius: "10px" }}>
          <Accordion.Header>
            <h3
              style={{
                color: "#198754",
                fontFamily: "Yantramanav",
                fontWeight: "bold",
              }}
            >
              {" "}
              Mostrar Datos para Editar hubicacion de la propiedad
            </h3>
          </Accordion.Header>
          <Accordion.Body>
            <AddUbicationProperty />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion
        defaultActiveKey="0"
        flush
        style={{ padding: "0 100px 30px 100px" }}
      >
        <Accordion.Item eventKey="0" style={{ borderRadius: "10px" }}>
          <Accordion.Header>
            <h3
              style={{
                color: "#0d6efd",
                fontFamily: "Yantramanav",
                fontWeight: "bold",
              }}
            >
              {" "}
              Mostrar Datos para Editar informacion principal de la propiedad
            </h3>
          </Accordion.Header>
          <Accordion.Body>
            <AddProperty />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion
        defaultActiveKey="0"
        flush
        style={{ padding: "0 100px 30px 100px" }}
      >
        <Accordion.Item eventKey="0" style={{ borderRadius: "10px" }}>
          <Accordion.Header>
            <h3
              style={{
                color: "#dc3545",
                fontFamily: "Yantramanav",
                fontWeight: "bold",
              }}
            >
              {" "}
              Mostrar Datos para Editar los servicios de la propiedad
            </h3>
          </Accordion.Header>
          <Accordion.Body>
            <ListOfServices />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion
        defaultActiveKey="0"
        flush
        style={{ padding: "0 100px 100px 100px" }}
      >
        <Accordion.Item eventKey="0" style={{ borderRadius: "10px" }}>
          <Accordion.Header>
            <h3
              style={{
                color: "#ffc107bf",
                fontFamily: "Yantramanav",
                fontWeight: "bold",
              }}
            >
              {" "}
              Mostrar Datos para Editar las imagenes de la propiedad
            </h3>
          </Accordion.Header>
          <Accordion.Body>
            <AddImagesProperty />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <section
        id="soporte"
        style={{
          padding: "30px",
          backgroundImage: "linear-gradient(180deg, #f8f9fa00, #495057)",
        }}
      >
        <FrameComponent6 />
      </section>
    </div>
  );
};

function PartToEdit() {
  const accordions = [];

  for (let index = 0; index < 5; index++) {
    accordions.push(
      <Accordion
        key={index}
        defaultActiveKey="0"
        flush
        style={{ padding: "0 100px 30px 100px" }}
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h3
              style={{
                color: "#495057",
                fontFamily: "Yantramanav",
                fontWeight: "bold",
              }}
            >
              {" "}
              Mostrar Datos para Editar características principales de la
              propiedad {index + 1}
            </h3>
          </Accordion.Header>
          <Accordion.Body>
            <h1>Características {index + 1}</h1>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  }

  return <div>{accordions}</div>;
}

export default EditPropertySeller;
