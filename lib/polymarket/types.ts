export interface PolymarketMarket {
  id: string;
  question: string;
  category?: string;
  outcomePrices: string[];
  volumeNum: number;
  liquidityNum: number;
  closedTime?: string | null;
  active: boolean;
  closed: boolean;
}
