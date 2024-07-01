import { useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import "../Styles/Container.css";

const Container = ({
  className = "",
  fullName,
  propFlex,
  propMinWidth,
  propWidth,
}) => {
  const containerStyle = useMemo(() => {
    return {
      flex: propFlex,
      minWidth: propMinWidth,
      width: propWidth,
    };
  }, [propFlex, propMinWidth, propWidth]);

  return (
    <div className={`container49 ${className}`} style={containerStyle}>
      <Form className="input">
        <Form.Control type="text" />
      </Form>
    </div>
  );
};

Container.propTypes = {
  className: PropTypes.string,
  fullName: PropTypes.string,

  /** Style props */
  propFlex: PropTypes.any,
  propMinWidth: PropTypes.any,
  propWidth: PropTypes.any,
};

export default Container;
