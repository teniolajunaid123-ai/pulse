import type { PolymarketMarket } from "./types";

const GAMMA_API_URL =
  process.env.POLYMARKET_GAMMA_API_URL ?? "https://gamma-api.polymarket.com";

export async function fetchActiveMarkets(limit = 100): Promise<PolymarketMarket[]> {
  const res = await fetch(
    `${GAMMA_API_URL}/markets?active=true&closed=false&limit=${limit}`,
    { headers: { Accept: "application/json" } }
  );

  if (!res.ok) {
    throw new Error(`Polymarket fetch failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
