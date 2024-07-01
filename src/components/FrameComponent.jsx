import PropTypes from "prop-types";
import "../Styles/FrameComponent.css";

const FrameComponent = ({ className = "" }) => {
  return (
    <div className={`container-wrapper ${className}`}>
      <div className="container1">
        <div className="villa-in-2639-grand-ave-san-di-parent">
          <h3 className="villa-in-2639">Villa in 2639 Grand Ave San Diego</h3>
          <div className="container2">
            <div className="paragraph">
              <div className="type-your-digit-security-code-wrapper">
                <b className="type-your">{`$170,000 `}</b>
              </div>
              <div className="year">/ Año</div>
            </div>
            <div className="border-wrapper">
              <div className="border">
                <div className="for-rent">En renta</div>
              </div>
            </div>
            <div className="container-container">
              <div className="container3">
                <img className="icon" alt="" src="/icon.svg" />
                <div className="grand-ave-san">
                  2639 Grand Ave San Diego, CA 92109
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container4">
          <nav className="container5">
            <div className="container6">
              <div className="container7">
                <div className="container8">
                  <img
                    className="icon1"
                    loading="lazy"
                    alt=""
                    src="/icon-1.svg"
                  />
                </div>
              </div>
              <div className="container9">
                <div className="container10">
                  <b className="property-details-units">501</b>
                </div>
                <div className="container11">
                  <div className="property-id">Propiedad ID</div>
                </div>
              </div>
            </div>
            <div className="container12">
              <div className="container7">
                <div className="container8">
                  <img
                    className="icon1"
                    loading="lazy"
                    alt=""
                    src="/icon-2.svg"
                  />
                </div>
              </div>
              <div className="container9">
                <div className="container16">
                  <b className="sqft">500 SqFt</b>
                </div>
                <div className="container17">
                  <div className="size">Tamaño</div>
                </div>
              </div>
            </div>
            <div className="container18">
              <div className="container7">
                <div className="container8">
                  <img
                    className="icon1"
                    loading="lazy"
                    alt=""
                    src="/icon-3.svg"
                  />
                </div>
              </div>
              <div className="container9">
                <div className="container10">
                  <b className="b">5</b>
                </div>
                <div className="container11">
                  <div className="bedrooms">Dormitorios</div>
                </div>
              </div>
            </div>
            <div className="container24">
              <div className="container7">
                <div className="container8">
                  <img
                    className="icon1"
                    loading="lazy"
                    alt=""
                    src="/icon-4.svg"
                  />
                </div>
              </div>
              <div className="container9">
                <div className="container10">
                  <b className="b">3</b>
                </div>
                <div className="container11">
                  <div className="bathrooms">Baños</div>
                </div>
              </div>
            </div>
          </nav>
          <div className="container30">
            <div className="background">
              <div className="container31">
                <div className="container32">
                  <img className="icon5" alt="" src="/icon-5.svg" />
                </div>
              </div>
            </div>
            <div className="link">
              <div className="container33">
                <img className="icon6" alt="" src="/icon-6.svg" />
              </div>
            </div>
            <div className="link1">
              <div className="container34">
                <img className="icon7" alt="" src="/icon-7.svg" />
              </div>
            </div>
            <div className="link">
              <div className="container33">
                <img className="icon6" alt="" src="/icon-8.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;
