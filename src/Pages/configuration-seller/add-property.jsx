import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import AddImagesProperty from "./components/add-images-property";
import axios from "axios";
import ListOfServices from "./components/extra-services";

import FrameComponent6 from "../../components/FrameComponent6";
import HeaderSeller from "./components/header-configuration-seller";
import AddCaracteristicsProperty from "./components/add-caracteristics-property";
import AddUbicationProperty from "./components/add-ubication-property";
import AddProperty from "./components/add-property-component";

const RegisterProperty = () => {
  const [contador, setContador] = useState(null);
  // const [validated, setValidated] = useState(false);

  const [showUbications, setShowUbications] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showProperty, setShowProperty] = useState(false);
  const [showImages, setShowImages] = useState(false);

  const handleShowUbication = () => {
    setShowUbications(true);
  };
  const handleShowServices = () => {
    setShowServices(true);
  };
  const handleShowProperty = () => {
    setShowProperty(true);
  };
  const handleShowImages = () => {
    setShowImages(true);
  };

  const obtenerContador = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/propiedades/count"
      );
      const nuevoContador = response.data.count + 51;
      setContador(nuevoContador);
      console.log("contador: ", nuevoContador);
    } catch (error) {
      console.error("Error al obtener el contador:", error);
    }
  };

  useEffect(() => {
    obtenerContador();
  }, []);

  const [mapKey, setMapKey] = useState(0);

  const reloadMap = () => {
    setMapKey((prevKey) => prevKey + 1);
  };

  return (
    <div style={{ background: "white" }}>
      <header>
        <HeaderSeller />
      </header>

      <Container className="p-5">
        <div>
          <h1
            style={{
              color: "rgb(59 109 158)",
              fontSize: "4em",
              marginBottom: "10px",
              fontWeight: "bold",
            }}
          >
            Empecemos
          </h1>

          <h3
            style={{
              color: "#495057",
              textAlign: "center",
              marginBottom: "30px",
              fontWeight: "bold",
            }}
          >
            Vende tus propiedades con RealState.com
          </h3>
        </div>
        <section>
          {contador !== null && !showUbications && (
            <AddCaracteristicsProperty
              idPropiedad={contador}
              onShowUbication={handleShowUbication}
            />
          )}
        </section>
        {contador !== null && showUbications && !showProperty && (
          <div>
            <h1
              style={{
                color: "#28a745",
                fontSize: "3em",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              Paso #2
            </h1>
            <p
              style={{
                fontSize: "1.2em",
                color: "rgb(59 109 158)",
                fontWeight: "bold",
              }}
            >
              Estamos a unos pasos para terminar!!
            </p>
            <p>
              Si no se visualiza el mapa, puedes precionar el siguiente boton.
            </p>
            <button className="btn btn-warning" onClick={reloadMap}>
              Recargar Mapa
            </button>
            <AddUbicationProperty
              key={mapKey}
              idUbicacion={contador}
              onShowProperty={handleShowProperty}
            />
          </div>
        )}

        <div style={{ width: "100%" }}>
          {contador !== null && showProperty && !showServices && (
            <section
              className="mt-5 mb-5"
              style={{ position: "relative", top: "-100px" }}
            >
              <h1
                style={{
                  color: "#28a745",
                  fontSize: "3em",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                Paso #3
              </h1>
              <p
                style={{
                  fontSize: "1.2em",
                  color: "rgb(59 109 158)",
                  fontWeight: "bold",
                }}
              >
                Faltan unos cuantos pasos!!
              </p>
              <AddProperty
                idPropiedad={contador}
                onShowServices={handleShowServices}
              />
            </section>
          )}

          {contador !== null && showServices && !showImages && (
            <section
              className="mt-5 mb-5"
              style={{ position: "relative", top: "-100px" }}
            >
              <h1
                style={{
                  color: "#28a745",
                  fontSize: "3em",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                Paso #4
              </h1>
              <p
                style={{
                  fontSize: "1.2em",
                  color: "rgb(59 109 158)",
                  fontWeight: "bold",
                }}
              >
                Ya casi esta listo!!
              </p>
              <ListOfServices
                idPropiedad={contador}
                onShowImages={handleShowImages}
              />
            </section>
          )}

          {contador !== null && showImages && (
            <section
              style={{ position: "relative", top: "-100px" }}
              className="mt-5 mb-5"
            >
              <h1
                style={{
                  color: "#28a745",
                  fontSize: "3em",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                Paso #5
              </h1>
              <p
                style={{
                  fontSize: "1.2em",
                  color: "#adb5bd",
                  fontWeight: "bold",
                }}
              >
                Este es el ultimo paso para registrar tu propiedad en
                <apan> RealState.com!!</apan>
              </p>
              <AddImagesProperty idPropiedad={contador} />
            </section>
          )}
        </div>
      </Container>
      <section
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

export default RegisterProperty;
