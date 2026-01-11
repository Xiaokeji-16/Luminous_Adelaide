"use client";

import { useMap } from "@vis.gl/react-google-maps";
import type { LatLng } from "@/types/merchant";

export default function LocateButton({
  onLocated,
}: {
  onLocated: (pos: LatLng) => void;
}) {
  const map = useMap();

  const locate = () => {
    if (!map) return;

    if (!navigator.geolocation) {
      alert("Your browser does not support geolocation.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const center = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        onLocated(center);
        map.panTo(center);
        map.setZoom(16);
      },
      (err) => alert(err.message),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  return (
    <button
      onClick={locate}
      style={{
        position: "absolute",
        right: 16,
        bottom: 16,
        zIndex: 9999,
        background: "white",
        borderRadius: 12,
        padding: "10px 12px",
        boxShadow: "0 10px 30px rgba(0,0,0,.15)",
        border: "1px solid rgba(0,0,0,.08)",
        cursor: "pointer",
      }}
      title="Locate me"
    >
      📍 Locate me
    </button>
  );
}