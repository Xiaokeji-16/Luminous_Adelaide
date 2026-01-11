"use client";

import { Map, Marker, MapCameraChangedEvent } from "@vis.gl/react-google-maps";
import type { LatLng, Merchant } from "@/types/merchant";
import type { Bounds } from "@/hooks/useMerchantsInView";
import ClusteredMerchants from "./ClusteredMerchants";

export default function GoogleMapView({
  defaultCenter,
  merchants,
  myPos,
  useCluster,
  onSelect,
  onClosePanels,
  onBoundsChange,
}: {
  defaultCenter: LatLng;
  merchants: Merchant[];
  myPos: LatLng | null;
  useCluster: boolean;
  onSelect: (m: Merchant) => void;
  onClosePanels: () => void;
  onBoundsChange: (b: Bounds) => void;
}) {
  const handleCameraChanged = (ev: MapCameraChangedEvent) => {
    const b = ev.detail.bounds;
    if (!b) return;
    onBoundsChange({ north: b.north, south: b.south, east: b.east, west: b.west });
  };

  return (
    <Map
      defaultCenter={defaultCenter}
      defaultZoom={13}
      gestureHandling="greedy"
      disableDefaultUI
      fullscreenControl={false}
      streetViewControl={false}
      mapTypeControl={false}
      zoomControl={false}
      onClick={onClosePanels}
      onCameraChanged={handleCameraChanged}
    >
      {useCluster ? (
        <ClusteredMerchants merchants={merchants} onSelect={onSelect} />
      ) : (
        merchants.map((m) => (
          <Marker
            key={m.id}
            position={{ lat: m.lat, lng: m.lng }}
            title={m.name}
            onClick={() => onSelect(m)}
          />
        ))
      )}

      {myPos && <Marker position={myPos} title="Me" />}
    </Map>
  );
}