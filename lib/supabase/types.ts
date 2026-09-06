export interface Database {
  public: {
    Tables: {
      markets: {
        Row: {
          id: string;
          polymarket_id: string;
          question: string;
          category: string | null;
          yes_price: number;
          no_price: number;
          volume: number;
          liquidity: number;
          closes_at: string | null;
          pulse_score: number;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["markets"]["Row"]> & {
          polymarket_id: string;
          question: string;
        };
        Update: Partial<Database["public"]["Tables"]["markets"]["Row"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
