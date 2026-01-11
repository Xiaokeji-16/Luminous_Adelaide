"use client";

export default function MapFilters({
  query,
  setQuery,
  category,
  setCategory,
  useCluster,
  setUseCluster,
}: {
  query: string;
  setQuery: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  useCluster: boolean;
  setUseCluster: (v: boolean) => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: 16,
        top: 16,
        zIndex: 9999,
        background: "white",
        borderRadius: 14,
        padding: 12,
        boxShadow: "0 10px 30px rgba(0,0,0,.15)",
        border: "1px solid rgba(0,0,0,.08)",
        width: 340,
        maxWidth: "calc(100vw - 32px)",
      }}
    >
      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search merchant name…"
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,.15)",
            outline: "none",
          }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: 130,
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,.15)",
            background: "white",
          }}
        >
          <option value="all">All</option>
          <option value="shopping">shopping</option>
          <option value="market">market</option>
          <option value="merchant">merchant</option>
        </select>
      </div>

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginTop: 10,
          fontSize: 13,
          opacity: 0.85,
        }}
      >
        <input
          type="checkbox"
          checked={useCluster}
          onChange={(e) => setUseCluster(e.target.checked)}
        />
        Cluster markers (for many points)
      </label>

      <div style={{ marginTop: 8, fontSize: 12, opacity: 0.6 }}>
        Tip: drag/zoom the map to load points in current view.
      </div>
    </div>
  );
}