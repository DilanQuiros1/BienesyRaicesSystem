import PropTypes from "prop-types";
import React from "react";
import "../Styles/FrameComponent2.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MapComponent from "../Pages/configuration-seller/components/maps";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Circle,
} from "@react-google-maps/api";
const FrameComponent2 = ({ className = "" }) => {
  const [searhParams] = useSearchParams();
  const [extraServices, setExtraServices] = useState([]);
  const [values, setValues] = useState({
    Ciudad: "",
    Direccion: "",
    Latitud: "",
    Longitud: "",
    Provincia: "",
    Pais: "",
    CodigoPostal: 0,
  });
  const [valuesProperty, setValuesProperty] = useState({
    ID_Propiedad: "",
    Nombre: "",
    Estado: "",
    Fecha_Creacion: "2024-07-22T23:05:47.000Z",
    Precio: "",
    Nom_Seller: "",
    Apellidos: "",
    Area_Casa: "",
    Area_Lote: "",
    Num_Habitaciones: "",
    Num_Banos: "",
  });
  useEffect(() => {
    const fecthData = async () => {
      const response = await axios.get(
        `http://localhost:3000/spesific-property-component2?propiedadId=${searhParams.get(
          "Id_Property"
        )}`
      );

      if (response.data) {
        const data = response.data[0];
        setValues({
          Ciudad: data.Ciudad,
          Direccion: data.Direccion,
          Provincia: data.Provincia,
          Latitud: data.Latitud,
          Longitud: data.Longitud,
          Pais: data.Pais,
          CodigoPostal: data.CodigoPostal,
        });
      }
      console.log("Values ", response);
    };

    const fecthDataMainProperty = async () => {
      const response = await axios.get(
        `http://localhost:3000/spesific-propertyMain-component2?propiedadId=${searhParams.get(
          "Id_Property"
        )}`
      );

      if (response.data) {
        const data = response.data[0];
        const date = new Date(data.Fecha_Creacion);
        const formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        setValuesProperty({
          ID_Propiedad: data.ID_Propiedad,
          Nombre: data.Nombre,
          Estado: data.Estado,
          Precio: data.Precio,
          Fecha_Creacion: formattedDate,
          Nom_Seller: data.Nom_Seller,
          Apellidos: data.Apellidos,
          Area_Casa: data.Area_Casa,
          Area_Lote: data.Area_Lote,
          Num_Habitaciones: data.Num_Habitaciones,
          Num_Banos: data.Num_Banos,
        });
      }
      console.log(response);
    };

    const fecthExtraServices = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/servicios-propiedad-show?ID_Propiedad=${searhParams.get(
            "Id_Property"
          )}`
        );

        if (response.data) {
          setExtraServices(response.data);
        }
        console.log("Values ", response);
      } catch (error) {
        console.log(error);
      }
    };

    fecthData();
    fecthDataMainProperty();
    fecthExtraServices();
  }, [searhParams]);

  return (
    <section className={`frame-section ${className}`}>
      <div className="frame-group">
        <div className="frame-container">
          <div className="address-parent" style={{ marginBottom: "100px" }}>
            <h3 className="address">Dirección</h3>
            <div className="strong-address-parent">
              <div className="strong-address-container">
                <b>Dirección:</b>
                <span>
                  {" "}
                  {values.Direccion} , {values.Ciudad}
                </span>
              </div>
              <div className="strong-country-container">
                <b>País:</b>
                <span> {values.Pais}</span>
              </div>
              <div className="strong-province-container">
                <b>Provincia / Estado:</b>
                <span> {values.Provincia} </span>
              </div>
              <div className="strong-city-container">
                <b>Ciudad:</b>
                <span>{values.Ciudad}</span>
              </div>
              <div className="strong-country-container">
                <b>Vecindario:</b>
                <span> La Bonita</span>
              </div>
              <div className="strong-province-container">
                <b>Código postal / ZIP:</b>
                <span>{values.CodigoPostal}</span>
              </div>
              <div className="open-on-google">
                <a
                  style={{ textDecoration: "none" }}
                  href={`https://www.google.com/maps?q=${values.Latitud},${values.Longitud}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir Ubicacion en Google Maps
                </a>
                <img
                  className="icon11"
                  loading="lazy"
                  alt=""
                  src="/icon-11.svg"
                />
              </div>
            </div>
          </div>

          <div className="open-on-google-maps-parent">
            <div></div>
          </div>
          <section style={{ width: "100%", margin: "200px 0 300px 0" }}>
            {values.Latitud && (
              <MapComponent
                isShowing={true}
                isEditing={true}
                initialLat={Number(values.Latitud)}
                initialLng={Number(values.Longitud)}
              />
            )}
          </section>
        </div>

        <form className="list-parent" style={{ marginTop: "500px" }}>
          <div className="list">
            <div className="link3">
              <a className="overview">Descripción general</a>
            </div>
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
                <div className="property-detail-header">
                  {valuesProperty.ID_Propiedad}
                </div>
              </div>
              <div className="item">
                <b className="year-built">Nombre Propiedad</b>
                <div className="div">{valuesProperty.Nombre}</div>
              </div>
            </div>
            <div className="item-parent">
              <div className="item-group">
                <div className="item2">
                  <b className="price">Precio</b>
                  <div className="price-value-wrapper">
                    <div className="price-value">$ {valuesProperty.Precio}</div>
                  </div>
                </div>
                <input className="item3" type="text" />
                <div className="item4">
                  <b className="property-status">Estado de la propiedad</b>
                  <div className="for-rent1">Disponible</div>
                </div>
                <div className="item5">
                  <b className="bedrooms1">Dormitorios</b>
                  <div className="div1">{valuesProperty.Num_Habitaciones}</div>
                </div>
                <div className="item4">
                  <b className="bathrooms1">Baños</b>
                  <div className="div1">3</div>
                </div>
              </div>
              <div className="item-group">
                <div className="item4">
                  <b className="size1">Tamaño de Lote</b>
                  <div className="sqft1">
                    {valuesProperty.Area_Lote}{" "}
                    <span style={{ fontSize: "17px", marginLeft: "5px" }}>
                      m²
                    </span>
                  </div>
                </div>
                <input className="item3" type="text" />
                <div className="item4">
                  <b className="label">Tamaño de Casa</b>
                  <div className="sqft1">
                    {valuesProperty.Area_Casa}{" "}
                    <span style={{ fontSize: "17px", marginLeft: "5px" }}>
                      m²
                    </span>
                  </div>
                </div>
                <div className="item5">
                  <b className="garages">Vendedor</b>
                  <div className="sqft1">
                    {valuesProperty.Nom_Seller} {valuesProperty.Apellidos}
                  </div>
                </div>
                <div className="item11">
                  <b className="year-built">Fecha de construccion</b>
                  <div className="sqft1">{valuesProperty.Fecha_Creacion}</div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "50px",
            }}
          >
            <h3 className="address">
              Dirección{" "}
              <i
                className="bi bi-card-checklist"
                style={{ marginLeft: "10px" }}
              ></i>
            </h3>
            <section
              style={{
                width: "48em",
                border: "1.1px solid #CCC",
                padding: "30px",
                marginTop: "10px",
              }}
            >
              <div
                className="services-list"
                style={{ display: "flex", gap: "35px", flexWrap: "wrap" }}
              >
                {extraServices.map((servicio, index) => (
                  <p key={index} style={{ fontSize: "21px", color: "#6c757d" }}>
                    <i
                      className="bi bi-check-circle"
                      style={{ color: "#28a745c4" }}
                    ></i>{" "}
                    {servicio.Nombre}
                  </p>
                ))}
              </div>
            </section>
          </div>
        </form>
      </div>
    </section>
  );
};
const mapContainerStyle = {
  width: "400px",
  height: "400px",
};

function MyMapComponent(latitud, longitud) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDRZWZc6e5o_I1Dw0DavOUMaFKwreL4Yao",
  });

  const center =
    latitud && longitud
      ? { lat: Number(latitud), lng: Number(longitud) }
      : {
          lat: 9.748917, // Coordenadas centrales (Costa Rica en este caso)
          lng: -83.753428,
        };

  const circleOptions = {
    strokeColor: "#CCC",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#CCC",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 10000, // Radius in meters
    center: center,
  };

  const [customIcon, setCustomIcon] = React.useState(null);

  React.useEffect(() => {
    if (isLoaded && window.google) {
      setCustomIcon({
        url: "https://res.cloudinary.com/djxwusqnb/image/upload/v1721243119/zc4yvaxwddqlgrwqs5ez.jpg",
        scaledSize: new window.google.maps.Size(50, 50),
      });
    }
  }, [isLoaded]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
      {customIcon && <Marker position={center} icon={customIcon} />}
      {customIcon && <Circle options={circleOptions} />}
    </GoogleMap>
  );
}

MyMapComponent.propTypes = {
  latitud: PropTypes.number,
  longitud: PropTypes.number,
};

FrameComponent2.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent2;
