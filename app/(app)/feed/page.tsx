import { createServiceClient } from "@/lib/supabase/server";
import { MarketCard } from "@/components/market-card/MarketCard";

export const dynamic = "force-dynamic";

export default async function FeedPage() {
  const supabase = createServiceClient();
  const { data: markets, error } = await supabase
    .from("markets")
    .select("*")
    .order("pulse_score", { ascending: false })
    .limit(50);

  if (error) {
    return (
      <main className="p-8">
        <p className="text-red-600">Failed to load feed: {error.message}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-3 p-8">
      <h1 className="mb-2 text-2xl font-bold">Feed</h1>
      {markets?.length ? (
        markets.map((market) => (
          <MarketCard
            key={market.id}
            id={market.id}
            question={market.question}
            category={market.category}
            yesPrice={market.yes_price}
            volume={market.volume}
            pulseScore={market.pulse_score}
          />
        ))
      ) : (
        <p className="text-neutral-500">
          No markets yet — run the Polymarket sync script to populate the feed.
        </p>
      )}
    </main>
  );
}
