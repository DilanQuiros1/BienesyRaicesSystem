import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../Styles/FrameComponent1.css";

const FrameComponent1 = ({ className = "", onImageClick }) => {
  const images = [
    "/009870x420jpg@2x.png",
    "/12250x130jpg@2x.png",
    "/10250x130jpg@2x.png",
    "/009250x130jpg@2x.png",
    "/008250x130jpg@2x.png",
    "/007250x130jpg@2x.png"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const changeImage = (newIndex) => {
    setIsTransitioning(true);
    setCurrentImageIndex(newIndex);
  };

  const handlePrevImage = () => {
    changeImage(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
  };

  const handleNextImage = () => {
    changeImage((currentImageIndex + 1) % images.length);
  };

  return (
    <section className={`container-child ${className}`}>
      <div className="container-parent">
        <div className="container36">
          <div className="container37">
            <div className="container38">
              <div className="container39">
                <img
                  className={`x420jpg-icon ${isTransitioning ? 'fade' : ''}`}
                  alt=""
                  src={images[currentImageIndex]}
                  onClick={() => onImageClick(images[currentImageIndex])}
                />
              </div>
            </div>
          </div>
          <div className="background1" onClick={handlePrevImage}>
            <div className="icon-wrapper">
              <img className="icon9" loading="lazy" alt="" src="/icon-9.svg" />
            </div>
          </div>
          <div className="background-wrapper">
            <div className="background2" onClick={handleNextImage}>
              <div className="border2" />
              <div className="icon-wrapper">
                <img className="icon9" alt="" src="/icon-10.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="container-group">
          {images.map((image, index) => (
            <div key={index} className={`container40 ${index === 2 ? "container42" : ""}`}>
              <img
                className={`x130jpg-icon ${index === 2 ? "x130jpg-icon2" : ""}`}
                loading="lazy"
                alt=""
                src={image}
                onClick={() => {
                  onImageClick(image);
                  changeImage(index);
                }}
              />
              {index === 2 && <div className="overlay" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
  onImageClick: PropTypes.func.isRequired,
};

export default FrameComponent1;