import "../Styles/Header.css";
import NavItems from "./Home/menu-main-page";
import { useState, useRef } from "react";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";

const libraries = ["places"];
const Header = () => {
  const [places, setPlaces] = useState([]);
  const searchBoxRef = useRef(null);

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    setPlaces(places);
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDRZWZc6e5o_I1Dw0DavOUMaFKwreL4Yao"
      libraries={libraries}
    >
      <header className="header">
        <NavItems />
        <div className="headerFondo">
          <div className="her-content">
            <h1 className="her-title">Bienvenido a RealState.com</h1>
            <h2 className="her-subtitle">
              Estamos escantados de tenerte aqui!!
            </h2>
            <StandaloneSearchBox
              onLoad={(ref) => (searchBoxRef.current = ref)}
              onPlacesChanged={handlePlacesChanged}
            >
              <input
                type="text"
                className="search-bar"
                placeholder="Busqueda por Ubicacion"
              />
            </StandaloneSearchBox>
            <ul className="places-list">
              {places.map((place, index) => (
                <li key={index}>{place.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </LoadScript>
  );
};

export default Header;
