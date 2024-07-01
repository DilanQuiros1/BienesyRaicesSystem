import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import Container from "./Container";
import PropTypes from "prop-types";
import "../Styles/FrameComponent5.css";

const FrameComponent5 = ({ className = "" }) => {
  return (
    <section className={`form-container-parent ${className}`}>
      <div className="form-container">
        <div className="form-fields">
          <Container />
          <Container propFlex="1" propMinWidth="300" propWidth="100%" />
          <Container propFlex="1" propMinWidth="300" propWidth="100%" />
        </div>
        <Container
          fullName="Hola, estoy interesado en 1234 Main St"
          propFlex="unset"
          propMinWidth="unset"
          propWidth="100%"
        />
         <div className="container50">
          <Button className="button" variant="primary">
            Enviar peticion
          </Button>
         </div>
      </div>
      <div className="horizontalborder-wrapper">
        <div className="horizontalborder">
          <div className="property-stats-items">
            <img className="icon19" loading="lazy" alt="" src="/icon-21.svg" />
          </div>
          <div className="january-19-2017">{` January 19, 2017 `}</div>
          <div className="property-stats-items">
            <img className="icon20" loading="lazy" alt="" src="/icon-22.svg" />
          </div>
          <div className="views"> 513 vistas</div>
        </div>
      </div>
    </section>
  );
};

FrameComponent5.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent5;
