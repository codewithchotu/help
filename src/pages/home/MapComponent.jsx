import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function MapComponent() {
  const [position, setPosition] = useState([17.385, 78.4867]); // Default Hyderabad

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => console.error("Location error:", err)
      );
    }
  }, []);

  const hospitals = [
    { name: "Apollo Hospital", lat: 17.426, lng: 78.448 },
    { name: "Yashoda Hospital", lat: 17.433, lng: 78.501 },
    { name: "Care Hospital", lat: 17.412, lng: 78.471 },
    { name: "Gandhi Hospital", lat: 17.422, lng: 78.501 },
  ];

  return (
    <div className="map-container">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "400px", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User marker */}
        <Marker position={position}>
          <Popup>You are here 🧍</Popup>
        </Marker>

        {/* Hospitals */}
        {hospitals.map((h, i) => (
          <Marker
            key={i}
            position={[h.lat, h.lng]}
            icon={L.divIcon({
              html: `<div style="background:white;padding:5px;border-radius:50%;border:2px solid red;">
                      <span style="color:red;">🏥</span>
                    </div>`,
              className: "",
            })}
          >
            <Popup>{h.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
