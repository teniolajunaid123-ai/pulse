import { fetchActiveMarkets } from "../lib/polymarket/client";
import { scoreMarket } from "../lib/scoring";
import { createServiceClient } from "../lib/supabase/server";

async function main() {
  const markets = await fetchActiveMarkets();
  const supabase = createServiceClient();

  const rows = markets.map((market) => {
    const [yesPrice, noPrice] = market.outcomePrices.map(Number);
    return {
      polymarket_id: market.id,
      question: market.question,
      category: market.category ?? null,
      yes_price: yesPrice ?? 0.5,
      no_price: noPrice ?? 0.5,
      volume: market.volumeNum ?? 0,
      liquidity: market.liquidityNum ?? 0,
      closes_at: market.closedTime ?? null,
      pulse_score: scoreMarket(market),
      updated_at: new Date().toISOString(),
    };
  });

  const { error } = await supabase
    .from("markets")
    .upsert(rows, { onConflict: "polymarket_id" });

  if (error) {
    throw error;
  }

  console.log(`Synced ${rows.length} markets`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
