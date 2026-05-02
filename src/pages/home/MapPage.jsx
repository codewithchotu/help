import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./MapPage.css";

export default function MapPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    // Initialize map
    const map = L.map("map", { 
      zoomControl: false,
      attributionControl: false 
    }).setView([17.3850, 78.4867], 13); 

    // Add Premium Dark Tiles
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 20
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const fetchData = async () => {
      let donorData = [];
      let requestData = [];
      try {
        // BYPASS FIREBASE TO PREVENT "PAGE COLLAPSING" CRASH
        // const querySnapshot = await getDocs(collection(db, "donors"));
        
        throw new Error("Bypassing Firebase manually to prevent SDK crashes");
      } catch (err) {
        // Read dynamically registered donors from local storage
        const localDonors = JSON.parse(localStorage.getItem('mockDonors') || '[]');
        const localRequests = JSON.parse(localStorage.getItem('mockRequests') || '[]');
        
        donorData = [
          ...localDonors,
          { id: 'm1', name: "Rahul S.", blood: "A+", lat: 17.385, lng: 78.486, type: 'donor', phone: "+91 98765 43210" },
          { id: 'm2', name: "Priya M.", blood: "O-", lat: 17.412, lng: 78.471, type: 'donor', phone: "+91 87654 32109" },
          { id: 'm3', name: "Vikram K.", blood: "B+", lat: 17.395, lng: 78.501, type: 'donor', phone: "+91 76543 21098" }
        ];

        requestData = [
          ...localRequests.map(r => ({ ...r, lat: 17.385 + (Math.random() - 0.5) * 0.1, lng: 78.486 + (Math.random() - 0.5) * 0.1, type: 'request' })),
          { id: 'req1', name: "Suresh Raina", blood: "A-", lat: 17.400, lng: 78.490, type: 'request', phone: "+91 99887 76655" }
        ];
      }

      if (!isMounted) return; // Prevent updating unmounted component/map

      const hospitals = [
        { name: "Apollo Hospital", lat: 17.426, lng: 78.448, type: 'hospital', phone: "1860-500-1066" },
        { name: "Yashoda Hospital", lat: 17.433, lng: 78.501, type: 'hospital', phone: "040-4567-4567" },
        { name: "Care Hospital", lat: 17.412, lng: 78.471, type: 'hospital', phone: "040-6165-6565" },
      ];

      const allMarkers = [...donorData, ...hospitals, ...requestData];

      allMarkers.forEach((m) => {
        let typeIcon = '🩸';
        if (m.type === 'hospital') typeIcon = '🏥';
        if (m.type === 'request') typeIcon = '🚨';

        const icon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div class="marker-pin ${m.type}">
                  <span>${typeIcon}</span>
                </div>`,
          iconSize: [30, 42],
          iconAnchor: [15, 42]
        });

        const marker = L.marker([m.lat, m.lng], { icon }).addTo(map);
        
        let buttonAction = `alert('Initiating contact with ${m.name}...\\n\\nDialing: ${m.phone || 'Not provided'}')`;
        let buttonText = 'Contact Now';
        
        if (m.type === 'hospital') {
          buttonText = 'Visit Website';
          // Simulating opening the hospital's official page by doing a targeted Google Search
          buttonAction = `window.open('https://www.google.com/search?q=${encodeURIComponent(m.name + ' hospital')}', '_blank')`;
        }

        marker.bindPopup(`
          <div class="map-popup">
            <div class="popup-header ${m.type}">
              ${m.type === 'hospital' ? 'Hospital' : (m.type === 'request' ? 'Urgent Request' : 'Donor')}
            </div>
            <h3>${m.name}</h3>
            <p>${m.type === 'hospital' ? 'Emergency & Blood Bank' : `Blood Group: <b>${m.blood}</b>`}</p>
            <p style="font-size: 0.85rem; margin-top: -8px; color: #94a3b8; font-weight: 500;">
              📞 ${m.phone || 'Contact Not Provided'}
            </p>
            <button class="popup-btn" onclick="${buttonAction}">${buttonText}</button>
          </div>
        `, {
          className: 'custom-popup'
        });
      });
      setLoading(false);
    };

    fetchData();

    return () => {
      isMounted = false;
      map.remove();
    };
  }, []);

  return (
    <div className="map-page-wrapper">
      <div className="map-header">
        <div className="header-content">
          <h1>Live LifeLine Map</h1>
          <p>Connecting life-savers and medical centers in real-time.</p>
        </div>
        <div className="map-stats">
          <div className="stat">
            <span className="dot hospital"></span> Hospitals
          </div>
          <div className="stat">
            <span className="dot donor"></span> Donors
          </div>
          <div className="stat">
            <span className="dot request"></span> Requests
          </div>
        </div>
      </div>
      
      <div className="map-container-glass">
        <div id="map"></div>
        {loading && <div className="map-loader">
          <div className="pulse-loader"></div>
          <span>Locating Lifesavers...</span>
        </div>}
      </div>
    </div>
  );
}
