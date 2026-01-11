"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Merchant } from "@/types/merchant";

export type Bounds = { north: number; south: number; east: number; west: number };

export function useMerchantsInView({
  bounds,
  query,
  category,
  limit = 1000,
}: {
  bounds: Bounds | null;
  query: string;
  category: string; // "all" or actual category
  limit?: number;
}) {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setErrorMsg(null);

      let q = supabase
        .from("merchants")
        .select("id,name,category,lat,lng,address")
        .eq("is_active", true);

      if (bounds) {
        q = q.gte("lat", bounds.south).lte("lat", bounds.north);

        // 防跨 180°，虽然 Adelaide 用不上，但写了更健壮
        if (bounds.west <= bounds.east) {
          q = q.gte("lng", bounds.west).lte("lng", bounds.east);
        } else {
          q = q.or(`lng.gte.${bounds.west},lng.lte.${bounds.east}`);
        }
      }

      const trimmed = query.trim();
      if (trimmed) q = q.ilike("name", `%${trimmed}%`);

      if (category !== "all") q = q.eq("category", category);

      q = q.limit(limit);

      const { data, error } = await q;

      if (cancelled) return;

      if (error) {
        setErrorMsg(error.message);
        setMerchants([]);
      } else {
        setMerchants((data ?? []) as Merchant[]);
      }

      setLoading(false);
    })().catch((e: any) => {
      if (cancelled) return;
      setErrorMsg(e?.message ?? "Unknown error");
      setLoading(false);
      setMerchants([]);
    });

    return () => {
      cancelled = true;
    };
  }, [bounds, query, category, limit]);

  return { merchants, errorMsg, loading };
}