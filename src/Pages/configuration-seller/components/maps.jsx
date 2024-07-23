import { useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};
const center = {
  lat: 9.7489, // Coordenadas centrales (Costa Rica en este caso)
  lng: -83.7534,
};

const MapComponent = ({ onPlaceSelected }) => {
  const searchBoxRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const mapRef = useRef(null);

  const onMapClick = useCallback(
    (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarker({ lat, lng });
      onPlaceSelected({ lat, lng });
    },
    [onPlaceSelected]
  );

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setMarker({ lat, lng });
      mapRef.current.panTo({ lat, lng });
      onPlaceSelected({ lat, lng });
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDRZWZc6e5o_I1Dw0DavOUMaFKwreL4Yao"
      libraries={libraries}
    >
      <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={handlePlacesChanged}
      >
        <input
          type="text"
          className="search-bar mb-3"
          placeholder="Busca tu propiedad aqui"
        />
      </StandaloneSearchBox>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={8}
        onClick={onMapClick}
        onLoad={(map) => (mapRef.current = map)}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </LoadScript>
  );
};

MapComponent.propTypes = {
  onPlaceSelected: PropTypes.func.isRequired,
};

export default MapComponent;
