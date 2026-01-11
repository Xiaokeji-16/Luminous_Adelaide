import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const { merchant_id, player_id } = await req.json();

    if (!merchant_id || !player_id) {
      return NextResponse.json({ error: "missing merchant_id/player_id" }, { status: 400 });
    }

    const { data, error } = await supabaseServer
      .from("checkins")
      .insert({ merchant_id, player_id })
      .select("id, created_at")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, checkin: data });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "unknown error" }, { status: 500 });
  }
}