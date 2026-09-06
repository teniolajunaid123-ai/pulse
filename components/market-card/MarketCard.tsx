import Link from "next/link";

export interface MarketCardProps {
  id: string;
  question: string;
  category?: string | null;
  yesPrice: number;
  volume: number;
  pulseScore: number;
}

export function MarketCard({
  id,
  question,
  category,
  yesPrice,
  volume,
  pulseScore,
}: MarketCardProps) {
  return (
    <Link
      href={`/markets/${id}`}
      className="flex flex-col gap-2 rounded-lg border border-neutral-200 p-4 hover:border-neutral-400"
    >
      <div className="flex items-center justify-between">
        {category && (
          <span className="text-xs uppercase tracking-wide text-neutral-500">
            {category}
          </span>
        )}
        <span className="text-xs text-neutral-400">
          score {pulseScore.toFixed(2)}
        </span>
      </div>
      <p className="font-medium">{question}</p>
      <div className="flex items-center justify-between text-sm text-neutral-600">
        <span>{Math.round(yesPrice * 100)}% Yes</span>
        <span>${volume.toLocaleString()} vol</span>
      </div>
    </Link>
  );
}
