// src/pages/StoreLocator.jsx
import { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import {
  MAPS_API_KEY,
  MAP_CENTER,
  MAP_STYLES,
  STORE_LOCATIONS,
} from "../utils/mapsConfig";
import Spinner from "../components/ui/Spinner";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const StoreLocator = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [map, setMap] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: MAPS_API_KEY,
  });

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleStoreClick = (store) => {
    setSelectedStore(store);
    setActiveMarker(store.id);
    map?.panTo({ lat: store.lat, lng: store.lng });
    map?.setZoom(15);
  };

  const handleMarkerClick = (store) => {
    setActiveMarker(store.id);
    setSelectedStore(store);
  };

  const handleGetDirections = (store) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`;
    window.open(url, "_blank");
  };

  if (loadError)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500 text-sm">
          Failed to load Google Maps. Check your API key.
        </p>
      </div>
    );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Store Locator</h1>
        <p className="text-sm text-gray-500 mt-1">
          Find SmartHub branches near you
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 h-[600px]">
        {/* Store List — Left Panel */}
        <div className="w-full lg:w-80 flex flex-col gap-3 overflow-y-auto">
          {STORE_LOCATIONS.map((store) => (
            <div
              key={store.id}
              onClick={() => handleStoreClick(store)}
              className={`bg-white rounded-xl p-4 shadow-sm border cursor-pointer transition-all
                ${
                  selectedStore?.id === store.id
                    ? "border-blue-500 shadow-blue-100"
                    : "border-gray-100 hover:border-gray-300"
                }`}
            >
              {/* Store Header */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                  {store.name}
                </h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ml-2 shrink-0
                  ${
                    store.type === "flagship"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {store.type}
                </span>
              </div>

              {/* Store Details */}
              <div className="space-y-1.5">
                <div className="flex items-start gap-2 text-xs text-gray-500">
                  <MapPin size={12} className="mt-0.5 shrink-0 text-gray-400" />
                  {store.address}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Phone size={12} className="shrink-0 text-gray-400" />
                  {store.phone}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock size={12} className="shrink-0 text-gray-400" />
                  {store.hours}
                </div>
              </div>

              {/* Directions Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleGetDirections(store);
                }}
                className="mt-3 flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                <Navigation size={12} />
                Get Directions
              </button>
            </div>
          ))}
        </div>

        {/* Map — Right Panel */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {!isLoaded ? (
            <Spinner />
          ) : (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={MAP_CENTER}
              zoom={12}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                styles: MAP_STYLES,
                disableDefaultUI: false,
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: true,
              }}
            >
              {/* Markers */}
              {STORE_LOCATIONS.map((store) => (
                <Marker
                  key={store.id}
                  position={{ lat: store.lat, lng: store.lng }}
                  onClick={() => handleMarkerClick(store)}
                  icon={{
                    url:
                      store.type === "flagship"
                        ? "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                        : "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  }}
                />
              ))}

              {/* Info Window */}
              {activeMarker && selectedStore && (
                <InfoWindow
                  position={{ lat: selectedStore.lat, lng: selectedStore.lng }}
                  onCloseClick={() => {
                    setActiveMarker(null);
                    setSelectedStore(null);
                  }}
                >
                  <div className="p-1 min-w-[180px]">
                    <p className="font-semibold text-gray-800 text-sm mb-1">
                      {selectedStore.name}
                    </p>
                    <p className="text-xs text-gray-500 mb-0.5">
                      {selectedStore.address}
                    </p>
                    <p className="text-xs text-gray-500 mb-0.5">
                      {selectedStore.phone}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedStore.hours}
                    </p>
                    <button
                      onClick={() => handleGetDirections(selectedStore)}
                      className="mt-2 text-xs text-blue-600 font-medium hover:underline"
                    >
                      Get Directions →
                    </button>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
