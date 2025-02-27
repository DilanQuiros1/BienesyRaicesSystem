import { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
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

const MapComponent = ({
  onPlaceSelected,
  initialLat,
  initialLng,
  isShowing,
  isEditing,
}) => {
  const searchBoxRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const [marker2, setMarker2] = useState({
    lat2: 0, // Coordenadas centrales (Costa Rica en este caso)
    lng2: 0,
  });
  const [input, setInput] = useState();
  const mapRef = useRef(null);

  useEffect(() => {
    setMarker2({ lat2: initialLat, lng2: initialLng });
  }, [initialLat, initialLng]);

  const center =
    initialLat && initialLng
      ? { lat: initialLat, lng: initialLng }
      : {
          lat: 9.748917, // Coordenadas centrales (Costa Rica en este caso)
          lng: -83.753428,
        };

  const onMapClick = useCallback(
    (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarker({ lat, lng });
      onPlaceSelected({ lat, lng });
      console.log("click");
    },
    [onPlaceSelected]
  );

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const onMapClick1 = useCallback(() => {
    if (typeof initialLat === "number" && typeof initialLng === "number") {
      const lat = marker2.lat2;
      const lng = marker2.lng2;
      setMarker({ lat, lng });
      onPlaceSelected({ lat, lng });
      console.log("initial coordinates click", lat);
    } else {
      console.error("Invalid initialLat or initialLng for onMapClick1");
    }
  }, [initialLat, initialLng, onPlaceSelected]);

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
      {isEditing && (
        <Button variant="dark" onClick={onMapClick1} className="mt-3 mb-3">
          Mostrar Ubicacion Actual
        </Button>
      )}
      {!isShowing && (
        <StandaloneSearchBox
          onLoad={(ref) => (searchBoxRef.current = ref)}
          onPlacesChanged={handlePlacesChanged}
        >
          <input
            type="text"
            value={input || ""}
            onChange={handleInput}
            className="search-bar mb-3"
            placeholder="Busca tu propiedad aqui"
          />
        </StandaloneSearchBox>
      )}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={isEditing ? 12.9 : 8}
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
  isEditing: PropTypes.bool,
  initialLat: PropTypes.number,
  initialLng: PropTypes.number,
  isShowing: PropTypes.bool,
};

export default MapComponent;
