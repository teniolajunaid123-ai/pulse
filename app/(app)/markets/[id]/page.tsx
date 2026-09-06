import { notFound } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function MarketPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServiceClient();
  const { data: market } = await supabase
    .from("markets")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!market) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl p-8">
      {market.category && (
        <span className="text-xs uppercase tracking-wide text-neutral-500">
          {market.category}
        </span>
      )}
      <h1 className="mt-1 text-2xl font-bold">{market.question}</h1>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-neutral-500">Yes price</p>
          <p className="text-lg font-medium">
            {Math.round(market.yes_price * 100)}%
          </p>
        </div>
        <div>
          <p className="text-neutral-500">No price</p>
          <p className="text-lg font-medium">
            {Math.round(market.no_price * 100)}%
          </p>
        </div>
        <div>
          <p className="text-neutral-500">Volume</p>
          <p className="text-lg font-medium">
            ${market.volume.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-neutral-500">Pulse score</p>
          <p className="text-lg font-medium">{market.pulse_score.toFixed(2)}</p>
        </div>
      </div>
    </main>
  );
}
