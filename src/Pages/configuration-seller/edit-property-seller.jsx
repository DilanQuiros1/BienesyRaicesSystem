import AddProperty from "./components/add-property-component";
import AddCaracteristicsProperty from "./components/add-caracteristics-property";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddUbicationProperty from "./components/add-ubication-property";
import { useSearchParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import ListOfServices from "./components/extra-services";
import AddImagesProperty from "./components/add-images-property";
import FrameComponent6 from "../../components/FrameComponent6";
import DescriptionEditSeller from "./components/description-edit-seller";

const EditPropertySeller = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const backSellerView = () => {
    navigate({
      pathname: "/Prueba",
      search: `?Correo=${searchParams.get("Correo")}`,
    });
  };
  const [mapKey, setMapKey] = useState(0);

  const reloadMap = () => {
    setMapKey((prevKey) => prevKey + 1);
  };
  return (
    <div style={{ background: "#007bff1a" }}>
      <header style={{ padding: "50px" }}>
        <Button
          variant="dark"
          style={{
            position: "relative",
            left: "93%",
            marginBottom: "50px",
            width: "100px",
          }}
          onClick={backSellerView}
        >
          Salir
        </Button>
        <DescriptionEditSeller />
      </header>

      {/* {PartToEdit()} */}

      <Accordion
        defaultActiveKey={null}
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
            <AddCaracteristicsProperty isEditing={true} idPropiedad={0} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion
        defaultActiveKey={null}
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
            <p>
              Si no se visualiza el mapa, puedes precionar el siguiente boton.
            </p>
            <button className="btn btn-warning" onClick={reloadMap}>
              Recargar Mapa
            </button>
            <AddUbicationProperty key={mapKey} isEditing={true} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion
        defaultActiveKey={null}
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
            <AddProperty idPropiedad={0} isEditing={true} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion
        defaultActiveKey={null}
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
            <ListOfServices idPropiedad={0} isEditing={true} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion
        defaultActiveKey={null}
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
            <AddImagesProperty idPropiedad={0} isEditing={true} />
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
