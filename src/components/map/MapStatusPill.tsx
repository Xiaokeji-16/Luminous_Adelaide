"use client";

export default function MapStatusPill({
  count,
  loading,
}: {
  count: number;
  loading: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        right: 16,
        top: 16,
        zIndex: 9999,
        background: "rgba(255,255,255,.9)",
        borderRadius: 12,
        padding: "8px 10px",
        border: "1px solid rgba(0,0,0,.08)",
        fontSize: 12,
        opacity: 0.85,
      }}
    >
      Points in view: <b>{count}</b> {loading ? "· loading…" : ""}
    </div>
  );
}