import PropTypes from "prop-types";
import "../Styles/FrameComponent.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "react-bootstrap";

const FrameComponent = ({ className = "" }) => {
  const [values, setValues] = useState({
    ID_Propiedad: "55",
    Precio: "100000.00",
    Ciudad: "San Isidro",
    Direccion: "casas de arbol",
    Provincia: "San Jose",
    Area_Lote: "25000.00",
    Num_Habitaciones: 5,
    Num_Banos: 3,
  });
  const [searhParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("View Seller ", searhParams.get("isViewSeller"));
    const fecthData = async () => {
      const response = await axios.get(
        `http://localhost:3000/spesific-property-component?propiedadId=${searhParams.get(
          "Id_Property"
        )}`
      );

      if (response.data) {
        const data = response.data[0];
        setValues({
          ID_Propiedad: data.ID_Propiedad,
          Precio: data.Precio,
          Ciudad: data.Ciudad,
          Direccion: data.Direccion,
          Provincia: data.Provincia,
          Area_Lote: data.Area_Lote,
          Num_Habitaciones: data.Num_Habitaciones,
          Num_Banos: data.Num_Banos,
        });
      }
      console.log(response);
    };

    fecthData();
  }, [searhParams]);

  const backView = () => {
    window.history.back();
  };

  return (
    <div className={`container-wrapper ${className}`}>
      <div className="container1">
        <div className="villa-in-2639-grand-ave-san-di-parent">
          <h3 className="villa-in-2639">
            Gran propiedad, ubicada en {values.Ciudad}
          </h3>
          <div className="container2">
            <div className="paragraph">
              <div className="type-your-digit-security-code-wrapper">
                <b className="type-your">${values.Precio}</b>
              </div>
            </div>
            <div className="border-wrapper">
              <div>
                <div className="for-rent">Disponible</div>
              </div>
            </div>
            <div className="container-container">
              <div className="container3">
                <img className="icon" alt="" src="/icon.svg" />
                <div className="grand-ave-san" style={{ width: "100%" }}>
                  {values.Direccion} , {values.Ciudad}, {values.Provincia}
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
                  <b className="property-details-units">
                    {values.ID_Propiedad}
                  </b>
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
                  <b className="sqft">
                    {values.Area_Lote}{" "}
                    <span style={{ fontSize: "17px", marginLeft: "5px" }}>
                      m²
                    </span>
                  </b>
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
                  <b className="b">{values.Num_Habitaciones}</b>
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
                  <b className="b">{values.Num_Banos}</b>
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
          <div>
            <Button variant="dark" onClick={backView}>
              Salir
            </Button>
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
