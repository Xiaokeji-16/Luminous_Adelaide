"use client";

import type { Merchant } from "@/types/merchant";

export default function MerchantPanel({
  merchant,
  onClose,
  onAction,
}: {
  merchant: Merchant;
  onClose: () => void;
  onAction: () => void;
}) {
  const googleLink = `https://www.google.com/maps/search/?api=1&query=${merchant.lat},${merchant.lng}`;

  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        zIndex: 9999,
        width: 320,
        maxWidth: "calc(100vw - 32px)",
        background: "white",
        borderRadius: 14,
        padding: 14,
        boxShadow: "0 10px 30px rgba(0,0,0,.15)",
        border: "1px solid rgba(0,0,0,.08)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 16, lineHeight: 1.2 }}>
            {merchant.name}
          </div>

          <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75 }}>
            Category: {merchant.category}
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: 18,
            lineHeight: 1,
            padding: 6,
            borderRadius: 8,
          }}
          aria-label="Close"
          title="Close"
        >
          ✕
        </button>
      </div>

      {/* Address */}
      {merchant.address && (
        <div style={{ marginTop: 10, fontSize: 14 }}>{merchant.address}</div>
      )}

      {/* Coords */}
      <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75 }}>
        {merchant.lat.toFixed(5)}, {merchant.lng.toFixed(5)}
      </div>

      {/* Actions */}
      <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
        <a
          href={googleLink}
          target="_blank"
          rel="noreferrer"
          style={{
            flex: 1,
            textAlign: "center",
            textDecoration: "none",
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,.12)",
            background: "white",
            color: "black",
            fontSize: 14,
          }}
        >
          Open in Google Maps
        </a>

        <button
          onClick={onAction}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,.12)",
            background: "black",
            color: "white",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Action
        </button>
      </div>
    </div>
  );
}