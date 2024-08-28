import { useState, useEffect } from "react";
import FrameComponent from "../components/FrameComponent";
import FrameComponent1 from "../components/FrameComponent1";
import FrameComponent2 from "../components/FrameComponent2";
import FrameComponent3 from "../components/FrameComponent3";
import FrameComponent4 from "../components/FrameComponent4";

import FrameComponent6 from "../components/FrameComponent6";
import EnlargedImage from "../components/EnlargedImage";
import "../Styles/Main.css";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
const Main = () => {
  const [enlargedImage, setEnlargedImage] = useState(null);

  const [searhParams] = useSearchParams();
  const [getView, setView] = useState();
  const [description, setDescription] = useState();

  const handleImageClick = (src) => {
    setEnlargedImage(src);
  };

  // Fetch images from API
  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const responseDescription = await axios.get(
          `http://localhost:3000/spesific-property-component1?propiedadId=${searhParams.get(
            "Id_Property"
          )}`
        );
        console.log(responseDescription.data[0].Descripcion);
        setDescription(responseDescription.data[0].Descripcion);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchDescription();
  }, [searhParams]);

  return (
    <div className="main">
      <main className="container">
        <FrameComponent isViewSeller={false} />
        <FrameComponent1 onImageClick={handleImageClick} />
        <section className="container-inner">
          <div className="frame-parent">
            <div className="description-parent">
              <h3 className="description">Descripción</h3>
              <div className="fantastic-one-bedroom-container">
                <p className="fantastic-one-bedroom">{description}</p>
                {/* <p className="fantastic-one-bedroom">
                  Además, hay increíbles elementos integrados hechos a medida en
                  el Sala de estar que ofrece mucho espacio de almacenamiento.
                  El edificio tiene un Gimnasio, piscina, salón para niños,
                  servicio de valet, tiempo completo
                </p> */}
              </div>
            </div>
            {/* <div className="main-bath-has-been-remodeled-i-wrapper">
              <div className="main-bath-has-container">
                <p className="fantastic-one-bedroom">{description}</p>
              </div>
            </div> */}
            {/* <div className="main-bath-has-container">
              <p className="fantastic-one-bedroom">
                ¡¡Venta corta aprobada en $440,000!! casa con cocina remodelada,
                gabinetes y encimeras mejorados, plano de planta abierto con
                espaciosos Diseño que incluye una enorme sala familiar separada.
              </p>
              <p className="fantastic-one-bedroom">
                Ventanas nuevas y techo más nuevo, aire acondicionado nuevo,
                totalmente permitido. pies cuadrados adicionales a la casa
                original. Esto es una belleza. Enorme habitación principal con
                sala de estar/vestidor independiente
              </p>
            </div> */}
          </div>
        </section>
        <FrameComponent2 />
        <FrameComponent3 />
        <FrameComponent4 />
        {/* <FrameComponent5 /> */}
        <FrameComponent6 />
      </main>
      {enlargedImage && (
        <EnlargedImage
          src={enlargedImage}
          onClose={() => setEnlargedImage(null)}
        />
      )}
    </div>
  );
};

export default Main;
