import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "../Styles/FrameComponent4.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const FrameComponent4 = ({ className = "" }) => {
  return (
    <section className={`contact-container-wrapper ${className}`}>
      <div className="contact-container">
        <h3 className="contact">Contácto</h3>
        <div className="background3">
          <div className="container45">
            <div className="container46">
              <div className="container47">
                <div className="heading-3">
                  <div className="link5">
                    <h2 className="aya-magdy">Byron Méndez</h2>
                  </div>
                </div>
                <b className="property-agent">Agente de propiedad</b>
              </div>
              <div className="agent-contact-details">
                <div className="agent-social-container">
                  <div className="agent-social-icons">
                    <div className="link6">
                      <img
                        className="icon12"
                        loading="lazy"
                        alt=""
                        src="/icon-12.svg"
                      />
                    </div>
                    <div className="agent-social-divider">
                      <img
                        className="icon13"
                        loading="lazy"
                        alt=""
                        src="/icon.svg"
                      />
                      <div className="horizontal-divider" />
                      <img
                        className="icon14"
                        loading="lazy"
                        alt=""
                        src="/icon-14.svg"
                      />
                      <div className="horizontal-divider" />
                    </div>
                  </div>
                  <div className="agent-address-container">
                    <div className="agent-address-content">
                      <div className="agent-address-link">
                        <div className="link7">
                          <img
                            className="icon15"
                            loading="lazy"
                            alt=""
                            src="/icon-15.svg"
                          />
                        </div>
                        <div className="link7">
                          <img
                            className="icon15"
                            loading="lazy"
                            alt=""
                            src="/icon-16.svg"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="agent-address-details">
                      <div className="pacific-hwy-110">
                        1199 Pacific Hwy #110 San Diego
                      </div>
                      <div className="agent-address-space">
                        <div className="div6">444 555 6667</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="agent-contact-items">
                  <div className="agent-contact-icons">
                    <img
                      className="icon17"
                      loading="lazy"
                      alt=""
                      src="/icon-17.svg"
                    />
                  </div>
                  <div className="ayamagdygmailcom">byron@gmail.com</div>
                </div>
                <div className="horizontal-divider" />
                <div className="agent-contact-items1">
                  <div className="agent-contact-icons">
                    <img
                      className="icon18"
                      loading="lazy"
                      alt=""
                      src="/icon-18.svg"
                    />
                  </div>
                  <div className="httpexamplecom">http://example.com</div>
                </div>
              </div>
              <Button className="link9" variant="primary">
                Contactar <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </div>
            <div className="container48">
              <img
                className="x340jpg-icon"
                loading="lazy"
                alt=""
                src="/101270x340jpg@2x.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FrameComponent4.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent4;
