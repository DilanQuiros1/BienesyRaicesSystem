import PropTypes from "prop-types";
import "../Styles/FrameComponent2.css";

const FrameComponent2 = ({ className = "" }) => {
  return (
    <section className={`frame-section ${className}`}>
      <div className="frame-group">
        <div className="frame-container">
          <div className="address-parent">
            <h3 className="address">Dirección</h3>
            <div className="strong-address-parent">
              <div className="strong-address-container">
                <b>Dirección:</b>
                <span> 2639 Grand Ave San Diego, CA 92109</span>
              </div>
              <div className="strong-country-container">
                <b>País:</b>
                <span> Costa Rica</span>
              </div>
              <div className="strong-province-container">
                <b>Provincia / Estado:</b>
                <span> San José </span>
              </div>
              <div className="strong-city-container">
                <b>Ciudad:</b>
                <span> San Isidro</span>
              </div>
            </div>
          </div>
          <div className="strong-neighborhood-parent">
            <div className="strong-country-container">
              <b>Vecindario:</b>
              <span> La Bonita</span>
            </div>
            <div className="strong-province-container">
              <b>Código postal / ZIP:</b>
              <span> 90094</span>
            </div>
          </div>
          <div className="open-on-google-maps-parent">
            <div className="open-on-google">{`Open on Google Maps `}</div>
            <div className="icon-frame">
              <img
                className="icon11"
                loading="lazy"
                alt=""
                src="/icon-11.svg"
              />
            </div>
          </div>
        </div>
        <form className="list-parent">
          <div className="list">
            <button className="link3">
              <a className="overview">Descripción general</a>
            </button>
            <div className="overview-and-features">
              <div className="features">Features</div>
            </div>
            <div className="overview-and-features1">
              <div className="video">Video</div>
            </div>
            <div className="virtual-tour">Virtual Tour</div>
          </div>
          <div className="border3">
            <div className="item-parent">
              <div className="item">
                <b className="property-id1">ID de propiedad</b>
                <div className="property-detail-header">501</div>
              </div>
              <div className="item">
                <b className="year-built">Año de construcción</b>
                <div className="div">2012</div>
              </div>
            </div>
            <div className="item-parent">
              <div className="item-group">
                <div className="item2">
                  <b className="price">Precio</b>
                  <div className="price-value-wrapper">
                    <div className="price-value">{`$170,000 `}</div>
                  </div>
                  <div className="year1">/ Año</div>
                </div>
                <input className="item3" type="text" />
                <div className="item4">
                  <b className="property-status">Estado de la propiedad</b>
                  <div className="for-rent1">For Rent</div>
                </div>
                <div className="item5">
                  <b className="bedrooms1">Dormitorios</b>
                  <div className="div1">5</div>
                </div>
                <div className="item4">
                  <b className="bathrooms1">Baños</b>
                  <div className="div1">3</div>
                </div>
              </div>
              <div className="item-group">
                <div className="item4">
                  <b className="size1">Tamaño</b>
                  <div className="sqft1">500 SqFt</div>
                </div>
                <input className="item3" type="text" />
                <div className="item4">
                  <b className="label">Etiqueta</b>
                  <div className="hot-offer">Oferta caliente</div>
                </div>
                <div className="item5">
                  <b className="garages">Garajes</b>
                  <div className="div1">2</div>
                </div>
                <div className="item11">
                  <b className="garage-size">Tamaño del garaje</b>
                  <div className="sqft1">100 SqFt</div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

FrameComponent2.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent2;
