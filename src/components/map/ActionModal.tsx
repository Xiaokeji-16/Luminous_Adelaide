"use client";

import { useState } from "react";
import Link from "next/link";
import type { Merchant } from "@/types/merchant";

function getPlayerId() {
  const key = "player_id";
  if (typeof window === "undefined") return "server";
  const existing = localStorage.getItem(key);
  if (existing) return existing;

  const id = crypto.randomUUID();
  localStorage.setItem(key, id);
  return id;
}

export default function ActionModal({
  merchant,
  open,
  onClose,
}: {
  merchant: Merchant;
  open: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  if (!open) return null;

  const checkIn = async () => {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch("/api/checkins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchant_id: merchant.id,
          player_id: getPlayerId(),
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "check-in failed");

      setMsg("✅ 打卡成功！");
    } catch (e: any) {
      setMsg(`❌ ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,.35)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 420,
          maxWidth: "100%",
          background: "white",
          borderRadius: 16,
          padding: 16,
          boxShadow: "0 20px 60px rgba(0,0,0,.25)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 16 }}>{merchant.name}</div>
            <div style={{ opacity: 0.7, fontSize: 12, marginTop: 4 }}>
              {merchant.category}
            </div>
          </div>

          <button
            onClick={onClose}
            style={{ border: "none", background: "transparent", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>

        <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
          <button
            disabled={loading}
            onClick={checkIn}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,.12)",
              background: "black",
              color: "white",
              cursor: "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Checking in..." : "✅ 打卡 / 领取奖励"}
          </button>

          <Link
            href={`/merchants/${merchant.id}`}
            style={{
              textAlign: "center",
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,.12)",
              textDecoration: "none",
              color: "black",
            }}
          >
            查看详情页
          </Link>
        </div>

        {msg && <div style={{ marginTop: 12, fontSize: 13 }}>{msg}</div>}
      </div>
    </div>
  );
}