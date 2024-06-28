import L, { LatLngExpression } from 'leaflet'
// import MarkerIcon from '../node_modules/leaflet/dist/images/marker-icon.png'
// import MarkerShadow from '../node_modules/leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef, useState } from 'react'
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
// import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

// NjD9xbMEKAPGk6ENKh2C

const Map = () => {
  const [location, setLocation] = useState<number[]>();
  // maptilersdk.config.apiKey = 'NjD9xbMEKAPGk6ENKh2C';

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        console.log(latitude, longitude)
        setLocation([latitude, longitude]);
      },
        (error) => {
          alert(error)
        }
      );
    } else {
      alert("Geolocation is not available")
    }
  }, []);

  console.log(location)

  return (
    <div className="w-full h-32">
      {location && location.length > 0 &&
        <MapContainer center={location as LatLngExpression} zoom={18} scrollWheelZoom={true}
          style={{
            height: '100vh',
            width: '50vw'
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <Marker position={location as LatLngExpression}> */}
          {/*   <Popup> */}
          {/*     A pretty CSS3 popup. <br /> Easily customizable. */}
          {/*   </Popup> */}
          {/* </Marker> */}
        </MapContainer>
      }
    </div>
  )
}

export default Map
