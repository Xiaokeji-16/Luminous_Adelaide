import { createClient } from "@supabase/supabase-js";

export default async function MerchantDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: merchant, error } = await supabase
    .from("merchants")
    .select("id,name,category,address,lat,lng")
    .eq("id", params.id)
    .single();

  if (error || !merchant) {
    return <div style={{ padding: 24 }}>Not found.</div>;
  }

  const googleLink = `https://www.google.com/maps/search/?api=1&query=${merchant.lat},${merchant.lng}`;

  return (
    <div style={{ padding: 24, maxWidth: 820 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>{merchant.name}</h1>
      <p style={{ opacity: 0.8, marginTop: 6 }}>Category: {merchant.category}</p>

      {merchant.address && <p style={{ marginTop: 12 }}>{merchant.address}</p>}

      <p style={{ marginTop: 12, opacity: 0.7 }}>
        {merchant.lat}, {merchant.lng}
      </p>

      <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
        <a href={googleLink} target="_blank" rel="noreferrer">
          Open in Google Maps
        </a>
        <a href="/">Back</a>
      </div>
    </div>
  );
}