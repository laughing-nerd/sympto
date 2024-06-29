import L, { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

const Map = ({ location }: {
  location: number[]
}) => {


  const customIcon = new L.Icon({
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Map_pin_icon.svg/352px-Map_pin_icon.svg.png", // Path to your custom icon
    iconSize: [32, 42],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
  });

  return (
    <>
      {location && location.length > 0 &&
        <MapContainer center={location as LatLngExpression} zoom={15} scrollWheelZoom={true}
          style={{
            height: '80vh',
            width: '40vw'
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={location as LatLngExpression} icon={customIcon}>
            <Popup>
              You are here!
            </Popup>
          </Marker>
        </MapContainer>
      }
    </>
  )
}

export default Map
