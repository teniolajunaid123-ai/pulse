import type { PolymarketMarket } from "../polymarket/types";

export interface ScoreInputs {
  volume: number;
  liquidity: number;
  yesPrice: number;
  closesAt: Date | null;
}

/**
 * Composite score favoring markets that are liquid, actively traded,
 * genuinely uncertain (price near 0.5), and closing soon.
 */
export function computePulseScore({
  volume,
  liquidity,
  yesPrice,
  closesAt,
}: ScoreInputs): number {
  const volumeScore = Math.log10(volume + 1);
  const liquidityScore = Math.log10(liquidity + 1);
  const uncertaintyScore = 1 - Math.abs(yesPrice - 0.5) * 2;

  let urgencyScore = 0;
  if (closesAt) {
    const hoursLeft = (closesAt.getTime() - Date.now()) / (1000 * 60 * 60);
    urgencyScore = hoursLeft > 0 ? 1 / (1 + hoursLeft / 24) : 0;
  }

  return (
    volumeScore * 0.3 +
    liquidityScore * 0.3 +
    uncertaintyScore * 0.25 +
    urgencyScore * 0.15
  );
}

export function scoreMarket(market: PolymarketMarket) {
  const yesPrice = Number(market.outcomePrices?.[0] ?? 0.5);
  return computePulseScore({
    volume: market.volumeNum ?? 0,
    liquidity: market.liquidityNum ?? 0,
    yesPrice,
    closesAt: market.closedTime ? new Date(market.closedTime) : null,
  });
}
