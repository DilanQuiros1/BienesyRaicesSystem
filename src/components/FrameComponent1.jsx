import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../Styles/FrameComponent1.css";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const FrameComponent1 = ({ className = "", onImageClick }) => {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searhParams] = useSearchParams();

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/imagenes-property?ID_Propiedad=${searhParams.get(
            "Id_Property"
          )}`
        );
        const data = await response.json();
        setImages(data.map((item) => item.Url_img));

        const responseDescription = await axios.get(
          `http://localhost:3000/spesific-property-component1?propiedadId=${searhParams.get(
            "Id_Property"
          )}`
        );
        setDescription(responseDescription.data.Descripcion);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, [searhParams]);

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
    changeImage(
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    );
  };

  const handleNextImage = () => {
    changeImage((currentImageIndex + 1) % images.length);
  };

  if (loading) {
    return <div>Loading...</div>; // Optionally, add a loading spinner or message
  }

  return (
    <section className={`container-child ${className}`}>
      <div className="container-parent">
        <div className="container36">
          <div className="container37">
            <div className="container38">
              <div className="container39">
                <img
                  className={`x420jpg-icon ${isTransitioning ? "fade" : ""}`}
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
            <div
              key={index}
              className={`container40 ${
                index === currentImageIndex ? "container42" : ""
              }`}
            >
              <img
                className={`x130jpg-icon ${
                  index === currentImageIndex ? "x130jpg-icon2" : ""
                }`}
                loading="lazy"
                alt=""
                src={image}
                onClick={() => {
                  onImageClick(image);
                  changeImage(index);
                }}
              />
              {index === currentImageIndex && <div className="overlay" />}
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
