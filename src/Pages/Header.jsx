import "../Styles/Header.css";
import NavItems from "./Home/menu-main-page";
import { useState, useRef } from "react";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { Button } from "react-bootstrap";
import { PropTypes } from "prop-types";
const libraries = ["places"];
import { useSearchParams } from "react-router-dom";
const Header = ({ onSearch }) => {
  const searchBoxRef = useRef(null);
  //const [places, setPlaces] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchParams, setSearParams] = useSearchParams();
  const handlePlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    //setPlaces(places);
    if (places.length > 0) {
      setSearchValue(places[0].formatted_address || "");
    }
  };

  const handleChangePlace = (e) => {
    setSearchValue(e.target.value); // Actualiza directamente searchValue
  };

  const handleSearch = () => {
    // Usar el valor más reciente de searchValue
    onSearch(searchValue);
    const parts = searchValue
      .split(",")
      .map((part) => part.trim().replace(" Province", ""));
    let searhQuery;
    if (parts.length > 2) {
      searhQuery = parts[1];
    } else if (parts.length === 2) {
      searhQuery = parts[0];
    } else {
      searhQuery = parts[0];
    }
    setSearParams({ look: searhQuery });
    console.log("Buscar: ", searhQuery); // Asegúrate de imprimir el valor más reciente
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
            <section
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <StandaloneSearchBox
                onLoad={(ref) => (searchBoxRef.current = ref)}
                onPlacesChanged={handlePlacesChanged}
              >
                <input
                  type="text"
                  style={{ width: "300px" }}
                  className="search-bar"
                  value={searchValue}
                  onChange={handleChangePlace}
                  placeholder="Busqueda por Ubicacion"
                />
              </StandaloneSearchBox>
              <Button
                variant="primary"
                style={{ width: "100px", marginTop: "17px" }}
                onClick={handleSearch}
              >
                Buscar
              </Button>
            </section>
            {/* <ul className="places-list">
              {places.map((place, index) => (
                <li key={index}>{place.name}</li>
              ))}
            </ul> */}
          </div>
        </div>
      </header>
    </LoadScript>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func,
};

export default Header;
