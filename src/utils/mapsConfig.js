// src/utils/mapsConfig.js
export const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const MAP_CENTER = { lat: 24.8607, lng: 67.0011 }; // Karachi

export const MAP_STYLES = [
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [{ color: "#ffffff" }, { lightness: 17 }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }, { lightness: 21 }],
  },
];

export const STORE_LOCATIONS = [
  {
    id: 1,
    name: "SmartHub — Clifton Branch",
    address: "Block 5, Clifton, Karachi",
    lat: 24.8138,
    lng: 67.03,
    phone: "+92 21 1234567",
    hours: "Mon–Sat: 9am – 9pm",
    type: "flagship",
  },
  {
    id: 2,
    name: "SmartHub — Gulshan Branch",
    address: "Block 14, Gulshan-e-Iqbal, Karachi",
    lat: 24.9215,
    lng: 67.0926,
    phone: "+92 21 7654321",
    hours: "Mon–Sat: 10am – 8pm",
    type: "branch",
  },
  {
    id: 3,
    name: "SmartHub — DHA Branch",
    address: "Phase 6, DHA, Karachi",
    lat: 24.7925,
    lng: 67.0618,
    phone: "+92 21 9876543",
    hours: "Mon–Sun: 10am – 10pm",
    type: "branch",
  },
  {
    id: 4,
    name: "SmartHub — North Nazimabad",
    address: "Block H, North Nazimabad, Karachi",
    lat: 24.9428,
    lng: 67.0641,
    phone: "+92 21 1122334",
    hours: "Mon–Sat: 9am – 8pm",
    type: "branch",
  },
];
