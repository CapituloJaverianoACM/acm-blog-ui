import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const defaultCenter = {
  lat: 4.7110, // Bogotá
  lng: -74.0721,
};

type MapPickerProps = {
  latitude?: number;
  longitude?: number;
  onChange: (lat: number, lng: number) => void;
};

export function MapPicker({ latitude, longitude, onChange }: MapPickerProps) {
  const position = latitude && longitude ? { lat: latitude, lng: longitude } : defaultCenter;

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={position}
        zoom={12}
        onClick={(e) => {
          if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            onChange(lat, lng);
          }
        }}
      >
        <Marker position={position} />
      </GoogleMap>
    </LoadScript>
  );
}
