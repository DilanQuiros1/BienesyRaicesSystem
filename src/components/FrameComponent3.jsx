import PropTypes from "prop-types";
import "../Styles/FrameComponent3.css";

const FrameComponent3 = ({ className = "" }) => {
  return (
    <section className={`amenities-container-wrapper ${className}`}>
      <div className="amenities-container">
        <div className="list1">
          <div className="item12">
            <div className="link4">
              <div className="ground-floor">Ground Floor</div>
            </div>
          </div>
        </div>
        <div className="border4">
          <img
            className="floor-2-scaledjpg-icon"
            loading="lazy"
            alt=""
            src="/floor2scaledjpg@2x.png"
          />
          <div className="fantastic-one-bedroom-container1">
            <p className="time-concierge-and">
              Fantástico apartamento de un dormitorio orientado al este en este increíble Trump Place
              Edificio de portero. Hay Una Cocina Grande, Lavadora Y Secadora.
              Excelente iluminación y mucho espacio de guardarropas.
            </p>
            <p className="time-concierge-and">
              Además, hay increíbles elementos "integrados" hechos a medida en la sala de estar
              Habitación Que Ofrece Mucho Espacio De Almacenamiento. El Edificio Cuenta Con Gimnasio, Piscina,
              Habitación Infantil, Servicio Valet, Completo
            </p>
          </div>
          <div className="list2">
            <div className="floorplan-size-details">
              <div className="item13">
                <b className="size2">Tamaño</b>
                <div className="sqft3">200 SqFt</div>
              </div>
              <div className="item13">
                <b className="bathrooms2">Habitaciones</b>
                <div className="floorplan-bedrooms-value">3</div>
              </div>
            </div>
            <div className="floorplan-size-details">
              <div className="item15">
                <b className="bedrooms2">Baños</b>
                <div className="floorplan-bedrooms-value">5</div>
              </div>
              <div className="item15">
                <b className="price1">Precio</b>
                <div className="div5">$2,000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FrameComponent3.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent3;
