"use client";

import { useEffect, useMemo, useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import type { LatLng, Merchant } from "@/types/merchant";

import LocateButton from "./LocateButton";
import MerchantPanel from "./MerchantPanel";
import ActionModal from "./ActionModal";
import MapFilters from "./MapFilters";
import MapStatusPill from "./MapStatusPill";
import GoogleMapView from "./GoogleMapView";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useMerchantsInView, type Bounds } from "@/hooks/useMerchantsInView";

export default function GoogleMapClient() {
  const defaultCenter = useMemo<LatLng>(() => ({ lat: -34.9285, lng: 138.6007 }), []);

  const [selected, setSelected] = useState<Merchant | null>(null);
  const [actionOpen, setActionOpen] = useState(false);
  const [myPos, setMyPos] = useState<LatLng | null>(null);

  const [useCluster, setUseCluster] = useState(true);
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebouncedValue(query, 350);
  const [bounds, setBounds] = useState<Bounds | null>(null);

  const { merchants, errorMsg, loading } = useMerchantsInView({
    bounds,
    query: debouncedQuery,
    category,
    limit: 1000,
  });

  useEffect(() => {
    setActionOpen(false);
  }, [selected?.id]);

  const closePanels = () => {
    setSelected(null);
    setActionOpen(false);
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <GoogleMapView
          defaultCenter={defaultCenter}
          merchants={merchants}
          myPos={myPos}
          useCluster={useCluster}
          onSelect={setSelected}
          onClosePanels={closePanels}
          onBoundsChange={setBounds}
        />

        <MapFilters
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          useCluster={useCluster}
          setUseCluster={setUseCluster}
        />

        <LocateButton onLocated={setMyPos} />
        <MapStatusPill count={merchants.length} loading={loading} />

        {selected && (
          <MerchantPanel
            merchant={selected}
            onClose={closePanels}
            onAction={() => setActionOpen(true)}
          />
        )}

        {selected && (
          <ActionModal
            merchant={selected}
            open={actionOpen}
            onClose={() => setActionOpen(false)}
          />
        )}

        {errorMsg && (
          <div
            style={{
              position: "fixed",
              left: 16,
              bottom: 16,
              background: "white",
              padding: 12,
              borderRadius: 10,
              boxShadow: "0 10px 30px rgba(0,0,0,.15)",
              maxWidth: 520,
              zIndex: 9999,
            }}
          >
            <b>Load error:</b> {errorMsg}
          </div>
        )}
      </div>
    </APIProvider>
  );
}