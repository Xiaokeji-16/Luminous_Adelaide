"use client";

import { useEffect, useRef } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Merchant } from "@/types/merchant";

export default function ClusteredMerchants({
  merchants,
  onSelect,
}: {
  merchants: Merchant[];
  onSelect: (m: Merchant) => void;
}) {
  const map = useMap();
  const clustererRef = useRef<MarkerClusterer | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!map) return;

    // 清理旧的
    clustererRef.current?.clearMarkers();
    markersRef.current.forEach((mk) => mk.setMap(null));
    markersRef.current = [];

    // 创建 markers
    const markers = merchants.map((m) => {
      const mk = new google.maps.Marker({
        position: { lat: m.lat, lng: m.lng },
        title: m.name,
      });

      mk.addListener("click", () => onSelect(m));
      return mk;
    });

    // 聚合
    const clusterer = new MarkerClusterer({ map, markers });
    clustererRef.current = clusterer;
    markersRef.current = markers;

    return () => {
      clusterer.clearMarkers();
      markers.forEach((mk) => mk.setMap(null));
    };
  }, [map, merchants, onSelect]);

  return null; // 这个组件不直接渲染 React DOM
}