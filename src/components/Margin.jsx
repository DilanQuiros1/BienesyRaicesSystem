import { useMemo } from "react";
import PropTypes from "prop-types";
import "../Styles/Margin.css";

const Margin = ({
  className = "",
  name1,
  propFlex,
  propMinWidth,
  propWidth,
}) => {
  const marginStyle = useMemo(() => {
    return {
      flex: propFlex,
      minWidth: propMinWidth,
      width: propWidth,
    };
  }, [propFlex, propMinWidth, propWidth]);

  return (
    <div className={`margin ${className}`} style={marginStyle}>
      <div className="container51">
        <div className="input1">
          <div className="container52">
            <div className="name">{name1}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Margin.propTypes = {
  className: PropTypes.string,
  name1: PropTypes.string,

  /** Style props */
  propFlex: PropTypes.any,
  propMinWidth: PropTypes.any,
  propWidth: PropTypes.any,
};

export default Margin;
