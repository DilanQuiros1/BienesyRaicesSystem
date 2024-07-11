import { useState } from "react";
import FrameComponent from "../components/FrameComponent";
import FrameComponent1 from "../components/FrameComponent1";
import FrameComponent2 from "../components/FrameComponent2";
import FrameComponent3 from "../components/FrameComponent3";
import FrameComponent4 from "../components/FrameComponent4";
import FrameComponent5 from "../components/FrameComponent5";
import FrameComponent6 from "../components/FrameComponent6";
import EnlargedImage from "../components/EnlargedImage";
import "../Styles/Main.css";

const Main = () => {
  const [enlargedImage, setEnlargedImage] = useState(null);

  const handleImageClick = (src) => {
    setEnlargedImage(src);
  };

  return (
    <div className="main">
      <main className="container">
        <FrameComponent />
        <FrameComponent1 onImageClick={handleImageClick} />
        <section className="container-inner">
          <div className="frame-parent">
            <div className="description-parent">
              <h3 className="description">Descripción</h3>
              <div className="fantastic-one-bedroom-container">
                <p className="fantastic-one-bedroom">
                  Fantástico apartamento de un dormitorio orientado al este en
                  este increíble Trump Place Edificio de portero. Hay Una Cocina
                  Grande, Lavadora Y Secadora. Excelente iluminación y mucho
                  espacio de guardarropas. En
                </p>
                <p className="fantastic-one-bedroom">
                  Además, hay increíbles elementos integrados hechos a medida en
                  el Sala de estar que ofrece mucho espacio de almacenamiento.
                  El edificio tiene un Gimnasio, piscina, salón para niños,
                  servicio de valet, tiempo completo
                </p>
              </div>
            </div>
            <div className="main-bath-has-been-remodeled-i-wrapper">
              <div className="main-bath-has-container">
                <p className="fantastic-one-bedroom">
                  El baño principal ha sido remodelado e incluye una gran ducha
                  con banco para sentarse con azulejos. El patio trasero no
                  incluye mantenimiento cubierta con luces incorporadas.
                  almacenamiento adicional
                </p>
              </div>
            </div>
            <div className="main-bath-has-container">
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
            </div>
          </div>
        </section>
        <FrameComponent2 />
        <FrameComponent3 />
        <FrameComponent4 />
        <FrameComponent5 />
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
