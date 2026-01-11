export type Merchant = {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
  address: string | null;
};

export type LatLng = { lat: number; lng: number };