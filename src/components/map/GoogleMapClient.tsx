"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export default function GoogleMapClient() {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div style={{ width: "100%", height: "100vh" }}>
        <Map
          defaultCenter={{ lat: -34.9285, lng: 138.6007 }}
          defaultZoom={13}
          disableDefaultUI
          gestureHandling="greedy"
        >
          <Marker position={{ lat: -34.9285, lng: 138.6007 }} />
        </Map>
      </div>
    </APIProvider>
  );
}