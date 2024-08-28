import { useRef, useState, useEffect, useCallback } from "react";
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

// Define the default marker icon with modified opacity
const defaultIcon = {
  url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
  scaledSize: new window.google.maps.Size(32, 32), // Size of the marker
  anchor: new window.google.maps.Point(16, 32), // Position of the anchor
  opacity: 0.5, // Adjust opacity here (0 = fully transparent, 1 = fully opaque)
};

const MapComponent = ({
  onPlaceSelected,
  initialLat,
  initialLng,
  isEditing,
}) => {
  const searchBoxRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const mapRef = useRef(null);

  // Set marker when initial coordinates are available
  useEffect(() => {
    if (initialLat && initialLng) {
      setMarker({ lat: initialLat, lng: initialLng });
    }
  }, [initialLat, initialLng]);

  // Define the map center based on initial coordinates
  const center = {
    lat: initialLat || 9.748917, // Default to Costa Rica if no initialLat
    lng: initialLng || -83.753428, // Default to Costa Rica if no initialLng
  };

  // Handle map click to set a new marker
  const onMapClick = useCallback(
    (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarker({ lat, lng });
      onPlaceSelected({ lat, lng });
    },
    [onPlaceSelected]
  );

  // Handle changes from the place search box
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
      // Ensure the API script is loaded before proceeding
      onLoad={() => {
        if (window.google && window.google.maps) {
          // API loaded, you can safely use window.google.maps
        }
      }}
    >
      {isEditing && (
        <Button
          variant="dark"
          onClick={() => mapRef.current.panTo(center)}
          className="mt-3"
        >
          Mostrar Ubicacion Actual
        </Button>
      )}
      <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={handlePlacesChanged}
      >
        <input
          type="text"
          className="search-bar mb-3"
          placeholder="Busca tu propiedad aquí"
        />
      </StandaloneSearchBox>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={isEditing ? 12.9 : 8}
        onClick={onMapClick}
        onLoad={(map) => (mapRef.current = map)}
      >
        {marker && <Marker position={marker} icon={defaultIcon} />}
      </GoogleMap>
    </LoadScript>
  );
};

MapComponent.propTypes = {
  onPlaceSelected: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  initialLat: PropTypes.number,
  initialLng: PropTypes.number,
};

export default MapComponent;
