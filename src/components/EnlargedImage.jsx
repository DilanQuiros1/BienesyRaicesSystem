import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../Styles/EnlargedImage.css";

const EnlargedImage = ({ src, onClose }) => {
  return (
    <div className="enlarged-image-overlay">
      <div className="enlarged-image-container">
        <img src={src} alt="Enlarged" className="enlarged-image" />
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <button className="nav-button prev">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button className="nav-button next">
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

EnlargedImage.propTypes = {
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EnlargedImage;